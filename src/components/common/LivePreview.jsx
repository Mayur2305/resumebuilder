
import React from 'react';
import LineSpacingControl from './LineSpacingControl';

const LivePreview = ({ 
  TemplateComponent, 
  data, 
  sections, 
  sectionOrder,
  lineSpacing,
  setLineSpacing 
}) => {
  return (
    <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">Live Preview</h3>
        </div>
        
        <div className="mb-3">
          <LineSpacingControl 
            lineSpacing={lineSpacing}
            onChange={setLineSpacing}
          />
        </div>
        
        <div className="overflow-auto border border-gray-200 rounded bg-gray-100 p-4" style={{ maxHeight: '75vh' }}>
          <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%' }}>
            <div className={`a4-page line-spacing-${lineSpacing}`}>
              {TemplateComponent && (
                <TemplateComponent 
                  data={data} 
                  sections={sections}
                  sectionOrder={sectionOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;