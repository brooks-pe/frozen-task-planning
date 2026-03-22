import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { AlertCircle, Trash2, Undo2 } from 'lucide-react';
import VersionDropdown from './VersionDropdown';
import svgPathsMenu2 from '../imports/svg-r9w49sswi4';
import svgPathsMenu3 from '../imports/svg-fo8gzpfdez';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { useColumnSort, SortIndicator, compareValues } from './SortUtils';
import { ChevronDown, ChevronRight, ChevronsDown } from './InlineIcons';

// Page-specific search icon (16x16, different from the standard 14x14 SearchIcon)
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 13L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SquarePlusIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5V11M5 8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function KebabMenuIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="3" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Menu Icon Components
function PeEyeIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d={svgPathsMenu2.p1917ed00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPathsMenu2.p28db2b80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeSliceIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d={svgPathsMenu2.p5082b70} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeCheckIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d={svgPathsMenu3.p39be50} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeOctagonXIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <defs>
        <clipPath id="clip0_octagon">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip0_octagon)">
        <path d={svgPathsMenu3.p1eb89930} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// Badge with tooltip component
function BadgeWithTooltip({ taskId }: { taskId: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  
  // Only show tooltip for task 1-A-SP010
  if (taskId !== '1-A-SP010') {
    return (
      <div className="bg-[#ffc53d] shrink-0 h-[24px] w-[24px] flex items-center justify-center rounded-[4px]">
        <AlertCircle size={18} className="text-[#1c2024]" strokeWidth={2} />
      </div>
    );
  }
  
  return (
    <>
      <div 
        ref={badgeRef}
        className="bg-[#ffc53d] shrink-0 h-[24px] w-[24px] flex items-center justify-center rounded-[4px] relative cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AlertCircle size={18} className="text-[#1c2024]" strokeWidth={2} />
      </div>
      
      {showTooltip && (
        <div
          className="fixed z-[9999] bg-[#1c2024] text-white text-[12px] leading-[16px] px-[8px] py-[6px] rounded-[4px] shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            top: badgeRef.current ? `${badgeRef.current.getBoundingClientRect().top - 32}px` : '0px',
            left: badgeRef.current ? `${badgeRef.current.getBoundingClientRect().left + badgeRef.current.getBoundingClientRect().width / 2}px` : '0px',
            transform: 'translateX(-50%)',
          }}
        >
          Awaiting Requirements Validation — Accept or Reject
        </div>
      )}
    </>
  );
}

// Count Badge with tooltip component
function CountBadgeWithTooltip({ count }: { count: number }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  
  const tooltipText = count === 1 ? '1 action required' : `${count} actions required`;
  
  return (
    <>
      <div 
        ref={badgeRef}
        className="bg-[#ffc53d] h-[28px] px-[10px] flex items-center rounded-[4px] cursor-pointer relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="text-[14px] font-medium text-[#1c2024] leading-[20px]">
          {count}
        </span>
      </div>
      
      {showTooltip && (
        <div
          className="fixed z-[9999] bg-[#1c2024] text-white text-[12px] leading-[16px] px-[8px] py-[6px] rounded-[4px] shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            top: badgeRef.current ? `${badgeRef.current.getBoundingClientRect().top - 32}px` : '0px',
            left: badgeRef.current ? `${badgeRef.current.getBoundingClientRect().left + badgeRef.current.getBoundingClientRect().width / 2}px` : '0px',
            transform: 'translateX(-50%)',
          }}
        >
          {tooltipText}
        </div>
      )}
    </>
  );
}

// Task Action Menu Component
function TaskActionMenu({ task, onAccept, onReject, onTruncate }: { task: Task; onAccept: () => void; onReject: () => void; onTruncate: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const isAwaitingValidation = task.state === 'Awaiting Requirements Validation';

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] p-[4px]"
      >
        <KebabMenuIcon size={16} className="text-[#60646c]" />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-[100%] mt-[4px] z-20 bg-white rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)] p-[8px] w-[230px]">
            {isAwaitingValidation ? (
              // 3-option menu for "Awaiting Requirements Validation"
              <div className="flex flex-col gap-[8px]">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onAccept();
                  }}
                  className="bg-white h-[32px] rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
                >
                  <div className="flex items-center gap-[8px] px-[12px] h-full">
                    <PeCheckIcon className="text-[#1c2024]" />
                    <p className="flex-1 text-left font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      Accept Task
                    </p>
                  </div>
                </button>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onReject();
                  }}
                  className="bg-white h-[32px] rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
                >
                  <div className="flex items-center gap-[8px] px-[12px] h-full">
                    <PeOctagonXIcon className="text-[#1c2024]" />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] whitespace-nowrap">
                      Reject Task
                    </p>
                  </div>
                </button>
                <Link 
                  to={`/task-requirements-alignment/${task.taskId}`}
                  className="bg-white h-[32px] rounded-[4px] hover:bg-[#f5f5f5] transition-colors flex items-center"
                >
                  <div className="flex items-center gap-[8px] px-[12px] h-full w-full">
                    <PeEyeIcon className="text-[#1c2024]" />
                    <p className="flex-1 text-left font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      View Task
                    </p>
                  </div>
                </Link>
              </div>
            ) : (
              // 2-option menu for all other tasks
              <div className="flex flex-col gap-[8px]">
                <Link 
                  to={`/task-requirements-alignment/${task.taskId}`}
                  className="bg-white h-[32px] rounded-[4px] hover:bg-[#f5f5f5] transition-colors flex items-center"
                >
                  <div className="flex items-center gap-[8px] px-[12px] h-full w-full">
                    <PeEyeIcon className="text-[#1c2024]" />
                    <p className="flex-1 text-left font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      View Task
                    </p>
                  </div>
                </Link>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onTruncate();
                  }}
                  className="bg-white h-[32px] rounded-[4px] hover:bg-[#f5f5f5] transition-colors"
                >
                  <div className="flex items-center gap-[8px] px-[12px] h-full">
                    <Trash2 size={16} className="text-[#1c2024]" />
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] whitespace-nowrap">
                      Truncate Task in FY26
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface CostCodeRow {
  id: string;
  code: string;
  description: string;
  bli: string;
  fy: string;
  taskCount: number;
  requirementCount: number;
}

