
import React from 'react';
import { Trash2 } from 'lucide-react';
import RichTextEditor from '../common/RichTextEditor';

const CustomSectionForm = ({ section, index, onChange, onDelete }) => {
  const handleTitleChange = (value) => {
    onChange(index, { ...section, title: value });
  };

  const handleContentChange = (value) => {
    onChange(index, { ...section, content: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={section.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-xl font-bold text-gray-800 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={() => onDelete(index)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div className="quill-wrapper">
        <RichTextEditor
          value={section.content}
          onChange={handleContentChange}
          placeholder="Add content with rich formatting..."
        />
      </div>
    </div>
  );
};

export default CustomSectionForm;