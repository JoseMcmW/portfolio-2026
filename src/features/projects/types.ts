export interface Project {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  captionText: string;
  overlayText: string;
  stack: string[];
}

export interface TechLogo {
  node: React.ReactNode;
  title: string;
  href: string;
}
