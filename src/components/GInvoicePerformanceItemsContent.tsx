import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import VersionDropdown from './VersionDropdown';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { Tooltip } from './Tooltip';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SemanticCell } from './SemanticCell';
import type { SemanticState } from './SemanticCell';
import { SearchIcon } from './InlineIcons';

// ─── Types ────────────────────────────────────────────────────────────────

interface PerformanceRow {
  id: string;
  performanceId: string;
  acrn: string;
  fundingSource: string;
  apprYear: string;
  totalFunded: string;
  previouslyInvoiced: string;
  invoiceDate: string;
  thisInvoiceAmount: string;
  cumulativeInvoice: string;
  erpStatus: string;
  approver: string;
  syncPointStatus: 'not-reviewed' | 'accepted' | 'rejected';
  statusTooltip?: string;
  hasDiscrepancy?: boolean;
  discrepancyTooltip?: string;
  /** Semantic state for the cumulative invoice cell */
  cumulativeSemantic?: SemanticState;
  /** Semantic state for the thisInvoiceAmount cell */
  invoiceAmountSemantic?: SemanticState;
  invoiceAmountTooltip?: string;
}

interface DocumentGroup {
  id: string;
  label: string;
  rows: PerformanceRow[];
}

// ─── Shared Grid Template ────────────────────────────────────────────────

const GRID_TEMPLATE_COLUMNS = '40px 1fr 94px 144px 104px 146px 130px 106px 126px 136px 128px 134px 290px 40px';

// ─── Data ───────────────────────────────────────────────────────────────

const documentGroups: DocumentGroup[] = [
  {
    id: 'doc-1',
    label: 'Document: N0002425GI00895 / Order Number: 02412-017-017-046404 — NSWC PC',
    rows: [
      {
        id: 'r1',
        performanceId: 'P2602-017-017-976372',
        acrn: 'AA',
        fundingSource: '1600/LM012',
        apprYear: '2025',
        totalFunded: '2,412,852.00',
        previouslyInvoiced: '1,967,839.00',
        invoiceDate: '2/3/26',
        thisInvoiceAmount: '49,522.41',
        cumulativeInvoice: '2,017,361.41',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'accepted',
        statusTooltip: 'Accepted by Brad Scott on 2/13/2026',
      },
      {
        id: 'r2',
        performanceId: 'P2602-017-017-976373',
        acrn: 'AB',
        fundingSource: '1600/LM016',
        apprYear: '2025',
        totalFunded: '2,004,328.00',
        previouslyInvoiced: '1,704,038.00',
        invoiceDate: '2/3/26',
        thisInvoiceAmount: '6,745.17',
        cumulativeInvoice: '1,710,783.17',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'not-reviewed',
      },
      {
        id: 'r3',
        performanceId: 'P2602-017-017-976374',
        acrn: 'AC',
        fundingSource: '1600/LM015',
        apprYear: '2025',
        totalFunded: '3,300,675.00',
        previouslyInvoiced: '1,404,563.00',
        invoiceDate: '2/3/26',
        thisInvoiceAmount: '',
        cumulativeInvoice: '',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'not-reviewed',
        hasDiscrepancy: true,
        discrepancyTooltip: 'Cumulative invoiced amount exceeds total funded by $1,03,773 (0.16%)',
        cumulativeSemantic: 'error' as SemanticState,
      },
      {
        id: 'r4',
        performanceId: 'P2602-017-017-976375',
        acrn: 'AD',
        fundingSource: '1600/LM017',
        apprYear: '2025',
        totalFunded: '644,400.00',
        previouslyInvoiced: '633,837.00',
        invoiceDate: '2/3/26',
        thisInvoiceAmount: '11,600.73',
        cumulativeInvoice: '645,437.73',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'not-reviewed',
        hasDiscrepancy: true,
        discrepancyTooltip: 'Cumulative invoiced amount exceeds total funded by $1,037.73 (0.16%)',
        cumulativeSemantic: 'error' as SemanticState,
      },
      {
        id: 'r5',
        performanceId: 'P2602-017-017-976376',
        acrn: 'AE',
        fundingSource: '1600/M008',
        apprYear: '2025',
        totalFunded: '750,839.00',
        previouslyInvoiced: '669,594.00',
        invoiceDate: '2/3/26',
        thisInvoiceAmount: '18,079.92',
        cumulativeInvoice: '687,673.92',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'not-reviewed',
      },
      {
        id: 'r6',
        performanceId: 'P2602-017-017-976363',
        acrn: 'AB',
        fundingSource: '1600/LM016',
        apprYear: '2025',
        totalFunded: '2,004,328.00',
        previouslyInvoiced: '1,710,783.17',
        invoiceDate: '2/4/26',
        thisInvoiceAmount: '(392.64)',
        cumulativeInvoice: '1,710,390.53',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'not-reviewed',
        invoiceAmountSemantic: 'warning' as SemanticState,
        invoiceAmountTooltip: 'Credit memo: negative invoice amount requires review before acceptance',
      },
    ],
  },
  {
    id: 'doc-2',
    label: 'Document: N0002425GI03239 / Order Number: 02503-017-017-088988 — NSWC PC',
    rows: [
      {
        id: 'r7',
        performanceId: 'P2602-017-017-976369',
        acrn: 'AA',
        fundingSource: '1600/MC002',
        apprYear: '2025',
        totalFunded: '510,620.00',
        previouslyInvoiced: '509,756.00',
        invoiceDate: '2/3/26',
        thisInvoiceAmount: '133.95',
        cumulativeInvoice: '509,889.95',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'not-reviewed',
      },
      {
        id: 'r8',
        performanceId: 'P2602-017-017-976370',
        acrn: 'AB',
        fundingSource: '1600/MC006',
        apprYear: '2025',
        totalFunded: '1,500,298.00',
        previouslyInvoiced: '449,712.00',
        invoiceDate: '2/3/26',
        thisInvoiceAmount: '30,418.75',
        cumulativeInvoice: '480,130.75',
        erpStatus: 'Performed',
        approver: 'Scott, Brad',
        syncPointStatus: 'not-reviewed',
      },
    ],
  },
];

// ─── Sort Types & Utilities ──────────────────────────────────────────────

