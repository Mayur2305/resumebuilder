
import React from 'react';

const CreativeTemplate = ({ data, sections, sectionOrder = [] }) => {
  const renderRichText = (html) => {
    if (!html) return null;
    return <div className="rich-content text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const renderSectionByType = (sectionType) => {
    switch (sectionType) {
      case 'personalInfo':
        return data.personalInfo && (
          <div key="personalInfo" className="bg-white rounded-lg p-6 shadow-md mb-6 avoid-break">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">{data.personalInfo?.name || 'Your Name'}</h1>
            <p className="text-gray-600">{data.personalInfo?.title || 'Professional Title'}</p>
            <div className="flex gap-4 mt-2 text-xs text-gray-600">
              <span>{data.personalInfo?.email}</span>
              <span>{data.personalInfo?.phone}</span>
              <span>{data.personalInfo?.location}</span>
            </div>
          </div>
        );
      
      case 'experience':
        return data.experience && data.experience.length > 0 && (
          <div key="experience" className="col-span-2 bg-white rounded-lg p-4 shadow-md mb-4 resume-section">
            <h2 className="text-lg font-bold text-purple-600 mb-3">Experience</h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-3 pb-3 border-b border-gray-200 last:border-0 avoid-break">
                <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                <p className="text-xs text-gray-600">{exp.company} | {exp.duration}</p>
                {renderRichText(exp.description)}
              </div>
            ))}
          </div>
        );
      
      case 'education':
        return data.education && data.education.length > 0 && (
          <div key="education" className="bg-white rounded-lg p-4 shadow-md mb-4 resume-section">
            <h2 className="text-lg font-bold text-purple-600 mb-3">Education</h2>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-2 avoid-break">
                <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-xs text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        );
      
      case 'skills':
        return data.skills && data.skills.length > 0 && (
          <div key="skills" className="bg-white rounded-lg p-4 shadow-md mb-4 resume-section avoid-break">
            <h2 className="text-lg font-bold text-purple-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">{skill.name}</span>
              ))}
            </div>
          </div>
        );
      
      case 'projects':
        return data.projects && data.projects.length > 0 && (
          <div key="projects" className="col-span-2 bg-white rounded-lg p-4 shadow-md mb-4 resume-section">
            <h2 className="text-lg font-bold text-purple-600 mb-3">Projects</h2>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="mb-2 avoid-break">
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
              <div key={sectionType} className="bg-white rounded-lg p-4 shadow-md mb-4 resume-section">
                <h2 className="text-lg font-bold text-purple-600 mb-3">{section.title}</h2>
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
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      {orderedSections.map(sectionType => renderSectionByType(sectionType))}
    </div>
  );
};

export default CreativeTemplate;