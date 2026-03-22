// ─── Shared Task Planning Data (Single Source of Truth) ─────────────────────
// Both the Task Planning Dashboard and Tasks List derive from this dataset.

export interface TaskRow {
  taskId: string;
  executingActivity: string;
  project: string;
  title: string;
  workflowState: string;
  requested: number;
  allocated: number;
  gap: number;
  statusFocusTags?: string[];
  lastUpdated: string;       // ISO date for staleness detection
  dueDate?: string;          // ISO date for deadline detection
  assignedToMe: boolean;     // drives "Awaiting My Action"
}

// ─── Workflow State Order (logical progression) ─────────────────────────────

export const WORKFLOW_ORDER: Record<string, number> = {
  'Draft': 0,
  'BOE Build-Up': 1,
  'Activity Acceptance': 2,
  'Project Acceptance': 3,
  'Project Allocation': 4,
  'Impact Assessment': 5,
  'Project Approval': 6,
  'Program Approval': 7,
  'Baselined': 8,
};

// ─── Status Focus Configuration ─────────────────────────────────────────────

export const STATUS_FOCUS_CONFIG: Record<string, { color: string; priority: number }> = {
  'Overdue':            { color: '#DC2626', priority: 0 },  // Red-600: Bright red for critical/urgent status
  'Near Deadline':      { color: '#F59E0B', priority: 1 },  // Amber-500: Clear yellow for upcoming deadlines
  'Stalled Tasks':      { color: '#6B7280', priority: 2 },  // Gray-500: Neutral mid-gray for inactive/stalled state
  'Awaiting My Action': { color: '#0073AA', priority: 3 },  // Blue: Actionable items (unchanged)
};

/** Returns the highest-severity status tag for a task, or null. */
export function getPrimaryStatusTag(tags?: string[]): string | null {
  if (!tags || tags.length === 0) return null;
  let best: string | null = null;
  let bestPriority = Infinity;
  for (const tag of tags) {
    const cfg = STATUS_FOCUS_CONFIG[tag];
    if (cfg && cfg.priority < bestPriority) {
      best = tag;
      bestPriority = cfg.priority;
    }
  }
  return best;
}

// ─── Mock Dataset ───────────────────────────────────────────────────────────
// Designed so that KPI counts are exactly:
//   Awaiting My Action: 7
//   Stalled Tasks:      4
//   Near Deadline:     12
//   Overdue:            3
//
// Tasks may carry multiple statusFocusTags.

