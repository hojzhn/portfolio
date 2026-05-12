import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardButton,
  DefRow,
  InfoDot,
  PANEL_CLASS,
  Pill,
  RiskRow,
  SectionHeader,
  StickyArticleHeader,
} from "./atoms";
import { palette } from "./tokens";
import { Donut, PerformanceChart } from "./charts";
import { ThemeIcon } from "./ThemeIcon";
import {
  generatePerformance,
  HOLDINGS,
  IMPACT_LABELS,
  PRESETS,
  SENSITIVITIES,
} from "./data";
import { generateRegimePerformanceData } from "./generateSparkLine";
import Header from "../../../Header";
import {
  ArticleBottomBar,
  ArticleHero,
  ArticleTopBar,
  STAGGER_KEYFRAMES,
  barAnim,
  stackAnim,
} from "./ArticleChrome";

/* ════════════════════════════════════════════════════════════
   Step 02 — Set Exposure.
   Full theme detail page: thesis, model snapshot, monthly
   exposure controls, impact breakdown, historical context,
   sector exposure, and an implementation preview.
   ════════════════════════════════════════════════════════════ */

const RELATED_POSITIONS = [
  { label: "ASEAN manufacturing expansion", icon: "fa-regular fa-industry" },
  { label: "EM fintech adoption", icon: "fa-regular fa-mobile-screen" },
  { label: "Consumer credit growth", icon: "fa-regular fa-credit-card" },
];

const SECTOR_EXPOSURE = [
  { label: "Consumer Discretionary", pct: 28, color: palette.accent },
  { label: "Financials", pct: 18, color: palette.amber },
  { label: "Communication Services", pct: 12, color: palette.blue },
  { label: "Industrials", pct: 10, color: "#a78bfa" },
  { label: "Others", pct: 32, color: palette.txt3 },
];

