import React from "react";

export default function H3({ children, className }) {
  return <span className={`uppercase font-mono ${className}`}>{children}</span>;
}
