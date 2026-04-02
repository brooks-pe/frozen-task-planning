import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Info, Copy, Trash2, Check, ChevronDown } from 'lucide-react';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { toast } from 'sonner@2.0.3';
import { useNavigate } from 'react-router';

// ─── Mock Data (same as flyout) ─────────────────────────────────────────────

interface ProjectOption { id: string; label: string; isCODB: boolean; }
interface L1RequirementOption { id: string; label: string; details: string; projectId: string; appropriations: string[]; activities: string[]; }
interface L2RequirementOption { id: string; l1RequirementId: string; label: string; details: string; }
interface WBSOption { code: string; description: string; }
interface FundingSourceRecord { id: string; label: string; appropriation: string; }

const PROJECTS: ProjectOption[] = [
  { id: 'proj-codb', label: 'CODB', isCODB: true },
  { id: 'proj-001', label: 'Littoral Combat Ship Mission Modules', isCODB: true },
  { id: 'proj-002', label: 'Unmanned Surface Vehicle Program', isCODB: true },
  { id: 'proj-003', label: 'Undersea Warfare Sensor Integration', isCODB: false },
  { id: 'proj-004', label: 'Maritime Domain Awareness Systems', isCODB: false },
];

const L1_REQUIREMENTS: L1RequirementOption[] = [
  { id: 'L1-001', label: 'USW Mission Package Readiness', details: 'Maintain deployable undersea warfare mission package readiness for near-term fleet operations.', projectId: 'proj-001', appropriations: ['O&MN'], activities: ['PMS 420 � Program Office', 'NSWC DD � Dahlgren Division'] },
  { id: 'L1-002', label: 'Autonomous Mine Warfare Capability', details: 'Expand autonomous mine warfare mission capability for contested maritime environments.', projectId: 'proj-002', appropriations: ['RDTEN', 'O&MN'], activities: ['NSWC PCD � Panama City Division', 'Naval AI Systems � AI/ML Division'] },
  { id: 'L1-003', label: 'Undersea Sensor Data Fusion', details: 'Improve sensor fusion and tactical processing for distributed undersea operations.', projectId: 'proj-003', appropriations: ['RDTEN'], activities: ['Undersea Warfare Lab � Acoustic Systems', 'Cyber Systems Division � Network Ops'] },
  { id: 'L1-004', label: 'Maritime ISR Modernization', details: 'Modernize maritime ISR integration to improve operator awareness and threat response.', projectId: 'proj-004', appropriations: ['OPN', 'RDTEN'], activities: ['Maritime Systems Lab � Integration Branch', 'PMS 420 � Program Office'] },
  { id: 'L1-005', label: 'CODB Baseline Portfolio Support', details: 'Support CODB portfolio baseline activities and cross-cutting sustainment priorities.', projectId: 'proj-codb', appropriations: ['O&MN', 'RDTEN'], activities: ['PMS 420 � Program Office'] },
];

const L2_REQUIREMENTS: L2RequirementOption[] = [
  { id: 'L2-001', l1RequirementId: 'L1-001', label: 'Sonar Integration Sprint', details: 'Incrementally integrate and validate sonar data pipelines for mission package use.' },
  { id: 'L2-002', l1RequirementId: 'L1-001', label: 'Fleet Readiness Defect Closure', details: 'Address known readiness defects required for deployment confidence.' },
  { id: 'L2-003', l1RequirementId: 'L1-002', label: 'USV Mine Detection Classifier', details: 'Improve autonomous mine classifier performance across representative environments.' },
  { id: 'L2-004', l1RequirementId: 'L1-002', label: 'Payload Integration Test Event', details: 'Execute payload integration event for unmanned mission package hardware/software.' },
  { id: 'L2-005', l1RequirementId: 'L1-003', label: 'Acoustic Processing Optimization', details: 'Optimize acoustic processing throughput and latency for operational mission tempo.' },
  { id: 'L2-006', l1RequirementId: 'L1-004', label: 'ISR Sensor Correlation Upgrade', details: 'Improve cross-sensor track correlation and mission-level display fidelity.' },
  { id: 'L2-007', l1RequirementId: 'L1-005', label: 'CODB Funding Reconciliation Support', details: 'Track and reconcile CODB baseline funding actions for planning execution.' },
];

