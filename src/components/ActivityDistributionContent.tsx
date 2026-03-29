import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from './VersionDropdown';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { useColumnSort, SortIndicator, compareValues } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { ChevronDown, ChevronRight, ChevronsDown, ClockIcon, SearchIcon } from './InlineIcons';

interface ActivityRow {
  id: string;
  plan: string;
  activity: string;
  fundingSource: string;
  project: string;
  appnYear: string;
  purpose: string;
  needDates: string;
  funding: string;
  health?: string;
  healthColor?: string;
  healthBg?: string;
}

interface EditableFields {
  reAmount: string;
  dcAmount: string;
  rbe: string;
  valueStatement: string;
}

type SubtableData = Record<string, EditableFields>;
type AllEditableData = Record<string, SubtableData>;

const INITIAL_EDITABLE_DATA: AllEditableData = {
  'act-1': {
    'det-1': { reAmount: '', dcAmount: '', rbe: '', valueStatement: '' },
    'det-2': { reAmount: '', dcAmount: '', rbe: '', valueStatement: '' },
    'det-3': { reAmount: '', dcAmount: '', rbe: '', valueStatement: '' },
  },
};

function computeDirtyRows(current: AllEditableData, initial: AllEditableData): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  for (const parentId of Object.keys(initial)) {
    const currentSub = current[parentId];
    const initialSub = initial[parentId];
    if (!currentSub || !initialSub) {
      result[parentId] = false;
      continue;
    }
    let dirty = false;
    for (const subId of Object.keys(initialSub)) {
      const c = currentSub[subId];
      const i = initialSub[subId];
      if (!c || !i) continue;
      if (c.reAmount !== i.reAmount || c.dcAmount !== i.dcAmount || c.rbe !== i.rbe || c.valueStatement !== i.valueStatement) {
        dirty = true;
        break;
      }
    }
    result[parentId] = dirty;
  }
  return result;
}

