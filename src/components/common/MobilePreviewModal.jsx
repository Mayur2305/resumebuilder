
import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

const MobilePreviewModal = ({ isOpen, onClose, children }) => {
  const [zoom, setZoom] = useState(0.5); // Start at 50% zoom
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5)); // Max 150%
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3)); // Min 30%
  };

  const handleResetZoom = () => {
    setZoom(0.5);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col" onClick={onClose}>
      {/* Header Controls */}
      <div 
        className="bg-white border-b border-gray-200 p-3 flex justify-between items-center sticky top-0 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-gray-800">Preview</h3>
          <span className="text-xs text-gray-500">{Math.round(zoom * 100)}%</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
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
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div 
        className={`flex-1 overflow-auto bg-gray-100 ${isFullscreen ? 'p-0' : 'p-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="mx-auto bg-white shadow-lg transition-transform duration-200"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            width: '210mm',
            minHeight: '297mm'
          }}
        >
          {children}
        </div>
      </div>

      {/* Bottom Instructions */}
      <div 
        className="bg-white border-t border-gray-200 p-3 text-center text-xs text-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        <p>💡 Use zoom controls to adjust view • Tap outside or X to close</p>
      </div>
    </div>
  );
};

export default MobilePreviewModal;