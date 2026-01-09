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
  { id: 5, name: 'Professional', component: ProfessionalTemplate, preview: 'Corporate dark header' }
];