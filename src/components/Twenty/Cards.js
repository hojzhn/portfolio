import React from "react";
import MonoLabel from "../MonoLabel";

/**
 * Three-up card layout. 3 columns on large screens, 1 column on mobile.
 * Each <Card> matches the ChartContainer aesthetic:
 *   border, rounded-lg, bg-[var(--bg2)], px-3 py-4.
 * MonoLabel sits at the top of each card.
 */

export function CardGrid({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 2xl:grid-cols-2 gap-4 items-stretch ${className}`}
    >
      {children}
    </div>
  );
}

export function Card({
  label,
  children,
  className = "",
  labelClass = "text-[var(--point)]",
}) {
  return (
    <div
      className={`h-full border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] px-3 py-4 flex flex-col gap-3 ${className}`}
    >
      {label && (
        <MonoLabel margin={false} className={labelClass}>
          {label}
        </MonoLabel>
      )}
      <div className="text-[var(--txt)] gap-4 flex flex-col">{children}</div>
    </div>
  );
}
