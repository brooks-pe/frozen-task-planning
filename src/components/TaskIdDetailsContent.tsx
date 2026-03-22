import React from 'react';
import { Link, useParams } from 'react-router';
import { SyncPointBreadcrumb } from './SyncPointBreadcrumb';
import VersionDropdown from './VersionDropdown';

export default function TaskIdDetailsContent() {
  const { taskId } = useParams<{ taskId: string }>();

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 bg-white px-[48px] py-[24px]">
        {/* Version Bar - Top Row */}
        <div className="flex items-start justify-between py-[12px] mb-[12px]">
          <VersionDropdown />
          <div className="flex gap-[24px] items-start">
            <Link 
              to="/task-requirements-alignment"
              className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors relative"
            >
              <div aria-hidden="true" className="absolute border border-[#004b72] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#004b72] text-[14px] leading-[20px] whitespace-nowrap">
                ← Back to Task-Requirements Alignment
              </span>
            </Link>
            <button className="bg-white flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] cursor-pointer hover:bg-[#f5f5f5] transition-colors relative">
              <div aria-hidden="true" className="absolute border border-[rgba(0,8,48,0.27)] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <span className="font-['Inter:Medium',sans-serif] font-medium text-[#1c2024] text-[14px] leading-[20px] whitespace-nowrap">
                Export
              </span>
            </button>
          </div>
        </div>

        {/* Page Title Section */}
        <div className="flex flex-col gap-[12px] py-[16px] relative">
          <div aria-hidden="true" className="absolute border-[#004b72] border-b-[3px] border-solid border-t-[3px] inset-0 pointer-events-none" />
          
          {/* Title and Subtitle */}
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[40px] text-[#1c2024] text-[32px]">
              Task ID Details
            </h1>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] text-[#60646c] text-[18px]">
              Coming Soon
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center">
            <SyncPointBreadcrumb items={[
              { label: 'Home', path: '/' },
              { label: 'Task Planning', path: '/task-requirements-alignment' },
              { label: 'Task ID Details' },
              { label: taskId || 'Task' },
            ]} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-[48px] pb-[24px]">
        {/* Coming Soon Placeholder */}
        <div className="border border-[#e0e1e6] rounded-[8px] overflow-hidden bg-white">
          <div className="px-[48px] py-[64px] flex flex-col items-center justify-center gap-[24px]">
            {/* Icon */}
            <div className="w-[64px] h-[64px] rounded-full bg-[#f9f9fb] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#60646c]">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9h6M9 13h6M9 17h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title */}
            <div className="flex flex-col items-center gap-[8px] max-w-[600px]">
              <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] leading-[28px] text-[#1c2024] tracking-[-1px]">
                Task Details Page Coming Soon
              </h2>
              
              {/* Description */}
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#60646c] text-center">
                This page will eventually display comprehensive task information including task details, history, workflow status, requirements alignment, and available actions.
              </p>
            </div>

            {/* Task ID Badge */}
            {taskId && (
              <div className="bg-[rgba(0,179,238,0.12)] px-[16px] py-[8px] rounded-[6px]">
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#00749e]">
                  Task ID: {taskId}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}