import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { useColumnSort, SortIndicator, compareValues, SortUpIcon, SortDownIcon, SortUpDownIcon } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { SearchIcon } from './InlineIcons';
import { TASKS_DATA, getKPICounts, getWorkflowStateCounts } from './TaskPlanningData';
import { STATUS_FOCUS_CONFIG, getPrimaryStatusTag } from './TaskPlanningData';
import type { TaskRow } from './TaskPlanningData';

// ─── Info Tooltip Component ─────────────────────────────────────────────────

function InfoTooltip({ text, iconColor = '#006496' }: { text: string; iconColor?: string }) {
  const [visible, setVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const iconRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const tooltipWidth = 240;
    // Position above the icon
    let left = rect.left - 4;
    // If tooltip would overflow right side of viewport, flip to left-aligned from icon right edge
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = rect.right - tooltipWidth + 4;
    }
    // Ensure minimum left padding
    if (left < 16) left = 16;
    setTooltipPos({
      top: rect.top - 6, // 6px gap above icon (fixed positioning = viewport-relative)
      left: left,
    });
  }, []);

  useEffect(() => {
    if (visible) updatePosition();
  }, [visible, updatePosition]);

  return (
    <span
      ref={iconRef}
      className="relative inline-flex items-center shrink-0"
      onMouseEnter={() => { setVisible(true); }}
      onMouseLeave={() => setVisible(false)}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="cursor-help shrink-0">
        <circle cx="7" cy="7" r="6" stroke={iconColor} strokeWidth="1.2" />
        <path d="M7 6.2V10" stroke={iconColor} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="7" cy="4.4" r="0.7" fill={iconColor} />
      </svg>
      {visible && createPortal(
        <span
          className="fixed z-[9999] bg-[#1C2024] text-white rounded-[4px] px-[10px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] w-[240px] shadow-[0_2px_8px_rgba(0,0,0,0.16)] pointer-events-none"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: 'translateY(-100%)',
          }}
        >
          {text}
        </span>,
        document.body
      )}
    </span>
  );
}

// ─── KPI Data ───────────────────────────────────────────────────────────────

interface KPICardData {
  label: string;
  value: number;
  supporting: string;
  tooltip: string;
  railColor: string;
  filterValue: string;
}

// Derive KPI counts from the shared dataset
const DERIVED_KPI = getKPICounts();

const KPI_CARDS: KPICardData[] = [
  { label: 'Tasks Awaiting My Action', value: DERIVED_KPI.awaitingMyAction, supporting: 'Assigned to you across 3 projects', tooltip: 'Tasks currently requiring your review, approval, or action based on your role in the workflow.', railColor: '#0073AA', filterValue: 'Awaiting My Action' },
  { label: 'Stalled Tasks', value: DERIVED_KPI.stalledTasks, supporting: 'No updates in 14+ days', tooltip: 'Tasks with no workflow progress or updates within the defined inactivity threshold.', railColor: '#6B7280', filterValue: 'Stalled Tasks' },
  { label: 'Tasks Near Deadline', value: DERIVED_KPI.nearDeadline, supporting: 'Due within 10 days', tooltip: 'Tasks approaching key planning or milestone deadlines within the defined time window.', railColor: '#F59E0B', filterValue: 'Near Deadline' },
  { label: 'Overdue Tasks', value: DERIVED_KPI.overdue, supporting: 'Past planned completion date', tooltip: 'Tasks that have passed their planned milestone or completion date without progressing.', railColor: '#DC2626', filterValue: 'Overdue' },
];

// ─── Workflow Progress Data (derived from shared dataset) ───────────────────

const WORKFLOW_STATES = getWorkflowStateCounts();

const TOTAL_TASKS = TASKS_DATA.length;

// Precompute "completed past" for each stage.
// A task has "completed" stage i if it is currently at a stage AFTER i.
const COMPLETED_PAST: number[] = (() => {
  const result: number[] = [];
  let pastCount = 0;
  // Walk from last state to first, accumulating tasks past each state
  for (let i = WORKFLOW_STATES.length - 1; i >= 0; i--) {
    result[i] = pastCount;
    pastCount += WORKFLOW_STATES[i].count;
  }
  return result;
})();

// ─── Planning Milestones Data ───────────────────────────────────────────────

interface Milestone {
  step: number;
  name: string;
  date: string;
  rawDate: Date;
}

const TODAY = new Date('2026-03-26');

