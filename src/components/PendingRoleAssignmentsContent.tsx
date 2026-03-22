import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from "./VersionDropdown";

// Mock pending role assignment data - All Pending Role Assignments (mixed dates)
const allPendingAssignments = [
  { id: 1, email: "jordan.c.matthews@navy.mil", tenants: "PMS 420", roles: "SA/System + 1", assignedOn: "15 Sep 2025" },
  { id: 2, email: "casey.j.nguyen@navy.mil", tenants: "PMS 495", roles: "BFM/ASW", assignedOn: "17 Sep 2025" },
  { 
    id: 3, 
    email: "jenny.m.thompson@navy.mil", 
    tenants: "PMS 420 + 1", 
    roles: "BFM/All", 
    assignedOn: "01 Apr 2025",
    expandedDetails: [
      {
        tenant: "PMS 420",
        roles: [
          { role: "BFM/OMN", assignedOn: "01 Apr 2025" },
          { role: "BFM/APN", assignedOn: "01 Apr 2025" },
          { role: "BFM/RDT&E", assignedOn: "01 Apr 2025" },
        ]
      },
      {
        tenant: "PMS 406",
        roles: [
          { role: "BFM/All", assignedOn: "01 Apr 2025" },
          { role: "APM/ASW", assignedOn: "01 Apr 2025" },
        ]
      }
    ]
  },
  { id: 4, email: "riley.b.taylor@navy.mil", tenants: "PMS 420", roles: "TA/PMS420", assignedOn: "29 Sep 2025" },
  { id: 5, email: "malvarez@navy.mil", tenants: "PMS 495", roles: "BFM/ASW", assignedOn: "5 Nov 2025" },
  { id: 6, email: "cellis@navy.mil", tenants: "PMS 420 + 1", roles: "SA/System + 2", assignedOn: "16 Nov 2025" },
  { id: 7, email: "avery.w.chen@navy.mil", tenants: "PMS 420", roles: "BFM/RDT&E", assignedOn: "23 Nov 2025" },
  { id: 8, email: "carter@navy.mil", tenants: "PMS 495", roles: "FA/APN", assignedOn: "29 Nov 2025" },
  { id: 9, email: "sydney.k.patel@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/NSWCPCD", assignedOn: "2 Dec 2025" },
  { id: 10, email: "rdonovan@navy.mil", tenants: "PMS 420 + 2", roles: "BFM/RDT&E + 3", assignedOn: "8 Dec 2025" },
];

// Pending assignments > 30 days old (31-90 days)
const assignedOver30Days = [
  { id: 11, email: "alex.johnson@navy.mil", tenants: "PMS 420", roles: "BFM/ASW", assignedOn: "15 Oct 2025" },
  { id: 12, email: "taylor.martinez@navy.mil", tenants: "PMS 495", roles: "SA/System", assignedOn: "22 Oct 2025" },
  { id: 13, email: "morgan.l.williams@navy.mil", tenants: "PMS 501", roles: "TA/PMS501", assignedOn: "28 Oct 2025" },
  { id: 14, email: "chris.davis@navy.mil", tenants: "PMS 420 + 1", roles: "BFM/RDT&E + 1", assignedOn: "05 Nov 2025" },
  { id: 15, email: "jamie.r.garcia@navy.mil", tenants: "PMS 495", roles: "FA/APN", assignedOn: "12 Nov 2025" },
  { id: 16, email: "riley.thompson@navy.mil", tenants: "PMS 420", roles: "BFM/NSWCPCD", assignedOn: "18 Nov 2025" },
  { id: 17, email: "avery.miller@navy.mil", tenants: "PMS 501", roles: "BFM/All", assignedOn: "25 Nov 2025" },
  { id: 18, email: "quinn.anderson@navy.mil", tenants: "PMS 420 + 1", roles: "SA/System + 1", assignedOn: "01 Dec 2025" },
  { id: 19, email: "drew.b.jackson@navy.mil", tenants: "PMS 495", roles: "BFM/ASW", assignedOn: "08 Dec 2025" },
  { id: 20, email: "reese.m.white@navy.mil", tenants: "PMS 420", roles: "TA/PMS420", assignedOn: "15 Dec 2025" },
];

