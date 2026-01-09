
import React, { useRef, useState } from 'react';
import { 
  ArrowLeft, Save, Download, Printer, 
  Type, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline, List, ListOrdered
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { TEMPLATES } from '../constants/templates';
import LineSpacingControl from '../components/common/LineSpacingControl';

const DocumentEditorPage = ({ 
  resumeData, 
  customSections, 
  sectionOrder,
  lineSpacing,
  setLineSpacing,
  onBack 
}) => {
  const { templateId } = useParams();
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState('11pt');
  const [fontFamily, setFontFamily] = useState('Arial');
  const currentTemplateId = parseInt(templateId);
  const TemplateComponent = TEMPLATES.find(t => t.id === currentTemplateId)?.component;

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    setFontSize(size);
    handleFormat('fontSize', '7'); // Use size 7, then override with CSS
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = size;
      range.surroundContents(span);
    }
  };

  const handleFontFamilyChange = (e) => {
    const family = e.target.value;
    setFontFamily(family);
    handleFormat('fontName', family);
  };

  const handleSave = () => {
    const content = editorRef.current?.innerHTML;
    console.log('Saved content:', content);
    alert('Resume saved! (In a real app, this would save to database)');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = editorRef.current?.innerHTML;
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Resume</title>
        <style>
          body { font-family: ${fontFamily}; font-size: ${fontSize}; padding: 20mm; }
          @page { size: A4; margin: 0; }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-edited.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #editor-content {
            padding: 20mm;
            margin: 0;
          }
        }
      `}</style>

      {/* Toolbar */}
      <div className="bg-white shadow-md sticky top-0 z-30 no-print">
        <div className="border-b border-gray-200 p-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onBack}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="w-px h-8 bg-gray-300"></div>

            <button
              onClick={handleSave}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="p-2 border-b border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Font Family */}
            <select
              value={fontFamily}
              onChange={handleFontFamilyChange}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="Arial">Arial</option>
              <option value="Calibri">Calibri</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Verdana">Verdana</option>
            </select>

            {/* Font Size */}
            <select
              value={fontSize}
              onChange={handleFontSizeChange}
              className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
            >
              <option value="8pt">8</option>
              <option value="9pt">9</option>
              <option value="10pt">10</option>
              <option value="11pt">11</option>
              <option value="12pt">12</option>
              <option value="14pt">14</option>
              <option value="16pt">16</option>
              <option value="18pt">18</option>
              <option value="20pt">20</option>
              <option value="24pt">24</option>
            </select>

            <div className="w-px h-8 bg-gray-300"></div>

            {/* Text Formatting */}
            <button
              onClick={() => handleFormat('bold')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Bold (Ctrl+B)"
            >
              <Bold size={18} />
            </button>

            <button
              onClick={() => handleFormat('italic')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Italic (Ctrl+I)"
            >
              <Italic size={18} />
            </button>

            <button
              onClick={() => handleFormat('underline')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Underline (Ctrl+U)"
            >
              <Underline size={18} />
            </button>

            <div className="w-px h-8 bg-gray-300"></div>

            {/* Alignment */}
            <button
              onClick={() => handleFormat('justifyLeft')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Left"
            >
              <AlignLeft size={18} />
            </button>

            <button
              onClick={() => handleFormat('justifyCenter')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Center"
            >
              <AlignCenter size={18} />
            </button>

            <button
              onClick={() => handleFormat('justifyRight')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Align Right"
            >
              <AlignRight size={18} />
            </button>

            <button
              onClick={() => handleFormat('justifyFull')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Justify"
            >
              <AlignJustify size={18} />
            </button>

            <div className="w-px h-8 bg-gray-300"></div>

            {/* Lists */}
            <button
              onClick={() => handleFormat('insertUnorderedList')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Bullet List"
            >
              <List size={18} />
            </button>

            <button
              onClick={() => handleFormat('insertOrderedList')}
              className="p-2 hover:bg-gray-200 rounded"
              title="Numbered List"
            >
              <ListOrdered size={18} />
            </button>

            <div className="w-px h-8 bg-gray-300"></div>

            {/* Line Spacing */}
            <LineSpacingControl 
              lineSpacing={lineSpacing}
              onChange={setLineSpacing}
            />
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="max-w-[210mm] mx-auto p-4">
        <div className="bg-white shadow-lg" style={{ minHeight: '297mm' }}>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className={`outline-none p-8 min-h-[297mm] line-spacing-${lineSpacing}`}
            style={{ 
              fontFamily: fontFamily,
              fontSize: fontSize,
              lineHeight: lineSpacing === 'tight' ? '1.2' : 
                         lineSpacing === 'normal' ? '1.5' :
                         lineSpacing === 'relaxed' ? '1.7' : '2'
            }}
            id="editor-content"
          >
            {/* Initial Content from Template */}
            {TemplateComponent && (
              <div className="pointer-events-none">
                <TemplateComponent 
                  data={resumeData} 
                  sections={customSections}
                  sectionOrder={sectionOrder}
                />
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg no-print">
          <h3 className="font-semibold text-blue-900 mb-2">📝 Document Editor</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click anywhere in the document to start editing</li>
            <li>• Use the toolbar to format text (bold, italic, alignment, etc.)</li>
            <li>• Change font family and size from dropdowns</li>
            <li>• Adjust line spacing for better readability</li>
            <li>• Save, Download or Print when done</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditorPage;