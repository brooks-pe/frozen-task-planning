import svgPaths from "./svg-0ajiezvs73";

function PeAvatar() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="pe-avatar">
      <div className="absolute inset-[-1.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
          <g id="pe-avatar">
            <path d={svgPaths.p1e8b6800} id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="item #1">
      <div className="css-g0mm18 font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#1c2024] text-[0px] text-[14px]">
        <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold mb-0">John Smith</p>
        <p className="css-ew64yg">john.p.smith@navy.mil</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#f9f9fb] content-stretch flex gap-[12px] items-center p-[12px] relative shrink-0">
      <PeAvatar />
      <Item />
    </div>
  );
}

function PeUser() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-user">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_13706)" id="pe-user">
          <path d={svgPaths.p1cc38c00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_13706">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Item1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #2">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeUser />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Profile Settings</p>
        </div>
      </div>
    </div>
  );
}

function PeLifeBuoy() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-life-buoy">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_13703)" id="pe-life-buoy">
          <path d={svgPaths.pc032d80} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_13703">
            <rect fill="white" height="24" width="24" />
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
          <PeLifeBuoy />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Get Help</p>
        </div>
      </div>
    </div>
  );
}

function PeInfo() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-info">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_13700)" id="pe-info">
          <path d={svgPaths.p33cad000} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_13700">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Item2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeInfo />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">{`About & Version`}</p>
        </div>
      </div>
    </div>
  );
}

function PeLogOut() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="pe-log-out">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_13697)" id="pe-log-out">
          <path d={svgPaths.p2b069980} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_13697">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Item5() {
  return (
    <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-full hover:bg-[#e8e9ec] transition-colors cursor-pointer" data-name="item #3">
      <div className="flex flex-row items-center rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] relative size-full">
          <PeLogOut />
          <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[14px]">Log Out</p>
        </div>
      </div>
    </div>
  );
}

function ItemContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="item-container">
      <Item3 />
      <Item2 />
      <Item5 />
    </div>
  );
}

function Group() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="group #1">
      <ItemContainer />
    </div>
  );
}

function ItemContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="item-container">
      <Item1 />
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start relative shrink-0 w-[195px]" data-name="group #1">
      <ItemContainer1 />
    </div>
  );
}

function PeDropdownPattern() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="pe-dropdown-pattern">
      <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip p-[8px] relative rounded-[inherit]">
        <Frame />
        <Group1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,51,0.06)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,9,50,0.12),0px_12px_60px_0px_rgba(0,0,0,0.15)]" />
    </div>
  );
}

export default function DropdownProfile() {
  return (
    <div className="bg-white content-stretch flex items-center relative size-full" data-name="dropdown-profile">
      <PeDropdownPattern />
    </div>
  );
}