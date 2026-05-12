import React from "react";

export default function GraphicCaption({
  children,
  icon = "fa-chart-line",
  iconStyle = "fa-regular",
  className,
}) {
  return (
    <div
      className={`flex flex-row items-center gap-2 font-mono text-[var(--txt2)] text-[0.8em] ${className}`}
    >
      <i className={`fa ${iconStyle} ${icon}`} />
      <span>{children}</span>
    </div>
  );
}
