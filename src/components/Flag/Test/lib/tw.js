// Single source of truth for every color used in the Test prototype.
// Components must not hard-code Tailwind color utilities (bg-*, text-*,
// border-*, hover:bg-*, disabled:*-* …) — pull them from here instead.
// Layout/spacing/typography stays inline in the components.

export const palette = {
  // surfaces
  bg: "bg-[var(--bg)]",
  bgSubtle: "bg-[var(--bg2)]",
  bgSelected: "bg-[var(--bg3)]",
  bgInverted: "bg-[var(--bg3)]",
  bgTransparent: "bg-transparent",

  // text
  text: "text-[var(--txt)]",
  mutedText: "text-[var(--txt2)]",
  invertedText: "text-[var(--txt2)]",

  // borders
  border: "border-[var(--bg3)]",
  borderTransparent: "border-transparent",

  // interactive states
  hoverBg: "hover:bg-[var(--bg2)]",
  hoverBgInverted: "hover:bg-[var(--txt)]",
  hoverBgTransparent: "hover:bg-transparent",
  disabledText: "disabled:text-[var(--txt2)]",
  disabledBorder: "disabled:text-[var(--txt2)]",
  disabledHoverBg: "disabled:bg-[var(--bg2)]",
};
