import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

// Mock data

interface ProjectOption {
  id: string;
  label: string;
}

interface L1RequirementOption {
  id: string;
  label: string;
  details: string;
  projectId: string;
  appropriations: string[];
  activities: string[];
  /** Badge label shown in the L1 dropdown option row */
  badge: string;
  /** Badge color style: 'omn' | 'rdten' | 'opn' | 'none' */
  badgeStyle: 'omn' | 'rdten' | 'opn' | 'none';
}

interface L2RequirementOption {
  id: string;
  l1RequirementId: string;
  label: string;
  details: string;
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
  { id: 'proj-codb', label: 'CODB' },
  { id: 'proj-001', label: 'Surface Warfare Modernization Program' },
  { id: 'proj-002', label: 'Mine Countermeasures Innovation Program' },
  { id: 'proj-003', label: 'Undersea Warfare Systems Program' },
  { id: 'proj-004', label: 'Maritime ISR Modernization Program' },
];

const L1_REQUIREMENTS: L1RequirementOption[] = [
  {
    id: 'L1-001',
    label: 'Sustain surface warfare mission module integration readiness',
    details: 'Maintain integration readiness for Littoral Combat Ship mission modules and associated modernization priorities across the current planning cycle.',
    projectId: 'proj-001',
    appropriations: ['O&MN'],
    activities: ['PMS 420', 'NSWC DD'],
    badge: 'O&MN',
    badgeStyle: 'omn',
  },
  {
    id: 'L1-002',
    label: 'Grow autonomous mine countermeasures mission capability',
    details: 'Advance mine detection, neutralization, and unmanned mission-package performance for the Mine Countermeasures Innovation Program.',
    projectId: 'proj-002',
    appropriations: ['RDTEN', 'O&MN'],
    activities: ['NSWC PCD', 'PMS 420'],
    badge: 'RDTEN',
    badgeStyle: 'rdten',
  },
  {
    id: 'L1-003',
    label: 'Modernize undersea warfare tactical and acoustic capabilities',
    details: 'Improve tactical networking, acoustic communications, and sensor performance within the Undersea Warfare Systems Program.',
    projectId: 'proj-003',
    appropriations: ['RDTEN'],
    activities: ['NSWC DD', 'NSWC PCD'],
    badge: 'RDTEN',
    badgeStyle: 'rdten',
  },
  {
    id: 'L1-004',
    label: 'Modernize maritime ISR surveillance and radar capability',
    details: 'Improve surveillance coverage, radar modernization, and obsolescence response for Maritime ISR Modernization Program priorities.',
    projectId: 'proj-004',
    appropriations: ['OPN', 'RDTEN'],
    activities: ['PMS 420', 'NSWC PCD'],
    badge: 'OPN',
    badgeStyle: 'opn',
  },
  {
    id: 'L1-005',
    label: 'Coordinate CODB baseline planning and reconciliation',
    details: 'Coordinate CODB portfolio baseline planning, reconciliation, and cross-program alignment actions for PMS 420-managed priorities.',
    projectId: 'proj-codb',
    appropriations: ['O&MN', 'RDTEN'],
    activities: ['PMS 420'],
    badge: 'O&MN',
    badgeStyle: 'omn',
  },
];

