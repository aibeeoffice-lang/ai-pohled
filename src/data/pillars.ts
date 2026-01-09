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
