import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, Plus } from 'lucide-react';

// ── Types ───────────────────────────────────────────────────────────────────

export interface SubtaskDraft {
  id: string;
  title: string;
  savedTitle: string;
  description: string;
  savedDescription: string;
  popStart: string;
  savedPopStart: string;
  popEnd: string;
  savedPopEnd: string;
  isEditing: boolean;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

let nextId = 1;
function uid() {
  return `st-${Date.now()}-${nextId++}`;
}

export function createEmptySubtaskDraft(): SubtaskDraft {
  return {
    id: uid(),
    title: '',
    savedTitle: '',
    description: '',
    savedDescription: '',
    popStart: '',
    savedPopStart: '',
    popEnd: '',
    savedPopEnd: '',
    isEditing: true,
  };
}

// ── Sub-components ──────────────────────────────────────────────────────────

export function BOESubtaskForm({
  subtask,
  onUpdate,
  onSave,
  onCancel,
  onRemove,
  titleRef,
}: {
  subtask: SubtaskDraft;
  onUpdate: (patch: Partial<SubtaskDraft>) => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: () => void;
  titleRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const canSave = subtask.title.trim().length > 0;

  return (
    <div className="border border-[#e0e1e6] rounded-[8px] bg-white overflow-hidden">
      <div className="flex items-center justify-between gap-[12px] px-[16px] py-[12px] bg-[#f9f9fb] border-b border-[#e0e1e6]">
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1C2024] text-[16px]">
          {subtask.savedTitle || 'Subtask Draft'}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center w-[28px] h-[28px] rounded-[4px] bg-transparent border-none cursor-pointer text-[#80838D] hover:text-[#e5484d] hover:bg-[#fff0f0] transition-colors shrink-0"
          aria-label="Remove subtask"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="px-[16px] py-[16px] flex flex-col gap-[16px]">
        {/* Subtask Title */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[#60646C] text-[14px]">
            Subtask Title
          </label>
          <input
            ref={titleRef}
            type="text"
            value={subtask.title}
            onChange={e => onUpdate({ title: e.target.value })}
            placeholder="Enter subtask title"
            className="w-full h-[36px] px-[10px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#004B72] focus:ring-1 focus:ring-[#004B72] bg-white"
          />
        </div>

        {/* Description (optional) */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[#60646C] text-[14px]">
            Description <span className="text-[#80838D]">(optional)</span>
          </label>
          <textarea
            value={subtask.description}
            onChange={e => onUpdate({ description: e.target.value })}
            placeholder="Describe the subtask"
            rows={3}
            className="w-full px-[10px] py-[8px] border border-[rgba(0,6,46,0.2)] rounded-[4px] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#80838D] focus:outline-none focus:border-[#004B72] focus:ring-1 focus:ring-[#004B72] bg-white resize-vertical"
          />
        </div>

        {/* Period of Performance (optional) */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] text-[#60646C] text-[14px]">
            Period of Performance <span className="text-[#80838D]">(optional)</span>
          </label>
          <div className="flex items-center gap-[8px]">
            <div className="w-[200px] shrink-0">
              <DatePickerInput
                value={subtask.popStart}
                onChange={v => onUpdate({ popStart: v })}
                placeholder="mm/dd/yyyy"
              />
            </div>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[13px] leading-[18px] text-[#80838D] shrink-0">to</span>
            <div className="w-[200px] shrink-0">
              <DatePickerInput
                value={subtask.popEnd}
                onChange={v => onUpdate({ popEnd: v })}
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-[8px]">
          <button
            type="button"
            onClick={onCancel}
            className="h-[32px] px-[12px] rounded-[4px] border border-[rgba(0,8,48,0.27)] bg-white cursor-pointer hover:bg-[#f5f5f5] transition-colors font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#1C2024]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className={`flex items-center gap-[6px] h-[32px] px-[12px] rounded-[4px] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] border-none transition-colors ${
              canSave
                ? 'bg-[#004B72] text-white cursor-pointer hover:bg-[#003a5c]'
                : 'bg-[#004B72]/40 text-white cursor-not-allowed'
            }`}
          >
            Save Subtask
          </button>
        </div>
      </div>
    </div>
  );
}

export function BOESubtaskView({
  subtask,
  onEdit,
  onRemove,
}: {
  subtask: SubtaskDraft;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const displayTitle = subtask.savedTitle || subtask.title || 'Untitled Subtask';
  const displayPop = subtask.savedPopStart && subtask.savedPopEnd
    ? `${subtask.savedPopStart} to ${subtask.savedPopEnd}`
    : 'Not yet set';

  return (
    <div className="border border-[#e0e1e6] rounded-[8px] bg-white overflow-hidden">
      <div className="flex items-center justify-between gap-[12px] px-[16px] py-[12px] bg-[#f9f9fb] border-b border-[#e0e1e6]">
        <span className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1C2024] text-[16px]">
          {displayTitle}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center w-[28px] h-[28px] rounded-[4px] bg-transparent border-none cursor-pointer text-[#80838D] hover:text-[#e5484d] hover:bg-[#fff0f0] transition-colors shrink-0"
          aria-label="Remove subtask"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="px-[16px] py-[16px] flex flex-col gap-[16px]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[24px]">
          <div className="flex flex-col gap-[4px] min-w-0">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#60646C]">
              Subtask Title
            </span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
              {displayTitle}
            </span>
          </div>
          <div className="flex flex-col gap-[4px] min-w-0">
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#60646C]">
              Period of Performance
            </span>
            <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024]">
              {displayPop}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[4px] min-w-0">
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[18px] text-[#60646C]">
            Description
          </span>
          <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] whitespace-pre-wrap">
            {subtask.savedDescription || 'No description provided.'}
          </span>
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            onClick={onEdit}
            className="flex gap-[8px] h-[32px] items-center justify-center px-[12px] rounded-[4px] shrink-0 cursor-pointer bg-[#004B72] border-none text-white hover:bg-[#003a5a] transition-colors font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px]"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ── DatePickerInput (matches CreateTaskFlyout pattern exactly) ───────────────

function DatePickerInput({
  value,
  onChange,
  placeholder = 'mm/dd/yyyy',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const parseMMDDYYYY = (s: string): Date | null => {
    const p = s.split('/');
    if (p.length !== 3) return null;
    const m = parseInt(p[0], 10);
    const d = parseInt(p[1], 10);
    const y = parseInt(p[2], 10);
    if (isNaN(m) || isNaN(d) || isNaN(y) || m < 1 || m > 12 || d < 1 || d > 31 || y < 1900) return null;
    return new Date(y, m - 1, d);
  };

  const formatDate = (date: Date): string => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const parsedDate = parseMMDDYYYY(value);
  const [viewMonth, setViewMonth] = useState(() => parsedDate ? parsedDate.getMonth() : new Date().getMonth());
  const [viewYear, setViewYear] = useState(() => parsedDate ? parsedDate.getFullYear() : new Date().getFullYear());

  useEffect(() => {
    if (calendarOpen) {
      const d = parseMMDDYYYY(value);
      if (d) {
        setViewMonth(d.getMonth());
        setViewYear(d.getFullYear());
      } else {
        const now = new Date();
        setViewMonth(now.getMonth());
        setViewYear(now.getFullYear());
      }
    }
  }, [calendarOpen, value]);

  useEffect(() => {
    if (!calendarOpen || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const calW = 240;
    const calH = 320;
    const pad = 8;
    let top = rect.bottom + 4;
    let left = rect.left;
    if (left + calW > window.innerWidth - pad) left = rect.right - calW;
    if (left < pad) left = pad;
    if (top + calH > window.innerHeight - pad) top = rect.top - calH - 4;
    if (top < pad) top = pad;
    setDropdownStyle({ top, left });
  }, [calendarOpen]);

  useEffect(() => {
    if (!calendarOpen) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        calendarRef.current && !calendarRef.current.contains(target)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [calendarOpen]);

  const handleSelectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    onChange(formatDate(d));
    setCalendarOpen(false);
    inputRef.current?.focus();
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const isSelected = (day: number) => {
    if (!parsedDate) return false;
    return parsedDate.getFullYear() === viewYear && parsedDate.getMonth() === viewMonth && parsedDate.getDate() === day;
  };
  const isToday = (day: number) => {
    const now = new Date();
    return now.getFullYear() === viewYear && now.getMonth() === viewMonth && now.getDate() === day;
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => { if (!calendarOpen) setCalendarOpen(true); }}
        placeholder={placeholder}
        className="w-full h-[36px] px-[10px] pr-[34px] bg-white rounded-[4px] border border-[rgba(0,6,46,0.2)] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#1C2024] placeholder:text-[#80838D] outline-none focus:border-[#004b72] focus:shadow-[0_0_0_1px_#004b72] transition-shadow box-border cursor-pointer"
      />
      {/* Calendar icon */}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setCalendarOpen(!calendarOpen)}
        className="absolute right-[8px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center border-none bg-transparent cursor-pointer p-0 rounded-[2px] hover:bg-[#f0f0f3] transition-colors"
        aria-label="Open calendar"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="#60646c" strokeWidth="1.2" />
          <path d="M1 5.5H13" stroke="#60646c" strokeWidth="1.2" />
          <path d="M4 1V3.5" stroke="#60646c" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M10 1V3.5" stroke="#60646c" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Calendar dropdown */}
      {calendarOpen && createPortal(
        <div
          ref={calendarRef}
          style={dropdownStyle}
          className="fixed z-[1100] bg-white rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-[#e0e1e6] p-[12px] w-[240px] select-none"
          data-datepicker-calendar
        >
          <div className="flex items-center justify-between mb-[8px]">
            <button type="button" onClick={prevMonth} className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f3] transition-colors p-0" aria-label="Previous month">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M6 2L2 6L6 10" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="font-['Inter:Medium',sans-serif] font-medium text-[13px] leading-[18px] text-[#1C2024]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f3] transition-colors p-0" aria-label="Next month">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="#60646c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0 mb-[2px]">
            {DAY_HEADERS.map(d => (
              <div key={d} className="h-[24px] flex items-center justify-center font-['Inter:Medium',sans-serif] font-medium text-[11px] leading-[14px] text-[#8b8d98]">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0">
            {Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`empty-${i}`} className="h-[28px]" />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const selected = isSelected(day);
              const today = isToday(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-[28px] w-full flex items-center justify-center rounded-[4px] border-none cursor-pointer transition-colors font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[16px] p-0 ${
                    selected
                      ? 'bg-[#004b72] text-white'
                      : today
                        ? 'bg-[#f0f7fb] text-[#004b72] hover:bg-[#e0eff6]'
                        : 'bg-transparent text-[#1C2024] hover:bg-[#f5f5f7]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="mt-[8px] pt-[8px] border-t border-[#e0e1e6] flex justify-center">
            <button
              type="button"
              onClick={() => { const now = new Date(); onChange(formatDate(now)); setCalendarOpen(false); inputRef.current?.focus(); }}
              className="border-none bg-transparent cursor-pointer font-['Inter:Medium',sans-serif] font-medium text-[12px] leading-[16px] text-[#006496] hover:underline p-0"
            >
              Today
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────

export function BOESubtasksSection() {
  const [subtasks, setSubtasks] = React.useState<SubtaskDraft[]>([]);
  const newTitleRef = React.useRef<HTMLInputElement | null>(null);
  const [pendingFocusId, setPendingFocusId] = React.useState<string | null>(null);
  const [activeSubtaskId, setActiveSubtaskId] = React.useState<string | null>(null);

  // Focus newly-created subtask title
  React.useEffect(() => {
    if (pendingFocusId) {
      setTimeout(() => newTitleRef.current?.focus(), 0);
      setPendingFocusId(null);
    }
  }, [pendingFocusId]);

  const addSubtask = () => {
    const id = uid();
    setSubtasks(prev => [
      ...prev,
      { id, title: '', savedTitle: '', description: '', popStart: '', popEnd: '' },
    ]);
    setActiveSubtaskId(id);
    setPendingFocusId(id);
  };

  const updateSubtask = (id: string, patch: Partial<SubtaskDraft>) => {
    setSubtasks(prev => prev.map(s => (s.id === id ? { ...s, ...patch } : s)));
  };

  const saveSubtask = (id: string) => {
    setSubtasks(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, savedTitle: s.title.trim() }
          : s
      )
    );
  };

  const removeSubtask = (id: string) => {
    setSubtasks(prev => {
      const next = prev.filter(s => s.id !== id);
      if (activeSubtaskId === id) {
        setActiveSubtaskId(next.length > 0 ? next[Math.max(0, prev.findIndex(s => s.id === id) - 1)]?.id ?? next[0].id : null);
      }
      return next;
    });
  };

  const activeSubtask = subtasks.find(s => s.id === activeSubtaskId) ?? null;

  React.useEffect(() => {
    if (!activeSubtaskId && subtasks.length > 0) {
      setActiveSubtaskId(subtasks[0].id);
    }
  }, [activeSubtaskId, subtasks]);

  const getTabLabel = (subtask: Subtask, index: number) => {
    return subtask.savedTitle || `Untitled Subtask ${index + 1}`;
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {/* Section Title */}
      <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] text-[#1C2024] text-[18px]">
        Subtasks
      </h3>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] text-[#80838D] text-[14px]">
        Subtasks break the work into manageable pieces for BOE development. Add high-level subtasks now; detailed costing can be completed during BOE Build-Up.
      </p>

      <div className="flex flex-col gap-[12px]">
        <div className="flex items-end gap-[4px] overflow-x-auto pb-[2px]">
          {subtasks.map((subtask, index) => {
            const isActive = subtask.id === activeSubtaskId;
            return (
              <button
                key={subtask.id}
                type="button"
                onClick={() => setActiveSubtaskId(subtask.id)}
                className={`h-[36px] px-[12px] rounded-t-[8px] border border-b-0 font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-white border-[#e0e1e6] text-[#1C2024]'
                    : 'bg-[#f9f9fb] border-[#d9dade] text-[#60646C] hover:bg-white'
                }`}
              >
                {getTabLabel(subtask, index)}
              </button>
            );
          })}
          <button
            type="button"
            onClick={addSubtask}
            className="h-[36px] px-[12px] rounded-t-[8px] border border-b-0 border-dashed border-[#d9dade] bg-[#f9f9fb] font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#006496] whitespace-nowrap hover:bg-white transition-colors inline-flex items-center gap-[6px]"
          >
            <Plus size={14} />
            Add Subtask
          </button>
        </div>

        {activeSubtask ? (
          <BOESubtaskForm
            subtask={activeSubtask}
            onUpdate={patch => updateSubtask(activeSubtask.id, patch)}
            onSave={() => saveSubtask(activeSubtask.id)}
            onRemove={() => removeSubtask(activeSubtask.id)}
            titleRef={activeSubtask.id === pendingFocusId ? newTitleRef : undefined}
          />
        ) : (
          <div className="border border-[#e0e1e6] rounded-[8px] bg-[#f9f9fb] px-[24px] py-[40px] flex flex-col items-center justify-center gap-[16px]">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#80838D]">
              Click + Add Subtask to create the first subtask draft.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
