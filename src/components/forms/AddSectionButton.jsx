import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SECTION_OPTIONS } from '../../constants/sectionOptions';

const AddSectionButton = ({ onAdd }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleAdd = (option) => {
    onAdd(option);
    setShowOptions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!showOptions ? (
        <button
          onClick={() => setShowOptions(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Custom Section
        </button>
      ) : (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 mb-2">Select a section to add:</h3>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {SECTION_OPTIONS.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAdd(option)}
                className="px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg text-sm text-left"
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowOptions(false)}
            className="mt-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSectionButton;