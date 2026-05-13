import React, { useLayoutEffect, useRef, useState } from "react";
import MonoLabel from "../MonoLabel";

// Min width per column before we step down. Tune if cards need more breathing
// room — bigger values flip to fewer columns sooner.
const MIN_COL_PX = 260;

// Measure the element's own width with ResizeObserver. Returns [ref, width].
function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const measure = () => setWidth(node.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
}

/**
 * Card grid layout. Shows exactly `cols` columns when its **own container**
 * is wide enough (≥ `cols * MIN_COL_PX`), otherwise drops straight to 1
 * column — no intermediate step. No viewport breakpoints.
 */
export function CardGrid({ children, className = "", cols = 2 }) {
  const [ref, width] = useContainerWidth();
  const actualCols =
    width != null && width < cols * MIN_COL_PX ? 1 : cols;
  return (
    <div
      ref={ref}
      className={`grid gap-4 items-stretch ${className}`}
      style={{
        gridTemplateColumns: `repeat(${actualCols}, minmax(0, 1fr))`,
      }}
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
