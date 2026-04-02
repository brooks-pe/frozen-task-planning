import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import PriorityCards from '../imports/PriorityCards-57-6242';
import VersionDropdown from './VersionDropdown';
import QuickFilterRow from '../imports/QuickFilterRow-57-6386';
import { TableRowData, getFilteredData } from './ExecutionPlansTableData';
import { CollapsibleFilterSection } from './CollapsibleFilterSection';
import { SearchableFilterDropdown } from './SearchableFilterDropdown';
import { useColumnSort, SortIndicator, compareValues } from './SortUtils';
import type { SortDirection } from './SortUtils';
import { ChevronDown, ChevronsDown, SearchIcon } from './InlineIcons';

// Simulated data generator for KPI cards
function getKPIData(activeFilters: number) {
  const datasets = [
    // Baseline (no filters) - Higher starting values
    {
      allIncrements: { total: 250, completed: 186, completedAmount: '$95,738,976', inProgress: 64, inProgressAmount: '$24,543,030' },
      readyForExecution: { total: 28, onTrack: 23, onTrackAmount: '$9,385,688', atRisk: 4, atRiskAmount: '$1,256,897', past: 1, pastAmount: '$743,103' },
      awaitingBFM: { total: 36, onTrack: 28, onTrackAmount: '$10,250,564', atRisk: 6, atRiskAmount: '$2,356,764', past: 2, pastAmount: '$650,014' },
      incrementsBeingDefined: { total: 0, onTrack: 0, onTrackAmount: '$0', atRisk: 0, atRiskAmount: '$0', past: 0, pastAmount: '$0' },
    },
    // 1 filter (~35% reduction)
    {
      allIncrements: { total: 118, completed: 62, completedAmount: '$185,000,000', inProgress: 56, inProgressAmount: '$220,000,000' },
      readyForExecution: { total: 40, onTrack: 22, onTrackAmount: '$27,000,000', atRisk: 12, atRiskAmount: '$18,000,000', past: 6, pastAmount: '$14,000,000' },
      awaitingBFM: { total: 21, onTrack: 12, onTrackAmount: '$44,000,000', atRisk: 6, atRiskAmount: '$34,000,000', past: 3, pastAmount: '$25,000,000' },
      incrementsBeingDefined: { total: 18, onTrack: 9, onTrackAmount: '$29,000,000', atRisk: 6, atRiskAmount: '$23,000,000', past: 3, pastAmount: '$18,000,000' },
    },
    // 2 filters (~60% reduction)
    {
      allIncrements: { total: 73, completed: 38, completedAmount: '$114,000,000', inProgress: 35, inProgressAmount: '$136,000,000' },
      readyForExecution: { total: 25, onTrack: 14, onTrackAmount: '$17,000,000', atRisk: 7, atRiskAmount: '$11,000,000', past: 4, pastAmount: '$9,000,000' },
      awaitingBFM: { total: 13, onTrack: 7, onTrackAmount: '$27,000,000', atRisk: 4, atRiskAmount: '$21,000,000', past: 2, pastAmount: '$15,000,000' },
      incrementsBeingDefined: { total: 11, onTrack: 6, onTrackAmount: '$18,000,000', atRisk: 3, atRiskAmount: '$14,000,000', past: 2, pastAmount: '$11,000,000' },
    },
    // 3 filters (~75% reduction)
    {
      allIncrements: { total: 46, completed: 24, completedAmount: '$71,000,000', inProgress: 22, inProgressAmount: '$85,000,000' },
      readyForExecution: { total: 16, onTrack: 9, onTrackAmount: '$11,000,000', atRisk: 5, atRiskAmount: '$7,000,000', past: 2, pastAmount: '$6,000,000' },
      awaitingBFM: { total: 8, onTrack: 4, onTrackAmount: '$17,000,000', atRisk: 3, atRiskAmount: '$13,000,000', past: 1, pastAmount: '$9,000,000' },
      incrementsBeingDefined: { total: 7, onTrack: 4, onTrackAmount: '$11,000,000', atRisk: 2, atRiskAmount: '$9,000,000', past: 1, pastAmount: '$7,000,000' },
    },
  ];
  
  return datasets[activeFilters] || datasets[0];
}

