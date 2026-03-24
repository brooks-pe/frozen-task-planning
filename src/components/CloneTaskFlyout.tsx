import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { TaskRow } from './TaskPlanningData';

// ─── Types ──────────────────────────────────────────────────────────────────

interface CloneTaskFlyoutProps {
  open: boolean;
  onClose: () => void;
  sourceTask: TaskRow | null;
  onTaskCloned?: (task: { taskId: string; title: string; executingActivity: string; requested: number }) => void;
}

const CLONE_MODES = [
  { value: 'current', label: 'Clone within current planning year' },
  { value: 'follow-on', label: 'Create follow-on task for future year' },
];

const COPY_FORWARD_OPTIONS = [
  { key: 'taskHeader', label: 'Task Header Information', defaultChecked: true },
  { key: 'subtasks', label: 'Subtasks', defaultChecked: false },
  { key: 'boeSummary', label: 'BOE Summary', defaultChecked: true },
  { key: 'tier2Labor', label: 'Tier 2 Labor Lines', defaultChecked: true },
  { key: 'deliverables', label: 'Deliverables', defaultChecked: true },
  { key: 'riskEntries', label: 'Risk Entries', defaultChecked: true },
];

// Mock appropriation mapping for display
const ACTIVITY_APPROPRIATION: Record<string, string> = {
  'PMS 420 – Program Office': 'O&MN',
  'NSWC PCD – Panama City Division': 'RDTEN',
  'NSWC DD – Dahlgren Division': 'RDTEN',
  'Naval AI Systems – AI/ML Division': 'RDTEN',
  'Undersea Warfare Lab – Acoustic Systems': 'RDTEN',
  'Maritime Systems Lab – Integration Branch': 'OPN',
  'Cyber Systems Division – Network Ops': 'O&MN',
};

// Mock tier mapping
const TASK_TIER: Record<string, string> = {};
// Default all tasks to Tier 1
function getTier(_taskId: string): string {
  return 'Tier 1';
}

// ─── Component ──────────────────────────────────────────────────────────────

