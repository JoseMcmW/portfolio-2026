import { useState } from 'react';
import GlassIcons from './GlassIcons';
import type { GlassIconsItem } from './GlassIcons';

export interface NavigationMenuProps {
  onNavigate?: (section: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems: GlassIconsItem[] = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
      color: 'blue',
      label: 'Home',
      onClick: () => {
        onNavigate?.('home');
        setIsOpen(false);
      }
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      color: 'purple',
      label: 'About',
      onClick: () => {
        onNavigate?.('about');
        setIsOpen(false);
      }
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z"/>
        </svg>
      ),
      color: 'orange',
      label: 'Projects',
      onClick: () => {
        onNavigate?.('projects');
        setIsOpen(false);
      }
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: 'green',
      label: 'Contact',
      onClick: () => {
        onNavigate?.('contact');
        setIsOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-text-primary/10 backdrop-blur-md border border-text-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-text-primary/20 animate-pulse"
        aria-label="Toggle navigation menu"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-6 h-6 text-text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-50 bg-bg-primary/95 backdrop-blur-xl border-l border-text-primary/20 z-50 transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full p-8">
          <GlassIcons items={navigationItems} vertical className="gap-12" />
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
