import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { TaskRow } from './TaskPlanningData';

// ─── Types ──────────────────────────────────────────────────────────────────

interface TierAssessmentFlyoutProps {
  open: boolean;
  onClose: () => void;
  task: TaskRow | null;
  onTierSaved?: (taskId: string, tier: string) => void;
}

// Mock appropriation mapping (reuse from CloneTaskFlyout pattern)
const ACTIVITY_APPROPRIATION: Record<string, string> = {
  'PMS 420 – Program Office': 'O&MN',
  'NSWC PCD – Panama City Division': 'RDTEN',
  'NSWC DD – Dahlgren Division': 'RDTEN',
  'Naval AI Systems – AI/ML Division': 'RDTEN',
  'Undersea Warfare Lab – Acoustic Systems': 'RDTEN',
  'Maritime Systems Lab – Integration Branch': 'OPN',
  'Cyber Systems Division – Network Ops': 'O&MN',
};

// ─── Tier Logic (SRS §4) ────────────────────────────────────────────────────
// Tier 0 = lowest, Tier 1 = moderate, Tier 2 = highest
// Major Deliverable → automatic Tier 2

function deriveTier(directLabor: string, hasMajorDeliverable: string | null): { tier: string; reasons: string[] } | null {
  const numericLabor = parseFloat(directLabor.replace(/[^0-9.]/g, ''));
  const laborValid = !isNaN(numericLabor) && numericLabor > 0;
  const deliverableAnswered = hasMajorDeliverable !== null;

  if (!laborValid || !deliverableAnswered) return null;

  const reasons: string[] = [];

  // Major deliverable → Tier 2 automatically
  if (hasMajorDeliverable === 'yes') {
    reasons.push('Major deliverable included — requires detailed BOE breakdown');
    if (numericLabor >= 1000000) {
      reasons.push('Direct labor estimate exceeds $1M Tier 2 threshold');
    } else if (numericLabor >= 250000) {
      reasons.push('Direct labor estimate exceeds $250K Tier 1 threshold');
    }
    return { tier: 'Tier 2', reasons };
  }

  // No major deliverable — tier by cost
  if (numericLabor >= 1000000) {
    reasons.push('Direct labor estimate exceeds $1M Tier 2 threshold');
    return { tier: 'Tier 2', reasons };
  }
  if (numericLabor >= 250000) {
    reasons.push('Direct labor estimate exceeds $250K Tier 1 threshold');
    return { tier: 'Tier 1', reasons };
  }

  reasons.push('Direct labor estimate is below Tier 1 threshold');
  return { tier: 'Tier 0', reasons };
}

const TIER_DESCRIPTIONS: Record<string, string> = {
  'Tier 0': 'This task will use a simplified BOE structure with minimal detail requirements.',
  'Tier 1': 'This task will use a standard BOE structure including labor categories and summary-level detail.',
  'Tier 2': 'This task will use a full detailed BOE structure including subtasks, labor, travel, material, and ODC.',
};

const TIER_OPTIONS = [
  { value: 'Tier 0', label: 'Tier 0' },
  { value: 'Tier 1', label: 'Tier 1' },
  { value: 'Tier 2', label: 'Tier 2' },
];

// ─── Component ──────────────────────────────────────────────────────────────