// Pending assignments > 60 days old (61-180 days)
const assignedOver60Days = [
  { id: 21, email: "sage.harris@navy.mil", tenants: "PMS 420", roles: "BFM/RDT&E", assignedOn: "15 Sep 2025" },
  { id: 22, email: "blake.m.clark@navy.mil", tenants: "PMS 495", roles: "SA/System", assignedOn: "22 Sep 2025" },
  { id: 23, email: "dakota.lewis@navy.mil", tenants: "PMS 501", roles: "BFM/All", assignedOn: "01 Oct 2025" },
  { id: 24, email: "emerson.robinson@navy.mil", tenants: "PMS 420 + 1", roles: "FA/APN + 1", assignedOn: "08 Oct 2025" },
  { id: 25, email: "finley.r.walker@navy.mil", tenants: "PMS 495", roles: "BFM/ASW", assignedOn: "15 Oct 2025" },
  { id: 26, email: "harper.hall@navy.mil", tenants: "PMS 420", roles: "TA/PMS420", assignedOn: "22 Oct 2025" },
  { id: 27, email: "hayden.allen@navy.mil", tenants: "PMS 501", roles: "BFM/NSWCPCD", assignedOn: "29 Oct 2025" },
  { id: 28, email: "justice.young@navy.mil", tenants: "PMS 420 + 1", roles: "SA/System + 2", assignedOn: "05 Nov 2025" },
  { id: 29, email: "kennedy.king@navy.mil", tenants: "PMS 495", roles: "BFM/RDT&E", assignedOn: "12 Nov 2025" },
  { id: 30, email: "lennox.wright@navy.mil", tenants: "PMS 420", roles: "BFM/All", assignedOn: "20 Nov 2025" },
];

type QuickFilterType = 'all' | '30days' | '60days';

function getFilteredAssignments(filter: QuickFilterType) {
  switch (filter) {
    case 'all':
      return allPendingAssignments;
    case '30days':
      return assignedOver30Days;
    case '60days':
      return assignedOver60Days;
    default:
      return allPendingAssignments;
  }
}

