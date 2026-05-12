// Single source of truth for every color used in the Test prototype.
// Components must not hard-code Tailwind color utilities (bg-*, text-*,
// border-*, hover:bg-*, disabled:*-* …) — pull them from here instead.
// Layout/spacing/typography stays inline in the components.

export const palette = {
  // surfaces
  bg: "bg-white",
  bgSubtle: "bg-neutral-50",
  bgSelected: "bg-neutral-100",
  bgInverted: "bg-black",
  bgTransparent: "bg-transparent",

  // text
  text: "text-black",
  mutedText: "text-neutral-600",
  invertedText: "text-white",

  // borders
  border: "border-black",
  borderTransparent: "border-transparent",

  // interactive states
  hoverBg: "hover:bg-neutral-100",
  hoverBgInverted: "hover:bg-black",
  hoverBgTransparent: "hover:bg-transparent",
  disabledText: "disabled:text-neutral-500",
  disabledBorder: "disabled:border-neutral-500",
  disabledHoverBg: "disabled:hover:bg-white",
};
