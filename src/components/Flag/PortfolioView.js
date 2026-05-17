import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MonoLabel from "../MonoLabel.js";

// PortfolioView
// Single drop-in view of the portfolio with a three-tab toggle.
// Standings, Instruments, and Themes are all functional. The three views
// sit at the same altitude so the user reads them as peer modes over the
// same portfolio.
//
// Drop in with:
//   import PortfolioView from "../components/Flag/PortfolioView.jsx";
//
// Props
//   total        formatted portfolio total (e.g. "$48,250.00")
//   alert        optional concentration alert string. Pass null to hide.
//   standings    array of { id?, name, manager, holdings, tenure, level,
//                           sharePct, shareValue, direct? }
//   instruments  array of { id?, ticker, name, shares, value, sharePct,
//                           flagged?, sources: [{label, kind, shares, value}] }
//                 sources kind: "basket" | "direct"
//   themes       array of { id?, name, sharePct, value,
//                           backed: {amount, pct},
//                           incidental: {amount, pct},
//                           backedFraction }
//   defaultTab   "standings" | "instruments" | "themes". Default "standings".
//

const TABS = [
  { id: "standings", label: "Standings" },
  { id: "instruments", label: "Instruments" },
  { id: "themes", label: "Themes" },
];

const Toggle = ({ value, onChange }) => (
  <div className="inline-flex bg-[var(--bg2)] rounded p-1 font-mono text-[0.8em] uppercase tracking-[0.12em]">
    {TABS.map((t) => {
      const active = value === t.id;
      return (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={[
            "px-3 py-1.5 rounded transition-colors cursor-pointer",
            active
              ? "bg-[var(--bg)] text-[var(--txt)]"
              : "text-[var(--txt2)] hover:text-[var(--txt)]",
          ].join(" ")}
        >
          {t.label}
        </button>
      );
    })}
  </div>
);

const Alert = ({ children }) => (
  <div className="border-l-2 border-[var(--point)] bg-[var(--bg2)] px-4 py-2.5 rounded-r mb-5 flex items-baseline gap-3 flex-wrap">
    <span className="font-mono text-[0.8em] uppercase tracking-[0.16em] text-[var(--point)] shrink-0">
      Concentration
    </span>
    <span className="text-[var(--txt)] text-[0.8em]">{children}</span>
  </div>
);

// =============================== STANDINGS ===============================

const StandingRow = ({ s, last }) => (
  <div
    className={`grid grid-cols-[2.4fr_0.9fr_0.9fr_1fr] gap-3 items-center px-4 py-3 ${
      !last ? "border-b border-dashed border-[var(--bg3)]" : ""
    }`}
  >
    <div className="min-w-0">
      <div className="text-[var(--txt)]">{s.name}</div>
      <div className="font-mono text-[0.8em] uppercase tracking-[0.12em] text-[var(--txt2)] mt-1">
        {s.direct
          ? "Self-directed"
          : `Managed · ${s.manager}${s.holdings ? ` · ${s.holdings} holdings` : ""}`}
      </div>
    </div>
    <div className="text-right font-mono text-[0.8em] tabular-nums text-[var(--txt)]">
      {s.tenure || <span className="text-[var(--txt3)]">—</span>}
    </div>
    <div className="text-right font-mono text-[0.8em] tabular-nums text-[var(--txt)]">
      {s.level || <span className="text-[var(--txt3)]">—</span>}
    </div>
    <div className="text-right shrink-0">
      <div className="tabular-nums text-[var(--txt)]">{s.sharePct}</div>
      <div className="font-mono text-[0.8em] tabular-nums text-[var(--txt2)] mt-0.5">
        {s.shareValue}
      </div>
    </div>
  </div>
);

const StandingsContent = ({ standings }) => (
  <>
    <div className="grid grid-cols-[2.4fr_0.9fr_0.9fr_1fr] gap-3 px-4 pb-2 font-mono text-[0.8em] uppercase tracking-[0.16em] text-[var(--txt3)]">
      <div>Standing</div>
      <div className="text-right">Tenure</div>
      <div className="text-right">Level</div>
      <div className="text-right">Share</div>
    </div>
    <div className="border border-[var(--bg3)] rounded-lg bg-[var(--bg)] overflow-hidden">
      {standings.map((s, i) => (
        <StandingRow key={s.id ?? i} s={s} last={i === standings.length - 1} />
      ))}
    </div>
  </>
);

// =============================== INSTRUMENTS =============================

const SourceTag = ({ kind, children }) => {
  const cls =
    kind === "direct"
      ? "border border-dashed border-[var(--bg3)] text-[var(--txt2)]"
      : "bg-[var(--bg2)] text-[var(--txt2)]";
  return (
    <span
      className={`font-mono inline-block text-[0.8em] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded ${cls}`}
    >
      {children}
    </span>
  );
};

// Shared grid template so the row, the multi-source sub-rows, and the
// header all line up on the same columns. The trailing `1.25rem` column is
// the caret slot — empty on single-source rows.
const INSTRUMENT_COLS = "grid-cols-[1.25rem_1.4fr_0.8fr_1fr]";

