import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from './VersionDropdown';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { SearchIcon } from './InlineIcons';

type ProcessingStatus = 'waiting' | 'assigned' | 'inProgress' | 'complete';
type FundingActionTargetType = 'newDocument' | 'existingDraft' | 'newAmendment';

interface IncomingPlanRow {
  id: string;
  status: ProcessingStatus;
  assignee: string;
  fundingActionId?: string;
  fundingActionLabel?: string;
  year: string;
  activity: string;
  rbe: string;
  project: string;
  lineOfAccounting: string;
  r3cc: string;
  taskId: string;
  taskTitle: string;
  incrementTotal: number;
  reimbursableAmount: number;
  directCiteAmount: number;
  needDate: string;
}

const MOCK_ROWS: IncomingPlanRow[] = [
  {
    id: 'bfm-001',
    status: 'waiting',
    assignee: 'Unassigned',
    year: 'FY25',
    activity: 'Surface Warfare',
    rbe: 'DR-023005.373',
    project: 'Gun Module',
    lineOfAccounting: '1B1B/C011B1-SO',
    r3cc: 'R3CC-201',
    taskId: 'T-4109',
    taskTitle: 'Mission Package Integration',
    incrementTotal: 4200000,
    reimbursableAmount: 1700000,
    directCiteAmount: 2500000,
    needDate: '2026-05-10',
  },
  {
    id: 'bfm-002',
    status: 'inProgress',
    assignee: 'A. Rivera',
    year: 'FY25',
    activity: 'Surface Warfare',
    rbe: 'DR-023005.373',
    project: 'Gun Module',
    lineOfAccounting: '1B1B/C011B1-SX',
    r3cc: 'R3CC-201',
    taskId: 'T-4112',
    taskTitle: 'Safety Certification Package',
    incrementTotal: 1850000,
    reimbursableAmount: 850000,
    directCiteAmount: 1000000,
    needDate: '2026-05-22',
  },
  {
    id: 'bfm-003',
    status: 'waiting',
    assignee: 'Unassigned',
    year: 'FY25',
    activity: 'Mine Countermeasures',
    rbe: 'DR-023099.242',
    project: 'MPAS',
    lineOfAccounting: '0605512N/3428',
    r3cc: 'R3CC-188',
    taskId: 'T-3892',
    taskTitle: 'Sensor Suite Modernization',
    incrementTotal: 3100000,
    reimbursableAmount: 1200000,
    directCiteAmount: 1900000,
    needDate: '2026-04-30',
  },
  {
    id: 'bfm-004',
    status: 'complete',
    assignee: 'J. Patel',
    year: 'FY25',
    activity: 'Mine Countermeasures',
    rbe: 'DR-023099.242',
    project: 'MPAS',
    lineOfAccounting: '0605513N/3067',
    r3cc: 'R3CC-188',
    taskId: 'T-3901',
    taskTitle: 'Launch and Recovery Equipment',
    incrementTotal: 2650000,
    reimbursableAmount: 1150000,
    directCiteAmount: 1500000,
    needDate: '2026-04-08',
  },
  {
    id: 'bfm-005',
    status: 'inProgress',
    assignee: 'M. Walker',
    year: 'FY26',
    activity: 'Expeditionary Logistics',
    rbe: 'DR-060070.18',
    project: 'SSSM',
    lineOfAccounting: 'BLI 1810/PROC0021',
    r3cc: 'R3CC-442',
    taskId: 'T-5020',
    taskTitle: 'Spares and Reliability Buys',
    incrementTotal: 5400000,
    reimbursableAmount: 2200000,
    directCiteAmount: 3200000,
    needDate: '2026-06-02',
  },
  {
    id: 'bfm-006',
    status: 'waiting',
    assignee: 'Unassigned',
    year: 'FY26',
    activity: 'Expeditionary Logistics',
    rbe: 'DR-060070.18',
    project: 'SSSM',
    lineOfAccounting: 'BLI 2040/OMN11032',
    r3cc: 'R3CC-442',
    taskId: 'T-5031',
    taskTitle: 'Inventory Reconstitution',
    incrementTotal: 2100000,
    reimbursableAmount: 900000,
    directCiteAmount: 1200000,
    needDate: '2026-06-17',
  },
  {
    id: 'bfm-007',
    status: 'complete',
    assignee: 'S. Nguyen',
    year: 'FY26',
    activity: 'Cyber Operations',
    rbe: 'DR-070054.81',
    project: 'Cyber Hardening',
    lineOfAccounting: 'BLI 1319/PE0603513N',
    r3cc: 'R3CC-277',
    taskId: 'T-6208',
    taskTitle: 'Endpoint Security Refresh',
    incrementTotal: 1950000,
    reimbursableAmount: 650000,
    directCiteAmount: 1300000,
    needDate: '2026-04-12',
  },
  {
    id: 'bfm-008',
    status: 'inProgress',
    assignee: 'A. Rivera',
    year: 'FY26',
    activity: 'Cyber Operations',
    rbe: 'DR-070054.81',
    project: 'Cyber Hardening',
    lineOfAccounting: 'BLI 1319/PE0603553N',
    r3cc: 'R3CC-277',
    taskId: 'T-6215',
    taskTitle: 'Zero Trust Pilot',
    incrementTotal: 3350000,
    reimbursableAmount: 1250000,
    directCiteAmount: 2100000,
    needDate: '2026-05-28',
  },
  {
    id: 'bfm-009',
    status: 'waiting',
    assignee: 'Unassigned',
    year: 'FY26',
    activity: 'Integrated Test',
    rbe: 'DR-090022.247',
    project: 'Test Range Upgrade',
    lineOfAccounting: '1C1C/C01C9-00',
    r3cc: 'R3CC-155',
    taskId: 'T-7104',
    taskTitle: 'Instrumentation Refresh',
    incrementTotal: 2800000,
    reimbursableAmount: 1000000,
    directCiteAmount: 1800000,
    needDate: '2026-07-11',
  },
  {
    id: 'bfm-010',
    status: 'complete',
    assignee: 'J. Patel',
    year: 'FY27',
    activity: 'Integrated Test',
    rbe: 'DR-090022.247',
    project: 'Test Range Upgrade',
    lineOfAccounting: '1D4D/C01C9-IL',
    r3cc: 'R3CC-155',
    taskId: 'T-7112',
    taskTitle: 'Data Reduction Tooling',
    incrementTotal: 1680000,
    reimbursableAmount: 780000,
    directCiteAmount: 900000,
    needDate: '2026-03-29',
  },
];

const STATUS_LABELS: Record<ProcessingStatus, string> = {
  waiting: 'Waiting to Be Assigned',
  assigned: 'Assigned',
  inProgress: 'In Progress',
  complete: 'Complete',
};

const STATUS_FILTER_OPTIONS = ['All Statuses', ...Object.values(STATUS_LABELS)];

function isAssigneeUnset(assignee: string) {
  return !assignee.trim() || assignee === 'Unassigned';
}

function isGroupableStatus(status: ProcessingStatus) {
  return status === 'waiting' || status === 'assigned';
}

function normalizeRowForLocalWorkflow(row: IncomingPlanRow): IncomingPlanRow {
  if (row.status === 'complete') return row;
  if (isAssigneeUnset(row.assignee)) {
    return { ...row, assignee: 'Unassigned', status: 'waiting' };
  }
  if (row.status === 'inProgress') return row;
  if (row.status === 'assigned') return row;
  return { ...row, status: 'assigned' };
}

function buildSavedFundingActionLabel(form: FundingActionFormState, suggestedDraftGroupName: string) {
  const targetReference = form.targetReference.trim();
  if (form.targetType === 'existingDraft' && targetReference) {
    return `Draft Document: ${targetReference}`;
  }
  if (form.targetType === 'newAmendment') {
    const amendment = form.amendmentNumber.trim();
    return amendment ? `Amendment: ${targetReference} (${amendment})` : `Amendment: ${targetReference}`;
  }
  if (targetReference) {
    return `Draft Funding Action: ${targetReference}`;
  }
  return `Draft Funding Action: ${suggestedDraftGroupName || 'Pending Name'}`;
}

