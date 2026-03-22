import { useState, useRef, useEffect, ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  showOnlyWhenTruncated?: boolean;
}

export function Tooltip({ children, content, showOnlyWhenTruncated = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  // Check if content is truncated
  useEffect(() => {
    if (showOnlyWhenTruncated && childRef.current) {
      const element = childRef.current.querySelector('[data-truncate]') as HTMLElement;
      if (element) {
        const checkTruncation = () => {
          setIsTruncated(element.scrollWidth > element.clientWidth);
        };
        checkTruncation();
        
        // Recheck on resize
        window.addEventListener('resize', checkTruncation);
        return () => window.removeEventListener('resize', checkTruncation);
      }
    }
  }, [showOnlyWhenTruncated]);
  
  // Calculate tooltip position
  useEffect(() => {
    if (isVisible && childRef.current && tooltipRef.current) {
      const childRect = childRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const gap = 8;
      const viewportPadding = 12;

      // Vertical: center on trigger, then clamp to viewport
      let top = childRect.top + childRect.height / 2 - tooltipRect.height / 2;
      top = Math.max(viewportPadding, Math.min(top, viewportHeight - tooltipRect.height - viewportPadding));

      // Horizontal: default right, flip to left if not enough space
      let left: number;
      const rightPlacement = childRect.right + gap;
      const leftPlacement = childRect.left - gap - tooltipRect.width;

      if (rightPlacement + tooltipRect.width + viewportPadding <= viewportWidth) {
        // Fits to the right
        left = rightPlacement;
      } else if (leftPlacement >= viewportPadding) {
        // Fits to the left
        left = leftPlacement;
      } else {
        // Neither side fits cleanly — clamp to right edge with padding
        left = viewportWidth - tooltipRect.width - viewportPadding;
      }

      setPosition({ top, left });
    }
  }, [isVisible]);
  
  // Dismiss tooltip on click or route change
  useEffect(() => {
    const handleClick = () => setIsVisible(false);
    const handleRouteChange = () => setIsVisible(false);
    
    if (isVisible) {
      window.addEventListener('click', handleClick);
      window.addEventListener('popstate', handleRouteChange);
      return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, [isVisible]);
  
  const handleMouseEnter = () => {
    if (!showOnlyWhenTruncated || isTruncated) {
      setIsVisible(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  
  const shouldShowTooltip = showOnlyWhenTruncated ? isTruncated && isVisible : isVisible;
  
  return (
    <>
      <div 
        ref={childRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {children}
      </div>
      
      {shouldShowTooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] bg-[#1c2024] text-white text-[12px] leading-[16px] px-[8px] py-[6px] rounded-[4px] shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}