import { socialLinks } from '@/shared';

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-row gap-6 items-center">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary transition-colors duration-300 hover:scale-110 transform"
          aria-label={link.ariaLabel}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d={link.svgPath} />
          </svg>
        </a>
      ))}
    </div>
  );
};