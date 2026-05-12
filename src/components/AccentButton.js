import React from "react";

/**
 * Accent button with a "sweep-in" hover.
 *
 * Default state: transparent background, accent border + text.
 * Hover: background fills accent color from the left, text flips to --point2,
 * optional trailing icon slides right.
 *
 * Props:
 *   children:  ReactNode                 Button label.
 *   onClick:   () => void                Click handler (renders as <button>).
 *   href:      string                    If passed, renders as an <a>.
 *   target:    string                    Anchor target.
 *   icon:      string                    Font Awesome class for trailing icon.
 *   size:      "sm" | "md" | "lg"        Defaults to "md".
 *   type:      "button" | "submit"       Button type. Defaults to "button".
 *   className: string                    Extra classes on the root.
 */
export default function AccentButton({
  children,
  onClick,
  href,
  target,
  icon,
  size = "md",
  type = "button",
  className = "",
}) {
  const sizeClass =
    {
      sm: "px-3 py-1.5 text-[12px]",
      md: "px-4 py-2 text-[13px]",
      lg: "px-6 py-3 text-[14px]",
    }[size] || "px-4 py-2 text-[13px]";

  const rootClass = `
    group relative inline-flex items-center justify-center overflow-hidden
    rounded border border-[var(--point)]
    font-medium tracking-wide whitespace-nowrap
    text-[var(--point)] hover:text-[var(--point2)]
    transition-colors duration-300 ease-out
    cursor-pointer select-none
    ${sizeClass}
    ${className}
  `;

  const inner = (
    <>
      {/* Sweep-in fill */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--point)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
      />
      {/* Label sits above the fill */}
      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>
        {icon && (
          <i
            className={`${icon} transition-transform duration-300 ease-out group-hover:translate-x-1`}
            aria-hidden="true"
          />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={rootClass}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={rootClass}>
      {inner}
    </button>
  );
}
