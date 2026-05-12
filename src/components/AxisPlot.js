import React, { useState, useEffect } from "react";
import AxisLabel from "./AxisLabel";

export default function AxisPlot({
  points = [],
  min = -10,
  max = 10,
  vertical = false,
}) {
  const SHRINK_BREAKPOINT = 960;
  const [shrink, setShrink] = useState(window.innerWidth < SHRINK_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setShrink(window.innerWidth < SHRINK_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const range = max - min || 1;

  const getPercent = (value) => {
    const raw = ((value - min) / range) * 100;
    return Math.max(0, Math.min(100, raw));
  };

  const horizontalLanes = [-64, -46, 46, 64, -82, 82];
  const verticalLanes = [-64, -46, 46, 64, -82, 82];

  return (
    <div
      className={`relative mt-8 mx-auto ${
        shrink ? "h-[460px] w-[260px]" : "w-full max-w-[1000px] h-[240px]"
      }`}
    >
      {shrink ? (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <AxisLabel>Active</AxisLabel>

          <div className="relative h-full w-[140px] flex items-center justify-center">
            {/* Bar */}
            <div className="absolute h-full w-4 rounded-full bg-[var(--txt)] opacity-15" />

            {/* Points */}
            {points.map(({ name, value }, i) => {
              const percent = getPercent(value);
              const lane = verticalLanes[i % verticalLanes.length];
              const placeLeft = lane < 0;
              const connectorWidth = Math.abs(lane) - 14;

              return (
                <div
                  key={`${name}-${i}`}
                  className="absolute left-1/2"
                  style={{
                    top: `${100 - percent}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute h-3 w-3 rounded-full bg-[var(--txt)] border-2 border-white z-10"
                      title={`${name}: ${value}`}
                    />

                    <div
                      className="absolute top-1/2 h-[1px] bg-[var(--txt)] opacity-60"
                      style={{
                        width: `${connectorWidth}px`,
                        [placeLeft ? "right" : "left"]: "7px",
                        transform: "translateY(-50%)",
                      }}
                    />

                    <div
                      className="absolute text-xs leading-tight w-[100px]"
                      style={{
                        top: "50%",
                        [placeLeft ? "right" : "left"]: `${Math.abs(lane)}px`,
                        transform: "translateY(-50%)",
                        textAlign: placeLeft ? "right" : "left",
                      }}
                    >
                      {name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <AxisLabel>Passive</AxisLabel>
        </div>
      ) : (
        <div className="flex w-full items-center gap-6">
          <AxisLabel>Passive</AxisLabel>

          <div className="relative h-[180px] flex-1">
            {/* Bar */}
            <div className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 rounded-full bg-[var(--txt)] opacity-15" />

            {/* Points */}
            {points.map(({ name, value }, i) => {
              const percent = getPercent(value);
              const lane = horizontalLanes[i % horizontalLanes.length];
              const placeAbove = lane < 0;
              const connectorHeight = Math.abs(lane) - 14;

              return (
                <div
                  key={`${name}-${i}`}
                  className="absolute top-1/2"
                  style={{
                    left: `${percent}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Dot */}
                    <div
                      className="absolute h-3 w-3 rounded-full bg-[var(--txt)] border-2 border-white z-10"
                      title={`${name}: ${value}`}
                    />

                    {/* Connector */}
                    <div
                      className="absolute left-1/2 w-[1px] bg-[var(--txt)] opacity-60"
                      style={{
                        height: `${connectorHeight}px`,
                        [placeAbove ? "bottom" : "top"]: "7px",
                        transform: "translateX(-50%)",
                      }}
                    />

                    {/* Label */}
                    <div
                      className="absolute text-xs leading-tight whitespace-nowrap"
                      style={{
                        left: "50%",
                        [placeAbove ? "bottom" : "top"]: `${Math.abs(lane)}px`,
                        transform: "translateX(-50%)",
                        textAlign: "center",
                      }}
                    >
                      {name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <AxisLabel>Active</AxisLabel>
        </div>
      )}
    </div>
  );
}
