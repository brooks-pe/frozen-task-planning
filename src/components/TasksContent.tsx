import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { MultiSelectFilterDropdown } from './MultiSelectFilterDropdown';
import { SortIndicator } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { SearchIcon, MoreVertical } from './InlineIcons';
import { CreateTaskFlyout } from './CreateTaskFlyout';
import { CloneTaskFlyout } from './CloneTaskFlyout';
import {
  TASKS_DATA,
  WORKFLOW_ORDER,
  STATUS_FOCUS_CONFIG,
  getPrimaryStatusTag,
  PLANNING_YEAR_OPTIONS,
  WORKFLOW_STATE_OPTIONS,
  TASK_STATUS_FOCUS_OPTIONS,
  PROJECT_OPTIONS,
  EXECUTING_ACTIVITY_OPTIONS,
} from './TaskPlanningData';
import type { TaskRow } from './TaskPlanningData';

// ─── Types ────────────────────────────────────────────────────────────────

type TaskColumnKey = 'taskId' | 'executingActivity' | 'project' | 'title' | 'workflowState' | 'requested' | 'allocated' | 'gap';

// ─── Column Definitions ─────────────────────────────────────────────

const TASK_TABLE_GRID = 'minmax(80px, 0.8fr) minmax(130px, 1.3fr) minmax(130px, 1.3fr) minmax(160px, 2fr) minmax(130px, 1.3fr) minmax(90px, 1fr) minmax(90px, 1fr) minmax(80px, 1fr) 48px';

const COLUMNS: { key: TaskColumnKey; label: string; sortType: 'string' | 'number' }[] = [
  { key: 'taskId', label: 'TASK ID', sortType: 'string' },
  { key: 'executingActivity', label: 'EXECUTING ACTIVITY', sortType: 'string' },
  { key: 'project', label: 'PROJECT', sortType: 'string' },
  { key: 'title', label: 'TITLE', sortType: 'string' },
  { key: 'workflowState', label: 'WORKFLOW STATE', sortType: 'string' },
  { key: 'requested', label: 'REQUESTED', sortType: 'number' },
  { key: 'allocated', label: 'ALLOCATED', sortType: 'number' },
  { key: 'gap', label: 'GAP', sortType: 'number' },
];

// ─── Currency Formatter ─────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ─── Status Focus Indicator ─────────────────────────────────────────────

