import { Check } from 'lucide-react';
import React from 'react';

type StepState = 'completed' | 'active' | 'next' | 'upcoming';

interface WorkflowStep {
  label: string;
  state: StepState;
  tooltip: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  { label: 'Draft', state: 'active', tooltip: 'Task has been created but not yet submitted for BOE development.' },
  { label: 'BOE Build', state: 'next', tooltip: 'Next workflow state. Submitting will send this task to BOE Build-Up.' },
  { label: 'Activity Accept', state: 'upcoming', tooltip: 'This stage begins after BOE development is completed.' },
  { label: 'Proj Accept', state: 'upcoming', tooltip: 'Project acceptance follows activity-level review.' },
  { label: 'Proj Allocate', state: 'upcoming', tooltip: 'Funding allocation occurs after project acceptance.' },
  { label: 'Impact Assess', state: 'upcoming', tooltip: 'Evaluates changes against the current baseline.' },
  { label: 'Proj Approval', state: 'upcoming', tooltip: 'Project-level approval is required before program review.' },
  { label: 'Prog Approval', state: 'upcoming', tooltip: 'Program approval is the final authorization step.' },
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
      <div className={`${baseClasses} ${stateClasses[step.state]} text-[#80838d]`}>
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

export function WorkflowFooter({ tierAssigned = false, isTier0 = false, tier0BoePopulated = false }: { tierAssigned?: boolean; isTier0?: boolean; tier0BoePopulated?: boolean }) {
  // Tier 0 with BOE fields populated → skip BOE Build, promote Proj Allocate
  const isT0Skip = tierAssigned && isTier0 && tier0BoePopulated;

  return (
    <div className="sticky bottom-0 z-40 bg-white border-t border-[#e0e1e6] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-[24px] py-[12px] gap-[16px]">
        {/* Unified Workflow Action Timeline */}
        <div className="flex items-center gap-[6px] min-w-0" style={{ overflowX: 'auto', scrollbarWidth: 'thin' }}>
          {WORKFLOW_STEPS.map((step, i) => (
            <React.Fragment key={step.label}>
              {step.state === 'active' ? (
                tierAssigned ? (
                  isTier0 ? (
                    /* Tier 0 → regular secondary outline button, no split */
                    <button
                      className="bg-white h-[32px] px-[12px] rounded-[4px] border border-[#004B72] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#004B72] cursor-pointer hover:bg-[#f0f7fc] transition-colors whitespace-nowrap shrink-0"
                    >
                      Save Draft
                    </button>
                  ) : (
                    /* Tier 1/2 → standard secondary button, single action */
                    <button
                      className="bg-white h-[32px] px-[12px] rounded-[4px] border border-[#004B72] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#004B72] cursor-pointer hover:bg-[#f0f7fc] transition-colors whitespace-nowrap shrink-0"
                    >
                      Save Draft
                    </button>
                  )
                ) : (
                  /* No tier → neutral outline "Draft" — current state indicator, not action */
                  <button
                    className="h-[32px] px-[12px] rounded-[4px] bg-white border border-[rgba(0,8,48,0.27)] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] cursor-default whitespace-nowrap shrink-0"
                  >
                    Draft
                  </button>
                )
              ) : step.state === 'next' ? (
                isT0Skip ? (
                  /* T0 skip path → BOE Build rendered as inactive, same as upcoming */
                  <button
                    disabled
                    className="h-[32px] px-[12px] rounded-[4px] bg-[#f0f0f3] text-[#80838D] cursor-not-allowed font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap shrink-0 border-none"
                  >
                    BOE Build
                  </button>
                ) : tierAssigned ? (
                  isTier0 ? (
                    /* Tier 0 → regular primary button, no split */
                    <button
                      className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                    >
                      Submit to BOE Build
                    </button>
                  ) : (
                    /* Tier 1/2 → standard primary button, single action */
                    <button
                      className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                    >
                      Submit to BOE Build
                    </button>
                  )
                ) : (
                  /* No tier → match upcoming state styling, visually inactive */
                  <button
                    disabled
                    className="h-[32px] px-[12px] rounded-[4px] bg-[#f0f0f3] text-[#80838D] cursor-not-allowed font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap shrink-0 border-none"
                  >
                    BOE Build
                  </button>
                )
              ) : step.label === 'Proj Allocate' && isT0Skip ? (
                /* T0 skip path → Proj Allocate becomes primary action */
                <button
                  className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                >
                  Submit to Proj Allocate
                </button>
              ) : (
                /* Upcoming / completed → disabled button, no interaction */
                <button
                  disabled
                  className={`h-[32px] px-[10px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] whitespace-nowrap shrink-0 border-none cursor-not-allowed flex items-center gap-[5px] ${
                    step.state === 'completed'
                      ? 'bg-[#e6f6eb] text-[rgba(0,113,63,0.87)]'
                      : 'bg-[#f0f0f3] text-[#80838D]'
                  }`}
                >
                  {step.state === 'completed' && <Check size={11} />}
                  {step.label}
                </button>
              )}
              {i < WORKFLOW_STEPS.length - 1 && <StepConnector />}
            </React.Fragment>
          ))}
        </div>
        {/* Right-side Save + Submit removed — actions unified into timeline */}
      </div>
    </div>
  );
}