const L2_REQUIREMENTS: L2RequirementOption[] = [
  { id: 'L2-001', l1RequirementId: 'L1-001', label: 'LCS mission module integration event support', details: 'Support upcoming Littoral Combat Ship mission module integration events and close readiness blockers before BOE build-up.' },
  { id: 'L2-002', l1RequirementId: 'L1-001', label: 'Propulsion health monitoring rollout prep', details: 'Prepare surface warfare modernization dependencies required for propulsion health monitoring dashboard rollout.' },
  { id: 'L2-003', l1RequirementId: 'L1-002', label: 'Autonomous mine detection classifier maturation', details: 'Improve classifier performance for autonomous mine detection concepts and follow-on activity acceptance packages.' },
  { id: 'L2-004', l1RequirementId: 'L1-002', label: 'USV sensor suite integration readiness', details: 'Align test planning and integration work for the Mine Countermeasures USV Sensor Suite effort.' },
  { id: 'L2-005', l1RequirementId: 'L1-003', label: 'Underwater acoustic communications prototype support', details: 'Advance prototype development and acoustic performance analysis for undersea warfare communications improvements.' },
  { id: 'L2-006', l1RequirementId: 'L1-004', label: 'Coastal surveillance radar modernization package', details: 'Package radar modernization work needed to address coastal surveillance coverage gaps and obsolescence risks.' },
  { id: 'L2-007', l1RequirementId: 'L1-005', label: 'CODB funding reconciliation support', details: 'Support CODB funding reconciliation, baseline adjustments, and cross-program planning alignment.' },
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
  { id: 'fs-omn-001', label: 'BLI 0721 - Surface Ship Maintenance (FY2026)',        appropriation: 'O&MN'  },
  { id: 'fs-omn-002', label: 'BLI 0812 - Littoral Combat Ship Support (FY2026)',    appropriation: 'O&MN'  },
  { id: 'fs-omn-003', label: 'BLI 0903 - Combat Systems Sustainment (FY2026)',      appropriation: 'O&MN'  },
  { id: 'fs-omn-004', label: 'BLI 1105 - Expeditionary Warfare Support (FY2026)',   appropriation: 'O&MN'  },
  // RDTEN
  { id: 'fs-rdt-001', label: 'BLI 0603 - Autonomous Systems R&D (FY2026)',          appropriation: 'RDTEN' },
  { id: 'fs-rdt-002', label: 'BLI 0847 - Mine Countermeasures Development (FY2026)',appropriation: 'RDTEN' },
  { id: 'fs-rdt-003', label: 'BLI 0721 - Undersea Sensor Integration (FY2026)',     appropriation: 'RDTEN' },
  // OPN
  { id: 'fs-opn-001', label: 'BLI 0554 - Maritime Surveillance Systems (FY2026)',   appropriation: 'OPN'   },
  { id: 'fs-opn-002', label: 'BLI 0412 - C2 Infrastructure Procurement (FY2026)',   appropriation: 'OPN'   },
];

// Placeholder funding source for when no real sources exist for the selected appropriation
const PLACEHOLDER_FUNDING_SOURCE: FundingSourceRecord = {
  id: 'fs-placeholder',
  label: 'PU/CC-001 (Sample Funding Source)',
  appropriation: '',
};

// Badge helpers

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


// Sub-components

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
                {/* Special footer option - visually separated, always visible */}
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