// Simulated data generator for Priority Cards
function getPriorityCardData(activeFilters: number) {
  const datasets = [
    // Baseline (no filters)
    {
      awaitingBFM: [
        { title: 'INC-016 • Littoral Combat Ship Mission Modules →', description: 'Missing funding line mapping for 2 tasks', amount: '$1,000,000', dueDate: '29 Jan 2026', status: 'Past' },
        { title: 'INC-019 • Electromagnetic Sweep Cables →', description: 'Dependencies resolved', amount: '$2,000,000', dueDate: '15 Feb 2026', status: 'At Risk' },
        { title: 'INC-024 • Buried Minehunting Module →', description: 'Converts WBS', amount: '$3,000,000', dueDate: '10 Feb 2026', status: 'At Risk' },
      ],
      risksActions: [
        { title: 'INC-067 • Training Program Management →', description: 'Risk: Insufficient staff allocated', amount: '$2,000,000', dueDate: '15 Jan 2026', status: 'Past' },
        { title: 'INC-210 • Littoral Combat Ship Mission Modules →', description: 'Action: Missing funding line mapping for 2 tasks', amount: '$1,000,000', dueDate: '10 Feb 2026', status: 'At Risk' },
        { title: 'INC-024 • Buried Minehunting Module →', description: 'Concerns Requires BFM engagement', amount: '$3,000,000', dueDate: '10 Feb 2026', status: 'At Risk' },
      ],
      bfmWorking: '$30,000,000',
      apmAuth: '$15,000,000',
    },
    // 1 filter (~35% reduction)
    {
      awaitingBFM: [
        { title: 'INC-024 • Radar System Integration →', description: 'Technical review in progress', amount: '$3,800,000', dueDate: '18 Feb 2026', status: 'At Risk' },
        { title: 'INC-031 • Combat Systems Upgrade →', description: 'Awaiting BFM approval', amount: '$2,500,000', dueDate: '22 Feb 2026', status: 'At Risk' },
        { title: 'INC-045 • Weapons Control Systems →', description: 'Contract documentation pending', amount: '$1,800,000', dueDate: '28 Feb 2026', status: 'At Risk' },
      ],
      risksActions: [
        { title: 'INC-042 • Propulsion System Overhaul →', description: 'Risk: Schedule delay mitigation needed', amount: '$2,400,000', dueDate: '28 Jan 2026', status: 'Past' },
        { title: 'INC-018 • Navigation Equipment Modernization →', description: 'Action: Funding reallocation required', amount: '$1,600,000', dueDate: '25 Jan 2026', status: 'Past' },
        { title: 'INC-055 • Sensor Suite Upgrade →', description: 'Risk: Technical dependency identified', amount: '$1,200,000', dueDate: '8 Feb 2026', status: 'At Risk' },
      ],
      bfmWorking: '$16,000,000',
      apmAuth: '$10,000,000',
    },
    // 2 filters (~60% reduction)
    {
      awaitingBFM: [
        { title: 'INC-052 • Sonar Systems Enhancement →', description: 'Dependencies under review', amount: '$2,900,000', dueDate: '15 Feb 2026', status: 'At Risk' },
        { title: 'INC-067 • Electronic Warfare Suite →', description: 'Contract negotiations ongoing', amount: '$1,800,000', dueDate: '20 Feb 2026', status: 'At Risk' },
        { title: 'INC-089 • Fire Control Systems →', description: 'Technical assessment required', amount: '$1,200,000', dueDate: '25 Feb 2026', status: 'At Risk' },
      ],
      risksActions: [
        { title: 'INC-033 • Hull Maintenance Program →', description: 'Risk: Critical path issue identified', amount: '$1,800,000', dueDate: '27 Jan 2026', status: 'Past' },
        { title: 'INC-025 • Deck Equipment Replacement →', description: 'Action: Budget reconciliation needed', amount: '$1,100,000', dueDate: '22 Jan 2026', status: 'Past' },
        { title: 'INC-047 • Communications Infrastructure →', description: 'Risk: Vendor coordination issue', amount: '$800,000', dueDate: '5 Feb 2026', status: 'At Risk' },
      ],
      bfmWorking: '$10,000,000',
      apmAuth: '$6,000,000',
    },
    // 3 filters (~75% reduction)
    {
      awaitingBFM: [
        { title: 'INC-076 • Command & Control Systems →', description: 'Final approval stage', amount: '$2,100,000', dueDate: '12 Feb 2026', status: 'At Risk' },
        { title: 'INC-091 • Communications Infrastructure →', description: 'Stakeholder review pending', amount: '$1,400,000', dueDate: '18 Feb 2026', status: 'At Risk' },
        { title: 'INC-103 • Sensor Integration Module →', description: 'Documentation finalization', amount: '$900,000', dueDate: '22 Feb 2026', status: 'At Risk' },
      ],
      risksActions: [
        { title: 'INC-048 • Power Distribution System →', description: 'Risk: Urgent action required', amount: '$1,200,000', dueDate: '25 Jan 2026', status: 'Past' },
        { title: 'INC-029 • Cooling System Modernization →', description: 'Action: Risk mitigation in progress', amount: '$700,000', dueDate: '20 Jan 2026', status: 'Past' },
        { title: 'INC-038 • Electrical Infrastructure →', description: 'Risk: Resource constraint identified', amount: '$500,000', dueDate: '2 Feb 2026', status: 'At Risk' },
      ],
      bfmWorking: '$6,000,000',
      apmAuth: '$4,000,000',
    },
  ];
  
  return datasets[activeFilters] || datasets[0];
}

