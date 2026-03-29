import React from 'react';
import svgPaths from '../../imports/svg-hq8o45695r';
import imgPms420Logo1 from "figma:asset/06e11963d698e9776746f587291dc116d81990f9.png";
import imgImage from "figma:asset/a659c88c1e1688276fd542a0142c231a1bc62fe3.png";

export function HomePageContent() {
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
