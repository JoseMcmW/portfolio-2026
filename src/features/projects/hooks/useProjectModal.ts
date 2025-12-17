import { useState } from 'react';
import type { Project } from '../types';

export const useProjectModal = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return {
    selectedProject,
    openModal: setSelectedProject,
    closeModal: () => setSelectedProject(null),
    isOpen: !!selectedProject
  };
};