const WBS_OPTIONS: WBSOption[] = [
  { code: '5.1', description: 'Hull Systems' },
  { code: '5.2', description: 'Sensor Fusion Systems' },
  { code: '5.3', description: 'Combat Systems Integration' },
  { code: '5.4', description: 'Maintenance & Sustainment' },
  { code: '5.5', description: 'Logistics & Supply Chain' },
];

const FUNDING_SOURCE_DATA: FundingSourceRecord[] = [
  { id: 'fs-omn-001', label: 'BLI 0721 — Surface Ship Maintenance (FY2026)', appropriation: 'O&MN' },
  { id: 'fs-omn-002', label: 'BLI 0812 — Littoral Combat Ship Support (FY2026)', appropriation: 'O&MN' },
  { id: 'fs-omn-003', label: 'BLI 0903 — Combat Systems Sustainment (FY2026)', appropriation: 'O&MN' },
  { id: 'fs-omn-004', label: 'BLI 1105 — Expeditionary Warfare Support (FY2026)', appropriation: 'O&MN' },
  { id: 'fs-rdt-001', label: 'BLI 0603 — Autonomous Systems R&D (FY2026)', appropriation: 'RDTEN' },
  { id: 'fs-rdt-002', label: 'BLI 0847 — Mine Countermeasures Development (FY2026)', appropriation: 'RDTEN' },
  { id: 'fs-rdt-003', label: 'BLI 0721 — Undersea Sensor Integration (FY2026)', appropriation: 'RDTEN' },
  { id: 'fs-opn-001', label: 'BLI 0554 — Maritime Surveillance Systems (FY2026)', appropriation: 'OPN' },
  { id: 'fs-opn-002', label: 'BLI 0412 — C2 Infrastructure Procurement (FY2026)', appropriation: 'OPN' },
];

const PLACEHOLDER_FUNDING_SOURCE: FundingSourceRecord = { id: 'fs-placeholder', label: 'PU/CC-001 (Sample Funding Source)', appropriation: '' };

// ─── Grid-inline SelectInput ─────────────────────────────────────────────────

interface SelectOption { value: string; label: string; }

