import React, { useLayoutEffect, useRef, useState } from "react";
import Quote from "../Quote";

export default function HmwRotator({
  texts,
  currentIndex,
  onNext,
  prefix = "How might we",
  durationMs = 300,
  offsetPx = 12,
}) {
  const total = Array.isArray(texts) ? texts.length : 0;
  if (!total) return null;

  const current = ((currentIndex % total) + total) % total;
  const next = (current + 1) % total;

  // idle -> animating -> reset (no transition) -> idle
  const [phase, setPhase] = useState("idle");
  const [h, setH] = useState(null);

  const curRef = useRef(null);
  const nextRef = useRef(null);

  useLayoutEffect(() => {
    if (!curRef.current || !nextRef.current) return;
    const h1 = curRef.current.getBoundingClientRect().height;
    const h2 = nextRef.current.getBoundingClientRect().height;
    setH(Math.max(h1, h2));
  }, [texts, current, next]);

  const handleClick = () => {
    if (phase !== "idle" || total < 2) return;
    setPhase("animating");
  };

  const handleTransitionEnd = (e) => {
    // We only care when the "animate out" finishes.
    if (phase !== "animating") return;
    if (e.propertyName !== "transform") return;

    // Commit the new index in parent
    onNext?.();

    // Snap styles back to idle WITHOUT reverse animation
    setPhase("reset");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("idle")));
  };

  const isAnimating = phase === "animating";
  const isReset = phase === "reset";

  const transition = isReset
    ? "none"
    : `transform ${durationMs}ms ease, opacity ${durationMs}ms ease`;

  return (
    <div className="flex w-full items-baseline gap-2">
      <span className="whitespace-nowrap">{prefix}</span>

      <div
        onClick={handleClick}
        className="relative cursor-pointer leading-none w-full flex-1"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        style={{ height: h ?? "auto" }}
      >
        <div
          ref={curRef}
          className="absolute left-0 top-0 w-full"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: isAnimating
              ? `translateY(-${offsetPx}px)`
              : "translateY(0px)",
            opacity: isAnimating ? 0 : 1,
            transition,
          }}
        >
          <span className="border-b border-dashed border-[var(--point)]">
            {texts[current]}
          </span>
        </div>

        <div
          ref={nextRef}
          className="absolute left-0 top-0 w-full"
          style={{
            transform: isAnimating
              ? "translateY(0px)"
              : `translateY(${offsetPx}px)`,
            opacity: isAnimating ? 1 : 0,
            transition,
          }}
        >
          <span className=" border-b border-dashed border-[var(--point)]">
            {texts[next]}
          </span>
        </div>
      </div>
    </div>
  );
}
