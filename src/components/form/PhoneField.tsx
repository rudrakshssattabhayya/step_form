import React, { useState, useEffect } from 'react';

interface PhoneFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  info?: string;
  fullWidth?: boolean;
  placeholder?: string;
  countryCode?: string;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  error,
  info,
  fullWidth = true,
  placeholder = 'Enter phone number',
  countryCode = '+1',
}) => {
  const [inputValue, setInputValue] = useState(value.replace(countryCode, ''));
  const [validationError, setValidationError] = useState('');
  
  useEffect(() => {
    // When value changes from outside component
    if (value && !value.includes(inputValue) && value !== countryCode + inputValue) {
      setInputValue(value.replace(countryCode, ''));
    }
  }, [value, countryCode, inputValue]);

  const formatPhoneNumber = (input: string) => {
    // Remove non-digit characters
    const digitsOnly = input.replace(/\D/g, '');
    
    // Format the phone number as (XXX) XXX-XXXX for US numbers
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedInput = formatPhoneNumber(input);
    setInputValue(formattedInput);
    
    // Update parent with full value including country code
    onChange(countryCode + formattedInput.replace(/\D/g, ''));
    
    // Basic validation (at least 10 digits for US numbers)
    const digitsOnly = formattedInput.replace(/\D/g, '');
    if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setValidationError('Please enter a valid phone number');
    } else {
      setValidationError('');
    }
  };

  const displayError = error || validationError;

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
      
      <div className="flex w-full">
        <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 flex items-center justify-center text-gray-600 font-medium">
          {countryCode}
        </div>
        <input
          type="tel"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`flex-grow px-4 py-3 rounded-r-lg border ${
            displayError ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
        />
      </div>
      
      {displayError && <p className="mt-1 text-red-500 text-sm">{displayError}</p>}
    </div>
  );
};

export default PhoneField;