import { useState, useRef, useEffect } from 'react';
import { useLocation, RouterProvider, Link } from 'react-router';
import { router } from './routes'; /* v2 */
import svgPaths from "./imports/svg-hq8o45695r";
import imgPeSyncpointLogoFull from "figma:asset/234ed65c32931de808402132daf3879980e7362c.png";
import imgPms420Logo1 from "figma:asset/06e11963d698e9776746f587291dc116d81990f9.png";
import imgImage from "figma:asset/a659c88c1e1688276fd542a0142c231a1bc62fe3.png";
import DropdownAdmin from './imports/DropdownAdmin';
import DropdownProfile from './imports/DropdownProfile';
import PeDropdownPattern from './imports/PeDropdownPattern';
import svgPathsCollapsed from './imports/svg-qd0aszrvub';
import svgPathsToggle from './imports/svg-hh7c2fosq1';
import UserManagementContent from './components/UserManagementContent';
import ExecutionPlanningDashboard from './components/ExecutionPlanningDashboard';
import PendingRoleAssignmentsContent from './components/PendingRoleAssignmentsContent';
import AddRoleAssignmentContent from './components/AddRoleAssignmentContent';
import EditRoleAssignmentContent from './components/EditRoleAssignmentContent';
import UserProfileContent from './components/UserProfileContent';
import GInvoicingReport from './components/GInvoicingReport';
import FundingDistribution from './components/FundingDistribution';
import FundingAuthorizationContent from './components/FundingAuthorizationContent';
import FundingWorkPlansContent from './components/FundingWorkPlansContent';
import APMDistributionContent from './components/APMDistributionContent';
import ActivityDistributionContent from './components/ActivityDistributionContent';
import APMAcceptanceContent from './components/APMAcceptanceContent';
import AdminConsoleContent from './components/AdminConsoleContent';
import TaskRequirementsAlignmentContent from './components/TaskRequirementsAlignmentContent';
import TaskIdDetailsContent from './components/TaskIdDetailsContent';
import GInvoicePerformanceItemsContent from './components/GInvoicePerformanceItemsContent';
import TaskPlanningDashboard from './components/TaskPlanningDashboard';
import TasksContent from './components/TasksContent';
import TaskWorkspaceHeader from './components/TaskWorkspaceHeader';
import PlaceholderPage from './components/PlaceholderPage';
import ErrorBoundary from './components/ErrorBoundary';
import { Tooltip } from './components/Tooltip';
import { DevModeProvider, useDevMode } from './components/DevModeProvider';
import DevModeOverlay from './components/DevModeOverlay';
import { Toaster } from './components/ui/sonner';

export default function AppRoot() {
  return (
    <DevModeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </DevModeProvider>
  );
}

export function App() {
  const location = useLocation();
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isTenantDropdownOpen, setIsTenantDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const tenantDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target as Node)) {
        setIsAdminDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (tenantDropdownRef.current && !tenantDropdownRef.current.contains(event.target as Node)) {
        setIsTenantDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isUserManagementPage = location.pathname === '/user-management';
  const isUserProfilePage = location.pathname.startsWith('/user-management/');
  const isExecutionPlanningDashboard = location.pathname === '/execution-planning/dashboard';
  const isPendingRoleAssignments = location.pathname === '/pending-role-assignments';
  const isAddRoleAssignment = location.pathname === '/add-role-assignment';
  const isEditRoleAssignment = location.pathname === '/edit-role-assignment';
  const isFundingDistribution = location.pathname === '/funding-distribution';
  const isFundingAuthorization = location.pathname === '/funding-authorization';
  const isFundingWorkPlans = location.pathname === '/funding-work-plans';
  const isAPMDistribution = location.pathname === '/apm-distribution';
  const isActivityDistribution = location.pathname === '/activity-distribution';
  const isAPMAcceptance = location.pathname === '/apm-acceptance';
  const isGInvoicingReport = location.pathname === '/reconciliation-report' || location.pathname === '/g-invoicing-report';
  const isGInvoicePerformanceItems = location.pathname === '/g-invoicing-reports' || location.pathname === '/g-invoice-performance-items';
  const isAdminConsole = location.pathname === '/admin-console';
  const isTaskRequirementsAlignment = location.pathname === '/task-requirements-alignment';
  const isTaskIdDetails = location.pathname.startsWith('/task-requirements-alignment/') && location.pathname !== '/task-requirements-alignment';
  const isTaskPlanningDashboard = location.pathname === '/task-planning/dashboard';
  const isTaskPlanningTasks = location.pathname === '/task-planning/tasks';
  const isTaskWorkspace = location.pathname.startsWith('/task-planning/tasks/') && location.pathname !== '/task-planning/tasks';
  
  // Placeholder pages
  const isPendingRoleRequests = location.pathname === '/pending-role-requests';
  const isActivities = location.pathname === '/activities';
  const isActivitiesCreate = location.pathname === '/activities/create';
  const isProjects = location.pathname === '/projects';
  const isProjectsCreate = location.pathname === '/projects/create';
  const isSystemAppropriations = location.pathname === '/system-appropriations';
  const isSystemAppropriationsCreate = location.pathname === '/system-appropriations/create';
  const isTenantAppropriations = location.pathname === '/tenant-appropriations';
  const isTenantAppropriationsCreate = location.pathname === '/tenant-appropriations/create';
  const isAuditLog = location.pathname === '/audit-log';

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden" data-name="PMS 420 Splash Page">
      <DevModeOverlay />
      <PeShell 
        isAdminDropdownOpen={isAdminDropdownOpen}
        setIsAdminDropdownOpen={setIsAdminDropdownOpen}
        isProfileDropdownOpen={isProfileDropdownOpen}
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        isTenantDropdownOpen={isTenantDropdownOpen}
        setIsTenantDropdownOpen={setIsTenantDropdownOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        adminDropdownRef={adminDropdownRef}
        profileDropdownRef={profileDropdownRef}
        tenantDropdownRef={tenantDropdownRef}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isUserManagementPage={isUserManagementPage}
        isUserProfilePage={isUserProfilePage}
        isExecutionPlanningDashboard={isExecutionPlanningDashboard}
        isPendingRoleAssignments={isPendingRoleAssignments}
        isAddRoleAssignment={isAddRoleAssignment}
        isEditRoleAssignment={isEditRoleAssignment}
        isFundingDistribution={isFundingDistribution}
        isFundingAuthorization={isFundingAuthorization}
        isFundingWorkPlans={isFundingWorkPlans}
        isAPMDistribution={isAPMDistribution}
        isActivityDistribution={isActivityDistribution}
        isAPMAcceptance={isAPMAcceptance}
        isGInvoicingReport={isGInvoicingReport}
        isGInvoicePerformanceItems={isGInvoicePerformanceItems}
        isAdminConsole={isAdminConsole}
        isTaskRequirementsAlignment={isTaskRequirementsAlignment}
        isTaskIdDetails={isTaskIdDetails}
        isTaskPlanningDashboard={isTaskPlanningDashboard}
        isTaskPlanningTasks={isTaskPlanningTasks}
        isTaskWorkspace={isTaskWorkspace}
      />
    </div>
  );
}

function PeShell({ 
  isAdminDropdownOpen, 
  setIsAdminDropdownOpen,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  isTenantDropdownOpen,
  setIsTenantDropdownOpen,
  searchValue,
  setSearchValue,
  isSearchFocused,
  setIsSearchFocused,
  adminDropdownRef,
  profileDropdownRef,
  tenantDropdownRef,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isUserManagementPage,
  isUserProfilePage,
  isExecutionPlanningDashboard,
  isPendingRoleAssignments,
  isAddRoleAssignment,
  isEditRoleAssignment,
  isFundingDistribution,
  isFundingAuthorization,
  isFundingWorkPlans,
  isAPMDistribution,
  isActivityDistribution,
  isAPMAcceptance,
  isGInvoicingReport,
  isGInvoicePerformanceItems,
  isAdminConsole,
  isTaskRequirementsAlignment,
  isTaskIdDetails,
  isTaskPlanningDashboard,
  isTaskPlanningTasks,
  isTaskWorkspace
}: any) {
  return (
    <div className="bg-white flex flex-col h-full w-full" data-name="pe-shell">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <PeNavbar1 
          isAdminDropdownOpen={isAdminDropdownOpen}
          setIsAdminDropdownOpen={setIsAdminDropdownOpen}
          isProfileDropdownOpen={isProfileDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
          isTenantDropdownOpen={isTenantDropdownOpen}
          setIsTenantDropdownOpen={setIsTenantDropdownOpen}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          adminDropdownRef={adminDropdownRef}
          profileDropdownRef={profileDropdownRef}
          tenantDropdownRef={tenantDropdownRef}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
      </div>
      
      {/* Scrollable Middle Section with Fixed Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <Middle 
          isSidebarCollapsed={isSidebarCollapsed} 
          isUserManagementPage={isUserManagementPage}
          isUserProfilePage={isUserProfilePage}
          isExecutionPlanningDashboard={isExecutionPlanningDashboard}
          isPendingRoleAssignments={isPendingRoleAssignments}
          isAddRoleAssignment={isAddRoleAssignment}
          isEditRoleAssignment={isEditRoleAssignment}
          isFundingDistribution={isFundingDistribution}
          isFundingAuthorization={isFundingAuthorization}
          isFundingWorkPlans={isFundingWorkPlans}
          isAPMDistribution={isAPMDistribution}
          isActivityDistribution={isActivityDistribution}
          isAPMAcceptance={isAPMAcceptance}
          isGInvoicingReport={isGInvoicingReport}
          isGInvoicePerformanceItems={isGInvoicePerformanceItems}
          isAdminConsole={isAdminConsole}
          isTaskRequirementsAlignment={isTaskRequirementsAlignment}
          isTaskIdDetails={isTaskIdDetails}
          isTaskPlanningDashboard={isTaskPlanningDashboard}
          isTaskPlanningTasks={isTaskPlanningTasks}
          isTaskWorkspace={isTaskWorkspace}
        />
      </div>
      
      {/* Fixed Footer */}
      <div className="flex-shrink-0">
        <PeFooter1 />
      </div>
    </div>
  );
}

function PeNavbar1({ 
  isAdminDropdownOpen, 
  setIsAdminDropdownOpen,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  isTenantDropdownOpen,
  setIsTenantDropdownOpen,
  searchValue,
  setSearchValue,
  isSearchFocused,
  setIsSearchFocused,
  adminDropdownRef,
  profileDropdownRef,
  tenantDropdownRef,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}: any) {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-start relative shrink-0 w-full" data-name="pe-navbar">
      <PeClassificationBanner />
      <PeNavbar 
        isAdminDropdownOpen={isAdminDropdownOpen}
        setIsAdminDropdownOpen={setIsAdminDropdownOpen}
        isProfileDropdownOpen={isProfileDropdownOpen}
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        isTenantDropdownOpen={isTenantDropdownOpen}
        setIsTenantDropdownOpen={setIsTenantDropdownOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        adminDropdownRef={adminDropdownRef}
        profileDropdownRef={profileDropdownRef}
        tenantDropdownRef={tenantDropdownRef}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
    </div>
  );
}

function PeClassificationBanner() {
  return (
    <div className="bg-[#3ca23c] h-[24px] relative shrink-0 w-full" data-name="pe-classification-banner">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[4px] relative size-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[12px] tracking-[0.04px]">
            <p className="css-ew64yg leading-[16px]">CUI</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,47,0.15)] border-b border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function PeNavbar({ 
  isAdminDropdownOpen, 
  setIsAdminDropdownOpen,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  isTenantDropdownOpen,
  setIsTenantDropdownOpen,
  searchValue,
  setSearchValue,
  isSearchFocused,
  setIsSearchFocused,
  adminDropdownRef,
  profileDropdownRef,
  tenantDropdownRef,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}: any) {
  return (
    <div className="bg-[#f9f9fb] relative shrink-0 w-full" data-name="pe-navbar">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,47,0.15)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative w-full">
          <Frame35 isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />
          <NavRight1 
            isAdminDropdownOpen={isAdminDropdownOpen}
            setIsAdminDropdownOpen={setIsAdminDropdownOpen}
            isProfileDropdownOpen={isProfileDropdownOpen}
            setIsProfileDropdownOpen={setIsProfileDropdownOpen}
            isTenantDropdownOpen={isTenantDropdownOpen}
            setIsTenantDropdownOpen={setIsTenantDropdownOpen}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
            adminDropdownRef={adminDropdownRef}
            profileDropdownRef={profileDropdownRef}
            tenantDropdownRef={tenantDropdownRef}
          />
        </div>
      </div>
    </div>
  );
}

function Frame35({ isSidebarCollapsed, setIsSidebarCollapsed }: any) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[711.5px]">
      <NotificationButton isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />
      <NavLeft />
    </div>
  );
}

