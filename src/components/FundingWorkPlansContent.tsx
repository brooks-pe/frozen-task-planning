import React, { useState } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from './VersionDropdown';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { ChevronDown, ChevronRight, ChevronsDown, SearchIcon } from './InlineIcons';
import { AppropriationBadge } from './AppropriationBadge';

export default function FundingWorkPlansContent() {
  const [activeStatus, setActiveStatus] = useState<'planning' | 'ready' | 'inProgress'>('planning');

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="flex flex-col items-start pl-[24px] pr-[24px] pt-[24px] pb-[72px] w-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <PageHeader />
          <FiltersRow />
          <StatusTabs activeTab={activeStatus} onTabChange={setActiveStatus} />
          <ActivitiesTableSection />
        </div>
      </div>
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
        to="/execution-planning/dashboard"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004B72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004B72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">← Back to Dashboard</p>
        </div>
      </Link>
      <button 
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1C2024] text-[14px] whitespace-nowrap">
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
        <div aria-hidden="true" className="absolute border-[#004B72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <HeaderAndSubtitle />
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Execution Planning', path: '/execution-planning/dashboard' },
          { label: 'Funding Work Plans' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1C2024] text-[32px]">
        Funding Work Plans
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646C] text-[18px]">
        Review and manage funding work plans. Add increments to adjust planned funding across executing activities.
      </p>
    </div>
  );
}