const MILESTONES: Milestone[] = [
  { step: 1, name: 'PM approve FY North Stars (Top-Level Requirements)', date: 'Feb 21, 2026', rawDate: new Date('2026-02-21') },
  { step: 2, name: 'Establish PAPM Top-Level Requirements for the FY26 (North Star Inputs) with Metric.', date: 'Mar 14, 2026', rawDate: new Date('2026-03-14') },
  { step: 3, name: 'Create Task Shells and submit to supporting Activity', date: 'Apr 18, 2026', rawDate: new Date('2026-04-18') },
  { step: 4, name: 'APM Acceptance', date: 'Jun 6, 2026', rawDate: new Date('2026-06-06') },
  { step: 5, name: 'APM push to Awaiting Allocation', date: 'Jun 13, 2026', rawDate: new Date('2026-06-13') },
  { step: 6, name: 'BFM Release Planning Year Controls', date: 'May 12, 2026', rawDate: new Date('2026-05-12') },
  { step: 7, name: 'PAPM Distribute funds to APMs', date: 'May 23, 2026', rawDate: new Date('2026-05-23') },
  { step: 8, name: 'APM Allocate Task, Complete Risk Process and submit to PAPM', date: 'Jul 18, 2026', rawDate: new Date('2026-07-18') },
  { step: 9, name: 'PAPM Review and Accept Tasking (Per PMC)', date: 'Aug 1, 2026', rawDate: new Date('2026-08-01') },
  { step: 10, name: 'Develop PMC Briefs', date: 'Aug 8, 2026', rawDate: new Date('2026-08-08') },
  { step: 11, name: 'Conduct PMC', date: 'Aug 13, 2026', rawDate: new Date('2026-08-13') },
  { step: 12, name: 'PAPMs/APMs resolve any PMC action and submit FINAL tasks for PM approval', date: 'Sep 12, 2026', rawDate: new Date('2026-09-12') },
  { step: 13, name: 'PM approves all task', date: 'Sep 30, 2026', rawDate: new Date('2026-09-30') },
  { step: 14, name: 'Activities submit Final Obligation phasing plan', date: 'Sep 30, 2026', rawDate: new Date('2026-09-30') },
];

const NEXT_UP_INDEX = MILESTONES.findIndex(ms => ms.rawDate >= TODAY);

// ─── Recent Task Updates (derived from shared TASKS_DATA) ───────────────────

// Stable mapping: task ID → updatedBy name and time-of-day suffix
const TASK_UPDATED_BY: Record<string, { updatedBy: string; timeSuffix: string }> = {
  '41-0938': { updatedBy: 'CDR Williams, J.',    timeSuffix: '09:14' },
  '41-0563': { updatedBy: 'LCDR Patel, R.',      timeSuffix: '08:45' },
  '41-1021': { updatedBy: 'LT Nguyen, K.',       timeSuffix: '17:02' },
  '41-0512': { updatedBy: 'LT Chen, M.',         timeSuffix: '16:32' },
  '41-0425': { updatedBy: 'CDR Williams, J.',    timeSuffix: '14:18' },
  '41-0926': { updatedBy: 'CDR Martinez, S.',    timeSuffix: '13:40' },
  '41-0691': { updatedBy: 'LCDR Patel, R.',      timeSuffix: '16:55' },
  '41-0731': { updatedBy: 'LCDR Thompson, A.',   timeSuffix: '11:22' },
  '41-1137': { updatedBy: 'LT Chen, M.',         timeSuffix: '15:10' },
  '41-0815': { updatedBy: 'CDR Williams, J.',    timeSuffix: '09:30' },
  '41-0318': { updatedBy: 'CDR Martinez, S.',    timeSuffix: '10:22' },
  '41-0648': { updatedBy: 'LT Nguyen, K.',       timeSuffix: '15:47' },
  '41-0847': { updatedBy: 'LCDR Patel, R.',      timeSuffix: '14:05' },
  '41-0614': { updatedBy: 'LCDR Thompson, A.',   timeSuffix: '10:48' },
  '41-0347': { updatedBy: 'LT Chen, M.',         timeSuffix: '10:30' },
  '41-0193': { updatedBy: 'LCDR Thompson, A.',   timeSuffix: '14:08' },
  '41-0482': { updatedBy: 'CDR Williams, J.',    timeSuffix: '09:55' },
  '41-1058': { updatedBy: 'LCDR Patel, R.',      timeSuffix: '11:15' },
  '41-0279': { updatedBy: 'CDR Martinez, S.',    timeSuffix: '16:20' },
  '41-1256': { updatedBy: 'LCDR Thompson, A.',   timeSuffix: '08:30' },
  '41-0783': { updatedBy: 'LT Chen, M.',         timeSuffix: '13:45' },
  '41-0974': { updatedBy: 'CDR Williams, J.',    timeSuffix: '12:00' },
  '41-0756': { updatedBy: 'LT Nguyen, K.',       timeSuffix: '10:15' },
  '41-1103': { updatedBy: 'LCDR Patel, R.',      timeSuffix: '11:50' },
  '41-1074': { updatedBy: 'CDR Martinez, S.',    timeSuffix: '09:40' },
  '41-1192': { updatedBy: 'LCDR Thompson, A.',   timeSuffix: '15:30' },
  '41-0869': { updatedBy: 'LT Nguyen, K.',       timeSuffix: '14:22' },
};

