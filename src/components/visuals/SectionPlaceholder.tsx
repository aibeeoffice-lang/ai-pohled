import { Section } from '@/data/articles';
import { ProPillar } from '@/data/pillars';

interface SectionPlaceholderProps {
  section: Section;
  pillar?: ProPillar;
  className?: string;
}

// Novinky - Waveform with dots
const NovinkyPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="novinky-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(0 72% 51%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(0 72% 41%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#novinky-grad)" />
    <path
      d="M0 150 Q50 100 100 150 T200 150 T300 150 T400 150"
      stroke="white"
      strokeWidth="3"
      fill="none"
      opacity="0.4"
    />
    <path
      d="M0 170 Q50 220 100 170 T200 170 T300 170 T400 170"
      stroke="white"
      strokeWidth="2"
      fill="none"
      opacity="0.3"
    />
    {[50, 100, 150, 200, 250, 300, 350].map((x, i) => (
      <circle key={i} cx={x} cy={150 + Math.sin(i) * 20} r="6" fill="white" opacity="0.6" />
    ))}
    <circle cx="200" cy="150" r="40" fill="white" opacity="0.15" />
  </svg>
);

// Vysvětleno - Book with nodes
const VysvetlenoPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="vysvetleno-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(262 83% 58%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(262 83% 45%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#vysvetleno-grad)" />
    {/* Book shape */}
    <path d="M160 80 L200 100 L240 80 L240 220 L200 200 L160 220 Z" fill="white" opacity="0.25" />
    <line x1="200" y1="100" x2="200" y2="200" stroke="white" strokeWidth="2" opacity="0.4" />
    {/* Nodes */}
    <circle cx="100" cy="100" r="15" fill="white" opacity="0.3" />
    <circle cx="300" cy="100" r="15" fill="white" opacity="0.3" />
    <circle cx="100" cy="200" r="15" fill="white" opacity="0.3" />
    <circle cx="300" cy="200" r="15" fill="white" opacity="0.3" />
    {/* Connections */}
    <line x1="115" y1="100" x2="160" y2="100" stroke="white" strokeWidth="1.5" opacity="0.3" />
    <line x1="240" y1="100" x2="285" y2="100" stroke="white" strokeWidth="1.5" opacity="0.3" />
    <line x1="115" y1="200" x2="160" y2="200" stroke="white" strokeWidth="1.5" opacity="0.3" />
    <line x1="240" y1="200" x2="285" y2="200" stroke="white" strokeWidth="1.5" opacity="0.3" />
  </svg>
);

// Návody - Checklist schematic
const NavodyPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="navody-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(142 70% 45%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(142 70% 35%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#navody-grad)" />
    {/* Checklist items */}
    {[80, 130, 180, 230].map((y, i) => (
      <g key={i}>
        <rect x="120" y={y} width="24" height="24" rx="4" fill="white" opacity="0.3" />
        {i < 2 && (
          <path d={`M125 ${y + 12} L130 ${y + 18} L140 ${y + 8}`} stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
        )}
        <rect x="160" y={y + 6} width={120 - i * 20} height="12" rx="6" fill="white" opacity="0.25" />
      </g>
    ))}
    {/* Decorative arrow */}
    <path d="M320 150 L340 170 L320 190" stroke="white" strokeWidth="3" fill="none" opacity="0.4" />
  </svg>
);

// Nástroje - Grid/tool icons
const NastrojePattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="nastroje-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(217 91% 45%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#nastroje-grad)" />
    {/* Grid of tool icons */}
    {[[140, 90], [200, 90], [260, 90], [140, 150], [200, 150], [260, 150], [140, 210], [200, 210], [260, 210]].map(([x, y], i) => (
      <g key={i}>
        <rect x={x - 25} y={y - 25} width="50" height="50" rx="8" fill="white" opacity={0.15 + (i % 3) * 0.05} />
        <circle cx={x} cy={y} r="12" fill="white" opacity="0.3" />
      </g>
    ))}
    {/* Connecting lines */}
    <line x1="140" y1="115" x2="140" y2="125" stroke="white" strokeWidth="2" opacity="0.2" />
    <line x1="200" y1="115" x2="200" y2="125" stroke="white" strokeWidth="2" opacity="0.2" />
    <line x1="260" y1="115" x2="260" y2="125" stroke="white" strokeWidth="2" opacity="0.2" />
  </svg>
);

