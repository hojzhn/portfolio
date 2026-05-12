import React, { useState } from "react";
import { Donut } from "./charts";
import { ThemeIcon } from "./ThemeIcon";
import { PANEL_CLASS, PanelHeader, Pill } from "./atoms";
import { palette } from "./tokens";
import {
  generateInteractionDensity,
  densityProfiles,
} from "./generateSparkLine";

/**
 * Step 0 — Available options list (visual only).
 *
 * Static layout, no routing. Tab toggle is the only stateful bit, and
 * exists so the active-tab styling is visible. Drop into the shell as
 * a sibling to ObservedSignals / SetExposure / YourStanding.
 *
 * All colors flow from `./tokens.js` palette except the per-theme icon
 * tile (iconBg / iconFg), which is intentionally off-palette so each
 * theme reads as a distinct visual.
 */

/* ════════════════════════════════════════════════════════════
   Data — local to this file. Lift to ./data.js if it gets reused.
   ════════════════════════════════════════════════════════════ */

const OPTIONS = [
  {
    id: "em-consumer",
    name: "Emerging-market consumer growth",
    description:
      "Rising incomes, digital adoption, and expanding middle class across EM.",
    iconShape: "chart",
    iconBg: "#10301f",
    iconFg: "#4ade80",
    signal: { score: 87, bars: 5, label: "High", note: "vs all users" },
    trend: { velocity: "+2.4×" },
    risk: "Balanced",
    exposure: [
      { label: "Equities", pct: 60, color: palette.accent },
      { label: "Credit", pct: 20, color: palette.amber },
      { label: "Rates", pct: 10, color: palette.blue },
      { label: "Cash", pct: 10, color: palette.txt3 },
    ],
    interaction: { research: 18, watchlist: 5, revisits: 7 },
  },
  {
    id: "ai-infra",
    name: "AI infrastructure expansion",
    description: "Compute, chips, power, and data center buildout cycle.",
    iconShape: "chip",
    iconBg: "#15233a",
    iconFg: "#60a5fa",
    signal: { score: 78, bars: 4, label: "High" },
    trend: { velocity: "+1.8×" },
    risk: "Aggressive",
    exposure: [
      { label: "Equities", pct: 70, color: palette.accent },
      { label: "Credit", pct: 15, color: palette.amber },
      { label: "Cash", pct: 15, color: palette.txt3 },
    ],
    interaction: { research: 13, watchlist: 4, revisits: 4 },
  },
  {
    id: "cybersec",
    name: "Cybersecurity resilience",
    description:
      "Rising threats, regulatory tailwinds, and enterprise spend growth.",
    iconShape: "shield",
    iconBg: "#251a3a",
    iconFg: "#a78bfa",
    signal: { score: 72, bars: 4, label: "Above avg" },
    trend: { velocity: "+1.3×" },
    risk: "Balanced",
    exposure: [
      { label: "Equities", pct: 65, color: palette.accent },
      { label: "Credit", pct: 20, color: palette.amber },
      { label: "Cash", pct: 15, color: palette.txt3 },
    ],
    interaction: { research: 10, watchlist: 3, revisits: 3 },
  },
  {
    id: "energy-transition",
    name: "Energy transition enablers",
    description: "Grid modernization, storage, electrification supply chain.",
    iconShape: "bolt",
    iconBg: "#3a2a10",
    iconFg: "#fbbf24",
    signal: { score: 64, bars: 4, label: "Above avg" },
    trend: { velocity: "+0.9×" },
    risk: "Balanced",
    exposure: [
      { label: "Equities", pct: 50, color: palette.accent },
      { label: "Credit", pct: 30, color: palette.amber },
      { label: "Rates", pct: 10, color: palette.blue },
      { label: "Cash", pct: 10, color: palette.txt3 },
    ],
    interaction: { research: 8, watchlist: 2, revisits: 2 },
  },
  {
    id: "us-infra",
    name: "U.S. infrastructure reinvestment",
    description:
      "Public & private capex cycle across transport, industrials, utilities.",
    iconShape: "building",
    iconBg: "#1a2535",
    iconFg: "#93c5fd",
    signal: { score: 58, bars: 3, label: "Average" },
    trend: { velocity: "+0.6×" },
    risk: "Defensive",
    exposure: [
      { label: "Equities", pct: 55, color: palette.accent },
      { label: "Credit", pct: 25, color: palette.amber },
      { label: "Rates", pct: 10, color: palette.blue },
      { label: "Cash", pct: 10, color: palette.txt3 },
    ],
    interaction: { research: 6, watchlist: 2, revisits: 1 },
  },
  {
    id: "geopolitical",
    name: "Geopolitical realignment & supply chains",
    description:
      "Reshoring, friend-shoring, and strategic sector diversification.",
    iconShape: "globe",
    iconBg: "#0f2e2a",
    iconFg: "#34d399",
    signal: { score: 52, bars: 3, label: "Average" },
    trend: { velocity: "+0.4×" },
    risk: "Defensive",
    exposure: [
      { label: "Equities", pct: 40, color: palette.accent },
      { label: "Credit", pct: 30, color: palette.amber },
      { label: "Rates", pct: 20, color: palette.blue },
      { label: "Cash", pct: 10, color: palette.txt3 },
    ],
    interaction: { research: 5, watchlist: 1, revisits: 1 },
  },
];

