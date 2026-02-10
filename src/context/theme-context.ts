import { createContext } from 'react';
import type { Theme } from '../lib/themes';

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  currentTheme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
