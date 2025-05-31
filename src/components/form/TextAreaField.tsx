import React from 'react';

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  info?: string;
  rows?: number;
  fullWidth?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  info,
  rows = 4,
  fullWidth = true,
}) => {
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
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextAreaField;