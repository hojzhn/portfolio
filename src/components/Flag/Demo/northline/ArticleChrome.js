import React from "react";

/* ════════════════════════════════════════════════════════════
   Shared chrome for article-style screens (SetExposure,
   YourStanding, etc.):

     • Mount-in animation primitives (keyframes + helpers)
     • ArticleTopBar — back button + right-side action slot
     • ArticleBottomBar — sticky-fixed disclaimer + action row

   Slot-based so callers pass their own content / handlers.
   ════════════════════════════════════════════════════════════ */

export const STAGGER_KEYFRAMES = `
  @keyframes nlineFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes nlineSlideUp {
    from { opacity: 0; transform: translateY(100%); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/** Inline-style helper for stack items. `i` is the stagger index. */
export const stackAnim = (i) => ({
  animation: "nlineFadeUp 0.5s cubic-bezier(0.22,0.61,0.36,1) both",
  animationDelay: `${i * 100}ms`,
});

/** Inline-style helper for the bottom bar — slides up from below
 *  after the stacks have started fanning in. */
export const barAnim = {
  animation: "nlineSlideUp 0.5s cubic-bezier(0.22,0.61,0.36,1) both",
  animationDelay: "400ms",
};

/**
 * ArticleHero — shared header block for article-style screens.
 * Layout: [icon] [content column] [right slot]
 *
 *   icon        — ReactNode rendered on the left (typically a ThemeIcon).
 *   eyebrow     — optional content above the title row. Pass a Pill, a
 *                 metadata string, or any node. Sits in its own row.
 *   title       — string rendered as h1.
 *   pill        — optional Pill rendered inline next to the title.
 *   description — sub-text under the title (string or node).
 *   bottom      — optional content rendered under the description
 *                 (e.g. bullet indicators).
 *   right       — content rendered in the right-hand column (action
 *                 buttons, stats, etc.).
 */
export function ArticleHero({
  icon,
  eyebrow,
  title,
  pill,
  description,
  bottom,
  right,
}) {
  return (
    <div className="flex items-start gap-5">
      {icon}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {eyebrow && (
          <div className="flex items-center gap-2">{eyebrow}</div>
        )}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[20px] font-medium m-0 text-[var(--n-txt)]">
              {title}
            </h1>
            {pill}
          </div>
          {description && (
            <div className="text-[13px] text-[var(--n-txt2)] mt-1">
              {description}
            </div>
          )}
          {bottom && <div className="mt-3">{bottom}</div>}
        </div>
      </div>
      {right && <div className="flex items-start gap-2 mt-1">{right}</div>}
    </div>
  );
}

/**
 * ArticleTopBar — slim row at the very top of an article screen.
 *   onBack    — fires on the back button.
 *   backLabel — text next to the back arrow. Defaults to "Back".
 *   right     — JSX rendered on the right (overflow menu, etc.).
 */
export function ArticleTopBar({ onBack, backLabel = "Back", right }) {
  return (
    <div className="flex justify-between items-center pb-2">
      <button
        onClick={onBack}
        className="bg-transparent border-0 text-[var(--n-txt2)] text-[13px] flex items-center gap-2 cursor-pointer"
      >
        <i className="fa-regular fa-arrow-left" /> {backLabel}
      </button>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

/**
 * ArticleBottomBar — fixed-position action bar pinned to the bottom
 * of the main column. Disclaimer copy on the left, action buttons on
 * the right. Animates up from below on mount via `barAnim`.
 *
 *   disclaimer — left-side ReactNode (typically text + shield icon
 *                provided automatically).
 *   actions    — right-side ReactNode (button group).
 *   icon       — optional override for the disclaimer icon class.
 */
export function ArticleBottomBar({
  disclaimer,
  actions,
  icon = "fa-regular fa-shield-check",
}) {
  return (
    <div
      style={barAnim}
      className="mt-auto fixed bottom-0 z-20 -mx-8 h-[5.2em] bg-[var(--n-bg1)] border-t border-[var(--n-bg3)] flex justify-between items-center gap-6 px-5 w-[calc(100%-13.5rem)]"
    >
      <span className="text-[12px] text-[var(--n-txt3)] flex items-center gap-3 leading-[1.4]">
        <i className={`${icon} text-[18px] text-[var(--n-txt2)] shrink-0`} />
        <span>{disclaimer}</span>
      </span>
      <div className="flex items-center gap-2 shrink-0">{actions}</div>
    </div>
  );
}
