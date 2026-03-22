import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from './VersionDropdown';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { useColumnSort, SortIndicator, compareValues } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { ChevronDown, ChevronRight, ChevronsDown, SearchIcon } from './InlineIcons';

interface FundingSourceRow {
  id: string;
  fundingSource: string;
  refCode: string;
  control: string;
  workingAuthorized: string;
  increments: string;
  remaining: string;
}

export default function FundingAuthorizationContent() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['o&mn']));
  const [expandedFundingSources, setExpandedFundingSources] = useState<Set<string>>(new Set(['1b1b-so']));

  const toggleRow = (appropriation: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(appropriation.toLowerCase())) {
      newExpanded.delete(appropriation.toLowerCase());
    } else {
      newExpanded.add(appropriation.toLowerCase());
    }
    setExpandedRows(newExpanded);
  };

  const toggleFundingSource = (fundingSourceId: string) => {
    const newExpanded = new Set(expandedFundingSources);
    if (newExpanded.has(fundingSourceId)) {
      newExpanded.delete(fundingSourceId);
    } else {
      newExpanded.add(fundingSourceId);
    }
    setExpandedFundingSources(newExpanded);
  };

  const tableData: { appropriation: string; fundingSources: FundingSourceRow[] }[] = [
    {
      appropriation: 'O&MN',
      fundingSources: [
        {
          id: '1b1b-so',
          fundingSource: '1B1B/C011B10-SO',
          refCode: 'ERP Ref: 2R2I52 • Line 01842',
          control: '$32,000,000',
          workingAuthorized: '$32,000,000',
          increments: '$29,000,000',
          remaining: '$3,000,000',
        },
        {
          id: '1b1b-sx',
          fundingSource: '1B1B/C011B10-SX',
          refCode: 'ERP Ref: 2R2I52 • Line 07200',
          control: '$11,000,000',
          workingAuthorized: '$11,000,000',
          increments: '$9,000,000',
          remaining: '$2,000,000',
        },
        {
          id: '1b1b-sr',
          fundingSource: '1B1B/C011B10-SR',
          refCode: 'ERP Ref: 2R2I52  Line 02510',
          control: '$7,000,000',
          workingAuthorized: '$7,000,000',
          increments: '$3,000,000',
          remaining: '$4,000,000',
        },
      ],
    },
    {
      appropriation: 'RDTEN',
      fundingSources: [
        {
          id: 'rdten-2r3d',
          fundingSource: '2R3D/N00024-RD',
          refCode: 'ERP Ref: 3R2K01 • Line 02100',
          control: '$12,000,000',
          workingAuthorized: '$12,000,000',
          increments: '$9,000,000',
          remaining: '$3,000,000',
        },
        {
          id: 'rdten-3r5t',
          fundingSource: '3R5T/N00024-TE',
          refCode: 'ERP Ref: 3R2K01 • Line 02105',
          control: '$8,000,000',
          workingAuthorized: '$8,000,000',
          increments: '$6,000,000',
          remaining: '$2,000,000',
        },
      ],
    },
    {
      appropriation: 'OPN',
      fundingSources: [
        {
          id: 'opn-5o2p',
          fundingSource: '5O2P/P011N05-PN',
          refCode: 'ERP Ref: 1P5T22 • Line 00850',
          control: '$9,000,000',
          workingAuthorized: '$9,000,000',
          increments: '$6,000,000',
          remaining: '$3,000,000',
        },
        {
          id: 'opn-1p5n',
          fundingSource: '1P5N/P011N05-PX',
          refCode: 'ERP Ref: 1P5T22 • Line 00852',
          control: '$6,000,000',
          workingAuthorized: '$6,000,000',
          increments: '$4,000,000',
          remaining: '$2,000,000',
        },
      ],
    },
    {
      appropriation: 'SCN',
      fundingSources: [
        {
          id: 'scn-4s1c',
          fundingSource: '4S1C/S012N18-SB',
          refCode: 'ERP Ref: 2S1M16 • Line 03420',
          control: '$3,000,000',
          workingAuthorized: '$3,000,000',
          increments: '$2,000,000',
          remaining: '$1,000,000',
        },
        {
          id: 'scn-2c6s',
          fundingSource: '2C6S/S012N18-CV',
          refCode: 'ERP Ref: 2S1M16 • Line 03425',
          control: '$2,000,000',
          workingAuthorized: '$2,000,000',
          increments: '$1,000,000',
          remaining: '$1,000,000',
        },
      ],
    },
    {
      appropriation: 'WPN',
      fundingSources: [
        {
          id: 'wpn-3w1p',
          fundingSource: '3W1P/W015N22-WP',
          refCode: 'ERP Ref: 4W3P08 • Line 01250',
          control: '$6,000,000',
          workingAuthorized: '$6,000,000',
          increments: '$4,000,000',
          remaining: '$2,000,000',
        },
        {
          id: 'wpn-6w2n',
          fundingSource: '6W2N/W015N22-WX',
          refCode: 'ERP Ref: 4W3P08 • Line 01255',
          control: '$4,000,000',
          workingAuthorized: '$4,000,000',
          increments: '$3,000,000',
          remaining: '$1,000,000',
        },
      ],
    },
  ];

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="flex flex-col items-start pl-[24px] pr-[24px] pt-[24px] pb-[72px] w-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <PageHeader />
          <FiltersRow />
          <KPICards />
          <TableSection tableData={tableData} expandedRows={expandedRows} toggleRow={toggleRow} expandedFundingSources={expandedFundingSources} toggleFundingSource={toggleFundingSource} />
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
        to="/funding-distribution"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">← Back to Funding Distribution</p>
        </div>
      </Link>
      <Link 
        to="/apm-distribution"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Go to APM Distribution →</p>
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
          { label: 'Execution Planning', path: '/execution-planning-dashboard' },
          { label: 'Funding Authorization' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        Funding Authorization
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Enter the authorized values for each plan CR funding assumptions. Authorized values cannot exceed the control amount.
      </p>
    </div>
  );
}



