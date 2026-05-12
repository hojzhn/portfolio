import React, { useState, useEffect, useContext, useMemo } from "react";
import AxisLabel from "./AxisLabel";
import { LayoutContext } from "../context/LayoutContext";
import { ChartContainer } from "../pages/Flag.content";
import GraphicCaption from "./GraphicCaption";

const SHRINK_BREAKPOINT = 960;

/* ------------------------------------------------------------------ */
/*  hooks                                                              */
/* ------------------------------------------------------------------ */

function useShrink(breakpoint = SHRINK_BREAKPOINT) {
  const [shrink, setShrink] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );

  useEffect(() => {
    const onResize = () => setShrink(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return shrink;
}

/* ------------------------------------------------------------------ */
/*  helpers                                                            */
/* ------------------------------------------------------------------ */

// Returns a human-readable position like "Digital · Self-Legitimated"
// so users tapping a chip on mobile understand where the point sits.
function describePosition(point) {
  if (!point) return "";
  const { x = 0, y = 0 } = point;
  const xLabel = x > 0.5 ? "Self-Legitimated" : x < -0.5 ? "Accredited" : null;
  const yLabel = y > 0.5 ? "Digital" : y < -0.5 ? "Analogue" : null;
  return [yLabel, xLabel].filter(Boolean).join(" · ");
}

function projectToPercent(value, gridSize, axis) {
  // axis: "x" -> left%, "y" -> top%  (y is flipped because top=0 is up)
  const raw = (value / gridSize) * 100;
  const centered = axis === "x" ? 50 + raw : 50 - raw;
  return 10 + centered * 0.8; // 10% padding, 80% usable area
}

/* ------------------------------------------------------------------ */
/*  sub-components                                                     */
/* ------------------------------------------------------------------ */

function GridLines({ gridSize }) {
  const lines = useMemo(() => {
    const out = [];
    for (let i = 1; i < gridSize; i++) {
      const percent = (i / gridSize) * 100;
      out.push(
        <div
          key={`v-${i}`}
          className="absolute top-0 h-full border-l border-dashed"
          style={{ left: `${percent}%`, borderColor: "var(--txt)" }}
        />,
        <div
          key={`h-${i}`}
          className="absolute left-0 w-full border-t border-dashed"
          style={{ top: `${percent}%`, borderColor: "var(--txt)" }}
        />,
      );
    }
    return out;
  }, [gridSize]);

  return (
    <div
      className="absolute inset-[30px] border border-dashed opacity-10"
      style={{ borderColor: "var(--txt)" }}
    >
      {lines}
    </div>
  );
}

function PointMarker({
  point,
  gridSize,
  isActive,
  isSelected,
  shrink,
  blendMode,
  onSelect,
}) {
  const { name, x, y, dx = 0, dy = 0, highlight } = point;

  const left = projectToPercent(x, gridSize, "x");
  const top = projectToPercent(y, gridSize, "y");
  const widthPercent = (dx / gridSize) * 80;
  const heightPercent = (dy / gridSize) * 80;
  const hasRange = dx > 0 || dy > 0;
  const baseLayer = !hasRange ? 30 : dx === 0 || dy === 0 ? 20 : 10;

  const wrapperStyle = {
    opacity: isActive ? 1 : 0.1,
    mixBlendMode: isActive ? blendMode : "normal",
    zIndex: baseLayer,
    transition: "opacity 500ms",
  };

  const labelOpacity = shrink ? (isActive ? 1 : 0) : isActive ? 1 : 0.4;
  const labelPointerEvents = shrink && !isActive ? "none" : "auto";

  /* ---------- single dot ---------- */
  if (!hasRange) {
    return (
      <>
        <button
          type="button"
          onClick={() => onSelect(name)}
          aria-pressed={isSelected}
          aria-label={name}
          className="absolute cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
          style={{
            ...wrapperStyle,
            left: `${left}%`,
            top: `${top}%`,
            width: 32, // bigger tap target than the visible dot
            height: 32,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              backgroundColor: "var(--txt)",
              width: isActive ? 10 : 8,
              height: isActive ? 10 : 8,
              transform: "translate(-50%, -50%)",
              transition: "width 200ms, height 200ms",
            }}
          />
        </button>

        <span
          aria-hidden="true"
          className="absolute text-xs pointer-events-none"
          style={{
            opacity: labelOpacity,
            left: `calc(${left}% + 12px)`,
            top: `calc(${top}% - 8px)`,
            color: "var(--txt)",
            zIndex: 100,
            transition: "opacity 500ms",
            pointerEvents: labelPointerEvents,
          }}
        >
          {name}
        </span>
      </>
    );
  }

  /* ---------- horizontal or vertical line ---------- */
  if (dx === 0 || dy === 0) {
    const isHorizontal = dx > 0;
    return (
      <>
        <button
          type="button"
          onClick={() => onSelect(name)}
          aria-pressed={isSelected}
          aria-label={name}
          className="absolute cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            ...wrapperStyle,
            left: `${left}%`,
            top: `${top}%`,
            width: isHorizontal ? `${widthPercent}%` : 32,
            height: isHorizontal ? 32 : `${heightPercent}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className="absolute left-1/2 top-1/2"
            style={{
              backgroundColor: "var(--txt)",
              width: isHorizontal ? "100%" : "1px",
              height: isHorizontal ? "1px" : "100%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </button>

        <span
          aria-hidden="true"
          className="absolute text-xs text-center pointer-events-none whitespace-nowrap"
          style={{
            opacity: labelOpacity,
            left: `${left}%`,
            top: `calc(${top}% - 8px)`,
            transform: "translate(-50%, -100%)",
            color: "var(--txt)",
            zIndex: 100,
            transition: "opacity 500ms",
            pointerEvents: labelPointerEvents,
          }}
        >
          {name}
        </span>
      </>
    );
  }

  /* ---------- 2D box / highlight oval ---------- */
  return (
    <button
      type="button"
      onClick={() => onSelect(name)}
      aria-pressed={isSelected}
      aria-label={name}
      className={`absolute text-xs cursor-pointer p-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        highlight
          ? "rounded-full overflow-hidden flex justify-center items-center border-0"
          : "rounded-xl border"
      }`}
      style={{
        ...wrapperStyle,
        left: `${left}%`,
        top: `${top}%`,
        width: `${widthPercent}%`,
        height: `${heightPercent}%`,
        transform: "translate(-50%, -50%)",
        borderColor: "var(--txt)",
      }}
    >
      {highlight && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: "var(--bg3)" }}
        />
      )}
      {(!shrink || isActive || highlight) && (
        <span
          aria-hidden="true"
          className={
            highlight
              ? "absolute text-lg left-[33%] bottom-[33%]"
              : "block -translate-y-[120%] text-center"
          }
          style={{
            color: "var(--txt)",
            transform: highlight ? "translate(-50%, 50%)" : undefined,
          }}
        >
          {name}
        </span>
      )}
    </button>
  );
}

function ChipGroup({ label, points, selected, isArtMode, onSelect }) {
  if (points.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span
          className="text-[10px] uppercase tracking-wider opacity-50"
          style={{ color: "var(--txt)" }}
        >
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {points.map((point) => {
          const isDirectSelected = selected === point.name;
          const isArtRelatedActive =
            !isDirectSelected && isArtMode && point.isArt;

          return (
            <button
              key={point.name}
              type="button"
              onClick={() => onSelect(point.name)}
              aria-pressed={isDirectSelected}
              className={`cursor-pointer transition-all duration-200 py-1 px-3 rounded-lg border text-xs ${
                isDirectSelected
                  ? "scale-[1.02]"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{
                borderColor:
                  isDirectSelected || isArtRelatedActive
                    ? "var(--bg2)"
                    : "transparent",
                backgroundColor: isDirectSelected
                  ? "var(--bg)"
                  : isArtRelatedActive
                    ? "var(--txt)"
                    : "var(--bg2)",
                color: isArtRelatedActive ? "var(--bg)" : "var(--txt)",
              }}
            >
              {point.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  main component                                                     */
/* ------------------------------------------------------------------ */

export default function GridPlot({ points = [], gridSize = 10 }) {
  if (!Array.isArray(points)) {
    throw new Error("GridPlot: `points` must be an array");
  }

  const shrink = useShrink();
  const { layout } = useContext(LayoutContext);
  const currentMode = layout?.palette?.mode ?? "light";
  const blendMode = currentMode === "light" ? "darken" : "screen";

  const defaultName = useMemo(
    () => points.find((p) => p.highlight)?.name ?? points[0]?.name ?? null,
    [points],
  );

  // Initialize directly — no need for useRef/useEffect dance.
  const [selected, setSelected] = useState(defaultName);

  // If `points` changes and the current selection is no longer present,
  // fall back to the new default.
  useEffect(() => {
    if (!points.some((p) => p.name === selected)) {
      setSelected(defaultName);
    }
  }, [points, selected, defaultName]);

  const handleSelect = (name) => {
    setSelected((prev) => (prev === name ? defaultName : name));
  };

  const isArtMode = selected === defaultName;
  const selectedPoint = useMemo(
    () => points.find((p) => p.name === selected) ?? null,
    [points, selected],
  );

  // Group chips so the structure of the data is visible on mobile.
  const { highlightPoint, artPoints, otherPoints } = useMemo(() => {
    const highlight = points.find((p) => p.name === defaultName) ?? null;
    const art = points
      .filter((p) => p.isArt && p.name !== defaultName)
      .sort((a, b) => a.name.localeCompare(b.name));
    const others = points
      .filter((p) => !p.isArt && p.name !== defaultName)
      .sort((a, b) => a.name.localeCompare(b.name));
    return { highlightPoint: highlight, artPoints: art, otherPoints: others };
  }, [points, defaultName]);

  return (
    <>
      <ChartContainer>
        <GraphicCaption>Creative Market Alignment</GraphicCaption>

        <div className="w-full mx-auto max-w-[800px] aspect-square xl:aspect-[5/3] relative mt-[1em]">
          {/* axis labels */}
          <div
            className="absolute top-1/2 left-0 right-0 flex justify-between"
            style={{ transform: "translateY(calc(-50% - 1rem))" }}
          >
            <AxisLabel vertical>Accredited</AxisLabel>
            <AxisLabel vertical>Self-Legitimated</AxisLabel>
          </div>

          <div
            className="absolute left-1/2 top-0 bottom-0 flex flex-col justify-between items-center"
            style={{ transform: "translateX(calc(-50% + 1rem))" }}
          >
            <AxisLabel>Digital</AxisLabel>
            <AxisLabel>Analogue</AxisLabel>
          </div>

          <GridLines gridSize={gridSize} />

          {points.map((point, i) => {
            const isSelected = selected === point.name;
            const isArtActive = point.isArt && isArtMode;
            const isActive = isSelected || isArtActive;

            return (
              <PointMarker
                key={`${point.name}-${i}`}
                point={point}
                gridSize={gridSize}
                isActive={isActive}
                isSelected={isSelected}
                shrink={shrink}
                blendMode={blendMode}
                onSelect={handleSelect}
              />
            );
          })}
        </div>
      </ChartContainer>

      {/* mobile-only callout + chip groups */}
      {shrink && (
        <div className="mt-6 flex flex-col gap-4">
          {/* selected-item callout — bridges chart and chips */}
          <div
            aria-live="polite"
            className="px-3 py-2 rounded-lg border"
            style={{
              borderColor: "var(--bg2)",
              backgroundColor: "var(--bg2)",
            }}
          >
            <div
              className="text-[10px] uppercase tracking-wider opacity-50"
              style={{ color: "var(--txt)" }}
            >
              Selected
            </div>
            <div className="text-sm" style={{ color: "var(--txt)" }}>
              {selectedPoint?.name ?? "—"}
              {describePosition(selectedPoint) && (
                <span className="opacity-50">
                  {"  ·  "}
                  {describePosition(selectedPoint)}
                </span>
              )}
            </div>
          </div>

          {highlightPoint && (
            <ChipGroup
              points={[highlightPoint]}
              selected={selected}
              isArtMode={isArtMode}
              onSelect={handleSelect}
            />
          )}
          <ChipGroup
            label="Art-adjacent"
            points={artPoints}
            selected={selected}
            isArtMode={isArtMode}
            onSelect={handleSelect}
          />
          <ChipGroup
            label="Other creative work"
            points={otherPoints}
            selected={selected}
            isArtMode={isArtMode}
            onSelect={handleSelect}
          />
        </div>
      )}
    </>
  );
}