export function SetExposure({ value, onChange, onBack, onConfirm }) {
  const sliderPct = ((value - 25) / (1000 - 25)) * 100;

  const breakdown = useMemo(
    () => [
      { label: "Equities", per: value * 0.6, color: palette.accent },
      { label: "Credit", per: value * 0.2, color: palette.amber },
      { label: "Rates", per: value * 0.1, color: palette.blue },
      { label: "Cash Buffer", per: value * 0.1, color: palette.txt3 },
    ],
    [value],
  );

  const performance = useMemo(
    () =>
      generateRegimePerformanceData({
        regime: "expansion",
        points: 180,
        seed: 12,
      }),
    [],
  );

  return (
    <div className={`${PANEL_CLASS} min-h-full`}>
      <ArticleTopBar
        onBack={onBack}
        backLabel="Back to List"
        right={
          <button className="w-8 h-8 bg-[var(--n-bg1)] border border-[var(--n-bg3)] rounded-md text-[var(--n-txt2)] cursor-pointer">
            <i className="fa-regular fa-ellipsis" />
          </button>
        }
      />
      <style>{STAGGER_KEYFRAMES}</style>

      {/* Theme header card */}
      <div className="">
        <div style={stackAnim(0)}>
          <ThemeHeaderCard />
        </div>

        <StickyArticleHeader
          onBack={onBack}
          icon={
            <ThemeIcon
              shape="chart"
              fg="#4ade80"
              svgSize={16}
              className="w-8 h-9"
            />
          }
          title="Emerging-market consumer growth"
          right={
            <span className="flex items-stretch gap-0.5">
              <span
                className="text-[12px] font-medium leading-none self-start"
                style={{ color: palette.accent }}
              >
                $
              </span>
              <span className="text-[22px] font-medium tabular-nums text-[var(--n-txt)] leading-none">
                {value.toLocaleString("en-US")}
              </span>
              <span className="text-[12px] text-[var(--n-txt2)] leading-none self-end">
                /mo
              </span>
            </span>
          }
        />

        <div style={stackAnim(1)}>
          <Card
            title="SET MONTHLY EXPOSURE"
            headerBg
            headerRight={
              <span className="text-[12px] text-[var(--n-txt2)] flex items-center gap-1.5">
                Style:{" "}
                <CardButton className="text-[var(--n-txt)] font-medium">
                  Growth
                </CardButton>
              </span>
            }
            className="my-8"
          >
            <div className="flex flex-row items-start gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-stretch justify-end gap-1 mt-2">
                  <span
                    className="text-[18px] font-medium leading-none self-start mt-2"
                    style={{ color: palette.accent }}
                  >
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={value.toLocaleString("en-US")}
                    onChange={(e) => {
                      const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                      onChange(isNaN(n) ? 0 : Math.min(1000, n));
                    }}
                    className="text-[44px] text-[var(--n-txt)] leading-none tabular-nums font-medium bg-transparent border-0 outline-none text-right p-0 m-0 appearance-none"
                    style={{
                      width: `${Math.max(2, value.toLocaleString("en-US").length)}ch`,
                    }}
                  />
                  <span className="text-[var(--n-txt2)] text-[16px] leading-none self-end mb-2">
                    /mo
                  </span>
                </div>

                <div className="relative mt-5">
                  <input
                    type="range"
                    min={25}
                    max={1000}
                    step={25}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-1.5 rounded-[3px] outline-none cursor-pointer appearance-none"
                    style={{
                      background: `linear-gradient(to right, ${palette.accent} 0%, ${palette.accent} ${sliderPct}%, ${palette.bg3} ${sliderPct}%, ${palette.bg3} 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-[var(--n-txt3)] text-[11px]">
                    <span>$25</span>
                    <span>$1,000</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {PRESETS.map((p) => {
                    const active = p === value;
                    return (
                      <button
                        key={p}
                        onClick={() => onChange(p)}
                        className={`flex-1 min-w-[56px] py-2 border rounded-md text-[12px] cursor-pointer ${
                          active
                            ? "bg-[var(--n-bg2)] text-[var(--n-txt)] border-[var(--n-accent)]"
                            : "bg-[var(--n-bg1)] text-[var(--n-txt2)] border-[var(--n-bg3)]"
                        }`}
                      >
                        ${p}
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-5 pt-4 border-t border-[var(--n-bg3)]">
                  <div>
                    <div className="text-[11px] text-[var(--n-txt2)] flex items-center gap-1.5">
                      Deployment cadence <InfoDot />
                    </div>
                    <div className="text-[13px] text-[var(--n-txt)] mt-1">
                      Monthly · Rebalanced quarterly
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--n-txt2)] flex items-center gap-1.5">
                      Estimated annual fee <InfoDot />
                    </div>
                    <div className="text-[13px] text-[var(--n-txt)] mt-1">
                      0.32%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--n-txt2)] flex items-center gap-1.5">
                      Risk profile <InfoDot />
                    </div>
                    <div className="text-[13px] mt-1">
                      <DotValue dotColor={palette.amber}>Balanced</DotValue>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-[var(--n-txt2)] flex items-center gap-1.5">
                      Time horizon <InfoDot />
                    </div>
                    <div className="text-[13px] text-[var(--n-txt)] mt-1">
                      3 – 5 years
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--n-txt2)] flex items-center gap-1.5">
                      Region <InfoDot />
                    </div>
                    <div className="text-[13px] text-[var(--n-txt)] mt-1">
                      EM Asia, LatAm select
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] text-[var(--n-txt2)]">
                    Allocation
                  </span>
                  <span className="text-[12px] text-[var(--n-txt2)]">
                    ${value.toLocaleString("en-US")}/mo
                  </span>
                </div>

                {breakdown.map((b) => {
                  const pct = Math.round((b.per / value) * 100);
                  return (
                    <DefRow
                      key={b.label}
                      label={
                        <span className="flex items-center gap-2.5 text-[var(--n-txt)]">
                          {b.label}
                        </span>
                      }
                      value={
                        <div className="grid grid-cols-[1fr_44px_70px] items-center gap-3">
                          <div className="h-1 bg-[var(--n-bg3)] rounded-[2px] overflow-hidden">
                            <div
                              className="h-full rounded-[2px] bg-[var(--n-txt2)]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-right tabular-nums text-[var(--n-txt)]">
                            {pct}%
                          </span>
                          <span className="text-right tabular-nums text-[var(--n-txt2)]">
                            +${Math.round(b.per)}/mo
                          </span>
                        </div>
                      }
                    />
                  );
                })}

                {/* EM exposure after commit — derived from the slider value. */}
                {(() => {
                  const baselinePct = 12;
                  const overlapPct = 32;
                  const deltaPP = Math.max(0, Math.round(value * 0.028));
                  const afterPct = baselinePct + deltaPP;
                  return (
                    <div className="mt-5 pt-4 border-t border-[var(--n-bg3)]">
                      {/* Header: title + delta pill */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] text-[var(--n-txt2)]">
                          EM exposure after commit
                        </span>
                        <Pill color={palette.blue}>+{deltaPP} pp</Pill>
                      </div>

                      {/* Number sequence */}
                      <div className="flex items-baseline gap-2.5 mb-3">
                        <span className="text-[14px] tabular-nums text-[var(--n-txt2)]">
                          {baselinePct}%
                        </span>
                        <i className="fa-regular fa-arrow-right text-[var(--n-txt3)] text-[12px]" />
                        <span className="text-[26px] font-medium tabular-nums text-[var(--n-txt)]">
                          {afterPct}%
                        </span>
                      </div>

                      {/* Stacked progress bar — solid for current, hatched for added */}
                      <div className="relative h-2 bg-[var(--n-bg3)] rounded-[2px] overflow-hidden flex">
                        <div
                          className="h-full"
                          style={{
                            width: `${baselinePct}%`,
                            background: palette.accent,
                          }}
                        />
                        <div
                          className="h-full"
                          style={{
                            width: `${deltaPP}%`,
                            backgroundColor: `${palette.accent}40`,
                            backgroundImage: `repeating-linear-gradient(45deg, ${palette.accent}, ${palette.accent} 4px, transparent 4px, transparent 8px)`,
                          }}
                        />
                      </div>

                      {/* Bar labels: 0, after%, 100% */}
                      <div className="relative mt-1.5 h-4 text-[10px]">
                        <span className="absolute left-0 text-[var(--n-txt3)]">
                          0
                        </span>
                        <span
                          className="absolute text-[var(--n-txt)] tabular-nums font-medium"
                          style={{
                            left: `${afterPct}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          {afterPct}%
                        </span>
                        <span className="absolute right-0 text-[var(--n-txt3)]">
                          100% of portfolio
                        </span>
                      </div>

                      {/* Overlap footer */}
                      <div className="text-[12px] text-[var(--n-txt2)] mt-4">
                        {overlapPct}% overlap with current holdings.
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div style={stackAnim(2)}>
        <DetailsCard performance={performance} value={value} />
      </div>
      <div className="text-center text-[11px] text-[var(--n-txt3)] flex items-center justify-center gap-2 mb-16">
        <i className="fa-regular fa-lock" />
        Your data is private and secure.{" "}
        <a href="#" className="text-[var(--n-txt2)] underline">
          Learn more
        </a>
      </div>
      <ArticleBottomBar
        disclaimer="Thematic positions carry risk and may not perform as expected. You can increase, decrease, pause, or retract this exposure anytime."
        actions={
          <>
            <button
              onClick={onBack}
              className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] text-[var(--n-txt2)] py-1.5 px-3 rounded-md text-[13px] cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-regular fa-xmark" /> Dismiss
            </button>
            <button className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] text-[var(--n-txt2)] py-1.5 px-3 rounded-md text-[13px] cursor-pointer flex items-center gap-1.5">
              <i className="fa-regular fa-bookmark" /> Save for later
            </button>
            <button
              onClick={onConfirm}
              className="border py-1.5 px-3 rounded-md text-[13px] font-medium cursor-pointer flex items-center gap-1.5"
              style={{
                color: palette.accent,
                borderColor: `color-mix(in srgb, ${palette.accent} 40%, transparent)`,
                background: `color-mix(in srgb, ${palette.accent} 12%, transparent)`,
              }}
            >
              Set exposure <i className="fa-regular fa-arrow-right" />
            </button>
          </>
        }
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Helpers
   ════════════════════════════════════════════════════════════ */

function ThemeHeaderCard() {
  return (
    <ArticleHero
      icon={
        <ThemeIcon
          shape="chart"
          fg="#4ade80"
          svgSize={36}
          className="w-[80px] h-[100px]"
        />
      }
      eyebrow={<Pill>Theme</Pill>}
      title="Emerging-market consumer growth"
      description="Rising incomes, digital adoption, and expanding middle class across EM."
      bottom={
        <div className="flex flex-row gap-4 text-[12px] text-[var(--n-txt2)]">
          <BulletDot>Attention increasing over 90d</BulletDot>
          <BulletDot>Reviewed 3 times this month</BulletDot>
        </div>
      }
      right={
        <>
          <HeaderActionBtn icon="fa-regular fa-bookmark" />
          <HeaderActionBtn icon="fa-regular fa-right-left" />
          <HeaderActionBtn
            icon="fa-regular fa-wave-pulse"
            label="Why I'm seeing this"
          />
        </>
      }
    />
  );
}

function BulletDot({ children }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: palette.accent }}
      />
      {children}
    </div>
  );
}

