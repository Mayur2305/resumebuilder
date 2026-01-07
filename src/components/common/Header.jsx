
import React from 'react';
import { Edit3, Eye, Menu } from 'lucide-react';

const Header = ({ onChangeTemplate, onPreview, showMobileMenu }) => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Resume Builder</h1>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onChangeTemplate}
            className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 text-sm sm:text-base"
          >
            <Edit3 size={16} />
            <span className="hidden sm:inline">Change</span>
          </button>
          <button
            onClick={onPreview}
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm sm:text-base"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;