interface FundingActionFormState {
  targetType: FundingActionTargetType;
  targetReference: string;
  assignee: string;
  prNumber: string;
  standardDocumentNumber: string;
  amendmentNumber: string;
  acrn: string;
  wbs: string;
  programOfficial: string;
}

const INITIAL_FUNDING_ACTION_FORM: FundingActionFormState = {
  targetType: 'newDocument',
  targetReference: '',
  assignee: '',
  prNumber: '',
  standardDocumentNumber: '',
  amendmentNumber: '',
  acrn: '',
  wbs: '',
  programOfficial: '',
};

type GroupingFieldKey = 'year' | 'activity' | 'rbe' | 'project' | 'lineOfAccounting' | 'r3cc';
type GroupingCompatibilityStatus = 'compatible' | 'reviewCarefully' | 'likelyIncompatible';

interface GroupingFieldAnalysis {
  key: GroupingFieldKey;
  label: string;
  isShared: boolean;
  distinctValues: string[];
  sharedValue?: string;
  summary: string;
}

interface GroupingDecision {
  status: GroupingCompatibilityStatus;
  assessmentLabel: string;
  assessmentMessage: string;
  criticalConflicts: GroupingFieldAnalysis[];
  informationalDifferences: GroupingFieldAnalysis[];
  alignedFields: GroupingFieldAnalysis[];
}

const GROUPING_FIELDS: { key: GroupingFieldKey; label: string }[] = [
  { key: 'year', label: 'Year' },
  { key: 'activity', label: 'Activity' },
  { key: 'rbe', label: 'RBE' },
  { key: 'project', label: 'Project' },
  { key: 'lineOfAccounting', label: 'Line of Accounting' },
  { key: 'r3cc', label: 'R3CC' },
];

const CRITICAL_GROUPING_KEYS: GroupingFieldKey[] = ['activity', 'rbe', 'project', 'lineOfAccounting'];
const INFORMATIONAL_GROUPING_KEYS: GroupingFieldKey[] = ['year', 'r3cc'];

function summarizeDistinctValues(values: string[]) {
  if (values.length <= 2) return values.join(' | ');
  const preview = values.slice(0, 2).join(' | ');
  return `${preview} +${values.length - 2} more`;
}

function computeGroupingAnalysis(rows: IncomingPlanRow[]): GroupingFieldAnalysis[] {
  return GROUPING_FIELDS.map((field) => {
    const distinctValues = [...new Set(rows.map((row) => row[field.key]))];
    const isShared = distinctValues.length === 1;
    return {
      key: field.key,
      label: field.label,
      isShared,
      distinctValues,
      sharedValue: isShared ? distinctValues[0] : undefined,
      summary: isShared ? distinctValues[0] : summarizeDistinctValues(distinctValues),
    };
  });
}

function evaluateGroupingDecision(analysis: GroupingFieldAnalysis[]): GroupingDecision {
  const criticalConflicts = analysis.filter(
    (field) => CRITICAL_GROUPING_KEYS.includes(field.key) && !field.isShared,
  );
  const informationalDifferences = analysis.filter(
    (field) => INFORMATIONAL_GROUPING_KEYS.includes(field.key) && !field.isShared,
  );
  const alignedFields = analysis.filter((field) => field.isShared);

  if (criticalConflicts.length >= 2) {
    return {
      status: 'likelyIncompatible',
      assessmentLabel: 'Likely Incompatible',
      assessmentMessage:
        'Selection spans conflicting critical grouping dimensions and may not belong on a single Funding Action.',
      criticalConflicts,
      informationalDifferences,
      alignedFields,
    };
  }

  if (criticalConflicts.length === 1 || informationalDifferences.length > 0) {
    return {
      status: 'reviewCarefully',
      assessmentLabel: 'Review Carefully',
      assessmentMessage:
        'Selection may be groupable, but mixed dimensions should be reviewed before finalizing the draft Funding Action.',
      criticalConflicts,
      informationalDifferences,
      alignedFields,
    };
  }

  return {
    status: 'compatible',
    assessmentLabel: 'Compatible',
    assessmentMessage: 'Selection is aligned across critical and informational grouping dimensions.',
    criticalConflicts,
    informationalDifferences,
    alignedFields,
  };
}

function buildDraftGroupName(
  rows: IncomingPlanRow[],
  analysis: GroupingFieldAnalysis[],
  decision: GroupingDecision,
) {
  if (rows.length === 0) return '';
  const getShared = (key: GroupingFieldKey) => analysis.find((a) => a.key === key && a.isShared)?.sharedValue;

  const sharedYear = getShared('year');
  const sharedActivity = getShared('activity');
  const sharedProject = getShared('project');
  const sharedRbe = getShared('rbe');
  const sharedLoa = getShared('lineOfAccounting');

  if (sharedYear && sharedActivity && sharedProject && sharedRbe && sharedLoa) {
    return `${sharedYear} | ${sharedActivity} | ${sharedProject} | ${sharedRbe}`;
  }

  if (sharedYear && sharedActivity && sharedProject) {
    return `${sharedYear} | ${sharedActivity} | ${sharedProject} Group`;
  }

  if (sharedYear && sharedActivity) {
    return `${sharedYear} | ${sharedActivity} Funding Action`;
  }

  if (decision.status === 'reviewCarefully') {
    return `Review Group - ${rows.length} APM Plans`;
  }

  return `Mixed Selection Review - ${rows.length} APM Plans`;
}

