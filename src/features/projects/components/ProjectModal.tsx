import { Modal } from '@/shared/components/ui';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {project && (
        <div className="flex flex-col">
          <div className="relative w-full h-64 sm:h-80">
            <img
              src={project.imageSrc}
              alt={project.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] to-transparent opacity-80" />
            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
              {project.title}
            </h2>
          </div>

          <div className="px-6 py-3 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Description</h3>
              <p className="font-serif text-xs text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="font-serif px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
