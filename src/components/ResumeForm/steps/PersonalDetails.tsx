import React from 'react';
import FormRow from '../../form/FormRow';
import TextField from '../../form/TextField';
import { useResumeStore } from '../../../store/useResumeStore';

const PersonalDetails: React.FC = () => {
  const { data, updateData } = useResumeStore();
  const { personal_details } = data;

  const handleChange = (field: string, value: string) => {
    updateData({
      personal_details: {
        ...personal_details,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-400px)] overflow-y-auto pr-4">
      <FormRow fullWidth>
        <TextField
          label="Full Name"
          value={personal_details.name}
          onChange={(value) => handleChange('name', value)}
          required
          placeholder="John Doe"
        />
      </FormRow>

      <FormRow fullWidth={false}>
        <TextField
          label="Email"
          value={personal_details.email}
          onChange={(value) => handleChange('email', value)}
          required
          placeholder="john.doe@example.com"
        />
        <TextField
          label="Mobile"
          value={personal_details.mobile}
          onChange={(value) => handleChange('mobile', value)}
          required
          placeholder="+1 (555) 123-4567"
        />
      </FormRow>

      <FormRow fullWidth={false}>
        <TextField
          label="LinkedIn URL"
          value={personal_details.linkedin || ''}
          onChange={(value) => handleChange('linkedin', value)}
          placeholder="https://linkedin.com/in/johndoe"
        />
        <TextField
          label="GitHub URL"
          value={personal_details.github || ''}
          onChange={(value) => handleChange('github', value)}
          placeholder="https://github.com/johndoe"
        />
      </FormRow>

      <FormRow fullWidth>
        <TextField
          label="Address"
          value={personal_details.address}
          onChange={(value) => handleChange('address', value)}
          required
          placeholder="123 Main St, City, State, Country"
        />
      </FormRow>
    </div>
  );
};

export default PersonalDetails;