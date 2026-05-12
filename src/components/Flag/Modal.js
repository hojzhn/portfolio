import React, { useEffect, useRef } from "react";

const ModalButton = ({ onClick, text, cancel }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      px-4 py-2.5
      font-mono text-[10px] tracking-[0.16em] uppercase
      transition-colors duration-150
      focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--txt)]
      ${
        cancel
          ? "text-[var(--txt2)] hover:text-[var(--txt)]"
          : "text-[var(--txt)] border border-[var(--txt2)] hover:bg-[var(--txt3)]/10"
      }
    `}
  >
    {text}
  </button>
);

export default function Modal({ closeModal, children, yesOnClick }) {
  const dialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Lock body scroll while open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Escape to close, focus management
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    dialogRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") closeModal?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [closeModal]);

  return (
    <div
      className="
        absolute inset-0 z-[100]
        flex items-center justify-center
        px-5
        bg-[var(--bg)]/70
        backdrop-blur-[2px]
      "
      onClick={closeModal}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-[420px]
          bg-[var(--bg)]
          border border-[var(--txt3)]
          flex flex-col
          focus:outline-none
        "
      >
        {/* Body */}
        <div
          className="
            px-8 pt-10 pb-8
            min-h-[120px]
            flex items-center justify-center
            text-center
            text-[14px] leading-[1.55] text-[var(--txt)]
          "
        >
          {children}
        </div>

        {/* Actions */}
        <div
          className="
            flex justify-end items-center gap-1
            px-4 py-3
            border-t border-[var(--txt3)]
          "
        >
          <ModalButton text="No" onClick={closeModal} cancel />
          <ModalButton text="Yes" onClick={yesOnClick} />
        </div>
      </div>
    </div>
  );
}