// Main component

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

  // Form state
  const [project, setProject] = useState('');
  const [isCODB, setIsCODB] = useState(false);
  const [l1Requirement, setL1Requirement] = useState('');
  const [l2Requirement, setL2Requirement] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [wbsAttribute, setWbsAttribute] = useState('');
  const [executingActivity, setExecutingActivity] = useState('');
  const [appropriation, setAppropriation] = useState('');
  const [fundingSource, setFundingSource] = useState('');
  const [attempted, setAttempted] = useState(false);

  // Derived values
  const filteredL1Requirements = L1_REQUIREMENTS.filter(req => req.projectId === project);
  const filteredL2Requirements = L2_REQUIREMENTS.filter(req => req.l1RequirementId === l1Requirement);
  const selectedL1Requirement = L1_REQUIREMENTS.find(req => req.id === l1Requirement) ?? null;
  const selectedL2Requirement = L2_REQUIREMENTS.find(req => req.id === l2Requirement) ?? null;

  const availableAppropriations = selectedL1Requirement?.appropriations ?? [];
  const availableActivities     = selectedL1Requirement?.activities ?? [];
  const availableWBS            = l1Requirement ? WBS_OPTIONS : [];
  const availableFundingSources = appropriation
    ? FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appropriation)
    : [];

  const fundingSourceOptions = availableFundingSources.length > 0
    ? availableFundingSources
    : fundingSource === 'fs-placeholder'
    ? [PLACEHOLDER_FUNDING_SOURCE]
    : availableFundingSources;

  // Cascade resets
  const prevProject = useRef('');
  useEffect(() => {
    if (prevProject.current === project) return;
    prevProject.current = project;
    setIsCODB(false);
    setL1Requirement('');
    setL2Requirement('');
    setWbsAttribute('');
    setExecutingActivity('');
    setAppropriation('');
    setFundingSource('');
  }, [project]);

  // Requirement effect: cascade clear + APPN auto-select + funding source chain
  // in one place so dependent fields stay in sync with the selected requirement.
  const prevL1Requirement = useRef('');
  useEffect(() => {
    if (prevL1Requirement.current === l1Requirement) return;
    prevL1Requirement.current = l1Requirement;

    setL2Requirement('');
    setWbsAttribute('');
    setExecutingActivity('');

    if (!l1Requirement) {
      setAppropriation('');
      setFundingSource('');
      return;
    }

    const requirement = L1_REQUIREMENTS.find(r => r.id === l1Requirement);
    const appns = requirement?.appropriations ?? [];

    if (appns.length === 1) {
      setAppropriation(appns[0]);
      const sources = FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appns[0]);
      if (sources.length >= 1) {
        setFundingSource(sources[0].id);
      } else {
        setFundingSource('fs-placeholder');
      }
    } else {
      setAppropriation('');
      setFundingSource('');
    }
  }, [l1Requirement]); // eslint-disable-line

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

  // Auto-select single options

  // L1 Requirement: auto-select when project yields exactly one option
  useEffect(() => {
    if (filteredL1Requirements.length === 1 && !l1Requirement) {
      setL1Requirement(filteredL1Requirements[0].id);
    }
  }, [filteredL1Requirements.length]); // eslint-disable-line

  // L2 Requirement: auto-select when selected L1 yields exactly one option
  useEffect(() => {
    if (filteredL2Requirements.length === 1 && !l2Requirement) {
      setL2Requirement(filteredL2Requirements[0].id);
    }
  }, [filteredL2Requirements.length]); // eslint-disable-line

  // Activities: auto-select when the selected requirement yields exactly one activity
  useEffect(() => {
    if (availableActivities.length === 1 && !executingActivity) {
      setExecutingActivity(availableActivities[0]);
    }
  }, [availableActivities.length]); // eslint-disable-line

  // Validation
  const isFormValid = useMemo(() => {
    if (!project) return false;
    if (!l1Requirement) return false;
    if (!taskTitle.trim()) return false;
    if (!wbsAttribute) return false;
    if (!executingActivity) return false;

    if (isCODB) {
      if (!appropriation) return false;
      // fundingSource is optional in CODB mode
    }
    return true;
  }, [project, l1Requirement, taskTitle, isCODB, wbsAttribute, executingActivity, appropriation, fundingSource]);

  // Animation
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

  // Helpers
  const resetForm = useCallback(() => {
    setProject('');
    setIsCODB(false);
    setL1Requirement('');
    setL2Requirement('');
    setTaskTitle('');
    setWbsAttribute('');
    setExecutingActivity('');
    setAppropriation('');
    setFundingSource('');
    setAttempted(false);
    prevProject.current = '';
    prevL1Requirement.current = '';
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

          {/* 2. CODB checkbox - only when the exact "CODB" project is selected */}
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

                    {/* 3. L1 Requirement */}
          <FieldGroup
            label="L1 Requirement"
            required
            attempted={attempted}
            invalid={!l1Requirement}
            helperText={!project ? 'Select a Project to enable' : undefined}
          >
            <SelectInput
              value={l1Requirement}
              onChange={setL1Requirement}
              placeholder={project ? 'Select L1 requirement...' : 'Select a Project first...'}
              disabled={!project}
              options={filteredL1Requirements.map(req => ({ value: req.id, label: req.label }))}
              error={attempted && !l1Requirement}
              searchable
              optionDetailsMap={Object.fromEntries(filteredL1Requirements.map(req => [req.id, req.details]))}
              optionBadgeMap={Object.fromEntries(filteredL1Requirements.map(req => [req.id, { label: req.badge, style: req.badgeStyle }]))}
            />
          </FieldGroup>

          {/* 3b. L2 Requirement (optional) */}
          <FieldGroup
            label="L2 Requirement"
            attempted={attempted}
            invalid={false}
            noteText="Optional"
            helperText={!l1Requirement ? 'Select an L1 Requirement to enable' : undefined}
          >
            <SelectInput
              value={l2Requirement}
              onChange={setL2Requirement}
              placeholder={l1Requirement ? 'Select L2 requirement...' : 'Select an L1 Requirement first...'}
              disabled={!l1Requirement}
              options={filteredL2Requirements.map(req => ({ value: req.id, label: req.label }))}
              searchable
              optionDetailsMap={Object.fromEntries(filteredL2Requirements.map(req => [req.id, req.details]))}
            />
          </FieldGroup>

          {/* 3c. Requirement Details */}
          {(selectedL2Requirement || selectedL1Requirement || project) && (
            <div className="flex flex-col gap-[6px]">
              <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
                Requirement Details
              </label>
              <div
                className="px-[10px] py-[7px] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] whitespace-normal"
                style={{
                  background: '#F9F9FB',
                  border: '1px solid rgba(0,6,46,0.12)',
                  minHeight: '34px',
                  color: selectedL2Requirement || selectedL1Requirement ? '#1C2024' : '#8b8d98',
                }}
              >
                {selectedL2Requirement?.details || selectedL1Requirement?.details || 'Select a requirement to view details'}
              </div>
            </div>
          )}

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
            helperText={!selectedL1Requirement ? 'Select an L1 Requirement to enable WBS selection' : undefined}
          >
            <SelectInput
              value={wbsAttribute}
              onChange={setWbsAttribute}
              placeholder={selectedL1Requirement ? 'Select WBS attribute...' : 'Select an L1 Requirement first...'}
              disabled={!selectedL1Requirement}
              options={availableWBS.map(wbs => ({ value: wbs.code, label: `${wbs.code} - ${wbs.description}` }))}
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
            helperText={!selectedL1Requirement ? 'Select an L1 Requirement to enable activity selection' : undefined}
          >
            <SelectInput
              value={executingActivity}
              onChange={setExecutingActivity}
              placeholder={selectedL1Requirement ? 'Select executing activity...' : 'Select an L1 Requirement first...'}
              disabled={!selectedL1Requirement}
              options={availableActivities.map(a => ({ value: a, label: a }))}
              error={attempted && !executingActivity}
              searchable
            />
          </FieldGroup>

          {/* 7. Appropriation (APPN) - CODB mode only */}
          {isCODB && (
            <FieldGroup
              label="Appropriation (APPN)"
              required
              attempted={attempted}
              invalid={!appropriation}
              helperText={!selectedL1Requirement ? 'Select an L1 Requirement to enable appropriation selection' : undefined}
            >
              <SelectInput
                value={appropriation}
                onChange={setAppropriation}
                placeholder={selectedL1Requirement ? 'Select appropriation...' : 'Select an L1 Requirement first...'}
                disabled={!selectedL1Requirement}
                options={availableAppropriations.map(a => ({ value: a, label: a }))}
                error={attempted && !appropriation}
                searchable
              />
            </FieldGroup>
          )}

          {/* 8. Funding Source - CODB mode only */}
          {isCODB && (
            <FieldGroup
              label="Funding Source"
              attempted={attempted}
              invalid={false}
              noteText="Optional"
              helperText={!selectedL1Requirement ? 'Select an L1 Requirement and appropriation to enable funding source selection' : undefined}
            >
              <SelectInput
                value={fundingSource}
                onChange={setFundingSource}
                placeholder={appropriation ? 'Select funding source...' : 'Select an appropriation first...'}
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