// Helper function to generate additional pending role assignments to reach 10 results
function generateMatchingAssignments(
  existing: any[],
  count: number,
  filters: {
    quickFilterType: QuickFilterType;
    searchQuery: string;
    selectedTenant?: string | null;
    selectedRole?: string | null;
  }
): any[] {
  // Expanded name pools with varied characters to support substring matching
  const firstNames = [
    "Jordan", "Casey", "Alex", "Taylor", "Morgan", "Chris", "Jamie", "Riley", "Avery", "Quinn",
    "Drew", "Reese", "Sage", "Blake", "Dakota", "Emerson", "Finley", "Harper", "Hayden", "Justice",
    "Kennedy", "Lennox", "Gray", "Grayson", "Maddox", "Parker", "Reagan", "Rowan", "Sawyer", "Skylar",
    "Cameron", "Charlie", "Dylan", "Elliot", "Frances", "Gabriel", "Hunter", "Jesse", "Jordan", "Logan",
    "Mason", "Noel", "Oakley", "Peyton", "River", "Sam", "Tatum", "Val", "Wesley", "Zion",
    "Angela", "Benjamin", "Carmen", "Daniel", "Elena", "Felix", "Grace", "Hugo", "Isabel", "Julian",
    "Katherine", "Lucas", "Maria", "Nathan", "Olivia", "Patrick", "Quinn", "Rachel", "Samuel", "Teresa"
  ];
  
  const lastNames = [
    "Anderson", "Bennett", "Carter", "Davis", "Edwards", "Foster", "Garcia", "Harris", "Jackson", "Kim",
    "Lee", "Miller", "Nelson", "Olson", "Parker", "Quinn", "Robinson", "Smith", "Taylor", "Wilson",
    "Allen", "Baker", "Clark", "Diaz", "Evans", "Fisher", "Green", "Hall", "Irving", "Jones",
    "King", "Lopez", "Martinez", "Nguyen", "O'Brien", "Patel", "Reed", "Scott", "Turner", "Underwood",
    "Valdez", "Walker", "Wright", "Young", "Zhang", "Adams", "Brown", "Collins", "Duncan", "Ellis",
    "Ford", "Graham", "Hayes", "Ingram", "Johnson", "Kelly", "Lewis", "Moore", "Nash", "Owens",
    "Perry", "Ramsey", "Sullivan", "Thompson", "Vaughn", "Watson", "Yates", "Zimmerman", "Matthews", "Matson"
  ];
  
  const middleInitials = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "W"];
  
  const tenants = ["PMS 420", "PMS 495", "PMS 501", "NAVSUP", "NAWC WD", "NIWC PAC", "NSWC Carderock"];
  const roles = ["SA/System", "BFM/ASW", "BFM/All", "FA/APN", "TA/PMS420", "BFM/RDT&E", "BFM/NSWCPCD"];
  
  // Date ranges based on quick filter type
  const dateRanges: Record<QuickFilterType, string[]> = {
    'all': ["15 Sep 2025", "17 Oct 2025", "5 Nov 2025", "23 Nov 2025", "2 Dec 2025", "8 Dec 2025"],
    '30days': ["15 Oct 2025", "22 Oct 2025", "28 Oct 2025", "05 Nov 2025", "12 Nov 2025", "18 Nov 2025"],
    '60days': ["15 Sep 2025", "22 Sep 2025", "01 Oct 2025", "08 Oct 2025", "15 Oct 2025", "22 Oct 2025"]
  };
  
  const generated = [];
  const startId = 2000 + Math.floor(Math.random() * 1000);
  const searchLower = filters.searchQuery.toLowerCase().trim();
  
  // Helper to check if email contains search query
  const emailContainsQuery = (email: string, query: string): boolean => {
    if (query === '') return true;
    return email.toLowerCase().includes(query);
  };
  
  // Helper to generate realistic email formats
  const generateRealisticEmail = (first: string, last: string, middle?: string): string => {
    const formats = [
      `${first.toLowerCase()}.${last.toLowerCase()}`,
      `${first.toLowerCase()}.${middle}.${last.toLowerCase()}`,
      `${first.charAt(0).toLowerCase()}.${last.toLowerCase()}`,
      `${first.toLowerCase()}${last.toLowerCase()}`,
      `${first.charAt(0).toLowerCase()}${last.toLowerCase()}`
    ];
    
    // Pick a random format
    const format = formats[Math.floor(Math.random() * formats.length)];
    return `${format}@navy.mil`;
  };
  
  let attempts = 0;
  const maxAttempts = count * 50; // Prevent infinite loops
  
  while (generated.length < count && attempts < maxAttempts) {
    attempts++;
    
    // Pick random names
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const middleInitial = middleInitials[Math.floor(Math.random() * middleInitials.length)];
    
    // Generate a realistic email
    const email = generateRealisticEmail(firstName, lastName, middleInitial.toLowerCase());
    
    // Check if this email matches the search query
    if (emailContainsQuery(email, searchLower)) {
      // Avoid duplicates
      const isDuplicate = generated.some(g => g.email === email) || 
                          existing.some(e => e.email === email);
      
      if (!isDuplicate) {
        // Select tenant - if tenant filter is active, use it; otherwise random
        const tenant = filters.selectedTenant || tenants[Math.floor(Math.random() * tenants.length)];
        const role = filters.selectedRole || roles[Math.floor(Math.random() * roles.length)];
        const dates = dateRanges[filters.quickFilterType];
        const assignedOn = dates[Math.floor(Math.random() * dates.length)];
        
        generated.push({
          id: startId + generated.length,
          email,
          tenants: tenant,
          roles: role,
          assignedOn
        });
      }
    }
  }
  
  // If we couldn't generate enough matches (very restrictive search), 
  // the caller should handle showing fewer results
  return generated;
}

