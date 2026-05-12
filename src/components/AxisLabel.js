import React from "react";

export default function AxisLabel({
  children,
  vertical,
  className = "",
  style = {},
}) {
  return (
    <div
      className={`uppercase font-mono text-[var(--point)] ${className}`}
      style={{
        letterSpacing: "0.16em",
        fontSize: "0.8em",
        writingMode: vertical ? "vertical-rl" : "horizontal-tb",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
