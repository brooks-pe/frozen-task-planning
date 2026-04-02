import { useState, useRef, useEffect } from "react";

export default function VersionDropdown() {
  const [selectedVersion, setSelectedVersion] = useState("Current Record");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const versionOptions = [
    "Current Record",
    "Previous Version",
    "View Change History"
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[232px]" data-name="pe-select-trigger">
      <div 
        className={`bg-white h-[32px] relative rounded-[4px] shrink-0 w-full cursor-pointer transition-colors ${
          isOpen ? 'shadow-[0_0_0_2px_rgba(20,125,185,0.2)]' : ''
        }`} 
        data-name="content-container"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
            <div className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1C2024] text-[14px] text-ellipsis">
              <p className="css-g0mm18 leading-[20px] overflow-hidden">Version: {selectedVersion}</p>
            </div>
            <PeChevronDown />
          </div>
        </div>
        <div
          aria-hidden="true"
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${
            isOpen ? 'border-[#147DB9]' : 'border-[#B9BBC6]'
          }`}
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-[4px] shadow-[0px_4px_12px_rgba(0,0,0,0.12)] border border-[#CDCED6] z-50 min-w-[232px]" data-name="dropdown-menu">
          <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px]">
            {versionOptions.map((option) => (
              <div
                key={option}
                className={`h-[32px] relative rounded-[4px] shrink-0 w-full transition-colors cursor-pointer ${
                  selectedVersion === option ? 'bg-[rgba(0,75,114,0.05)]' : 'bg-white hover:bg-[#F9F9FB]'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVersion(option);
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-row items-center rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1C2024] text-[14px]">
                      {option}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PeChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pe-chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="pe-chevron-down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
