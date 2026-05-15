import React from "react";
import MonoLabel from "../MonoLabel.js";
import Pill from "../Pill.js";

// SourceTag
// Small inline tag used inside ThemeCard to mark a contributing source as
// Backed (intentional standing) or Incidental (derived from holdings).
const SourceTag = ({ kind = "backed", children }) => {
  const cls =
    kind === "backed"
      ? "text-[var(--point)] bg-[var(--bg2)]"
      : "text-[var(--txt2)] border border-dashed border-[var(--bg3)]";
  return (
    <span
      className={`font-mono inline-block text-[0.8em] uppercase px-1.5 py-0.5 rounded ml-2 align-middle ${cls}`}
    >
      {children}
    </span>
  );
};

// ThemeCard
// A derived theme treated as the primary object. Header shows total
// exposure. A split bar splits that exposure into Backed (came from a
// standing) vs Incidental (came from holdings outside any standing).
// The source list below names each contributor.
//
// Drop in with:
//   import ThemeCard from "../components/Flag/ThemeCard.jsx";
//
// Props
//   name             theme display name
//   taxonomyVersion  e.g. "v3.2"
//   value            total dollar exposure
//   sharePct         portfolio share, e.g. "31%"
//   backed           { amount, pct }   shown next to the Backed segment
//   incidental       { amount, pct }   shown next to the Incidental segment
//   backedFraction   number 0..1, sets the split bar width
//   onWhatCounts     optional handler. If provided, renders a "What counts"
//                    affordance next to the name that opens the taxonomy rule.
//   sources          [{ name, meta?, amount, kind: "backed" | "incidental" }]
//   className        optional outer wrapper override
//
const ThemeCard = ({
  name,
  taxonomyVersion,
  value,
  sharePct,
  backed = { amount: "", pct: "" },
  incidental = { amount: "", pct: "" },
  backedFraction = 0.5,
  onWhatCounts,
  sources = [],
  className = "",
}) => {
  const f = Math.max(0, Math.min(1, backedFraction));

  return (
    <div
      className={`border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] overflow-hidden ${className}`}
    >
      <div className="p-5 sm:p-6 flex flex-col">
        <MonoLabel margin={false} className="text-[var(--point)]">
          Theme
        </MonoLabel>
        <div className="min-w-0  justify-between items-baseline gap-4 flex flex-row flex-wrap">
          <div>
            <div className="text-lg mt-1 text-[var(--txt)] flex items-center gap-2 flex-wrap">
              <span>{name}</span>
            </div>
            {taxonomyVersion && (
              <div className="font-mono text-[0.8em] uppercase text-[var(--txt2)] mt-1">
                Platform taxonomy {taxonomyVersion}
              </div>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-xl tabular-nums text-[var(--txt)]">
              {sharePct}
            </div>
            <div className="font-mono text-[0.8em] tabular-nums text-[var(--txt2)] mt-1">
              {value}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-4">
        <div className="flex h-2 rounded overflow-hidden">
          <div className="bg-[var(--point)]" style={{ width: `${f * 100}%` }} />
          <div
            className="bg-[var(--bg3)]"
            style={{ width: `${(1 - f) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 gap-3 flex-wrap font-mono text-[0.8em]">
          <div>
            <span className="inline-block w-2 h-2 rounded-sm bg-[var(--point)] mr-1.5 align-middle" />
            <span className="uppercase ext-[var(--point)]">Backed</span>
            <span className="text-[var(--txt2)] ml-1.5">
              {backed.amount} ({backed.pct})
            </span>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-sm bg-[var(--bg3)] mr-1.5 align-middle" />
            <span className="uppercase text-[var(--txt2)]">Incidental</span>
            <span className="text-[var(--txt2)] ml-1.5">
              {incidental.amount} ({incidental.pct})
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--bg3)] bg-[var(--bg)] p-5 sm:p-6">
        <MonoLabel margin={false} className="text-[var(--point)]">
          How you reach this exposure
        </MonoLabel>

        <div className="mt-3">
          {sources.map((s, i) => (
            <div
              key={i}
              className={`flex justify-between items-baseline gap-3 py-2 ${
                i > 0 ? "border-t border-dashed border-[var(--bg3)]" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="text-[var(--txt)]">
                  {s.name}
                  <SourceTag kind={s.kind}>
                    {s.kind === "backed" ? "Backed" : "Incidental"}
                  </SourceTag>
                </div>
                {s.meta && (
                  <div className="text-[var(--txt2)] text-[0.85em] mt-0.5">
                    {s.meta}
                  </div>
                )}
              </div>
              <div className="font-mono tabular-nums whitespace-nowrap text-[var(--txt)] shrink-0">
                {s.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;
