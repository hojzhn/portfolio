import React, { useEffect } from "react";
import GraphicCaption from "../GraphicCaption";

export default function Demo({
  children,
  aspect = "9 / 19.5",
  className = "",
  description = "",
}) {
  useEffect(() => {
    console.log("Demo mount");
    return () => console.log("Demo unmount");
  }, []);

  return (
    <div className={`w-full flex text-sm flex-col items-center ${className}`}>
      <div className="relative mx-auto w-[320px] max-w-full">
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
          <div className="absolute -left-[2px] top-20 h-8 w-[3px] rounded-r bg-[var(--bg3)]" />
          <div className="absolute -left-[2px] top-32 h-12 w-[3px] rounded-r bg-[var(--bg3)]" />
          <div className="absolute -left-[2px] top-48 h-12 w-[3px] rounded-r bg-[var(--bg3)]" />
          <div className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-l bg-[var(--bg3)]" />

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

            <div className="h-full w-full overflow-hidden">{children}</div>

            <div
              className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-1.5 w-24 -translate-x-1/2 rounded-full"
              style={{
                background: "color-mix(in srgb, var(--txt) 20%, transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
