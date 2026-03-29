function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[54.133px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1c2024] text-[18px] top-[0.5px] whitespace-nowrap">Filters</p>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="ChevronIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
              <path d="M1 1L5 5L1 9" id="Vector" stroke="var(--stroke-0, #1C2024)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <ChevronIcon />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37px] not-italic text-[#1c2024] text-[14px] text-center top-[0.5px] whitespace-nowrap">Hide Filters</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[4px] shrink-0 w-[123px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center px-[12px] relative size-full">
        <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <Text1 />
          </div>
        </div>
        <Text2 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <Text />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e1e6] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[91.55px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1c2024] text-[14px] top-[0.5px] whitespace-nowrap">Appropriation</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white border border-[rgba(0,6,46,0.2)] border-solid h-[32px] left-0 rounded-[4px] top-0 w-[163.117px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#1c2024] text-[14px] top-[5.5px] whitespace-nowrap">All Appropriations</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="absolute left-[137.12px] size-[16px] top-[8px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDown">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SearchableFilterDropdown() {
  return (
    <div className="absolute h-[32px] left-0 top-[28px] w-[163.117px]" data-name="SearchableFilterDropdown">
      <Button1 />
      <ChevronDown />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[60px] relative shrink-0 w-[163.117px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph />
        <SearchableFilterDropdown />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[104.417px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1c2024] text-[14px] top-[0.5px] whitespace-nowrap">Funding Source</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white border border-[rgba(0,6,46,0.2)] border-solid h-[32px] left-0 rounded-[4px] top-0 w-[176.433px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#1c2024] text-[14px] top-[5.5px] whitespace-nowrap">All Funding Sources</p>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="absolute left-[150.43px] size-[16px] top-[8px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDown">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SearchableFilterDropdown1() {
  return (
    <div className="absolute h-[32px] left-0 top-[28px] w-[176.433px]" data-name="SearchableFilterDropdown">
      <Button2 />
      <ChevronDown1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[60px] relative shrink-0 w-[176.433px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph1 />
        <SearchableFilterDropdown1 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[125.167px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#1c2024] text-[14px] top-[0.5px] whitespace-nowrap">Appropriation Year</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white border border-[rgba(0,6,46,0.2)] border-solid h-[32px] left-0 rounded-[4px] top-0 w-[196.55px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#1c2024] text-[14px] top-[5.5px] whitespace-nowrap">All Appropriation Years</p>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="absolute left-[170.55px] size-[16px] top-[8px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ChevronDown">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #60646C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SearchableFilterDropdown2() {
  return (
    <div className="absolute h-[32px] left-0 top-[28px] w-[196.55px]" data-name="SearchableFilterDropdown">
      <Button3 />
      <ChevronDown2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[60px] relative shrink-0 w-[196.55px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph2 />
        <SearchableFilterDropdown2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[40.5px] not-italic text-[#004b72] text-[14px] text-center top-[0.5px] whitespace-nowrap">Clear Filters</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[32px] relative rounded-[4px] shrink-0 w-[104.467px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[12px] relative size-full">
        <Text3 />
      </div>
    </div>
  );
}

function ExecutionPlanningDashboard() {
  return (
    <div className="content-stretch flex gap-[12px] h-[60px] items-end relative shrink-0 w-full" data-name="ExecutionPlanningDashboard">
      <Container4 />
      <Container5 />
      <Container6 />
      <Button4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative size-full">
        <Container3 />
        <ExecutionPlanningDashboard />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[101px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
    </div>
  );
}

export default function CollapsibleFilterSection() {
  return (
    <div className="bg-[#f9f9fb] content-stretch flex flex-col items-start p-px relative rounded-[5px] size-full" data-name="CollapsibleFilterSection">
      <div aria-hidden="true" className="absolute border border-[#e0e1e6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Container />
      <Container1 />
    </div>
  );
}