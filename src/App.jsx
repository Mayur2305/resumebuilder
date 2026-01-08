
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { TEMPLATES } from './constants/templates';
import { storageService } from './services/storageService';

// Pages
import HomePage from './pages/HomePage';
import TemplateSelectorPage from './pages/TemplateSelectorPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import PreviewPage from './pages/PreviewPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const navigate = useNavigate();
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
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Load saved resume data on mount
  useEffect(() => {
    const saved = storageService.loadResume();
    if (saved) {
      setResumeData(saved.data);
      setCustomSections(saved.sections);
      if (saved.sectionOrder) {
        setSectionOrder(saved.sectionOrder);
      }
      if (saved.selectedTemplate) {
        setSelectedTemplate(saved.selectedTemplate);
      }
    }
  }, []);

  // Auto-save resume data when it changes
  useEffect(() => {
    if (resumeData.personalInfo.name || resumeData.experience.length > 0) {
      storageService.saveResume(resumeData, customSections, sectionOrder, selectedTemplate);
    }
  }, [resumeData, customSections, sectionOrder, selectedTemplate]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    navigate(`/builder/${templateId}`);
  };

  const handleChangeTemplate = () => {
    navigate('/templates');
  };

  const handlePreview = () => {
    if (selectedTemplate) {
      navigate(`/preview/${selectedTemplate}`);
    }
  };

  const handleEdit = () => {
    if (selectedTemplate) {
      navigate(`/builder/${selectedTemplate}`);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Routes>
      {/* Home Page */}
      <Route 
        path="/" 
        element={<HomePage onGetStarted={() => navigate('/templates')} />} 
      />

      {/* Template Selection */}
      <Route 
        path="/templates" 
        element={
          <TemplateSelectorPage 
            onSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
          />
        } 
      />

      {/* Resume Builder with Template ID */}
      <Route 
        path="/builder/:templateId" 
        element={
          <BuilderWrapper
            resumeData={resumeData}
            setResumeData={setResumeData}
            customSections={customSections}
            setCustomSections={setCustomSections}
            sectionOrder={sectionOrder}
            setSectionOrder={setSectionOrder}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            onChangeTemplate={handleChangeTemplate}
            onPreview={handlePreview}
          />
        } 
      />

      {/* Preview with Template ID */}
      <Route 
        path="/preview/:templateId" 
        element={
          <PreviewWrapper
            resumeData={resumeData}
            customSections={customSections}
            sectionOrder={sectionOrder}
            selectedTemplate={selectedTemplate}
            onEdit={handleEdit}
            onChangeTemplate={handleChangeTemplate}
          />
        } 
      />

      {/* Redirect old paths */}
      <Route path="/builder" element={<Navigate to="/templates" replace />} />
      <Route path="/preview" element={<Navigate to="/templates" replace />} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage onGoHome={handleGoHome} />} />
    </Routes>
  );
}

// Wrapper component for builder to handle template ID from URL
function BuilderWrapper({ 
  resumeData, 
  setResumeData, 
  customSections, 
  setCustomSections, 
  sectionOrder, 
  setSectionOrder,
  selectedTemplate,
  setSelectedTemplate,
  onChangeTemplate, 
  onPreview 
}) {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Update selected template from URL
  useEffect(() => {
    const id = parseInt(templateId);
    if (id && TEMPLATES.find(t => t.id === id)) {
      setSelectedTemplate(id);
    } else {
      // Invalid template ID, redirect to template selection
      navigate('/templates');
    }
  }, [templateId, setSelectedTemplate, navigate]);

  const TemplateComponent = selectedTemplate 
    ? TEMPLATES.find(t => t.id === selectedTemplate)?.component 
    : null;

  if (!TemplateComponent) {
    return null; // Will redirect in useEffect
  }

  return (
    <ResumeBuilderPage
      resumeData={resumeData}
      setResumeData={setResumeData}
      customSections={customSections}
      setCustomSections={setCustomSections}
      sectionOrder={sectionOrder}
      setSectionOrder={setSectionOrder}
      TemplateComponent={TemplateComponent}
      onChangeTemplate={onChangeTemplate}
      onPreview={onPreview}
    />
  );
}

// Wrapper component for preview to handle template ID from URL
function PreviewWrapper({ 
  resumeData, 
  customSections, 
  sectionOrder, 
  selectedTemplate,
  onEdit,
  onChangeTemplate
}) {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // Validate template ID from URL
  useEffect(() => {
    const id = parseInt(templateId);
    if (!id || !TEMPLATES.find(t => t.id === id)) {
      navigate('/templates');
    }
  }, [templateId, navigate]);

  const TemplateComponent = TEMPLATES.find(t => t.id === parseInt(templateId))?.component;

  if (!TemplateComponent) {
    return null;
  }

  return (
    <PreviewPage
      resumeData={resumeData}
      customSections={customSections}
      sectionOrder={sectionOrder}
      TemplateComponent={TemplateComponent}
      onEdit={onEdit}
      onChangeTemplate={onChangeTemplate}
    />
  );
}

export default App;