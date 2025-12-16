import { useState } from 'react';
import { ScrollVelocity, LogoLoop, TiltedCard, Modal } from '@/components/ui';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSupabase, SiVite, SiBootstrap, SiJavascript, SiRedux, SiNodedotjs, SiJest } from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiRedux />, title: "Redux", href: "https://redux.js.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiJest />, title: "Jest", href: "https://jestjs.io" },
];

const projects = [
  {
    title: "Calculadora Facil 1",
    description: "Description of project 1",
    imageSrc: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
    altText: "Calculadora Fácil",
    captionText: "Calculadora Fácil",
    overlayText: "Calculadora Fácil",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "Bootstrap", "JavaScript", "Redux", "Node.js", "Jest"],
  },
    {
    title: "Calculadora Facil 2",
    description: "Description of project 1",
    imageSrc: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
    altText: "Calculadora Fácil",
    captionText: "Calculadora Fácil",
    overlayText: "Calculadora Fácil",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "Bootstrap", "JavaScript", "Redux", "Node.js", "Jest"],
  },
    {
    title: "Calculadora Facil 3",
    description: "Description of project 1",
    imageSrc: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
    altText: "Calculadora Fácil",
    captionText: "Calculadora Fácil",
    overlayText: "Calculadora Fácil",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "Bootstrap", "JavaScript", "Redux", "Node.js", "Jest"],
  },
    {
    title: "Calculadora Facil 4",
    description: "Description of project 1",
    imageSrc: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
    altText: "Calculadora Fácil",
    captionText: "Calculadora Fácil",
    overlayText: "Calculadora Fácil",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "Bootstrap", "JavaScript", "Redux", "Node.js", "Jest"],
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div id="projects" className="flex flex-col min-h-screen gap-6">
      <ScrollVelocity
        texts={['Look at', 'My projects']}
        velocity={50}
        className="text-text-primary custom-scroll-text"
      />

      {/* Projects content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full my-10 px-4">
        {
          projects?.map((project, index) => (
            <TiltedCard
              key={index}
              imageSrc={project.imageSrc}
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
              onClick={() => setSelectedProject(project)}
              overlayContent={
                <div className="mt-6 ml-6 px-4 py-2 bg-neutral-900/30 rounded-xl border border-white/10 backdrop-blur-sm">
                  <p className="text-white font-bold text-lg">{project.title}</p>
                </div>
              }
            />
          ) )
        }
      </div>

      {/* Footer with tech logos */}
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

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="flex flex-col">
            <div className="relative w-full h-64 sm:h-80">
              <img
                src={selectedProject.imageSrc}
                alt={selectedProject.altText}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-80" />
              <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                {selectedProject.title}
              </h2>
            </div>

            <div className="px-6 py-3 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Description</h3>
                <p className="font-serif text-xs text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech, i) => (
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
    </div>
  )
}