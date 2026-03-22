import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router";
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import subTableIconPaths from "../imports/svg-16d18xu8m2";
import VersionDropdown from "./VersionDropdown";

// Mock user data - this would come from a database in a real app
const mockUserData: Record<string, any> = {
  "1": {
    id: 1,
    firstName: "Jordan",
    middleName: "C",
    lastName: "Matthews",
    email: "jordan.c.matthews@navy.mil",
    phone: "(555) 867-5309",
    pocFirstName: "Thomas",
    pocLastName: "Heath",
    pocEmail: "thomas.a.heath@navy.mil",
    pocPhone: "(555) 903-5765",
    approvedRoles: [
      { tenant: "PMS 420", role: "BFM", focusArea: "RDT&E", source: "Admin", requestedOn: "01 April 2025" },
      { tenant: "PMS 420", role: "BFM", focusArea: "OMN", source: "Request", requestedOn: "24 Nov 2025" },
      { tenant: "PMS 420", role: "FA", focusArea: "ASW", source: "Request", requestedOn: "27 Nov 2025" },
      { tenant: "PMS 495", role: "Tenant Admin", focusArea: "PMS 420", source: "Admin", requestedOn: "01 April 2025" },
      { tenant: "PMS 495", role: "PA", focusArea: "OMN", source: "Request", requestedOn: "24 Nov 2025" },
      { tenant: "PMS 495", role: "APM", focusArea: "ASW", source: "Request", requestedOn: "27 Nov 2025" },
    ],
    pendingRequests: [
      { tenant: "PMS 420", role: "Sharepoint Admin", focusArea: "", requestedOn: "01 April 2025" },
      { tenant: "PMS 420", role: "BFM", focusArea: "OMN", requestedOn: "24 Nov 2025" },
      { tenant: "PMS 420", role: "FA", focusArea: "ASW", requestedOn: "27 Nov 2025" },
    ]
  },
  "2": {
    id: 2,
    firstName: "Casey",
    middleName: "J",
    lastName: "Nguyen",
    email: "casey.j.nguyen@navy.mil",
    phone: "(555) 123-4567",
    pocFirstName: "Michael",
    pocLastName: "Smith",
    pocEmail: "michael.smith@navy.mil",
    pocPhone: "(555) 987-6543",
    approvedRoles: [
      { tenant: "PMS 495", role: "BFM", focusArea: "ASW", source: "Admin", requestedOn: "15 March 2025" },
    ],
    pendingRequests: []
  },
  "3": {
    id: 3,
    firstName: "Jenny",
    middleName: "M",
    lastName: "Thompson",
    email: "jenny.m.thompson@navy.mil",
    phone: "(555) 234-5678",
    pocFirstName: "Sarah",
    pocLastName: "Johnson",
    pocEmail: "sarah.johnson@navy.mil",
    pocPhone: "(555) 876-5432",
    approvedRoles: [
      { tenant: "PMS 420", role: "BFM", focusArea: "All", source: "Request", requestedOn: "10 Feb 2025" },
      { tenant: "PMS 495", role: "BFM", focusArea: "OMN", source: "Admin", requestedOn: "05 Jan 2025" },
    ],
    pendingRequests: [
      { tenant: "PMS 420", role: "SA", focusArea: "System", requestedOn: "20 March 2025" },
      { tenant: "PMS 495", role: "FA", focusArea: "APN", requestedOn: "22 March 2025" },
    ]
  }
};

export default function UserProfileContent() {
  const { userId } = useParams();
  const location = useLocation();
  const userData = userId ? mockUserData[userId] : null;
  
  // Check if we should start in edit mode for a specific section
  const editSection = location.state?.editSection;

  if (!userData) {
    return (
      <div className="bg-white flex-1 relative w-full p-[24px]">
        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#60646c]">User not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex-1 relative w-full flex justify-center" data-name="content-area">
      <div className="w-full max-w-[1280px]">
        <div className="flex flex-col items-start p-[24px] w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <PageHeader userData={userData} />
            <PersonalInformationSection userData={userData} startInEditMode={editSection === 'personal'} />
            <PointOfContactSection userData={userData} />
            <ApprovedRolesSection userData={userData} />
            <PendingRoleRequestsSection userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ userData }: any) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="page-header">
      <PeVersionBar />
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start py-[16px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
          <HeaderAndSubtitle userData={userData} />
          <SyncPointBreadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'Admin Console', path: '/admin-console' },
            { label: 'User Management', path: '/user-management' },
            { label: `${userData.firstName} ${userData.lastName}` },
          ]} />
        </div>
      </div>
    </div>
  );
}

function PeVersionBar() {
  const navigate = useNavigate();

  return (
    <div className="content-stretch flex items-start justify-between overflow-clip py-[12px] relative shrink-0 w-full" data-name="pe-version-bar">
      <VersionDropdown />
      <ButtonRow onViewAllUsers={() => navigate('/user-management')} />
    </div>
  );
}

function ButtonRow({ onViewAllUsers }: { onViewAllUsers: () => void }) {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="button-row">
      <div 
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
        onClick={onViewAllUsers}
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px]">
          <p className="css-ew64yg leading-[20px]">View All Users</p>
        </div>
      </div>
    </div>
  );
}

function HeaderAndSubtitle({ userData }: any) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        User Profile: {userData.firstName} {userData.lastName}
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Manage this user's profile, roles, and access.
      </p>
    </div>
  );
}

function PersonalInformationSection({ userData, startInEditMode = false }: any) {
  const [isEditing, setIsEditing] = useState(startInEditMode);
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    middleName: userData.middleName,
    lastName: userData.lastName,
    phone: userData.phone
  });

  // Track if any changes have been made
  const hasChanges = 
    formData.firstName !== userData.firstName ||
    formData.middleName !== userData.middleName ||
    formData.lastName !== userData.lastName ||
    formData.phone !== userData.phone;

  const handleSave = () => {
    if (!hasChanges) return;
    // Save logic would go here
    console.log('Saving personal information:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      phone: userData.phone
    });
    setIsEditing(false);
  };

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full border-t border-[#e0e1e6] pt-[24px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#1c2024] text-[16px] tracking-[-1px]">
          Personal Information
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
          Edit your personal information. Your email address cannot be changed.
        </p>
      </div>
      <div className="bg-white relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start py-[12px] relative w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            {/* First Row: First, Middle, Last Name */}
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
                <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                  />
                ) : (
                  <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      {formData.firstName}
                    </p>
                  </div>
                )}
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
                <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                  Middle Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                  />
                ) : (
                  <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      {formData.middleName}
                    </p>
                  </div>
                )}
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
                <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                  />
                ) : (
                  <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      {formData.lastName}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Email Address (always read-only) */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                Email Address
              </label>
              <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  {userData.email}
                </p>
              </div>
            </div>
            {/* Phone */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[300px]">
              <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                />
              ) : (
                <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                    {formData.phone}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Edit / Save / Cancel Buttons */}
          {isEditing ? (
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
              <div
                className={`content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 transition-colors ${
                  hasChanges 
                    ? 'bg-[#004b72] cursor-pointer hover:bg-[#003d5c]' 
                    : 'bg-[#a0a0a0] cursor-not-allowed'
                }`}
                onClick={handleSave}
              >
                <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[14px]">Save Changes</p>
              </div>
              <div
                className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                onClick={handleCancel}
              >
                <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Cancel</p>
              </div>
            </div>
          ) : (
            <div
              className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
              onClick={() => setIsEditing(true)}
            >
              <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#004b72] text-[14px]">Edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PointOfContactSection({ userData }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    pocFirstName: userData.pocFirstName,
    pocLastName: userData.pocLastName,
    pocEmail: userData.pocEmail,
    pocPhone: userData.pocPhone
  });

  // Check if POC is registered (for demo, Sarah Johnson is registered)
  const isPOCRegistered = userData.pocFirstName === "Sarah" && userData.pocLastName === "Johnson";

  // Track if any changes have been made
  const hasChanges = 
    formData.pocFirstName !== userData.pocFirstName ||
    formData.pocLastName !== userData.pocLastName ||
    formData.pocEmail !== userData.pocEmail ||
    formData.pocPhone !== userData.pocPhone;

  const handleSave = () => {
    if (!hasChanges || isPOCRegistered) return;
    // Save logic would go here
    console.log('Saving POC information:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      pocFirstName: userData.pocFirstName,
      pocLastName: userData.pocLastName,
      pocEmail: userData.pocEmail,
      pocPhone: userData.pocPhone
    });
    setIsEditing(false);
  };

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full border-t border-[#e0e1e6] pt-[24px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#1c2024] text-[16px] tracking-[-1px]">
          Point of Contact Information
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
          Edit your point of contact information. If your POC is registered, their information cannot be edited.
        </p>
      </div>
      <div className="bg-white relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start py-[12px] relative w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            {/* POC Name Row */}
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
                <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                  POC First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.pocFirstName}
                    onChange={(e) => setFormData({ ...formData, pocFirstName: e.target.value })}
                    className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                  />
                ) : (
                  <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      {formData.pocFirstName}
                    </p>
                  </div>
                )}
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
                <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                  POC Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.pocLastName}
                    onChange={(e) => setFormData({ ...formData, pocLastName: e.target.value })}
                    className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                  />
                ) : (
                  <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                    <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                      {formData.pocLastName}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* POC Email */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.pocEmail}
                  onChange={(e) => setFormData({ ...formData, pocEmail: e.target.value })}
                  className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                />
              ) : (
                <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                    {formData.pocEmail}
                  </p>
                </div>
              )}
            </div>
            {/* POC Phone */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[300px]">
              <label className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.pocPhone}
                  onChange={(e) => setFormData({ ...formData, pocPhone: e.target.value })}
                  className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72]"
                />
              ) : (
                <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                    {formData.pocPhone}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Edit / Save / Cancel Buttons */}
          {isEditing ? (
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
              <div
                className={`bg-[#004b72] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors ${
                  hasChanges && !isPOCRegistered ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onClick={handleSave}
              >
                <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[14px]">Save Changes</p>
              </div>
              <div
                className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                onClick={handleCancel}
              >
                <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Cancel</p>
              </div>
            </div>
          ) : (
            <div
              className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
              onClick={() => setIsEditing(true)}
            >
              <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#004b72] text-[14px]">Edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ApprovedRolesSection({ userData }: any) {
  // Group approved roles by tenant
  const rolesByTenant: Record<string, any[]> = {};
  userData.approvedRoles.forEach((role: any) => {
    if (!rolesByTenant[role.tenant]) {
      rolesByTenant[role.tenant] = [];
    }
    rolesByTenant[role.tenant].push(role);
  });

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full border-t border-[#e0e1e6] pt-[24px]">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#1c2024] text-[16px] tracking-[-1px]">
          Approved Roles
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
        {Object.entries(rolesByTenant).map(([tenant, roles]) => (
          <TenantRoleTable key={tenant} tenant={tenant} roles={roles} showActions={true} userData={userData} />
        ))}
      </div>
    </div>
  );
}

function PendingRoleRequestsSection({ userData }: any) {
  // Group pending requests by tenant
  const requestsByTenant: Record<string, any[]> = {};
  userData.pendingRequests.forEach((request: any) => {
    if (!requestsByTenant[request.tenant]) {
      requestsByTenant[request.tenant] = [];
    }
    requestsByTenant[request.tenant].push(request);
  });

  if (Object.keys(requestsByTenant).length === 0) {
    return null;
  }

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full border-t border-[#e0e1e6] pt-[24px]">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] text-[#1c2024] text-[16px] tracking-[-1px]">
          Pending Role Requests
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
        {Object.entries(requestsByTenant).map(([tenant, requests]) => (
          <TenantRoleTable key={tenant} tenant={tenant} roles={requests} showActions={false} isPending={true} />
        ))}
      </div>
    </div>
  );
}

function TenantRoleTable({ tenant, roles, showActions, isPending = false, userData }: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const handleEditRole = (role: any) => {
    // Navigate to Edit Role Assignment page with prepopulated data via URL params
    const params = new URLSearchParams({
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      tenant: tenant,
      role: role.role,
      focusArea: role.focusArea || '',
      status: 'Approved',
      returnTo: `/user-management/${userData.id}`
    });
    navigate(`/edit-role-assignment?${params.toString()}`);
  };

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full border border-[#e0e1e6] rounded-[6px] overflow-hidden">
      {/* Tenant Header Row */}
      <div
        className="bg-[#f9f9fb] content-stretch grid items-center px-[12px] py-[12px] relative shrink-0 w-full cursor-pointer hover:bg-[#f5f5f5] transition-colors"
        style={{
          gridTemplateColumns: '48px 1fr'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-center">
          <svg
            className={`size-[16px] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 16 16"
          >
            <path d="M6 12L10 8L6 4" stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[14px]">
          Tenant: {tenant}
        </p>
      </div>

      {/* Sub-table */}
      {isExpanded && (
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          {/* Sub-table Header */}
          <div
            className="bg-[#f9f9fb] content-stretch grid items-center px-[12px] py-[12px] relative shrink-0 w-full"
            style={{
              gridTemplateColumns: isPending 
                ? '48px 180px 200px 180px 140px' 
                : '48px 180px 200px 180px 180px 140px'
            }}
          >
            <div />
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[14px]">
              Role
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[14px]">
              Focus Areas
            </p>
            {!isPending && (
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[14px]">
                Source
              </p>
            )}
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[14px]">
              Requested On
            </p>
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[#1c2024] text-[14px]">
              Actions
            </p>
          </div>

          {/* Sub-table Rows */}
          {roles.map((role: any, index: number) => (
            <div
              key={index}
              className="bg-white content-stretch grid items-center px-[12px] py-[12px] relative shrink-0 w-full border-b border-[#e0e1e6]"
              style={{
                gridTemplateColumns: isPending 
                  ? '48px 180px 200px 180px 140px' 
                  : '48px 180px 200px 180px 180px 140px'
              }}
            >
              <div />
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                {role.role}
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                {role.focusArea || '—'}
              </p>
              {!isPending && (
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                  {role.source}
                </p>
              )}
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px]">
                {role.requestedOn}
              </p>
              <div className="flex gap-[8px] items-center">
                {isPending ? (
                  <>
                    <div className="bg-[#004b72] content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors">
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[12px]">
                        Approve
                      </p>
                    </div>
                    <div className="bg-white content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                      <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[12px]">
                        Reject
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div 
                      className="bg-white content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                      onClick={() => handleEditRole(role)}
                    >
                      <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#004b72] text-[12px]">
                        Edit
                      </p>
                    </div>
                    <div className="bg-white content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors">
                      <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[12px]">
                        Remove
                      </p>
                    </div>
                  </>
                )}
                <RoleActionMenu />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RoleActionMenu() {
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
        className="flex items-center justify-center size-[24px] cursor-pointer hover:bg-[#f5f5f5] rounded-[4px] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
          <path d={subTableIconPaths.p4b966d90} stroke="#1C2024" strokeLinecap="round" strokeLinejoin="round" />
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
          </div>
        </div>
      )}
    </div>
  );
}