import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

// ─── Mock Data ──────────────────────────────────────────────────────────────

interface ProjectOption {
  id: string;
  label: string;
  isCODB: boolean;
}

interface ExecutionStatementOption {
  id: string;
  label: string;
  details: string;
  projectId: string;
  appropriations: string[];
  activities: string[];
  /** Badge label shown in the ES dropdown option row */
  badge: string;
  /** Badge color style: 'omn' | 'rdten' | 'opn' | 'none' */
  badgeStyle: 'omn' | 'rdten' | 'opn' | 'none';
}

interface WBSOption {
  code: string;
  description: string;
}

interface FundingSourceRecord {
  id: string;
  label: string;
  appropriation: string;
}

const PROJECTS: ProjectOption[] = [
  { id: 'proj-codb', label: 'CODB', isCODB: true },
  { id: 'proj-001', label: 'Littoral Combat Ship Mission Modules', isCODB: true },
  { id: 'proj-002', label: 'Unmanned Surface Vehicle Program', isCODB: true },
  { id: 'proj-003', label: 'Undersea Warfare Sensor Integration', isCODB: false },
  { id: 'proj-004', label: 'Maritime Domain Awareness Systems', isCODB: false },
];

const EXECUTION_STATEMENTS: ExecutionStatementOption[] = [
  {
    id: 'ES-001',
    label: 'Surface Ship Undersea Warfare Modernization',
    details: 'Enhance surface ship undersea warfare capabilities through integration of advanced sonar systems, improved signal processing, and upgraded mission planning tools to support distributed maritime operations.',
    projectId: 'proj-001',
    appropriations: ['O&MN'],
    activities: ['PMS 420 – Program Office', 'NSWC PCD – Panama City Division', 'NSWC DD – Dahlgren Division'],
    badge: 'O&MN',
    badgeStyle: 'omn',
  },
  {
    id: 'ES-002',
    label: 'Autonomous Mine Detection Capability Expansion',
    details: 'Develop and deploy autonomous systems capable of detecting and classifying naval mines using advanced sensor fusion, machine learning algorithms, and unmanned surface and underwater platforms.',
    projectId: 'proj-002',
    appropriations: ['RDTEN', 'O&MN'],
    activities: ['NSWC PCD – Panama City Division', 'NSWC DD – Dahlgren Division', 'Naval AI Systems – AI/ML Division'],
    badge: 'RDTEN',
    badgeStyle: 'rdten',
  },
  {
    id: 'ES-003',
    label: 'Maritime ISR Sensor Integration & Data Fusion',
    details: 'Integrate multi-domain intelligence, surveillance, and reconnaissance sensors to enable real-time data fusion, improved situational awareness, and enhanced decision-making across maritime operations.',
    projectId: 'proj-003',
    appropriations: ['RDTEN'],
    activities: ['Naval AI Systems – AI/ML Division', 'Undersea Warfare Lab – Acoustic Systems', 'Cyber Systems Division – Network Ops'],
    badge: 'RDTEN',
    badgeStyle: 'rdten',
  },
  {
    id: 'ES-004',
    label: 'Expeditionary Mine Countermeasure Mission Support',
    details: 'Support expeditionary mine countermeasure missions by developing deployable systems, enhancing mission planning capabilities, and improving interoperability across joint forces.',
    projectId: 'proj-004',
    appropriations: ['OPN', 'RDTEN'],
    activities: ['Maritime Systems Lab – Integration Branch', 'PMS 420 – Program Office'],
    badge: 'OPN',
    badgeStyle: 'opn',
  },
  {
    id: 'ES-005',
    label: 'Littoral Combat Systems Readiness Improvement',
    details: 'Improve readiness and operational availability of littoral combat systems through targeted maintenance enhancements, system upgrades, and logistics optimization initiatives.',
    projectId: 'proj-001',
    appropriations: ['O&MN'],
    activities: ['PMS 420 – Program Office', 'NSWC DD – Dahlgren Division'],
    badge: 'BLI 0603',
    badgeStyle: 'rdten',
  },
  {
    id: 'ES-006',
    label: 'Unmanned Surface Vehicle Payload Integration',
    details: 'Design and integrate modular payload systems for unmanned surface vehicles to support surveillance, mine detection, and electronic warfare missions in contested environments.',
    projectId: 'proj-002',
    appropriations: ['RDTEN'],
    activities: ['Naval AI Systems – AI/ML Division', 'NSWC PCD – Panama City Division'],
    badge: 'RDTEN',
    badgeStyle: 'rdten',
  },
  {
    id: 'ES-007',
    label: 'Expeditionary Mission Support Coordination',
    details: 'Coordinate expeditionary mission support activities across program offices and field activities to ensure aligned resource planning, stakeholder engagement, and execution readiness.',
    projectId: 'proj-001',
    appropriations: [],
    activities: ['PMS 420 – Program Office', 'Maritime Systems Lab – Integration Branch'],
    badge: 'None',
    badgeStyle: 'none',
  },
];

