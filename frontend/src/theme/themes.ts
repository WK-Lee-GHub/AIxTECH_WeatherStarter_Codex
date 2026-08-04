export interface ThemeDefinition {
  id: string;
  name: string;
  /** One-sentence description of the theme's overall visual mood. */
  description: string;
  /** Main color choices. */
  colors: string;
  /** Main typography choices. */
  typography: string;
  /** Main card styling choices. */
  cardStyle: string;
  /** Main layout density choices. */
  density: string;
}

/**
 * Registry of available visual themes. The current, shipped visual design
 * (glassy blue gradient, frosted cards, thin typography) is captured here as
 * the "apple" theme so it can be selected and preserved as new themes are
 * added later.
 */
export const themes: ThemeDefinition[] = [
  {
    id: 'apple',
    name: 'Apple',
    description:
      'Glassy blue gradient with frosted cards, evoking the stock macOS/iOS Weather app.',
    colors: 'Sky-to-slate blue gradient background, white text, translucent white overlays.',
    typography: 'Thin/extralight sans-serif with a large hero temperature display.',
    cardStyle: 'Frosted glass cards with backdrop blur, subtle white borders, and soft shadows.',
    density: 'Airy, generous padding.',
  },
  {
    id: 'midnight-aurora',
    name: 'Midnight Aurora',
    description: 'Dark mode with neon aurora gradient accents like the night sky.',
    colors: 'Near-black navy base with teal, purple, and pink aurora gradient blobs.',
    typography: 'Medium-weight sans-serif with a soft glow on the hero temperature.',
    cardStyle: 'Dark glass cards with a faint purple gradient border glow.',
    density: 'Medium, cards slightly tighter for a dashboard feel.',
  },
  {
    id: 'paper-forecast',
    name: 'Paper Forecast',
    description: 'Editorial, print-inspired light theme with a newspaper feel.',
    colors: 'Off-white/cream background, ink-black text, single muted accent (rust or forest).',
    typography: 'Serif headline for temperature, sans-serif body, tight letter-spacing.',
    cardStyle: 'Flat cards with thin hairline borders, no shadow, no radius (sharp corners).',
    density: 'Dense, newspaper-column layout.',
  },
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalist',
    description: 'Bold, high-contrast, playful with thick borders and hard shadows.',
    colors: 'Bright yellow/black/white with electric blue accent.',
    typography: 'Heavy display font, all-caps labels.',
    cardStyle: 'Thick black borders, hard offset drop-shadows, no blur, sharp corners.',
    density: 'Chunky, generous whitespace between blocky sections.',
  },
];

export const DEFAULT_THEME_ID = themes[0].id;

export function getTheme(id: string): ThemeDefinition {
  return themes.find((theme) => theme.id === id) ?? themes[0];
}
