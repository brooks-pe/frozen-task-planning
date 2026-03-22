import svgPaths from "../imports/svg-bpd5zl4txj";
import { useEffect } from "react";

interface DisableUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  userEmail: string;
}

export default function DisableUserModal({ isOpen, onClose, onConfirm, userName, userEmail }: DisableUserModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div 
          className="bg-white relative rounded-[12px] w-[480px] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="content-stretch flex flex-col gap-[16px] items-start max-h-[inherit] max-w-[inherit] overflow-clip py-[24px] relative rounded-[inherit]">
            {/* Header */}
            <div className="relative shrink-0 w-full">
              <div className="content-stretch flex items-start px-[24px] relative w-full">
                <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[28px] min-h-px min-w-px not-italic relative text-[#1c2024] text-[20px] tracking-[-0.08px] whitespace-pre-wrap">
                    Disable User?
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative shrink-0 w-full">
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-start px-[24px] relative w-full">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px overflow-clip relative">
                    {/* Info Callout */}
                    <div className="bg-[rgba(0,179,238,0.12)] relative rounded-[6px] shrink-0 w-full">
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex gap-[8px] items-start p-[12px] relative w-full">
                          {/* Icon */}
                          <div className="content-stretch flex h-[20px] items-center relative shrink-0">
                            <div className="relative shrink-0 size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                <g clipPath="url(#clip0_95_33606)">
                                  <path d={svgPaths.p3b51300} stroke="#00749E" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_95_33606">
                                    <rect fill="white" height="16" width="16" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#00749e] text-[14px] whitespace-pre-wrap">
                            Disabling this user will prevent them from signing in and accessing SyncPoint. You can re-enable them at any time.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Body Text */}
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start relative shrink-0 w-full">
                      <div className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[0px] text-[rgba(0,7,20,0.62)] tracking-[0.04px] whitespace-pre-wrap">
                        <p className="leading-[20px] mb-0 text-[14px]">
                          Disable access for {userName} ({userEmail})?
                        </p>
                        <p className="leading-[16px] mb-0 text-[12px]">&nbsp;</p>
                        <p className="leading-[20px] text-[14px]">
                          Their profile and role assignments will remain saved, but they will not be able to log in while disabled.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-end size-full">
                <div className="content-stretch flex gap-[12px] items-center justify-end px-[24px] relative w-full">
                  {/* Cancel Button */}
                  <button
                    onClick={onClose}
                    className="content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                  >
                    <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1c2024] text-[14px] whitespace-nowrap">
                      <p className="leading-[20px]">Cancel</p>
                    </div>
                  </button>

                  {/* Disable User Button */}
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="bg-[#004b72] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#003d5c] transition-colors"
                  >
                    <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                      <p className="leading-[20px]">Disable User</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,51,0.06)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_16px_36px_-20px_rgba(0,6,46,0.2),0px_16px_64px_0px_rgba(0,0,85,0.02),0px_12px_60px_0px_rgba(0,0,0,0.15)]" />
        </div>
      </div>
    </>
  );
}
