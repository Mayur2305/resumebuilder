
import React from 'react';

const MinimalTemplate = ({ data, sections, sectionOrder = [] }) => {
  const renderRichText = (html) => {
    if (!html) return null;
    return <div className="rich-content text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const renderSectionByType = (sectionType) => {
    switch (sectionType) {
      case 'personalInfo':
        return data.personalInfo && (
          <div key="personalInfo" className="avoid-break mb-4">
            <h1 className="text-5xl font-light text-gray-900 mb-1">{data.personalInfo?.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mb-4">{data.personalInfo?.email} • {data.personalInfo?.phone} • {data.personalInfo?.location}</p>
          </div>
        );
      
      case 'experience':
        return data.experience && data.experience.length > 0 && (
          <div key="experience" className="mb-4 section-container">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 section-header">Experience</h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-4 resume-item">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500">{exp.duration}</span>
                </div>
                <p className="text-sm text-gray-600">{exp.company}</p>
                {renderRichText(exp.description)}
              </div>
            ))}
          </div>
        );
      
      case 'education':
        return data.education && data.education.length > 0 && (
          <div key="education" className="mb-4 section-container">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 section-header">Education</h2>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-3 resume-item">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-500">{edu.year}</span>
                </div>
                <p className="text-sm text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        );
      
      case 'skills':
        return data.skills && data.skills.length > 0 && (
          <div key="skills" className="mb-4 avoid-break">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Skills</h2>
            <p className="text-sm text-gray-700">{data.skills.map(s => s.name).join(' • ')}</p>
          </div>
        );
      
      case 'projects':
        return data.projects && data.projects.length > 0 && (
          <div key="projects" className="mb-4 section-container">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 section-header">Projects</h2>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="mb-3 resume-item">
                <h3 className="text-base font-semibold text-gray-900">{proj.name}</h3>
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
              <div key={sectionType} className="mb-4 avoid-break">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h2>
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
    <>
      {orderedSections.map(sectionType => renderSectionByType(sectionType))}
    </>
  );
};

export default MinimalTemplate;
