import React from 'react';

interface LiraMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'thinking' | 'excited' | 'waving';
  className?: string;
  animate?: boolean;
}

const LiraMascot: React.FC<LiraMascotProps> = ({
  size = 'md',
  mood = 'happy',
  className = '',
  animate = true,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const animationClass = animate ? 'animate-float' : '';

  // Different expressions based on mood
  const moodConfig = {
    happy: { eyes: '◠', mouth: '‿', blush: true },
    thinking: { eyes: '◔', mouth: '～', blush: false },
    excited: { eyes: '✧', mouth: 'ω', blush: true },
    waving: { eyes: '◠', mouth: '‿', blush: true },
  };

  const config = moodConfig[mood];

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClass} ${className}`}>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 scale-125" />

      {/* Main body - fairy orb */}
      <svg
        viewBox="0 0 100 100"
        className="relative w-full h-full drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' }}
      >
        {/* Wings */}
        <ellipse
          cx="20"
          cy="50"
          rx="18"
          ry="25"
          fill="url(#wingGradient)"
          opacity="0.7"
          className={animate ? 'origin-right' : ''}
          style={animate ? { animation: 'pulse-soft 2s ease-in-out infinite' } : {}}
        />
        <ellipse
          cx="80"
          cy="50"
          rx="18"
          ry="25"
          fill="url(#wingGradient)"
          opacity="0.7"
          className={animate ? 'origin-left' : ''}
          style={animate ? { animation: 'pulse-soft 2s ease-in-out infinite 0.5s' } : {}}
        />

        {/* Body */}
        <circle
          cx="50"
          cy="52"
          r="35"
          fill="url(#bodyGradient)"
        />

        {/* Face highlight */}
        <ellipse
          cx="50"
          cy="45"
          rx="28"
          ry="25"
          fill="url(#faceHighlight)"
        />

        {/* Crown / Tiara */}
        <path
          d="M35 25 L40 18 L45 24 L50 15 L55 24 L60 18 L65 25"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="15" r="3" fill="#fbbf24" />

        {/* Eyes */}
        <text x="38" y="50" fontSize="12" textAnchor="middle" fill="#6d28d9">
          {config.eyes}
        </text>
        <text x="62" y="50" fontSize="12" textAnchor="middle" fill="#6d28d9">
          {config.eyes}
        </text>

        {/* Blush */}
        {config.blush && (
          <>
            <circle cx="32" cy="55" r="5" fill="#fca5a5" opacity="0.5" />
            <circle cx="68" cy="55" r="5" fill="#fca5a5" opacity="0.5" />
          </>
        )}

        {/* Mouth */}
        <text x="50" y="65" fontSize="10" textAnchor="middle" fill="#6d28d9">
          {config.mouth}
        </text>

        {/* Sparkles around */}
        <text x="15" y="25" fontSize="8" fill="#fbbf24" opacity="0.8">✦</text>
        <text x="85" y="30" fontSize="6" fill="#ec4899" opacity="0.8">✦</text>
        <text x="10" y="70" fontSize="5" fill="#8b5cf6" opacity="0.8">✦</text>
        <text x="88" y="75" fontSize="7" fill="#fbbf24" opacity="0.8">✦</text>

        {/* Wand (for waving mood) */}
        {mood === 'waving' && (
          <g style={animate ? { animation: 'wiggle 1s ease-in-out infinite' } : {}}>
            <line
              x1="80"
              y1="65"
              x2="95"
              y2="45"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x="95" y="42" fontSize="10">⭐</text>
          </g>
        )}

        {/* Gradients */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <radialGradient id="faceHighlight" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Speech indicator for excited mood */}
      {mood === 'excited' && animate && (
        <div className="absolute -top-2 -right-2 text-lg animate-bounce-soft">
          💬
        </div>
      )}
    </div>
  );
};

export default LiraMascot;
