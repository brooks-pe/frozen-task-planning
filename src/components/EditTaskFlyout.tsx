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
    project: 'Coastal Surveillance Modernization',
    appropriation: 'O&MN',
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

interface EditTaskFlyoutProps {
  open: boolean;
  onClose: () => void;
  onTaskUpdated?: (task: { taskId: string; title: string }) => void;
  taskId: string;
}

export function EditTaskFlyout({ open, onClose, onTaskUpdated, taskId }: EditTaskFlyoutProps) {
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Form state — pre-populated with current task values
  const [taskType, setTaskType] = useState<'CODB' | 'Non-CODB'>('CODB');
  const [taskTitle, setTaskTitle] = useState('Coastal Surveillance Sensor Integration');
  const [executionStatement, setExecutionStatement] = useState('ES-004');
  const [wbsAttribute, setWbsAttribute] = useState('8.2');
  const [fundingSource, setFundingSource] = useState('');
  const [executingActivity, setExecutingActivity] = useState('PMS 420 – Program Office');
  const [planningYear, setPlanningYear] = useState('FY2026');
  const [popStartDate, setPopStartDate] = useState('');
  const [popEndDate, setPopEndDate] = useState('');
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
    return true;
  }, [taskTitle, executionStatement, wbsAttribute, fundingSource, executingActivity, planningYear, popStartDate, popEndDate]);

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

  const handleCancel = () => {
    setAttempted(false);
    onClose();
  };

  const handleSave = () => {
    if (!isFormValid) {
      setAttempted(true);
      return;
    }
    onTaskUpdated?.({
      taskId,
      title: taskTitle || 'Untitled Task',
    });
    setAttempted(false);
    onClose();
  };

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
                Edit Task
              </h2>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646c] m-0">
                Update task metadata and planning attributes. Changes will be saved to the current task.
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

            {/* Execution Statement - Disabled for now (conditionally editable) */}
            <FieldGroup label="Execution Statement" required attempted={attempted} invalid={!executionStatement}>
              <SelectInput
                value={executionStatement}
                onChange={setExecutionStatement}
                placeholder="Select execution statement..."
                options={EXECUTION_STATEMENTS.map(es => ({ value: es.id, label: es.label }))}
                disabled={true}
                error={attempted && !executionStatement}
              />
            </FieldGroup>

            {/* WBS Attribute */}
            <FieldGroup 
              label="WBS Attribute" 
              required 
              attempted={attempted} 
              invalid={!wbsAttribute}
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

            {/* Project (read-only, system-driven) */}
            <FieldGroup label="Project">
              <SystemDrivenField
                value={selectedES?.project ?? ''}
                placeholder="Select an Execution Statement to populate"
                helperText="Driven by Execution Statement"
              />
            </FieldGroup>

            {/* Appropriation (read-only badge, system-driven) */}
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
            <FieldGroup label="Executing Activity" required attempted={attempted} invalid={!executingActivity || executingActivity === '__create_new__'}>
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
                noSearch
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
          <button
            onClick={handleSave}
            className={`h-[36px] px-[16px] rounded-[4px] border-none transition-colors font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] ${
              isFormValid
                ? 'bg-[#004b72] cursor-pointer hover:bg-[#003a57] text-white'
                : 'bg-[#e0e1e6] text-[#8b8d98] cursor-not-allowed'
            }`}
          >
            Save Changes
          </button>
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

