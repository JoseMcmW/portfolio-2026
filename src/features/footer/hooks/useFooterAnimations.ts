import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseFooterAnimationsProps {
  footerRef: RefObject<HTMLDivElement | null>;
  textRef: RefObject<HTMLHeadingElement | null>;
}

export const useFooterAnimations = ({ footerRef, textRef }: UseFooterAnimationsProps) => {
  useEffect(() => {
    const footer = footerRef.current;
    const text = textRef.current;

    if (!footer || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 0.5,
          duration: 1.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footer,
            start: 'center bottom+=200px',
            end: 'bottom bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [footerRef, textRef]);
};