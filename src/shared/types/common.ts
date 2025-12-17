// Common types used across the application

// Theme types
export type Theme = 'light' | 'dark';

// Animation configuration types
export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
  stagger?: number;
}

export interface ScrollTriggerConfig {
  start: string;
  end: string;
  scrub?: boolean | number;
  pin?: boolean;
}

// GSAP animation types
export interface GSAPConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
  scrollTrigger?: ScrollTriggerConfig;
  // Animation properties
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  // Additional properties for flexibility
  [key: string]: unknown;
}

// Component base props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

// Breakpoint types (matching Tailwind)
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Generic callback types
export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;