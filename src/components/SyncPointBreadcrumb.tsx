import { Link } from 'react-router';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

/**
 * Standardized SyncPoint breadcrumb component.
 *
 * Spec:
 *  - Font: Inter / 14px / 400 / 20px line-height / 0 tracking
 *  - Inactive crumb (link): #147DB9 → hover #1C2024
 *  - Current crumb (final, no path): #1C2024
 *  - Separator "/": #8B8D98
 */
export function SyncPointBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center shrink-0"
      data-name="pe-breadcrumb"
    >
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center shrink-0">
            {/* Separator before every item except the first */}
            {index > 0 && (
              <span
                className="font-['Inter',sans-serif] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#8B8D98] mx-[4px] select-none"
                aria-hidden="true"
              >
                /
              </span>
            )}
            {/* Crumb */}
            {crumb.path && !isLast ? (
              <Link
                to={crumb.path}
                className="font-['Inter',sans-serif] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#147DB9] hover:text-[#1C2024] hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-[#004B72]/50 cursor-pointer"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={`font-['Inter',sans-serif] font-normal text-[14px] leading-[20px] tracking-[0px] ${isLast ? 'text-[#1C2024]' : 'text-[#60646C]'}`}>
                {crumb.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}