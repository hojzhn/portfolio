import React from "react";

export default function DescriptionHeader({ children }) {
  return (
    <div className="font-mono text-xs text-[var(--point)] mb-[1em] uppercase tracking-[0.16em]">
      {children}
    </div>
  );
}