export function CloneTaskFlyout({ open, onClose, sourceTask, onTaskCloned }: CloneTaskFlyoutProps) {
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Form state
  const [cloneMode, setCloneMode] = useState('current');
  const [newTitle, setNewTitle] = useState('');
  const [planningYear, setPlanningYear] = useState('FY2026');
  const [popStartDate, setPopStartDate] = useState('');
  const [popEndDate, setPopEndDate] = useState('');
  const [copyForward, setCopyForward] = useState<Record<string, boolean>>({});
  const [cloneNotes, setCloneNotes] = useState('');

  // Reset form when source task changes or panel opens
  useEffect(() => {
    if (open && sourceTask) {
      setNewTitle(sourceTask.title);
      setPlanningYear('FY2026');
      setPopStartDate('');
      setPopEndDate('');
      setCloneMode('current');
      setCloneNotes('');
      const defaults: Record<string, boolean> = {};
      COPY_FORWARD_OPTIONS.forEach(opt => {
        defaults[opt.key] = opt.defaultChecked;
      });
      setCopyForward(defaults);
    }
  }, [open, sourceTask]);

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
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  const handleCancel = () => {
    onClose();
  };

  const handleCreateClone = () => {
    if (!sourceTask) return;
    const nextId = `41-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    onTaskCloned?.({
      taskId: nextId,
      title: newTitle || sourceTask.title,
      executingActivity: sourceTask.executingActivity,
      requested: 0,
    });
    onClose();
  };

  const handleCopyForwardChange = (key: string, checked: boolean) => {
    setCopyForward(prev => ({ ...prev, [key]: checked }));
  };

  if (!visible || !sourceTask) return null;

  const appropriation = ACTIVITY_APPROPRIATION[sourceTask.executingActivity] ?? 'O&MN';
  const tier = getTier(sourceTask.taskId);

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
                Clone Task
              </h2>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646c] m-0">
                Create a new task using an existing task as a starting point. You can adjust key details and choose which data to carry forward.
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

            {/* Source Task Card */}
            <div className="rounded-[6px] border border-[#d9dade] bg-[#f9f9fb] p-[16px] flex flex-col gap-[10px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#80838D] m-0 uppercase tracking-[0.5px]">
                Source Task
              </p>
              <div className="flex flex-col gap-[6px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] m-0">
                  {sourceTask.taskId} — {sourceTask.title}
                </p>
                <div className="flex flex-col gap-[4px]">
                  <SourceRow label="Executing Activity" value={sourceTask.executingActivity} />
                  <SourceRow label="Appropriation" value={appropriation} />
                  <SourceRow label="Tier" value={tier} />
                </div>
              </div>
            </div>

            {/* Clone Mode */}
            <FieldGroup label="Clone Mode">
              <SelectInput
                value={cloneMode}
                onChange={setCloneMode}
                placeholder="Select clone mode..."
                options={CLONE_MODES}
              />
            </FieldGroup>

            {/* New Task Title */}
            <FieldGroup label="New Task Title">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter task title..."
                className="h-[36px] px-[10px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border"
              />
            </FieldGroup>

            {/* Planning Year */}
            <FieldGroup label="Planning Year">
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
            <FieldGroup label="Period of Performance">
              <div className="flex items-center gap-[12px] min-w-0">
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={popStartDate}
                    onChange={(e) => setPopStartDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="h-[36px] px-[10px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border"
                  />
                </div>
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#8b8d98] shrink-0">to</span>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={popEndDate}
                    onChange={(e) => setPopEndDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="h-[36px] px-[10px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border"
                  />
                </div>
              </div>
            </FieldGroup>

            {/* Copy Forward Content */}
            <FieldGroup label="Copy Forward Content">
              <div className="flex flex-col gap-[10px]">
                {COPY_FORWARD_OPTIONS.map(opt => (
                  <label key={opt.key} className="flex items-center gap-[10px] cursor-pointer select-none">
                    <span
                      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-[3px] border-[1.5px] shrink-0 transition-colors"
                      style={{
                        borderColor: copyForward[opt.key] ? '#004b72' : '#8b8d98',
                        backgroundColor: copyForward[opt.key] ? '#004b72' : 'white',
                      }}
                      onClick={() => handleCopyForwardChange(opt.key, !copyForward[opt.key])}
                    >
                      {copyForward[opt.key] && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={copyForward[opt.key] ?? opt.defaultChecked}
                      onChange={(e) => handleCopyForwardChange(opt.key, e.target.checked)}
                      className="sr-only"
                    />
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </FieldGroup>

            {/* Clone Notes */}
            <FieldGroup label="Clone Notes">
              <textarea
                value={cloneNotes}
                onChange={(e) => setCloneNotes(e.target.value)}
                placeholder="Add notes about how this clone should differ from the original task…"
                rows={3}
                className="px-[10px] py-[8px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border resize-vertical"
              />
            </FieldGroup>

            {/* Helper text near footer */}
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0 mt-[4px]">
              The cloned task will be assigned the next available Task ID and created in Draft status.
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
          <button
            onClick={handleCreateClone}
            className="h-[36px] px-[16px] rounded-[4px] border-none bg-[#004b72] cursor-pointer hover:bg-[#003a57] transition-colors font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white"
          >
            Create Clone
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function SourceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-[6px]">
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D] shrink-0">
        {label}:
      </span>
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">
        {value}
      </span>
    </div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectInput({ value, onChange, placeholder, options }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[36px] w-full px-[10px] pr-[32px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] outline-none appearance-none bg-white cursor-pointer focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow box-border ${value ? 'text-[#1C2024]' : 'text-[#8b8d98]'}`}
        style={{ color: value ? '#1C2024' : '#8b8d98' }}
      >
        <option value="" disabled style={{ color: '#8b8d98' }}>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value} style={{ color: '#1C2024' }}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}