export default function ActivityDistributionContent() {
  // Deep-clone initial data for snapshot
  const [initialSnapshot, setInitialSnapshot] = useState<AllEditableData>(() =>
    JSON.parse(JSON.stringify(INITIAL_EDITABLE_DATA))
  );
  const [currentData, setCurrentData] = useState<AllEditableData>(() =>
    JSON.parse(JSON.stringify(INITIAL_EDITABLE_DATA))
  );

  const rowDirty = useMemo(() => computeDirtyRows(currentData, initialSnapshot), [currentData, initialSnapshot]);
  const globalDirty = useMemo(() => Object.values(rowDirty).some(Boolean), [rowDirty]);
  const dirtyCount = useMemo(() => Object.values(rowDirty).filter(Boolean).length, [rowDirty]);

  const handleFieldChange = useCallback((parentId: string, subId: string, field: keyof EditableFields, value: string) => {
    setCurrentData(prev => ({
      ...prev,
      [parentId]: {
        ...prev[parentId],
        [subId]: {
          ...prev[parentId]?.[subId],
          [field]: value,
        },
      },
    }));
  }, []);

  const handleSaveRow = useCallback((parentId: string) => {
    // Update snapshot to match current for this row
    setInitialSnapshot(prev => ({
      ...prev,
      [parentId]: JSON.parse(JSON.stringify(currentData[parentId])),
    }));
  }, [currentData]);

  const handleSaveAll = useCallback(() => {
    setInitialSnapshot(JSON.parse(JSON.stringify(currentData)));
  }, [currentData]);

  const handleResetAll = useCallback(() => {
    setCurrentData(JSON.parse(JSON.stringify(initialSnapshot)));
  }, [initialSnapshot]);
  
  const tableData: ActivityRow[] = [
    {
      id: 'act-1',
      plan: 'INC-014 • MVCS Tech Refresh Procure',
      activity: 'BLI 1210/H0014 (Standard Boats) (FY24)',
      fundingSource: '1B1B/ C011B1O-SO',
      project: 'Gun Module',
      appnYear: 'AY25',
      purpose: 'Contract Award',
      needDates: 'RE: 1 Jan 2025\\nDC: 1 Aug 2025',
      funding: '$50,000,000',
      health: 'On Track',
      healthColor: '#218358',
      healthBg: 'rgba(0, 164, 51, 0.1)',
    },
    {
      id: 'act-2',
      plan: 'INC-022 • Production Engineering',
      activity: 'BLI 1600/LM008 - MPCE (FY24)',
      fundingSource: '1C1C/ C01C9-00',
      project: 'SUW MP Sustainment',
      appnYear: 'AY26',
      purpose: 'Avoid Cost Growth',
      needDates: 'RE: 1 Feb 2025\\\\nDC: 1 Sep 2025',
      funding: '$30,000,000',
      health: 'At Risk',
      healthColor: '#ab6400',
      healthBg: 'rgba(255, 222, 0, 0.24)',
    },
    {
      id: 'act-3',
      plan: 'INC-031 • STC-#2 Procurement',
      activity: 'BLI 1601/MC002 - MCM (FY24)',
      fundingSource: '1D4D/ C01C9L-HL',
      project: 'MPAS',
      appnYear: 'AY26',
      purpose: 'FY27 Q3 Deploy',
      needDates: 'RE: 1 Dec 2025\\nDC: 1 Jun 2026',
      funding: '$15,000,000',
      health: 'Past',
      healthColor: 'rgba(196, 0, 6, 0.83)',
      healthBg: 'rgba(243, 0, 13, 0.08)',
    },
    {
      id: 'act-4',
      plan: 'INC-064 • Mission Module Display',
      activity: 'BLI 1603/SU002 - SSMM (FY24)',
      fundingSource: '0605513N/ 3067',
      project: 'MPCE',
      appnYear: 'AY25',
      purpose: 'Update Supplies',
      needDates: 'RE: 1 Jan 2025\\nDC: 6 Aug 2025',
      funding: '$10,000,000',
      health: 'Completed',
      healthColor: '#00749e',
      healthBg: 'rgba(0, 179, 238, 0.12)',
    },
    {
      id: 'act-5',
      plan: 'INC-071 • Mission Package Support',
      activity: 'BLI 1603/SU004 - SUW MP (FY24)',
      fundingSource: '0605512N/ 3428',
      project: 'SSSM',
      appnYear: 'AY25',
      purpose: 'Increase Capacity',
      needDates: 'RE: 1 Feb 2025\\nDC: 1 Sep 2025',
      funding: '$25,000,000',
      health: 'On Track',
      healthColor: '#218358',
      healthBg: 'rgba(0, 164, 51, 0.1)',
    },
  ];

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="flex flex-col items-start pl-[24px] pr-[24px] pt-[24px] pb-[72px] w-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <PageHeader />
          <FiltersRow />
          <KPICards />
          <ActivitiesTable
            tableData={tableData}
            currentData={currentData}
            initialSnapshot={initialSnapshot}
            rowDirty={rowDirty}
            onFieldChange={handleFieldChange}
            onSaveRow={handleSaveRow}
          />
        </div>
      </div>
      <FooterActions globalDirty={globalDirty} dirtyCount={dirtyCount} onSaveAll={handleSaveAll} onResetAll={handleResetAll} />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="page-header">
      <PeVersionBar />
      <PePageHeader />
    </div>
  );
}

function PeVersionBar() {
  return (
    <div className="content-stretch flex items-start justify-between overflow-clip py-[12px] relative shrink-0 w-full" data-name="pe-version-bar">
      <VersionDropdown />
      <ButtonRow />
    </div>
  );
}

function ButtonRow() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="button-row">
      <Link 
        to="/apm-distribution"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">← Back to APM Distribution</p>
        </div>
      </Link>
      <Link 
        to="/apm-acceptance"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Go to APM Acceptance →</p>
        </div>
      </Link>
      <button 
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Export</p>
        </div>
      </button>
    </div>
  );
}

function PePageHeader() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="pe-page-header">
      <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <HeaderAndSubtitle />
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Execution Planning', path: '/execution-planning/dashboard' },
          { label: 'Activity Distribution' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        Activity Distribution
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Plan task distributions.
      </p>
    </div>
  );
}

