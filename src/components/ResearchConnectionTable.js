import React from "react";

const STRENGTH_STYLES = {
  strong: "text-[var(--point)]",
  medium: "text-[var(--txt2)]",
  limit: "text-[var(--txt3)]",
};

const ROW_STYLES = {
  strong: "text-[var(--txt)]",
  medium: "text-[var(--txt)]",
  limit: "text-[var(--txt2)]",
};

const DEFAULT_ROWS = [
  {
    study: "Check → Flag gating",
    design: "Pattern selection → commitment",
    strength: "Direct",
    kind: "strong",
  },
  {
    study: "System-authored targeting (Test 3)",
    design: "System-surfaced patterns (Moment 01)",
    strength: "Direct",
    kind: "strong",
  },
  {
    study: "Conflict-averse / low-initiation cohort",
    design: "Intended user: hesitant-to-commit (assumed)",
    strength: "Assumed",
    kind: "medium",
  },
  {
    study: "Participation broadening (41% → 80%)",
    design: "Untested in this domain",
    strength: "Extrapolated",
    kind: "medium",
  },
  {
    study: "Friction relocation (57% → 68%)",
    design: "Friction preserved at commitment moment",
    strength: "Load-bearing",
    kind: "strong",
  },
  {
    study: "Sustained engagement under accumulation (§5.5)",
    design: "Standing as a tracked, persistent state",
    strength: "Indirect",
    kind: "medium",
  },
  {
    study: "Competitive externality (Flag affects others)",
    design: "— does not transfer",
    strength: "Limit",
    kind: "limit",
  },
];

const DEFAULT_NOTE =
  "The design ports the gating, system-authoring, and irreversibility of the study. The system surfaces themes; the user assembles the position. Belief authorship stays with the user. The competitive externality of the Flag action does not transfer — pattern-backed commitment imposes cost on the actor, not on another participant. Claims rest on the patterns isolated, not on extrapolation of the quantitative results.";

export default function ResearchConnectionTable({
  eyebrow = "Before the screens",
  title = "How this connects to the research.",
  rows = DEFAULT_ROWS,
  note = DEFAULT_NOTE,
}) {
  return (
    <div>
      <div
        role="table"
        className="
            grid
            grid-cols-1
            md:grid-cols-[1fr_1fr_110px]
          "
      >
        {/* Header row — desktop only */}
        <ConnectionHeader>Study element</ConnectionHeader>
        <ConnectionHeader>Design element</ConnectionHeader>
        <ConnectionHeader>Strength</ConnectionHeader>

        {rows.map((row, i) => (
          <ConnectionRow key={i} row={row} isLast={i === rows.length - 1} />
        ))}
      </div>
    </div>
  );
}

function ConnectionHeader({ children }) {
  return (
    <div
      role="columnheader"
      className="
        hidden md:block
        font-mono text-[0.8em] tracking-[0.14em] uppercase
        text-[var(--txt3)]
        pb-2.5
        border-b border-[var(--bg3)]
      "
    >
      {children}
    </div>
  );
}

function ConnectionRow({ row, isLast }) {
  const kind = row.kind ?? "strong";
  const cellTone = ROW_STYLES[kind];
  const strengthTone = STRENGTH_STYLES[kind];

  return (
    <div role="row" className={`contents`}>
      {/* Mobile label-on-top, desktop inline */}
      <Cell label="Study element" tone={cellTone}>
        {row.study}
      </Cell>

      <Cell label="Design element" tone={cellTone}>
        {row.design}
      </Cell>

      <Cell
        label="Strength"
        tone={strengthTone}
        mono
        className={isLast ? "" : "max-md:mb-[2em]"}
      >
        {row.strength}
      </Cell>
    </div>
  );
}

function Cell({ label, tone, children, mono = false, className = "" }) {
  return (
    <div
      role="cell"
      className={`
       leading-[1.5]
        py-3 pr-4
        border-b border-[var(--bg3)] text-[0.8em] 
        ${tone}     ${className}
      `}
    >
      {/* Mobile-only label */}
      <div className="md:hidden font-mono tracking-[0.14em] uppercase text-[var(--txt3)] mb-1">
        {label}
      </div>

      <div className={mono ? "font-mono tracking-[0.06em] uppercase" : ""}>
        {children}
      </div>
    </div>
  );
}
