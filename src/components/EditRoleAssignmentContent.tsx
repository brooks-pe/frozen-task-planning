import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from "./VersionDropdown";

export default function EditRoleAssignmentContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get data from URL params with safe defaults
  const userEmail = searchParams.get('email') || '';
  const userName = searchParams.get('name') || '';
  const tenant = searchParams.get('tenant') || 'PMS 420';
  const role = searchParams.get('role') || 'BFM';
  const focusArea = searchParams.get('focusArea') || 'OMN';
  const status = searchParams.get('status') || 'Requested';
  
  // Store initial values to detect changes
  const initialValues = {
    tenant: tenant,
    role: role,
    focusArea: focusArea,
    notes: ''
  };
  
  const [formData, setFormData] = useState({
    email: userEmail,
    name: userName,
    status: status,
    tenant: tenant,
    role: role,
    focusArea: focusArea,
    notes: ''
  });

  // Check if any editable field has changed
  const hasChanges = 
    formData.tenant !== initialValues.tenant ||
    formData.role !== initialValues.role ||
    formData.focusArea !== initialValues.focusArea ||
    formData.notes !== initialValues.notes;

  const handleCancel = () => {
    // Priority 1: Check if we have a returnTo parameter
    const returnTo = searchParams.get('returnTo');
    if (returnTo) {
      navigate(returnTo);
      return;
    }
    
    // Priority 2: Use browser history if available
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    
    // Priority 3: Fallback to User Management
    navigate('/user-management');
  };

  const handleSaveChanges = () => {
    if (!hasChanges) return;
    
    console.log('Saving changes:', formData);
    // In a real app, would save to backend here
    navigate('/user-management');
  };

  return (
    <div className="bg-white flex-1 relative w-full flex justify-center" data-name="content-area">
      <div className="w-full max-w-[1280px]">
        <div className="flex flex-col items-start p-[24px] w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <PageHeader />
            <FormSection 
              formData={formData}
              setFormData={setFormData}
              onCancel={handleCancel}
              onSave={handleSaveChanges}
              hasChanges={hasChanges}
            />
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
  const navigate = useNavigate();
  
  return (
    <div className="content-stretch flex items-start justify-between overflow-clip py-[12px] relative shrink-0 w-full" data-name="pe-version-bar">
      <VersionDropdown />
      <ButtonRow />
    </div>
  );
}

function ButtonRow() {
  const navigate = useNavigate();
  
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="button-row">
      <div 
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
        onClick={() => navigate('/user-management')}
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px]">
          <p className="css-ew64yg leading-[20px]">View All Users</p>
        </div>
      </div>
      <div 
        className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
        data-name="pe-button"
        onClick={() => navigate('/pending-role-assignments')}
      >
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px]">
          <p className="css-ew64yg leading-[20px]">View Pending Role Assignments</p>
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
          { label: 'Edit Role Assignment' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        Edit Role Assignment
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Edit a role assignment.
      </p>
    </div>
  );
}

function FormSection({ formData, setFormData, onCancel, onSave, hasChanges }: any) {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full max-w-[800px]">
      {/* Email Address */}
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <label className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          disabled
          className="bg-[#f9f9fb] border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#60646c] w-full cursor-not-allowed"
        />
      </div>

      {/* Name and Status Row */}
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
          <label className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            disabled
            className="bg-[#f9f9fb] border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#60646c] w-full cursor-not-allowed"
          />
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
          <label className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
            Role Status
          </label>
          <input
            type="text"
            value={formData.status}
            disabled
            className="bg-[#f9f9fb] border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[#60646c] w-full cursor-not-allowed"
          />
        </div>
      </div>

      {/* Tenant, Role, and Focus Area Row */}
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
          <label className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
            Tenant
          </label>
          <select
            value={formData.tenant}
            onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
            className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72] appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231C2024' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '40px'
            }}
          >
            <option value="PMS 420">PMS 420</option>
            <option value="PMS 406">PMS 406</option>
            <option value="PMS 495">PMS 495</option>
          </select>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
          <label className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72] appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231C2024' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '40px'
            }}
          >
            <option value="BFM">BFM</option>
            <option value="APM">APM</option>
            <option value="SA">SA</option>
            <option value="TA">TA</option>
            <option value="FA">FA</option>
          </select>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1">
          <label className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
            Focus Area
          </label>
          <select
            value={formData.focusArea}
            onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
            className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full focus:outline-none focus:border-[#004b72] appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231C2024' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '40px'
            }}
          >
            <option value="OMN">OMN</option>
            <option value="APN">APN</option>
            <option value="RDT&E">RDT&E</option>
            <option value="ASW">ASW</option>
            <option value="All">All</option>
            <option value="System">System</option>
            <option value="PMS420">PMS420</option>
            <option value="NSWCPCD">NSWCPCD</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <label className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#1c2024] text-[14px]">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Enter an optional description..."
          className="bg-white border border-[#e0e1e6] rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1c2024] w-full min-h-[100px] focus:outline-none focus:border-[#004b72] resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
        <div
          className={`content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 transition-colors ${
            hasChanges 
              ? 'bg-[#004b72] cursor-pointer hover:bg-[#003d5c]' 
              : 'bg-[#a0a0a0] cursor-not-allowed'
          }`}
          onClick={onSave}
        >
          <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[14px]">Save Changes</p>
        </div>
        <div
          className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          onClick={onCancel}
        >
          <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">Cancel</p>
        </div>
      </div>
    </div>
  );
}