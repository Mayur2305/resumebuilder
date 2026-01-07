
import React from 'react';

const ProfessionalTemplate = ({ data, sections, sectionOrder = [] }) => {
  const renderRichText = (html) => {
    if (!html) return null;
    return <div className="rich-content text-xs" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const renderSectionByType = (sectionType) => {
    switch (sectionType) {
      case 'personalInfo':
        return data.personalInfo && (
          <div key="personalInfo" className="bg-gray-800 text-white p-6 -m-8 mb-6 avoid-break">
            <h1 className="text-3xl font-bold mb-1">{data.personalInfo?.name || 'Your Name'}</h1>
            <p className="text-gray-300 mb-2">{data.personalInfo?.title || 'Professional Title'}</p>
            <div className="text-sm text-gray-300">
              {data.personalInfo?.email} | {data.personalInfo?.phone} | {data.personalInfo?.location}
            </div>
          </div>
        );
      
      case 'experience':
        return data.experience && data.experience.length > 0 && (
          <div key="experience" className="mb-5 resume-section">
            <h2 className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-2 mb-3">PROFESSIONAL EXPERIENCE</h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="mb-3 px-3 avoid-break">
                <div className="flex justify-between">
                  <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-xs text-gray-600 font-semibold">{exp.company}</p>
                {renderRichText(exp.description)}
              </div>
            ))}
          </div>
        );
      
      case 'education':
        return data.education && data.education.length > 0 && (
          <div key="education" className="mb-5 resume-section">
            <h2 className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-2 mb-3">EDUCATION</h2>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-2 px-3 avoid-break">
                <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-xs text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        );
      
      case 'skills':
        return data.skills && data.skills.length > 0 && (
          <div key="skills" className="mb-5 resume-section avoid-break">
            <h2 className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-2 mb-3">SKILLS</h2>
            <div className="px-3 space-y-1">
              {data.skills.map((skill, idx) => (
                <p key={idx} className="text-xs text-gray-700">• {skill.name}</p>
              ))}
            </div>
          </div>
        );
      
      case 'projects':
        return data.projects && data.projects.length > 0 && (
          <div key="projects" className="mb-5 resume-section">
            <h2 className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-2 mb-3">PROJECTS</h2>
            {data.projects.map((proj, idx) => (
              <div key={idx} className="mb-2 px-3 avoid-break">
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
              <div key={sectionType} className="mb-5 resume-section">
                <h2 className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-2 mb-3">{section.title.toUpperCase()}</h2>
                <div className="px-3">
                  {renderRichText(section.content)}
                </div>
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
      {orderedSections.map(sectionType => renderSectionByType(sectionType))}
    </div>
  );
};

export default ProfessionalTemplate;