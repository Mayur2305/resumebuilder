
import React from 'react';

const ClassicTemplate = ({ data, sections, sectionOrder = [] }) => {
  const renderRichText = (html) => {
    if (!html) return null;
    return <div className="rich-content text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const renderSectionByType = (sectionType) => {
    switch (sectionType) {
      case 'personalInfo':
        return data.personalInfo && (
          <div key="personalInfo" className="text-center mb-4 pb-3 border-b-2 border-gray-800 avoid-break">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.personalInfo?.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-600">{data.personalInfo?.email} | {data.personalInfo?.phone} | {data.personalInfo?.location}</p>
          </div>
        );
      
      case 'experience':
        return data.experience && data.experience.length > 0 && (
          <div key="experience" className="mb-4 section-container">
            <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 mb-2 section-header">
              Professional Experience
            </h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-3 resume-item">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-xs text-gray-600 italic">{exp.company}</p>
                {renderRichText(exp.description)}
              </div>
            ))}
          </div>
        );
      
      case 'education':
        return data.education && data.education.length > 0 && (
          <div key="education" className="mb-4 section-container">
            <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 mb-2 section-header">
              Education
            </h2>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-2 resume-item">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                  <span className="text-xs text-gray-600">{edu.year}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        );
      
      case 'skills':
        return data.skills && data.skills.length > 0 && (
          <div key="skills" className="mb-4 avoid-break">
            <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="text-xs text-gray-700">{skill.name}{idx < data.skills.length - 1 ? ' •' : ''}</span>
              ))}
            </div>
          </div>
        );
      
      case 'projects':
        return data.projects && data.projects.length > 0 && (
          <div key="projects" className="mb-4 section-container">
            <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 mb-2 section-header">
              Projects
            </h2>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="mb-2 resume-item">
                <h3 className="text-sm font-bold text-gray-800">{proj.name}</h3>
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
                <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 mb-2">{section.title}</h2>
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

export default ClassicTemplate;