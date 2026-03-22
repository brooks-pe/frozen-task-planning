import { useState, useRef, useEffect, useCallback } from 'react';

interface SearchableFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
  triggerStyle?: React.CSSProperties;
  optionColors?: Record<string, string>;
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

export function SearchableFilterDropdown({ value, onChange, options, className, triggerStyle, optionColors }: SearchableFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setSearch('');
    setHighlightedIndex(-1);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch('');
    setHighlightedIndex(-1);
  }, []);

  const handleSelect = useCallback((opt: string) => {
    onChange(opt);
    handleClose();
  }, [onChange, handleClose]);

  // Autofocus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Small delay to ensure the DOM is ready
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

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-option]');
      const item = items[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        handleClose();
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger button - matches native select styling */}
      <button
        type="button"
        onClick={() => isOpen ? handleClose() : handleOpen()}
        className={`bg-white h-[32px] pl-[12px] pr-[32px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer text-left whitespace-nowrap ${className || ''}`}
        style={triggerStyle}
      >
        {value}
      </button>
      <ChevronDown
        className="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none text-[#60646C]"
        size={16}
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 min-w-full bg-white border border-[rgba(0,6,46,0.2)] rounded-[4px] shadow-[0px_4px_12px_rgba(0,0,0,0.12)] z-50 flex flex-col"
          style={{ maxHeight: '280px' }}
        >
          {/* Search input */}
          <div className="p-[8px] border-b border-[#e0e1e6]">
            <div className="relative">
              <div className="absolute left-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIndex(-1);
                }}
                placeholder="Search…"
                className="w-full h-[32px] pl-[28px] pr-[8px] rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] outline-none focus:border-[#004B72] focus:ring-[2px] focus:ring-[rgba(0,75,114,0.2)]"
              />
            </div>
          </div>

          {/* Options list */}
          <div ref={listRef} className="overflow-y-auto flex-1" style={{ maxHeight: '220px' }}>
            {filteredOptions.length === 0 ? (
              <div className="px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646c]">
                No results
              </div>
            ) : (
              filteredOptions.map((opt, index) => (
                <div
                  key={opt}
                  data-option
                  onClick={() => handleSelect(opt)}
                  className={`px-[12px] py-[6px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] cursor-pointer flex items-center gap-[8px] ${
                    index === highlightedIndex
                      ? 'bg-[rgba(0,75,114,0.08)]'
                      : opt === value
                        ? 'bg-[rgba(0,75,114,0.05)]'
                        : 'hover:bg-[#F9F9FB]'
                  }`}
                >
                  {optionColors && optionColors[opt] && (
                    <span
                      className="inline-block w-[10px] h-[10px] rounded-full shrink-0"
                      style={{ backgroundColor: optionColors[opt] }}
                    />
                  )}
                  <span>{opt}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}