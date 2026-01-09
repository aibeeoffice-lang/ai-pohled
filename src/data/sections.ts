import { Section } from './articles';

export interface SectionConfig {
  slug: string;
  label: string;
  sectionKey: Section;
  title: string;
}

export const SECTIONS: SectionConfig[] = [
  { slug: 'novinky', label: 'Novinky', sectionKey: 'Novinky', title: 'Novinky' },
  { slug: 'vysvetleno', label: 'Vysvětleno', sectionKey: 'Vysvětleno', title: 'Vysvětleno (AI Akademie)' },
  { slug: 'navody', label: 'Návody', sectionKey: 'Návody', title: 'Návody a tipy' },
  { slug: 'nastroje', label: 'Nástroje', sectionKey: 'Nástroje', title: 'Nástroje a recenze' },
  { slug: 'ai-v-praci', label: 'AI v práci', sectionKey: 'AI v práci', title: 'AI v práci' },
  { slug: 'pro', label: 'PRO', sectionKey: 'PRO', title: 'PRO' },
];

export const getSectionBySlug = (slug: string): SectionConfig | undefined => {
  return SECTIONS.find(s => s.slug === slug);
};

export const getSectionByKey = (key: Section): SectionConfig | undefined => {
  return SECTIONS.find(s => s.sectionKey === key);
};

export const isValidSectionSlug = (slug: string): boolean => {
  return SECTIONS.some(s => s.slug === slug);
};
