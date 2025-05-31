import React from 'react';
import FormRow from '../../form/FormRow';
import TextField from '../../form/TextField';
import DateField from '../../form/DateField';
import TextAreaField from '../../form/TextAreaField';
import { useResumeStore } from '../../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const WorkExperience: React.FC = () => {
  const { data, updateData } = useResumeStore();
  const { work_experiences } = data;

  const handleChange = (index: number, field: string, value: string | string[]) => {
    const newExperiences = [...work_experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };
    updateData({ work_experiences: newExperiences });
  };

  const addExperience = () => {
    updateData({
      work_experiences: [
        ...work_experiences,
        {
          title: '',
          sub_title: '',
          address: '',
          start_date: '',
          end_date: '',
          description: ['']
        }
      ]
    });
  };

  const removeExperience = (index: number) => {
    const newExperiences = work_experiences.filter((_, i) => i !== index);
    updateData({ work_experiences: newExperiences });
  };

  const addDescriptionPoint = (index: number) => {
    const newExperiences = [...work_experiences];
    newExperiences[index].description = [...newExperiences[index].description, ''];
    updateData({ work_experiences: newExperiences });
  };

  const updateDescriptionPoint = (expIndex: number, pointIndex: number, value: string) => {
    const newExperiences = [...work_experiences];
    newExperiences[expIndex].description[pointIndex] = value;
    updateData({ work_experiences: newExperiences });
  };

  const removeDescriptionPoint = (expIndex: number, pointIndex: number) => {
    const newExperiences = [...work_experiences];
    newExperiences[expIndex].description = newExperiences[expIndex].description.filter(
      (_, i) => i !== pointIndex
    );
    updateData({ work_experiences: newExperiences });
  };

  return (
    <div className="space-y-8 max-h-[calc(100vh-400px)] overflow-y-auto pr-4">
      {work_experiences.map((exp, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg relative">
          {work_experiences.length > 1 && (
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          )}

          <FormRow fullWidth>
            <TextField
              label="Job Title"
              value={exp.title}
              onChange={(value) => handleChange(index, 'title', value)}
              required
              placeholder="Senior Software Engineer"
            />
          </FormRow>

          <FormRow fullWidth>
            <TextField
              label="Company Name"
              value={exp.sub_title}
              onChange={(value) => handleChange(index, 'sub_title', value)}
              required
              placeholder="Company Name"
            />
          </FormRow>

          <FormRow fullWidth>
            <TextField
              label="Location"
              value={exp.address}
              onChange={(value) => handleChange(index, 'address', value)}
              required
              placeholder="City, Country"
            />
          </FormRow>

          <FormRow fullWidth={false}>
            <DateField
              label="Start Date"
              value={exp.start_date}
              onChange={(value) => handleChange(index, 'start_date', value)}
              required
            />
            <DateField
              label="End Date"
              value={exp.end_date}
              onChange={(value) => handleChange(index, 'end_date', value)}
              required
            />
          </FormRow>

          <div className="mt-6 space-y-4">
            <label className="block text-gray-700 font-medium">
              Description Points
              {exp.description.length > 1 && <span className="text-sm text-gray-500 ml-2">(Minimum 1 required)</span>}
            </label>
            
            {exp.description.map((point, pointIndex) => (
              <div key={pointIndex} className="flex gap-2">
                <TextAreaField
                  value={point}
                  onChange={(value) => updateDescriptionPoint(index, pointIndex, value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
                {exp.description.length > 1 && (
                  <button
                    onClick={() => removeDescriptionPoint(index, pointIndex)}
                    className="mt-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => addDescriptionPoint(index)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus size={16} />
              Add Description Point
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={20} />
          Add Another Experience
        </button>
      </div>
    </div>
  );
};

export default WorkExperience;