function GridSelect({
  value, onChange, placeholder, disabled, options, searchable = false, optionDetailsMap, onBlur, error,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean;
  options: SelectOption[]; searchable?: boolean; optionDetailsMap?: Record<string, string>;
  onBlur?: () => void; error?: boolean;
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

  const selected = options.find(o => o.value === value);
  const filteredOptions = searchable && search.trim()
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node) &&
        !(hoverCardRef.current && hoverCardRef.current.contains(e.target as Node))
      ) { setOpen(false); setSearch(''); setHoveredOption(null); setHoverCardVisible(false); }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => { if (!open) { setHoveredOption(null); setHoverCardVisible(false); } }, [open]);

  function handleOptionMouseEnter(optValue: string) {
    if (!optionDetailsMap?.[optValue]) return;
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
    if (hoveredOption === optValue && hoverCardVisible) return;
    setHoveredOption(optValue);
    setHoverCardVisible(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setHoverCardVisible(true), 200);
  }

  function handleOptionMouseLeave() {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    hideTimerRef.current = setTimeout(() => { setHoveredOption(null); setHoverCardVisible(false); }, 150);
  }

  function handleHoverCardEnter() { if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; } }
  function handleHoverCardLeave() { hideTimerRef.current = setTimeout(() => { setHoveredOption(null); setHoverCardVisible(false); }, 100); }

  const hoverCardPosition = useMemo(() => {
    if (!hoveredOption || !hoverCardVisible) return null;
    const optEl = optionRefs.current[hoveredOption];
    const dropEl = dropdownRef.current;
    if (!optEl || !dropEl) return null;
    const optRect = optEl.getBoundingClientRect();
    const dropRect = dropEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const rightSpace = viewportWidth - dropRect.right;
    if (rightSpace >= 340) return { top: optRect.top, left: dropRect.right + 6 };
    return { top: optRect.top, left: dropRect.left - 6 - 360 };
  }, [hoveredOption, hoverCardVisible]);

  // Fire onBlur when dropdown closes after having been opened
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) { wasOpen.current = true; }
    else if (wasOpen.current) { wasOpen.current = false; onBlur?.(); }
  }, [open]);

  function handleSelect(val: string) { onChange(val); setOpen(false); setSearch(''); }
  function handleToggle() { if (disabled) return; setOpen(o => !o); if (open) setSearch(''); }

  const triggerBorder = disabled
    ? '1px solid #CDCED6'
    : open ? '1px solid #147DB9'
    : error ? '1px solid #e5484d'
    : '1px solid #B9BBC6';

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className="w-full flex items-center justify-between px-[8px] py-[5px] rounded-[3px] text-left transition-colors"
        style={{
          background: disabled ? '#f0f0f3' : 'white',
          border: triggerBorder,
          cursor: disabled ? 'not-allowed' : 'pointer',
          minHeight: '30px',
        }}
      >
        <span
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] truncate"
          style={{ color: disabled ? '#8b8d98' : selected ? '#1C2024' : '#8b8d98' }}
        >
          {selected ? selected.label : (placeholder || 'Select...')}
        </span>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="shrink-0 ml-[4px]" style={{ color: disabled ? '#8B8D98' : '#60646C' }}>
          <path d={open ? 'M2.5 9L7 4.5L11.5 9' : 'M2.5 5L7 9.5L11.5 5'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute z-[200] left-0 min-w-full top-[calc(100%+4px)] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#CDCED6] overflow-hidden"
          style={{ maxHeight: '220px', display: 'flex', flexDirection: 'column', width: 'max-content', minWidth: '100%', maxWidth: '360px' }}
        >
          {searchable && (
            <div className="px-[8px] py-[6px] border-b border-[#D9D9E0] shrink-0">
              <input
                autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-[8px] py-[5px] rounded-[3px] border border-[#B9BBC6] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#147DB9]"
              />
            </div>
          )}
          <div className="overflow-y-auto" style={{ maxHeight: searchable ? '172px' : '220px' }}>
            {filteredOptions.length === 0 ? (
              <div className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">No options found</div>
            ) : filteredOptions.map(opt => (
              <div
                key={opt.value}
                ref={el => { optionRefs.current[opt.value] = el; }}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => handleOptionMouseEnter(opt.value)}
                onMouseLeave={handleOptionMouseLeave}
                className={`flex items-center gap-[8px] px-[12px] py-[7px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer ${opt.value === value ? 'bg-[rgba(0,75,114,0.06)]' : 'hover:bg-[#F9F9FB]'}`}
              >
                {optionDetailsMap?.[opt.value] && <Info size={14} className="shrink-0 text-[#80838D]" strokeWidth={1.75} />}
                <span className="truncate">{opt.label}</span>
              </div>
            ))}
          </div>
          {hoverCardVisible && hoveredOption && optionDetailsMap?.[hoveredOption] && hoverCardPosition && createPortal(
            <div
              ref={hoverCardRef}
              onMouseEnter={handleHoverCardEnter}
              onMouseLeave={handleHoverCardLeave}
              className="fixed z-[300] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-[#CDCED6]"
              style={{ top: hoverCardPosition.top, left: hoverCardPosition.left, width: '360px', padding: '14px 16px' }}
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

// ─── Grid Column Definitions ──────────────────────────────────────────────────

const GRID_TEMPLATE = '24px 90px minmax(160px,1.2fr) 52px minmax(160px,1.4fr) minmax(140px,1.6fr) minmax(110px,1fr) minmax(140px,1.2fr) minmax(100px,0.9fr) minmax(140px,1.2fr) 72px';

const COL_HEADERS = [
  '', 'TASK ID', 'PROJECT', 'CODB', 'REQUIREMENT (L1/L2)', 'TASK TITLE',
  'WBS ATTRIBUTE', 'EXECUTING ACTIVITY', 'APPN', 'FUNDING SOURCE', 'ACTIONS',
];

// ─── Inline Error Message ─────────────────────────────────────────────────────

function FieldError({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#e5484d] mt-[2px] px-[2px] m-0">
      Required
    </p>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

let nextIdCounter = 2001;
function generateTaskId() {
  return `41-${String(nextIdCounter++).padStart(4, '0')}`;
}

// ─── Independent Row Component ───────────────────────────────────────────────

interface RowValues {
  project: string;
  isCODB: boolean;
  l1Requirement: string;
  l2Requirement: string;
  taskTitle: string;
  wbsAttribute: string;
  executingActivity: string;
  appropriation: string;
  fundingSource: string;
}

const EMPTY_ROW_VALUES: RowValues = {
  project: '', isCODB: false, l1Requirement: '', l2Requirement: '', taskTitle: '',
  wbsAttribute: '', executingActivity: '', appropriation: '', fundingSource: '',
};

function CreateTaskRow({ previewId, defaultValues, onDuplicate, onDelete, onValidityChange, validateAll }: {
  previewId: string;
  defaultValues?: RowValues;
  onDuplicate: (values: RowValues) => void;
  onDelete: () => void;
  onValidityChange?: (isComplete: boolean, hasData: boolean) => void;
  validateAll?: number;
}) {
  const dv = defaultValues ?? EMPTY_ROW_VALUES;
  const [project, setProject] = useState(dv.project);
  const [isCODB, setIsCODB] = useState(dv.isCODB);
  const [l1Requirement, setL1Requirement] = useState(dv.l1Requirement);
  const [l2Requirement, setL2Requirement] = useState(dv.l2Requirement);
  const [taskTitle, setTaskTitle] = useState(dv.taskTitle);
  const [wbsAttribute, setWbsAttribute] = useState(dv.wbsAttribute);
  const [executingActivity, setExecutingActivity] = useState(dv.executingActivity);
  const [appropriation, setAppropriation] = useState(dv.appropriation);
  const [fundingSource, setFundingSource] = useState(dv.fundingSource);

  // ── Touched tracking (validation only shows after blur) ──
  type FieldName = 'project' | 'l1Requirement' | 'taskTitle' | 'wbsAttribute' | 'executingActivity' | 'appropriation' | 'fundingSource';
  const [touched, setTouched] = useState<Set<FieldName>>(new Set());
  const touch = useCallback((f: FieldName) => setTouched(prev => { if (prev.has(f)) return prev; const n = new Set(prev); n.add(f); return n; }), []);
  const untouch = useCallback((...fields: FieldName[]) => setTouched(prev => { const n = new Set(prev); fields.forEach(f => n.delete(f)); return n; }), []);

    // Derived
  const selectedL1Requirement = L1_REQUIREMENTS.find(req => req.id === l1Requirement) ?? null;
  const filteredL1Requirements = L1_REQUIREMENTS.filter(req => req.projectId === project);
  const filteredL2Requirements = L2_REQUIREMENTS.filter(req => req.l1RequirementId === l1Requirement);
  const availableAppropriations = selectedL1Requirement?.appropriations ?? [];
  const availableActivities = selectedL1Requirement?.activities ?? [];
  const availableWBS = l1Requirement ? WBS_OPTIONS : [];
  const availableFundingSources = FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appropriation);
  const fundingSourceOptions = availableFundingSources.length > 0
    ? availableFundingSources
    : fundingSource === 'fs-placeholder' ? [PLACEHOLDER_FUNDING_SOURCE] : availableFundingSources;

  const isCODBRow = project === 'proj-codb' && isCODB;

  // ── Validation ──
  const errors = useMemo(() => {
    const e: Record<FieldName, boolean> = {
      project: !project,
      l1Requirement: !l1Requirement,
      taskTitle: !taskTitle.trim(),
      wbsAttribute: !isCODBRow && !wbsAttribute,
      executingActivity: !isCODBRow && !executingActivity,
      appropriation: !appropriation,
      fundingSource: !isCODBRow && !fundingSource,
    };
    return e;
  }, [project, isCODBRow, l1Requirement, taskTitle, wbsAttribute, executingActivity, appropriation, fundingSource]);

  const hasAnyTouched = touched.size > 0;
  const isComplete = !Object.values(errors).some(Boolean);

  // Show error only if field is touched AND has error AND field is required for this row type
  const showErr = (f: FieldName) => touched.has(f) && errors[f];

  // Cascade resets — also clear touched for downstream fields
  const prevProject = useRef(dv.project);
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
    untouch('l1Requirement', 'wbsAttribute', 'executingActivity', 'appropriation', 'fundingSource');
  }, [project]);

    const prevL1Requirement = useRef(dv.l1Requirement);
  useEffect(() => {
    if (prevL1Requirement.current === l1Requirement) return;
    prevL1Requirement.current = l1Requirement;
    setL2Requirement('');
    setWbsAttribute('');
    setExecutingActivity('');
    untouch('wbsAttribute', 'executingActivity');
    if (!l1Requirement) { setAppropriation(''); setFundingSource(''); untouch('appropriation', 'fundingSource'); return; }
    const requirement = L1_REQUIREMENTS.find(r => r.id === l1Requirement);
    const appns = requirement?.appropriations ?? [];
    if (appns.length === 1) {
      setAppropriation(appns[0]);
      const sources = FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appns[0]);
      setFundingSource(sources.length >= 1 ? sources[0].id : 'fs-placeholder');
    } else { setAppropriation(''); setFundingSource(''); untouch('appropriation', 'fundingSource'); }
  }, [l1Requirement]);

  const prevAppn = useRef(dv.appropriation);
  useEffect(() => {
    if (prevAppn.current === appropriation) return;
    prevAppn.current = appropriation;
    if (!appropriation) { setFundingSource(''); untouch('fundingSource'); return; }
    const sources = FUNDING_SOURCE_DATA.filter(fs => fs.appropriation === appropriation);
    setFundingSource(sources.length >= 1 ? sources[0].id : 'fs-placeholder');
  }, [appropriation]);

  // Auto-select single options
  useEffect(() => { if (filteredL1Requirements.length === 1 && !l1Requirement) setL1Requirement(filteredL1Requirements[0].id); }, [filteredL1Requirements.length]);
  useEffect(() => { if (filteredL2Requirements.length === 1 && !l2Requirement) setL2Requirement(filteredL2Requirements[0].id); }, [filteredL2Requirements.length]);
  useEffect(() => { if (availableActivities.length === 1 && !executingActivity) setExecutingActivity(availableActivities[0]); }, [availableActivities.length]);

  // Task title error border
  const titleHasError = showErr('taskTitle');

  // Notify parent of validity change
  const hasData = !!(project || taskTitle.trim() || l1Requirement || l2Requirement || wbsAttribute || executingActivity || appropriation || fundingSource);
  useEffect(() => {
    onValidityChange?.(isComplete, hasData);
  }, [isComplete, hasData]);

  // Force-validate all fields when validateAll counter increments
  const prevValidateAll = useRef(validateAll ?? 0);
  useEffect(() => {
    if (validateAll !== undefined && validateAll > prevValidateAll.current) {
      prevValidateAll.current = validateAll;
      const allFields: FieldName[] = ['project', 'l1Requirement', 'taskTitle', 'wbsAttribute', 'executingActivity', 'appropriation', 'fundingSource'];
      setTouched(new Set(allFields));
    }
  }, [validateAll]);

  return (
    <div
      className="min-w-0"
      style={{ display: 'grid', gridTemplateColumns: GRID_TEMPLATE, gap: '0', alignItems: 'start', borderBottom: '1px solid #D9D9E0' }}
    >
      {/* Status indicator */}
      <div className="flex items-center justify-center" style={{ minHeight: '42px', paddingTop: '6px' }}>
        {hasAnyTouched && (
          isComplete ? (
            <span className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full" style={{ backgroundColor: 'rgba(0,113,63,0.12)' }}>
              <Check size={10} strokeWidth={2.5} style={{ color: 'rgba(0,113,63,0.87)' }} />
            </span>
          ) : (
            <span
              className="inline-block w-[8px] h-[8px] rounded-full"
              style={{ backgroundColor: '#f5a623' }}
            />
          )
        )}
      </div>

      {/* Task ID (read-only) */}
      <div className="px-[8px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646c] truncate flex items-center" style={{ minHeight: '42px' }}>
        {previewId}
      </div>

      {/* Project */}
      <div className="px-[4px] py-[6px]">
        <GridSelect
          value={project}
          onChange={setProject}
          placeholder="Select..."
          options={PROJECTS.map(p => ({ value: p.id, label: p.label }))}
          searchable
          onBlur={() => touch('project')}
          error={showErr('project')}
        />
        <FieldError show={!!showErr('project')} />
      </div>

      {/* CODB */}
      <div className="px-[4px] py-[6px] flex items-center justify-center" style={{ minHeight: '42px' }}>
        {project === 'proj-codb' ? (
          <label className="flex items-center cursor-pointer select-none">
            <span
              className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-[3px] shrink-0 transition-colors"
              style={{
                border: isCODB ? '1.5px solid #004B72' : '1.5px solid #8B8D98',
                backgroundColor: isCODB ? '#004b72' : 'white',
              }}
            >
              {isCODB && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1.5 4L3.83 6.5L8.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <input type="checkbox" checked={isCODB} onChange={e => setIsCODB(e.target.checked)} className="sr-only" />
          </label>
        ) : (
          <span className="text-[#8b8d98] text-[14px]">—</span>
        )}
      </div>

            {/* Requirement (L1/L2) */}
      <div className="px-[4px] py-[6px]">
        <div className="flex flex-col gap-[6px]">
          <GridSelect
            value={l1Requirement}
            onChange={setL1Requirement}
            placeholder={project ? 'Select L1...' : '�'}
            disabled={!project}
            options={filteredL1Requirements.map(req => ({ value: req.id, label: req.label }))}
            searchable
            optionDetailsMap={Object.fromEntries(filteredL1Requirements.map(req => [req.id, req.details]))}
            onBlur={() => touch('l1Requirement')}
            error={!!showErr('l1Requirement')}
          />
          <GridSelect
            value={l2Requirement}
            onChange={setL2Requirement}
            placeholder={l1Requirement ? 'Select L2 (optional)...' : '�'}
            disabled={!l1Requirement}
            options={filteredL2Requirements.map(req => ({ value: req.id, label: req.label }))}
            searchable
            optionDetailsMap={Object.fromEntries(filteredL2Requirements.map(req => [req.id, req.details]))}
          />
        </div>
        <FieldError show={!!showErr('l1Requirement')} />
      </div>

      {/* Task Title */}
      <div className="px-[4px] py-[6px]">
        <input
          type="text"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          placeholder="Enter title..."
          className="w-full px-[8px] py-[5px] rounded-[3px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none transition-colors"
          style={{ border: titleHasError ? '1px solid #e5484d' : '1px solid #B9BBC6', background: 'white', minHeight: '30px' }}
          onFocus={e => { if (!titleHasError) e.currentTarget.style.border = '1px solid #147DB9'; }}
          onBlur={e => { touch('taskTitle'); const hasErr = !taskTitle.trim(); e.currentTarget.style.border = hasErr ? '1px solid #e5484d' : '1px solid #B9BBC6'; }}
        />
        <FieldError show={!!titleHasError} />
      </div>

      {/* WBS Attribute */}
      <div className="px-[4px] py-[6px]">
        <GridSelect
          value={wbsAttribute}
          onChange={setWbsAttribute}
          placeholder={selectedL1Requirement && !isCODBRow ? 'Select...' : '—'}
          disabled={!selectedL1Requirement || isCODBRow}
          options={availableWBS.map(wbs => ({ value: wbs.code, label: `${wbs.code} — ${wbs.description}` }))}
          searchable
          onBlur={() => touch('wbsAttribute')}
          error={!isCODBRow && !!showErr('wbsAttribute')}
        />
        {!isCODBRow && <FieldError show={!!showErr('wbsAttribute')} />}
      </div>

      {/* Executing Activity */}
      <div className="px-[4px] py-[6px]">
        <GridSelect
          value={executingActivity}
          onChange={setExecutingActivity}
          placeholder={selectedL1Requirement && !isCODBRow ? 'Select...' : '—'}
          disabled={!selectedL1Requirement || isCODBRow}
          options={availableActivities.map(a => ({ value: a, label: a }))}
          searchable
          onBlur={() => touch('executingActivity')}
          error={!isCODBRow && !!showErr('executingActivity')}
        />
        {!isCODBRow && <FieldError show={!!showErr('executingActivity')} />}
      </div>

      {/* Appropriation (APPN) */}
      <div className="px-[4px] py-[6px]">
        <GridSelect
          value={appropriation}
          onChange={setAppropriation}
          placeholder={selectedL1Requirement ? 'Select...' : '—'}
          disabled={!selectedL1Requirement}
          options={availableAppropriations.map(a => ({ value: a, label: a }))}
          searchable
          onBlur={() => touch('appropriation')}
          error={!!showErr('appropriation')}
        />
        <FieldError show={!!showErr('appropriation')} />
      </div>

      {/* Funding Source */}
      <div className="px-[4px] py-[6px]">
        <GridSelect
          value={fundingSource}
          onChange={setFundingSource}
          placeholder={appropriation && !isCODBRow ? 'Select...' : '—'}
          disabled={!appropriation || isCODBRow}
          options={fundingSourceOptions.map(fs => ({ value: fs.id, label: fs.label }))}
          searchable
          onBlur={() => touch('fundingSource')}
          error={!isCODBRow && !!showErr('fundingSource')}
        />
        {!isCODBRow && <FieldError show={!!showErr('fundingSource')} />}
      </div>

      {/* Actions */}
      <div className="px-[4px] py-[6px] flex items-center justify-center gap-[8px]" style={{ minHeight: '42px' }}>
        <button
          type="button"
          onClick={() => onDuplicate({ project, isCODB, l1Requirement, l2Requirement, taskTitle, wbsAttribute, executingActivity, appropriation, fundingSource })}
          className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-[4px] border border-[#CDCED6] bg-white text-[#60646c] hover:bg-[#F9F9FB] hover:text-[#1C2024] transition-colors cursor-pointer"
        >
          <Copy size={14} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-[4px] border border-[#CDCED6] bg-white text-[#60646c] hover:bg-[#FFF1F0] hover:text-[#cf1322] transition-colors cursor-pointer"
        >
          <Trash2 size={14} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────

interface RowEntry {
  key: string;
  previewId: string;
  defaultValues?: RowValues;
}

let rowKeyCounter = 0;
function nextRowKey() { return `row-${++rowKeyCounter}`; }

export default function CreateTaskGrid() {
  const [rows, setRows] = useState<RowEntry[]>(() => [{ key: nextRowKey(), previewId: generateTaskId() }]);
  const navigate = useNavigate();

  // Track per-row validity & data presence
  const [validityMap, setValidityMap] = useState<Record<string, { complete: boolean; hasData: boolean }>>({});
  const [validateAllCounter, setValidateAllCounter] = useState(0);
  const [splitOpen, setSplitOpen] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);

  // Close split dropdown on outside click
  useEffect(() => {
    if (!splitOpen) return;
    function handler(e: MouseEvent) {
      if (splitRef.current && !splitRef.current.contains(e.target as Node)) setSplitOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [splitOpen]);

  // Derived: how many rows are valid, any data entered
  const completeKeys = useMemo(() => rows.filter(r => validityMap[r.key]?.complete).map(r => r.key), [rows, validityMap]);
  const hasAnyData = useMemo(() => rows.some(r => validityMap[r.key]?.hasData), [rows, validityMap]);
  const allComplete = completeKeys.length === rows.length && rows.length > 0;
  const someComplete = completeKeys.length > 0;

  const handleValidityChange = useCallback((key: string, isComplete: boolean, hasData: boolean) => {
    setValidityMap(prev => {
      const existing = prev[key];
      if (existing && existing.complete === isComplete && existing.hasData === hasData) return prev;
      return { ...prev, [key]: { complete: isComplete, hasData } };
    });
  }, []);

  const handleAddTask = useCallback(() => {
    setRows(prev => [...prev, { key: nextRowKey(), previewId: generateTaskId() }]);
  }, []);

  const handleDuplicate = useCallback((afterKey: string, values: RowValues) => {
    setRows(prev => {
      const idx = prev.findIndex(r => r.key === afterKey);
      const newRow: RowEntry = { key: nextRowKey(), previewId: generateTaskId(), defaultValues: { ...values } };
      const next = [...prev];
      next.splice(idx + 1, 0, newRow);
      return next;
    });
  }, []);

  const handleDelete = useCallback((key: string) => {
    setValidityMap(prev => { const n = { ...prev }; delete n[key]; return n; });
    setRows(prev => {
      if (prev.length <= 1) {
        return [{ key: nextRowKey(), previewId: generateTaskId() }];
      }
      return prev.filter(r => r.key !== key);
    });
  }, []);

  const handleResetAll = useCallback(() => {
    setValidityMap({});
    setValidateAllCounter(0);
    setRows([{ key: nextRowKey(), previewId: generateTaskId() }]);
  }, []);

  const performCreate = useCallback((openWorkspace: boolean) => {
    // Force-validate all rows to show errors on incomplete rows
    setValidateAllCounter(prev => prev + 1);

    // Use a microtask to let validation settle, then check
    setTimeout(() => {
      // We use the current validity map to determine which rows are complete
      // But since validateAll just fired, incomplete rows will now show errors
      // We submit all complete rows
      const currentCompleteKeys = rows.filter(r => validityMap[r.key]?.complete).map(r => r.key);

      if (currentCompleteKeys.length === 0) {
        // No valid rows — nothing to submit
        return;
      }

      const count = currentCompleteKeys.length;
      toast.success(`${count} task${count !== 1 ? 's' : ''} created`);

      // Remove submitted rows, keep incomplete ones
      const remainingRows = rows.filter(r => !currentCompleteKeys.includes(r.key));

      // Clean up validity map
      setValidityMap(prev => {
        const n = { ...prev };
        currentCompleteKeys.forEach(k => delete n[k]);
        return n;
      });

      if (remainingRows.length === 0) {
        setRows([{ key: nextRowKey(), previewId: generateTaskId() }]);
      } else {
        setRows(remainingRows);
      }

      if (openWorkspace) {
        navigate('/task-planning/tasks/41-0279');
      }
    }, 50);
  }, [rows, validityMap, navigate]);

  const handleCreateTasks = useCallback(() => performCreate(false), [performCreate]);
  const handleCreateAndOpen = useCallback(() => { setSplitOpen(false); performCreate(true); }, [performCreate]);

  return (
    <div className="flex flex-col items-start p-[24px] w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-[12px] items-start py-[16px] w-full relative">
        <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <div className="flex flex-col gap-[4px] items-start w-full">
          <h1 className="font-['Inter',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px] tracking-[0px]">
            Create Task
          </h1>
          <p className="font-['Inter',sans-serif] font-normal leading-[20px] not-italic text-[#60646c] text-[14px] tracking-[0px]">
            Create one or more task shells quickly using the grid below. Complete the required fields, then create the task or open the task workspace.
          </p>
        </div>
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Task Planning', path: '/task-planning/dashboard' },
          { label: 'Tasks', path: '/task-planning/tasks' },
          { label: 'Create Task' },
        ]} />
      </div>

      {/* Spacer */}
      <div className="h-[24px] w-full" />

      {/* Grid Table */}
      <div className="w-full" style={{ overflow: 'visible' }}>
        {/* Header */}
        <div
          className="min-w-0"
          style={{ display: 'grid', gridTemplateColumns: GRID_TEMPLATE, gap: '0', borderBottom: '1px solid #CDCED6' }}
        >
          {COL_HEADERS.map((h, i) => (
            <div
              key={h || `col-${i}`}
              className="px-[8px] py-[8px] font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#60646c] truncate"
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <CreateTaskRow
            key={row.key}
            previewId={row.previewId}
            defaultValues={row.defaultValues}
            onDuplicate={(values) => handleDuplicate(row.key, values)}
            onDelete={() => handleDelete(row.key)}
            onValidityChange={(isComplete, hasData) => handleValidityChange(row.key, isComplete, hasData)}
            validateAll={validateAllCounter}
          />
        ))}
      </div>

      {/* Add Task button */}
      <div className="flex items-center mt-[16px]">
        <button
          type="button"
          onClick={handleAddTask}
          className="px-[16px] py-[7px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white cursor-pointer hover:brightness-110 transition-colors"
          style={{ backgroundColor: '#004B72' }}
        >
          Add Task
        </button>
      </div>

      {/* ── Bottom Action Bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between w-full mt-[24px] pt-[16px]" style={{ borderTop: '1px solid #CDCED6' }}>
        {/* Left: Reset All */}
        <button
          type="button"
          onClick={handleResetAll}
          disabled={!hasAnyData}
          className="px-[16px] py-[7px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] transition-colors"
          style={{
            border: '1px solid #B9BBC6',
            backgroundColor: 'white',
            color: hasAnyData ? '#1C2024' : '#8b8d98',
            cursor: hasAnyData ? 'pointer' : 'not-allowed',
            opacity: hasAnyData ? 1 : 0.6,
          }}
        >
          Reset All
        </button>

        {/* Right: Create Tasks split button */}
        <div ref={splitRef} className="relative flex items-center">
          {/* Primary action */}
          <button
            type="button"
            onClick={handleCreateTasks}
            disabled={!someComplete}
            className="px-[16px] py-[7px] rounded-l-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white transition-colors"
            style={{
              backgroundColor: someComplete ? '#004B72' : '#8b8d98',
              cursor: someComplete ? 'pointer' : 'not-allowed',
              borderRight: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            Create Tasks
          </button>
          {/* Split dropdown trigger */}
          <button
            type="button"
            onClick={() => { if (someComplete) setSplitOpen(o => !o); }}
            disabled={!someComplete}
            className="px-[8px] py-[7px] rounded-r-[4px] text-white transition-colors flex items-center justify-center"
            style={{
              backgroundColor: someComplete ? '#004B72' : '#8b8d98',
              cursor: someComplete ? 'pointer' : 'not-allowed',
              minHeight: '34px',
            }}
          >
            <ChevronDown size={14} strokeWidth={2} />
          </button>
          {/* Dropdown */}
          {splitOpen && (
            <div
              className="absolute right-0 bottom-[calc(100%+4px)] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#CDCED6] overflow-hidden z-[200]"
              style={{ minWidth: '260px' }}
            >
              <div
                onClick={handleCreateAndOpen}
                className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer hover:bg-[#F9F9FB] whitespace-nowrap"
              >
                Create Tasks and Open Workspace
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





