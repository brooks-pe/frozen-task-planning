import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import PriorityCards from '../imports/PriorityCards-57-6242';
import VersionDropdown from './VersionDropdown';
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

function Info({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function ClockFading({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface FundingSourceRow {
  id: string;
  fundingSource: string;
  refCode: string;
  control: string;
  workingAuthorized: string;
  increments: string;
  remaining: string;
  hasError?: boolean;
  errorMessage?: string;
}

interface AppropriationRow {
  id: string;
  appropriation: string;
  subtitle: string;
  period: string;
  erpAuthorized: string;
  workingAuthorized: string;
  allocated: string;
  remaining: string;
  fundingSources: FundingSourceRow[];
}

export default function FundingDistribution() {
  const [selectedVersion, setSelectedVersion] = useState('current');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['o&mn']));
  const [searchValue, setSearchValue] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(3);
  const [yearFilter, setYearFilter] = useState<'active' | 'all'>('active');
  const [fdFiscalYear, setFdFiscalYear] = useState('All Fiscal Years');
  const [fdAppropriation, setFdAppropriation] = useState('All Appropriations');
  const [fdFundingSource, setFdFundingSource] = useState('All Funding Sources');
  const [infoTooltipVisible, setInfoTooltipVisible] = useState(false);
  const [workingAuthorizedValues, setWorkingAuthorizedValues] = useState<{ [key: string]: string }>({
    '1b1b-so': '$32,000,000',
    '1b1b-sx': '$11,000,000',
    '1b1b-sr': '$8,000,000',
  });

  const toggleRow = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const handleWorkingAuthorizedChange = (id: string, value: string) => {
    setWorkingAuthorizedValues({
      ...workingAuthorizedValues,
      [id]: value,
    });
    setUnsavedChanges(prev => prev + 1);
  };

  const tableData: AppropriationRow[] = [
    {
      id: 'o&mn',
      appropriation: 'O&MN',
      subtitle: 'Appropriation-level control for FY26 O&M...',
      period: 'FY26',
      erpAuthorized: '$50,000,000',
      workingAuthorized: '$50,000,000',
      allocated: '$41,000,000',
      remaining: '$9,000,000',
      fundingSources: [
        {
          id: '1b1b-so',
          fundingSource: '1B1B/C011B10-SO',
          refCode: 'ERP Ref: 2R2I52 • Line 01842',
          control: '$32,000,000',
          workingAuthorized: '$32,000,000',
          increments: '$26,000,000',
          remaining: '$6,000,000',
        },
        {
          id: '1b1b-sx',
          fundingSource: '1B1B/C011B10-SX',
          refCode: 'ERP Ref: 2R2I52 • Line 07200',
          control: '$11,000,000',
          workingAuthorized: '$11,000,000',
          increments: '$8,000,000',
          remaining: '$3,000,000',
        },
        {
          id: '1b1b-sr',
          fundingSource: '1B1B/C011B10-SR',
          refCode: 'ERP Ref: 2R2I52 • Line 02510',
          control: '$7,000,000',
          workingAuthorized: '$7,000,000',
          increments: '$1,000,000',
          remaining: '$6,000,000',
          hasError: true,
          errorMessage: 'Exceeds control for this funding source',
        },
      ],
    },
    {
      id: 'roten',
      appropriation: 'RDTEN',
      subtitle: 'Multi-year procurement authority distributed t...',
      period: 'FY25',
      erpAuthorized: '$20,000,000',
      workingAuthorized: '$20,000,000',
      allocated: '$15,000,000',
      remaining: '$5,000,000',
      fundingSources: [],
    },
    {
      id: 'opn',
      appropriation: 'OPN',
      subtitle: 'Multi-year procurement authority distributed t...',
      period: 'FY26',
      erpAuthorized: '$15,000,000',
      workingAuthorized: '$15,000,000',
      allocated: '$10,000,000',
      remaining: '$5,000,000',
      fundingSources: [],
    },
    {
      id: 'scn',
      appropriation: 'SCN',
      subtitle: 'Multi-year procurement authority distributed t...',
      period: 'FY27',
      erpAuthorized: '$5,000,000',
      workingAuthorized: '$5,000,000',
      allocated: '$1,000,000',
      remaining: '$4,000,000',
      fundingSources: [],
    },
    {
      id: 'apn',
      appropriation: 'APN',
      subtitle: 'Multi-year procurement authority distributed t...',
      period: 'FY25',
      erpAuthorized: '$10,000,000',
      workingAuthorized: '$10,000,000',
      allocated: '$3,000,000',
      remaining: '$7,000,000',
      fundingSources: [],
    },
  ];

  const expandableRowIds = useMemo(() => tableData.filter(r => r.fundingSources && r.fundingSources.length > 0).map(r => r.id), [tableData]);
  const allExpanded = expandableRowIds.length > 0 && expandableRowIds.every(id => expandedRows.has(id));
  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedRows(new Set());
    } else {
      setExpandedRows(new Set(expandableRowIds));
    }
  };

  const renderAppropriationRow = (row: AppropriationRow): JSX.Element[] => {
    const hasChildren = row.fundingSources && row.fundingSources.length > 0;
    const isExpanded = expandedRows.has(row.id);

    const elements: JSX.Element[] = [
      <div
        key={row.id}
        className="contents group"
        style={{
          display: 'contents',
        }}
      >
        {/* Chevron + Appropriation */}
        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover:bg-[rgba(0,0,85,0.02)] flex items-center gap-[8px]">
          {hasChildren ? (
            <button
              onClick={() => toggleRow(row.id)}
              className="w-[16px] h-[16px] flex items-center justify-center text-[#60646C] hover:text-[#1C2024] cursor-pointer flex-shrink-0"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <div className="w-[16px]" />
          )}
          <div className="flex flex-col">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024]">
              {row.appropriation}
            </span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C]">
              {row.subtitle}
            </span>
          </div>
        </div>

        {/* Period */}
        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover:bg-[rgba(0,0,85,0.02)] flex items-center">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
            {row.period}
          </span>
        </div>

        {/* ERP Authorized */}
        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover:bg-[rgba(0,0,85,0.02)] text-right">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
            {row.erpAuthorized}
          </span>
        </div>

        {/* Working Authorized */}
        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover:bg-[rgba(0,0,85,0.02)] text-right">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
            {row.workingAuthorized}
          </span>
        </div>

        {/* Allocated */}
        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover:bg-[rgba(0,0,85,0.02)] text-right">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
            {row.allocated}
          </span>
        </div>

        {/* Remaining */}
        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover:bg-[rgba(0,0,85,0.02)] text-right">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[20px] text-[#1C2024]">
            {row.remaining}
          </span>
        </div>
      </div>,
    ];

    // Render expanded funding sources
    if (hasChildren && isExpanded) {
      elements.push(
        <div
          key={`${row.id}-expanded`}
          className="contents"
        >
          {/* Expanded section header spanning all columns */}
          <div
            className="col-span-6 bg-[rgba(20,125,185,0.09)] border-b border-[rgba(0,0,47,0.15)]"
            style={{ gridColumn: '1 / -1' }}
          >
            {/* Left rail accent */}
            <div className="flex">
              <div className="w-[6px] bg-[#147db9] flex-shrink-0" />
              <div className="flex-1 p-[16px]">
                {/* Nested table for funding sources */}
                <div className="bg-[rgba(20,125,185,0.05)] border border-[rgba(0,0,47,0.15)] rounded-[4px] overflow-hidden">
                  {/* Nested table header */}
                  <div
                    className="grid bg-[#F9F9FB]"
                    style={{
                      gridTemplateColumns: 'minmax(280px, 2fr) minmax(100px, 0.8fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(240px, 1.2fr) minmax(100px, 0.7fr) 48px',
                    }}
                  >
                    <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)]">
                      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                        Funding Source
                      </span>
                    </div>
                    <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)]">
                      {/* Spacer column to align with parent Period column */}
                    </div>
                    <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] text-right">
                      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                        Control
                      </span>
                    </div>
                    <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] text-right">
                      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                        Working Authorized
                      </span>
                    </div>
                    <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] text-right">
                      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                        Increments
                      </span>
                    </div>
                    <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)] text-right">
                      <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                        Remaining
                      </span>
                    </div>
                    <div className="px-[12px] py-[8px] border-b border-[rgba(0,0,47,0.15)]">
                      {/* Actions column header - empty */}
                    </div>
                  </div>

                  {/* Nested table body */}
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: 'minmax(280px, 2fr) minmax(100px, 0.8fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(240px, 1.2fr) minmax(100px, 0.7fr) 48px',
                    }}
                  >
                    {row.fundingSources.map((fsRow) => (
                      <div key={fsRow.id} className="contents group/nested">
                        {/* Funding Source */}
                        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[#F9F9FB] flex flex-col">
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                            {fsRow.fundingSource}
                          </span>
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C]">
                            {fsRow.refCode}
                          </span>
                        </div>

                        {/* Spacer to align with parent Period column */}
                        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[#F9F9FB]">
                          {/* Empty spacer */}
                        </div>

                        {/* Control */}
                        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[#F9F9FB] flex items-center justify-end text-right">
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                            {fsRow.control}
                          </span>
                        </div>

                        {/* Working Authorized */}
                        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[#F9F9FB] flex flex-col gap-[4px]">
                          <input
                            type="text"
                            value={workingAuthorizedValues[fsRow.id] || fsRow.workingAuthorized}
                            onChange={(e) => handleWorkingAuthorizedChange(fsRow.id, e.target.value)}
                            className={`w-full px-[8px] py-[6px] border ${
                              fsRow.hasError
                                ? 'border-[#B42318] bg-[#FEF3F2]'
                                : 'border-[rgba(0,6,46,0.2)]'
                            } rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] text-right`}
                          />
                          {fsRow.hasError && (
                            <div className="flex items-center gap-[4px]">
                              <Info size={12} className="text-[#B42318] flex-shrink-0" />
                              <span className="font-['Inter:Regular',sans-serif] font-normal text-[11px] leading-[14px] text-[#B42318]">
                                {fsRow.errorMessage}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Increments (Read-only) */}
                        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[#F9F9FB] flex items-center justify-end text-right">
                          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                            {fsRow.increments}
                          </span>
                        </div>

                        {/* Remaining */}
                        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[#F9F9FB] flex items-center justify-end text-right">
                          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[20px] text-[#1C2024]">
                            {fsRow.remaining}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="px-[12px] py-[12px] border-b border-[rgba(0,0,47,0.15)] bg-white group-hover/nested:bg-[#F9F9FB] flex items-center justify-center">
                          <button className="w-[24px] h-[24px] flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] cursor-pointer">
                            <MoreVertical size={16} className="text-[#60646C]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return elements;
  };

  type FDSortColumn = 'appropriation' | 'period' | 'erpAuthorized' | 'workingAuthorized' | 'allocated' | 'remaining';
  const FD_CURRENCY_COLS: FDSortColumn[] = ['erpAuthorized', 'workingAuthorized', 'allocated', 'remaining'];

  const { sortColumn: fdSortCol, sortDirection: fdSortDir, handleSort: fdHandleSort, getDirection: fdGetDir } = useColumnSort<FDSortColumn>();

  const sortedData = useMemo(() => {
    if (!fdSortCol || !fdSortDir) return tableData;
    return [...tableData].sort((a, b) => {
      const type = FD_CURRENCY_COLS.includes(fdSortCol) ? 'currency' as const : 'string' as const;
      return compareValues(a[fdSortCol], b[fdSortCol], type, fdSortDir);
    });
  }, [tableData, fdSortCol, fdSortDir]);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col gap-[16px] px-[24px] py-[24px]">
        {/* Row 1: Version Dropdown and Action Buttons */}
        <div className="flex items-center justify-between py-[12px]">
          <div className="flex items-center gap-[8px]">
            <VersionDropdown
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-[24px]">
            <Link
              to="/execution-planning/dashboard"
              className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">← Back to Dashboard</p>
              </div>
            </Link>
            <button className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
              <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">Open Funding Authorization →</p>
              </div>
            </button>
            <button className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
              <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[14px] whitespace-nowrap">
                <p className="leading-[20px]">Export</p>
              </div>
            </button>
          </div>
        </div>

        {/* Row 2: Content Header - Title, Subtitle, and Breadcrumbs */}
        <div className="relative flex flex-col gap-[12px] py-[16px]">
          {/* Decorative divider lines */}
          <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
          
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[40px] text-[#1C2024]">
              Funding Distribution
            </h1>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C]">
              Authorize funds to APM projects.
            </p>
          </div>
          
          {/* Breadcrumbs */}
          <SyncPointBreadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'Execution Planning', path: '/execution-planning/dashboard' },
            { label: 'Funding Distribution' },
          ]} />
        </div>
      </div>

      {/* Filter Row */}
      <div className="px-[24px]">
        <CollapsibleFilterSection highContrast>
          <div className="flex items-end gap-[16px]">
            {/* Fiscal Year Filter */}
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Fiscal Year</p>
              <SearchableFilterDropdown
                value={fdFiscalYear}
                onChange={setFdFiscalYear}
                options={['All Fiscal Years', 'FY26', 'FY25', 'FY24']}
                className="min-w-[180px]"
              />
            </div>

            {/* Appropriation Filter */}
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Appropriation</p>
              <SearchableFilterDropdown
                value={fdAppropriation}
                onChange={setFdAppropriation}
                options={['All Appropriations', 'O&MN', 'ROTEN', 'OPN']}
                className="min-w-[180px]"
              />
            </div>

            {/* Funding Source Filter */}
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Funding Source</p>
              <SearchableFilterDropdown
                value={fdFundingSource}
                onChange={setFdFundingSource}
                options={['All Funding Sources', '1B1B/C011B10-SO', '1B1B/C011B10-SX', '1B1B/C011B10-SR']}
                className="min-w-[200px]"
              />
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
                      <svg
                        className="block w-full h-full"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path d="M0 8C0 3.58172 3.58172 0 8 0V0C12.4183 0 16 3.58172 16 8V8C16 12.4183 12.4183 16 8 16V16C3.58172 16 0 12.4183 0 8V8Z" fill="#004B72" />
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
                        <path d="M0 8C0 3.58172 3.58172 0 8 0V0C12.4183 0 16 3.58172 16 8V8C16 12.4183 12.4183 16 8 16V16C3.58172 16 0 12.4183 0 8V8Z" fill="#004B72" />
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
              onClick={() => setYearFilter('active')}
              className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,75,114,0.35)]"
              style={{ color: '#004B72' }}
            >
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
                Clear Filters
              </span>
            </button>
          </div>
        </CollapsibleFilterSection>
      </div>

      {/* KPI Summary Cards */}
      <div className="px-[24px] py-[24px]">
        <div className="grid grid-cols-4 gap-[24px]">
          {/* ERP Authorized Card */}
          <div className="relative flex items-stretch rounded-[5px]">
            <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
            <div className="bg-[#004b72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" />
            <div className="flex-1 flex flex-col gap-[8px] p-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#60646C]">
                ERP Authorized
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[normal] text-[#1C2024] tracking-[-1px]">
                $100M
              </p>
              <div className="mt-auto w-full">
                <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C]">
                  Appropriation ceiling (sum)
                </p>
              </div>
            </div>
          </div>

          {/* Working Authorized Card */}
          <div className="relative flex items-stretch rounded-[5px]">
            <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
            <div className="bg-[#004b72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" />
            <div className="flex-1 flex flex-col gap-[8px] p-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#60646C]">
                Working Authorized
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[normal] text-[#1C2024] tracking-[-1px]">
                $100M
              </p>
              <div className="mt-auto w-full">
                <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C]">
                  Authorized ceiling (sum)
                </p>
              </div>
            </div>
          </div>

          {/* Allocated Card */}
          <div className="relative flex items-stretch rounded-[5px]">
            <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
            <div className="bg-[#004b72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" />
            <div className="flex-1 flex flex-col gap-[8px] p-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#60646C]">
                Allocated
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[normal] text-[#1C2024] tracking-[-1px]">
                $70M
              </p>
              <div className="mt-auto w-full">
                <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C]">
                  Total authorized to funding sources
                </p>
              </div>
            </div>
          </div>

          {/* Remaining Card */}
          <div className="relative flex items-stretch rounded-[5px]">
            <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
            <div className="bg-[#004b72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" />
            <div className="flex-1 flex flex-col gap-[8px] p-[24px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#60646C]">
                Remaining
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[normal] text-[#1C2024] tracking-[-1px]">
                $30M
              </p>
              <div className="bg-[rgba(255,222,0,0.24)] flex items-center h-[28px] px-[10px] rounded-[100px] w-fit">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#ab6400]">
                  Available to Allocate
                </p>
              </div>
              <div className="mt-auto w-full">
                <div className="w-full border-t border-[#e0e1e6] mt-[16px] mb-[8px]" />
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646C]">
                  Remaining at appropriation level
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appropriations Table Section */}
      <div className="px-[24px] pb-[24px]">
        {/* Standardized Title Header — matches G-Invoicing / APM Acceptance / Reconciliation / Activity Distribution / Dashboard pattern */}
        <div className="bg-[#F9F9FB] relative rounded-tl-[5px] rounded-tr-[5px] border border-solid border-[#e0e1e6] border-b-0">
          <div className="flex items-center px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#d0d1d6]">
            <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
              <div className="flex items-center gap-[8px]">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] whitespace-nowrap">
                  Appropriations
                </p>
                <div
                  className="relative"
                  onMouseEnter={() => setInfoTooltipVisible(true)}
                  onMouseLeave={() => setInfoTooltipVisible(false)}
                  onFocus={() => setInfoTooltipVisible(true)}
                  onBlur={() => setInfoTooltipVisible(false)}
                >
                  <button
                    className="flex items-center justify-center w-[20px] h-[20px] rounded-full cursor-pointer bg-transparent border-none text-[#004B72] hover:text-[#003a57] transition-colors"
                    aria-label="Appropriations help information"
                    tabIndex={0}
                  >
                    <Info size={16} />
                  </button>
                  {infoTooltipVisible && (
                    <div
                      className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 z-[9999] bg-[#1c2024] text-white text-[12px] leading-[18px] px-[12px] py-[10px] rounded-[4px] shadow-lg w-[320px] text-left"
                    >
                      Set an Authorized amount at the appropriation level, then distribute that authority to funding source lines. Funding source totals must stay within the appropriation Authorized amount.
                    </div>
                  )}
                </div>
              </div>
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
                onClick={toggleExpandAll}
              >
                <ChevronsDown size={16} className={`transition-transform duration-200 ${allExpanded ? '' : '-rotate-90'}`} />
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
                  {allExpanded ? 'Collapse All' : 'Expand All'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border-l border-r border-[#e0e1e6] overflow-hidden">
          {/* Table Header */}
          <div
            className="grid bg-[rgba(0,0,85,0.02)]"
            style={{
              gridTemplateColumns: 'minmax(280px, 2fr) minmax(100px, 0.8fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(140px, 1fr)',
            }}
          >
            <div className="px-[12px] py-[12px] border-t border-b border-[rgba(0,0,47,0.15)] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] flex items-center" onClick={() => fdHandleSort('appropriation')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fdHandleSort('appropriation'); } }} aria-sort={fdGetDir('appropriation') === 'asc' ? 'ascending' : fdGetDir('appropriation') === 'desc' ? 'descending' : 'none'}>
              <div className="flex items-center gap-[6px]">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                  Appropriation
                </span>
                <SortIndicator direction={fdGetDir('appropriation')} inactiveColor="#1C2024" />
              </div>
            </div>
            <div className="px-[12px] py-[12px] border-t border-b border-[rgba(0,0,47,0.15)] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] flex items-center" onClick={() => fdHandleSort('period')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fdHandleSort('period'); } }} aria-sort={fdGetDir('period') === 'asc' ? 'ascending' : fdGetDir('period') === 'desc' ? 'descending' : 'none'}>
              <div className="flex items-center gap-[6px]">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                  Period
                </span>
                <SortIndicator direction={fdGetDir('period')} inactiveColor="#1C2024" />
              </div>
            </div>
            <div className="px-[12px] py-[12px] border-t border-b border-[rgba(0,0,47,0.15)] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] flex items-center" onClick={() => fdHandleSort('erpAuthorized')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fdHandleSort('erpAuthorized'); } }} aria-sort={fdGetDir('erpAuthorized') === 'asc' ? 'ascending' : fdGetDir('erpAuthorized') === 'desc' ? 'descending' : 'none'}>
              <div className="flex items-center gap-[6px] justify-end">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                  ERP Authorized
                </span>
                <SortIndicator direction={fdGetDir('erpAuthorized')} inactiveColor="#1C2024" />
              </div>
            </div>
            <div className="px-[12px] py-[12px] border-t border-b border-[rgba(0,0,47,0.15)] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] flex items-center" onClick={() => fdHandleSort('workingAuthorized')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fdHandleSort('workingAuthorized'); } }} aria-sort={fdGetDir('workingAuthorized') === 'asc' ? 'ascending' : fdGetDir('workingAuthorized') === 'desc' ? 'descending' : 'none'}>
              <div className="flex items-center gap-[6px] justify-end">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                  Working Authorized
                </span>
                <SortIndicator direction={fdGetDir('workingAuthorized')} inactiveColor="#1C2024" />
              </div>
            </div>
            <div className="px-[12px] py-[12px] border-t border-b border-[rgba(0,0,47,0.15)] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] flex items-center" onClick={() => fdHandleSort('allocated')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fdHandleSort('allocated'); } }} aria-sort={fdGetDir('allocated') === 'asc' ? 'ascending' : fdGetDir('allocated') === 'desc' ? 'descending' : 'none'}>
              <div className="flex items-center gap-[6px] justify-end">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                  Allocated
                </span>
                <SortIndicator direction={fdGetDir('allocated')} inactiveColor="#1C2024" />
              </div>
            </div>
            <div className="px-[12px] py-[12px] border-t border-b border-[rgba(0,0,47,0.15)] cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] flex items-center" onClick={() => fdHandleSort('remaining')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fdHandleSort('remaining'); } }} aria-sort={fdGetDir('remaining') === 'asc' ? 'ascending' : fdGetDir('remaining') === 'desc' ? 'descending' : 'none'}>
              <div className="flex items-center gap-[6px] justify-end">
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px]">
                  Remaining
                </span>
                <SortIndicator direction={fdGetDir('remaining')} inactiveColor="#1C2024" />
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'minmax(280px, 2fr) minmax(100px, 0.8fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(140px, 1fr) minmax(140px, 1fr)',
            }}
          >
            {sortedData.map((row) => renderAppropriationRow(row))}
          </div>
        </div>

        {/* Bottom Surface Bar (Footer) */}
        <div className="bg-[#F9F9FB] relative rounded-bl-[5px] rounded-br-[5px] h-[24px]">
          <div aria-hidden="true" className="absolute border-[#e0e1e6] border-b border-l border-r border-solid inset-0 pointer-events-none rounded-bl-[5px] rounded-br-[5px]" />
        </div>
      </div>

      {/* Footer Notes */}
      <div className="px-[24px] pb-[72px]">
        <div className="flex flex-col gap-[8px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C]">
            Working Authorized provides the planning ceiling. FARF allocations establish planning authority (intent). Allocations reflect executed funding commitments created in this
            system.
          </p>
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#1C2024]">
            Changes take effect immediately after you save.
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-0 z-20 bg-white px-[24px] py-[12px] flex items-center justify-between border-t border-[#E0E1E6]" style={{ boxShadow: '0 -6px 16px rgba(0,0,0,0.08)' }}>
        <div />
        <div className="flex items-center gap-[12px]">
          {/* Unsaved Changes Badge */}
          <div className="bg-[rgba(255,222,0,0.24)] flex gap-[4px] h-[28px] items-center px-[10px] rounded-[100px]">
            <ClockFading size={16} className="text-[#ab6400]" />
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] text-[#ab6400]">
              {unsavedChanges} Unsaved Changes
            </span>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => setUnsavedChanges(0)}
            className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1c2024]">
              Reset
            </span>
          </button>

          {/* Save Allocation Button */}
          <button className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#003a57] transition-colors">
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-white">
              Save Allocation
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}