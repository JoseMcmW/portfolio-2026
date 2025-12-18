import { useRef } from 'react';
import { footerInfo } from '@/shared';
import { SocialLinks } from './SocialLinks';
import { useFooterAnimations } from '../hooks/useFooterAnimations';

export const FooterContent: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Use the footer animations hook
  useFooterAnimations({ footerRef, textRef });

  return (
    <div ref={footerRef} className="h-full w-full relative">
      {/* Footer content - Siempre visible y centrado */}
      <div className="relative flex flex-col items-center justify-center z-10 gap-2 py-2">
        <p className="font-sans text-text-primary text-xs md:text-sm font-medium">
          {footerInfo.copyright}
        </p>
        <p className="font-sans text-text-secondary text-xs">
          {footerInfo.location}
        </p>
        <SocialLinks />
      </div>

      {/* Footer con letras JMCM de fondo */}
      <div className='absolute my-0! flex justify-center items-center overflow-hidden z-0 pointer-events-none'>
        <h2
          ref={textRef}
          className='text-[35vw]! font-black leading-none! text-text-primary/10 opacity-50 will-change-transform'
        >
          {footerInfo.backgroundText}
        </h2>
      </div>
    </div>
  );
};