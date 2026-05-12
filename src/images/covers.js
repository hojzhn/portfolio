// src/images/covers.js
import BakeSupport from "./BakeSupport.cover.png";
import Rathouse from "./Rathouse.cover.png";
import Flag from "./Flag.cover.png";
import Twenty from "./Twenty.cover.png";
// add all light-mode covers here

// Optional dark-mode variants. Filename convention: <Slug>.cover.dark.png
// Uncomment and import as you create them — slugs missing here fall back to light.
import TwentyDark from "./Twenty.cover.dark.png";
import FlagDark from "./Flag.cover.dark.png";

export const coverBySlug = {
  BakeSupport,
  Rathouse,
  Flag,
  Twenty,
};

export const coverBySlugDark = {
  Twenty: TwentyDark,
  Flag: FlagDark,
};

export function resolveCover(slug, mode) {
  if (mode === "dark" && coverBySlugDark[slug]) {
    return coverBySlugDark[slug];
  }
  return coverBySlug[slug];
}
