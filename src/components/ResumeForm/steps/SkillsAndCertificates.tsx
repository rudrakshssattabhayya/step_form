import React from 'react';
import FormRow from '../../form/FormRow';
import TextField from '../../form/TextField';
import { useResumeStore } from '../../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const SkillsAndCertificates: React.FC = () => {
  const { data, updateData } = useResumeStore();
  const { skills_and_certificates } = data;

  const addItem = () => {
    updateData({
      skills_and_certificates: {
        ...skills_and_certificates,
        items: [...skills_and_certificates.items, '']
      }
    });
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...skills_and_certificates.items];
    newItems[index] = value;
    updateData({
      skills_and_certificates: {
        ...skills_and_certificates,
        items: newItems
      }
    });
  };

  const removeItem = (index: number) => {
    const newItems = skills_and_certificates.items.filter((_, i) => i !== index);
    updateData({
      skills_and_certificates: {
        ...skills_and_certificates,
        items: newItems
      }
    });
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-400px)] overflow-y-auto pr-4">
      <div className="space-y-4">
        {skills_and_certificates.items.map((item, index) => (
          <FormRow key={index} fullWidth>
            <div className="flex gap-2">
              <TextField
                label={index === 0 ? "Skills & Certificates" : ""}
                value={item}
                onChange={(value) => updateItem(index, value)}
                placeholder="Enter skill or certificate"
                required={index === 0}
              />
              {skills_and_certificates.items.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="mt-8 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </FormRow>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={20} />
          Add Another Item
        </button>
      </div>
    </div>
  );
};

export default SkillsAndCertificates;