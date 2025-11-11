import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  clickPosition?: { x: number; y: number };
}

const emojis = ['🪙', '✨', '₩', '$', '€', '¥', '£'];

const ConfettiPiece: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  // Fix: Cast style object to React.CSSProperties to allow custom properties.
  const style = {
    left: `${x}px`,
    top: `${y}px`,
    position: 'fixed',
    pointerEvents: 'none',
    animation: `burst-animation ${0.8 + Math.random() * 0.5}s ease-out forwards`,
    '--tx': `${(Math.random() - 0.5) * 400}px`,
    '--ty': `${(Math.random() - 0.5) * 400}px`,
    '--r': `${Math.random() * 720}deg`,
    fontSize: `${16 + Math.random() * 18}px`,
  } as React.CSSProperties;

  return (
    <div style={style}>
      {emojis[Math.floor(Math.random() * emojis.length)]}
    </div>
  );
};

const RainPiece: React.FC = () => {
    const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        animation: `rain-animation ${2 + Math.random() * 3}s ${Math.random() * 2}s linear forwards`,
        fontSize: `${16 + Math.random() * 18}px`,
        position: 'absolute',
        pointerEvents: 'none',
    };
    return <div style={style}>{emojis[Math.floor(Math.random() * emojis.length)]}</div>
}

const Confetti: React.FC<ConfettiProps> = ({ clickPosition }) => {
  // Fix: Use React.ReactNode[] instead of JSX.Element[] to avoid JSX namespace error.
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (clickPosition) {
      // Burst from a point
      setPieces(
        Array.from({ length: 50 }).map((_, i) => <ConfettiPiece key={i} x={clickPosition.x} y={clickPosition.y} />)
      );
    } else {
      // Rain effect
       const rainPieces = Array.from({ length: 150 }).map((_, i) => <RainPiece key={i}/>);
      setPieces(rainPieces);
    }
  }, [clickPosition]);

  return (
    <>
      <style>
        {`
          @keyframes burst-animation {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(calc(var(--tx) - 50%), calc(var(--ty) - 50%)) scale(0) rotate(var(--r)); opacity: 0; }
          }
          @keyframes rain-animation {
            0% { transform: translateY(-20vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
          }
        `}
      </style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
        {pieces}
      </div>
    </>
  );
};

export default Confetti;
