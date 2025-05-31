import React from 'react';

interface StepNavigationProps {
  currentStepIndex: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStepIndex,
  totalSteps,
  onPrevious,
  onNext,
}) => {
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  
  return (
    <div className="flex justify-between items-center p-6 border-t border-gray-200">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
          isFirstStep
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
        }`}
      >
        Back
      </button>
      
      <button
        onClick={onNext}
        className="px-6 py-2 rounded-lg font-medium text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-950 transition-colors duration-200"
      >
        {isLastStep ? 'Next' : 'Next'}
      </button>
    </div>
  );
};

export default StepNavigation;