/** Format ISO date + time suffix into display string */
function formatUpdatedOn(isoDate: string, timeSuffix: string): string {
  const d = new Date(isoDate + 'T12:00:00');
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day < 10 ? '0' + day : day}, ${year} ${timeSuffix}`;
}

interface RecentTaskRow {
  taskId: string;
  title: string;
  workflowState: string;
  updatedBy: string;
  updatedOn: string;
  lastUpdatedISO: string;
  statusFocusTags?: string[];
}

/** Build the recent tasks list from the shared dataset, sorted by lastUpdated desc */
const ALL_RECENT_TASKS: RecentTaskRow[] = (() => {
  return [...TASKS_DATA]
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
    .map((t) => {
      const meta = TASK_UPDATED_BY[t.taskId] ?? { updatedBy: 'System', timeSuffix: '00:00' };
      return {
        taskId: t.taskId,
        title: t.title,
        workflowState: t.workflowState,
        updatedBy: meta.updatedBy,
        updatedOn: formatUpdatedOn(t.lastUpdated, meta.timeSuffix),
        lastUpdatedISO: t.lastUpdated,
        statusFocusTags: t.statusFocusTags,
      };
    });
})();

// Time range cutoffs relative to "today" (Mar 17, 2026)
const TODAY_ISO = '2026-03-17';
const CUTOFF_24H = '2026-03-16';
const CUTOFF_5D = '2026-03-12';
const CUTOFF_30D = '2026-02-15';

function getTimeRangeCutoff(range: '24h' | '5d' | '30d'): string {
  switch (range) {
    case '24h': return CUTOFF_24H;
    case '5d':  return CUTOFF_5D;
    case '30d': return CUTOFF_30D;
  }
}

// ─── Status Focus Dot (matches Tasks Grid pattern exactly) ──────────────────

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

// ─── Main Component ─────────────────────────────────────────────────────────

export default function TaskPlanningDashboard() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header Section */}
      <div className="bg-white px-[24px] pt-[24px] pb-0">
        <div className="flex flex-col gap-[16px]">
          {/* Title Block */}
          <div className="relative flex flex-col gap-[12px] py-[16px]">
            <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[40px] text-[#1C2024]">
                Task Planning
              </h1>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C]">
                Situational awareness for program managers. Review task status, funding health, and workflow progress at a glance.
              </p>
            </div>
            <SyncPointBreadcrumb items={[
              { label: 'Home', path: '/' },
              { label: 'Task Planning' },
            ]} />
          </div>
          
          {/* Planning Year Context */}
          <div className="pb-[8px]">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px]">
              <span className="text-[#60646C]">Planning Year:</span>{' '}
              <span className="text-[#1C2024] font-medium">FY2026</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-[24px] py-[24px]">
        <div className="flex flex-col gap-[24px]">
          {/* KPI Summary Row */}
          <KPISummaryRow />

          {/* Workflow Progress + Planning Milestones */}
          <WidgetRow />

          {/* Funding Risk + Allocation Progress */}
          <div className="grid gap-[16px]" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <EmptyStateCard
              title="Funding Risk"
              message="Awaiting FY27 Funding Allocation"
              headerTooltip="Compares planned task funding against allocated funding to identify shortfalls and potential impact."
              emptyTooltip="Funding data will appear once allocations are released for the planning cycle."
            />
            <EmptyStateCard
              title="Allocation Progress"
              message="Awaiting FY27 Funding Allocation"
              headerTooltip="Shows how much available funding has been allocated to tasks within the planning cycle."
              emptyTooltip="Allocation progress will be available once funding allocations are issued."
            />
          </div>

          {/* Recent Task Updates */}
          <RecentTaskUpdatesTable />
        </div>
      </div>
    </div>
  );
}

// ─── KPI Summary Row ────────────────────────────────────────────────────────

function KPISummaryRow() {
  return (
    <div className="grid gap-[16px]" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {KPI_CARDS.map((card) => (
        <KPICard key={card.label} data={card} />
      ))}
    </div>
  );
}

function KPICard({ data }: { data: KPICardData }) {
  const navigate = useNavigate();

  const handleValueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/task-planning/tasks?statusFocus=${encodeURIComponent(data.filterValue)}`);
  };

  return (
    <div className="flex items-stretch relative rounded-[5px] transition-shadow">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[8px]" style={{ backgroundColor: data.railColor }} />
      <div className="flex flex-1 w-full min-w-0 flex-col gap-[8px] items-start p-[20px] relative">
        <div className="flex items-center gap-[6px]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#60646c] text-[16px]">
            {data.label}
          </p>
          <InfoTooltip text={data.tooltip} />
        </div>
        <span
          onClick={handleValueClick}
          className="inline-flex items-center px-[8px] py-[2px] -ml-[8px] rounded-[4px] cursor-pointer transition-colors hover:bg-[rgba(0,75,114,0.06)] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic text-[32px] tracking-[-1px] text-[#147DB9] hover:text-[#0073AA] hover:underline"
          role="link"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleValueClick(e as any); } }}
          title="View tasks"
        >
          {data.value}
        </span>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#60646c] text-[13px]">
          {data.supporting}
        </p>
      </div>
    </div>
  );
}