function FiltersRow() {
  const [executionYear, setExecutionYear] = useState('All Execution Years');
  const [appropriation, setAppropriation] = useState('All Appropriations');
  const [pucc, setPucc] = useState('All PUCCs');
  const [activity, setActivity] = useState('All Activities');
  const [viewFilter, setViewFilter] = useState<'all' | 'assigned'>('all');

  const handleClearFilters = () => {
    setExecutionYear('All Execution Years');
    setAppropriation('All Appropriations');
    setPucc('All PUCCs');
    setActivity('All Activities');
    setViewFilter('all');
  };

  return (
    <CollapsibleFilterSection highContrast>
      <div className="content-stretch flex gap-[12px] items-end relative shrink-0" data-name="left-filters">
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">Execution Year</p>
          <SearchableFilterDropdown value={executionYear} onChange={setExecutionYear} options={['All Execution Years', 'FY24', 'FY25', 'FY26', 'FY27']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">Appropriation</p>
          <SearchableFilterDropdown value={appropriation} onChange={setAppropriation} options={['All Appropriations', 'O&MN', 'RDTEN', 'OPN', 'SCN', 'WPN']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">PUCC</p>
          <SearchableFilterDropdown value={pucc} onChange={setPucc} options={['All PUCCs', 'PUCC-1001', 'PUCC-1002', 'PUCC-2001', 'PUCC-2002', 'PUCC-3001']} />
        </div>
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">Activity</p>
          <SearchableFilterDropdown value={activity} onChange={setActivity} options={['All Activities', 'Engineering Support', 'Program Management', 'Logistics Support', 'Test & Evaluation', 'Training']} />
        </div>
        {/* Divider */}
        <div className="flex items-center h-[32px] px-[4px] relative self-end">
          <div className="w-[1px] h-full bg-[#CDCED6]" />
        </div>
        {/* View Radio Filter */}
        <div className="flex flex-col gap-[8px] items-start shrink-0">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">View</p>
          <div className="flex items-center gap-[12px] h-[32px]">
            <label className="flex items-center gap-[8px] cursor-pointer select-none">
              <input type="radio" name="viewFilter" value="all" checked={viewFilter === 'all'} onChange={() => setViewFilter('all')} className="sr-only" />
              <div className="flex items-center h-[20px]">
                <div className="relative w-[16px] h-[16px] shrink-0">
                  {viewFilter === 'all' ? (
                    <svg className="block w-full h-full" viewBox="0 0 16 16" fill="none">
                      <path d="M0 8C0 3.58172 3.58172 0 8 0V0C12.4183 0 16 3.58172 16 8V8C16 12.4183 12.4183 16 8 16V16C3.58172 16 0 12.4183 0 8V8Z" fill="#004B72" />
                      <circle cx="8" cy="8" r="3" fill="white" />
                    </svg>
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#f9f9fb] relative">
                      <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-full" />
                    </div>
                  )}
                </div>
              </div>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">All</span>
            </label>
            <label className="flex items-center gap-[8px] cursor-pointer select-none">
              <input type="radio" name="viewFilter" value="assigned" checked={viewFilter === 'assigned'} onChange={() => setViewFilter('assigned')} className="sr-only" />
              <div className="flex items-center h-[20px]">
                <div className="relative w-[16px] h-[16px] shrink-0">
                  {viewFilter === 'assigned' ? (
                    <svg className="block w-full h-full" viewBox="0 0 16 16" fill="none">
                      <path d="M0 8C0 3.58172 3.58172 0 8 0V0C12.4183 0 16 3.58172 16 8V8C16 12.4183 12.4183 16 8 16V16C3.58172 16 0 12.4183 0 8V8Z" fill="#004B72" />
                      <circle cx="8" cy="8" r="3" fill="white" />
                    </svg>
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#f9f9fb] relative">
                      <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-full" />
                    </div>
                  )}
                </div>
              </div>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">Assigned</span>
            </label>
          </div>
        </div>
        {/* Divider */}
        <div className="flex items-center h-[32px] px-[4px] relative self-end">
          <div className="w-[1px] h-full bg-[#CDCED6]" />
        </div>
        <button 
          onClick={handleClearFilters}
          className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(20,125,185,0.22)]"
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

function StatusTabs({ activeTab, onTabChange }: { activeTab: 'planning' | 'ready' | 'inProgress'; onTabChange: (tab: 'planning' | 'ready' | 'inProgress') => void }) {
  const tabs: { key: 'planning' | 'ready' | 'inProgress'; label: string; icon: React.ReactNode }[] = [
    {
      key: 'planning',
      label: 'PLANNING',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: 'ready',
      label: 'READY FOR EXECUTION',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      key: 'inProgress',
      label: 'IN PROGRESS',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8 6.5 6.5 0 0 1 8 1.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8H8V1.5Z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-0 border border-solid border-[#CDCED6] rounded-[4px] overflow-hidden" data-name="status-tabs">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-[8px] h-[36px] px-[16px] cursor-pointer border-none transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(20,125,185,0.22)] ${
              isActive
                ? 'bg-[#147DB9] text-white'
                : 'bg-white text-[#1C2024] hover:bg-[#f5f5f5]'
            }`}
            aria-pressed={isActive}
          >
            <span className="flex items-center shrink-0">{tab.icon}</span>
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[20px] whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Activities Table Data ──────────────────────────────────────────────────

interface FundingSourceChild {
  id: string;
  badge: string;
  identifier: string;
  year: string;
  approvedTasking: string;
  fundsOnBoard: string;
  incrementsPlanned: string;
  remaining: string;
}

interface ActivityParent {
  id: string;
  name: string;
  approvedTasking: string;
  fundsOnBoard: string;
  incrementsPlanned: string;
  remaining: string;
  children: FundingSourceChild[];
}

const PLACEHOLDER_DATA: ActivityParent[] = [
  {
    id: 'ea-1',
    name: '96th Test Wing Eglin AFB',
    approvedTasking: '$1,822,000.00',
    fundsOnBoard: '$0.00',
    incrementsPlanned: '$0.00',
    remaining: '$1,822,000.00',
    children: [
      {
        id: 'fs-1',
        badge: 'RDTEN',
        identifier: '0605512N/3428 – sUSV',
        year: '2025',
        approvedTasking: '$622,000.00',
        fundsOnBoard: '$0.00',
        incrementsPlanned: '$0.00',
        remaining: '$622,000.00',
      },
      {
        id: 'fs-2',
        badge: 'OPN',
        identifier: 'BLI 1601/MC002 – MCM USV',
        year: '2025',
        approvedTasking: '$1,200,000.00',
        fundsOnBoard: '$0.00',
        incrementsPlanned: '$0.00',
        remaining: '$1,200,000.00',
      },
    ],
  },
  {
    id: 'ea-2',
    name: 'AAC',
    approvedTasking: '$90,228,104.00',
    fundsOnBoard: '$0.00',
    incrementsPlanned: '$0.00',
    remaining: '$90,228,104.00',
    children: [],
  },
  {
    id: 'ea-3',
    name: 'Anduril',
    approvedTasking: '$6,700,000.00',
    fundsOnBoard: '$0.00',
    incrementsPlanned: '$0.00',
    remaining: '$6,700,000.00',
    children: [],
  },
];

const FWP_GRID = '48px 200px 1fr 1fr 1fr 1fr 1fr 140px';

// ─── Activities Table Section ───────────────────────────────────────────────

function ActivitiesTableSection() {
  const [searchValue, setSearchValue] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="table-section">
      {/* Table Title / Controls Header */}
      <div className="bg-[#f9f9fb] relative rounded-tl-[5px] rounded-tr-[5px] w-full border border-solid border-[#CDCED6] border-b-0">
        <div className="flex items-center px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#CDCED6]">
          <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] whitespace-nowrap">
              Activities
            </p>
            {/* Vertical divider */}
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
                  className="flex-1 bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[#1C2024] text-[14px] placeholder:text-[#60646C] px-[4px]"
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
      {/* Table */}
      <ActivitiesDataTable expandAll={expandAll} />
    </div>
  );
}

// ─── Data Table ─────────────────────────────────────────────────────────────

function ActivitiesDataTable({ expandAll }: { expandAll: boolean }) {
  const hdr = (label: string, align?: 'right') => (
    <div className={`px-[12px] py-[12px] flex items-center min-w-0 ${align === 'right' ? 'justify-end text-right' : ''}`}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] text-[#1C2024] text-[13px] uppercase tracking-[0.5px] whitespace-nowrap">{label}</p>
    </div>
  );

  return (
    <div className="bg-white content-stretch flex flex-col items-stretch relative shrink-0 w-full min-w-0 rounded-b-[5px]" data-name="table">
      <div aria-hidden="true" className="absolute border-l border-r border-b border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-b-[5px]" />

      {/* Header Row */}
      <div
        className="bg-[#f9f9fb] border-b border-[#CDCED6] w-full grid"
        style={{ gridTemplateColumns: FWP_GRID }}
        data-name="table-header"
      >
        {/* Chevron placeholder */}
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0" />
        {hdr('Executing Activity')}
        {hdr('Funding Source')}
        {hdr('Approved Tasking', 'right')}
        {hdr('Funds on Board', 'right')}
        {hdr('Increments Planned', 'right')}
        {hdr('Remaining', 'right')}
        {hdr('Increments')}
      </div>

      {/* Body Rows */}
      {PLACEHOLDER_DATA.map((parent) => (
        <ActivityParentRow key={parent.id} parent={parent} expandAll={expandAll} />
      ))}
    </div>
  );
}

// ─── Parent Row ─────────────────────────────────────────────────────────────

function ActivityParentRow({ parent, expandAll }: { parent: ActivityParent; expandAll: boolean }) {
  const [isExpanded, setIsExpanded] = useState(parent.id === 'ea-1');
  const hasChildren = parent.children.length > 0;

  React.useEffect(() => {
    if (hasChildren) {
      setIsExpanded(expandAll);
    }
  }, [expandAll, hasChildren]);

  return (
    <>
      {/* Parent row */}
      <div
        className={`w-full border-b border-[#CDCED6] hover:bg-[#fafafa] transition-colors grid ${isExpanded ? 'bg-[#fafafa]' : ''}`}
        style={{
          gridTemplateColumns: FWP_GRID,
          borderLeft: isExpanded ? '4px solid #147DB9' : '4px solid transparent',
        }}
      >
        {/* Chevron */}
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer flex items-center justify-center bg-transparent border-none p-0"
              aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
            >
              {isExpanded ? (
                <ChevronDown className="size-[16px] text-[#1C2024]" />
              ) : (
                <ChevronRight className="size-[16px] text-[#1C2024] opacity-40" />
              )}
            </button>
          ) : (
            <button
              className="cursor-pointer flex items-center justify-center bg-transparent border-none p-0"
              aria-label="Expand row"
            >
              <ChevronRight className="size-[16px] text-[#1C2024] opacity-40" />
            </button>
          )}
        </div>
        {/* Executing Activity */}
        <div className="px-[12px] py-[12px] flex items-center overflow-visible">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1C2024] text-[14px] whitespace-nowrap">
            {parent.name}
          </p>
        </div>
        {/* Funding Source (empty for parent) */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0" />
        {/* Approved Tasking */}
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
            {parent.approvedTasking}
          </p>
        </div>
        {/* Funds on Board */}
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
            {parent.fundsOnBoard}
          </p>
        </div>
        {/* Increments Planned */}
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
            {parent.incrementsPlanned}
          </p>
        </div>
        {/* Remaining */}
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
            {parent.remaining}
          </p>
        </div>
        {/* Increments (empty) */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0" />
      </div>

      {/* Expanded child rows */}
      {isExpanded && hasChildren &&
        parent.children.map((child) => (
          <FundingSourceChildRow key={child.id} child={child} />
        ))
      }
    </>
  );
}

// ─── Child Row ──────────────────────────────────────────────────────────────

function FundingSourceChildRow({ child }: { child: FundingSourceChild }) {
  return (
    <div
      className="w-full border-b border-[#CDCED6] hover:bg-[#fafafa] transition-colors grid bg-white relative"
      style={{
        gridTemplateColumns: FWP_GRID,
        borderLeft: '4px solid #CDCED6',
      }}
    >
      {/* Chevron placeholder (empty) */}
      <div className="px-[12px] py-[12px] flex items-center min-w-0" />
      {/* Executing Activity (empty for child) — badge visually centered here via absolute positioning */}
      <div className="px-[12px] py-[12px] flex items-center min-w-0" />
      {/* Funding Source — badge is absolutely positioned into the Executing Activity column area */}
      <div className="px-[12px] py-[12px] min-w-0">
        {/* Absolutely positioned badge — centered within the Executing Activity column (starts at 48px, width 200px) */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none"
          style={{ left: '48px', width: '200px' }}
        >
          <div className="pointer-events-auto">
            <AppropriationBadge code={child.badge} />
          </div>
        </div>
        {/* Identifier + Year — left-aligned at the Funding Source column edge */}
        <div className="flex flex-col min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
            {child.identifier}
          </p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646C] text-[13px]">
            {child.year}
          </p>
        </div>
      </div>
      {/* Approved Tasking */}
      <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
          {child.approvedTasking}
        </p>
      </div>
      {/* Funds on Board */}
      <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
          {child.fundsOnBoard}
        </p>
      </div>
      {/* Increments Planned */}
      <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
          {child.incrementsPlanned}
        </p>
      </div>
      {/* Remaining */}
      <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1C2024] text-[14px] truncate">
          {child.remaining}
        </p>
      </div>
      {/* Increments (empty) */}
      <div className="px-[12px] py-[12px] flex items-center min-w-0" />
    </div>
  );
}
