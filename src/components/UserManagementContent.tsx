import svgPaths from "../imports/svg-a7z1rf1e05";
import subTableIconPaths from "../imports/svg-16d18xu8m2";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import DisableUserModal from "./DisableUserModal";
import ReenableUserModal from "./ReenableUserModal";
import VersionDropdown from "./VersionDropdown";

// Mock user data - All Users dataset (mixed statuses and tenants)
const allUsersData = [
  { id: 1, name: "Jordan Matthews", email: "jordan.c.matthews@navy.mil", tenants: "PMS 420", roles: "SA/System", status: "Active", requests: "None" },
  { id: 2, name: "Casey Nguyen", email: "casey.j.nguyen@navy.mil", tenants: "PMS 495", roles: "BFM/ASW", status: "Inactive", requests: "1 Request" },
  { id: 3, name: "Jenny Thompson", email: "jenny.m.thompson@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/All", status: "Active", requests: "2 Requests" },
  { id: 4, name: "Riley Taylor", email: "riley.b.taylor@navy.mil", tenants: "PMS 420", roles: "TA/PMS420", status: "Disabled", requests: "None" },
  { id: 5, name: "Morgan Alvarez", email: "malvarez@navy.mil", tenants: "PMS 495", roles: "BFM/ASW", status: "Active", requests: "1 Request" },
  { id: 6, name: "Cameron Ellis", email: "cellis@navy.mil", tenants: "PMS 420 + 1", roles: "SA/System + 2", status: "Active", requests: "2 Requests" },
  { id: 7, name: "Avery Chen", email: "avery.w.chen@navy.mil", tenants: "PMS 420", roles: "BFM/RDT&E", status: "Disabled", requests: "None" },
  { id: 8, name: "Devin Carter", email: "carter@navy.mil", tenants: "PMS 495", roles: "FA/APN", status: "Active", requests: "1 Request" },
  { id: 9, name: "Sydney Patel", email: "sydney.k.patel@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/NSWCPCD", status: "Active", requests: "2 Requests" },
  { id: 10, name: "Reese Donovan", email: "rdonovan@navy.mil", tenants: "PMS 420 + 2", roles: "BFM/RDT&E + 3", status: "Inactive", requests: "None" },
];

// Active users dataset - all status = Active
const activeUsersData = [
  { id: 11, name: "Harper Rodriguez", email: "h.rodriguez@navy.mil", tenants: "PMS 420", roles: "BFM/All", status: "Active", requests: "None" },
  { id: 12, name: "Alex Kim", email: "alex.j.kim@navy.mil", tenants: "PMS 495", roles: "FA/APN", status: "Active", requests: "1 Request" },
  { id: 13, name: "Taylor Brooks", email: "taylor.m.brooks@navy.mil", tenants: "PMS 501", roles: "SA/System", status: "Active", requests: "None" },
  { id: 14, name: "Quinn Davis", email: "qdavis@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/RDT&E", status: "Active", requests: "2 Requests" },
  { id: 15, name: "Skyler Morgan", email: "skyler.l.morgan@navy.mil", tenants: "PMS 495", roles: "TA/PMS495", status: "Active", requests: "1 Request" },
  { id: 16, name: "Dakota Martinez", email: "d.martinez@navy.mil", tenants: "PMS 420", roles: "BFM/ASW", status: "Active", requests: "None" },
  { id: 17, name: "Phoenix Anderson", email: "phoenix.k.anderson@navy.mil", tenants: "PMS 501", roles: "FA/APN", status: "Active", requests: "None" },
  { id: 18, name: "Sage Williams", email: "swilliams@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/All + 1", status: "Active", requests: "1 Request" },
  { id: 19, name: "River Jackson", email: "river.b.jackson@navy.mil", tenants: "PMS 495", roles: "SA/System", status: "Active", requests: "2 Requests" },
  { id: 20, name: "Finley Lee", email: "finley.m.lee@navy.mil", tenants: "PMS 420", roles: "BFM/NSWCPCD", status: "Active", requests: "None" },
];

// Pending Requests dataset - all have ≥1 request
const pendingRequestsData = [
  { id: 21, name: "Blake Thompson", email: "blake.r.thompson@navy.mil", tenants: "PMS 420", roles: "BFM/All", status: "Active", requests: "2 Requests" },
  { id: 22, name: "Emerson Garcia", email: "e.garcia@navy.mil", tenants: "PMS 495", roles: "FA/APN", status: "Active", requests: "1 Request" },
  { id: 23, name: "Oakley White", email: "oakley.j.white@navy.mil", tenants: "PMS 501", roles: "SA/System", status: "Inactive", requests: "1 Request" },
  { id: 24, name: "Hayden Harris", email: "h.harris@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/RDT&E", status: "Active", requests: "3 Requests" },
  { id: 25, name: "Rowan Clark", email: "rowan.l.clark@navy.mil", tenants: "PMS 495", roles: "TA/PMS495", status: "Active", requests: "2 Requests" },
  { id: 26, name: "Sloan Lewis", email: "s.lewis@navy.mil", tenants: "PMS 420", roles: "BFM/ASW", status: "Inactive", requests: "1 Request" },
  { id: 27, name: "Ellis Walker", email: "ellis.k.walker@navy.mil", tenants: "PMS 501", roles: "FA/APN", status: "Active", requests: "2 Requests" },
  { id: 28, name: "Lennox Hall", email: "lennox@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/All", status: "Active", requests: "1 Request" },
  { id: 29, name: "Marlowe Allen", email: "marlowe.b.allen@navy.mil", tenants: "PMS 495", roles: "SA/System", status: "Inactive", requests: "3 Requests" },
  { id: 30, name: "Sutton Young", email: "s.young@navy.mil", tenants: "PMS 420", roles: "BFM/NSWCPCD", status: "Active", requests: "1 Request" },
];

