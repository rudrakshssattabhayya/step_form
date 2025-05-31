import React, { useState, useRef, useEffect } from 'react';

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
  const calendarRef = useRef<HTMLDivElement>(null);
  
  const selectedDate = value ? new Date(value) : null;
  
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    } else {
      setCurrentMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add cells for all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() && 
        date.getMonth() === selectedDate.getMonth() && 
        date.getFullYear() === selectedDate.getFullYear();
      
      const isToday = 
        date.getDate() === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear();

      days.push(
        <div 
          key={`day-${day}`} 
          onClick={() => {
            onChange(date.toISOString().split('T')[0]);
            setIsCalendarOpen(false);
          }}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${isSelected ? 'bg-blue-600 text-white' : isToday ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className={`mb-6 ${fullWidth ? 'w-full' : 'w-full'}`}>
      <div className="flex items-center mb-2">
        <label className="text-gray-700 font-medium">{label}</label>
        {required && <span className="text-red-500 ml-1">*</span>}
        {info && (
          <div className="ml-2 relative group">
            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 cursor-help">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div className="absolute left-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {info}
              <div className="absolute top-full left-3 transform -translate-x-1/2 -translate-y-px border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="relative" ref={calendarRef}>
        <div 
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className={`w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
        >
          <span className={value ? 'text-gray-800' : 'text-gray-400'}>
            {value ? formatDisplayDate(value) : placeholder}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        
        {isCalendarOpen && (
          <div className="absolute z-20 mt-1 p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div className="font-medium">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="h-8 w-8 flex items-center justify-center text-xs text-gray-500 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DateField;