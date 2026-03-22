import React from 'react';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { EditTaskFlyout } from './EditTaskFlyout';

// Cache-bust: 2026-03-18-task-summary-edit-row-fix

type OperationalStatusType = 'active' | 'suspended' | 'completed';

interface OperationalStatusBadgeProps {
  status: OperationalStatusType;
  fullStatusText?: string;
  tooltip?: string;
}

function OperationalStatusBadge({ status, fullStatusText, tooltip }: OperationalStatusBadgeProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  
  // Display text - for suspended, always show "Suspended" regardless of sub-type
  const displayText = status === 'suspended' ? 'Suspended' : 
                      status === 'active' ? 'Active' : 
                      'Completed';
  
  // Color schemes for each status
  const colorScheme = {
    active: {
      bg: 'bg-[#e6f6eb]',
      text: 'text-[rgba(0,113,63,0.87)]'
    },
    suspended: {
      bg: 'bg-[rgba(255,222,0,0.24)]',
      text: 'text-[#ab6400]'
    },
    completed: {
      bg: 'bg-[#F0F0F3]',
      text: 'text-[#60646C]'
    }
  };
  
  const colors = colorScheme[status];
  
  return (
    <div className="relative inline-block">
      <span 
        className={`inline-flex items-center h-[22px] px-[8px] rounded-[4px] ${colors.bg} font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] ${colors.text} w-fit cursor-${status === 'suspended' && tooltip ? 'help' : 'default'}`}
        onMouseEnter={() => status === 'suspended' && tooltip && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {displayText}
      </span>
      
      {/* Tooltip for Suspended status */}
      {status === 'suspended' && tooltip && showTooltip && (
        <div className="absolute z-50 left-0 top-[28px] bg-[#1C2024] text-white rounded-[4px] px-[12px] py-[8px] shadow-lg min-w-[240px] max-w-[320px]">
          <div className="flex flex-col gap-[4px]">
            {fullStatusText && (
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-white m-0">
                {fullStatusText}
              </p>
            )}
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[rgba(255,255,255,0.87)] m-0">
              {tooltip}
            </p>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute -top-[4px] left-[12px] w-[8px] h-[8px] bg-[#1C2024] transform rotate-45" />
        </div>
      )}
    </div>
  );
}

function MetadataField({ label, value, badge, action, showPulse, operationalStatus }: { 
  label: string; 
  value: string; 
  badge?: 'appropriation' | 'status' | 'not-assigned'; 
  action?: { text: string; onClick?: () => void }; 
  showPulse?: boolean;
  operationalStatus?: { type: OperationalStatusType; fullText?: string; tooltip?: string };
}) {
  return (
    <div className={`flex flex-col gap-[4px] ${showPulse ? 'tier-field-pulse' : ''}`}>
      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#60646c]">
        {label}
      </span>
      {operationalStatus ? (
        <OperationalStatusBadge 
          status={operationalStatus.type} 
          fullStatusText={operationalStatus.fullText}
          tooltip={operationalStatus.tooltip}
        />
      ) : badge === 'appropriation' ? (
        <span className="inline-flex items-center h-[22px] px-[8px] rounded-[4px] bg-[#99FFAD] font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024] w-fit">
          {value}
        </span>
      ) : badge === 'status' ? (
        <span className="inline-flex items-center h-[22px] px-[8px] rounded-[4px] bg-[#F0F0F3] font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#60646C] w-fit">
          {value}
        </span>
      ) : badge === 'not-assigned' ? (
        <div className="flex flex-col items-start gap-[4px]">
          <span className="inline-flex items-center h-[22px] px-[8px] rounded-[4px] bg-[rgba(255,222,0,0.24)] font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#ab6400] w-fit">
            {value}
          </span>
          {action && (
            <button
              onClick={action.onClick}
              className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0"
            >
              {action.text}
            </button>
          )}
        </div>
      ) : (
        <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
          {value}
        </span>
      )}
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.388 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.581 14.5032 3.8262 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L4.99967 13.6667L1.33301 14.6667L2.33301 11L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ROW_GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  gap: '24px',
};

const ROW_3_GRID_STYLE: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  gap: '24px',
};

interface TaskSummarySectionProps {
  taskId: string;
  currentTier?: string | null;
  onOpenTierAssessment?: () => void;
  showPulse?: boolean;
}

export function TaskSummarySection({ taskId, currentTier, onOpenTierAssessment, showPulse }: TaskSummarySectionProps) {
  const [editFlyoutOpen, setEditFlyoutOpen] = React.useState(false);

  return (
    <>
      <CollapsibleFilterSection title="Task Summary" highContrast>
        {/* Single white content surface */}
        <div className="bg-white rounded-[5px] relative">
          {/* Row 1 — Structural Task Context */}
          <div className="px-[8px] py-[12px]">
            <div style={ROW_GRID_STYLE}>
              <MetadataField label="Execution Statement" value="Maritime ISR Modernization Program" />
              <MetadataField label="Executing Activity" value="PMS 420" />
              <MetadataField label="Project" value="Coastal Surveillance Modernization" />
              <MetadataField label="WBS Attribute" value="5.2 — Sensor Fusion Systems" />
              <MetadataField label="Appropriation" value="O&MN" badge="appropriation" />
              <MetadataField 
                label="Tier" 
                value={currentTier || 'Not Assigned'} 
                badge={currentTier ? undefined : 'not-assigned'} 
                action={currentTier ? undefined : { text: 'Assign Tier', onClick: onOpenTierAssessment }} 
                showPulse={showPulse} 
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-solid border-[#e0e1e6]" />

          {/* Row 2 — Planning, Funding & Timeframe */}
          <div className="px-[8px] py-[12px]">
            <div style={ROW_GRID_STYLE}>
              <MetadataField label="Requested" value="Not Yet Estimated" />
              <MetadataField label="Allocated" value="Not Yet Allocated" />
              <MetadataField label="Gap" value="Not Applicable" />
              <MetadataField label="Funding Source" value="Not Yet Funded" />
              <MetadataField label="Planning Year" value="FY2026" />
              <MetadataField label="Period of Performance" value="Not Yet Defined" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-solid border-[#e0e1e6]" />

          {/* Row 3 — People, Status & Lineage */}
          <div className="px-[8px] py-[12px]">
            <div style={ROW_3_GRID_STYLE}>
              <MetadataField label="Project Lead" value="Sarah Mitchell" />
              <MetadataField label="Activity Lead" value="James O'Connor" />
              <MetadataField 
                label="Operational Status" 
                value="Active"
                operationalStatus={{ type: 'active' }}
              />
              <MetadataField label="Previous Task" value="Not Yet Linked" />
              <MetadataField label="Associated Tasks" value="None linked" />
              <MetadataField label="Next Task" value="Not Yet Created" />
            </div>
          </div>
        </div>

        {/* Action row - sits on gray background below white surface */}
        <div className="px-[8px] pt-[12px] flex justify-end">
          <button 
            onClick={() => setEditFlyoutOpen(true)}
            className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f0f7fc] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[#006496] border-solid inset-0 pointer-events-none rounded-[4px] bg-[#ffffff]" />
            <span className="relative shrink-0 text-[#006496]">
              <EditIcon />
            </span>
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#006496] text-[14px] whitespace-nowrap">
              Edit
            </span>
          </button>
        </div>
      </CollapsibleFilterSection>

      {/* Edit Task Flyout */}
      <EditTaskFlyout 
        open={editFlyoutOpen}
        onClose={() => setEditFlyoutOpen(false)}
        taskId={taskId}
      />
    </>
  );
}