function NotificationButton({ isSidebarCollapsed, setIsSidebarCollapsed }: any) {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="notification button">
      <ContentContainer isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />
    </div>
  );
}

function ContentContainer({ isSidebarCollapsed, setIsSidebarCollapsed }: any) {
  return (
    <div 
      className="content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[48px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer" 
      data-name="content-container"
      onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
    >
      {isSidebarCollapsed ? <PePanelLeftOpen /> : <PePanelLeftClose />}
    </div>
  );
}

function PePanelLeftClose() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pe-panel-left-close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pe-panel-left-close">
          <path d={svgPaths.p1ddb5a0} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function PePanelLeftOpen() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pe-panel-left-open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pe-panel-left-open">
          <path d={svgPathsToggle.p9858400} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function NavLeft() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="nav-left">
      <LogoContainer1 />
    </div>
  );
}

function LogoContainer1() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center px-[12px] relative shrink-0" data-name="Logo Container">
      <LogoContainer />
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative shrink-0 w-[92px]" data-name="logo-container">
      <PeSyncpointLogoFull />
    </div>
  );
}

function PeSyncpointLogoFull() {
  return (
    <Link to="/" className="aspect-[3980/1040] relative shrink-0 w-full hover:opacity-80 transition-opacity" data-name="pe-syncpoint-logo-full">
      <img alt="SyncPoint Logo - Navigate to Home" className="absolute inset-0 max-w-none object-cover size-full" src={imgPeSyncpointLogoFull} />
    </Link>
  );
}

function NavRight1({ 
  isAdminDropdownOpen, 
  setIsAdminDropdownOpen,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  isTenantDropdownOpen,
  setIsTenantDropdownOpen,
  searchValue,
  setSearchValue,
  isSearchFocused,
  setIsSearchFocused,
  adminDropdownRef,
  profileDropdownRef,
  tenantDropdownRef
}: any) {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="nav-right">
      <SearchFieldContainer 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />
      <NavRight 
        isAdminDropdownOpen={isAdminDropdownOpen}
        setIsAdminDropdownOpen={setIsAdminDropdownOpen}
        isProfileDropdownOpen={isProfileDropdownOpen}
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        isTenantDropdownOpen={isTenantDropdownOpen}
        setIsTenantDropdownOpen={setIsTenantDropdownOpen}
        adminDropdownRef={adminDropdownRef}
        profileDropdownRef={profileDropdownRef}
        tenantDropdownRef={tenantDropdownRef}
      />
    </div>
  );
}

function SearchFieldContainer({ searchValue, setSearchValue, isSearchFocused, setIsSearchFocused }: any) {
  return (
    <div className="content-stretch flex flex-col items-start px-[12px] relative shrink-0 w-[200px]" data-name="search-field-container">
      <PeTextField 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />
    </div>
  );
}

