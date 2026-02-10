import React, { useEffect, useState, type ReactNode } from 'react';
import { themes } from '../lib/themes';
import { ThemeContext } from './theme-context';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'dracula';
  });

  const setTheme = (name: string) => {
    if (themes[name]) {
      setThemeName(name);
      localStorage.setItem('theme', name);
    }
  };

  useEffect(() => {
    const theme = themes[themeName];
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme, currentTheme: themes[themeName] }}>
      <div className="bg-background text-text min-h-screen transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
