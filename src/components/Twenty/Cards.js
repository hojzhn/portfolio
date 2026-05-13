import React from "react";
import MonoLabel from "../MonoLabel";

/**
 * Card grid layout. One column on mobile, `cols` columns at the 2xl
 * breakpoint (default 2). Each <Card> matches the ChartContainer aesthetic:
 *   border, rounded-lg, bg-[var(--bg2)], px-3 py-4.
 * MonoLabel sits at the top of each card.
 */

export function CardGrid({ children, className = "", cols = 2 }) {
  return (
    <div
      className={`grid grid-cols-1 2xl:grid-cols-[var(--cardgrid-cols)] gap-4 items-stretch ${className}`}
      style={{ "--cardgrid-cols": `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

// Card exposes its horizontal padding as `--card-px` so descendants can bleed
// past it with `-mx-[var(--card-px)]` (re-padding internally with
// `px-[var(--card-px)]` to keep their content lined up).
export function Card({
  label,
  children,
  className = "",
  labelClass = "text-[var(--point)]",
}) {
  return (
    <div
      className={`h-full border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] px-[var(--card-px)] py-4 flex flex-col gap-3 ${className}`}
      style={{ "--card-px": "0.75rem" }}
    >
      {label && (
        <MonoLabel margin={false} className={labelClass}>
          {label}
        </MonoLabel>
      )}
      <div className="text-[var(--txt)] gap-4 flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
