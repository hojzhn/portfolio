import React from "react";
export default function Toggle({
  items = [],
  value,
  onChange,
  disabled = false,
  className = "",
}) {
  const idx = Math.max(
    0,
    items.findIndex((it) => it.value === value),
  );
  const count = Math.max(1, items.length);
  const widthPct = 100 / count;
  const leftPct = idx * widthPct;

  return (
    <div
      className={className}
      role="tablist"
      aria-disabled={disabled || undefined}
      style={{
        position: "relative",
        display: "inline-flex",
        width: "100%",
        borderRadius: 999,
        border: "1px solid var(--bg2)",
        background: "transparent",
        padding: 4,
        gap: 4,
        userSelect: "none",
        opacity: disabled ? 0.55 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {/* Active pill */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: `calc(${leftPct}% + 4px)`,
          width: `calc(${widthPct}% - 8px)`,
          borderRadius: 999,
          background: "var(--bg2)",
          transition: "left 500ms ease, width 500ms ease",
        }}
      />

      {items.map((it, i) => {
        const isActive = it.value === value;
        return (
          <button
            key={String(it.value)}
            type="button"
            role="tab"
            className="text-[0.8em]"
            aria-selected={isActive}
            onClick={() => onChange?.(it.value)}
            style={{
              flex: 1,
              position: "relative",
              zIndex: 1,
              border: 0,
              background: "transparent",
              color: isActive ? "var(--txt)" : "var(--txt2)",
              padding: "10px 12px",
              borderRadius: 999,
              cursor: "pointer",
              outline: "none",
              whiteSpace: "nowrap",
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
