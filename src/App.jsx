
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { TEMPLATES } from './constants/templates';
import { storageService } from './services/storageService';

import HomePage from './pages/HomePage';
import TemplateSelectorPage from './pages/TemplateSelectorPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import PreviewPage from './pages/PreviewPage';
import DocumentEditorPage from './pages/DocumentEditorPage';
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
  const [lineSpacing, setLineSpacing] = useState('normal'); // NEW: Global line spacing state

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
      if (saved.lineSpacing) {
        setLineSpacing(saved.lineSpacing); // Load saved line spacing
      }
    }
  }, []);

  // Auto-save resume data when it changes
  useEffect(() => {
    if (resumeData.personalInfo.name || resumeData.experience.length > 0) {
      storageService.saveResume(resumeData, customSections, sectionOrder, selectedTemplate, lineSpacing);
    }
  }, [resumeData, customSections, sectionOrder, selectedTemplate, lineSpacing]);

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
      <Route path="/" element={<HomePage onGetStarted={() => navigate('/templates')} />} />
      
      <Route path="/templates" element={
        <TemplateSelectorPage onSelect={handleTemplateSelect} selectedTemplate={selectedTemplate} />
      } />

      <Route path="/builder/:templateId" element={
        <BuilderWrapper
          resumeData={resumeData}
          setResumeData={setResumeData}
          customSections={customSections}
          setCustomSections={setCustomSections}
          sectionOrder={sectionOrder}
          setSectionOrder={setSectionOrder}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          lineSpacing={lineSpacing}
          setLineSpacing={setLineSpacing}
          onChangeTemplate={handleChangeTemplate}
          onPreview={handlePreview}
        />
      } />

      <Route path="/preview/:templateId" element={
        <PreviewWrapper
          resumeData={resumeData}
          customSections={customSections}
          sectionOrder={sectionOrder}
          selectedTemplate={selectedTemplate}
          lineSpacing={lineSpacing}
          setLineSpacing={setLineSpacing}
          onEdit={handleEdit}
          onChangeTemplate={handleChangeTemplate}
        />
      } />

      <Route path="/document-editor/:templateId" element={
        <DocumentEditorPage
          resumeData={resumeData}
          customSections={customSections}
          sectionOrder={sectionOrder}
          lineSpacing={lineSpacing}
          setLineSpacing={setLineSpacing}
          onBack={handleEdit}
        />
      } />

      <Route path="/builder" element={<Navigate to="/templates" replace />} />
      <Route path="/preview" element={<Navigate to="/templates" replace />} />
      <Route path="*" element={<NotFoundPage onGoHome={handleGoHome} />} />
    </Routes>
  );
}

function BuilderWrapper({ 
  resumeData, setResumeData, customSections, setCustomSections, 
  sectionOrder, setSectionOrder, selectedTemplate, setSelectedTemplate,
  lineSpacing, setLineSpacing, onChangeTemplate, onPreview 
}) {
  const { templateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = parseInt(templateId);
    if (id && TEMPLATES.find(t => t.id === id)) {
      setSelectedTemplate(id);
    } else {
      navigate('/templates');
    }
  }, [templateId, setSelectedTemplate, navigate]);

  const TemplateComponent = selectedTemplate 
    ? TEMPLATES.find(t => t.id === selectedTemplate)?.component 
    : null;

  if (!TemplateComponent) return null;

  return (
    <ResumeBuilderPage
      resumeData={resumeData}
      setResumeData={setResumeData}
      customSections={customSections}
      setCustomSections={setCustomSections}
      sectionOrder={sectionOrder}
      setSectionOrder={setSectionOrder}
      TemplateComponent={TemplateComponent}
      lineSpacing={lineSpacing}
      setLineSpacing={setLineSpacing}
      onChangeTemplate={onChangeTemplate}
      onPreview={onPreview}
    />
  );
}

function PreviewWrapper({ 
  resumeData, customSections, sectionOrder, selectedTemplate,
  lineSpacing, setLineSpacing, onEdit, onChangeTemplate
}) {
  const { templateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = parseInt(templateId);
    if (!id || !TEMPLATES.find(t => t.id === id)) {
      navigate('/templates');
    }
  }, [templateId, navigate]);

  const TemplateComponent = TEMPLATES.find(t => t.id === parseInt(templateId))?.component;

  if (!TemplateComponent) return null;

  return (
    <PreviewPage
      resumeData={resumeData}
      customSections={customSections}
      sectionOrder={sectionOrder}
      TemplateComponent={TemplateComponent}
      lineSpacing={lineSpacing}
      setLineSpacing={setLineSpacing}
      onEdit={onEdit}
      onChangeTemplate={onChangeTemplate}
    />
  );
}

export default App;