
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import RichTextEditor from '../common/RichTextEditor';

const ExperienceForm = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { position: '', company: '', duration: '', description: '' }]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Experience</h2>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {data.map((exp, idx) => (
        <div key={idx} className="mb-4 p-4 border border-gray-200 rounded-lg space-y-2">
          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) => handleUpdate(idx, 'position', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleUpdate(idx, 'company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Duration (e.g., Jan 2020 - Present)"
            value={exp.duration}
            onChange={(e) => handleUpdate(idx, 'duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="quill-wrapper">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <RichTextEditor
              value={exp.description}
              onChange={(value) => handleUpdate(idx, 'description', value)}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
          <button
            onClick={() => handleRemove(idx)}
            className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 mt-2"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;