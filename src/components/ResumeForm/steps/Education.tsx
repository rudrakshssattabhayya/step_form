import React from 'react';
import FormRow from '../../form/FormRow';
import TextField from '../../form/TextField';
import DateField from '../../form/DateField';
import { useResumeStore } from '../../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const Education: React.FC = () => {
  const { data, updateData } = useResumeStore();
  const { education } = data;

  const handleChange = (index: number, field: string, value: string) => {
    const newEducation = [...education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    updateData({ education: newEducation });
  };

  const addEducation = () => {
    updateData({
      education: [
        ...education,
        {
          college: '',
          location: '',
          degree: '',
          major: '',
          from: '',
          to: '',
          cgpa: '',
          description: []
        }
      ]
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    updateData({ education: newEducation });
  };

  return (
    <div className="space-y-8 max-h-[calc(100vh-400px)] overflow-y-auto pr-4">
      {education.map((edu, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg relative">
          {education.length > 1 && (
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          )}
          
          <FormRow fullWidth>
            <TextField
              label="College/University"
              value={edu.college}
              onChange={(value) => handleChange(index, 'college', value)}
              required
              placeholder="University Name"
            />
          </FormRow>

          <FormRow fullWidth={false}>
            <TextField
              label="Location"
              value={edu.location}
              onChange={(value) => handleChange(index, 'location', value)}
              required
              placeholder="City, Country"
            />
            <TextField
              label="Degree"
              value={edu.degree}
              onChange={(value) => handleChange(index, 'degree', value)}
              required
              placeholder="Bachelor of Science"
            />
          </FormRow>

          <FormRow fullWidth={false}>
            <TextField
              label="Major"
              value={edu.major || ''}
              onChange={(value) => handleChange(index, 'major', value)}
              placeholder="Computer Science"
            />
            <TextField
              label="CGPA"
              value={edu.cgpa || ''}
              onChange={(value) => handleChange(index, 'cgpa', value)}
              placeholder="3.8"
            />
          </FormRow>

          <FormRow fullWidth={false}>
            <DateField
              label="From"
              value={edu.from}
              onChange={(value) => handleChange(index, 'from', value)}
              required
            />
            <DateField
              label="To"
              value={edu.to}
              onChange={(value) => handleChange(index, 'to', value)}
              required
            />
          </FormRow>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={20} />
          Add Another Education
        </button>
      </div>
    </div>
  );
};

export default Education;