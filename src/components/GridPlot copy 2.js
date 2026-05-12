import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import AxisLabel from "./AxisLabel";
import { LayoutContext } from "../context/LayoutContext";
import { ChartContainer } from "../pages/Flag.content";
import GraphicCaption from "./GraphicCaption";

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
    throw new Error("GridPlot: `points` must be an array");
  }

  const defaultName = useMemo(
    () => points.find((p) => p.highlight)?.name ?? points[0]?.name ?? null,
    [points],
  );

  const didInitSelection = useRef(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!didInitSelection.current && defaultName) {
      setSelected(defaultName);
      didInitSelection.current = true;
    }
  }, [defaultName]);

  const handleSelect = (name) => {
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
      <ChartContainer>
        <GraphicCaption>Creative Market Alignment</GraphicCaption>
        <div className="w-full mx-auto max-w-[800px] aspect-square xl:aspect-[5/3] relative ">
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
            const isArtActive = isArt && isArtMode;
            const isActive = isSelected || isArtActive;

            const baseLayer = !hasRange ? 30 : dx === 0 || dy === 0 ? 20 : 10;

            const commonWrapperStyle = {
              opacity: isActive ? 1 : 0.1,
              mixBlendMode: isActive
                ? currentMode === "light"
                  ? "darken"
                  : "screen"
                : "normal",
              zIndex: baseLayer,
            };
            if (!hasRange) {
              return (
                <React.Fragment key={i}>
                  <button
                    type="button"
                    onClick={() => handleSelect(name)}
                    className="absolute cursor-pointer duration-500 bg-transparent border-0 p-0"
                    style={{
                      ...commonWrapperStyle,
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      width: "20px",
                      height: "20px",
                      transform: "translate(-50%, -50%)",
                    }}
                    aria-label={name}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: "var(--txt)",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelect(name)}
                    className="absolute cursor-pointer duration-500 bg-transparent border-0 p-0 text-xs text-left"
                    style={{
                      opacity: shrink ? (isActive ? 1 : 0) : isActive ? 1 : 0.4,
                      pointerEvents: shrink && !isActive ? "none" : "auto",
                      left: `calc(${leftPercent}% + 12px)`,
                      top: `calc(${topPercent}% - 8px)`,
                      color: "var(--txt)",
                      zIndex: 100,
                    }}
                  >
                    {name}
                  </button>
                </React.Fragment>
              );
            }

            if (dx === 0 || dy === 0) {
              const isHorizontal = dx > 0;

              return (
                <React.Fragment key={i}>
                  <button
                    type="button"
                    onClick={() => handleSelect(name)}
                    className="absolute cursor-pointer duration-500 bg-transparent border-0 p-0"
                    style={{
                      ...commonWrapperStyle,
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      width: isHorizontal ? `${widthPercent}%` : "20px",
                      height: isHorizontal ? "20px" : `${heightPercent}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    aria-label={name}
                  >
                    <div
                      className="absolute left-1/2 top-1/2"
                      style={{
                        backgroundColor: "var(--txt)",
                        width: isHorizontal ? "100%" : "1px",
                        height: isHorizontal ? "1px" : "100%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelect(name)}
                    className="absolute cursor-pointer duration-500 bg-transparent border-0 p-0 text-xs text-center"
                    style={{
                      opacity: shrink ? (isActive ? 1 : 0) : isActive ? 1 : 0.4,
                      pointerEvents: shrink && !isActive ? "none" : "auto",
                      left: `${leftPercent}%`,
                      top: `calc(${topPercent}% - 8px)`,
                      transform: "translate(-50%, -100%)",
                      color: "var(--txt)",
                      zIndex: 100,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </button>
                </React.Fragment>
              );
            }

            return (
              <div
                key={i}
                className={`absolute rounded-xl text-xs cursor-pointer duration-500 ${
                  highlight
                    ? "overflow-hidden flex justify-center items-center"
                    : "border"
                }`}
                style={{
                  ...commonWrapperStyle,
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  width: `${widthPercent}%`,
                  height: `${heightPercent}%`,
                  transform: "translate(-50%, -50%)",
                  borderColor: "var(--txt)",
                }}
                onClick={() => handleSelect(name)}
              >
                {highlight && (
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[var(--bg3)]" />
                )}
                {(!shrink || isActive || highlight) && (
                  <div
                    onClick={() => handleSelect(name)}
                    style={{
                      color: highlight ? "var(--txt)" : "var(--txt)",
                      transform: highlight ? "translate(-50%, 50%)" : undefined,
                    }}
                    className={`${
                      highlight
                        ? "absolute text-lg left-[33%] bottom-[33%]"
                        : "translate-y-[-120%]"
                    } text-center`}
                  >
                    {name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ChartContainer>
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
                className={`cursor-pointer transition-all duration-200 py-1 px-3 rounded-lg border text-xs ${isDirectSelected ? "scale-[1.02]" : "opacity-80 hover:opacity-100"} `}
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
      )}
    </>
  );
}
