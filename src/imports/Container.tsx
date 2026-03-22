function Heading() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1860px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] left-0 not-italic text-[#1c2024] text-[32px] top-[-0.5px] whitespace-nowrap">Execution Planning</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-[1860px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#60646c] text-[18px] top-[0.5px] whitespace-nowrap">Convert the plan into executable work, money, and measurable outcomes.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[68px] items-start left-0 top-[16px] w-[1860px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Link() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#147db9] text-[14px] top-[0.5px] whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.233px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Link />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.05px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#8b8d98] text-[14px] top-[0.5px] whitespace-nowrap">/</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[125.717px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#60646c] text-[14px] top-[0.5px] whitespace-nowrap">Execution Planning</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[138.767px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pl-[4px] relative size-full">
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.05px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#8b8d98] text-[14px] top-[0.5px] whitespace-nowrap">/</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[72.2px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1c2024] text-[14px] top-[0.5px] whitespace-nowrap">Dashboard</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[85.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pl-[4px] relative size-full">
        <Text2 />
        <Text3 />
      </div>
    </div>
  );
}

function SyncPointBreadcrumb() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center left-0 top-[96px] w-[1860px]" data-name="SyncPointBreadcrumb">
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container5() {
  return <div className="absolute border-[#004b72] border-b-3 border-solid border-t-3 h-[132px] left-0 top-0 w-[1860px]" data-name="Container" />;
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <SyncPointBreadcrumb />
      <Container5 />
    </div>
  );
}