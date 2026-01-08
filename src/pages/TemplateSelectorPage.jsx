
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../constants/templates';

const TemplateSelectorPage = ({ onSelect, selectedTemplate }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2 shadow-md"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Template
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Select from 10 professional, ATS-optimized templates
          </p>
        </div>
        
        <div className="template-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {TEMPLATES.map(template => (
            <div
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
                selectedTemplate === template.id ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              <div className="h-32 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">📄</div>
                  <p className="text-xs text-gray-600 px-2">{template.preview}</p>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center">
                {template.name}
              </h3>
              <p className="text-xs text-gray-500 text-center mt-1">
                100% ATS Compatible
              </p>
              {selectedTemplate === template.id && (
                <div className="mt-2 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                    Selected
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectorPage;