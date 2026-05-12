import React, { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "../../../../context/LayoutContext";
import { applyPaletteMode, getCssVars, globalStyles } from "./tokens";

/* ════════════════════════════════════════════════════════════
   Page shell — sidebar + main column.
   Applies the palette CSS variables so every nested var() resolves.
   ════════════════════════════════════════════════════════════ */

export function NorthlineShell({ step, children }) {
  const mainRef = useRef(null);
  const { layout, setLayout } = useContext(LayoutContext);
  const mode = layout?.palette?.mode === "light" ? "light" : "dark";

  // Mutate the shared `palette` object so direct JS reads
  // (e.g. `palette.accent` in inline styles) get the right values
  // for the current mode.
  applyPaletteMode(mode);

  const cssVarsForMode = getCssVars(mode);

  const toggleMode = () => {
    setLayout((prev) => {
      const nextMode = prev.palette.mode === "light" ? "dark" : "light";
      try {
        localStorage.setItem("palette-mode", nextMode);
      } catch (e) {
        /* ignore */
      }
      return {
        ...prev,
        palette: { ...prev.palette, mode: nextMode },
      };
    });
  };

  // Reset scroll position when the user navigates between steps so
  // each screen starts at the top.
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [step]);

  return (
    <>
      <style>{globalStyles}</style>
      <div
        className="grid grid-cols-[220px_1fr] h-screen bg-[var(--n-bg)] text-[var(--n-txt)] overflow-hidden"
        style={{ ...cssVarsForMode, fontFamily: "Geist, sans-serif" }}
      >
        <Sidebar step={step} mode={mode} onToggleMode={toggleMode} />
        <main
          ref={mainRef}
          className="northline-scroll px-8 pt-6 pb-12 overflow-y-auto min-h-0"
          style={{ scrollbarGutter: "stable" }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   Sidebar
   ════════════════════════════════════════════════════════════ */

export function Sidebar({ step, mode = "dark", onToggleMode }) {
  const items = [
    { key: "Overview", icon: "fa-regular fa-gauge" },
    { key: "Signals", icon: "fa-regular fa-wave-pulse", activeOn: [0, 1, 2] },
    { key: "Standings", icon: "fa-regular fa-table-cells", activeOn: 3 },
    { key: "Watchlist", icon: "fa-regular fa-bookmark" },
    { key: "Markets", icon: "fa-regular fa-chart-line" },
    { key: "Activity", icon: "fa-regular fa-clock-rotate-left" },
  ];

  return (
    <aside className="bg-[var(--n-bg1)] border-r border-[var(--n-bg3)] flex flex-col text-[13px]">
      {/* User row replaces the FLAGSHIP wordmark at the top. */}
      <div className="flex items-center gap-2 py-4 px-5 border-b border-[var(--n-bg3)]">
        <button
          type="button"
          className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer flex-1 min-w-0 text-left"
        >
          <span className="w-7 h-7 rounded-full bg-[var(--n-bg3)] flex items-center justify-center text-[12px] font-medium text-[var(--n-txt)]">
            G
          </span>
          <span className="text-[var(--n-txt)] truncate">Gordon G.</span>
          <i className="fa-regular fa-chevron-down text-[9px] text-[var(--n-txt3)]" />
        </button>
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="w-7 h-7 flex items-center justify-center bg-transparent border-0 rounded-md text-[var(--n-txt3)] cursor-pointer shrink-0"
        >
          <i className="fa-regular fa-sidebar-flip text-[13px]" />
        </button>
      </div>

      <nav className="flex flex-col pt-3">
        {items.map((it) => {
          const active =
            it.activeOn === step ||
            (Array.isArray(it.activeOn) && it.activeOn.includes(step));
          return (
            <div
              key={it.key}
              className={`flex items-center gap-3 py-[9px] px-5 cursor-pointer border-l-2 ${
                active
                  ? "text-[var(--n-txt)] bg-[var(--n-bg2)] border-[var(--n-accent)]"
                  : "text-[var(--n-txt2)] border-transparent"
              }`}
            >
              <i className={`${it.icon} text-[var(--n-txt3)] w-3.5 text-[13px]`} />
              {it.key}
            </div>
          );
        })}
      </nav>

      {/* Settings sits directly under the nav, separated by a hairline. */}
      <div className="mt-2 pt-2 border-t border-[var(--n-bg3)]">
        <div className="flex items-center gap-3 py-[9px] px-5 text-[var(--n-txt3)] cursor-pointer border-l-2 border-transparent">
          <i className="fa-regular fa-gear text-[var(--n-txt3)] w-3.5 text-[13px]" />
          Settings
        </div>
      </div>

      {/* Bottom block — pushed down by mt-auto. */}
      <div className="mt-auto flex flex-col">
        {/* Active standings card */}
        <div className="mx-4 mb-3 p-4 bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-lg flex flex-col gap-2">
          <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
            Active standings
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[28px] font-medium text-[var(--n-txt)] leading-none tabular-nums">
              3
            </span>
            <span className="w-2 h-2 rounded-full bg-[var(--n-accent)]" />
          </div>
          <div className="mt-1">
            <div className="text-[12px] text-[var(--n-txt2)]">
              Total deployed
            </div>
            <div className="text-[16px] text-[var(--n-txt)] tabular-nums mt-0.5">
              $2,480
            </div>
          </div>
        </div>

        {/* Light / dark toggle */}
        <button
          type="button"
          onClick={onToggleMode}
          aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
          className="mx-4 mb-4 flex items-center justify-between gap-2 px-3 py-2 bg-transparent border border-[var(--n-bg3)] rounded-md text-[12px] text-[var(--n-txt2)] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <i
              className={`fa-regular ${
                mode === "light" ? "fa-sun-bright" : "fa-moon"
              } text-[var(--n-txt)]`}
            />
            {mode === "light" ? "Light mode" : "Dark mode"}
          </span>
          <i className="fa-regular fa-arrow-right-arrow-left text-[10px] text-[var(--n-txt2)]" />
        </button>
      </div>
    </aside>
  );
}

/* ════════════════════════════════════════════════════════════
   StepHeader — three pill buttons across the top of the main column
   ════════════════════════════════════════════════════════════ */

export function StepHeader({ step, onChange }) {
  const steps = [
    { n: 1, label: "Observed signals", desc: "Inspect activity-driven theme" },
    { n: 2, label: "Set exposure", desc: "Choose monthly commitment" },
    { n: 3, label: "Your standing", desc: "Track deployment & performance" },
  ];

  return (
    <div className="flex items-stretch mb-6 p-1 bg-[var(--n-bg1)] border border-[var(--n-bg3)] rounded-lg">
      {steps.map((s, i) => {
        const active = step === s.n;
        const past = step > s.n;
        const clickable = past || active;
        return (
          <React.Fragment key={s.n}>
            <button
              onClick={() => (clickable ? onChange(s.n) : null)}
              disabled={!clickable}
              className={`flex-1 bg-transparent border-0 py-2.5 px-3.5 text-left flex flex-col gap-0.5 rounded-md transition-colors ${
                active
                  ? "bg-[var(--n-bg2)] text-[var(--n-txt)]"
                  : past
                    ? "text-[var(--n-txt2)]"
                    : "text-[var(--n-txt3)]"
              } ${clickable ? "cursor-pointer" : "cursor-default"}`}
            >
              <span className="text-[10px] tracking-[0.15em] text-[var(--n-accent)]">
                0{s.n}
              </span>
              <span className="text-[14px] font-medium">{s.label}</span>
              <span className="text-[11px] text-[var(--n-txt3)]">{s.desc}</span>
            </button>
            {i < steps.length - 1 && (
              <div className="w-px bg-[var(--n-bg3)] my-2" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