export function TierAssessmentFlyout({ open, onClose, task, onTierSaved }: TierAssessmentFlyoutProps) {
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Form state
  const [directLabor, setDirectLabor] = useState('');
  const [totalFunding, setTotalFunding] = useState('');
  const [majorDeliverable, setMajorDeliverable] = useState<string | null>(null);

  // Accept/Override state
  const [decision, setDecision] = useState<'accept' | 'override'>('accept');
  const [overrideTier, setOverrideTier] = useState('Tier 0');
  const [overrideReason, setOverrideReason] = useState('');

  // Reset form when panel opens
  useEffect(() => {
    if (open && task) {
      setDirectLabor('');
      setTotalFunding('');
      setMajorDeliverable(null);
      setDecision('accept');
      setOverrideTier('Tier 0');
      setOverrideReason('');
    }
  }, [open, task]);

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

  const recommendation = deriveTier(directLabor, majorDeliverable);

  const handleSaveTier = () => {
    if (!task) return;
    const finalTier = decision === 'override' ? overrideTier : (recommendation?.tier ?? 'Tier 0');
    onTierSaved?.(task.taskId, finalTier);
    onClose();
  };

  // Save button enabled logic
  const canSave = recommendation !== null && (decision === 'accept' || (decision === 'override' && overrideReason.trim().length > 0));

  if (!visible || !task) return null;

  const appropriation = ACTIVITY_APPROPRIATION[task.executingActivity] ?? 'O&MN';

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
                Tier Assessment
              </h2>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646c] m-0">
                Determine the appropriate planning tier for this task.
                Tier selection defines the level of detail required for BOE and planning.
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

            {/* Section 1: Context Summary Card */}
            <div className="rounded-[6px] border border-[#d9dade] bg-[#f9f9fb] p-[16px] flex flex-col gap-[10px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#80838D] m-0 uppercase tracking-[0.5px]">
                Task Context
              </p>
              <div className="flex flex-col gap-[6px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] m-0">
                  {task.taskId} — {task.title}
                </p>
                <div className="flex flex-col gap-[4px]">
                  <SourceRow label="Executing Activity" value={task.executingActivity} />
                  <SourceRow label="Appropriation" value={appropriation} />
                  <SourceRow label="Current Tier" value="Not Assigned" isWarning />
                </div>
              </div>
            </div>

            {/* Section 2: Info Banner */}
            <div className="bg-[rgba(0,179,238,0.12)] rounded-[6px]">
              <div className="flex gap-[8px] items-start p-[12px]">
                <div className="flex items-center shrink-0 h-[20px]">
                  <Info size={16} className="text-[#00749E]" />
                </div>
                <p className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#00749e] m-0">
                  Complete the Tier Assessment to establish the planning estimate and required BOE detail before building this task.
                </p>
              </div>
            </div>

            {/* Section 3: Estimated Direct Labor Dollars */}
            <FieldGroup label="Estimated Direct Labor Dollars">
              <input
                type="text"
                value={directLabor}
                onChange={(e) => setDirectLabor(e.target.value)}
                placeholder="$0.00"
                className="h-[36px] px-[10px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border"
              />
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0">
                This estimate can be refined later during BOE development.
              </p>
            </FieldGroup>

            {/* Estimated Total Task Funding (optional) */}
            <FieldGroup label="Estimated Total Task Funding (optional)">
              <input
                type="text"
                value={totalFunding}
                onChange={(e) => setTotalFunding(e.target.value)}
                placeholder="$0.00"
                className="h-[36px] px-[10px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border"
              />
            </FieldGroup>

            {/* Major Deliverable / End Item */}
            <FieldGroup label="Major Deliverable / End Item">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646c] m-0">
                Does this task produce a major deliverable or end item?
              </p>
              <div className="flex items-center gap-[16px]">
                <RadioOption
                  name="majorDeliverable"
                  value="yes"
                  label="Yes"
                  checked={majorDeliverable === 'yes'}
                  onChange={() => setMajorDeliverable('yes')}
                />
                <RadioOption
                  name="majorDeliverable"
                  value="no"
                  label="No"
                  checked={majorDeliverable === 'no'}
                  onChange={() => setMajorDeliverable('no')}
                />
              </div>
            </FieldGroup>

            {/* Section 4: Recommended Tier (only when inputs sufficient) */}
            {recommendation && (
              <>
                {/* Recommendation Card */}
                <div className="rounded-[6px] border border-[#d9dade] bg-[#f9f9fb] p-[16px] flex flex-col gap-[10px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#80838D] m-0 uppercase tracking-[0.5px]">
                    Recommended BOE Tier
                  </p>
                  <div className="flex items-center gap-[8px]">
                    <span className="inline-flex items-center h-[24px] px-[8px] rounded-[4px] bg-[#004b72] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-white">
                      {recommendation.tier}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646c] m-0">
                      The system recommends {recommendation.tier} based on the following factors:
                    </p>
                    <ul className="m-0 pl-[18px] flex flex-col gap-[2px]">
                      {recommendation.reasons.map((reason, i) => (
                        <li key={i} className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646c]">
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Section 5: Accept or Override */}
                <div className="flex flex-col gap-[10px]">
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] m-0">
                    Accept or Override
                  </p>
                  <div className="flex flex-col gap-[8px]">
                    <RadioOption
                      name="tierDecision"
                      value="accept"
                      label={`Accept Recommendation (${recommendation.tier})`}
                      checked={decision === 'accept'}
                      onChange={() => setDecision('accept')}
                    />
                    <RadioOption
                      name="tierDecision"
                      value="override"
                      label="Override Tier"
                      checked={decision === 'override'}
                      onChange={() => setDecision('override')}
                    />
                  </div>
                </div>

                {/* Acceptance feedback */}
                {decision === 'accept' && (
                  <div className="bg-[rgba(48,164,108,0.12)] rounded-[6px]">
                    <div className="flex gap-[8px] items-start p-[12px]">
                      <div className="flex items-center shrink-0 h-[20px]">
                        <CheckCircle2 size={16} className="text-[#18794e]" />
                      </div>
                      <p className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#18794e] m-0">
                        {recommendation.tier} accepted. {TIER_DESCRIPTIONS[recommendation.tier]}
                      </p>
                    </div>
                  </div>
                )}

                {/* Override section */}
                {decision === 'override' && (
                  <div className="flex flex-col gap-[12px]">
                    {/* Warning banner */}
                    <div className="bg-[rgba(255,222,0,0.24)] rounded-[6px]">
                      <div className="flex gap-[8px] items-start p-[12px]">
                        <div className="flex items-center shrink-0 h-[20px]">
                          <AlertTriangle size={16} className="text-[#ab6400]" />
                        </div>
                        <p className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#ab6400] m-0">
                          You are overriding the system recommendation. An override reason is required and will be recorded for audit traceability.
                        </p>
                      </div>
                    </div>

                    {/* Override tier select */}
                    <FieldGroup label="Selected Tier">
                      <SelectInput
                        value={overrideTier}
                        onChange={setOverrideTier}
                        placeholder="Select tier..."
                        options={TIER_OPTIONS}
                      />
                    </FieldGroup>

                    {/* Override reason */}
                    <FieldGroup label="Override Reason">
                      <textarea
                        value={overrideReason}
                        onChange={(e) => setOverrideReason(e.target.value)}
                        placeholder="Provide justification for overriding the recommended tier..."
                        rows={3}
                        className="px-[10px] py-[8px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#8b8d98] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow w-full box-border resize-vertical"
                      />
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#8b8d98] m-0">
                        Override reason is required and will be recorded for audit traceability.
                      </p>
                    </FieldGroup>
                  </div>
                )}
              </>
            )}
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
            onClick={handleSaveTier}
            disabled={!canSave}
            className={`h-[36px] px-[16px] rounded-[4px] border-none transition-colors font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white ${canSave ? 'bg-[#004b72] cursor-pointer hover:bg-[#003a57]' : 'bg-[#004b72]/40 cursor-not-allowed'}`}
          >
            Save Tier
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function SourceRow({ label, value, isWarning }: { label: string; value: string; isWarning?: boolean }) {
  return (
    <div className="flex items-baseline gap-[6px]">
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D] shrink-0">
        {label}:
      </span>
      {isWarning ? (
        <span className="inline-flex items-center h-[20px] px-[6px] rounded-[4px] bg-[rgba(255,222,0,0.24)] font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#ab6400]">
          {value}
        </span>
      ) : (
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">
          {value}
        </span>
      )}
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

function RadioOption({ name, value, label, checked, onChange }: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-[8px] cursor-pointer select-none">
      <span
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border-[1.5px] shrink-0 transition-colors"
        style={{
          borderColor: checked ? '#004b72' : '#8b8d98',
          backgroundColor: checked ? '#004b72' : 'white',
        }}
      >
        {checked && (
          <span className="w-[6px] h-[6px] rounded-full bg-white inline-block" />
        )}
      </span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">{label}</span>
    </label>
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
