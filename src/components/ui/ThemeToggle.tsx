import React, { useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300
}) => {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);
    // Invert colors: use OPPOSITE theme colors so particles are visible after theme change
    const colors = theme === 'light'
      ? ['#F4320B', '#FF5722', '#E64A19', '#D84315'] // Red-orange for switching TO dark
      : ['#F2EDEB', '#F2EDEB', '#F2EDEB', '#F2EDEB']; // Light beige for switching TO light
    
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', p.color);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Intentionally suppress errors if particle was already removed
          }
        }, t);
      }, 30);
    }
  };

  const handleClick = () => {
    // Calculate when particles will be near completion
    // Particles last ~1200ms (animationTime * 2), change theme at 85% = ~1000ms
    const themeChangeDelay = (animationTime * 2) * 0.85;
    
    // Change theme near the end of particle animation
    setTimeout(() => {
      toggleTheme();
    }, themeChangeDelay);
    
    if (filterRef.current) {
      // Clear existing particles
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current!.removeChild(p));
      
      // Create new particles
      makeParticles(filterRef.current);
    }
  };

  const textButtonColor = theme === 'dark' ? '#F4320B' : '#221F20';

  return (
    <>
      <style>
        {`
          .theme-toggle-container {
            position: relative;
            display: inline-block;
          }
          
          .theme-toggle-effect {
            position: absolute;
            inset: 0;
            pointer-events: none;
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
            z-index: 1;
          }
          
          .theme-toggle-effect::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: transparent;
          }
          
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 10px);
            left: calc(50% - 10px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="theme-toggle-container">
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="rounded-full bg-bg-secondary hover:bg-bg-tertiary transition-all duration-300 relative z-10 group"
          aria-label="Toggle theme"
        >
          <span
            className='flex flex-col font-sans font-light text-xs'
            style={{ color: textButtonColor }}
          >
            <p>Upside</p>
            <p>Down</p>
          </span>
        </button>
        <span className="theme-toggle-effect" ref={filterRef} />
      </div>
    </>
  );
};

export default ThemeToggle;
