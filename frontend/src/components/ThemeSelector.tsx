import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../state/theme';
import { themes, getTheme } from '../theme/themes';

export function ThemeSelector() {
  const { themeId, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const current = getTheme(themeId);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed right-4 top-4 z-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/[0.18]"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-white/70" />
        <span>{current.name} theme</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-1.5 text-sm text-white shadow-lg shadow-black/30 backdrop-blur-2xl"
        >
          {themes.map((theme) => {
            const isSelected = theme.id === themeId;
            return (
              <button
                key={theme.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setThemeId(theme.id);
                  setOpen(false);
                }}
                className={`flex w-full flex-col gap-0.5 rounded-xl px-3 py-2 text-left transition ${
                  isSelected ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <span className="font-medium">{theme.name}</span>
                <span className="text-xs text-white/60">{theme.description}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
