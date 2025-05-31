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

  const updateFormData = useCallback((stepData: Record<string, any>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
  }, []);

  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);
  
  const validateCurrentStep = useCallback(() => {
    if (currentStep.validate) {
      const error = currentStep.validate();
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [currentStep.id]: error,
        }));
        return false;
      }
    }
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[currentStep.id];
      return newErrors;
    });
    return true;
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;
    
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete(formData);
    }
  }, [currentStepIndex, steps.length, validateCurrentStep, onComplete, formData]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }, [currentStepIndex]);

  const handleGoToStep = useCallback((index: number) => {
    if (index <= currentStepIndex || validateCurrentStep()) {
      setCurrentStepIndex(index);
    }
  }, [currentStepIndex, validateCurrentStep]);

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
      <div className="w-full lg:w-2/5 xl:w-1/3 bg-[#0c1b33]">
        <StepSidebar
          steps={steps}
          currentStepIndex={currentStepIndex}
          onStepClick={handleGoToStep}
          title={title}
          description={description}
        />
      </div>
      
      <div className="flex flex-col w-full lg:w-3/5 xl:w-2/3">
        <div className="flex-1 p-6 md:p-8">
          <div className="mb-3 text-blue-600 font-medium">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {currentStep.title}
          </h2>
          
          {CurrentStepComponent}
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