import { useEffect, useState } from 'react';

export const themes = [
  { id: 'apple', label: 'Apple', description: 'The original Weather Starter look' },
  { id: 'clear-horizon', label: 'Clear Horizon', description: 'Bright skies with warm sunlight accents' },
  { id: 'midnight', label: 'Midnight Forecast', description: 'Deep navy with electric blue accents' },
  { id: 'weather-glass', label: 'Weather Glass', description: 'Frosted surfaces over atmospheric gradients' },
  { id: 'coastal', label: 'Coastal Calm', description: 'Cool seafoam tones and soft contrast' },
  { id: 'solar', label: 'Solar Pop', description: 'Warm, energetic yellow and orange accents' },
  { id: 'radar', label: 'Radar Grid', description: 'A technical meteorological control room' },
] as const;

export type ThemeId = (typeof themes)[number]['id'];

const STORAGE_KEY = 'weather-starter-theme';

function getInitialTheme(): ThemeId {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return themes.some((theme) => theme.id === saved) ? (saved as ThemeId) : 'apple';
}

export function ThemeSelector() {
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <label className="theme-selector fixed right-4 top-4 z-[60] flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-xl">
      <span className="hidden text-[10px] uppercase tracking-[0.14em] opacity-65 sm:inline">Theme</span>
      <select
        aria-label="Choose visual theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value as ThemeId)}
        className="theme-selector__select cursor-pointer bg-transparent font-semibold outline-none"
      >
        {themes.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