function StatusFocusDot({ tag }: { tag: string }) {
  const cfg = STATUS_FOCUS_CONFIG[tag];
  if (!cfg) return null;
  return (
    <span className="relative inline-flex items-center justify-center group/dot w-[20px] h-[20px] shrink-0 cursor-default">
      <span
        className="inline-block w-[10px] h-[10px] rounded-full shrink-0"
        style={{ backgroundColor: cfg.color }}
        aria-label={tag}
      />
      {/* Tooltip */}
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-[4px] opacity-0 group-hover/dot:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50 px-[8px] py-[4px] rounded-[4px] text-[12px] leading-[16px] font-medium"
        style={{ backgroundColor: '#1C2024', color: '#fff', fontFamily: "'Inter', sans-serif" }}
      >
        {tag}
      </span>
    </span>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────

export default function TasksContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [cloneTaskOpen, setCloneTaskOpen] = useState(false);
  const [cloneSourceTask, setCloneSourceTask] = useState<TaskRow | null>(null);
  const [createdTasks, setCreatedTasks] = useState<TaskRow[]>([]);
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Toast auto-dismiss
  useEffect(() => {
    if (!showSuccessToast) return;
    const timer = setTimeout(() => setShowSuccessToast(false), 6000);
    return () => clearTimeout(timer);
  }, [showSuccessToast]);

  // Highlight auto-dismiss
  useEffect(() => {
    if (!highlightedTaskId) return;
    const timer = setTimeout(() => setHighlightedTaskId(null), 2200);
    return () => clearTimeout(timer);
  }, [highlightedTaskId]);

  const handleTaskCreated = useCallback((task: { taskId: string; title: string; executingActivity: string; requested: number }) => {
    const newTask: TaskRow = {
      taskId: task.taskId,
      executingActivity: task.executingActivity,
      project: 'Unmanned Systems Integration Program', // Default project for new tasks
      title: task.title,
      workflowState: 'Draft',
      requested: task.requested,
      allocated: 0,
      gap: task.requested,
      statusFocusTags: [],
      lastUpdated: new Date().toISOString().split('T')[0],
      assignedToMe: false,
    };
    setCreatedTasks(prev => [newTask, ...prev]);
    setHighlightedTaskId(task.taskId);
    setToastMessage(task.taskId);
    setShowSuccessToast(true);
  }, []);

  // Read initial statusFocus from URL if present
  const initialStatusFocus = (() => {
    const param = searchParams.get('statusFocus');
    if (param && TASK_STATUS_FOCUS_OPTIONS.includes(param)) return param;
    return 'All';
  })();

  // Read initial workflowState from URL if present
  const initialWorkflowState = (() => {
    const param = searchParams.get('workflowState');
    if (param && WORKFLOW_STATE_OPTIONS.includes(param)) return param;
    return 'All';
  })();

  // Filter state - multi-select for most filters, single-select for Task Status Focus
  const [planningYear, setPlanningYear] = useState(['FY2026']);
  const [workflowState, setWorkflowState] = useState<string[]>(initialWorkflowState === 'All' ? ['All'] : [initialWorkflowState]);
  const [taskStatusFocus, setTaskStatusFocus] = useState(initialStatusFocus);
  const [project, setProject] = useState<string[]>(['All']);
  const [executingActivity, setExecutingActivity] = useState<string[]>(['All']);

  // Table state
  const [searchValue, setSearchValue] = useState('');
  const [sortColumn, setSortColumn] = useState<TaskColumnKey | null>('workflowState');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Clear the URL param after reading so it doesn't persist on manual filter changes
  const handleStatusFocusChange = useCallback((value: string) => {
    setTaskStatusFocus(value);
    // Remove statusFocus from URL when user manually changes filter
    if (searchParams.has('statusFocus')) {
      searchParams.delete('statusFocus');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleWorkflowStateChange = useCallback((values: string[]) => {
    setWorkflowState(values);
    if (searchParams.has('workflowState')) {
      searchParams.delete('workflowState');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleResetFilters = () => {
    setPlanningYear(['FY2026']);
    setWorkflowState(['All']);
    setTaskStatusFocus('All');
    setProject(['All']);
    setExecutingActivity(['All']);
    if (searchParams.has('statusFocus') || searchParams.has('workflowState')) {
      searchParams.delete('statusFocus');
      searchParams.delete('workflowState');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleSort = useCallback((columnKey: TaskColumnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  }, [sortColumn, sortDirection]);

  const getDirection = useCallback((columnKey: TaskColumnKey) => {
    if (sortColumn === columnKey) {
      return sortDirection;
    }
    return null;
  }, [sortColumn, sortDirection]);

  // Filtering logic
  const filteredData = useMemo(() => {
    let data = [...createdTasks, ...TASKS_DATA];

    // Workflow State filter (OR logic within filter)
    if (!workflowState.includes('All') && workflowState.length > 0) {
      data = data.filter(t => workflowState.includes(t.workflowState));
    }

    // Task Status Focus filter (single-select, remains unchanged)
    if (taskStatusFocus !== 'All') {
      data = data.filter(t => t.statusFocusTags?.includes(taskStatusFocus));
    }

    // Executing Activity filter (OR logic within filter)
    if (!executingActivity.includes('All') && executingActivity.length > 0) {
      data = data.filter(t => executingActivity.includes(t.executingActivity));
    }

    // Project filter (OR logic within filter)
    if (!project.includes('All') && project.length > 0) {
      data = data.filter(t => project.includes(t.project));
    }

    // Search filter
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      data = data.filter(t =>
        t.taskId.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q)
      );
    }

    return data;
  }, [workflowState, taskStatusFocus, executingActivity, project, searchValue, createdTasks]);

  // Sorting logic — uses WORKFLOW_ORDER for workflowState column
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;
    const col = COLUMNS.find(c => c.key === sortColumn);
    if (!col) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      let result: number;
      if (sortColumn === 'workflowState') {
        const aOrder = WORKFLOW_ORDER[String(aVal)] ?? 99;
        const bOrder = WORKFLOW_ORDER[String(bVal)] ?? 99;
        result = aOrder - bOrder;
      } else if (col.sortType === 'number') {
        result = (aVal as number) - (bVal as number);
      } else {
        result = String(aVal).localeCompare(String(bVal));
      }
      return sortDirection === 'asc' ? result : -result;
    });
  }, [filteredData, sortColumn, sortDirection]);

  return (
    <div className="flex flex-col items-start p-[24px] w-full">
      {/* Version Bar */}
      <div className="flex items-start justify-end overflow-clip pb-[12px] w-full">
        <div className="flex gap-[24px] items-start shrink-0">
          <button
            onClick={() => setCreateTaskOpen(true)}
            className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer border-none hover:bg-[#003a57] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-white whitespace-nowrap">
              Create Task
            </span>
          </button>
          <button className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer border-none hover:bg-[#f5f5f5] transition-colors">
            <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px] whitespace-nowrap">
              Export
            </span>
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-[12px] items-start py-[16px] w-full relative">
        <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <div className="flex flex-col gap-[4px] items-start w-full">
          <h1 className="font-['Inter',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px] tracking-[0px]">
            Tasks
          </h1>
          <p className="font-['Inter',sans-serif] font-medium leading-[24px] not-italic text-[#60646c] text-[18px] tracking-[0px]">
            Browse and filter all tasks in the current planning cycle. Click a Task ID to open the Task Workspace.
          </p>
        </div>
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Task Planning', path: '/task-planning/dashboard' },
          { label: 'Tasks' },
        ]} />
      </div>

      {/* Spacer */}
      <div className="h-[24px] w-full" />

      {/* Filters */}
      <CollapsibleFilterSection>
        <div className="flex flex-wrap gap-[16px] items-end">
          <FilterField label="Planning Year" width={130}>
            <SearchableFilterDropdown value={planningYear[0]} onChange={(val) => setPlanningYear([val])} options={PLANNING_YEAR_OPTIONS} triggerStyle={{ width: '100%' }} />
          </FilterField>
          <FilterField label="Executing Activity" width={160}>
            <MultiSelectFilterDropdown values={executingActivity} onChange={setExecutingActivity} options={EXECUTING_ACTIVITY_OPTIONS} triggerStyle={{ width: '100%' }} />
          </FilterField>
          <FilterField label="Project" width={175}>
            <MultiSelectFilterDropdown values={project} onChange={setProject} options={PROJECT_OPTIONS} triggerStyle={{ width: '100%' }} />
          </FilterField>
          <FilterField label="Workflow State" width={185}>
            <MultiSelectFilterDropdown values={workflowState} onChange={handleWorkflowStateChange} options={WORKFLOW_STATE_OPTIONS} triggerStyle={{ width: '100%' }} />
          </FilterField>
          <FilterField label="Task Status Focus" width={160}>
            <SearchableFilterDropdown 
              value={taskStatusFocus} 
              onChange={handleStatusFocusChange} 
              options={TASK_STATUS_FOCUS_OPTIONS} 
              triggerStyle={{ width: '100%' }} 
              optionColors={{
                'All': '#1C2024',
                'Awaiting My Action': '#0073AA',
                'Stalled Tasks': '#6B7280',
                'Near Deadline': '#F59E0B',
                'Overdue': '#DC2626',
              }}
            />
          </FilterField>
          {/* Reset Filters — ghost link, inline with controls */}
          <button
            onClick={handleResetFilters}
            className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,75,114,0.35)]"
            style={{ color: '#004B72' }}
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
              Reset Filters
            </span>
          </button>
        </div>
      </CollapsibleFilterSection>

      {/* Applied Filters Chips */}
      <AppliedFiltersRow
        planningYear={planningYear}
        setPlanningYear={setPlanningYear}
        executingActivity={executingActivity}
        setExecutingActivity={setExecutingActivity}
        project={project}
        setProject={setProject}
        workflowState={workflowState}
        setWorkflowState={handleWorkflowStateChange}
        taskStatusFocus={taskStatusFocus}
        setTaskStatusFocus={handleStatusFocusChange}
        onClearAll={handleResetFilters}
      />

      {/* Spacer */}
      <div className="h-[24px] w-full" />

      {/* Tasks Table */}
      <div className="flex flex-col rounded-[5px] border border-solid border-[#e0e1e6] overflow-hidden w-full">
        {/* Table Title Header */}
        <div className="bg-[#f9f9fb] relative w-full">
          <div className="flex items-center justify-between px-[24px] py-[20px] w-full border-b border-solid border-b-[#d0d1d6]">
            <div className="flex items-center gap-[16px] shrink-0">
              
              {/* Vertical divider */}
              
              <div className="bg-white h-[32px] relative rounded-[4px] w-[268px]">
                <div aria-hidden="true" className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="flex items-center size-full px-[4px]">
                  <div className="flex items-center justify-center shrink-0 px-[2px]">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search by ID or title..."
                    className="flex-1 bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1c2024] text-[14px] placeholder:text-[#60646c] px-[4px]"
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1.5px_2px_0px_rgba(0,0,0,0.1),inset_0px_1.5px_2px_0px_rgba(0,0,85,0.02)]" />
              </div>
            </div>
            <div className="flex items-center">
              {/* Empty - task count removed */}
            </div>
          </div>
        </div>

        {/* Column Headers */}
        <div
          className="bg-[#f9f9fb] border-b border-[#e0e1e6] grid"
          style={{ gridTemplateColumns: TASK_TABLE_GRID }}
        >
          {COLUMNS.map((col) => {
            const dir = getDirection(col.key);
            const isFinancial = col.key === 'requested' || col.key === 'allocated' || col.key === 'gap';
            return (
              <div
                key={col.key}
                className={`px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] ${isFinancial ? 'justify-end' : ''}`}
                onClick={() => handleSort(col.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort(col.key); } }}
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] whitespace-nowrap">
                  {col.label}
                </p>
                <SortIndicator direction={dir} />
              </div>
            );
          })}
          {/* Actions header - unlabeled */}
          <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
            {/* Empty - unlabeled actions column */}
          </div>
        </div>

        {/* Body Rows */}
        {(() => {
          // 20 representative rows — covers all 9 workflow states; full dataset unchanged
          const VISIBLE_IDS = new Set([
            '41-0279', '41-0847', '41-1103',          // Draft (3)
            '41-0938', '41-1256', '41-0731',          // BOE Build-Up (3)
            '41-0563', '41-0815',                     // Activity Acceptance (2)
            '41-0347', '41-0926', '41-1058',          // Project Acceptance (3)
            '41-0691', '41-0783',                     // Project Allocation (2)
            '41-0425', '41-1137',                     // Impact Assessment (2)
            '41-0512', '41-1021',                     // Project Approval (2)
            '41-0648', '41-0974',                     // Program Approval (2)
            '41-0318',                                // Baselined (1)
            ...createdTasks.map(t => t.taskId),       // Always include newly created tasks
          ]);
          const displayData = sortedData.filter(t => VISIBLE_IDS.has(t.taskId));
          return displayData.length === 0 ? (
            <div className="flex items-center justify-center py-[40px] px-[24px]">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">
                No tasks match the current filters.
              </p>
            </div>
          ) : (
            displayData.map((task) => (
              <div
                key={task.taskId}
                className={`border-b border-[#e0e1e6] hover:bg-[#fafafa] transition-all cursor-pointer grid ${
                  highlightedTaskId === task.taskId ? 'animate-[rowPulse_2s_ease-out]' : ''
                }`}
                style={{
                  gridTemplateColumns: TASK_TABLE_GRID,
                  ...(highlightedTaskId === task.taskId ? { backgroundColor: 'rgba(58, 194, 58, 0.08)' } : {}),
                }}
              >
                {/* Task ID */}
                <div className="px-[12px] py-[12px] flex items-center justify-between min-w-0">
                  <Link
                    to={`/task-planning/tasks/${task.taskId}`}
                    className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#147DB9] text-[14px] hover:underline cursor-pointer no-underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {task.taskId}
                  </Link>
                  {(() => {
                    const primaryTag = getPrimaryStatusTag(task.statusFocusTags);
                    return primaryTag ? <StatusFocusDot tag={primaryTag} /> : null;
                  })()}
                </div>
                {/* Executing Activity */}
                <div className="px-[12px] py-[12px] flex items-center min-w-0">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                    {task.executingActivity}
                  </p>
                </div>
                {/* Project */}
                <div className="px-[12px] py-[12px] flex items-center min-w-0">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                    {task.project}
                  </p>
                </div>
                {/* Title */}
                <div className="px-[12px] py-[12px] flex items-center min-w-0">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                    {task.title}
                  </p>
                </div>
                {/* Workflow State */}
                <div className="px-[12px] py-[12px] flex items-center min-w-0">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                    {task.workflowState}
                  </p>
                </div>
                {/* Requested */}
                <div className="px-[12px] py-[12px] flex items-center justify-end min-w-0">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] whitespace-nowrap">
                    {task.workflowState === 'Draft'
                      ? 'Not Yet Estimated'
                      : formatCurrency(task.requested)}
                  </p>
                </div>
                {/* Allocated */}
                <div className="px-[12px] py-[12px] flex items-center justify-end min-w-0">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] whitespace-nowrap">
                    {task.workflowState === 'Draft'
                      ? 'Not Yet Allocated'
                      : formatCurrency(task.allocated)}
                  </p>
                </div>
                {/* Gap */}
                <div className="px-[12px] py-[12px] flex items-center justify-end min-w-0">
                  <p className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px] whitespace-nowrap ${
                    task.workflowState === 'Draft'
                      ? 'text-[#1c2024]'
                      : task.gap > 0 ? 'text-[#ca6c18]' : 'text-[#60646c]'
                  }`}>
                    {task.workflowState === 'Draft'
                      ? 'Not Applicable'
                      : task.gap > 0 ? formatCurrency(task.gap) : '$0'}
                  </p>
                </div>
                {/* Actions */}
                <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === task.taskId ? null : task.taskId);
                      }}
                      className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] cursor-pointer border-none bg-transparent"
                    >
                      <MoreVertical size={16} className="text-[#60646C]" />
                    </button>
                    {openMenuId === task.taskId && (
                      <>
                        <div
                          className="fixed inset-0 z-[100]"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-full mt-[4px] z-[101] bg-white rounded-[8px] p-[8px] min-w-[160px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                              setCloneTaskOpen(true);
                              setCloneSourceTask(task);
                              // Clone action
                            }}
                            className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors border-none cursor-pointer"
                          >
                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                              <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M10.5 5.5V4C10.5 3.17157 9.82843 2.5 9 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V9C2.5 9.82843 3.17157 10.5 4 10.5H5.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                              Clone
                            </p>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          );
        })()}
      </div>
      <CreateTaskFlyout open={createTaskOpen} onClose={() => setCreateTaskOpen(false)} onTaskCreated={handleTaskCreated} />
      <CloneTaskFlyout
        open={cloneTaskOpen}
        onClose={() => setCloneTaskOpen(false)}
        sourceTask={cloneSourceTask}
        onTaskCloned={(task) => {
          handleTaskCreated(task);
          setToastMessage(`Task ${task.taskId} cloned from ${cloneSourceTask?.taskId ?? 'source'}`);
        }}
      />

      {/* Success Toast — top-right, matches User Management / Task Workspace pattern */}
      {showSuccessToast && (
        <div
          className="fixed top-[100px] right-[24px] z-50 bg-[#e6f6eb] content-stretch flex gap-[8px] items-start overflow-clip p-[12px] rounded-[6px] w-[352px] shadow-lg animate-slide-in-right"
        >
          <div className="content-stretch flex h-[20px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g clipPath="url(#clip0_tasks_create)">
                  <path d="M14.6654 7.38667V8C14.6646 9.43761 14.2003 10.8365 13.3392 11.988C12.4781 13.1394 11.2665 13.9817 9.88921 14.3893C8.51188 14.7969 7.03815 14.7479 5.68963 14.2497C4.3411 13.7515 3.18975 12.8307 2.40723 11.6247C1.62471 10.4187 1.25287 8.99205 1.34746 7.55754C1.44205 6.12303 1.99812 4.75755 2.93217 3.66471C3.86621 2.57188 5.1285 1.81024 6.53077 1.49344C7.93304 1.17664 9.40016 1.32152 10.7121 1.90667" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.6667 2.66666L8 9.34L6 7.34" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_tasks_create">
                    <rect fill="white" height="16" width="16" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,113,63,0.87)]">
            <p className="mb-0">Task Created</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal mb-0 text-[rgba(0,113,63,0.87)]">
              Task {toastMessage} has been created and added to Draft.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Filter Field Wrapper ───────────────────────────────────────────────

function FilterField({ label, children, width }: { label: string; children: React.ReactNode; width?: number }) {
  return (
    <div className="flex flex-col gap-[6px]" style={{ width: width ? `${width}px` : 'auto' }}>
      <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Applied Filters Row ────────────────────────────────────────────────

function AppliedFiltersRow({
  planningYear,
  setPlanningYear,
  executingActivity,
  setExecutingActivity,
  project,
  setProject,
  workflowState,
  setWorkflowState,
  taskStatusFocus,
  setTaskStatusFocus,
  onClearAll,
}: {
  planningYear: string[];
  setPlanningYear: (value: string[]) => void;
  executingActivity: string[];
  setExecutingActivity: (value: string[]) => void;
  project: string[];
  setProject: (value: string[]) => void;
  workflowState: string[];
  setWorkflowState: (value: string[]) => void;
  taskStatusFocus: string;
  setTaskStatusFocus: (value: string) => void;
  onClearAll: () => void;
}) {
  // Build grouped chip data
  const groups: { label: string; type: string; values: string[]; onRemove: (value: string) => void }[] = [];

  const activeEA = executingActivity.filter(v => v !== 'All');
  if (activeEA.length > 0) {
    groups.push({
      label: 'Executing Activity',
      type: 'executingActivity',
      values: activeEA,
      onRemove: (value) => {
        const remaining = executingActivity.filter(v => v !== value);
        setExecutingActivity(remaining.length === 0 ? ['All'] : remaining);
      },
    });
  }

  const activeProject = project.filter(v => v !== 'All');
  if (activeProject.length > 0) {
    groups.push({
      label: 'Project',
      type: 'project',
      values: activeProject,
      onRemove: (value) => {
        const remaining = project.filter(v => v !== value);
        setProject(remaining.length === 0 ? ['All'] : remaining);
      },
    });
  }

  const activeWS = workflowState.filter(v => v !== 'All');
  if (activeWS.length > 0) {
    groups.push({
      label: 'Workflow State',
      type: 'workflowState',
      values: activeWS,
      onRemove: (value) => {
        const remaining = workflowState.filter(v => v !== value);
        setWorkflowState(remaining.length === 0 ? ['All'] : remaining);
      },
    });
  }

  if (taskStatusFocus !== 'All') {
    groups.push({
      label: 'Task Status Focus',
      type: 'taskStatusFocus',
      values: [taskStatusFocus],
      onRemove: () => setTaskStatusFocus('All'),
    });
  }

  if (groups.length === 0) return null;

  return (
    <div className="w-full mt-[12px] pt-[14px] pb-[14px] border-t border-b border-[#e0e1e6]">
      <div className="flex flex-wrap gap-x-[16px] gap-y-[8px] items-center">
        {groups.map((group) => (
          <div key={group.type} className="flex items-center gap-[4px]">
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D] whitespace-nowrap mr-[2px]">
              {group.label}:
            </span>
            <div className="flex items-center gap-[4px] flex-wrap">
              {group.values.map((value) => (
                <div
                  key={value}
                  className="px-[8px] py-[2px] rounded-[3px] flex items-center gap-[5px]"
                  style={{ backgroundColor: 'rgba(0, 100, 150, 0.07)', border: '1px solid rgba(0, 100, 150, 0.18)' }}
                >
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[18px] whitespace-nowrap" style={{ color: '#004B72' }}>
                    {value}
                  </span>
                  <button
                    onClick={() => group.onRemove(value)}
                    className="w-[14px] h-[14px] flex items-center justify-center rounded-[2px] cursor-pointer border-none bg-transparent hover:bg-[rgba(0,75,114,0.12)] transition-colors p-0"
                    aria-label={`Remove ${value}`}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 1.5L6.5 6.5M1.5 6.5L6.5 1.5" stroke="#006496" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Clear All — inline after last group */}
        <button
          onClick={onClearAll}
          className="bg-transparent border-none cursor-pointer flex items-center outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-[rgba(0,75,114,0.35)] rounded-[2px]"
          style={{ color: '#006496' }}
        >
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[18px] whitespace-nowrap">
            Clear All
          </span>
        </button>
      </div>
    </div>
  );
}