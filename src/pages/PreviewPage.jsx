
import React, { useRef, useState } from 'react';
import { Edit3, Download, Printer, FileText, ZoomIn, ZoomOut } from 'lucide-react';
import { exportService } from '../services/exportService';

const PreviewPage = ({ resumeData, customSections, TemplateComponent, onEdit, sectionOrder }) => {
  const resumeRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const handlePrint = () => {
    exportService.printToPDF();
  };

  const handleSaveHTML = () => {
    exportService.saveAsHTML(resumeRef, resumeData);
  };

  const handleSaveWord = () => {
    exportService.saveAsWord(resumeRef, resumeData);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-content, #resume-content * { visibility: visible; }
          #resume-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%;
            transform: none !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>
      
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 no-print">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Resume Preview</h2>
              <p className="text-sm text-gray-500 mt-1">Zoom: {Math.round(zoom * 100)}%</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onEdit}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2 text-sm"
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={handleSaveHTML}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
              >
                <Download size={16} />
                <span>HTML</span>
              </button>
              <button
                onClick={handleSaveWord}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 text-sm"
              >
                <FileText size={16} />
                <span>Word</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 text-sm"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-xs sm:text-sm text-gray-600">
              <p className="mb-1">💡 <strong>Print to PDF:</strong> Click "Print", then select "Save as PDF"</p>
              <p>📄 <strong>HTML Export:</strong> Includes all formatting and can be opened in any browser</p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Resume Preview with Zoom */}
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
          <div 
            id="resume-content" 
            ref={resumeRef} 
            className="bg-white shadow-xl mx-auto transition-transform duration-200"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              width: '210mm',
              minHeight: '297mm'
            }}
          >
            {TemplateComponent && (
              <TemplateComponent 
                data={resumeData} 
                sections={customSections}
                sectionOrder={sectionOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;