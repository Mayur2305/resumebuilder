// ============================================
// FILE: src/constants/sectionOptions.js
// ============================================

/**
 * Complete list of all available resume section options
 * Users can add any of these sections to their resume
 * Organized by category for better understanding
 */

export const SECTION_OPTIONS = [
  // Personal & Introductory
  'About Me',
  'Personal Profile',
  'Professional Summary',
  'Career Objective',
  'Profile Summary',
  'Career Summary',
  'Highlights',
  'Key Qualifications',
  'Areas of Expertise',
  'Core Competencies',
  'Professional Highlights',
  
  // Contact Information (Additional)
  'Contact Information',
  'LinkedIn Profile',
  'Portfolio Website',
  'Social Media Links',
  
  // Education Related
  'Academic Background',
  'Educational Qualifications',
  'Certifications',
  'Training',
  'Workshops & Seminars',
  'Courses Completed',
  'Licenses',
  'Professional Development',
  'Continuing Education',
  
  // Experience Variations
  'Work Experience',
  'Professional Experience',
  'Employment History',
  'Internship Experience',
  'Freelance Experience',
  'Relevant Experience',
  'Leadership Experience',
  'Research Experience',
  'Teaching Experience',
  'Industry Experience',
  'Volunteer Experience',
  'Military Experience',
  
  // Skills Variations
  'Technical Skills',
  'Programming Skills',
  'Soft Skills',
  'Hard Skills',
  'Language Skills',
  'Tools & Technologies',
  'Platforms',
  'Methodologies',
  'Domain Skills',
  'Problem Solving Skills',
  
  // Project Related
  'Academic Projects',
  'Personal Projects',
  'Professional Projects',
  'Open Source Contributions',
  'Portfolio',
  'Case Studies',
  'Key Projects',
  
  // Achievements & Activities
  'Achievements',
  'Awards',
  'Honors',
  'Publications',
  'Conferences',
  'Extracurricular Activities',
  'Professional Activities',
  'Community Involvement',
  
  // Professional Development
  'Professional Memberships',
  'Affiliations',
  'Leadership Roles',
  'Training & Development',
  
  // Personal Development
  'Languages Known',
  'Interests',
  'Hobbies',
  'Personal Strengths',
  'Activities',
  
  // Research & Writing
  'Research Work',
  'Thesis',
  'Patents',
  'White Papers',
  'Articles',
  'Blogs',
  'Speaking Engagements',
  
  // References
  'References',
  'Referees',
  'Testimonials',
  'Recommendations',
  
  // Tech / Developer Specific
  'Technology Stack',
  'Coding Profiles',
  'GitHub Profile',
  'GitHub / Portfolio Links',
  'Tech Certifications',
  'Development Tools',
  
  // Management Specific
  'Management Skills',
  'Business Impact',
  'Strategic Initiatives',
  'Leadership Summary',
  'Team Management',
  
  // Additional Sections
  'Objective Statement',
  'Summary of Qualifications',
  'Career Timeline',
  'Additional Information',
  'Availability',
  'Relocation Preferences',
  'Salary Expectations',
  'Notice Period',
  'Work Authorization',
  'Visa Status'
];

/**
 * Categorized section options for better UI/UX
 * Can be used if you want to show sections in categories
 */
