import React, { useEffect, useMemo, useState } from "react";
import GraphicCaption from "./GraphicCaption";

export default function ScreenShowcase({
  images = [],
  initialIndex = 0,
  aspect = "9 / 19.5",
  showDots = true,
  showArrows = true,
  className = "",
  transition = "fade", // ← add this
  description = "",
}) {
  const safeImages = useMemo(() => {
    if (Array.isArray(images)) return images.filter(Boolean);
    if (typeof images === "string") return [images];
    return [];
  }, [images]);

  const hasImages = safeImages.length > 0;
  const hasMultiple = safeImages.length > 1;

  const clampedInitial = useMemo(() => {
    if (!hasImages) return 0;
    return Math.max(0, Math.min(initialIndex, safeImages.length - 1));
  }, [initialIndex, hasImages, safeImages.length]);

  const [index, setIndex] = useState(clampedInitial);

  useEffect(() => {
    setIndex(clampedInitial);
  }, [clampedInitial]);

  const goTo = (next) => {
    if (!hasMultiple) return;
    const wrapped =
      ((next % safeImages.length) + safeImages.length) % safeImages.length;
    setIndex(wrapped);
  };

  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className="relative mx-auto  w-[320px] max-w-full">
        {description && (
          <GraphicCaption className="my-4">{description}</GraphicCaption>
        )}
        <div
          className="relative rounded-[36px] border p-[10px] shadow-lg"
          style={{
            background: "var(--bg)",
            borderColor: "var(--bg3)",
          }}
        >
          <div
            className="absolute -left-[2px] top-20 h-8 w-[3px] rounded-r"
            style={{ background: "var(--bg3)" }}
          />
          <div
            className="absolute -left-[2px] top-32 h-12 w-[3px] rounded-r"
            style={{ background: "var(--bg3)" }}
          />
          <div
            className="absolute -left-[2px] top-48 h-12 w-[3px] rounded-r"
            style={{ background: "var(--bg3)" }}
          />
          <div
            className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-l"
            style={{ background: "var(--bg3)" }}
          />

          <div
            className="pointer-events-none absolute left-1/2 top-[10px] z-30 h-[24px] w-[120px] -translate-x-1/2 rounded-full border"
            style={{
              background: "var(--bg)",
              borderColor: "var(--bg3)",
            }}
          />

          <div
            className="relative overflow-hidden rounded-[28px]"
            style={{
              aspectRatio: aspect,
              background: "var(--bg2)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-3 text-xs"
              style={{ color: "var(--txt)" }}
            >
              <div className="font-medium">9:41</div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">◔</span>
                <span className="text-[10px]">⌁</span>
                <span className="text-[10px]">▮</span>
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 80%, transparent), transparent)",
              }}
            />

            {hasImages ? (
              hasMultiple ? (
                transition === "fade" ? (
                  <div className="relative h-full w-full">
                    {safeImages.map((src, i) => (
                      <img
                        key={`${src}-${i}`}
                        src={src}
                        alt={`Screen ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                        style={{
                          opacity: i === index ? 1 : 0,
                          zIndex: i === index ? 1 : 0,
                        }}
                        draggable={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    style={{
                      width: `${safeImages.length * 100}%`,
                      transform: `translateX(-${(100 / safeImages.length) * index}%)`,
                    }}
                  >
                    {safeImages.map((src, i) => (
                      <div
                        key={`${src}-${i}`}
                        className="h-full shrink-0"
                        style={{ width: `${100 / safeImages.length}%` }}
                      >
                        <img
                          src={src}
                          alt={`Screen ${i + 1}`}
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <img
                  src={safeImages[0]}
                  alt="Screen"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              )
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-sm"
                style={{ color: "var(--txt2)" }}
              >
                No screens
              </div>
            )}

            <div
              className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-1.5 w-24 -translate-x-1/2 rounded-full"
              style={{
                background: "color-mix(in srgb, var(--txt) 20%, transparent)",
              }}
            />
          </div>
        </div>

        {showArrows && hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-[-12px] top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm"
              style={{
                background: "var(--bg)",
                borderColor: "var(--bg3)",
                color: "var(--txt)",
              }}
              aria-label="Previous screen"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-[-12px] top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm"
              style={{
                background: "var(--bg)",
                borderColor: "var(--bg3)",
                color: "var(--txt)",
              }}
              aria-label="Next screen"
            >
              ›
            </button>
          </>
        )}
      </div>

      {showDots && hasMultiple && (
        <div className="mt-4 flex items-center gap-2">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className="h-2.5 w-2.5 rounded-full transition"
              style={{
                background: i === index ? "var(--txt)" : "var(--bg2)",
              }}
              aria-label={`Go to screen ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* {description && (
        <>
          <div className="px-3 py-2 my-2 bg-[var(--bg2)] text-xs w-full max-w-[320px] rounded-md">
            {description}
          </div>
        </>
      )} */}
    </div>
  );
}