function SelectInput({ value, onChange, placeholder, options, disabled, error, noSearch }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  error?: boolean;
  noSearch?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  const selectedLabel = options.find(o => o.value === value)?.label ?? '';
  const filteredOptions = search
    ? options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleOpen = useCallback(() => {
    if (disabled) return;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setIsOpen(true);
    setSearch('');
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch('');
  }, []);

  const handleSelect = useCallback((val: string) => {
    onChange(val);
    handleClose();
  }, [onChange, handleClose]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inContainer = containerRef.current?.contains(target);
      const inDropdown = dropdownRef.current?.contains(target);
      if (!inContainer && !inDropdown) handleClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, handleClose]);

  if (noSearch) {
    return (
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`h-[36px] w-full px-[10px] pr-[32px] rounded-[4px] border font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] outline-none appearance-none bg-white cursor-pointer focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow box-border ${
            disabled ? 'bg-[#f5f5f7] text-[#8b8d98] cursor-not-allowed' : value ? 'text-[#1C2024]' : 'text-[#8b8d98]'
          } ${error ? 'border-[#d4183d]' : 'border-[rgba(0,6,46,0.2)]'}`}
          style={{ color: disabled ? '#8b8d98' : (value ? '#1C2024' : '#8b8d98') }}
        >
          <option value="" disabled style={{ color: '#8b8d98' }}>{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value} style={{ color: '#1C2024' }}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke={disabled ? '#a0a1a6' : '#60646c'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => isOpen ? handleClose() : handleOpen()}
        disabled={disabled}
        className={`h-[36px] w-full px-[10px] pr-[32px] rounded-[4px] border font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-left outline-none box-border transition-shadow ${
          disabled
            ? 'bg-[#f5f5f7] cursor-not-allowed border-[rgba(0,6,46,0.12)]'
            : isOpen
              ? 'bg-white cursor-pointer border-[#004b72] shadow-[0_0_0_1px_#004b72]'
              : `bg-white cursor-pointer ${error ? 'border-[#d4183d]' : 'border-[rgba(0,6,46,0.2)]'}`
        }`}
        style={{ color: disabled ? '#8b8d98' : (value ? '#1C2024' : '#8b8d98') }}
      >
        <span className="block truncate">{selectedLabel || placeholder}</span>
      </button>
      <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke={disabled ? '#a0a1a6' : isOpen ? '#004b72' : '#60646c'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width, zIndex: 9999 }}
          className="bg-white border border-[rgba(0,6,46,0.2)] rounded-[4px] shadow-[0px_4px_12px_rgba(0,0,0,0.12)] flex flex-col"
        >
          {/* Search input */}
          <div className="p-[8px] border-b border-[#e0e1e6]">
            <div className="relative">
              <div className="absolute left-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                  <path d="M12.25 12.25L9.71 9.71M11.08 6.42C11.08 9 9 11.08 6.42 11.08C3.83 11.08 1.75 9 1.75 6.42C1.75 3.83 3.83 1.75 6.42 1.75C9 1.75 11.08 3.83 11.08 6.42Z" stroke="#60646C" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full h-[32px] pl-[28px] pr-[8px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] outline-none focus:border-[#004B72] focus:ring-[2px] focus:ring-[rgba(0,75,114,0.2)]"
              />
            </div>
          </div>
          {/* Options list */}
          <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
            {filteredOptions.length === 0 ? (
              <div className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646c]">
                No results
              </div>
            ) : (
              filteredOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-[12px] py-[6px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer ${
                    opt.value === value ? 'bg-[rgba(0,75,114,0.05)]' : 'hover:bg-[#F9F9FB]'
                  }`}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
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
          data-datepicker-calendar
          className="fixed z-[10000] bg-white rounded-[6px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#e0e1e6] p-[12px] w-[240px]"
          style={dropdownStyle}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-[8px]">
            <button
              type="button"
              onClick={prevMonth}
              className="w-[24px] h-[24px] flex items-center justify-center border-none bg-transparent cursor-pointer rounded-[4px] hover:bg-[#f0f0f3] transition-colors p-0"
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
              className="w-[24px] h-[24px] flex items-center justify-center border-none bg-transparent cursor-pointer rounded-[4px] hover:bg-[#f0f0f3] transition-colors p-0"
              aria-label="Next month"
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M2 2L6 6L2 10" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-[2px] mb-[4px]">
            {DAY_HEADERS.map(dh => (
              <div key={dh} className="h-[24px] flex items-center justify-center font-['Inter:Medium',sans-serif] font-medium text-[11px] leading-[16px] text-[#8b8d98]">
                {dh}
              </div>
            ))}
          </div>
          {/* Day grid */}
          <div className="grid grid-cols-7 gap-[2px]">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-[28px]" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const selected = isSelected(day);
              const today = isToday(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-[28px] flex items-center justify-center rounded-[4px] border-none cursor-pointer font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] transition-colors ${
                    selected
                      ? 'bg-[#004b72] text-white'
                      : today
                      ? 'bg-[#f0f7fc] text-[#004b72] hover:bg-[#e0eff7]'
                      : 'bg-transparent text-[#1C2024] hover:bg-[#f0f0f3]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}