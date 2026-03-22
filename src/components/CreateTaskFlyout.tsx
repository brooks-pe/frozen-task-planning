import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AppropriationBadge } from './AppropriationBadge';

// ─── Mock Data ──────────────────────────────────────────────────────────────

interface ExecutionStatementOption {
  id: string;
  label: string;
  project: string;
  appropriation: string;
  activities: string[];
  programInitiative: string;
  l1Requirement: string;
}

interface WBSOption {
  code: string;
  description: string;
  executionStatementId: string;
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
];

const WBS_OPTIONS: WBSOption[] = [
  { code: '5.1', description: 'Hull Systems', executionStatementId: 'ES-001' },
  { code: '5.2', description: 'Sensor Fusion Systems', executionStatementId: 'ES-001' },
  { code: '5.3', description: 'Weapons Integration', executionStatementId: 'ES-001' },
  { code: '6.1', description: 'AI Navigation', executionStatementId: 'ES-002' },
  { code: '6.2', description: 'Autonomy Algorithms', executionStatementId: 'ES-002' },
  { code: '6.3', description: 'USV Platform Systems', executionStatementId: 'ES-002' },
  { code: '7.1', description: 'Acoustic Processing', executionStatementId: 'ES-003' },
  { code: '7.2', description: 'Sensor Array Integration', executionStatementId: 'ES-003' },
  { code: '8.1', description: 'Maritime Radar Systems', executionStatementId: 'ES-004' },
  { code: '8.2', description: 'Surveillance Data Fusion', executionStatementId: 'ES-004' },
];

const FUNDING_SOURCES = [
  'BLI 0956/RU00187 – sUSV 2 (FY2025)',
  'BLI 0957/RU00204 – MCM Ship Systems (FY2026)',
  'BLI 0410/RU00091 – Surface ASW (FY2026)',
  'BLI 0603/RU00312 – UUV Integration (FY2025)',
  'BLI 0847/RU00148 – Mine Countermeasures (FY2026)',
];

// ─── Component ──────────────────────────────────────────────────────────────

interface CreateTaskFlyoutProps {
  open: boolean;
  onClose: () => void;
  onTaskCreated?: (task: { taskId: string; title: string; executingActivity: string; requested: number }) => void;
}

