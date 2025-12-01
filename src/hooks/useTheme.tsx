import { useEffect, useState } from 'react';

export function useTheme() {
  // 1. Leemos la preferencia guardada o la del sistema
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default
  });

  // 2. Efecto para aplicar la clase al HTML y guardar en localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Removemos la clase anterior para evitar conflictos
    root.classList.remove('light', 'dark');
    
    // Agregamos la clase actual
    root.classList.add(theme);
    
    // Guardamos en el navegador
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. Función para alternar
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}