// AI v práci - Briefcase with nodes
const AiVPraciPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="praci-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(32 95% 44%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(32 95% 34%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#praci-grad)" />
    {/* Briefcase */}
    <rect x="150" y="110" width="100" height="80" rx="8" fill="white" opacity="0.25" />
    <rect x="175" y="95" width="50" height="20" rx="4" fill="white" opacity="0.2" />
    <line x1="150" y1="140" x2="250" y2="140" stroke="white" strokeWidth="2" opacity="0.3" />
    {/* Nodes around */}
    <circle cx="80" cy="100" r="12" fill="white" opacity="0.3" />
    <circle cx="320" cy="100" r="12" fill="white" opacity="0.3" />
    <circle cx="80" cy="200" r="12" fill="white" opacity="0.3" />
    <circle cx="320" cy="200" r="12" fill="white" opacity="0.3" />
    {/* Connection lines */}
    <line x1="92" y1="100" x2="150" y2="130" stroke="white" strokeWidth="1.5" opacity="0.25" strokeDasharray="4 2" />
    <line x1="308" y1="100" x2="250" y2="130" stroke="white" strokeWidth="1.5" opacity="0.25" strokeDasharray="4 2" />
    <line x1="92" y1="200" x2="150" y2="170" stroke="white" strokeWidth="1.5" opacity="0.25" strokeDasharray="4 2" />
    <line x1="308" y1="200" x2="250" y2="170" stroke="white" strokeWidth="1.5" opacity="0.25" strokeDasharray="4 2" />
  </svg>
);

// PRO - Byznys & trh - Bar chart line
const ByznysTrhPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="byznys-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity="0.95" />
        <stop offset="100%" stopColor="hsl(38 92% 40%)" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#byznys-grad)" />
    {/* Bar chart */}
    {[100, 160, 220, 280].map((x, i) => (
      <rect key={i} x={x} y={200 - [80, 120, 60, 140][i]} width="40" height={[80, 120, 60, 140][i]} rx="4" fill="white" opacity="0.3" />
    ))}
    {/* Trend line */}
    <path d="M110 140 L180 100 L240 160 L300 80" stroke="white" strokeWidth="3" fill="none" opacity="0.6" />
    <circle cx="110" cy="140" r="6" fill="white" opacity="0.8" />
    <circle cx="180" cy="100" r="6" fill="white" opacity="0.8" />
    <circle cx="240" cy="160" r="6" fill="white" opacity="0.8" />
    <circle cx="300" cy="80" r="6" fill="white" opacity="0.8" />
    {/* Axis */}
    <line x1="80" y1="200" x2="320" y2="200" stroke="white" strokeWidth="2" opacity="0.4" />
  </svg>
);

// PRO - Výzkum - Microscope/graph abstract
const VyzkumPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="vyzkum-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(280 70% 50%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(280 70% 40%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#vyzkum-grad)" />
    {/* Abstract microscope lens */}
    <circle cx="200" cy="130" r="60" fill="none" stroke="white" strokeWidth="4" opacity="0.4" />
    <circle cx="200" cy="130" r="40" fill="white" opacity="0.15" />
    <circle cx="200" cy="130" r="20" fill="white" opacity="0.2" />
    {/* Stand */}
    <rect x="190" y="190" width="20" height="60" rx="4" fill="white" opacity="0.3" />
    <rect x="160" y="240" width="80" height="10" rx="4" fill="white" opacity="0.25" />
    {/* Data points in lens */}
    <circle cx="185" cy="120" r="5" fill="white" opacity="0.6" />
    <circle cx="210" cy="135" r="4" fill="white" opacity="0.5" />
    <circle cx="195" cy="145" r="3" fill="white" opacity="0.4" />
  </svg>
);