type SortableColumn =
  | 'performanceId'
  | 'acrn'
  | 'fundingSource'
  | 'apprYear'
  | 'totalFunded'
  | 'previouslyInvoiced'
  | 'invoiceDate'
  | 'thisInvoiceAmount'
  | 'cumulativeInvoice'
  | 'erpStatus'
  | 'approver';

type SortDirection = 'asc' | 'desc';

const NUMERIC_SORT_COLUMNS: SortableColumn[] = [
  'totalFunded',
  'previouslyInvoiced',
  'thisInvoiceAmount',
  'cumulativeInvoice',
];

const DATE_SORT_COLUMNS: SortableColumn[] = ['invoiceDate'];

function parseCurrencyForSort(val: string): number {
  if (!val) return 0;
  const isNegative = val.includes('(');
  const cleaned = val.replace(/[$,()]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : isNegative ? -num : num;
}

function parseDateForSort(val: string): number {
  if (!val) return 0;
  const parts = val.split('/');
  if (parts.length !== 3) return 0;
  const [m, d, y] = parts.map(Number);
  const fullYear = y < 100 ? 2000 + y : y;
  return new Date(fullYear, m - 1, d).getTime();
}

function compareRows(
  a: PerformanceRow,
  b: PerformanceRow,
  column: SortableColumn,
  direction: SortDirection
): number {
  let result: number;
  if (NUMERIC_SORT_COLUMNS.includes(column)) {
    result =
      parseCurrencyForSort(a[column]) - parseCurrencyForSort(b[column]);
  } else if (DATE_SORT_COLUMNS.includes(column)) {
    result = parseDateForSort(a[column]) - parseDateForSort(b[column]);
  } else {
    result = (a[column] ?? '').localeCompare(b[column] ?? '');
  }
  return direction === 'asc' ? result : -result;
}

// ─── Sort Icon Components ────────────────────────────────────────────────

function ArrowUpDownIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M12 5L8 9M12 5L16 9M12 19L8 15M12 19L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Inline Icons ────────────────────────────────────────────────────────

function ChevronDownIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronsUpIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M12 11L8 7L4 11M12 5L8 1L4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronsDownIcon({ className }: { className?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 5L8 9L12 5M4 11L8 15L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KebabIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="3" r="1" fill="#1C2024" />
      <circle cx="8" cy="8" r="1" fill="#1C2024" />
      <circle cx="8" cy="13" r="1" fill="#1C2024" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <path d="M19 4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM16 2V6M8 2V6M3 10H21" stroke="rgba(0,7,20,0.62)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ImportIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M14 10V12.67A1.33 1.33 0 0112.67 14H3.33A1.33 1.33 0 012 12.67V10M4.67 6.67L8 10L11.33 6.67M8 10V2" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Segmented Control ───────────────────────────────────────────────────

function SegmentedControl({
  label,
  options,
  selected,
  onChange,
  hideLabel,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0">
      {!hideLabel && (
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">
          {label}
        </p>
      )}
      <div
        className="inline-flex w-fit h-[32px] items-center rounded-[4px] shrink-0 bg-[#F5F5F7] border border-solid border-[#CDCED6] p-[2px] overflow-hidden box-border"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`flex box-border h-full items-center justify-center px-[12px] rounded-[3px] cursor-pointer transition-colors duration-150 border-none whitespace-nowrap ${
                isSelected
                  ? 'bg-[#DDEEF6] shadow-[inset_0_0_0_1px_#80BBDA]'
                  : 'bg-transparent hover:bg-[rgba(255,255,255,0.5)]'
              }`}
            >
              <span
                className={`font-['Inter:${isSelected ? 'Medium' : 'Regular'}',sans-serif] ${
                  isSelected ? 'font-medium' : 'font-normal'
                } leading-[20px] not-italic text-[14px] ${
                  isSelected ? 'text-[#004B72]' : 'text-[#1C2024]'
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Inline Checkbox Group (filter) ──────────────────────────────────────

function InlineCheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}) {
  const toggle = (value: string) => {
    const next = new Set(selected);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">
        {label}
      </p>
      <div className="flex gap-[16px] items-center h-[32px]" role="group" aria-label={label}>
        {options.map((option) => {
          const checked = selected.has(option.value);
          return (
            <label
              key={option.value}
              className="flex items-center gap-[6px] cursor-pointer select-none"
            >
              <span
                className={`flex items-center justify-center w-[16px] h-[16px] rounded-[3px] border border-solid transition-colors ${
                  checked
                    ? 'bg-[#004B72] border-[#004B72]'
                    : 'bg-white border-[#b9bbc6] hover:border-[#80838d]'
                }`}
                aria-hidden="true"
              >
                {checked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option.value)}
                className="sr-only"
                aria-label={option.label}
              />
              <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1C2024] text-[14px]">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// ─── Row Status Segmented Control (inline in table) ──────────────────────

function RowStatusControl({
  status,
  rowId,
  statusTooltip,
  onChange,
}: {
  status: 'not-reviewed' | 'accepted' | 'rejected';
  rowId: string;
  statusTooltip?: string;
  onChange: (rowId: string, status: 'not-reviewed' | 'accepted' | 'rejected') => void;
}) {
  const options: { value: 'not-reviewed' | 'accepted' | 'rejected'; label: string }[] = [
    { value: 'not-reviewed', label: 'Not Reviewed' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  return (
    <div
      className="inline-flex items-center rounded-[4px] bg-[#F5F5F7] border border-solid border-[#CDCED6] p-[2px]"
      role="radiogroup"
      aria-label="SyncPoint Status"
    >
      {options.map((option) => {
        const isSelected = status === option.value;
        const btn = (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(rowId, option.value)}
            className={`px-[8px] py-[2px] rounded-[3px] cursor-pointer transition-colors duration-150 text-[12px] font-['Inter:${isSelected ? 'Medium' : 'Regular'}',sans-serif] ${isSelected ? 'font-medium' : 'font-normal'} leading-[16px] not-italic whitespace-nowrap border-none ${
              isSelected
                ? 'bg-[#DDEEF6] shadow-[inset_0_0_0_1px_#80BBDA] text-[#004B72]'
                : 'bg-transparent hover:bg-[rgba(255,255,255,0.5)] text-[#1C2024]'
            }`}
          >
            {option.label}
          </button>
        );

        if (isSelected && statusTooltip) {
          return (
            <Tooltip key={option.value} content={statusTooltip}>
              {btn}
            </Tooltip>
          );
        }

        return btn;
      })}
    </div>
  );
}

// ─── Kebab Menu ──────────────────────────────────────────────────────────

function KebabMenu({ rowId, onViewStatusHistory }: { rowId: string; onViewStatusHistory: (rowId: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-[32px] h-[32px] rounded-[4px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors bg-transparent border-none"
        aria-label="Row actions"
      >
        <KebabIcon />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-[2px] bg-white rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[#CDCED6] z-50 min-w-[180px]">
          <div className="p-[8px]">
            <button
              onClick={() => {
                setIsOpen(false);
                onViewStatusHistory(rowId);
              }}
              className="w-full text-left bg-white hover:bg-[#e8e9ec] rounded-[4px] px-[12px] py-[8px] cursor-pointer transition-colors border-none font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]"
            >
              View Status History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Status History Modal ─────────────────────────────────────────────────

interface StatusHistoryEntry {
  status: 'not-reviewed' | 'accepted' | 'rejected';
  changedBy: string;
  dateTime: string;
  comment?: string;
}

const SAMPLE_STATUS_HISTORY: StatusHistoryEntry[] = [
  {
    status: 'accepted',
    changedBy: 'Scott, Brad',
    dateTime: '02/03/2026 14:32',
    comment: 'Validated invoice amount.',
  },
  {
    status: 'not-reviewed',
    changedBy: 'System',
    dateTime: '02/02/2026 09:14',
  },
  {
    status: 'rejected',
    changedBy: 'Miller, Sarah',
    dateTime: '02/01/2026 11:05',
    comment: 'Incorrect ACRN applied.',
  },
  {
    status: 'accepted',
    changedBy: 'Thompson, David',
    dateTime: '01/28/2026 16:45',
    comment: 'Confirmed funding source alignment.',
  },
  {
    status: 'not-reviewed',
    changedBy: 'System',
    dateTime: '01/25/2026 08:00',
    comment: 'Record created via ERP sync.',
  },
];

function StatusPill({ status }: { status: 'not-reviewed' | 'accepted' | 'rejected' }) {
  const labels: Record<string, string> = {
    'not-reviewed': 'Not Reviewed',
    accepted: 'Accepted',
    rejected: 'Rejected',
  };
  return (
    <span className="inline-flex items-center px-[8px] py-[2px] rounded-[3px] text-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic whitespace-nowrap bg-[rgba(0,179,238,0.12)] border border-solid border-[rgba(0,133,191,0.62)] text-[#1C2024]">
      {labels[status]}
    </span>
  );
}

function StatusHistoryModal({
  isOpen,
  onClose,
  performanceId,
}: {
  isOpen: boolean;
  onClose: () => void;
  performanceId: string;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          className="bg-white relative rounded-[12px] w-[600px] max-w-[90vw] max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col max-h-[inherit] max-w-[inherit] overflow-clip rounded-[inherit]">
            {/* Header */}
            <div className="shrink-0 px-[24px] pt-[24px] pb-[16px] flex items-start justify-between">
              <div className="flex flex-col gap-[4px]">
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#1C2024] text-[20px] tracking-[-0.08px]">
                  Status History
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[rgba(0,7,20,0.62)] text-[14px]">
                  Performance ID: {performanceId}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-[32px] h-[32px] rounded-[4px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors bg-transparent border-none shrink-0 mt-[2px]"
                aria-label="Close"
              >
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="#60646C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="shrink-0 h-px bg-[#D9D9E0] mx-[24px]" />

            {/* Body (scrollable) */}
            <div className="flex-1 overflow-y-auto px-[24px] py-[24px]">
              <div className="flex flex-col">
                {SAMPLE_STATUS_HISTORY.map((entry, index) => (
                  <div key={index}>
                    <div className="flex flex-col gap-[8px] py-[16px]">
                      <div className="flex items-center gap-[12px]">
                        <StatusPill status={entry.status} />
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[rgba(0,7,20,0.62)] text-[14px]">
                          {entry.changedBy}
                        </span>
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[rgba(0,7,20,0.42)] text-[14px]">
                          {entry.dateTime}
                        </span>
                      </div>
                      {entry.comment && (
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1C2024] text-[14px] whitespace-pre-wrap pl-[2px]">
                          &ldquo;{entry.comment}&rdquo;
                        </p>
                      )}
                    </div>
                    {index < SAMPLE_STATUS_HISTORY.length - 1 && (
                      <div className="h-px bg-[rgba(0,0,47,0.09)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="shrink-0 h-px bg-[#D9D9E0] mx-[24px]" />

            {/* Footer */}
            <div className="shrink-0 px-[24px] py-[16px] flex items-center justify-end">
              <button
                onClick={onClose}
                className="bg-[#004B72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors border-none"
              >
                <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-white whitespace-nowrap">
                  Close
                </span>
              </button>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_16px_36px_-20px_rgba(0,6,46,0.2),0px_16px_64px_0px_rgba(0,0,85,0.02),0px_12px_60px_0px_rgba(0,0,0,0.15)]" />
        </div>
      </div>
    </>
  );
}

// ─── Filter Dropdown ─────────────────────────────────────────────────────

function FilterDropdown({
  label,
  value,
  width = 167,
  options,
  onChange,
}: {
  label: string;
  value: string;
  width?: number;
  options?: string[];
  onChange?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInteractive = !!(options && onChange);

  useEffect(() => {
    if (!isInteractive || !isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isInteractive, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isInteractive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0 relative" style={{ width }} ref={ref}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">
        {label}
      </p>
      <div
        className="bg-white h-[32px] relative rounded-[4px] w-full cursor-pointer"
        onClick={isInteractive ? () => setIsOpen((prev) => !prev) : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? 'button' : undefined}
        aria-haspopup={isInteractive ? 'listbox' : undefined}
        aria-expanded={isInteractive ? isOpen : undefined}
        aria-label={isInteractive ? `${label}: ${value}` : undefined}
      >
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="flex items-center justify-between px-[12px] size-full">
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] overflow-hidden text-ellipsis whitespace-nowrap ${
              value ? 'text-[#1C2024]' : 'text-[#80838d]'
            }`}>
              {value || 'Select...'}
            </p>
            <ChevronDownIcon size={16} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      {isInteractive && isOpen && (
        <div
          className="absolute left-0 top-full mt-[4px] z-50 bg-white rounded-[8px] border border-solid border-[#CDCED6] py-[4px] w-[200px] max-h-[280px] overflow-y-auto"
          style={{ boxShadow: '0px 8px 24px -8px rgba(0,9,50,0.12), 0px 8px 40px 0px rgba(0,0,0,0.08)' }}
          role="listbox"
        >
          {options.map((option, idx) => {
            const isSelected = value === option;
            return (
              <button
                key={`${option}-${idx}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-[12px] py-[8px] border-none cursor-pointer transition-colors font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] not-italic ${
                  isSelected
                    ? 'bg-[rgba(0,179,238,0.08)] text-[#1C2024]'
                    : 'bg-white text-[#1C2024] hover:bg-[#f0f0f3]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Date Helpers ────────────────────────────────────────────────────────

function parseMDY(str: string): Date {
  const [m, d, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d);
}

function formatMDY(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// ─── Quick Set Types & Logic ─────────────────────────────────────────────

type QuickSetOption =
  | 'last-7-days'
  | 'last-30-days'
  | 'last-90-days'
  | 'this-month'
  | 'last-month'
  | 'month-to-date'
  | 'fiscal-year-to-date'
  | 'custom-range';

const QUICK_SET_OPTIONS: { value: QuickSetOption; label: string }[] = [
  { value: 'last-7-days', label: 'Last 7 Days' },
  { value: 'last-30-days', label: 'Last 30 Days' },
  { value: 'last-90-days', label: 'Last 90 Days' },
  { value: 'this-month', label: 'This Month' },
  { value: 'last-month', label: 'Last Month' },
  { value: 'month-to-date', label: 'Month to Date' },
  { value: 'fiscal-year-to-date', label: 'Fiscal Year to Date' },
  { value: 'custom-range', label: 'Custom Range' },
];

function getQuickSetLabel(value: QuickSetOption | ''): string {
  if (value === '') return '';
  return QUICK_SET_OPTIONS.find((o) => o.value === value)?.label ?? value;
}



function computeQuickSetDates(option: QuickSetOption): { start: string; end: string } | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();

  switch (option) {
    case 'last-7-days': {
      const start = new Date(y, m, d - 7);
      return { start: formatMDY(start), end: formatMDY(today) };
    }
    case 'last-30-days': {
      const start = new Date(y, m, d - 30);
      return { start: formatMDY(start), end: formatMDY(today) };
    }
    case 'last-90-days': {
      const start = new Date(y, m, d - 90);
      return { start: formatMDY(start), end: formatMDY(today) };
    }
    case 'this-month': {
      const start = new Date(y, m, 1);
      const end = new Date(y, m + 1, 0);
      return { start: formatMDY(start), end: formatMDY(end) };
    }
    case 'last-month': {
      const start = new Date(y, m - 1, 1);
      const end = new Date(y, m, 0);
      return { start: formatMDY(start), end: formatMDY(end) };
    }
    case 'month-to-date': {
      const start = new Date(y, m, 1);
      return { start: formatMDY(start), end: formatMDY(today) };
    }
    case 'fiscal-year-to-date': {
      // Federal FY starts October 1
      const fyStartYear = m >= 9 ? y : y - 1;
      const start = new Date(fyStartYear, 9, 1);
      return { start: formatMDY(start), end: formatMDY(today) };
    }
    case 'custom-range':
      return null;
  }
}

// ─── Quick Set Dropdown ──────────────────────────────────────────────────

function QuickSetDropdown({
  value,
  onChange,
}: {
  value: QuickSetOption | '';
  onChange: (option: QuickSetOption) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0 w-[167px] relative" ref={ref}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">
        Quick Set
      </p>
      <div
        className="bg-white h-[32px] relative rounded-[4px] w-full cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Quick Set: ${value ? getQuickSetLabel(value) : 'Select...'}`}
      >
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="flex items-center justify-between px-[12px] size-full">
            <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] overflow-hidden text-ellipsis whitespace-nowrap ${
              value ? 'text-[#1C2024]' : 'text-[#80838d]'
            }`}>
              {value ? getQuickSetLabel(value) : 'Select...'}
            </p>
            <ChevronDownIcon size={16} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-[4px] z-50 bg-white rounded-[8px] border border-solid border-[#CDCED6] py-[4px] w-[200px]"
          style={{ boxShadow: '0px 8px 24px -8px rgba(0,9,50,0.12), 0px 8px 40px 0px rgba(0,0,0,0.08)' }}
          role="listbox"
        >
          {QUICK_SET_OPTIONS.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-[12px] py-[8px] border-none cursor-pointer transition-colors font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] not-italic ${
                  isSelected
                    ? 'bg-[rgba(0,179,238,0.08)] text-[#1C2024]'
                    : 'bg-white text-[#1C2024] hover:bg-[#f0f0f3]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Calendar Popover ──────��─────────────────────────────────────────────

function CalendarPopover({
  selected,
  minDate,
  maxDate,
  onSelect,
  onClose,
}: {
  selected: Date;
  minDate?: Date;
  maxDate?: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}) {
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDisabled = (day: number): boolean => {
    const d = new Date(viewYear, viewMonth, day);
    if (minDate) {
      const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      if (d < min) return true;
    }
    if (maxDate) {
      const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      if (d > max) return true;
    }
    return false;
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      ref={popoverRef}
      className="absolute left-0 top-full mt-[4px] z-50 bg-white rounded-[8px] border border-solid border-[#CDCED6] p-[12px] w-[252px]"
      style={{ boxShadow: '0px 8px 24px -8px rgba(0,9,50,0.12), 0px 8px 40px 0px rgba(0,0,0,0.08)' }}
    >
      {/* Month / Year navigation */}
      <div className="flex items-center justify-between mb-[8px]">
        <button
          onClick={prevMonth}
          className="flex items-center justify-center w-[28px] h-[28px] rounded-[4px] cursor-pointer bg-transparent border-none hover:bg-[#f0f0f3] transition-colors"
          aria-label="Previous month"
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="#60646C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="flex items-center justify-center w-[28px] h-[28px] rounded-[4px] cursor-pointer bg-transparent border-none hover:bg-[#f0f0f3] transition-colors"
          aria-label="Next month"
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#60646C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-[4px]">
        {DAY_HEADERS.map((d, i) => (
          <div key={i} className="flex items-center justify-center h-[28px]">
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic text-[#80838d] text-[11px]">
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="h-[32px]" />;
          }
          const thisDate = new Date(viewYear, viewMonth, day);
          const isSelected = isSameDay(thisDate, selected);
          const isToday = isSameDay(thisDate, new Date());
          const disabled = isDisabled(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => {
                if (!disabled) onSelect(thisDate);
              }}
              className={`flex items-center justify-center h-[32px] w-full rounded-[4px] border-none cursor-pointer transition-colors font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[16px] not-italic ${
                disabled
                  ? 'text-[#c8c9cd] cursor-not-allowed bg-transparent'
                  : isSelected
                  ? 'bg-[#004B72] text-white'
                  : isToday
                  ? 'bg-[rgba(0,179,238,0.08)] text-[#1C2024] hover:bg-[rgba(0,179,238,0.16)]'
                  : 'bg-transparent text-[#1C2024] hover:bg-[#f0f0f3]'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Date Field (Interactive) ───���────────────────────────────────────────

function DateField({
  label,
  value,
  onChange,
  minDate,
  maxDate,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasValue = value !== '';
  const selectedDate = hasValue ? parseMDY(value) : new Date();

  const handleSelect = (date: Date) => {
    onChange?.(formatMDY(date));
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0 w-[167px] relative" ref={wrapperRef}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">
        {label}
      </p>
      <div
        className="bg-white h-[32px] relative rounded-[4px] w-full cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${label}: ${hasValue ? value : 'MM/DD/YYYY'}. Click to open calendar.`}
        aria-expanded={isOpen}
      >
        <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center size-full">
          <div className="flex items-center px-[4px] size-full">
            <div className="flex-1 h-full flex items-center">
              <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px] px-[4px] ${
                hasValue ? 'text-[#1C2024]' : 'text-[#80838d]'
              }`}>
                {hasValue ? value : 'MM/DD/YYYY'}
              </p>
            </div>
            <div className="flex h-full items-center shrink-0">
              <CalendarIcon />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <CalendarPopover
          selected={selectedDate}
          minDate={minDate}
          maxDate={maxDate}
          onSelect={handleSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────

export default function GInvoicePerformanceItemsContent() {
  // Expansion state: all document groups default to expanded
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(
    new Set(documentGroups.map((d) => d.id))
  );
  const [searchValue, setSearchValue] = useState('');
  const [rowStatuses, setRowStatuses] = useState<Record<string, 'not-reviewed' | 'accepted' | 'rejected'>>(() => {
    const initial: Record<string, 'not-reviewed' | 'accepted' | 'rejected'> = {};
    documentGroups.forEach((doc) => {
      doc.rows.forEach((row) => {
        initial[row.id] = row.syncPointStatus;
      });
    });
    return initial;
  });

  // Filter state (checkbox groups)
  const [erpStatusFilter, setErpStatusFilter] = useState<Set<string>>(() => new Set(['performed', 'accepted']));
  const [syncPointStatusFilter, setSyncPointStatusFilter] = useState<Set<string>>(() => new Set(['not-reviewed', 'accepted']));
  const [massChangeSelection, setMassChangeSelection] = useState('');

  // Status History Modal state
  const [statusHistoryRowId, setStatusHistoryRowId] = useState<string | null>(null);

  // Single-row selection state
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  // Resolve the performanceId for the modal
  const statusHistoryPerformanceId = (() => {
    if (!statusHistoryRowId) return '';
    for (const doc of documentGroups) {
      for (const row of doc.rows) {
        if (row.id === statusHistoryRowId) return row.performanceId;
      }
    }
    return '';
  })();

  // Filter dropdown state
  const [activityFilter, setActivityFilter] = useState('NSWC PC');
  const [appropriationFilter, setAppropriationFilter] = useState('OPN');
  const [apprYearFilter, setApprYearFilter] = useState('2025');
  const [fundingSourceFilter, setFundingSourceFilter] = useState('All');
  const [erpApproverFilter, setErpApproverFilter] = useState('Scott, Brad');
  const [syncPointReviewerFilter, setSyncPointReviewerFilter] = useState('Any Reviewer');

  // Date filter state
  const [quickSet, setQuickSet] = useState<QuickSetOption | ''>('last-30-days');
  const [startDate, setStartDate] = useState(() => {
    const dates = computeQuickSetDates('last-30-days');
    return dates ? dates.start : '1/18/2026';
  });
  const [endDate, setEndDate] = useState(() => {
    const dates = computeQuickSetDates('last-30-days');
    return dates ? dates.end : '2/17/2026';
  });

  const startDateObj = startDate ? parseMDY(startDate) : undefined;
  const endDateObj = endDate ? parseMDY(endDate) : undefined;

  // Manual date change → switch Quick Set to Custom Range
  const handleManualStartDate = (value: string) => {
    setStartDate(value);
    setQuickSet('custom-range');
  };

  const handleManualEndDate = (value: string) => {
    setEndDate(value);
    setQuickSet('custom-range');
  };

  // Quick Set selection → compute and update both dates
  const handleQuickSetChange = (option: QuickSetOption) => {
    setQuickSet(option);
    const dates = computeQuickSetDates(option);
    if (dates) {
      setStartDate(dates.start);
      setEndDate(dates.end);
    }
  };

  // Clear Filters → reset all filter inputs to empty/placeholder state
  const handleClearFilters = () => {
    // Date pickers
    setStartDate('');
    setEndDate('');
    // Quick Set
    setQuickSet('');
    // Dropdown filters
    setActivityFilter('');
    setAppropriationFilter('');
    setApprYearFilter('');
    setFundingSourceFilter('');
    setErpApproverFilter('');
    setSyncPointReviewerFilter('');
    // Checkbox groups — reset to defaults
    setErpStatusFilter(new Set(['performed', 'accepted']));
    setSyncPointStatusFilter(new Set(['not-reviewed', 'accepted']));
  };

  const allExpanded = expandedDocs.size === documentGroups.length;

  const toggleDoc = (docId: string) => {
    setExpandedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedDocs(new Set());
    } else {
      setExpandedDocs(new Set(documentGroups.map((d) => d.id)));
    }
  };

  const handleStatusChange = (rowId: string, status: 'not-reviewed' | 'accepted' | 'rejected') => {
    setRowStatuses((prev) => ({ ...prev, [rowId]: status }));
  };

  // Mass Change: update all visible rows + trigger column pulse
  const [statusColumnPulse, setStatusColumnPulse] = useState(false);
  const pulseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMassChange = (value: string) => {
    setMassChangeSelection(value);
    if (value === 'not-reviewed' || value === 'accepted' || value === 'rejected') {
      setRowStatuses((prev) => {
        const next = { ...prev };
        documentGroups.forEach((doc) => {
          if (expandedDocs.has(doc.id)) {
            doc.rows.forEach((row) => {
              next[row.id] = value;
            });
          }
        });
        return next;
      });
      // Trigger pulse animation
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      setStatusColumnPulse(true);
      pulseTimeoutRef.current = setTimeout(() => setStatusColumnPulse(false), 600);
    }
  };

  // ─── Column Sorting ─────────────────────────────────────────────────────
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null);
  const [sortFlash, setSortFlash] = useState(false);
  const sortFlashRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSort = useCallback((column: SortableColumn) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortColumn(null);
      setSortDirection(null);
    }
    // Expand all docs on sort
    setExpandedDocs(new Set(documentGroups.map((d) => d.id)));
    // Flash animation
    if (sortFlashRef.current) clearTimeout(sortFlashRef.current);
    setSortFlash(true);
    sortFlashRef.current = setTimeout(() => setSortFlash(false), 300);
  }, [sortColumn, sortDirection]);

  const getSortedRows = useCallback(
    (rows: PerformanceRow[]): PerformanceRow[] => {
      if (!sortColumn || !sortDirection) return rows;
      return [...rows].sort((a, b) =>
        compareRows(a, b, sortColumn, sortDirection)
      );
    },
    [sortColumn, sortDirection]
  );

  return (
    <div className="flex flex-col items-start p-[24px] w-full">
      {/* Version Bar */}
      <div className="flex items-start justify-between overflow-clip pb-[12px] w-full">
        <VersionDropdown />
        <div className="flex gap-[24px] items-start shrink-0">
          <button className="bg-[#004B72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer border-none hover:bg-[#003a57] transition-colors">
            <ImportIcon />
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-white whitespace-nowrap">
              Import Performance Data
            </span>
          </button>
          <button className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer border-none hover:bg-[#f5f5f5] transition-colors">
            <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px] whitespace-nowrap">
              Export
            </span>
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-[12px] items-start py-[16px] w-full relative">
        <div aria-hidden="true" className="absolute border-[#004B72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <div className="flex flex-col gap-[4px] items-start w-full">
          <h1 className="font-['Inter',sans-serif] font-semibold leading-[40px] not-italic text-[#1C2024] text-[32px] tracking-[0px]">
            G-Invoicing Reports
          </h1>
          <p className="font-['Inter',sans-serif] font-medium leading-[24px] not-italic text-[#60646C] text-[18px] tracking-[0px]">
            Review G-Invoicing reports and invoice performance data.
          </p>
        </div>
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Execution Planning', path: '/execution-planning/dashboard' },
          { label: 'G-Invoicing Reports' },
        ]} />
      </div>

      {/* Filters Card */}
      <CollapsibleFilterSection className="mt-[24px]" highContrast>
            <div className="flex flex-wrap gap-[16px] items-end">
              <DateField label="Invoice Date Range Start" value={startDate} onChange={handleManualStartDate} maxDate={endDateObj} />
              <DateField label="Invoice Date Range End" value={endDate} onChange={handleManualEndDate} minDate={startDateObj} />
              <QuickSetDropdown value={quickSet} onChange={handleQuickSetChange} />
              <FilterDropdown
                label="Activity"
                value={activityFilter}
                onChange={setActivityFilter}
                options={[
                  'All',
                  'Booz Allen Hamilton',
                  'Lockheed Martin',
                  'Northrop Grumman',
                  'DLA',
                  'PMS 420',
                  'PMS 495',
                  'PMS 501',
                  'NSWC Carderock',
                  'NSWC PC',
                  'NSWC PHD',
                ]}
              />
              <FilterDropdown
                label="Appropriation"
                value={appropriationFilter}
                onChange={setAppropriationFilter}
                options={['All', 'OMN', 'OPN', 'RDTEN', 'SCN', 'UK', 'WPN']}
              />
              <FilterDropdown
                label="Appropriation Year"
                value={apprYearFilter}
                onChange={setApprYearFilter}
                options={['All', '2026', '2025', '2024', '2023', '2022', '2021']}
              />
              <FilterDropdown
                label="Funding Source"
                value={fundingSourceFilter}
                onChange={setFundingSourceFilter}
                options={[
                  'All',
                  '1600/LM012',
                  '1600/LM016',
                  '1600/LM015',
                  '1600/LM017',
                  '1600/M008',
                  '1600/LM016',
                  '1600/MC002',
                  '1600/MC006',
                ]}
              />
              <InlineCheckboxGroup
                label="ERP Status"
                options={[
                  { value: 'performed', label: 'Performed' },
                  { value: 'accepted', label: 'Accepted' },
                ]}
                selected={erpStatusFilter}
                onChange={setErpStatusFilter}
              />
              <InlineCheckboxGroup
                label="SyncPoint Status"
                options={[
                  { value: 'not-reviewed', label: 'Not Reviewed' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
                selected={syncPointStatusFilter}
                onChange={setSyncPointStatusFilter}
              />
              <FilterDropdown
                label="ERP Approver"
                value={erpApproverFilter}
                onChange={setErpApproverFilter}
                options={[
                  'Any Approver',
                  'Scott, Brad',
                  'Anderson, Kelly',
                  'Martinez, Daniel',
                  'Thompson, Rachel',
                  'Nguyen, Christopher',
                  'Patel, Anita',
                  'Reynolds, Marcus',
                  'Brooks, Stephanie',
                  'Carter, James',
                  'Simmons, Laura',
                ]}
              />
              <FilterDropdown
                label="SyncPoint Reviewer"
                value={syncPointReviewerFilter}
                onChange={setSyncPointReviewerFilter}
                options={[
                  'Any Reviewer',
                  'Scott, Brad',
                  'Anderson, Kelly',
                  'Martinez, Daniel',
                  'Thompson, Rachel',
                  'Nguyen, Christopher',
                  'Patel, Anita',
                  'Reynolds, Marcus',
                  'Brooks, Stephanie',
                  'Carter, James',
                  'Simmons, Laura',
                ]}
              />
              {/* Clear Filters — ghost button, inline */}
              <button
                onClick={handleClearFilters}
                className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(20,125,185,0.22)]"
                style={{ color: '#004B72' }}
              >
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
                  Clear Filters
                </span>
              </button>
            </div>
      </CollapsibleFilterSection>

      {/* Table Section */}
      <div className="w-full mt-[24px]">
        {/* Table Header Toolbar */}
        <div className="bg-[#f9f9fb] relative rounded-tl-[5px] rounded-tr-[5px] w-full border border-solid border-[#CDCED6] border-b-0">
          <div className="flex items-center justify-between px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#CDCED6]">
            {/* Left: Title | Search | Collapse All */}
            <div className="flex items-center gap-[16px] shrink-0">
              <p className="font-['Inter',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] tracking-[0px] whitespace-nowrap">
                Performance Items
              </p>
              {/* Vertical divider */}
              <div className="w-[1px] h-[24px] bg-[#CDCED6] shrink-0" />
              <div className="bg-white h-[32px] relative rounded-[4px] w-[268px]">
                <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="flex items-center size-full px-[4px]">
                  <div className="flex items-center justify-center shrink-0 px-[2px]">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1C2024] text-[14px] placeholder:text-[#60646C] px-[4px]"
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1.5px_2px_0px_rgba(0,0,0,0.1),inset_0px_1.5px_2px_0px_rgba(0,0,85,0.02)]" />
              </div>
              <button
                onClick={toggleAll}
                className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-transparent border-none text-[#1C2024] hover:text-[#000000] transition-colors"
              >
                <ChevronsDownIcon className={`transition-transform duration-200 ${allExpanded ? '' : '-rotate-90'}`} />
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
                  {allExpanded ? 'Collapse All' : 'Expand All'}
                </span>
              </button>
            </div>

            {/* Right: Bulk Status Update inline */}
            <div className="flex items-center gap-[12px] shrink-0">
              <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px] whitespace-nowrap">
                Bulk Status Update:
              </span>
              <SegmentedControl
                label="Bulk Status Update"
                hideLabel
                options={[
                  { value: 'not-reviewed', label: 'Not Reviewed' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
                selected={massChangeSelection}
                onChange={handleMassChange}
              />
            </div>
          </div>
        </div>

        {/* Table Grid Container */}
        <div className="border border-t-0 border-solid border-[#CDCED6] rounded-b-[5px] overflow-hidden">
          <div className="overflow-x-auto w-full max-w-full">
          <div style={{ width: 'max-content', minWidth: '100%' }}>
          {/* Column Headers */}
          <div
            className="grid w-full bg-[#F3F6FA] min-h-[64px]"
            style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}
          >
            {/* Chevron placeholder */}
            <div className="flex items-center justify-center p-[12px] border-b border-solid border-[#CDCED6]" />

            <HeaderCell label="Performance ID" sortable activeSortDirection={sortColumn === 'performanceId' ? sortDirection : null} onSort={() => handleSort('performanceId')} />
            <HeaderCell label="ACRN" sortable activeSortDirection={sortColumn === 'acrn' ? sortDirection : null} onSort={() => handleSort('acrn')} />
            <HeaderCell label="Funding Source" wrap sortable activeSortDirection={sortColumn === 'fundingSource' ? sortDirection : null} onSort={() => handleSort('fundingSource')} />
            <HeaderCell label="Appr Year" wrap sortable activeSortDirection={sortColumn === 'apprYear' ? sortDirection : null} onSort={() => handleSort('apprYear')} />
            <HeaderCell label="Total Funded" sortable activeSortDirection={sortColumn === 'totalFunded' ? sortDirection : null} onSort={() => handleSort('totalFunded')} />
            <HeaderCell label="Previously Invoiced" wrap sortable activeSortDirection={sortColumn === 'previouslyInvoiced' ? sortDirection : null} onSort={() => handleSort('previouslyInvoiced')} />
            <HeaderCell label="Invoice Date" wrap sortable activeSortDirection={sortColumn === 'invoiceDate' ? sortDirection : null} onSort={() => handleSort('invoiceDate')} />
            <HeaderCell label="This Invoice Amount" wrap sortable activeSortDirection={sortColumn === 'thisInvoiceAmount' ? sortDirection : null} onSort={() => handleSort('thisInvoiceAmount')} align="right" />
            <HeaderCell label="Cumulative Invoice" wrap sortable activeSortDirection={sortColumn === 'cumulativeInvoice' ? sortDirection : null} onSort={() => handleSort('cumulativeInvoice')} align="right" />
            <HeaderCell label="ERP Status" wrap sortable activeSortDirection={sortColumn === 'erpStatus' ? sortDirection : null} onSort={() => handleSort('erpStatus')} />
            <HeaderCell label="Approver" sortable activeSortDirection={sortColumn === 'approver' ? sortDirection : null} onSort={() => handleSort('approver')} />
            <HeaderCell label="SyncPoint Status" className={statusColumnPulse ? 'bg-[rgba(0,179,238,0.08)]' : ''} />

            {/* Kebab placeholder */}
            <div className="flex items-center justify-center px-[4px] py-[12px] border-b border-solid border-[#CDCED6]" />
          </div>

          {/* Data Rows */}
          <div
            className={`transition-opacity duration-300 ease-in-out ${sortFlash ? 'opacity-60' : 'opacity-100'}`}
          >
          {documentGroups.map((doc) => {
            const isExpanded = expandedDocs.has(doc.id);
            const sortedRows = getSortedRows(doc.rows);
            return (
              <div key={doc.id}>
                {/* Document Group Row */}
                <div
                  className={`grid w-full min-h-[48px] cursor-pointer transition-colors ${
                    isExpanded ? 'bg-[#F9F9FB]' : 'bg-white hover:bg-[#f9f9fb]'
                  }`}
                  style={{ gridTemplateColumns: GRID_TEMPLATE_COLUMNS }}
                  onClick={() => toggleDoc(doc.id)}
                >
                  <div
                    className="flex items-center p-[12px] border-b border-t border-solid border-[#CDCED6]"
                    style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', paddingLeft: '12px' }}
                  >
                    <div className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                      <ChevronDownIcon size={16} className="text-black" />
                    </div>
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                      {doc.label}
                    </p>
                  </div>
                </div>

                {/* Performance Rows (children) */}
                {isExpanded &&
                  sortedRows.map((row) => {
                    const isSelected = selectedRowId === row.id;
                    return (
                    <div
                      key={row.id}
                      className={`grid w-full min-h-[48px] cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[rgba(0,75,114,0.04)] hover:bg-[rgba(0,75,114,0.07)]'
                          : 'bg-white hover:bg-[#f9f9fb]'
                      }`}
                      style={{
                        gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
                        boxShadow: isSelected ? 'inset 3px 0 0 0 #004B72' : 'none',
                      }}
                      onClick={() => setSelectedRowId(row.id)}
                    >
                      {/* Chevron placeholder */}
                      <div className="flex items-center justify-center p-[12px] border-b border-solid border-[#CDCED6]" />

                      <DataCell value={row.performanceId} />
                      <DataCell value={row.acrn} />
                      <DataCell value={row.fundingSource} />
                      <DataCell value={row.apprYear} />
                      <DataCell value={row.totalFunded} align="right" />
                      <DataCell value={row.previouslyInvoiced} align="right" />
                      <DataCell value={row.invoiceDate} />
                      {/* This Invoice Amount — may have warning (e.g. credit memo) */}
                      <SemanticCell
                        value={row.thisInvoiceAmount}
                        align="right"
                        semantic={row.invoiceAmountSemantic}
                        semanticTooltip={row.invoiceAmountTooltip}
                      />

                      {/* Cumulative Invoice — may have error (e.g. exceeds funded) */}
                      <SemanticCell
                        value={row.cumulativeInvoice || '1,429,050.25'}
                        align="right"
                        semantic={row.hasDiscrepancy && row.cumulativeInvoice ? row.cumulativeSemantic : undefined}
                        semanticTooltip={row.discrepancyTooltip}
                      />

                      <DataCell value={row.erpStatus} />
                      <DataCell value={row.approver} />

                      {/* SyncPoint Status */}
                      <div className={`flex items-center pl-[12px] pr-[16px] py-[12px] border-b border-solid border-[#CDCED6] overflow-hidden transition-[background-color] duration-[400ms] ease-in-out ${statusColumnPulse ? 'bg-[rgba(0,179,238,0.08)]' : ''}`}>
                        <RowStatusControl
                          status={rowStatuses[row.id] || 'not-reviewed'}
                          rowId={row.id}
                          statusTooltip={row.statusTooltip}
                          onChange={handleStatusChange}
                        />
                      </div>

                      {/* Kebab */}
                      <div className="flex items-center justify-center px-[4px] py-[12px] border-b border-solid border-[#CDCED6]">
                        <KebabMenu rowId={row.id} onViewStatusHistory={setStatusHistoryRowId} />
                      </div>
                    </div>
                    );
                  })}
              </div>
            );
          })}
          </div>
          </div>
          </div>
        </div>
      </div>

      {/* Status History Modal */}
      <StatusHistoryModal
        isOpen={statusHistoryRowId !== null}
        onClose={() => setStatusHistoryRowId(null)}
        performanceId={statusHistoryPerformanceId}
      />
    </div>
  );
}

// ─── Reusable Sub-components ─────────────────────────────────────────────

function HeaderCell({
  label,
  wrap = false,
  className = '',
  sortable = false,
  activeSortDirection,
  onSort,
  align,
}: {
  label: string;
  wrap?: boolean;
  className?: string;
  sortable?: boolean;
  activeSortDirection?: SortDirection | null;
  onSort?: () => void;
  align?: 'left' | 'right';
}) {
  return (
    <div
      className={`flex items-center p-[12px] gap-[8px] border-b border-solid border-[#CDCED6] overflow-hidden transition-[background-color] duration-[400ms] ease-in-out ${sortable ? 'cursor-pointer select-none hover:bg-[#EAF0F6]' : ''} ${align === 'right' ? 'justify-end' : ''} ${className}`}
      onClick={sortable ? onSort : undefined}
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      onKeyDown={sortable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSort?.(); } } : undefined}
      aria-sort={sortable ? (activeSortDirection === 'asc' ? 'ascending' : activeSortDirection === 'desc' ? 'descending' : 'none') : undefined}
    >
      <div className="flex gap-[6px] items-center min-w-0 flex-1">
        <p className={`font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic text-[#1C2024] text-[13px] tracking-[0.5px] uppercase ${
          wrap ? 'whitespace-normal overflow-hidden' : 'overflow-hidden text-ellipsis whitespace-nowrap'
        }`}>
          {label}
        </p>
        {sortable && (
          <span className={`shrink-0 flex items-center ${activeSortDirection ? 'text-[#004B72]' : 'text-[#1C2024]'}`}>
            {activeSortDirection === 'asc' ? (
              <ArrowUpIcon />
            ) : activeSortDirection === 'desc' ? (
              <ArrowDownIcon />
            ) : (
              <ArrowUpDownIcon />
            )}
          </span>
        )}
      </div>
      <div className="flex items-center shrink-0">
        <div className="bg-[#d9d9d9] h-[24px] w-[2px]" />
      </div>
    </div>
  );
}

function DataCell({ value, align = 'left' }: { value: string; align?: 'left' | 'right' }) {
  return (
    <div
      className={`flex items-center py-[12px] pl-[12px] border-b border-solid border-[#CDCED6] overflow-hidden ${
        align === 'right' ? 'justify-end pr-[20px]' : 'pr-[12px]'
      }`}
    >
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1C2024] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
        {value || '24,487.25'}
      </p>
    </div>
  );
}

