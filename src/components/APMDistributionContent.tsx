import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from './VersionDropdown';
import svgPaths from '../imports/svg-7v0eexkpma';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { useColumnSort, SortIndicator, compareValues } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { ChevronDown, ChevronRight, ChevronsDown, SearchIcon } from './InlineIcons';

function MoreVertical({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="3" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Action menu icons
function PeEye() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p1917ed00} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p28db2b80} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeUndo() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p398dba80} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeDelete() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p290b3100} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface APMRow {
  id: string;
  apmPortfolio: string;
  approvedTasking: string;
  onWorkPlan: string;
  apmAuthorized: string;
  authorizedToActivities: string;
  remaining: string;
  children?: ChildRow[];
}

interface ChildRow {
  id: string;
  name: string;
  approvedTasking: string;
  onWorkPlan: string;
  apmAuthorized: string;
  subActivities?: SubActivity[];
}

interface SubActivity {
  id: string;
  name: string;
  approvedTasking: string;
  onWorkPlan: string;
  apmAuthorized: string;
  amount: string;
}

export default function APMDistributionContent() {
  const tableData: APMRow[] = [
    {
      id: 'apm-1',
      apmPortfolio: 'BLI 1210N40014 (Standard Boats) (FY24)',
      approvedTasking: '$50,000,000',
      onWorkPlan: '$50,000,000',
      apmAuthorized: '$50,000,000',
      authorizedToActivities: '$6,200,000',
      remaining: '$2,300,000',
      children: [
        {
          id: 'apm-1-child-1',
          name: 'sUSV Autonomy',
          approvedTasking: '$18,000,000',
          onWorkPlan: '$18,000,000',
          apmAuthorized: '$18,000,000',
        },
        {
          id: 'apm-1-child-2',
          name: 'sUSV Management',
          approvedTasking: '$11,000,000',
          onWorkPlan: '$11,000,000',
          apmAuthorized: '$9,000,000',
        },
        {
          id: 'apm-1-child-3',
          name: 'sUSV CyberSoftware',
          approvedTasking: '$7,000,000',
          onWorkPlan: '$7,000,000',
          apmAuthorized: '$4,000,000',
        },
      ],
    },
    {
      id: 'apm-2',
      apmPortfolio: 'BLI 1600LM008 - MPCE (FY24)',
      approvedTasking: '$30,000,000',
      onWorkPlan: '$30,000,000',
      apmAuthorized: '$7,000,000',
      authorizedToActivities: '$9,400,000',
      remaining: '$2,400,000',
      children: [
        {
          id: 'apm-2-child-1',
          name: 'MPCE Integration',
          approvedTasking: '$12,000,000',
          onWorkPlan: '$12,000,000',
          apmAuthorized: '$3,000,000',
        },
        {
          id: 'apm-2-child-2',
          name: 'MPCE Testing & Evaluation',
          approvedTasking: '$10,000,000',
          onWorkPlan: '$10,000,000',
          apmAuthorized: '$2,500,000',
        },
        {
          id: 'apm-2-child-3',
          name: 'MPCE Sustainment',
          approvedTasking: '$8,000,000',
          onWorkPlan: '$8,000,000',
          apmAuthorized: '$1,500,000',
        },
      ],
    },
    {
      id: 'apm-3',
      apmPortfolio: 'BLI 1601NM002 - MCM (FY24)',
      approvedTasking: '$15,000,000',
      onWorkPlan: '$15,000,000',
      apmAuthorized: '$5,000,000',
      authorizedToActivities: '$3,100,000',
      remaining: '$1,500,000',
      children: [
        {
          id: 'apm-3-child-1',
          name: 'MCM Mission Package',
          approvedTasking: '$9,000,000',
          onWorkPlan: '$9,000,000',
          apmAuthorized: '$3,000,000',
        },
        {
          id: 'apm-3-child-2',
          name: 'MCM Support Equipment',
          approvedTasking: '$6,000,000',
          onWorkPlan: '$6,000,000',
          apmAuthorized: '$2,000,000',
        },
      ],
    },
    {
      id: 'apm-4',
      apmPortfolio: 'BLI 1603/SU002 - SSMM (FY24)',
      approvedTasking: '$10,000,000',
      onWorkPlan: '$10,000,000',
      apmAuthorized: '$2,000,000',
      authorizedToActivities: '$11,800,000',
      remaining: '$3,200,000',
      children: [
        {
          id: 'apm-4-child-1',
          name: 'SSMM Development',
          approvedTasking: '$6,000,000',
          onWorkPlan: '$6,000,000',
          apmAuthorized: '$1,200,000',
        },
        {
          id: 'apm-4-child-2',
          name: 'SSMM Integration',
          approvedTasking: '$4,000,000',
          onWorkPlan: '$4,000,000',
          apmAuthorized: '$800,000',
        },
      ],
    },
    {
      id: 'apm-5',
      apmPortfolio: 'BLI 1603/SU004 - SUW AM (FY24)',
      approvedTasking: '$25,000,000',
      onWorkPlan: '$25,000,000',
      apmAuthorized: '$3,000,000',
      authorizedToActivities: '$7,600,000',
      remaining: '$1,800,000',
      children: [
        {
          id: 'apm-5-child-1',
          name: 'SUW AM Platform Integration',
          approvedTasking: '$15,000,000',
          onWorkPlan: '$15,000,000',
          apmAuthorized: '$1,800,000',
        },
        {
          id: 'apm-5-child-2',
          name: 'SUW AM Weapons Systems',
          approvedTasking: '$10,000,000',
          onWorkPlan: '$10,000,000',
          apmAuthorized: '$1,200,000',
        },
      ],
    },
  ];

  const handleParentValueChange = (rowId: string, newValue: string) => {
    setTableData(prevData =>
      prevData.map(row =>
        row.id === rowId ? { ...row, apmAuthorized: newValue } : row
      )
    );
  };

  const handleChildValueChange = (parentId: string, childId: string, newValue: string) => {
    setTableData(prevData =>
      prevData.map(row => {
        if (row.id === parentId && row.children) {
          return {
            ...row,
            children: row.children.map(child =>
              child.id === childId ? { ...child, apmAuthorized: newValue } : child
            ),
          };
        }
        return row;
      })
    );
  };

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="flex flex-col items-start pl-[24px] pr-[24px] pt-[24px] pb-[72px] w-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <PageHeader />
          <FiltersRow />
          <KPICards />
          <TableSection tableData={tableData} />
        </div>
      </div>
      <BottomActionArea />
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
        to="/funding-authorization"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">← Back to Funding Authorization</p>
        </div>
      </Link>
      <Link 
        to="/execution-planning/dashboard"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Go to Activity Distribution →</p>
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
          { label: 'APM Distribution' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        APM Distribution
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Enter the authorized values for each activity. Authorized values cannot exceed the control amount.
      </p>
    </div>
  );
}



