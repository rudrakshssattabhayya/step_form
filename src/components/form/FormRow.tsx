import React from 'react';

interface FormRowProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const FormRow: React.FC<FormRowProps> = ({ children, fullWidth = true }) => {
  // If fullWidth is true, display children in a single column
  // If false, display children in a row with equal width columns
  
  if (fullWidth) {
    return <div className="w-full">{children}</div>;
  }
  
  // Convert children to an array to handle them properly
  const childrenArray = React.Children.toArray(children);
  
  // Apply the proper width to each child based on the number of children
  return (
    <div className="flex flex-wrap -mx-2">
      {childrenArray.map((child, index) => (
        <div 
          key={index} 
          className={`px-2 ${
            childrenArray.length === 1 
              ? 'w-full' 
              : childrenArray.length === 2 
                ? 'w-1/2 md:w-1/2' 
                : 'w-full md:w-1/3'
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default FormRow;