import React from 'react';
import type { FormStep } from './StepperForm';

interface StepSidebarProps {
  steps: FormStep[];
  currentStepIndex: number;
  onStepClick: (index: number) => void;
  title: string;
  description: string;
  visitedSteps: Set<number>;
}

const StepSidebar: React.FC<StepSidebarProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  title,
  description,
  visitedSteps,
}) => {
  return (
    <div className="p-8 h-full">
      <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
      <p className="text-gray-300 mb-8">{description}</p>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = visitedSteps.has(index) && index < currentStepIndex;
          const isClickable = visitedSteps.has(index) || index === Math.min(...Array.from(visitedSteps)) + 1;
          
          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg transition-colors duration-200 ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              } ${
                isActive 
                  ? 'bg-teal-50/10' 
                  : isCompleted 
                    ? 'bg-teal-50/5' 
                    : 'bg-transparent hover:bg-white/5'
              }`}
              onClick={() => isClickable && onStepClick(index)}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg\" width="16\" height="16\" viewBox="0 0 24 24\" fill="none\" stroke="white\" strokeWidth="2\" strokeLinecap="round\" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-teal-500 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                <div>
                  <div className={`font-medium ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`}>
                    Step {index + 1}: {step.title}
                  </div>
                  {step.description && (
                    <div className={`text-sm mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepSidebar;