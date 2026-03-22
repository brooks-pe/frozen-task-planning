import svgPaths from "./svg-34bu3hn4l0";
import { useNavigate } from "react-router";

function Item() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="item #1">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] relative size-full">
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Administrative Settings</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e1e6] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PeShieldCheck() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-shield-check">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <g id="pe-shield-check">
          <path d={svgPaths.pa1b7400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Item1({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClose) onClose();
    navigate('/admin-console');
  };
  
  return (
    <div onClick={handleClick} className="bg-white h-[32px] relative shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #2">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeShieldCheck />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Admin Console</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e0e1e6] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PeUsers() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-users">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <g id="pe-users">
          <path d={svgPaths.pb7fc830} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Item2({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClose) onClose();
    navigate('/user-management');
  };
  
  return (
    <div onClick={handleClick} className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeUsers />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">User Management</p>
        </div>
      </div>
    </div>
  );
}

function PeLayers() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-layers">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_12875)" id="pe-layers">
          <path d={svgPaths.p90f0740} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_12875">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Item3() {
  return (
    <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeLayers />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Activity Management</p>
        </div>
      </div>
    </div>
  );
}

function PeBriefcaseBusiness() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-briefcase-business">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <g id="pe-briefcase-business">
          <path d={svgPaths.p280c2800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Item4() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeBriefcaseBusiness />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Project Management</p>
        </div>
      </div>
    </div>
  );
}

function PeBanknote() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-banknote">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <g id="pe-banknote">
          <path d={svgPaths.p1344a780} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Item5() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeBanknote />
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px] w-[159px]">System Appropriations</p>
        </div>
      </div>
    </div>
  );
}

function PeCalendarRange() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-calendar-range">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <g id="pe-calendar-range">
          <path d={svgPaths.p31be180} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Item6() {
  return (
    <div className="bg-white h-[32px] relative shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeCalendarRange />
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[14px] w-[181px]">Tenant Appropriation Years</p>
        </div>
      </div>
    </div>
  );
}

function PeFileSearch() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-file-search">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <g id="pe-file-search">
          <path d={svgPaths.p3c08400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Item7() {
  return (
    <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeFileSearch />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Audit and Logs</p>
        </div>
      </div>
    </div>
  );
}

function ItemContainer({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="item-container">
      <Item />
      <Item1 onClose={onClose} />
      <Item2 onClose={onClose} />
      <Item3 />
      <Item4 />
      <Item5 />
      <Item6 />
      <Item7 />
    </div>
  );
}

function Group({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="group #1">
      <ItemContainer onClose={onClose} />
    </div>
  );
}

function GroupContainer({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="group-container">
      <Group onClose={onClose} />
    </div>
  );
}

function PeDropdownPattern({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-[237px]" data-name="pe-dropdown-pattern">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[inherit] w-full">
        <GroupContainer onClose={onClose} />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,51,0.06)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)]" />
    </div>
  );
}

export default function DropdownAdmin({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-white content-stretch flex items-center relative size-full" data-name="dropdown-admin">
      <PeDropdownPattern onClose={onClose} />
    </div>
  );
}