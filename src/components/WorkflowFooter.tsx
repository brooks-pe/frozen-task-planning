import { Check } from 'lucide-react';
import React from 'react';

type WorkflowState = 'Draft' | 'BOE_BUILD_UP';
type StepState = 'completed' | 'active' | 'next' | 'upcoming';

interface WorkflowStep {
  label: string;
  state: StepState;
  tooltip: string;
}

const STEP_ORDER = [
  'Draft',
  'BOE Build',
  'Activity Accept',
  'Proj Accept',
  'Proj Allocate',
  'Impact Assess',
  'Proj Approval',
  'Prog Approval',
  'Baselined',
] as const;

function buildWorkflowSteps(workflowState: WorkflowState): WorkflowStep[] {
  const activeIndex = workflowState === 'BOE_BUILD_UP' ? 1 : 0;

  return STEP_ORDER.map((label, index) => {
    let state: StepState = 'upcoming';

    if (index < activeIndex) {
      state = 'completed';
    } else if (index === activeIndex) {
      state = 'active';
    } else if (index === activeIndex + 1) {
      state = 'next';
    }

    const tooltip =
      label === 'Draft'
        ? 'Task has been created but not yet submitted for BOE development.'
        : label === 'BOE Build'
          ? 'BOE Build-Up is where the task estimate is completed for the assigned tier.'
          : label === 'Activity Accept'
            ? 'This stage begins after BOE development is completed.'
            : 'This workflow stage is not yet available.';

    return { label, state, tooltip };
  });
}

function StepConnector() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="shrink-0 text-[#b9bbc6]">
      <path d="M1 4H11M11 4L8 1M11 4L8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkflowFooter({
  tierAssigned = false,
  isTier0 = false,
  tier0BoePopulated = false,
  workflowState = 'Draft',
  hasBoeDraftChanges = false,
  canSubmitToActivityAccept = false,
  onSubmitToBoeBuild,
  onSaveBoeBuild,
}: {
  tierAssigned?: boolean;
  isTier0?: boolean;
  tier0BoePopulated?: boolean;
  workflowState?: WorkflowState;
  hasBoeDraftChanges?: boolean;
  canSubmitToActivityAccept?: boolean;
  onSubmitToBoeBuild?: () => void;
  onSaveBoeBuild?: () => void;
}) {
  const isT0Skip = tierAssigned && isTier0 && tier0BoePopulated;
  const steps = buildWorkflowSteps(workflowState);
  const isBoeBuildUpState = workflowState === 'BOE_BUILD_UP';

  return (
    <div className="sticky bottom-0 z-40 bg-white border-t border-[#e0e1e6] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between px-[24px] py-[12px] gap-[16px]">
        <div className="flex items-center gap-[6px] min-w-0" style={{ overflowX: 'auto', scrollbarWidth: 'thin' }}>
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              {step.label === 'Draft' ? (
                !tierAssigned ? (
                  <button
                    className="h-[32px] px-[12px] rounded-[4px] bg-white border border-[rgba(0,8,48,0.27)] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] cursor-default whitespace-nowrap shrink-0"
                  >
                    Draft
                  </button>
                ) : isTier0 || !isBoeBuildUpState ? (
                  <button
                    className="bg-white h-[32px] px-[12px] rounded-[4px] border border-[#004B72] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#004B72] cursor-pointer hover:bg-[#f0f7fc] transition-colors whitespace-nowrap shrink-0"
                  >
                    Save Draft
                  </button>
                ) : (
                  <button
                    className="h-[32px] px-[12px] rounded-[4px] bg-[#e6f6eb] text-[rgba(0,113,63,0.87)] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap shrink-0 border-none cursor-default inline-flex items-center gap-[6px]"
                  >
                    <Check size={14} />
                    Draft
                  </button>
                )
              ) : step.label === 'BOE Build' ? (
                isT0Skip ? (
                  <button
                    disabled
                    className="h-[32px] px-[12px] rounded-[4px] bg-[#f0f0f3] text-[#80838D] cursor-not-allowed font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap shrink-0 border-none"
                  >
                    BOE Build
                  </button>
                ) : !tierAssigned ? (
                  <button
                    disabled
                    className="h-[32px] px-[12px] rounded-[4px] bg-[#f0f0f3] text-[#80838D] cursor-not-allowed font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap shrink-0 border-none"
                  >
                    BOE Build
                  </button>
                ) : isTier0 ? (
                  <button
                    className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                  >
                    Submit to BOE Build
                  </button>
                ) : isBoeBuildUpState ? (
                  hasBoeDraftChanges ? (
                    <button
                      type="button"
                      onClick={onSaveBoeBuild}
                      className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                    >
                      Save BOE Build-Up
                    </button>
                  ) : (
                    <button
                      className="bg-white h-[32px] px-[12px] rounded-[4px] border border-[#004B72] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#004B72] cursor-default whitespace-nowrap shrink-0"
                    >
                      BOE Build-Up
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={onSubmitToBoeBuild}
                    className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                  >
                    Submit to BOE Build
                  </button>
                )
              ) : step.label === 'Activity Accept' && isBoeBuildUpState && !isTier0 ? (
                canSubmitToActivityAccept ? (
                  <button
                    type="button"
                    className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                  >
                    Submit to Activity Accept
                  </button>
                ) : (
                  <button
                    disabled
                    className="h-[32px] px-[12px] rounded-[4px] bg-[#f0f0f3] text-[#80838D] cursor-not-allowed font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap shrink-0 border-none"
                  >
                    Activity Accept
                  </button>
                )
              ) : step.label === 'Proj Allocate' && isT0Skip ? (
                <button
                  className="bg-[#004B72] text-white h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] cursor-pointer hover:bg-[#003a5c] transition-colors whitespace-nowrap shrink-0 border-none"
                >
                  Submit to Proj Allocate
                </button>
              ) : (
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
              {i < steps.length - 1 && <StepConnector />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
