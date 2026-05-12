import React, { useState, useEffect } from "react";

export default function ProfileArrow({
  count = 10,
  direction = "right",
  active,
  size = 180, // px
  duration = 300, // total animation duration in ms
}) {
  const [hovered, setHovered] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(active ? 0 : count - 1);

  // Calculate per-step delay (evenly distributed)
  const stepDelay = duration / count;

  useEffect(() => {
    const target = active ? 0 : count - 1;
    if (highlightIndex === target) return;

    const step = active ? -1 : 1;
    const interval = setInterval(() => {
      setHighlightIndex((prev) => {
        const next = prev + step;
        if (next === target) clearInterval(interval);
        return next;
      });
    }, stepDelay);

    return () => clearInterval(interval);
  }, [active, count, highlightIndex, stepDelay]);

  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => setAnimating(false), duration + 400);
    return () => clearTimeout(timeout);
  }, [active, duration]);

  const pseudoHovered = hovered || animating;

  return (
    <div
      className="relative w-fit cursor-pointer"
      style={{ height: `${size}px` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {[...Array(count)].map((_, i) => {
        const offset = pseudoHovered ? i * (size * 0.2) : 0;
        const translateX = direction === "right" ? offset : -offset;
        const isHighlighted = i === highlightIndex;

        const rotation = active ? 180 : 0;

        const isIdle = !pseudoHovered && isHighlighted;

        const isIdleNext =
          !pseudoHovered &&
          (active ? i === highlightIndex + 1 : i === highlightIndex - 1);

        const opacity = pseudoHovered || isIdle || isIdleNext ? 1 : 0;

        const color =
          isHighlighted || isIdleNext ? "var(--txt)" : "var(--txt3)";

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: 0,
              width: `${size}px`,
              height: `${size}px`,
              transform: `translateX(${translateX}px)`,
              opacity,
              transition: `transform 0.3s ease, opacity 0.3s`,
            }}
          >
            <div
              className={`relative w-full h-full ${
                isIdleNext
                  ? active
                    ? "arrow-idle-before-left"
                    : "arrow-idle-before"
                  : ""
              } ${
                isIdle
                  ? active
                    ? "arrow-idle-after-left"
                    : "arrow-idle-after"
                  : ""
              }`}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transform: `rotate(${rotation}deg)`,
                transition: `transform 0.4s ease ${i * (stepDelay / 2)}ms`,
              }}
            >
              <div
                className={`w-full h-full border-t border-r`}
                style={{
                  transform: "rotate(45deg) translateX(-25%) translateY(25%)",
                  borderColor: color,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