/**
 * DotValue — colored dot followed by text. Used in DefRow `value`s
 * for clarity / status indicators (Signal clarity, Implementation
 * clarity, etc.).
 *   dotColor  — fill of the dot.
 *   textColor — optional; defaults to `--n-txt`. Pass the same color
 *               as `dotColor` to make the row read as accented.
 */

/**
 * KeySensitivitiesCallout — boxed callout with shield + heading,
 * a 4-card grid of risk factors (icon + title + description + impact),
 * and a methodology footer.
 */
function KeySensitivitiesCallout() {
  return (
    <div className="mt-5 p-4   bg-[var(--n-bg2)] border border-[var(--n-bg3)]">
      <div className="flex items-center gap-2 mb-1">
        <i
          className="fa-regular fa-shield-exclamation text-[14px]"
          style={{ color: palette.red }}
        />
        <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-[var(--n-txt)]">
          Key sensitivities
        </span>
      </div>
      <p className="text-[12px] text-[var(--n-txt2)] m-0 mb-4">
        These factors could negatively impact the performance of this exposure.
      </p>
      <div className="grid grid-cols-4 gap-2">
        {SENSITIVITIES.map((s) => {
          const impactColor = s.level === 3 ? palette.red : palette.amber;
          return (
            <div
              key={s.title}
              className="bg-[var(--n-bg1)] border border-[var(--n-bg3)] rounded-lg p-3 flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="text-[13px] font-medium text-[var(--n-txt)] leading-tight pt-1">
                  {s.title}
                </div>
              </div>
              <div className="text-[12px] text-[var(--n-txt2)] leading-[1.55] flex-1">
                {s.desc}
              </div>
              <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--n-bg3)] text-[12px]">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: impactColor }}
                />
                <span style={{ color: impactColor }}>
                  {IMPACT_LABELS[s.level]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[var(--n-bg3)] text-[12px]">
        <div className="flex gap-2 items-center">
          <InfoDot />
          <span className="text-[var(--n-txt2)]">
            Sensitivities are based on historical analysis and current market
            conditions.
          </span>
        </div>
        <CardButton>
          View methodology{" "}
          <i className="fa-regular fa-arrow-up-right-from-square" />
        </CardButton>
      </div>
    </div>
  );
}

function DotValue({ children, dotColor, textColor }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ background: dotColor }}
      />
      <span style={{ color: textColor || "var(--n-txt)" }}>{children}</span>
    </span>
  );
}

