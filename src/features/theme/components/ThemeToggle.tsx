import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';
import forestImage from '@/assets/forest_upsidedown.svg';

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const imageRef = useRef<HTMLImageElement>(null);

  // Initialize rotation on mount based on current theme
  useEffect(() => {
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        rotateX: theme === 'dark' ? 180 : 0
      });
    }
  }, [theme]);

  const handleClick = () => {
    const totalAnimationDuration = 1000;

    // Animate image flip with GSAP
    if (imageRef.current) {
      const targetRotation = theme === 'dark' ? 0 : 180;
      gsap.to(imageRef.current, {
        rotateX: targetRotation,
        duration: 1,
        ease: 'power2.inOut'
      });
    }

    // Change theme after animation completes
    setTimeout(() => {
      toggleTheme();
    }, totalAnimationDuration);
  };

  const shadow =
  theme === 'dark'
    ? 'drop-shadow(0 8px 16px rgba(244, 50, 11, 0.45))'
    : 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25))';

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleClick}
        className="rounded-full transition-all duration-300 relative group p-2 cursor-pointer hover:scale-105"
        aria-label="Toggle theme"
        style={{
          background: 'transparent',
          border: 'none'
        }}
      >
        <div className="relative w-16 h-16">
          <img
            ref={imageRef}
            src={forestImage}
            alt="Upside Down Forest"
            className="w-full h-full transition-all duration-300"
            style={{
              filter: shadow,
              transformStyle: 'preserve-3d'
            }}
          />
          {/* Overlay de color para la mitad superior */}
          <div
            className="absolute top-0 left-0 w-full h-1/2 pointer-events-none transition-colors duration-300"
            style={{
              backgroundColor: theme === 'dark' ? '#F4320B' : '#221F20',
              opacity: 0.3,
              mixBlendMode: 'multiply',
            }}
          />
          {/* Overlay de color para la mitad inferior */}
          <div
            className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none transition-colors duration-300"
            style={{
              backgroundColor: theme === 'dark' ? '#F2EDEB' : '#F4320B',
              opacity: 0.3,
              mixBlendMode: 'multiply'
            }}
          />
        </div>
      </button>
    </div>
  );
};