const WBS_OPTIONS: WBSOption[] = [
  { code: '5.1', description: 'Hull Systems' },
  { code: '5.2', description: 'Sensor Fusion Systems' },
  { code: '5.3', description: 'Combat Systems Integration' },
  { code: '5.4', description: 'Maintenance & Sustainment' },
  { code: '5.5', description: 'Logistics & Supply Chain' },
];

const FUNDING_SOURCE_DATA: FundingSourceRecord[] = [
  // O&MN
  { id: 'fs-omn-001', label: 'BLI 0721 — Surface Ship Maintenance (FY2026)',        appropriation: 'O&MN'  },
  { id: 'fs-omn-002', label: 'BLI 0812 — Littoral Combat Ship Support (FY2026)',    appropriation: 'O&MN'  },
  { id: 'fs-omn-003', label: 'BLI 0903 — Combat Systems Sustainment (FY2026)',      appropriation: 'O&MN'  },
  { id: 'fs-omn-004', label: 'BLI 1105 — Expeditionary Warfare Support (FY2026)',   appropriation: 'O&MN'  },
  // RDTEN
  { id: 'fs-rdt-001', label: 'BLI 0603 — Autonomous Systems R&D (FY2026)',          appropriation: 'RDTEN' },
  { id: 'fs-rdt-002', label: 'BLI 0847 — Mine Countermeasures Development (FY2026)',appropriation: 'RDTEN' },
  { id: 'fs-rdt-003', label: 'BLI 0721 — Undersea Sensor Integration (FY2026)',     appropriation: 'RDTEN' },
  // OPN
  { id: 'fs-opn-001', label: 'BLI 0554 — Maritime Surveillance Systems (FY2026)',   appropriation: 'OPN'   },
  { id: 'fs-opn-002', label: 'BLI 0412 — C2 Infrastructure Procurement (FY2026)',  appropriation: 'OPN'   },
];

// Placeholder funding source for when no real sources exist for the selected appropriation
const PLACEHOLDER_FUNDING_SOURCE: FundingSourceRecord = {
  id: 'fs-placeholder',
  label: 'PU/CC-001 (Sample Funding Source)',
  appropriation: '',
};

// ─── Badge helpers ────────────────────────────────────────────────────────────

type BadgeStyle = 'omn' | 'rdten' | 'opn' | 'none';

const BADGE_COLORS: Record<BadgeStyle, { bg: string; text: string }> = {
  omn:   { bg: '#99FFAD', text: '#1c2024' },
  rdten: { bg: '#F8FF94', text: '#1c2024' },
  opn:   { bg: '#F3A977', text: '#1c2024' },
  none:  { bg: '#e8e8ec', text: '#60646c' },
};

interface OptionBadge {
  label: string;
  style: BadgeStyle;
}

// Sentinel value for the "Add new execution statement" special option
const ADD_NEW_ES = '__ADD_NEW_ES__';

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldGroup({
  label,
  helperText,
  noteText,
  children,
  required,
  attempted,
  invalid,
}: {
  label: string;
  helperText?: string;
  noteText?: string;
  children: React.ReactNode;
  required?: boolean;
  attempted?: boolean;
  invalid?: boolean;
}) {
  const showError = !!(attempted && invalid);
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
        {label}
        {required && <span className="text-[#d4183d] ml-[2px]">*</span>}
      </label>
      {helperText && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0 -mt-[2px]">
          {helperText}
        </p>
      )}
      {children}
      {noteText && !showError && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646c] m-0">
          {noteText}
        </p>
      )}
      {showError && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#d4183d] m-0">
          Required
        </p>
      )}
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

