import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_THEME_ID, themes } from '../theme/themes';

const STORAGE_KEY = 'weather-starter-theme';

interface ThemeContextValue {
  themeId: string;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredThemeId(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && themes.some((theme) => theme.id === stored) ? stored : DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(readStoredThemeId);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
    try {
      window.localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // Ignore storage errors (e.g. privacy mode).
    }
  }, [themeId]);

  return <ThemeContext.Provider value={{ themeId, setThemeId }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
