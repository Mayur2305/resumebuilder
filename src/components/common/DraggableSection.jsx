
import React from 'react';
import { GripVertical } from 'lucide-react';

const DraggableSection = ({ 
  children, 
  index, 
  draggedIndex,
  onDragStart, 
  onDragOver, 
  onDrop, 
  onDragEnd 
}) => {
  const isDragging = draggedIndex === index;
  const isDragOver = draggedIndex !== null && draggedIndex !== index;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
      onDragEnd={onDragEnd}
      className={`relative transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${isDragOver ? 'mt-2' : ''}`}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move z-10 bg-white rounded p-1 shadow-sm hover:shadow-md transition-shadow">
        <GripVertical size={20} className="text-gray-400 hover:text-gray-600" />
      </div>
      <div className="ml-8">
        {children}
      </div>
    </div>
  );
};

export default DraggableSection;