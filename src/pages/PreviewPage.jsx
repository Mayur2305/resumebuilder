
import React, { useRef } from 'react';
import { Edit3, Download, Printer, FileText, ZoomIn, ZoomOut, FileEdit } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { exportService } from '../services/exportService';
import TemplateSwitcher from '../components/common/TemplateSwitcher';
import LineSpacingControl from '../components/common/LineSpacingControl';
import { TEMPLATES } from '../constants/templates';

const PreviewPage = ({ 
  resumeData, 
  customSections, 
  sectionOrder, 
  TemplateComponent,
  lineSpacing,
  setLineSpacing,
  onEdit, 
  onChangeTemplate 
}) => {
  const resumeRef = useRef(null);
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [zoom, setZoom] = React.useState(0.7);

  const currentTemplateId = parseInt(templateId);

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
    setZoom(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    setZoom(0.7);
  };

  const handleTemplateChange = (newTemplateId) => {
    navigate(`/preview/${newTemplateId}`);
  };

  const handleDocumentEditor = () => {
    navigate(`/document-editor/${currentTemplateId}`);
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
          .preview-scale-wrapper { transform: none !important; }
        }
      `}</style>
      
      <div className="max-w-full mx-auto">
        {/* Control Panel */}
        <div className="bg-white shadow-md p-3 sm:p-4 md:p-6 no-print sticky top-0 z-30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-3">
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Resume Preview</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Zoom: {Math.round(zoom * 100)}% • A4 Size (210mm × 297mm)
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={onEdit}
                    className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <Edit3 size={16} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={handleDocumentEditor}
                    className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <FileEdit size={16} />
                    <span className="hidden sm:inline">Doc Editor</span>
                    <span className="sm:hidden">Doc</span>
                  </button>
                  
                  <TemplateSwitcher 
                    currentTemplateId={currentTemplateId}
                    onTemplateChange={handleTemplateChange}
                  />
                  
                  <button
                    onClick={handleSaveHTML}
                    className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <Download size={16} />
                    <span className="hidden sm:inline">HTML</span>
                  </button>
                  <button
                    onClick={handleSaveWord}
                    className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <FileText size={16} />
                    <span className="hidden sm:inline">Word</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <Printer size={16} />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t pt-3">
                <LineSpacingControl 
                  lineSpacing={lineSpacing}
                  onChange={setLineSpacing}
                />
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    70%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resume Preview - SPACING APPLIED HERE */}
        <div className="resume-pages-container">
          <div 
            className="preview-scale-wrapper"
            style={{ transform: `scale(${zoom})` }}
          >
            <div 
              id="resume-content" 
              ref={resumeRef}
              className={`a4-page line-spacing-${lineSpacing}`}
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
    </div>
  );
};

export default PreviewPage;