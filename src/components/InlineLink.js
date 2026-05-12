import React from "react";

/**
 * Inline link with a dashed underline and a trailing link icon.
 *
 * Props:
 *   children:  ReactNode  Link text.
 *   href:      string     Required. URL to navigate to.
 *   target:    string     Anchor target. Defaults to "_blank".
 *   icon:      string     Font Awesome class. Defaults to "fa-arrow-up-right-from-square".
 *   className: string     Extra classes on the root.
 */
export default function InlineLink({
  children,
  href,
  target = "_blank",
  icon = "fa-arrow-up-right",
  className = "",
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`inline-flex items-baseline gap-1 underline decoration-dashed decoration-[var(--point)] underline-offset-4 hover:text-[var(--point)] transition-colors duration-300 ease-out ${className} pr-2`}
    >
      <span>{children}</span>
      <i
        className={`fa-regular ${icon} text-[0.6em] text-[var(--point)]`}
        aria-hidden="true"
      />
    </a>
  );
}
