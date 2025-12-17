import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSupabase, SiVite, SiBootstrap, SiJavascript, SiRedux, SiNodedotjs, SiJest } from "react-icons/si";
import type { TechLogo } from '../types';

export const techLogos: TechLogo[] = [
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
