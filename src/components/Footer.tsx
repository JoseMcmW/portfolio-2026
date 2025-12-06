import { useThemeStore } from '@/store/themeStore'
import { RevealBackground } from '@/components/ui'

export const Footer = () => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <footer className={`border-t border-text-primary/10 py-16 relative overflow-hidden ${theme === 'dark' ? 'bg-transparent' : 'bg-bg-primary'}`}>
      {/* Reveal Background Effect */}
      <RevealBackground />

      <div className="container mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-text-primary font-bold text-lg mb-4">About</h3>
            <p className="text-text-primary/70 text-sm">
              Portfolio 2026 - Inspired by Stranger Things
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-text-primary font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-text-primary/70 hover:text-text-primary text-sm transition">Home</a></li>
              <li><a href="#about" className="text-text-primary/70 hover:text-text-primary text-sm transition">About</a></li>
              <li><a href="#contact" className="text-text-primary/70 hover:text-text-primary text-sm transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-text-primary font-bold text-lg mb-4">Contact</h3>
            <p className="text-text-primary/70 text-sm">
              Email: contact@jmcm.com
            </p>
          </div>
        </div>

        <div className="border-t border-text-primary/10 pt-8 text-center">
          <p className="text-text-primary/50 text-sm">
            © 2026 JMCM. All rights reserved. | Designed with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};
