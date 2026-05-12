import React from "react";

export const Button = ({ text, onClick, disabled }) => (
  <button
    className={[
      "px-2 py-1 border border-[var(--txt)] text-[0.8em] font-mono tracking-[0.16em] rounded",
      disabled ? "opacity-40 cursor-not-allowed" : "",
    ].join(" ")}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {text}
  </button>
);
