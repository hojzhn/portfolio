import React from "react";
import { C } from "./tokens";

/* ════════════════════════════════════════════════════════════
   Donut chart (SVG)
   ════════════════════════════════════════════════════════════ */

export function Donut({
  data,
  size = 120,
  thickness = 16,
  gap = 0,
  separatorColor,
  className = "",
}) {
  const radius = (size - thickness) / 2;
  const c = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;
  const innerR = size / 2 - thickness;
  const outerR = size / 2;

  let offset = 0;
  let cumPct = 0;

  // Segment arcs.
  const segments = data.map((d, i) => {
    const arc = (d.pct / 100) * c;
    const dasharray = `${arc} ${c - arc}`;
    const el = (
      <circle
        key={`seg-${i}`}
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={d.color}
        strokeWidth={thickness}
        strokeDasharray={dasharray}
        strokeDashoffset={-offset}
        strokeLinecap="butt"
      />
    );
    offset += arc;
    return el;
  });

  // Radial separators at every segment boundary, drawn over the
  // segments. Stroke uses the card bg so the line reads as a "cut"
  // through the ring rather than a colored divider. CSS var (not
  // `C.bg1`) so the line recolors immediately on palette mode change.
  const sepStroke = separatorColor || "var(--n-bg1)";
  const separators =
    gap > 0
      ? data.map((d, i) => {
          cumPct += d.pct;
          const angle = (cumPct / 100) * 2 * Math.PI;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          return (
            <line
              key={`sep-${i}`}
              x1={cx + innerR * cosA}
              y1={cy + innerR * sinA}
              x2={cx + outerR * cosA}
              y2={cy + outerR * sinA}
              stroke={sepStroke}
              strokeWidth={gap}
              strokeLinecap="butt"
            />
          );
        })
      : [];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={`-rotate-90 ${className}`}
    >
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="var(--n-bg3)"
        strokeWidth={thickness}
      />
      {segments}
      {separators}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   Performance chart (SVG, with grid + zero baseline)
   ════════════════════════════════════════════════════════════ */
function nicePercentStep(range) {
  if (range <= 0.06) return 0.02;
  if (range <= 0.12) return 0.03;
  if (range <= 0.2) return 0.05;
  return 0.1;
}

function makeNiceDomain(values, paddingRatio = 0.18) {
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const rawRange = Math.max(max - min, 0.04);
  const paddedMin = min - rawRange * paddingRatio;
  const paddedMax = max + rawRange * paddingRatio;

  const step = nicePercentStep(paddedMax - paddedMin);

  return {
    min: Math.floor(paddedMin / step) * step,
    max: Math.ceil(paddedMax / step) * step,
    step,
  };
}

function formatPct(value) {
  const pct = value * 100;
  if (pct === 0) return "0%";
  return `${pct > 0 ? "+" : ""}${pct.toFixed(0)}%`;
}

function linePath(data, xScale, yScale) {
  return data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(d.y)}`)
    .join(" ");
}

function smoothPath(data, xScale, yScale) {
  if (data.length < 2) return "";

  const points = data.map((d, i) => [xScale(i), yScale(d.y)]);

  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];

    const mx = (x0 + x1) / 2;

    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }

  return d;
}
export function PerformanceChart({
  data,
  smooth = true,
  height = 150,
  showArea = true,
}) {
  const W = 480;
  const H = height;

  const padLeft = 8;
  const padRight = 20; // reserve space for labels
  const padY = 12;

  const values = data.map((d) => d.y);
  const domain = makeNiceDomain(values);

  const xScale = (i) =>
    padLeft + (i / (data.length - 1)) * (W - padLeft - padRight);

  const yScale = (y) =>
    padY + (1 - (y - domain.min) / (domain.max - domain.min)) * (H - padY * 2);

  const yTicks = [];

  for (
    let y = domain.min;
    y <= domain.max + domain.step / 2;
    y += domain.step
  ) {
    yTicks.push(Number(y.toFixed(4)));
  }

  const path = smooth
    ? smoothPath(data, xScale, yScale)
    : linePath(data, xScale, yScale);

  const zeroY = yScale(0);

  const areaPath =
    path +
    ` L ${xScale(data.length - 1)} ${zeroY}` +
    ` L ${xScale(0)} ${zeroY} Z`;

  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="perfFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={C.accent} stopOpacity="0.14" />
            <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((y) => {
          const isZero = Math.abs(y) < 0.0001;

          return (
            <line
              key={y}
              x1={padLeft}
              x2={W - padRight}
              y1={yScale(y)}
              y2={yScale(y)}
              stroke={isZero ? C.bg4 : C.bg3}
              strokeWidth={isZero ? 0.8 : 0.4}
              strokeDasharray={isZero ? "0" : "2 4"}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {showArea && <path d={areaPath} fill="url(#perfFill)" />}

        <path
          d={path}
          fill="none"
          stroke={C.accent}
          strokeWidth="1.15"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {yTicks.map((y) => (
        <div
          key={y}
          className="pointer-events-none absolute right-0 text-[9px] leading-none"
          style={{
            top: `${(yScale(y) / H) * 100}%`,
            color: C.txt3,
            transform: "translateY(-50%)",
          }}
        >
          {formatPct(y)}
        </div>
      ))}
    </div>
  );
}
