import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { LaserFlow } from './LaserFlow';

type LaserFlowBackgroundProps = {
  /** Color del laser (hex) */
  color?: string;
  /** Velocidad de la animación inicial de flujo (ms) */
  initialFlowDuration?: number;
  /** Retraso antes de que empiece el efecto (ms) */
  delay?: number;
  /** Si el efecto de splash está habilitado */
  splashEnabled?: boolean;
};

export const LaserFlowBackground: React.FC<LaserFlowBackgroundProps> = ({
  color = '#F4320C',
  initialFlowDuration = 2500,
  delay = 300,
  splashEnabled = true,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const [flowProgress, setFlowProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [documentHeight, setDocumentHeight] = useState(0);
  
  // Parámetros dinámicos que cambian con el scroll
  const [horizontalSizing, setHorizontalSizing] = useState(0.5);
  
  const animationRef = useRef<number | null>(null);

  const updateDocumentHeight = useCallback(() => {
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    setDocumentHeight(height);
  }, []);

  // Animación inicial del flujo
  useEffect(() => {
    if (theme !== 'dark') {
      setFlowProgress(0);
      setIsAnimating(false);
      setHorizontalSizing(0.5);
      return;
    }

    updateDocumentHeight();
    
    const delayTimer = setTimeout(() => {
      setIsAnimating(true);
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / initialFlowDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        setFlowProgress(easedProgress);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, initialFlowDuration, delay, updateDocumentHeight]);

  // Detectar scroll y modificar parámetros dinámicamente
  useEffect(() => {
    if (theme !== 'dark') return;

    const handleScroll = () => {
      updateDocumentHeight();
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (documentHeight <= 0) return;
      
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      const splashTriggerDistance = 600;
      
      if (distanceFromBottom < splashTriggerDistance && splashEnabled) {
        const t = 1 - (distanceFromBottom / splashTriggerDistance);
        const easedT = t * t;
        
        // Expandir horizontalmente para el splash cuando llegue al footer
        const newHorizontalSizing = 0.5 + (easedT * 1.5);
        setHorizontalSizing(newHorizontalSizing);
      } else {
        setHorizontalSizing(0.5);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDocumentHeight, { passive: true });
    
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDocumentHeight);
    };
  }, [theme, documentHeight, splashEnabled, updateDocumentHeight]);

  if (theme !== 'dark') return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        opacity: flowProgress,
      }}
    >
      <LaserFlow
        color={color}
        horizontalBeamOffset={0.0}
        // El centro ahora estará en la parte superior (que al voltear queda abajo)
        verticalBeamOffset={-0.5}
        // verticalSizing alto para cubrir toda la pantalla
        verticalSizing={10.0}
        horizontalSizing={horizontalSizing}
        // Niebla
        fogIntensity={0.45}
        fogScale={0.3}
        fogFallSpeed={0.6}
        // Flujo
        flowSpeed={0.35}
        flowStrength={0.25}
        // Wisps
        wispSpeed={15.0}
        wispIntensity={5.0}
        wispDensity={1.0}
        // Forma
        decay={1.1}
        falloffStart={1.2}
        mouseTiltStrength={0.01}
      />
    </div>
  );
};

export default LaserFlowBackground;
