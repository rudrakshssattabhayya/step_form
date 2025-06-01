// src/components/form/DateField.tsx

import React, { useState, useRef, useEffect, useMemo } from 'react';

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  info?: string;
  fullWidth?: boolean;
  placeholder?: string;
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  info,
  fullWidth = true,
  placeholder = 'Select date',
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);

  //
  // 1. Parse “YYYY-MM-DD” → local-midnight Date, or null if invalid
  //
  const parseDateString = (dateString: string): Date | null => {
    const [y, m, d] = dateString.split('-').map(Number);
    if (
      Number.isInteger(y) &&
      Number.isInteger(m) &&
      Number.isInteger(d) &&
      y > 0 &&
      m >= 1 &&
      m <= 12 &&
      d >= 1 &&
      d <= 31
    ) {
      const candidate = new Date(y, m - 1, d);
      if (
        candidate.getFullYear() === y &&
        candidate.getMonth() === m - 1 &&
        candidate.getDate() === d
      ) {
        return candidate;
      }
    }
    return null;
  };

  //
  // 2. Memoize selectedDate so it only changes when `value` changes
  //
  const selectedDate = useMemo(() => {
    return value ? parseDateString(value) : null;
  }, [value]);

  //
  // 3. Sync currentMonth → selectedDate’s month whenever selectedDate changes
  //
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      );
    }
  }, [selectedDate]);

  //
  // 4. Close calendar/year dropdown on click‐outside
  //
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
        setIsYearSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helpers
  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const getYearOptions = () => {
    const now = new Date().getFullYear();
    const years: number[] = [];
    for (let y = now - 50; y <= now + 10; y++) {
      years.push(y);
    }
    return years;
  };

  //
  // 5. Build “YYYY-MM-DD” from local date parts instead of toISOString()
  //
  const pad2 = (n: number) => n.toString().padStart(2, '0');

  const handleDateSelect = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = pad2(date.getMonth() + 1); // month is zero-based
    const dd = pad2(date.getDate());
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsCalendarOpen(false);
  };

  const formatDisplayDate = (dateString: string) => {
    const parsed = parseDateString(dateString);
    if (!parsed) return '';
    return parsed.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  //
  // 6. When year dropdown opens, scroll the “currentMonth” year into view
  //
  useEffect(() => {
    if (isYearSelectOpen && yearListRef.current) {
      const y = currentMonth.getFullYear();
      const el = document.getElementById(`year-${y}`);
      if (el) {
        el.scrollIntoView({ block: 'center' });
      }
    }
  }, [isYearSelectOpen, currentMonth]);

  //
  // 7. Render the grid of days (with invisible padding before the 1st)
  //
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const cells: JSX.Element[] = [];

    // Invisible pads for “empty” cells before the 1st
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`pad-${i}`} className="h-8 w-8 invisible"></div>);
    }

    // Actual day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        d
      );

      const isSel =
        selectedDate &&
        thisDate.getFullYear() === selectedDate.getFullYear() &&
        thisDate.getMonth() === selectedDate.getMonth() &&
        thisDate.getDate() === selectedDate.getDate();

      const today = new Date();
      const isToday =
        thisDate.getFullYear() === today.getFullYear() &&
        thisDate.getMonth() === today.getMonth() &&
        thisDate.getDate() === today.getDate();

      cells.push(
        <div
          key={`day-${d}`}
          onClick={() => handleDateSelect(thisDate)}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${isSel ? 'bg-blue-600 text-white' : ''}
            ${!isSel && isToday ? 'bg-blue-100 text-blue-800' : ''}
            ${!isSel && !isToday ? 'hover:bg-gray-100' : ''}`}
        >
          {d}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className={`mb-6 ${fullWidth ? 'w-full' : ''}`}>
      {/* Label + Required Asterisk + Info Tooltip */}
      <div className="flex items-center mb-2">
        <label className="text-gray-700 font-medium">{label}</label>
        {required && <span className="text-red-500 ml-1">*</span>}
        {info && (
          <div className="ml-2 relative group">
            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 cursor-help">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {info}
              <div className="absolute top-full left-3 transform -translate-x-1/2 -translate-y-px border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>

      {/* “Fake input” that toggles the calendar */}
      <div className="relative" ref={calendarRef}>
        <div
          onClick={() => setIsCalendarOpen((prev) => !prev)}
          className={`w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsCalendarOpen((prev) => !prev);
            } else if (e.key === 'Escape') {
              setIsCalendarOpen(false);
              setIsYearSelectOpen(false);
            }
          }}
        >
          <span className={value ? 'text-gray-800' : 'text-gray-400'}>
            {value ? formatDisplayDate(value) : placeholder}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>

        {/* Calendar Popup */}
        {isCalendarOpen && (
          <div className="absolute z-20 mt-1 p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
            {/* Month / Year Header */}
            <div className="flex justify-between items-center mb-2 relative">
              <button
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Previous month"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div
                className="font-medium cursor-pointer flex items-center gap-1 transform"
                onClick={() => setIsYearSelectOpen((prev) => !prev)}
              >
                {currentMonth.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transform transition-transform ${
                    isYearSelectOpen ? 'rotate-180' : ''
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <button
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Next month"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Year-Dropdown (if open) */}
            {isYearSelectOpen && (
              <div
                ref={yearListRef}
                className="absolute top-14 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-30"
              >
                {getYearOptions().map((yr) => (
                  <div
                    key={yr}
                    id={`year-${yr}`}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      yr === currentMonth.getFullYear()
                        ? 'bg-blue-50 text-blue-600'
                        : ''
                    }`}
                    onClick={() => {
                      setCurrentMonth(new Date(yr, currentMonth.getMonth(), 1));
                      setIsYearSelectOpen(false);
                    }}
                  >
                    {yr}
                  </div>
                ))}
              </div>
            )}

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd) => (
                <div
                  key={wd}
                  className="h-8 w-8 flex items-center justify-center text-xs text-gray-500 font-medium"
                >
                  {wd}
                </div>
              ))}
            </div>

            {/* Day Cells */}
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>
        )}
      </div>

      {/* Inline error message */}
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DateField;
