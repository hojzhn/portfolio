import React from "react";

export default function FindingParagraph({
  title = "FINDING",
  tagline,
  desc,
  first = false,
}) {
  return (
    <div
      className={
        first
          ? ""
          : "mt-[2em] pt-[2em] border-t border-dashed border-[var(--bg3)]"
      }
    >
      <div className="font-mono text-[var(--point)] text-[0.8em] mb-[1em] uppercase tracking-[0.16em]">
        {title}
      </div>
      <div className="text-[1.4em] mb-[1em] leading-tight">{tagline}</div>
      <div className="text-[var(--txt2)] space-y-4">{desc}</div>
    </div>
  );
}
