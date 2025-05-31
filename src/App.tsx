import React, { useState } from 'react';
import StepperForm, { FormStep } from './components/StepperForm/StepperForm';
import FormRow from './components/form/FormRow';
import TextField from './components/form/TextField';
import TextAreaField from './components/form/TextAreaField';
import SelectField from './components/form/SelectField';
import DateField from './components/form/DateField';
import PhoneField from './components/form/PhoneField';

const PersonalInfoStep: React.FC<{
  formData: any;
  updateFormData: (data: any) => void;
  error?: string;
}> = ({ formData, updateFormData }) => {
  return (
    <div>
      <FormRow fullWidth>
        <TextField
          label="Full Name"
          value={formData.fullName || ''}
          onChange={(value) => updateFormData({ fullName: value })}
          required
          info="Enter your legal full name"
        />
      </FormRow>
      
      <FormRow fullWidth={false}>
        <TextField
          label="Email Address"
          value={formData.email || ''}
          onChange={(value) => updateFormData({ email: value })}
          placeholder="example@domain.com"
          required
          fullWidth={false}
        />
        
        <PhoneField
          label="Phone Number"
          value={formData.phone || ''}
          onChange={(value) => updateFormData({ phone: value })}
          required
          fullWidth={false}
        />
      </FormRow>
      
      <FormRow fullWidth>
        <TextAreaField
          label="About"
          value={formData.about || ''}
          onChange={(value) => updateFormData({ about: value })}
          placeholder="Tell us about yourself"
          rows={4}
        />
      </FormRow>
    </div>
  );
};

const WorkInfoStep: React.FC<{
  formData: any;
  updateFormData: (data: any) => void;
  error?: string;
}> = ({ formData, updateFormData }) => {
  return (
    <div>
      <FormRow fullWidth>
        <TextField
          label="Company Name"
          value={formData.company || ''}
          onChange={(value) => updateFormData({ company: value })}
          required
        />
      </FormRow>
      
      <FormRow fullWidth={false}>
        <SelectField
          label="Job Title"
          value={formData.jobTitle || ''}
          onChange={(value) => updateFormData({ jobTitle: value })}
          options={[
            { value: 'developer', label: 'Developer' },
            { value: 'designer', label: 'Designer' },
            { value: 'manager', label: 'Manager' },
            { value: 'director', label: 'Director' },
            { value: 'other', label: 'Other' },
          ]}
          required
          fullWidth={false}
        />
        
        <SelectField
          label="Department"
          value={formData.department || ''}
          onChange={(value) => updateFormData({ department: value })}
          options={[
            { value: 'engineering', label: 'Engineering' },
            { value: 'design', label: 'Design' },
            { value: 'product', label: 'Product' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'sales', label: 'Sales' },
            { value: 'other', label: 'Other' },
          ]}
          fullWidth={false}
        />
      </FormRow>
      
      <FormRow fullWidth={false}>
        <DateField
          label="Start Date"
          value={formData.startDate || ''}
          onChange={(value) => updateFormData({ startDate: value })}
          required
          fullWidth={false}
        />
        
        <TextField
          label="Location"
          value={formData.location || ''}
          onChange={(value) => updateFormData({ location: value })}
          placeholder="City, Country"
          fullWidth={false}
        />
      </FormRow>
    </div>
  );
};

const AdditionalInfoStep: React.FC<{
  formData: any;
  updateFormData: (data: any) => void;
  error?: string;
}> = ({ formData, updateFormData }) => {
  return (
    <div>
      <FormRow fullWidth>
        <TextField
          label="Website"
          value={formData.website || ''}
          onChange={(value) => updateFormData({ website: value })}
          placeholder="https://"
        />
      </FormRow>
      
      <FormRow fullWidth={false}>
        <SelectField
          label="Category"
          value={formData.category || ''}
          onChange={(value) => updateFormData({ category: value })}
          options={[
            { value: 'technology', label: 'Technology' },
            { value: 'finance', label: 'Finance' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'education', label: 'Education' },
            { value: 'other', label: 'Other' },
          ]}
          fullWidth={false}
        />
        
        <SelectField
          label="Level"
          value={formData.level || ''}
          onChange={(value) => updateFormData({ level: value })}
          options={[
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
            { value: 'expert', label: 'Expert' },
          ]}
          fullWidth={false}
        />
      </FormRow>
      
      <FormRow fullWidth>
        <TextAreaField
          label="Additional Comments"
          value={formData.comments || ''}
          onChange={(value) => updateFormData({ comments: value })}
          placeholder="Any other information you'd like to share"
          rows={4}
        />
      </FormRow>
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps: FormStep[] = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: <PersonalInfoStep formData={formData} updateFormData={(data) => setFormData({...formData, ...data})} />,
      validate: () => {
        if (!formData.fullName) return 'Full name is required';
        if (!formData.email) return 'Email is required';
        if (!formData.phone) return 'Phone number is required';
        return null;
      }
    },
    {
      id: 'work-info',
      title: 'Work Information',
      description: 'Your work details',
      component: <WorkInfoStep formData={formData} updateFormData={(data) => setFormData({...formData, ...data})} />,
      validate: () => {
        if (!formData.company) return 'Company name is required';
        if (!formData.jobTitle) return 'Job title is required';
        if (!formData.startDate) return 'Start date is required';
        return null;
      }
    },
    {
      id: 'additional-info',
      title: 'Additional Information',
      description: 'Other relevant details',
      component: <AdditionalInfoStep formData={formData} updateFormData={(data) => setFormData({...formData, ...data})} />
    }
  ];

  const handleComplete = (data: any) => {
    console.log('Form submitted with data:', data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Multi-Step Form Example</h1>
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-700 transition-colors duration-200">
            Return Home
          </button>
        </div>
        
        {!isSubmitted ? (
          <StepperForm
            steps={steps}
            onComplete={handleComplete}
            initialData={formData}
            title="Registration Form"
            description="Complete all steps to finish registration"
          />
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Form Submitted Successfully</h2>
              <p className="text-gray-600 mt-2">Thank you for completing the form.</p>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => {
                  setFormData({});
                  setIsSubmitted(false);
                }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;