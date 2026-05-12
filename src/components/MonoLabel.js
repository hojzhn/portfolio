import React from "react";

export default function MonoLabel({ children, margin = true, className = "" }) {
  return (
    <div
      className={`
        font-mono
        uppercase
        text-[0.8em]
        tracking-[0.16em]
        ${margin ? "mb-[1em]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
