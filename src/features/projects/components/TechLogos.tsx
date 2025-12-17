import { LogoLoop } from '@/shared/components/ui';
import { techLogos } from '../data/techLogos';

export const TechLogos: React.FC = () => {
  return (
    <div className="w-full mt-auto pt-8">
      <LogoLoop
        logos={techLogos}
        speed={60}
        direction="left"
        logoHeight={48}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        className="text-text-primary"
        ariaLabel="Technology partners"
      />
    </div>
  );
};