function SelectInput({
  value,
  onChange,
  placeholder,
  disabled,
  options,
  error,
  searchable = false,
  optionDetailsMap,
  optionBadgeMap,
  specialFooterOption,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
  error?: boolean;
  searchable?: boolean;
  optionDetailsMap?: Record<string, string>;
  optionBadgeMap?: Record<string, OptionBadge>;
  specialFooterOption?: { value: string; label: string };
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [hoverCardVisible, setHoverCardVisible] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value) ?? (specialFooterOption && value === specialFooterOption.value ? { value: specialFooterOption.value, label: specialFooterOption.label } : undefined);

  const filteredOptions = searchable && search.trim()
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node) &&
        !(hoverCardRef.current && hoverCardRef.current.contains(e.target as Node))
      ) {
        setOpen(false);
        setSearch('');
        setHoveredOption(null);
        setHoverCardVisible(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Reset hover state when dropdown closes
  useEffect(() => {
    if (!open) {
      setHoveredOption(null);
      setHoverCardVisible(false);
    }
  }, [open]);

  function handleOptionMouseEnter(optValue: string) {
    if (!optionDetailsMap?.[optValue]) return;
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
    if (hoveredOption === optValue && hoverCardVisible) return;
    setHoveredOption(optValue);
    setHoverCardVisible(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoverCardVisible(true);
    }, 200);
  }

  function handleOptionMouseLeave() {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    hideTimerRef.current = setTimeout(() => {
      setHoveredOption(null);
      setHoverCardVisible(false);
    }, 150);
  }

  function handleHoverCardEnter() {
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
  }

  function handleHoverCardLeave() {
    hideTimerRef.current = setTimeout(() => {
      setHoveredOption(null);
      setHoverCardVisible(false);
    }, 100);
  }

  // Compute hover card position
  const hoverCardPosition = useMemo(() => {
    if (!hoveredOption || !hoverCardVisible) return null;
    const optEl = optionRefs.current[hoveredOption];
    const dropEl = dropdownRef.current;
    if (!optEl || !dropEl) return null;
    const optRect = optEl.getBoundingClientRect();
    const dropRect = dropEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    // Prefer right side
    const rightSpace = viewportWidth - dropRect.right;
    if (rightSpace >= 340) {
      return { top: optRect.top, left: dropRect.right + 6 };
    }
    // Fall back to left side
    return { top: optRect.top, left: dropRect.left - 6 - 360 };
  }, [hoveredOption, hoverCardVisible]);

  function handleSelect(val: string) {
    onChange(val);
    setOpen(false);
    setSearch('');
  }

  function handleToggle() {
    if (disabled) return;
    setOpen(o => !o);
    if (open) setSearch('');
  }

  const triggerBg = disabled ? '#e0e1e6' : (error ? '#fff0f2' : 'white');
  const triggerBorder = error
    ? '1px solid #d4183d'
    : disabled
    ? '1px solid rgba(0,6,46,0.12)'
    : open
    ? '1px solid #004B72'
    : '1px solid rgba(0,6,46,0.18)';

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className="w-full flex items-center justify-between px-[10px] py-[7px] rounded-[4px] text-left transition-colors"
        style={{
          background: triggerBg,
          border: triggerBorder,
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: '34px',
        }}
      >
        <span
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] truncate"
          style={{ color: disabled ? '#8b8d98' : selected ? '#1C2024' : '#8b8d98' }}
        >
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0 ml-[6px]"
          style={{ color: disabled ? '#8b8d98' : '#60646c' }}
        >
          <path
            d={open ? 'M2.5 9L7 4.5L11.5 9' : 'M2.5 5L7 9.5L11.5 5'}
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute z-[200] left-0 right-0 top-[calc(100%+4px)] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[rgba(0,6,46,0.10)] overflow-hidden"
          style={{ maxHeight: '220px', display: 'flex', flexDirection: 'column' }}
        >
          {searchable && (
            <div className="px-[8px] py-[6px] border-b border-[rgba(0,6,46,0.08)] shrink-0">
              <input
                autoFocus
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-[8px] py-[5px] rounded-[3px] border border-[rgba(0,6,46,0.18)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004B72]"
              />
            </div>
          )}
          <div className="overflow-y-auto" style={{ maxHeight: searchable ? '172px' : '220px' }}>
            {filteredOptions.length === 0 && !specialFooterOption ? (
              <div className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#8b8d98]">
                No options found
              </div>
            ) : (
              <>
                {filteredOptions.length === 0 && (
                  <div className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#8b8d98]">
                    No options found
                  </div>
                )}
                {filteredOptions.map(opt => {
                  const badge = optionBadgeMap?.[opt.value];
                  const badgeColors = badge ? BADGE_COLORS[badge.style] : null;
                  return (
                    <div
                      key={opt.value}
                      ref={el => { optionRefs.current[opt.value] = el; }}
                      onClick={() => handleSelect(opt.value)}
                      onMouseEnter={() => handleOptionMouseEnter(opt.value)}
                      onMouseLeave={handleOptionMouseLeave}
                      className={`flex items-center gap-[8px] px-[12px] py-[7px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer ${
                        opt.value === value ? 'bg-[rgba(0,75,114,0.06)]' : 'hover:bg-[#F9F9FB]'
                      }`}
                    >
                      {optionDetailsMap?.[opt.value] && (
                        <Info size={14} className="shrink-0 text-[#8b8d98]" strokeWidth={1.75} />
                      )}
                      <span className="truncate flex-1">{opt.label}</span>
                      {badge && badgeColors && (
                        <span
                          className="shrink-0 inline-flex items-center justify-center rounded-[4px] px-[6px] py-[2px]"
                          style={{
                            backgroundColor: badgeColors.bg,
                            color: badgeColors.text,
                            width: '72px',
                          }}
                        >
                          <span className="font-['Inter:SemiBold',sans-serif] font-semibold text-[12px] leading-[16px] truncate text-center">
                            {badge.label}
                          </span>
                        </span>
                      )}
                    </div>
                  );
                })}
                {/* Special footer option — visually separated, always visible */}
                {specialFooterOption && (
                  <>
                    <div className="mx-[8px] border-t border-[rgba(0,6,46,0.08)]" />
                    <div
                      onClick={() => handleSelect(specialFooterOption.value)}
                      className={`flex items-center gap-[8px] px-[12px] py-[7px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] cursor-pointer ${
                        value === specialFooterOption.value
                          ? 'bg-[rgba(0,75,114,0.06)] text-[#004B72]'
                          : 'text-[#004B72] hover:bg-[#F0F8FF]'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                        <path d="M7 2.5V11.5M2.5 7H11.5" stroke="#004B72" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="flex-1">{specialFooterOption.label}</span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {/* Hover card portal */}
          {hoverCardVisible && hoveredOption && optionDetailsMap?.[hoveredOption] && hoverCardPosition && createPortal(
            <div
              ref={hoverCardRef}
              onMouseEnter={handleHoverCardEnter}
              onMouseLeave={handleHoverCardLeave}
              className="fixed z-[300] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-[rgba(0,6,46,0.10)]"
              style={{
                top: hoverCardPosition.top,
                left: hoverCardPosition.left,
                width: '360px',
                padding: '14px 16px',
              }}
            >
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] m-0 whitespace-normal">
                {optionDetailsMap[hoveredOption]}
              </p>
            </div>,
            document.body
          )}
        </div>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-[10px] py-[7px] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none transition-colors"
      style={{
        border: error ? '1px solid #d4183d' : '1px solid rgba(0,6,46,0.18)',
        background: error ? '#fff0f2' : 'white',
        minHeight: '34px',
      }}
      onFocus={e => {
        if (!error) e.currentTarget.style.border = '1px solid #004B72';
      }}
      onBlur={e => {
        if (!error) e.currentTarget.style.border = '1px solid rgba(0,6,46,0.18)';
      }}
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface CreateTaskFlyoutProps {
  open: boolean;
  onClose: () => void;
  onTaskCreated?: (task: {
    taskId: string;
    title: string;
    executingActivity: string;
    requested: number;
  }) => void;
  onTaskCreatedAndOpen?: (task: {
    taskId: string;
    title: string;
    executingActivity: string;
    requested: number;
  }) => void;
}

export function CreateTaskFlyout({ open, onClose, onTaskCreated, onTaskCreatedAndOpen }: CreateTaskFlyoutProps) {
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);

  // ── Form state ────────────────────────────────────────────────────────────
  const [project, setProject] = useState('');
  const [isCODB, setIsCODB] = useState(false);
  const [executionStatement, setExecutionStatement] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [wbsAttribute, setWbsAttribute] = useState('');
  const [executingActivity, setExecutingActivity] = useState('');
  const [appropriation, setAppropriation] = useState('');
  const [fundingSource, setFundingSource] = useState('');
  const [attempted, setAttempted] = useState(false);
  // ── "Add new ES" mode state ────────────────────────────────────────────────
  const [newESText, setNewESText] = useState('');
  const isAddingNewES = executionStatement === ADD_NEW_ES;

  // ── Derived values ────────────────────────────────────────────────────────
  const selectedProject = PROJECTS.find(p => p.id === project) ?? null;
  const filteredES      = EXECUTION_STATEMENTS.filter(es => es.projectId === project);
  const selectedES      = EXECUTION_STATEMENTS.find(es => es.id === executionStatement) ?? null;

  // All unique activities and appropriations across all execution statements (for CODB mode)
  const allActivities = useMemo(() =>
    [...new Set(EXECUTION_STATEMENTS.flatMap(es => es.activities))], []);
  const allAppropriations = useMemo(() =>
    [...new Set(EXECUTION_STATEMENTS.flatMap(es => es.appropriations))], []);

  const availableAppropriations = isCODB ? allAppropriations : (selectedES?.appropriations ?? []);
  const availableActivities     = isCODB ? allActivities : (selectedES?.activities ?? []);
  const availableWBS            = (isCODB || executionStatement) ? WBS_OPTIONS : [];
  const availableFundingSources = appropriation
    ? FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appropriation)
    : isCODB ? FUNDING_SOURCE_DATA : [];

  const fundingSourceOptions = availableFundingSources.length > 0
    ? availableFundingSources
    : fundingSource === 'fs-placeholder'
    ? [PLACEHOLDER_FUNDING_SOURCE]
    : availableFundingSources;

  // ── Cascade resets ────────────────────────────────────────────────────────
  const prevProject = useRef('');
  useEffect(() => {
    if (prevProject.current === project) return;
    prevProject.current = project;
    setIsCODB(false);
    setExecutionStatement('');
    setWbsAttribute('');
    setExecutingActivity('');
    setAppropriation('');
    setFundingSource('');
  }, [project]);

  // Unified ES effect: cascade clear + APPN auto-select + FS chain resolved
  // atomically in one render pass, eliminating the cross-render race where
  // setAppropriation() in render N causes FS to only evaluate in render N+1,
  // and React silently skips that render when the APPN string is unchanged.
  const prevES = useRef('');
  useEffect(() => {
    if (prevES.current === executionStatement) return;
    prevES.current = executionStatement;

    setWbsAttribute('');
    setExecutingActivity('');

    if (!executionStatement) {
      setAppropriation('');
      setFundingSource('');
      return;
    }

    const es = EXECUTION_STATEMENTS.find(e => e.id === executionStatement);
    const appns = es?.appropriations ?? [];

    if (appns.length === 1) {
      // Auto-select APPN and immediately evaluate FS in the same setState batch
      setAppropriation(appns[0]);
      const sources = FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appns[0]);
      if (sources.length >= 1) {
        setFundingSource(sources[0].id);
      } else {
        setFundingSource('fs-placeholder');
      }
    } else {
      // Multiple or no valid APPNs — clear both, user must choose
      setAppropriation('');
      setFundingSource('');
    }
  }, [executionStatement]); // eslint-disable-line

  // APPN effect: handles user-driven APPN changes and re-evaluates FS
  const prevAppn = useRef('');
  useEffect(() => {
    if (prevAppn.current === appropriation) return;
    prevAppn.current = appropriation;

    if (!appropriation) {
      setFundingSource('');
      return;
    }
    const sources = FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appropriation);
    if (sources.length >= 1) {
      setFundingSource(sources[0].id);
    } else {
      setFundingSource('fs-placeholder');
    }
  }, [appropriation]); // eslint-disable-line

  // ── Auto-select single options ────────────────────────────────────────────

  // ES: auto-select when project yields exactly one statement
  useEffect(() => {
    if (filteredES.length === 1 && !executionStatement) {
      setExecutionStatement(filteredES[0].id);
    }
  }, [filteredES.length]); // eslint-disable-line

  // Activities: auto-select when ES resolves exactly one activity
  useEffect(() => {
    if (availableActivities.length === 1 && !executingActivity) {
      setExecutingActivity(availableActivities[0]);
    }
  }, [availableActivities.length]); // eslint-disable-line

  // ── Validation ────────────────────────────────────────────────────────────
  const isFormValid = useMemo(() => {
    if (!project) return false;
    if (!taskTitle.trim()) return false;
    if (isCODB) {
      if (!wbsAttribute) return false;
      if (!executingActivity) return false;
      if (!appropriation) return false;
      // fundingSource is optional in CODB mode
    } else if (isAddingNewES) {
      // "Add new ES" mode: only require the new ES text (task is created in draft)
      if (!newESText.trim()) return false;
    } else {
      // Non-CODB: Appropriation and Funding Source are derived/hidden; not user-validated
      if (!executionStatement) return false;
      if (!wbsAttribute) return false;
      if (!executingActivity) return false;
    }
    return true;
  }, [project, taskTitle, isCODB, isAddingNewES, newESText, executionStatement, wbsAttribute, executingActivity, appropriation, fundingSource]);

  // ── Animation ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setAnimating(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const resetForm = useCallback(() => {
    setProject('');
    setIsCODB(false);
    setExecutionStatement('');
    setTaskTitle('');
    setWbsAttribute('');
    setExecutingActivity('');
    setAppropriation('');
    setFundingSource('');
    setNewESText('');
    setAttempted(false);
    prevProject.current = '';
    prevES.current = '';
    prevAppn.current = '';
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleSubmit = useCallback(() => {
    setAttempted(true);
    if (!isFormValid) return;
    const taskId = `TSK-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    onTaskCreated?.({
      taskId,
      title: taskTitle,
      executingActivity: executingActivity || 'N/A',
      requested: 0,
    });
    resetForm();
    onClose();
  }, [isFormValid, taskTitle, executingActivity, onTaskCreated, resetForm, onClose]);

  const handleSubmitAndOpen = useCallback(() => {
    setAttempted(true);
    if (!isFormValid) return;
    const taskId = `TSK-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    onTaskCreatedAndOpen?.({
      taskId,
      title: taskTitle,
      executingActivity: executingActivity || 'N/A',
      requested: 0,
    });
    resetForm();
    onClose();
  }, [isFormValid, taskTitle, executingActivity, onTaskCreatedAndOpen, resetForm, onClose]);

  // Split button menu state
  const [splitMenuOpen, setSplitMenuOpen] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splitMenuOpen) return;
    function handler(e: MouseEvent) {
      if (splitRef.current && !splitRef.current.contains(e.target as Node)) {
        setSplitMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [splitMenuOpen]);

  if (!animating) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className="relative flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out"
        style={{
          width: '480px',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[rgba(0,6,46,0.12)] shrink-0">
          <span className="font-['Inter:SemiBold',sans-serif] font-semibold text-[16px] leading-[24px] text-[#1C2024]">
            Create Task
          </span>
          <button
            onClick={handleClose}
            className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] text-[#60646c] hover:bg-[#F9F9FB] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px] flex flex-col gap-[20px]">

          {/* 1. Project */}
          <FieldGroup label="Project" required attempted={attempted} invalid={!project}>
            <SelectInput
              value={project}
              onChange={setProject}
              placeholder="Select project..."
              disabled={false}
              options={PROJECTS.map(p => ({ value: p.id, label: p.label }))}
              error={attempted && !project}
              searchable
            />
          </FieldGroup>

          {/* 2. CODB checkbox — only when the exact "CODB" project is selected */}
          {project === 'proj-codb' && (
            <label
              className="flex items-center gap-[8px] cursor-pointer select-none"
              style={{ marginTop: '-4px' }}
            >
              <span
                className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-[3px] shrink-0 transition-colors"
                style={{
                  border: isCODB ? '1.5px solid #004b72' : '1.5px solid rgba(0,6,46,0.27)',
                  backgroundColor: isCODB ? '#004b72' : 'white',
                }}
              >
                {isCODB && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1.5 4L3.83 6.5L8.5 1.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                checked={isCODB}
                onChange={e => setIsCODB(e.target.checked)}
                className="sr-only"
              />
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                CODB Level Task (Tier 0)
              </span>
            </label>
          )}

          {/* 3. Execution Statement — hidden in CODB mode */}
          {!isCODB && (
            <FieldGroup
              label="Execution Statement"
              required={!isCODB}
              attempted={attempted}
              invalid={!isCODB && !executionStatement}
              helperText={!project ? 'Select a Project to enable' : undefined}
            >
              <SelectInput
                value={executionStatement}
                onChange={setExecutionStatement}
                placeholder={project ? 'Select execution statement...' : 'Select a Project first...'}
                disabled={!project}
                options={filteredES.map(es => ({ value: es.id, label: es.label }))}
                error={!isCODB && attempted && !executionStatement}
                searchable
                optionDetailsMap={Object.fromEntries(filteredES.map(es => [es.id, es.details]))}
                optionBadgeMap={Object.fromEntries(filteredES.map(es => [es.id, { label: es.badge, style: es.badgeStyle }]))}
                specialFooterOption={{ value: ADD_NEW_ES, label: 'Add new execution statement' }}
              />
            </FieldGroup>
          )}

          {/* 3b. Execution Statement Details — transforms when "Add new ES" is selected */}
          {!isCODB && (isAddingNewES ? (
            <div className="flex flex-col gap-[6px]">
              <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
                Add New Execution Statement
                <span className="text-[#d4183d] ml-[2px]">*</span>
              </label>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0 -mt-[2px]">
                Execution statement will be submitted for review and must be approved before this task can proceed from draft state.
              </p>
              <textarea
                value={newESText}
                onChange={e => setNewESText(e.target.value)}
                placeholder="Enter an execution statement..."
                rows={4}
                className="w-full px-[10px] py-[7px] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none transition-colors resize-none"
                style={{
                  border: attempted && !newESText.trim() ? '1px solid #d4183d' : '1px solid rgba(0,6,46,0.18)',
                  background: attempted && !newESText.trim() ? '#fff0f2' : 'white',
                }}
                onFocus={e => {
                  if (!(attempted && !newESText.trim())) e.currentTarget.style.border = '1px solid #004B72';
                }}
                onBlur={e => {
                  if (!(attempted && !newESText.trim())) e.currentTarget.style.border = '1px solid rgba(0,6,46,0.18)';
                }}
              />
              {attempted && !newESText.trim() && (
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#d4183d] m-0">
                  Required
                </p>
              )}
            </div>
          ) : selectedES ? (
            <div className="flex flex-col gap-[6px]">
              <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
                Execution Statement Details
              </label>
              <div
                className="px-[10px] py-[7px] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] whitespace-normal"
                style={{
                  background: '#F9F9FB',
                  border: '1px solid rgba(0,6,46,0.12)',
                  minHeight: '34px',
                }}
              >
                {selectedES.details}
              </div>
            </div>
          ) : project ? (
            <div className="flex flex-col gap-[6px]">
              <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
                Execution Statement Details
              </label>
              <div
                className="px-[10px] py-[7px] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#8b8d98]"
                style={{
                  background: '#F9F9FB',
                  border: '1px solid rgba(0,6,46,0.12)',
                  minHeight: '34px',
                }}
              >
                Select an execution statement to view details
              </div>
            </div>
          ) : null)}

          {/* 4. Task Title */}
          <FieldGroup label="Task Title" required attempted={attempted} invalid={!taskTitle.trim()}>
            <TextInput
              value={taskTitle}
              onChange={setTaskTitle}
              placeholder="Enter task title..."
              error={attempted && !taskTitle.trim()}
            />
          </FieldGroup>

          {/* 5. WBS Attribute */}
          <FieldGroup
            label="WBS Attribute"
            required
            attempted={attempted}
            invalid={!wbsAttribute}
            helperText={!isCODB && !selectedES ? 'Select the Work Breakdown Structure element for this task.' : undefined}
          >
            <SelectInput
              value={wbsAttribute}
              onChange={setWbsAttribute}
              placeholder={isCODB || selectedES ? 'Select WBS attribute...' : 'Select an Execution Statement first...'}
              disabled={!isCODB && !selectedES}
              options={availableWBS.map(wbs => ({ value: wbs.code, label: `${wbs.code} — ${wbs.description}` }))}
              error={attempted && !wbsAttribute}
              searchable
            />
          </FieldGroup>

          {/* 6. Executing Activity */}
          <FieldGroup
            label="Executing Activity"
            required
            attempted={attempted}
            invalid={!executingActivity}
            helperText={!isCODB && !selectedES ? 'Select an Execution Statement to enable activity selection' : undefined}
          >
            <SelectInput
              value={executingActivity}
              onChange={setExecutingActivity}
              placeholder={isCODB || selectedES ? 'Select executing activity...' : 'Select an Execution Statement first...'}
              disabled={!isCODB && !selectedES}
              options={availableActivities.map(a => ({ value: a, label: a }))}
              error={attempted && !executingActivity}
              searchable
            />
          </FieldGroup>

          {/* 7. Appropriation (APPN) — CODB mode only */}
          {isCODB && (
            <FieldGroup
              label="Appropriation (APPN)"
              required
              attempted={attempted}
              invalid={!appropriation}
            >
              <SelectInput
                value={appropriation}
                onChange={setAppropriation}
                placeholder="Select appropriation..."
                disabled={false}
                options={availableAppropriations.map(a => ({ value: a, label: a }))}
                error={attempted && !appropriation}
                searchable
              />
            </FieldGroup>
          )}

          {/* 8. Funding Source — CODB mode only */}
          {isCODB && (
            <FieldGroup
              label="Funding Source"
              attempted={attempted}
              invalid={false}
              noteText="Optional"
            >
              <SelectInput
                value={fundingSource}
                onChange={setFundingSource}
                placeholder="Select funding source..."
                disabled={!appropriation}
                options={fundingSourceOptions.map(fs => ({ value: fs.id, label: fs.label }))}
                error={false}
                searchable
              />
            </FieldGroup>
          )}

        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[rgba(0,6,46,0.12)] bg-white">
          <button
            type="button"
            onClick={handleClose}
            className="px-[16px] py-[7px] rounded-[4px] border border-[rgba(0,6,46,0.18)] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] hover:bg-[#F9F9FB] transition-colors"
          >
            Cancel
          </button>
          {/* Split button */}
          <div ref={splitRef} className="relative flex">
            <button
              type="button"
              onClick={isFormValid ? handleSubmit : undefined}
              disabled={!isFormValid}
              className={`px-[16px] py-[7px] rounded-l-[4px] rounded-r-none font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white transition-colors ${
                isFormValid ? 'hover:brightness-110 cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              style={{ backgroundColor: '#004B72' }}
            >
              Create Task
            </button>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.3)', alignSelf: 'stretch' }} />
            <button
              type="button"
              onClick={isFormValid ? () => setSplitMenuOpen(o => !o) : undefined}
              disabled={!isFormValid}
              className={`flex items-center justify-center px-[8px] py-[7px] rounded-r-[4px] rounded-l-none text-white transition-colors ${
                isFormValid ? 'hover:brightness-110 cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              style={{ backgroundColor: '#004B72' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d={splitMenuOpen ? 'M2.5 7.5L6 4L9.5 7.5' : 'M2.5 4.5L6 8L9.5 4.5'}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {splitMenuOpen && (
              <div
                className="absolute z-[200] right-0 bottom-[calc(100%+4px)] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[rgba(0,6,46,0.10)] overflow-hidden whitespace-nowrap"
              >
                <div
                  onClick={() => {
                    setSplitMenuOpen(false);
                    handleSubmitAndOpen();
                  }}
                  className="px-[12px] py-[7px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer hover:bg-[#F9F9FB] transition-colors"
                >
                  Create and go to workspace
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}