// Disabled users dataset - all status = Disabled
const disabledUsersData = [
  { id: 31, name: "Beckett King", email: "beckett.r.king@navy.mil", tenants: "PMS 420", roles: "BFM/All", status: "Disabled", requests: "None" },
  { id: 32, name: "Finley Wright", email: "f.wright@navy.mil", tenants: "PMS 495", roles: "FA/APN", status: "Disabled", requests: "None" },
  { id: 33, name: "Kai Lopez", email: "kai.j.lopez@navy.mil", tenants: "PMS 501", roles: "SA/System", status: "Disabled", requests: "None" },
  { id: 34, name: "Arden Hill", email: "a.hill@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/RDT&E", status: "Disabled", requests: "None" },
  { id: 35, name: "Elliot Scott", email: "elliot.l.scott@navy.mil", tenants: "PMS 495", roles: "TA/PMS495", status: "Disabled", requests: "None" },
  { id: 36, name: "Remy Green", email: "r.green@navy.mil", tenants: "PMS 420", roles: "BFM/ASW", status: "Disabled", requests: "None" },
  { id: 37, name: "Paxton Adams", email: "paxton.k.adams@navy.mil", tenants: "PMS 501", roles: "FA/APN", status: "Disabled", requests: "None" },
  { id: 38, name: "Wren Baker", email: "wren@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/All", status: "Disabled", requests: "None" },
  { id: 39, name: "Jude Nelson", email: "jude.b.nelson@navy.mil", tenants: "PMS 495", roles: "SA/System", status: "Disabled", requests: "None" },
  { id: 40, name: "Crew Carter", email: "c.carter@navy.mil", tenants: "PMS 420", roles: "BFM/NSWCPCD", status: "Disabled", requests: "None" },
];

// Inactive users dataset - all status = Inactive
const inactiveUsersData = [
  { id: 41, name: "Briggs Mitchell", email: "briggs.r.mitchell@navy.mil", tenants: "PMS 420", roles: "BFM/All", status: "Inactive", requests: "None" },
  { id: 42, name: "Wilder Perez", email: "w.perez@navy.mil", tenants: "PMS 495", roles: "FA/APN", status: "Inactive", requests: "1 Request" },
  { id: 43, name: "Cruz Roberts", email: "cruz.j.roberts@navy.mil", tenants: "PMS 501", roles: "SA/System", status: "Inactive", requests: "None" },
  { id: 44, name: "Bodhi Turner", email: "b.turner@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/RDT&E", status: "Inactive", requests: "2 Requests" },
  { id: 45, name: "Atlas Phillips", email: "atlas.l.phillips@navy.mil", tenants: "PMS 495", roles: "TA/PMS495", status: "Inactive", requests: "None" },
  { id: 46, name: "Zane Campbell", email: "z.campbell@navy.mil", tenants: "PMS 420", roles: "BFM/ASW", status: "Inactive", requests: "1 Request" },
  { id: 47, name: "Knox Parker", email: "knox.k.parker@navy.mil", tenants: "PMS 501", roles: "FA/APN", status: "Inactive", requests: "None" },
  { id: 48, name: "Cove Evans", email: "cove@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/All + 1", status: "Inactive", requests: "None" },
  { id: 49, name: "Jett Edwards", email: "jett.b.edwards@navy.mil", tenants: "PMS 495", roles: "SA/System", status: "Inactive", requests: "2 Requests" },
  { id: 50, name: "Maddox Collins", email: "m.collins@navy.mil", tenants: "PMS 420", roles: "BFM/NSWCPCD", status: "Inactive", requests: "None" },
];

type QuickFilterType = 'all' | 'active' | 'pending' | 'disabled' | 'inactive';

