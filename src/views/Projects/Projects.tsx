import { ScrollVelocity, LogoLoop } from '@/components/ui';
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
export const Projects = () => {
  return (
    <div id="projects" className="flex flex-col py-16 min-h-screen">
      <ScrollVelocity
        texts={['Look at', 'My projects']}
        velocity={30}
        className="text-text-primary custom-scroll-text"
      />

      {/* Projects content will go here */}
      <div className="flex-1 min-h-screen">
        {/* TODO: Add project cards/grid */}
      </div>

      {/* Footer with tech logos */}
      <div className="w-full mt-auto pt-8">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          className="text-text-primary"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  )
}