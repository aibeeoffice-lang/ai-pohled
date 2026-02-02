import { useMemo } from 'react';
import { getSessionCreative, skinCreatives } from '@/data/adCreatives';

interface SkinAdProps {
  children: React.ReactNode;
}

const SkinAd = ({ children }: SkinAdProps) => {
  const creative = useMemo(() => getSessionCreative(skinCreatives, 'skin'), []);

  return (
    <div className="relative min-h-screen">
      {/* Skin background - desktop only */}
      <a
        href={creative.clickUrl}
        className="hidden xl:block fixed inset-0 z-0 cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={creative.title}
      >
        <svg
          viewBox="0 0 2000 1400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="skin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={creative.gradientFrom} />
              <stop offset="100%" stopColor={creative.gradientTo} />
            </linearGradient>
            <pattern id="skin-dots" patternUnits="userSpaceOnUse" width="80" height="80">
              <circle cx="40" cy="40" r="2" fill={creative.accentColor} opacity="0.3" />
              <circle cx="10" cy="10" r="1" fill={creative.accentColor} opacity="0.2" />
              <circle cx="70" cy="70" r="1.5" fill={creative.accentColor} opacity="0.15" />
            </pattern>
            {/* Create mask for center cutout - we'll use CSS instead */}
          </defs>
          
          {/* Background */}
          <rect width="2000" height="1400" fill="url(#skin-grad)" />
          <rect width="2000" height="1400" fill="url(#skin-dots)" />
          
          {/* Left side decorations */}
          <g transform="translate(50, 200)">
            <circle cx="80" cy="100" r="60" fill={creative.accentColor} opacity="0.1" />
            <circle cx="100" cy="300" r="40" fill={creative.accentColor} opacity="0.08" />
            
            {/* Network nodes */}
            <circle cx="60" cy="500" r="8" fill={creative.accentColor} opacity="0.4" />
            <circle cx="120" cy="550" r="6" fill={creative.accentColor} opacity="0.3" />
            <circle cx="80" cy="620" r="10" fill={creative.accentColor} opacity="0.35" />
            <line x1="60" y1="500" x2="120" y2="550" stroke={creative.accentColor} strokeWidth="1" opacity="0.2" />
            <line x1="120" y1="550" x2="80" y2="620" stroke={creative.accentColor} strokeWidth="1" opacity="0.2" />
          </g>
          
          {/* Right side decorations */}
          <g transform="translate(1700, 200)">
            <circle cx="150" cy="150" r="70" fill={creative.accentColor} opacity="0.1" />
            <circle cx="100" cy="400" r="50" fill={creative.accentColor} opacity="0.08" />
            
            {/* Chart bars */}
            <rect x="50" y="600" width="25" height="80" rx="4" fill={creative.accentColor} opacity="0.2" />
            <rect x="85" y="550" width="25" height="130" rx="4" fill={creative.accentColor} opacity="0.25" />
            <rect x="120" y="580" width="25" height="100" rx="4" fill={creative.accentColor} opacity="0.22" />
            <rect x="155" y="520" width="25" height="160" rx="4" fill={creative.accentColor} opacity="0.3" />
          </g>
          
          {/* Top left branding text */}
          <text x="80" y="120" fill="white" fontSize="14" opacity="0.4" fontFamily="system-ui, sans-serif">
            {creative.title}
          </text>
          
          {/* Bottom right CTA hint */}
          <text x="1850" y="1350" fill="white" fontSize="12" opacity="0.3" textAnchor="end" fontFamily="system-ui, sans-serif">
            {creative.ctaText} →
          </text>
          
          {/* Disclaimer */}
          <text x="80" y="1350" fill="white" fontSize="10" opacity="0.25" fontFamily="system-ui, sans-serif">
            {creative.disclaimer}
          </text>
        </svg>
        
        {/* "Reklama" badge */}
        <span className="absolute top-4 left-4 text-[10px] px-2 py-1 rounded bg-white/10 text-white/50 backdrop-blur-sm">
          Reklama
        </span>
      </a>
      
      {/* Main content - sits above skin */}
      <div className="relative z-10 bg-background xl:max-w-[1200px] xl:mx-auto xl:shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default SkinAd;