export const CATEGORIZED_SECTIONS = {
  personal: {
    title: 'Personal & Introductory',
    options: [
      'About Me',
      'Personal Profile',
      'Professional Summary',
      'Career Objective',
      'Profile Summary',
      'Career Summary',
      'Highlights',
      'Key Qualifications',
      'Areas of Expertise',
      'Core Competencies',
      'Professional Highlights'
    ]
  },
  
  contact: {
    title: 'Contact & Links',
    options: [
      'Contact Information',
      'LinkedIn Profile',
      'Portfolio Website',
      'Social Media Links'
    ]
  },
  
  education: {
    title: 'Education Related',
    options: [
      'Academic Background',
      'Educational Qualifications',
      'Certifications',
      'Training',
      'Workshops & Seminars',
      'Courses Completed',
      'Licenses',
      'Professional Development',
      'Continuing Education'
    ]
  },
  
  experience: {
    title: 'Experience Variations',
    options: [
      'Work Experience',
      'Professional Experience',
      'Employment History',
      'Internship Experience',
      'Freelance Experience',
      'Relevant Experience',
      'Leadership Experience',
      'Research Experience',
      'Teaching Experience',
      'Industry Experience',
      'Volunteer Experience',
      'Military Experience'
    ]
  },
  
  skills: {
    title: 'Skills',
    options: [
      'Technical Skills',
      'Programming Skills',
      'Soft Skills',
      'Hard Skills',
      'Language Skills',
      'Tools & Technologies',
      'Platforms',
      'Methodologies',
      'Domain Skills',
      'Problem Solving Skills'
    ]
  },
  
  projects: {
    title: 'Projects',
    options: [
      'Academic Projects',
      'Personal Projects',
      'Professional Projects',
      'Open Source Contributions',
      'Portfolio',
      'Case Studies',
      'Key Projects'
    ]
  },
  
  achievements: {
    title: 'Achievements & Activities',
    options: [
      'Achievements',
      'Awards',
      'Honors',
      'Publications',
      'Conferences',
      'Extracurricular Activities',
      'Professional Activities',
      'Community Involvement'
    ]
  },
  
  professional: {
    title: 'Professional Development',
    options: [
      'Professional Memberships',
      'Affiliations',
      'Leadership Roles',
      'Training & Development'
    ]
  },
  
  personal_development: {
    title: 'Personal Development',
    options: [
      'Languages Known',
      'Interests',
      'Hobbies',
      'Personal Strengths',
      'Activities'
    ]
  },
  
  research: {
    title: 'Research & Writing',
    options: [
      'Research Work',
      'Thesis',
      'Patents',
      'White Papers',
      'Articles',
      'Blogs',
      'Speaking Engagements'
    ]
  },
  
  references: {
    title: 'References',
    options: [
      'References',
      'Referees',
      'Testimonials',
      'Recommendations'
    ]
  },
  
  tech: {
    title: 'Tech / Developer Specific',
    options: [
      'Technology Stack',
      'Coding Profiles',
      'GitHub Profile',
      'GitHub / Portfolio Links',
      'Tech Certifications',
      'Development Tools'
    ]
  },
  
  management: {
    title: 'Management Specific',
    options: [
      'Management Skills',
      'Business Impact',
      'Strategic Initiatives',
      'Leadership Summary',
      'Team Management'
    ]
  },
  
  additional: {
    title: 'Additional Information',
    options: [
      'Objective Statement',
      'Summary of Qualifications',
      'Career Timeline',
      'Additional Information',
      'Availability',
      'Relocation Preferences',
      'Salary Expectations',
      'Notice Period',
      'Work Authorization',
      'Visa Status'
    ]
  }
};

/**
 * Popular sections that can be shown as quick-add options
 */
export const POPULAR_SECTIONS = [
  'Professional Summary',
  'Certifications',
  'Achievements',
  'Languages Known',
  'Volunteer Experience',
  'Publications',
  'GitHub Profile',
  'References'
];

/**
 * Helper function to get all section names
 */
export const getAllSectionNames = () => {
  return SECTION_OPTIONS;
};

/**
 * Helper function to check if a section name exists
 */
export const isSectionValid = (sectionName) => {
  return SECTION_OPTIONS.includes(sectionName);
};

/**
 * Helper function to search sections
 */
export const searchSections = (query) => {
  const lowerQuery = query.toLowerCase();
  return SECTION_OPTIONS.filter(section => 
    section.toLowerCase().includes(lowerQuery)
  );
};

export default SECTION_OPTIONS;