function PeTextField({ searchValue, setSearchValue, isSearchFocused, setIsSearchFocused }: any) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="pe-text-field">
      <Root 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />
    </div>
  );
}

function Root({ searchValue, setSearchValue, isSearchFocused, setIsSearchFocused }: any) {
  return (
    <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-full" data-name="root">
      <div aria-hidden="true" className={`absolute border ${isSearchFocused ? 'border-[#004B72] border-2' : 'border-[#1c2024]'} border-solid inset-0 pointer-events-none rounded-[4px] transition-colors`} />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <IconContainer />
          <InputContainer 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
          />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1.5px_2px_0px_rgba(0,0,0,0.1),inset_0px_1.5px_2px_0px_rgba(0,0,85,0.02)]" />
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0" data-name="icon-container">
      <PeSearch />
    </div>
  );
}

function PeSearch() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="pe-search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="pe-search">
          <path d={svgPaths.p25c89200} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function InputContainer({ searchValue, setSearchValue, setIsSearchFocused }: any) {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="input-container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <input 
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search..."
            className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic bg-transparent border-none outline-none text-[#1c2024] placeholder:text-[#60646c] text-[12px] tracking-[0.04px]"
          />
        </div>
      </div>
    </div>
  );
}

function NavRight({ 
  isAdminDropdownOpen, 
  setIsAdminDropdownOpen,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  isTenantDropdownOpen,
  setIsTenantDropdownOpen,
  adminDropdownRef,
  profileDropdownRef,
  tenantDropdownRef
}: any) {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="nav-right">
      <Frame34 
        isAdminDropdownOpen={isAdminDropdownOpen}
        setIsAdminDropdownOpen={setIsAdminDropdownOpen}
        isProfileDropdownOpen={isProfileDropdownOpen}
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        isTenantDropdownOpen={isTenantDropdownOpen}
        setIsTenantDropdownOpen={setIsTenantDropdownOpen}
        adminDropdownRef={adminDropdownRef}
        profileDropdownRef={profileDropdownRef}
        tenantDropdownRef={tenantDropdownRef}
      />
    </div>
  );
}

function Frame34({ 
  isAdminDropdownOpen, 
  setIsAdminDropdownOpen,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  isTenantDropdownOpen,
  setIsTenantDropdownOpen,
  adminDropdownRef,
  profileDropdownRef,
  tenantDropdownRef
}: any) {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <DevModeToggle />
      <SettingsGearButton 
        isAdminDropdownOpen={isAdminDropdownOpen}
        setIsAdminDropdownOpen={setIsAdminDropdownOpen}
        adminDropdownRef={adminDropdownRef}
      />
      <SettingsGearButton1 
        isProfileDropdownOpen={isProfileDropdownOpen}
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        profileDropdownRef={profileDropdownRef}
      />
      <SettingsGearButton2 
        isTenantDropdownOpen={isTenantDropdownOpen}
        setIsTenantDropdownOpen={setIsTenantDropdownOpen}
        tenantDropdownRef={tenantDropdownRef}
      />
    </div>
  );
}

function DevModeToggle() {
  const { isEnabled, toggle } = useDevMode();
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-devmode="">
      <button
        onClick={toggle}
        data-devmode=""
        className="flex items-center justify-center rounded-[8px] shrink-0 h-[48px] px-[10px] border-none cursor-pointer transition-colors"
        style={{
          background: isEnabled ? 'rgba(0, 75, 114, 0.08)' : 'transparent',
        }}
        title={isEnabled ? 'Dev Mode ON — click to disable' : 'Dev Mode OFF — click to enable'}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" data-devmode="">
          <path
            d="M6 7L3 10L6 13"
            stroke={isEnabled ? '#004B72' : '#1C2024'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 7L17 10L14 13"
            stroke={isEnabled ? '#004B72' : '#1C2024'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 4.5L8.5 15.5"
            stroke={isEnabled ? '#004B72' : '#1C2024'}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

function SettingsGearButton({ isAdminDropdownOpen, setIsAdminDropdownOpen, adminDropdownRef }: any) {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="settings gear button" ref={adminDropdownRef}>
      <ContentContainer1 
        isAdminDropdownOpen={isAdminDropdownOpen}
        setIsAdminDropdownOpen={setIsAdminDropdownOpen}
      />
      {isAdminDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <DropdownAdmin onClose={() => setIsAdminDropdownOpen(false)} />
        </div>
      )}
    </div>
  );
}

function ContentContainer1({ isAdminDropdownOpen, setIsAdminDropdownOpen }: any) {
  return (
    <div 
      className="content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[48px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer" 
      data-name="content-container"
      onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
    >
      <PeSettings />
    </div>
  );
}

function PeSettings() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pe-settings">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pe-settings">
          <path d={svgPaths.p32ba0f80} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function SettingsGearButton1({ isProfileDropdownOpen, setIsProfileDropdownOpen, profileDropdownRef }: any) {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="settings gear button" ref={profileDropdownRef}>
      <ContentContainer2 
        isProfileDropdownOpen={isProfileDropdownOpen}
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
      />
      {isProfileDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <DropdownProfile />
        </div>
      )}
    </div>
  );
}

function ContentContainer2({ isProfileDropdownOpen, setIsProfileDropdownOpen }: any) {
  return (
    <div 
      className="content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[48px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer" 
      data-name="content-container"
      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
    >
      <PeSquareUserRound />
    </div>
  );
}

function PeSquareUserRound() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pe-square-user-round">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pe-square-user-round">
          <path d={svgPaths.p2c4f5b00} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function SettingsGearButton2({ isTenantDropdownOpen, setIsTenantDropdownOpen, tenantDropdownRef }: any) {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0" data-name="settings gear button" ref={tenantDropdownRef}>
      <ContentContainer3 
        isTenantDropdownOpen={isTenantDropdownOpen}
        setIsTenantDropdownOpen={setIsTenantDropdownOpen}
      />
      {isTenantDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <PeDropdownPattern />
        </div>
      )}
    </div>
  );
}

function ContentContainer3({ isTenantDropdownOpen, setIsTenantDropdownOpen }: any) {
  return (
    <div 
      className="content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[48px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer" 
      data-name="content-container"
      onClick={() => setIsTenantDropdownOpen(!isTenantDropdownOpen)}
    >
      <PeNetwork />
    </div>
  );
}

function PeNetwork() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pe-network">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="pe-network">
          <path d={svgPaths.p1e0ca600} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// Middle section and footer components (non-interactive parts)