export default function PendingRoleAssignmentsContent() {
  return (
    <div className="bg-[#f9f9fb] flex-1 relative w-full" data-name="content-area">
      <div className="w-full">
        <div className="flex flex-col items-start p-[24px] w-full bg-[rgb(255,255,255)]">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <PageHeader />
            <TableSection />
          </div>
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

function ButtonRow() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="button-row">
      <Link to="/add-role-assignment" className="bg-[#004b72] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors" data-name="pe-button">
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white">
          <p className="css-ew64yg leading-[20px]">Add Role Assignment</p>
        </div>
      </Link>
      <Link to="/user-management" className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" data-name="pe-button">
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px]">
          <p className="css-ew64yg leading-[20px]">View All Users</p>
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
        <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
        <HeaderAndSubtitle />
        <SyncPointBreadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Admin Console', path: '/admin-console' },
          { label: 'User Management', path: '/user-management' },
          { label: 'Pending Role Assignments' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        Pending Role Assignments
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Review and resolve pending role assignments within your administrative scope.
      </p>
    </div>
  );
}

function TableSection() {
  const [activeFilter, setActiveFilter] = useState<QuickFilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleClearFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setSelectedTenant(null);
    setSelectedRole(null);
  };

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="table-section">
      <FiltersRow 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        onClearFilters={handleClearFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTenant={selectedTenant}
        setSelectedTenant={setSelectedTenant}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <DataTable activeFilter={activeFilter} searchQuery={searchQuery} selectedTenant={selectedTenant} selectedRole={selectedRole} />
      <Pagination />
    </div>
  );
}

