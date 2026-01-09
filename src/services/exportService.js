
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
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      background: #f3f4f6;
      padding: 20px;
    }
    
    .a4-page {
      width: 210mm;
      min-height: 297mm;
      max-height: 297mm;
      padding: 15mm 20mm;
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    /* Rich Text Content Styles */
    .rich-content {
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .rich-content p { margin-bottom: 0.5em; margin-top: 0; }
    .rich-content p:last-child { margin-bottom: 0; }
    
    /* Lists */
    .rich-content ul,
    .rich-content ol {
      padding-left: 1.5em !important;
      margin: 0.5em 0 !important;
      list-style-position: outside !important;
    }
    
    .rich-content ul { list-style-type: disc !important; }
    .rich-content ol { list-style-type: decimal !important; }
    .rich-content li { margin-bottom: 0.25em; display: list-item !important; }
    
    /* Text formatting */
    .rich-content strong { font-weight: 600; }
    .rich-content em { font-style: italic; }
    .rich-content u { text-decoration: underline; }
    .rich-content s { text-decoration: line-through; }
    
    /* Headers */
    .rich-content h1 { font-size: 1.5em; font-weight: bold; margin: 0.5em 0; }
    .rich-content h2 { font-size: 1.25em; font-weight: bold; margin: 0.5em 0; }
    .rich-content h3 { font-size: 1.1em; font-weight: bold; margin: 0.5em 0; }
    
    /* Print Styles */
    @media print {
      body { background: white; padding: 0; }
      .a4-page { box-shadow: none; max-width: 100%; }
      
      @page { margin: 15mm 20mm; size: A4; }
      
      .page-break-before { page-break-before: always !important; }
      .page-break-after { page-break-after: always !important; }
      .avoid-break { page-break-inside: avoid !important; }
      .resume-item { page-break-inside: avoid !important; }
      .section-container { page-break-inside: auto !important; }
      .section-header { page-break-after: avoid !important; }
      
      .rich-content ul { list-style-type: disc !important; }
      .rich-content ol { list-style-type: decimal !important; }
      .rich-content li { display: list-item !important; }
    }
  </style>
</head>
<body>
  <div class="a4-page">
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

  // Save as Word document - ENHANCED with better formatting support
  saveAsWord: (resumeRef, resumeData) => {
    const element = resumeRef.current;
    if (!element) return;

    // Clone element to process
    const clonedElement = element.cloneNode(true);
    
    // Process rich content to Word-compatible format
    const richContents = clonedElement.querySelectorAll('.rich-content');
    richContents.forEach(content => {
      // Word recognizes these inline styles better
      const html = content.innerHTML;
      
      // Convert Quill classes to inline styles for better Word compatibility
      let processedHtml = html
        .replace(/<strong>/g, '<b>')
        .replace(/<\/strong>/g, '</b>')
        .replace(/<em>/g, '<i>')
        .replace(/<\/em>/g, '</i>');
      
      content.innerHTML = processedHtml;
    });

    const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <meta name="ProgId" content="Word.Document">
  <meta name="Generator" content="Microsoft Word">
  <meta name="Originator" content="Microsoft Word">
  <title>Resume - ${resumeData.personalInfo?.name || 'Document'}</title>
  
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  
  <style>
    /* Page Setup */
    @page Section1 {
      size: 8.5in 11in;
      margin: 0.5in 0.75in;
      mso-header-margin: 0.5in;
      mso-footer-margin: 0.5in;
      mso-paper-source: 0;
    }
    
    div.Section1 { page: Section1; }
    
    /* Body */
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #000000;
    }
    
    /* Headers */
    h1 {
      font-size: 24pt;
      font-weight: bold;
      margin: 12pt 0;
      color: #000000;
    }
    
    h2 {
      font-size: 14pt;
      font-weight: bold;
      margin: 10pt 0 6pt 0;
      color: #000000;
      border-bottom: 1pt solid #000000;
      padding-bottom: 2pt;
    }
    
    h3 {
      font-size: 12pt;
      font-weight: bold;
      margin: 8pt 0 4pt 0;
      color: #000000;
    }
    
    h4 {
      font-size: 11pt;
      font-weight: bold;
      margin: 6pt 0 2pt 0;
      color: #000000;
    }
    
    /* Paragraphs */
    p {
      font-size: 11pt;
      margin: 0 0 6pt 0;
      color: #000000;
    }
    
    /* Lists - CRITICAL for Word */
    ul, ol {
      margin: 6pt 0;
      padding-left: 0.5in;
      mso-list-type: hybrid;
    }
    
    ul {
      list-style-type: disc;
      mso-list-id: 1;
    }
    
    ol {
      list-style-type: decimal;
      mso-list-id: 2;
    }
    
    li {
      margin: 3pt 0;
      mso-list: l0 level1 lfo1;
    }
    
    /* Text formatting */
    b, strong {
      font-weight: bold;
      mso-bidi-font-weight: bold;
    }
    
    i, em {
      font-style: italic;
      mso-bidi-font-style: italic;
    }
    
    u {
      text-decoration: underline;
      mso-text-underline: single;
    }
    
    /* Colors - Basic support */
    .text-blue-600 { color: #2563eb; }
    .text-gray-800 { color: #1f2937; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-700 { color: #374151; }
    
    /* Spacing */
    .mb-1 { margin-bottom: 2pt; }
    .mb-2 { margin-bottom: 4pt; }
    .mb-3 { margin-bottom: 6pt; }
    .mb-4 { margin-bottom: 8pt; }
    .mt-1 { margin-top: 2pt; }
    
    /* Borders */
    .border-b { border-bottom: 1pt solid #d1d5db; }
    .border-b-2 { border-bottom: 2pt solid #1f2937; }
    .border-b-4 { border-bottom: 4pt solid #2563eb; }
    
    /* Tables (if any) */
    table {
      border-collapse: collapse;
      width: 100%;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    
    td {
      padding: 6pt;
      mso-line-height-rule: exactly;
    }
    
    /* Page breaks */
    .page-break-before {
      page-break-before: always;
      mso-special-character: page-break;
    }
    
    .avoid-break {
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  <div class="Section1">
    ${clonedElement.innerHTML}
  </div>
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