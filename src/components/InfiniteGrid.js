import React, { useEffect, useRef, useState } from "react";
import TextPlaceholder from "./TextPlaceholder";

const works = [
  { title: "Blue Interior Study", caption: "2024 · Oil on linen · 48 × 36 in" },
  {
    title: "Afterimage Field",
    caption: "2023 · Acrylic and graphite · 30 × 40 in",
  },
  { title: "Soft Architecture", caption: "2023 · Mixed media · 60 × 44 in" },
  { title: "Red Window", caption: "2022 · Oil on panel · 24 × 18 in" },
];

const InfiniteGrid = ({
  infinite = false,
  maxCols = 3,
  rathouse = 0,
  format = 0,
}) => {
  const isFormatB = format === 2;

  const [items, setItems] = useState(
    isFormatB ? works : Array.from({ length: 12 }, (_, i) => i + 1),
  );

  const loaderRef = useRef(null);
  const clampedCols = Math.max(1, Math.min(4, maxCols));

  const baseGridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[clampedCols];

  const smGridColsClass = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  }[clampedCols];

  useEffect(() => {
    if (!infinite || isFormatB) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setItems((prev) => [
            ...prev,
            ...Array.from({ length: 6 }, (_, i) => prev.length + i + 1),
          ]);
        }
      },
      { rootMargin: "100px" },
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);

    return () => observer.disconnect();
  }, [infinite, isFormatB]);
  return (
    <div
      className={
        isFormatB
          ? `grid grid-cols-1 gap-2 ${smGridColsClass}`
          : `grid gap-2 ${baseGridColsClass}`
      }
    >
      {items.map((item, i) => (
        <div
          key={isFormatB ? item.title : i}
          className={
            isFormatB
              ? "flex sm:flex-col gap-3 sm:gap-0 py-3 sm:py-0 border-b sm:border-b-0 border-[var(--txt3)]"
              : "flex flex-col"
          }
        >
          <div
            className={
              isFormatB
                ? "w-14 h-14 sm:w-full sm:h-auto sm:aspect-square bg-[var(--bg3)] shrink-0"
                : "aspect-square bg-[var(--bg3)]"
            }
          />

          {isFormatB ? (
            <div className="min-w-0 sm:mt-2 sm:mb-4">
              <div className="font-mono text-xs opacity-60 mb-1">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="font-['Instrument_Serif'] text-lg leading-none truncate">
                {item.title}
              </div>

              <div className="font-mono text-[11px] opacity-60 mt-1">
                {item.caption}
              </div>
            </div>
          ) : rathouse !== 0 ? (
            <div className="my-2 mb-4">
              <TextPlaceholder lines={1} className="my-2" />
              <TextPlaceholder lines={1} className="my-2" />
            </div>
          ) : null}
        </div>
      ))}

      {infinite && !isFormatB && (
        <div
          ref={loaderRef}
          className="h-8 col-span-full text-center text-gray-400 text-xs"
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default InfiniteGrid;
