import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme:
        typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',

      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';

        // Apply theme class to document
        if (typeof window !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(newTheme);
        }

        return { theme: newTheme };
      }),

      setTheme: (theme) => set(() => {
        // Apply theme class to document
        if (typeof window !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(theme);
        }

        return { theme };
      }),
    }),
    {
      name: 'theme-storage', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Apply theme class when rehydrating from storage
        if (state && typeof window !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(state.theme);
        }
      },
    }
  )
);