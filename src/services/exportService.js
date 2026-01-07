
export const exportService = {
  // Print to PDF using browser's print dialog
  printToPDF: () => {
    window.print();
  },

  // Save as HTML file with ALL styles preserved
  saveAsHTML: (resumeRef, resumeData) => {
    const element = resumeRef.current;
    if (!element) return;
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${resumeData.personalInfo?.name || 'Download'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    /* Base Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      background: #f3f4f6;
      padding: 20px;
    }
    
    .resume-container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    /* Rich Text Content Styles - CRITICAL FOR WYSIWYG */
    .rich-content {
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .rich-content p {
      margin-bottom: 0.5em;
      margin-top: 0;
    }
    
    .rich-content p:last-child {
      margin-bottom: 0;
    }
    
    /* Lists - Make bullets/numbers visible */
    .rich-content ul,
    .rich-content ol {
      padding-left: 1.5em !important;
      margin: 0.5em 0 !important;
      list-style-position: outside !important;
    }
    
    .rich-content ul {
      list-style-type: disc !important;
    }
    
    .rich-content ol {
      list-style-type: decimal !important;
    }
    
    .rich-content li {
      margin-bottom: 0.25em;
      display: list-item !important;
    }
    
    /* Nested lists */
    .rich-content ul ul,
    .rich-content ol ul {
      list-style-type: circle !important;
    }
    
    .rich-content ul ul ul,
    .rich-content ol ul ul {
      list-style-type: square !important;
    }
    
    /* Text formatting */
    .rich-content strong {
      font-weight: 600;
    }
    
    .rich-content em {
      font-style: italic;
    }
    
    .rich-content u {
      text-decoration: underline;
    }
    
    .rich-content s {
      text-decoration: line-through;
    }
    
    /* Headers */
    .rich-content h1 {
      font-size: 1.5em;
      font-weight: bold;
      margin: 0.5em 0;
      line-height: 1.2;
    }
    
    .rich-content h2 {
      font-size: 1.25em;
      font-weight: bold;
      margin: 0.5em 0;
      line-height: 1.2;
    }
    
    .rich-content h3 {
      font-size: 1.1em;
      font-weight: bold;
      margin: 0.5em 0;
      line-height: 1.2;
    }
    
    /* Links */
    .rich-content a {
      color: #2563eb;
      text-decoration: underline;
    }
    
    /* Alignment classes from Quill */
    .rich-content .ql-align-center {
      text-align: center;
    }
    
    .rich-content .ql-align-right {
      text-align: right;
    }
    
    .rich-content .ql-align-justify {
      text-align: justify;
    }
    
    /* Indentation from Quill */
    .rich-content .ql-indent-1 {
      padding-left: 3em;
    }
    
    .rich-content .ql-indent-2 {
      padding-left: 6em;
    }
    
    .rich-content .ql-indent-3 {
      padding-left: 9em;
    }
    
    /* Print Styles */
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .resume-container {
        box-shadow: none;
        max-width: 100%;
      }
      
      @page {
        margin: 0.5in;
        size: A4;
      }
      
      .avoid-break {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      
      .page-break {
        page-break-after: always !important;
        break-after: page !important;
      }
      
      .resume-section {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      
      /* Ensure lists print correctly */
      .rich-content ul {
        list-style-type: disc !important;
      }
      
      .rich-content ol {
        list-style-type: decimal !important;
      }
      
      .rich-content li {
        display: list-item !important;
      }
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .resume-container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    ${element.innerHTML}
  </div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${resumeData.personalInfo?.name?.replace(/\s+/g, '-') || 'download'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Save as Word document with rich formatting
  saveAsWord: (resumeRef, resumeData) => {
    const element = resumeRef.current;
    if (!element) return;

    const wordContent = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Resume</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>90</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body { 
      font-family: Calibri, sans-serif; 
      line-height: 1.6; 
      font-size: 11pt;
    }
    h1 { 
      font-size: 24pt; 
      font-weight: bold; 
      margin: 12pt 0;
    }
    h2 { 
      font-size: 16pt; 
      font-weight: bold; 
      margin: 10pt 0;
    }
    h3 { 
      font-size: 14pt; 
      font-weight: bold; 
      margin: 8pt 0;
    }
    p { 
      font-size: 11pt; 
      margin: 6pt 0; 
    }
    
    /* Lists for Word */
    ul, ol {
      margin: 6pt 0;
      padding-left: 20pt;
    }
    
    ul {
      list-style-type: disc;
    }
    
    ol {
      list-style-type: decimal;
    }
    
    li {
      margin: 3pt 0;
      display: list-item;
    }
    
    strong {
      font-weight: bold;
    }
    em {
      font-style: italic;
    }
    u {
      text-decoration: underline;
    }
    
    @page {
      size: 8.5in 11in;
      margin: 0.5in;
    }
  </style>
</head>
<body>
  ${element.innerHTML}
</body>
</html>`;

    const blob = new Blob(['\ufeff', wordContent], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${resumeData.personalInfo?.name?.replace(/\s+/g, '-') || 'download'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
