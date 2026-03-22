import { useState, useRef, useCallback, useMemo, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import VersionDropdown from './VersionDropdown';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import svgPaths from '../imports/svg-3n0pbju9jx';
import { useColumnSort, SortIndicator } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { ChevronDown, ChevronRight, SearchIcon } from './InlineIcons';

// ─── Icon Components ────────────────────────────────────────────────────

function GripVertical({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 14" fill="none">
      <circle cx="3" cy="2" r="1.2" fill="currentColor" />
      <circle cx="7" cy="2" r="1.2" fill="currentColor" />
      <circle cx="3" cy="7" r="1.2" fill="currentColor" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" />
      <circle cx="3" cy="12" r="1.2" fill="currentColor" />
      <circle cx="7" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ChevronsUpIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M12 11L8 7L4 11M12 5L8 1L4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronsDownIcon({ className }: { className?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 5L8 9L12 5M4 11L8 15L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Types ──────────────────────────────────────────────────────────────

interface LeafRecord {
  id: string;
  activity: string;
  project: string;
  bs: string;
  document: string;
  acrn: string;
  taskLabel: string;
  approved: number;
  authorized: number;
  delta: number;
  commitments: number;
  obligations: number;
  expenditures: number;
  projectStructure: string;
  psCommitments: number;
  psObligations: number;
  psExpenditures: number;
}

interface GroupNode {
  compositeKey: string;
  dimensionLabel: string;
  dimensionValue: string;
  level: number;
  children: GroupNode[];
  leafRecords: LeafRecord[];
  isLastDimension: boolean;
}

// ─── Constants ──────────────────────────────────────────────────────────

const DIMENSION_KEY_MAP: Record<string, keyof LeafRecord> = {
  Activity: 'activity',
  Project: 'project',
  BS: 'bs',
  Document: 'document',
  ACRN: 'acrn',
};

const SUPPORTED_GROUPINGS = new Set(['Activity', 'Project', 'BS', 'Document', 'ACRN']);

const GRID_TEMPLATE =
  'minmax(280px, 3fr) minmax(110px, 1fr) minmax(110px, 1fr) minmax(110px, 1fr) minmax(110px, 1fr) minmax(110px, 1fr) minmax(110px, 1fr) minmax(160px, 1.5fr) minmax(110px, 1fr) minmax(110px, 1fr) minmax(110px, 1fr)';

const FLAT_DATA: LeafRecord[] = [
  {
    id: 'task-1-1361',
    activity: 'NSWC PC',
    project: 'MCM MP',
    bs: 'BS-8/42026 1211111',
    document: 'N00042426I02785',
    acrn: 'ACRN AA',
    taskLabel: '1-1361 (TY26) - MCM Tactics and Analysis',
    approved: 2862648,
    authorized: 1121059,
    delta: 850089,
    commitments: 0,
    obligations: 0,
    expenditures: 0,
    projectStructure: '100002739127 0001\n100002739127 0002',
    psCommitments: 0,
    psObligations: 11,
    psExpenditures: 264870,
  },
  {
    id: 'task-1-1367',
    activity: 'NSWC PC',
    project: 'MCM MP',
    bs: 'BS-8/42026 1211111',
    document: 'N00042426I02785',
    acrn: 'ACRN AA',
    taskLabel: '1-1367 (TY26) - MCM New and Future Capabilities Support',
    approved: 2434356,
    authorized: 973742,
    delta: 837562,
    commitments: 0,
    obligations: 0,
    expenditures: 0,
    projectStructure: '100002739123 0008\n100002739126 0001',
    psCommitments: 0,
    psObligations: 0,
    psExpenditures: 136180,
  },
  {
    id: 'task-1-1449',
    activity: 'NSWC PC',
    project: 'MCM MP',
    bs: 'BS-8/42026 1211111',
    document: 'N00042426I02785',
    acrn: 'ACRN AA',
    taskLabel: '1-1449 (TY26) - MCM MP Deployment Support',
    approved: 753716,
    authorized: 313487,
    delta: 273093,
    commitments: 0,
    obligations: 0,
    expenditures: 0,
    projectStructure: '100002739160 0012\n100002739121 0002',
    psCommitments: 0,
    psObligations: 0,
    psExpenditures: 40394,
  },
  {
    id: 'task-1-1368',
    activity: 'NSWC PC',
    project: 'MCM MP',
    bs: 'BS-8/42026 1212111',
    document: 'N00042426I02785',
    acrn: 'ACRN AB',
    taskLabel: '1-1368 (TY26) - MCM MP Test Support',
    approved: 1267277,
    authorized: 764650,
    delta: 731824,
    commitments: 0,
    obligations: 0,
    expenditures: 0,
    projectStructure: '100002739128 0001',
    psCommitments: 0,
    psObligations: 0,
    psExpenditures: 32826,
  },
];

// ─── Utility Functions ──────────────────────────────────────────────────

function formatCurrency(value: number): string {
  if (value === 0) return '\u2014';
  return '$' + value.toLocaleString('en-US');
}

function formatCount(value: number): string {
  if (value === 0) return '\u2014';
  return value.toLocaleString('en-US');
}

function buildGroupedTree(
  records: LeafRecord[],
  dimensions: string[],
  level: number = 0,
  parentKey: string = ''
): GroupNode[] {
  if (level >= dimensions.length || records.length === 0) return [];

  const dimName = dimensions[level];
  const dimKey = DIMENSION_KEY_MAP[dimName];

  // Group records by dimension value (preserve insertion order)
  const groups = new Map<string, LeafRecord[]>();
  records.forEach((r) => {
    const val = r[dimKey] as string;
    if (!groups.has(val)) groups.set(val, []);
    groups.get(val)!.push(r);
  });

  const isLastDimension = level === dimensions.length - 1;

  return Array.from(groups.entries()).map(([value, recs]) => {
    const compositeKey = parentKey
      ? `${parentKey}|${dimName}:${value}`
      : `${dimName}:${value}`;

    return {
      compositeKey,
      dimensionLabel: dimName,
      dimensionValue: value,
      level,
      children: isLastDimension
        ? []
        : buildGroupedTree(recs, dimensions, level + 1, compositeKey),
      leafRecords: recs,
      isLastDimension,
    };
  });
}

function aggregateRecords(records: LeafRecord[]) {
  return {
    approved: records.reduce((s, r) => s + r.approved, 0),
    authorized: records.reduce((s, r) => s + r.authorized, 0),
    delta: records.reduce((s, r) => s + r.delta, 0),
    commitments: records.reduce((s, r) => s + r.commitments, 0),
    obligations: records.reduce((s, r) => s + r.obligations, 0),
    expenditures: records.reduce((s, r) => s + r.expenditures, 0),
    psCommitments: records.reduce((s, r) => s + r.psCommitments, 0),
    psObligations: records.reduce((s, r) => s + r.psObligations, 0),
    psExpenditures: records.reduce((s, r) => s + r.psExpenditures, 0),
  };
}

function getAllGroupKeys(nodes: GroupNode[]): string[] {
  const keys: string[] = [];
  const traverse = (items: GroupNode[]) => {
    items.forEach((node) => {
      keys.push(node.compositeKey);
      if (node.children.length > 0) traverse(node.children);
    });
  };
  traverse(nodes);
  return keys;
}

// ─── Main Component ────────────────────────────────────────────────────

export default function GInvoicingReport() {
  // ─── Filter State ──────────��───────────────────────────────────────────
  const DEFAULT_GROUPING = ['Activity', 'Project', 'BS', 'Document', 'ACRN'];
  const DEFAULT_AVAILABLE = ['PE/BLI', 'Functional Area', 'DR Number'];
  const [groupingOrder, setGroupingOrder] = useState<string[]>(DEFAULT_GROUPING);
  const [availableGroupings, setAvailableGroupings] = useState<string[]>(DEFAULT_AVAILABLE);
  const [activityFilter, setActivityFilter] = useState('All Activities');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [fundingDocFilter, setFundingDocFilter] = useState('All Funding Documents');
  const [budgetStructureFilter, setBudgetStructureFilter] = useState('All Budget Structures');
  const [acrnFilter, setAcrnFilter] = useState('All ACRNs');
  const [taskFilter, setTaskFilter] = useState('All Tasks');
  const [projectStructureFilter, setProjectStructureFilter] = useState('All Project Structures');
  const [mappedTasksOnly, setMappedTasksOnly] = useState(false);
  const [yearFilter, setYearFilter] = useState<'active' | 'all'>('active');
  const [searchValue, setSearchValue] = useState('');

  // ─── Grouped Tree ─────────────────────────────────────────────────────
  // Filter to supported groupings only for table rendering (safety for new unsupported items)
  const effectiveGrouping = useMemo(
    () => groupingOrder.filter(g => SUPPORTED_GROUPINGS.has(g)),
    [groupingOrder]
  );

  const groupedTree = useMemo(
    () => buildGroupedTree(FLAT_DATA, effectiveGrouping),
    [effectiveGrouping]
  );

  // ─── Row Selection State ────────────────────────────────────────────────
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  // ─── Expansion State ──────────────────────────────────────────────────
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(getAllGroupKeys(groupedTree))
  );

  const toggleExpansion = useCallback((key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // ─── Expand All / Collapse All ─────────────────────────────────────────
  const allGroupKeys = useMemo(() => getAllGroupKeys(groupedTree), [groupedTree]);
  const allExpanded = allGroupKeys.length > 0 && allGroupKeys.every((k) => expandedKeys.has(k));

  const toggleAll = useCallback(() => {
    if (allExpanded) {
      setExpandedKeys(new Set());
    } else {
      setExpandedKeys(new Set(allGroupKeys));
    }
  }, [allExpanded, allGroupKeys]);

  // ─── Column Sorting ─────────────────────────────────────────────────────
  type ReconSortCol = 'approved' | 'authorized' | 'delta' | 'commitments' | 'obligations' | 'expenditures' | 'projectStructure' | 'psCommitments' | 'psObligations' | 'psExpenditures';
  const RECON_NUMERIC: ReconSortCol[] = ['approved', 'authorized', 'delta', 'commitments', 'obligations', 'expenditures', 'psCommitments', 'psObligations', 'psExpenditures'];
  const { handleSort: reconHandleSort, getDirection: reconGetDir, sortColumn: reconSortCol, sortDirection: reconSortDir } = useColumnSort<ReconSortCol>();

  const sortLeafRecords = useCallback((records: LeafRecord[]): LeafRecord[] => {
    if (!reconSortCol || !reconSortDir) return records;
    return [...records].sort((a, b) => {
      const aVal = a[reconSortCol];
      const bVal = b[reconSortCol];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        const result = aVal - bVal;
        return reconSortDir === 'asc' ? result : -result;
      }
      const result = String(aVal ?? '').localeCompare(String(bVal ?? ''));
      return reconSortDir === 'asc' ? result : -result;
    });
  }, [reconSortCol, reconSortDir]);

  // ─── Regroup Feedback ─────────────────────────────────────────────────
  const [tableFlash, setTableFlash] = useState(false);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const prevGroupingRef = useRef<string>(effectiveGrouping.join(','));
  const isFirstRender = useRef(true);

  useEffect(() => {
    const currentKey = effectiveGrouping.join(',');
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevGroupingRef.current = currentKey;
      return;
    }
    if (prevGroupingRef.current !== currentKey) {
      prevGroupingRef.current = currentKey;

      // Expand all levels of the already-computed tree
      setExpandedKeys(new Set(getAllGroupKeys(groupedTree)));

      // Flash feedback
      setTableFlash(true);
      const timeout = setTimeout(() => setTableFlash(false), 200);

      // Scroll table container to top
      if (tableScrollRef.current) {
        tableScrollRef.current.scrollTop = 0;
      }

      return () => clearTimeout(timeout);
    }
  }, [effectiveGrouping, groupedTree]);

  // ─── Drag-and-Drop ────────────────────────────────────────────────────
  const onPillMove = useCallback(
    (dragLabel: string, dragLane: 'active' | 'available', dragIndex: number, hoverLane: 'active' | 'available', hoverIndex: number) => {
      if (dragLane === hoverLane) {
        // Same-lane reorder
        const setter = dragLane === 'active' ? setGroupingOrder : setAvailableGroupings;
        setter((prev) => {
          const next = [...prev];
          const [removed] = next.splice(dragIndex, 1);
          next.splice(hoverIndex, 0, removed);
          return next;
        });
      } else {
        // Cross-lane move
        const sourceSetter = dragLane === 'active' ? setGroupingOrder : setAvailableGroupings;
        const targetSetter = hoverLane === 'active' ? setGroupingOrder : setAvailableGroupings;
        sourceSetter((prev) => prev.filter((_, i) => i !== dragIndex));
        targetSetter((prev) => {
          const next = [...prev];
          next.splice(hoverIndex, 0, dragLabel);
          return next;
        });
      }
    },
    []
  );

  // Lane-level drop handler (for dropping at end of a lane)
  const onLaneDrop = useCallback(
    (dragLabel: string, dragLane: 'active' | 'available', dragIndex: number, targetLane: 'active' | 'available') => {
      if (dragLane === targetLane) return;
      const sourceSetter = dragLane === 'active' ? setGroupingOrder : setAvailableGroupings;
      const targetSetter = targetLane === 'active' ? setGroupingOrder : setAvailableGroupings;
      sourceSetter((prev) => prev.filter((_, i) => i !== dragIndex));
      targetSetter((prev) => [...prev, dragLabel]);
    },
    []
  );

  const handleClearFilters = () => {
    setActivityFilter('All Activities');
    setProjectFilter('All Projects');
    setFundingDocFilter('All Funding Documents');
    setBudgetStructureFilter('All Budget Structures');
    setAcrnFilter('All ACRNs');
    setTaskFilter('All Tasks');
    setProjectStructureFilter('All Project Structures');
    setMappedTasksOnly(false);
    setYearFilter('active');
    setGroupingOrder(DEFAULT_GROUPING);
    setAvailableGroupings(DEFAULT_AVAILABLE);
  };

  // ─── Cell Styles ──────────────────────────────────────────────────────
  const groupCellBase = (_level: number) =>
    `px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)]`;
  const groupLabelClass = (level: number): string => {
    if (level === 0) return "font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[20px] text-[#1C2024] truncate";
    if (level <= 2) return "font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024] truncate";
    return "font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] truncate";
  };
  const leafCellBase =
    `px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)]`;
  const valueTextClass =
    "font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]";

  // ─── Render Functions ─────────────────────────────────────────────────

  const renderGroupNode = (node: GroupNode): JSX.Element[] => {
    const isExpanded = expandedKeys.has(node.compositeKey);
    const indentPx = node.level * 20;
    const agg = aggregateRecords(node.leafRecords);

    const isGroupSelected = selectedRowId === node.compositeKey;

    const elements: JSX.Element[] = [
      <div
        key={node.compositeKey}
        className={`grid cursor-pointer transition-colors ${
          isGroupSelected
            ? 'bg-[rgba(0,75,114,0.04)] hover:bg-[rgba(0,75,114,0.07)]'
            : 'bg-white hover:bg-[#f9f9fb]'
        }`}
        style={{
          gridColumn: '1 / -1',
          gridTemplateColumns: 'subgrid',
          boxShadow: isGroupSelected ? 'inset 3px 0 0 0 #004b72' : 'none',
        }}
        onClick={() => setSelectedRowId(node.compositeKey)}
      >
        {/* Label cell */}
        <div
          className={`${groupCellBase(node.level)} flex items-center min-w-0`}
        >
          <div
            style={{ marginLeft: `${indentPx}px` }}
            className="flex items-center gap-[8px] min-w-0 w-full"
          >
            <button
              onClick={() => toggleExpansion(node.compositeKey)}
              className="w-[16px] h-[16px] flex items-center justify-center text-[#1C2024] hover:text-[#000000] cursor-pointer flex-shrink-0 bg-transparent border-none p-0"
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            <span className={groupLabelClass(node.level)}>
              {node.dimensionLabel}: {node.dimensionValue}
            </span>
          </div>
        </div>

        {/* Approved */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>{formatCurrency(agg.approved)}</span>
        </div>
        {/* Authorized */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(agg.authorized)}
          </span>
        </div>
        {/* Delta */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>{formatCurrency(agg.delta)}</span>
        </div>
        {/* Commitments */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(agg.commitments)}
          </span>
        </div>
        {/* Obligations */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(agg.obligations)}
          </span>
        </div>
        {/* Expenditures */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(agg.expenditures)}
          </span>
        </div>
        {/* Project Structure */}
        <div className={`${groupCellBase(node.level)} text-left`}>
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C]">
            {'\u2014'}
          </span>
        </div>
        {/* PS Commitments */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(agg.psCommitments)}
          </span>
        </div>
        {/* PS Obligations */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>
            {formatCount(agg.psObligations)}
          </span>
        </div>
        {/* PS Expenditures */}
        <div className={`${groupCellBase(node.level)} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(agg.psExpenditures)}
          </span>
        </div>
      </div>,
    ];

    if (isExpanded) {
      if (node.isLastDimension) {
        // Render leaf task rows (sorted if active sort)
        sortLeafRecords(node.leafRecords).forEach((leaf) => {
          elements.push(...renderLeafRow(leaf, node.level + 1));
        });
      } else {
        // Render child groups
        node.children.forEach((child) => {
          elements.push(...renderGroupNode(child));
        });
      }
    }

    return elements;
  };

  const renderLeafRow = (
    leaf: LeafRecord,
    indentLevel: number
  ): JSX.Element[] => {
    const indentPx = indentLevel * 20;
    const isLeafSelected = selectedRowId === leaf.id;

    return [
      <div
        key={leaf.id}
        className={`grid cursor-pointer transition-colors ${
          isLeafSelected
            ? 'bg-[rgba(0,75,114,0.04)] hover:bg-[rgba(0,75,114,0.07)]'
            : 'bg-white hover:bg-[#f9f9fb]'
        }`}
        style={{
          gridColumn: '1 / -1',
          gridTemplateColumns: 'subgrid',
          boxShadow: isLeafSelected ? 'inset 3px 0 0 0 #004b72' : 'none',
        }}
        onClick={() => setSelectedRowId(leaf.id)}
      >
        {/* Label cell */}
        <div
          className={`${leafCellBase} flex items-center min-w-0`}
        >
          <div
            style={{ marginLeft: `${indentPx}px` }}
            className="flex items-center gap-[8px] min-w-0 w-full"
          >
            <div className="w-[16px] flex-shrink-0" />
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] break-words">
              {leaf.taskLabel}
            </span>
          </div>
        </div>

        {/* Approved */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(leaf.approved)}
          </span>
        </div>
        {/* Authorized */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(leaf.authorized)}
          </span>
        </div>
        {/* Delta */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>{formatCurrency(leaf.delta)}</span>
        </div>
        {/* Commitments */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(leaf.commitments)}
          </span>
        </div>
        {/* Obligations */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(leaf.obligations)}
          </span>
        </div>
        {/* Expenditures */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(leaf.expenditures)}
          </span>
        </div>
        {/* Project Structure */}
        <div className={`${leafCellBase} text-left`}>
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C] whitespace-pre-line">
            {leaf.projectStructure}
          </span>
        </div>
        {/* PS Commitments */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(leaf.psCommitments)}
          </span>
        </div>
        {/* PS Obligations */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCount(leaf.psObligations)}
          </span>
        </div>
        {/* PS Expenditures */}
        <div className={`${leafCellBase} text-right`}>
          <span className={valueTextClass}>
            {formatCurrency(leaf.psExpenditures)}
          </span>
        </div>
      </div>,
    ];
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header Section */}
      <div className="bg-white px-[24px] pt-[24px]">
        <div className="flex flex-col gap-[16px]">
          {/* Row 1: Version Dropdown */}
          <div className="flex items-center gap-[8px]">
            <VersionDropdown />
          </div>

          {/* Row 2: Content Header - Title, Subtitle, and Breadcrumbs */}
          <div className="relative flex flex-col gap-[12px] py-[16px]">
            {/* Decorative divider lines */}
            <div
              aria-hidden="true"
              className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none"
            />

            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Inter',sans-serif] font-semibold text-[32px] leading-[40px] text-[#1C2024] tracking-[0px]">
                Reconciliation Report
              </h1>
              <p className="font-['Inter',sans-serif] font-medium text-[18px] leading-[24px] text-[#60646C] tracking-[0px]">
                Agreement and Invoice Reconciliation
              </p>
            </div>

            {/* Breadcrumbs */}
            <SyncPointBreadcrumb items={[
              { label: 'Home', path: '/' },
              { label: 'Execution Planning', path: '/execution-planning/dashboard' },
              { label: 'Reconciliation Report' },
            ]} />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <DndProvider backend={HTML5Backend}>
        <div className="px-[24px] py-[24px]">
          <CollapsibleFilterSection highContrast>
            <div className="flex flex-wrap gap-[16px] items-end">
              {/* Grouping – Two Lane */}
              <div className="flex shrink-0">
                {/* Active Grouping Lane */}
                <div className="flex flex-col gap-[8px]">
                  <div className="flex gap-[8px] items-center">
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-black">
                      Active Grouping
                    </span>
                    <GroupingInfoIcon />
                  </div>
                  <GroupingLane
                    lane="active"
                    items={groupingOrder}
                    onPillMove={onPillMove}
                    onLaneDrop={onLaneDrop}
                    roundedSide="left"
                  />
                </div>
                {/* Available Groupings Lane */}
                <div className="flex flex-col gap-[8px]">
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-black">
                    Available Groupings
                  </span>
                  <GroupingLane
                    lane="available"
                    items={availableGroupings}
                    onPillMove={onPillMove}
                    onLaneDrop={onLaneDrop}
                    roundedSide="right"
                  />
                </div>
              </div>

              {/* Dropdown Filters */}
              <FilterSelect
                label="Activity"
                value={activityFilter}
                onChange={setActivityFilter}
                options={[
                  'All Activities',
                  'NSWC PC',
                  'NSWC PHD',
                  'Northrop Grumman',
                  'Booz Allen Hamilton',
                  'Lockheed Martin',
                  'Raytheon Technologies',
                  'General Dynamics',
                  'LCS Program Office',
                  'FFG Program Office',
                  'PMS 420',
                  'PMS 495',
                  'PMS 501',
                ]}
              />
              <FilterSelect
                label="Project"
                value={projectFilter}
                onChange={setProjectFilter}
                options={[
                  'All Projects',
                  'MCM MP',
                  'LCS MP',
                  'FFG MP',
                  'DDG Modernization',
                  'Submarine Combat Systems',
                  'Expeditionary Warfare',
                  'Carrier Systems Integration',
                  'Unmanned Surface Systems',
                  'Cybersecurity Enhancement',
                  'Radar Modernization',
                  'Fleet Sustainment',
                ]}
              />
              <FilterSelect
                label="Funding Document"
                value={fundingDocFilter}
                onChange={setFundingDocFilter}
                options={[
                  'All Funding Documents',
                  'FD-2024-001',
                  'FD-2024-002',
                  'FD-2024-003',
                  'FD-2024-004',
                  'FD-2024-005',
                  'FD-2023-017',
                  'FD-2023-021',
                  'FD-2023-045',
                  'FD-2022-112',
                  'FD-2022-118',
                  'FD-2021-090',
                ]}
                width={203}
              />
              <FilterSelect
                label="Budget Structure"
                value={budgetStructureFilter}
                onChange={setBudgetStructureFilter}
                options={[
                  'All Budget Structures',
                  'BS-8/42026 121111',
                  'BS-8/42026 121211',
                  'BS-8/42026 131111',
                  'BS-8/42026 131211',
                  'BS-8/42026 141111',
                  'BS-8/42026 141211',
                  'BS-8/42027 121111',
                  'BS-8/42027 121211',
                  'BS-8/42027 131111',
                  'BS-8/42027 131211',
                ]}
                width={190}
              />
              <FilterSelect
                label="ACRN"
                value={acrnFilter}
                onChange={setAcrnFilter}
                options={[
                  'All ACRNs',
                  'ACRN AA',
                  'ACRN AB',
                  'ACRN AC',
                  'ACRN AD',
                  'ACRN AE',
                  'ACRN AF',
                  'ACRN AG',
                  'ACRN AH',
                  'ACRN AJ',
                  'ACRN AK',
                ]}
              />
              <FilterSelect
                label="Task"
                value={taskFilter}
                onChange={setTaskFilter}
                options={[
                  'All Tasks',
                  '1-1361',
                  '1-1367',
                  '1-1368',
                  '1-1449',
                  '1-1450',
                  '1-1451',
                  '1-1452',
                  '2-2101',
                  '2-2105',
                  '3-3010',
                  '3-3015',
                  '4-4100',
                ]}
              />
              <FilterSelect
                label="Project Structure"
                value={projectStructureFilter}
                onChange={setProjectStructureFilter}
                options={[
                  'All Project Structures',
                  '100002739127',
                  '100002739123',
                  '100002739128',
                  '100002739129',
                  '100002739130',
                  '100002739131',
                  '100002739132',
                  '100002739133',
                  '100002739134',
                  '100002739135',
                ]}
                width={194}
              />

              {/* Inline Secondary Controls */}
              <div className="flex items-center gap-0 self-end h-[32px] shrink-0">
                {/* Mapped Tasks Only checkbox */}
                <label className="flex items-center gap-[8px] h-[32px] pr-[12px] cursor-pointer select-none">
                  <div className="flex items-center h-[20px]">
                    <div
                      className="relative w-[16px] h-[16px] rounded-[3px] shrink-0"
                      style={{
                        backgroundColor: mappedTasksOnly
                          ? '#004B72'
                          : '#f9f9fb',
                      }}
                    >
                      {!mappedTasksOnly && (
                        <div
                          aria-hidden="true"
                          className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-[3px]"
                        />
                      )}
                      {mappedTasksOnly && (
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={mappedTasksOnly}
                    onChange={(e) => setMappedTasksOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024]">
                    Mapped Tasks Only
                  </span>
                </label>

                {/* Radio group with left/right borders */}
                <div className="flex items-center gap-[12px] h-[32px] px-[24px] relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none border-l border-r border-solid border-[#e8e8ec]"
                  />
                  {/* Active Years radio */}
                  <label className="flex items-center gap-[8px] cursor-pointer select-none">
                    <input
                      type="radio"
                      name="yearFilter"
                      value="active"
                      checked={yearFilter === 'active'}
                      onChange={() => setYearFilter('active')}
                      className="sr-only"
                    />
                    <div className="flex items-center h-[20px]">
                      <div className="relative w-[16px] h-[16px] shrink-0">
                        {yearFilter === 'active' ? (
                          <svg
                            className="block w-full h-full"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path d={svgPaths.p36ca9a00} fill="#004B72" />
                            <circle cx="8" cy="8" r="3" fill="white" />
                          </svg>
                        ) : (
                          <div className="w-full h-full rounded-full bg-[#f9f9fb] relative">
                            <div
                              aria-hidden="true"
                              className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024]">
                      Active Years
                    </span>
                  </label>
                  {/* All radio */}
                  <label className="flex items-center gap-[8px] cursor-pointer select-none">
                    <input
                      type="radio"
                      name="yearFilter"
                      value="all"
                      checked={yearFilter === 'all'}
                      onChange={() => setYearFilter('all')}
                      className="sr-only"
                    />
                    <div className="flex items-center h-[20px]">
                      <div className="relative w-[16px] h-[16px] shrink-0">
                        {yearFilter === 'all' ? (
                          <svg
                            className="block w-full h-full"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path d={svgPaths.p36ca9a00} fill="#004B72" />
                            <circle cx="8" cy="8" r="3" fill="white" />
                          </svg>
                        ) : (
                          <div className="w-full h-full rounded-full bg-[#f9f9fb] relative">
                            <div
                              aria-hidden="true"
                              className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024]">
                      All
                    </span>
                  </label>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={handleClearFilters}
                  className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,75,114,0.35)]"
                  style={{ color: '#004B72' }}
                >
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
                    Clear Filters
                  </span>
                </button>
              </div>
            </div>
          </CollapsibleFilterSection>
        </div>
      </DndProvider>

      {/* Hierarchical Financial Table */}
      <div className="px-[24px] pb-[24px]">
        <div
          className={`border border-[#e0e1e6] rounded-[5px] overflow-hidden transition-opacity duration-200 ${
            tableFlash ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {/* Standardized Title Header — matches G-Invoicing / APM Acceptance pattern */}
          <div className="bg-[#f9f9fb] relative w-full">
            <div className="flex items-center px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#d0d1d6]">
              <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
                <p className="font-['Inter',sans-serif] font-semibold leading-[24px] not-italic text-[#1c2024] text-[18px] tracking-[0px] whitespace-nowrap">
                  Cost Element
                </p>
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
                <button
                  className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-transparent border-none text-[#1C2024] hover:text-[#000000] transition-colors"
                  onClick={toggleAll}
                >
                  <ChevronsDownIcon className={`transition-transform duration-200 ${allExpanded ? '' : '-rotate-90'}`} />
                  <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
                    {allExpanded ? 'Collapse All' : 'Expand All'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div ref={tableScrollRef} className="overflow-x-auto">
            <div style={{ minWidth: '1400px' }}>
              {/* Table Header with Column Groups */}
              <div
                className="grid bg-[rgba(0,0,85,0.02)]"
                style={{ gridTemplateColumns: GRID_TEMPLATE }}
              >
                {/* Empty cell above Cost Element (grouping row) */}
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(0,0,85,0.02)]"></div>

                {/* Task Planning / Funding Work Plan Group Header - spans 3 columns */}
                <div
                  className="px-[12px] py-[8px] border-b-[3px] border-[#147db9] bg-[rgba(20,125,185,0.05)] flex items-center"
                  style={{ gridColumn: 'span 3' }}
                >
                  <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#147db9]">
                    Task Planning / Funding Work Plan
                  </span>
                </div>

                {/* Budget Structure Reporting Group Header - spans 3 columns */}
                <div
                  className="px-[12px] py-[8px] border-b-[3px] border-[#e67e22] bg-[rgba(230,126,34,0.05)] flex items-center"
                  style={{ gridColumn: 'span 3' }}
                >
                  <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#e67e22]">
                    Budget Structure Reporting
                  </span>
                </div>

                {/* Project Structure Reporting Group Header - spans 4 columns */}
                <div
                  className="px-[12px] py-[8px] border-b-[3px] border-[#ab6400] bg-[rgba(255,222,0,0.1)] flex items-center"
                  style={{ gridColumn: 'span 4' }}
                >
                  <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#ab6400]">
                    Project Structure Reporting
                  </span>
                </div>

                {/* Cost Element column label (aligned with column header row) */}
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(0,0,85,0.02)] flex items-center">
                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                    Cost Element
                  </span>
                </div>

                {/* Task Planning / Funding Work Plan Column Headers */}
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(20,125,185,0.02)] cursor-pointer select-none hover:bg-[rgba(20,125,185,0.06)] flex items-center justify-end" onClick={() => reconHandleSort('approved')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('approved'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Approved
                    </span>
                    <SortIndicator direction={reconGetDir('approved')} inactiveColor="#1C2024" />
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(20,125,185,0.02)] cursor-pointer select-none hover:bg-[rgba(20,125,185,0.06)] flex items-center justify-end" onClick={() => reconHandleSort('authorized')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('authorized'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Assigned
                    </span>
                    <SortIndicator direction={reconGetDir('authorized')} inactiveColor="#1C2024" />
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(20,125,185,0.02)] cursor-pointer select-none hover:bg-[rgba(20,125,185,0.06)] flex items-center justify-end" onClick={() => reconHandleSort('delta')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('delta'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Delta
                    </span>
                    <DeltaInfoIcon />
                    <SortIndicator direction={reconGetDir('delta')} inactiveColor="#1C2024" />
                  </div>
                </div>

                {/* Budget Structure Reporting Column Headers */}
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(230,126,34,0.02)] cursor-pointer select-none hover:bg-[rgba(230,126,34,0.06)] flex items-center justify-end" onClick={() => reconHandleSort('commitments')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('commitments'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Commitments
                    </span>
                    <SortIndicator direction={reconGetDir('commitments')} inactiveColor="#1C2024" />
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(230,126,34,0.02)] cursor-pointer select-none hover:bg-[rgba(230,126,34,0.06)] flex items-center justify-end" onClick={() => reconHandleSort('obligations')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('obligations'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Gross Obligations
                    </span>
                    <SortIndicator direction={reconGetDir('obligations')} inactiveColor="#1C2024" />
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(230,126,34,0.02)] cursor-pointer select-none hover:bg-[rgba(230,126,34,0.06)] flex items-center justify-end" onClick={() => reconHandleSort('expenditures')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('expenditures'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Expenditures
                    </span>
                    <SortIndicator direction={reconGetDir('expenditures')} inactiveColor="#1C2024" />
                  </div>
                </div>

                {/* Project Structure Reporting Column Headers */}
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(255,222,0,0.05)] cursor-pointer select-none hover:bg-[rgba(255,222,0,0.12)] flex items-center" onClick={() => reconHandleSort('projectStructure')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('projectStructure'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Project structure
                    </span>
                    <SortIndicator direction={reconGetDir('projectStructure')} inactiveColor="#1C2024" />
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(255,222,0,0.05)] cursor-pointer select-none hover:bg-[rgba(255,222,0,0.12)] flex items-center justify-end" onClick={() => reconHandleSort('psCommitments')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('psCommitments'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Commitments
                    </span>
                    <SortIndicator direction={reconGetDir('psCommitments')} inactiveColor="#1C2024" />
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(255,222,0,0.05)] cursor-pointer select-none hover:bg-[rgba(255,222,0,0.12)] flex items-center justify-end" onClick={() => reconHandleSort('psObligations')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('psObligations'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Obligations
                    </span>
                    <SortIndicator direction={reconGetDir('psObligations')} inactiveColor="#1C2024" />
                  </div>
                </div>
                <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] bg-[rgba(255,222,0,0.05)] cursor-pointer select-none hover:bg-[rgba(255,222,0,0.12)] flex items-center justify-end" onClick={() => reconHandleSort('psExpenditures')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reconHandleSort('psExpenditures'); } }}>
                  <div className="flex items-center gap-[6px]">
                    <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                      Expenditures
                    </span>
                    <SortIndicator direction={reconGetDir('psExpenditures')} inactiveColor="#1C2024" />
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div
                className="grid"
                style={{ gridTemplateColumns: GRID_TEMPLATE }}
              >
                {groupedTree.map((node) => renderGroupNode(node))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grouping Info Icon ──────────────────────────────────────────────────

function GroupingInfoIcon() {
  const [showTooltip, setShowTooltip] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (showTooltip && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [showTooltip]);

  return (
    <div
      ref={triggerRef}
      className="relative shrink-0 cursor-help"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="block">
        <path
          d="M8.16667 10.8333V8.16667M8.16667 5.5H8.17333M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z"
          stroke="#006496"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showTooltip && createPortal(
        <div
          className="fixed pointer-events-none"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: 'translate(-50%, -100%)',
            paddingBottom: '6px',
            zIndex: 1000,
          }}
        >
          <div className="bg-[#1c2024] text-white text-[12px] leading-[16px] px-[10px] py-[6px] rounded-[4px] whitespace-nowrap font-['Inter:Regular',sans-serif] font-normal relative">
            Drag items to Active to group the table. Reorder to set grouping priority.
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#1c2024]" />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Delta Info Icon ──────────────────────────────────────────────────

function DeltaInfoIcon() {
  const [showTooltip, setShowTooltip] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (showTooltip && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [showTooltip]);

  return (
    <div
      ref={triggerRef}
      className="relative shrink-0 cursor-help"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="img"
      aria-label="Delta: Assigned minus Project Structure Expenditures"
    >
      <svg width={14} height={14} viewBox="0 0 16 16" fill="none" className="block">
        <path
          d="M8.16667 10.8333V8.16667M8.16667 5.5H8.17333M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z"
          stroke="#006496"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showTooltip && createPortal(
        <div
          className="fixed pointer-events-none"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: 'translate(-50%, -100%)',
            paddingBottom: '6px',
            zIndex: 1000,
          }}
        >
          <div className="bg-[#1c2024] text-white text-[12px] leading-[16px] px-[10px] py-[6px] rounded-[4px] whitespace-nowrap font-['Inter:Regular',sans-serif] font-normal relative">
            Assigned - Project Structure Expenditures
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#1c2024]" />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Grouping Lane (Drop Zone) ──────────────────────────────────────────

const GROUPING_PILL_TYPE = 'GROUPING_PILL';

interface DragItem {
  label: string;
  lane: 'active' | 'available';
  index: number;
}

interface GroupingLaneProps {
  lane: 'active' | 'available';
  items: string[];
  onPillMove: (dragLabel: string, dragLane: 'active' | 'available', dragIndex: number, hoverLane: 'active' | 'available', hoverIndex: number) => void;
  onLaneDrop: (dragLabel: string, dragLane: 'active' | 'available', dragIndex: number, targetLane: 'active' | 'available') => void;
  roundedSide: 'left' | 'right';
}

function GroupingLane({ lane, items, onPillMove, onLaneDrop, roundedSide }: GroupingLaneProps) {
  const [{ isOver }, drop] = useDrop({
    accept: GROUPING_PILL_TYPE,
    drop: (item: DragItem) => {
      if (item.lane !== lane) {
        onLaneDrop(item.label, item.lane, item.index, lane);
        item.lane = lane;
        item.index = items.length;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const roundedClass = roundedSide === 'left'
    ? 'rounded-tl-[5px] rounded-bl-[5px]'
    : 'rounded-tr-[5px] rounded-br-[5px]';

  const borderClass = roundedSide === 'left'
    ? 'border-r border-[#646464]'
    : 'border-l border-[#646464]';

  const paddingClass = roundedSide === 'left'
    ? 'pl-[4px] pr-[16px]'
    : 'pl-[16px] pr-[4px]';

  return (
    <div
      ref={drop as any}
      className={`bg-[rgba(0,0,45,0.09)] ${roundedClass} relative min-h-[32px] transition-colors ${isOver ? 'bg-[rgba(0,75,114,0.12)]' : ''}`}
    >
      <div aria-hidden="true" className={`absolute ${borderClass} border-solid inset-0 pointer-events-none ${roundedClass}`} />
      <div className={`flex gap-[12px] items-center ${paddingClass} py-[4px] h-full min-w-[60px]`}>
        {items.map((label, index) => (
          <DraggableGroupingPill
            key={label}
            label={label}
            index={index}
            lane={lane}
            variant={lane}
            onPillMove={onPillMove}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Draggable Grouping Pill ─────────────────────────────────────────────

interface DraggableGroupingPillProps {
  label: string;
  index: number;
  lane: 'active' | 'available';
  variant: 'active' | 'available';
  onPillMove: (dragLabel: string, dragLane: 'active' | 'available', dragIndex: number, hoverLane: 'active' | 'available', hoverIndex: number) => void;
}

function DraggableGroupingPill({
  label,
  index,
  lane,
  variant,
  onPillMove,
}: DraggableGroupingPillProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: GROUPING_PILL_TYPE,
    item: (): DragItem => ({ label, lane, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: GROUPING_PILL_TYPE,
    hover: (item: DragItem) => {
      if (item.lane === lane && item.index === index) return;
      onPillMove(item.label, item.lane, item.index, lane, index);
      item.lane = lane;
      item.index = index;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const isActive = variant === 'active';

  return (
    <div
      ref={ref}
      className={`${isActive ? 'bg-[#e7f2ff]' : 'bg-white'} flex items-center gap-[4px] h-[24px] pl-[4px] pr-[8px] rounded-[3px] shrink-0 relative select-none`}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: 'grab',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isDragging
          ? '0 4px 12px rgba(0,0,0,0.2)'
          : isOver
            ? '0 0 0 2px rgba(0,75,114,0.4)'
            : 'none',
        transition:
          'transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute border border-solid inset-0 pointer-events-none rounded-[3px]"
        style={{
          borderColor: isOver
            ? 'rgba(0,75,114,0.5)'
            : isActive
              ? '#147db9'
              : '#b9bbc6',
        }}
      />
      <span className="text-[#8b8d98] flex items-center">
        <GripVertical size={10} />
      </span>
      <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1c2024] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

// ─── Filter Select ───────────────────────────────────────────────────────

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  width?: number;
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  width = 167,
}: FilterSelectProps) {
  return (
    <div
      className="flex flex-col gap-[8px] items-start shrink-0"
      style={{ width: `${width}px` }}
    >
      <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1c2024] whitespace-nowrap">
        {label}
      </span>
      <div className="relative w-full h-[32px]">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white h-[32px] w-full pl-[12px] pr-[32px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024] cursor-pointer appearance-none overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' } as React.CSSProperties}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-[#1C2024]"
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}