export default function BFMProcessingContent() {
  const [planRows, setPlanRows] = useState<IncomingPlanRow[]>(() =>
    MOCK_ROWS.map(normalizeRowForLocalWorkflow),
  );
  const [yearFilter, setYearFilter] = useState('All Years');
  const [activityFilter, setActivityFilter] = useState('All Activities');
  const [rbeFilter, setRbeFilter] = useState('All RBEs');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [loaFilter, setLoaFilter] = useState('All Line of Accounting');
  const [assigneeFilter, setAssigneeFilter] = useState('All Assignees');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [activeStatusTab, setActiveStatusTab] = useState<ProcessingStatus>('waiting');
  const [searchValue, setSearchValue] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAssignPanelOpen, setIsAssignPanelOpen] = useState(false);
  const [assignInputValue, setAssignInputValue] = useState('');
  const [assignPanelError, setAssignPanelError] = useState('');
  const [isFundingActionWorkspaceOpen, setIsFundingActionWorkspaceOpen] = useState(false);
  const [fundingActionForm, setFundingActionForm] = useState<FundingActionFormState>(INITIAL_FUNDING_ACTION_FORM);
  const [isTargetReferenceManuallyEdited, setIsTargetReferenceManuallyEdited] = useState(false);
  const [hasIncompatibleOverrideAck, setHasIncompatibleOverrideAck] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saveConfirmation, setSaveConfirmation] = useState('');
  const [workflowWarning, setWorkflowWarning] = useState('');
  const [nextFundingActionNumber, setNextFundingActionNumber] = useState(1);

  const yearOptions = useMemo(
    () => ['All Years', ...new Set(planRows.map((row) => row.year))],
    [planRows],
  );
  const activityOptions = useMemo(
    () => ['All Activities', ...new Set(planRows.map((row) => row.activity))],
    [planRows],
  );
  const rbeOptions = useMemo(
    () => ['All RBEs', ...new Set(planRows.map((row) => row.rbe))],
    [planRows],
  );
  const projectOptions = useMemo(
    () => ['All Projects', ...new Set(planRows.map((row) => row.project))],
    [planRows],
  );
  const loaOptions = useMemo(
    () => ['All Line of Accounting', ...new Set(planRows.map((row) => row.lineOfAccounting))],
    [planRows],
  );
  const assigneeOptions = useMemo(
    () => ['All Assignees', ...new Set(planRows.map((row) => row.assignee))],
    [planRows],
  );

  const filteredRows = useMemo(() => {
    const byTab = planRows.filter((row) => row.status === activeStatusTab);
    const byFilters = byTab.filter((row) => {
      if (yearFilter !== 'All Years' && row.year !== yearFilter) return false;
      if (activityFilter !== 'All Activities' && row.activity !== activityFilter) return false;
      if (rbeFilter !== 'All RBEs' && row.rbe !== rbeFilter) return false;
      if (projectFilter !== 'All Projects' && row.project !== projectFilter) return false;
      if (loaFilter !== 'All Line of Accounting' && row.lineOfAccounting !== loaFilter) return false;
      if (assigneeFilter !== 'All Assignees' && row.assignee !== assigneeFilter) return false;
      if (statusFilter !== 'All Statuses' && STATUS_LABELS[row.status] !== statusFilter) return false;
      if (!searchValue.trim()) return true;

      const query = searchValue.toLowerCase();
      const haystack = [
        row.taskId,
        row.taskTitle,
        row.activity,
        row.project,
        row.rbe,
        row.lineOfAccounting,
        row.assignee,
        row.r3cc,
        row.fundingActionId ?? '',
        row.fundingActionLabel ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });

    return [...byFilters].sort((a, b) => {
      if (a.year !== b.year) return a.year.localeCompare(b.year);
      if (a.activity !== b.activity) return a.activity.localeCompare(b.activity);
      if (a.rbe !== b.rbe) return a.rbe.localeCompare(b.rbe);
      if (a.project !== b.project) return a.project.localeCompare(b.project);
      return a.lineOfAccounting.localeCompare(b.lineOfAccounting);
    });
  }, [
    activeStatusTab,
    activityFilter,
    assigneeFilter,
    loaFilter,
    projectFilter,
    rbeFilter,
    searchValue,
    statusFilter,
    yearFilter,
    planRows,
  ]);

  const selectedCount = selectedIds.size;
  const selectedRows = useMemo(
    () => planRows.filter((row) => selectedIds.has(row.id)),
    [planRows, selectedIds],
  );
  const selectedEligibleForGrouping = useMemo(
    () => selectedRows.filter((row) => isGroupableStatus(row.status)),
    [selectedRows],
  );
  const selectedIneligibleForGrouping = useMemo(
    () => selectedRows.filter((row) => !isGroupableStatus(row.status)),
    [selectedRows],
  );
  const isCombineFullyIneligible = selectedCount > 0 && selectedEligibleForGrouping.length === 0;
  const groupingAnalysis = useMemo(
    () => computeGroupingAnalysis(selectedRows),
    [selectedRows],
  );
  const groupingDecision = useMemo(
    () => evaluateGroupingDecision(groupingAnalysis),
    [groupingAnalysis],
  );
  const selectedIncrementTotal = useMemo(
    () => selectedRows.reduce((total, row) => total + row.incrementTotal, 0),
    [selectedRows],
  );
  const selectedReimbursableTotal = useMemo(
    () => selectedRows.reduce((total, row) => total + row.reimbursableAmount, 0),
    [selectedRows],
  );
  const selectedDirectCiteTotal = useMemo(
    () => selectedRows.reduce((total, row) => total + row.directCiteAmount, 0),
    [selectedRows],
  );
  const suggestedDraftGroupName = useMemo(
    () => buildDraftGroupName(selectedRows, groupingAnalysis, groupingDecision),
    [groupingAnalysis, groupingDecision, selectedRows],
  );
  const allVisibleSelected =
    filteredRows.length > 0 && filteredRows.every((row) => selectedIds.has(row.id));

  useEffect(() => {
    if (!isFundingActionWorkspaceOpen) return;
    if (fundingActionForm.targetType !== 'newDocument') return;
    if (isTargetReferenceManuallyEdited) return;
    setFundingActionForm((prev) => ({
      ...prev,
      targetReference: suggestedDraftGroupName,
    }));
  }, [
    fundingActionForm.targetType,
    isFundingActionWorkspaceOpen,
    isTargetReferenceManuallyEdited,
    suggestedDraftGroupName,
  ]);

  useEffect(() => {
    if (groupingDecision.status !== 'likelyIncompatible') {
      setHasIncompatibleOverrideAck(false);
      if (formErrors.incompatibleOverride) {
        setFormErrors((prev) => ({ ...prev, incompatibleOverride: '' }));
      }
    }
  }, [formErrors.incompatibleOverride, groupingDecision.status]);

  useEffect(() => {
    if (workflowWarning) {
      setWorkflowWarning('');
    }
  }, [selectedIds]);

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const updated = new Set(selectedIds);
      filteredRows.forEach((row) => updated.delete(row.id));
      setSelectedIds(updated);
      return;
    }
    const updated = new Set(selectedIds);
    filteredRows.forEach((row) => updated.add(row.id));
    setSelectedIds(updated);
  };

  const toggleSelectRow = (rowId: string) => {
    const updated = new Set(selectedIds);
    if (updated.has(rowId)) {
      updated.delete(rowId);
    } else {
      updated.add(rowId);
    }
    setSelectedIds(updated);
  };

  const clearFilters = () => {
    setYearFilter('All Years');
    setActivityFilter('All Activities');
    setRbeFilter('All RBEs');
    setProjectFilter('All Projects');
    setLoaFilter('All Line of Accounting');
    setAssigneeFilter('All Assignees');
    setStatusFilter('All Statuses');
  };

  const handleOpenAssignPanel = () => {
    if (selectedCount === 0) return;
    setIsFundingActionWorkspaceOpen(false);
    setIsAssignPanelOpen((prev) => !prev);
    setAssignPanelError('');
    setWorkflowWarning('');
  };

  const handleApplyAssignment = () => {
    const assignee = assignInputValue.trim();
    if (!assignee) {
      setAssignPanelError('Enter an assignee to apply assignment.');
      return;
    }

    const assignedCount = selectedRows.length;
    setPlanRows((prev) =>
      prev.map((row) => {
        if (!selectedIds.has(row.id)) return row;
        if (row.status === 'complete') return { ...row, assignee };
        return { ...row, assignee, status: 'assigned' };
      }),
    );

    setSaveConfirmation(
      `Assigned ${assignedCount} APM Plan${assignedCount === 1 ? '' : 's'} to ${assignee} and moved them to Assigned.`,
    );
    setWorkflowWarning('');
    setSelectedIds(new Set());
    setIsAssignPanelOpen(false);
    setAssignInputValue('');
    setAssignPanelError('');
  };

  const handleMarkInProgress = () => {
    let movedCount = 0;
    let skippedCount = 0;

    setPlanRows((prev) =>
      prev.map((row) => {
        if (!selectedIds.has(row.id)) return row;
        if (row.status === 'complete' || row.status !== 'assigned') {
          skippedCount += 1;
          return row;
        }
        movedCount += 1;
        return { ...row, status: 'inProgress' };
      }),
    );

    if (movedCount > 0 && skippedCount === 0) {
      setSaveConfirmation(`Moved ${movedCount} APM Plan${movedCount === 1 ? '' : 's'} to In Progress.`);
    } else if (movedCount > 0 && skippedCount > 0) {
      setSaveConfirmation(
        `Moved ${movedCount} plan${movedCount === 1 ? '' : 's'} to In Progress. ${skippedCount} plan${skippedCount === 1 ? '' : 's'} skipped (not Assigned or complete).`,
      );
    } else {
      setSaveConfirmation('No status changes applied. Selected plans were not in Assigned status or were already complete.');
    }

    setWorkflowWarning('');
    setSelectedIds(new Set());
    setIsFundingActionWorkspaceOpen(false);
    setIsAssignPanelOpen(false);
    setAssignPanelError('');
  };

  const handleCombineSelected = () => {
    if (selectedCount === 0) return;
    if (selectedIneligibleForGrouping.length > 0) {
      const invalidCount = selectedIneligibleForGrouping.length;
      setWorkflowWarning(
        `Cannot combine ${invalidCount} selected plan${invalidCount === 1 ? '' : 's'}. Grouping is only available in Waiting to Be Assigned or Assigned status, before active processing starts.`,
      );
      setIsFundingActionWorkspaceOpen(false);
      setIsAssignPanelOpen(false);
      setAssignPanelError('');
      return;
    }
    setIsFundingActionWorkspaceOpen(true);
    setIsAssignPanelOpen(false);
    setAssignPanelError('');
    setWorkflowWarning('');
    setSaveConfirmation('');
    setFormErrors({});
    setIsTargetReferenceManuallyEdited(false);
    setHasIncompatibleOverrideAck(false);
  };

  const handleCancelFundingAction = () => {
    setIsFundingActionWorkspaceOpen(false);
    setFormErrors({});
    setHasIncompatibleOverrideAck(false);
  };

  const updateFundingActionField = (
    field: keyof FundingActionFormState,
    value: string,
    options?: { markTargetEdited?: boolean },
  ) => {
    setFundingActionForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'targetReference' && options?.markTargetEdited) {
      setIsTargetReferenceManuallyEdited(true);
    }
    if (field === 'targetType') {
      setIsTargetReferenceManuallyEdited(false);
      if (value !== 'newAmendment') {
        setFundingActionForm((prev) => ({ ...prev, amendmentNumber: '' }));
      }
    }
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleIncompatibleOverrideChange = (checked: boolean) => {
    setHasIncompatibleOverrideAck(checked);
    if (checked && formErrors.incompatibleOverride) {
      setFormErrors((prev) => ({ ...prev, incompatibleOverride: '' }));
    }
  };

  const validateFundingActionForm = () => {
    const errors: Record<string, string> = {};
    if (selectedRows.length === 0) {
      errors.selected = 'Select at least one APM Plan to create a Funding Action.';
    }
    if (!fundingActionForm.assignee.trim()) errors.assignee = 'Assignee is required.';
    if (!fundingActionForm.prNumber.trim()) errors.prNumber = 'PR Number is required.';
    if (!fundingActionForm.acrn.trim()) errors.acrn = 'ACRN is required.';
    if (!fundingActionForm.wbs.trim()) errors.wbs = 'WBS is required.';
    if (!fundingActionForm.programOfficial.trim()) errors.programOfficial = 'Program Official is required.';

    if (fundingActionForm.targetType === 'existingDraft' && !fundingActionForm.targetReference.trim()) {
      errors.targetReference = 'Select an existing draft funding document.';
    }
    if (fundingActionForm.targetType === 'newAmendment') {
      if (!fundingActionForm.targetReference.trim()) {
        errors.targetReference = 'Select a funding document for the amendment.';
      }
      if (!fundingActionForm.amendmentNumber.trim()) {
        errors.amendmentNumber = 'Amendment Number is required.';
      }
    }

    return errors;
  };

  const handleSaveDraftFundingAction = () => {
    if (groupingDecision.status === 'likelyIncompatible' && !hasIncompatibleOverrideAck) {
      setFormErrors((prev) => ({
        ...prev,
        incompatibleOverride:
          'This selection has critical grouping conflicts. Confirm override to save a draft Funding Action.',
      }));
      return;
    }

    const errors = validateFundingActionForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const savedCount = selectedRows.length;
    const draftAssignee = fundingActionForm.assignee.trim();
    const savedFundingActionId = `DFA-${String(nextFundingActionNumber).padStart(3, '0')}`;
    const savedFundingActionLabel = buildSavedFundingActionLabel(fundingActionForm, suggestedDraftGroupName);
    setPlanRows((prev) =>
      prev.map((row) => {
        if (!selectedIds.has(row.id)) return row;
        const nextAssignee = draftAssignee || row.assignee;
        const nextStatus =
          row.status === 'complete'
            ? 'complete'
            : isAssigneeUnset(nextAssignee)
              ? 'waiting'
              : 'assigned';

        if (row.status === 'complete') {
          return {
            ...row,
            assignee: nextAssignee,
            fundingActionId: savedFundingActionId,
            fundingActionLabel: savedFundingActionLabel,
          };
        }
        return {
          ...row,
          assignee: nextAssignee,
          status: nextStatus,
          fundingActionId: savedFundingActionId,
          fundingActionLabel: savedFundingActionLabel,
        };
      }),
    );
    setNextFundingActionNumber((prev) => prev + 1);
    setSaveConfirmation(`Draft Funding Action saved for ${savedCount} APM Plan${savedCount === 1 ? '' : 's'}.`);
    setSelectedIds(new Set());
    setFundingActionForm(INITIAL_FUNDING_ACTION_FORM);
    setIsTargetReferenceManuallyEdited(false);
    setHasIncompatibleOverrideAck(false);
    setFormErrors({});
    setIsFundingActionWorkspaceOpen(false);
    setIsAssignPanelOpen(false);
    setAssignPanelError('');
  };

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="flex flex-col items-start pl-[24px] pr-[24px] pt-[24px] pb-[72px] w-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <PageHeader />
          <CollapsibleFilterSection highContrast>
            <div className="flex gap-[12px] items-end relative shrink-0 flex-wrap" data-name="left-filters">
              <FilterField label="Year" value={yearFilter} onChange={setYearFilter} options={yearOptions} />
              <FilterField label="Activity" value={activityFilter} onChange={setActivityFilter} options={activityOptions} />
              <FilterField label="RBE" value={rbeFilter} onChange={setRbeFilter} options={rbeOptions} />
              <FilterField label="Project" value={projectFilter} onChange={setProjectFilter} options={projectOptions} />
              <FilterField label="Line of Accounting" value={loaFilter} onChange={setLoaFilter} options={loaOptions} />
              <FilterField label="Assignee" value={assigneeFilter} onChange={setAssigneeFilter} options={assigneeOptions} />
              <FilterField label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_FILTER_OPTIONS} />
              <button
                onClick={clearFilters}
                className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(20,125,185,0.22)]"
                style={{ color: '#004B72' }}
              >
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
                  Clear Filters
                </span>
              </button>
            </div>
          </CollapsibleFilterSection>

          <div className="w-full flex flex-col gap-[12px]">
            {saveConfirmation && (
              <div className="w-full bg-[rgba(0,179,238,0.12)] border border-[#60B3D7] rounded-[5px] px-[16px] py-[10px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#00749E]">
                  {saveConfirmation}
                </p>
              </div>
            )}
            {workflowWarning && (
              <div className="w-full bg-[rgba(243,0,13,0.08)] border border-[#EB8E90] rounded-[5px] px-[16px] py-[10px]">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#CE2C31]">
                  {workflowWarning}
                </p>
              </div>
            )}
            <StatusTabs activeTab={activeStatusTab} onTabChange={setActiveStatusTab} />

            {isFundingActionWorkspaceOpen && (
              <FundingActionWorkspace
                selectedRows={selectedRows}
                selectedIncrementTotal={selectedIncrementTotal}
                selectedReimbursableTotal={selectedReimbursableTotal}
                selectedDirectCiteTotal={selectedDirectCiteTotal}
                formState={fundingActionForm}
                formErrors={formErrors}
                groupingDecision={groupingDecision}
                hasIncompatibleOverrideAck={hasIncompatibleOverrideAck}
                suggestedDraftGroupName={suggestedDraftGroupName}
                onFieldChange={updateFundingActionField}
                onIncompatibleOverrideChange={handleIncompatibleOverrideChange}
                onCancel={handleCancelFundingAction}
                onSave={handleSaveDraftFundingAction}
              />
            )}

            <div className="bg-[#f9f9fb] relative rounded-tl-[5px] rounded-tr-[5px] w-full border border-solid border-[#CDCED6] border-b-0">
              <div className="flex items-center justify-between px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#CDCED6] gap-[16px] flex-wrap">
                <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[#1C2024] text-[18px] whitespace-nowrap">
                    Incoming APM Plans
                  </p>
                  <div className="w-[1px] h-[24px] bg-[#CDCED6] shrink-0" />
                  <div className="bg-white h-[32px] relative rounded-[4px] w-[268px]">
                    <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <div className="flex items-center size-full px-[4px]">
                      <div className="flex items-center justify-center shrink-0 px-[2px]">
                        <SearchIcon />
                      </div>
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search..."
                        className="flex-1 bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] placeholder:text-[#60646C] px-[4px]"
                      />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1.5px_2px_0px_rgba(0,0,0,0.1),inset_0px_1.5px_2px_0px_rgba(0,0,85,0.02)]" />
                  </div>
                </div>

                <div className="flex items-center gap-[8px] shrink-0 flex-wrap">
                  <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1C2024] text-[14px] whitespace-nowrap">
                    Bulk Actions:
                  </span>
                  <BulkActionButton
                    label="Combine Selected"
                    disabled={selectedCount === 0 || isCombineFullyIneligible}
                    onClick={handleCombineSelected}
                    title={
                      isCombineFullyIneligible
                        ? 'Grouping is only available for Waiting to Be Assigned or Assigned items.'
                        : undefined
                    }
                  />
                  <BulkActionButton label="Assign" disabled={selectedCount === 0} onClick={handleOpenAssignPanel} />
                  <BulkActionButton label="Mark In Progress" disabled={selectedCount === 0} onClick={handleMarkInProgress} />
                </div>
              </div>
              {isAssignPanelOpen && (
                <div className="flex items-start gap-[8px] px-[24px] pb-[16px]">
                  <div className="flex flex-col gap-[6px] min-w-[260px]">
                    <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024]">
                      Assign to Financial Lead
                    </label>
                    <input
                      list="bfm-assignee-options"
                      value={assignInputValue}
                      onChange={(e) => {
                        setAssignInputValue(e.target.value);
                        if (assignPanelError) setAssignPanelError('');
                      }}
                      placeholder="Enter or select assignee"
                      className="h-[32px] px-[10px] border border-[#B9BBC6] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#147DB9] focus:ring-1 focus:ring-[rgba(20,125,185,0.2)]"
                    />
                    <datalist id="bfm-assignee-options">
                      {assigneeOptions
                        .filter((option) => option !== 'All Assignees' && !isAssigneeUnset(option))
                        .map((option) => (
                          <option key={option} value={option} />
                        ))}
                    </datalist>
                    {assignPanelError && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#CE2C31]">
                        {assignPanelError}
                      </p>
                    )}
                  </div>
                  <div className="flex items-end gap-[8px] h-[58px]">
                    <button
                      onClick={handleApplyAssignment}
                      className="bg-[#004B72] h-[32px] px-[12px] rounded-[4px] border border-[#004B72] hover:bg-[#003d5c] transition-colors"
                    >
                      <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white">
                        Apply Assignment
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setIsAssignPanelOpen(false);
                        setAssignPanelError('');
                      }}
                      className="bg-white h-[32px] px-[12px] rounded-[4px] border border-[#004B72] hover:bg-[#f5f5f5] transition-colors"
                    >
                      <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#004B72]">
                        Cancel
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <FlatPlansTable
              rows={filteredRows}
              selectedIds={selectedIds}
              allVisibleSelected={allVisibleSelected}
              onToggleAll={toggleSelectAll}
              onToggleRow={toggleSelectRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="page-header">
      <div className="content-stretch flex items-start justify-between overflow-clip py-[12px] relative shrink-0 w-full" data-name="pe-version-bar">
        <VersionDropdown />
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="button-row">
          <Link
            to="/apm-acceptance"
            className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[#004B72] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#004B72] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">← Back to APM Acceptance</p>
            </div>
          </Link>
          <Link
            to="/funding-work-plans"
            className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[#004B72] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#004B72] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">Go to Funding Work Plans →</p>
            </div>
          </Link>
          <button className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
            <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1C2024] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">Export</p>
            </div>
          </button>
        </div>
      </div>

      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="pe-page-header">
        <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#004B72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] text-[#1C2024] text-[32px]">
              BFM Processing
            </h1>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#60646C] text-[18px]">
              Review approved APM plans and prepare grouped execution actions.
            </p>
          </div>
          <SyncPointBreadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Execution Planning', path: '/execution-planning/dashboard' },
              { label: 'BFM Processing' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function FilterField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1C2024] text-[14px]">
        {label}
      </p>
      <SearchableFilterDropdown value={value} onChange={onChange} options={options} />
    </div>
  );
}

function StatusTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: ProcessingStatus;
  onTabChange: (tab: ProcessingStatus) => void;
}) {
  const tabs: { key: ProcessingStatus; label: string }[] = [
    { key: 'waiting', label: 'Waiting to Be Assigned' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'inProgress', label: 'In Progress' },
    { key: 'complete', label: 'Complete' },
  ];

  return (
    <div className="flex items-center gap-0 border border-solid border-[#CDCED6] rounded-[4px] overflow-hidden" data-name="status-tabs">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center h-[36px] px-[16px] cursor-pointer border-none transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(20,125,185,0.22)] ${
              isActive ? 'bg-[#147DB9] text-white' : 'bg-white text-[#1C2024] hover:bg-[#f5f5f5]'
            }`}
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[20px] whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function BulkActionButton({
  label,
  disabled,
  onClick,
  title,
}: {
  label: string;
  disabled: boolean;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`content-stretch flex gap-[8px] h-[30px] items-center justify-center px-[10px] relative rounded-[4px] shrink-0 transition-colors ${
        disabled ? 'cursor-default bg-[#ffffff]' : 'cursor-pointer bg-[#ffffff] hover:bg-[#f5f5f5]'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${
          disabled ? 'border-[#c1c2c5]' : 'border-[#004B72]'
        }`}
      />
      <span
        className={`font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] whitespace-nowrap ${
          disabled ? 'text-[#8b8d98]' : 'text-[#004B72]'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function FundingActionWorkspace({
  selectedRows,
  selectedIncrementTotal,
  selectedReimbursableTotal,
  selectedDirectCiteTotal,
  formState,
  formErrors,
  groupingDecision,
  hasIncompatibleOverrideAck,
  suggestedDraftGroupName,
  onFieldChange,
  onIncompatibleOverrideChange,
  onCancel,
  onSave,
}: {
  selectedRows: IncomingPlanRow[];
  selectedIncrementTotal: number;
  selectedReimbursableTotal: number;
  selectedDirectCiteTotal: number;
  formState: FundingActionFormState;
  formErrors: Record<string, string>;
  groupingDecision: GroupingDecision;
  hasIncompatibleOverrideAck: boolean;
  suggestedDraftGroupName: string;
  onFieldChange: (field: keyof FundingActionFormState, value: string, options?: { markTargetEdited?: boolean }) => void;
  onIncompatibleOverrideChange: (checked: boolean) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const targetTypeOptions: { value: FundingActionTargetType; label: string }[] = [
    { value: 'newDocument', label: 'New Funding Document' },
    { value: 'existingDraft', label: 'Existing Draft Funding Document' },
    { value: 'newAmendment', label: 'New Amendment' },
  ];

  const targetReferenceLabel =
    formState.targetType === 'existingDraft'
      ? 'Existing Draft Funding Document'
      : formState.targetType === 'newAmendment'
        ? 'Funding Document to Amend'
        : 'Draft Group Name';
  const saveDisabled =
    groupingDecision.status === 'likelyIncompatible' && !hasIncompatibleOverrideAck;
  const criticalConflictDetails = groupingDecision.criticalConflicts.map((field) => ({
    label: field.label,
    value: `${field.distinctValues.length} values: ${field.summary}`,
  }));
  const informationalDifferenceDetails = groupingDecision.informationalDifferences.map((field) => ({
    label: field.label,
    value: `${field.distinctValues.length} values: ${field.summary}`,
  }));
  const alignedFieldDetails = groupingDecision.alignedFields.map((field) => ({
    label: field.label,
    value: field.sharedValue || field.summary,
  }));

  return (
    <div className="w-full bg-[#f9f9fb] rounded-[5px] border border-[#CDCED6]">
      <div className="px-[24px] py-[16px] border-b border-[#CDCED6]">
        <div className="flex items-center gap-[8px] flex-wrap">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[18px] leading-[24px] text-[#1C2024]">
            Funding Action Workspace
          </h2>
        </div>
        <p className="mt-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C]">
          Combine selected APM Plans into a draft Funding Action.
        </p>
      </div>

      <div className="px-[24px] py-[16px] grid gap-[16px]">
        {formErrors.selected && (
          <div className="bg-[rgba(243,0,13,0.08)] border border-[#EB8E90] rounded-[4px] px-[12px] py-[8px]">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#CE2C31]">
              {formErrors.selected}
            </p>
          </div>
        )}

        <div className="grid gap-[12px]" style={{ gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))' }}>
          <SummaryCard label="APM Plans Selected" value={String(selectedRows.length)} />
          <SummaryCard label="Total Increment Amount" value={formatCurrency(selectedIncrementTotal)} />
          <SummaryCard label="Total Reimbursable Amount" value={formatCurrency(selectedReimbursableTotal)} />
          <SummaryCard label="Total Direct Cite Amount" value={formatCurrency(selectedDirectCiteTotal)} />
        </div>

        <div className="bg-white border border-[#CDCED6] rounded-[5px] px-[14px] py-[10px] grid gap-[8px]">
          <div className="flex items-center gap-[8px] flex-wrap">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] uppercase tracking-[0.5px] text-[#1C2024]">
              Grouping Analysis
            </p>
            <div
              className="inline-flex items-center h-[24px] px-[8px] rounded-[100px]"
              style={{
                backgroundColor:
                  groupingDecision.status === 'compatible'
                    ? 'rgba(0, 164, 51, 0.1)'
                    : groupingDecision.status === 'reviewCarefully'
                      ? 'rgba(255, 222, 0, 0.24)'
                      : 'rgba(243,0,13,0.08)',
              }}
            >
              <span
                className="font-['Inter:Bold',sans-serif] font-bold text-[12px] leading-[16px]"
                style={{
                  color:
                    groupingDecision.status === 'compatible'
                      ? '#218358'
                      : groupingDecision.status === 'reviewCarefully'
                        ? '#AB6400'
                        : '#CE2C31',
                }}
              >
                {groupingDecision.assessmentLabel}
              </span>
            </div>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#60646C]">
            {groupingDecision.assessmentMessage}
          </p>

          <div className="grid gap-[8px]" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <AnalysisSection
              title="Critical Conflicts"
              tone={groupingDecision.criticalConflicts.length > 0 ? 'error' : 'success'}
              emptyMessage="No critical conflicts across Activity, RBE, Project, and Line of Accounting."
              items={criticalConflictDetails}
            />
            <AnalysisSection
              title="Informational Differences"
              tone={groupingDecision.informationalDifferences.length > 0 ? 'warning' : 'info'}
              emptyMessage="No informational differences in Year or R3CC."
              items={informationalDifferenceDetails}
            />
          </div>

          {alignedFieldDetails.length > 0 ? (
            <div className="rounded-[4px] border border-[#CDCED6] bg-[#f9f9fb] px-[8px] py-[6px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#1C2024] mb-[4px]">
                Aligned Context
              </p>
              <div className="flex flex-wrap gap-x-[10px] gap-y-[2px]">
                {alignedFieldDetails.map((item) => (
                  <span key={`aligned-${item.label}`} className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C]">
                    {item.label}: {item.value}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#80838D]">
              No aligned context across the current selection.
            </p>
          )}

          {groupingDecision.status === 'likelyIncompatible' && (
            <div className="rounded-[4px] border border-[#EB8E90] bg-[rgba(243,0,13,0.06)] px-[10px] py-[8px]">
              <label className="flex items-start gap-[8px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasIncompatibleOverrideAck}
                  onChange={(e) => onIncompatibleOverrideChange(e.target.checked)}
                  className="mt-[2px] h-[16px] w-[16px] accent-[#147DB9] cursor-pointer"
                />
                <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024]">
                  I acknowledge this draft combines APM Plans with critical grouping conflicts and am intentionally proceeding.
                </span>
              </label>
              {formErrors.incompatibleOverride && (
                <p className="mt-[6px] font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#CE2C31]">
                  {formErrors.incompatibleOverride}
                </p>
              )}
            </div>
          )}

          {groupingDecision.status === 'reviewCarefully' && (
            <div className="rounded-[4px] border border-[#E2A336] bg-[rgba(255, 222, 0, 0.14)] px-[10px] py-[8px]">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#AB6400]">
                Review mixed fields before saving to ensure this grouping still represents one logical Funding Action.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border border-[#CDCED6] rounded-[5px]">
          <div className="px-[12px] py-[10px] border-b border-[#CDCED6]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] uppercase tracking-[0.5px] text-[#1C2024]">
              Selected APM Plans
            </p>
          </div>
          <div className="max-h-[220px] overflow-auto">
            <div className="grid bg-[#f9f9fb] border-b border-[#CDCED6]" style={{ gridTemplateColumns: '120px 90px 150px 150px 150px 1fr 140px 140px 120px' }}>
              <SelectedHeaderCell label="Task ID" />
              <SelectedHeaderCell label="Year" />
              <SelectedHeaderCell label="Activity" />
              <SelectedHeaderCell label="Project" />
              <SelectedHeaderCell label="RBE" />
              <SelectedHeaderCell label="Task Title" />
              <SelectedHeaderCell label="Increment" align="right" />
              <SelectedHeaderCell label="Reimbursable" align="right" />
              <SelectedHeaderCell label="Direct Cite" align="right" />
            </div>
            {selectedRows.map((row) => (
              <div
                key={row.id}
                className="grid border-b border-[#CDCED6] hover:bg-[#fafafa]"
                style={{ gridTemplateColumns: '120px 90px 150px 150px 150px 1fr 140px 140px 120px' }}
              >
                <SelectedCell>{row.taskId}</SelectedCell>
                <SelectedCell>{row.year}</SelectedCell>
                <SelectedCell>{row.activity}</SelectedCell>
                <SelectedCell>{row.project}</SelectedCell>
                <SelectedCell>{row.rbe}</SelectedCell>
                <SelectedCell>{row.taskTitle}</SelectedCell>
                <SelectedCell align="right">{formatCurrency(row.incrementTotal)}</SelectedCell>
                <SelectedCell align="right">{formatCurrency(row.reimbursableAmount)}</SelectedCell>
                <SelectedCell align="right">{formatCurrency(row.directCiteAmount)}</SelectedCell>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#CDCED6] rounded-[5px] px-[16px] py-[16px] grid gap-[16px]">
          <div>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] uppercase tracking-[0.5px] text-[#1C2024] mb-[8px]">
              Funding Action Target
            </p>
            <div className="flex flex-wrap gap-[8px]">
              {targetTypeOptions.map((option) => {
                const isActive = formState.targetType === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => onFieldChange('targetType', option.value)}
                    className={`h-[30px] px-[10px] rounded-[4px] border transition-colors ${
                      isActive ? 'border-[#004B72] bg-[rgba(20,125,185,0.09)]' : 'border-[#B9BBC6] bg-white hover:bg-[#f9f9fb]'
                    }`}
                  >
                    <span className={`font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] ${isActive ? 'text-[#004B72]' : 'text-[#1C2024]'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-[12px]" style={{ gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))' }}>
            <WorkspaceField
              label={targetReferenceLabel}
              value={formState.targetReference}
              onChange={(value) => onFieldChange('targetReference', value, { markTargetEdited: true })}
              placeholder={
                formState.targetType === 'existingDraft'
                  ? 'e.g., FD-2026-041 (Draft)'
                  : formState.targetType === 'newAmendment'
                    ? 'e.g., FD-2025-188'
                    : 'e.g., Surface Warfare Batch A'
              }
              error={formErrors.targetReference}
              helperText={
                formState.targetType === 'newDocument'
                  ? `Suggested: ${suggestedDraftGroupName || 'Draft Funding Action'}`
                  : undefined
              }
            />
            <WorkspaceField
              label="Assignee"
              value={formState.assignee}
              onChange={(value) => onFieldChange('assignee', value)}
              placeholder="Select or enter assignee"
              error={formErrors.assignee}
            />
            <WorkspaceField
              label="PR Number"
              value={formState.prNumber}
              onChange={(value) => onFieldChange('prNumber', value)}
              placeholder="e.g., PR-2026-1142"
              error={formErrors.prNumber}
            />
            <WorkspaceField
              label="Standard Document Number"
              value={formState.standardDocumentNumber}
              onChange={(value) => onFieldChange('standardDocumentNumber', value)}
              placeholder="e.g., SDN-420-2026-09"
            />
            <WorkspaceField
              label="Amendment Number"
              value={formState.amendmentNumber}
              onChange={(value) => onFieldChange('amendmentNumber', value)}
              placeholder="e.g., A-01"
              error={formErrors.amendmentNumber}
              disabled={formState.targetType !== 'newAmendment'}
            />
            <WorkspaceField
              label="ACRN"
              value={formState.acrn}
              onChange={(value) => onFieldChange('acrn', value)}
              placeholder="e.g., AA"
              error={formErrors.acrn}
            />
            <WorkspaceField
              label="WBS"
              value={formState.wbs}
              onChange={(value) => onFieldChange('wbs', value)}
              placeholder="e.g., 1.2.4.7"
              error={formErrors.wbs}
            />
            <WorkspaceField
              label="Program Official"
              value={formState.programOfficial}
              onChange={(value) => onFieldChange('programOfficial', value)}
              placeholder="Enter program official"
              error={formErrors.programOfficial}
            />
          </div>
        </div>

        <div className="grid gap-[8px]">
          {groupingDecision.status === 'likelyIncompatible' && (
            <div className="rounded-[4px] border border-[#EB8E90] bg-[rgba(243,0,13,0.04)] px-[10px] py-[6px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#CE2C31]">
                Cannot save draft until the critical-conflict override is acknowledged above.
              </p>
            </div>
          )}
          <div className="flex items-center justify-start gap-[8px]">
          <button
            onClick={onCancel}
            className="bg-white h-[32px] px-[12px] rounded-[4px] border border-[#004B72] hover:bg-[#f5f5f5] transition-colors"
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#004B72]">
              Cancel
            </span>
          </button>
          <button
            onClick={onSave}
            disabled={saveDisabled}
            className={`h-[32px] px-[12px] rounded-[4px] border transition-colors ${
              saveDisabled
                ? 'bg-[#8b8d98] border-[#8b8d98] cursor-not-allowed'
                : 'bg-[#004B72] border-[#004B72] hover:bg-[#003d5c]'
            }`}
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white">
              Save Draft Funding Action
            </span>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-[#CDCED6] rounded-[5px] px-[12px] py-[10px]">
      <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#60646C] mb-[2px]">
        {label}
      </p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px] text-[#1C2024]">
        {value}
      </p>
    </div>
  );
}

function SelectedHeaderCell({ label, align }: { label: string; align?: 'right' }) {
  return (
    <div className={`px-[10px] py-[8px] flex items-center ${align === 'right' ? 'justify-end text-right' : ''}`}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] leading-[16px] uppercase tracking-[0.4px] text-[#1C2024]">
        {label}
      </p>
    </div>
  );
}

function SelectedCell({ children, align }: { children: string; align?: 'right' }) {
  return (
    <div className={`px-[10px] py-[8px] flex items-center min-w-0 ${align === 'right' ? 'justify-end text-right' : ''}`}>
      <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024] truncate">
        {children}
      </p>
    </div>
  );
}

function AnalysisSection({
  title,
  tone,
  emptyMessage,
  items,
  compact = false,
}: {
  title: string;
  tone: 'success' | 'warning' | 'info' | 'error';
  emptyMessage: string;
  items: { label: string; value: string }[];
  compact?: boolean;
}) {
  const toneStyles: Record<'success' | 'warning' | 'info' | 'error', { border: string; text: string; bg: string }> = {
    success: { border: '#5BB98B', text: '#218358', bg: '#FFFFFF' },
    warning: { border: '#E2A336', text: '#AB6400', bg: '#FFFFFF' },
    info: { border: '#60B3D7', text: '#00749E', bg: '#FFFFFF' },
    error: { border: '#EB8E90', text: '#CE2C31', bg: '#FFFFFF' },
  };
  const style = toneStyles[tone];

  return (
    <div className="rounded-[4px] border px-[8px] py-[6px]" style={{ borderColor: style.border, backgroundColor: style.bg }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[12px] leading-[16px] mb-[4px]" style={{ color: style.text }}>
        {title}
      </p>
      {items.length === 0 ? (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C]">
          {emptyMessage}
        </p>
      ) : (
        <div className={`grid ${compact ? 'gap-[2px]' : 'gap-[3px]'}`}>
          {items.map((item) => (
            <div key={`${title}-${item.label}`} className="min-w-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#1C2024] truncate">
                {item.label}
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C] truncate">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkspaceField({
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024]">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`h-[32px] px-[10px] rounded-[4px] border font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] outline-none transition-colors ${
          disabled
            ? 'border-[#CDCED6] bg-[#f5f5f7] text-[#8B8D98] placeholder:text-[#8B8D98] cursor-not-allowed'
            : error
              ? 'border-[#EB8E90] text-[#1C2024] placeholder:text-[#80838D] focus:border-[#CE2C31]'
              : 'border-[#B9BBC6] text-[#1C2024] placeholder:text-[#80838D] focus:border-[#147DB9]'
        }`}
      />
      {error && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#CE2C31]">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C]">
          {helperText}
        </p>
      )}
    </div>
  );
}

function FlatPlansTable({
  rows,
  selectedIds,
  allVisibleSelected,
  onToggleAll,
  onToggleRow,
}: {
  rows: IncomingPlanRow[];
  selectedIds: Set<string>;
  allVisibleSelected: boolean;
  onToggleAll: () => void;
  onToggleRow: (rowId: string) => void;
}) {
  const GRID_COLS = '48px 170px 160px 90px 150px 130px 170px 180px 100px 110px 250px 130px 145px 130px 120px';
  const [collapsedGroupIds, setCollapsedGroupIds] = useState<Set<string>>(new Set());

  const displayItems = useMemo(() => {
    const groupById = new Map<string, { id: string; label: string; rows: IncomingPlanRow[] }>();
    const items: Array<
      | { type: 'standalone'; row: IncomingPlanRow }
      | { type: 'group'; group: { id: string; label: string; rows: IncomingPlanRow[] } }
    > = [];

    rows.forEach((row) => {
      if (!row.fundingActionId || !row.fundingActionLabel) {
        items.push({ type: 'standalone', row });
        return;
      }

      const existingGroup = groupById.get(row.fundingActionId);
      if (existingGroup) {
        existingGroup.rows.push(row);
        return;
      }

      const nextGroup = {
        id: row.fundingActionId,
        label: row.fundingActionLabel,
        rows: [row],
      };
      groupById.set(row.fundingActionId, nextGroup);
      items.push({ type: 'group', group: nextGroup });
    });

    return items;
  }, [rows]);

  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroupIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(groupId)) {
        updated.delete(groupId);
      } else {
        updated.add(groupId);
      }
      return updated;
    });
  };

  const headerCell = (label: string, align?: 'right') => (
    <div className={`px-[12px] py-[12px] flex items-center min-w-0 ${align === 'right' ? 'justify-end text-right' : ''}`}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] whitespace-nowrap">
        {label}
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-b-[5px] border border-[#CDCED6] border-t-0 w-full overflow-x-auto">
      <div className="min-w-[2080px]">
        <div className="bg-[#f9f9fb] border-b border-[#CDCED6] w-full grid" style={{ gridTemplateColumns: GRID_COLS }}>
          <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={onToggleAll}
              aria-label="Select all visible plans"
              className="h-[16px] w-[16px] accent-[#147DB9] cursor-pointer"
            />
          </div>
          {headerCell('Status')}
          {headerCell('Assignee')}
          {headerCell('Year')}
          {headerCell('Activity')}
          {headerCell('RBE')}
          {headerCell('Project')}
          {headerCell('Line of Accounting')}
          {headerCell('R3CC')}
          {headerCell('Task ID')}
          {headerCell('Task Title')}
          {headerCell('Increment Total', 'right')}
          {headerCell('Reimbursable', 'right')}
          {headerCell('Direct Cite', 'right')}
          {headerCell('Need Date')}
        </div>

        {rows.length === 0 ? (
          <div className="w-full border-b border-[#CDCED6] px-[16px] py-[20px]">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C]">
              No plans match the current filters.
            </p>
          </div>
        ) : (
          displayItems.map((item) => {
            if (item.type === 'standalone') {
              const row = item.row;
              const selected = selectedIds.has(row.id);
              return (
                <PlanDataRow
                  key={row.id}
                  row={row}
                  selected={selected}
                  onToggleRow={onToggleRow}
                  isGroupedChild={false}
                  gridCols={GRID_COLS}
                />
              );
            }

            const { group } = item;
            const isExpanded = !collapsedGroupIds.has(group.id);
            const childCount = group.rows.length;
            const groupIncrementTotal = group.rows.reduce((total, row) => total + row.incrementTotal, 0);

            return (
              <div key={group.id}>
                <div
                  className="w-full border-b border-[#CDCED6] bg-[#f6f9fc] grid"
                  style={{ gridTemplateColumns: GRID_COLS }}
                >
                  <div className="px-[12px] py-[10px] flex items-center justify-center min-w-0">
                    <button
                      onClick={() => toggleGroupCollapse(group.id)}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${group.id}`}
                      className="h-[22px] w-[22px] rounded-[4px] border border-[#B9BBC6] bg-white text-[#004B72] text-[12px] leading-none cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                    >
                      {isExpanded ? '▾' : '▸'}
                    </button>
                  </div>
                  <div className="px-[12px] py-[10px] flex items-center gap-[10px] min-w-0 flex-wrap" style={{ gridColumn: '2 / -1' }}>
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#004B72] uppercase tracking-[0.3px]">
                      Draft Funding Action
                    </span>
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024]">
                      {group.id}
                    </span>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#1C2024] truncate">
                      {group.label}
                    </span>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C] whitespace-nowrap">
                      {childCount} APM Plan{childCount === 1 ? '' : 's'}
                    </span>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C] whitespace-nowrap">
                      {formatCurrency(groupIncrementTotal)} increment
                    </span>
                  </div>
                </div>

                {isExpanded &&
                  group.rows.map((row) => {
                    const selected = selectedIds.has(row.id);
                    return (
                      <PlanDataRow
                        key={row.id}
                        row={row}
                        selected={selected}
                        onToggleRow={onToggleRow}
                        isGroupedChild
                        gridCols={GRID_COLS}
                      />
                    );
                  })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function PlanDataRow({
  row,
  selected,
  onToggleRow,
  isGroupedChild,
  gridCols,
}: {
  row: IncomingPlanRow;
  selected: boolean;
  onToggleRow: (rowId: string) => void;
  isGroupedChild: boolean;
  gridCols: string;
}) {
  return (
    <div
      className={`w-full border-b border-[#CDCED6] hover:bg-[#fafafa] transition-colors grid ${
        selected ? 'bg-[rgba(20,125,185,0.06)]' : isGroupedChild ? 'bg-[#fcfdff]' : ''
      }`}
      style={{ gridTemplateColumns: gridCols }}
    >
      <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
        {isGroupedChild ? (
          <div className="flex items-center gap-[8px] pl-[8px]">
            <span aria-hidden="true" className="h-[1px] w-[10px] bg-[#CDCED6]" />
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggleRow(row.id)}
              aria-label={`Select ${row.taskId}`}
              className="h-[16px] w-[16px] accent-[#147DB9] cursor-pointer"
            />
          </div>
        ) : (
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleRow(row.id)}
            aria-label={`Select ${row.taskId}`}
            className="h-[16px] w-[16px] accent-[#147DB9] cursor-pointer"
          />
        )}
      </div>
      <div className="px-[12px] py-[12px] flex items-center min-w-0">
        <StatusPill status={row.status} />
      </div>
      <DataCell>{row.assignee}</DataCell>
      <DataCell>{row.year}</DataCell>
      <DataCell>{row.activity}</DataCell>
      <DataCell>{row.rbe}</DataCell>
      <DataCell>{row.project}</DataCell>
      <DataCell>{row.lineOfAccounting}</DataCell>
      <DataCell>{row.r3cc}</DataCell>
      <DataCell>{row.taskId}</DataCell>
      <DataCell>{row.taskTitle}</DataCell>
      <DataCell align="right">{formatCurrency(row.incrementTotal)}</DataCell>
      <DataCell align="right">{formatCurrency(row.reimbursableAmount)}</DataCell>
      <DataCell align="right">{formatCurrency(row.directCiteAmount)}</DataCell>
      <DataCell>{row.needDate}</DataCell>
    </div>
  );
}

function DataCell({
  children,
  align,
}: {
  children: string;
  align?: 'right';
}) {
  return (
    <div className={`px-[12px] py-[12px] flex items-center min-w-0 ${align === 'right' ? 'justify-end text-right' : ''}`}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
        {children}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: ProcessingStatus }) {
  const config: Record<ProcessingStatus, { bg: string; text: string; label: string }> = {
    waiting: {
      bg: 'rgba(255, 222, 0, 0.24)',
      text: '#AB6400',
      label: 'Waiting to Be Assigned',
    },
    assigned: {
      bg: 'rgba(20, 125, 185, 0.12)',
      text: '#004B72',
      label: 'Assigned',
    },
    inProgress: {
      bg: 'rgba(20, 125, 185, 0.09)',
      text: '#004B72',
      label: 'In Progress',
    },
    complete: {
      bg: 'rgba(0, 179, 238, 0.12)',
      text: '#00749E',
      label: 'Complete',
    },
  };

  return (
    <div
      className="inline-flex items-center px-[10px] h-[28px] rounded-[100px] whitespace-nowrap"
      style={{ backgroundColor: config[status].bg }}
    >
      <span className="font-['Inter:Bold',sans-serif] font-bold text-[13px] leading-[18px]" style={{ color: config[status].text }}>
        {config[status].label}
      </span>
    </div>
  );
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
