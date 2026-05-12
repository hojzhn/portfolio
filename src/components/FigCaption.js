import React from "react";

/**
 * Small caption for figures (video/image). Renders a sparkle icon
 * before the caption text, in muted color.
 *
 *   children — caption ReactNode.
 *   className — extra classes on the figcaption element.
 */
export default function FigCaption({ children, className = "" }) {
  return (
    <figcaption
      className={`text-[var(--txt2)] mt-4 text-xs ${className}`}
    >
      <i className="fa-sharp fa-solid fa-sparkle mr-2" />
      {children}
    </figcaption>
  );
}
