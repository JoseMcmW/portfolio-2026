import { socialLinks, cvLinks } from '@/shared';

export const SocialLinks: React.FC = () => {
  return (
    <nav aria-label="Social links" className="flex flex-col items-center shrink-0 w-[70px] social-links z-10">
      {/* Top Point */}
      <div className="w-1 h-1 rounded-full bg-text-primary/70"></div>

      {/* Upper Line */}
      <div className="w-0.5 h-32 bg-text-primary/30"></div>

      {/* Social Icons */}
      <div className="flex flex-col gap-6 my-6 items-center">
        {/* Social Links from constants */}
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transform transition-transform duration-300 hover:scale-110 hover:[filter:drop-shadow(0_0_6px_var(--shadow-hover))]"
            aria-label={link.ariaLabel}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d={link.svgPath} />
            </svg>
          </a>
        ))}

        {/* Curriculum */}
        <div className="flex flex-col items-center gap-2">
          <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12,19L8,15H10.5V12H13.5V15H16L12,19Z"/>
          </svg>
          <div className="flex gap-1">
            {cvLinks.map((cv) => (
              <a
                aria-label={cv.title}
                key={cv.language}
                href={cv.url}
                download={cv.filename}
                className="text-text-secondary hover:text-text-primary transition-colors duration-300 hover:scale-110 transform hover:[filter:drop-shadow(0_0_6px_var(--shadow-hover))]"
                title={cv.title}
              >
                {cv.language}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Line */}
      <div className="w-0.5 h-32 bg-text-primary/30"></div>

      {/* Bottom Point */}
      <div className="w-1 h-1 rounded-full bg-text-primary/70"></div>
    </nav>
  )
}