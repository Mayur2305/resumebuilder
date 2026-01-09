import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import LineSpacingControl from './LineSpacingControl';

const MobilePreviewModal = ({ isOpen, onClose, lineSpacing, setLineSpacing, children }) => {
  const [zoom, setZoom] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    setZoom(0.5);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col" onClick={onClose}>
      <div 
        className="bg-white border-b border-gray-200 p-3 flex flex-col gap-2 sticky top-0 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-800">Preview</h3>
            <span className="text-xs text-gray-500">{Math.round(zoom * 100)}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded-lg" title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <button onClick={handleResetZoom} className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg">
              Reset
            </button>
            <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded-lg" title="Zoom In">
              <ZoomIn size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button onClick={toggleFullscreen} className="p-2 hover:bg-gray-100 rounded-lg">
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg" title="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        <LineSpacingControl 
          lineSpacing={lineSpacing}
          onChange={setLineSpacing}
        />
      </div>

      <div 
        className={`flex-1 overflow-auto bg-gray-100 ${isFullscreen ? 'p-0' : 'p-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className={`mx-auto bg-white shadow-lg transition-transform duration-200 a4-page line-spacing-${lineSpacing}`}
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'top center'
          }}
        >
          {children}
        </div>
      </div>

      <div 
        className="bg-white border-t border-gray-200 p-2 text-center text-xs text-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        <p>💡 Use controls to adjust view • Tap outside or X to close</p>
      </div>
    </div>
  );
};

export default MobilePreviewModal;