function FiltersRow() {
  const [program, setProgram] = useState('All Projects');
  const [appropriation, setAppropriation] = useState('All Appropriations');
  const [appropriationYear, setAppropriationYear] = useState('All Fiscal Years');
  const [fundingSource, setFundingSource] = useState('All Funding Sources');
  const [yearFilter, setYearFilter] = useState<'active' | 'all'>('active');

  const handleClearFilters = () => {
    setProgram('All Projects');
    setAppropriation('All Appropriations');
    setAppropriationYear('All Fiscal Years');
    setFundingSource('All Funding Sources');
    setYearFilter('active');
  };

  return (
    <CollapsibleFilterSection highContrast>
      <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-name="left-filters">
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Fiscal Year</p>
          <SearchableFilterDropdown value={appropriationYear} onChange={setAppropriationYear} options={['All Fiscal Years', 'FY24', 'FY25', 'FY26', 'FY27']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Appropriation</p>
          <SearchableFilterDropdown value={appropriation} onChange={setAppropriation} options={['All Appropriations', 'O&MN', 'RDTEN', 'OPN', 'SCN', 'WPN']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Funding Source</p>
          <SearchableFilterDropdown value={fundingSource} onChange={setFundingSource} options={['All Funding Sources', 'BLI 1210/H0014', 'BLI 1600/LM008', 'BLI 1601/MC002']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Project</p>
          <SearchableFilterDropdown value={program} onChange={setProgram} options={['All Projects', 'LCS', 'DDG', 'CVN']} />
        </div>
        {/* Active Years / All Radio Toggle */}
        <div className="flex items-center gap-[12px] h-[32px] px-[24px] relative">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none border-l border-r border-solid border-[#e8e8ec]" />
          <label className="flex items-center gap-[8px] cursor-pointer select-none">
            <input type="radio" name="yearFilter" value="active" checked={yearFilter === 'active'} onChange={() => setYearFilter('active')} className="sr-only" />
            <div className="flex items-center h-[20px]">
              <div className="relative w-[16px] h-[16px] shrink-0">
                {yearFilter === 'active' ? (
                  <svg className="block w-full h-full" viewBox="0 0 16 16" fill="none">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0V0C12.4183 0 16 3.58172 16 8V8C16 12.4183 12.4183 16 8 16V16C3.58172 16 0 12.4183 0 8V8Z" fill="#004B72" />
                    <circle cx="8" cy="8" r="3" fill="white" />
                  </svg>
                ) : (
                  <div className="w-full h-full rounded-full bg-[#f9f9fb] relative">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-full" />
                  </div>
                )}
              </div>
            </div>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024]">Active Years</span>
          </label>
          <label className="flex items-center gap-[8px] cursor-pointer select-none">
            <input type="radio" name="yearFilter" value="all" checked={yearFilter === 'all'} onChange={() => setYearFilter('all')} className="sr-only" />
            <div className="flex items-center h-[20px]">
              <div className="relative w-[16px] h-[16px] shrink-0">
                {yearFilter === 'all' ? (
                  <svg className="block w-full h-full" viewBox="0 0 16 16" fill="none">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0V0C12.4183 0 16 3.58172 16 8V8C16 12.4183 12.4183 16 8 16V16C3.58172 16 0 12.4183 0 8V8Z" fill="#004B72" />
                    <circle cx="8" cy="8" r="3" fill="white" />
                  </svg>
                ) : (
                  <div className="w-full h-full rounded-full bg-[#f9f9fb] relative">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-full" />
                  </div>
                )}
              </div>
            </div>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024]">All</span>
          </label>
        </div>
        <button 
          onClick={handleClearFilters}
          className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,75,114,0.35)]"
          data-name="clear-filters-button"
          style={{ color: '#004B72' }}
        >
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
            Clear Filters
          </span>
        </button>
      </div>
    </CollapsibleFilterSection>
  );
}