function FiltersRow() {
  const [fiscalYear, setFiscalYear] = useState('All Fiscal Years');
  const [appropriation, setAppropriation] = useState('All Appropriations');
  const [fundingSource, setFundingSource] = useState('All Funding Sources');
  const [project, setProject] = useState('All Projects');
  const [yearFilter, setYearFilter] = useState<'active' | 'all'>('active');

  const handleClearFilters = () => {
    setFiscalYear('All Fiscal Years');
    setAppropriation('All Appropriations');
    setFundingSource('All Funding Sources');
    setProject('All Projects');
    setYearFilter('active');
  };

  return (
    <CollapsibleFilterSection highContrast>
      <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-name="left-filters">
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Fiscal Year</p>
          <SearchableFilterDropdown value={fiscalYear} onChange={setFiscalYear} options={['All Fiscal Years', 'FY24', 'FY25', 'FY26', 'FY27']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Appropriation</p>
          <SearchableFilterDropdown value={appropriation} onChange={setAppropriation} options={['All Appropriations', 'O&MN', 'RDTEN', 'OPN', 'SCN', 'WPN']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Funding Source</p>
          <SearchableFilterDropdown value={fundingSource} onChange={setFundingSource} options={['All Funding Sources', '1B1B/C011B10-SO', '1B1B/C011B10-SX', '1B1B/C011B10-SR']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Project</p>
          <SearchableFilterDropdown value={project} onChange={setProject} options={['All Projects', 'PMS 420', 'PMS 495', 'PMS 501']} />
        </div>
        {/* Active Years / All Radio Toggle */}
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
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024]">
              All
            </span>
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
    <div className="grid grid-cols-5 gap-[24px] w-full items-stretch" data-name="kpi-cards">
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
        detail="Published Effective:"
        detailValue="10 Jan 2026"
        accentColor="#004b72"
      />
      <KPICard
        label="Total"
        subtitle="Holdback / Reserve"
        value="$6M"
        detail="BFM controlled"
        detailValue=""
        accentColor="#004b72"
      />
      <KPICard
        label="Total"
        subtitle="Allocated to APMs"
        value="$70M"
        detail="Includes pending"
        detailValue="adjustments"
        accentColor="#004b72"
      />
      <KPICard
        label="Total"
        subtitle="Remaining"
        value="$24M"
        detail="Available to Allocate"
        detailValue="4% Remaining"
        accentColor="#004b72"
        showPill
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
  showPill = false,
}: {
  label: string;
  subtitle: string;
  value: string;
  detail: string;
  detailValue: string;
  accentColor: string;
  highlight?: boolean;
  showPill?: boolean;
}) {
  return (
    <div className="flex items-stretch relative rounded-[5px] h-full">
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
        {showPill ? (
          <div className="mt-auto w-full">
            <div className="bg-[rgba(255,222,0,0.24)] flex gap-[4px] h-[28px] items-center px-[10px] rounded-[100px] shrink-0 w-fit">
              <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden shrink-0 text-[#ab6400] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[20px] overflow-hidden">{detail}</p>
              </div>
            </div>
            <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#60646c] text-[14px] w-full">
              {detailValue}
            </p>
          </div>
        ) : (
          <div className="mt-auto w-full">
            <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
            <div className={`font-['Inter:${highlight ? 'Semi_Bold' : 'Regular'}',sans-serif] ${highlight ? 'font-semibold' : 'font-normal'} leading-[20px] relative shrink-0 text-[${highlight ? '#147db9' : '#60646c'}] text-[14px] w-full`}>
              {detailValue ? (
                <>
                  <p className="mb-0">{detail}</p>
                  <p className={highlight ? 'text-[#147db9]' : ''}>{detailValue}</p>
                </>
              ) : (
                <p>{detail}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TableSection({
  tableData,
  expandedRows,
  toggleRow,
  expandedFundingSources,
  toggleFundingSource,
}: {
  tableData: { appropriation: string; fundingSources: FundingSourceRow[] }[];
  expandedRows: Set<string>;
  toggleRow: (appropriation: string) => void;
  expandedFundingSources: Set<string>;
  toggleFundingSource: (fundingSourceId: string) => void;
}) {
  const [searchValue, setSearchValue] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="content-stretch flex flex-col gap-[0px] items-start relative shrink-0 w-full" data-name="table-section">
      {/* Standardized Title Header — matches G-Invoicing / APM Acceptance / Reconciliation / Activity Distribution / Dashboard / Funding Distribution pattern */}
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
      <DataTable tableData={tableData} expandedRows={expandedRows} toggleRow={toggleRow} expandedFundingSources={expandedFundingSources} toggleFundingSource={toggleFundingSource} />
    </div>
  );
}

function DataTable({
  tableData,
  expandedRows,
  toggleRow,
  expandedFundingSources,
  toggleFundingSource,
}: {
  tableData: { appropriation: string; fundingSources: FundingSourceRow[] }[];
  expandedRows: Set<string>;
  toggleRow: (appropriation: string) => void;
  expandedFundingSources: Set<string>;
  toggleFundingSource: (fundingSourceId: string) => void;
}) {
  type FASortCol = 'appropriation' | 'control' | 'workingAuthorized' | 'increments' | 'remaining';
  const { handleSort, getDirection, sortColumn, sortDirection } = useColumnSort<FASortCol>();

  const sortedTableData = useMemo(() => {
    if (!sortColumn || !sortDirection) return tableData;
    return [...tableData].sort((a, b) => {
      if (sortColumn === 'appropriation') {
        return compareValues(a.appropriation, b.appropriation, 'string', sortDirection);
      }
      const aTotal = a.fundingSources.reduce((sum, fs) => sum + parseFloat((fs[sortColumn] as string).replace(/[$,]/g, '')), 0);
      const bTotal = b.fundingSources.reduce((sum, fs) => sum + parseFloat((fs[sortColumn] as string).replace(/[$,]/g, '')), 0);
      const result = aTotal - bTotal;
      return sortDirection === 'asc' ? result : -result;
    });
  }, [tableData, sortColumn, sortDirection]);

  const allFundingSources = tableData.flatMap(({ appropriation, fundingSources }) =>
    fundingSources.map((fs) => ({ ...fs, appropriation }))
  );

  return (
    <div className="bg-white content-stretch flex flex-col items-stretch relative shrink-0 w-full min-w-0 rounded-bl-[5px] rounded-br-[5px] border-l border-r border-b border-[#e0e1e6]" data-name="table">
      
      {/* Header Row */}
      <div 
        className="bg-[#f9f9fb] border-t border-b border-[#e0e1e6] w-full grid"
        style={{ gridTemplateColumns: '48px 1fr 200px 200px 200px 200px' }}
        data-name="table-header"
      >
        <div className="py-[12px] flex items-center justify-center min-w-0"></div>
        <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('appropriation')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('appropriation'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">APPROPRIATION</p>
          <SortIndicator direction={getDirection('appropriation')} inactiveColor="#1C2024" />
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('control')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('control'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">CONTROL</p>
          <SortIndicator direction={getDirection('control')} inactiveColor="#1C2024" />
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('workingAuthorized')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('workingAuthorized'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">WORKING AUTHORIZED</p>
          <SortIndicator direction={getDirection('workingAuthorized')} inactiveColor="#1C2024" />
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('increments')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('increments'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">INCREMENTS</p>
          <SortIndicator direction={getDirection('increments')} inactiveColor="#1C2024" />
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleSort('remaining')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort('remaining'); } }}>
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] truncate">REMAINING</p>
          <SortIndicator direction={getDirection('remaining')} inactiveColor="#1C2024" />
        </div>
      </div>
      
      {/* Body Rows - grouped by appropriation */}
      {sortedTableData.map((approp) => (
        <AppropriationGroup key={approp.appropriation} appropriation={approp.appropriation} fundingSources={approp.fundingSources} expandedRows={expandedRows} toggleRow={toggleRow} expandedFundingSources={expandedFundingSources} toggleFundingSource={toggleFundingSource} />
      ))}
    </div>
  );
}

function AppropriationGroup({
  appropriation,
  fundingSources,
  expandedRows,
  toggleRow,
  expandedFundingSources,
  toggleFundingSource,
}: {
  appropriation: string;
  fundingSources: FundingSourceRow[];
  expandedRows: Set<string>;
  toggleRow: (appropriation: string) => void;
  expandedFundingSources: Set<string>;
  toggleFundingSource: (fundingSourceId: string) => void;
}) {
  // Show appropriation header row followed by funding sources as sub-rows
  // In collapsed state, we show them as a simple nested structure without expansion
  
  const isExpanded = expandedRows.has(appropriation.toLowerCase());
  
  return (
    <div key={appropriation} style={{ display: 'contents' }}>
      {/* Appropriation header row */}
      <div 
        className="w-full border-b border-[#e0e1e6] hover:bg-[#fafafa] transition-colors grid bg-[#f9f9fb] cursor-pointer"
        style={{ gridTemplateColumns: '48px 1fr 200px 200px 200px 200px' }}
        onClick={() => toggleRow(appropriation)}
      >
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
          {isExpanded ? (
            <ChevronDown className="size-[16px] text-[#1c2024] opacity-40" />
          ) : (
            <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" />
          )}
        </div>
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {appropriation}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {calculateTotal(fundingSources, 'control')}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {calculateTotal(fundingSources, 'workingAuthorized')}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {calculateTotal(fundingSources, 'increments')}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px] truncate">
            {calculateTotal(fundingSources, 'remaining')}
          </p>
        </div>
      </div>
      
      {/* Funding source rows - only shown when expanded */}
      {isExpanded && fundingSources.map((fs, index) => {
        const isFundingSourceExpanded = expandedFundingSources.has(fs.id);
        const isFirstOandMNSource = appropriation === 'O&MN' && fs.id === '1b1b-so';
        
        return (
          <div key={fs.id} style={{ display: 'contents' }}>
            <div 
              className={`w-full hover:bg-[#fafafa] transition-colors grid ${isFundingSourceExpanded ? '' : 'border-b border-[#e0e1e6]'} ${isFirstOandMNSource ? 'cursor-pointer' : ''}`}
              style={{ gridTemplateColumns: '48px 1fr 200px 200px 200px 200px' }}
              onClick={isFirstOandMNSource ? () => toggleFundingSource(fs.id) : undefined}
            >
              <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
                {isFirstOandMNSource ? (
                  isFundingSourceExpanded ? (
                    <ChevronDown className="size-[16px] text-[#1c2024] opacity-40" />
                  ) : (
                    <ChevronRight className="size-[16px] text-[#1c2024] opacity-40" />
                  )
                ) : (
                  <ChevronRight className="size-[16px] text-[#1c2024] opacity-20" />
                )}
              </div>
              <div className="px-[12px] py-[12px] flex flex-col gap-[2px] min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {fs.fundingSource}
                </p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#60646c] text-[12px] truncate">
                  {fs.refCode}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {fs.control}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {fs.workingAuthorized}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {fs.increments}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {fs.remaining}
                </p>
              </div>
            </div>
            
            {/* Expanded funding source detail panel */}
            {isFirstOandMNSource && isFundingSourceExpanded && (
              <FundingSourceExpansion fundingSource={fs} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FundingSourceExpansion({ fundingSource }: { fundingSource: FundingSourceRow }) {
  const [projectAuthValues, setProjectAuthValues] = useState<{ [key: string]: string }>({
    'apm-1': '$800,000',
    'apm-2': '$700,000',
    'apm-3': '$2,000,000',
  });

  const handleProjectAuthChange = (id: string, value: string) => {
    setProjectAuthValues({
      ...projectAuthValues,
      [id]: value,
    });
  };

  const apmData = [
    {
      id: 'apm-1',
      apmPortfolio: 'APM - MCM Mission Packages',
      batAllocation: '$1,000,000',
      projectAuthDate: '1 Jan 2025',
      authorizedToActivities: '$200,000',
      remaining: '$800,000',
      projectAuthorization: '$800,000',
    },
    {
      id: 'apm-2',
      apmPortfolio: 'APM - LCS Common Equipment',
      batAllocation: '$1,000,000',
      projectAuthDate: '2 Feb 2025',
      authorizedToActivities: '$300,000',
      remaining: '$700,000',
      projectAuthorization: '$700,000',
    },
    {
      id: 'apm-3',
      apmPortfolio: 'APM - Twin Boom Extendable Crane',
      batAllocation: '$500,000',
      projectAuthDate: '3 Mar 2025',
      authorizedToActivities: '$400,000',
      remaining: '$100,000',
      projectAuthorization: '$2,000,000',
    },
  ];

  return (
    <div className="w-full border-b border-[#e0e1e6] bg-[rgba(20,125,185,0.04)] relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[6px] before:bg-[#147db9]" style={{ gridColumn: '1 / -1' }}>
      <div className="p-[24px] flex flex-col gap-[16px]">
        {/* Header section */}
        <div className="flex items-center bg-[rgba(20,125,185,0.09)] rounded-t-[5px] h-[70px] px-[12px]">
          <div className="flex flex-col">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px] text-[#1c2024] mb-0">
              {fundingSource.fundingSource}
            </p>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] text-[16px] text-[#1c2024]">
              {fundingSource.refCode}
            </p>
          </div>
        </div>

        {/* Summary cards row */}
        <div className="flex gap-[12px]">
          <AuthCard label="Control" value="$3,000,000" detail="Last sync:" detail2="13 Jan 2026 08:10 ET" />
          <AuthCard label="ERP Authorized (YTD)" value="$3,000,000" detail="Last sync" detail2="13 Jan 2026 08:10 ET" />
          <AuthCard label="BFM Working Authorized" value="$3,000,000" detail="Edit in FARF Allocation →" detail2="Published Effective:" detail3="10 Jan 2026" hasLink />
          <AuthCard label="Holdback / Reserve" value="$500,000" detail="BFM Controlled" />
          <AuthCard label="Authorized to Projects" value="$4,000,000" detail="Includes pending" detail2="adjustments" hasInfo />
          <AuthCard label="Remaining" value="-$1,000,000" detail="-25% Remaining" isNegative />
        </div>

        {/* APM/Portfolio table */}
        <div className="bg-white border border-[#e0e1e6] rounded-[5px] overflow-hidden">
          {/* Table header */}
          <div className="grid border-b-2 border-[rgba(0,0,47,0.15)] bg-white" style={{ gridTemplateColumns: '1fr 160px 200px 200px 200px 200px 48px' }}>
            <div className="px-[12px] py-[12px] flex items-center">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">APM / Portfolio</p>
            </div>
            <div className="px-[12px] py-[12px] flex items-center justify-end text-right">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">BAT Allocation</p>
            </div>
            <div className="px-[12px] py-[12px] flex items-center">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Project Authorization Date</p>
            </div>
            <div className="px-[12px] py-[12px] flex items-center justify-end text-right">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Authorized to Activities</p>
            </div>
            <div className="px-[12px] py-[12px] flex items-center justify-end text-right">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Project Authorization Remaining</p>
            </div>
            <div className="px-[12px] py-[12px] flex items-center justify-end text-right">
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px]">Project Authorization</p>
            </div>
            <div className="px-[12px] py-[12px]"></div>
          </div>

          {/* Table rows */}
          {apmData.map((row) => (
            <div key={row.id} className="grid border-b border-[rgba(0,0,47,0.15)] hover:bg-[#fafafa]" style={{ gridTemplateColumns: '1fr 160px 200px 200px 200px 200px 48px' }}>
              <div className="px-[12px] py-[12px] flex items-center">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">{row.apmPortfolio}</p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end text-right">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{row.batAllocation}</p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{row.projectAuthDate}</p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end text-right">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{row.authorizedToActivities}</p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end text-right">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{row.remaining}</p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center">
                <input
                  type="text"
                  value={projectAuthValues[row.id]}
                  onChange={(e) => handleProjectAuthChange(row.id, e.target.value)}
                  className="w-full h-[32px] px-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] text-right focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                />
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-center">
                <div className="h-[2px] w-[2px] bg-[#d9d9d9]"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Rule text */}
        <div className="bg-white border border-[#e0e1e6] rounded-[5px] px-[24px] py-[20px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold">Rule: </span>
            Allocations cannot exceed (Working Authorized - Holdback).
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthCard({ 
  label, 
  value, 
  detail, 
  detail2, 
  detail3,
  hasLink = false,
  hasInfo = false,
  isNegative = false,
}: { 
  label: string; 
  value: string; 
  detail?: string;
  detail2?: string;
  detail3?: string;
  hasLink?: boolean;
  hasInfo?: boolean;
  isNegative?: boolean;
}) {
  return (
    <div className="bg-white flex flex-col gap-[8px] p-[12px] border border-[#e0e1e6] rounded-[5px] flex-1">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#60646c] text-[14px]">{label}</p>
      <p className={`font-['Inter:Medium',sans-serif] font-medium leading-[26px] text-[18px] tracking-[-0.04px] ${isNegative ? 'text-[#c82828]' : 'text-[#1c2024]'}`}>
        {value}
      </p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">
        {hasLink && detail && <p className="mb-0 text-[#006496]">{detail}</p>}
        {!hasLink && detail && <p className="mb-0">{detail}</p>}
        {detail2 && <p className={hasLink ? 'mb-0' : ''}>{detail2}</p>}
        {detail3 && <p>{detail3}</p>}
      </div>
    </div>
  );
}

function calculateTotal(fundingSources: FundingSourceRow[], field: keyof FundingSourceRow): string {
  const total = fundingSources.reduce((sum, fs) => {
    const value = fs[field] as string;
    const number = parseFloat(value.replace(/[$,]/g, ''));
    return sum + number;
  }, 0);
  
  // Format with commas
  return `$${total.toLocaleString('en-US')}`;
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
            <p className="leading-[20px]">Save Authorization</p>
          </div>
        </button>
        <button className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
            <p className="leading-[20px]">Publish Authorization</p>
          </div>
        </button>
      </div>
    </div>
  );
}