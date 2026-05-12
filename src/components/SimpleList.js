import React from "react";
import MonoLabel from "./MonoLabel";

/**
 * Vertical list with a MonoLabel header and a small accent bullet per item.
 * Each item is divided by a subtle bottom border (last item has no border).
 *
 * Props:
 *   label:     string                   Header rendered as <MonoLabel>.
 *   items:     ReactNode[]              List items.
 *   className: string                   Optional extra classes on the wrapper.
 */
export default function SimpleList({
  label,
  items = [],
  className = "",
  line = true,
}) {
  return (
    <div className={className}>
      {label && <MonoLabel>{label}</MonoLabel>}
      <ul className="list-none p-0 m-0">
        {items.map((item, i) => (
          <li
            key={i}
            className={`text-[13px] text-[var(--txt)] leading-[1.55] pl-3.5 relative ${
              line
                ? "py-2.5 border-b border-[var(--bg3)] last:border-b-0"
                : "py-1"
            }`}
          >
            <span
              className={`absolute left-0 text-[var(--point)] font-semibold ${
                line ? "top-2.5" : "top-1"
              }`}
            >
              ·
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