function Middle({ isSidebarCollapsed, isUserManagementPage, isUserProfilePage, isExecutionPlanningDashboard, isPendingRoleAssignments, isAddRoleAssignment, isEditRoleAssignment, isFundingDistribution, isFundingAuthorization, isFundingWorkPlans, isAPMDistribution, isActivityDistribution, isAPMAcceptance, isGInvoicingReport, isGInvoicePerformanceItems, isAdminConsole, isTaskRequirementsAlignment, isTaskIdDetails, isTaskPlanningDashboard, isTaskPlanningTasks, isTaskWorkspace }: any) {
  const location = useLocation();
  const isTaskWorkspaceLocal = isTaskWorkspace ?? (location.pathname.startsWith('/task-planning/tasks/') && location.pathname !== '/task-planning/tasks');
  let content;
  
  // Check for placeholder pages first
  if (location.pathname === '/pending-role-requests') {
    content = <PlaceholderPage title="Pending Role Requests" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'User Management', path: '/user-management'}, {label: 'Pending Role Requests'}]} />;
  } else if (location.pathname === '/activities') {
    content = <PlaceholderPage title="Activities" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'Activities'}]} />;
  } else if (location.pathname === '/activities/create') {
    content = <PlaceholderPage title="Create Activity" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'Activities', path: '/activities'}, {label: 'Create Activity'}]} />;
  } else if (location.pathname === '/projects') {
    content = <PlaceholderPage title="Projects" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'Projects'}]} />;
  } else if (location.pathname === '/projects/create') {
    content = <PlaceholderPage title="Create Project" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'Projects', path: '/projects'}, {label: 'Create Project'}]} />;
  } else if (location.pathname === '/system-appropriations') {
    content = <PlaceholderPage title="System Appropriations" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'System Appropriations'}]} />;
  } else if (location.pathname === '/system-appropriations/create') {
    content = <PlaceholderPage title="Create System Appropriation" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'System Appropriations', path: '/system-appropriations'}, {label: 'Create System Appropriation'}]} />;
  } else if (location.pathname === '/tenant-appropriations') {
    content = <PlaceholderPage title="Tenant Appropriations" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'Tenant Appropriations'}]} />;
  } else if (location.pathname === '/tenant-appropriations/create') {
    content = <PlaceholderPage title="Create Tenant Appropriation" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'Tenant Appropriations', path: '/tenant-appropriations'}, {label: 'Create Tenant Appropriation'}]} />;
  } else if (location.pathname === '/audit-log') {
    content = <PlaceholderPage title="Audit Log" breadcrumbs={[{label: 'Home', path: '/'}, {label: 'Admin Console', path: '/admin-console'}, {label: 'Audit Log'}]} />;
  } else if (isGInvoicePerformanceItems) {
    content = <GInvoicePerformanceItemsContent />;
  } else if (isGInvoicingReport) {
    content = <GInvoicingReport />;
  } else if (isFundingDistribution) {
    content = <FundingDistribution />;
  } else if (isFundingAuthorization) {
    content = <FundingAuthorizationContent />;
  } else if (isFundingWorkPlans) {
    content = <FundingWorkPlansContent />;
  } else if (isAPMDistribution) {
    content = <APMDistributionContent />;
  } else if (isActivityDistribution) {
    content = <ActivityDistributionContent />;
  } else if (isAPMAcceptance) {
    content = <APMAcceptanceContent />;
  } else if (isExecutionPlanningDashboard) {
    content = <ExecutionPlanningDashboard />;
  } else if (isPendingRoleAssignments) {
    content = <PendingRoleAssignmentsContent />;
  } else if (isEditRoleAssignment) {
    content = (
      <ErrorBoundary fallbackPath="/user-management">
        <EditRoleAssignmentContent />
      </ErrorBoundary>
    );
  } else if (isAddRoleAssignment) {
    content = <AddRoleAssignmentContent />;
  } else if (isUserProfilePage) {
    content = <UserProfileContent />;
  } else if (isUserManagementPage) {
    content = <UserManagementContent />;
  } else if (isAdminConsole) {
    content = <AdminConsoleContent />;
  } else if (isTaskWorkspaceLocal) {
    content = <TaskWorkspaceHeader />;
  } else if (isTaskPlanningTasks) {
    content = <TasksContent />;
  } else if (isTaskPlanningDashboard) {
    content = <TaskPlanningDashboard />;
  } else if (isTaskIdDetails) {
    content = <TaskIdDetailsContent />;
  } else if (isTaskRequirementsAlignment) {
    content = <TaskRequirementsAlignmentContent />;
  } else {
    content = <ContentArea />;
  }

  return (
    <div className="flex w-full h-full overflow-hidden" data-name="Middle">
      {/* Fixed Sidebar */}
      <PeSidenav isSidebarCollapsed={isSidebarCollapsed} />
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {content}
      </div>
    </div>
  );
}

function PeSidenav({ isSidebarCollapsed }: any) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  if (isSidebarCollapsed) {
    return <PeSidenavCollapsed hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} currentPath={location.pathname} />;
  }

  return (
    <div className="bg-[#f9f9fb] relative shrink-0 w-[260px] transition-all duration-300 ease-in-out h-full overflow-y-auto" data-name="pe-sidenav">
      <div className="flex flex-col items-start p-[24px] relative w-full">
        <PeTenantItem />
        <Budget hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
        <Requirements hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
        <Bat hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
        <TaskPlanning hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
        <ExecutionPlanning hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} currentPath={location.pathname} />
        <Reports hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e1e6] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PeSidenavCollapsed({ hoveredItem, setHoveredItem, currentPath }: any) {
  const isOnExecutionPlanningRoute = currentPath?.startsWith('/execution-planning');
  const isOnTaskPlanningRoute = currentPath === '/task-planning/dashboard' || currentPath === '/task-requirements-alignment' || currentPath?.startsWith('/task-requirements-alignment/');
  
  return (
    <div className="bg-[#f9f9fb] relative shrink-0 transition-all duration-300 ease-in-out h-full overflow-y-auto" data-name="pe-sidenav">
      <div className="flex flex-col gap-[8px] items-center p-[24px] relative">
        <PeSidenavTenantIcon />
        <PeSidenavIcon label="Budget" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} iconId="budget" pathData={svgPathsCollapsed.p32102160} />
        <PeSidenavIcon label="Require" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} iconId="require" pathData={svgPathsCollapsed.p6858080} />
        <PeSidenavIcon label="BAT" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} iconId="bat" pathData={svgPathsCollapsed.p8798e80} />
        <PeSidenavIcon label="Task" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} iconId="task" pathData={svgPathsCollapsed.p563dc80} to="/task-planning/dashboard" isActive={isOnTaskPlanningRoute} />
        <PeSidenavIcon label="Execute" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} iconId="execute" pathData={svgPathsCollapsed.p35261900} to="/execution-planning/dashboard" isActive={isOnExecutionPlanningRoute} />
        <PeSidenavIcon label="Reports" hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} iconId="reports" pathData={svgPathsCollapsed.p42f5380} />
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e1e6] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PeSidenavTenantIcon() {
  return (
    <Link 
      to="/" 
      className="content-stretch flex items-center justify-center pb-[12px] relative shrink-0 w-[56px] hover:opacity-80 transition-opacity" 
      data-name="pe-sidenav-tenant-icon"
    >
      <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      <Pms420Logo />
    </Link>
  );
}

function PeSidenavIcon({ label, hoveredItem, setHoveredItem, iconId, pathData, to, isActive }: any) {
  const isHovered = hoveredItem === iconId;
  
  const content = (
    <>
      <div className="relative shrink-0 size-[24px]" data-name="icon">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="icon">
            <path d={pathData} id="Vector" stroke={isActive ? "#004B72" : "var(--stroke-0, #1C2024)"} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
      <p className={`css-ew64yg font-['Inter:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] tracking-[0.04px] ${
        isActive ? 'font-semibold text-[#004B72]' : 'font-normal text-[#1c2024]'
      }`}>{label}</p>
    </>
  );
  
  if (to) {
    return (
      <Link
        to={to}
        className={`content-stretch flex flex-col gap-[4px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0 size-[56px] cursor-pointer transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
        data-name="pe-sidenav-icon"
        onMouseEnter={() => setHoveredItem(iconId)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {content}
      </Link>
    );
  }
  
  return (
    <div 
      className={`content-stretch flex flex-col gap-[4px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0 size-[56px] cursor-pointer transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
      data-name="pe-sidenav-icon"
      onMouseEnter={() => setHoveredItem(iconId)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {content}
    </div>
  );
}

function PeTenantItem() {
  return (
    <Link 
      to="/" 
      className="content-stretch flex gap-[16px] items-center pb-[12px] relative shrink-0 w-[212px] hover:opacity-80 transition-opacity group" 
      data-name="pe-tenant-item"
    >
      <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      <Pms420Logo />
      <Pms420Text />
    </Link>
  );
}

function Pms420Logo() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="pms-420-logo">
      <div className="relative shrink-0 size-[44px]" data-name="PMS 420 Logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPms420Logo1} />
      </div>
    </div>
  );
}

function Pms420Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[83px]" data-name="pms-420-text">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-0 not-italic text-[20px] text-black top-0 tracking-[-1px]">PMS 420</p>
    </div>
  );
}

