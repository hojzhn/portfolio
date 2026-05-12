import React, { useEffect, useRef, useState } from "react";

export default function Reference({ index, label, href }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <span ref={rootRef} className="relative inline-block align-super">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Reference ${index}`}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        className="
          font-mono text-[11px] leading-none
          text-[var(--txt3)]
          hover:text-[var(--txt1)]
          focus:text-[var(--txt1)]
          transition-colors
          cursor-pointer
        "
      >
        [{index}]
      </button>

      {open && (
        <div
          role="tooltip"
          className="
            absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2
            w-max max-w-[240px]
            rounded-md
            bg-[var(--bg2)] px-3 py-2
            text-[11px] leading-snug text-[var(--txt2)]
            shadow-md whitespace-normal
          "
          onMouseLeave={() => setOpen(false)}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              underline decoration-[var(--txt3)] underline-offset-2
              hover:text-[var(--txt1)]
            "
          >
            {label}
          </a>
        </div>
      )}
    </span>
  );
}
