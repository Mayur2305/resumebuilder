
import React, { useState, useEffect } from 'react';
import { TEMPLATES } from './constants/templates';
import { storageService } from './services/storageService';
import TemplateSelectorPage from './pages/TemplateSelectorPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import PreviewPage from './pages/PreviewPage';
import 'react-quill/dist/quill.snow.css';

function App() {
  const [step, setStep] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', title: '', email: '', phone: '', location: '' },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });
  const [customSections, setCustomSections] = useState([]);
  const [sectionOrder, setSectionOrder] = useState([
    'personalInfo',
    'experience',
    'education',
    'skills',
    'projects'
  ]);

  // Load saved resume data on mount
  useEffect(() => {
    const saved = storageService.loadResume();
    if (saved) {
      setResumeData(saved.data);
      setCustomSections(saved.sections);
      if (saved.sectionOrder) {
        setSectionOrder(saved.sectionOrder);
      }
    }
  }, []);

  // Auto-save resume data when it changes
  useEffect(() => {
    if (step !== 'templates') {
      storageService.saveResume(resumeData, customSections, sectionOrder);
    }
  }, [resumeData, customSections, sectionOrder, step]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setStep('builder');
  };

  const handleChangeTemplate = () => {
    setStep('templates');
  };

  const handlePreview = () => {
    setStep('preview');
  };

  const handleEdit = () => {
    setStep('builder');
  };

  const TemplateComponent = selectedTemplate 
    ? TEMPLATES.find(t => t.id === selectedTemplate).component 
    : null;

  if (step === 'templates') {
    return <TemplateSelectorPage onSelect={handleTemplateSelect} />;
  }

  if (step === 'builder') {
    return (
      <ResumeBuilderPage
        resumeData={resumeData}
        setResumeData={setResumeData}
        customSections={customSections}
        setCustomSections={setCustomSections}
        sectionOrder={sectionOrder}
        setSectionOrder={setSectionOrder}
        TemplateComponent={TemplateComponent}
        onChangeTemplate={handleChangeTemplate}
        onPreview={handlePreview}
      />
    );
  }

  if (step === 'preview') {
    return (
      <PreviewPage
        resumeData={resumeData}
        customSections={customSections}
        sectionOrder={sectionOrder}
        TemplateComponent={TemplateComponent}
        onEdit={handleEdit}
      />
    );
  }

  return null;
}

export default App;