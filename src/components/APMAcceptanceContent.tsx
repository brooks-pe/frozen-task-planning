import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from './VersionDropdown';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { useColumnSort, SortIndicator, compareValues } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { ChevronDown, ChevronRight, ChevronsDown, ClockIcon, SearchIcon } from './InlineIcons';

// ─── Segmented Control (Header-level, matches G-Invoicing) ──────────────

type ReviewStatus = 'accept' | 'reject';

function SegmentedControl({
  label,
  options,
  selected,
  onChange,
  hideLabel,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0">
      {!hideLabel && (
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
          {label}
        </p>
      )}
      <div
        className="inline-flex w-fit h-[32px] items-center rounded-[4px] shrink-0 bg-[#F5F5F7] border border-solid border-[#e0e1e6] p-[2px] overflow-hidden box-border"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
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
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Row Status Segmented Control (inline in table) ──────────────────────

function RowStatusControl({
  status,
  rowId,
  onChange,
}: {
  status: ReviewStatus;
  rowId: string;
  onChange: (rowId: string, status: ReviewStatus) => void;
}) {
  const options: { value: ReviewStatus; label: string }[] = [
    { value: 'accept', label: 'Accept' },
    { value: 'reject', label: 'Reject' },
  ];

  return (
    <div
      className="inline-flex items-center rounded-[4px] bg-[#F5F5F7] border border-solid border-[#e0e1e6] p-[2px]"
      role="radiogroup"
      aria-label="Review Status"
    >
      {options.map((option) => {
        const isSelected = status === option.value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(rowId, option.value)}
            className={`px-[8px] py-[2px] rounded-[3px] cursor-pointer transition-colors duration-150 text-[12px] font-['Inter:${isSelected ? 'Medium' : 'Regular'}',sans-serif] ${isSelected ? 'font-medium' : 'font-normal'} leading-[16px] not-italic whitespace-nowrap border-none ${
              isSelected
                ? 'bg-[#DDEEF6] shadow-[inset_0_0_0_1px_#80BBDA] text-[#004B72]'
                : 'bg-transparent hover:bg-[rgba(255,255,255,0.5)] text-[#1C2024]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

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
}

export default function APMAcceptanceContent() {
  const [hasUnsavedChanges] = useState(true);
  
  const tableData: ActivityRow[] = [
    {
      id: 'act-1',
      plan: 'INC-014 • MVCS Tech Refresh Procure',
      activity: 'BLI 1210/H0014 (Standard Boats) (FY24)',
      fundingSource: '1B1B/ C011B1O-SO',
      project: 'Gun Module',
      appnYear: 'AY25',
      purpose: 'Contract Award',
      needDates: 'RE: 1 Jan 2025\nDC: 1 Aug 2025',
      funding: '$50,000,000',
    },
    {
      id: 'act-2',
      plan: 'INC-022 • Production Engineering',
      activity: 'BLI 1600/LM008 - MPCE (FY24)',
      fundingSource: '1C1C/ C01C9-00',
      project: 'SUW MP Sustainment',
      appnYear: 'AY26',
      purpose: 'Avoid Cost Growth',
      needDates: 'RE: 1 Feb 2025\nDC: 1 Sep 2025',
      funding: '$30,000,000',
    },
    {
      id: 'act-3',
      plan: 'INC-031 • STC-#2 Procurement',
      activity: 'BLI 1601/MC002 - MCM (FY24)',
      fundingSource: '1D4D/ C01C9L-HL',
      project: 'MPAS',
      appnYear: 'AY26',
      purpose: 'FY27 Q3 Deploy',
      needDates: 'RE: 1 Dec 2025\nDC: 1 Jun 2026',
      funding: '$15,000,000',
    },
    {
      id: 'act-4',
      plan: 'INC-064 • Mission Module Display',
      activity: 'BLI 1603/SU002 - SSMM (FY24)',
      fundingSource: '0605513N/ 3067',
      project: 'MPCE',
      appnYear: 'AY25',
      purpose: 'Update Supplies',
      needDates: 'RE: 1 Jan 2025\nDC: 6 Aug 2025',
      funding: '$10,000,000',
    },
    {
      id: 'act-5',
      plan: 'INC-071 • Mission Package Support',
      activity: 'BLI 1603/SU004 - SUW MP (FY24)',
      fundingSource: '0605512N/ 3428',
      project: 'SSSM',
      appnYear: 'AY25',
      purpose: 'Increase Capacity',
      needDates: 'RE: 1 Feb 2025\nDC: 1 Sep 2025',
      funding: '$25,000,000',
    },
  ];

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="flex flex-col items-start pl-[24px] pr-[24px] pt-[24px] pb-[72px] w-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <PageHeader />
          <FiltersRow />
          <KPICards />
          <ActivitiesTable tableData={tableData} />
        </div>
      </div>
      <FooterActions hasUnsavedChanges={hasUnsavedChanges} />
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
          <p className="leading-[20px]">← Back to Activity Distribution</p>
        </div>
      </Link>
      <Link 
        to="/apm-acceptance"
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Go to BFM Processing →</p>
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
          { label: 'APM Acceptance' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        APM Acceptance
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Accept or reject funds.
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
          <SearchableFilterDropdown value={program} onChange={setProgram} options={['All Programs', 'LCS', 'DDG', 'CVN']} />
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
          <SearchableFilterDropdown value={fundingSource} onChange={setFundingSource} options={['All Funding Sources', 'BLI 1210/H0014', 'BLI 1600/LM008', 'BLI 1601/MC002']} />
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
        label={<>Total<br />ERP Authorized (YTD)</>}
        value="$100M"
        detail="Last sync: 13 Jan 2026 08:10 ET"
        accentColor="#004b72"
      />
      <KPICard
        label={<>Total<br />BFM Working Authorized</>}
        value="$100M"
        detail="Published • Effective: 10 Jan 2026"
        accentColor="#004b72"
      />
      <KPICard
        label={<>Total<br />Holdback / Reserve</>}
        value="$12M"
        detail="BFM controlled"
        accentColor="#004b72"
      />
      <KPICard
        label={<>Total<br />Allocated to APMs</>}
        value="$70M"
        detail="Includes pending adjustments"
        accentColor="#004b72"
      />
      <KPICard
        label={<>Total<br />Remaining</>}
        value="$18M"
        pillText="Available to Allocate"
        helperText="4% Remaining"
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
        <div className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#60646c] text-[14px] w-full">
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
}: {
  tableData: ActivityRow[];
}) {
  const [searchValue, setSearchValue] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  // ─── Row status state (shared across parent + detail rows) ──────────
  const [rowStatuses, setRowStatuses] = useState<Record<string, ReviewStatus>>({});
  const [massChangeSelection, setMassChangeSelection] = useState<string>('');
  const [statusColumnPulse, setStatusColumnPulse] = useState(false);
  const pulseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStatusChange = useCallback((rowId: string, status: ReviewStatus) => {
    setRowStatuses((prev) => ({ ...prev, [rowId]: status }));
  }, []);

  const allRowIds = useMemo(() => {
    const ids = tableData.map((r) => r.id);
    ids.push('det-1', 'det-2', 'det-3');
    return ids;
  }, [tableData]);

  const handleMassChange = useCallback((value: string) => {
    setMassChangeSelection(value);
    if (value === 'accept' || value === 'reject') {
      setRowStatuses((prev) => {
        const next = { ...prev };
        allRowIds.forEach((id) => { next[id] = value as ReviewStatus; });
        return next;
      });
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      setStatusColumnPulse(true);
      pulseTimeoutRef.current = setTimeout(() => setStatusColumnPulse(false), 600);
    }
  }, [allRowIds]);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="table-section">
      {/* Top Surface (Header Area) — matches G-Invoicing toolbar pattern */}
      <div className="bg-[#f9f9fb] relative rounded-tl-[5px] rounded-tr-[5px] w-full border border-solid border-[#e0e1e6] border-b-0">
        <div className="flex items-center justify-between px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#d0d1d6]">
          {/* Left: Title | Search | Expand All */}
          <div className="flex items-center gap-[16px] shrink-0">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic text-[#1c2024] text-[20px] tracking-[-1px] whitespace-nowrap">
              Execution Plans
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

          {/* Right: Bulk Status Update inline */}
          <div className="flex items-center gap-[12px] shrink-0">
            <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px] whitespace-nowrap">
              Bulk Status Update:
            </span>
            <SegmentedControl
              label="Bulk Status Update"
              hideLabel
              options={[
                { value: 'accept', label: 'Accept' },
                { value: 'reject', label: 'Reject' },
              ]}
              selected={massChangeSelection}
              onChange={handleMassChange}
            />
          </div>
        </div>
      </div>
      <DataTable tableData={tableData} expandAll={expandAll} rowStatuses={rowStatuses} onStatusChange={handleStatusChange} statusColumnPulse={statusColumnPulse} />
    </div>
  );
}

function DataTable({
  tableData,
  expandAll,
  rowStatuses,
  onStatusChange,
  statusColumnPulse,
}: {
  tableData: ActivityRow[];
  expandAll: boolean;
  rowStatuses: Record<string, ReviewStatus>;
  onStatusChange: (rowId: string, status: ReviewStatus) => void;
  statusColumnPulse: boolean;
}) {
  type AASortCol = 'plan' | 'activity' | 'fundingSource' | 'project' | 'appnYear' | 'purpose' | 'needDates' | 'funding';
  const AA_CURRENCY: AASortCol[] = ['funding'];
  const { handleSort, getDirection, sortColumn, sortDirection } = useColumnSort<AASortCol>();

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return tableData;
    return [...tableData].sort((a, b) => {
      const type = AA_CURRENCY.includes(sortColumn) ? 'currency' as const : 'string' as const;
      return compareValues(
        (a as Record<string, string>)[sortColumn] ?? '',
        (b as Record<string, string>)[sortColumn] ?? '',
        type, sortDirection
      );
    });
  }, [tableData, sortColumn, sortDirection]);

  const GRID_COLS = '48px 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 240px';

  const hdr = (label: string, col: AASortCol, align?: 'right') => (
    <div className={`px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] ${align === 'right' ? 'justify-end text-right' : ''}`} onClick={() => handleSort(col)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort(col); } }}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate">{label}</p>
      <SortIndicator direction={getDirection(col)} inactiveColor="#1C2024" />
    </div>
  );

  return (
    <div className="bg-white content-stretch flex flex-col items-stretch relative shrink-0 w-full min-w-0 rounded-b-[5px]" data-name="table">
      <div aria-hidden="true" className="absolute border-l border-r border-b border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-b-[5px]" />
      
      {/* Header Row */}
      <div 
        className="bg-[#f9f9fb] border-b border-[#e0e1e6] w-full grid"
        style={{ gridTemplateColumns: GRID_COLS }}
        data-name="table-header"
      >
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0"></div>
        {hdr('PLAN', 'plan')}
        {hdr('ACTIVITY', 'activity')}
        {hdr('FUNDING SOURCE', 'fundingSource')}
        {hdr('PROJECT', 'project')}
        {hdr('APPN YEAR', 'appnYear')}
        {hdr('PURPOSE', 'purpose')}
        {hdr('NEED DATES', 'needDates')}
        {hdr('FUNDING', 'funding', 'right')}
        {/* ACTIONS column - not sortable */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px] truncate">ACTIONS</p>
        </div>
      </div>
      
      {/* Body Rows */}
      {sortedData.map((row) => (
        <ActivityTableRow key={row.id} row={row} expandAll={expandAll} gridCols={GRID_COLS} status={rowStatuses[row.id] as ReviewStatus} onStatusChange={onStatusChange} statusColumnPulse={statusColumnPulse} rowStatuses={rowStatuses} />
      ))}
    </div>
  );
}

function ActivityTableRow({
  row,
  expandAll,
  gridCols,
  status,
  onStatusChange,
  statusColumnPulse,
  rowStatuses,
}: {
  row: ActivityRow;
  expandAll: boolean;
  gridCols: string;
  status: ReviewStatus;
  onStatusChange: (rowId: string, status: ReviewStatus) => void;
  statusColumnPulse: boolean;
  rowStatuses: Record<string, ReviewStatus>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandable = row.id === 'act-1'; // Only first row is expandable

  return (
    <>
      <div 
        className={`w-full border-b border-[#e0e1e6] hover:bg-[#fafafa] transition-colors grid ${isExpanded ? 'bg-[#f9f9fb]' : ''}`}
        style={{ gridTemplateColumns: gridCols }}
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
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] whitespace-pre-line">
            {row.needDates}
          </p>
        </div>
        <div className="px-[12px] py-[12px] flex items-center justify-end text-right min-w-0">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
            {row.funding}
          </p>
        </div>
        {/* Actions: Segmented control */}
        <div className={`px-[12px] py-[12px] flex items-center min-w-0 transition-[background-color] duration-[400ms] ease-in-out ${statusColumnPulse ? 'bg-[rgba(0,179,238,0.08)]' : ''}`}>
          <RowStatusControl status={status} rowId={row.id} onChange={onStatusChange} />
        </div>
      </div>

      {/* Expanded Detail Panel */}
      {isExpanded && isExpandable && (
        <DetailPanel rowStatuses={rowStatuses} onStatusChange={onStatusChange} statusColumnPulse={statusColumnPulse} />
      )}
    </>
  );
}

function DetailPanel({
  rowStatuses,
  onStatusChange,
  statusColumnPulse,
}: {
  rowStatuses: Record<string, ReviewStatus>;
  onStatusChange: (rowId: string, status: ReviewStatus) => void;
  statusColumnPulse: boolean;
}) {
  const [activities] = useState([
    { id: 'det-1', incrementLabel: '1-1014 (FY26)', name: 'Defense Technical Information Center', approvedTasking: '$720,538.00', onWorkPlan: '$680,000.00', apmAuthorized: '$720,538.00' },
    { id: 'det-2', incrementLabel: '1-1015 (FY26)', name: 'Anchor Innovation Inc', approvedTasking: '$850,420.00', onWorkPlan: '$800,000.00', apmAuthorized: '$850,420.00' },
    { id: 'det-3', incrementLabel: '1-1016 (FY26)', name: 'Re-SPLY Grintech', approvedTasking: '$650,300.00', onWorkPlan: '$620,000.00', apmAuthorized: '$650,300.00' },
  ]);

  // State for editable fields
  const [editableData, setEditableData] = useState<{
    [key: string]: {
      reAmount: string;
      dcAmount: string;
      rbe: string;
      valueStatement: string;
    };
  }>({
    'det-1': { reAmount: '0.00', dcAmount: '0.00', rbe: '', valueStatement: '' },
    'det-2': { reAmount: '0.00', dcAmount: '0.00', rbe: '', valueStatement: '' },
    'det-3': { reAmount: '0.00', dcAmount: '0.00', rbe: '', valueStatement: '' },
  });

  const handleFieldChange = (activityId: string, field: string, value: string) => {
    setEditableData(prev => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-full border-b border-[#e0e1e6]" style={{ gridColumn: '1 / -1' }}>
      <div className="bg-[rgba(20,125,185,0.09)] border-l-[6px] border-l-[#147db9] px-[24px] py-[24px]">
        {/* Activities Table */}
        <div className="bg-white rounded-[4px] border border-[rgba(0,0,47,0.15)]">
          {/* Table Header */}
          <div className="bg-[#f5f5f5] grid border-b-2 border-[rgba(0,0,47,0.15)] px-[12px] py-[12px]" style={{ gridTemplateColumns: 'repeat(10, minmax(0, 1fr)) 240px' }}>
            <div className="flex items-center">
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Tasking</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Approved Tasking</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Increments</p>
            </div>
            <div className="flex items-center">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Auth</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Distributed</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Remaining</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">RE Amount</p>
            </div>
            <div className="flex items-center justify-end text-right">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">DC Amount</p>
            </div>
            <div className="flex items-center">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">RBE</p>
            </div>
            <div className="flex items-center">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Value Statement</p>
            </div>
            <div className="flex items-center">
              <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Actions</p>
            </div>
          </div>

          {/* Table Rows */}
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="grid border-b border-[rgba(0,0,47,0.15)] px-[12px] py-[12px] hover:bg-[#fafafa] transition-colors"
              style={{ gridTemplateColumns: 'repeat(10, minmax(0, 1fr)) 240px' }}
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
              <div className="flex items-center justify-end text-right gap-[4px]">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  $0.00
                </p>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#60646C]">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="5.5" r="0.75" fill="currentColor" />
                </svg>
              </div>
              
              {/* Auth - empty */}
              <div className="flex items-center">
              </div>
              
              {/* Distributed - read-only $0.00 */}
              <div className="flex items-center justify-end text-right">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  $0.00
                </p>
              </div>
              
              {/* Remaining - empty */}
              <div className="flex items-center">
              </div>
              
              {/* RE Amount - editable currency input */}
              <div className="flex items-center pr-[8px]">
                <div className="relative w-full">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024]">
                    $
                  </span>
                  <input
                    type="text"
                    value={editableData[activity.id]?.reAmount || '0.00'}
                    onChange={(e) => handleFieldChange(activity.id, 'reAmount', e.target.value)}
                    className="w-full h-[32px] pl-[20px] pr-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                  />
                </div>
              </div>
              
              {/* DC Amount - editable currency input */}
              <div className="flex items-center pr-[16px]">
                <div className="relative w-full">
                  <span className="absolute left-[8px] top-1/2 -translate-y-1/2 font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024]">
                    $
                  </span>
                  <input
                    type="text"
                    value={editableData[activity.id]?.dcAmount || '0.00'}
                    onChange={(e) => handleFieldChange(activity.id, 'dcAmount', e.target.value)}
                    className="w-full h-[32px] pl-[20px] pr-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                  />
                </div>
              </div>
              
              {/* RBE - editable text input */}
              <div className="flex items-center pr-[8px]">
                <input
                  type="text"
                  value={editableData[activity.id]?.rbe || ''}
                  onChange={(e) => handleFieldChange(activity.id, 'rbe', e.target.value)}
                  className="w-full h-[32px] px-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                />
              </div>
              
              {/* Value Statement - editable text input with placeholder */}
              <div className="flex items-center pr-[8px]">
                <input
                  type="text"
                  value={editableData[activity.id]?.valueStatement || ''}
                  onChange={(e) => handleFieldChange(activity.id, 'valueStatement', e.target.value)}
                  placeholder="Add value statement…"
                  className="w-full h-[32px] px-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#004b72] focus:ring-1 focus:ring-[#004b72]"
                />
              </div>
              
              {/* Actions: Segmented control */}
              <div className={`flex items-center transition-[background-color] duration-[400ms] ease-in-out ${statusColumnPulse ? 'bg-[rgba(0,179,238,0.08)]' : ''}`}>
                <RowStatusControl status={rowStatuses[activity.id] as ReviewStatus} rowId={activity.id} onChange={onStatusChange} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterActions({ hasUnsavedChanges }: { hasUnsavedChanges: boolean }) {
  return (
    <div className="sticky bottom-0 z-20 bg-white px-[24px] py-[12px] flex items-center justify-between border-t border-[#E0E1E6]" style={{ boxShadow: '0 -6px 16px rgba(0,0,0,0.08)' }} data-name="footer-actions">
      <div />
      <div className="flex items-center gap-[12px]">
        {hasUnsavedChanges && (
          <div className="bg-[rgba(255,222,0,0.24)] content-stretch flex gap-[6px] h-[32px] items-center px-[12px] relative rounded-[100px] shrink-0">
            <ClockIcon className="text-[#ab6400] size-[16px]" />
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#ab6400] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">3 Unsaved Changes</p>
            </div>
          </div>
        )}
        <button 
          className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
          data-name="pe-button"
        >
          <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Save Authorization</p>
          </div>
        </button>
        <button 
          className="bg-[#004b72] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003350] transition-colors" 
          data-name="pe-button"
        >
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-white text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Publish Authorization</p>
          </div>
        </button>
      </div>
    </div>
  );
}