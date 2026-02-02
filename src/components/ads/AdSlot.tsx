import { useMemo } from 'react';
import { AdCreative, getSessionCreative, billboardCreatives, verticalCreatives } from '@/data/adCreatives';
import { Badge } from '@/components/ui/badge';

interface AdSlotProps {
  type: 'billboard' | 'vertical';
  className?: string;
}

// SVG-based creative renderer
const BillboardCreative = ({ creative }: { creative: AdCreative }) => (
  <svg viewBox="0 0 970 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id={`grad-${creative.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={creative.gradientFrom} />
        <stop offset="100%" stopColor={creative.gradientTo} />
      </linearGradient>
      <pattern id={`pattern-${creative.id}`} patternUnits="userSpaceOnUse" width="60" height="60">
        <circle cx="30" cy="30" r="2" fill={creative.accentColor} opacity="0.15" />
        <circle cx="10" cy="10" r="1.5" fill={creative.accentColor} opacity="0.1" />
        <circle cx="50" cy="50" r="1" fill={creative.accentColor} opacity="0.1" />
      </pattern>
    </defs>
    
    {/* Background */}
    <rect width="970" height="250" fill={`url(#grad-${creative.id})`} />
    <rect width="970" height="250" fill={`url(#pattern-${creative.id})`} />
    
    {/* Decorative elements */}
    <circle cx="850" cy="125" r="80" fill={creative.accentColor} opacity="0.1" />
    <circle cx="870" cy="105" r="40" fill={creative.accentColor} opacity="0.15" />
    
    {/* Chart decoration */}
    <g transform="translate(720, 80)">
      <rect x="0" y="60" width="20" height="70" fill={creative.accentColor} opacity="0.3" rx="4" />
      <rect x="30" y="30" width="20" height="100" fill={creative.accentColor} opacity="0.4" rx="4" />
      <rect x="60" y="50" width="20" height="80" fill={creative.accentColor} opacity="0.35" rx="4" />
      <rect x="90" y="10" width="20" height="120" fill={creative.accentColor} opacity="0.5" rx="4" />
    </g>
    
    {/* Text content */}
    <text x="50" y="95" fill="white" fontSize="28" fontWeight="bold" fontFamily="system-ui, sans-serif">
      {creative.title}
    </text>
    <text x="50" y="130" fill="white" fontSize="16" opacity="0.85" fontFamily="system-ui, sans-serif">
      {creative.subtitle}
    </text>
    
    {/* CTA Button */}
    <rect x="50" y="155" width="140" height="45" rx="8" fill="white" />
    <text x="120" y="185" fill={creative.gradientFrom} fontSize="16" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
      {creative.ctaText}
    </text>
    
    {/* Disclaimer */}
    <text x="50" y="230" fill="white" fontSize="10" opacity="0.6" fontFamily="system-ui, sans-serif">
      {creative.disclaimer}
    </text>
  </svg>
);

const VerticalCreative = ({ creative }: { creative: AdCreative }) => (
  <svg viewBox="0 0 300 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id={`vgrad-${creative.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={creative.gradientFrom} />
        <stop offset="100%" stopColor={creative.gradientTo} />
      </linearGradient>
      <pattern id={`vpattern-${creative.id}`} patternUnits="userSpaceOnUse" width="40" height="40">
        <circle cx="20" cy="20" r="1.5" fill={creative.accentColor} opacity="0.2" />
      </pattern>
    </defs>
    
    {/* Background */}
    <rect width="300" height="600" fill={`url(#vgrad-${creative.id})`} />
    <rect width="300" height="600" fill={`url(#vpattern-${creative.id})`} />
    
    {/* Decorative circles */}
    <circle cx="250" cy="100" r="60" fill={creative.accentColor} opacity="0.1" />
    <circle cx="50" cy="500" r="80" fill={creative.accentColor} opacity="0.08" />
    
    {/* Icons */}
    <g transform="translate(100, 150)">
      {/* Checklist icon */}
      <rect x="0" y="0" width="100" height="100" rx="20" fill="white" opacity="0.15" />
      <rect x="25" y="30" width="50" height="6" rx="3" fill="white" opacity="0.8" />
      <rect x="25" y="45" width="35" height="6" rx="3" fill="white" opacity="0.6" />
      <rect x="25" y="60" width="45" height="6" rx="3" fill="white" opacity="0.7" />
      <circle cx="15" cy="33" r="5" fill={creative.accentColor} />
      <circle cx="15" cy="48" r="5" fill={creative.accentColor} />
      <circle cx="15" cy="63" r="5" fill={creative.accentColor} />
    </g>
    
    {/* Spark icon */}
    <g transform="translate(200, 120)">
      <polygon points="25,0 30,20 50,25 30,30 25,50 20,30 0,25 20,20" fill={creative.accentColor} opacity="0.6" />
    </g>
    
    {/* Text content */}
    <text x="150" y="320" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">
      <tspan x="150" dy="0">{creative.title.split(':')[0]}:</tspan>
      <tspan x="150" dy="28">{creative.title.split(':')[1] || ''}</tspan>
    </text>
    <text x="150" y="400" fill="white" fontSize="14" opacity="0.85" textAnchor="middle" fontFamily="system-ui, sans-serif">
      <tspan x="150" dy="0">{creative.subtitle.split('.')[0]}.</tspan>
      <tspan x="150" dy="20">{creative.subtitle.split('.')[1] || ''}</tspan>
    </text>
    
    {/* CTA Button */}
    <rect x="75" y="470" width="150" height="50" rx="10" fill="white" />
    <text x="150" y="502" fill={creative.gradientFrom} fontSize="16" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
      {creative.ctaText}
    </text>
    
    {/* Disclaimer */}
    <text x="150" y="570" fill="white" fontSize="9" opacity="0.5" textAnchor="middle" fontFamily="system-ui, sans-serif">
      {creative.disclaimer}
    </text>
  </svg>
);

const AdSlot = ({ type, className = '' }: AdSlotProps) => {
  const creative = useMemo(() => {
    if (type === 'billboard') {
      return getSessionCreative(billboardCreatives, 'billboard');
    }
    return getSessionCreative(verticalCreatives, 'vertical');
  }, [type]);

  const containerClasses = {
    billboard: 'w-full max-w-[970px] mx-auto aspect-[970/250]',
    vertical: 'w-full max-w-[300px] aspect-[300/600]',
  };

  return (
    <div className={`relative group ${className}`}>
      <a
        href={creative.clickUrl}
        className={`block ${containerClasses[type]} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border border-border/50`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {type === 'billboard' ? (
          <BillboardCreative creative={creative} />
        ) : (
          <VerticalCreative creative={creative} />
        )}
      </a>
      <Badge 
        variant="secondary" 
        className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 bg-background/80 backdrop-blur-sm text-muted-foreground"
      >
        Reklama
      </Badge>
    </div>
  );
};

export default AdSlot;
