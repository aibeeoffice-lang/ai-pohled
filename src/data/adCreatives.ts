export interface AdCreative {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  clickUrl: string;
  disclaimer: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
}

export const skinCreatives: AdCreative[] = [
  {
    id: 'skin-a',
    title: 'AI pohled: Přestaň hádat. Začni měřit.',
    subtitle: 'Metriky, které nejsou vanity. Demo kampaň.',
    ctaText: 'Zjistit víc',
    clickUrl: '/reklama-demo',
    disclaimer: 'Ukázková reklama (demo)',
    gradientFrom: '#1a1a2e',
    gradientTo: '#16213e',
    accentColor: '#0f3460',
  },
];

export const billboardCreatives: AdCreative[] = [
  {
    id: 'billboard-a',
    title: 'AI pohled: Přestaň hádat. Začni měřit.',
    subtitle: 'Metriky, které nejsou vanity. Demo kampaň.',
    ctaText: 'Zjistit víc',
    clickUrl: '/reklama-demo',
    disclaimer: 'Ukázková reklama (demo)',
    gradientFrom: '#667eea',
    gradientTo: '#764ba2',
    accentColor: '#f093fb',
  },
  {
    id: 'billboard-c',
    title: 'Nástroje týdne: 5 tipů, co fakt šetří čas',
    subtitle: 'Bez affiliate. Jen doporučení.',
    ctaText: 'Otevřít',
    clickUrl: '/reklama-demo',
    disclaimer: 'Ukázková reklama (demo)',
    gradientFrom: '#11998e',
    gradientTo: '#38ef7d',
    accentColor: '#ffffff',
  },
];

export const verticalCreatives: AdCreative[] = [
  {
    id: 'vertical-b',
    title: 'Školení: AI pro normální lidi',
    subtitle: 'Od chaosu k workflow za 2 týdny.',
    ctaText: 'Chci osnovu',
    clickUrl: '/reklama-demo',
    disclaimer: 'Ukázková reklama (demo)',
    gradientFrom: '#fc4a1a',
    gradientTo: '#f7b733',
    accentColor: '#ffffff',
  },
  {
    id: 'vertical-d',
    title: 'Premium bez stresu',
    subtitle: 'Čti hloubku. Plať drobné.',
    ctaText: 'Mrknout',
    clickUrl: '/predplatne',
    disclaimer: 'Ukázková reklama (demo)',
    gradientFrom: '#8e2de2',
    gradientTo: '#4a00e0',
    accentColor: '#ffd700',
  },
];

// Get a random creative, but consistent per session
export const getSessionCreative = <T extends AdCreative>(
  creatives: T[],
  slotKey: string
): T => {
  const storageKey = `ad_creative_${slotKey}`;
  
  if (typeof window === 'undefined') {
    return creatives[0];
  }
  
  let index = sessionStorage.getItem(storageKey);
  
  if (index === null) {
    const randomIndex = Math.floor(Math.random() * creatives.length);
    sessionStorage.setItem(storageKey, String(randomIndex));
    index = String(randomIndex);
  }
  
  return creatives[parseInt(index, 10) % creatives.length];
};