// Helper function to generate additional users to reach 10 results
function generateMatchingUsers(
  existing: any[], 
  count: number, 
  filters: {
    quickFilterType: QuickFilterType;
    searchQuery: string;
    tenant: string | null;
    role: string | null;
  }
): any[] {
  const firstNames = ["Jordan", "Casey", "Alex", "Taylor", "Morgan", "Chris", "Jamie", "Riley", "Avery", "Quinn", 
                      "Drew", "Reese", "Sage", "Blake", "Dakota", "Emerson", "Finley", "Harper", "Hayden", "Justice"];
  const lastNames = ["Anderson", "Bennett", "Carter", "Davis", "Edwards", "Foster", "Garcia", "Harris", "Jackson", "Kim",
                     "Lee", "Miller", "Nelson", "Olson", "Parker", "Quinn", "Robinson", "Smith", "Taylor", "Wilson"];
  
  const tenants = ["PMS 420", "PMS 495", "PMS 501", "NAVSUP", "NAWC WD", "NIWC PAC", "NSWC Carderock"];
  const roles = ["SA/System", "BFM/ASW", "BFM/All", "FA/APN", "TA/PMS420", "BFM/RDT&E", "BFM/NSWCPCD"];
  
  const statuses: Record<QuickFilterType, string> = {
    'all': "Active",
    'active': "Active",
    'pending': "Active",
    'disabled': "Disabled",
    'inactive': "Inactive"
  };
  
  const requests: Record<QuickFilterType, string> = {
    'all': "None",
    'active': "None",
    'pending': "Requested",
    'disabled': "None",
    'inactive': "None"
  };
  
  const generated = [];
  const startId = 1000 + Math.floor(Math.random() * 1000);
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const emailPrefix = filters.searchQuery.trim() !== '' 
      ? filters.searchQuery.toLowerCase().replace(/\s+/g, '.')
      : `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const email = `${emailPrefix}@navy.mil`;
    
    const tenant = filters.tenant || tenants[Math.floor(Math.random() * tenants.length)];
    const role = filters.role || roles[Math.floor(Math.random() * roles.length)];
    const status = statuses[filters.quickFilterType];
    const request = requests[filters.quickFilterType];
    
    generated.push({
      id: startId + i,
      name,
      email,
      tenants: tenant,
      roles: role,
      status,
      requests: request
    });
  }
  
  return generated;
}

function getFilteredUserData(filter: QuickFilterType) {
  switch (filter) {
    case 'all':
      return allUsersData;
    case 'active':
      return activeUsersData;
    case 'pending':
      return pendingRequestsData;
    case 'disabled':
      return disabledUsersData;
    case 'inactive':
      return inactiveUsersData;
    default:
      return allUsersData;
  }
}

export default function UserManagementContent() {
  const [activeFilter, setActiveFilter] = useState<QuickFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [disableModalOpen, setDisableModalOpen] = useState(false);
  const [reenableModalOpen, setReenableModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, 'Active' | 'Disabled'>>({});

  // Stage 1: Get filtered dataset based on active quick filter
  const filteredByQuickFilter = getFilteredUserData(activeFilter);

  // Stage 2: Apply search filter
  const filteredBySearch = searchQuery.trim() === '' 
    ? filteredByQuickFilter 
    : filteredByQuickFilter.filter(user => {
        const query = searchQuery.toLowerCase();
        const nameMatch = user.name.toLowerCase().includes(query);
        const emailMatch = user.email.toLowerCase().includes(query);
        return nameMatch || emailMatch;
      });

  // Stage 3: Apply tenant filter
  const filteredByTenant = selectedTenant === null
    ? filteredBySearch
    : filteredBySearch.filter(user => {
        // Match if the user's tenants field includes the selected tenant
        // e.g., "PMS 420 + 1" should match "PMS 420"
        return user.tenants.includes(selectedTenant);
      });

  // Stage 4: Apply role filter
  let filteredByRole = selectedRole === null
    ? filteredByTenant
    : filteredByTenant.filter(user => {
        // Match if the user's roles field includes the selected role
        // e.g., "SA/System + 2" should match "SA/System"
        return user.roles.includes(selectedRole);
      });

  // Stage 5: Normalize to 10 results
  // If we have fewer than 10 results and search query is not nonsensical, generate additional users
  let users = filteredByRole;
  
  if (users.length < 10) {
    // Check if search query is nonsensical (contains no reasonable match)
    const hasSearchQuery = searchQuery.trim() !== '';
    const isNonsensicalSearch = hasSearchQuery && users.length === 0;
    
    if (!isNonsensicalSearch) {
      // Generate additional users to reach 10
      const needed = 10 - users.length;
      const additional = generateMatchingUsers(users, needed, {
        quickFilterType: activeFilter,
        searchQuery: searchQuery,
        tenant: selectedTenant,
        role: selectedRole
      });
      users = [...users, ...additional];
    }
  } else {
    // If we have 10 or more, slice to exactly 10
    users = users.slice(0, 10);
  }

  const handleOpenDisableModal = (userId: number, userName: string, userEmail: string) => {
    setSelectedUser({ id: userId, name: userName, email: userEmail });
    setDisableModalOpen(true);
  };

  const handleOpenReenableModal = (userId: number, userName: string, userEmail: string) => {
    setSelectedUser({ id: userId, name: userName, email: userEmail });
    setReenableModalOpen(true);
  };

  const handleConfirmDisable = () => {
    if (selectedUser) {
      setStatusOverrides(prev => ({
        ...prev,
        [selectedUser.email]: 'Disabled'
      }));
    }
    setDisableModalOpen(false);
  };

  const handleConfirmReenable = () => {
    if (selectedUser) {
      setStatusOverrides(prev => ({
        ...prev,
        [selectedUser.email]: 'Active'
      }));
    }
    setReenableModalOpen(false);
  };

  const handleFilterChange = (filter: QuickFilterType) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleTenantChange = (tenant: string | null) => {
    setSelectedTenant(tenant);
  };

  const handleRoleChange = (role: string | null) => {
    setSelectedRole(role);
  };

  const handleClearFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setSelectedTenant(null);
    setSelectedRole(null);
  };

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="w-full">
        <div className="flex flex-col items-start p-[24px] w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <PageHeader />
            <TableSection 
              users={users} 
              activeFilter={activeFilter}
              searchQuery={searchQuery}
              selectedTenant={selectedTenant}
              selectedRole={selectedRole}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              onTenantChange={handleTenantChange}
              onRoleChange={handleRoleChange}
              onClearFilters={handleClearFilters}
              onOpenDisableModal={handleOpenDisableModal} 
              onOpenReenableModal={handleOpenReenableModal}
              statusOverrides={statusOverrides}
            />
          </div>
        </div>
      </div>
      
      {/* Disable User Modal */}
      {selectedUser && (
        <DisableUserModal
          isOpen={disableModalOpen}
          onClose={() => setDisableModalOpen(false)}
          onConfirm={handleConfirmDisable}
          userName={selectedUser.name}
          userEmail={selectedUser.email}
        />
      )}
      
      {/* Re-enable User Modal */}
      {selectedUser && (
        <ReenableUserModal
          isOpen={reenableModalOpen}
          onClose={() => setReenableModalOpen(false)}
          onConfirm={handleConfirmReenable}
          userName={selectedUser.name}
          userEmail={selectedUser.email}
        />
      )}
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

function ButtonRow() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="button-row">
      <Link to="/add-role-assignment" className="bg-[#004b72] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors" data-name="pe-button">
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white">
          <p className="css-ew64yg leading-[20px]">Add Role Assignment</p>
        </div>
      </Link>
      <Link to="/pending-role-assignments" className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" data-name="pe-button">
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px]">
          <p className="css-ew64yg leading-[20px]">View Pending Role Assignments</p>
        </div>
      </Link>
      <div className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" data-name="pe-button">
        <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[14px]">
          <p className="css-ew64yg leading-[20px]">Export</p>
        </div>
      </div>
    </div>
  );
}

function PePageHeader() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="pe-page-header">
      <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[#004b72] border-b-3 border-solid border-t-3 inset-0 pointer-events-none" />
        <HeaderAndSubtitle />
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Admin Console', path: '/admin-console' },
          { label: 'User Management' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full min-w-0" data-name="header-and-subtitle">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px] whitespace-nowrap" data-name="page-title">User Management</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#60646c] text-[18px]">Manage users, roles, and access across your administrative scope.</p>
    </div>
  );
}

function TableSection({ users, activeFilter, searchQuery, selectedTenant, selectedRole, onFilterChange, onSearchChange, onTenantChange, onRoleChange, onClearFilters, onOpenDisableModal, onOpenReenableModal, statusOverrides }: any) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <FilterBar 
        activeFilter={activeFilter} 
        searchQuery={searchQuery}
        selectedTenant={selectedTenant}
        selectedRole={selectedRole}
        onFilterChange={onFilterChange} 
        onSearchChange={onSearchChange}
        onTenantChange={onTenantChange}
        onRoleChange={onRoleChange}
        onClearFilters={onClearFilters} 
      />
      <UserTable users={users} onOpenDisableModal={onOpenDisableModal} onOpenReenableModal={onOpenReenableModal} statusOverrides={statusOverrides} />
      <Pagination />
    </div>
  );
}

function FilterBar({ activeFilter, searchQuery, selectedTenant, selectedRole, onFilterChange, onSearchChange, onTenantChange, onRoleChange, onClearFilters }: any) {
  const isActive = (filter: QuickFilterType) => activeFilter === filter;
  
  return (
    <div className="bg-[#f9f9fb] content-stretch flex flex-col gap-[16px] items-start p-[12px] relative rounded-[5px] shrink-0 w-full" data-name="filters-container">
      {/* Row 1 - Quick Filters */}
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="quick-filters-bar">
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="left-filters">
          <div 
            onClick={() => onFilterChange('all')}
            className={`${isActive('all') ? 'bg-[rgba(20,125,185,0.09)]' : 'bg-white'} content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 cursor-pointer hover:bg-[rgba(20,125,185,0.15)] transition-colors`}
            data-name="filter-pill"
          >
            <div aria-hidden="true" className={`absolute ${isActive('all') ? 'border-2 border-[#004b72]' : 'border border-[#e0e1e6]'} border-solid inset-0 pointer-events-none rounded-[100px]`} />
            <p className={`css-ew64yg ${isActive('all') ? "font-['Inter:Medium',sans-serif] font-medium" : "font-['Inter:Regular',sans-serif] font-normal"} leading-[20px] text-[#1c2024] text-[14px]`}>All Users (956)</p>
          </div>
          <FilterPill label="Active (822)" filterType="active" isActive={isActive('active')} onClick={() => onFilterChange('active')} />
          <FilterPill label="Pending Requests (214)" filterType="pending" isActive={isActive('pending')} onClick={() => onFilterChange('pending')} />
          <FilterPill label="Disabled (17)" filterType="disabled" isActive={isActive('disabled')} onClick={() => onFilterChange('disabled')} />
          <FilterPill label="Inactive (62)" filterType="inactive" isActive={isActive('inactive')} onClick={() => onFilterChange('inactive')} />
        </div>
      </div>
      
      {/* Row 2 - Structured Filters with Clear Filters */}
      <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="filter-dropdown-bar">
        {/* Search field */}
        <div className="content-stretch flex gap-[24px] h-[32px] items-center justify-center relative shrink-0 w-[250px]">
          <SearchField value={searchQuery} onChange={onSearchChange} />
        </div>
        
        {/* Tenants and Roles dropdowns */}
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="bfm-management-filters">
          <TenantsDropdown selectedTenant={selectedTenant} onTenantChange={onTenantChange} />
          <RolesDropdown selectedRole={selectedRole} onRoleChange={onRoleChange} />
        </div>
        
        {/* Clear Filters ghost link */}
        <div onClick={onClearFilters} className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:underline transition-all" data-name="pe-button">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">Clear Filters</p>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, filterType, isActive, onClick }: { label: string; filterType: string; isActive: boolean; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`${isActive ? 'bg-[rgba(20,125,185,0.09)]' : 'bg-white'} content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 cursor-pointer hover:bg-[rgba(20,125,185,0.15)] transition-colors`}
      data-name="summary-pill"
    >
      <div aria-hidden="true" className={`absolute ${isActive ? 'border-2 border-[#004b72]' : 'border border-[#e0e1e6]'} border-solid inset-0 pointer-events-none rounded-[100px]`} />
      <p className={`css-ew64yg ${isActive ? "font-['Inter:Medium',sans-serif] font-medium" : "font-['Inter:Regular',sans-serif] font-normal"} leading-[20px] text-[#1c2024] text-[14px]`}>{label}</p>
    </div>
  );
}

