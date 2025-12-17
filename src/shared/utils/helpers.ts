// Pure helper functions without state or side effects

/**
 * Safely formats a string by trimming and normalizing whitespace
 */
export const formatString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Truncates a string to a specified length with ellipsis
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength).trim()}...`;
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Converts a string to kebab-case
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Converts a string to camelCase
 */
export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

/**
 * Debounce function to limit how often a function can be called
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to ensure a function is called at most once per interval
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Clamps a number between a minimum and maximum value
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation between two values
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

/**
 * Maps a value from one range to another
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Checks if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Checks if the device is a touch device
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Gets the current breakpoint based on window width
 */
export const getCurrentBreakpoint = (): 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' => {
  if (typeof window === 'undefined') return 'xs';
  
  const width = window.innerWidth;
  
  if (width >= 1536) return '2xl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

/**
 * Safely parses JSON with a fallback value
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Delays execution for a specified time (useful for async operations)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a random ID string
 */
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Checks if a value is defined (not null or undefined)
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Removes undefined and null values from an object
 */
export const removeUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (isDefined(value)) {
      (acc as Record<string, unknown>)[key] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * Deep clones an object (simple implementation)
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Formats a date to a readable string
 */
export const formatDate = (date: Date | string, locale = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Checks if code is running in browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Safely gets a value from localStorage
 */
export const getFromStorage = (key: string): string | null => {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/**
 * Safely sets a value in localStorage
 */
export const setToStorage = (key: string, value: string): boolean => {
  if (!isBrowser()) return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Safely removes a value from localStorage
 */
export const removeFromStorage = (key: string): boolean => {
  if (!isBrowser()) return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};
