import React from "react";

export default function H4({ children, className }) {
  return (
    <span
      className={`p-1 font-mono text-[0.8em] px-1 rounded-md bg-[var(--bg2)] ${className}`}
    >
      {children}
    </span>
  );
}
