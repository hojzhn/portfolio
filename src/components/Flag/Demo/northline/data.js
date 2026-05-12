import { C } from "./tokens";

export const SIGNAL_CONTRIBUTORS = [
  { label: "EM consumer demand", pct: 35 },
  { label: "Southeast Asia markets", pct: 24 },
  { label: "Digital payments", pct: 18 },
  { label: "Retail earnings", pct: 13 },
  { label: "Credit expansion", pct: 10 },
];

export const SECTOR_EXPOSURE = [
  { label: "Consumer Discretionary", pct: 28 },
  { label: "Financials", pct: 18 },
  { label: "Communication Services", pct: 12 },
  { label: "Industrials", pct: 10 },
  { label: "Others", pct: 32 },
];

export const ALLOCATION = [
  { label: "Equities", pct: 60, color: C.accent },
  { label: "Credit", pct: 20, color: C.amber },
  { label: "Rates", pct: 10, color: C.blue },
  { label: "Cash", pct: 10, color: C.txt3 },
];

export const ACTIVITY_SIGNALS = [
  { value: "14", label: "Articles read", sub: "vs 90d avg 4" },
  { value: "6", label: "Publications followed", sub: "vs 90d avg 2" },
  { value: "3", label: "Themes re-visited", sub: "vs 90d avg 1" },
  { value: "↑ 2.4×", label: "Engagement velocity", sub: "vs prior 90d" },
];

export const PRESETS = [50, 100, 250, 500, 1000];

/**
 * Top holdings for the EM consumer growth standing. Used by
 * SetExposure (Holdings DetailsRow) and YourStanding (Top Holdings tab).
 */
export const HOLDINGS = [
  {
    name: "EM Consumer ETF",
    role: "Core equity exposure",
    weight: "18%",
    trend: "Up",
    trendIcon: "fa-arrow-trend-up",
    trendColor: C.accent,
  },
  {
    name: "SEA Fintech Basket",
    role: "High-growth sub-theme",
    weight: "14%",
    trend: "Up",
    trendIcon: "fa-arrow-trend-up",
    trendColor: C.accent,
  },
  {
    name: "LatAm Payments",
    role: "Digital payments exposure",
    weight: "11%",
    trend: "Stable",
    trendIcon: "fa-arrow-right",
    trendColor: C.txt2,
  },
  {
    name: "Regional Banks",
    role: "Financial sector exposure",
    weight: "9%",
    trend: "Down",
    trendIcon: "fa-arrow-trend-down",
    trendColor: C.red,
  },
];

/**
 * Macro factors that could move this thesis.
 *   `level` — 3 = High impact, 2 = Moderate, 1 = Low.
 * Used by SetExposure (KeySensitivitiesCallout) and YourStanding
 * (RiskEnvironmentCard) — same factors, different presentations.
 */
export const SENSITIVITIES = [
  {
    icon: "fa-regular fa-dollar-sign",
    iconColor: C.red,
    title: "USD strength",
    desc: "Stronger USD may reduce purchasing power and pressure EM assets.",
    level: 3,
  },
  {
    icon: "fa-regular fa-chart-line",
    iconColor: C.amber,
    title: "EM liquidity tightening",
    desc: "Tighter global liquidity can increase funding costs and reduce capital inflows.",
    level: 3,
  },
  {
    icon: "fa-regular fa-cart-shopping",
    iconColor: "#a78bfa",
    title: "Consumer slowdown",
    desc: "Weaker consumer spending would dampen revenue growth expectations.",
    level: 2,
  },
  {
    icon: "fa-regular fa-globe",
    iconColor: C.accent,
    title: "China demand contraction",
    desc: "Softer demand from China could impact export-oriented EM economies.",
    level: 2,
  },
];

export const IMPACT_LABELS = {
  3: "High impact",
  2: "Moderate impact",
  1: "Low impact",
};

/** Deterministic believable performance curve, normalized to ~3.6% at end. */
export function generatePerformance() {
  const points = 60;
  const out = [];
  let v = 0;
  for (let i = 0; i < points; i++) {
    const drift = 0.06 / points;
    const noise = Math.sin(i * 0.7) * 0.004 + Math.cos(i * 0.31) * 0.003;
    v += drift + noise;
    out.push({ x: i, y: v });
  }
  const scale = 0.036 / out[out.length - 1].y;
  return out.map((p) => ({ x: p.x, y: p.y * scale }));
}
