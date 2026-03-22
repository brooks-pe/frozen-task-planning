import { useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';

// ─── Sort Icon Components (Matching Performance Items Reference) ─────────

export function SortUpDownIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M12 5L8 9M12 5L16 9M12 19L8 15M12 19L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SortUpIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SortDownIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sort Indicator Component ────────────────────���───────────────────────

export function SortIndicator({ direction, inactiveColor }: { direction: SortDirection | null | undefined; inactiveColor?: string }) {
  const colorClass = direction ? 'text-[#004b72]' : (inactiveColor ? '' : 'text-[#b9bbc6]');
  const inlineStyle = (!direction && inactiveColor) ? { color: inactiveColor } : undefined;
  return (
    <span className={`shrink-0 flex items-center ${colorClass}`} style={inlineStyle}>
      {direction === 'asc' ? (
        <SortUpIcon />
      ) : direction === 'desc' ? (
        <SortDownIcon />
      ) : (
        <SortUpDownIcon />
      )}
    </span>
  );
}

// ─── Sort Hook ───────────────────────────────────────────────────────────
// Matches Performance Items reference: Click 1→Asc, Click 2→Desc, Click 3→Clear

export function useColumnSort<T extends string>() {
  const [sortColumn, setSortColumn] = useState<T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null);

  const handleSort = useCallback((column: T) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortColumn(null);
      setSortDirection(null);
    }
  }, [sortColumn, sortDirection]);

  const getDirection = useCallback(
    (column: T): SortDirection | null => {
      return sortColumn === column ? sortDirection : null;
    },
    [sortColumn, sortDirection]
  );

  return { sortColumn, sortDirection, handleSort, getDirection };
}

// ─── Utility Sort Functions ──────────────────────────────────────────────

export function parseCurrencyForSort(val: string): number {
  if (!val) return 0;
  const isNegative = val.includes('(') || val.includes('-');
  const cleaned = val.replace(/[$,()]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : isNegative ? -num : num;
}

export function parseDateForSort(val: string): number {
  if (!val) return 0;
  const parts = val.split('/');
  if (parts.length < 2) return 0;
  if (parts.length === 3) {
    const [m, d, y] = parts.map(Number);
    const fullYear = y < 100 ? 2000 + y : y;
    return new Date(fullYear, m - 1, d).getTime();
  }
  if (parts.length === 2) {
    const [m, y] = parts.map(Number);
    const fullYear = y < 100 ? 2000 + y : y;
    return new Date(fullYear, m - 1, 1).getTime();
  }
  return 0;
}

export function compareValues(
  a: string,
  b: string,
  type: 'string' | 'currency' | 'date',
  direction: SortDirection
): number {
  let result: number;
  if (type === 'currency') {
    result = parseCurrencyForSort(a) - parseCurrencyForSort(b);
  } else if (type === 'date') {
    result = parseDateForSort(a) - parseDateForSort(b);
  } else {
    result = (a ?? '').localeCompare(b ?? '');
  }
  return direction === 'asc' ? result : -result;
}