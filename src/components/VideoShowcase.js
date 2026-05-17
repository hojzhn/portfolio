import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLazyAutoplay } from "../utils/useLazyAutoplay";
import GraphicCaption from "./GraphicCaption";
import FigCaption from "./FigCaption";

/**
 * Multi-video carousel with dot navigation, modeled after ScreenShowcase.
 *
 * Each item swaps everything in the slide — header, video, caption, body —
 * so users move between distinct demos with a single click.
 *
 * Props:
 *   items:       Array<{
 *                  src:     string             Required.
 *                  label:   string             Aria-label for the <video>.
 *                  caption: ReactNode          Optional <FigCaption> below the video.
 *                  header:  ReactNode          Optional <GraphicCaption> above.
 *                  icon:    string             FA icon for the header (default fa-video).
 *                  body:    ReactNode          Optional content below the caption.
 *                }>
 *   initialIndex: number    Default 0.
 *   showDots:     boolean   Default true.
 *   showArrows:   boolean   Default true.
 *   className:    string    Extra classes on the outer wrapper.
 */

// Inner remounts when its key (parent's `index`) changes, so the lazy-autoplay
// observer re-attaches to the new <video> element rather than the unmounted one.
const VideoSlide = ({ src, label }) => {
  const ref = useLazyAutoplay();
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="w-full rounded border border-[var(--bg3)] bg-[var(--bg2)]"
    />
  );
};

export default function VideoShowcase({
  items = [],
  initialIndex = 0,
  showDots = true,
  showArrows = true,
  className = "",
}) {
  const safeItems = useMemo(
    () => (Array.isArray(items) ? items.filter(Boolean) : []),
    [items],
  );
  const hasItems = safeItems.length > 0;
  const hasMultiple = safeItems.length > 1;

  const clampedInitial = useMemo(() => {
    if (!hasItems) return 0;
    return Math.max(0, Math.min(initialIndex, safeItems.length - 1));
  }, [initialIndex, hasItems, safeItems.length]);

  const [index, setIndex] = useState(clampedInitial);
  useEffect(() => setIndex(clampedInitial), [clampedInitial]);

  const goTo = (n) => {
    if (!hasMultiple) return;
    const w = ((n % safeItems.length) + safeItems.length) % safeItems.length;
    setIndex(w);
  };
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  if (!hasItems) return null;
  const active = safeItems[index];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {active.header && (
        <GraphicCaption icon={active.icon || "fa-video"}>
          {active.header}
        </GraphicCaption>
      )}

      <div className="relative">
        {/* Cross-fade between videos on index change. `mode="wait"` keeps
            the two videos from overlapping in flow, while AnimatePresence's
            opacity tween smooths the swap so it no longer snap-blinks. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <VideoSlide src={active.src} label={active.label} />
          </motion.div>
        </AnimatePresence>

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
              aria-label="Previous video"
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
              aria-label="Next video"
            >
              ›
            </button>
          </>
        )}
      </div>

      {active.caption && <FigCaption>{active.caption}</FigCaption>}

      {active.body && (
        <div className="mt-2 flex flex-col gap-4">{active.body}</div>
      )}

      {showDots && hasMultiple && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {safeItems.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className="h-2.5 w-2.5 rounded-full transition-colors"
              style={{
                background: i === index ? "var(--txt)" : "var(--bg2)",
                border: "1px solid var(--bg3)",
              }}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
