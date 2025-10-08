import React, { useEffect, useState, useCallback } from 'react';

const Sparkles = ({ 
  children, 
  className = '',
  useImage = false,
  imageUrl = '/logo192.png',
  sparkleCount = 20,
  minSize = 6,
  maxSize = 18,
  color = 'pink',
  intensity = 1
}) => {
  const [sparkles, setSparkles] = useState([]);
  const containerRef = React.useRef(null);
  
  // Color variations
  const colorMap = {
    pink: {
      gradient: 'radial-gradient(circle, #fff 0%, #f9a8d4 50%, #ec4899 100%)',
      shadow: '0 0 10px 2px rgba(236, 72, 153, 0.7)'
    },
    blue: {
      gradient: 'radial-gradient(circle, #fff 0%, #60a5fa 50%, #3b82f6 100%)',
      shadow: '0 0 10px 2px rgba(59, 130, 246, 0.7)'
    },
    gold: {
      gradient: 'radial-gradient(circle, #fff 0%, #fcd34d 50%, #f59e0b 100%)',
      shadow: '0 0 12px 3px rgba(245, 158, 11, 0.8)'
    },
    purple: {
      gradient: 'radial-gradient(circle, #fff 0%, #c084fc 50%, #8b5cf6 100%)',
      shadow: '0 0 12px 2px rgba(139, 92, 246, 0.7)'
    }
  };
  
  const currentColor = colorMap[color] || colorMap.pink;
  
  // Generate a new sparkle
  const generateSparkle = useCallback(() => {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const duration = 1 + Math.random() * 2;
    
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      opacity: 0.4 + Math.random() * 0.6,
      delay: Math.random() * 2,
      duration,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1.5,
      blur: Math.random() * 3,
      type: Math.random() > 0.3 ? 'sparkle' : 'twinkle'
    };
  }, [minSize, maxSize]);
  
  // Initialize sparkles
  useEffect(() => {
    const initialSparkles = Array.from({ length: sparkleCount }, () => generateSparkle());
    setSparkles(initialSparkles);
  }, [sparkleCount, generateSparkle]);

  // Animate sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => {
        // Remove old sparkles
        const updated = prev.filter(sparkle => {
          const age = Date.now() - sparkle.id;
          return age < sparkle.duration * 1000 * 2; // Keep sparkles for 2x their animation duration
        });
        
        // Add new sparkles to replace removed ones
        while (updated.length < sparkleCount) {
          updated.push(generateSparkle());
        }
        
        return updated;
      });
    }, 400); // Faster update for smoother animation

    return () => clearInterval(interval);
  }, [sparkleCount, generateSparkle]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {children}
      {sparkles.map((sparkle) => {
        const isTwinkle = sparkle.type === 'twinkle';
        const animationName = isTwinkle ? 'twinkle' : 'sparkle';
        const animationDuration = isTwinkle ? 1 + Math.random() : sparkle.duration;
        
        return (
          <div
            key={sparkle.id}
            className={`absolute pointer-events-none ${isTwinkle ? 'rounded-full' : 'sparkle-shape'}`}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              opacity: 0,
              filter: `blur(${sparkle.blur}px) drop-shadow(${currentColor.shadow})`,
              transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg) scale(0)`,
              animation: `${animationName} ${animationDuration}s ease-in-out ${sparkle.delay}s infinite`,
              zIndex: 10,
              backgroundImage: useImage ? `url(${imageUrl})` : currentColor.gradient,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              ...(isTwinkle && { borderRadius: '50%' })
            }}
          />
        );
      })}
      
      <style jsx global>{`
        @keyframes sparkle {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0);
            opacity: 0;
          }
          40% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(1.2);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(0.9);
          }
          100% {
            transform: translate(-50%, -50%) rotate(${Math.random() * 720}deg) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0.5);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg) scale(1.2);
            opacity: 0.8;
          }
        }
        
        .sparkle-shape {
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
          );
        }
      `}</style>
    </div>
  );
};

export default Sparkles;
