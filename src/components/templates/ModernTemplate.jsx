
import React from 'react';

const ModernTemplate = ({ data, sections, sectionOrder = [] }) => {
  const renderRichText = (html) => {
    if (!html) return null;
    return <div className="rich-content text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const renderSectionByType = (sectionType) => {
    switch (sectionType) {
      case 'personalInfo':
        return data.personalInfo && (
          <div key="personalInfo" className="border-b-4 border-blue-600 pb-4 mb-6 avoid-break">
            <h1 className="text-4xl font-bold text-gray-800">{data.personalInfo?.name || 'Your Name'}</h1>
            <p className="text-lg text-gray-600">{data.personalInfo?.title || 'Professional Title'}</p>
          </div>
        );
      
      case 'experience':
        return data.experience && data.experience.length > 0 && (
          <div key="experience" className="resume-section">
            <h3 className="text-sm font-bold text-blue-600 uppercase mb-2 border-b border-gray-300 pb-1">Experience</h3>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-3 avoid-break">
                <h4 className="text-sm font-bold text-gray-800">{exp.position}</h4>
                <p className="text-xs text-gray-600 italic">{exp.company} | {exp.duration}</p>
                {renderRichText(exp.description)}
              </div>
            ))}
          </div>
        );
      
      case 'education':
        return data.education && data.education.length > 0 && (
          <div key="education" className="resume-section">
            <h3 className="text-sm font-bold text-blue-600 uppercase mb-2 border-b border-gray-300 pb-1">Education</h3>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-3 avoid-break">
                <h4 className="text-sm font-bold text-gray-800">{edu.degree}</h4>
                <p className="text-xs text-gray-600 italic">{edu.institution} | {edu.year}</p>
              </div>
            ))}
          </div>
        );
      
      case 'skills':
        return data.skills && data.skills.length > 0 && (
          <div key="skills" className="resume-section">
            <h3 className="text-sm font-bold text-blue-600 uppercase mb-2">Skills</h3>
            {data.skills.map((skill, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-xs font-semibold text-gray-800">{skill.name}</p>
              </div>
            ))}
          </div>
        );
      
      case 'projects':
        return data.projects && data.projects.length > 0 && (
          <div key="projects" className="resume-section">
            <h3 className="text-sm font-bold text-blue-600 uppercase mb-2 border-b border-gray-300 pb-1">Projects</h3>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="mb-3 avoid-break">
                <h4 className="text-sm font-bold text-gray-800">{proj.name}</h4>
                {renderRichText(proj.description)}
              </div>
            ))}
          </div>
        );
      
      default:
        if (sectionType.startsWith('custom-')) {
          const customIndex = parseInt(sectionType.split('-')[1]);
          const section = sections[customIndex];
          if (section) {
            return (
              <div key={sectionType} className="resume-section">
                <h3 className="text-sm font-bold text-blue-600 uppercase mb-2">{section.title}</h3>
                {renderRichText(section.content)}
              </div>
            );
          }
        }
        return null;
    }
  };

  const orderedSections = sectionOrder.length > 0 
    ? sectionOrder 
    : ['personalInfo', 'experience', 'education', 'skills', 'projects'];

  return (
    <div className="bg-white p-8 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          {data.personalInfo && (
            <div className="avoid-break">
              <h3 className="text-sm font-bold text-blue-600 uppercase mb-2">Contact</h3>
              <p className="text-xs text-gray-700">{data.personalInfo.email}</p>
              <p className="text-xs text-gray-700">{data.personalInfo.phone}</p>
              <p className="text-xs text-gray-700">{data.personalInfo.location}</p>
            </div>
          )}
          
          {orderedSections
            .filter(s => ['skills'].includes(s) || s.startsWith('custom-'))
            .map(sectionType => renderSectionByType(sectionType))}
        </div>
        
        <div className="col-span-2 space-y-4">
          {renderSectionByType('personalInfo')}
          
          {orderedSections
            .filter(s => ['experience', 'education', 'projects'].includes(s))
            .map(sectionType => renderSectionByType(sectionType))}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;