function KPICards() {
  return (
    <div className="grid gap-[24px] items-stretch relative w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
      <KPICard
        label={<>Total Value of Distribution</>}
        value="$1,227,295"
        detail="From APM Distribution"
        accentColor="#004b72"
      />
      <KPICard
        label={<>Total Approved Tasking</>}
        value="$591,893"
        pillText="48% Distributed"
        helperText="Requires attention"
        accentColor="#004b72"
      />
      <KPICard
        label={<>Remaining</>}
        value="$635,402"
        detail="To be distributed"
        accentColor="#004b72"
      />
      <KPICard
        label={<>Total Increments</>}
        value="$591,893"
        detail="From APM Distribution"
        accentColor="#004b72"
      />
    </div>
  );
}

function KPICard({
  label,
  value,
  detail,
  accentColor,
  highlight = false,
  pillText,
  helperText,
}: {
  label: React.ReactNode;
  value: string;
  detail?: React.ReactNode;
  accentColor: string;
  highlight?: boolean;
  pillText?: string;
  helperText?: string;
}) {
  return (
    <div className="content-stretch flex items-stretch relative rounded-[5px] shrink-0" style={{ minWidth: '185px' }}>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-stretch self-stretch">
        <div className="h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" style={{ backgroundColor: accentColor }} />
      </div>
      <div className="flex flex-1 w-full min-w-0 flex-col gap-[8px] items-start not-italic p-[24px] relative whitespace-pre-wrap">
        <div className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#60646c] w-full text-[16px]">
          {label}
        </div>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[32px] text-black tracking-[-1px] w-full">
          {value}
        </p>
        {pillText ? (
          <div className="mt-auto w-full">
            <div className="bg-[rgba(255,222,0,0.24)] content-stretch flex gap-[4px] h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 w-fit">
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#ab6400] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[20px] overflow-hidden">{pillText}</p>
              </div>
            </div>
            <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
            {helperText && (
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#60646c] text-[14px] w-full">
                {helperText}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-auto w-full">
            <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
            <div className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] w-full ${highlight ? 'text-[#147db9]' : 'text-[#60646c]'}`}>
              {detail}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivitiesTable({
  tableData,
  currentData,
  initialSnapshot,
  rowDirty,
  onFieldChange,
  onSaveRow,
}: {
  tableData: ActivityRow[];
  currentData: AllEditableData;
  initialSnapshot: AllEditableData;
  rowDirty: Record<string, boolean>;
  onFieldChange: (parentId: string, subId: string, field: keyof EditableFields, value: string) => void;
  onSaveRow: (parentId: string) => void;
}) {
  const [searchValue, setSearchValue] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="table-section">
      {/* Top Surface (Header Area) */}
      <div className="bg-[#f9f9fb] relative rounded-tl-[5px] rounded-tr-[5px] w-full border border-solid border-[#e0e1e6] border-b-0">
        <div className="flex items-center px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#d0d1d6]">
          <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] whitespace-nowrap">
              Activities
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
              onClick={() => setExpandAll(!expandAll)}
            >
              <ChevronsDown size={16} className={`transition-transform duration-200 ${expandAll ? '' : '-rotate-90'}`} />
              <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
                {expandAll ? 'Collapse All' : 'Expand All'}
              </span>
            </button>
          </div>
        </div>
      </div>
      <DataTable tableData={tableData} expandAll={expandAll} currentData={currentData} initialSnapshot={initialSnapshot} rowDirty={rowDirty} onFieldChange={onFieldChange} onSaveRow={onSaveRow} />
    </div>
  );
}

function DataTable({
  tableData,
  expandAll,
  currentData,
  initialSnapshot,
  rowDirty,
  onFieldChange,
  onSaveRow,
}: {
  tableData: ActivityRow[];
  expandAll: boolean;
  currentData: AllEditableData;
  initialSnapshot: AllEditableData;
  rowDirty: Record<string, boolean>;
  onFieldChange: (parentId: string, subId: string, field: keyof EditableFields, value: string) => void;
  onSaveRow: (parentId: string) => void;
}) {
  type ADSortCol = 'plan' | 'fundingSource' | 'activity' | 'project' | 'appnYear' | 'purpose' | 'needDates' | 'funding' | 'health';
  const AD_CURRENCY: ADSortCol[] = ['funding'];
  const { handleSort, getDirection, sortColumn, sortDirection } = useColumnSort<ADSortCol>();

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return tableData;
    return [...tableData].sort((a, b) => {
      const type = AD_CURRENCY.includes(sortColumn) ? 'currency' as const : 'string' as const;
      return compareValues(
        (a as Record<string, string>)[sortColumn] ?? '',
        (b as Record<string, string>)[sortColumn] ?? '',
        type, sortDirection
      );
    });
  }, [tableData, sortColumn, sortDirection]);

  const hdr = (label: string, col: ADSortCol, align?: 'right') => (
    <div className={`px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] ${align === 'right' ? 'justify-end text-right' : ''}`} onClick={() => handleSort(col)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort(col); } }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">{label}</p>
      <SortIndicator direction={getDirection(col)} inactiveColor="#1C2024" />
    </div>
  );

  return (
    <div className="bg-white content-stretch flex flex-col items-stretch relative shrink-0 w-full min-w-0 rounded-b-[5px]" data-name="table">
      <div aria-hidden="true" className="absolute border-l border-r border-b border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-b-[5px]" />
      
      {/* Header Row */}
      <div 
        className="bg-[#f9f9fb] border-b border-[#e0e1e6] w-full grid"
        style={{ gridTemplateColumns: '48px 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 160px' }}
        data-name="table-header"
      >
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0"></div>
        {hdr('PLAN', 'plan')}
        {hdr('FUNDING SOURCE', 'fundingSource')}
        {hdr('ACTIVITY', 'activity')}
        {hdr('PROJECT', 'project')}
        {hdr('APPN YEAR', 'appnYear')}
        {hdr('PURPOSE', 'purpose')}
        {hdr('NEED DATES', 'needDates')}
        {hdr('FUNDING', 'funding', 'right')}
        {hdr('HEALTH', 'health')}
        {/* Actions column - not sortable */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">Actions</p>
        </div>
      </div>
      
      {/* Body Rows - All collapsed */}
      {sortedData.map((row) => (
        <ActivityTableRow key={row.id} row={row} expandAll={expandAll} currentData={currentData} initialSnapshot={initialSnapshot} rowDirty={rowDirty} onFieldChange={onFieldChange} onSaveRow={onSaveRow} />
      ))}
    </div>
  );
}

function ActivityTableRow({
  row,
  expandAll,
  currentData,
  initialSnapshot,
  rowDirty,
  onFieldChange,
  onSaveRow,
}: {
  row: ActivityRow;
  expandAll: boolean;
  currentData: AllEditableData;
  initialSnapshot: AllEditableData;
  rowDirty: Record<string, boolean>;
  onFieldChange: (parentId: string, subId: string, field: keyof EditableFields, value: string) => void;
  onSaveRow: (parentId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(row.id === 'act-1');
  const isExpandable = row.id === 'act-1'; // Only first row is expandable

  return (
    <>
      <div 
        className={`w-full border-b border-[#e0e1e6] hover:bg-[#fafafa] transition-colors grid ${isExpanded ? 'bg-white' : ''}`}
        style={{ gridTemplateColumns: '48px 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 160px' }}
      >
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
          {isExpandable ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer flex items-center justify-center"
              aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
            >
              {isExpanded ? (
                <ChevronDown className="size-[16px] text-[#1c2024]" />
              ) : (
                <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" />
              )}
            </button>
          ) : (
            <button
              className="cursor-pointer flex items-center justify-center"
              aria-label="Expand row"
              disabled
            >
              <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" />
            </button>
          )}
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          {rowDirty[row.id] && (
            <span className="w-[8px] h-[8px] rounded-full bg-[#004b72] shrink-0 mr-[6px]" aria-label="Unsaved changes" />
          )}
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.plan}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.activity}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.fundingSource}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.project}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.appnYear}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.purpose}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <div className="flex flex-col">
            {row.needDates.split('\\n').map((line, index) => (
              <p key={index} className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.funding}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          {row.health && (
            <div
              className="content-stretch flex gap-[4px] h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0"
              style={{ backgroundColor: row.healthBg, color: row.healthColor }}
            >
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[20px] overflow-hidden">{row.health}</p>
              </div>
            </div>
          )}
        </div>
        {/* Actions column */}
        <div className="px-[12px] py-[12px] flex items-center gap-[8px] min-w-0 whitespace-nowrap">
          {(() => {
            const isThisRowDirty = rowDirty[row.id] === true;
            return (
              <>
                <button
                  disabled={!isThisRowDirty}
                  onClick={() => isThisRowDirty && onSaveRow(row.id)}
                  className={`content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 transition-colors ${
                    isThisRowDirty
                      ? 'cursor-pointer hover:bg-[#f5f5f5]'
                      : 'cursor-default'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute border border-solid inset-0 pointer-events-none rounded-[3px] ${
                      isThisRowDirty ? 'border-[#004b72]' : 'border-[#c1c2c5]'
                    }`}
                  />
                  <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[12px] tracking-[0.04px] ${
                    isThisRowDirty ? 'text-[#004b72]' : 'text-[#8b8d98]'
                  }`}>Save</p>
                </button>
                <button
                  disabled={isThisRowDirty}
                  className={`content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 transition-colors ${
                    isThisRowDirty
                      ? 'cursor-default bg-[#8b8d98]'
                      : 'cursor-pointer bg-[#004b72] hover:bg-[#003d5c]'
                  }`}
                >
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-white text-[12px] tracking-[0.04px]">Publish</p>
                </button>
              </>
            );
          })()}
        </div>
      </div>

      {/* Expanded Detail Panel */}
      {isExpanded && isExpandable && (
        <DetailPanel
          parentId={row.id}
          currentData={currentData}
          initialSnapshot={initialSnapshot}
          rowDirty={rowDirty}
          onFieldChange={onFieldChange}
          onSaveRow={onSaveRow}
        />
      )}
    </>
  );
}

function DetailPanel({
  parentId,
  currentData,
  initialSnapshot,
  rowDirty,
  onFieldChange,
  onSaveRow,
}: {
  parentId: string;
  currentData: AllEditableData;
  initialSnapshot: AllEditableData;
  rowDirty: Record<string, boolean>;
  onFieldChange: (parentId: string, subId: string, field: keyof EditableFields, value: string) => void;
  onSaveRow: (parentId: string) => void;
}) {
  const [activities] = useState([
    { id: 'det-1', incrementLabel: '1-1014 (FY26)', name: 'Defense Technical Information Center', approvedTasking: '$720,538.00' },
    { id: 'det-2', incrementLabel: '1-1015 (FY26)', name: 'Anchor Innovation Inc', approvedTasking: '$850,420.00' },
    { id: 'det-3', incrementLabel: '1-1016 (FY26)', name: 'Re-SPLY Grintech', approvedTasking: '$650,300.00' },
  ]);

  // Helper function to parse currency string to number
  const parseCurrency = (value: string): number => {
    if (!value) return 0;
    const cleaned = value.replace(/[$,]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Helper function to format number as currency
  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculate distributed value for a given activity
  const calculateDistributed = (activityId: string): string => {
    const data = currentData[parentId]?.[activityId];
    if (!data) return '$0.00';
    
    const reAmount = parseCurrency(data.reAmount);
    const dcAmount = parseCurrency(data.dcAmount);
    const total = reAmount + dcAmount;
    
    return formatCurrency(total);
  };

  // Field-level dirty check: compare current value vs initial snapshot
  const isFieldDirty = (activityId: string, field: keyof EditableFields): boolean => {
    const current = currentData[parentId]?.[activityId]?.[field] ?? '';
    const initial = initialSnapshot[parentId]?.[activityId]?.[field] ?? '';
    return current !== initial;
  };

  return (
    <div className="w-full border-b border-[#e0e1e6]" style={{ gridColumn: '1 / -1' }}>
      <div className="bg-[rgba(20,125,185,0.09)] border-l-[6px] border-l-[#147db9] px-[24px] py-[24px]">
        {/* Activities Table */}
        <div className="bg-white rounded-[4px] border border-[rgba(0,0,47,0.15)]">
          {/* Table Header */}
          <div className="bg-[#f5f5f5] grid border-b-2 border-[rgba(0,0,47,0.15)] px-[12px] py-[12px]" style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
            <div className="flex items-center">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Tasking</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Approved Tasking</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Increments</p>
            </div>
            <div className="flex items-center justify-end text-right pr-[16px]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Distributed</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">RE Amount</p>
            </div>
            <div className="flex items-center justify-end text-right pr-[16px]">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">DC Amount</p>
            </div>
            <div className="flex items-center">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">RBE</p>
            </div>
            <div className="flex items-center">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Value Statement</p>
            </div>
          </div>

          {/* Table Rows */}
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="grid border-b border-[rgba(0,0,47,0.15)] px-[12px] py-[12px] hover:bg-[#fafafa] transition-colors"
              style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}
            >
              {/* Tasking - increment label */}
              <div className="flex items-center">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {activity.incrementLabel}
                </p>
              </div>
              
              {/* Approved Tasking - read-only currency */}
              <div className="flex items-center justify-end text-right">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  {activity.approvedTasking}
                </p>
              </div>
              
              {/* Increments - read-only $0.00 with info icon */}
              <div className="flex items-center gap-[4px] justify-end text-right">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  $0.00
                </p>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#60646C]">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="5.5" r="0.75" fill="currentColor" />
                </svg>
              </div>
              
              {/* Distributed - read-only $0.00 */}
              <div className="flex items-center justify-end text-right pr-[16px]">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  {calculateDistributed(activity.id)}
                </p>
              </div>
              
              {/* RE Amount - editable currency input */}
              <div className="flex items-center justify-end pr-[8px]">
                <div className="relative w-full">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024]">
                    $
                  </span>
                  <input
                    type="text"
                    value={currentData[parentId]?.[activity.id]?.reAmount || ''}
                    onChange={(e) => onFieldChange(parentId, activity.id, 'reAmount', e.target.value)}
                    placeholder="0.00"
                    className="w-full h-[32px] pl-[20px] pr-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] text-right placeholder:text-[#80838D] focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                    style={isFieldDirty(activity.id, 'reAmount') ? { borderLeft: '3px solid #004b72', backgroundColor: 'rgba(0, 75, 114, 0.06)' } : undefined}
                  />
                </div>
              </div>
              
              {/* DC Amount - editable currency input */}
              <div className="flex items-center justify-end pr-[16px]">
                <div className="relative w-full">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024]">
                    $
                  </span>
                  <input
                    type="text"
                    value={currentData[parentId]?.[activity.id]?.dcAmount || ''}
                    onChange={(e) => onFieldChange(parentId, activity.id, 'dcAmount', e.target.value)}
                    placeholder="0.00"
                    className="w-full h-[32px] pl-[20px] pr-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] text-right placeholder:text-[#80838D] focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                    style={isFieldDirty(activity.id, 'dcAmount') ? { borderLeft: '3px solid #004b72', backgroundColor: 'rgba(0, 75, 114, 0.06)' } : undefined}
                  />
                </div>
              </div>
              
              {/* RBE - editable text input */}
              <div className="flex items-center pr-[8px]">
                <div className="relative w-full">
                  <select
                    value={currentData[parentId]?.[activity.id]?.rbe || ''}
                    onChange={(e) => onFieldChange(parentId, activity.id, 'rbe', e.target.value)}
                    className={`w-full h-[32px] pl-[12px] pr-[32px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] cursor-pointer appearance-none bg-white ${
                      currentData[parentId]?.[activity.id]?.rbe ? 'text-[#1c2024]' : 'text-[#80838D]'
                    }`}
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none', ...(isFieldDirty(activity.id, 'rbe') ? { borderLeft: '3px solid #004b72', backgroundColor: 'rgba(0, 75, 114, 0.06)' } : {}) }}
                  >
                    <option value="" disabled hidden style={{ color: '#80838D' }}>Select RBE…</option>
                    <option value="CREATE_NEW" style={{ color: '#1c2024' }}>Create new RBE</option>
                    <option value="DR-023005.373" style={{ color: '#1c2024' }}>DR-023005.373</option>
                    <option value="DR-023099.242" style={{ color: '#1c2024' }}>DR-023099.242</option>
                    <option value="DR-060070.18" style={{ color: '#1c2024' }}>DR-060070.18</option>
                    <option value="DR-070054.81" style={{ color: '#1c2024' }}>DR-070054.81</option>
                    <option value="DR-090022.247" style={{ color: '#1c2024' }}>DR-090022.247</option>
                  </select>
                  <ChevronDown 
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-[#60646C]" 
                    size={16}
                  />
                </div>
              </div>
              
              {/* Value Statement - editable text input with placeholder */}
              <div className="flex items-center">
                <input
                  type="text"
                  value={currentData[parentId]?.[activity.id]?.valueStatement || ''}
                  onChange={(e) => onFieldChange(parentId, activity.id, 'valueStatement', e.target.value)}
                  placeholder="Add value statement…"
                  className="w-full h-[32px] px-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                  style={isFieldDirty(activity.id, 'valueStatement') ? { borderLeft: '3px solid #004b72', backgroundColor: 'rgba(0, 75, 114, 0.06)' } : undefined}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterActions({ globalDirty, dirtyCount, onSaveAll, onResetAll }: { globalDirty: boolean; dirtyCount: number; onSaveAll: () => void; onResetAll: () => void }) {
  return (
    <div className="sticky bottom-0 z-20 bg-white px-[24px] py-[12px] flex items-center justify-between border-t border-[#E0E1E6]" style={{ boxShadow: '0 -6px 16px rgba(0,0,0,0.08)' }} data-name="footer-actions">
      <div />
      <div className="flex items-center gap-[12px]">
        {globalDirty && (
          <div className="bg-[rgba(255,222,0,0.24)] content-stretch flex gap-[6px] h-[32px] items-center px-[12px] relative rounded-[100px] shrink-0">
            <ClockIcon className="text-[#ab6400] size-[16px]" />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#ab6400] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">{dirtyCount} Unsaved Changes</p>
            </div>
          </div>
        )}
        <button 
          disabled={!globalDirty}
          onClick={globalDirty ? onResetAll : undefined}
          className={`bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 transition-colors ${
            globalDirty
              ? 'cursor-pointer hover:bg-[#f5f5f5]'
              : 'cursor-default'
          }`}
          data-name="pe-button"
        >
          <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${
            globalDirty ? 'border-[#004b72]' : 'border-[#c1c2c5]'
          }`} />
          <div className={`flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${
            globalDirty ? 'text-[#004b72]' : 'text-[#8b8d98]'
          }`}>
            <p className="leading-[20px]">Reset</p>
          </div>
        </button>
        <button 
          disabled={!globalDirty}
          onClick={globalDirty ? onSaveAll : undefined}
          className={`bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 transition-colors ${
            globalDirty
              ? 'cursor-pointer hover:bg-[#f5f5f5]'
              : 'cursor-default'
          }`}
          data-name="pe-button"
        >
          <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${
            globalDirty ? 'border-[#004b72]' : 'border-[#c1c2c5]'
          }`} />
          <div className={`flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${
            globalDirty ? 'text-[#004b72]' : 'text-[#8b8d98]'
          }`}>
            <p className="leading-[20px]">Save Increments</p>
          </div>
        </button>
        <button 
          disabled={globalDirty}
          className={`content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 transition-colors ${
            globalDirty
              ? 'cursor-default bg-[#8b8d98]'
              : 'cursor-pointer bg-[#004b72] hover:bg-[#003d5c]'
          }`}
          data-name="pe-button"
        >
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-white text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Publish Increments</p>
          </div>
        </button>
      </div>
    </div>
  );
}
