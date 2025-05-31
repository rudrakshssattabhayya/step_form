import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  info?: string;
  fullWidth?: boolean;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  info,
  fullWidth = true,
  placeholder = 'Select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
        >
          <span className={selectedOption ? 'text-gray-800' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                  option.value === value ? 'bg-blue-100' : ''
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;