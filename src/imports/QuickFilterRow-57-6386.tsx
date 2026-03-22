import { useState } from 'react';

const STATUS_FILTERS = [
  'All In Progress',
  'Activity Distribution',
  'APM Acceptance',
  'BFM Processing',
  'Preparing for Execution',
  'Ready for Execution',
];

const HEALTH_FILTERS = [
  'At Risk',
  'Past',
  'Completed',
];

function FilterPill({ label, isSelected, onClick }: { label: string; isSelected: boolean; onClick: () => void }) {
  if (isSelected) {
    return (
      <button
        onClick={onClick}
        className="bg-[rgba(20,125,185,0.09)] content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 cursor-pointer border-none"
        data-name="filter-pill"
      >
        <div aria-hidden="true" className="absolute border-2 border-[#004b72] border-solid inset-0 pointer-events-none rounded-[100px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c2024] text-[14px] text-ellipsis whitespace-nowrap">
          <p className="leading-[20px] overflow-hidden">{label}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-white content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 cursor-pointer border-none hover:bg-[#f9f9fb]"
      data-name="summary-pill"
    >
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c2024] text-[14px] text-ellipsis whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">{label}</p>
      </div>
    </button>
  );
}

export default function QuickFilterRow({ 
  selectedFilter, 
  onFilterChange,
  onClearFilters
}: { 
  selectedFilter: string; 
  onFilterChange: (filter: string) => void;
  onClearFilters?: () => void;
}) {
  return (
    <div className="flex flex-col gap-[12px] w-full" data-name="left-filters">
      {/* Status Row */}
      <div className="flex items-center gap-[6px]">
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px] shrink-0">STATUS: </span>
        {STATUS_FILTERS.map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            isSelected={selectedFilter === filter}
            onClick={() => onFilterChange(filter)}
          />
        ))}
      </div>
      {/* Health Row */}
      <div className="flex items-center gap-[6px]">
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1C2024] text-[14px] shrink-0">HEALTH: </span>
        {HEALTH_FILTERS.map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            isSelected={selectedFilter === filter}
            onClick={() => onFilterChange(filter)}
          />
        ))}
        {onClearFilters && (
          <button 
            className="bg-transparent border-none cursor-pointer h-[32px] flex items-center px-[12px] rounded-[4px] hover:bg-[rgba(0,75,114,0.06)] transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,75,114,0.35)] ml-[6px]"
            onClick={onClearFilters}
            style={{ color: '#004B72' }}
          >
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]">
              Clear Filters
            </span>
          </button>
        )}
      </div>
    </div>
  );
}