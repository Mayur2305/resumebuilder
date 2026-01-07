
import React from 'react';

const LivePreview = ({ TemplateComponent, data, sections, sectionOrder }) => {
  return (
    <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Live Preview</h3>
        <div className="overflow-auto border border-gray-200 rounded" style={{ maxHeight: '80vh' }}>
          <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%' }}>
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
  );
};

export default LivePreview;