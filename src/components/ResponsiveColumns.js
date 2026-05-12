import React from "react";

export default function ResponsiveColumns({
  children,
  className = "",
  marginBottom = "2em",
  divider = true,
}) {
  const dividerClass = divider
    ? "2xl:bg-[linear-gradient(to_right,transparent_calc(50%-0.5px),var(--bg3)_calc(50%),transparent_calc(50%+0.5px))]"
    : "";

  return (
    <div
      className={`
        relative
        max-w-[140em]
        columns-1
        2xl:columns-2
        gap-[3em]
        [column-fill:balance]

        ${dividerClass}

        ${className}
      `}
    >
      {React.Children.map(children, (child, i) => (
        <div key={i} className={`mb-[${marginBottom}] break-inside-avoid`}>
          {child}
        </div>
      ))}
    </div>
  );
}