// ─── Widget Row ────────────────────────────────────────────────────────────

function WidgetRow() {
  const wfRef = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!wfRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use borderBoxSize for accurate outer height including border/padding
        const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height;
        setRowHeight(h);
      }
    });
    observer.observe(wfRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="grid gap-[16px] items-start"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      <div ref={wfRef}>
        <WorkflowProgressCard />
      </div>
      <div style={rowHeight ? { height: rowHeight, minHeight: 0 } : {}}>
        <PlanningMilestonesCard />
      </div>
    </div>
  );
}

// ─── Workflow Progress Card ────────────────────────────────────────────────

/** Returns the bar fill color/gradient based on workflow state name and completion pct. */
function getBarBackground(stateName: string, pct: number): string {
  if (pct === 100) return '#16A34A';           // green — 100% complete override
  if (stateName === 'Draft') return '#DC2626'; // red — behind current milestone
  if (stateName === 'BOE Build-Up') return '#F59E0B'; // amber — active/next-up milestone
  return 'linear-gradient(90deg, #004b72 0%, #005a87 100%)'; // blue — default progress
}

function WorkflowProgressCard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col relative rounded-[5px]">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      {/* Card Header */}
      <div className="px-[20px] pt-[20px] pb-[16px] flex flex-col gap-[4px]">
        <div className="flex items-center gap-[6px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[16px]">
            Workflow Progress
          </p>
          <InfoTooltip iconColor="#006496" text="Completed shows the percentage of tasks that have finished each workflow state. Current shows how many tasks are currently in each state." />
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#60646c] text-[13px]">
          {TOTAL_TASKS} tasks in FY2026 planning cycle
        </p>
      </div>
      {/* Column Headers */}
      <div className="flex items-center gap-[12px] px-[20px] pb-[8px]">
        <div className="w-[140px] shrink-0 flex items-center gap-[4px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#60646c] text-[11px] uppercase tracking-[0.5px]">
            Workflow State
          </p>
        </div>
        <div className="flex-1 flex items-center gap-[4px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#60646c] text-[11px] uppercase tracking-[0.5px]">
            Completed
          </p>
          <InfoTooltip iconColor="#006496" text="Percentage of tasks that have completed this workflow state." />
        </div>
        <div className="w-[36px] shrink-0 flex items-center justify-end gap-[4px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#60646c] text-[11px] uppercase tracking-[0.5px] whitespace-nowrap">
            Current
          </p>
          <InfoTooltip iconColor="#006496" text="Number of tasks currently in this workflow state." />
        </div>
      </div>
      {/* Progress Bars */}
      <div className="px-[20px] pb-[20px] flex flex-col gap-[14px]">
        {WORKFLOW_STATES.map((state, index) => {
          const completedPast = COMPLETED_PAST[index];
          // For the terminal state (Baselined), tasks IN that state also count as completed
          const isTerminal = index === WORKFLOW_STATES.length - 1;
          const completedCount = isTerminal ? completedPast + state.count : completedPast;
          const pct = Math.round((completedCount / TOTAL_TASKS) * 100);
          return (
            <div
              key={state.name}
              className="flex items-center gap-[12px] rounded-[4px] px-[4px] py-[2px] -mx-[4px] hover:bg-[rgba(0,0,48,0.02)] transition-colors"
              title={`${pct}% of tasks have completed ${state.name}. ${state.count} task${state.count !== 1 ? 's' : ''} currently in this state.`}
            >
              <span
                onClick={() => navigate(`/task-planning/tasks?workflowState=${encodeURIComponent(state.name)}`)}
                className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#147DB9] text-[13px] w-[140px] shrink-0 truncate cursor-pointer hover:underline hover:text-[#0073AA] transition-colors inline-flex items-center px-[4px] py-[1px] -ml-[4px] rounded-[3px] hover:bg-[rgba(0,75,114,0.06)]"
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/task-planning/tasks?workflowState=${encodeURIComponent(state.name)}`); } }}
                title={`View ${state.name} tasks`}
              >
                {state.name}
              </span>
              <div className="flex-1 h-[22px] bg-[#e8e8ec] rounded-full relative overflow-hidden">
                {pct > 0 && (
                  <div
                    className="h-full rounded-full transition-all flex items-center"
                    style={{ width: `max(${pct}%, 44px)`, background: getBarBackground(state.name, pct) }}
                  >
                    <span className="pl-[10px] font-['Inter:Medium',sans-serif] font-medium text-[11px] text-white leading-[16px] drop-shadow-[0_0_1px_rgba(0,0,0,0.2)] whitespace-nowrap">
                      {pct}%
                    </span>
                  </div>
                )}
                {pct === 0 && (
                  <span className="absolute top-0 bottom-0 left-[10px] flex items-center font-['Inter:Medium',sans-serif] font-medium text-[11px] text-[#60646c] leading-[16px]">
                    0%
                  </span>
                )}
              </div>
              <span
                onClick={() => navigate(`/task-planning/tasks?workflowState=${encodeURIComponent(state.name)}`)}
                className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#147DB9] text-[13px] w-[36px] text-right shrink-0 cursor-pointer hover:underline hover:text-[#0073AA] transition-colors inline-flex items-center justify-end px-[4px] py-[1px] rounded-[3px] hover:bg-[rgba(0,75,114,0.06)]"
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/task-planning/tasks?workflowState=${encodeURIComponent(state.name)}`); } }}
                title={`View ${state.count} ${state.name} tasks`}
              >
                {state.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Planning Milestones Card ───────────────────────────────────────────────

function PlanningMilestonesCard() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextUpRef = useRef<HTMLDivElement>(null);
  const [showPulse, setShowPulse] = useState(NEXT_UP_INDEX !== -1);

  useEffect(() => {
    // Auto-scroll to next-up milestone — constrained to widget's own scroll container only,
    // never touches page/document scroll position.
    if (nextUpRef.current && scrollRef.current) {
      const containerTop = scrollRef.current.getBoundingClientRect().top;
      const itemTop = nextUpRef.current.getBoundingClientRect().top;
      scrollRef.current.scrollTop += itemTop - containerTop;
    }
    // Stop pulse after 3 seconds
    if (showPulse) {
      const timer = setTimeout(() => setShowPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col border border-[#e0e1e6] border-solid rounded-[5px] overflow-hidden h-full">
      {/* Card Header */}
      <div className="px-[20px] pt-[20px] pb-[16px] flex items-center gap-[8px] shrink-0">
        <CalendarIcon />
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[16px]">
          Planning Milestones
        </p>
        <InfoTooltip text="Key planning deadlines that govern task progression through the workflow." />
        {/* Scroll indicator — signals list is scrollable */}
        <span
          className="ml-auto flex items-center gap-[4px] text-[#a0a4af] shrink-0 cursor-default select-none"
          title="Scroll to see all milestones"
          aria-hidden="true"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 2L4.5 4.5H8.5L6.5 2Z" fill="#a0a4af" />
            <path d="M6.5 11L4.5 8.5H8.5L6.5 11Z" fill="#a0a4af" />
            <line x1="6.5" y1="4.5" x2="6.5" y2="8.5" stroke="#a0a4af" strokeWidth="1" />
          </svg>
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[11px] leading-[16px] text-[#1c2024]">
            Scroll
          </span>
        </span>
      </div>
      {/* Milestone scroll wrapper — overflow-hidden creates the content peek clip zone */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {/* Scroll container stops 12px before wrapper bottom → last visible row peeks */}
        <div
          ref={scrollRef}
          className="flex flex-col absolute inset-x-0 top-0 overflow-y-auto"
          style={{
            bottom: '12px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#a0a4af #ededf0',
          }}
        >
          {MILESTONES.map((ms, i) => {
            const isPast = ms.rawDate < TODAY;
            const isNextUp = i === NEXT_UP_INDEX;
            return (
              <div
                key={`${ms.step}-${ms.name}`}
                ref={isNextUp ? nextUpRef : undefined}
                className={`flex items-start justify-between px-[20px] py-[12px] gap-[16px] ${
                  isNextUp ? 'bg-[#FFFBEB]' : ''
                }`}
                style={
                  isNextUp
                    ? {
                        borderLeft: '4px solid #92400E',
                        borderTop: '1px solid #D97706',
                        borderRight: '1px solid #D97706',
                        borderBottom: '1px solid #D97706',
                        ...(showPulse ? { animation: 'milestonePulse 1.5s ease-in-out 2' } : {}),
                      }
                    : {
                        borderLeft: '4px solid transparent',
                        borderBottom: i < MILESTONES.length - 1 ? '1px solid #e0e1e6' : 'none',
                      }
                }
              >
                <div className="flex items-start gap-[8px] min-w-0 flex-1">
                  <p
                    className={`font-['Inter:${isNextUp ? 'Semi_Bold' : 'Medium'}',sans-serif] ${
                      isNextUp ? 'font-semibold' : 'font-medium'
                    } leading-[20px] not-italic text-[14px]`}
                    style={{ color: isPast && !isNextUp ? '#80838D' : '#1C2024' }}
                  >
                    {ms.step}. {ms.name}
                  </p>
                  {isNextUp && (
                    <span
                      className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[11px] leading-[16px] text-[#92400E] bg-[#FEF3C7] px-[6px] py-[1px] rounded-[3px] uppercase tracking-[0.3px] shrink-0 border border-solid border-[#92400E] mt-[2px]"
                      title="The next upcoming milestone that requires attention based on the current planning schedule."
                    >
                      Next Up
                    </span>
                  )}
                  {isPast && !isNextUp && (
                    <span
                      className="font-['Inter:Medium',sans-serif] font-medium text-[11px] leading-[16px] text-[#60646C] bg-[#f0f0f3] px-[6px] py-[1px] rounded-[3px] uppercase tracking-[0.3px] shrink-0 mt-[2px]"
                    >
                      Complete
                    </span>
                  )}
                </div>
                <p
                  className={`font-['Inter:${isNextUp ? 'Semi_Bold' : 'Regular'}',sans-serif] ${isNextUp ? 'font-semibold' : 'font-normal'} leading-[20px] not-italic text-[14px] shrink-0`}
                  style={{ color: isPast && !isNextUp ? '#DC2626' : isNextUp ? '#92400E' : '#60646c' }}
                >
                  {ms.date}
                </p>
              </div>
            );
          })}
        </div>
        {/* Bottom fade gradient — signals scrollability, sits above content, non-interactive */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,1) 100%)',
          }}
        />
      </div>
      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes milestonePulse {
          0%, 100% { background-color: #FFFBEB; }
          50% { background-color: rgba(254, 243, 199, 0.85); }
        }
      `}</style>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <rect x="2" y="3" width="14" height="13" rx="2" stroke="#60646c" strokeWidth="1.5" />
      <path d="M2 7H16" stroke="#60646c" strokeWidth="1.5" />
      <path d="M6 1.5V4.5" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 1.5V4.5" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Recent Task Updates Table ──────────────────────────────────────────────

type TaskColumnKey = 'taskId' | 'title' | 'workflowState' | 'updatedBy' | 'updatedOn';

const TASK_TABLE_GRID = '120px 1.4fr 1fr 1fr 1fr';

const TASK_COLUMNS: { key: TaskColumnKey; label: string; sortType: 'string' | 'date' }[] = [
  { key: 'taskId', label: 'TASK ID', sortType: 'string' },
  { key: 'title', label: 'TITLE', sortType: 'string' },
  { key: 'workflowState', label: 'WORKFLOW STATE', sortType: 'string' },
  { key: 'updatedBy', label: 'UPDATED BY', sortType: 'string' },
  { key: 'updatedOn', label: 'UPDATED ON', sortType: 'string' },
];

function RecentTaskUpdatesTable() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'24h' | '5d' | '30d'>('30d');
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [overflowVisible, setOverflowVisible] = useState(true);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (isExpanded) setOverflowVisible(true);
    },
    [isExpanded],
  );

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => {
      if (prev) setOverflowVisible(false);
      return !prev;
    });
  }, []);

  const filterLabels: { key: '24h' | '5d' | '30d'; label: string }[] = [
    { key: '24h', label: 'Last 24 Hours' },
    { key: '5d', label: 'Last 5 Days' },
    { key: '30d', label: 'Last 10 Days' },
  ];

  const { sortColumn, sortDirection, handleSort, getDirection } = useColumnSort<TaskColumnKey>();

  // Default sort is Updated On descending when no explicit sort is active
  const effectiveSortCol: TaskColumnKey = sortColumn ?? 'updatedOn';
  const effectiveSortDir: SortDirection = sortDirection ?? 'desc';

  const sortedTasks = useMemo(() => {
    // Filter by time range first, then take top 10
    const cutoff = getTimeRangeCutoff(activeFilter);
    const timeFiltered = ALL_RECENT_TASKS.filter(t => t.lastUpdatedISO >= cutoff);
    const items = timeFiltered.slice(0, 10);
    const col = TASK_COLUMNS.find(c => c.key === effectiveSortCol);
    if (!col) return items;
    items.sort((a, b) => {
      const aVal = a[effectiveSortCol];
      const bVal = b[effectiveSortCol];
      return compareValues(aVal, bVal, col.sortType, effectiveSortDir);
    });
    return items;
  }, [effectiveSortCol, effectiveSortDir, activeFilter]);

  const filteredTasks = useMemo(() => {
    if (!searchValue.trim()) return sortedTasks;
    const q = searchValue.toLowerCase();
    return sortedTasks.filter(t =>
      t.taskId.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.workflowState.toLowerCase().includes(q) ||
      t.updatedBy.toLowerCase().includes(q)
    );
  }, [sortedTasks, searchValue]);

  return (
    <div className="flex flex-col rounded-[5px] border border-solid border-[#e0e1e6] overflow-hidden">
      
      {/* Standardized Title Header — matches Execution Plans / APM Acceptance pattern */}
      <div className="bg-[#f9f9fb] relative w-full">
        <div className="flex items-center justify-between px-[24px] py-[20px] w-full border-b border-solid border-b-[#d0d1d6]">
          <div className="flex items-center gap-[16px] shrink-0">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] whitespace-nowrap">
              Recent Task Updates
            </p>
            <InfoTooltip text="Recently updated tasks across the planning cycle, including workflow changes and key edits." />
            {/* Vertical divider */}
            <div className="w-[1px] h-[24px] bg-[#e0e1e6] shrink-0" />
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
                  placeholder="Search..."
                  className="flex-1 bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1c2024] text-[14px] placeholder:text-[#60646c] px-[4px]"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1.5px_2px_0px_rgba(0,0,0,0.1),inset_0px_1.5px_2px_0px_rgba(0,0,85,0.02)]" />
            </div>
          </div>
          <div className="flex items-center gap-[4px]">
            {/* Segmented control — matches G-Invoicing Bulk Status Update pattern */}
            <div
              className="inline-flex w-fit h-[32px] items-center rounded-[4px] shrink-0 bg-[#F5F5F7] border border-solid border-[#e0e1e6] p-[2px] overflow-hidden box-border"
              role="radiogroup"
              aria-label="Time range filter"
            >
              {filterLabels.map((f) => {
                const isSelected = activeFilter === f.key;
                return (
                  <button
                    key={f.key}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setActiveFilter(f.key)}
                    className={`flex box-border h-full items-center justify-center px-[12px] rounded-[3px] cursor-pointer transition-colors duration-150 border-none whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#DDEEF6] shadow-[inset_0_0_0_1px_#80BBDA]'
                        : 'bg-transparent hover:bg-[rgba(255,255,255,0.5)]'
                    }`}
                  >
                    <span
                      className={`font-['Inter:${isSelected ? 'Medium' : 'Regular'}',sans-serif] ${
                        isSelected ? 'font-medium' : 'font-normal'
                      } leading-[20px] not-italic text-[14px] ${
                        isSelected ? 'text-[#004B72]' : 'text-[#1C2024]'
                      }`}
                    >
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Divider */}
            <div className="w-[1px] h-[20px] bg-[#e0e1e6] shrink-0 mx-[8px]" />
            {/* View All Tasks link */}
            <span
              onClick={() => navigate('/task-planning/tasks')}
              className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#147DB9] text-[14px] whitespace-nowrap cursor-pointer hover:underline hover:text-[#0073AA] transition-colors px-[4px] py-[1px] rounded-[3px] hover:bg-[rgba(0,75,114,0.06)] shrink-0"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/task-planning/tasks'); } }}
            >
              View All Tasks
            </span>
            {/* Divider */}
            <div className="w-[1px] h-[20px] bg-[#e0e1e6] shrink-0 mx-[8px]" />
            {/* Collapse toggle — matches CollapsibleFilterSection pattern exactly */}
            <button
              onClick={handleToggle}
              className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-transparent border-none transition-colors text-[#1C2024] hover:text-[#000000]"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Hide Recent Tasks' : 'Show Recent Tasks'}
            >
              <span
                style={{
                  display: 'inline-flex',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 225ms ease-in-out',
                }}
              >
                <ChevronRight size={16} strokeWidth={2} />
              </span>
              <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
                {isExpanded ? 'Hide Recent Tasks' : 'Show Recent Tasks'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible body — grid-template-rows animation matches CollapsibleFilterSection */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 225ms ease-in-out',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div style={{ overflow: overflowVisible ? 'visible' : 'hidden' }}>
          {/* Column Headers */}
          <div
            className="bg-[#f9f9fb] border-b border-[#e0e1e6] grid"
            style={{ gridTemplateColumns: TASK_TABLE_GRID }}
          >
            {TASK_COLUMNS.map((col) => {
              const dir = getDirection(col.key);
              // Show active accent for default sort (updatedOn desc) when no explicit sort chosen
              const displayDir = sortColumn === null && col.key === 'updatedOn' ? 'desc' as SortDirection : dir;
              const isActive = sortColumn === col.key || (sortColumn === null && col.key === 'updatedOn');
              return (
                <div
                  key={col.key}
                  className={`px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] ${isActive ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
                  onClick={() => handleSort(col.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort(col.key); } }}
                >
                  <p className={`font-['Inter:Semi_Bold',sans-serif] leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] whitespace-nowrap ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {col.label}
                  </p>
                  <span className="shrink-0 flex items-center gap-[3px] text-[#1C2024]">
                    {displayDir === 'asc' ? <SortUpIcon /> : displayDir === 'desc' ? <SortDownIcon /> : <SortUpDownIcon />}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Body Rows */}
          {filteredTasks.map((task) => (
            <div
              key={task.taskId}
              className="border-b border-[#e0e1e6] hover:bg-[#fafafa] transition-colors cursor-pointer grid"
              style={{ gridTemplateColumns: TASK_TABLE_GRID }}
            >
              {/* Task ID */}
              <div className="px-[12px] py-[12px] flex items-center justify-between min-w-0">
                <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#147DB9] text-[14px] hover:underline cursor-pointer">
                  {task.taskId}
                </span>
                {(() => {
                  const primaryTag = getPrimaryStatusTag(task.statusFocusTags);
                  return primaryTag ? <StatusFocusDot tag={primaryTag} /> : null;
                })()}
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
              {/* Updated By */}
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px] truncate">
                  {task.updatedBy}
                </p>
              </div>
              {/* Updated On */}
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px] truncate">
                  {task.updatedOn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Empty State Card ─────────────────────────────────────────────────────

function EmptyStateCard({ title, message, headerTooltip, emptyTooltip }: { title: string; message: string; headerTooltip: string; emptyTooltip: string }) {
  return (
    <div className="flex flex-col relative rounded-[5px]" style={{ minHeight: '200px' }}>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      {/* Card Header */}
      <div className="px-[20px] pt-[20px] pb-[12px]">
        <div className="flex items-center gap-[6px]">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[16px]">
            {title}
          </p>
          <InfoTooltip text={headerTooltip} />
        </div>
      </div>
      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center gap-[12px] pb-[20px]">
        <EmptyIcon />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#60646c] text-[14px]">
          {message}
        </p>
        <InfoTooltip text={emptyTooltip} />
      </div>
    </div>
  );
}

function EmptyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="8" width="32" height="24" rx="3" stroke="#c0c1c6" strokeWidth="1.5" />
      <path d="M4 14H36" stroke="#c0c1c6" strokeWidth="1.5" />
      <circle cx="20" cy="24" r="4" stroke="#c0c1c6" strokeWidth="1.5" />
      <path d="M18 24L20 26L22.5 22" stroke="#c0c1c6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
