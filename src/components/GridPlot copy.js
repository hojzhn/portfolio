import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import AxisLabel from "./AxisLabel";
import { LayoutContext } from "../context/LayoutContext";

export default function GridPlot({ points = [], gridSize = 10 }) {
  const SHRINK_BREAKPOINT = 960;

  const [shrink, setShrink] = useState(window.innerWidth < SHRINK_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setShrink(window.innerWidth < SHRINK_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Array.isArray(points)) {
    console.error("Invalid points prop:", points);
    throw new Error("GridPlot: `points` must be an array");
  }

  const defaultName = useMemo(
    () => points.find((p) => p.highlight)?.name ?? null,
    [points],
  );

  const didInitSelection = useRef(false);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!didInitSelection.current && defaultName) {
      setSelected(defaultName);
      didInitSelection.current = true;
    }
  }, [defaultName]);

  const handleSelect = (name) => {
    setHovered(null);

    setSelected((prev) => (prev === name ? defaultName : name));
  };

  const isArtMode = selected === defaultName;

  const { layout } = useContext(LayoutContext);
  const currentMode = layout?.palette?.mode ?? "light";

  const sortedPoints = useMemo(() => {
    const highlightPoint = points.find((p) => p.name === defaultName);

    const others = points
      .filter((p) => p.name !== defaultName)
      .sort((a, b) => a.name.localeCompare(b.name));

    return highlightPoint ? [highlightPoint, ...others] : others;
  }, [points, defaultName]);

  const gridLines = [];
  for (let i = 1; i < gridSize; i++) {
    const percent = (i / gridSize) * 100;
    gridLines.push(
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

  return (
    <>
      <div
        className="w-full mx-auto max-w-[800px] aspect-square relative my-16"
        style={{ backgroundColor: "var(--bg)" }}
      >
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

        <div
          className="absolute inset-[30px] border border-dashed opacity-10"
          style={{ borderColor: "var(--txt)" }}
        >
          {gridLines}
        </div>

        {points.map(({ name, x, y, dx = 0, dy = 0, highlight, isArt }, i) => {
          const leftPercent = 10 + (50 + (x / gridSize) * 100) * 0.8;
          const topPercent = 10 + (50 - (y / gridSize) * 100) * 0.8;
          const widthPercent = (dx / gridSize) * 80;
          const heightPercent = (dy / gridSize) * 80;
          const hasRange = dx > 0 || dy > 0;

          const isSelected = selected === name;
          const isHovered = hovered === name;
          const isArtActive = isArt && isArtMode;
          const isActive = isSelected || isHovered || isArtActive;

          return (
            <div
              key={i}
              style={{
                mixBlendMode: isActive
                  ? currentMode === "light"
                    ? "darken"
                    : "screen"
                  : "normal",
              }}
              className={`duration-500 ${isActive ? "opacity-100" : "opacity-10"}`}
            >
              {hasRange ? (
                dx === 0 || dy === 0 ? (
                  <div
                    className="absolute rounded-full cursor-pointer"
                    style={{
                      backgroundColor: "var(--txt)",
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      width: dx > 0 ? `${widthPercent}%` : "1px",
                      height: dy > 0 ? `${heightPercent}%` : "1px",
                      transform: "translate(-50%, -50%)",
                      zIndex: isSelected || isHovered ? 20 : 1,
                    }}
                    onClick={() => handleSelect(name)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setHovered(name);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setHovered(null);
                    }}
                  >
                    <div className="translate-y-[-120%] text-xs text-center pointer-events-none">
                      {name}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`absolute rounded-xl text-xs cursor-pointer ${
                      highlight
                        ? "overflow-hidden flex justify-center items-center"
                        : "border"
                    }`}
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      width: `${widthPercent}%`,
                      height: `${heightPercent}%`,
                      transform: "translate(-50%, -50%)",
                      borderColor: "var(--txt)",
                      zIndex: isSelected || isHovered ? 20 : 1,
                    }}
                    onClick={() => handleSelect(name)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setHovered(name);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") setHovered(null);
                    }}
                  >
                    {highlight && (
                      <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                          background: `
                            radial-gradient(circle at 33% 67%, ${
                              currentMode === "light"
                                ? "var(--txt)"
                                : "var(--bg)"
                            } 0%, transparent 70%),
                            url(https://grainy-gradients.vercel.app/noise.svg)
                          `,
                          filter: `contrast(170%) brightness(1000%) ${
                            currentMode === "light" ? "invert(0)" : "invert(1)"
                          } grayscale(1)`,
                        }}
                      />
                    )}

                    <div
                      style={{
                        color: highlight ? "var(--bg)" : "var(--txt)",
                        transform: highlight
                          ? "translate(-50%, 50%)"
                          : undefined,
                      }}
                      className={`${
                        highlight
                          ? "absolute text-lg left-[33%] bottom-[33%]"
                          : "translate-y-[-120%]"
                      } text-center pointer-events-none`}
                    >
                      {name}
                    </div>
                  </div>
                )
              ) : (
                <div
                  className="absolute z-4 cursor-pointer"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    zIndex: isSelected || isHovered ? 20 : 1,
                  }}
                  onClick={() => handleSelect(name)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setHovered(name);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setHovered(null);
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full z-[2]"
                    style={{
                      backgroundColor: "var(--txt)",
                      transition: "transform 0.15s ease",
                    }}
                  />
                  <div className="ml-2 text-xs translate-x-2 -translate-y-2 absolute z-[2] pointer-events-none">
                    {name}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {shrink && (
        <div className="mt-6 flex justify-end flex-wrap gap-2">
          {sortedPoints.map((point, i) => {
            const isDirectSelected = selected === point.name;
            const isArtRelatedActive =
              !isDirectSelected && isArtMode && point.isArt;

            return (
              <button
                key={`${point.name}-${i}`}
                type="button"
                onClick={() => handleSelect(point.name)}
                className="px-3 py-1 rounded-md border text-xs transition-colors"
                style={{
                  borderColor:
                    isDirectSelected || isArtRelatedActive
                      ? "transparent"
                      : "var(--txt2)",
                  backgroundColor: isDirectSelected
                    ? "var(--txt)"
                    : isArtRelatedActive
                      ? "var(--bg2)"
                      : "transparent",
                  color: isDirectSelected ? "var(--bg)" : "var(--txt)",
                  opacity: isDirectSelected || isArtRelatedActive ? 1 : 0.6,
                }}
              >
                {point.name}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