function FiltersRow() {
  const [program, setProgram] = useState('All Programs');
  const [appropriation, setAppropriation] = useState('All Appropriations');
  const [appropriationYear, setAppropriationYear] = useState('All Appropriation Years');
  const [fundingSource, setFundingSource] = useState('All Funding Sources');
  const [yearFilter, setYearFilter] = useState<'active' | 'all'>('active');

  const handleClearFilters = () => {
    setProgram('All Programs');
    setAppropriation('All Appropriations');
    setAppropriationYear('All Appropriation Years');
    setFundingSource('All Funding Sources');
    setYearFilter('active');
  };

  return (
    <CollapsibleFilterSection highContrast>
      <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-name="left-filters">
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Program</p>
          <SearchableFilterDropdown value={program} onChange={setProgram} options={['All Programs', 'PMS 420', 'PMS 495', 'PMS 501']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Appropriation</p>
          <SearchableFilterDropdown value={appropriation} onChange={setAppropriation} options={['All Appropriations', 'O&MN', 'RDTEN', 'OPN', 'SCN', 'WPN']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Appropriation Year</p>
          <SearchableFilterDropdown value={appropriationYear} onChange={setAppropriationYear} options={['All Appropriation Years', 'FY24', 'FY25', 'FY26', 'FY27']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Funding Source</p>
          <SearchableFilterDropdown value={fundingSource} onChange={setFundingSource} options={['All Funding Sources', '1B1B/C011B10-SO', '1B1B/C011B10-SX', '1B1B/C011B10-SR']} />
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
    <div className="grid gap-[24px] items-stretch relative w-full" style={{ gridTemplateColumns: 'repeat(5, minmax(185px, 1fr))' }}>
      <KPICard
        label="Total"
        subtitle="ERP Authorized (YTD)"
        value="$100M"
        detail="Last sync:"
        detailValue="13 Jan 2026 08:10 ET"
        accentColor="#004b72"
      />
      <KPICard
        label="Total"
        subtitle="BFM Working Authorized"
        value="$100M"
        detail="Published + Effective:"
        detailValue="10 Jan 2026"
        accentColor="#004b72"
      />
      <KPICard
        label="Total"
        subtitle="Holdback / Reserve"
        value="$12M"
        detail="BFM Unallocated"
        detailValue=""
        accentColor="#004b72"
      />
      <KPICard
        label="Total"
        subtitle="Allocated to APMs"
        value="$70M"
        detail="Includes pending adjustments"
        detailValue=""
        accentColor="#004b72"
      />
      <KPICard
        label="Total Remaining"
        subtitle=""
        value="$18M"
        detail="Available to Allocate"
        detailValue="4% Remaining"
        accentColor="#004b72"
        highlight
      />
    </div>
  );
}

function KPICard({
  label,
  subtitle,
  value,
  detail,
  detailValue,
  accentColor,
  highlight = false,
}: {
  label: string;
  subtitle: string;
  value: string;
  detail: string;
  detailValue: string;
  accentColor: string;
  highlight?: boolean;
}) {
  // Special treatment for "Total Remaining" card (when highlight is true)
  if (highlight) {
    return (
      <div className="content-stretch flex items-stretch relative rounded-[5px] shrink-0" style={{ minWidth: '185px' }}>
        <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-stretch self-stretch">
          <div className="h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" style={{ backgroundColor: accentColor }} />
        </div>
        <div className="flex flex-1 w-full min-w-0 flex-col gap-[8px] items-start not-italic p-[24px] relative whitespace-pre-wrap">
          <div className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#60646c] text-[14px] w-full">
            <p className="mb-0">Total</p>
            <p>Remaining</p>
          </div>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[32px] text-black tracking-[-1px] w-full">
            {value}
          </p>
          <div className="mt-auto w-full">
            <div className="bg-[rgba(255,222,0,0.24)] flex gap-[4px] h-[28px] items-center px-[10px] rounded-[100px] shrink-0 w-fit">
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#ab6400] text-[14px] whitespace-nowrap">
                {detail}
              </p>
            </div>
            <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#60646c] text-[14px] w-full">
              {detailValue}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Regular KPI card treatment
  return (
    <div className="content-stretch flex items-stretch relative rounded-[5px] shrink-0" style={{ minWidth: '185px' }}>
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-stretch self-stretch">
        <div className="h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" style={{ backgroundColor: accentColor }} />
      </div>
      <div className="flex flex-1 w-full min-w-0 flex-col gap-[8px] items-start not-italic p-[24px] relative whitespace-pre-wrap">
        <div className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#60646c] text-[14px] w-full">
          {subtitle ? (
            <>
              <p className="mb-0">{label}</p>
              <p>{subtitle}</p>
            </>
          ) : (
            <p>{label}</p>
          )}
        </div>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[32px] text-black tracking-[-1px] w-full">
          {value}
        </p>
        <div className="mt-auto w-full">
          <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
          <div className={`font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#60646c] text-[14px] w-full`}>
            {detailValue ? (
              <>
                <p className="mb-0">{detail}</p>
                <p>{detailValue}</p>
              </>
            ) : (
              <p>{detail}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TableSection({
  tableData,
}: {
  tableData: APMRow[];
}) {
  const [searchValue, setSearchValue] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="content-stretch flex flex-col gap-0 items-start relative shrink-0 w-full" data-name="table-section">
      {/* Standardized Title Header — matches Dashboard / Activity Distribution / Funding Distribution / Funding Authorization / Reconciliation / APM Acceptance / G-Invoicing pattern */}
      <div className="bg-[#F9F9FB] relative rounded-tl-[5px] rounded-tr-[5px] w-full border border-solid border-[#e0e1e6] border-b-0">
        <div className="flex items-center px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#d0d1d6]">
          <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] whitespace-nowrap">
              Funding Source Authorizations
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
      <DataTable tableData={tableData} />
    </div>
  );
}

function DataTable({
  tableData,
}: {
  tableData: APMRow[];
}) {
  type APMSortCol = 'apmPortfolio' | 'approvedTasking' | 'onWorkPlan' | 'apmAuthorized';
  const APM_CURRENCY: APMSortCol[] = ['approvedTasking', 'onWorkPlan', 'apmAuthorized'];
  const { handleSort, getDirection, sortColumn, sortDirection } = useColumnSort<APMSortCol>();

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return tableData;
    return [...tableData].sort((a, b) => {
      const type = APM_CURRENCY.includes(sortColumn) ? 'currency' as const : 'string' as const;
      return compareValues(
        (a as Record<string, string>)[sortColumn] ?? '',
        (b as Record<string, string>)[sortColumn] ?? '',
        type, sortDirection
      );
    });
  }, [tableData, sortColumn, sortDirection]);

  return (
    <div className="bg-white content-stretch flex flex-col items-stretch relative shrink-0 w-full min-w-0 rounded-bl-[5px] rounded-br-[5px]" data-name="table">
      <div aria-hidden="true" className="absolute border-b border-l border-r border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-bl-[5px] rounded-br-[5px]" />
      
      {/* Header Row */}
      <div 
        className="bg-[#f9f9fb] border-t border-b border-l border-r border-[#e0e1e6] w-full grid"
        style={{ gridTemplateColumns: '48px 1fr 1fr 1fr 1fr' }}
        data-name="table-header"
      >
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0"></div>
        <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('apmPortfolio')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('apmPortfolio'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">FUNDING SOURCE</p>
          <SortIndicator direction={getDirection('apmPortfolio')} inactiveColor="#1C2024" />
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end gap-[6px] min-w-0 pt-[12px] pr-[12px] pb-[12px] pl-[24px] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('approvedTasking')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('approvedTasking'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">APPROVED TASKING</p>
          <SortIndicator direction={getDirection('approvedTasking')} inactiveColor="#1C2024" />
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('onWorkPlan')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('onWorkPlan'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">ON WORK PLAN</p>
          <SortIndicator direction={getDirection('onWorkPlan')} inactiveColor="#1C2024" />
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end gap-[6px] min-w-0 pt-[12px] pr-[12px] pb-[12px] pl-[0px] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('apmAuthorized')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('apmAuthorized'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">APM AUTHORIZED</p>
          <SortIndicator direction={getDirection('apmAuthorized')} inactiveColor="#1C2024" />
        </div>
      </div>
      
      {/* Body Rows - All rows in collapsed state */}
      {sortedData.map((row) => (
        <APMRow key={row.id} row={row} />
      ))}
    </div>
  );
}

function APMRow({
  row,
}: {
  row: APMRow;
}) {
  const [isExpanded, setIsExpanded] = useState(row.id === 'apm-1');

  return (
    <div className="contents">
      <div 
        className={`w-full border-b border-[#e0e1e6] hover:bg-[#fafafa] transition-colors grid ${isExpanded ? 'bg-white' : ''}`}
        style={{ gridTemplateColumns: '48px 1fr 1fr 1fr 1fr' }}
      >
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
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
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] truncate text-[14px]">
            {row.apmPortfolio}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0 pt-[12px] pr-[12px] pb-[12px] pl-[24px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] truncate text-[14px]">
            {row.approvedTasking}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] truncate text-[14px]">
            {row.onWorkPlan}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0 pt-[12px] pr-[12px] pb-[12px] pl-[0px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] truncate text-[14px]">
            {row.apmAuthorized}
          </p>
        </div>
      </div>

      {/* Child Rows Container - with border */}
      {isExpanded && row.children && (
        <div style={{ gridColumn: '1 / -1' }}>
          {row.children.map((child) => (
            <ChildRowComponent key={child.id} child={child} parentId={row.id} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChildRowComponent({
  child,
  parentId,
}: {
  child: ChildRow;
  parentId: string;
}) {
  const [isDetailExpanded, setIsDetailExpanded] = useState(child.id === 'apm-1-child-1');
  const isFirstChild = child.id === 'apm-1-child-1';
  const isExpandable = isFirstChild; // Only first child is expandable

  return (
    <div className="contents">
      <div 
        className={`w-full hover:bg-[#fafafa] transition-colors grid ${
          'bg-white'
        } border-b border-[#e0e1e6]`}
        style={{ gridTemplateColumns: '48px 1fr 1fr 1fr 1fr' }}
      >
        {/* Chevron column */}
        <div className="py-[12px] flex items-center justify-start min-w-0 pl-[24px] pr-[8px] overflow-visible">
          {isExpandable ? (
            <button
              onClick={() => setIsDetailExpanded(!isDetailExpanded)}
              className="cursor-pointer flex items-center justify-center"
              aria-label={isDetailExpanded ? 'Collapse detail panel' : 'Expand detail panel'}
            >
              {isDetailExpanded ? (
                <ChevronDown className="size-[16px] text-[#1c2024]" size={16} />
              ) : (
                <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" size={16} />
              )}
            </button>
          ) : (
            <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" size={16} />
          )}
        </div>
        {/* Activity name - clickable for expandable row, indented */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0 pl-[24px] pt-[12px] pr-[12px] pb-[12px]">
          {isExpandable ? (
            <button
              onClick={() => setIsDetailExpanded(!isDetailExpanded)}
              className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate cursor-pointer hover:underline text-left"
            >
              {child.name}
            </button>
          ) : (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
              {child.name}
            </p>
          )}
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0 pt-[12px] pr-[12px] pb-[12px] pl-[24px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {child.approvedTasking}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {child.onWorkPlan}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0 pt-[12px] pr-[12px] pb-[12px] pl-[0px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {child.apmAuthorized}
          </p>
        </div>
      </div>

      {/* Detail Panel - Only for first child */}
      {isFirstChild && isDetailExpanded && (
        <DetailPanel childName={child.name} />
      )}
    </div>
  );
}

function DetailPanel({
  childName,
}: {
  childName: string;
}) {
  const [activities, setActivities] = useState([
    { 
      id: 'act-1', 
      name: 'NSWC PC', 
      approvedTasking: '$1,000,000', 
      onWorkPlan: '$1,000,000', 
      apmAuthorized: '$800,000',
      subActivities: [
        { id: 'sub-1', name: 'INC-152', approvedTasking: 'Fund project through 12/31/25', onWorkPlan: 'RE: 10/1/25 DC: 10/15/25', apmAuthorized: 'Completed', amount: '$300,000' },
        { id: 'sub-2', name: 'INC-175', approvedTasking: 'Fund through 2/15/26', onWorkPlan: 'RE: 1/1/26 DC: 1/18/26', apmAuthorized: 'APM Acceptance', amount: '$250,000' },
        { id: 'sub-3', name: 'INC-196', approvedTasking: 'Fund project through 4/24/26', onWorkPlan: 'RE: 4/1/26 DC: 4/16/26', apmAuthorized: 'APM Distribution', amount: '$250,000' },
      ]
    },
    { id: 'act-2', name: 'NSWC PHD', approvedTasking: '$1,000,000', onWorkPlan: '$1,000,000', apmAuthorized: '$700,000' },
    { id: 'act-3', name: 'NSWC Philadelphia', approvedTasking: '$1,000,000', onWorkPlan: '$1,000,000', apmAuthorized: '$500,000' },
  ]);

  const [expandedActivity, setExpandedActivity] = useState<string | null>('act-1');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [newRows, setNewRows] = useState<{[key: string]: Array<{id: string, incId: string, purpose: string, needDate: string, status: string, amount: string}>}>({});
  const [draftRowId, setDraftRowId] = useState<{[key: string]: string | null}>({});
  const [nextIncId, setNextIncId] = useState(250);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: {purpose?: boolean, amount?: boolean}}>({});

  const handleActivityValueChange = (activityId: string, newValue: string) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === activityId ? { ...activity, apmAuthorized: newValue } : activity
      )
    );
  };

  const toggleActivity = (activityId: string) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId);
  };

  const handleAddNewRow = (activityId: string) => {
    const newRow = {
      id: `new-${Date.now()}`,
      incId: `INC-${nextIncId}`,
      purpose: '',
      needDate: '',
      status: 'APM Distribution',
      amount: ''
    };
    
    setNewRows(prev => ({
      ...prev,
      [activityId]: [...(prev[activityId] || []), newRow]
    }));
    
    setDraftRowId(prev => ({
      ...prev,
      [activityId]: newRow.id
    }));
    
    setNextIncId(prev => prev + 1);
  };

  const handleSave = (activityId: string) => {
    // Get the current draft row
    const currentDraftId = draftRowId[activityId];
    const draftRow = (newRows[activityId] || []).find(row => row.id === currentDraftId);
    
    if (!draftRow) return;
    
    // Validate required fields
    const errors: {purpose?: boolean, amount?: boolean} = {};
    if (!draftRow.purpose.trim()) {
      errors.purpose = true;
    }
    if (!draftRow.amount.trim()) {
      errors.amount = true;
    }
    
    // If there are errors, set them and don't save
    if (Object.keys(errors).length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        [activityId]: errors
      }));
      return;
    }
    
    // Clear validation errors and save
    setValidationErrors(prev => ({
      ...prev,
      [activityId]: {}
    }));
    
    setDraftRowId(prev => ({
      ...prev,
      [activityId]: null
    }));
  };

  const handleNewRowChange = (activityId: string, rowId: string, field: string, value: string) => {
    setNewRows(prev => ({
      ...prev,
      [activityId]: (prev[activityId] || []).map(row => 
        row.id === rowId ? { ...row, [field]: value } : row
      )
    }));
    
    // Clear validation error for this field when user types
    if (field === 'purpose' || field === 'amount') {
      setValidationErrors(prev => ({
        ...prev,
        [activityId]: {
          ...prev[activityId],
          [field]: false
        }
      }));
    }
  };

  const handleCancel = (activityId: string) => {
    const currentDraftId = draftRowId[activityId];
    
    setNewRows(prev => ({
      ...prev,
      [activityId]: (prev[activityId] || []).filter(row => row.id !== currentDraftId)
    }));
    
    setDraftRowId(prev => ({
      ...prev,
      [activityId]: null
    }));
    
    // Clear validation errors
    setValidationErrors(prev => ({
      ...prev,
      [activityId]: {}
    }));
  };

  return (
    <div className="w-full border-b border-[#e0e1e6]" style={{ gridColumn: '1 / -1' }}>
      <div className="bg-white overflow-visible">
        {/* Activities Table */}
        <div className="bg-white overflow-visible">
          {/* Table Body Container - Grid */}
          <div className="grid grid-cols-[48px_1fr_1fr_1fr_1fr] overflow-visible">
            {/* Table Rows */}
            {activities.map((activity, index) => {
              const isExpanded = expandedActivity === activity.id;
              const isExpandable = activity.id === 'act-1'; // Only NSWC PC is expandable for now
              const prevActivity = index > 0 ? activities[index - 1] : null;
              const prevWasExpandedWithSubTable = prevActivity && prevActivity.id === 'act-1' && expandedActivity === prevActivity.id && prevActivity.subActivities;
              const needsTopBorder = !!prevWasExpandedWithSubTable;

              return (
                <div key={activity.id} className="contents">
                  {/* Activity Row - uses contents to participate in parent grid */}
                  <div className="contents group/actrow">
                    {/* Empty spacer in chevron column for hierarchy indent */}
                    <div className={`col-start-1 py-[12px] border-b border-[rgba(0,0,47,0.15)] ${needsTopBorder ? 'border-t border-t-[rgba(0,0,47,0.15)]' : ''} group-hover/actrow:bg-[#F9F9FB] transition-colors ${isExpanded ? 'bg-white' : ''}`} />
                    {/* Activity chevron + name combined in name column for deeper indent */}
                    <div className={`pl-[12px] pr-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${needsTopBorder ? 'border-t border-t-[rgba(0,0,47,0.15)]' : ''} group-hover/actrow:bg-[#F9F9FB] transition-colors flex items-center gap-[8px] ${isExpanded ? 'bg-white' : ''}`}>
                      {isExpandable ? (
                        <button
                          onClick={() => toggleActivity(activity.id)}
                          className="cursor-pointer flex items-center justify-center shrink-0"
                          aria-label={isExpanded ? 'Collapse activity' : 'Expand activity'}
                        >
                          {isExpanded ? (
                            <ChevronDown className="size-[16px] text-[#1c2024]" />
                          ) : (
                            <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" />
                          )}
                        </button>
                      ) : (
                        <span className="shrink-0 flex items-center justify-center">
                          <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" />
                        </span>
                      )}
                      {isExpandable ? (
                        <button
                          onClick={() => toggleActivity(activity.id)}
                          className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate cursor-pointer hover:underline text-left"
                          title={`Activity: ${activity.name}`}
                        >
                          {activity.name}
                        </button>
                      ) : (
                        <p 
                          className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate"
                          title={`Activity: ${activity.name}`}
                        >
                          {activity.name}
                        </p>
                      )}
                    </div>
                    <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${needsTopBorder ? 'border-t border-t-[rgba(0,0,47,0.15)]' : ''} group-hover/actrow:bg-[#F9F9FB] transition-colors flex items-center justify-end text-right ${isExpanded ? 'bg-white' : ''}`}>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                        {activity.approvedTasking}
                      </p>
                    </div>
                    <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${needsTopBorder ? 'border-t border-t-[rgba(0,0,47,0.15)]' : ''} group-hover/actrow:bg-[#F9F9FB] transition-colors flex items-center justify-end text-right ${isExpanded ? 'bg-white' : ''}`}>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                        {activity.onWorkPlan}
                      </p>
                    </div>
                    <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${needsTopBorder ? 'border-t border-t-[rgba(0,0,47,0.15)]' : ''} group-hover/actrow:bg-[#F9F9FB] transition-colors flex items-center justify-end ${isExpanded ? 'bg-white' : ''}`}>
                      <input
                        type="text"
                        value={activity.apmAuthorized}
                        onChange={(e) => handleActivityValueChange(activity.id, e.target.value)}
                        className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] w-[120px] text-right px-[4px] py-[2px] border border-[#e0e1e6] rounded-[3px]"
                      />
                    </div>
                  </div>

                  {/* Expanded sub-table - only for NSWC PC */}
                  {isExpandable && isExpanded && activity.subActivities && (
                    <div className="contents">
                      <div className="col-span-5 bg-[rgba(20,125,185,0.09)] border-l-[6px] border-l-[#147db9] overflow-visible ml-[48px]" style={{ gridColumn: '1 / -1' }}>
                        <div className="pt-[24px] pr-[16px] pb-[16px] pl-[16px] overflow-visible">
                          {/* Nested table for sub-activities */}
                          <div className="bg-white rounded-[4px] border border-[rgba(0,0,47,0.15)] overflow-visible">
                            {/* Nested table header */}
                            <div
                              className="grid"
                              style={{
                                gridTemplateColumns: '48px 1fr 1fr 1fr 1fr 1fr 48px 48px',
                                backgroundColor: '#F9F9FB',
                              }}
                            >
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)]">
                                {/* Empty chevron column */}
                              </div>
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)]">
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                                  INC-ID
                                </span>
                              </div>
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)]">
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                                  PURPOSE
                                </span>
                              </div>
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)]">
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                                  NEED DATE
                                </span>
                              </div>
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)]">
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                                  STATUS
                                </span>
                              </div>
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)] text-right">
                                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                                  AMOUNT
                                </span>
                              </div>
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)]">
                                {/* Empty spacer column */}
                              </div>
                              <div className="px-[12px] py-[9px] border-b border-[rgba(0,0,47,0.15)]">
                                {/* Empty actions column header */}
                              </div>
                            </div>

                            {/* Nested table body */}
                            <div
                              className="grid overflow-visible"
                              style={{
                                gridTemplateColumns: '48px 1fr 1fr 1fr 1fr 1fr 48px 48px',
                              }}
                            >
                              {activity.subActivities.map((subActivity) => (
                                <div key={subActivity.id} className="contents group/nested">
                                  {/* Empty chevron column */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)]">
                                    {/* Empty */}
                                  </div>

                                  {/* Sub-Activity Name */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center">
                                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                      {subActivity.name}
                                    </span>
                                  </div>

                                  {/* Approved Tasking */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center">
                                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                      {subActivity.approvedTasking}
                                    </span>
                                  </div>

                                  {/* On Work Plan */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center">
                                    <div className="flex flex-col items-start">
                                      <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                        {subActivity.onWorkPlan.split(' DC: ')[0]}
                                      </span>
                                      <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                        DC: {subActivity.onWorkPlan.split(' DC: ')[1]}
                                      </span>
                                    </div>
                                  </div>

                                  {/* APM Authorized */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center">
                                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                      {subActivity.apmAuthorized}
                                    </span>
                                  </div>

                                  {/* Amount */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center justify-end text-right">
                                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                      {subActivity.amount}
                                    </span>
                                  </div>

                                  {/* Empty spacer column */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)]">
                                    {/* Empty */}
                                  </div>

                                  {/* Kebab actions column */}
                                  <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center justify-center">
                                    <div className="relative">
                                      <button 
                                        onClick={() => setOpenMenuId(openMenuId === subActivity.id ? null : subActivity.id)}
                                        className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] cursor-pointer"
                                      >
                                        <MoreVertical size={16} className="text-[#60646C]" />
                                      </button>
                                      {openMenuId === subActivity.id && (
                                        <>
                                          <div 
                                            className="fixed inset-0 z-[100]"
                                            onClick={() => setOpenMenuId(null)}
                                          />
                                          <div className="absolute right-0 top-full mt-[4px] z-[101] bg-white rounded-[8px] p-[8px] min-w-[200px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)]">
                                            {subActivity.apmAuthorized === 'Completed' ? (
                                              <button
                                                onClick={() => {
                                                  setOpenMenuId(null);
                                                  // View Increment action
                                                }}
                                                className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors"
                                              >
                                                <PeEye />
                                                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                  View Increment
                                                </p>
                                              </button>
                                            ) : (
                                              <>
                                                <button
                                                  onClick={() => {
                                                    setOpenMenuId(null);
                                                    // View Increment action
                                                  }}
                                                  className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors mb-[8px]"
                                                >
                                                  <PeEye />
                                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                    View Increment
                                                  </p>
                                                </button>
                                                <button
                                                  onClick={() => {
                                                    setOpenMenuId(null);
                                                    // Recall Increment action
                                                  }}
                                                  className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors mb-[8px]"
                                                >
                                                  <PeUndo />
                                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                    Recall Increment
                                                  </p>
                                                </button>
                                                <button
                                                  onClick={() => {
                                                    setOpenMenuId(null);
                                                    // Cancel Increment action
                                                  }}
                                                  className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors"
                                                >
                                                  <PeDelete />
                                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                    Cancel Increment
                                                  </p>
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
                              {/* New Rows */}
                              {(newRows[activity.id] || []).map((newRow) => {
                                const isActiveDraft = newRow.id === draftRowId[activity.id];
                                return (
                                <div key={newRow.id} className="contents group/nested">
                                  {/* Empty chevron column - with left accent border for active draft */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)] border-l-[3px] border-l-[#147DB9]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)]`}>
                                    {/* Empty */}
                                  </div>

                                  {/* INC-ID - Read-only */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center`}>
                                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                      {newRow.incId}
                                    </span>
                                  </div>

                                  {/* Purpose - Editable or Read-only */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)]`}>
                                    {isActiveDraft ? (
                                      <div className="flex flex-col gap-[4px]">
                                        <input
                                          type="text"
                                          value={newRow.purpose}
                                          onChange={(e) => handleNewRowChange(activity.id, newRow.id, 'purpose', e.target.value)}
                                          className={`w-full bg-white font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] border ${validationErrors[activity.id]?.purpose ? 'border-[#C1292E]' : 'border-[rgba(0,0,47,0.15)]'} rounded-[4px] px-[8px] py-[4px] focus:outline-none focus:ring-2 focus:ring-[#004b72]`}
                                          placeholder=""
                                        />
                                        {validationErrors[activity.id]?.purpose && (
                                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#C1292E]">
                                            This field is required
                                          </span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                        {newRow.purpose}
                                      </span>
                                    )}
                                  </div>

                                  {/* Need Date - Empty */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center`}>
                                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                      {newRow.needDate}
                                    </span>
                                  </div>

                                  {/* Status - Read-only (defaults to "APM Distribution") */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center`}>
                                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                      {newRow.status}
                                    </span>
                                  </div>

                                  {/* Amount - Editable or Read-only */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)]`}>
                                    {isActiveDraft ? (
                                      <div className="flex flex-col gap-[4px]">
                                        <input
                                          type="text"
                                          value={newRow.amount}
                                          onChange={(e) => handleNewRowChange(activity.id, newRow.id, 'amount', e.target.value)}
                                          className={`w-full bg-white font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] border ${validationErrors[activity.id]?.amount ? 'border-[#C1292E]' : 'border-[rgba(0,0,47,0.15)]'} rounded-[4px] px-[8px] py-[4px] focus:outline-none focus:ring-2 focus:ring-[#004b72]`}
                                          placeholder=""
                                        />
                                        {validationErrors[activity.id]?.amount && (
                                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#C1292E]">
                                            This field is required
                                          </span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                                        {newRow.amount}
                                      </span>
                                    )}
                                  </div>

                                  {/* Empty spacer column */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)]`}>
                                    {/* Empty */}
                                  </div>

                                  {/* Kebab actions column for new rows - shows after save */}
                                  <div className={`px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] ${isActiveDraft ? 'bg-[rgba(20,125,185,0.03)]' : 'bg-white'} group-hover/nested:bg-[rgba(0,0,85,0.02)] flex items-center justify-center`}>
                                    {!isActiveDraft && (
                                      <div className="relative">
                                        <button 
                                          onClick={() => setOpenMenuId(openMenuId === newRow.id ? null : newRow.id)}
                                          className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] cursor-pointer"
                                        >
                                          <MoreVertical size={16} className="text-[#60646C]" />
                                        </button>
                                        {openMenuId === newRow.id && (
                                          <>
                                            <div 
                                              className="fixed inset-0 z-[100]"
                                              onClick={() => setOpenMenuId(null)}
                                            />
                                            <div className="absolute right-0 top-full mt-[4px] z-[101] bg-white rounded-[8px] p-[8px] min-w-[200px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)]">
                                              {newRow.status === 'Completed' ? (
                                                <button
                                                  onClick={() => {
                                                    setOpenMenuId(null);
                                                    // View Increment action
                                                  }}
                                                  className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors"
                                                >
                                                  <PeEye />
                                                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                    View Increment
                                                  </p>
                                                </button>
                                              ) : (
                                                <>
                                                  <button
                                                    onClick={() => {
                                                      setOpenMenuId(null);
                                                      // View Increment action
                                                    }}
                                                    className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors mb-[8px]"
                                                  >
                                                    <PeEye />
                                                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                      View Increment
                                                    </p>
                                                  </button>
                                                  <button
                                                    onClick={() => {
                                                      setOpenMenuId(null);
                                                      // Recall Increment action
                                                    }}
                                                    className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors mb-[8px]"
                                                  >
                                                    <PeUndo />
                                                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                      Recall Increment
                                                    </p>
                                                  </button>
                                                  <button
                                                    onClick={() => {
                                                      setOpenMenuId(null);
                                                      // Cancel Increment action
                                                    }}
                                                    className="w-full bg-white hover:bg-[rgba(0,0,85,0.02)] h-[32px] rounded-[4px] flex items-center gap-[8px] px-[12px] transition-colors"
                                                  >
                                                    <PeDelete />
                                                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                                                      Cancel Increment
                                                    </p>
                                                  </button>
                                                </>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Add New Funding Increment Button or Save Buttons */}
                          <div className="mt-[12px]">
                            {!draftRowId[activity.id] ? (
                              <button 
                                onClick={() => handleAddNewRow(activity.id)}
                                className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#003d5c] transition-colors"
                              >
                                <svg className="shrink-0 size-[16px]" fill="none" viewBox="0 0 16 16">
                                  <path d="M5.33333 8H10.6667M8 5.33333V10.6667M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                                  <p className="leading-[20px]">Add New Funding Increment</p>
                                </div>
                              </button>
                            ) : (
                              <div className="flex gap-[8px]">
                                {/* Cancel Button - Neutral Secondary Style */}
                                <button 
                                  onClick={() => handleCancel(activity.id)}
                                  className="bg-white border border-[#8f9197] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                                >
                                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#60646C] whitespace-nowrap">
                                    <p className="leading-[20px]">Cancel</p>
                                  </div>
                                </button>
                                
                                {/* Save Button - Secondary Style */}
                                <button 
                                  onClick={() => handleSave(activity.id)}
                                  className="bg-white border border-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                                >
                                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#004b72] whitespace-nowrap">
                                    <p className="leading-[20px]">Save</p>
                                  </div>
                                </button>
                                
                                {/* Save and Publish Button - Primary Style */}
                                <button 
                                  onClick={() => handleSave(activity.id)}
                                  className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#003d5c] transition-colors"
                                >
                                  <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                                    <p className="leading-[20px]">Save and Publish</p>
                                  </div>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  detailValue,
  isFirst = false,
  isLast = false,
}: {
  label: string;
  value: string;
  detail: string;
  detailValue: string;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-[8px] p-[12px] ${!isLast ? 'border-r border-[#e0e1e6]' : ''} ${isFirst ? 'rounded-bl-[5px] rounded-tl-[5px]' : ''} ${isLast ? 'rounded-br-[5px] rounded-tr-[5px]' : ''}`}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#60646c] text-[14px]">
        {label}
      </p>
      <div className="flex items-center justify-start p-[4px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[26px] text-[#1c2024] text-[18px] tracking-[-0.04px]">
          {value}
        </p>
      </div>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">
        <p className="mb-0">{detail}</p>
        <p>{detailValue}</p>
      </div>
    </div>
  );
}

// Bottom action area components
function PeClockFading() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pe-clock-fading">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2004_29472)" id="pe-clock-fading">
          <path d="M8 1.33333C9.29343 1.3331 10.559 1.70912 11.6425 2.41557C12.7259 3.12202 13.5805 4.12839 14.102 5.31202C14.6235 6.49566 14.7894 7.80544 14.5795 9.08172C14.3697 10.358 13.7931 11.5457 12.92 12.5M8 4V8L10.6667 9.33333M1.66667 5.91667C1.45423 6.56244 1.34182 7.2369 1.33333 7.91667M1.88664 10.6667C2.26097 11.5279 2.81303 12.3003 3.50664 12.9333M3.09066 3.48995C3.27668 3.28744 3.47506 3.09663 3.68466 2.91862M5.7627 14.28C7.42516 14.8723 9.25463 14.7812 10.85 14.0267" id="Vector" stroke="#ab6400" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2004_29472">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function UnsavedChangesBadge() {
  return (
    <div className="bg-[rgba(255,222,0,0.24)] flex gap-[4px] h-[28px] items-center px-[10px] rounded-[100px] shrink-0">
      <PeClockFading />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden shrink-0 text-[#ab6400] text-[14px] text-ellipsis whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">3 Unsaved Changes</p>
      </div>
    </div>
  );
}

function BottomActionArea() {
  return (
    <div className="sticky bottom-0 z-20 bg-white px-[24px] py-[12px] flex items-center justify-between border-t border-[#E0E1E6]" style={{ boxShadow: '0 -6px 16px rgba(0,0,0,0.08)' }}>
      <div />
      <div className="flex items-center gap-[12px]">
        <UnsavedChangesBadge />
        <button className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 relative cursor-pointer hover:bg-[#f5f5f5] transition-colors">
          <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Save All</p>
          </div>
        </button>
        <button className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
            <p className="leading-[20px]">Publish All</p>
          </div>
        </button>
      </div>
    </div>
  );
}