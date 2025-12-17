import { useThemeStore } from '@/shared';

/**
 * Custom hook for theme management
 * Provides theme state and actions for components
 */
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };
};