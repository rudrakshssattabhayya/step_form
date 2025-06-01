import React, { useState, useCallback, useMemo } from 'react';
import StepSidebar from './StepSidebar';
import StepNavigation from './StepNavigation';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
  validate?: () => string | null;
}

interface StepperFormProps {
  steps: FormStep[];
  onComplete: (data: any) => void;
  initialData?: Record<string, any>;
  className?: string;
  title: string;
  description: string;
}

const StepperForm: React.FC<StepperFormProps> = ({
  steps,
  onComplete,
  initialData = {},
  className = '',
  title,
  description,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));

  const updateFormData = useCallback((stepData: Record<string, any>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
  }, []);

  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);

  const validateStep = useCallback((stepIndex: number) => {
    const step = steps[stepIndex];
    if (step.validate) {
      const error = step.validate();
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [step.id]: error,
        }));
        return false;
      }
    }
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[step.id];
      return newErrors;
    });
    return true;
  }, [steps]);

  const handleNext = useCallback(() => {
    if (!validateStep(currentStepIndex)) return;

    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setVisitedSteps(prev => new Set(prev).add(nextIndex));
      setCurrentStepIndex(nextIndex);
    } else {
      onComplete(formData);
    }
  }, [currentStepIndex, steps.length, validateStep, onComplete, formData]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }, [currentStepIndex]);

  const handleGoToStep = useCallback((index: number) => {
    if (visitedSteps.has(index) || index === Math.min(...Array.from(visitedSteps)) + 1) {
      if (index > currentStepIndex) {
        for (let i = currentStepIndex; i < index; i++) {
          if (!validateStep(i)) return;
        }
      }
      setCurrentStepIndex(index);
    }
  }, [currentStepIndex, validateStep, visitedSteps]);

  const CurrentStepComponent = useMemo(() => {
    const StepComponent = currentStep.component;
    if (React.isValidElement(StepComponent)) {
      return React.cloneElement(StepComponent, {
        formData,
        updateFormData,
        error: errors[currentStep.id],
      });
    }
    return StepComponent;
  }, [currentStep.component, formData, updateFormData, errors, currentStep.id]);

  return (
    <div className={`flex flex-col lg:flex-row rounded-xl overflow-hidden bg-white shadow-xl ${className}`}>
      <div className="w-full lg:w-1/3 xl:w-1/4 bg-[#0c1b33] min-h-[300px] lg:min-h-[600px]">
        <StepSidebar
          steps={steps}
          currentStepIndex={currentStepIndex}
          onStepClick={handleGoToStep}
          title={title}
          description={description}
          visitedSteps={visitedSteps}
        />
      </div>
      
      <div className="flex flex-col w-full lg:w-2/3 xl:w-3/4">
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="mb-3 text-blue-600 font-medium">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {currentStep.title}
          </h2>
          
          {errors[currentStep.id] && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {errors[currentStep.id]}
            </div>
          )}
          
          <div className="max-w-3xl">
            {CurrentStepComponent}
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="h-2 bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
          
          <StepNavigation
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default StepperForm;