/**
 * RiskProfileBar — gradient track (green → amber → red) with a knob,
 * plus three baseline labels: Defensive · Balanced · Riskier.
 * `position` is 0..1; 0 = full Defensive, 1 = full Riskier.
 */
function RiskProfileBar({ position = 0.5 }) {
  return (
    <div className="w-full">
      <div
        className="h-1.5 rounded-full relative"
        style={{
          background: `linear-gradient(to right, ${palette.accent} 0%, ${palette.amber} 50%, ${palette.red} 100%)`,
        }}
      >
        <span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.4)]"
          style={{ left: `${position * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[11px] text-[var(--n-txt2)]">
        <span>Defensive</span>
        <span>Balanced</span>
        <span>Riskier</span>
      </div>
    </div>
  );
}

/**
 * DetailsRow — collapsible row used inside DetailsCard.
 *   label    — left column header.
 *   summary  — collapsed summary that sits next to the label.
 *   isOpen   — controlled open state.
 *   onToggle — click handler.
 *   children — expanded body (rendered when open).
 */
function DetailsRow({ label, summary, isOpen, onToggle, children }) {
  const rowRef = useRef(null);
  const prevOpen = useRef(isOpen);

  // When the row transitions from closed → open, scroll it into view
  // so the expanded body isn't off-screen. Delay slightly so the body
  // has begun its grid-row height transition before we scroll.
  useEffect(() => {
    if (isOpen && !prevOpen.current && rowRef.current) {
      const el = rowRef.current;
      const id = window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      prevOpen.current = isOpen;
      return () => window.clearTimeout(id);
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  return (
    <div
      ref={rowRef}
      className="border-b border-[var(--n-bg3)] last:border-b-0 py-4 scroll-mt-4"
    >
      <div className="grid grid-cols-[200px_1fr_16px] gap-4 items-start">
        <button
          type="button"
          onClick={onToggle}
          className="text-left text-[13px] text-[var(--n-txt)] pt-0.5 bg-transparent border-0 cursor-pointer"
        >
          {label}
        </button>
        <div className="text-[13px] min-w-0 relative">
          {/* Summary fades out as the body opens. */}
          <span
            className={`block text-[var(--n-txt2)] leading-[1.5] transition-opacity duration-200 ${
              isOpen ? "opacity-0 pointer-events-none absolute" : "opacity-100"
            }`}
          >
            {summary}
          </span>
          {/* Body height animates via the grid-template-rows trick:
              0fr → 1fr resolves to auto height across the transition. */}
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">{children}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="bg-transparent border-0 cursor-pointer pt-1.5"
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <i
            className={`fa-regular fa-chevron-down text-[var(--n-txt3)] text-[10px] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/**
 * DetailsCard — Risk profile / Holdings / Performance / Implementation
 * rules / Overlap. Each section collapses; "Expand all" toggles them
 * together.
 */
function DetailsCard({ performance, value }) {
  const sectionCount = 5;
  const [openSet, setOpenSet] = useState(new Set([0])); // first open by default
  const allOpen = openSet.size === sectionCount;
  const toggle = (i) =>
    setOpenSet((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  const toggleAll = () => {
    setOpenSet(
      allOpen
        ? new Set()
        : new Set(Array.from({ length: sectionCount }, (_, i) => i)),
    );
  };

  // Holdings table (placeholder data).
  const holdings = HOLDINGS;

  const sharedExposures = [
    ["Semiconductors", "9%"],
    ["EM Financials", "8%"],
    ["Industrial suppliers", "7%"],
    ["Consumer discretionary", "5%"],
    ["Telecom", "3%"],
  ];
  const newExposures = [
    ["SEA fintech", "14%"],
    ["LatAm payments", "11%"],
    ["EM consumer staples", "9%"],
    ["EM credit (IG)", "8%"],
    ["Frontier markets", "4%"],
  ];

  const sharedOf250 = Math.round(value * 0.32);
  const newOf250 = value - sharedOf250;

  return (
    <div>
      <div className="flex justify-between items-center pb-3 border-b border-[var(--n-bg3)]">
        <span className="text-[14px] font-medium text-[var(--n-txt)]">
          Details
        </span>
        <CardButton onClick={toggleAll}>
          {allOpen ? "Collapse all" : "Expand all"}
        </CardButton>
      </div>

      <DetailsRow
        label="Risk profile"
        summary="Volatility: 15-22%  (1Y est.) · Max drawdown: −18 to −28%  · Worst regime: risk-off"
        isOpen={openSet.has(0)}
        onToggle={() => toggle(0)}
      >
        <RiskRow
          label="Volatility (1Y est.)"
          value="15-22%"
          desc="modeled on similar EM growth themes"
        />
        <RiskRow
          label="Max drawdown (1Y est.)"
          value="−18 to −28%"
          desc="stress-tested across recent regimes"
        />
        <RiskRow
          label="Worst regime"
          value="Risk-off"
          desc="USD strength compounds losses"
        />
        <RiskRow
          label="Strongest regime"
          value="Expansion"
          desc="Broad growth, falling rates, improving liquidity"
        />

        <KeySensitivitiesCallout />
      </DetailsRow>

      <DetailsRow
        label="Holdings"
        summary="8 instruments: EM Consumer ETF, SEA Fintech Basket, LatAm Payments, Regional Banks, plus 4 more."
        isOpen={openSet.has(1)}
        onToggle={() => toggle(1)}
      >
        <div className="grid grid-cols-[2fr_2fr_60px_80px] gap-4 text-[11px] uppercase tracking-[0.06em] text-[var(--n-txt3)] py-2 border-b border-[var(--n-bg3)]">
          <span>Holding</span>
          <span>Role</span>
          <span className="text-right">Weight</span>
          <span className="text-right">Trend (90d)</span>
        </div>
        {holdings.map((h) => (
          <div
            key={h.name}
            className="grid grid-cols-[2fr_2fr_60px_80px] gap-4 py-3 border-b border-[var(--n-bg2)] text-[13px] items-center"
          >
            <span className="text-[var(--n-txt)]">{h.name}</span>
            <span className="text-[var(--n-txt2)]">{h.role}</span>
            <span className="text-right text-[var(--n-txt)] tabular-nums">
              {h.weight}
            </span>
            <span
              className="text-right flex items-center justify-end gap-1.5"
              style={{ color: h.trendColor }}
            >
              <i className={`fa-regular ${h.trendIcon} text-[12px]`} />
              {h.trend}
            </span>
          </div>
        ))}
        <CardButton className="mt-4">
          Show all 8 holdings <i className="fa-regular fa-arrow-right" />
        </CardButton>
      </DetailsRow>

      <DetailsRow
        label="Performance across regimes"
        summary="Strongest:  expansion · Weakest: high rates. Past performance not indicative."
        isOpen={openSet.has(2)}
        onToggle={() => toggle(2)}
      >
        <div className="flex gap-1.5 mb-3 border-b border-[var(--n-bg3)]">
          {["Expansion", "Inflation", "Risk-off", "High rates"].map(
            (label, i) => (
              <button
                key={label}
                className={`py-1.5 px-2 bg-transparent border-0 text-[12px] cursor-pointer relative ${
                  i === 0 ? "text-[var(--n-txt)]" : "text-[var(--n-txt3)]"
                }`}
              >
                {label}
                {i === 0 && (
                  <span
                    className="absolute -bottom-px left-0 right-0 h-0.5"
                    style={{ background: palette.accent }}
                  />
                )}
              </button>
            ),
          )}
        </div>
        <PerformanceChart data={performance} />
        <div className="flex justify-between text-[10px] text-[var(--n-txt3)] mt-1 mb-3 px-1">
          {["Jan", "Apr", "Jul", "Oct", "Jan", "Apr"].map((m, i) => (
            <span key={`${m}-${i}`}>{m}</span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 py-3 border-y border-[var(--n-bg3)] text-[12px]">
          {[
            ["Median annual return", "+11.4%"],
            ["Range (10-90 pct)", "+3% to +24%"],
            ["Months positive", "68%"],
            ["Sample regimes", "14 periods, 1995-2024"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[var(--n-txt2)] text-[11px]">{k}</div>
              <div className="text-[var(--n-txt)] mt-1 tabular-nums">{v}</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[var(--n-txt3)] italic mt-3">
          Backtested using SPDR EM Consumer indices, MSCI EM and proxy baskets.
          Past performance does not indicate future results.
        </div>
      </DetailsRow>

      <DetailsRow
        label="Implementation rules"
        summary="Monthly deployment, quarterly rebalance. Drift thresholds and retraction policy."
        isOpen={openSet.has(3)}
        onToggle={() => toggle(3)}
      >
        <DefRow
          label="Deployment"
          value="Monthly on the 5th business day. Spread across instruments by target weight."
        />
        <DefRow
          label="Rebalance frequency"
          value="Quarterly. Last business day of Mar, Jun, Sep, Dec."
        />
        <DefRow
          label="Drift threshold"
          value="±5 pp per asset class triggers an off-cycle rebalance."
        />
        <DefRow
          label="Retraction"
          value="Gradual unwind over 6 months. No new deposits. Existing positions held to natural exits."
        />

        <DefRow
          label="Cash buffer"
          value="10% retained for rebalancing and drawdown reserves. Rebuilt on each deposit."
        />
      </DetailsRow>

      <DetailsRow
        label="Overlap with current holdings"
        summary="Overlap: 32%. Top shared exposures: semiconductors, EM financials, industrial suppliers."
        isOpen={openSet.has(4)}
        onToggle={() => toggle(4)}
      >
        <div className="flex h-7 rounded-[3px] overflow-hidden mb-3">
          <div
            className="flex items-center justify-center text-[12px] text-white"
            style={{ width: "32%", background: palette.accentDim }}
          >
            32% shared
          </div>
          <div
            className="flex items-center justify-center text-[12px] text-[var(--n-txt2)]"
            style={{ width: "68%", background: `${palette.accentDim}20` }}
          >
            68% net new exposure
          </div>
        </div>
        <p className="text-[12px] text-[var(--n-txt2)] leading-[1.55] m-0 mb-4">
          If you commit, ${sharedOf250} of every ${value} monthly deposit will
          reinforce positions you already hold. The remaining ${newOf250} adds
          new exposure.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="mt-5 p-4   bg-[var(--n-bg2)] border border-[var(--n-bg3)]">
            <div className="text-[11px] uppercase tracking-[0.06em] text-[var(--n-txt2)] mb-2 flex items-center gap-2">
              <i
                className="fa-regular fa-link"
                style={{ color: palette.accent }}
              />
              Top shared exposures
            </div>
            {sharedExposures.map(([name, pct]) => (
              <DefRow
                key={name}
                label={name}
                value={
                  <span className="tabular-nums text-right block">{pct}</span>
                }
              />
            ))}
          </div>
          <div className="mt-5 p-4   bg-[var(--n-bg2)] border border-[var(--n-bg3)]">
            <div className="text-[11px] uppercase tracking-[0.06em] text-[var(--n-txt2)] mb-2 flex items-center gap-2">
              <i
                className="fa-regular fa-circle-plus"
                style={{ color: palette.accent }}
              />
              New exposures introduced
            </div>
            {newExposures.map(([name, pct]) => (
              <DefRow
                key={name}
                label={name}
                value={
                  <span className="tabular-nums text-right block">{pct}</span>
                }
              />
            ))}
          </div>
        </div>
      </DetailsRow>
    </div>
  );
}

function HeaderActionBtn({ icon, label }) {
  return (
    <button className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-md h-8 px-3 text-[12px] text-[var(--n-txt2)] cursor-pointer inline-flex items-center gap-1.5">
      <i className={icon} />
      {label}
    </button>
  );
}

function PreviewBtn({ icon, label }) {
  return (
    <button className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-md py-1.5 px-3 text-[12px] text-[var(--n-txt2)] cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
      <i className={icon} /> {label}
    </button>
  );
}

function StatBox({ icon, label, value, accent }) {
  return (
    <div className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-md p-3 flex items-center gap-3">
      <span
        className="w-8 h-8 rounded-md flex items-center justify-center text-[14px]"
        style={{
          background: `color-mix(in srgb, ${accent} 18%, transparent)`,
          color: accent,
        }}
      >
        <i className={icon} />
      </span>
      <div className="flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.06em] text-[var(--n-txt2)]">
          {label}
        </div>
        <div className="text-[13px] text-[var(--n-txt)] tabular-nums">
          {value}
        </div>
      </div>
    </div>
  );
}
