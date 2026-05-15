import React from "react";
import MonoLabel from "../MonoLabel.js";

// StandingCard
// A basket the user backs, treated as the primary object. Anatomy below the
// header shows the themes this standing reinforces and how much each
// contributes against the user's total portfolio exposure.
//
// Drop in with:
//   import StandingCard from "../components/Flag/StandingCard.jsx";
//
// Props
//   name        basket display name
//   manager     curator (e.g. "Public")
//   tenure      formatted tenure string (e.g. "147 days")
//   level       formatted level (e.g. "$500 / mo")
//   value       formatted dollar value of the standing
//   sharePct    portfolio share, e.g. "14%"
//   themes      array of { name, meta?, contribPct, totalPct }
//   className   optional outer wrapper override
//
const StandingCard = ({
  name,
  manager,
  tenure,
  level,
  value,
  sharePct,
  themes = [],
  className = "",
}) => (
  <div
    className={`border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] overflow-hidden ${className}`}
  >
    <div className="p-5 sm:p-6 flex flex-col">
      <MonoLabel margin={false} className="text-[var(--point)]">
        Standing
      </MonoLabel>
      <div className="min-w-0 flex justify-between items-baseline gap-4 flex-wrap ">
        <div>
          <div className="text-lg mt-1 text-[var(--txt)]">{name}</div>
          <div className="font-mono text-[0.8em] uppercase text-[var(--txt2)] mt-1">
            {[manager, tenure, level].filter(Boolean).join(" · ")}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl tabular-nums text-[var(--txt)]">{value}</div>
          <div className="font-mono text-[0.8em] uppercase text-[var(--txt2)] mt-1">
            {sharePct} of portfolio
          </div>
        </div>{" "}
      </div>
    </div>

    <div className="border-t border-[var(--bg3)] bg-[var(--bg)] p-5 sm:p-6">
      <MonoLabel margin={false} className="text-[var(--point)]">
        Themes you reinforce
      </MonoLabel>

      <div className="mt-3">
        {themes.map((t, i) => (
          <div
            key={i}
            className={`flex justify-between items-baseline gap-3 py-2 ${
              i > 0 ? "border-t border-dashed border-[var(--bg3)]" : ""
            }`}
          >
            <div className="min-w-0">
              <div className="text-[var(--txt)]">{t.name}</div>
              {t.meta && (
                <div className="text-[var(--txt2)] text-[0.8em] mt-0.5">
                  {t.meta}
                </div>
              )}
            </div>
            <div className="font-mono tabular-nums whitespace-nowrap shrink-0">
              <span className="text-[var(--txt)]">{t.contribPct}</span>
              <span className="text-[var(--txt3)]"> / {t.totalPct}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[0.8em] uppercase text-[var(--txt3)] mt-3">
        Left: this standing's contribution. Right: total portfolio exposure.
      </div>
    </div>
  </div>
);

export default StandingCard;