function TenantsDropdown({ selectedTenant, onTenantChange }: { selectedTenant: string | null; onTenantChange: (tenant: string | null) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tenants = [
    // Primary PMS Programs
    "PMS 420",
    "PMS 495",
    "PMS 501",
    // Navy / Warfare Centers
    "NAVSUP",
    "NAWC WD",
    "NIWC PAC",
    "NSWC Carderock",
    "NSWC PC",
    "NUWC KPT",
    // Industry / Contractors
    "Lockheed Martin",
    "Northrop Grumman",
    "Raytheon",
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
    <div ref={dropdownRef} className="relative" data-name="tenants-dropdown-container">
      <div 
        className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[214px] cursor-pointer" 
        data-name="pe-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="content-container">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
              <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2024] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[20px] overflow-hidden">{selectedTenant || "Tenants"}</p>
              </div>
              <ChevronDown />
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)] z-50 min-w-[180px]" data-name="dropdown-menu">
          <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] max-h-[320px] overflow-y-auto">
            {selectedTenant && (
              <div
                className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer"
                onClick={() => {
                  onTenantChange(null);
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-row items-center rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#60646c] text-[14px] italic">
                      Clear selection
                    </p>
                  </div>
                </div>
              </div>
            )}
            {tenants.map((tenant) => (
              <div
                key={tenant}
                className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer"
                onClick={() => {
                  onTenantChange(tenant);
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-row items-center rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">
                      {tenant}
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

function RolesDropdown({ selectedRole, onRoleChange }: { selectedRole: string | null; onRoleChange: (role: string | null) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles = [
    // Global / Platform Admin
    "System Admin",
    "User Admin",
    // Tenant / Program Admin
    "Tenant Admin",
    "Appn Admin",
    "Appn Lead",
    // Execution / Management Roles
    "Activity Admin",
    "Activity Lead",
    "Project Admin",
    "Project Lead",
    // Financial / Oversight Roles
    "BFM",
    "FA",
    // Program Management
    "APM",
    "DAPM",
    // Points of Contact
    "FPOC",
    "TPOC",
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
    <div ref={dropdownRef} className="relative" data-name="roles-dropdown-container">
      <div 
        className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[250px] cursor-pointer" 
        data-name="pe-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="content-container">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
              <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2024] text-[14px] text-ellipsis whitespace-nowrap">
                <p className="leading-[20px] overflow-hidden">{selectedRole || "Roles"}</p>
              </div>
              <ChevronDown />
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(0,6,46,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)] z-50 min-w-[180px]" data-name="dropdown-menu">
          <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] max-h-[320px] overflow-y-auto">
            {selectedRole && (
              <div
                className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer"
                onClick={() => {
                  onRoleChange(null);
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-row items-center rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#60646c] text-[14px] italic">
                      Clear selection
                    </p>
                  </div>
                </div>
              </div>
            )}
            {roles.map((role) => (
              <div
                key={role}
                className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer"
                onClick={() => {
                  onRoleChange(role);
                  setIsOpen(false);
                }}
              >
                <div className="flex flex-row items-center rounded-[inherit] size-full">
                  <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">
                      {role}
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

function ChevronDown() {
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

function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-start min-h-px min-w-px relative" data-name="pe-text-field">
      <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="root">
        <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[4px] relative size-full">
            <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0" data-name="icon-container">
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p6f78000} id="Vector" stroke="var(--stroke-0, #1C2024)" />
                </svg>
              </div>
            </div>
            <input 
              type="text" 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search by name or email..." 
              className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px text-[#1c2024] text-[14px] bg-transparent border-none outline-none px-[4px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserTable({ users, onOpenDisableModal, onOpenReenableModal, statusOverrides }: any) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (userId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      // Only allow one row expanded at a time (enterprise pattern)
      newExpanded.clear();
      newExpanded.add(userId);
    }
    setExpandedRows(newExpanded);
  };

  // Fixed column layout - all rows use identical column definitions
  // Chevron | Name | Email | Tenants | Roles | User Status | Role Requests | Actions
  const gridTemplateColumns = "48px minmax(180px, 2fr) minmax(200px, 2fr) minmax(120px, 1fr) minmax(120px, 1fr) minmax(120px, 1fr) minmax(140px, 1fr) 48px";

  return (
    <div className="bg-white content-stretch flex flex-col relative w-full rounded-[4px]" data-name="table">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <TableHeader gridTemplateColumns={gridTemplateColumns} />
      {users.map((user) => (
        <div key={user.id} className="w-full">
          <TableRow 
            user={user} 
            isExpanded={expandedRows.has(user.id)}
            onToggle={() => toggleRow(user.id)}
            gridTemplateColumns={gridTemplateColumns}
            onOpenDisableModal={onOpenDisableModal}
            onOpenReenableModal={onOpenReenableModal}
            statusOverrides={statusOverrides}
          />
          {expandedRows.has(user.id) && user.name === "Jenny Thompson" && (
            <ExpandedContent gridTemplateColumns={gridTemplateColumns} />
          )}
        </div>
      ))}
    </div>
  );
}

function TableHeader({ gridTemplateColumns }: { gridTemplateColumns: string }) {
  return (
    <div 
      className="bg-[#f9f9fb] w-full border-b border-[#e0e1e6]" 
      style={{ display: 'grid', gridTemplateColumns }}
      data-name="table-header"
    >
      {/* Chevron column */}
      <div className="flex items-center justify-center p-[12px]"></div>
      
      {/* Name column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Name</p>
      </div>
      
      {/* Email column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Email</p>
      </div>
      
      {/* Tenants column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Tenants</p>
      </div>
      
      {/* Roles column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Roles</p>
      </div>
      
      {/* User Status column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">User Status</p>
      </div>
      
      {/* Role Requests column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Role Requests</p>
      </div>
      
      {/* Actions column */}
      <div className="flex items-center justify-center p-[12px]"></div>
    </div>
  );
}

function TableRow({ user, isExpanded, onToggle, gridTemplateColumns, onOpenDisableModal, onOpenReenableModal, statusOverrides }: { 
  user: any; 
  isExpanded: boolean; 
  onToggle: () => void;
  gridTemplateColumns: string;
  onOpenDisableModal: (userId: number, userName: string, userEmail: string) => void;
  onOpenReenableModal: (userId: number, userName: string, userEmail: string) => void;
  statusOverrides: Record<string, 'Active' | 'Disabled'>;
}) {
  const navigate = useNavigate();
  
  // Check if there's a status override for this user (by email)
  const displayStatus = statusOverrides[user.email] || user.status;
  
  const statusColor = displayStatus === "Active" ? "text-[#218358]" : displayStatus === "Disabled" ? "text-[#c41e3a]" : "text-[#60646c]";
  const statusBgColor = displayStatus === "Active" ? "bg-[rgba(0,164,51,0.1)]" : displayStatus === "Disabled" ? "bg-[rgba(196,30,58,0.1)]" : "bg-[#f5f5f5]";
  
  // Only Jenny Thompson can expand
  const canExpand = user.name === "Jenny Thompson";
  
  // Apply expanded state styling when row is expanded
  const rowBgClass = isExpanded ? "bg-[rgba(0,75,114,0.04)]" : "hover:bg-[#fafafa]";
  const borderClass = isExpanded ? "border-b-0" : "border-b border-[#e0e1e6]";
  
  return (
    <div 
      className={`w-full ${borderClass} ${rowBgClass} transition-colors`}
      style={{ display: 'grid', gridTemplateColumns }}
      data-name="table-row"
    >
      {/* Chevron column */}
      <div className="flex items-center justify-center p-[12px]">
        <div 
          className={`relative shrink-0 size-[16px] ${canExpand ? 'cursor-pointer' : 'cursor-default opacity-40'}`}
          onClick={canExpand ? onToggle : undefined}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g>
              {isExpanded && canExpand ? (
                <path d="M4 6L8 10L12 6" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M6 4L10 8L6 12" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </g>
          </svg>
        </div>
      </div>
      
      {/* Name column */}
      <div className="flex items-center p-[12px]">
        <p 
          className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#004b72] text-[14px] cursor-pointer hover:underline"
          onClick={() => navigate(`/user-management/${user.id}`)}
        >
          {user.name}
        </p>
      </div>
      
      {/* Email column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{user.email}</p>
      </div>
      
      {/* Tenants column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{user.tenants}</p>
      </div>
      
      {/* Roles column */}
      <div className="flex items-center p-[12px]">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{user.roles}</p>
      </div>
      
      {/* User Status column */}
      <div className="flex items-center p-[12px]">
        <div className={`${statusBgColor} content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 inline-flex`}>
          <p className={`css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] ${statusColor} text-[14px]`}>{displayStatus}</p>
        </div>
      </div>
      
      {/* Role Requests column */}
      <div className="flex items-center p-[12px]">
        {user.requests !== "None" ? (
          <div className="bg-[rgba(255,186,24,0.1)] content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 inline-flex">
            <div className="relative shrink-0 size-[16px] mr-1">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <path d="M6.66667 2.66667V6.66667H2.66667L9.33333 13.3333V9.33333H13.3333L6.66667 2.66667Z" stroke="#C87D0E" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#C87D0E] text-[14px]">{user.requests}</p>
          </div>
        ) : (
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">None</p>
        )}
      </div>
      
      {/* Actions column */}
      <div className="flex items-center justify-center p-[12px]">
        <ParentRowActionMenu 
          userId={user.id} 
          userName={user.name}
          userEmail={user.email}
          userStatus={displayStatus}
          onOpenDisableModal={onOpenDisableModal}
          onOpenReenableModal={onOpenReenableModal}
        />
      </div>
    </div>
  );
}

function ExpandedContent({ gridTemplateColumns }: { gridTemplateColumns: string }) {
  // Fixed column layout for sub-tables - shared across all tenants
  // Roles | Role Status | Requested On | Actions
  const subTableGridColumns = "minmax(180px, 2fr) minmax(200px, 1fr) 160px minmax(200px, 1fr)";

  return (
    <div 
      className="w-full border-b border-[#e0e1e6] bg-[rgba(0,75,114,0.04)]" 
      style={{ display: 'grid', gridTemplateColumns }}
    >
      {/* Expanded content spans all columns */}
      <div className="p-[24px] border-l-[3px] border-l-[#004b72]" style={{ gridColumn: '1 / -1' }}>
        <div className="flex flex-col gap-[16px]">
          {/* Tenant: PMS 420 Section */}
          <div className="bg-[#f0f0f3] rounded-[5px] mb-[12px]">
            <div className="flex items-center justify-between p-[12px] border-b border-[rgba(0,8,48,0.27)]">
              <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Tenant: PMS 420</p>
            </div>
            {/* Subtable - CSS Grid */}
            <div className="w-full">
              {/* Header */}
              <div 
                className="bg-[#f9f9fb] w-full border-b border-[rgba(0,0,47,0.15)]"
                style={{ display: 'grid', gridTemplateColumns: subTableGridColumns }}
              >
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Roles</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Role Status</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Requested On</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Actions</p>
                </div>
              </div>
              {/* Body Rows */}
              <div 
                className="bg-white w-full border-b border-[rgba(0,0,47,0.15)]"
                style={{ display: 'grid', gridTemplateColumns: subTableGridColumns }}
              >
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">BFM/OMN</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <div className="bg-[rgba(0,164,51,0.1)] content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 inline-flex">
                    <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#218358] text-[14px]">Approved</p>
                  </div>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">01 April 2025</p>
                </div>
                <div className="flex items-center justify-between p-[12px]">
                  <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 inline-flex cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                    <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#004b72] text-[12px] tracking-[0.04px]">Disable</p>
                  </div>
                  <SubTableRowActionMenu 
                    userEmail="jenny.m.thompson@navy.mil"
                    userName="Jenny Thompson"
                    tenant="PMS 420"
                    role="BFM"
                    focusArea="OMN"
                    status="Approved"
                  />
                </div>
              </div>
              <div 
                className="bg-white w-full border-b border-[rgba(0,0,47,0.15)]"
                style={{ display: 'grid', gridTemplateColumns: subTableGridColumns }}
              >
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">BFM/APN</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <div className="bg-[rgba(255,222,0,0.24)] content-stretch flex gap-[4px] h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 inline-flex">
                    <div className="relative shrink-0 size-[16px]">
                      <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                        <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#AB6400" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#ab6400] text-[14px]">Requested</p>
                  </div>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">24 Nov 2025</p>
                </div>
                <div className="flex items-center justify-between p-[12px]">
                  <div className="flex gap-[12px]">
                    <div className="bg-[#004b72] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors">
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-white text-[12px] tracking-[0.04px]">Approve</p>
                    </div>
                    <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                      <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[3px]" />
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#004b72] text-[12px] tracking-[0.04px]">Reject</p>
                    </div>
                  </div>
                  <SubTableRowActionMenu 
                    userEmail="jenny.m.thompson@navy.mil"
                    userName="Jenny Thompson"
                    tenant="PMS 420"
                    role="BFM"
                    focusArea="APN"
                    status="Requested"
                  />
                </div>
              </div>
              <div 
                className="bg-white w-full"
                style={{ display: 'grid', gridTemplateColumns: subTableGridColumns }}
              >
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">BFM/RDT&E</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <div className="bg-[rgba(255,222,0,0.24)] content-stretch flex gap-[4px] h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 inline-flex">
                    <div className="relative shrink-0 size-[16px]">
                      <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                        <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#AB6400" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#ab6400] text-[14px]">Requested</p>
                  </div>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">27 Nov 2025</p>
                </div>
                <div className="flex items-center justify-between p-[12px]">
                  <div className="flex gap-[12px]">
                    <div className="bg-[#004b72] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors">
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-white text-[12px] tracking-[0.04px]">Approve</p>
                    </div>
                    <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                      <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[3px]" />
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#004b72] text-[12px] tracking-[0.04px]">Reject</p>
                    </div>
                  </div>
                  <SubTableRowActionMenu 
                    userEmail="jenny.m.thompson@navy.mil"
                    userName="Jenny Thompson"
                    tenant="PMS 420"
                    role="BFM"
                    focusArea="RDT&E"
                    status="Requested"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tenant: PMS 406 Section */}
          <div className="bg-[#f0f0f3] rounded-[5px]">
            <div className="flex items-center justify-between p-[12px] border-b border-[rgba(0,8,48,0.27)]">
              <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Tenant: PMS 406</p>
            </div>
            {/* Subtable - CSS Grid */}
            <div className="w-full">
              {/* Header */}
              <div 
                className="bg-[#f9f9fb] w-full border-b border-[rgba(0,0,47,0.15)]"
                style={{ display: 'grid', gridTemplateColumns: subTableGridColumns }}
              >
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Roles</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Role Status</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Requested On</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Actions</p>
                </div>
              </div>
              {/* Body Rows */}
              <div 
                className="bg-white w-full border-b border-[rgba(0,0,47,0.15)]"
                style={{ display: 'grid', gridTemplateColumns: subTableGridColumns }}
              >
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">BFM/All</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <div className="bg-[#f0f0f3] content-stretch flex gap-[4px] h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 inline-flex">
                    <div className="relative shrink-0 size-[16px]">
                      <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                        <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">Expired</p>
                  </div>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">15 Sep 2024</p>
                </div>
                <div className="flex items-center justify-between p-[12px]">
                  <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 inline-flex cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                    <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#004b72] text-[12px] tracking-[0.04px]">Re-enable</p>
                  </div>
                  <SubTableRowActionMenu 
                    userEmail="jenny.m.thompson@navy.mil"
                    userName="Jenny Thompson"
                    tenant="PMS 406"
                    role="BFM"
                    focusArea="All"
                    status="Expired"
                  />
                </div>
              </div>
              <div 
                className="bg-white w-full"
                style={{ display: 'grid', gridTemplateColumns: subTableGridColumns }}
              >
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">APM/ASW</p>
                </div>
                <div className="flex items-center p-[12px]">
                  <div className="bg-[rgba(0,179,238,0.12)] content-stretch flex gap-[4px] h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 inline-flex">
                    <div className="relative shrink-0 size-[16px]">
                      <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                        <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#00749E" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#00749e] text-[14px]">Scheduled</p>
                  </div>
                </div>
                <div className="flex items-center p-[12px]">
                  <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">05 Dec 2025</p>
                </div>
                <div className="flex items-center justify-between p-[12px]">
                  <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[3px] shrink-0 inline-flex cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                    <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[3px]" />
                    <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#004b72] text-[12px] tracking-[0.04px]">Edit</p>
                  </div>
                  <SubTableRowActionMenu 
                    userEmail="jenny.m.thompson@navy.mil"
                    userName="Jenny Thompson"
                    tenant="PMS 406"
                    role="APM"
                    focusArea="ASW"
                    status="Scheduled"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full py-[12px]">
      <div className="flex items-center gap-[12px]">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">Page Size:</p>
        <select className="bg-white border border-[#e0e1e6] rounded-[4px] px-[8px] py-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024]">
          <option>50</option>
          <option>100</option>
          <option>200</option>
        </select>
      </div>
      <div className="flex items-center gap-[12px]">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">1 to 50 of 956</p>
        <div className="flex items-center gap-[8px]">
          <button className="bg-white border border-[#e0e1e6] rounded-[4px] px-[8px] py-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">←</p>
          </button>
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">Page 1 of 20</p>
          <button className="bg-white border border-[#e0e1e6] rounded-[4px] px-[8px] py-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors">
            <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">→</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Parent table row action menu component
function ParentRowActionMenu({ userId, userName, userEmail, userStatus, onOpenDisableModal, onOpenReenableModal }: { 
  userId: number;
  userName: string;
  userEmail: string;
  userStatus: string;
  onOpenDisableModal: (userId: number, userName: string, userEmail: string) => void;
  onOpenReenableModal: (userId: number, userName: string, userEmail: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div 
        className="relative shrink-0 size-[20px] cursor-pointer hover:bg-[#e8e9ec] rounded transition-colors p-[2px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <circle cx="10" cy="5" r="1.5" fill="#1C2024" />
          <circle cx="10" cy="10" r="1.5" fill="#1C2024" />
          <circle cx="10" cy="15" r="1.5" fill="#1C2024" />
        </svg>
      </div>

      {isOpen && (
        <div 
          className="absolute right-0 top-[calc(100%+4px)] z-50 bg-white rounded-[6px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)] min-w-[220px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-[8px]">
            <div
              className="flex items-center gap-[12px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
              onClick={() => {
                navigate(`/user-management/${userId}`);
                setIsOpen(false);
              }}
            >
              <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 8C12.6667 10.6667 10.6667 12 8 12C5.33333 12 3.33333 10.6667 2 8C3.33333 5.33333 5.33333 4 8 4C10.6667 4 12.6667 5.33333 14 8Z" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                View User Details
              </p>
            </div>
            <div
              className="flex items-center gap-[12px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
              onClick={() => {
                navigate(`/user-management/${userId}`, { state: { editSection: 'personal' } });
                setIsOpen(false);
              }}
            >
              <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                <path d="M11.3333 2.00004C11.5084 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6666 1.44775C12.9142 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.383 14.4087 2.61182C14.5035 2.84063 14.5523 3.08584 14.5523 3.33337C14.5523 3.58091 14.5035 3.82612 14.4087 4.05494C14.314 4.28375 14.1751 4.49162 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3333 2.00004Z" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                Edit User
              </p>
            </div>
            <div
              className="flex items-center gap-[12px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
              onClick={() => {
                if (userStatus === "Disabled") {
                  onOpenReenableModal(userId, userName, userEmail);
                } else {
                  onOpenDisableModal(userId, userName, userEmail);
                }
                setIsOpen(false);
              }}
            >
              {userStatus === "Disabled" ? (
                <>
                  <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                    <rect x="4.66663" y="6.66663" width="6.66667" height="7.33333" rx="1.33333" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.66663 6.66667V4.66667C6.66663 3.19391 7.86054 2 9.33329 2C10.806 2 12 3.19391 12 4.66667V5.33333" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                    Re-enable User
                  </p>
                </>
              ) : (
                <>
                  <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 3L13 13" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                    Disable User
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-table row action menu component
function SubTableActionMenu({ actions }: { actions: { label: string; icon: JSX.Element }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div 
        className="relative shrink-0 size-[20px] cursor-pointer hover:bg-[#e8e9ec] rounded transition-colors p-[2px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <circle cx="10" cy="5" r="1.5" fill="#1C2024" />
          <circle cx="10" cy="10" r="1.5" fill="#1C2024" />
          <circle cx="10" cy="15" r="1.5" fill="#1C2024" />
        </svg>
      </div>

      {isOpen && (
        <div 
          className="absolute right-0 top-[calc(100%+4px)] z-50 bg-white rounded-[6px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)] min-w-[220px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-[8px]">
            {actions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-[12px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
                onClick={() => {
                  console.log(`Action: ${action.label}`);
                  setIsOpen(false);
                }}
              >
                {action.icon}
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  {action.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-table row action menu - specific component with fixed menu items
function SubTableRowActionMenu({ userEmail, userName, tenant, role, focusArea, status }: { 
  userEmail: string;
  userName: string;
  tenant: string;
  role: string;
  focusArea: string;
  status: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleEditRole = () => {
    // Navigate to edit page with query params
    const params = new URLSearchParams({
      email: userEmail,
      name: userName,
      tenant: tenant,
      role: role,
      focusArea: focusArea,
      status: status,
      returnTo: '/user-management'
    });
    navigate(`/edit-role-assignment?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div 
        className="relative shrink-0 size-[20px] cursor-pointer hover:bg-[#e8e9ec] rounded transition-colors p-[2px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <circle cx="10" cy="5" r="1.5" fill="#1C2024" />
          <circle cx="10" cy="10" r="1.5" fill="#1C2024" />
          <circle cx="10" cy="15" r="1.5" fill="#1C2024" />
        </svg>
      </div>

      {isOpen && (
        <div 
          className="absolute right-0 top-[calc(100%+4px)] z-50 bg-white rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)] border border-[rgba(0,0,51,0.06)] min-w-[200px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-[8px]">
            <div
              className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
              onClick={handleEditRole}
            >
              <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                <path d={subTableIconPaths.p24ecce00} stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                Edit Role
              </p>
            </div>
            <div
              className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
              onClick={() => {
                console.log('View Change History');
                setIsOpen(false);
              }}
            >
              <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                <path d={subTableIconPaths.p3ed33780} stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                View Change History
              </p>
            </div>
            <div className="h-0 relative shrink-0 w-full my-[4px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 195 1">
                  <line stroke="#E0E1E6" x2="195" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
            <div
              className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
              onClick={() => {
                console.log('Remove Role');
                setIsOpen(false);
              }}
            >
              <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                <path d={subTableIconPaths.p2aa76000} stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                Remove Role
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}