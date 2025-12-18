import { ScrollVelocity } from '@/shared/components/ui';
import { ProjectCard, ProjectModal, TechLogos, projects, useProjectModal } from '@/features/projects';

export const Projects = () => {
  const { selectedProject, openModal, closeModal, isOpen } = useProjectModal();

  return (
    <section id="projects" className="flex flex-col min-h-screen gap-6">
      <h2 className="sr-only">Projects</h2>
      <div aria-hidden="true">
        <ScrollVelocity
          texts={['Look at', 'My projects']}
          velocity={50}
          className="text-text-primary custom-scroll-text"
        />
      </div>

      {/* Projects content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full my-10 px-4">
        {projects?.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onClick={() => openModal(project)}
          />
        ))}
      </div>

      {/* Footer with tech logos */}
      <TechLogos />

      <ProjectModal
        project={selectedProject}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </section>
  )
}