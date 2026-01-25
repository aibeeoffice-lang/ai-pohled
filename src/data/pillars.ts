export type ProPillar = 'Byznys & trh' | 'Výzkum' | 'Dev & data' | 'Regulace & governance';

export interface PillarConfig {
  key: ProPillar;
  label: string;
  description: string;
}

export const PRO_PILLARS: PillarConfig[] = [
  { 
    key: 'Byznys & trh', 
    label: 'Byznys & trh',
    description: 'Investice, pricing, akvizice, dopady na firmy v ČR/EU.'
  },
  { 
    key: 'Výzkum', 
    label: 'Výzkum',
    description: 'Co vyšlo, proč to matters, benchmarky bez zbytečné matematiky.'
  },
  { 
    key: 'Dev & data', 
    label: 'Dev & data',
    description: 'RAG, fine-tuning, evaluace, agenti, MLOps – prakticky.'
  },
  { 
    key: 'Regulace & governance', 
    label: 'Regulace & governance',
    description: 'Compliance, interní směrnice, risk management pro firmy.'
  },
];

export const getPillarByKey = (key: ProPillar): PillarConfig | undefined => {
  return PRO_PILLARS.find(p => p.key === key);
};

export const getPillarBadgeColor = (pillar: ProPillar): string => {
  const colors: Record<ProPillar, string> = {
    'Byznys & trh': 'border-amber-500/50 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
    'Výzkum': 'border-purple-500/50 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30',
    'Dev & data': 'border-cyan-500/50 text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30',
    'Regulace & governance': 'border-slate-500/50 text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/30',
  };
  return colors[pillar];
};
