import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { degree: '', institution: '', year: '' }]);
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
        <h2 className="text-xl font-bold text-gray-800">Education</h2>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {data.map((edu, idx) => (
        <div key={idx} className="mb-4 p-4 border border-gray-200 rounded-lg space-y-2">
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleUpdate(idx, 'degree', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => handleUpdate(idx, 'institution', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => handleUpdate(idx, 'year', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleRemove(idx)}
            className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;