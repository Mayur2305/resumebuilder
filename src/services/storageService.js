
export const storageService = {
  // Save resume data to localStorage
  saveResume: (data, sections, sectionOrder, selectedTemplate) => {
    try {
      const resumeState = {
        data,
        sections,
        sectionOrder,
        selectedTemplate,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('resume_data', JSON.stringify(resumeState));
      return true;
    } catch (error) {
      console.error('Error saving resume:', error);
      return false;
    }
  },

  // Load resume data from localStorage
  loadResume: () => {
    try {
      const saved = localStorage.getItem('resume_data');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading resume:', error);
      return null;
    }
  },

  // Clear saved resume
  clearResume: () => {
    try {
      localStorage.removeItem('resume_data');
      return true;
    } catch (error) {
      console.error('Error clearing resume:', error);
      return false;
    }
  }
};