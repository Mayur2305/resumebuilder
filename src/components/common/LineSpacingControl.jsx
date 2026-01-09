
import React from 'react';
import { AlignJustify } from 'lucide-react';

const LineSpacingControl = ({ lineSpacing, onChange }) => {
  const spacingOptions = [
    { value: 'tight', label: 'Tight', description: '1.2' },
    { value: 'normal', label: 'Normal', description: '1.4' },
    { value: 'relaxed', label: 'Relaxed', description: '1.6' },
    { value: 'loose', label: 'Loose', description: '1.8' }
  ];

  return (
    <div className="flex items-center gap-2">
      <AlignJustify size={16} className="text-gray-600" />
      <span className="text-sm text-gray-700 hidden sm:inline">Line Spacing:</span>
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {spacingOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
              lineSpacing === option.value
                ? 'bg-white text-blue-600 font-semibold shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            title={`${option.label} (${option.description})`}
          >
            <span className="hidden sm:inline">{option.label}</span>
            <span className="sm:hidden">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LineSpacingControl;