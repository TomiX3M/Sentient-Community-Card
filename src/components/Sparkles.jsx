import React, { useEffect, useState } from 'react';

export const Sparkles = ({ 
  children, 
  className = '',
  useImage = false,
  imageUrl = '/logo192.png',
  sparkleCount = 16,
  minSize = 10,
  maxSize = 15
}) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new sparkle
      setSparkles(prev => [
        ...prev.slice(-sparkleCount), // Keep only the last N sparkles
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: 0.5 + Math.random() * 0.5,
          delay: Math.random() * 2,
          duration: 0.8 + Math.random() * 1.5,
          rotation: Math.random() * 360
        }
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, [sparkleCount, minSize, maxSize]);

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: 0,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg) scale(0)`,
            animation: `sparkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s forwards`,
            zIndex: 10,
            backgroundImage: useImage ? `url(${imageUrl})` : 'radial-gradient(circle, #fff 0%, #f9a8d4 50%, #ec4899 100%)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            ...(!useImage && { borderRadius: '50%' })
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(1);
            opacity: ${sparkles[0]?.opacity || 1};
          }
          100% {
            transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Sparkles;
