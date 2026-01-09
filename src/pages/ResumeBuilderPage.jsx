
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import Header from '../components/common/Header';
import LivePreview from '../components/common/LivePreview';
import DraggableSection from '../components/common/DraggableSection';
import MobilePreviewModal from '../components/common/MobilePreviewModal';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import CustomSectionForm from '../components/forms/CustomSectionForm';
import AddSectionButton from '../components/forms/AddSectionButton';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { GripVertical } from 'lucide-react';

const ResumeBuilderPage = ({ 
  resumeData, 
  setResumeData, 
  customSections, 
  setCustomSections,
  sectionOrder,
  setSectionOrder,
  TemplateComponent,
  lineSpacing,
  setLineSpacing,
  onChangeTemplate,
  onPreview 
}) => {
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  React.useEffect(() => {
    const baseOrder = sectionOrder.filter(s => !s.startsWith('custom-'));
    const newCustomOrder = customSections.map((_, idx) => `custom-${idx}`);
    const newOrder = [...baseOrder, ...newCustomOrder];
    
    if (JSON.stringify(newOrder) !== JSON.stringify(sectionOrder)) {
      setSectionOrder(newOrder);
    }
  }, [customSections.length]);

  const {
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  } = useDragAndDrop(sectionOrder, setSectionOrder);

  const handlePersonalInfoChange = (data) => {
    setResumeData({ ...resumeData, personalInfo: data });
  };

  const handleExperienceChange = (data) => {
    setResumeData({ ...resumeData, experience: data });
  };

  const handleEducationChange = (data) => {
    setResumeData({ ...resumeData, education: data });
  };

  const handleSkillsChange = (data) => {
    setResumeData({ ...resumeData, skills: data });
  };

  const handleProjectsChange = (data) => {
    setResumeData({ ...resumeData, projects: data });
  };

  const handleCustomSectionChange = (index, section) => {
    const updated = [...customSections];
    updated[index] = section;
    setCustomSections(updated);
  };

  const handleCustomSectionDelete = (index) => {
    const newSections = customSections.filter((_, i) => i !== index);
    setCustomSections(newSections);
    
    const newOrder = sectionOrder.filter(s => s !== `custom-${index}`);
    setSectionOrder(newOrder);
  };

  const handleAddCustomSection = (title) => {
    const newIndex = customSections.length;
    setCustomSections([...customSections, { title, content: '' }]);
    setSectionOrder([...sectionOrder, `custom-${newIndex}`]);
  };

  const renderSection = (sectionType, index) => {
    switch (sectionType) {
      case 'personalInfo':
        return (
          <DraggableSection key={sectionType} index={index} draggedIndex={draggedIndex} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
            <PersonalInfoForm data={resumeData.personalInfo} onChange={handlePersonalInfoChange} />
          </DraggableSection>
        );
      case 'experience':
        return (
          <DraggableSection key={sectionType} index={index} draggedIndex={draggedIndex} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
            <ExperienceForm data={resumeData.experience} onChange={handleExperienceChange} />
          </DraggableSection>
        );
      case 'education':
        return (
          <DraggableSection key={sectionType} index={index} draggedIndex={draggedIndex} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
            <EducationForm data={resumeData.education} onChange={handleEducationChange} />
          </DraggableSection>
        );
      case 'skills':
        return (
          <DraggableSection key={sectionType} index={index} draggedIndex={draggedIndex} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
            <SkillsForm data={resumeData.skills} onChange={handleSkillsChange} />
          </DraggableSection>
        );
      case 'projects':
        return (
          <DraggableSection key={sectionType} index={index} draggedIndex={draggedIndex} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
            <ProjectsForm data={resumeData.projects} onChange={handleProjectsChange} />
          </DraggableSection>
        );
      default:
        if (sectionType.startsWith('custom-')) {
          const customIndex = parseInt(sectionType.split('-')[1]);
          if (customSections[customIndex]) {
            return (
              <DraggableSection key={sectionType} index={index} draggedIndex={draggedIndex} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd}>
                <CustomSectionForm section={customSections[customIndex]} index={customIndex} onChange={handleCustomSectionChange} onDelete={handleCustomSectionDelete} />
              </DraggableSection>
            );
          }
        }
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onChangeTemplate={onChangeTemplate} onPreview={onPreview} />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-blue-800">
            💡 <strong>Tip:</strong> Drag sections using the <GripVertical className="inline" size={16} /> handle to reorder them!
          </p>
        </div>

        <div className="builder-layout grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4 sm:space-y-6">
            {sectionOrder.map((sectionType, index) => renderSection(sectionType, index))}
            <AddSectionButton onAdd={handleAddCustomSection} />
          </div>

          <LivePreview 
            TemplateComponent={TemplateComponent} 
            data={resumeData} 
            sections={customSections}
            sectionOrder={sectionOrder}
            lineSpacing={lineSpacing}
            setLineSpacing={setLineSpacing}
          />
        </div>
      </div>

      <button
        onClick={() => setShowMobilePreview(true)}
        className="mobile-preview-btn lg:hidden px-4 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2 shadow-xl"
      >
        <Eye size={20} />
        <span>Preview</span>
      </button>

      <MobilePreviewModal
        isOpen={showMobilePreview}
        onClose={() => setShowMobilePreview(false)}
        lineSpacing={lineSpacing}
        setLineSpacing={setLineSpacing}
      >
        {TemplateComponent && (
          <TemplateComponent 
            data={resumeData} 
            sections={customSections}
            sectionOrder={sectionOrder}
          />
        )}
      </MobilePreviewModal>
    </div>
  );
};

export default ResumeBuilderPage;