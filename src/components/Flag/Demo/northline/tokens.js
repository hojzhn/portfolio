/**
 * Northline palette — single source of truth.
 *
 * `palette` is the JS object form (used at runtime by SVG strokes,
 * gradient strings, and dynamic backgrounds in maps).
 * `cssVars` is the same data flattened into CSS custom properties,
 * applied to the NorthlineShell root via `style={...cssVars}`. From
 * there, every Tailwind class can reference them: `bg-[var(--n-bg)]`,
 * `text-[var(--n-accent)]`, etc.
 *
 * Change a color here and it flows everywhere — Tailwind classes, SVG,
 * the slider thumb, and dynamic JS reads.
 */

// Warm, earth-toned palette aligned with the Flag theme's
// dark-forest / cream-parchment colorway.
export const darkPalette = {
  bg: "#0f1714",
  bg1: "#15201c",
  bg2: "#1c2823",
  bg3: "#26332e",
  bg4: "#303f39",
  txt: "#e8e5de",
  txt2: "#8e938c",
  txt3: "#5c625b",
  accent: "#7ec089",
  accentDim: "#5aa06b",
  amber: "#d4a44c",
  red: "#d97757",
  blue: "#7fa5c4",
};

export const lightPalette = {
  bg: "#f5f2eb",
  bg1: "#fffdf7",
  bg2: "#ece7dc",
  bg3: "#ddd8ce",
  bg4: "#c8c2b3",
  txt: "#1a1f1d",
  txt2: "#6b716c",
  txt3: "#9a9f98",
  accent: "#3a7a4a",
  accentDim: "#285c36",
  amber: "#a4711f",
  red: "#c2603e",
  blue: "#456f96",
};

/**
 * Live, mutable palette object. Imports of `palette` and `C` hold a
 * stable reference; `applyPaletteMode` mutates the object in place
 * when the active mode changes, so subsequent reads of `palette.foo`
 * pick up the new value on the next render.
 */
export const palette = { ...darkPalette };

export const applyPaletteMode = (mode) => {
  Object.assign(palette, mode === "light" ? lightPalette : darkPalette);
};

// Backwards-compat alias — older imports used `C`.
export const C = palette;

const kebab = (s) => s.replace(/([A-Z])/g, "-$1").toLowerCase();

/**
 * CSS variable map for a given mode. Apply to a wrapping element:
 *   <div style={{ ...getCssVars(mode) }}> ...
 * After that, `var(--n-bg)`, `var(--n-accent-dim)`, etc. resolve
 * inside that subtree.
 */
export const getCssVars = (mode) => {
  const p = mode === "light" ? lightPalette : darkPalette;
  return Object.fromEntries(
    Object.entries(p).map(([k, v]) => [`--n-${kebab(k)}`, v]),
  );
};

// Static dark cssVars for callers that don't yet pass a mode.
export const cssVars = getCssVars("dark");

/**
 * Slider thumb is the one place plain CSS is unavoidable —
 * `::-webkit-slider-thumb` and `::-moz-range-thumb` can't be reached
 * via Tailwind utilities. References palette via CSS vars so any
 * change above flows here too.
 */
export const globalStyles = `
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--n-txt);
    border: 3px solid var(--n-bg);
    box-shadow: 0 0 0 2px var(--n-accent);
    cursor: pointer;
  }
  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--n-txt);
    border: 3px solid var(--n-bg);
    box-shadow: 0 0 0 2px var(--n-accent);
    cursor: pointer;
  }

  /* Northline scrollbar — thin track, soft thumb that brightens on hover.
     Firefox uses the shorthand props; WebKit uses the pseudo-element API. */
  .northline-scroll {
    scrollbar-width: thin;
    scrollbar-color: var(--n-bg3) transparent;
  }
  .northline-scroll::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .northline-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .northline-scroll::-webkit-scrollbar-thumb {
    background: var(--n-bg3);
    border-radius: 8px;
    border: 2px solid var(--n-bg);
  }
  .northline-scroll::-webkit-scrollbar-thumb:hover {
    background: var(--n-txt3);
  }
  .northline-scroll::-webkit-scrollbar-corner {
    background: transparent;
  }
`;
