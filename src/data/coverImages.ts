// Cover image mappings for all articles - uses section-based placeholders
// In a real app, these would be actual image URLs

import { Section } from './articles';
import { ProPillar } from './pillars';

export const getCoverImagePlaceholder = (section: Section, pillar?: ProPillar): string => {
  // Return a data URL or placeholder identifier that will be handled by the component
  // Using special identifiers that SectionPlaceholder component will recognize
  return `placeholder:${section}${pillar ? `:${pillar}` : ''}`;
};

// Article cover image assignments
export const articleCoverImages: Record<string, string> = {
  // Novinky
  '1': 'placeholder:Novinky',
  '2': 'placeholder:Novinky',
  '3': 'placeholder:Novinky',
  '4': 'placeholder:Novinky',
  '5': 'placeholder:Novinky',
  '6': 'placeholder:Novinky',
  
  // Vysvětleno
  '7': 'placeholder:Vysvětleno',
  '8': 'placeholder:Vysvětleno',
  '9': 'placeholder:Vysvětleno',
  '10': 'placeholder:Vysvětleno',
  '11': 'placeholder:Vysvětleno',
  '12': 'placeholder:Vysvětleno',
  
  // Návody
  '13': 'placeholder:Návody',
  '14': 'placeholder:Návody',
  '15': 'placeholder:Návody',
  '16': 'placeholder:Návody',
  '17': 'placeholder:Návody',
  '18': 'placeholder:Návody',
  
  // Nástroje
  '19': 'placeholder:Nástroje',
  '20': 'placeholder:Nástroje',
  '21': 'placeholder:Nástroje',
  '22': 'placeholder:Nástroje',
  '23': 'placeholder:Nástroje',
  '24': 'placeholder:Nástroje',
  
  // AI v práci
  '25': 'placeholder:AI v práci',
  '26': 'placeholder:AI v práci',
  '27': 'placeholder:AI v práci',
  '28': 'placeholder:AI v práci',
  '29': 'placeholder:AI v práci',
  '30': 'placeholder:AI v práci',
  
  // PRO - with pillars
  '31': 'placeholder:PRO:Byznys & trh',
  '32': 'placeholder:PRO:Byznys & trh',
  '33': 'placeholder:PRO:Regulace & governance',
  '34': 'placeholder:PRO:Dev & data',
  '35': 'placeholder:PRO:Regulace & governance',
  '36': 'placeholder:PRO:Byznys & trh',
  '37': 'placeholder:PRO:Dev & data',
  '38': 'placeholder:PRO:Byznys & trh',
  '39': 'placeholder:PRO:Výzkum',
  '40': 'placeholder:PRO:Výzkum',
  '41': 'placeholder:PRO:Dev & data',
};

// Parse placeholder string to get section and pillar
export const parsePlaceholder = (coverImage: string): { section: Section; pillar?: ProPillar } | null => {
  if (!coverImage.startsWith('placeholder:')) return null;
  
  const parts = coverImage.replace('placeholder:', '').split(':');
  return {
    section: parts[0] as Section,
    pillar: parts[1] as ProPillar | undefined,
  };
};
