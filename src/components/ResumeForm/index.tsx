import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import PersonalDetails from './steps/PersonalDetails';
import Objective from './steps/Objective';
import Education from './steps/Education';
import WorkExperience from './steps/WorkExperience';
import SkillsAndCertificates from './steps/SkillsAndCertificates';
import StepNavigation from './StepNavigation';
import StepProgress from './StepProgress';

const steps = [
  {
    title: 'Personal Details',
    component: PersonalDetails
  },
  {
    title: 'Objective',
    component: Objective
  },
  {
    title: 'Education',
    component: Education
  },
  {
    title: 'Work Experience',
    component: WorkExperience
  },
  {
    title: 'Skills & Certificates',
    component: SkillsAndCertificates
  }
];

const ResumeForm: React.FC = () => {
  const { currentStep, setStep } = useResumeStore();
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <StepProgress steps={steps} currentStep={currentStep} />
            
            <div className="mt-8">
              <CurrentStepComponent />
            </div>
            
            <StepNavigation 
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={() => setStep(Math.min(currentStep + 1, steps.length - 1))}
              onPrev={() => setStep(Math.max(currentStep - 1, 0))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;