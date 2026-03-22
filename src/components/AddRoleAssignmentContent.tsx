import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from "./VersionDropdown";

export default function AddRoleAssignmentContent() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [tenant, setTenant] = useState("");
  const [role, setRole] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ tenant: string; role: string; email: string } | null>(null);
  const [selectedVersion, setSelectedVersion] = useState("Current Record");

  // Mock data for dropdowns
  const tenantOptions = ["PMS 420", "PMS 495", "PMS 406", "NSWC PCD", "NSWC DD"];
  const roleOptions = ["SA/System Administrator", "TA/Technical Administrator", "BFM/Business Financial Manager", "APM/Assistant Program Manager", "DAPM/Deputy Assistant Program Manager", "FA/Financial Administrator"];
  const focusAreaOptions = ["All", "OMN", "APN", "RDT&E", "ASW", "NSWCPCD"];

  // Validate email domain
  const validateEmailDomain = (emailValue: string): boolean => {
    if (!emailValue) return true; // Don't show error for empty field
    const validDomains = ["@navy.mil", "@navy.us.mil", "@pioneeringevolution.com"];
    return validDomains.some(domain => emailValue.toLowerCase().endsWith(domain));
  };

  // Handle email blur event
  const handleEmailBlur = () => {
    if (email && !validateEmailDomain(email)) {
      setEmailError("Enter a valid navy.mil, navy.us.mil, or pioneeringevolution.com email address.");
    } else {
      setEmailError("");
    }
  };

  // Auto-populate name and status when email contains "@"
  const handleEmailChange = (value: string) => {
    setEmail(value);
    
    // Clear error if email becomes valid
    if (emailError && validateEmailDomain(value)) {
      setEmailError("");
    }
  };

  const handleReset = () => {
    setEmail("");
    setEmailError("");
    setName("");
    setStatus("");
    setTenant("");
    setRole("");
    setFocusArea("");
    setNotes("");
    setShowSuccessMessage(false);
    setIsSubmitting(false);
    setShowSuccessToast(false);
    setSubmittedData(null);
  };

  const handleSubmit = () => {
    // Save the data before starting submission
    const dataToSave = { tenant, role, email };
    setIsSubmitting(true);
    
    // Simulate 3-second submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(dataToSave);
      setShowSuccessToast(true);
      
      // Immediately reset the form
      setEmail("");
      setEmailError("");
      setName("");
      setStatus("");
      setTenant("");
      setRole("");
      setFocusArea("");
      setNotes("");
      
      // Hide toast after 6 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
        setSubmittedData(null);
      }, 6000);
    }, 3000);
  };

  return (
    <div className="bg-white flex-1 relative w-full" data-name="content-area">
      <div className="w-full">
        <div className="flex flex-col items-start p-[24px] w-full bg-[rgb(255,255,255)]">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <PageHeader />
            <FormSection
              email={email}
              emailError={emailError}
              name={name}
              status={status}
              tenant={tenant}
              role={role}
              focusArea={focusArea}
              notes={notes}
              onEmailChange={handleEmailChange}
              onEmailBlur={handleEmailBlur}
              onTenantChange={setTenant}
              onRoleChange={setRole}
              onFocusAreaChange={setFocusArea}
              onNotesChange={setNotes}
              onReset={handleReset}
              onSubmit={handleSubmit}
              showSuccessMessage={showSuccessMessage}
              tenantOptions={tenantOptions}
              roleOptions={roleOptions}
              focusAreaOptions={focusAreaOptions}
              isSubmitting={isSubmitting}
              showSuccessToast={showSuccessToast}
              submittedData={submittedData}
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
      <Link to="/user-management" className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" data-name="pe-button">
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px]">
          <p className="css-ew64yg leading-[20px]">View All Users</p>
        </div>
      </Link>
      <Link to="/pending-role-assignments" className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" data-name="pe-button">
        <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004b72] text-[14px]">
          <p className="css-ew64yg leading-[20px]">View Pending Role Assignments</p>
        </div>
      </Link>
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
          { label: 'Add Role Assignment' },
        ]} />
      </div>
    </div>
  );
}

function HeaderAndSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="header-and-subtitle">
      <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] not-italic text-[#1c2024] text-[32px]">
        Add Role Assignment
      </h1>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic text-[#60646c] text-[18px]">
        Add a role assignment. You may create multiple role assignments at once. Role assignments are only created after you submit them.
      </p>
    </div>
  );
}

function FormSection({ 
  email, 
  emailError,
  name, 
  status, 
  tenant, 
  role, 
  focusArea, 
  notes,
  onEmailChange,
  onEmailBlur,
  onTenantChange,
  onRoleChange,
  onFocusAreaChange,
  onNotesChange,
  onReset,
  onSubmit,
  showSuccessMessage,
  tenantOptions,
  roleOptions,
  focusAreaOptions,
  isSubmitting,
  showSuccessToast,
  submittedData
}: {
  email: string;
  emailError: string;
  name: string;
  status: string;
  tenant: string;
  role: string;
  focusArea: string;
  notes: string;
  onEmailChange: (value: string) => void;
  onEmailBlur: () => void;
  onTenantChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onFocusAreaChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onReset: () => void;
  onSubmit: () => void;
  showSuccessMessage: boolean;
  tenantOptions: string[];
  roleOptions: string[];
  focusAreaOptions: string[];
  isSubmitting: boolean;
  showSuccessToast: boolean;
  submittedData: { tenant: string; role: string; email: string } | null;
}) {
  return (
    <div className="relative w-full max-w-[800px]">
      {/* Success Toast */}
      {showSuccessToast && submittedData && (
        <div 
          className={`fixed top-[100px] right-[24px] z-50 bg-[#e6f6eb] content-stretch flex gap-[8px] items-start overflow-clip p-[12px] rounded-[6px] w-[352px] shadow-lg transition-all duration-300 ${showSuccessToast ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}
        >
          <div className="content-stretch flex h-[20px] items-center relative shrink-0">
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g clipPath="url(#clip0_48_12035)">
                  <path d="M14.6654 7.38667V8C14.6646 9.43761 14.2003 10.8365 13.3392 11.988C12.4781 13.1394 11.2665 13.9817 9.88921 14.3893C8.51188 14.7969 7.03815 14.7479 5.68963 14.2497C4.3411 13.7515 3.18975 12.8307 2.40723 11.6247C1.62471 10.4187 1.25287 8.99205 1.34746 7.55754C1.44205 6.12303 1.99812 4.75755 2.93217 3.66471C3.86621 2.57188 5.1285 1.81024 6.53077 1.49344C7.93304 1.17664 9.40016 1.32152 10.7121 1.90667" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.6667 2.66666L8 9.34L6 7.34" stroke="rgba(0,113,63,0.87)" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_48_12035">
                    <rect fill="white" height="16" width="16" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,113,63,0.87)]">
            <p className="mb-0">Role Assignment Created</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal mb-0">{submittedData.tenant} {submittedData.role.split('/')[0]} role created for</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal mb-0">{submittedData.email}</p>
          </div>
        </div>
      )}

      {/* Form with dimming overlay */}
      <div className="relative">
        {/* Dimming overlay during submission - only affects form fields */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/60 z-10 pointer-events-none" style={{ bottom: '56px' }} />
        )}
        
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="form-section">
      {/* Row 1: Email */}
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[320px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
            Email Address
          </label>
          <input
            type="text"
            placeholder="Enter an email address..."
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={onEmailBlur}
            disabled={isSubmitting}
            className={`${emailError ? 'bg-[#FFF0F0] border-[#D32F2F]' : 'bg-white border-[rgba(0,9,50,0.12)]'} h-[32px] w-full rounded-[4px] px-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] border outline-none focus:border-[#004b72] ${isSubmitting ? 'cursor-not-allowed' : ''}`}
          />
          {emailError && (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#D32F2F] text-[14px]">
              {emailError}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Name and Status */}
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[240px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
            Name
          </label>
          <input
            type="text"
            value={name}
            disabled
            className="bg-[rgba(0,0,51,0.06)] h-[32px] w-full rounded-[4px] px-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] border border-[rgba(0,0,47,0.15)] cursor-not-allowed"
          />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#80838d] text-[12px]">
            Populates after user registration
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[160px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
            Status
          </label>
          <input
            type="text"
            value={status}
            disabled
            className="bg-[rgba(0,0,51,0.06)] h-[32px] w-full rounded-[4px] px-[12px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] border border-[rgba(0,0,47,0.15)] cursor-not-allowed"
          />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#80838d] text-[12px]">
            Populates after user registration
          </p>
        </div>
      </div>

      {/* Row 3: Tenant, Role, Focus Area */}
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[200px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
            Tenant
          </label>
          <div className="relative w-full">
            <select
              value={tenant}
              onChange={(e) => onTenantChange(e.target.value)}
              disabled={isSubmitting}
              className={`bg-white h-[32px] w-full rounded-[4px] px-[12px] pr-[32px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] border border-[rgba(0,6,46,0.2)] outline-none focus:border-[#004b72] appearance-none ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <option value="">Select a tenant...</option>
              {tenantOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="absolute right-[12px] top-[8px] pointer-events-none">
              <PeChevronDown />
            </div>
          </div>
        </div>
        
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[200px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
            Role
          </label>
          <div className="relative w-full">
            <select
              value={role}
              onChange={(e) => onRoleChange(e.target.value)}
              disabled={!tenant || isSubmitting}
              className={`${!tenant || isSubmitting ? 'bg-[rgba(0,0,51,0.06)] cursor-not-allowed' : 'bg-white cursor-pointer'} h-[32px] w-full rounded-[4px] px-[12px] pr-[32px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] border border-[rgba(0,6,46,0.2)] outline-none focus:border-[#004b72] appearance-none`}
            >
              <option value="">Select a role...</option>
              {roleOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="absolute right-[12px] top-[8px] pointer-events-none">
              <PeChevronDown />
            </div>
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[200px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
            Focus Area
          </label>
          <div className="relative w-full">
            <select
              value={focusArea}
              onChange={(e) => onFocusAreaChange(e.target.value)}
              disabled={!role || isSubmitting}
              className={`${!role || isSubmitting ? 'bg-[rgba(0,0,51,0.06)] cursor-not-allowed' : 'bg-white cursor-pointer'} h-[32px] w-full rounded-[4px] px-[12px] pr-[32px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] border border-[rgba(0,6,46,0.2)] outline-none focus:border-[#004b72] appearance-none`}
            >
              <option value="">Select a focus area...</option>
              {focusAreaOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div className="absolute right-[12px] top-[8px] pointer-events-none">
              <PeChevronDown />
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Notes */}
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[648px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[#1c2024] text-[14px]">
            Notes
          </label>
          <textarea
            placeholder="Enter an optional description..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={4}
            disabled={isSubmitting}
            className={`bg-white w-full rounded-[4px] px-[12px] py-[8px] font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1c2024] text-[14px] border border-[rgba(0,9,50,0.12)] outline-none focus:border-[#004b72] resize-none ${isSubmitting ? 'cursor-not-allowed' : ''}`}
          />
        </div>
      </div>

      {/* Row 5: Buttons */}
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
        <button
          onClick={onSubmit}
          disabled={!email || !!emailError || !tenant || !role || isSubmitting}
          className={`${!email || !!emailError || !tenant || !role ? 'bg-[#60646c] cursor-not-allowed opacity-50' : isSubmitting ? 'bg-[#004b72] cursor-not-allowed' : 'bg-[#004b72] hover:bg-[#003d5c] cursor-pointer'} content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 transition-colors z-20`}
        >
          {isSubmitting && (
            <svg className="animate-spin h-[16px] w-[16px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[14px]">
            {isSubmitting ? 'Submitting...' : 'Submit Role Assignment'}
          </p>
        </button>
        <button
          onClick={onReset}
          disabled={isSubmitting}
          className={`bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 transition-colors ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#f5f5f5]'}`}
        >
          <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1c2024] text-[14px]">
            Reset
          </p>
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}

function PeChevronDown() {
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