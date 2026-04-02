import { useState, useRef, useEffect, useCallback } from 'react';

interface MultiSelectFilterDropdownProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
  className?: string;
  triggerStyle?: React.CSSProperties;
  allLabel?: string;
}

function ChevronDown({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 16} height={size || 16} viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <path d="M12.25 12.25L9.71 9.71M11.08 6.42C11.08 9 9 11.08 6.42 11.08C3.83 11.08 1.75 9 1.75 6.42C1.75 3.83 3.83 1.75 6.42 1.75C9 1.75 11.08 3.83 11.08 6.42Z" stroke="#60646C" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MultiSelectFilterDropdown({ 
  values, 
  onChange, 
  options, 
  className, 
  triggerStyle,
  allLabel = 'All'
}: MultiSelectFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Separate "All" from actual filter values
  const actualOptions = options.filter(opt => opt !== allLabel);
  
  const filteredOptions = actualOptions.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setSearch('');
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch('');
  }, []);

  const handleToggle = useCallback((opt: string) => {
    if (values.includes(allLabel) || values.length === 0) {
      // If "All" is selected or nothing is selected, switch to just this option
      onChange([opt]);
    } else if (values.includes(opt)) {
      // Deselect this option
      const newValues = values.filter(v => v !== opt);
      // If nothing left, default to "All"
      onChange(newValues.length === 0 ? [allLabel] : newValues);
    } else {
      // Add this option to the selection
      onChange([...values, opt]);
    }
  }, [values, onChange, allLabel]);

  const handleSelectAll = useCallback(() => {
    onChange([allLabel]);
  }, [onChange, allLabel]);

  // Autofocus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, handleClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  };

  // Determine display text
  const displayText = (() => {
    if (values.includes(allLabel) || values.length === 0) {
      return allLabel;
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values.length} selected`;
  })();

  const isAllSelected = values.includes(allLabel) || values.length === 0;

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => isOpen ? handleClose() : handleOpen()}
        className={`bg-white h-[32px] pl-[12px] pr-[32px] rounded-[4px] border border-[#B9BBC6] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer text-left whitespace-nowrap overflow-hidden text-ellipsis focus-visible:outline-none focus-visible:border-[#147DB9] focus-visible:ring-[2px] focus-visible:ring-[rgba(20,125,185,0.2)] transition-colors ${className || ''}`}
        style={triggerStyle}
      >
        {displayText}
      </button>
      <ChevronDown
        className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-[#60646C]"
        size={16}
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 min-w-full bg-white border border-[#CDCED6] rounded-[4px] shadow-[0px_4px_12px_rgba(0,0,0,0.12)] z-50 flex flex-col"
          style={{ maxHeight: '320px' }}
        >
          {/* Search input */}
          <div className="p-[8px] border-b border-[#D9D9E0]">
            <div className="relative">
              <div className="absolute left-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full h-[32px] pl-[28px] pr-[8px] rounded-[4px] border border-[#B9BBC6] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] outline-none focus:border-[#147DB9] focus:ring-[2px] focus:ring-[rgba(20,125,185,0.2)]"
              />
            </div>
          </div>

          {/* Options list */}
          <div ref={listRef} className="overflow-y-auto flex-1" style={{ maxHeight: '260px' }}>
            {/* "All" option */}
            <label
              className={`flex items-center gap-[8px] px-[12px] py-[6px] cursor-pointer select-none hover:bg-[#F9F9FB] ${
                isAllSelected ? 'bg-[rgba(0,75,114,0.05)]' : ''
              }`}
            >
              <span
                className={`flex items-center justify-center w-[16px] h-[16px] rounded-[3px] border border-solid transition-colors shrink-0 ${
                  isAllSelected
                    ? 'bg-[#004B72] border-[#004B72]'
                    : 'bg-white border-[#b9bbc6]'
                }`}
                aria-hidden="true"
              >
                {isAllSelected && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="sr-only"
                aria-label={allLabel}
              />
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                {allLabel}
              </span>
            </label>

            {/* Separator */}
            {filteredOptions.length > 0 && (
              <div className="h-[1px] bg-[#D9D9E0] mx-[8px] my-[4px]" />
            )}

            {/* Filtered options */}
            {filteredOptions.length === 0 && search ? (
              <div className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
                No results
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const checked = values.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-[8px] px-[12px] py-[6px] cursor-pointer select-none hover:bg-[#F9F9FB] ${
                      checked ? 'bg-[rgba(0,75,114,0.05)]' : ''
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-[16px] h-[16px] rounded-[3px] border border-solid transition-colors shrink-0 ${
                        checked
                          ? 'bg-[#004B72] border-[#004B72]'
                          : 'bg-white border-[#b9bbc6]'
                      }`}
                      aria-hidden="true"
                    >
                      {checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggle(opt)}
                      className="sr-only"
                      aria-label={opt}
                    />
                    <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
                      {opt}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
