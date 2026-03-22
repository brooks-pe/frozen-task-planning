import React from 'react';

// ─── Canonical Appropriation Color Mapping ──────────────────────────────────
// Single source of truth for appropriation badge colors across SyncPoint.
// Add new appropriation codes here as they are introduced.

export const APPROPRIATION_COLORS: Record<string, { bg: string; text: string }> = {
  OMN:   { bg: '#99FFAD', text: '#1c2024' },
  OPN:   { bg: '#F3A977', text: '#1c2024' },
  RDTEN: { bg: '#F8FF94', text: '#1c2024' },
  SCN:   { bg: '#3DC3F0', text: '#1c2024' },
  UK:    { bg: '#D926FD', text: '#ffffff' },
  WPN:   { bg: '#F35858', text: '#ffffff' },
};

// Fallback neutral style for unmapped/unknown appropriation codes
const DEFAULT_BADGE = { bg: '#e8e8ec', text: '#1c2024' };

/**
 * Resolves the badge colors for a given appropriation code.
 * Normalizes input to uppercase and strips common suffixes (e.g., "O&MN" → "OMN").
 */
export function getAppropriationColors(code: string): { bg: string; text: string } {
  const normalized = code.toUpperCase().replace(/&/g, '').trim();
  return APPROPRIATION_COLORS[normalized] ?? DEFAULT_BADGE;
}

// ─── Reusable Badge Component ───────────────────────────────────────────────

interface AppropriationBadgeProps {
  /** The appropriation code (e.g., "RDTEN", "OPN", "OMN", "O&MN") */
  code: string;
  className?: string;
}

/**
 * Renders a small appropriation badge with the canonical color mapping.
 * Badge shape, padding, typography, and border radius match the existing
 * SyncPoint table badge pattern.
 */
export function AppropriationBadge({ code, className = '' }: AppropriationBadgeProps) {
  const { bg, text } = getAppropriationColors(code);

  return (
    <span
      className={`inline-flex items-center px-[9px] py-[3px] rounded-[5px] shrink-0 ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] uppercase whitespace-nowrap">
        {code}
      </span>
    </span>
  );
}