interface AIPulseProps {
  className?: string;
  variant?: 'header' | 'section' | 'separator' | 'hero';
}

export const AIPulse = ({ className = '', variant = 'section' }: AIPulseProps) => {
  if (variant === 'header') {
    return (
      <svg className={`w-full h-1 ${className}`} viewBox="0 0 200 4" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pulse-header" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="200" height="4" fill="url(#pulse-header)" rx="2" />
      </svg>
    );
  }

  if (variant === 'separator') {
    return (
      <svg className={`w-16 h-1 ${className}`} viewBox="0 0 64 4">
        <defs>
          <linearGradient id="pulse-sep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect width="64" height="4" fill="url(#pulse-sep)" rx="2" />
      </svg>
    );
  }

  if (variant === 'hero') {
    return (
      <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white" opacity="0.1" />
          </pattern>
          <linearGradient id="hero-wave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
        <path
          d="M0 70% Q25% 60% 50% 70% T100% 70%"
          stroke="url(#hero-wave)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 75% Q25% 85% 50% 75% T100% 75%"
          stroke="url(#hero-wave)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="10%" cy="20%" r="100" fill="white" opacity="0.02" />
        <circle cx="90%" cy="80%" r="150" fill="white" opacity="0.02" />
      </svg>
    );
  }

  // Default section variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        <div className="w-1 h-1 rounded-full bg-accent/40" />
      </div>
      <div className="h-0.5 flex-1 bg-gradient-to-r from-accent/50 via-accent/20 to-transparent rounded-full" />
    </div>
  );
};

export default AIPulse;
