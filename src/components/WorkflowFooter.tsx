import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

type StepState = 'completed' | 'active' | 'next' | 'upcoming';

interface WorkflowStep {
  label: string;
  state: StepState;
  tooltip: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  { label: 'Draft', state: 'active', tooltip: 'Task has been created but not yet submitted for BOE development.' },
  { label: 'BOE Build-Up', state: 'next', tooltip: 'Next workflow state. Submitting will send this task to BOE Build-Up.' },
  { label: 'Activity Acceptance', state: 'upcoming', tooltip: 'This stage begins after BOE development is completed.' },
  { label: 'Project Acceptance', state: 'upcoming', tooltip: 'Project acceptance follows activity-level review.' },
  { label: 'Project Allocation', state: 'upcoming', tooltip: 'Funding allocation occurs after project acceptance.' },
  { label: 'Impact Assessment', state: 'upcoming', tooltip: 'Evaluates changes against the current baseline.' },
  { label: 'Project Approval', state: 'upcoming', tooltip: 'Project-level approval is required before program review.' },
  { label: 'Program Approval', state: 'upcoming', tooltip: 'Program approval is the final authorization step.' },
  { label: 'Baselined', state: 'upcoming', tooltip: 'The task is baselined after all approvals are completed.' },
];

function StepPill({ step }: { step: WorkflowStep }) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const baseClasses = "relative flex items-center gap-[5px] h-[26px] px-[10px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] whitespace-nowrap select-none";

  const stateClasses: Record<StepState, string> = {
    completed: 'bg-[#e6f6eb] text-[rgba(0,113,63,0.87)]',
    active: 'bg-[rgba(0,75,114,0.1)] text-[#004B72]',
    next: 'bg-white text-[#004B72] border border-[#004B72]',
    upcoming: 'bg-[#f0f0f3] text-[#80838D]',
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`${baseClasses} ${stateClasses[step.state]}`}>
        {step.state === 'completed' && <Check size={11} />}
        {step.state === 'active' && (
          <div className="w-[6px] h-[6px] rounded-full bg-[#004B72] shrink-0" />
        )}
        {step.label}
      </div>
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[8px] z-50 pointer-events-none">
          <div className="bg-[#1C2024] text-white px-[10px] py-[6px] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] max-w-[240px] w-max shadow-lg">
            {step.tooltip}
          </div>
        </div>
      )}
    </div>
  );
}

// Connector arrow between pills
function StepConnector() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="shrink-0 text-[#b9bbc6]">
      <path d="M1 4H11M11 4L8 1M11 4L8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkflowFooter() {
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!actionsOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [actionsOpen]);

  return (
    <div className="sticky bottom-0 z-40 bg-white border-t border-[#e0e1e6] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-[24px] py-[12px] gap-[16px]">
        {/* Left: Workflow Timeline */}
        <div className="flex items-center gap-[6px] min-w-0" style={{ overflowX: 'auto', scrollbarWidth: 'thin' }}>
          {WORKFLOW_STEPS.map((step, i) => (
            <React.Fragment key={step.label}>
              <StepPill step={step} />
              {i < WORKFLOW_STEPS.length - 1 && <StepConnector />}
            </React.Fragment>
          ))}
        </div>

        {/* Right: Save + Actions */}
        <div className="flex items-center gap-[8px] shrink-0">
          {/* Save Button (Secondary Outline) */}
          <button className="bg-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] whitespace-nowrap cursor-pointer hover:bg-[#f5f5f5] transition-colors relative">
            <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            Save
          </button>

          {/* Actions Split Button (Primary) */}
          <div ref={dropdownRef} className="relative flex">
            {/* Main action */}
            <button
              className="bg-[#004B72] text-white h-[32px] px-[14px] rounded-l-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap cursor-pointer hover:bg-[#003a5c] transition-colors"
            >
              Submit to BOE Build-Up
            </button>
            {/* Dropdown trigger */}
            <button
              onClick={() => setActionsOpen(prev => !prev)}
              className="bg-[#004B72] text-white h-[32px] w-[30px] flex items-center justify-center rounded-r-[4px] border-l border-[rgba(255,255,255,0.25)] cursor-pointer hover:bg-[#003a5c] transition-colors"
            >
              <ChevronDown size={14} />
            </button>

            {/* Dropdown Menu */}
            {actionsOpen && (
              <div className="absolute bottom-full right-0 mb-[4px] bg-white border border-[#e0e1e6] rounded-[6px] shadow-lg min-w-[200px] py-[4px] z-50">
                <button
                  onClick={() => setActionsOpen(false)}
                  className="w-full text-left px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] hover:bg-[#f5f5f5] transition-colors cursor-pointer bg-transparent border-none"
                >
                  Submit to BOE Build-Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}