export const TASKS_DATA: TaskRow[] = [
  // ── Draft (4 tasks) ──
  { taskId: 'TSK-0501', executingActivity: 'PMS 420',   project: 'Maritime ISR Modernization Program', title: 'Coastal Surveillance Radar Modernization',         workflowState: 'Draft',               requested: 1250000,  allocated: 0,       gap: 1250000, assignedToMe: false, lastUpdated: '2026-02-28', dueDate: '2026-03-27', statusFocusTags: ['Stalled Tasks', 'Near Deadline'] },
  { taskId: 'TSK-0502', executingActivity: 'NSWC PCD',  project: 'Mine Countermeasures Innovation Program', title: 'Autonomous Mine Detection System Concept',         workflowState: 'Draft',               requested: 890000,   allocated: 0,       gap: 890000,  assignedToMe: true,  lastUpdated: '2026-03-15', dueDate: '2026-03-25', statusFocusTags: ['Awaiting My Action', 'Near Deadline'] },
  { taskId: 'TSK-0530', executingActivity: 'NSWC DD',   project: 'Mine Countermeasures Innovation Program', title: 'Mine Neutralization ROV Control Software',         workflowState: 'Draft',               requested: 720000,   allocated: 0,       gap: 720000,  assignedToMe: false, lastUpdated: '2026-03-10', dueDate: '2026-04-15', statusFocusTags: ['Near Deadline'] },
  { taskId: 'TSK-0531', executingActivity: 'PMS 420',   project: 'Unmanned Systems Integration Program', title: 'Unmanned Surface Vehicle Communications Link',     workflowState: 'Draft',               requested: 1100000,  allocated: 0,       gap: 1100000, assignedToMe: true,  lastUpdated: '2026-03-14', dueDate: '2026-03-30', statusFocusTags: ['Awaiting My Action', 'Near Deadline'] },

  // ── BOE Build-Up (5 tasks) ──
  { taskId: 'TSK-0412', executingActivity: 'NSWC PCD',  project: 'Surface Warfare Modernization Program', title: 'Littoral Combat Ship Mission Module Integration',  workflowState: 'BOE Build-Up',        requested: 2100000,  allocated: 420000,  gap: 1680000, assignedToMe: false, lastUpdated: '2026-03-17', dueDate: '2026-03-24', statusFocusTags: ['Near Deadline'] },
  { taskId: 'TSK-0503', executingActivity: 'PMS 420',   project: 'Naval Materials & Survivability Program', title: 'Hull Coating Durability Study',                    workflowState: 'BOE Build-Up',        requested: 675000,   allocated: 0,       gap: 675000,  assignedToMe: false, lastUpdated: '2026-02-25', dueDate: '2026-04-10', statusFocusTags: ['Stalled Tasks'] },
  { taskId: 'TSK-0532', executingActivity: 'NSWC DD',   project: 'Naval Stealth & Survivability Program', title: 'Acoustic Signature Reduction Analysis',            workflowState: 'BOE Build-Up',        requested: 1350000,  allocated: 270000,  gap: 1080000, assignedToMe: true,  lastUpdated: '2026-03-16', dueDate: '2026-03-26', statusFocusTags: ['Awaiting My Action', 'Near Deadline'] },
  { taskId: 'TSK-0533', executingActivity: 'PMS 420',   project: 'Surface Defense Systems Program', title: 'Ship Self-Defense System Evaluation',              workflowState: 'BOE Build-Up',        requested: 980000,   allocated: 0,       gap: 980000,  assignedToMe: false, lastUpdated: '2026-03-12', dueDate: '2026-03-28', statusFocusTags: ['Near Deadline'] },
  { taskId: 'TSK-0534', executingActivity: 'NSWC PCD',  project: 'Naval Stealth & Survivability Program', title: 'Degaussing System Performance Baseline',           workflowState: 'BOE Build-Up',        requested: 560000,   allocated: 0,       gap: 560000,  assignedToMe: false, lastUpdated: '2026-03-08', dueDate: '2026-04-20' },

  // ── Activity Acceptance (3 tasks) ──
  { taskId: 'TSK-0389', executingActivity: 'NSWC DD',   project: 'Mine Countermeasures Innovation Program', title: 'Mine Countermeasures USV Sensor Suite',            workflowState: 'Activity Acceptance', requested: 1800000,  allocated: 1080000, gap: 720000,  assignedToMe: true,  lastUpdated: '2026-03-17', dueDate: '2026-03-22', statusFocusTags: ['Awaiting My Action', 'Near Deadline'] },
  { taskId: 'TSK-0504', executingActivity: 'PMS 420',   project: 'Electromagnetic Warfare Program', title: 'Electromagnetic Warfare Signal Processing Upgrade', workflowState: 'Activity Acceptance', requested: 3200000, allocated: 2240000, gap: 960000,  assignedToMe: false, lastUpdated: '2026-03-15', dueDate: '2026-03-23', statusFocusTags: ['Near Deadline'] },
  { taskId: 'TSK-0535', executingActivity: 'NSWC PCD',  project: 'Undersea Defense Systems Program', title: 'Torpedo Defense System Requirements Review',       workflowState: 'Activity Acceptance', requested: 1450000,  allocated: 870000,  gap: 580000,  assignedToMe: false, lastUpdated: '2026-02-27', statusFocusTags: ['Stalled Tasks'] },

  // ── Project Acceptance (3 tasks) ──
  { taskId: 'TSK-0431', executingActivity: 'NSWC DD',   project: 'Undersea Warfare Systems Program', title: 'Undersea Warfare Tactical Network Upgrade',        workflowState: 'Project Acceptance',  requested: 4100000,  allocated: 3280000, gap: 820000,  assignedToMe: true,  lastUpdated: '2026-03-14', dueDate: '2026-03-10', statusFocusTags: ['Awaiting My Action', 'Overdue'] },
  { taskId: 'TSK-0536', executingActivity: 'PMS 420',   project: 'Combat Systems Integration Program', title: 'Combat Direction System Interface Spec',           workflowState: 'Project Acceptance',  requested: 2200000,  allocated: 1760000, gap: 440000,  assignedToMe: false, lastUpdated: '2026-03-16', dueDate: '2026-03-27', statusFocusTags: ['Near Deadline'] },
  { taskId: 'TSK-0537', executingActivity: 'NSWC PCD',  project: 'Undersea Warfare Systems Program', title: 'Underwater Acoustic Communications Prototype',     workflowState: 'Project Acceptance',  requested: 1900000,  allocated: 1520000, gap: 380000,  assignedToMe: false, lastUpdated: '2026-03-13', dueDate: '2026-04-05' },

  // ── Project Allocation (2 tasks) ──
  { taskId: 'TSK-0408', executingActivity: 'PMS 420',   project: 'Surface Defense Systems Program', title: 'Weapons Control Systems Firmware Update',          workflowState: 'Project Allocation',  requested: 1560000,  allocated: 1560000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-16', dueDate: '2026-04-18' },
  { taskId: 'TSK-0505', executingActivity: 'NSWC DD',   project: 'Undersea Warfare Systems Program', title: 'Sonar Transducer Array Replacement',               workflowState: 'Project Allocation',  requested: 2250000,  allocated: 2250000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-11', dueDate: '2026-03-25', statusFocusTags: ['Near Deadline'] },

  // ── Impact Assessment (3 tasks) ──
  { taskId: 'TSK-0377', executingActivity: 'NSWC PCD',  project: 'Undersea Warfare Systems Program', title: 'Sonar Systems Enhancement Program',                workflowState: 'Impact Assessment',   requested: 3400000,  allocated: 3060000, gap: 340000,  assignedToMe: false, lastUpdated: '2026-03-16', dueDate: '2026-03-12', statusFocusTags: ['Overdue'] },
  { taskId: 'TSK-0538', executingActivity: 'NSWC DD',   project: 'Electromagnetic Warfare Program', title: 'Electronic Warfare Suite Integration Test Plan',   workflowState: 'Impact Assessment',   requested: 1650000,  allocated: 1320000, gap: 330000,  assignedToMe: true,  lastUpdated: '2026-03-15', dueDate: '2026-03-24', statusFocusTags: ['Awaiting My Action', 'Near Deadline'] },
  { taskId: 'TSK-0539', executingActivity: 'PMS 420',   project: 'Maritime ISR Modernization Program', title: 'Navigation Radar Obsolescence Assessment',         workflowState: 'Impact Assessment',   requested: 780000,   allocated: 624000,  gap: 156000,  assignedToMe: false, lastUpdated: '2026-02-20', statusFocusTags: ['Stalled Tasks'] },

  // ── Project Approval (2 tasks) ──
  { taskId: 'TSK-0401', executingActivity: 'NSWC DD',   project: 'Mine Countermeasures Innovation Program', title: 'Electromagnetic Sweep Cable Modernization',        workflowState: 'Project Approval',    requested: 1950000,  allocated: 1950000, gap: 0,       assignedToMe: true,  lastUpdated: '2026-03-16', dueDate: '2026-03-14', statusFocusTags: ['Awaiting My Action', 'Overdue'] },
  { taskId: 'TSK-0540', executingActivity: 'PMS 420',   project: 'Surface Warfare Modernization Program', title: 'Propulsion System Health Monitoring Dashboard',    workflowState: 'Project Approval',    requested: 1280000,  allocated: 1280000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-17', dueDate: '2026-04-12' },

  // ── Program Approval (2 tasks) ──
  { taskId: 'TSK-0420', executingActivity: 'PMS 420',   project: 'Surface Warfare Modernization Program', title: 'Training Program Management Realignment',          workflowState: 'Program Approval',    requested: 2800000,  allocated: 2800000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-15', dueDate: '2026-04-25' },
  { taskId: 'TSK-0506', executingActivity: 'NSWC DD',   project: 'Undersea Warfare Systems Program', title: 'Anti-Submarine Warfare Platform Integration',      workflowState: 'Program Approval',    requested: 5100000,  allocated: 5100000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-11', dueDate: '2026-04-30' },

  // ── Baselined (3 tasks) ──
  { taskId: 'TSK-0362', executingActivity: 'NSWC PCD',  project: 'Maritime ISR Modernization Program', title: 'Radar System Integration - Block 3',               workflowState: 'Baselined',           requested: 4200000,  allocated: 4200000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-15' },
  { taskId: 'TSK-0358', executingActivity: 'PMS 420',   project: 'Naval Materials & Survivability Program', title: 'Hull Integrity Monitoring System - Phase I',        workflowState: 'Baselined',           requested: 1850000,  allocated: 1850000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-13' },
  { taskId: 'TSK-0507', executingActivity: 'NSWC PCD',  project: 'Combat Systems Integration Program', title: 'Combat Systems Cooling Infrastructure',            workflowState: 'Baselined',           requested: 3100000,  allocated: 3100000, gap: 0,       assignedToMe: false, lastUpdated: '2026-03-10' },
];

// ─── Derived KPI Counts ─────────────────────────────────────────────────────

export function getKPICounts(data: TaskRow[] = TASKS_DATA) {
  return {
    awaitingMyAction: data.filter(t => t.statusFocusTags?.includes('Awaiting My Action')).length,
    stalledTasks:     data.filter(t => t.statusFocusTags?.includes('Stalled Tasks')).length,
    nearDeadline:     data.filter(t => t.statusFocusTags?.includes('Near Deadline')).length,
    overdue:          data.filter(t => t.statusFocusTags?.includes('Overdue')).length,
  };
}

// ─── Derived Workflow State Counts ──────────────────────────────────────────

export interface WorkflowStateCount {
  name: string;
  count: number;
}

export function getWorkflowStateCounts(data: TaskRow[] = TASKS_DATA): WorkflowStateCount[] {
  const stateNames = Object.keys(WORKFLOW_ORDER).sort((a, b) => WORKFLOW_ORDER[a] - WORKFLOW_ORDER[b]);
  return stateNames.map(name => ({
    name,
    count: data.filter(t => t.workflowState === name).length,
  }));
}

// ─── Filter Options ─────────────────────────────────────────────────────────

export const PLANNING_YEAR_OPTIONS = ['All', 'FY2026', 'FY2027'];
export const WORKFLOW_STATE_OPTIONS = ['All', 'Draft', 'BOE Build-Up', 'Activity Acceptance', 'Project Acceptance', 'Project Allocation', 'Impact Assessment', 'Project Approval', 'Program Approval', 'Baselined'];
export const TASK_STATUS_FOCUS_OPTIONS = ['All', 'Awaiting My Action', 'Stalled Tasks', 'Near Deadline', 'Overdue'];
export const PROJECT_OPTIONS = ['All', 'MCM USV Program', 'LCS Mission Modules', 'ASW Systems', 'Surface Warfare'];
export const FUNDING_STATUS_OPTIONS = ['All', 'Fully Funded', 'Partially Funded', 'Unfunded'];
export const EXECUTING_ACTIVITY_OPTIONS = ['All', 'PMS 420', 'NSWC PCD', 'NSWC DD'];