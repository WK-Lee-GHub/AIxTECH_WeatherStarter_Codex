# Weather Starter Themes

Visual theme directions discussed for Weather Starter. The selector currently includes **Apple**, **Clear Horizon**, **Midnight Forecast**, **Weather Glass**, and **Coastal Calm**. The remaining concepts are documented here for future implementation.

| Theme | Description | Color | Typography | Card styling | Layout density |
| --- | --- | --- | --- | --- | --- |
| **Clear Horizon** | A bright, optimistic weather dashboard inspired by open skies and clean morning light. | Sky blue, white, and warm yellow accents. | Rounded sans-serif with friendly proportions. | Soft white panels with subtle shadows and rounded corners. | Spacious, low-density grid. |
| **Midnight Forecast** | A polished dark-mode experience designed for checking weather at night. | Navy, charcoal, electric blue, and moonlight gray. | Geometric or modern sans-serif with bold temperature numerals. | Dark translucent surfaces with luminous accents. | Compact dashboard with strong hierarchy. |
| **Weather Glass** | A futuristic glassmorphism interface where forecasts float over atmospheric gradients. | Blue-purple gradients, frosted white, and cyan highlights. | Thin modern sans-serif paired with heavy temperature figures. | Translucent blurred surfaces with rounded corners and layered depth. | Layered, moderately dense composition. |
| **Coastal Calm** | A serene seaside-inspired theme that makes forecast browsing feel relaxed and airy. | Seafoam, pale aqua, sand, and coral accents. | Elegant humanist sans-serif. | Rounded cards with minimal shadows. | Wide, generous spacing with horizontal forecast rows. |
| **Alpine Weather** | A crisp, high-altitude visual system combining cool air, snow, and rugged terrain. | Ice blue, slate, off-white, and pine green. | Sturdy condensed headings with readable body text. | Structured panels with thin borders. | Ordered, modular, medium density. |
| **Solar Pop** | A playful, energetic weather app with bold colors and cheerful visual feedback. | Vivid yellow, orange, turquoise, and cobalt. | Friendly rounded display font. | Oversized rounded corners and colorful icon backgrounds. | Approachable, spacious, card-forward layout. |
| **Editorial Weather** | A refined magazine-like forecast experience focused on typography, context, and visual storytelling. | Cream, ink black, muted rust, and sage. | Serif headlines paired with minimalist sans-serif metadata. | Flat editorial blocks with dividers. | Asymmetric columns with varied content density. |
| **Radar Grid** | A technical meteorological interface inspired by radar stations and scientific instruments. | Near-black, signal green, amber, and cool gray. | Monospaced data labels with compact sans-serif headings. | Squared panels, grid lines, and minimal radius. | Information-dense control-room dashboard. |
| **Soft Pastel Skies** | A gentle, friendly theme using soft colors to make complex forecast information feel approachable. | Lavender, blush, powder blue, and mint. | Rounded sans-serif with light weights. | Pill-shaped or heavily rounded cards with diffuse shadows. | Spacious, calm, and low density. |
| **Monsoon Modern** | A tropical rain-focused theme balancing lush natural color with a clean contemporary interface. | Deep green, rain blue, mist gray, and lime accents. | Confident modern sans-serif. | Dark or pale panels with rain-inspired accents. | Medium density with prominent precipitation sections. |
| **Desert Heat** | A warm, tactile weather dashboard inspired by sun-baked landscapes and dry air. | Terracotta, sand, ochre, deep brown, and dusty blue. | Expressive grotesk or humanist sans-serif. | Matte surfaces with subtle grain and modest radius. | Spacious, with strong large-temperature moments. |
| **Aurora Night** | A dramatic nighttime interface using luminous gradients to evoke polar skies. | Deep indigo, emerald, violet, and neon teal. | Sleek sans-serif with large light-weight headings. | Dark surfaces with gradient borders or ambient glow. | Immersive, layered, and medium density. |
| **Paper Almanac** | A nostalgic digital interpretation of printed farmer’s almanacs and daily weather journals. | Parchment, forest green, faded red, and charcoal. | Serif titles with typewriter-style details. | Paper-like panels, rules, stamps, and subtle texture. | Dense but organized, column-based layout. |
| **City Pulse** | An urban weather experience designed around commuting, neighborhoods, and fast-changing conditions. | Concrete gray, black, traffic orange, and electric cyan. | Bold condensed sans-serif. | Rectangular, high-contrast cards with light rounding. | Compact, scannable, timeline-oriented layout. |
| **Minimal Forecast** | A quiet, premium interface that strips weather down to the most important signals. | Monochrome neutrals with one seasonal accent. | Refined sans-serif with oversized temperature figures. | Mostly borderless and shadow-free. | Very low density with generous whitespace. |

## Shared implementation considerations

- Themes should change presentation only. Location data, map behavior, add-location flow, refresh behavior, loading states, and backend API calls should remain shared.
- The selected theme should persist locally so a page reload does not reset the visual preference.
- The selector belongs in the top-right of the application and should remain usable at narrow widths.
- Each theme needs sufficient contrast for forecast values, metadata, controls, inputs, and map labels.
- Weather icons and data visualizations should retain their meaning across palettes; color should reinforce status without becoming the only signal.
