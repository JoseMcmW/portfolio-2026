import React, { useRef } from 'react';
import type { CSSProperties } from 'react';
import demogorgonImg from '@/assets/demogorgon.jpg';
import { useThemeStore } from '@/shared';

type RevealBackgroundProps = {
  /**
   * Radio del área de reveal en píxeles
   */
  revealRadius?: number;
  /**
   * Opacidad de la imagen revelada (0-1)
   */
  imageOpacity?: number;
  /**
   * Modo de mezcla para la imagen
   */
  blendMode?: CSSProperties['mixBlendMode'];
  /**
   * Si debe aplicar efecto de desenfoque en los bordes del reveal
   */
  softEdge?: boolean;
};

/**
 * RevealBackground - Efecto de reveal con imagen de fondo
 *
 * Muestra una imagen que solo se revela cuando el mouse pasa sobre ella,
 * creando un efecto de "linterna" que ilumina la imagen de fondo.
 */
export const RevealBackground: React.FC<RevealBackgroundProps> = ({
  revealRadius = 180,
  imageOpacity = 0.3,
  blendMode = 'lighten',
  softEdge = true,
}) => {
  const revealImgRef = useRef<HTMLImageElement>(null);
  const theme = useThemeStore((state) => state.theme);

  // Solo mostrar en modo dark
  if (theme !== 'dark') {
    return null;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    const el = revealImgRef.current;
    if (el) {
      // Mover el punto focal muy lejos para ocultar el reveal
      el.style.setProperty('--mx', '-9999px');
      el.style.setProperty('--my', '-9999px');
    }
  };

  // Crear gradiente radial para el efecto de máscara
  const createMaskGradient = () => {
    if (softEdge) {
      // Gradiente suave con múltiples stops
      const r1 = revealRadius * 0.25; // Centro brillante
      const r2 = revealRadius * 0.5;  // Transición media
      const r3 = revealRadius * 0.75; // Borde suave
      const r4 = revealRadius;        // Borde exterior

      return `radial-gradient(circle at var(--mx) var(--my),
        rgba(255,255,255,1) 0px,
        rgba(255,255,255,0.95) ${r1}px,
        rgba(255,255,255,0.7) ${r2}px,
        rgba(255,255,255,0.3) ${r3}px,
        rgba(255,255,255,0) ${r4}px)`;
    } else {
      // Gradiente más duro
      return `radial-gradient(circle at var(--mx) var(--my),
        rgba(255,255,255,1) ${revealRadius * 0.7}px,
        rgba(255,255,255,0) ${revealRadius}px)`;
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        zIndex: 1,
      }}
    >
      <img
        ref={revealImgRef}
        src={demogorgonImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          mixBlendMode: blendMode,
          opacity: imageOpacity,
          // CSS custom properties para la posición del mouse
          ['--mx' as string]: '-9999px',
          ['--my' as string]: '-9999px',
          // Máscara radial que sigue al mouse
          WebkitMaskImage: createMaskGradient(),
          maskImage: createMaskGradient(),
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};