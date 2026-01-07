
/**
 * Utility to strip HTML tags for plain text fallback
 */
export const stripHtmlTags = (html) => {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

/**
 * Convert Quill HTML to plain text with formatting
 */
export const htmlToPlainText = (html) => {
  if (!html) return '';
  
  let text = html;
  
  // Convert list items
  text = text.replace(/<li>/gi, '\n• ');
  text = text.replace(/<\/li>/gi, '');
  
  // Convert paragraphs
  text = text.replace(/<p>/gi, '');
  text = text.replace(/<\/p>/gi, '\n');
  
  // Convert breaks
  text = text.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove remaining tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Clean up multiple newlines
  text = text.replace(/\n\s*\n/g, '\n\n');
  
  return text.trim();
};

/**
 * Check if content has rich formatting
 */
export const hasRichFormatting = (html) => {
  if (!html) return false;
  return /<[^>]+>/.test(html);
};