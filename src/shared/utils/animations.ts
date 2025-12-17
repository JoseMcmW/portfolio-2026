// GSAP animation utility functions (pure helpers, no execution)
import type { GSAPConfig } from '../types/common';
import { prefersReducedMotion } from './helpers';

/**
 * Gets the appropriate animation duration based on user preferences
 */
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * Creates a fade-in animation configuration
 */
export const fadeInConfig = (duration = 0.8, delay = 0): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power2.out',
  delay,
  opacity: 0
});

/**
 * Creates a fade-out animation configuration
 */
export const fadeOutConfig = (duration = 0.8, delay = 0): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power2.in',
  delay,
  opacity: 1
});

/**
 * Creates a slide-up animation configuration
 */
export const slideUpConfig = (duration = 1.0, delay = 0): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power2.out',
  delay,
  y: 50,
  opacity: 0
});

/**
 * Creates a slide-down animation configuration
 */
export const slideDownConfig = (duration = 1.0, delay = 0): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power2.out',
  delay,
  y: -50,
  opacity: 0
});

/**
 * Creates a slide-left animation configuration
 */
export const slideLeftConfig = (duration = 1.0, delay = 0): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power2.out',
  delay,
  x: 50,
  opacity: 0
});

/**
 * Creates a slide-right animation configuration
 */
export const slideRightConfig = (duration = 1.0, delay = 0): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power2.out',
  delay,
  x: -50,
  opacity: 0
});

/**
 * Creates a scale animation configuration
 */
export const scaleConfig = (
  duration = 0.8,
  delay = 0,
  scale = 0.8
): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'back.out(1.7)',
  delay,
  scale,
  opacity: 0
});

/**
 * Creates a stagger animation configuration
 */
export const staggerConfig = (
  duration = 0.8,
  stagger = 0.1,
  delay = 0
): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power2.out',
  stagger,
  delay,
  opacity: 0,
  y: 30
});

/**
 * Creates a scroll trigger configuration
 */
export const scrollTriggerConfig = (
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false
) => ({
  start,
  end,
  scrub,
  toggleActions: 'play none none reverse'
});

/**
 * Easing functions for custom animations
 */
export const easings = {
  // Standard easings
  linear: 'none',
  easeIn: 'power2.in',
  easeOut: 'power2.out',
  easeInOut: 'power2.inOut',
  
  // Elastic easings
  elasticIn: 'elastic.in(1, 0.5)',
  elasticOut: 'elastic.out(1, 0.5)',
  elasticInOut: 'elastic.inOut(1, 0.5)',
  
  // Back easings
  backIn: 'back.in(1.7)',
  backOut: 'back.out(1.7)',
  backInOut: 'back.inOut(1.7)',
  
  // Bounce easings
  bounceIn: 'bounce.in',
  bounceOut: 'bounce.out',
  bounceInOut: 'bounce.inOut',
  
  // Expo easings
  expoIn: 'expo.in',
  expoOut: 'expo.out',
  expoInOut: 'expo.inOut',
  
  // Circ easings
  circIn: 'circ.in',
  circOut: 'circ.out',
  circInOut: 'circ.inOut'
} as const;

/**
 * Common animation durations
 */
export const durations = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  medium: 0.6,
  slow: 1.0,
  verySlow: 1.5
} as const;

/**
 * Creates a parallax scroll configuration
 */
export const parallaxConfig = (speed = 0.5) => ({
  scrollTrigger: {
    scrub: true
  },
  y: (_index: number, target: Element) => {
    const height = target.getBoundingClientRect().height;
    return -height * speed;
  }
});

/**
 * Creates a reveal animation configuration (for text/elements)
 */
export const revealConfig = (duration = 1.2, stagger = 0.05): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease: 'power3.out',
  stagger,
  y: 100,
  opacity: 0,
  rotationX: -90
});

/**
 * Creates a rotation animation configuration
 */
export const rotateConfig = (
  duration = 1.0,
  rotation = 360,
  ease = 'power2.inOut'
): GSAPConfig => ({
  duration: getAnimationDuration(duration),
  ease,
  rotation
});

/**
 * Helper to check if animations should be disabled
 */
export const shouldDisableAnimations = (): boolean => {
  return prefersReducedMotion();
};

/**
 * Gets a safe animation config that respects user preferences
 */
export const getSafeAnimationConfig = (config: GSAPConfig): GSAPConfig => {
  if (shouldDisableAnimations()) {
    return {
      ...config,
      duration: 0,
      delay: 0
    };
  }
  return config;
};
