import { Info, ChevronDown } from 'lucide-react';
import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { TASKS_DATA } from './TaskPlanningData';
import { CloneTaskFlyout } from './CloneTaskFlyout';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { TaskSummarySection, TASK_SUMMARY_PROJECT_OPTIONS, getTaskRequirementProfile } from './TaskSummarySection';
import { TierAssessmentFlyout, type TierAssessmentResult } from './TierAssessmentFlyout';
import { TaskWorkspaceOverview } from './TaskWorkspaceOverview';
import { WorkflowFooter } from './WorkflowFooter';
import { BOESubtaskForm, BOESubtaskView, createEmptySubtaskDraft, isGovernmentExecutingActivity, requiresAcquisitionFee, restoreSubtaskFromSaved, snapshotSubtaskForSave, validateBoeForTier, type SubtaskDraft, type WorkflowState } from './BOESubtasksSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { EXECUTING_ACTIVITY_OPTIONS } from './TaskPlanningData';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.388 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.581 14.5032 3.8262 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L4.99967 13.6667L1.33301 14.6667L2.33301 11L11.333 2.00004Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TaskWorkspaceHeader() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [cloneFlyoutOpen, setCloneFlyoutOpen] = React.useState(false);
  const [tierFlyoutOpen, setTierFlyoutOpen] = React.useState(false);
  const [currentTier, setCurrentTier] = React.useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showTierPulse, setShowTierPulse] = React.useState(false);
  const [showCloneToast, setShowCloneToast] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>('overview');
  const [reimbursableTotal, setReimbursableTotal] = React.useState('');
  const [directCiteTotal, setDirectCiteTotal] = React.useState('');
  const [acquisitionFee, setAcquisitionFee] = React.useState('');
  const [showStickyContextHeader, setShowStickyContextHeader] = React.useState(false);
  const [tierAssessmentResult, setTierAssessmentResult] = React.useState<TierAssessmentResult | null>(null);
  const [subtasks, setSubtasks] = React.useState<SubtaskDraft[]>([]);

  const task = TASKS_DATA.find(t => t.taskId === taskId);
  const initialWorkflowState: WorkflowState = task?.workflowState === 'BOE Build-Up' ? 'BOE_BUILD_UP' : 'Draft';
  const [workflowState, setWorkflowState] = React.useState<WorkflowState>(initialWorkflowState);

  //  Edit mode state (shared by Task Title + Task Summary) 
  const [isEditing, setIsEditing] = React.useState(false);
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const boeContentRef = React.useRef<HTMLDivElement>(null);
  const breadcrumbRef = React.useRef<HTMLDivElement>(null);
  const subtaskTitleRef = React.useRef<HTMLInputElement>(null);
  const [pendingSubtaskFocusId, setPendingSubtaskFocusId] = React.useState<string | null>(null);

  // Title state  initialized from task data, kept in sync with saved value
  const [taskTitle, setTaskTitle] = React.useState(() => task?.title ?? '');
  const [savedTaskTitle, setSavedTaskTitle] = React.useState(() => task?.title ?? '');
  const requirementProfile = React.useMemo(() => getTaskRequirementProfile(taskId ?? ''), [taskId]);
  const initialExecutingActivity = task?.executingActivity ?? '';
  const initialProject = requirementProfile.project;
  const [executingActivity, setExecutingActivity] = React.useState(initialExecutingActivity);
  const [savedExecutingActivity, setSavedExecutingActivity] = React.useState(initialExecutingActivity);
  const [project, setProject] = React.useState(initialProject);
  const [savedProject, setSavedProject] = React.useState(initialProject);

  const visibleRequirement = React.useMemo(
    () => requirementProfile.l2Requirement?.trim() || requirementProfile.l1Requirement,
    [requirementProfile.l1Requirement, requirementProfile.l2Requirement]
  );

  const visibleRequirementAnchor = React.useMemo(() => {
    if (visibleRequirement.length <= 72) return visibleRequirement;
    return `${visibleRequirement.slice(0, 69)}...`;
  }, [visibleRequirement]);

  const isDraftState = workflowState === 'Draft';
  const isBoeBuildUpState = workflowState === 'BOE_BUILD_UP';

  const isTier0 = currentTier === 'Tier 0';
  const tier0BoePopulated = parseFloat(reimbursableTotal) > 0 && parseFloat(directCiteTotal) > 0;
  const activeSubtask = subtasks.find(subtask => subtask.id === activeTab) ?? null;
  const isTier1Or2 = !!currentTier && !isTier0;
  const isAnySubtaskEditing = subtasks.some(subtask => subtask.isEditing);
  const isGovernmentEA = isGovernmentExecutingActivity(executingActivity);
  const acquisitionFeeRequired = requiresAcquisitionFee(subtasks, isGovernmentEA);
  const canSubmitToActivityAccept = isTier1Or2 && !isAnySubtaskEditing && validateBoeForTier(subtasks, currentTier, isGovernmentEA, acquisitionFee);

  function handleDefineSubtasksClick() {
    if (isTier0) {
      setActiveTab('tier0');
    } else if (subtasks.length > 0) {
      setActiveTab(subtasks[0].id);
    } else {
      handleAddSubtaskTab();
    }
    requestAnimationFrame(() => {
      boeContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

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

  const handleTierSaved = (result: TierAssessmentResult) => {
    setCurrentTier(result.assignedTier);
    setTierAssessmentResult(result);
    if (result.assignedTier === 'Tier 0') {
      setWorkflowState('Draft');
    }
    setShowSuccessToast(true);
    setShowTierPulse(true);
    setTimeout(() => setShowSuccessToast(false), 6000);
    setTimeout(() => setShowTierPulse(false), 1500);
  };

  const handleTaskCloned = (cloned: { taskId: string; title: string; executingActivity: string; requested: number }) => {
    // Update the visible page title to match the cloned task's New Task Title
    setTaskTitle(cloned.title);
    setSavedTaskTitle(cloned.title);
    // Show clone success toast (top-right, same pattern as tier toast)
    setShowCloneToast(true);
    setTimeout(() => setShowCloneToast(false), 6000);
  };

  // Dev-only: override tier for UI testing
  const handleDevTierChange = (tier: string | null) => {
    setCurrentTier(tier);
    if (!tier || tier === 'Tier 0') {
      setActiveTab('overview');
      setWorkflowState('Draft');
    }
  };

  // Enter edit mode. If focusTitle=true, auto-focus the title input on the next tick.
  const handleEnterEditMode = (focusTitle = false) => {
    setIsEditing(true);
    if (focusTitle) {
      setTimeout(() => titleInputRef.current?.focus(), 0);
    }
  };

  // Save: persist title + exit edit mode (TaskSummarySection persists its own formState)
  const handleSaveEdit = () => {
    setSavedTaskTitle(taskTitle);
    setSavedExecutingActivity(executingActivity);
    setSavedProject(project);
    setIsEditing(false);
  };

  // Cancel: restore title + exit edit mode (TaskSummarySection restores its own formState)
  const handleCancelEdit = () => {
    setTaskTitle(savedTaskTitle);
    setExecutingActivity(savedExecutingActivity);
    setProject(savedProject);
    setIsEditing(false);
  };

  const handleAddSubtaskTab = React.useCallback(() => {
    const newSubtask = createEmptySubtaskDraft();
    setSubtasks(prev => [...prev, newSubtask]);
    setActiveTab(newSubtask.id);
    setPendingSubtaskFocusId(newSubtask.id);
  }, []);

  const handleUpdateSubtask = React.useCallback((id: string, patch: Partial<SubtaskDraft>) => {
    setSubtasks(prev => prev.map(subtask => (subtask.id === id ? { ...subtask, ...patch } : subtask)));
  }, []);

  const handleSaveSubtask = React.useCallback((id: string) => {
    setSubtasks(prev =>
      prev.map(subtask =>
        subtask.id === id
          ? snapshotSubtaskForSave(subtask)
          : subtask
      )
    );
  }, []);

  const handleEditSubtask = React.useCallback((id: string) => {
    setSubtasks(prev =>
      prev.map(subtask =>
        subtask.id === id
          ? { ...subtask, isEditing: true }
          : subtask
      )
    );
  }, []);

  const handleCancelSubtaskEdit = React.useCallback((id: string) => {
    setSubtasks(prev => {
      const target = prev.find(subtask => subtask.id === id);

      if (!target) {
        return prev;
      }

      if (!target.savedTitle) {
        const currentIndex = prev.findIndex(subtask => subtask.id === id);
        const next = prev.filter(subtask => subtask.id !== id);
        if (activeTab === id) {
          const fallbackSubtask = next[Math.max(0, currentIndex - 1)] ?? next[0] ?? null;
          setActiveTab(fallbackSubtask ? fallbackSubtask.id : 'overview');
        }
        return next;
      }

      return prev.map(subtask =>
        subtask.id === id
          ? restoreSubtaskFromSaved(subtask)
          : subtask
      );
    });
  }, [activeTab]);

  const handleRemoveSubtask = React.useCallback((id: string) => {
    setSubtasks(prev => {
      const currentIndex = prev.findIndex(subtask => subtask.id === id);
      const next = prev.filter(subtask => subtask.id !== id);

      if (activeTab === id) {
        const fallbackSubtask = next[Math.max(0, currentIndex - 1)] ?? next[0] ?? null;
        setActiveTab(fallbackSubtask ? fallbackSubtask.id : 'overview');
      }

      return next;
    });
  }, [activeTab]);

  React.useEffect(() => {
    if (pendingSubtaskFocusId) {
      setTimeout(() => subtaskTitleRef.current?.focus(), 0);
      setPendingSubtaskFocusId(null);
    }
  }, [pendingSubtaskFocusId]);

  React.useEffect(() => {
    if (!currentTier) {
      setActiveTab('overview');
      return;
    }

    if (currentTier === 'Tier 0' && activeTab !== 'overview' && activeTab !== 'tier0') {
      setActiveTab('overview');
    }

    if (currentTier !== 'Tier 0' && activeTab === 'tier0') {
      setActiveTab('overview');
    }
  }, [activeTab, currentTier]);

  React.useEffect(() => {
    const breadcrumbElement = breadcrumbRef.current;

    if (!breadcrumbElement) {
      return;
    }

    const scrollContainer = breadcrumbElement.closest('.overflow-y-auto') as HTMLElement | null;

    if (!scrollContainer) {
      return;
    }

    let frameId: number | null = null;

    const updateStickyHeader = () => {
      frameId = null;
      const breadcrumbRect = breadcrumbElement.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      setShowStickyContextHeader(breadcrumbRect.top <= containerRect.top + 1);
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateStickyHeader);
    };

    requestUpdate();
    scrollContainer.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      scrollContainer.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const handleSubmitToBoeBuild = () => {
    setWorkflowState('BOE_BUILD_UP');
    if (!isTier0 && subtasks.length === 0) {
      handleAddSubtaskTab();
    }
  };

  const requirementHover = (
    <HoverCard openDelay={120}>
      <HoverCardTrigger asChild>
        <span className="cursor-help whitespace-nowrap underline decoration-dotted underline-offset-[2px] decoration-[rgba(28,32,36,0.45)]">
          {visibleRequirementAnchor}
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-[420px] bg-white border border-[rgba(0,6,46,0.14)] shadow-lg rounded-[6px] p-[12px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col gap-[2px]">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#60646C]">L1 Requirement</span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">{requirementProfile.l1Requirement}</span>
          </div>
          {requirementProfile.l2Requirement && (
            <div className="flex flex-col gap-[2px]">
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#60646C]">L2 Requirement</span>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">{requirementProfile.l2Requirement}</span>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  return (
    <>
      <div className="sticky top-0 z-30 h-0">
        <div
          className={`pointer-events-none transition-all duration-200 ease-out ${
            showStickyContextHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="bg-white border-b border-[#e0e1e6] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="px-[24px] py-[12px]">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#1C2024] overflow-hidden text-ellipsis whitespace-nowrap">
                {taskId} | {visibleRequirementAnchor} | {savedExecutingActivity}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-[24px] pt-[24px] pb-0">
        <div className="flex flex-col gap-[16px]">
          {/* Row 1: Action Row - Back button, Dev Override, and Clone Task */}
          <div className="flex items-center py-[12px]">

            {/* Left: Back to Tasks */}
            <div className="flex-1 flex items-center">
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
            </div>

            {/* Center: Tier Dev Override */}
            <div className="flex items-center gap-[8px] shrink-0">
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D] whitespace-nowrap">
                Tier (Dev Override)
              </span>
              <div className="relative">
                <select
                  value={currentTier ?? ''}
                  onChange={e => handleDevTierChange(e.target.value === '' ? null : e.target.value)}
                  className="h-[32px] pl-[10px] pr-[28px] rounded-[4px] border border-[rgba(0,8,48,0.18)] font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024] bg-white cursor-pointer appearance-none focus:outline-none focus:border-[#004B72] transition-colors"
                >
                  <option value="">No Tier Assigned</option>
                  <option value="Tier 0">Tier 0</option>
                  <option value="Tier 1">Tier 1</option>
                  <option value="Tier 2">Tier 2</option>
                </select>
                <ChevronDown size={12} className="absolute right-[8px] top-1/2 -translate-y-1/2 text-[#60646C] pointer-events-none" />
              </div>
            </div>

            {/* Right: Clone Task */}
            <div className="flex-1 flex items-center justify-end">
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

          </div>

          {/* Row 2: Content Header - Title, Subtitle, and Breadcrumbs */}
          <div className="relative flex flex-col gap-[12px] py-[16px]">
            {/* Decorative divider lines */}
            <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />

            <div className="flex flex-col gap-[4px]">
              {/* Title row  inline edit in edit mode, pencil affordance in read mode (Draft only) */}
              <div className="flex items-center gap-[8px]">
                {isEditing ? (
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    className="flex-1 h-[40px] px-[8px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[40px] text-[#1C2024] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow"
                  />
                ) : (
                  <>
                    <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[40px] text-[#1C2024]">
                      {taskTitle}
                    </h1>
                    {isDraftState && (
                      <button
                        onClick={() => handleEnterEditMode(true)}
                        className="flex items-center justify-center w-[28px] h-[28px] rounded-[4px] border-none bg-transparent cursor-pointer text-[#60646C] hover:text-[#004b72] hover:bg-[#f0f7fb] transition-colors shrink-0"
                        aria-label="Edit task title"
                      >
                        <PencilIcon />
                      </button>
                    )}
                  </>
                )}
              </div>
              {isEditing ? (
                <div className="flex items-center gap-[8px] min-w-0 flex-wrap">
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#1C2024] whitespace-nowrap">
                    {taskId}
                  </span>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C] shrink-0">
                      |
                    </span>
                  <div className="min-w-0 max-w-[420px] text-[18px] leading-[24px] text-[#60646C]">
                    {requirementHover}
                  </div>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C] shrink-0">
                      |
                    </span>
                  <div className="w-[160px] min-w-0">
                    <SearchableFilterDropdown
                      value={executingActivity}
                      onChange={setExecutingActivity}
                      options={EXECUTING_ACTIVITY_OPTIONS.filter(option => option !== 'All')}
                      className="w-full"
                      triggerStyle={{ width: '100%', minWidth: 0 }}
                    />
                  </div>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C] shrink-0">
                      |
                    </span>
                  <div className="w-[260px] min-w-0">
                    <SearchableFilterDropdown
                      value={project}
                      onChange={setProject}
                      options={TASK_SUMMARY_PROJECT_OPTIONS}
                      className="w-full"
                      triggerStyle={{ width: '100%', minWidth: 0 }}
                    />
                  </div>
                </div>
              ) : (
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C]">
                  <span className="text-[#1C2024]">{taskId}</span> | {requirementHover} | {savedExecutingActivity} | {savedProject}
                </p>
              )}
            </div>

            {/* Breadcrumbs */}
            <div ref={breadcrumbRef}>
              <SyncPointBreadcrumb items={[
                { label: 'Home', path: '/' },
                { label: 'Task Planning', path: '/task-planning/dashboard' },
                { label: 'Tasks', path: '/task-planning/tasks' },
                { label: taskId || '' },
              ]} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-[24px] py-[24px]">
        <div className="flex flex-col gap-[24px]">
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
                  ? isTier0
                    ? <>Complete <button type="button" onClick={handleDefineSubtasksClick} className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0 inline">Tier 0 BOE</button> to submit directly to Project Allocation, or proceed to BOE Build-Up.</>
                    : isBoeBuildUpState
                      ? currentTier === 'Tier 2'
                        ? <>BOE Build-Up is in progress. Complete detailed deliverables and BOE items for each subtask to unlock Activity Acceptance.</>
                        : <>BOE Build-Up is in progress. Complete at least one deliverable and one BOE item for each subtask to unlock Activity Acceptance.</>
                      : <><button type="button" onClick={handleDefineSubtasksClick} className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0 inline">Define subtasks</button> to organize work and prepare for BOE Build-Up. Subtasks are optional in Draft but required during BOE Build-Up.</>
                  : <>Complete the <button type="button" onClick={handleOpenTierAssessment} className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#147DB9] bg-transparent border-none cursor-pointer hover:underline p-0 inline">Tier Assessment</button> to establish the planning estimate and BOE tier before building this task.</>
                }
              </p>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-[24px] items-start">
            {/* Primary workspace column */}
            <div className="w-full xl:order-1 flex-1 min-w-0">
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
              {!!currentTier && isTier0 && (
                <button
                  onClick={() => setActiveTab('tier0')}
                  className={`px-[16px] py-[10px] font-['Inter:Medium',sans-serif] font-medium leading-[20px] border-b-[2px] transition-colors cursor-pointer bg-transparent ${ activeTab === 'tier0' ? 'border-[#004B72] text-[#004B72]' : 'border-transparent text-[#60646C] hover:text-[#1C2024]' } text-[16px]`}
                >
                  Tier 0 BOE
                </button>
              )}
              {!!currentTier && !isTier0 && subtasks.map((subtask, index) => (
                <button
                  key={subtask.id}
                  onClick={() => setActiveTab(subtask.id)}
                  className={`px-[16px] py-[10px] font-['Inter:Medium',sans-serif] font-medium leading-[20px] border-b-[2px] transition-colors cursor-pointer bg-transparent text-[16px] ${ activeTab === subtask.id ? 'border-[#004B72] text-[#004B72]' : 'border-transparent text-[#60646C] hover:text-[#1C2024]' }`}
                >
                  {subtask.savedTitle || `Untitled Subtask ${index + 1}`}
                </button>
              ))}
              {!!currentTier && !isTier0 && (
                <button
                  onClick={handleAddSubtaskTab}
                  className="px-[16px] py-[10px] font-['Inter:Medium',sans-serif] font-medium leading-[20px] border-b-[2px] border-transparent transition-colors cursor-pointer bg-transparent text-[#006496] hover:text-[#004B72] text-[16px]"
                >
                  + Add Subtask
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div ref={boeContentRef} className="pt-[20px]">
              {activeTab === 'overview' && (
                <TaskWorkspaceOverview currentTier={currentTier} onOpenTierAssessment={handleOpenTierAssessment} />
              )}
              {activeTab === 'tier0' && (
                isTier0 ? (
                  /* Tier 0 minimal BOE form */
                  <div className="border border-[#e0e1e6] rounded-[8px] bg-white px-[24px] py-[24px]">
                    <div className="flex flex-col gap-[20px] max-w-[480px]">

                      {/* Instructional context */}
                      <div className="flex gap-[8px] items-start">
                        <Info size={14} className="text-[#60646C] shrink-0 mt-[2px]" />
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[#60646C] text-[14px]">
                          Optional for Tier 0 tasks. Completing both fields allows this task to bypass BOE Build-Up and submit directly to Project Allocation.
                        </p>
                      </div>

                      {/* Reimbursable Total Dollars */}
                      <div className="flex flex-col gap-[6px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[#60646C] text-[14px]">
                          Reimbursable Total Dollars
                        </p>
                        <div className="relative">
                          <span className="absolute left-[8px] top-1/2 -translate-y-1/2 font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] pointer-events-none">
                            $
                          </span>
                          <input
                            type="text"
                            value={reimbursableTotal}
                            onChange={e => setReimbursableTotal(e.target.value)}
                            placeholder="0.00"
                            className="w-full h-[36px] pl-[20px] pr-[10px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#004B72] focus:ring-1 focus:ring-[#004B72] bg-white"
                          />
                        </div>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D]">
                          Applicable for Government executing activities
                        </p>
                      </div>

                      {/* Direct Cite Total Dollars */}
                      <div className="flex flex-col gap-[6px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[#60646C] text-[14px]">
                          Direct Cite Total Dollars
                        </p>
                        <div className="relative">
                          <span className="absolute left-[8px] top-1/2 -translate-y-1/2 font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] pointer-events-none">
                            $
                          </span>
                          <input
                            type="text"
                            value={directCiteTotal}
                            onChange={e => setDirectCiteTotal(e.target.value)}
                            placeholder="0.00"
                            className="w-full h-[36px] pl-[20px] pr-[10px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#004B72] focus:ring-1 focus:ring-[#004B72] bg-white"
                          />
                        </div>
                        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D]">
                          Required for all Tier 0 tasks
                        </p>
                      </div>

                      {/* Combined guidance */}
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D]">
                        Enter both values to enable direct submission to Project Allocation.
                      </p>

                    </div>
                  </div>
                ) : (
                  null
                )
              )}
              {!isTier0 && !!currentTier && activeSubtask && (
                <div className="flex flex-col gap-[16px]">
                  <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[#1C2024] text-[18px]">
                    {isBoeBuildUpState ? 'BOE Build-Up' : 'Define Subtask Shell'}
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[#80838D] text-[14px]">
                    {isBoeBuildUpState
                      ? currentTier === 'Tier 2'
                        ? 'You are completing a Tier 2 BOE. Detailed deliverables and BOE items are required for this subtask, including acceptance criteria and major deliverable designation where applicable.'
                        : 'You are completing a Tier 1 BOE. Provide at least one deliverable and one BOE item for this subtask to complete the minimum BOE structure.'
                      : 'Define this subtask shell to structure the work for later BOE Build-Up. Capture the subtask title, supporting context, and period of performance so this workstream is ready for downstream estimating.'}
                  </p>
                  {isBoeBuildUpState && acquisitionFeeRequired && (
                    <div className="max-w-[360px] flex flex-col gap-[6px]">
                      <label className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[#60646C] text-[14px]">
                        Acquisition Fee *
                      </label>
                      <div className="relative">
                        <span className="absolute left-[8px] top-1/2 -translate-y-1/2 font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] pointer-events-none">
                          $
                        </span>
                        <input
                          type="text"
                          value={acquisitionFee}
                          onChange={e => setAcquisitionFee(e.target.value)}
                          placeholder="0.00"
                          className="w-full h-[36px] pl-[20px] pr-[10px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#004B72] focus:ring-1 focus:ring-[#004B72] bg-white"
                        />
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D]">
                        Required because this Government-executed task currently contains only Direct Cite BOE items.
                      </p>
                    </div>
                  )}
                  {activeSubtask.isEditing ? (
                    <BOESubtaskForm
                      subtask={activeSubtask}
                      workflowState={workflowState}
                      currentTier={currentTier}
                      isGovernmentExecutingActivity={isGovernmentEA}
                      onUpdate={patch => handleUpdateSubtask(activeSubtask.id, patch)}
                      onSave={() => handleSaveSubtask(activeSubtask.id)}
                      onCancel={() => handleCancelSubtaskEdit(activeSubtask.id)}
                      onRemove={() => handleRemoveSubtask(activeSubtask.id)}
                      titleRef={activeSubtask.id === pendingSubtaskFocusId ? subtaskTitleRef : undefined}
                    />
                  ) : (
                    <BOESubtaskView
                      subtask={activeSubtask}
                      workflowState={workflowState}
                      currentTier={currentTier}
                      isGovernmentExecutingActivity={isGovernmentEA}
                      onEdit={() => handleEditSubtask(activeSubtask.id)}
                      onRemove={() => handleRemoveSubtask(activeSubtask.id)}
                    />
                  )}
                </div>
              )}
            </div>
              </div>
            </div>

            {/* Task Summary Panel: starts below banner and pins right on desktop */}
            <div className="w-full xl:order-2 xl:basis-[340px] xl:min-w-[320px] xl:max-w-[360px] xl:flex-[0_0_340px] xl:sticky xl:top-[96px]">
              <TaskSummarySection
                taskId={taskId || ''}
                currentTier={currentTier}
                tierAssessmentResult={tierAssessmentResult}
                onOpenTierAssessment={handleOpenTierAssessment}
                showPulse={showTierPulse}
                isEditing={isEditing}
                onEnterEditMode={() => handleEnterEditMode(false)}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Workflow Footer */}
      <WorkflowFooter
        tierAssigned={!!currentTier}
        isTier0={isTier0}
        tier0BoePopulated={tier0BoePopulated}
        workflowState={workflowState}
        canSubmitToActivityAccept={canSubmitToActivityAccept}
        onSubmitToBoeBuild={handleSubmitToBoeBuild}
      />

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

      {/* Clone Success Toast */}
      {showCloneToast && (
        <div
          className={`fixed top-[100px] right-[24px] z-50 bg-[#e6f6eb] content-stretch flex gap-[8px] items-start overflow-clip p-[12px] rounded-[6px] w-[352px] shadow-lg transition-all duration-300 ${showCloneToast ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}
        >
          <div className="content-stretch flex h-[20px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g clipPath="url(#clip1_clone_success)">
                  <path d="M14.6654 7.38667V8C14.6646 9.43761 14.2003 10.8365 13.3392 11.988C12.4781 13.1394 11.2665 13.9817 9.88921 14.3893C8.51188 14.7969 7.03815 14.7479 5.68963 14.2497C4.3411 13.7515 3.18975 12.8307 2.40723 11.6247C1.62471 10.4187 1.25287 8.99205 1.34746 7.55754C1.44205 6.12303 1.99812 4.75755 2.93217 3.66471C3.86621 2.57188 5.1285 1.81024 6.53077 1.49344C7.93304 1.17664 9.40016 1.32152 10.7121 1.90667" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.6667 2.66666L8 9.34L6 7.34" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip1_clone_success">
                    <rect fill="white" height="16" width="16" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,113,63,0.87)]">
            <p className="mb-0">Task Cloned</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal mb-0">The cloned task has been created in Draft status and is ready for editing.</p>
          </div>
        </div>
      )}

      {/* Clone Task Flyout */}
      <CloneTaskFlyout
        open={cloneFlyoutOpen}
        onClose={() => setCloneFlyoutOpen(false)}
        sourceTask={task}
        currentTier={currentTier}
        onTaskCloned={handleTaskCloned}
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

