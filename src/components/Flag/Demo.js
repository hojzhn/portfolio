import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import GraphicCaption from "../GraphicCaption";

const PHONE_WIDTH = 320;
const RESIZE_MS = 300;
const LOADER_MS = 550; // how long the "adjusting…" loader stays up on a reshape
const FADE_MS = 220; // chrome + loader cross-fade

// "16 / 10" | "16/10" | "1.6" | 1.6  →  numeric width/height ratio
function parseRatio(aspect) {
  if (typeof aspect === "number") return aspect || 1;
  const [w, h] = String(aspect)
    .split("/")
    .map((s) => parseFloat(s));
  return h ? w / h : w || 1;
}

export default function Demo({
  children,
  aspect = "9 / 19.5",
  className = "",
  description = "",
  desktop = false,
}) {
  useEffect(() => {
    console.log("Demo mount");
    return () => console.log("Demo unmount");
  }, []);

  // Measure the space we have to work with so we can drive the frame's width AND
  // height from one stable value — that lets us put an explicit, transitionable
  // size on the frame (animating `aspect-ratio` directly isn't reliable).
  const rootRef = useRef(null);
  const [availW, setAvailW] = useState(null);

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const update = () => setAvailW(node.getBoundingClientRect().width);
    update();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const ro = new ResizeObserver(([entry]) => setAvailW(entry.contentRect.width));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // Flash a loader whenever the frame is reshaping (aspect change or phone↔desktop).
  const [loading, setLoading] = useState(false);
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return undefined;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), LOADER_MS);
    return () => clearTimeout(t);
  }, [aspect, desktop]);

  const ratio = parseRatio(aspect);
  const frameW =
    availW == null ? null : desktop ? availW : Math.min(PHONE_WIDTH, availW);

  // Before the first measurement: fall back to aspect-ratio sizing (this state
  // is corrected in useLayoutEffect before paint, so it isn't visible).
  const frameSizeStyle =
    frameW == null
      ? { width: PHONE_WIDTH, aspectRatio: aspect }
      : {
          width: frameW,
          height: frameW / ratio,
          transition: `width ${RESIZE_MS}ms ease, height ${RESIZE_MS}ms ease`,
        };

  // Phone chrome stays mounted; it fades in/out on the desktop toggle.
  const chromeStyle = {
    opacity: desktop ? 0 : 1,
    transition: `opacity ${FADE_MS}ms ease`,
  };

  return (
    <div
      ref={rootRef}
      className={`w-full flex text-sm flex-col items-center ${className}`}
    >
      <div className="relative mx-auto max-w-full">
        {description && (
          <GraphicCaption className="my-4">{description}</GraphicCaption>
        )}

        <div
          className="relative rounded-[36px] border p-[10px] shadow-lg"
          style={{
            background: "var(--bg)",
            borderColor: "var(--bg3)",
            ...frameSizeStyle,
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[28px]"
            style={{ background: "var(--bg2)" }}
          >
            <div className="h-full w-full overflow-hidden">{children}</div>

            {/* Screen-level chrome (status bar, top fade, home indicator) — fades. */}
            <div className="pointer-events-none" style={chromeStyle}>
              <div
                className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-3 text-xs"
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
                className="absolute inset-x-0 top-0 z-10 h-14"
                style={{
                  background:
                    "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 80%, transparent), transparent)",
                }}
              />
              <div
                className="absolute bottom-2 left-1/2 z-20 h-1.5 w-24 -translate-x-1/2 rounded-full"
                style={{
                  background: "color-mix(in srgb, var(--txt) 20%, transparent)",
                }}
              />
            </div>

            {/* Loader overlay — kept mounted so it can fade out, not just pop. */}
            <div
              className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
              style={{
                background: "var(--bg2)",
                opacity: loading ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease`,
              }}
            >
              <div
                className="h-6 w-6 animate-spin rounded-full border-2"
                style={{
                  borderColor: "var(--bg3)",
                  borderTopColor: "var(--txt)",
                }}
              />
            </div>
          </div>

          {/* Frame-level chrome (side buttons, dynamic island) — fades.
              After the screen so it stays on top during the fade. */}
          <div className="pointer-events-none" style={chromeStyle}>
            <div className="absolute -left-[2px] top-20 h-8 w-[3px] rounded-r bg-[var(--bg3)]" />
            <div className="absolute -left-[2px] top-32 h-12 w-[3px] rounded-r bg-[var(--bg3)]" />
            <div className="absolute -left-[2px] top-48 h-12 w-[3px] rounded-r bg-[var(--bg3)]" />
            <div className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-l bg-[var(--bg3)]" />
            <div
              className="absolute left-1/2 top-[10px] z-30 h-[24px] w-[120px] -translate-x-1/2 rounded-full border"
              style={{ background: "var(--bg)", borderColor: "var(--bg3)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