function FiltersRow({ activeFilter, setActiveFilter, onClearFilters, searchQuery, setSearchQuery, selectedTenant, setSelectedTenant, selectedRole, setSelectedRole }: { 
  activeFilter: string; 
  setActiveFilter: (filter: QuickFilterType) => void; 
  onClearFilters: () => void; 
  searchQuery: string; 
  setSearchQuery: (query: string) => void;
  selectedTenant: string | null;
  setSelectedTenant: (tenant: string | null) => void;
  selectedRole: string | null;
  setSelectedRole: (role: string | null) => void;
}) {
  return (
    <div className="bg-[#f9f9fb] content-stretch flex flex-col gap-[16px] items-start p-[12px] relative rounded-[5px] shrink-0 w-full" data-name="filters-container">
      {/* Row 1 - Quick Filters */}
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="quick-filters-bar">
        <QuickFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>
      
      {/* Row 2 - Structured Filters with Clear Filters inline */}
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="filter-dropdown-bar">
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
          {/* Search field */}
          <div className="content-stretch flex gap-[24px] h-[32px] items-center justify-center relative shrink-0 w-[250px]">
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          {/* Tenants and Roles dropdowns */}
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="bfm-management-filters">
            <TenantsDropdown selectedTenant={selectedTenant} setSelectedTenant={setSelectedTenant} />
            <RolesDropdown selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
          </div>
          
          {/* Clear Filters button - ghost style */}
          <button 
            onClick={onClearFilters}
            className="cursor-pointer hover:underline transition-all text-[#1c2024] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] h-[32px] flex items-center"
            data-name="clear-filters-button"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickFilters({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: QuickFilterType) => void }) {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="quick-filters">
      <div 
        className={`content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 cursor-pointer transition-colors ${
          activeFilter === "all" 
            ? "bg-[rgba(20,125,185,0.09)] hover:bg-[rgba(20,125,185,0.09)]" 
            : "bg-white hover:bg-[#f5f5f5]"
        }`}
        onClick={() => setActiveFilter("all")}
        data-name={activeFilter === "all" ? "filter-pill" : "summary-pill"}
      >
        <div 
          aria-hidden="true" 
          className={`absolute border ${
            activeFilter === "all" ? "border-2 border-[#004b72]" : "border border-[#e0e1e6]"
          } border-solid inset-0 pointer-events-none rounded-[100px]`} 
        />
        <p className={`css-ew64yg font-['Inter:${activeFilter === "all" ? "Medium" : "Regular"}',sans-serif] ${
          activeFilter === "all" ? "font-medium" : "font-normal"
        } leading-[20px] text-[#1c2024] text-[14px]`}>
          All Pending Role Assignments (120)
        </p>
      </div>
      
      <div 
        className={`content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 cursor-pointer transition-colors ${
          activeFilter === "30days" 
            ? "bg-[rgba(20,125,185,0.09)] hover:bg-[rgba(20,125,185,0.09)]" 
            : "bg-white hover:bg-[#f5f5f5]"
        }`}
        onClick={() => setActiveFilter("30days")}
        data-name={activeFilter === "30days" ? "filter-pill" : "summary-pill"}
      >
        <div 
          aria-hidden="true" 
          className={`absolute border ${
            activeFilter === "30days" ? "border-2 border-[#004b72]" : "border border-[#e0e1e6]"
          } border-solid inset-0 pointer-events-none rounded-[100px]`} 
        />
        <p className={`css-ew64yg font-['Inter:${activeFilter === "30days" ? "Medium" : "Regular"}',sans-serif] ${
          activeFilter === "30days" ? "font-medium" : "font-normal"
        } leading-[20px] text-[#1c2024] text-[14px]`}>
          Assigned On &gt; 30 Days (70)
        </p>
      </div>
      
      <div 
        className={`content-stretch flex h-[28px] items-center px-[10px] relative rounded-[100px] shrink-0 cursor-pointer transition-colors ${
          activeFilter === "60days" 
            ? "bg-[rgba(20,125,185,0.09)] hover:bg-[rgba(20,125,185,0.09)]" 
            : "bg-white hover:bg-[#f5f5f5]"
        }`}
        onClick={() => setActiveFilter("60days")}
        data-name={activeFilter === "60days" ? "filter-pill" : "summary-pill"}
      >
        <div 
          aria-hidden="true" 
          className={`absolute border ${
            activeFilter === "60days" ? "border-2 border-[#004b72]" : "border border-[#e0e1e6]"
          } border-solid inset-0 pointer-events-none rounded-[100px]`} 
        />
        <p className={`css-ew64yg font-['Inter:${activeFilter === "60days" ? "Medium" : "Regular"}',sans-serif] ${
          activeFilter === "60days" ? "font-medium" : "font-normal"
        } leading-[20px] text-[#1c2024] text-[14px]`}>
          Assigned On &gt; 60 Days (50)
        </p>
      </div>
    </div>
  );
}

