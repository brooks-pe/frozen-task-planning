import React, { useState, useEffect, useCallback } from 'react';

function ChevronIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface CollapsibleFilterSectionProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  highContrast?: boolean;
  title?: string;
  headerActions?: React.ReactNode;
}

export function CollapsibleFilterSection({
  children,
  defaultExpanded = true,
  className = '',
  highContrast = false,
  title = 'Filters',
  headerActions,
}: CollapsibleFilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [overflowVisible, setOverflowVisible] = useState(defaultExpanded);

  useEffect(() => {
    if (!isExpanded) {
      setOverflowVisible(false);
    }
  }, [isExpanded]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (isExpanded) {
        setOverflowVisible(true);
      }
    },
    [isExpanded],
  );

  const toggleColorClass = highContrast
    ? 'text-[#1C2024] hover:text-[#000000]'
    : 'text-[#60646c] hover:text-[#1c2024]';

  const hideLabel = 'Hide ' + title;
  const showLabel = 'Show ' + title;

  return (
    <div className={'bg-[#f9f9fb] relative rounded-[5px] w-full border border-solid border-[#CDCED6] ' + className}>
      <div className="flex items-center justify-between px-[24px] py-[12px]">
        <span className="font-['Inter',sans-serif] font-semibold leading-[24px] not-italic text-[#1C2024] text-[18px] tracking-[0px]">
          {title}
        </span>
        <div className="flex items-center gap-[8px]">
          {headerActions}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={'flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-transparent border-none transition-colors ' + toggleColorClass}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? hideLabel : showLabel}
          >
            <span
              style={{
                display: 'inline-flex',
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 225ms ease-in-out',
              }}
            >
              <ChevronIcon />
            </span>
            <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic text-[14px]">
              {isExpanded ? hideLabel : showLabel}
            </span>
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 225ms ease-in-out',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          className="w-full min-w-0 box-border"
          style={{ overflow: overflowVisible ? 'visible' : 'hidden' }}
        >
          <div className="w-full box-border px-[24px]">
            <div className="w-full border-t border-solid border-[#D9D9E0]" />
          </div>
          <div className="w-full box-border px-[24px] pt-[16px] pb-[24px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
