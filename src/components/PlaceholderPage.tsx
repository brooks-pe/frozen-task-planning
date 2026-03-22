import { Link } from "react-router";
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';

export default function PlaceholderPage({ 
  title, 
  breadcrumbs 
}: { 
  title: string; 
  breadcrumbs: { label: string; path?: string }[];
}) {
  return (
    <div className="bg-white flex-1 relative w-full flex justify-center" data-name="content-area">
      <div className="w-full max-w-[1280px]">
        <div className="flex flex-col items-start p-[24px] w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <PageHeader title={title} breadcrumbs={breadcrumbs} />
            <ComingSoon />
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ title, breadcrumbs }: { title: string; breadcrumbs: { label: string; path?: string }[] }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="page-header">
      <PePageHeader title={title} breadcrumbs={breadcrumbs} />
    </div>
  );
}

function PePageHeader({ title, breadcrumbs }: { title: string; breadcrumbs: { label: string; path?: string }[] }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="pe-page-header">
      <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <HeaderAndSubtitle title={title} />
        <SyncPointBreadcrumb items={breadcrumbs} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle({ title }: { title: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        {title}
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        This page is coming soon.
      </p>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[5px] shrink-0 w-full p-[48px] flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-[24px] max-w-[600px] text-center">
        <div className="relative shrink-0 size-[64px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
            <g>
              <circle cx="32" cy="32" r="30" stroke="#004b72" strokeWidth="2" fill="none" />
              <path d="M32 20V32L40 40" stroke="#004b72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
        <div className="flex flex-col gap-[12px]">
          <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic text-[#1c2024] text-[24px] tracking-[-0.5px]">
            Coming Soon
          </h2>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[16px]">
            This feature is currently under development and will be available soon.
          </p>
        </div>
        <Link 
          to="/admin-console"
          className="bg-[#004b72] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors"
        >
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
            <p className="leading-[20px]">Return to Admin Console</p>
          </div>
        </Link>
      </div>
    </div>
  );
}