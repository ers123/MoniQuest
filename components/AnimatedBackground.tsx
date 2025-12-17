import React, { useMemo } from 'react';

const PARTICLES = ['💰', '✨', '🪙', '⭐', '💎', '🌟', '💫', '🔮'];

interface Particle {
  id: number;
  emoji: string;
  left: number;
  animationDuration: number;
  animationDelay: number;
  fontSize: number;
  opacity: number;
}

const AnimatedBackground: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
      left: Math.random() * 100,
      animationDuration: 15 + Math.random() * 20,
      animationDelay: Math.random() * 20,
      fontSize: 16 + Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  return (
    <div className="particles-container" aria-hidden="true">
      {/* Gradient orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
          animation: 'floatSlow 25s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
          top: '40%',
          left: '60%',
          animation: 'float 18s ease-in-out infinite 5s',
        }}
      />

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.fontSize}px`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
            opacity: particle.opacity,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