// Inject the generated spark series for each option, keyed by id.
// Profiles (volatility, seed, etc.) live in ./generateSparkLine.js.
OPTIONS.forEach((opt) => {
  const profile = densityProfiles[opt.id];
  if (profile) opt.trend.spark = generateInteractionDensity(profile);
});

const TABS = [
  { key: "all", label: "All options" },
  { key: "high", label: "High conviction" },
  { key: "new", label: "Newly detected" },
  { key: "watch", label: "Watchlist" },
];

const COLS = "grid-cols-[minmax(280px,2.4fr)_1fr_1fr_1.6fr_1.3fr]";

// Risk profile → pill tint. Defensive = green, Balanced = amber,
// Aggressive = red.
function riskColor(risk) {
  const k = String(risk).toLowerCase();
  if (k.startsWith("aggress")) return palette.red;
  if (k.startsWith("balanc")) return palette.amber;
  return palette.accent;
}

/* ════════════════════════════════════════════════════════════
   Mount-in animation. Panel fades in; cards slide-up + fade
   with stagger.
   ════════════════════════════════════════════════════════════ */

const STAGGER_KEYFRAMES = `
  @keyframes northlinePanelIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes northlineCardIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ════════════════════════════════════════════════════════════
   Signal-strength bars — 5 ticks, ascending height.
   Filled-bar color shifts from green → yellow-green → yellow
   as the signal weakens, by mixing accent with amber.
   ════════════════════════════════════════════════════════════ */

// Tier → mix ratio of accent (green). Lower = more amber.
const SIGNAL_TIER = {
  High: "var(--n-accent)",
  "Above avg": "color-mix(in srgb, var(--n-accent) 60%, var(--n-amber))",
  Average: "color-mix(in srgb, var(--n-accent) 30%, var(--n-amber))",
};

function SignalBars({ filled, label }) {
  const fillColor = SIGNAL_TIER[label] || "var(--n-accent)";
  return (
    <div className="flex items-end gap-[3px] h-[18px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm"
          style={{
            height: `${30 + i * 24}%`,
            background: i < filled ? fillColor : "var(--n-bg3)",
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Sparkline — tiny SVG line + soft area fill.
   Defaults to palette.accent; SVG `stroke`/`fill` need raw hex,
   so this reads from the JS palette (not CSS vars).
   ════════════════════════════════════════════════════════════ */

function Sparkline({ points, color = palette.accent, height = 36 }) {
  // Path is computed in viewBox space (constant 100 wide). The SVG
  // itself stretches to fill its container width via
  // preserveAspectRatio="none". `vector-effect="non-scaling-stroke"`
  // keeps the line uniform thickness even when X scales differently
  // from Y.
  const VB_W = 100;

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const x = (i) => (i / (points.length - 1)) * VB_W;
  // 1px padding top/bottom — uses almost the full vertical box.
  const y = (v) => height - 1 - ((v - min) / range) * (height - 2);

  const path = points
    .map(
      (v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`,
    )
    .join(" ");
  const area = `${path} L ${VB_W} ${height} L 0 ${height} Z`;

  // Same color → same gradient is fine to share across rows.
  const gradId = `spark-${color.replace("#", "")}`;

  return (
    <svg
      height={height}
      viewBox={`0 0 ${VB_W} ${height}`}
      preserveAspectRatio="none"
      className="block w-full"
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="miter"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   Row
   ════════════════════════════════════════════════════════════ */

function OptionRow({ option, index = 0, onAdvance }) {
  return (
    <div
      className={`grid ${COLS} gap-4 items-stretch px-5 py-5 border border-[var(--n-bg3)] rounded-lg bg-[var(--n-bg1)] divide-x divide-white/5 [&>*:not(:first-child)]:pl-4`}
      style={{
        animation: "northlineCardIn 0.45s cubic-bezier(0.22,0.61,0.36,1) both",
        animationDelay: `${120 + index * 60}ms`,
      }}
    >
      {/* Theme name + description */}
      <div className="flex items-center gap-5 min-w-0">
        <ThemeIcon
          shape={option.iconShape}
          fg={option.iconFg}
          className="w-16 h-20"
        />
        <div className="min-w-0 flex flex-col gap-2 justify-start">
          <div>
            <Pill color={riskColor(option.risk)}>{option.risk}</Pill>
          </div>
          <div>
            <div className="text-[15px] font-medium text-[var(--n-txt)] leading-tight mb-1.5">
              {option.name}
            </div>
            <div className="text-[12px] text-[var(--n-txt2)] leading-snug">
              {option.description}
            </div>
          </div>
        </div>
      </div>

      {/* Signal strength */}
      <div className="flex flex-col justify-center gap-1">
        <div className="flex items-center gap-2.5">
          <SignalBars filled={option.signal.bars} label={option.signal.label} />
          <span className="text-[20px] text-[var(--n-txt)] tabular-nums leading-none">
            {option.signal.score}
          </span>
        </div>
        <div className="mt-2">
          <div className="text-[12px] text-[var(--n-txt2)]">
            {option.signal.label}
          </div>
          {option.signal.note && (
            <div className="text-[10px] text-[var(--n-txt3)]">
              ({option.signal.note})
            </div>
          )}
        </div>
      </div>

      {/* Trend */}
      <div className="flex flex-col justify-center gap-1">
        <Sparkline points={option.trend.spark} />
        <div className="mt-2">
          <div className="text-[13px] text-[var(--n-txt)] tabular-nums">
            {option.trend.velocity}
          </div>
          <div className="text-[10px] text-[var(--n-txt3)]">momentum</div>
        </div>
      </div>

      {/* Typical exposure */}
      <div className="flex items-center gap-6 px-4">
        <Donut data={option.exposure} size={64} thickness={11} gap={2} />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {option.exposure.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-1.5 text-[11px]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: a.color }}
              />
              <span className="text-[var(--n-txt2)] flex-1 truncate">
                {a.label}
              </span>
              <span className="text-[var(--n-txt)] tabular-nums">{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interaction + actions */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex flex-col gap-0.5 text-[12px] text-[var(--n-txt2)]">
          <span>
            <b>{option.interaction.research}</b> researches
          </span>
          <span>
            <b>{option.interaction.watchlist}</b>{" "}
            {option.interaction.watchlist === 1 ? "watchlist" : "watchlists"}
          </span>
          <span>
            <b> {option.interaction.revisits} </b>
            {option.interaction.revisits === 1 ? "revisit" : "revisits"}
          </span>
          <button
            onClick={() => onAdvance?.(option)}
            className="mt-2 w-full py-1.5 px-3 rounded border text-[11px] font-medium cursor-pointer text-center transition-colors"
            style={{
              color: palette.accent,
              borderColor: `color-mix(in srgb, ${palette.accent} 40%, transparent)`,
              background: `color-mix(in srgb, ${palette.accent} 12%, transparent)`,
            }}
          >
            Set exposure
          </button>
        </div>
        <span className="text-[var(--n-txt3)] text-[14px] mt-1">›</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Main
   ════════════════════════════════════════════════════════════ */

export function Options({ advance }) {
  const [tab, setTab] = useState("all");

  return (
    <div
      className={PANEL_CLASS}
      style={{ animation: "northlinePanelIn 0.35s ease-out both" }}
    >
      <style>{STAGGER_KEYFRAMES}</style>
      {/* Header */}
      <PanelHeader
        title="Available options"
        sub="System-surfaced positions based on your activity and market context."
        meta={
          <>
            Last updated 10:42 AM
            <span className="text-[var(--n-txt2)]">↻</span>
          </>
        }
        right={
          <button className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] text-[var(--n-txt2)] py-1.5 px-3 rounded-md text-[12px] cursor-pointer flex items-center gap-1.5">
            How options work <span className="opacity-60">ⓘ</span>
          </button>
        }
      />

      {/* Tabs + sort */}
      <div className="flex justify-between items-end gap-6 border-b border-[var(--n-bg3)]">
        <div className="flex gap-6">
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`pb-2.5 text-[13px] bg-transparent border-0 cursor-pointer relative ${
                  active ? "text-[var(--n-txt)]" : "text-[var(--n-txt2)]"
                }`}
              >
                {t.label}
                {active && (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-[var(--n-accent)]" />
                )}
              </button>
            );
          })}
        </div>
        <div className="pb-2.5 text-[12px] text-[var(--n-txt2)]">
          Sort by:{" "}
          <span className="text-[var(--n-txt)] cursor-pointer">
            Signal strength ▾
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div
        className={`grid ${COLS} gap-4 px-5 text-[10px] tracking-[0.12em] uppercase text-[var(--n-txt3)]`}
      >
        <span>Option (theme)</span>
        <span className="text-center">Signal strength</span>
        <span className="text-center">Signal Trend (90D)</span>
        <span className="text-center">Typical exposure</span>
        <span className="text-center">Your interaction</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2">
        {OPTIONS.map((opt, i) => (
          <OptionRow key={opt.id} option={opt} index={i} onAdvance={advance} />
        ))}
      </div>
    </div>
  );
}
