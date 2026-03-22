import { Link } from "react-router";
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import { Users, Layers, Briefcase, CreditCard, Calendar } from "lucide-react";
import VersionDropdown from "./VersionDropdown";

export default function AdminConsoleContent() {
  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="flex flex-col items-start p-[24px] w-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <PageHeader />
          <DashboardCards />
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="page-header">
      <PeVersionBar />
      <PePageHeader />
    </div>
  );
}

function PeVersionBar() {
  return (
    <div className="content-stretch flex items-start justify-between overflow-clip py-[12px] relative shrink-0 w-full" data-name="pe-version-bar">
      <VersionDropdown />
      <ButtonRow />
    </div>
  );
}

function PeBadge({ count }: { count: number }) {
  return (
    <div className="bg-[#ffc53d] content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[6px] py-[2px] relative rounded-[3px] shrink-0" data-name="pe-badge">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[12px] tracking-[0.04px] whitespace-nowrap">
        <p className="leading-[16px]">{count}</p>
      </div>
    </div>
  );
}

function ButtonRow() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="button-row">
      <Link to="/pending-role-assignments" className="bg-[#004b72] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors" data-name="pe-button">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
          <p className="leading-[20px]">Pending Actions</p>
        </div>
        <PeBadge count={17} />
      </Link>
      <Link to="/audit-log" className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" data-name="pe-button">
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">View Audit Log</p>
        </div>
      </Link>
      <a href="#" className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" data-name="pe-button">
        <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Admin Guide</p>
        </div>
      </a>
    </div>
  );
}

function PePageHeader() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="pe-page-header">
      <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <HeaderAndSubtitle />
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Admin Console' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        Admin Console
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Manage users, organizational structures, funding constructs, and execution alignment within your scope.
      </p>
    </div>
  );
}

function DashboardCards() {
  return (
    <div className="bg-[#f9f9fb] relative rounded-[5px] shrink-0 w-full" data-name="admin-console-cards">
      <div className="p-[24px] relative w-full grid gap-[24px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <UserManagementCard />
        <ActivityManagementCard />
        <ProjectManagementCard />
        <SystemAppropriationsCard />
        <TenantAYearsCard />
      </div>
    </div>
  );
}

function UserManagementCard() {
  return (
    <div className="content-stretch flex h-[232px] items-center relative w-full" data-name="admin-card">
      <div className="bg-[#003350] content-stretch flex h-full items-start justify-center px-[16px] py-[24px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0">
        <PeUsers />
      </div>
      <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-br-[5px] rounded-tr-[5px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#1c2024] text-[20px] tracking-[-0.08px]">
              User Management
            </p>
          </div>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">
            Manage users, roles, and access within your administrative scope.
          </p>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center gap-[8px] relative shrink-0">
              <Link to="/user-management" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
                All Users
              </Link>
              <PeBadge count={17} />
            </div>
            <div className="content-stretch flex items-center gap-[8px] relative shrink-0">
              <Link to="/pending-role-assignments" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
                Pending Role Assignments
              </Link>
              <PeBadge count={5} />
            </div>
            <Link to="/add-role-assignment" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              Add Role Assignment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityManagementCard() {
  return (
    <div className="content-stretch flex h-[232px] items-center relative w-full" data-name="admin-card">
      <div className="bg-[#003350] content-stretch flex h-full items-start justify-center px-[16px] py-[24px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0">
        <PeLayers />
      </div>
      <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-br-[5px] rounded-tr-[5px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#1c2024] text-[20px] tracking-[-0.08px]">
            Activity Management
          </p>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">
            Manage organizational activities, hierarchy, and execution scope within your administrative boundary.
          </p>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <Link to="/activities" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              All Activities
            </Link>
            <Link to="/activities/create" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              Create Activity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectManagementCard() {
  return (
    <div className="content-stretch flex h-[232px] items-center relative w-full" data-name="admin-card">
      <div className="bg-[#003350] content-stretch flex h-full items-start justify-center px-[16px] py-[24px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0">
        <PeBriefcase />
      </div>
      <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-br-[5px] rounded-tr-[5px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#1c2024] text-[20px] tracking-[-0.08px]">
            Project Management
          </p>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">
            Manage projects, workstreams, and execution alignment within your administrative scope.
          </p>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <Link to="/projects" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              All Projects
            </Link>
            <Link to="/projects/create" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              Create Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemAppropriationsCard() {
  return (
    <div className="content-stretch flex h-[232px] items-center relative w-full" data-name="admin-card">
      <div className="bg-[#003350] content-stretch flex h-full items-start justify-center px-[16px] py-[24px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0">
        <PeCreditCard />
      </div>
      <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-br-[5px] rounded-tr-[5px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#1c2024] text-[20px] tracking-[-0.08px]">
            System Appropriations
          </p>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">
            Manage system-level appropriations, funding sources, and fiscal constraints within your administrative scope.
          </p>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <Link to="/system-appropriations" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              All System Appropriations
            </Link>
            <Link to="/system-appropriations/create" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              Create System Appropriation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TenantAYearsCard() {
  return (
    <div className="content-stretch flex h-[232px] items-center relative w-full" data-name="admin-card">
      <div className="bg-[#003350] content-stretch flex h-full items-start justify-center px-[16px] py-[24px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0">
        <PeCalendar />
      </div>
      <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-br-[5px] rounded-tr-[5px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative size-full">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic text-[#1c2024] text-[20px] tracking-[-0.08px]">
            Tenant A-Years
          </p>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">
            Manage tenant-level appropriations and fiscal year allocations within your administrative scope.
          </p>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <Link to="/tenant-appropriations" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              All Tenant Appropriations
            </Link>
            <Link to="/tenant-appropriations/create" className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#004b72] text-[14px] hover:underline">
              Create Tenant Appropriation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function PeUsers() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="pe-users">
      <Users size={28} strokeWidth={2} color="white" />
    </div>
  );
}

function PeLayers() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="pe-layers">
      <Layers size={28} strokeWidth={2} color="white" />
    </div>
  );
}

function PeBriefcase() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="pe-briefcase">
      <Briefcase size={28} strokeWidth={2} color="white" />
    </div>
  );
}

function PeCreditCard() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="pe-credit-card">
      <CreditCard size={28} strokeWidth={2} color="white" />
    </div>
  );
}

function PeCalendar() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="pe-calendar">
      <Calendar size={28} strokeWidth={2} color="white" />
    </div>
  );
}