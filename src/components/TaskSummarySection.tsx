import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { AppropriationBadge } from './AppropriationBadge';
import type { TierAssessmentResult } from './TierAssessmentFlyout';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';

type OperationalStatusType = 'active' | 'suspended' | 'completed';

// ─── Execution Statement data (matches CreateTaskFlyout) ──────────────────

interface ExecutionStatementOption {
  id: string;
  label: string;
  project: string;
  appropriation: string;
  activities: string[];
  programInitiative: string;
  l1Requirement: string;
}

const EXECUTION_STATEMENTS: ExecutionStatementOption[] = [
  {
    id: 'ES-001',
    label: 'ES-2026-0041 – Surface Ship Undersea Warfare',
    project: 'Littoral Combat Ship Mission Modules',
    appropriation: 'O&MN',
    activities: ['PMS 420 – Program Office', 'NSWC PCD – Panama City Division', 'NSWC DD – Dahlgren Division'],
    programInitiative: 'MCM Mission Package Readiness',
    l1Requirement: 'Ensure deployment-ready MCM mission packages for surface and unmanned platforms',
  },
  {
    id: 'ES-002',
    label: 'ES-2026-0078 – Mine Warfare Systems',
    project: 'Unmanned Surface Vehicle Program',
    appropriation: 'RDTEN',
    activities: ['NSWC PCD – Panama City Division', 'NSWC DD – Dahlgren Division', 'Naval AI Systems – AI/ML Division'],
    programInitiative: 'Unmanned Surface Vehicle (USV) Capability Development',
    l1Requirement: 'Develop and integrate USV systems for mine countermeasures and maritime security operations',
  },
  {
    id: 'ES-003',
    label: 'ES-2026-0112 – Undersea Sensors & Processing',
    project: 'Undersea Warfare Sensor Integration',
    appropriation: 'RDTEN',
    activities: ['Naval AI Systems – AI/ML Division', 'Undersea Warfare Lab – Acoustic Systems', 'Cyber Systems Division – Network Ops'],
    programInitiative: 'Fleet Readiness and Sustainment',
    l1Requirement: 'Maintain operational availability of mission-critical systems through lifecycle support and logistics readiness',
  },
  {
    id: 'ES-004',
    label: 'ES-2026-0156 – Maritime Surveillance Integration',
    project: 'Maritime Domain Awareness Systems',
    appropriation: 'OPN',
    activities: ['Maritime Systems Lab – Integration Branch', 'PMS 420 – Program Office'],
    programInitiative: 'Maritime Surveillance Modernization',
    l1Requirement: 'Integrate multi-domain surveillance capabilities to enhance maritime domain awareness and threat detection',
  },
  {
    id: 'ES-005',
    label: 'Maritime ISR Modernization Program',
    project: 'Coastal Surveillance Modernization',
    appropriation: 'O&MN',
    activities: ['PMS 420', 'NSWC PCD – Panama City Division'],
    programInitiative: 'MCM Mission Package Readiness',
    l1Requirement: 'Ensure deployment-ready MCM mission packages for surface and unmanned platforms',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

interface OperationalStatusBadgeProps {
  status: OperationalStatusType;
  fullStatusText?: string;
  tooltip?: string;
}

function OperationalStatusBadge({ status, fullStatusText, tooltip }: OperationalStatusBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const displayText = status === 'suspended' ? 'Suspended' : 
                      status === 'active' ? 'Active' : 
                      'Completed';
  
  const colorScheme = {
    active: { bg: 'bg-[#e6f6eb]', text: 'text-[rgba(0,113,63,0.87)]' },
    suspended: { bg: 'bg-[rgba(255,222,0,0.24)]', text: 'text-[#ab6400]' },
    completed: { bg: 'bg-[#F0F0F3]', text: 'text-[#60646C]' },
  };
  
  const colors = colorScheme[status];
  
  return (
    <div className="relative inline-block">
      <span 
        className={`inline-flex items-center h-[22px] px-[8px] rounded-[4px] ${colors.bg} font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] ${colors.text} w-fit cursor-${status === 'suspended' && tooltip ? 'help' : 'default'}`}
        onMouseEnter={() => status === 'suspended' && tooltip && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {displayText}
      </span>
      
      {status === 'suspended' && tooltip && showTooltip && (
        <div className="absolute z-50 left-0 top-[28px] bg-[#1C2024] text-white rounded-[4px] px-[12px] py-[8px] shadow-lg min-w-[240px] max-w-[320px]">
          <div className="flex flex-col gap-[4px]">
            {fullStatusText && (
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-white m-0">
                {fullStatusText}
              </p>
            )}
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[rgba(255,255,255,0.87)] m-0">
              {tooltip}
            </p>
          </div>
          <div className="absolute -top-[4px] left-[12px] w-[8px] h-[8px] bg-[#1C2024] transform rotate-45" />
        </div>
      )}
    </div>
  );
}

/**
 * Two-line clamp text with auto-detecting tooltip.
 * Tooltip only appears when the text is actually truncated (scrollHeight > clientHeight).
 */
function ClampedText({ text, muted }: { text: string; muted?: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div className="relative min-w-0">
      <span
        ref={spanRef}
        className={`font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] ${muted ? 'text-[#80838D]' : 'text-[#1C2024]'}`}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
        onMouseEnter={() => isTruncated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {text}
      </span>
      {isTruncated && showTooltip && (
        <div className="absolute z-50 left-0 bottom-[calc(100%+6px)] bg-[#1C2024] text-white rounded-[4px] px-[12px] py-[8px] shadow-lg min-w-[240px] max-w-[320px] whitespace-normal">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[rgba(255,255,255,0.87)] m-0">
            {text}
          </p>
          <div className="absolute -bottom-[4px] left-[12px] w-[8px] h-[8px] bg-[#1C2024] transform rotate-45" />
        </div>
      )}
    </div>
  );
}

function MetadataField({ label, value, badge, action, showPulse, operationalStatus, tooltip, muted, truncate, longText }: { 
  label: string; 
  value: string; 
  badge?: 'appropriation' | 'status' | 'not-assigned'; 
  action?: { text: string; onClick?: () => void }; 
  showPulse?: boolean;
  operationalStatus?: { type: OperationalStatusType; fullText?: string; tooltip?: string };
  tooltip?: string;
  muted?: boolean;
  truncate?: boolean;
  longText?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className={`flex flex-col gap-[4px] min-w-0 ${showPulse ? 'tier-field-pulse' : ''}`}>
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#60646c] text-[14px]">
        {label}
      </span>
      {operationalStatus ? (
        <OperationalStatusBadge 
          status={operationalStatus.type} 
          fullStatusText={operationalStatus.fullText}
          tooltip={operationalStatus.tooltip}
        />
      ) : badge === 'appropriation' ? (
        <span className="inline-flex items-center h-[22px] px-[8px] rounded-[4px] bg-[#99FFAD] font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] w-fit">
          {value}
        </span>
      ) : badge === 'status' ? (
        <span className="inline-flex items-center h-[22px] px-[8px] rounded-[4px] bg-[#F0F0F3] font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] w-fit text-[#1c2024]">
          {value}
        </span>
      ) : badge === 'not-assigned' ? (
        <div className="flex flex-col items-start gap-[4px]">
          {action && (
            <button
              onClick={action.onClick}
              className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0"
            >
              {action.text}
            </button>
          )}
        </div>
      ) : (
        <>
          {value && (
            longText ? (
              <ClampedText text={value} muted={muted} />
            ) : (
              <div className="relative" style={truncate ? { overflow: 'hidden' } : { display: 'inline-block' }}>
                <span
                  className={`font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] ${muted ? 'text-[#80838D]' : 'text-[#1C2024]'} cursor-default${truncate ? ' block overflow-hidden whitespace-nowrap text-ellipsis' : ''}`}
                  onMouseEnter={() => tooltip && setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {value}
                </span>
                {tooltip && showTooltip && (
                  <div className="absolute z-50 left-0 bottom-[calc(100%+6px)] bg-[#1C2024] text-white rounded-[4px] px-[12px] py-[8px] shadow-lg min-w-[240px] max-w-[320px] whitespace-normal">
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[rgba(255,255,255,0.87)] m-0">
                      {tooltip}
                    </p>
                    <div className="absolute -bottom-[4px] left-[12px] w-[8px] h-[8px] bg-[#1C2024] transform rotate-45" />
                  </div>
                )}
              </div>
            )
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0 text-left"
            >
              {action.text}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function TierField({
  currentTier,
  overrideMetadata,
  onOpenTierAssessment,
  showPulse,
}: {
  currentTier?: string | null;
  overrideMetadata?: TierAssessmentResult | null;
  onOpenTierAssessment?: () => void;
  showPulse?: boolean;
}) {
  const hasOverrideMetadata = !!(
    currentTier &&
    overrideMetadata?.wasOverride &&
    overrideMetadata.assignedTier === currentTier
  );

  if (!currentTier) {
    return (
      <MetadataField
        label="Tier"
        value="Not Assigned"
        badge="not-assigned"
        action={{ text: 'Assign Tier', onClick: onOpenTierAssessment }}
        showPulse={showPulse}
      />
    );
  }

  if (!hasOverrideMetadata) {
    return <MetadataField label="Tier" value={currentTier} showPulse={showPulse} />;
  }

  return (
    <div className={`flex flex-col gap-[4px] min-w-0 ${showPulse ? 'tier-field-pulse' : ''}`}>
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#60646c] text-[14px]">
        Tier
      </span>
      <HoverCard openDelay={150} closeDelay={100}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            className="inline-flex w-fit items-center gap-[6px] rounded-[4px] border-none bg-transparent p-0 text-left cursor-help"
          >
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
              {currentTier}
            </span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-[#ab6400]"
            >
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.6V8.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11.2" r="0.9" fill="currentColor" />
            </svg>
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          side="top"
          className="w-[320px] rounded-[6px] border border-[#E0E1E6] bg-white p-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        >
          <div className="flex flex-col gap-[6px]">
            <p className="m-0 font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024]">
              Tier recommendation overridden
            </p>
            <p className="m-0 font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">
              Recommended Tier: {overrideMetadata?.recommendedTier}
            </p>
            <p className="m-0 font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">
              Assigned Tier: {overrideMetadata?.assignedTier}
            </p>
            <p className="m-0 font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">
              Reason: {overrideMetadata?.overrideReason}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.388 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.581 14.5032 3.8262 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L4.99967 13.6667L1.33301 14.6667L2.33301 11L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Inline editable field wrapper */
function EditableField({ label, children, showPulse }: { label: string; children: React.ReactNode; showPulse?: boolean }) {
  return (
    <div className={`flex flex-col gap-[4px] min-w-0 ${showPulse ? 'tier-field-pulse' : ''}`}>
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#60646c]">
        {label}
      </span>
      {children}
    </div>
  );
}

/** Inline searchable dropdown for edit mode */
function InlineSearchableDropdown({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <SearchableFilterDropdown
      value={value}
      onChange={onChange}
      options={options}
      className="w-full"
      triggerStyle={{ width: '100%', minWidth: 0 }}
    />
  );
}

/** Radio option — matches CreateTaskFlyout RadioOption pattern exactly */
function RadioOption({ label, checked, onChange, name }: { label: string; checked: boolean; onChange: () => void; name: string }) {
  return (
    <label className="flex items-center gap-[8px] cursor-pointer select-none">
      <span
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border-[2px] shrink-0 transition-colors"
        style={{
          borderColor: checked ? '#004b72' : '#8b8d98',
          backgroundColor: 'white',
        }}
        onClick={onChange}
      >
        {checked && (
          <span
            className="w-[10px] h-[10px] rounded-full"
            style={{ backgroundColor: '#004b72' }}
          />
        )}
      </span>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">{label}</span>
    </label>
  );
}

/** Task Type radio group using correct RadioOption pattern */
function TaskTypeRadio({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-[20px] h-[32px]">
      <RadioOption label="CODB" checked={value === 'CODB'} onChange={() => onChange('CODB')} name="taskTypeSummary" />
      <RadioOption label="Standard" checked={value === 'Non-CODB'} onChange={() => onChange('Non-CODB')} name="taskTypeSummary" />
    </div>
  );
}

/** DatePickerInput — matches CreateTaskFlyout calendar pattern exactly */
function InlineDatePickerInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const parseMMDDYYYY = (s: string): Date | null => {
    const p = s.split('/');
    if (p.length !== 3) return null;
    const m = parseInt(p[0], 10);
    const d = parseInt(p[1], 10);
    const y = parseInt(p[2], 10);
    if (isNaN(m) || isNaN(d) || isNaN(y) || m < 1 || m > 12 || d < 1 || d > 31 || y < 1900) return null;
    return new Date(y, m - 1, d);
  };

  const formatDate = (date: Date): string => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const parsedDate = parseMMDDYYYY(value);
  const [viewMonth, setViewMonth] = useState(() => parsedDate ? parsedDate.getMonth() : new Date().getMonth());
  const [viewYear, setViewYear] = useState(() => parsedDate ? parsedDate.getFullYear() : new Date().getFullYear());

  useEffect(() => {
    if (calendarOpen) {
      const d = parseMMDDYYYY(value);
      if (d) {
        setViewMonth(d.getMonth());
        setViewYear(d.getFullYear());
      } else {
        const now = new Date();
        setViewMonth(now.getMonth());
        setViewYear(now.getFullYear());
      }
    }
  }, [calendarOpen, value]);

  useEffect(() => {
    if (!calendarOpen || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const calW = 240;
    const calH = 320;
    const pad = 8;
    let top = rect.bottom + 4;
    let left = rect.left;
    if (left + calW > window.innerWidth - pad) left = rect.right - calW;
    if (left < pad) left = pad;
    if (top + calH > window.innerHeight - pad) top = rect.top - calH - 4;
    if (top < pad) top = pad;
    setDropdownStyle({ top, left });
  }, [calendarOpen]);

  useEffect(() => {
    if (!calendarOpen) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        calendarRef.current && !calendarRef.current.contains(target)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [calendarOpen]);

  const handleSelectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    onChange(formatDate(d));
    setCalendarOpen(false);
    inputRef.current?.focus();
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const isSelected = (day: number) => {
    if (!parsedDate) return false;
    return parsedDate.getFullYear() === viewYear && parsedDate.getMonth() === viewMonth && parsedDate.getDate() === day;
  };

  const isToday = (day: number) => {
    const now = new Date();
    return now.getFullYear() === viewYear && now.getMonth() === viewMonth && now.getDate() === day;
  };

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => { if (!calendarOpen) setCalendarOpen(true); }}
        placeholder="mm/dd/yyyy"
        className="w-full h-[32px] px-[8px] pr-[30px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow box-border cursor-pointer"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setCalendarOpen(!calendarOpen)}
        className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center border-none bg-transparent cursor-pointer p-0 rounded-[2px] hover:bg-[#f0f0f3] transition-colors"
        aria-label="Open calendar"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="#60646c" strokeWidth="1.2" />
          <path d="M1 5.5H13" stroke="#60646c" strokeWidth="1.2" />
          <path d="M4 1V3.5" stroke="#60646c" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M10 1V3.5" stroke="#60646c" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      {calendarOpen && createPortal(
        <div
          ref={calendarRef}
          style={dropdownStyle}
          className="fixed z-[1100] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-[#e0e1e6] p-[12px] w-[240px] select-none"
          data-datepicker-calendar
        >
          {/* Month/Year header */}
          <div className="flex items-center justify-between mb-[8px]">
            <button
              type="button"
              onClick={prevMonth}
              className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f3] transition-colors p-0"
              aria-label="Previous month"
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M6 2L2 6L6 10" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f3] transition-colors p-0"
              aria-label="Next month"
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M2 2L6 6L2 10" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-0 mb-[2px]">
            {DAY_HEADERS.map(d => (
              <div key={d} className="h-[24px] flex items-center justify-center font-['Inter:Medium',sans-serif] font-medium text-[11px] leading-[14px] text-[#8b8d98]">
                {d}
              </div>
            ))}
          </div>
          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0">
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="h-[28px]" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const selected = isSelected(day);
              const today = isToday(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-[28px] w-full flex items-center justify-center rounded-[4px] border-none cursor-pointer transition-colors font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] p-0 ${
                    selected
                      ? 'bg-[#004b72] text-white'
                      : today
                        ? 'bg-[#f0f7fb] text-[#004b72] hover:bg-[#e0eff6]'
                        : 'bg-transparent text-[#1C2024] hover:bg-[#f5f5f7]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {/* Today shortcut */}
          <div className="mt-[8px] pt-[8px] border-t border-[#e0e1e6] flex justify-center">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                onChange(formatDate(now));
                setCalendarOpen(false);
                inputRef.current?.focus();
              }}
              className="border-none bg-transparent cursor-pointer font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#006496] hover:underline p-0"
            >
              Today
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/** Date range for Period of Performance using the correct calendar pattern */
function DateRangeInput({ startDate, endDate, onStartChange, onEndChange }: {
  startDate: string; endDate: string; onStartChange: (v: string) => void; onEndChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-[8px]">
      <InlineDatePickerInput value={startDate} onChange={onStartChange} />
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#8b8d98] shrink-0">–</span>
      <InlineDatePickerInput value={endDate} onChange={onEndChange} />
    </div>
  );
}

const ROW_GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  gap: '24px',
};

const ROW_3_GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  gap: '24px',
};

const ROW_4_GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  gap: '24px',
};

// Sample options for dropdowns
const WBS_OPTIONS = [
  '5.1 — Combat Systems Integration',
  '5.2 — Sensor Fusion Systems',
  '5.3 — Weapons Integration',
  '5.4 — C4I Systems',
  '5.5 — Hull & Mechanical',
  '5.6 — Electronic Warfare',
];

const FUNDING_SOURCE_OPTIONS = [
  'BLI 0721/RU004562',
  'BLI 0722/RU005123',
  'BLI 0730/RU006789',
  'BLI 0740/RU007890',
  'BLI 0750/RU008901',
];

const EXECUTING_ACTIVITY_OPTIONS = [
  'PMS 420',
  'PMS 401',
  'PMS 450',
  'PMS 505',
  'PMS 340',
];

export const TASK_SUMMARY_PROJECT_OPTIONS = Array.from(
  new Set(EXECUTION_STATEMENTS.map(es => es.project))
);

const PLANNING_YEAR_OPTIONS = [
  'FY2025',
  'FY2026',
  'FY2027',
  'FY2028',
  'FY2029',
];

const TASK_LINK_OPTIONS = [
  'Not Yet Linked',
  'Not Yet Created',
  'None linked',
  'TSK-2024-0412 — Radar Calibration',
  'TSK-2024-0413 — Sensor Array Testing',
  'TSK-2025-0101 — Platform Integration',
  'TSK-2025-0102 — Software Validation',
];

interface EditFormState {
  executionStatementId: string;
  executingActivity: string;
  wbsAttribute: string;
  fundingSource: string;
  planningYear: string;
  popStart: string; // mm/dd/yyyy
  popEnd: string;   // mm/dd/yyyy
  previousTask: string;
  associatedTasks: string;
  nextTask: string;
  objective: string;
  taskType: string;
}

interface TaskSummarySectionProps {
  taskId: string;
  currentTier?: string | null;
  tierAssessmentResult?: TierAssessmentResult | null;
  onOpenTierAssessment?: () => void;
  showPulse?: boolean;
  isEditing: boolean;
  onEnterEditMode: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function TaskSummarySection({ taskId, currentTier, tierAssessmentResult, onOpenTierAssessment, showPulse, isEditing, onEnterEditMode, onSave, onCancel }: TaskSummarySectionProps) {
  const defaultESId = 'ES-005'; // "Maritime ISR Modernization Program"
  const defaultES = EXECUTION_STATEMENTS.find(es => es.id === defaultESId)!;
  const isNewlyCreatedTask = taskId === '41-0279';

  const [formState, setFormState] = useState<EditFormState>(() => ({
    executionStatementId: defaultESId,
    executingActivity: 'PMS 420',
    wbsAttribute: '5.2 — Sensor Fusion Systems',
    fundingSource: 'BLI 0721/RU004562',
    planningYear: 'FY2026',
    popStart: isNewlyCreatedTask ? '' : '03/03/2026',
    popEnd: isNewlyCreatedTask ? '' : '10/30/2027',
    previousTask: 'Not Yet Linked',
    associatedTasks: 'None linked',
    nextTask: 'Not Yet Created',
    objective: '',
    taskType: 'Non-CODB',
  }));

  const [savedState, setSavedState] = useState<EditFormState>(() => ({ ...formState }));

  // Derived fields from selected Execution Statement
  const getSelectedES = (id: string) => EXECUTION_STATEMENTS.find(es => es.id === id);
  const editES = getSelectedES(formState.executionStatementId);
  const savedES = getSelectedES(savedState.executionStatementId);

  const handleEdit = () => {
    setFormState({ ...savedState });
    onEnterEditMode();
  };

  const handleCancel = () => {
    setFormState({ ...savedState });
    onCancel();
  };

  const handleSave = () => {
    setSavedState({ ...formState });
    onSave();
  };

  const updateField = <K extends keyof EditFormState>(field: K, value: EditFormState[K]) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // When Execution Statement changes, update derived fields
  const handleExecutionStatementChange = (esLabel: string) => {
    const es = EXECUTION_STATEMENTS.find(e => e.label === esLabel);
    if (es) {
      setFormState(prev => ({
        ...prev,
        executionStatementId: es.id,
      }));
    }
  };

  // Format mm/dd/yyyy to display format "3 Mar 2026"
  const formatDisplayDate = (mmddyyyy: string): string => {
    const parts = mmddyyyy.split('/');
    if (parts.length !== 3) return mmddyyyy;
    const m = parseInt(parts[0], 10);
    const d = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    if (isNaN(m) || isNaN(d) || isNaN(y)) return mmddyyyy;
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const displayPop = savedState.popStart && savedState.popEnd
    ? `${formatDisplayDate(savedState.popStart)} - ${formatDisplayDate(savedState.popEnd)}`
    : '';
  const displayTaskType = savedState.taskType === 'Non-CODB' ? 'Standard' : savedState.taskType;

  const headerActions = isEditing ? (
    <div className="flex items-center gap-[8px]">
      <button
        onClick={handleSave}
        className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-[#004B72] border-none text-white hover:bg-[#003a5a] transition-colors"
      >
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] whitespace-nowrap">
          Save
        </span>
      </button>
      <button
        onClick={handleCancel}
        className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f0f0f3] transition-colors"
      >
        <div aria-hidden="true" className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[14px] whitespace-nowrap">
          Cancel
        </span>
      </button>
    </div>
  ) : (
    <button
      onClick={handleEdit}
      className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f0f7fc] transition-colors"
    >
      <div aria-hidden="true" className="absolute border border-[#006496] border-solid inset-0 pointer-events-none rounded-[4px] bg-[#ffffff]" />
      <span className="relative shrink-0 text-[#006496]">
        <EditIcon />
      </span>
      <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#006496] text-[14px] whitespace-nowrap">
        Edit
      </span>
    </button>
  );

  // Execution Statement dropdown options (labels)
  const esOptions = EXECUTION_STATEMENTS.map(es => es.label);

  return (
    <CollapsibleFilterSection
      title="Task Summary"
      highContrast
      headerActions={headerActions}
    >
      {/* Single white content surface */}
      <div className="bg-white rounded-[5px] relative">
        {/* Row 1 — Structural Task Context */}
        <div className="px-[8px] py-[12px]">
          <div style={ROW_GRID_STYLE}>
            {isEditing ? (
              <EditableField label="Execution Statement">
                <InlineSearchableDropdown
                  value={editES?.label ?? ''}
                  onChange={handleExecutionStatementChange}
                  options={esOptions}
                />
              </EditableField>
            ) : (
              <MetadataField
                label="Execution Statement"
                value={savedES?.label ?? 'Maritime ISR Modernization Program'}
                longText
              />
            )}
            {isEditing ? (
              <EditableField label="WBS Attribute">
                <InlineSearchableDropdown
                  value={formState.wbsAttribute}
                  onChange={v => updateField('wbsAttribute', v)}
                  options={WBS_OPTIONS}
                />
              </EditableField>
            ) : (
              <MetadataField label="WBS Attribute" value={savedState.wbsAttribute} />
            )}
            <MetadataField label="Appropriation" value={isEditing ? (editES?.appropriation ?? '') : (savedES?.appropriation ?? 'O&MN')} badge="appropriation" />
            {isEditing ? (
              <EditableField label="Funding Source">
                <InlineSearchableDropdown
                  value={formState.fundingSource}
                  onChange={v => updateField('fundingSource', v)}
                  options={FUNDING_SOURCE_OPTIONS}
                />
              </EditableField>
            ) : (
              <MetadataField label="Funding Source" value={savedState.fundingSource} tooltip={`${savedState.fundingSource} – Maritime ISR Radar Modernization (FY2026)`} />
            )}
            {isEditing ? (
              <EditableField label="Planning Year">
                <InlineSearchableDropdown
                  value={formState.planningYear}
                  onChange={v => updateField('planningYear', v)}
                  options={PLANNING_YEAR_OPTIONS}
                />
              </EditableField>
            ) : (
              <MetadataField label="Planning Year" value={savedState.planningYear} />
            )}
            <TierField
              currentTier={currentTier}
              overrideMetadata={tierAssessmentResult}
              onOpenTierAssessment={onOpenTierAssessment}
              showPulse={showPulse}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-solid border-[#e0e1e6]" />

        {/* Row 2 — Planning, Funding & Timeframe */}
        <div className="px-[8px] py-[12px]">
          <div style={ROW_GRID_STYLE}>
            <MetadataField label="Requested" value="Not Yet Estimated" />
            <MetadataField label="Allocated" value="Not Yet Allocated" />
            <MetadataField label="Delta" value="Not Applicable" />
            {isEditing ? (
              <EditableField label="Period of Performance">
                <DateRangeInput
                  startDate={formState.popStart}
                  endDate={formState.popEnd}
                  onStartChange={v => updateField('popStart', v)}
                  onEndChange={v => updateField('popEnd', v)}
                />
              </EditableField>
            ) : (
              <MetadataField
                label="Period of Performance"
                value={displayPop}
                action={!displayPop ? { text: 'Add PoP', onClick: handleEdit } : undefined}
              />
            )}
            <MetadataField 
              label="Operational Status" 
              value="Active"
              operationalStatus={{ type: 'active' }}
            />
            {isEditing ? (
              <EditableField label="Task Type">
                <TaskTypeRadio
                  value={formState.taskType}
                  onChange={v => updateField('taskType', v)}
                />
              </EditableField>
            ) : (
              <MetadataField label="Task Type" value={displayTaskType} badge="status" />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-solid border-[#e0e1e6]" />

        {/* Row 3 — Lineage, Program Context & Objective */}
        <div className="px-[8px] py-[12px]">
          <div style={ROW_3_GRID_STYLE}>
            {isEditing ? (
              <EditableField label="Previous Task">
                <InlineSearchableDropdown
                  value={formState.previousTask}
                  onChange={v => updateField('previousTask', v)}
                  options={TASK_LINK_OPTIONS}
                />
              </EditableField>
            ) : (
              <MetadataField
                label="Previous Task"
                value=""
                action={{ text: savedState.previousTask, onClick: handleEdit }}
              />
            )}
            {isEditing ? (
              <EditableField label="Associated Tasks">
                <InlineSearchableDropdown
                  value={formState.associatedTasks}
                  onChange={v => updateField('associatedTasks', v)}
                  options={TASK_LINK_OPTIONS}
                />
              </EditableField>
            ) : (
              <MetadataField
                label="Associated Tasks"
                value=""
                action={{ text: savedState.associatedTasks, onClick: handleEdit }}
              />
            )}
            {isEditing ? (
              <EditableField label="Next Task">
                <InlineSearchableDropdown
                  value={formState.nextTask}
                  onChange={v => updateField('nextTask', v)}
                  options={TASK_LINK_OPTIONS}
                />
              </EditableField>
            ) : (
              <MetadataField
                label="Next Task"
                value=""
                action={{ text: savedState.nextTask, onClick: handleEdit }}
              />
            )}
            <MetadataField
              label="Program Initiative"
              value={isEditing ? (editES?.programInitiative ?? '') : (savedES?.programInitiative ?? 'MCM Mission Package Readiness')}
              muted={isEditing}
              longText
            />
            <MetadataField
              label="L1 Requirement"
              value={isEditing ? (editES?.l1Requirement ?? '') : (savedES?.l1Requirement ?? 'Ensure deployment-ready MCM mission packages for surface and unmanned platforms')}
              muted={isEditing}
              longText
            />
            {isEditing ? (
              <EditableField label="Objective">
                <textarea
                  value={formState.objective}
                  onChange={e => updateField('objective', e.target.value)}
                  placeholder="Enter objective..."
                  rows={2}
                  className="w-full px-[8px] py-[6px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] outline-none focus:border-[#004B72] focus:ring-[2px] focus:ring-[rgba(0,75,114,0.2)] resize-vertical min-h-[32px]"
                />
              </EditableField>
            ) : (
              <MetadataField
                label="Objective"
                value={savedState.objective}
                longText={!!savedState.objective}
                action={!savedState.objective ? { text: 'Add Objective', onClick: handleEdit } : undefined}
              />
            )}
          </div>
        </div>

      </div>
    </CollapsibleFilterSection>
  );
}