export default function ExecutionPlanningDashboard() {
  const [activeFilter, setActiveFilter] = useState('All In Progress');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Top filter state
  const [appropriation, setAppropriation] = useState('All Appropriations');
  const [fundingSource, setFundingSource] = useState('All Funding Sources');
  const [appropriationYear, setAppropriationYear] = useState('All Appropriation Years');

  const handleClearFilters = () => {
    setActiveFilter('All In Progress');
  };

  const handleClearTopFilters = () => {
    setAppropriation('All Appropriations');
    setFundingSource('All Funding Sources');
    setAppropriationYear('All Appropriation Years');
  };

  // Count active top filters
  let activeTopFilters = 0;
  if (appropriation !== 'All Appropriations') activeTopFilters++;
  if (fundingSource !== 'All Funding Sources') activeTopFilters++;
  if (appropriationYear !== 'All Appropriation Years') activeTopFilters++;

  // Get simulated KPI data
  const kpiData = getKPIData(activeTopFilters);
  const priorityData = getPriorityCardData(activeTopFilters);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header Section */}
      <div className="bg-white px-[24px] pt-[24px] pb-0">
        <div className="flex flex-col gap-[16px]">
          {/* Row 1: Action Row - Version dropdown and buttons */}
          <div className="flex items-center justify-between py-[12px]">
            {/* Left: Version Dropdown */}
            <div className="flex items-center gap-[8px]">
              <VersionDropdown />
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-[24px]">
              <button className="bg-[#004B72] hover:bg-[#003D5C] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] h-[32px] px-[12px] rounded-[4px] border-none cursor-pointer">
                Create Execution Plan
              </button>
              <button className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1C2024] text-[14px] whitespace-nowrap">
                  <p className="leading-[20px]">Generate Brief</p>
                </div>
              </button>
              <button className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                <div aria-hidden="true" className="absolute border border-[#B9BBC6] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1C2024] text-[14px] whitespace-nowrap">
                  <p className="leading-[20px]">Export</p>
                </div>
              </button>
            </div>
          </div>

          {/* Row 2: Content Header - Title, Subtitle, and Breadcrumbs */}
          <div className="relative flex flex-col gap-[12px] py-[16px]">
            {/* Decorative divider lines */}
            <div aria-hidden="true" className="absolute border-[#004B72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
            
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[32px] leading-[40px] text-[#1C2024]">
                Execution Planning
              </h1>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[24px] text-[#60646C]">
                Convert the plan into executable work, money, and measurable outcomes.
              </p>
            </div>
            
            {/* Breadcrumbs */}
            <SyncPointBreadcrumb items={[
              { label: 'Home', path: '/' },
              { label: 'Execution Planning' },
              { label: 'Dashboard' },
            ]} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-[24px] py-[24px]">
        <div className="flex flex-col gap-[24px]">
          {/* Filter Container */}
          <CollapsibleFilterSection highContrast>
              <div className="flex items-end gap-[12px]">
                <div className="flex flex-col gap-[8px] items-start shrink-0">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">Appropriation</p>
                  <SearchableFilterDropdown
                    value={appropriation}
                    onChange={setAppropriation}
                    options={['All Appropriations', 'O&MN', 'OPN', 'RDTEN', 'SCN', 'WPN']}
                  />
                </div>
                <div className="flex flex-col gap-[8px] items-start shrink-0">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">Funding Source</p>
                  <SearchableFilterDropdown
                    value={fundingSource}
                    onChange={setFundingSource}
                    options={[
                      'All Funding Sources',
                      '1B1B/C011B1-SO', '1B1B/C011B1-SX', '1C1C/C01C9-00', '1D4D/C01C9-IL',
                      '0605513N/3067', '0605512N/3428', '0605513N/2550', '0605513N/4101',
                      '0605513N/4700', '0605512N/1980',
                      'BLI 4221/SB00075', 'BLI 4221/SB0001', 'BLI 9020/JC1LM',
                      'BLI 1319/PE0603513N', 'BLI 1319/PE0603553N',
                      'BLI 1506/OPN00045', 'BLI 1507/OPN00112',
                      'BLI 1810/PROC0021', 'BLI 1810/PROC0098',
                      'BLI 2040/OMN11032'
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-[8px] items-start shrink-0">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px]">Appropriation Year</p>
                  <SearchableFilterDropdown
                    value={appropriationYear}
                    onChange={setAppropriationYear}
                    options={[
                      'All Appropriation Years',
                      'AY25', 'AY25–AY26', 'AY25–AY27', 'AY25–AY29',
                      'AY26', 'AY26–AY27', 'AY26–AY28', 'AY26–AY30'
                    ]}
                  />
                </div>
                <button 
                  className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(20,125,185,0.22)]"
                  onClick={handleClearTopFilters}
                  style={{ color: '#004B72' }}
                >
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
                    Clear Filters
                  </span>
                </button>
              </div>
          </CollapsibleFilterSection>

          {/* KPI Cards - Inlined with dynamic data */}
          <div className="grid gap-[24px] items-stretch relative" style={{ gridTemplateColumns: 'repeat(4, minmax(275px, 1fr))' }}>
            {/* All Increments Card */}
            <div className="flex items-stretch relative rounded-[5px] self-stretch" data-name="KPI-card">
              <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="bg-[#004B72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" data-name="Left-Border-Decoration" />
              <div className="flex flex-1 w-full min-w-0 flex-col gap-[16px] items-start p-[24px] relative" data-name="card content">
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#60646C] text-[16px]">All Increments</p>
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[32px] text-[#1C2024] tracking-[-1px] w-[42px] whitespace-pre-wrap">{kpiData.allIncrements.total}</p>
                </div>
                <div className="flex flex-col items-start relative shrink-0 w-full">
                  <div className="flex gap-[8px] items-start relative w-full">
                    <div className="flex flex-col items-start justify-between pt-[2px] relative self-stretch shrink-0">
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">Completed:</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">In Progress:</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                      <div className="bg-[rgba(0,179,238,0.12)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#00749E] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.allIncrements.completed}</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,222,0,0.24)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#AB6400] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.allIncrements.inProgress}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between pt-[2px] relative self-stretch ml-auto">
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.allIncrements.completedAmount}</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.allIncrements.inProgressAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto w-full">
                  <div className="w-full border-t border-[#CDCED6] mt-[16px] mb-[8px]" />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">Across FY scope</p>
                </div>
              </div>
            </div>

            {/* Ready for Execution Card */}
            <div className="flex items-stretch relative rounded-[5px]" data-name="KPI-card">
              <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#004B72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" data-name="Left-Border-Decoration" />
              </div>
              <div className="flex flex-1 w-full min-w-0 flex-col gap-[16px] items-start p-[24px] relative" data-name="card content">
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#60646C] text-[16px]">Ready for Execution</p>
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[32px] text-[#1C2024] tracking-[-1px] w-[42px] whitespace-pre-wrap">{kpiData.readyForExecution.total}</p>
                </div>
                <div className="flex flex-col items-start relative shrink-0 w-full">
                  <div className="flex gap-[16px] items-start relative w-full">
                    <div className="flex flex-col items-start justify-between pt-[2px] relative self-stretch shrink-0">
                      <div className="flex items-center justify-center relative shrink-0 w-[63px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">On Track:</p>
                      </div>
                      <div className="flex items-center relative shrink-0 w-[63px]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">At Risk:</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">Past:</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                      <div className="bg-[rgba(0,164,51,0.1)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#218358] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.readyForExecution.onTrack}</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,222,0,0.24)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#AB6400] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.readyForExecution.atRisk}</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(243,0,13,0.08)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#CE2C31] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.readyForExecution.past}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between pt-[2px] relative self-stretch ml-auto">
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.readyForExecution.onTrackAmount}</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.readyForExecution.atRiskAmount}</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.readyForExecution.pastAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto w-full">
                  <div className="w-full border-t border-[#CDCED6] mt-[16px] mb-[8px]" />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">{`Validated scope & funding`}</p>
                </div>
              </div>
            </div>

            {/* Awaiting BFM Processing Card */}
            <div className="flex items-stretch relative rounded-[5px]" data-name="KPI-card">
              <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#004B72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" data-name="Left-Border-Decoration" />
              </div>
              <div className="flex flex-1 w-full min-w-0 flex-col gap-[16px] items-start p-[24px] relative" data-name="card content">
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#60646C] text-[16px]">Awaiting BFM Processing</p>
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[32px] text-[#1C2024] tracking-[-1px] w-[42px] whitespace-pre-wrap">{kpiData.awaitingBFM.total}</p>
                </div>
                <div className="flex flex-col items-start relative shrink-0 w-full">
                  <div className="flex gap-[16px] items-start relative w-full">
                    <div className="flex flex-col items-start justify-between pt-[2px] relative self-stretch shrink-0">
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">On Track:</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">At Risk:</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">Past:</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                      <div className="bg-[rgba(0,164,51,0.1)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#218358] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.awaitingBFM.onTrack}</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,222,0,0.24)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#AB6400] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.awaitingBFM.atRisk}</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(243,0,13,0.08)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#CE2C31] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.awaitingBFM.past}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between pt-[2px] relative self-stretch ml-auto">
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.awaitingBFM.onTrackAmount}</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.awaitingBFM.atRiskAmount}</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.awaitingBFM.pastAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto w-full">
                  <div className="w-full border-t border-[#CDCED6] mt-[16px] mb-[8px]" />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">Schedule, funding, or dependency</p>
                </div>
              </div>
            </div>

            {/* Increments Being Defined Card */}
            <div className="flex items-stretch relative rounded-[5px]" data-name="KPI-card">
              <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="flex flex-row items-center self-stretch">
                <div className="bg-[#004B72] h-full rounded-bl-[5px] rounded-tl-[5px] shrink-0 w-[12px]" data-name="Left-Border-Decoration" />
              </div>
              <div className="flex flex-1 w-full min-w-0 flex-col gap-[16px] items-start p-[24px] relative" data-name="card content">
                <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#60646C] text-[16px]">Increments Being Defined</p>
                <div className="flex gap-[8px] items-center relative shrink-0">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[32px] text-[#1C2024] tracking-[-1px] w-[42px] whitespace-pre-wrap">{kpiData.incrementsBeingDefined.total}</p>
                </div>
                <div className="flex flex-col items-start relative shrink-0 w-full">
                  <div className="flex gap-[16px] items-start relative w-full">
                    <div className="flex flex-col items-start justify-between pt-[2px] relative self-stretch shrink-0">
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">On Track:</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">At Risk:</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">Past:</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[16px] items-start relative shrink-0">
                      <div className="bg-[rgba(0,164,51,0.1)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#218358] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.incrementsBeingDefined.onTrack}</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,222,0,0.24)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#AB6400] text-[14px] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.incrementsBeingDefined.atRisk}</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(243,0,13,0.08)] flex gap-[6px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[4px] shrink-0 w-[40px]" data-name="pe-badge">
                        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#CE2C31] whitespace-nowrap">
                          <p className="leading-[20px]">{kpiData.incrementsBeingDefined.past}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between pt-[2px] relative self-stretch ml-auto">
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.incrementsBeingDefined.onTrackAmount}</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.incrementsBeingDefined.atRiskAmount}</p>
                      </div>
                      <div className="flex items-center justify-center relative shrink-0">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px] text-right">{kpiData.incrementsBeingDefined.pastAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto w-full">
                  <div className="w-full border-t border-[#CDCED6] mt-[16px] mb-[8px]" />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#60646C] text-[14px]">Requires approval or direction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Panels - NOTE: Priority Cards currently static, can be updated similarly if needed */}
          <PriorityCards data={priorityData} />

          {/* Quick Filter Pills */}
          <CollapsibleFilterSection highContrast>
            <QuickFilterRow selectedFilter={activeFilter} onFilterChange={setActiveFilter} onClearFilters={handleClearFilters} />
          </CollapsibleFilterSection>

          {/* Portfolio Table */}
          <PortfolioTable activeFilter={activeFilter} />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  badge,
  badgeTextColor,
  badgeBackgroundColor,
  accentColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  badge?: string;
  badgeTextColor?: string;
  badgeBackgroundColor?: string;
  accentColor: string;
}) {
  return (
    <div className="bg-white rounded-[8px] border border-[#CDCED6] overflow-hidden">
      <div className="h-[6px]" style={{ backgroundColor: accentColor }} />
      <div className="p-[20px] flex flex-col gap-[12px]">
        <div className="flex items-start justify-between">
          <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#60646C]">
            {title}
          </span>
          {badge && (
            <span
              className="px-[10px] py-[4px] rounded-[100px] font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px]"
              style={{ backgroundColor: badgeBackgroundColor, color: badgeTextColor }}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[40px] leading-[48px] text-[#1C2024] tracking-[-1px]">
          {value}
        </div>
        <div className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] text-[#60646C]">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

type DashboardSortColumn = 'plan' | 'activity' | 'fundingSource' | 'appnYear' | 'purpose' | 'needDates' | 'funding' | 'status' | 'health';

const DASHBOARD_CURRENCY_COLS: DashboardSortColumn[] = ['funding'];

function PortfolioTable({ activeFilter }: { activeFilter: string }) {
  const { sortColumn, sortDirection, handleSort, getDirection } = useColumnSort<DashboardSortColumn>();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  const toggleRow = (rowIndex: number) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  };

  // Shared grid template - single source of truth for column alignment
  // Adjusted for container fit: more balanced column widths
  const gridTemplate = 'minmax(200px, 2fr) minmax(100px, 1fr) minmax(120px, 1.2fr) 90px minmax(120px, 1fr) 140px 100px minmax(110px, 1fr) 100px';

  const tableData: TableRowData[] = getFilteredData(activeFilter);

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return tableData;
    return [...tableData].sort((a, b) => {
      const type = DASHBOARD_CURRENCY_COLS.includes(sortColumn) ? 'currency' : 'string';
      return compareValues(
        (a as Record<string, string>)[sortColumn] ?? '',
        (b as Record<string, string>)[sortColumn] ?? '',
        type,
        sortDirection
      );
    });
  }, [tableData, sortColumn, sortDirection]);

  // Calculate pagination values
  const totalRecords = sortedData.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Determine if any rows support expansion (currently none do)
  const hasExpandableRows = false;

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-white rounded-[5px] overflow-hidden border border-[#CDCED6] relative">
      
      {/* Standardized Title Header — matches G-Invoicing / APM Acceptance / Reconciliation / Activity Distribution pattern */}
      <div className="bg-[#f9f9fb] relative w-full">
        <div className="flex items-center px-[24px] py-[20px] w-full border-b-[2px] border-solid border-b-[#CDCED6]">
          <div className="flex items-center gap-[16px] shrink-0 flex-wrap">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] whitespace-nowrap">
              Execution Plans
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
            {hasExpandableRows && (
              <button
                onClick={() => setExpandAll(!expandAll)}
                className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-transparent border-none text-[#1C2024] hover:text-[#000000] transition-colors"
              >
                <ChevronsDown size={16} className={`transition-transform duration-200 ${expandAll ? '' : '-rotate-90'}`} />
                <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
                  {expandAll ? 'Collapse All' : 'Expand All'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="relative">
        {/* Header Row */}
        <div
          className="grid bg-[#F3F6FA] border-b border-[#CDCED6]"
          style={{ gridTemplateColumns: gridTemplate, padding: '12px 12px 12px 24px' }}
        >
          <TableHeader label="Plan" sortable activeSortDirection={getDirection('plan')} onSort={() => handleSort('plan')} />
          <TableHeader label="Activity" sortable activeSortDirection={getDirection('activity')} onSort={() => handleSort('activity')} />
          <TableHeader label="Funding Source" sortable activeSortDirection={getDirection('fundingSource')} onSort={() => handleSort('fundingSource')} />
          <TableHeader label="Appn Year" sortable activeSortDirection={getDirection('appnYear')} onSort={() => handleSort('appnYear')} />
          <TableHeader label="Purpose" sortable activeSortDirection={getDirection('purpose')} onSort={() => handleSort('purpose')} />
          <TableHeader label="Need Dates" sortable activeSortDirection={getDirection('needDates')} onSort={() => handleSort('needDates')} />
          <TableHeader label="Funding" sortable activeSortDirection={getDirection('funding')} onSort={() => handleSort('funding')} align="right" />
          <TableHeader label="Status" sortable activeSortDirection={getDirection('status')} onSort={() => handleSort('status')} />
          <TableHeader label="Health" sortable activeSortDirection={getDirection('health')} onSort={() => handleSort('health')} />
        </div>

        {/* Table Body */}
        {paginatedData.map((row, index) => (
          <TableRow
            key={index}
            gridTemplate={gridTemplate}
            isExpanded={expandedRow === index}
            onToggle={() => toggleRow(index)}
            {...row}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="bg-[#F3F6FA] px-[24px] py-[12px] border-t border-[#CDCED6] flex items-center justify-between">
        <div className="flex items-center gap-[16px]">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
            Rows per page:
          </span>
          <div className="relative">
            <select
              className="bg-white h-[32px] pl-[12px] pr-[32px] rounded-[4px] border border-[#B9BBC6] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer appearance-none"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown 
              className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-[#1C2024]" 
              size={16}
            />
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
            {startIndex + 1}–{endIndex} of {totalRecords}
          </span>
          <div className="flex items-center gap-[8px]">
            <button
              className="bg-white hover:bg-[#F9F9FB] text-[#1C2024] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] px-[12px] py-[6px] rounded-[4px] border border-[#B9BBC6] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-white hover:bg-[#F9F9FB] text-[#1C2024] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] px-[12px] py-[6px] rounded-[4px] border border-[#B9BBC6] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableHeader({
  label,
  sortable,
  activeSortDirection,
  onSort,
  align,
}: {
  label: string;
  sortable?: boolean;
  activeSortDirection?: SortDirection | null;
  onSort?: () => void;
  align?: 'left' | 'right';
}) {
  return (
    <div
      className={`flex items-center gap-[6px] font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#1C2024] uppercase tracking-[0.5px] ${
        sortable ? 'cursor-pointer select-none hover:text-[#000000]' : ''
      } ${align === 'right' ? 'justify-end text-right pr-[16px]' : ''}`}
      onClick={sortable ? onSort : undefined}
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      onKeyDown={sortable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSort?.(); } } : undefined}
      aria-sort={sortable ? (activeSortDirection === 'asc' ? 'ascending' : activeSortDirection === 'desc' ? 'descending' : 'none') : undefined}
    >
      {label}
      {sortable && <SortIndicator direction={activeSortDirection ?? null} inactiveColor="#1C2024" />}
    </div>
  );
}

function TableRow({
  gridTemplate,
  plan,
  activity,
  fundingSource,
  appnYear,
  purpose,
  needDates,
  funding,
  status,
  statusColor,
  statusBg,
  health,
  healthColor,
  healthBg,
  isExpanded,
  onToggle,
}: {
  gridTemplate: string;
  plan: string;
  activity: string;
  fundingSource: string;
  appnYear: string;
  purpose: string;
  needDates: string;
  funding: string;
  status: string;
  statusColor: string;
  statusBg: string;
  health: string;
  healthColor: string;
  healthBg: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`grid border-b border-[#CDCED6] transition-colors ${
        isHovered ? 'bg-[#F9F9FB]' : 'bg-white'
      }`}
      style={{ gridTemplateColumns: gridTemplate, padding: '12px 12px 12px 24px', minHeight: '48px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center overflow-hidden">
        <a 
          href="#" 
          className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#147DB9] hover:underline line-clamp-2"
          title={plan}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {plan}
        </a>
      </div>
      <div className="flex items-center overflow-hidden">
        <span 
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] line-clamp-2"
          title={activity}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {activity}
        </span>
      </div>
      <div className="flex items-center overflow-hidden">
        <span 
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] line-clamp-2"
          title={fundingSource}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {fundingSource}
        </span>
      </div>
      <div className="flex items-center overflow-hidden">
        <span 
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] line-clamp-2"
          title={appnYear}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {appnYear}
        </span>
      </div>
      <div className="flex items-center overflow-hidden">
        <span 
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] line-clamp-2"
          title={purpose}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {purpose}
        </span>
      </div>
      <div className="flex items-center overflow-hidden">
        <span 
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]"
          title={needDates.replace('\\n', ' ')}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            whiteSpace: 'pre-line',
          }}
        >
          {needDates}
        </span>
      </div>
      <div className="flex items-center justify-end overflow-hidden pr-[16px]">
        <span 
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] line-clamp-2 text-right"
          title={funding}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {funding}
        </span>
      </div>
      <div className="flex items-center overflow-hidden">
        <span 
          className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] line-clamp-2"
          title={status}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center">
        <span
          className="px-[10px] py-[4px] rounded-[100px] font-['Inter:Bold',sans-serif] font-bold text-[14px] leading-[20px] h-[28px] flex items-center whitespace-nowrap"
          style={{ backgroundColor: healthBg, color: healthColor }}
          title={health}
        >
          {health}
        </span>
      </div>
    </div>
  );
}

