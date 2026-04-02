import { useState } from 'react';

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['Inter',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#1C2024] text-[18px] tracking-[0px] w-full whitespace-pre-wrap">Awaiting BFM Processing</p>
    </div>
  );
}

function Frame1({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill({ status }: { status: string }) {
  const isPast = status === 'Past';
  const bgColor = isPast ? 'rgba(243,0,13,0.08)' : 'rgba(255,222,0,0.24)';
  const textColor = isPast ? '#CE2C31' : '#AB6400';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame24({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill status={status} />
    </div>
  );
}

function Frame11({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame1 title={title} description={description} amount={amount} />
        <Frame24 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

function Frame2({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill1({ status }: { status: string }) {
  const bgColor = status === 'At Risk' ? 'rgba(255,222,0,0.24)' : 'rgba(0,164,51,0.1)';
  const textColor = status === 'At Risk' ? '#AB6400' : '#218358';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame25({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill1 status={status} />
    </div>
  );
}

function Frame3({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame2 title={title} description={description} amount={amount} />
        <Frame25 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

function Frame4({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill2({ status }: { status: string }) {
  const bgColor = status === 'At Risk' ? 'rgba(255,222,0,0.24)' : 'rgba(0,164,51,0.1)';
  const textColor = status === 'At Risk' ? '#AB6400' : '#218358';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame26({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill2 status={status} />
    </div>
  );
}

function Frame12({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame4 title={title} description={description} amount={amount} />
        <Frame26 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

function Frame7({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill3({ status }: { status: string }) {
  const bgColor = status === 'On Track' ? 'rgba(0,164,51,0.1)' : 'rgba(255,222,0,0.24)';
  const textColor = status === 'On Track' ? '#218358' : '#AB6400';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame27({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill3 status={status} />
    </div>
  );
}

function Frame6({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame7 title={title} description={description} amount={amount} />
        <Frame27 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

function Frame9({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill4({ status }: { status: string }) {
  const bgColor = status === 'On Track' ? 'rgba(0,164,51,0.1)' : 'rgba(255,222,0,0.24)';
  const textColor = status === 'On Track' ? '#218358' : '#AB6400';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame28({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill4 status={status} />
    </div>
  );
}

function Frame8({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame9 title={title} description={description} amount={amount} />
        <Frame28 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

// Additional child cards for expanded state
function ExpandedChildCard({ 
  title, 
  description, 
  amount, 
  dueDate, 
  status, 
  statusColor, 
  statusBg 
}: { 
  title: string; 
  description: string; 
  amount: string; 
  dueDate: string; 
  status: string; 
  statusColor: string; 
  statusBg: string; 
}) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title} →</p>
          <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
            <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
            <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
            <p className="mb-0">Due Date:</p>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
          </div>
          <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: statusBg }} data-name="grid-pill">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: statusColor }}>
                  <p className="leading-[20px] overflow-hidden">{status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PeButton({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) {
  return (
    <div 
      className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
      data-name="pe-button"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border border-[#004B72] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004B72] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{isExpanded ? 'Collapse' : 'View All'}</p>
      </div>
    </div>
  );
}

function Frame5({ isExpanded, onToggle, data }: { isExpanded: boolean; onToggle: () => void; data?: any }) {
  // Use baseline data if no data provided
  const defaultData = [
    { title: 'INC-016 • Littoral Combat Ship Mission Modules →', description: 'Missing funding line mapping for 2 tasks', amount: '$1,000,000', dueDate: '29 Jan 2026', status: 'Past' },
    { title: 'INC-019 • Electromagnetic Sweep Cables →', description: 'Dependencies resolved', amount: '$2,000,000', dueDate: '15 Feb 2026', status: 'At Risk' },
    { title: 'INC-024 • Buried Minehunting Module →', description: 'Converts WBS', amount: '$3,000,000', dueDate: '10 Feb 2026', status: 'At Risk' },
  ];
  const items = data?.awaitingBFM || defaultData;
  
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[5px] transition-all duration-300" style={{ height: isExpanded ? 'auto' : undefined }}>
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
        <Frame />
        <Frame11 {...items[0]} />
        <Frame3 {...items[1]} />
        <Frame12 {...items[2]} />
        <ExpandedChildCard 
          title="INC-033 • Naval Strike Missile"
          description="Awaiting approval for contract extension"
          amount="$4,200,000"
          dueDate="25 Feb 2026"
          status="At Risk"
          statusColor="#AB6400"
          statusBg="rgba(255, 222, 0, 0.24)"
        />
        <Frame6 
          title="INC-101 • Longbow Hellfire Missile →" 
          description="Missing funding line mapping for 1 task" 
          amount="$1,500,000" 
          dueDate="15 Mar 2026" 
          status="On Track" 
        />
        
        {/* Expanded child cards */}
        {isExpanded && (
          <>
            <Frame8 
              title="INC-045 • Surface Warfare Systems →" 
              description="Funding line mapping in progress" 
              amount="$2,800,000" 
              dueDate="10 Apr 2026" 
              status="On Track" 
            />
            <ExpandedChildCard 
              title="INC-067 • Combat System Integration"
              description="Awaiting BFM review and approval"
              amount="$5,500,000"
              dueDate="5 May 2026"
              status="On Track"
              statusColor="#218358"
              statusBg="rgba(0, 164, 51, 0.1)"
            />
            <ExpandedChildCard 
              title="INC-089 • Tactical Data Links Upgrade"
              description="Dependencies under review"
              amount="$3,300,000"
              dueDate="20 May 2026"
              status="On Track"
              statusColor="#218358"
              statusBg="rgba(0, 164, 51, 0.1)"
            />
            <ExpandedChildCard 
              title="INC-112 • Fire Control System Modernization"
              description="Contract negotiations ongoing"
              amount="$6,100,000"
              dueDate="5 Jun 2026"
              status="On Track"
              statusColor="#218358"
              statusBg="rgba(0, 164, 51, 0.1)"
            />
          </>
        )}
        
        <PeButton isExpanded={isExpanded} onClick={onToggle} />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[157px]">
      <p className="font-['Inter',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#1C2024] text-[18px] tracking-[0px] w-full whitespace-pre-wrap">{`Risks & Actions`}</p>
    </div>
  );
}

function Frame15({ amount }: { amount: string }) {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Bold',sans-serif] font-bold gap-[8px] items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="leading-[20px] relative shrink-0 text-[#60646C] text-[14px] w-full">BFM Working Authorized Not Distributed to Projects</p>
      <p className="leading-[28px] relative shrink-0 text-[#1C2024] text-[20px] tracking-[-0.08px] w-full">{amount}</p>
    </div>
  );
}

function Frame14({ amount }: { amount: string }) {
  return (
    <div className="bg-white h-[96px] relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <Frame15 amount={amount} />
      </div>
    </div>
  );
}

function Frame17({ amount }: { amount: string }) {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Bold',sans-serif] font-bold gap-[8px] items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="leading-[20px] relative shrink-0 text-[#60646C] text-[14px] w-full">APM Authorized Not Distributed to Projects</p>
      <p className="leading-[28px] relative shrink-0 text-[#1C2024] text-[20px] tracking-[-0.08px] w-full">{amount}</p>
    </div>
  );
}

function Frame16({ amount }: { amount: string }) {
  return (
    <div className="bg-white h-[96px] relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <Frame17 amount={amount} />
      </div>
    </div>
  );
}

function Frame19({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill5({ status }: { status: string }) {
  const isPast = status === 'Past';
  const bgColor = isPast ? 'rgba(243,0,13,0.08)' : 'rgba(255,222,0,0.24)';
  const textColor = isPast ? '#CE2C31' : '#AB6400';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame29({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill5 status={status} />
    </div>
  );
}

function Frame18({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame19 title={title} description={description} amount={amount} />
        <Frame29 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

function Frame21({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill6({ status }: { status: string }) {
  const isPast = status === 'Past';
  const bgColor = isPast ? 'rgba(243,0,13,0.08)' : 'rgba(255,222,0,0.24)';
  const textColor = isPast ? '#CE2C31' : '#AB6400';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame30({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill6 status={status} />
    </div>
  );
}

function Frame20({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame21 title={title} description={description} amount={amount} />
        <Frame30 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

function Frame23({ title, description, amount }: { title: string; description: string; amount: string }) {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 whitespace-pre-wrap">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#147DB9] text-[14px] w-full">{title}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#60646C] text-[0px] w-full">
        <p className="leading-[20px] mb-0 text-[14px]">{description}</p>
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] text-[18px] tracking-[-0.04px]">{amount}</p>
      </div>
    </div>
  );
}

function GridPill7({ status }: { status: string }) {
  const bgColor = status === 'At Risk' ? 'rgba(255,222,0,0.24)' : 'rgba(0,164,51,0.1)';
  const textColor = status === 'At Risk' ? '#AB6400' : '#218358';
  
  return (
    <div className="h-[28px] relative rounded-[100px] shrink-0 w-full" style={{ backgroundColor: bgColor }} data-name="grid-pill">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis whitespace-nowrap" style={{ color: textColor }}>
            <p className="leading-[20px] overflow-hidden">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame31({ dueDate, status }: { dueDate: string; status: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[106px]">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[20px] not-italic relative shrink-0 text-[#1C2024] text-[0px] text-[14px] w-full whitespace-pre-wrap">
        <p className="mb-0">Due Date:</p>
        <p className="font-['Inter:Medium',sans-serif] font-medium text-[#60646C]">{dueDate}</p>
      </div>
      <GridPill7 status={status} />
    </div>
  );
}

function Frame22({ title, description, amount, dueDate, status }: { title: string; description: string; amount: string; dueDate: string; status: string }) {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex items-start justify-between p-[12px] relative w-full">
        <Frame23 title={title} description={description} amount={amount} />
        <Frame31 dueDate={dueDate} status={status} />
      </div>
    </div>
  );
}

function PeButton1({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) {
  return (
    <div 
      className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors" 
      data-name="pe-button"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border border-[#004B72] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#004B72] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{isExpanded ? 'Collapse' : 'View All'}</p>
      </div>
    </div>
  );
}

function Frame10({ isExpanded, onToggle, data }: { isExpanded: boolean; onToggle: () => void; data?: any }) {
  // Use baseline data if no data provided
  const defaultData = {
    items: [
      { title: 'INC-067 • Training Program Management →', description: 'Risk: Insufficient staff allocated', amount: '$2,000,000', dueDate: '15 Jan 2026', status: 'Past' },
      { title: 'INC-210 • Littoral Combat Ship Mission Modules →', description: 'Action: Missing funding line mapping for 2 tasks', amount: '$1,000,000', dueDate: '10 Feb 2026', status: 'At Risk' },
      { title: 'INC-024 • Buried Minehunting Module →', description: 'Concerns Requires BFM engagement', amount: '$3,000,000', dueDate: '10 Feb 2026', status: 'At Risk' },
    ],
    bfmWorking: '$25,000,000',
    apmAuth: '$15,000,000'
  };
  const items = data?.risksActions || defaultData.items;
  const bfmWorking = data?.bfmWorking || defaultData.bfmWorking;
  const apmAuth = data?.apmAuth || defaultData.apmAuth;
  
  return (
    <div className="bg-[#f9f9fb] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px] transition-all duration-300" style={{ height: isExpanded ? 'auto' : undefined }}>
      <div aria-hidden="true" className="absolute border border-[#CDCED6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <Frame13 />
        <Frame14 amount={bfmWorking} />
        <Frame16 amount={apmAuth} />
        <Frame20 {...items[0]} />
        <Frame18 {...items[1]} />
        <Frame22 {...items[2]} />
        
        {/* Expanded child cards */}
        {isExpanded && (
          <>
            <ExpandedChildCard 
              title="INC-041 • Sensor Suite Upgrade"
              description="Technical review underway"
              amount="$4,500,000"
              dueDate="18 Feb 2026"
              status="At Risk"
              statusColor="#AB6400"
              statusBg="rgba(255, 222, 0, 0.24)"
            />
            <ExpandedChildCard 
              title="INC-073 • Navigation Systems Replacement"
              description="Dependency resolution needed"
              amount="$2,900,000"
              dueDate="25 Feb 2026"
              status="At Risk"
              statusColor="#AB6400"
              statusBg="rgba(255, 222, 0, 0.24)"
            />
            <ExpandedChildCard 
              title="INC-095 • Propulsion System Overhaul"
              description="Funding allocation pending"
              amount="$7,200,000"
              dueDate="1 Mar 2026"
              status="At Risk"
              statusColor="#AB6400"
              statusBg="rgba(255, 222, 0, 0.24)"
            />
            <ExpandedChildCard 
              title="INC-118 • Electronic Warfare Suite"
              description="Contract amendment in progress"
              amount="$5,800,000"
              dueDate="10 Apr 2026"
              status="On Track"
              statusColor="#218358"
              statusBg="rgba(0, 164, 51, 0.1)"
            />
          </>
        )}
        
        <PeButton1 isExpanded={isExpanded} onClick={onToggle} />
      </div>
    </div>
  );
}

export default function PriorityCards({ data }: { data?: any }) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <div className="content-stretch flex gap-[24px] items-start relative size-full" data-name="priority-cards">
      <Frame5 isExpanded={expandedCards.has('awaiting-bfm')} onToggle={() => toggleCard('awaiting-bfm')} data={data} />
      <div className="flex flex-[1_0_0] flex-row items-start">
        <Frame10 isExpanded={expandedCards.has('risks-actions')} onToggle={() => toggleCard('risks-actions')} data={data} />
      </div>
    </div>
  );
}