// PRO - Dev & data - Pipeline blocks
const DevDataPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="devdata-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(200 80% 50%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(200 80% 40%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#devdata-grad)" />
    {/* Pipeline blocks */}
    <rect x="60" y="120" width="60" height="60" rx="8" fill="white" opacity="0.3" />
    <rect x="170" y="120" width="60" height="60" rx="8" fill="white" opacity="0.35" />
    <rect x="280" y="120" width="60" height="60" rx="8" fill="white" opacity="0.3" />
    {/* Arrows */}
    <path d="M125 150 L160 150" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
    <polygon points="155,145 165,150 155,155" fill="white" opacity="0.5" />
    <path d="M235 150 L270 150" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
    <polygon points="265,145 275,150 265,155" fill="white" opacity="0.5" />
    {/* Labels */}
    <text x="90" y="155" fill="white" fontSize="14" textAnchor="middle" opacity="0.7">IN</text>
    <text x="200" y="155" fill="white" fontSize="14" textAnchor="middle" opacity="0.7">AI</text>
    <text x="310" y="155" fill="white" fontSize="14" textAnchor="middle" opacity="0.7">OUT</text>
  </svg>
);

// PRO - Regulace & governance - Shield/checklist
const RegulacePattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="regulace-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(220 60% 50%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(220 60% 40%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#regulace-grad)" />
    {/* Shield */}
    <path d="M200 60 L260 90 L260 160 Q260 220 200 250 Q140 220 140 160 L140 90 Z" fill="white" opacity="0.25" />
    {/* Checkmark in shield */}
    <path d="M170 150 L190 170 L230 120" stroke="white" strokeWidth="6" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
    {/* Decorative lines */}
    <line x1="80" y1="80" x2="120" y2="80" stroke="white" strokeWidth="2" opacity="0.3" />
    <line x1="80" y1="100" x2="110" y2="100" stroke="white" strokeWidth="2" opacity="0.2" />
    <line x1="280" y1="80" x2="320" y2="80" stroke="white" strokeWidth="2" opacity="0.3" />
    <line x1="290" y1="100" x2="320" y2="100" stroke="white" strokeWidth="2" opacity="0.2" />
  </svg>
);

// Default PRO pattern
const ProDefaultPattern = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="pro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(38 92% 40%)" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#pro-grad)" />
    {/* Abstract network */}
    <circle cx="200" cy="150" r="50" fill="white" opacity="0.2" />
    <circle cx="120" cy="100" r="20" fill="white" opacity="0.25" />
    <circle cx="280" cy="100" r="20" fill="white" opacity="0.25" />
    <circle cx="120" cy="200" r="20" fill="white" opacity="0.25" />
    <circle cx="280" cy="200" r="20" fill="white" opacity="0.25" />
    <line x1="140" y1="100" x2="180" y2="130" stroke="white" strokeWidth="2" opacity="0.3" />
    <line x1="260" y1="100" x2="220" y2="130" stroke="white" strokeWidth="2" opacity="0.3" />
    <line x1="140" y1="200" x2="180" y2="170" stroke="white" strokeWidth="2" opacity="0.3" />
    <line x1="260" y1="200" x2="220" y2="170" stroke="white" strokeWidth="2" opacity="0.3" />
    <text x="200" y="158" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" opacity="0.8">PRO</text>
  </svg>
);

export const SectionPlaceholder = ({ section, pillar, className = '' }: SectionPlaceholderProps) => {
  const getPattern = () => {
    if (section === 'PRO' && pillar) {
      switch (pillar) {
        case 'Byznys & trh': return <ByznysTrhPattern />;
        case 'Výzkum': return <VyzkumPattern />;
        case 'Dev & data': return <DevDataPattern />;
        case 'Regulace & governance': return <RegulacePattern />;
        default: return <ProDefaultPattern />;
      }
    }
    
    switch (section) {
      case 'Novinky': return <NovinkyPattern />;
      case 'Vysvětleno': return <VysvetlenoPattern />;
      case 'Návody': return <NavodyPattern />;
      case 'Nástroje': return <NastrojePattern />;
      case 'AI v práci': return <AiVPraciPattern />;
      case 'PRO': return <ProDefaultPattern />;
      default: return <NovinkyPattern />;
    }
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      {getPattern()}
    </div>
  );
};

export default SectionPlaceholder;
