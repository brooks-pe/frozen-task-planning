import React from 'react';
import { Check } from 'lucide-react';

type SectionState = 'completed' | 'active' | 'not-started';

interface WorkflowSectionData {
  title: string;
  state: SectionState;
  content: React.ReactNode;
}

function StatusIndicator({ state }: { state: SectionState }) {
  if (state === 'completed') {
    return (
      <div className="flex items-center justify-center w-[18px] h-[18px] rounded-[4px] bg-[#e6f6eb]">
        <Check size={12} className="text-[rgba(0,113,63,0.87)]" />
      </div>
    );
  }
  if (state === 'active') {
    return (
      <div className="flex items-center justify-center w-[18px] h-[18px]">
        <div className="w-[10px] h-[10px] rounded-full bg-[#004B72]" />
      </div>
    );
  }
  // not-started
  return (
    <div className="flex items-center justify-center w-[18px] h-[18px]">
      <div className="w-[8px] h-[8px] rounded-full bg-[#b9bbc6]" />
    </div>
  );
}

interface MetadataRowProps {
  label: string;
  children: React.ReactNode;
}

function MetadataRow({ label, children }: MetadataRowProps) {
  return (
    <div className="flex items-baseline gap-[12px] py-[4px]">
      <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#60646C] w-[160px] shrink-0">
        {label}
      </span>
      <div className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
        {children}
      </div>
    </div>
  );
}

interface TaskWorkspaceOverviewProps {
  currentTier: string | null;
  onOpenTierAssessment: () => void;
}

export function TaskWorkspaceOverview({ currentTier, onOpenTierAssessment }: TaskWorkspaceOverviewProps) {
  const sections: WorkflowSectionData[] = [
    {
      title: 'Draft',
      state: 'active',
      content: (
        <div>
          <div className="flex flex-col gap-[4px]">
            <MetadataRow label="Created Date">March 3, 2026</MetadataRow>
            <MetadataRow label="Created By">Sarah Mitchell</MetadataRow>
            <MetadataRow label="Operational Status">
              <span className="inline-flex items-center h-[22px] px-[8px] rounded-[4px] bg-[#e6f6eb] font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[rgba(0,113,63,0.87)]">
                Active
              </span>
            </MetadataRow>
            <MetadataRow label="Tier Status">
              {currentTier ? (
                <span className="text-[#1C2024]">{currentTier}</span>
              ) : (
                <span className="text-[#80838D]">
                  Tier not yet assigned.{' '}
                  <button
                    onClick={onOpenTierAssessment}
                    className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0 inline"
                  >
                    Assign Tier
                  </button>
                </span>
              )}
            </MetadataRow>
          </div>
          {!currentTier && (
            <p className="mt-[12px] font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#80838D]">
              Complete the Tier Assessment to establish planning structure before proceeding.
            </p>
          )}
        </div>
      ),
    },
    {
      title: 'BOE Build-Up',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          BOE development will begin after the task is submitted.
        </p>
      ),
    },
    {
      title: 'Activity Acceptance',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          This stage begins once BOE development is completed.
        </p>
      ),
    },
    {
      title: 'Project Acceptance',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          Project acceptance follows activity-level review.
        </p>
      ),
    },
    {
      title: 'Project Allocation',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          Funding allocation occurs after approvals.
        </p>
      ),
    },
    {
      title: 'Impact Assessment',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          Impact assessment evaluates changes against the current baseline.
        </p>
      ),
    },
    {
      title: 'Project Approval',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          Project-level approval is required before program review.
        </p>
      ),
    },
    {
      title: 'Program Approval',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          Program approval is the final authorization step.
        </p>
      ),
    },
    {
      title: 'Baselined',
      state: 'not-started',
      content: (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
          The task will be baselined after all approvals are completed.
        </p>
      ),
    },
  ];

  return (
    <div className="border border-[#e0e1e6] rounded-[8px] bg-white overflow-hidden">
      {sections.map((section, index) => {
        const isActive = section.state === 'active';
        const isLast = index === sections.length - 1;

        return (
          <div key={section.title}>
            {/* Section */}
            <div className={`px-[24px] py-[20px] ${isActive ? '' : ''}`}>
              {/* Section Header */}
              <div className="flex items-center gap-[10px] mb-[12px]">
                <StatusIndicator state={section.state} />
                <span className={`font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] leading-[26px] ${isActive ? 'text-[#1C2024]' : 'text-[#80838D]'}`}>
                  {section.title}
                </span>
              </div>
              {/* Section Content */}
              <div className="pl-[28px]">
                {section.content}
              </div>
            </div>
            {/* Divider */}
            {!isLast && (
              <div className="mx-[24px] border-b border-[#e8e8ec]" />
            )}
          </div>
        );
      })}
    </div>
  );
}