interface Task {
  id: string;
  taskId: string;
  title: string;
  activity: string;
  project: string;
  state: string;
}

export default function TaskRequirementsAlignmentContent() {
  const [roleFilter, setRoleFilter] = useState('Requirements Contributor');
  const [programFilter, setProgramFilter] = useState('LCS Mission Modules');
  const [fyFilter, setFyFilter] = useState('FY27');
  const [appropriationFilter, setAppropriationFilter] = useState('OPN');
  const [fundingSourceFilter, setFundingSourceFilter] = useState('BLI 1601/MC006');
  const [appnYearFilter, setAppnYearFilter] = useState('FY26');
  const [searchValue, setSearchValue] = useState('');
  const [hasUnsavedChanges] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['cc-1']));
  
  const tableData: CostCodeRow[] = [
    {
      id: 'cc-1',
      code: 'R-1.01',
      description: '[Example of a bottom-level (cost code) aligned requirement.]',
      bli: 'BLI 1601 / MC006',
      fy: 'FY26',
      taskCount: 5,
      requirementCount: 1,
    },
    {
      id: 'cc-2',
      code: 'R-1.02',
      description: '[Example of a bottom-level (cost code) aligned requirement.]',
      bli: 'BLI 1601 / MC006',
      fy: 'FY26',
      taskCount: 3,
      requirementCount: 1,
    },
    {
      id: 'cc-3',
      code: 'R-1.03',
      description: '[Example of a bottom-level (cost code) aligned requirement.]',
      bli: 'BLI 1601 / MC006',
      fy: 'FY26',
      taskCount: 0,
      requirementCount: 0,
    },
  ];

  const handleClearFilters = () => {
    setRoleFilter('My Role...');
    setProgramFilter('Program...');
    setFyFilter('FY...');
    setAppropriationFilter('Appropriation...');
    setFundingSourceFilter('Funding Source...');
    setAppnYearFilter('Appn. Year...');
  };

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Page Header */}
      <div className="bg-white px-[48px] py-[24px]">
        {/* Version Bar - Top Row */}
        <div className="flex items-start justify-between py-[12px] mb-[12px]">
          <VersionDropdown />
          <div className="flex gap-[24px] items-start">
            <button className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors relative">
              <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#004b72] text-[14px] leading-[20px] whitespace-nowrap">
                Go to next step →
              </span>
            </button>
            <button className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors relative">
              <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1c2024] text-[14px] leading-[20px] whitespace-nowrap">
                Export
              </span>
            </button>
          </div>
        </div>

        {/* Page Title Section */}
        <div className="flex flex-col gap-[12px] py-[16px] relative">
          <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
          
          {/* Title and Subtitle */}
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] text-[#1c2024] text-[32px]">
              Task-Requirements Alignment
            </h1>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#60646c] text-[18px]">
              Align task requirements within your scope.
            </p>
          </div>

          {/* Breadcrumb */}
          <SyncPointBreadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'Task Planning' },
            { label: 'Task-Requirements Alignment' },
          ]} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[48px] pb-[24px]">
        {/* Filter Bar */}
        <CollapsibleFilterSection highContrast className="mb-[24px]">
          <div className="flex items-end gap-[12px]">
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">My Role</p>
              <SearchableFilterDropdown
                value={roleFilter}
                onChange={setRoleFilter}
                options={['My Role…', 'Requirements Contributor', 'Execution Planning Admin', 'Budget Financial Manager', 'Financial Analyst', 'Assistant Program Manager', 'Deputy Assistant Program Manager', 'Activity Financial Point of Contact', 'Activity Technical Point of Contact']}
                triggerStyle={{ width: '220px', textOverflow: 'ellipsis', overflow: 'hidden' }}
              />
            </div>
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Program</p>
              <SearchableFilterDropdown
                value={programFilter}
                onChange={setProgramFilter}
                options={['Program…', 'LCS Mission Modules', 'Surface & Shallow Water MCM USV', 'AN/AQS-20', 'SMCM UUV', 'sUSV', 'CODB']}
                triggerStyle={{ width: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}
              />
            </div>
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Fiscal Year</p>
              <SearchableFilterDropdown
                value={fyFilter}
                onChange={setFyFilter}
                options={['FY…', 'FY24', 'FY25', 'FY26', 'FY27']}
              />
            </div>
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Appropriation</p>
              <SearchableFilterDropdown
                value={appropriationFilter}
                onChange={setAppropriationFilter}
                options={['Appropriation…', 'O&MN', 'RDTEN', 'OPN', 'SCN', 'WPN']}
              />
            </div>
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Funding Source</p>
              <div className="relative">
                <select
                  value={fundingSourceFilter}
                  onChange={(e) => setFundingSourceFilter(e.target.value)}
                  className="bg-white h-[32px] pl-[12px] pr-[32px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024] cursor-pointer appearance-none"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option>Funding Source…</option>
                  <option>BLI 1601/MC006</option>
                  <option>BLI 1601/H0014</option>
                  <option>BLI 1601/LM008</option>
                  <option>BLI 1601/LM012</option>
                  <option>BLI 1601/LM015</option>
                  <option>BLI 1601/LM016</option>
                  <option>BLI 1601/LM017</option>
                  <option>BLI 1601/SU002</option>
                  <option>BLI 1601/SU001</option>
                  <option>BLI 1601/SU004</option>
                </select>
                <ChevronDown
                  className="absolute right-[8px] top-[50%] -translate-y-1/2 pointer-events-none text-[#60646C]"
                  size={16}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[8px] items-start shrink-0">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">Appropriation Year</p>
              <div className="relative">
                <select
                  value={appnYearFilter}
                  onChange={(e) => setAppnYearFilter(e.target.value)}
                  className="bg-white h-[32px] pl-[12px] pr-[32px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024] cursor-pointer appearance-none"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option>Appn. Year…</option>
                  <option>FY24</option>
                  <option>FY25</option>
                  <option>FY26</option>
                  <option>FY27</option>
                </select>
                <ChevronDown
                  className="absolute right-[8px] top-[50%] -translate-y-1/2 pointer-events-none text-[#60646C]"
                  size={16}
                />
              </div>
            </div>
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
        </CollapsibleFilterSection>

        {/* Cost Codes Table */}
        <div className="border border-[#e0e1e6] rounded-[8px] overflow-hidden">
          {/* Standardized Title Header — matches Execution Plans pattern */}
          <div className="bg-[#f9f9fb] relative w-full">
            <div className="flex items-center px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#d0d1d6]">
              <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] whitespace-nowrap">
                  Requirements Execution Statements
                </p>
                {/* Vertical divider */}
                <div className="w-[1px] h-[24px] bg-[#e0e1e6] shrink-0" />
                {/* Search field */}
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
                {/* Expand All */}
                <button className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-transparent border-none text-[#1C2024] hover:text-[#000000] transition-colors">
                  <ChevronsDown size={16} className="-rotate-90" />
                  <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
                    Expand All
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white">
            {tableData.map((row) => {
              const isExpanded = expandedRows.has(row.id);
              return (
                <div key={row.id}>
                  <div className="border-b border-[rgba(0,0,47,0.15)]">
                    <div className="flex items-center h-[48px] px-[12px] gap-[12px]">
                      {/* Chevron */}
                      <button
                        onClick={() => toggleRowExpansion(row.id)}
                        className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
                        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                      >
                        {isExpanded ? (
                          <ChevronDown size={16} className="text-[#1c2024]" />
                        ) : (
                          <ChevronRight size={16} className="text-[#1c2024] opacity-40" />
                        )}
                      </button>

                      {/* Cost Code Info */}
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-[14px] font-medium text-[#1c2024] leading-[20px]">
                          {row.code}: {row.description}
                        </p>
                        <p className="text-[12px] text-[#60646c] leading-[16px] tracking-[0.04px]">
                          {row.bli} ({row.fy})
                        </p>
                      </div>

                      {/* Status Pills */}
                      <div className="flex items-center gap-[8px]">
                        {/* Task Count Pill */}
                        <div className="bg-[rgba(0,179,238,0.12)] h-[28px] px-[10px] flex items-center rounded-full">
                          <span className="text-[14px] text-[#00749e] leading-[20px]">
                            {row.taskCount} FY27 Tasks
                          </span>
                        </div>

                        {/* Requirement Count Badge */}
                        {row.requirementCount > 0 && (
                          <CountBadgeWithTooltip count={row.requirementCount} />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && <ExpandedContent costCodeId={row.id} />}
                </div>
              );
            })}
          </div>

          {/* Table Footer */}
          <div className="bg-[#f9f9fb] border-t border-[#e0e1e6] h-[41px] w-full" />
        </div>
      </div>
    </div>
  );
}

function ExpandedContent({ costCodeId }: { costCodeId: string }) {
  const [taskToTruncate, setTaskToTruncate] = useState<Task | null>(null);
  const [taskStates, setTaskStates] = useState<Record<string, { currentState: string; previousState: string | null }>>({});
  const [flashingTask, setFlashingTask] = useState<{ id: string; type: 'accept' | 'reject' | 'extend' } | null>(null);
  const [extendedTaskIds, setExtendedTaskIds] = useState<Set<string>>(new Set());
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  
  // Form state
  const [newTaskId, setNewTaskId] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newActivity, setNewActivity] = useState('');
  const [newProject, setNewProject] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  type TaskSortCol = 'taskId' | 'title' | 'activity' | 'project' | 'state';
  const { handleSort: handleActiveSort, getDirection: getActiveDirection, sortColumn: activeSortColumn, sortDirection: activeSortDirection } = useColumnSort<TaskSortCol>();
  const { handleSort: handleEndedSort, getDirection: getEndedDirection, sortColumn: endedSortColumn, sortDirection: endedSortDirection } = useColumnSort<TaskSortCol>();
  
  const [activeTasks, setActiveTasks] = useState<Task[]>([
    {
      id: 'task-1',
      taskId: '1-A-SP008',
      title: 'AN/AQS-20C Fairing Fabrication',
      activity: 'NSWC PC (A Dept)',
      project: 'MCM MM Support Equipment',
      state: 'Awaiting BOE Build-Up',
    },
    {
      id: 'task-2',
      taskId: '1-A-SP009',
      title: 'MCM USV Depot Support Equipment Procurement',
      activity: 'NSWC PC (A Dept)',
      project: 'MCM MM Support Equipment',
      state: 'Activity Approval',
    },
    {
      id: 'task-3',
      taskId: '1-A-SP010',
      title: 'RO/RO MVCS in a Box (RESCCU)',
      activity: 'NSWC PC (A Dept)',
      project: 'MCM MM Support Equipment',
      state: 'Awaiting Requirements Validation',
    },
    {
      id: 'task-4',
      taskId: '22-SP004',
      title: 'MCM MP Production Support',
      activity: 'NG',
      project: 'MCM MM Support Equipment',
      state: 'Awaiting Project Acceptance',
    },
    {
      id: 'task-5',
      taskId: '5-C-SP006',
      title: 'MCM AIT Management Support',
      activity: 'NSWC PHD (C Dept)',
      project: 'MCM MM Support Equipment',
      state: 'Awaiting BOE Build-Up',
    },
  ]);

  // Tasks Ended in FY26 data
  const endedTasks: Task[] = [
    {
      id: 'task-6',
      taskId: '1-A-SP001',
      title: 'Fiber Optics Expanded Beam Assembly Procurement',
      activity: 'NSWC PC (A Dept)',
      project: 'MCM MM Support Equipment',
      state: 'Approved',
    },
    {
      id: 'task-7',
      taskId: '397-SP001',
      title: 'MCODE GPS Procurement',
      activity: 'Textron',
      project: 'MCM MM Support Equipment',
      state: 'Approved',
    },
  ];

  const sortedActiveTasks = useMemo(() => {
    if (!activeSortColumn || !activeSortDirection) return activeTasks;
    return [...activeTasks].sort((a, b) => compareValues(
      (a as unknown as Record<string, string>)[activeSortColumn] ?? '',
      (b as unknown as Record<string, string>)[activeSortColumn] ?? '',
      'string', activeSortDirection
    ));
  }, [activeTasks, activeSortColumn, activeSortDirection]);

  const sortedEndedTasks = useMemo(() => {
    if (!endedSortColumn || !endedSortDirection) return endedTasks;
    return [...endedTasks].sort((a, b) => compareValues(
      (a as unknown as Record<string, string>)[endedSortColumn] ?? '',
      (b as unknown as Record<string, string>)[endedSortColumn] ?? '',
      'string', endedSortDirection
    ));
  }, [endedTasks, endedSortColumn, endedSortDirection]);

  const handleTruncateTask = () => {
    if (taskToTruncate) {
      setActiveTasks(activeTasks.filter(task => task.id !== taskToTruncate.id));
      setTaskToTruncate(null);
    }
  };

  const handleAcceptTask = (taskId: string) => {
    const task = activeTasks.find(t => t.id === taskId);
    if (!task) return;

    // Set flash animation
    setFlashingTask({ id: taskId, type: 'accept' });
    
    // Update task state
    setTaskStates(prev => ({
      ...prev,
      [taskId]: {
        currentState: 'Accepted',
        previousState: task.state,
      }
    }));

    // Clear flash after animation
    setTimeout(() => setFlashingTask(null), 600);
  };

  const handleRejectTask = (taskId: string) => {
    const task = activeTasks.find(t => t.id === taskId);
    if (!task) return;

    // Set flash animation
    setFlashingTask({ id: taskId, type: 'reject' });
    
    // Update task state
    setTaskStates(prev => ({
      ...prev,
      [taskId]: {
        currentState: 'Rejected',
        previousState: task.state,
      }
    }));

    // Clear flash after animation
    setTimeout(() => setFlashingTask(null), 600);
  };

  const handleUndoTask = (taskId: string) => {
    setTaskStates(prev => {
      const updated = { ...prev };
      delete updated[taskId];
      return updated;
    });
  };

  const handleExtendTask = (endedTask: Task) => {
    // Generate a new unique ID for the extended task
    const newTaskId = `extended-${endedTask.id}-${Date.now()}`;
    
    // Create the extended task with new state
    const extendedTask: Task = {
      ...endedTask,
      id: newTaskId,
      state: 'Awaiting Requirements Validation',
    };
    
    // Add to active tasks
    setActiveTasks(prev => [...prev, extendedTask]);
    
    // Track this task as extended (for badge display)
    setExtendedTaskIds(prev => new Set(prev).add(newTaskId));
    
    // Set flash animation for the new task
    setFlashingTask({ id: newTaskId, type: 'extend' });
    
    // Clear flash after animation
    setTimeout(() => setFlashingTask(null), 600);
  };

  const getTaskState = (task: Task) => {
    return taskStates[task.id]?.currentState || task.state;
  };

  const canUndo = (taskId: string) => {
    return taskStates[taskId]?.previousState !== null && taskStates[taskId]?.previousState !== undefined;
  };

  const getFlashClass = (taskId: string) => {
    if (flashingTask?.id === taskId) {
      if (flashingTask.type === 'accept') {
        return 'bg-[rgba(48,164,108,0.1)]'; // Soft green ~10% opacity
      } else if (flashingTask.type === 'reject') {
        return 'bg-[rgba(255,197,61,0.1)]'; // Soft amber ~10% opacity
      } else if (flashingTask.type === 'extend') {
        return 'bg-[rgba(0,179,238,0.1)]'; // Soft blue ~10% opacity
      }
    }
    return '';
  };

  const shouldShowBadge = (task: Task) => {
    // Show badge for task-3 (original) OR for any extended/newly added task with "Awaiting Requirements Validation" state
    return task.id === 'task-3' || (extendedTaskIds.has(task.id) && getTaskState(task) === 'Awaiting Requirements Validation') || (task.id.startsWith('new-') && getTaskState(task) === 'Awaiting Requirements Validation');
  };

  const handleAddTask = () => {
    // Clear previous errors when attempting to submit
    const errors: Record<string, string> = {};
    
    // Validate required fields
    if (!newTaskId.trim()) {
      errors.taskId = 'Required';
    } else {
      // Check for duplicate Task ID
      const isDuplicate = activeTasks.some(task => task.taskId === newTaskId.trim());
      if (isDuplicate) {
        errors.taskId = 'Task ID already exists. Enter a unique ID.';
      }
    }
    
    if (!newTaskTitle.trim()) errors.taskTitle = 'Required';
    if (!newActivity) errors.activity = 'Required';
    if (!newProject) errors.project = 'Required';
    
    setFormErrors(errors);

    // If no errors, add the task
    if (Object.keys(errors).length === 0) {
      const newTaskIdValue = `new-${Date.now()}`;
      const newTask: Task = {
        id: newTaskIdValue,
        taskId: newTaskId.trim(),
        title: newTaskTitle.trim(),
        activity: newActivity,
        project: newProject,
        state: 'Awaiting Requirements Validation',
      };
      
      // Add to active tasks
      setActiveTasks(prev => [...prev, newTask]);
      
      // Track this task as newly added (for badge display)
      setExtendedTaskIds(prev => new Set(prev).add(newTaskIdValue));
      
      // Set flash animation for the new task
      setFlashingTask({ id: newTaskIdValue, type: 'extend' });
      
      // Clear flash after animation
      setTimeout(() => setFlashingTask(null), 600);
      
      // Close modal and reset form
      setShowAddTaskModal(false);
      setNewTaskId('');
      setNewTaskTitle('');
      setNewActivity('');
      setNewProject('');
      setFormErrors({});
    }
  };

  const handleCancelAddTask = () => {
    setShowAddTaskModal(false);
    setNewTaskId('');
    setNewTaskTitle('');
    setNewActivity('');
    setNewProject('');
    setFormErrors({});
  };

  return (
    <div className="border-b border-[rgba(0,0,47,0.15)]">
      <div className="bg-[rgba(20,125,185,0.09)] border-l-[6px] border-l-[#147db9] px-[24px] py-[24px]">
        {/* Active FY27 Tasks Section */}
        <div className="bg-white rounded-[4px] border border-[rgba(0,0,47,0.15)] mb-[24px]">
          {/* Section Header */}
          <div className="bg-[#f9f9fb] border-b border-[rgba(0,0,47,0.15)] px-[12px] py-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-[#1C2024] leading-[24px]">
                Active FY27 Tasks
              </h3>
              <button 
                onClick={() => setShowAddTaskModal(true)}
                className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#003A57] transition-colors"
              >
                <SquarePlusIcon size={16} className="text-white" />
                <span className="font-['Inter:Medium',sans-serif] font-medium text-white text-[14px] leading-[20px] whitespace-nowrap">
                  Add New FY27 Task
                </span>
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-[#f9f9fb] border-b border-[rgba(0,0,47,0.15)] grid" style={{ gridTemplateColumns: '1fr 2fr 1fr 1.5fr 1.5fr 48px' }}>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleActiveSort('taskId')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActiveSort('taskId'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">TASK ID</p>
              <SortIndicator direction={getActiveDirection('taskId')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleActiveSort('title')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActiveSort('title'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">TASK TITLE</p>
              <SortIndicator direction={getActiveDirection('title')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleActiveSort('activity')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActiveSort('activity'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">ACTIVITY</p>
              <SortIndicator direction={getActiveDirection('activity')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleActiveSort('project')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActiveSort('project'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">PROJECT</p>
              <SortIndicator direction={getActiveDirection('project')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleActiveSort('state')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActiveSort('state'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">STATE</p>
              <SortIndicator direction={getActiveDirection('state')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center justify-center border-l border-[#d9d9d9]">
            </div>
          </div>

          {/* Table Rows */}
          {sortedActiveTasks.map((task) => (
            <div 
              key={task.id}
              className={`grid border-b border-[rgba(0,0,47,0.15)] hover:bg-[#fafafa] transition-colors ${getFlashClass(task.id)}`}
              style={{ gridTemplateColumns: '1fr 2fr 1fr 1.5fr 1.5fr 48px' }}
            >
              <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0">
                <Link 
                  to={`/task-requirements-alignment/${task.taskId}`}
                  className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#006496] text-[14px] truncate hover:underline"
                >
                  {task.taskId}
                </Link>
                {shouldShowBadge(task) && (
                  <BadgeWithTooltip taskId={task.taskId} />
                )}
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {task.title}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {task.activity}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {task.project}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <div className="flex items-center gap-[8px]">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                    {getTaskState(task)}
                  </p>
                  {canUndo(task.id) && (
                    <button
                      onClick={() => handleUndoTask(task.id)}
                      className="cursor-pointer hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] p-[2px]"
                      title="Undo"
                      aria-label="Undo"
                    >
                      <Undo2 size={16} className="text-[#60646c]" />
                    </button>
                  )}
                </div>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
                <TaskActionMenu 
                  task={task} 
                  onAccept={() => handleAcceptTask(task.id)}
                  onReject={() => handleRejectTask(task.id)}
                  onTruncate={() => setTaskToTruncate(task)} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Truncate Confirmation Modal */}
        {taskToTruncate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px] bg-black/50">
            {/* Modal Container */}
            <div className="bg-white max-h-[690px] max-w-[600px] relative rounded-[8px] shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-start max-h-[inherit] max-w-[inherit] overflow-x-clip overflow-y-auto py-[12px] relative w-full">
                {/* Text Container */}
                <div className="relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[12px] items-start px-[12px] relative w-full">
                    {/* Heading */}
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start relative shrink-0 w-full">
                      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[24px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[16px] whitespace-pre-wrap">
                        Truncate Task?
                      </p>
                    </div>
                    {/* Description */}
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start relative shrink-0 w-full">
                      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px] whitespace-pre-wrap">
                        <p className="mb-0">Are you sure you want to truncate this task for FY27?</p>
                        <p className="mb-0">&nbsp;</p>
                        <p className="mb-0">This will remove the task from the list of active FY27 tasks.</p>
                        <p>
                          <br aria-hidden="true" />
                          The task will remain available in prior fiscal years and can be extended again later if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Button Container */}
                <div className="relative shrink-0 w-full">
                  <div className="flex flex-row items-center justify-end size-full">
                    <div className="content-stretch flex gap-[8px] items-center justify-end px-[12px] relative w-full">
                      {/* Cancel */}
                      <button
                        onClick={() => setTaskToTruncate(null)}
                        className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 hover:bg-[rgba(0,0,51,0.1)] transition-colors cursor-pointer"
                      >
                        <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">Cancel</p>
                        </div>
                      </button>
                      {/* Action */}
                      <button
                        onClick={handleTruncateTask}
                        className="bg-[#e5484d] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 hover:bg-[#d13438] transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                          <p className="leading-[20px]">Truncate Task</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,51,0.06)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_16px_36px_-20px_rgba(0,6,46,0.2),0px_16px_64px_0px_rgba(0,0,85,0.02),0px_12px_60px_0px_rgba(0,0,0,0.15)]" />
            </div>
          </div>
        )}

        {/* Add Task Modal */}
        {showAddTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-[16px] bg-black/50">
            {/* Modal Container */}
            <div className="bg-white max-w-[400px] relative rounded-[12px] shrink-0 w-full max-h-[80vh] overflow-y-auto">
              <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
                {/* Title and Subtitle */}
                <div className="flex flex-col gap-[4px] w-full">
                  <h2 className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] text-[#1c2024] text-[20px] tracking-[-0.08px]">Add New FY27 Task</h2>
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] text-[#1c2024] text-[16px]">Create a new task aligned to this cost code for FY27.</p>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-[16px] w-full">
                  {/* Task ID Field */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex flex-col gap-[2px]">
                      <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Task ID*</label>
                      <p className="font-['Inter:Light',sans-serif] font-light leading-[16px] text-[#60646c] text-[12px] tracking-[0.04px]">Must be unique within FY27</p>
                    </div>
                    <input
                      type="text"
                      value={newTaskId}
                      onChange={(e) => {
                        setNewTaskId(e.target.value);
                        if (formErrors.taskId) {
                          const newErrors = { ...formErrors };
                          delete newErrors.taskId;
                          setFormErrors(newErrors);
                        }
                      }}
                      className="bg-[#f9f9fb] h-[32px] rounded-[4px] w-full border border-[rgba(0,0,47,0.15)] px-[12px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024] focus:border-[#004b72] focus:outline-0"
                    />
                    {formErrors.taskId && <p className="text-[#e5484d] text-[12px] leading-[16px] font-['Inter:Regular',sans-serif] font-normal">{formErrors.taskId}</p>}
                  </div>

                  {/* Task Title Field */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Task Title*</label>
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => {
                        setNewTaskTitle(e.target.value);
                        if (formErrors.taskTitle) {
                          const newErrors = { ...formErrors };
                          delete newErrors.taskTitle;
                          setFormErrors(newErrors);
                        }
                      }}
                      className="bg-[#f9f9fb] h-[32px] rounded-[4px] w-full border border-[rgba(0,0,47,0.15)] px-[12px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024] focus:border-[#004b72] focus:outline-0"
                    />
                    {formErrors.taskTitle && <p className="text-[#e5484d] text-[12px] leading-[16px] font-['Inter:Regular',sans-serif] font-normal">{formErrors.taskTitle}</p>}
                  </div>

                  {/* Activity Dropdown */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Activity*</label>
                    <div className="relative w-full">
                      <select
                        value={newActivity}
                        onChange={(e) => {
                          setNewActivity(e.target.value);
                          if (formErrors.activity) {
                            const newErrors = { ...formErrors };
                            delete newErrors.activity;
                            setFormErrors(newErrors);
                          }
                        }}
                        className="bg-[#f9f9fb] h-[32px] rounded-[4px] w-full border border-[rgba(0,6,46,0.2)] px-[12px] pr-[32px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024] cursor-pointer appearance-none focus:border-[#004b72] focus:outline-0"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                      >
                        <option value=""></option>
                        <option value="NSWC PC (A Dept)">NSWC PC (A Dept)</option>
                        <option value="NSWC PC (B Dept)">NSWC PC (B Dept)</option>
                        <option value="NSWC PC (C Dept)">NSWC PC (C Dept)</option>
                        <option value="NSWC PHD (A Dept)">NSWC PHD (A Dept)</option>
                        <option value="NSWC PHD (B Dept)">NSWC PHD (B Dept)</option>
                        <option value="NSWC PHD (C Dept)">NSWC PHD (C Dept)</option>
                        <option value="NG">NG</option>
                        <option value="Textron">Textron</option>
                      </select>
                      <ChevronDown
                        className="absolute right-[12px] top-[50%] -translate-y-1/2 pointer-events-none text-[#1c2024]"
                        size={16}
                      />
                    </div>
                    {formErrors.activity && <p className="text-[#e5484d] text-[12px] leading-[16px] font-['Inter:Regular',sans-serif] font-normal">{formErrors.activity}</p>}
                  </div>

                  {/* Project Dropdown */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Project*</label>
                    <div className="relative w-full">
                      <select
                        value={newProject}
                        onChange={(e) => {
                          setNewProject(e.target.value);
                          if (formErrors.project) {
                            const newErrors = { ...formErrors };
                            delete newErrors.project;
                            setFormErrors(newErrors);
                          }
                        }}
                        className="bg-[#f9f9fb] h-[32px] rounded-[4px] w-full border border-[rgba(0,6,46,0.2)] px-[12px] pr-[32px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1c2024] cursor-pointer appearance-none focus:border-[#004b72] focus:outline-0"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                      >
                        <option value=""></option>
                        <option value="LCS Mission Modules">LCS Mission Modules</option>
                        <option value="Surface & Shallow Water MCM USV">Surface & Shallow Water MCM USV</option>
                        <option value="AN/AQS-20">AN/AQS-20</option>
                        <option value="SMCM UUV">SMCM UUV</option>
                        <option value="sUSV">sUSV</option>
                        <option value="CODB">CODB</option>
                      </select>
                      <ChevronDown
                        className="absolute right-[12px] top-[50%] -translate-y-1/2 pointer-events-none text-[#1c2024]"
                        size={16}
                      />
                    </div>
                    {formErrors.project && <p className="text-[#e5484d] text-[12px] leading-[16px] font-['Inter:Regular',sans-serif] font-normal">{formErrors.project}</p>}
                  </div>

                  {/* Initial State Field (Read-only) */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex flex-col gap-[2px]">
                      <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Initial State</label>
                      <p className="font-['Inter:Light',sans-serif] font-light leading-[16px] text-[#60646c] text-[12px] tracking-[0.04px]">New tasks enter FY27 in this state by default.</p>
                    </div>
                    <div className="bg-[#f9f9fb] h-[32px] rounded-[4px] w-full border border-[rgba(0,0,47,0.15)] px-[12px] flex items-center">
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">Awaiting Requirements Validation</p>
                    </div>
                  </div>
                </div>

                {/* Button Container */}
                <div className="flex gap-[12px] items-center justify-end w-full">
                  {/* Cancel */}
                  <button
                    onClick={handleCancelAddTask}
                    className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] hover:bg-[rgba(0,0,51,0.1)] transition-colors cursor-pointer"
                  >
                    <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1c2024] text-[14px] leading-[20px]">Cancel</span>
                  </button>
                  {/* Add Task */}
                  <button
                    onClick={handleAddTask}
                    className="bg-[#004b72] flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] hover:bg-[#003A57] transition-colors cursor-pointer"
                  >
                    <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-white leading-[20px]">Add Task</span>
                  </button>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[rgba(0,0,51,0.06)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_16px_36px_-20px_rgba(0,6,46,0.2),0px_16px_64px_0px_rgba(0,0,85,0.02),0px_12px_60px_0px_rgba(0,0,0,0.15)]" />
            </div>
          </div>
        )}

        {/* Tasks Ended in FY26 Section */}
        <div className="bg-white rounded-[4px] border border-[rgba(0,0,47,0.15)]">
          {/* Section Header */}
          <div className="bg-[#f9f9fb] border-b border-[rgba(0,0,47,0.15)] px-[12px] py-[12px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-[#1C2024] leading-[24px]">
                Tasks Ended in FY26
              </h3>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-[#f9f9fb] border-b border-[rgba(0,0,47,0.15)] grid" style={{ gridTemplateColumns: '1fr 2fr 1fr 1.5fr 1.5fr 100px' }}>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)]" onClick={() => handleEndedSort('taskId')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEndedSort('taskId'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">TASK ID</p>
              <SortIndicator direction={getEndedDirection('taskId')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleEndedSort('title')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEndedSort('title'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">TASK TITLE</p>
              <SortIndicator direction={getEndedDirection('title')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleEndedSort('activity')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEndedSort('activity'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">ACTIVITY</p>
              <SortIndicator direction={getEndedDirection('activity')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleEndedSort('project')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEndedSort('project'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">PROJECT</p>
              <SortIndicator direction={getEndedDirection('project')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center gap-[6px] min-w-0 cursor-pointer select-none hover:bg-[rgba(0,0,85,0.04)] border-l border-[#d9d9d9]" onClick={() => handleEndedSort('state')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleEndedSort('state'); } }}>
              <p className="font-['Inter:SemiBold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[13px]">STATE</p>
              <SortIndicator direction={getEndedDirection('state')} inactiveColor="#1C2024" />
            </div>
            <div className="px-[12px] py-[12px] flex items-center justify-center border-l border-[#d9d9d9]">
            </div>
          </div>

          {/* Table Rows */}
          {sortedEndedTasks.map((task) => (
            <div 
              key={task.id}
              className="grid border-b border-[rgba(0,0,47,0.15)] last:border-b-0 hover:bg-[#fafafa] transition-colors"
              style={{ gridTemplateColumns: '1fr 2fr 1fr 1.5fr 1.5fr 100px' }}
            >
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <Link 
                  to="#"
                  className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#006496] text-[14px] truncate hover:underline"
                >
                  {task.taskId}
                </Link>
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {task.title}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {task.activity}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {task.project}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center min-w-0">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">
                  {task.state}
                </p>
              </div>
              <div className="px-[12px] py-[12px] flex items-center justify-end min-w-0">
                <button 
                  onClick={() => handleExtendTask(task)}
                  className="bg-white border border-[#1c2024] h-[28px] px-[12px] rounded-[4px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                >
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1c2024] text-[14px] leading-[20px] whitespace-nowrap">
                    Extend
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}