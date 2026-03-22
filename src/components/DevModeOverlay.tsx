import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDevMode } from './DevModeProvider';

// ── Helpers ──────────────────────────────────────────────

const IGNORED_TAGS = new Set(['HTML', 'BODY']);
const OVERLAY_ATTR = 'data-devmode';
const DEV_INSPECTOR_OUTLINE = '#0091D5';

function isDevModeElement(el: HTMLElement): boolean {
  let node: HTMLElement | null = el;
  while (node) {
    if (node.hasAttribute(OVERLAY_ATTR)) return true;
    node = node.parentElement;
  }
  return false;
}

function shouldIgnore(el: HTMLElement): boolean {
  if (IGNORED_TAGS.has(el.tagName)) return true;
  if (isDevModeElement(el)) return true;
  return false;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getRect(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function formatPadding(cs: CSSStyleDeclaration): string {
  const t = cs.paddingTop, r = cs.paddingRight, b = cs.paddingBottom, l = cs.paddingLeft;
  if (t === r && r === b && b === l) return t;
  if (t === b && l === r) return `${t} ${r}`;
  return `${t} ${r} ${b} ${l}`;
}

function formatMargin(cs: CSSStyleDeclaration): string {
  const t = cs.marginTop, r = cs.marginRight, b = cs.marginBottom, l = cs.marginLeft;
  if (t === r && r === b && b === l) return t;
  if (t === b && l === r) return `${t} ${r}`;
  return `${t} ${r} ${b} ${l}`;
}

function formatBorderRadius(cs: CSSStyleDeclaration): string {
  const tl = cs.borderTopLeftRadius, tr = cs.borderTopRightRadius;
  const bl = cs.borderBottomLeftRadius, br = cs.borderBottomRightRadius;
  if (tl === tr && tr === bl && bl === br) return tl;
  return `${tl} ${tr} ${br} ${bl}`;
}

function formatBorderWidth(cs: CSSStyleDeclaration): string {
  const t = cs.borderTopWidth, r = cs.borderRightWidth;
  const b = cs.borderBottomWidth, l = cs.borderLeftWidth;
  if (t === r && r === b && b === l) return t;
  return `${t} ${r} ${b} ${l}`;
}

// ── Color normalization (OKLCH / CSS var safe) ───────────

/** Check if a computed color value represents transparent */
function isTransparentColor(val: string): boolean {
  if (!val) return true;
  const v = val.trim().toLowerCase();
  if (v === 'transparent') return true;
  if (v === 'rgba(0, 0, 0, 0)') return true;
  // Match rgba with 0 alpha in various formats
  const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
  if (m && parseFloat(m[4]) === 0) return true;
  return false;
}

/** Extract r,g,b from an rgb/rgba string. Returns null if not parseable. */
function parseRgb(val: string): [number, number, number] | null {
  const m = val.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

function rgbTupleToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Resolve any CSS color string (oklch, color(), var-resolved, etc.) to an
 * rgb tuple by round-tripping through a temporary DOM element.
 * This works because getComputedStyle always resolves to rgb/rgba.
 */
function resolveToRgb(raw: string): string {
  try {
    const temp = document.createElement('div');
    temp.style.position = 'fixed';
    temp.style.left = '-99999px';
    temp.style.top = '-99999px';
    temp.style.width = '0';
    temp.style.height = '0';
    temp.style.pointerEvents = 'none';
    temp.style.color = raw;
    document.body.appendChild(temp);
    const resolved = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    return resolved;
  } catch {
    return raw;
  }
}

interface NormalizedColor {
  /** The raw computed value (could be oklch, rgb, etc.) */
  raw: string;
  /** Hex representation, empty string if transparent */
  hex: string;
  /** Whether this color is fully transparent */
  isTransparent: boolean;
}

function normalizeColor(raw: string): NormalizedColor {
  if (!raw || isTransparentColor(raw)) {
    return { raw: raw || 'transparent', hex: '', isTransparent: true };
  }

  // Try direct rgb parse first (most common case)
  const directParse = parseRgb(raw);
  if (directParse) {
    return { raw, hex: rgbTupleToHex(...directParse), isTransparent: false };
  }

  // For oklch(), color(), or anything non-rgb — resolve via temp element
  const resolved = resolveToRgb(raw);
  if (isTransparentColor(resolved)) {
    return { raw, hex: '', isTransparent: true };
  }
  const parsed = parseRgb(resolved);
  if (parsed) {
    return { raw, hex: rgbTupleToHex(...parsed), isTransparent: false };
  }

  // Last resort — return raw as-is
  return { raw, hex: raw, isTransparent: false };
}

// ── Painted surface detection & resolution ───────────────

/** Parse a CSS px value to a number, returning 0 for non-numeric values. */
function parsePx(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

/** Determine if the max of all four border-side widths is zero. */
function isBorderWidthAllZero(cs: CSSStyleDeclaration): boolean {
  return (
    parsePx(cs.borderTopWidth) === 0 &&
    parsePx(cs.borderRightWidth) === 0 &&
    parsePx(cs.borderBottomWidth) === 0 &&
    parsePx(cs.borderLeftWidth) === 0
  );
}

/** Check if any border side has visible width + non-none style + non-transparent color. */
function hasVisibleBorder(cs: CSSStyleDeclaration): boolean {
  const sides: Array<{ w: string; s: string; c: string }> = [
    { w: cs.borderTopWidth, s: cs.borderTopStyle, c: cs.borderTopColor },
    { w: cs.borderRightWidth, s: cs.borderRightStyle, c: cs.borderRightColor },
    { w: cs.borderBottomWidth, s: cs.borderBottomStyle, c: cs.borderBottomColor },
    { w: cs.borderLeftWidth, s: cs.borderLeftStyle, c: cs.borderLeftColor },
  ];
  for (const { w, s, c } of sides) {
    if (parsePx(w) > 0 && s !== 'none' && !isTransparentColor(c)) return true;
  }
  return false;
}

/** Check paint signals on a computed style (works for both elements and pseudo-elements). */
function hasPaintSignals(cs: CSSStyleDeclaration): boolean {
  if (!isTransparentColor(cs.backgroundColor)) return true;
  if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
  if (hasVisibleBorder(cs)) return true;
  if (cs.boxShadow && cs.boxShadow !== 'none') return true;
  if (parsePx(cs.outlineWidth) > 0 && cs.outlineStyle !== 'none') return true;
  return false;
}

/** Check if ::before or ::after pseudo-elements carry paint. */
function checkPseudoPaint(el: HTMLElement): boolean {
  for (const pseudo of ['::before', '::after'] as const) {
    try {
      const cs = getComputedStyle(el, pseudo);
      // Pseudo-element only exists if content is set
      if (!cs.content || cs.content === 'none' || cs.content === 'normal') continue;
      if (hasPaintSignals(cs)) return true;
    } catch {
      // Some browsers may throw; ignore
    }
  }
  return false;
}

/**
 * Returns true if an element has any visible paint — including pseudo-elements.
 */
function isPaintedSurface(el: HTMLElement): boolean {
  const cs = getComputedStyle(el);
  if (hasPaintSignals(cs)) return true;
  if (checkPseudoPaint(el)) return true;
  return false;
}

// ── Surface paint data extraction ────────────────────────

interface SurfacePaint {
  tagName: string;
  backgroundColor: NormalizedColor;
  borderColor: NormalizedColor;
  borderWidth: string;
  borderWidthZero: boolean;
  borderRadius: string;
  boxShadow: string;
  outlineColor: NormalizedColor;
  outlineWidth: string;
  pseudoPaint: boolean;
}

function extractSurfacePaint(el: HTMLElement): SurfacePaint {
  const cs = getComputedStyle(el);
  return {
    tagName: el.tagName.toLowerCase(),
    backgroundColor: normalizeColor(cs.backgroundColor),
    borderColor: normalizeColor(cs.borderTopColor),
    borderWidth: formatBorderWidth(cs),
    borderWidthZero: isBorderWidthAllZero(cs),
    borderRadius: formatBorderRadius(cs),
    boxShadow: cs.boxShadow || 'none',
    outlineColor: normalizeColor(cs.outlineColor),
    outlineWidth: cs.outlineWidth || '0px',
    pseudoPaint: checkPseudoPaint(el),
  };
}

// ── Paint source resolution (ancestor + descendant) ──────

/**
 * Walk up the DOM to find the nearest ancestor with visible paint.
 * Stops at HTML/BODY, skips devmode elements.
 */
function findNearestPaintedAncestor(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node) {
    if (IGNORED_TAGS.has(node.tagName)) break;
    if (node.hasAttribute(OVERLAY_ATTR)) { node = node.parentElement; continue; }
    if (isPaintedSurface(node)) return node;
    node = node.parentElement;
  }
  return null;
}

/**
 * BFS to find the nearest (closest) painted descendant of root.
 * Skips devmode UI elements. Caps traversal at 300 nodes for perf.
 */
function findNearestPaintedDescendant(root: HTMLElement): HTMLElement | null {
  const queue: HTMLElement[] = [];
  let visited = 0;
  const MAX_NODES = 300;

  for (let i = 0; i < root.children.length; i++) {
    const c = root.children[i];
    if (c instanceof HTMLElement) queue.push(c);
  }

  while (queue.length > 0 && visited < MAX_NODES) {
    const el = queue.shift()!;
    visited++;
    if (el.hasAttribute(OVERLAY_ATTR)) continue;
    if (isPaintedSurface(el)) return el;
    for (let i = 0; i < el.children.length; i++) {
      const c = el.children[i];
      if (c instanceof HTMLElement) queue.push(c);
    }
  }
  return null;
}

interface PaintSources {
  selected: SurfacePaint;
  selectedIsPainted: boolean;
  ancestor: SurfacePaint | null;
  descendant: SurfacePaint | null;
  noPaintAnywhere: boolean;
}

function resolvePaintSources(el: HTMLElement): PaintSources {
  const selected = extractSurfacePaint(el);
  const selectedIsPainted = isPaintedSurface(el);

  let ancestor: SurfacePaint | null = null;
  let descendant: SurfacePaint | null = null;

  if (!selectedIsPainted) {
    const ancEl = findNearestPaintedAncestor(el);
    if (ancEl) ancestor = extractSurfacePaint(ancEl);

    const descEl = findNearestPaintedDescendant(el);
    if (descEl) descendant = extractSurfacePaint(descEl);
  }

  return {
    selected,
    selectedIsPainted,
    ancestor,
    descendant,
    noPaintAnywhere: !selectedIsPainted && !ancestor && !descendant,
  };
}

/** Extract normalized color info from any element (text color convenience). */
function extractColorsFromElement(el: HTMLElement): InspectedColors {
  const cs = getComputedStyle(el);
  return {
    color: normalizeColor(cs.color),
    backgroundColor: normalizeColor(cs.backgroundColor),
    borderColor: normalizeColor(cs.borderTopColor),
    borderWidthZero: isBorderWidthAllZero(cs),
    outlineColor: normalizeColor(cs.outlineColor),
  };
}

// ── Typography: deepest text element finder ──────────────

/** Returns true when `el` has at least one direct text node with non-whitespace content. */
function hasDirectTextContent(el: HTMLElement): boolean {
  for (let i = 0; i < el.childNodes.length; i++) {
    const n = el.childNodes[i];
    if (n.nodeType === Node.TEXT_NODE && n.textContent && n.textContent.trim().length > 0) return true;
  }
  return false;
}

/**
 * DFS to find the deepest descendant (or self) that directly renders text.
 * Skips empty wrappers and goes as deep as possible along the first text branch.
 */
function findDeepestTextElement(root: HTMLElement): HTMLElement | null {
  if (hasDirectTextContent(root)) return root;

  for (let i = 0; i < root.children.length; i++) {
    const c = root.children[i];
    if (c instanceof HTMLElement) {
      const found = findDeepestTextElement(c);
      if (found) return found;
    }
  }
  return null;
}

interface TypographyInfo {
  tagName: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

function extractTypography(el: HTMLElement): TypographyInfo {
  const cs = getComputedStyle(el);
  return {
    tagName: el.tagName.toLowerCase(),
    fontFamily: cs.fontFamily,
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    lineHeight: cs.lineHeight,
    letterSpacing: cs.letterSpacing,
  };
}

interface TypographyAnalysis {
  /** Typography from the actual text-rendering element (may be self or descendant). Null if no text found. */
  textEl: TypographyInfo | null;
  /** True if textEl is the selected element itself (no separate "inherited" section needed). */
  textIsSelf: boolean;
  /** Typography from the selected element itself (always populated). */
  selected: TypographyInfo;
}

function analyzeTypography(el: HTMLElement): TypographyAnalysis {
  const selected = extractTypography(el);
  const deepest = findDeepestTextElement(el);

  if (!deepest) {
    // No text content at all
    return { textEl: null, textIsSelf: false, selected };
  }

  if (deepest === el) {
    // The selected element itself is the text element
    return { textEl: selected, textIsSelf: true, selected };
  }

  // Different element — show both
  return { textEl: extractTypography(deepest), textIsSelf: false, selected };
}

// ── Computed style extraction ────────────────────────────

interface InspectedColors {
  color: NormalizedColor;
  backgroundColor: NormalizedColor;
  borderColor: NormalizedColor;
  borderWidthZero: boolean;
  outlineColor: NormalizedColor;
}

interface InspectedStyles {
  tagName: string;
  dataAttrs: string[];
  classList: string;
  // Colors (normalized)
  colors: InspectedColors;
  // Layout
  display: string;
  padding: string;
  margin: string;
  gap: string;
  // Borders
  borderWidth: string;
  borderStyle: string;
  borderRadius: string;
}

function extractStyles(el: HTMLElement): InspectedStyles {
  const cs = window.getComputedStyle(el);

  // data attributes
  const dataAttrs: string[] = [];
  for (const attr of Array.from(el.attributes)) {
    if (attr.name.startsWith('data-')) {
      dataAttrs.push(`${attr.name}="${attr.value}"`);
    }
  }

  return {
    tagName: el.tagName.toLowerCase(),
    dataAttrs,
    classList: el.className && typeof el.className === 'string'
      ? el.className.split(/\s+/).filter(Boolean).slice(0, 12).join(' ')
      : '',
    colors: extractColorsFromElement(el),
    display: cs.display,
    padding: formatPadding(cs),
    margin: formatMargin(cs),
    gap: cs.gap || 'normal',
    borderWidth: formatBorderWidth(cs),
    borderStyle: cs.borderStyle,
    borderRadius: formatBorderRadius(cs),
  };
}

// ── Copy helper ──────────────────────────────────────────

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCopy = useCallback(() => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      // Silently fail if copy is not available
    }
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      className="ml-[4px] px-[4px] py-[1px] rounded-[3px] border-none cursor-pointer text-[12px] leading-[18px] font-['Inter:Regular',sans-serif] transition-colors shrink-0"
      style={{
        background: copied ? '#E0F2E9' : '#F0F1F3',
        color: copied ? '#1A7F37' : '#60646C',
      }}
      title={`Copy ${label || value}`}
    >
      {copied ? 'Copied' : (label || 'Copy')}
    </button>
  );
}

// ── Inspector Panel ──────────────────────────────────────

function InspectorPanel({
  styles,
  element,
  onClear,
}: {
  styles: InspectedStyles;
  element: HTMLElement;
  onClear: () => void;
}) {
  const typo = analyzeTypography(element);

  // Resolve all paint sources: selected, ancestor, descendant
  const paint = resolvePaintSources(element);

  return (
    <div
      data-devmode=""
      className="fixed top-0 right-0 h-full w-[320px] bg-white border-l border-[#E0E1E6] overflow-y-auto"
      style={{ zIndex: 100001 }}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[#E0E1E6] bg-[#F9F9FB]">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[20px] text-[#1C2024]">
          Inspector
        </span>
        <button
          onClick={onClear}
          className="px-[8px] py-[2px] rounded-[4px] border border-[#E0E1E6] bg-white cursor-pointer text-[13px] leading-[18px] text-[#60646C] font-['Inter:Regular',sans-serif] hover:bg-[#F0F1F3] transition-colors"
        >
          Clear (Esc)
        </button>
      </div>

      {/* Element Info */}
      <Section title="Element">
        <Row label="Tag" value={`<${styles.tagName}>`} />
        {styles.dataAttrs.map((d, i) => (
          <Row key={i} label="Data" value={d} />
        ))}
        {styles.classList && (
          <div className="px-[16px] py-[4px]">
            <span className="text-[12px] leading-[18px] text-[#80838D] font-['Inter:Regular',sans-serif]">Classes</span>
            <p
              className="text-[13px] leading-[18px] text-[#1C2024] font-['Inter:Regular',sans-serif] mt-[2px] break-all"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {styles.classList}
            </p>
          </div>
        )}
      </Section>

      {/* ── Typography Sections ── */}
      {typo.textEl && !typo.textIsSelf && (
        /* PRIMARY: nearest text element (different from selected) */
        <Section title={`Typography — Nearest Text <${typo.textEl.tagName}>`}>
          <Row label="font-family" value={typo.textEl.fontFamily} copyable />
          <Row label="font-size" value={typo.textEl.fontSize} copyable />
          <Row label="font-weight" value={typo.textEl.fontWeight} copyable />
          <Row label="line-height" value={typo.textEl.lineHeight} copyable />
          <Row label="letter-spacing" value={typo.textEl.letterSpacing} copyable />
        </Section>
      )}

      {typo.textIsSelf ? (
        /* Selected element IS the text element — single section */
        <Section title="Typography (computed)">
          <Row label="font-family" value={typo.selected.fontFamily} copyable />
          <Row label="font-size" value={typo.selected.fontSize} copyable />
          <Row label="font-weight" value={typo.selected.fontWeight} copyable />
          <Row label="line-height" value={typo.selected.lineHeight} copyable />
          <Row label="letter-spacing" value={typo.selected.letterSpacing} copyable />
        </Section>
      ) : (
        /* SECONDARY: selected element's own (inherited) typography */
        <Section title={typo.textEl ? 'Typography — Selected Element (inherited)' : 'Typography (inherited)'}>
          {!typo.textEl && (
            <div className="px-[16px] py-[4px]">
              <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif]">
                No text content in selected element; showing inherited typography.
              </span>
            </div>
          )}
          <Row label="font-family" value={typo.selected.fontFamily} copyable />
          <Row label="font-size" value={typo.selected.fontSize} copyable />
          <Row label="font-weight" value={typo.selected.fontWeight} copyable />
          <Row label="line-height" value={typo.selected.lineHeight} copyable />
          <Row label="letter-spacing" value={typo.selected.letterSpacing} copyable />
        </Section>
      )}

      {/* ── Surface / Colors Sections ── */}

      {/* Surface — Selected (shown when selected element itself is painted) */}
      {paint.selectedIsPainted && (
        <Section title={`Surface — Selected <${paint.selected.tagName}>`}>
          <ColorRow label="background" color={paint.selected.backgroundColor} />
          <ColorRow
            label="border-color"
            color={paint.selected.borderColor}
            annotation={paint.selected.borderWidthZero ? '(border-width 0)' : undefined}
          />
          <Row label="border-width" value={paint.selected.borderWidth} />
          <Row label="border-radius" value={paint.selected.borderRadius} copyable />
          {paint.selected.boxShadow !== 'none' && (
            <Row label="box-shadow" value={paint.selected.boxShadow} copyable />
          )}
          <ColorRow label="outline-color" color={paint.selected.outlineColor} />
          {paint.selected.pseudoPaint && (
            <div className="px-[16px] py-[4px]">
              <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif]">
                Paint also detected on ::before / ::after pseudo-element.
              </span>
            </div>
          )}
        </Section>
      )}

      {/* Surface — Nearest Painted Ancestor (only when selected is unpainted) */}
      {!paint.selectedIsPainted && paint.ancestor && (
        <Section title={`Surface — Nearest Painted Ancestor <${paint.ancestor.tagName}>`}>
          <div className="px-[16px] py-[4px]">
            <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif]">
              Nearest painted ancestor above selected element.
            </span>
          </div>
          <ColorRow label="background" color={paint.ancestor.backgroundColor} />
          <ColorRow
            label="border-color"
            color={paint.ancestor.borderColor}
            annotation={paint.ancestor.borderWidthZero ? '(border-width 0)' : undefined}
          />
          <Row label="border-width" value={paint.ancestor.borderWidth} />
          <Row label="border-radius" value={paint.ancestor.borderRadius} copyable />
          {paint.ancestor.boxShadow !== 'none' && (
            <Row label="box-shadow" value={paint.ancestor.boxShadow} copyable />
          )}
          <ColorRow label="outline-color" color={paint.ancestor.outlineColor} />
          {paint.ancestor.pseudoPaint && (
            <div className="px-[16px] py-[4px]">
              <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif]">
                Paint also detected on ::before / ::after pseudo-element.
              </span>
            </div>
          )}
        </Section>
      )}

      {/* Surface — Nearest Painted Descendant (only when selected is unpainted) */}
      {!paint.selectedIsPainted && paint.descendant && (
        <Section title={`Surface — Nearest Painted Descendant <${paint.descendant.tagName}>`}>
          <div className="px-[16px] py-[4px]">
            <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif]">
              Nearest painted descendant inside selected element.
            </span>
          </div>
          <ColorRow label="background" color={paint.descendant.backgroundColor} />
          <ColorRow
            label="border-color"
            color={paint.descendant.borderColor}
            annotation={paint.descendant.borderWidthZero ? '(border-width 0)' : undefined}
          />
          <Row label="border-width" value={paint.descendant.borderWidth} />
          <Row label="border-radius" value={paint.descendant.borderRadius} copyable />
          {paint.descendant.boxShadow !== 'none' && (
            <Row label="box-shadow" value={paint.descendant.boxShadow} copyable />
          )}
          <ColorRow label="outline-color" color={paint.descendant.outlineColor} />
          {paint.descendant.pseudoPaint && (
            <div className="px-[16px] py-[4px]">
              <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif]">
                Paint also detected on ::before / ::after pseudo-element.
              </span>
            </div>
          )}
        </Section>
      )}

      {/* No paint found anywhere note */}
      {paint.noPaintAnywhere && (
        <Section title="Surface">
          <div className="px-[16px] py-[6px]">
            <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif]">
              No painted surface found (transparent through ancestors/descendants).
            </span>
          </div>
        </Section>
      )}

      {/* Text Color — always shown from selected element */}
      <Section title={paint.selectedIsPainted ? 'Text Color' : 'Colors — Selected Element'}>
        <ColorRow label="color" color={styles.colors.color} />
        {!paint.selectedIsPainted && (
          <>
            <ColorRow label="background" color={styles.colors.backgroundColor} />
            <ColorRow
              label="border-color"
              color={styles.colors.borderColor}
              annotation={styles.colors.borderWidthZero ? '(border-width 0)' : undefined}
            />
          </>
        )}
      </Section>

      {/* Layout / Spacing */}
      <Section title="Layout & Spacing">
        <Row label="display" value={styles.display} />
        <Row label="padding" value={styles.padding} copyable />
        <Row label="margin" value={styles.margin} copyable />
        <Row label="gap" value={styles.gap} />
      </Section>

      {/* Borders / Radius */}
      <Section title="Borders & Radius">
        <Row label="border-width" value={styles.borderWidth} />
        <Row label="border-style" value={styles.borderStyle} />
        <Row label="border-radius" value={styles.borderRadius} copyable />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#E0E1E6]">
      <div className="px-[16px] py-[8px] bg-[#FAFBFC]">
        <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[18px] text-[#80838D] tracking-[0.5px] uppercase">
          {title}
        </span>
      </div>
      <div className="py-[4px]">{children}</div>
    </div>
  );
}

