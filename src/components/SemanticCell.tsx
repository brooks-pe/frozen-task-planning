import { useState, useRef, useEffect } from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type SemanticState = 'error' | 'warning' | undefined;

export interface SemanticCellProps {
  /** The text value to display */
  value: string;
  /** Text alignment within the cell */
  align?: 'left' | 'right';
  /** Semantic state: error (blocking rule violation), warning (non-blocking attention) */
  semantic?: SemanticState;
  /** Tooltip text explaining the rule violation or warning */
  semanticTooltip?: string;
  /** Additional class names for the outer cell container */
  className?: string;
}

// ─── Token Definitions (WCAG-compliant) ─────────────────────────────────────

const SEMANTIC_TOKENS = {
  error: {
    text: '#B42318',      // red-700 equivalent — 5.5:1 on white
    bg: '#FEF3F2',        // red-50 equivalent — subtle tint
    icon: '#B42318',
  },
  warning: {
    text: '#B54708',      // amber-700 equivalent — 4.6:1 on white
    bg: '#FFFAEB',        // amber-50 equivalent — subtle tint
    icon: '#B54708',
  },
} as const;

// ─── SemanticCell Component ──────────────────────────────────────────────────
// Single-div cell that renders inline inside CSS Grid without extra wrappers.
// Tooltip is rendered as a fixed-position child, so it never creates extra grid items.

export function SemanticCell({
  value,
  align = 'left',
  semantic,
  semanticTooltip,
  className,
}: SemanticCellProps) {
  const tokens = semantic ? SEMANTIC_TOKENS[semantic] : null;
  const hasTooltip = !!(tokens && semanticTooltip);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  // Position tooltip relative to viewport
  useEffect(() => {
    if (tooltipVisible && cellRef.current && tooltipRef.current) {
      const cellRect = cellRef.current.getBoundingClientRect();
      const tipRect = tooltipRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gap = 8;
      const pad = 12;

      // Vertical: center on cell, clamp within viewport
      let top = cellRect.top + cellRect.height / 2 - tipRect.height / 2;
      top = Math.max(pad, Math.min(top, vh - tipRect.height - pad));

      // Horizontal: prefer right, flip left if needed
      let left: number;
      const rightPos = cellRect.right + gap;
      const leftPos = cellRect.left - gap - tipRect.width;

      if (rightPos + tipRect.width + pad <= vw) {
        left = rightPos;
      } else if (leftPos >= pad) {
        left = leftPos;
      } else {
        left = vw - tipRect.width - pad;
      }

      setTooltipPos({ top, left });
    }
  }, [tooltipVisible]);

  // Dismiss on click / route change
  useEffect(() => {
    if (!tooltipVisible) return;
    const dismiss = () => setTooltipVisible(false);
    window.addEventListener('click', dismiss);
    window.addEventListener('popstate', dismiss);
    return () => {
      window.removeEventListener('click', dismiss);
      window.removeEventListener('popstate', dismiss);
    };
  }, [tooltipVisible]);

  return (
    <div
      ref={cellRef}
      className={`flex items-center py-[12px] pl-[12px] border-b border-solid border-[rgba(0,0,47,0.15)] overflow-visible ${
        align === 'right' ? 'justify-end pr-[20px]' : 'pr-[12px]'
      } ${tokens ? 'gap-[6px]' : ''} ${hasTooltip ? 'cursor-help' : ''} ${className || ''}`}
      style={tokens ? { backgroundColor: tokens.bg } : undefined}
      onMouseEnter={hasTooltip ? () => setTooltipVisible(true) : undefined}
      onMouseLeave={hasTooltip ? () => setTooltipVisible(false) : undefined}
    >
      {tokens && (
        <span className="shrink-0 flex items-center" aria-hidden="true">
          {semantic === 'error' ? (
            <AlertTriangle size={14} color={tokens.icon} strokeWidth={2} />
          ) : (
            <AlertCircle size={14} color={tokens.icon} strokeWidth={2} />
          )}
        </span>
      )}
      <p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] overflow-hidden text-ellipsis whitespace-nowrap"
        style={tokens ? { color: tokens.text } : { color: '#1c2024' }}
      >
        {value}
      </p>

      {/* Viewport-safe tooltip — fixed position, never affects grid layout */}
      {hasTooltip && tooltipVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] bg-[#1c2024] text-white text-[12px] leading-[16px] px-[8px] py-[6px] rounded-[4px] shadow-lg pointer-events-none max-w-[320px] whitespace-normal"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
          }}
        >
          {semanticTooltip}
        </div>
      )}
    </div>
  );
}
