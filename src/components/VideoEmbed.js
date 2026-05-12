import React from "react";
import { useLazyAutoplay } from "../utils/useLazyAutoplay";
import GraphicCaption from "./GraphicCaption";
import FigCaption from "./FigCaption";

/**
 * Looped video that auto-plays only while in viewport. Muted, no controls.
 *
 * Props:
 *   src:       string     Required.
 *   poster:    string     Optional poster frame.
 *   caption:   ReactNode  Optional caption rendered below the video.
 *   label:     string     Aria-label for the video element.
 *   className: string     Extra classes on the outer <figure>.
 */
export default function VideoEmbed({
  src,
  poster,
  caption,
  label,
  className = "",
}) {
  const ref = useLazyAutoplay();

  return (
    <figure className={`m-0 flex flex-col gap-2 ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="w-full rounded border border-[var(--bg3)] bg-[var(--bg2)]"
      />
      {caption && <FigCaption>{caption}</FigCaption>}
    </figure>
  );
}
