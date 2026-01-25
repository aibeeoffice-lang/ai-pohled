interface NetworkBackgroundProps {
  className?: string;
  variant?: 'hero' | 'pro' | 'light';
}

export const NetworkBackground = ({ className = '', variant = 'hero' }: NetworkBackgroundProps) => {
  const opacity = variant === 'light' ? 0.05 : 0.1;
  const strokeColor = variant === 'light' ? 'hsl(var(--foreground))' : 'white';

  return (
    <svg 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} 
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`network-dots-${variant}`} width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill={strokeColor} opacity={opacity} />
        </pattern>
      </defs>
      
      {/* Dot grid */}
      <rect width="100%" height="100%" fill={`url(#network-dots-${variant})`} />
      
      {/* Decorative nodes */}
      <g opacity={opacity * 2}>
        {/* Top left cluster */}
        <circle cx="10%" cy="20%" r="4" fill={strokeColor} />
        <circle cx="15%" cy="25%" r="3" fill={strokeColor} />
        <circle cx="8%" cy="30%" r="2" fill={strokeColor} />
        <line x1="10%" y1="20%" x2="15%" y2="25%" stroke={strokeColor} strokeWidth="1" />
        <line x1="15%" y1="25%" x2="8%" y2="30%" stroke={strokeColor} strokeWidth="1" />
        
        {/* Top right cluster */}
        <circle cx="85%" cy="15%" r="3" fill={strokeColor} />
        <circle cx="90%" cy="22%" r="4" fill={strokeColor} />
        <circle cx="92%" cy="12%" r="2" fill={strokeColor} />
        <line x1="85%" y1="15%" x2="90%" y2="22%" stroke={strokeColor} strokeWidth="1" />
        <line x1="90%" y1="22%" x2="92%" y2="12%" stroke={strokeColor} strokeWidth="1" />
        
        {/* Bottom cluster */}
        <circle cx="75%" cy="85%" r="3" fill={strokeColor} />
        <circle cx="80%" cy="80%" r="4" fill={strokeColor} />
        <circle cx="70%" cy="78%" r="2" fill={strokeColor} />
        <line x1="75%" y1="85%" x2="80%" y2="80%" stroke={strokeColor} strokeWidth="1" />
        <line x1="80%" y1="80%" x2="70%" y2="78%" stroke={strokeColor} strokeWidth="1" />
      </g>
      
      {/* Subtle connection lines */}
      <g stroke={strokeColor} strokeWidth="0.5" opacity={opacity * 0.5}>
        <line x1="0%" y1="50%" x2="30%" y2="40%" strokeDasharray="4 4" />
        <line x1="70%" y1="60%" x2="100%" y2="50%" strokeDasharray="4 4" />
      </g>
    </svg>
  );
};

export default NetworkBackground;