function Row({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
  return (
    <div className="flex items-start justify-between px-[16px] py-[3px] gap-[8px]">
      <span className="text-[12px] leading-[18px] text-[#80838D] font-['Inter:Regular',sans-serif] shrink-0 min-w-[90px]">
        {label}
      </span>
      <div className="flex items-center gap-[2px] min-w-0">
        <span
          className="text-[13px] leading-[20px] text-[#1C2024] font-['Inter:Regular',sans-serif] truncate"
          title={value}
        >
          {value}
        </span>
        {copyable && <CopyButton value={value} />}
      </div>
    </div>
  );
}

function ColorRow({ label, color, annotation }: { label: string; color: NormalizedColor; annotation?: string }) {
  if (color.isTransparent) {
    return (
      <div className="flex items-center justify-between px-[16px] py-[3px] gap-[8px]">
        <span className="text-[12px] leading-[18px] text-[#80838D] font-['Inter:Regular',sans-serif] shrink-0 min-w-[90px]">
          {label}
        </span>
        <div className="flex items-center gap-[6px] min-w-0">
          {/* Checkerboard swatch for transparent */}
          <div
            className="w-[14px] h-[14px] rounded-[2px] border border-[#E0E1E6] shrink-0"
            style={{
              backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            }}
          />
          <span className="text-[13px] leading-[20px] text-[#80838D] font-['Inter:Regular',sans-serif]">
            Transparent
          </span>
          {annotation && (
            <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif] shrink-0">
              {annotation}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Determine what to display: if raw is already rgb(...), just show hex.
  // If raw is oklch/color/etc, show the raw value + hex.
  const isRawRgb = /^rgba?\(/.test(color.raw.trim());
  const showRawSeparately = !isRawRgb && color.raw !== color.hex;

  return (
    <div className="flex items-start justify-between px-[16px] py-[3px] gap-[8px]">
      <span className="text-[12px] leading-[18px] text-[#80838D] font-['Inter:Regular',sans-serif] shrink-0 min-w-[90px]">
        {label}
      </span>
      <div className="flex flex-col gap-[2px] min-w-0 items-end">
        {/* Row 1: swatch + hex + copy */}
        <div className="flex items-center gap-[6px]">
          <div
            className="w-[14px] h-[14px] rounded-[2px] border border-[#E0E1E6] shrink-0"
            style={{ backgroundColor: color.hex }}
          />
          <span className="text-[13px] leading-[20px] text-[#1C2024] font-['Inter:Regular',sans-serif] truncate" title={color.hex}>
            {color.hex}
          </span>
          <CopyButton value={color.hex} label="Hex" />
          {annotation && (
            <span className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif] shrink-0">
              {annotation}
            </span>
          )}
        </div>
        {/* Row 2: raw computed value (only if non-rgb, e.g. oklch) */}
        {showRawSeparately && (
          <div className="flex items-center gap-[6px]">
            <span
              className="text-[11px] leading-[16px] text-[#80838D] font-['Inter:Regular',sans-serif] truncate"
              title={color.raw}
            >
              {color.raw}
            </span>
            <CopyButton value={color.raw} label="Raw" />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Overlay Component ───────────────────────────────

export default function DevModeOverlay() {
  const { isEnabled, selectedElement, setSelectedElement } = useDevMode();
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [hoverRect, setHoverRect] = useState<Rect | null>(null);
  const [selectRect, setSelectRect] = useState<Rect | null>(null);
  const rafRef = useRef<number>(0);

  // Throttled hover update
  const updateHover = useCallback((el: HTMLElement | null) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (el) {
        setHoverRect(getRect(el));
        setHoveredElement(el);
      } else {
        setHoverRect(null);
        setHoveredElement(null);
      }
    });
  }, []);

  // Sync selection rect on scroll / resize
  useEffect(() => {
    if (!isEnabled || !selectedElement) return;
    const sync = () => {
      if (selectedElement.isConnected) {
        setSelectRect(getRect(selectedElement));
      } else {
        setSelectedElement(null);
        setSelectRect(null);
      }
    };
    sync();
    window.addEventListener('scroll', sync, true);
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync, true);
      window.removeEventListener('resize', sync);
    };
  }, [isEnabled, selectedElement, setSelectedElement]);

  // Document-level listeners (capture phase)
  useEffect(() => {
    if (!isEnabled) {
      setHoveredElement(null);
      setHoverRect(null);
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !(target instanceof HTMLElement)) return;
      if (shouldIgnore(target)) {
        updateHover(null);
        return;
      }
      updateHover(target);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !(target instanceof HTMLElement)) return;
      if (isDevModeElement(target)) return; // Don't intercept panel clicks
      if (shouldIgnore(target)) return;

      e.preventDefault();
      e.stopPropagation();

      setSelectedElement(target);
      setSelectRect(getRect(target));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedElement(null);
        setSelectRect(null);
      }
    };

    document.addEventListener('pointermove', onPointerMove, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointermove', onPointerMove, true);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isEnabled, updateHover, setSelectedElement]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isEnabled) return null;

  const showHover = hoverRect && hoveredElement !== selectedElement;
  const inspectedStyles = selectedElement ? extractStyles(selectedElement) : null;

  return createPortal(
    <div data-devmode="" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 100000 }}>
      {/* Hover highlight */}
      {showHover && (
        <div
          style={{
            position: 'fixed',
            top: hoverRect.top,
            left: hoverRect.left,
            width: hoverRect.width,
            height: hoverRect.height,
            outline: `2px solid ${DEV_INSPECTOR_OUTLINE}`,
            outlineOffset: '1px',
            pointerEvents: 'none',
            boxSizing: 'border-box',
          }}
        />
      )}

      {/* Selection highlight */}
      {selectRect && (
        <div
          style={{
            position: 'fixed',
            top: selectRect.top,
            left: selectRect.left,
            width: selectRect.width,
            height: selectRect.height,
            outline: `2px solid ${DEV_INSPECTOR_OUTLINE}`,
            outlineOffset: '1px',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            background: 'rgba(0, 145, 213, 0.06)',
          }}
        />
      )}

      {/* Inspector panel */}
      {inspectedStyles && (
        <div style={{ pointerEvents: 'auto' }}>
          <InspectorPanel
            styles={inspectedStyles}
            element={selectedElement!}
            onClear={() => {
              setSelectedElement(null);
              setSelectRect(null);
            }}
          />
        </div>
      )}
    </div>,
    document.body
  );
}