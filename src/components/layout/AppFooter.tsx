import svgPaths from '../../imports/svg-hq8o45695r';

export function PeClassificationBanner() {
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

export function PeFooter1() {
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
      <div className="css-g0mm18 font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[12px] tracking-[0.04px]">
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
