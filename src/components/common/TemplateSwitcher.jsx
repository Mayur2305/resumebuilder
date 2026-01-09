
import React, { useState } from 'react';
import { Layout, Check } from 'lucide-react';
import { TEMPLATES } from '../../constants/templates';

const TemplateSwitcher = ({ currentTemplateId, onTemplateChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
      >
        <Layout size={16} />
        <span className="hidden sm:inline">Switch Template</span>
        <span className="sm:hidden">Switch</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown - MOBILE RESPONSIVE FIX */}
          <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-gray-800">Select Template</h3>
            </div>
            
            <div className="p-2">
              {TEMPLATES.map(template => (
                <button
                  key={template.id}
                  onClick={() => {
                    onTemplateChange(template.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 flex items-center justify-between transition-colors ${
                    currentTemplateId === template.id ? 'bg-purple-50 border border-purple-200' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{template.name}</p>
                    <p className="text-xs text-gray-500 truncate">{template.preview}</p>
                  </div>
                  {currentTemplateId === template.id && (
                    <Check size={18} className="text-purple-600 flex-shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateSwitcher;