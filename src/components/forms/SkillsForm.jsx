import React from 'react';
import { Plus, X } from 'lucide-react';

const SkillsForm = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([...data, { name: '' }]);
  };

  const handleUpdate = (index, value) => {
    const updated = [...data];
    updated[index].name = value;
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <input
              type="text"
              placeholder="Skill"
              value={skill.name}
              onChange={(e) => handleUpdate(idx, e.target.value)}
              className="bg-transparent border-none focus:outline-none w-32"
            />
            <button
              onClick={() => handleRemove(idx)}
              className="text-red-600 hover:text-red-800"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;