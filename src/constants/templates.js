
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';

export const TEMPLATES = [
  { id: 1, name: 'Modern', component: ModernTemplate, preview: 'Blue accent with sidebar' },
  { id: 2, name: 'Classic', component: ClassicTemplate, preview: 'Traditional single column' },
  { id: 3, name: 'Minimal', component: MinimalTemplate, preview: 'Clean and simple' },
  { id: 4, name: 'Creative', component: CreativeTemplate, preview: 'Colorful cards layout' },
  { id: 5, name: 'Professional', component: ProfessionalTemplate, preview: 'Corporate dark header' },
  { id: 6, name: 'Executive', component: ModernTemplate, preview: 'Leadership focused' },
  { id: 7, name: 'Technical', component: ClassicTemplate, preview: 'Developer optimized' },
  { id: 8, name: 'Academic', component: MinimalTemplate, preview: 'Research focused' },
  { id: 9, name: 'Startup', component: CreativeTemplate, preview: 'Dynamic and bold' },
  { id: 10, name: 'Corporate', component: ProfessionalTemplate, preview: 'Traditional business' }
];
