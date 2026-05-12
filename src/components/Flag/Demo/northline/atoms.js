import React, { useEffect, useRef, useState } from "react";

/**
 * Reusable atoms shared across all three Northline screens.
 * Pure presentation, no state. Every color comes from the palette
 * (./tokens.js) via the `--n-*` CSS variables defined on NorthlineShell.
 */

export function PanelHeader({ eyebrow, title, chip, meta, right, sub }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-1 min-w-0 mb-4">
        {eyebrow && (
          <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-accent)] mb-1.5">
            {eyebrow}
          </div>
        )}
        <div className="flex items-center gap-2.5">
          <h1 className="text-[20px] font-medium m-0 tracking-[-0.01em]">
            {title}
          </h1>
          {chip && <Pill>{chip}</Pill>}
        </div>
        {sub && <div className="text-[var(--n-txt2)] text-[13px]">{sub}</div>}
      </div>
      <div className="flex flex-col items-end gap-2">
        {meta && (
          <div className="text-[var(--n-txt3)] text-[12px] flex items-center gap-2">
            {meta}
          </div>
        )}
        {right}
      </div>
    </div>
  );
}

/**
 * Pill — small uppercase tag.
 *   color — any CSS color string. Drives:
 *     • text color (full)
 *     • border color (~40% opacity of `color`)
 *     • background (~12% opacity of `color`)
 *   Defaults to the neutral txt2 token. Pass `var(--n-accent)`,
 *   `palette.amber`, etc. for tinted variants.
 */
export function Pill({ children, color = "var(--n-txt2)", className = "" }) {
  return (
    <span
      className={`inline-flex items-center self-center h-[18px] px-2 py-2 text-[9px] tracking-[0.08em] uppercase leading-none whitespace-nowrap border rounded ${className}`}
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

/**
 * SectionHeader — small uppercase sub-header used inside cards
 * (e.g. "Related positions ›"). Shows a chevron suffix by default.
 */
export function SectionHeader({
  children,
  chevron = true,
  className = "",
  first = false,
}) {
  return (
    <div
      className={`text-[12px] mb-3 ${!first && "mt-6"}  uppercase text-[var(--n-txt2)] flex items-center gap-1 ${className}`}
    >
      {children}
      {chevron && (
        <i className="fa-regular fa-chevron-right text-[var(--n-txt3)] text-[8px]" />
      )}
    </div>
  );
}

export function Card({
  title,
  headerRight,
  headerBg = false,
  children,
  footer,
  className = "",
}) {
  return (
    <div
      className={`bg-[var(--n-bg1)] rounded-lg border border-[var(--n-bg3)] p-5 flex flex-col gap-3 ${className}`}
    >
      {(title || headerRight) && (
        <div
          className={`flex items-center justify-between gap-3 ${
            headerBg
              ? "-mx-5 -mt-5 mb-1 px-5 py-2 bg-[var(--n-bg2)] border-b border-[var(--n-bg3)]"
              : ""
          }`}
        >
          {title ? (
            <div className="text-[12px]  text-[var(--n-txt2)] flex items-center gap-1.5">
              {title}
            </div>
          ) : (
            <div />
          )}
          {headerRight && (
            <div className="flex items-center gap-2 normal-case">
              {headerRight}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col flex-1">{children}</div>
      {footer && <div className="flex items-center gap-2 mt-1">{footer}</div>}
    </div>
  );
}

/**
 * CardButton — outlined action button styled to live inside a Card
 * footer (or in any cluster of card-level actions).
 *   icon      — optional FA class string rendered before the label.
 *   iconRight — optional FA class rendered after the label
 *               (e.g. fa-arrow-up-right-from-square for "View ...").
 */
export function CardButton({
  icon,
  iconRight,
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`py-1.5 px-3 bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-md text-[12px] text-[var(--n-txt2)] cursor-pointer inline-flex items-center gap-1.5 ${className}`}
    >
      {icon && <i className={icon} />}
      {children}
      {iconRight && <i className={iconRight} />}
    </button>
  );
}

/** Small "ⓘ" affordance for card titles. */
export function InfoDot() {
  return (
    <span className="inline-flex items-center justify-center w-3 h-3 rounded-full border border-[var(--n-bg3)] text-[8px] text-[var(--n-txt3)] normal-case tracking-normal leading-none">
      i
    </span>
  );
}

export function DefRow({ label, value }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 py-2 border-b border-[var(--n-bg3)] text-[13px]">
      <span className="text-[var(--n-txt2)]">{label}</span>
      <span className="text-[var(--n-txt)] leading-[1.45]">{value}</span>
    </div>
  );
}

/**
 * RiskRow — DefRow variant for risk / monitoring sections. Renders
 *   label | value (bold) | description (txt2) | InfoDot
 * with the value column carrying its own internal grid so the right-
 * aligned info icon stays consistent across rows.
 */
export function RiskRow({ label, value, desc }) {
  return (
    <DefRow
      label={label}
      value={
        <div className="grid grid-cols-[100px_1fr_auto] gap-4 items-center">
          <span className="font-medium text-[var(--n-txt)]">{value}</span>
          <span className="text-[var(--n-txt2)]">{desc}</span>
          <InfoDot />
        </div>
      }
    />
  );
}

export function BarRow({ label, pct }) {
  return (
    <div className="grid grid-cols-[1fr_100px_36px] gap-2.5 items-center text-[12px]">
      <span className="text-[var(--n-txt2)]">{label}</span>
      <div className="h-1.5 bg-[var(--n-bg3)] rounded-[3px] overflow-hidden">
        <div
          className="h-full bg-[var(--n-accent)] rounded-[3px]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[var(--n-txt)] text-[11px] text-right tabular-nums">
        {pct}%
      </span>
    </div>
  );
}

export function Stat({ label, value }) {
  return (
    <div className="text-right">
      <div className="text-[var(--n-txt2)] text-[11px]">{label}</div>
      <div className="text-[16px] mt-0.5 text-[var(--n-accent)] leading-none tabular-nums">
        {value}
      </div>
    </div>
  );
}

/** Inline `panel` shell — `flex flex-col gap-4`. Used by all three screens. */
export const PANEL_CLASS = "flex flex-col gap-4";

/**
 * StickyArticleHeader — a top bar that slides in once the user scrolls
 * past its in-flow position. Place it right after the section you want
 * to act as the trigger (typically just after a big article hero).
 *
 *   onBack — fired by the back button (semi-square w/ arrow icon).
 *   icon   — left-of-title content (e.g. a small ThemeIcon).
 *   title  — article name.
 *   right  — right-side content (e.g. "$250 /mo").
 *
 * Implementation: an IntersectionObserver on a 1px sentinel rendered
 * above the bar. The bar itself is `sticky top-0` and collapses via
 * `max-height: 0` + `opacity: 0` when the sentinel is in view, then
 * expands once the sentinel has scrolled above the viewport.
 */
export function StickyArticleHeader({ onBack, icon, title, pill, right }) {
  const sentinelRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // Only show after the sentinel has scrolled ABOVE the viewport,
        // not when it's below (handles the case where the page is short).
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      <div
        className={`fixed top-0 left-[220px] right-0 z-30 bg-[var(--n-bg1)] border-b border-[var(--n-bg3)] transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 py-3 pr-8 pl-4">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-md text-[var(--n-txt2)] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Back"
          >
            <i className="fa-regular fa-arrow-left" />
          </button>
          {icon}
          <span className="text-[14px] font-medium text-[var(--n-txt)] truncate">
            {title}
          </span>
          {pill}
          <div className="ml-auto flex items-center">{right}</div>
        </div>
      </div>
    </>
  );
}
