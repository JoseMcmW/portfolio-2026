import { useEffect, useRef } from 'react'
import { useThemeStore } from '@/store/themeStore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Footer = () => {
  const theme = useThemeStore((state) => state.theme)
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (containerRef.current && lettersRef.current.length > 0) {
      // Configurar posición inicial escalonada para cada letra (efecto ola)
      lettersRef.current.forEach((letter, index) => {
        gsap.set(letter, {
          y: 300 + (index * 50), // Cada letra empieza más abajo que la anterior
          opacity: 0
        })
      })

      // Animar todas las letras a la misma posición final sin stagger
      lettersRef.current.forEach((letter) => {
        gsap.to(letter, {
          y: 0, // Todas terminan en la misma posición
          opacity: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top+=300',
            scrub: 2,
            markers: false
          }
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el)
    }
  }

  return (
    <footer className={`border-t border-text-primary/10 relative ${theme === 'dark' ? 'bg-transparent' : 'bg-bg-primary'}`}>
        <div className="py-16">
          {/* Footer content - Siempre visible y centrado */}
          <div className="relative z-10 flex flex-col items-center justify-center my-8">
            <p className="font-sans text-text-primary text-sm font-medium">
              © 2025 Jose Centeno. All Rights Reserved.
            </p>
            <p className="font-sans text-text-secondary text-xs mt-1">
              My team at Buenos Aires made this.
            </p>
          </div>
          {/* Footer con letras JMCM de fondo */}
          <div ref={containerRef} className="relative h-[450px] w-full overflow-hidden">
            {/* Large background initials with outline - Efecto de ola */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1
                className="font-sans font-black select-none leading-none flex items-baseline"
                style={{
                  fontSize: 'clamp(220px, 35vw, 500px)',
                  letterSpacing: '0.05em'
                }}
              >
                <span
                  ref={addToRefs}
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '5px var(--text-primary)',
                    display: 'inline-block'
                  }}
                >
                  J
                </span>
                <span
                  ref={addToRefs}
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '5px var(--text-primary)',
                    display: 'inline-block'
                  }}
                >
                  M
                </span>
                <span
                  ref={addToRefs}
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '5px var(--text-primary)',
                    display: 'inline-block'
                  }}
                >
                  C
                </span>
                <span
                  ref={addToRefs}
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '5px var(--text-primary)',
                    display: 'inline-block'
                  }}
                >
                  M
                </span>
              </h1>
            </div>
          </div>
        </div>
    </footer>
  );
};
