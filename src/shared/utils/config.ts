// Centralized configuration for GSAP animations (declarative)
export const gsapConfig = {
  // Hero animations configuration
  hero: {
    duration: 1.2,
    ease: 'power2.out',
    stagger: 0.1,
    delay: 0.2
  },
  
  // Timeline animations configuration
  timeline: {
    duration: 1.5,
    ease: 'back.out(1.7)',
    stagger: 0.2,
    scrollTrigger: {
      start: 'top 50%',
      end: 'bottom bottom',
      scrub: 1
    }
  },
  
  // Footer animations configuration
  footer: {
    yPercent: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'back.out(1.7)',
    stagger: 0.1
  },
  
  // Contact form animations
  contact: {
    duration: 0.8,
    ease: 'power2.inOut',
    stagger: 0.05
  },
  
  // Projects animations
  projects: {
    duration: 1.0,
    ease: 'power2.out',
    stagger: 0.15
  },
  
  // Theme toggle animation
  themeToggle: {
    duration: 1.0,
    ease: 'power2.inOut'
  }
} as const;

// Theme configuration
export const themeConfig = {
  // Default theme preference
  defaultTheme: 'light' as const,
  
  // Storage key for theme persistence
  storageKey: 'theme-storage',
  
  // CSS classes for themes
  themeClasses: {
    light: 'light',
    dark: 'dark'
  },
  
  // Theme colors (for programmatic use)
  colors: {
    light: {
      primary: '#221F20',
      secondary: '#F2EDEB',
      accent: '#F4320B'
    },
    dark: {
      primary: '#F2EDEB', 
      secondary: '#221F20',
      accent: '#F4320B'
    }
  }
} as const;

// Application-wide constants
export const appConfig = {
  // Animation preferences
  animations: {
    // Respect user's motion preferences
    respectReducedMotion: true,
    
    // Default animation durations
    defaultDuration: 0.3,
    fastDuration: 0.15,
    slowDuration: 0.6
  },
  
  // Breakpoints (matching Tailwind defaults)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  
  // Z-index layers
  zIndex: {
    modal: 1000,
    overlay: 999,
    dropdown: 50,
    header: 40,
    cursor: 9999
  }
} as const;

// API configuration
export const apiConfig = {
  // Base URLs (can be overridden by environment variables)
  baseURL: '/api',
    
  // Request timeouts
  timeout: 10000, // 10 seconds
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000 // 1 second
  }
} as const;