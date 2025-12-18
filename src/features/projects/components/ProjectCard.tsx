import { TiltedCard } from '@/shared/components/ui';
import { getCloudinaryImage } from '@/shared';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <TiltedCard
      imageSrc={getCloudinaryImage(project.imageSrc, 600)}
      altText={project.altText}
      captionText={project.captionText}
      containerHeight="300px"
      containerWidth="100%"
      imageHeight="300px"
      imageWidth="300px"
      rotateAmplitude={12}
      scaleOnHover={1.2}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
      onClick={onClick}
      overlayContent={
        <div className="mt-6 ml-6 px-4 py-2 bg-neutral-900/30 rounded-xl border border-white/10 backdrop-blur-sm">
          <p className="text-white font-bold text-lg">{project.title}</p>
        </div>
      }
    />
  );
};