const InstrumentRow = ({ inst, last }) => {
  const multi = inst.sources && inst.sources.length > 1;
  return (
    <div
      className={`px-4 py-3 ${!last ? "border-b  border-[var(--bg3)]" : ""} `}
    >
      <div className={`grid ${INSTRUMENT_COLS} gap-3 items-baseline`}>
        <div className="flex items-center justify-end text-[var(--txt2)]">
          {multi && (
            <i
              aria-hidden="true"
              className="fa-sharp fa-regular fa-chevron-down text-[0.8em]"
            />
          )}
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[var(--txt)] tracking-[0.04em]">
            {inst.ticker}
          </div>
          <div className="font-mono text-[0.8em] uppercase tracking-[0.12em] text-[var(--txt2)] mt-1">
            {inst.name}
          </div>
        </div>
        <div className="text-right font-mono text-[0.8em] tabular-nums text-[var(--txt)]">
          {inst.shares}
        </div>
        <div className="text-right shrink-0">
          <div className="tabular-nums text-[var(--txt)]">{inst.value}</div>
        </div>
      </div>
      {multi && (
        <div className="mt-3 pt-3 font-mono">
          <MonoLabel className="pl-8">Held through</MonoLabel>
          {inst.sources.map((src, i) => (
            <div key={i} className={`grid ${INSTRUMENT_COLS} gap-x-3`}>
              <div></div>
              <div className="text-[var(--txt2)] uppercase tracking-[0.12em] text-[0.8em]">
                {src.label}
              </div>
              <div className="text-right text-[var(--txt)] tabular-nums mt-0.5">
                {src.shares}
              </div>
              <div className="text-right"> {src.value}</div>
              <div />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const InstrumentsContent = ({ instruments }) => (
  <>
    <div
      className={`grid ${INSTRUMENT_COLS} gap-3 px-4 pb-2 font-mono text-[0.8em] uppercase tracking-[0.16em] text-[var(--txt3)]`}
    >
      <div>Instrument</div>
      <div className="text-right">Shares</div>
      <div className="text-right">Value</div>
      <div />
    </div>
    <div className="border border-[var(--bg3)] rounded-lg bg-[var(--bg)] overflow-hidden">
      {instruments.map((inst, i) => (
        <InstrumentRow
          key={inst.id ?? inst.ticker ?? i}
          inst={inst}
          last={i === instruments.length - 1}
        />
      ))}
    </div>
  </>
);

// =============================== THEMES ==================================

const ThemeRow = ({ t, last }) => {
  const f = Math.max(0, Math.min(1, t.backedFraction ?? 0));
  return (
    <div
      className={`px-4 py-4 ${
        !last ? "border-b border-dashed border-[var(--bg3)]" : ""
      }`}
    >
      <div className="flex justify-between items-baseline gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="text-[var(--txt)]">{t.name}</div>
          <div className="font-mono text-[0.8em] uppercase tracking-[0.12em] text-[var(--txt2)] mt-1">
            Derived measurement
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="tabular-nums text-[var(--txt)]">{t.sharePct}</div>
          <div className="font-mono text-[0.8em] tabular-nums text-[var(--txt2)] mt-0.5">
            {t.value}
          </div>
        </div>
      </div>

      <div className="flex h-1.5 rounded-sm overflow-hidden mt-3">
        <div className="bg-[var(--point)]" style={{ width: `${f * 100}%` }} />
        <div
          className="bg-[var(--bg3)]"
          style={{ width: `${(1 - f) * 100}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 gap-3 flex-wrap font-mono text-[0.8em]">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-sm bg-[var(--point)]" />
          <span className="uppercase tracking-[0.12em] text-[var(--point)]">
            Backed
          </span>
          <span className="text-[var(--txt2)]">
            {t.backed.amount} ({t.backed.pct})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-sm bg-[var(--bg3)]" />
          <span className="uppercase tracking-[0.12em] text-[var(--txt2)]">
            Incidental
          </span>
          <span className="text-[var(--txt2)]">
            {t.incidental.amount} ({t.incidental.pct})
          </span>
        </div>
      </div>
    </div>
  );
};

const ThemesContent = ({ themes }) => (
  <>
    <div className="px-4 pb-2 font-mono text-[0.8em] uppercase tracking-[0.16em] text-[var(--txt3)] flex justify-between">
      <span>Theme</span>
      <span>Exposure</span>
    </div>
    <div className="border border-[var(--bg3)] rounded-lg bg-[var(--bg)] overflow-hidden">
      {themes.map((t, i) => (
        <ThemeRow key={t.id ?? i} t={t} last={i === themes.length - 1} />
      ))}
    </div>
  </>
);

// =============================== VIEW ====================================

const PortfolioView = ({
  total,
  alert,
  standings = [],
  instruments = [],
  themes = [],
  defaultTab = "standings",
  className = "",
}) => {
  const [view, setView] = useState(defaultTab);

  return (
    <div
      className={`border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] p-5 sm:p-6 ${className}`}
    >
      <div className="flex justify-between items-end mb-5 gap-4 flex-wrap">
        <div>
          <MonoLabel margin={false} className="text-[var(--txt2)]">
            Portfolio
          </MonoLabel>
          <div className="text-2xl tabular-nums text-[var(--txt)] mt-1">
            {total}
          </div>
        </div>
        <Toggle value={view} onChange={setView} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        >
          {view === "standings" && <StandingsContent standings={standings} />}
          {view === "instruments" && (
            <InstrumentsContent instruments={instruments} />
          )}
          {view === "themes" && <ThemesContent themes={themes} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PortfolioView;
