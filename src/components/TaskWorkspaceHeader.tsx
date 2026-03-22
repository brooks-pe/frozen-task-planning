import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { TASKS_DATA } from './TaskPlanningData';
import { CloneTaskFlyout } from './CloneTaskFlyout';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { TaskSummarySection } from './TaskSummarySection';
import { TierAssessmentFlyout } from './TierAssessmentFlyout';
import { Info } from 'lucide-react';
import { TaskWorkspaceOverview } from './TaskWorkspaceOverview';
import { WorkflowFooter } from './WorkflowFooter';

export default function TaskWorkspaceHeader() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [cloneFlyoutOpen, setCloneFlyoutOpen] = React.useState(false);
  const [tierFlyoutOpen, setTierFlyoutOpen] = React.useState(false);
  const [currentTier, setCurrentTier] = React.useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showTierPulse, setShowTierPulse] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'boe'>('overview');

  const task = TASKS_DATA.find(t => t.taskId === taskId);

  if (!task) {
    return (
      <div className="p-[32px]">
        <p className="text-[#1C2024] text-[16px]">Task not found</p>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate('/task-planning/tasks');
  };

  const handleCloneClick = () => {
    setCloneFlyoutOpen(true);
  };

  const handleOpenTierAssessment = () => {
    setTierFlyoutOpen(true);
  };

  const handleTierSaved = (taskId: string, tier: string) => {
    setCurrentTier(tier);
    setShowSuccessToast(true);
    setShowTierPulse(true);
    
    // Hide toast after 6 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
    
    // Hide pulse after animation completes (~1.5 seconds)
    setTimeout(() => {
      setShowTierPulse(false);
    }, 1500);
  };

  return (
    <>
      <div className="bg-white px-[24px] pt-[24px] pb-0">
        <div className="flex flex-col gap-[16px]">
          {/* Row 1: Action Row - Back button and Clone Task */}
          <div className="flex items-center justify-between py-[12px]">
            {/* Left: Back to Tasks button (Secondary Outline Neutral) */}
            <button
              onClick={handleBackClick}
              className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-[#1C2024] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative shrink-0">
                <path d="M10 12L6 8L10 4" stroke="#1C2024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1C2024] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">Back to Tasks</p>
              </div>
            </button>

            {/* Right: Clone Task button (Secondary Outline Accent) */}
            <button
              onClick={handleCloneClick}
              className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f0f7fc] transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-[#006496] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#006496] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">Clone Task</p>
              </div>
            </button>
          </div>

          {/* Row 2: Content Header - Title, Subtitle, and Breadcrumbs */}
          <div className="relative flex flex-col gap-[12px] py-[16px]">
            {/* Decorative divider lines */}
            <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />

            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[40px] text-[#1C2024]">
                {task.title}
              </h1>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C]">
                {taskId} Task Summary
              </p>
            </div>

            {/* Breadcrumbs */}
            <SyncPointBreadcrumb items={[
              { label: 'Home', path: '/' },
              { label: 'Task Planning', path: '/task-planning/dashboard' },
              { label: 'Tasks', path: '/task-planning/tasks' },
              { label: taskId || '' },
            ]} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-[24px] py-[24px]">
        <div className="flex flex-col gap-[24px]">
          <TaskSummarySection taskId={taskId || ''} currentTier={currentTier} onOpenTierAssessment={handleOpenTierAssessment} showPulse={showTierPulse} />
          
          {/* Info Banner: Tier Assessment Required */}
          <div className="bg-[rgba(0,179,238,0.12)] rounded-[6px] w-full">
            <div className="flex gap-[8px] items-start p-[12px]">
              {/* Info Icon */}
              <div className="flex items-center shrink-0 h-[20px]">
                <Info size={16} className="text-[#00749E]" />
              </div>
              {/* Message Text */}
              <p className="flex-1 font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#00749e]">
                {currentTier 
                  ? 'Complete task details to submit to BOE Build Up.'
                  : <>Complete the <button onClick={handleOpenTierAssessment} className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0 inline">Tier Assessment</button> to establish the planning estimate and BOE tier before building this task.</>
                }
              </p>
            </div>
          </div>

          {/* Tabbed Content Area */}
          <div className="flex flex-col">
            {/* Tab Bar */}
            <div className="flex border-b border-[#e0e1e6]">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-[16px] py-[10px] font-['Inter:Medium',sans-serif] font-medium leading-[20px] border-b-[2px] transition-colors cursor-pointer bg-transparent ${ activeTab === 'overview' ? 'border-[#004B72] text-[#004B72]' : 'border-transparent text-[#60646C] hover:text-[#1C2024]' } text-[16px]`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('boe')}
                className={`px-[16px] py-[10px] font-['Inter:Medium',sans-serif] font-medium leading-[20px] border-b-[2px] transition-colors cursor-pointer bg-transparent ${ activeTab === 'boe' ? 'border-[#004B72] text-[#004B72]' : 'border-transparent text-[#60646C] hover:text-[#1C2024]' } text-[16px]`}
              >
                BOE Build Up
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-[20px]">
              {activeTab === 'overview' && (
                <TaskWorkspaceOverview currentTier={currentTier} onOpenTierAssessment={handleOpenTierAssessment} />
              )}
              {activeTab === 'boe' && (
                <div className="border border-[#e0e1e6] rounded-[8px] bg-[#f9f9fb] px-[20px] py-[40px] flex items-center justify-center">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
                    BOE Build Up will be available after Tier Assignment is completed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Workflow Footer */}
      <WorkflowFooter />

      {/* Success Toast */}
      {showSuccessToast && (
        <div 
          className={`fixed top-[100px] right-[24px] z-50 bg-[#e6f6eb] content-stretch flex gap-[8px] items-start overflow-clip p-[12px] rounded-[6px] w-[352px] shadow-lg transition-all duration-300 ${showSuccessToast ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}
        >
          <div className="content-stretch flex h-[20px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g clipPath="url(#clip0_48_12035)">
                  <path d="M14.6654 7.38667V8C14.6646 9.43761 14.2003 10.8365 13.3392 11.988C12.4781 13.1394 11.2665 13.9817 9.88921 14.3893C8.51188 14.7969 7.03815 14.7479 5.68963 14.2497C4.3411 13.7515 3.18975 12.8307 2.40723 11.6247C1.62471 10.4187 1.25287 8.99205 1.34746 7.55754C1.44205 6.12303 1.99812 4.75755 2.93217 3.66471C3.86621 2.57188 5.1285 1.81024 6.53077 1.49344C7.93304 1.17664 9.40016 1.32152 10.7121 1.90667" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.6667 2.66666L8 9.34L6 7.34" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_48_12035">
                    <rect fill="white" height="16" width="16" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,113,63,0.87)]">
            <p className="mb-0">Tier Assigned</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal mb-0">The task has been updated with the selected planning tier.</p>
          </div>
        </div>
      )}

      {/* Clone Task Flyout */}
      <CloneTaskFlyout
        open={cloneFlyoutOpen}
        onClose={() => setCloneFlyoutOpen(false)}
        sourceTask={task}
      />

      {/* Tier Assessment Flyout */}
      <TierAssessmentFlyout
        open={tierFlyoutOpen}
        onClose={() => setTierFlyoutOpen(false)}
        task={task}
        onTierSaved={handleTierSaved}
      />
    </>
  );
}