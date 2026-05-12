import React from "react";

/**
 * ThemeIcon — colored 3D tile with a stroked shape inside.
 * Shared between the Options list and the SetExposure header.
 *
 * Props:
 *   shape     — key into ICON_PATHS (chart, chip, shield, bolt, building, globe).
 *   bg        — base tile color (off-palette per theme so each looks distinct).
 *   fg        — stroke color of the inner SVG; also tints the sheen + rim.
 *   svgSize   — pixel size of the inner SVG. Defaults to 22.
 *   className — wrapper sizing/spacing classes (e.g. "w-16 h-20").
 */

export const ICON_PATHS = {
  chart: (
    <>
      <path d="M3 19h18" />
      <path d="M6 15v4 M10 11v8 M14 7v12 M18 13v6" />
      <path d="M5 11l4-4 4 4 4-6" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="0.5" />
      <path d="M9 3v3 M15 3v3 M9 18v3 M15 18v3 M3 9h3 M3 15h3 M18 9h3 M18 15h3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bolt: <path d="M13 3L4 14h6l-1 7 9-12h-6l1-6z" />,
  building: (
    <>
      <path d="M5 21V5h14v16" />
      <path d="M9 9h2 M13 9h2 M9 13h2 M13 13h2 M9 17h2 M13 17h2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 010 18 M12 3a14 14 0 000 18" />
    </>
  ),
};

export function ThemeIcon({ shape, bg, fg, svgSize = 22, className = "" }) {
  // Derive a tinted tile background from `fg` + the page bg2 token so
  // the icon adapts to light/dark mode automatically. Callers can still
  // pass an explicit `bg` for a one-off override.
  const tileBg = bg ?? `color-mix(in srgb, ${fg} 22%, var(--n-bg2))`;

  return (
    <div
      className={`rounded-lg flex items-center justify-center shrink-0 ${className}`}
      style={{
        // Diagonal sheen tinted with the icon's fg color → saturated 3D tile.
        background: `linear-gradient(135deg, color-mix(in srgb, ${fg} 45%, transparent) 0%, transparent 50%, rgba(0,0,0,0.18) 100%), ${tileBg}`,
        // Inset top rim picks up fg; bottom rim and lift use a fg-tinted
        // shadow that reads as a soft lift on both light and dark bgs.
        boxShadow: `inset 0 1px 0 color-mix(in srgb, ${fg} 50%, transparent), inset 0 -1px 0 color-mix(in srgb, ${fg} 30%, transparent), 0 4px 10px -3px color-mix(in srgb, ${fg} 30%, transparent)`,
      }}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={fg}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICON_PATHS[shape]}
      </svg>
    </div>
  );
}
