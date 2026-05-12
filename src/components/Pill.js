import React from "react";

/**
 * Small uppercase tag / pill.
 *
 *   color  — any CSS color (e.g. "var(--point)", "#22c55e"). Used for
 *            the text and (mixed) the border.
 *   bg     — base color for the semi-transparent background; defaults
 *            to `color`. Pass "var(--bg)" etc. for a neutral fill.
 *
 * Workaround note: Tailwind's `/40` opacity modifier only works on
 * Tailwind color tokens, not arbitrary `var(--x)` values — so
 * `bg-[var(--bg)]/40` does nothing. Instead we build the translucent
 * fill / border with `color-mix(in srgb, <color> N%, transparent)`,
 * which works with any CSS color including custom properties.
 *
 *   bgOpacity     — % of `bg` color in the background mix   (default 12)
 *   borderOpacity — % of `color` in the border mix          (default 40)
 */
export default function Pill({
  children,
  color = "var(--txt2)",
  bg,
  mono = true,
  bgOpacity = 12,
  borderOpacity = 40,
  className = "",
}) {
  const fill = bg ?? color;
  return (
    <span
      className={`inline-flex items-center self-center px-2 py-[0.35em] text-[0.7em] tracking-[0.1em] uppercase leading-none whitespace-nowrap border rounded ${className} ${mono ? "font-mono" : ""}`}
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} ${borderOpacity}%, transparent)`,
        background: `color-mix(in srgb, ${fill} ${bgOpacity}%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}