function ChevronToggle({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className={`relative shrink-0 size-[24px] transition-transform ${isExpanded ? 'rotate-90' : 'rotate-0'}`} data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function ComingSoonSubmenuItem() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`content-stretch flex flex-col items-start overflow-clip pl-[32px] relative shrink-0 w-[212px] cursor-default transition-colors ${
        isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-name="coming-soon-submenu-item"
    >
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between pl-[12px] pr-[4px] py-[12px] relative w-full">
            <div className="content-stretch flex items-center relative shrink-0">
              <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[14px]">
                Coming Soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Budget({ hoveredItem, setHoveredItem }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHovered = hoveredItem === 'budget';
  return (
    <div className="relative shrink-0 w-[212px]" data-name="budget">
      <div 
        className={`cursor-pointer transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
        onMouseEnter={() => setHoveredItem('budget')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="content-stretch flex items-center justify-between overflow-clip px-[4px] py-[20px] relative rounded-[inherit] w-full">
          <IconText />
          <ChevronToggle isExpanded={isExpanded} />
        </div>
        <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      {isExpanded && <ComingSoonSubmenuItem />}
    </div>
  );
}

function IconText() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="icon-text">
      <Icon />
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px]">Budget</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p32102160} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Requirements({ hoveredItem, setHoveredItem }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHovered = hoveredItem === 'requirements';
  return (
    <div className="relative shrink-0 w-[212px]" data-name="requirements">
      <div 
        className={`cursor-pointer transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
        onMouseEnter={() => setHoveredItem('requirements')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="content-stretch flex items-center justify-between overflow-clip px-[4px] py-[20px] relative rounded-[inherit] w-full">
          <IconText1 />
          <ChevronToggle isExpanded={isExpanded} />
        </div>
        <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      {isExpanded && <ComingSoonSubmenuItem />}
    </div>
  );
}

function IconText1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="icon-text">
      <Icon1 />
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px]">Requirements</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p6858080} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Bat({ hoveredItem, setHoveredItem }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHovered = hoveredItem === 'bat';
  return (
    <div className="relative shrink-0 w-[212px]" data-name="BAT">
      <div 
        className={`cursor-pointer transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
        onMouseEnter={() => setHoveredItem('bat')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="content-stretch flex items-center justify-between overflow-clip px-[4px] py-[20px] relative rounded-[inherit] w-full">
          <IconText2 />
          <ChevronToggle isExpanded={isExpanded} />
        </div>
        <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      {isExpanded && <ComingSoonSubmenuItem />}
    </div>
  );
}

function IconText2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="icon-text">
      <Icon2 />
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px]">BAT</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p8798e80} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Chevron2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function TaskPlanning({ hoveredItem, setHoveredItem }: any) {
  const location = useLocation();
  const isOnTaskPlanningRoute = location.pathname === '/task-requirements-alignment' || location.pathname.startsWith('/task-requirements-alignment/') || location.pathname === '/task-planning/dashboard' || location.pathname === '/task-planning/tasks';
  const [isExpanded, setIsExpanded] = useState(isOnTaskPlanningRoute);
  
  useEffect(() => {
    if (isOnTaskPlanningRoute) {
      setIsExpanded(true);
    }
  }, [isOnTaskPlanningRoute]);
  
  const isHovered = hoveredItem === 'taskplanning';
  return (
    <div className="relative shrink-0 w-[212px]" data-name="task-planning">
      <div 
        className={`transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
        onMouseEnter={() => setHoveredItem('taskplanning')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="content-stretch flex items-center justify-between overflow-clip px-[4px] py-[20px] relative rounded-[inherit] w-full">
          <Link 
            to="/task-planning/dashboard"
            className="flex-1 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <IconText3 />
          </Link>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="cursor-pointer"
          >
            <ChevronToggle isExpanded={isExpanded} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      {isExpanded && <TaskPlanningSubmenu currentPath={location.pathname} />}
    </div>
  );
}

function IconText3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="icon-text">
      <Icon3 />
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px]">Task Planning</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p563dc80} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function TaskPlanningSubmenu({ currentPath }: { currentPath: string }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isDashboardActive = currentPath === '/task-planning/dashboard';
  const isTasksActive = currentPath === '/task-planning/tasks' || currentPath.startsWith('/task-planning/tasks/');
  const isTaskRequirementsActive = currentPath === '/task-requirements-alignment' || currentPath.startsWith('/task-requirements-alignment/');
  
  return (
    <div className="w-[212px]">
      <TaskPlanningSubmenuItem label="Dashboard" to="/task-planning/dashboard" isActive={isDashboardActive} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} itemKey="tp-dashboard" />
      <TaskPlanningSubmenuItem label="Tasks" to="/task-planning/tasks" isActive={isTasksActive} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} itemKey="tp-tasks" />
      {/* Hidden from navigation - page remains accessible via direct URL */}
      {/* <TaskPlanningSubmenuItem label="Task-Requirements Alignment" to="/task-requirements-alignment" isActive={isTaskRequirementsActive} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} itemKey="task-requirements" /> */}
    </div>
  );
}

function TaskPlanningSubmenuItem({ label, to, isActive, hoveredItem, setHoveredItem, itemKey }: { label: string; to: string; isActive: boolean; hoveredItem: string | null; setHoveredItem: (v: string | null) => void; itemKey: string }) {
  return (
    <Tooltip content={label} showOnlyWhenTruncated>
      <Link
        to={to}
        className={`content-stretch flex flex-col items-start overflow-clip pl-[32px] relative shrink-0 w-[212px] cursor-pointer transition-colors no-underline ${
          hoveredItem === itemKey || isActive ? 'bg-[rgba(0,75,114,0.05)]' : ''
        }`}
        onMouseEnter={() => setHoveredItem(itemKey)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between pl-[12px] pr-[4px] py-[12px] relative w-full">
              <div className="content-stretch flex items-center relative overflow-hidden min-w-0">
                <p 
                  data-truncate
                  className={`css-ew64yg font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[14px] truncate ${
                    isActive ? 'font-semibold text-[#004B72]' : 'font-normal text-[#1c2024]'
                  }`}
                >
                  {label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Tooltip>
  );
}

function Chevron3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function ExecutionPlanning({ hoveredItem, setHoveredItem, currentPath }: any) {
  // Auto-expand if we're on any execution planning route
  const isOnExecutionPlanningRoute = currentPath?.startsWith('/execution-planning') || currentPath === '/funding-distribution' || currentPath === '/funding-authorization' || currentPath === '/funding-work-plans' || currentPath === '/apm-distribution' || currentPath === '/reconciliation-report' || currentPath === '/g-invoicing-report' || currentPath === '/g-invoicing-reports' || currentPath === '/g-invoice-performance-items';
  const [isExpanded, setIsExpanded] = useState(isOnExecutionPlanningRoute);
  
  // Keep expanded state in sync with route
  useEffect(() => {
    if (isOnExecutionPlanningRoute) {
      setIsExpanded(true);
    }
  }, [isOnExecutionPlanningRoute]);
  
  const isHovered = hoveredItem === 'executionplanning';
  
  return (
    <div className="relative shrink-0 w-[212px]" data-name="execution-planning">
      <div 
        className={`transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
        onMouseEnter={() => setHoveredItem('executionplanning')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="content-stretch flex items-center justify-between overflow-clip px-[4px] py-[20px] relative rounded-[inherit] w-full">
          <Link 
            to="/execution-planning/dashboard"
            className="flex-1 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <IconText4 />
          </Link>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="cursor-pointer"
          >
            <Chevron4 isExpanded={isExpanded} />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      
      {/* Submenu items - only shown when expanded */}
      {isExpanded && (
        <>
          <ExecutionPlanningSubmenuItem label="Dashboard" to="/execution-planning/dashboard" isActive={currentPath === '/execution-planning/dashboard'} />
          <ExecutionPlanningSubmenuItem label="Funding Distribution" to="/funding-distribution" isActive={currentPath === '/funding-distribution'} />
          <ExecutionPlanningSubmenuItem label="Funding Authorization" to="/funding-authorization" isActive={currentPath === '/funding-authorization'} />
          <ExecutionPlanningSubmenuItem label="APM Distribution" to="/apm-distribution" isActive={currentPath === '/apm-distribution'} />
          <ExecutionPlanningSubmenuItem label="Activity Distribution" to="/activity-distribution" isActive={currentPath === '/activity-distribution'} />
          <ExecutionPlanningSubmenuItem label="APM Acceptance" to="/apm-acceptance" isActive={currentPath === '/apm-acceptance'} />
          <ExecutionPlanningSubmenuItem label="BFM Processing" to="#" isActive={false} />
          <ExecutionPlanningSubmenuItem label="Funding Workplans" to="/funding-work-plans" isActive={currentPath === '/funding-work-plans'} />
          <ExecutionPlanningSubmenuItem label="Reconciliation Report" to="/reconciliation-report" isActive={currentPath === '/reconciliation-report' || currentPath === '/g-invoicing-report'} />
          <ExecutionPlanningSubmenuItem label="G-Invoicing Reports" to="/g-invoicing-reports" isActive={currentPath === '/g-invoicing-reports' || currentPath === '/g-invoice-performance-items'} />
        </>
      )}
    </div>
  );
}

function IconText4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="icon-text">
      <Icon4 />
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px]">Execution Planning</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p35261900} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Chevron4({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className={`relative shrink-0 size-[24px] transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M6 9L12 15L18 9" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ExecutionPlanningSubmenuItem({ label, to, isActive }: { label: string; to: string; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const content = (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[4px] py-[12px] relative w-full">
          <div className="content-stretch flex items-center relative overflow-hidden min-w-0">
            <p 
              data-truncate
              className={`css-ew64yg font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[14px] truncate ${
                isActive ? 'font-semibold text-[#004B72]' : 'font-normal text-[#1c2024]'
              }`}
            >
              {label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <Tooltip content={label} showOnlyWhenTruncated>
      <Link
        to={to}
        className={`content-stretch flex flex-col items-start overflow-clip pl-[32px] relative shrink-0 w-[212px] cursor-pointer transition-colors no-underline ${
          isActive ? 'bg-[rgba(0,75,114,0.08)]' : isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-name="ep-submenu-item"
      >
        {content}
      </Link>
    </Tooltip>
  );
}

function Reports({ hoveredItem, setHoveredItem }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHovered = hoveredItem === 'reports';
  return (
    <div className="relative shrink-0 w-[212px]" data-name="reports">
      <div 
        className={`cursor-pointer transition-colors ${isHovered ? 'bg-[rgba(0,75,114,0.05)]' : ''}`}
        onMouseEnter={() => setHoveredItem('reports')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="content-stretch flex items-center justify-between overflow-clip px-[4px] py-[20px] relative rounded-[inherit] w-full">
          <IconText5 />
          <ChevronToggle isExpanded={isExpanded} />
        </div>
        <div aria-hidden="true" className="absolute border-[#60646c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      {isExpanded && <ComingSoonSubmenuItem />}
    </div>
  );
}

function IconText5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="icon-text">
      <Icon5 />
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px]">Reports</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.p42f5380} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Chevron5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function ContentArea() {
  return (
    <div className="bg-[#003350] flex-1 relative w-full" data-name="content-area">
      <div className="w-full">
        <div className="flex flex-col items-start p-[24px] w-full max-w-[1200px] mx-auto">
          <SplashPageContent4 />
        </div>
      </div>
    </div>
  );
}

function SplashPageContent4() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="splash-page-content">
      <SplashPageContent3 />
      
      {/* Subtle separator after hero */}
      <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)]" />
      
      <CaptainsAnnouncements />
      
      {/* Subtle separator before Quick Access */}
      <div className="w-full h-[1px] bg-[rgba(255,255,255,0.12)]" />
      
      <Frame5 />
      
      {/* Subtle separator after Quick Access */}
      <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)]" />
      
      <CaptainsAnnouncements1 />
      
      {/* Subtle separator before Getting Started */}
      <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)]" />
      
      <Frame33 />
    </div>
  );
}

function SplashPageContent3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="splash-page-content">
      <SplashPageContent2 />
    </div>
  );
}

function SplashPageContent2() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[5px] shrink-0 w-full" data-name="splash-page-content">
      <SplashPageContent />
      <Image />
      <SplashPageContent1 />
    </div>
  );
}

function SplashPageContent() {
  return (
    <div className="bg-[#003350] relative rounded-tl-[5px] rounded-tr-[5px] shrink-0 w-full" data-name="splash-page-content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[24px] items-center p-[24px] relative w-full">
          <div className="relative shrink-0 size-[75px]" data-name="PMS 420 Logo 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPms420Logo1} />
          </div>
          <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-white tracking-[-1px]">
            <p className="css-ew64yg leading-[normal] font-bold">Welcome to PMS 420 SyncPoint • Home of LCS Mission Modules</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[438px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      <div className="content-stretch flex flex-col items-start px-[447px] py-[18px] relative size-full">
        <CarouselSwitchter />
        <PeChevronLeft />
        <PeChevronRight />
      </div>
    </div>
  );
}

function CarouselSwitchter() {
  return (
    <div className="absolute h-[40px] left-1/2 -translate-x-1/2 top-[388px] w-[234px]" data-name="carousel-switchter">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 40">
          <g id="carousel-switchter">
            <rect fill="var(--fill-0, #FFFFFF)" fillOpacity="0.3" height="40" rx="20" width="234" />
            <ellipse cx="19.5" cy="20" fill="var(--fill-0, #FFFFFF)" id="Ellipse 1" opacity="0.5" rx="11.5" ry="12" />
            <g id="Frame 4" opacity="1">
              <rect fill="var(--fill-0, #FFFFFF)" fillOpacity="0.9" height="24" rx="12" width="48" x="50" y="8" />
            </g>
            <circle cx="129" cy="20" fill="var(--fill-0, #FFFFFF)" id="Ellipse 3" opacity="0.5" r="12" />
            <circle cx="172" cy="20" fill="var(--fill-0, #FFFFFF)" id="Ellipse 4" opacity="0.5" r="12" />
            <ellipse cx="214.5" cy="20" fill="var(--fill-0, #FFFFFF)" id="Ellipse 5" opacity="0.5" rx="11.5" ry="12" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function PeChevronLeft() {
  return (
    <div className="absolute left-0 size-[48px] top-[195px] cursor-pointer hover:opacity-80 transition-opacity" data-name="pe-chevron-left">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g id="pe-chevron-left">
            <rect fill="var(--fill-0, #FFFFFF)" fillOpacity="0.3" height="48" rx="5" width="48" />
            <path d="M27 30L21 24L27 18" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function PeChevronRight() {
  return (
    <div className="absolute right-0 size-[48px] top-[195px] cursor-pointer hover:opacity-80 transition-opacity" data-name="pe-chevron-right">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g id="pe-chevron-right">
            <rect fill="var(--fill-0, #FFFFFF)" fillOpacity="0.3" height="48" rx="5" width="48" />
            <path d="M21 30L27 24L21 18" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SplashPageContent1() {
  return (
    <div className="bg-[#003350] relative rounded-bl-[5px] rounded-br-[5px] shrink-0 w-full" data-name="splash-page-content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[24px] relative w-full">
          <SplashTitleLink />
        </div>
      </div>
    </div>
  );
}

function SplashTitleLink() {
  return (
    <div className="h-[53px] relative shrink-0 w-[415px]" data-name="splash-title-link">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[-5.66%_-135.42%_-3.77%_0] justify-center leading-[0] not-italic text-[0px] text-white tracking-[-1px]">
        <p className="css-ew64yg leading-[normal] mb-0 text-[28px]">PMS 420 Setting the Standard for Accelerated Acquisition</p>
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[16px]">The SECNAV Phelan acknowledged the accelerated acquisition efforts represented by the PMS 420 program, which focuses on...</p>
      </div>
    </div>
  );
}

// Remaining content sections - these are kept as static for now since they're not in the requirements
function CaptainsAnnouncements() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="captains-announcements">
      <Frame />
      <Frame13 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#003350] flex-[1_0_0] h-[236px] min-h-px min-w-px relative rounded-[5px]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
          <Frame4 />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeShipWheel />
      <TitleLink />
    </div>
  );
}

function PeShipWheel() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="pe-ship-wheel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="pe-ship-wheel">
          <path d={svgPaths.p23362500} id="Vector" stroke="var(--stroke-0, #FFBA18)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TitleLink() {
  return (
    <div className="h-[48px] relative shrink-0" data-name="title-link">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.98%_0%_18.87%_0] justify-center leading-[0] not-italic text-[28px] text-white tracking-[-1px] whitespace-nowrap">
        <p className="css-4hzbpn leading-[normal] pb-[4px] border-b-2 border-[rgba(255,186,24,0.4)] inline-block">Captain's Corner</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[10px] items-start pl-[64px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white w-full">
          <ul>
            <li className="css-4hzbpn list-disc ms-[24px] text-[16px]">
              <span className="leading-[24px]">{`"Our focus this quarter is execution discipline and transparency across mission module delivery. SyncPoint is a key tool in improving alignment and visibility." `}</span>
              <span className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic">Captain Matthew Lehman</span>
            </li>
          </ul>
        </div>
        <SplashLinkText />
      </div>
    </div>
  );
}

function SplashLinkText() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_60.22%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul className="whitespace-nowrap">
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Read full message →</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#003350] flex-[1_0_0] h-[236px] min-h-px min-w-px relative rounded-[5px]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[24px] relative size-full">
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame7 />
      <Frame3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeMegaphone />
      <TitleLink1 />
    </div>
  );
}

function PeMegaphone() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="pe-megaphone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="pe-megaphone">
          <path d={svgPaths.p2484ef00} id="Vector" stroke="var(--stroke-0, #FFBA18)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TitleLink1() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="title-link">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.67%_-4.1%_18.75%_0] justify-center leading-[0] not-italic text-[28px] text-white tracking-[-1px]">
        <p className="css-4hzbpn leading-[normal]">What's New / Announcements</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[15px] items-start pl-[64px] relative w-full">
        <SplashLinkText1 />
        <SplashLinkText2 />
        <SplashLinkText3 />
      </div>
    </div>
  );
}

function SplashLinkText1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_2.59%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">FY26 execution planning is now available in SyncPoint</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_21.31%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">New financial reporting template published</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_10.94%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">System maintenance scheduled for Jan 30, 2026</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#003350] relative rounded-[5px] shrink-0 w-full shadow-[0_0_40px_rgba(255,186,24,0.08)]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pb-[32px] pt-[24px] px-[24px] relative w-full bg-[rgba(0,51,80,0.5)]">
          <Frame15 />
          <Frame10 />
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame14 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeZap />
      <TitleLink2 />
    </div>
  );
}

function PeZap() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="pe-zap">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="pe-zap">
          <path d={svgPaths.p30565d00} id="Vector" stroke="var(--stroke-0, #FFBA18)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TitleLink2() {
  return (
    <div className="h-[48px] relative shrink-0 w-[415px]" data-name="title-link">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.98%_49.16%_18.87%_0] justify-center leading-[0] not-italic text-[28px] text-white tracking-[-1px]">
        <p className="css-4hzbpn leading-[normal]">Quick Access</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[44px] items-center relative shrink-0 w-full">
      <Component />
      <Component1 />
      <Component2 />
    </div>
  );
}

function Component() {
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px] cursor-pointer hover:shadow-lg hover:brightness-105 hover:-translate-y-[2px] transition-all duration-200" data-name="Component 2">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[22px] py-[17px] relative w-full">
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeBriefcaseBusiness />
      <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center not-italic relative self-center shrink-0 text-[24px] text-black tracking-[-1px]">
        <p className="css-ew64yg leading-[normal]">{`Projects & Programs`}</p>
      </div>
    </div>
  );
}

function PeBriefcaseBusiness() {
  return (
    <div className="relative shrink-0 size-[40px] flex items-center justify-center self-center" data-name="pe-briefcase-business">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <g id="pe-briefcase-business">
          <path d={svgPaths.p2487c400} id="Vector" stroke="var(--stroke-0, #004B72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Component1() {
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px] cursor-pointer hover:shadow-lg hover:brightness-105 hover:-translate-y-[2px] transition-all duration-200" data-name="Component 3">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[22px] py-[17px] relative w-full">
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeBlocks />
      <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center not-italic relative self-center shrink-0 text-[24px] text-black tracking-[-1px]">
        <p className="css-ew64yg leading-[normal]">Activities</p>
      </div>
    </div>
  );
}

function PeBlocks() {
  return (
    <div className="relative shrink-0 size-[40px] flex items-center justify-center self-center" data-name="pe-blocks">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <g id="pe-blocks">
          <path d={svgPaths.p3201b100} id="Vector" stroke="var(--stroke-0, #004B72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Component2() {
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px] cursor-pointer hover:shadow-lg hover:brightness-105 hover:-translate-y-[2px] transition-all duration-200" data-name="Component 4">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[22px] py-[17px] relative w-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeBanknote />
      <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center not-italic relative self-center shrink-0 text-[24px] text-black tracking-[-1px]">
        <p className="css-ew64yg leading-[normal]">Financials</p>
      </div>
    </div>
  );
}

function PeBanknote() {
  return (
    <div className="relative shrink-0 size-[40px] flex items-center justify-center self-center" data-name="pe-banknote">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <g id="pe-banknote">
          <path d={svgPaths.p4f70d00} id="Vector" stroke="var(--stroke-0, #004B72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[44px] items-center relative shrink-0 w-full">
      <Component3 />
      <Component4 />
      <Component5 />
    </div>
  );
}

function Component3() {
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px] cursor-pointer hover:shadow-lg hover:brightness-105 hover:-translate-y-[2px] transition-all duration-200" data-name="Component 2">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[22px] py-[17px] relative w-full">
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeFileText />
      <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center not-italic relative self-center shrink-0 text-[24px] text-black tracking-[-1px]">
        <p className="css-ew64yg leading-[normal]">Documents</p>
      </div>
    </div>
  );
}

function PeFileText() {
  return (
    <div className="relative shrink-0 size-[40px] flex items-center justify-center self-center" data-name="pe-file-text">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <g id="pe-file-text">
          <path d={svgPaths.p28f82240} id="Vector" stroke="var(--stroke-0, #004B72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Component4() {
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px] cursor-pointer hover:shadow-lg hover:brightness-105 hover:-translate-y-[2px] transition-all duration-200" data-name="Component 3">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[22px] py-[17px] relative w-full">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeChartArea />
      <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center not-italic relative self-center shrink-0 text-[24px] text-black tracking-[-1px]">
        <p className="css-ew64yg leading-[normal]">Reports</p>
      </div>
    </div>
  );
}

function PeChartArea() {
  return (
    <div className="relative shrink-0 size-[40px] flex items-center justify-center self-center" data-name="pe-chart-area">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <g id="pe-chart-area">
          <path d={svgPaths.pbd48300} id="Vector" stroke="var(--stroke-0, #004B72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Component5() {
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px] cursor-pointer hover:shadow-lg hover:brightness-105 hover:-translate-y-[2px] transition-all duration-200" data-name="Component 4">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[22px] py-[17px] relative w-full">
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeSettings1 />
      <div className="css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center not-italic relative self-center shrink-0 text-[24px] text-black tracking-[-1px]">
        <p className="css-ew64yg leading-[normal]">Admin Tools</p>
      </div>
    </div>
  );
}

function PeSettings1() {
  return (
    <div className="relative shrink-0 size-[40px] flex items-center justify-center self-center" data-name="pe-settings">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <g id="pe-settings">
          <path d={svgPaths.p32ba0f80} id="Vector" stroke="var(--stroke-0, #004B72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function CaptainsAnnouncements1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="captains-announcements">
      <Frame1 />
      <Frame27 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#003350] flex-[1_0_0] h-[214px] min-h-px min-w-px relative rounded-[5px]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-start p-[24px] relative size-full">
          <Frame22 />
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame21 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeSidenavTenantIconFooter />
      <TitleLink3 />
    </div>
  );
}

function PeSidenavTenantIconFooter() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-name="pe-sidenav-tenant-icon">
      <Pms420Logo1 />
    </div>
  );
}

function Pms420Logo1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="pms-420-logo">
      <div className="relative shrink-0 size-[44px]" data-name="PMS 420 Logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPms420Logo1} />
      </div>
    </div>
  );
}

function TitleLink3() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="title-link">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.67%_-6.27%_18.75%_0] justify-center leading-[0] not-italic text-[28px] text-white tracking-[-1px]">
        <p className="css-4hzbpn leading-[normal]">PMS 420 at a Glance</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[15px] items-start pl-[50px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
          <ul>
            <li className="css-4hzbpn list-disc ms-[24px]">
              <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Mission statement</a>
            </li>
          </ul>
        </div>
        <SplashLinkText4 />
        <SplashLinkText5 />
      </div>
    </div>
  );
}

function SplashLinkText4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_54.32%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Organizational Overview</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_60.22%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Where SyncPoint fits</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#003350] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px]">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[24px] relative w-full">
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeBookText />
      <TitleLink4 />
    </div>
  );
}

function PeBookText() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="pe-book-text">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="pe-book-text">
          <path d={svgPaths.p1ef97b80} id="Vector" stroke="var(--stroke-0, #FFBA18)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TitleLink4() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="title-link">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.67%_-4.1%_18.75%_0] justify-center leading-[0] not-italic text-[28px] text-white tracking-[-1px]">
        <p className="css-4hzbpn leading-[normal]">Useful Resources</p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[15px] items-start pl-[64px] relative w-full">
        <SplashLinkText6 />
        <SplashLinkText7 />
        <SplashLinkText8 />
      </div>
    </div>
  );
}

function SplashLinkText6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_64.37%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">SOPs / Templates</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_65.5%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Required reading</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_31.91%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">External systems (ERP, Advana, etc.)</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[#003350] relative rounded-[5px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pb-[32px] pt-[24px] px-[24px] relative w-full">
          <Frame29 />
          <Frame12 />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame28 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <PeHandHelping />
      <TitleLink5 />
    </div>
  );
}

function PeHandHelping() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="pe-hand-helping">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="pe-hand-helping">
          <path d={svgPaths.p20d6b040} id="Vector" stroke="var(--stroke-0, #FFBA18)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TitleLink5() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="title-link">
      <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[16.67%_-145.3%_18.75%_0] justify-center leading-[0] not-italic text-[28px] text-white tracking-[-1px]">
        <p className="css-4hzbpn leading-[normal]">Getting Started / Help</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-start gap-[32px] relative shrink-0 w-full">
      <Frame30 />
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col flex-1 gap-[15px] items-start pl-[64px] relative shrink-0">
      <SplashLinkText9 />
      <SplashLinkText10 />
      <SplashLinkText11 />
    </div>
  );
}

function SplashLinkText9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[222px]" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_27.93%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">New to PMS 420?</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText10() {
  return (
    <div className="h-[24px] relative shrink-0 w-[222px]" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_14.41%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">How to use SyncPoint</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[222px]" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_12.16%_0_0] justify-center leading-[0] not-italic text-[16px] text-white">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Request access / roles</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col flex-1 gap-[15px] items-start pl-[64px] relative shrink-0">
      <SplashLinkText12 />
      <SplashLinkText13 />
      <SplashLinkText14 />
    </div>
  );
}

function SplashLinkText12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_0_0_0] justify-center leading-[0] not-italic text-[16px] text-white whitespace-nowrap">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Contact Admin</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_0_0_0] justify-center leading-[0] not-italic text-[16px] text-white whitespace-nowrap">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">List of tutorials</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_0_0_0] justify-center leading-[0] not-italic text-[16px] text-white whitespace-nowrap">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Request a new feature</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col flex-1 gap-[15px] items-start pl-[64px] relative shrink-0">
      <SplashLinkText15 />
      <SplashLinkText16 />
      <SplashLinkText17 />
    </div>
  );
}

function SplashLinkText15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_0_0_0] justify-center leading-[0] not-italic text-[16px] text-white whitespace-nowrap">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Acronyms database</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_0_0_0] justify-center leading-[0] not-italic text-[16px] text-white whitespace-nowrap">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Help tips</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SplashLinkText17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="splash-link-text">
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[0_0_0_0] justify-center leading-[0] not-italic text-[16px] text-white whitespace-nowrap">
        <ul>
          <li className="css-4hzbpn list-disc ms-[24px]">
            <a href="#" className="leading-[24px] cursor-pointer hover:underline focus:underline focus:outline-2 focus:outline-offset-2 focus:outline-white/50">Contact Support</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function PeFooter1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="pe-footer">
      <PeFooter />
      <PeClassificationBanner1 />
    </div>
  );
}

function PeFooter() {
  return (
    <div className="bg-[#f9f9fb] h-[48px] relative shrink-0 w-full" data-name="pe-footer">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,47,0.15)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative size-full">
          <Text />
          <PioneeringEvolutionLogoYesTmDefault />
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start relative shrink-0" data-name="Text">
      <div className="css-g0mm18 font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[0px] text-[12px] tracking-[0.04px]">
        <p className="css-ew64yg mb-0">
          <span className="leading-[16px]">{`This site is CUI — `}</span>
          <span className="leading-[16px] tracking-[0.04px]">{`Mandatory DoD Notice and Consent Banner `}</span>
          <span className="leading-[16px]">- Last Login: 7 Nov 2025 at 9:56 AM</span>
        </p>
        <p className="css-ew64yg leading-[16px]">Distribution Statement F: Controlled Unclassified Information (CUI) - Further dissemination only as directed by SyncPoint or higher DoD authority.</p>
      </div>
    </div>
  );
}

function PioneeringEvolutionLogoYesTmDefault() {
  return (
    <div className="h-[32px] relative shrink-0 w-[28px]" data-name="PioneeringEvolution_Logo_YesTM/Default">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 32">
        <g id="PioneeringEvolution_Logo_YesTM/Default">
          <path d={svgPaths.p87ae780} fill="var(--fill-0, #004B72)" id="PE Vector" />
          <g id="Trademark">
            <path d={svgPaths.p24ed4080} fill="var(--fill-0, #004B72)" id="Vector" />
            <path d={svgPaths.p29404000} fill="var(--fill-0, #004B72)" id="Vector_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PeClassificationBanner1() {
  return (
    <div className="bg-[#3ca23c] h-[24px] relative shrink-0 w-full" data-name="pe-classification-banner">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[4px] relative size-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[12px] tracking-[0.04px]">
            <p className="css-ew64yg leading-[16px]">CUI</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,47,0.15)] border-b border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}