function SearchInput({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) {
  return (
    <div className="content-stretch flex flex-col flex-[1_0_0] items-start relative shrink-0" data-name="search-input">
      <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="content-container">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center px-[4px] relative size-full">
            <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0" data-name="icon-container">
              <PeSearch />
            </div>
            <input
              type="text"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic text-[#1c2024] text-[14px] outline-none bg-transparent px-[4px]"
            />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function PeSearch() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="pe-search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="pe-search">
          <path d="M6.125 10.5C8.47054 10.5 10.375 8.59554 10.375 6.25C10.375 3.90446 8.47054 2 6.125 2C3.77946 2 1.875 3.90446 1.875 6.25C1.875 8.59554 3.77946 10.5 6.125 10.5Z" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.25 12.375L9.15625 9.28125" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d="M4 6L8 10L12 6" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function TenantsDropdown({ selectedTenant, setSelectedTenant }: { selectedTenant: string | null; setSelectedTenant: (tenant: string | null) => void }) {
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
        className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[107px] cursor-pointer" 
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
            {tenants.map((tenant) => (
              <div
                key={tenant}
                className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedTenant(tenant);
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

function RolesDropdown({ selectedRole, setSelectedRole }: { selectedRole: string | null; setSelectedRole: (role: string | null) => void }) {
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
        className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[125px] cursor-pointer" 
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
            {roles.map((role) => (
              <div
                key={role}
                className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedRole(role);
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

function DataTable({ activeFilter, searchQuery, selectedTenant, selectedRole }: { activeFilter: QuickFilterType; searchQuery: string; selectedTenant: string | null; selectedRole: string | null }) {
  // OUTER TABLE GRID CONTRACT - shared by header and all body rows
  // Chevron | Email | Tenants | Roles | Assigned On | Kebab
  const OUTER_GRID = "48px minmax(260px,3fr) minmax(180px,2fr) minmax(160px,2fr) 140px 64px";

  // Helper to detect nonsensical search queries
  const isNonsensicalQuery = (query: string): boolean => {
    if (query.trim() === '') return false;
    
    // Check for truly nonsensical patterns:
    // - Long random strings (6+ chars with no vowels or common patterns)
    // - Heavy use of numbers/symbols mixed with letters
    // - Repeating random characters
    
    const hasNumbers = /\d/.test(query);
    const hasSymbols = /[^a-zA-Z0-9@.\s]/.test(query);
    const isVeryLong = query.length > 8;
    const hasVowels = /[aeiou]/i.test(query);
    
    // If it has numbers/symbols AND is long without vowels, likely nonsensical
    if ((hasNumbers || hasSymbols) && isVeryLong && !hasVowels) {
      return true;
    }
    
    // Check for long strings with very low vowel density (random keysmashing)
    if (query.length >= 6) {
      const vowelCount = (query.match(/[aeiou]/gi) || []).length;
      const vowelRatio = vowelCount / query.length;
      if (vowelRatio < 0.15) { // Less than 15% vowels in a 6+ char string
        return true;
      }
    }
    
    return false;
  };

  // Stage 1: Get filtered dataset based on active quick filter
  const filteredByQuickFilter = getFilteredAssignments(activeFilter);

  // Stage 2: Apply search filter (email only)
  let filteredBySearch = searchQuery.trim() === ''
    ? filteredByQuickFilter
    : filteredByQuickFilter.filter(assignment => {
        const query = searchQuery.toLowerCase();
        const emailMatch = assignment.email.toLowerCase().includes(query);
        return emailMatch;
      });

  // Stage 3: Apply tenant filter (if selected)
  // Check if tenants cell includes the selected tenant (e.g., "PMS 420 + 1" matches "PMS 420")
  let filteredByTenant = selectedTenant
    ? filteredBySearch.filter(assignment => {
        return assignment.tenants.includes(selectedTenant);
      })
    : filteredBySearch;

  // Stage 4: Apply role filter (if selected)
  let filteredByRole = selectedRole
    ? filteredByTenant.filter(assignment => {
        return assignment.roles.includes(selectedRole);
      })
    : filteredByTenant;

  // Stage 5: Normalize to 10 results
  let assignments = filteredByRole;

  // Check if we should generate more results
  const hasSearchQuery = searchQuery.trim() !== '';
  const shouldGenerate = assignments.length < 10 && 
                         hasSearchQuery && 
                         !isNonsensicalQuery(searchQuery);

  if (shouldGenerate) {
    // Generate additional assignments to reach 10
    const needed = 10 - assignments.length;
    const additional = generateMatchingAssignments(assignments, needed, {
      quickFilterType: activeFilter,
      searchQuery: searchQuery,
      selectedTenant: selectedTenant,
      selectedRole: selectedRole
    });
    
    // Only add if we successfully generated matches
    if (additional.length > 0) {
      assignments = [...assignments, ...additional];
    }
  } else if (!hasSearchQuery && assignments.length < 10) {
    // No search query but fewer than 10 natural results - pad to 10
    const needed = 10 - assignments.length;
    const additional = generateMatchingAssignments(assignments, needed, {
      quickFilterType: activeFilter,
      searchQuery: '',
      selectedTenant: selectedTenant,
      selectedRole: selectedRole
    });
    assignments = [...assignments, ...additional];
  } else if (assignments.length > 10) {
    // If we have more than 10, slice to exactly 10
    assignments = assignments.slice(0, 10);
  }

  return (
    <div className="bg-white content-stretch flex flex-col items-stretch relative shrink-0 w-full min-w-0 rounded-[4px]" data-name="table">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      
      {/* Header Row */}
      <div 
        className="bg-[#f9f9fb] border-b border-[#e0e1e6] w-full"
        style={{ display: 'grid', gridTemplateColumns: OUTER_GRID }}
        data-name="table-header"
      >
        {/* Chevron column - EXPLICIT PLACEHOLDER */}
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0"></div>
        
        {/* Email column */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate">Email</p>
        </div>
        
        {/* Tenants column */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate">Tenants</p>
        </div>
        
        {/* Roles column */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate">Roles</p>
        </div>
        
        {/* Assigned On column with sort indicator */}
        <div className="px-[12px] py-[12px] flex items-center gap-[4px] min-w-0">
          <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px] truncate">Assigned On</p>
          <div className="relative shrink-0 size-[16px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g>
                <path d="M8 3L8 13M8 3L5 6M8 3L11 6" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>
        
        {/* Actions/Kebab column - EXPLICIT PLACEHOLDER */}
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0"></div>
      </div>
      
      {/* Body Rows */}
      {assignments.map((assignment) => (
        <TableRow 
          key={assignment.id}
          assignment={assignment}
          gridTemplateColumns={OUTER_GRID}
        />
      ))}
    </div>
  );
}

function TableRow({ assignment, gridTemplateColumns }: { 
  assignment: typeof allPendingAssignments[0]; 
  gridTemplateColumns: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasExpandedDetails = assignment.expandedDetails && assignment.expandedDetails.length > 0;

  // Apply expanded state styling when row is expanded (matching User Management pattern)
  const rowBgClass = isExpanded ? "bg-[rgba(0,75,114,0.04)]" : "hover:bg-[#fafafa]";
  const borderClass = isExpanded ? "border-b-0" : "border-b border-[#e0e1e6]";

  return (
    <>
      <div 
        className={`w-full ${borderClass} ${rowBgClass} transition-colors`}
        data-name="table-row"
        style={{ display: 'grid', gridTemplateColumns }}
      >
        {/* Chevron column - clickable if has expanded details */}
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
          {hasExpandedDetails ? (
            <div 
              className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <svg 
                className="block size-full transition-transform" 
                fill="none" 
                preserveAspectRatio="none" 
                viewBox="0 0 16 16"
                style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <g>
                  <path d="M6 4L10 8L6 12" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          ) : (
            <div className="relative shrink-0 size-[16px] opacity-40">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g>
                  <path d="M6 4L10 8L6 12" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          )}
        </div>
        
        {/* Email column */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">{assignment.email}</p>
        </div>
        
        {/* Tenants column */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">{assignment.tenants}</p>
        </div>
        
        {/* Roles column */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">{assignment.roles}</p>
        </div>
        
        {/* Assigned On column */}
        <div className="px-[12px] py-[12px] flex items-center min-w-0">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] truncate">{assignment.assignedOn}</p>
        </div>
        
        {/* Actions/Kebab column - Empty placeholder */}
        <div className="px-[12px] py-[12px] flex items-center justify-center min-w-0">
        </div>
      </div>
      
      {/* Expanded Details */}
      {isExpanded && hasExpandedDetails && (
        <div 
          className="bg-[rgba(0,75,114,0.04)] border-b border-[#e0e1e6] w-full"
          style={{ display: 'grid', gridTemplateColumns: '1fr' }}
        >
          <div className="p-[24px] border-l-[3px] border-l-[#004b72] bg-[rgba(20,125,185,0.09)]">
            {assignment.expandedDetails!.map((tenantDetail, index) => (
              <TenantDetailSection 
                key={index} 
                tenantDetail={tenantDetail} 
                isLast={index === assignment.expandedDetails!.length - 1}
                parentEmail={assignment.email}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function TenantDetailSection({ tenantDetail, isLast, parentEmail }: { 
  tenantDetail: { tenant: string, roles: { role: string, assignedOn: string }[] }; 
  isLast: boolean;
  parentEmail: string;
}) {
  return (
    <div className={`w-full ${!isLast ? 'mb-[16px]' : ''}`}>
      {/* Tenant Header */}
      <div className="bg-[#f0f0f3] w-full border border-[rgba(0,8,48,0.27)] rounded-t-[5px]">
        <div className="flex items-center justify-between px-[12px] py-[12px]">
          <div className="flex items-center gap-[8px]">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
              Tenant: {tenantDetail.tenant}
            </p>
          </div>
          <div className="flex items-center gap-[8px]">
            {/* Chevron icon */}
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g>
                  <path d="M4 6L8 10L12 6" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nested Table */}
      <div className="w-full border border-t-0 border-[rgba(0,8,48,0.27)] rounded-b-[5px]">
        {/* Table Header */}
        <div className="bg-[#f9f9fb] w-full border-b border-[rgba(0,0,47,0.15)] grid grid-cols-[48px_1fr_1fr_1fr_64px]">
          {/* Empty column for spacing */}
          <div className="px-[12px] py-[12px]"></div>
          
          {/* Roles column */}
          <div className="px-[12px] py-[12px] flex items-center border-r-2 border-[#d9d9d9]">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Roles</p>
          </div>
          
          {/* Assigned On column */}
          <div className="px-[12px] py-[12px] flex items-center border-r-2 border-[#d9d9d9]">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Assigned On</p>
          </div>
          
          {/* Actions column */}
          <div className="px-[12px] py-[12px] flex items-center">
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">Actions</p>
          </div>
          
          {/* Kebab column - EXPLICIT PLACEHOLDER */}
          <div className="px-[12px] py-[12px] flex items-center justify-center"></div>
        </div>
        
        {/* Table Rows */}
        {tenantDetail.roles.map((roleDetail, index) => (
          <div 
            key={index} 
            className={`bg-white w-full grid grid-cols-[48px_1fr_1fr_1fr_64px] ${index !== tenantDetail.roles.length - 1 ? 'border-b border-[rgba(0,0,47,0.15)]' : ''}`}
          >
            {/* Empty column for spacing */}
            <div className="px-[12px] py-[12px]"></div>
            
            {/* Role */}
            <div className="px-[12px] py-[12px] flex items-center">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{roleDetail.role}</p>
            </div>
            
            {/* Assigned On */}
            <div className="px-[12px] py-[12px] flex items-center">
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">{roleDetail.assignedOn}</p>
            </div>
            
            {/* Actions */}
            <div className="px-[12px] py-[12px] flex items-center gap-[8px]">
              <Link 
                to={`/edit-role-assignment?${new URLSearchParams({
                  email: parentEmail,
                  name: '',
                  tenant: tenantDetail.tenant,
                  role: roleDetail.role.split('/')[0] || 'BFM',
                  focusArea: roleDetail.role.split('/')[1] || 'All',
                  status: 'Requested',
                  returnTo: '/pending-role-assignments'
                }).toString()}`}
                className="bg-white content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
              >
                <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#004b72] text-[12px]">Edit</p>
              </Link>
              <button className="bg-white content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#1c2024] text-[12px]">Remove</p>
              </button>
            </div>
            
            {/* Kebab menu - separate column */}
            <div className="px-[12px] py-[12px] flex items-center justify-center">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pagination() {
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = 956;
  
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full py-[12px]">
      <div className="flex items-center gap-[12px]">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">Page Size:</p>
        <select 
          className="bg-white border border-[#e0e1e6] rounded-[4px] px-[8px] py-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] cursor-pointer"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
      </div>
      <div className="flex items-center gap-[12px]">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#60646c] text-[14px]">
          1 to {pageSize} of {totalRecords}
        </p>
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