export function CreateTaskFlyout({ open, onClose, onTaskCreated }: CreateTaskFlyoutProps) {
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Form state
  const [taskType, setTaskType] = useState<'CODB' | 'Non-CODB'>('CODB');
  const [taskTitle, setTaskTitle] = useState('');
  const [executionStatement, setExecutionStatement] = useState('');
  const [wbsAttribute, setWbsAttribute] = useState('');
  const [fundingSource, setFundingSource] = useState('');
  const [executingActivity, setExecutingActivity] = useState('');
  const [planningYear, setPlanningYear] = useState('FY2026');
  const [popStartDate, setPopStartDate] = useState('');
  const [popEndDate, setPopEndDate] = useState('');
  const [splitDropdownOpen, setSplitDropdownOpen] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);
  const [attempted, setAttempted] = useState(false);

  const selectedES = EXECUTION_STATEMENTS.find(es => es.id === executionStatement);
  const availableWBS = WBS_OPTIONS.filter(wbs => wbs.executionStatementId === executionStatement);

  // ─── Validation ─────────────────────────────────────────────────────────
  const isFormValid = useMemo(() => {
    if (!taskTitle.trim()) return false;
    if (!executionStatement) return false;
    if (!wbsAttribute) return false;
    if (!fundingSource) return false;
    if (!executingActivity || executingActivity === '__create_new__') return false;
    if (!planningYear) return false;
    if (!popStartDate.trim() || !popEndDate.trim()) return false;
    // Date order check (mm/dd/yyyy)
    const parseDate = (s: string) => { const p = s.split('/'); return p.length === 3 ? new Date(+p[2], +p[0] - 1, +p[1]) : null; };
    const sd = parseDate(popStartDate.trim());
    const ed = parseDate(popEndDate.trim());
    if (sd && ed && sd > ed) return false;
    // Non-CODB lineage
    if (taskType === 'Non-CODB' && !selectedES) return false;
    return true;
  }, [taskTitle, executionStatement, wbsAttribute, fundingSource, executingActivity, planningYear, popStartDate, popEndDate, taskType, selectedES]);

  // Animation lifecycle
  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
      document.body.style.overflow = 'hidden';
    } else {
      setAnimating(false);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as Node;
    // Don't close if clicking inside the panel
    if (panelRef.current && !panelRef.current.contains(target)) {
      // Don't close if clicking inside a date picker calendar
      if (target instanceof Element) {
        const isCalendarClick = target.closest('[data-datepicker-calendar]');
        if (isCalendarClick) return;
      }
      onClose();
    }
  }, [onClose]);

  const resetForm = useCallback(() => {
    setTaskType('CODB');
    setTaskTitle('');
    setExecutionStatement('');
    setWbsAttribute('');
    setFundingSource('');
    setExecutingActivity('');
    setPlanningYear('FY2026');
    setPopStartDate('');
    setPopEndDate('');
    setSplitDropdownOpen(false);
    setAttempted(false);
  }, []);

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleCreate = () => {
    if (!isFormValid) {
      setAttempted(true);
      return;
    }
    const nextId = `TSK-${String(538 + Math.floor(Math.random() * 100)).padStart(4, '0')}`;
    onTaskCreated?.({
      taskId: nextId,
      title: taskTitle || 'Untitled Task',
      executingActivity: selectedES?.activities?.[0] ?? 'PMS 420 – Program Office',
      requested: 0,
    });
    resetForm();
    onClose();
  };

  // Close split dropdown on outside click
  useEffect(() => {
    if (!splitDropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (splitRef.current && !splitRef.current.contains(e.target as Node)) {
        setSplitDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [splitDropdownOpen]);

  // Reset executing activity when execution statement changes
  useEffect(() => {
    setExecutingActivity('');
    setWbsAttribute('');
  }, [executionStatement]);

  if (!visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex justify-end"
      onClick={handleOverlayClick}
      style={{ pointerEvents: animating ? 'auto' : 'none' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          opacity: animating ? 1 : 0,
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative bg-white h-full flex flex-col shadow-[-8px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out"
        style={{
          width: '460px',
          maxWidth: '100vw',
          transform: animating ? 'translateX(0)' : 'translateX(100%)',
          pointerEvents: 'auto',
        }}
      >
        {/* ─── Header ────────────────────────────────────────────── */}
        <div className="shrink-0 px-[24px] pt-[24px] pb-[16px] border-b border-[#e0e1e6]">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[4px]">
              <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] leading-[28px] text-[#1C2024] m-0">
                Create Task
              </h2>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646c] m-0">
                Initialize a new task header for the current planning cycle. The task will be created in Draft status. You can add subtasks, BOE details, and deliverables from the Task Workspace after creation.
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 ml-[12px] mt-[2px] w-[28px] h-[28px] flex items-center justify-center rounded-[4px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f3] transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* ─── Body (scrollable) ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
          <div className="flex flex-col gap-[20px]">

            {/* Task Type */}
            <FieldGroup label="Task Type">
              <div className="flex items-center gap-[20px]">
                <RadioOption label="CODB" checked={taskType === 'CODB'} onChange={() => setTaskType('CODB')} name="taskType" />
                <RadioOption label="Non-CODB" checked={taskType === 'Non-CODB'} onChange={() => setTaskType('Non-CODB')} name="taskType" />
              </div>
            </FieldGroup>

            {/* Task Title */}
            <FieldGroup label="Task Title" required attempted={attempted} invalid={!taskTitle.trim()}>
              <TextInput
                value={taskTitle}
                onChange={setTaskTitle}
                placeholder="Enter task title..."
                error={attempted && !taskTitle.trim()}
              />
            </FieldGroup>

            {/* Execution Statement */}
            <FieldGroup label="Execution Statement" required attempted={attempted} invalid={!executionStatement}>
              <SelectInput
                value={executionStatement}
                onChange={setExecutionStatement}
                placeholder="Select execution statement..."
                options={EXECUTION_STATEMENTS.map(es => ({ value: es.id, label: es.label }))}
                error={attempted && !executionStatement}
              />
            </FieldGroup>

            {/* WBS Attribute */}
            <FieldGroup 
              label="WBS Attribute" 
              required 
              attempted={attempted} 
              invalid={!wbsAttribute}
              helperText={!selectedES ? 'Select the Work Breakdown Structure element for this task.' : undefined}
            >
              <SelectInput
                value={wbsAttribute}
                onChange={setWbsAttribute}
                placeholder={selectedES ? 'Select WBS attribute...' : 'Select an Execution Statement first...'}
                disabled={!selectedES}
                options={availableWBS.map(wbs => ({ 
                  value: wbs.code, 
                  label: `${wbs.code} — ${wbs.description}` 
                }))}
                error={attempted && !wbsAttribute}
              />
            </FieldGroup>

            {/* Project (system-driven) */}
            <FieldGroup label="Project">
              <SystemDrivenField
                value={selectedES?.project ?? ''}
                placeholder="Select an Execution Statement to populate"
                helperText={selectedES ? 'Driven by Execution Statement' : undefined}
              />
            </FieldGroup>

            {/* Appropriation (system-driven) */}
            <FieldGroup label="Appropriation">
              {selectedES ? (
                <div className="flex flex-col gap-[4px]">
                  <div className="h-[36px] px-[10px] rounded-[4px] border border-[rgba(0,6,46,0.12)] flex items-center bg-[#f5f5f7]">
                    <AppropriationBadge code={selectedES.appropriation} />
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0">
                    Driven by Execution Statement
                  </p>
                </div>
              ) : (
                <SystemDrivenField
                  value=""
                  placeholder="Select an Execution Statement to populate"
                />
              )}
            </FieldGroup>

            {/* Funding Source */}
            <FieldGroup label="Funding Source" required attempted={attempted} invalid={!fundingSource}>
              <SelectInput
                value={fundingSource}
                onChange={setFundingSource}
                placeholder="Select funding source..."
                options={FUNDING_SOURCES.map(fs => ({ value: fs, label: fs }))}
                error={attempted && !fundingSource}
              />
            </FieldGroup>

            {/* Executing Activity */}
            <FieldGroup label="Executing Activity" required attempted={attempted} invalid={!executingActivity || executingActivity === '__create_new__'} helperText={!selectedES ? 'Select an Execution Statement to enable activity selection' : undefined}>
              <SelectInput
                value={executingActivity}
                onChange={setExecutingActivity}
                placeholder={selectedES ? 'Select executing activity...' : 'Select an Execution Statement first...'}
                disabled={!selectedES}
                options={[
                  ...(selectedES?.activities ?? []).map(a => ({ value: a, label: a })),
                  { value: '__create_new__', label: '+ Create New Activity' },
                ]}
                error={attempted && (!executingActivity || executingActivity === '__create_new__')}
              />
            </FieldGroup>

            {/* Planning Year */}
            <FieldGroup label="Planning Year" required>
              <SelectInput
                value={planningYear}
                onChange={setPlanningYear}
                placeholder="Select planning year..."
                options={[
                  { value: 'FY2025', label: 'FY2025' },
                  { value: 'FY2026', label: 'FY2026' },
                  { value: 'FY2027', label: 'FY2027' },
                ]}
              />
            </FieldGroup>

            {/* Period of Performance */}
            <FieldGroup label="Period of Performance" required attempted={attempted} invalid={!popStartDate.trim() || !popEndDate.trim()}>
              <div className="flex items-center gap-[12px] min-w-0">
                <div className="flex-1 min-w-0">
                  <DatePickerInput
                    value={popStartDate}
                    onChange={setPopStartDate}
                    placeholder="mm/dd/yyyy"
                    error={attempted && !popStartDate.trim()}
                  />
                </div>
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#8b8d98] shrink-0">to</span>
                <div className="flex-1 min-w-0">
                  <DatePickerInput
                    value={popEndDate}
                    onChange={setPopEndDate}
                    placeholder="mm/dd/yyyy"
                    error={attempted && !popEndDate.trim()}
                  />
                </div>
              </div>
            </FieldGroup>

            {/* Requirement Lineage — only for Non-CODB */}
            {taskType === 'Non-CODB' && (
              <div className="flex flex-col gap-[16px] pt-[4px]">
                <div className="flex items-center gap-[8px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] m-0">
                    Requirement Lineage
                  </p>
                  <LineageInfoTooltip />
                </div>
                <FieldGroup label="Program Initiative">
                  <SystemDrivenField
                    value={selectedES?.programInitiative ?? ''}
                    placeholder="Select an Execution Statement above to populate"
                    helperText={selectedES ? 'Derived from Execution Statement' : undefined}
                  />
                </FieldGroup>
                <FieldGroup label="L1 Requirement">
                  <SystemDrivenField
                    value={selectedES?.l1Requirement ?? ''}
                    placeholder="Select an Execution Statement above to populate"
                    helperText={selectedES ? 'Derived from Execution Statement' : undefined}
                    multiline
                  />
                </FieldGroup>
              </div>
            )}

            {/* Helper text near footer */}
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0 mt-[4px]">
              The new task will be assigned the next available Task ID and created in Draft status.
            </p>
          </div>
        </div>

        {/* ─── Footer (sticky) ───────────────────────────────────── */}
        <div className="shrink-0 px-[24px] py-[16px] border-t border-[#e0e1e6] flex items-center justify-end gap-[12px]">
          <button
            onClick={handleCancel}
            className="h-[36px] px-[20px] rounded-[4px] border border-[rgba(0,8,48,0.27)] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024]"
          >
            Cancel
          </button>
          {/* Split Button */}
          <div ref={splitRef} className="relative flex items-center">
            <button
              onClick={handleCreate}
              className={`h-[36px] px-[16px] rounded-l-[4px] rounded-r-none border-none transition-colors font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] ${
                isFormValid
                  ? 'bg-[#004b72] cursor-pointer hover:bg-[#003a57] text-white'
                  : 'bg-[#e0e1e6] text-[#8b8d98] cursor-not-allowed'
              }`}
            >
              Create Task
            </button>
            <div className={`w-[1px] h-[36px] ${isFormValid ? 'bg-[rgba(255,255,255,0.25)]' : 'bg-[#c8c9cd]'}`} />
            <button
              onClick={() => isFormValid && setSplitDropdownOpen(!splitDropdownOpen)}
              className={`h-[36px] w-[32px] flex items-center justify-center rounded-r-[4px] rounded-l-none border-none transition-colors ${
                isFormValid
                  ? 'bg-[#004b72] cursor-pointer hover:bg-[#003a57]'
                  : 'bg-[#e0e1e6] cursor-not-allowed'
              }`}
              aria-label="More create options"
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke={isFormValid ? 'white' : '#8b8d98'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Split Dropdown Menu */}
            {splitDropdownOpen && (
              <div className="absolute bottom-full right-0 mb-[4px] w-[200px] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-[#e0e1e6] overflow-hidden z-[10]">
                <button
                  onClick={() => { setSplitDropdownOpen(false); handleCreate(); }}
                  className="w-full text-left px-[12px] py-[8px] border-none bg-transparent cursor-pointer hover:bg-[#f5f5f7] transition-colors font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]"
                >
                  Create & Stay Here
                </button>
                <button
                  className="w-full text-left px-[12px] py-[8px] border-none bg-transparent cursor-not-allowed font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#8b8d98]"
                  disabled
                  title="Task Workspace navigation coming soon"
                >
                  Create & Open Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

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

function LineageInfoTooltip() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible || !iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const tooltipWidth = 280;
    let left = rect.left - 4;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = rect.right - tooltipWidth + 4;
    }
    if (left < 16) left = 16;
    setPos({ top: rect.top - 6, left });
  }, [visible]);

  return (
    <span
      ref={iconRef}
      className="inline-flex items-center justify-center w-[16px] h-[16px] cursor-help shrink-0"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="#006496" strokeWidth="1.2" />
        <path d="M7 6.2V10" stroke="#006496" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="7" cy="4.4" r="0.7" fill="#006496" />
      </svg>
      {visible && createPortal(
        <span
          className="fixed z-[9999] bg-[#1C2024] text-white rounded-[4px] px-[10px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] w-[280px] shadow-[0_2px_8px_rgba(0,0,0,0.16)] pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
            transform: 'translateY(-100%)',
          }}
        >
          Requirement Lineage links the task to a Program Initiative and L1 Requirement. This ensures alignment to program priorities and enables aggregation of planning, funding, and execution data across related tasks.
        </span>,
        document.body
      )}
    </span>
  );
}

function FieldGroup({ label, helperText, children, required, attempted, invalid }: { label: string; helperText?: string; children: React.ReactNode; required?: boolean; attempted?: boolean; invalid?: boolean }) {
  const showError = attempted && invalid;
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
        {label}{required && <span className="text-[#d4183d] ml-[2px]">*</span>}
      </label>
      {helperText && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0 -mt-[2px]">
          {helperText}
        </p>
      )}
      {children}
      {showError && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#d4183d] m-0">
          Required
        </p>
      )}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, error }: { value: string; onChange: (v: string) => void; placeholder: string; error?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-[36px] px-[10px] bg-white rounded-[4px] border font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border ${error ? 'border-[#d4183d]' : 'border-[rgba(0,6,46,0.2)]'}`}
    />
  );
}

function SelectInput({ value, onChange, placeholder, options, disabled, error }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  error?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`h-[36px] w-full px-[10px] pr-[32px] rounded-[4px] border font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] outline-none appearance-none bg-white cursor-pointer focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow box-border ${
          disabled ? 'bg-[#f5f5f7] text-[#8b8d98] cursor-not-allowed' : value ? 'text-[#1C2024]' : 'text-[#8b8d98]'
        } ${error ? 'border-[#d4183d]' : ''}`}
        style={{ color: disabled ? '#8b8d98' : (value ? '#1C2024' : '#8b8d98') }}
      >
        <option value="" disabled style={{ color: '#8b8d98' }}>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value} style={{ color: '#1C2024' }}>{opt.label}</option>
        ))}
      </select>
      {/* Chevron */}
      <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke={disabled ? '#a0a1a6' : '#60646c'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function SystemDrivenField({ value, placeholder, helperText, multiline }: { value: string; placeholder: string; helperText?: string; multiline?: boolean }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <div
        className={`${multiline ? 'min-h-[36px] py-[8px]' : 'h-[36px]'} px-[10px] rounded-[4px] border border-[rgba(0,6,46,0.12)] flex items-center font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] ${
          value ? 'bg-[#f5f5f7] text-[#1C2024]' : 'bg-[#f9f9fb] text-[#8b8d98]'
        }`}
      >
        {value || placeholder}
      </div>
      {helperText && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0">
          {helperText}
        </p>
      )}
    </div>
  );
}

function DatePickerInput({ value, onChange, placeholder, error }: { value: string; onChange: (v: string) => void; placeholder: string; error?: boolean }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Parse mm/dd/yyyy to Date
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

  // Sync view when calendar opens
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

  // Compute position when calendar opens
  useEffect(() => {
    if (!calendarOpen || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const calW = 240;
    const calH = 320; // approximate max height
    const pad = 8;

    let top = rect.bottom + 4;
    let left = rect.left;

    // If calendar would overflow right edge, align to the right edge of the input
    if (left + calW > window.innerWidth - pad) {
      left = rect.right - calW;
    }
    // If still off-screen left, clamp
    if (left < pad) left = pad;

    // If calendar would overflow bottom, open upward
    if (top + calH > window.innerHeight - pad) {
      top = rect.top - calH - 4;
    }
    // If upward is also off-screen, clamp to top
    if (top < pad) top = pad;

    setDropdownStyle({ top, left });
  }, [calendarOpen]);

  // Close on outside click (handles portal)
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

  // Build calendar grid
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
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => { if (!calendarOpen) setCalendarOpen(true); }}
        placeholder={placeholder}
        className={`w-full h-[36px] px-[10px] pr-[34px] bg-white rounded-[4px] border font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow box-border cursor-pointer ${error ? 'border-[#d4183d]' : 'border-[rgba(0,6,46,0.2)]'}`}
      />
      {/* Calendar icon */}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setCalendarOpen(!calendarOpen)}
        className="absolute right-[8px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center border-none bg-transparent cursor-pointer p-0 rounded-[2px] hover:bg-[#f0f0f3] transition-colors"
        aria-label="Open calendar"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="#60646c" strokeWidth="1.2" />
          <path d="M1 5.5H13" stroke="#60646c" strokeWidth="1.2" />
          <path d="M4 1V3.5" stroke="#60646c" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M10 1V3.5" stroke="#60646c" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Calendar dropdown */}
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