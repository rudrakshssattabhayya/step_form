import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import PersonalDetails from './steps/PersonalDetails';
import Objective from './steps/Objective';
import Education from './steps/Education';
import WorkExperience from './steps/WorkExperience';
import SkillsAndCertificates from './steps/SkillsAndCertificates';
import StepperForm, { FormStep } from '../StepperForm/StepperForm';
import { resumeSchema } from '../../lib/validation';

const steps: FormStep[] = [
  {
    id: 'personal-details',
    title: 'Personal Details',
    description: 'Basic information about you',
    component: <PersonalDetails />,
    validate: () => {
      try {
        resumeSchema.validateSync({
          personal_details: useResumeStore.getState().data.personal_details
        });
        return null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'objective',
    title: 'Career Objective',
    description: 'Your career goals and aspirations',
    component: <Objective />,
    validate: () => {
      try {
        resumeSchema.validateSync({
          objective: useResumeStore.getState().data.objective
        });
        return null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Your academic background',
    component: <Education />,
    validate: () => {
      try {
        resumeSchema.validateSync({
          education: useResumeStore.getState().data.education
        });
        return null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'work-experience',
    title: 'Work Experience',
    description: 'Your professional experience',
    component: <WorkExperience />,
    validate: () => {
      try {
        resumeSchema.validateSync({
          work_experiences: useResumeStore.getState().data.work_experiences
        });
        return null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'skills',
    title: 'Skills & Certificates',
    description: 'Your skills and certifications',
    component: <SkillsAndCertificates />,
    validate: () => {
      try {
        resumeSchema.validateSync({
          skills_and_certificates: useResumeStore.getState().data.skills_and_certificates
        });
        return null;
      } catch (error) {
        return error.message;
      }
    }
  }
];

const ResumeForm: React.FC = () => {
  const { data, reset } = useResumeStore();

  const handleComplete = async (formData: any) => {
    try {
      await resumeSchema.validate(formData);
      console.log('Form submitted successfully:', formData);
      // Here you would typically send the data to your backend
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <StepperForm
          steps={steps}
          onComplete={handleComplete}
          initialData={data}
          title="Resume Builder"
          description="Create your professional resume step by step"
        />
      </div>
    </div>
  );
};

export default ResumeForm;