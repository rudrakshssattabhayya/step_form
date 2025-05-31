import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ResumeData {
  template_name: string;
  personal_details: {
    name: string;
    email: string;
    mobile: string;
    linkedin?: string;
    github?: string;
    address: string;
  };
  objective: {
    description: string;
    bolds?: Record<string, boolean>;
    hyperlinks?: Record<string, string>;
  };
  education: Array<{
    college: string;
    location: string;
    degree: string;
    major?: string;
    from: string;
    to: string;
    cgpa?: string;
    description?: string[];
    bolds?: Record<string, boolean>;
    hyperlinks?: Record<string, string>;
  }>;
  work_experiences: Array<{
    title: string;
    sub_title: string;
    address: string;
    start_date: string;
    end_date: string;
    description: string[];
    bolds?: Record<string, boolean>;
    hyperlinks?: Record<string, string>;
  }>;
  other_experiences?: Array<{
    title: string;
    sub_title: string;
    address: string;
    start_date: string;
    end_date: string;
    description: string[];
    bolds?: Record<string, boolean>;
    hyperlinks?: Record<string, string>;
  }>;
  skills_and_certificates: {
    items: string[];
    bolds?: Record<string, boolean>;
    hyperlinks?: Record<string, string>;
  };
}

interface ResumeStore {
  data: ResumeData;
  currentStep: number;
  updateData: (newData: Partial<ResumeData>) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const initialData: ResumeData = {
  template_name: 'modern',
  personal_details: {
    name: '',
    email: '',
    mobile: '',
    address: ''
  },
  objective: {
    description: ''
  },
  education: [{
    college: '',
    location: '',
    degree: '',
    from: '',
    to: ''
  }],
  work_experiences: [{
    title: '',
    sub_title: '',
    address: '',
    start_date: '',
    end_date: '',
    description: ['']
  }],
  skills_and_certificates: {
    items: []
  }
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialData,
      currentStep: 0,
      updateData: (newData) => set((state) => ({
        data: { ...state.data, ...newData }
      })),
      setStep: (step) => set({ currentStep: step }),
      reset: () => set({ data: initialData, currentStep: 0 })
    }),
    {
      name: 'resume-storage'
    }
  )
);