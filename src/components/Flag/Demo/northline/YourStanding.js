import React, { useState } from "react";
import {
  Card,
  CardButton,
  PANEL_CLASS,
  Pill,
  RiskRow,
  StickyArticleHeader,
} from "./atoms";
import { ThemeIcon } from "./ThemeIcon";
import {
  ArticleBottomBar,
  ArticleHero,
  ArticleTopBar,
  STAGGER_KEYFRAMES,
  stackAnim,
} from "./ArticleChrome";
import { palette } from "./tokens";
import { Donut, PerformanceChart } from "./charts";
import { HOLDINGS, IMPACT_LABELS, SENSITIVITIES } from "./data";

/* ════════════════════════════════════════════════════════════
   Step 03 — Your Standing.

   Skeleton chrome only — the body content is intentionally empty,
   ready to be populated with cards that mirror SetExposure's pattern
   (hero, details, etc.).
   ════════════════════════════════════════════════════════════ */

export function YourStanding({ monthly, totalDeployed, onRetract }) {
  const monthlyAmount = monthly ?? 250;
  const deployed = totalDeployed ?? 1000;

  return (
    <div className={`${PANEL_CLASS} min-h-full`}>
      <ArticleTopBar
        onBack={onRetract}
        backLabel="Back to Standings"
        right={
          <button className="w-8 h-8 bg-[var(--n-bg1)] border border-[var(--n-bg3)] rounded-md text-[var(--n-txt2)] cursor-pointer">
            <i className="fa-regular fa-ellipsis" />
          </button>
        }
      />
      <style>{STAGGER_KEYFRAMES}</style>

      <div>
        <div style={stackAnim(0)}>
          <ArticleHero
            icon={
              <ThemeIcon
                shape="chart"
                fg="#4ade80"
                svgSize={28}
                className="w-[60px] h-[72px]"
              />
            }
            eyebrow={
              <span className="text-[12px] text-[var(--n-txt2)] flex items-center gap-2">
                <span>Backed for 4 months</span>
                <span className="text-[var(--n-txt3)]">·</span>
                <span>Last reviewed 8 days ago</span>
                <span className="text-[var(--n-txt3)]">·</span>
                <span>Style: Growth</span>
              </span>
            }
            title="Emerging-market consumer growth"
            pill={<Pill color={palette.accent}>Active</Pill>}
            description="Rising incomes, digital adoption, and an expanding middle class across EM Asia and select Latin America."
            right={
              <div className="flex items-start gap-8">
                <StandingStat
                  label="Monthly exposure"
                  value={
                    <span className="flex items-stretch gap-0.5">
                      <span
                        className="text-[12px] font-medium leading-none self-start"
                        style={{ color: palette.accent }}
                      >
                        $
                      </span>
                      <span
                        className="text-[20px] font-medium tabular-nums leading-none"
                        style={{ color: palette.accent }}
                      >
                        {monthlyAmount.toLocaleString("en-US")}
                      </span>
                      <span className="text-[12px] text-[var(--n-txt2)] leading-none self-end">
                        /mo
                      </span>
                    </span>
                  }
                />
                <StandingStat
                  label="Total deployed"
                  value={
                    <span className="flex items-stretch gap-0.5">
                      <span className="text-[12px] font-medium text-[var(--n-txt2)] leading-none self-start">
                        $
                      </span>
                      <span className="text-[20px] font-medium tabular-nums text-[var(--n-txt)] leading-none">
                        {deployed.toLocaleString("en-US")}
                      </span>
                    </span>
                  }
                />
              </div>
            }
          />
        </div>

        <StickyArticleHeader
          onBack={onRetract}
          icon={
            <ThemeIcon
              shape="chart"
              fg="#4ade80"
              svgSize={16}
              className="w-8 h-9"
            />
          }
          title="Emerging-market consumer growth"
          pill={<Pill color={palette.accent}>Active</Pill>}
          right={
            <div className="flex items-center gap-6 text-[12px]">
              <StickyStat
                label="Monthly"
                value={`$${monthlyAmount.toLocaleString("en-US")}/mo`}
                valueColor={palette.accent}
              />
              <StickyStat
                label="Deployed"
                value={`$${deployed.toLocaleString("en-US")}`}
              />
              <StickyStat
                label="Since initiation"
                value="+3.6%"
                valueColor={palette.accent}
              />
            </div>
          }
        />

        <div style={stackAnim(1)} className="mt-6">
          <div className="grid grid-cols-[1.7fr_1fr] gap-4 items-stretch">
            <PerfImplCard deployed={deployed} />
            <div className="flex flex-col gap-4 h-full">
              <StandingStateCard />
              <CurrentThesisOutlookCard />
            </div>
          </div>
        </div>
      </div>

      <div style={stackAnim(2)} className="mt-4">
        <RiskEnvironmentCard />
      </div>

      <div style={stackAnim(3)} className="mt-4 mb-24">
        <RecentActivityCard />
      </div>

      <ArticleBottomBar
        disclaimer="Standing positions are reviewed quarterly. You can pause or retract this exposure anytime."
        actions={
          <>
            <button className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] text-[var(--n-txt2)] py-1.5 px-3 rounded-md text-[13px] cursor-pointer flex items-center gap-1.5">
              <i className="fa-regular fa-bookmark" /> Watch
            </button>
            <button
              onClick={onRetract}
              className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] text-[var(--n-txt2)] py-1.5 px-3 rounded-md text-[13px] cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-regular fa-pen-to-square" /> Modify standing
            </button>
          </>
        }
      />
    </div>
  );
}

function StandingStat({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5 items-end">
      <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
        {label}
      </span>
      {value}
    </div>
  );
}

function StickyStat({ label, value, valueColor }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--n-txt2)]">
        {label}
      </span>
      <span
        className="text-[13px] font-medium tabular-nums"
        style={{ color: valueColor || "var(--n-txt)" }}
      >
        {value}
      </span>
    </span>
  );
}

const PERF_RANGES = ["1M", "3M", "6M", "YTD", "All"];

// Hand-crafted 6-month return trajectory ending at ~+3.6%. Values are
// fractions (0.036 = 3.6%) for PerformanceChart.
const PERF_DATA = [
  0, 0.001, 0.0025, 0.0015, 0.003, 0.0045, 0.0035, 0.004, 0.006, 0.0085, 0.0105,
  0.013, 0.015, 0.0175, 0.02, 0.0225, 0.025, 0.0275, 0.03, 0.032, 0.034, 0.035,
  0.0355, 0.036,
].map((y) => ({ y }));

const PERF_X_LABELS = ["Feb", "Mar", "Apr", "May", "Today"];

function PerformanceSinceInitiationSection({ deployed }) {
  const [range, setRange] = useState("6M");
  const totalReturn = 3.6;
  const unrealized = Math.round((deployed * totalReturn) / 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
            Performance since initiation
          </div>
          <div className="flex items-baseline gap-0.5 mt-2">
            <span
              className="text-[36px] font-medium tabular-nums leading-none"
              style={{ color: palette.accent }}
            >
              +{totalReturn}
            </span>
            <span
              className="text-[16px] font-medium leading-none"
              style={{ color: palette.accent }}
            >
              %
            </span>
          </div>
          <div className="text-[12px] text-[var(--n-txt2)] mt-2">
            Total return · +${unrealized.toLocaleString("en-US")} unrealized
          </div>
        </div>
        <div className="flex items-center gap-0.5 bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-md p-0.5">
          {PERF_RANGES.map((r) => {
            const active = r === range;
            return (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`text-[11px] py-1 px-2.5 rounded-[3px] cursor-pointer border-0 ${
                  active
                    ? "bg-[var(--n-bg3)] text-[var(--n-txt)]"
                    : "bg-transparent text-[var(--n-txt2)]"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2">
        <PerformanceChart data={PERF_DATA} height={260} />
        <div className="flex justify-between text-[10px] text-[var(--n-txt3)] mt-1 px-1">
          {PERF_X_LABELS.map((m, i) => (
            <span key={`${m}-${i}`}>{m}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-2 pt-3 border-t border-[var(--n-bg3)] text-[13px]">
        <PerfMeta
          label="Best environment"
          value={
            <span className="flex items-baseline gap-2">
              <span className="text-[var(--n-txt)] font-medium">Expansion</span>
              <span
                className="text-[12px] tabular-nums"
                style={{ color: palette.accent }}
              >
                +5.2%
              </span>
            </span>
          }
        />
        <PerfMeta label="Largest drawdown" value="-4.2%" />
        <PerfMeta label="Volatility realized" value="8.2%" />
      </div>
    </div>
  );
}

function PerfMeta({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[12px] text-[var(--n-txt2)]">{label}</span>
      <span className="text-[var(--n-txt)] tabular-nums">{value}</span>
    </div>
  );
}

function StandingStateCard() {
  return (
    <Card>
      <div className="flex justify-between items-center pb-2 border-b border-[var(--n-bg3)]">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
          Standing state
        </span>
        <span className="text-[11px] tabular-nums text-[var(--n-txt3)]">
          #STD-048
        </span>
      </div>

      <div className="flex flex-col">
        <StateRow
          label="Status"
          value={
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: palette.accent }}
              />
              <span style={{ color: palette.accent }}>Active</span>
            </span>
          }
        />
        <StateRow label="Started" value="Feb 12, 2024" />
        <StateRow label="Approach" value="Growth" />
        <StateRow label="Next deploy" value="Jun 5" />
        <StateRow label="Rebalanced" value="Apr 1" />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <StateAction icon="fa-regular fa-sliders" label="Adjust exposure" />
        <StateAction icon="fa-regular fa-pause" label="Pause deposits" />
        <StateAction
          icon="fa-regular fa-pen-to-square"
          label="Modify standing"
          tone="red"
        />
      </div>
    </Card>
  );
}

function StateRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-[var(--n-bg3)] last:border-b-0 text-[13px]">
      <span className="text-[var(--n-txt2)]">{label}</span>
      <span className="text-[var(--n-txt)]">{value}</span>
    </div>
  );
}

function StateAction({ icon, label, tone }) {
  const isRed = tone === "red";
  return (
    <button
      className="flex w-full justify-between items-center py-1.5 px-3 bg-[var(--n-bg2)] border rounded-md text-[12px] cursor-pointer"
      style={
        isRed
          ? {
              color: palette.red,
              borderColor: `color-mix(in srgb, ${palette.red} 40%, transparent)`,
            }
          : {
              color: "var(--n-txt2)",
              borderColor: "var(--n-bg3)",
            }
      }
    >
      <span>{label}</span>
      <i className="fa-regular fa-arrow-right text-[12px]" />
    </button>
  );
}

const ALLOCATION = [
  { label: "Equities", pct: 60, color: palette.accent },
  { label: "Credit", pct: 20, color: palette.blue },
  { label: "Rates", pct: 10, color: "#a78bfa" },
  { label: "Cash", pct: 10, color: palette.txt3 },
];

const IMPL_TABS = ["Allocation", "Top Holdings", "Portfolio Impact"];

const IMPL_FOOTER_LABEL = {
  Allocation: "Change allocation",
  "Top Holdings": "View all holdings",
  "Portfolio Impact": "View portfolio impact details",
};

function CurrentImplementationSection() {
  const [tab, setTab] = useState("Allocation");

  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex justify-between items-center pb-3 ">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
          Current implementation
        </span>
        <div className="flex items-center gap-0.5 bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-md p-0.5">
          {IMPL_TABS.map((label) => {
            const active = label === tab;
            return (
              <button
                key={label}
                onClick={() => setTab(label)}
                className={`text-[11px] py-1 px-2.5 rounded-[3px] cursor-pointer border-0 ${
                  active
                    ? "bg-[var(--n-bg3)] text-[var(--n-txt)]"
                    : "bg-transparent text-[var(--n-txt2)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={tab}
        style={{
          animation: "nlineFadeUp 0.35s cubic-bezier(0.22,0.61,0.36,1) both",
        }}
        className="flex-1 flex flex-col mt-2"
      >
        {tab === "Allocation" && <AllocationTab />}
        {tab === "Top Holdings" && <TopHoldingsTab />}
        {tab === "Portfolio Impact" && <PortfolioImpactTab />}
      </div>

      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--n-bg3)]">
        <CardButton>
          {IMPL_FOOTER_LABEL[tab]} <i className="fa-regular fa-arrow-right" />
        </CardButton>
        {tab === "Portfolio Impact" && (
          <span className="text-[12px] text-[var(--n-txt3)]">
            Impact reflects current holdings, deployments, and price data as of
            today.
          </span>
        )}
      </div>
    </div>
  );
}

function PerfImplCard({ deployed }) {
  return (
    <Card className="h-full">
      <PerformanceSinceInitiationSection deployed={deployed} />
      <div className="border-t border-[var(--n-bg3)] -mx-5 my-6" />
      <CurrentImplementationSection />
    </Card>
  );
}

function AllocationTab() {
  const top = ALLOCATION[0];
  return (
    <div className="flex-1 flex items-center justify-center gap-10">
      <div className="relative shrink-0">
        <Donut data={ALLOCATION} size={220} thickness={20} gap={2} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-[28px] font-medium tabular-nums leading-none"
            style={{ color: top.color }}
          >
            {top.pct}%
          </span>
          <span className="text-[11px] text-[var(--n-txt2)] mt-1">
            {top.label}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-[180px]">
        {ALLOCATION.map((a) => (
          <div
            key={a.label}
            className="grid grid-cols-[12px_1fr_44px] gap-3 items-center py-2.5 border-b border-[var(--n-bg3)] last:border-b-0 text-[13px]"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: a.color }}
            />
            <span className="text-[var(--n-txt)]">{a.label}</span>
            <span className="text-right tabular-nums text-[var(--n-txt)]">
              {a.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopHoldingsTab() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1.4fr_1.4fr_60px_80px] gap-4 py-2 border-b border-[var(--n-bg3)] text-[10px] tracking-[0.08em] uppercase text-[var(--n-txt3)]">
        <span>Holding</span>
        <span>Role</span>
        <span className="text-right">Weight</span>
        <span className="text-right">Trend</span>
      </div>
      {HOLDINGS.map((h) => (
        <div
          key={h.name}
          className="grid grid-cols-[1.4fr_1.4fr_60px_80px] gap-4 items-center py-2.5 border-b border-[var(--n-bg3)] last:border-b-0 text-[13px]"
        >
          <span className="text-[var(--n-txt)]">{h.name}</span>
          <span className="text-[var(--n-txt2)]">{h.role}</span>
          <span className="text-right tabular-nums text-[var(--n-txt)]">
            {h.weight}
          </span>
          <span
            className="flex items-center justify-end gap-1.5"
            style={{ color: h.trendColor }}
          >
            <i className={`fa-regular ${h.trendIcon} text-[11px]`} />
            {h.trend}
          </span>
        </div>
      ))}
    </div>
  );
}

const NEW_EXPOSURES = [
  { icon: "fa-regular fa-globe", name: "SEA fintech", pct: 28 },
  { icon: "fa-regular fa-cart-shopping", name: "EM consumer staples", pct: 22 },
  { icon: "fa-regular fa-credit-card", name: "LatAm payments", pct: 18 },
];

const REINFORCED_EXPOSURES = [
  { icon: "fa-regular fa-microchip", name: "Semiconductors", pct: 14 },
  { icon: "fa-regular fa-building-columns", name: "EM financials", pct: 12 },
  {
    icon: "fa-regular fa-bag-shopping",
    name: "Consumer discretionary",
    pct: 10,
  },
];

const NEXT_MONTH_SCENARIOS = [
  {
    icon: "fa-regular fa-arrow-trend-up",
    title: "If current trends continue",
    sub: "EM exposure could rise to",
    value: "20.5%",
    delta: "+1.5 pp",
    color: "accent",
  },
  {
    icon: "fa-regular fa-divide",
    title: "If trends remain unchanged",
    sub: "EM exposure likely stays around",
    value: "19.0%",
    delta: "+0.0 pp",
    color: "amber",
  },
  {
    icon: "fa-regular fa-arrow-trend-down",
    title: "If conditions weaken",
    sub: "EM exposure could fall to",
    value: "17.5%",
    delta: "-1.5 pp",
    color: "red",
  },
];

function PortfolioImpactTab() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <ExposureAfterCommitPanel />
        <NextMonthImpactPanel />
      </div>
    </div>
  );
}

function ImpactPanel({ children, className = "" }) {
  return (
    <div
      className={`bg-[var(--n-bg2)] border border-[var(--n-bg3)] rounded-lg p-4 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

function ExposureAfterCommitPanel() {
  const before = 12;
  const after = 19;
  const delta = after - before;
  const reinforcePct = 32;

  return (
    <ImpactPanel className="gap-2">
      <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
        Portfolio exposure after commit
      </div>
      <div className="flex items-baseline gap-3 mt-1 flex-wrap">
        <span
          className="text-[36px] font-medium tabular-nums leading-none"
          style={{ color: palette.accent }}
        >
          {after}%
        </span>
        <span className="text-[14px] text-[var(--n-txt)]">
          EM thematic exposure
        </span>
        <Pill color={palette.accent}>+{delta} pp added</Pill>
      </div>
      <div className="h-2 rounded-[3px] overflow-hidden bg-[var(--n-bg3)] mt-3">
        <div
          className="h-full"
          style={{ width: `${reinforcePct}%`, background: palette.accent }}
        />
      </div>
      <div className="flex justify-between text-[12px] mt-1">
        <span style={{ color: palette.accent }}>
          {reinforcePct}% reinforces existing
        </span>
        <span style={{ color: palette.accent }}>
          {100 - reinforcePct}% introduces new exposure
        </span>
      </div>
      <div className="text-[12px] text-[var(--n-txt2)] mt-2">
        This standing increased your EM thematic exposure from {before}% →{" "}
        {after}%.
      </div>
    </ImpactPanel>
  );
}

function NextMonthImpactPanel() {
  const colorMap = {
    accent: palette.accent,
    amber: palette.amber,
    red: palette.red,
  };

  return (
    <ImpactPanel className="gap-3">
      <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)] flex items-center gap-1.5">
        Projections for next month
        <i className="fa-regular fa-circle-info text-[11px] text-[var(--n-txt3)]" />
      </div>
      <div className="flex flex-col gap-2.5">
        {NEXT_MONTH_SCENARIOS.map((s) => {
          const c = colorMap[s.color];
          return (
            <div key={s.title} className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-md flex items-center justify-center text-[14px] border shrink-0"
                style={{
                  background: `color-mix(in srgb, ${c} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${c} 35%, transparent)`,
                  color: c,
                }}
              >
                <i className={s.icon} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-[var(--n-txt)]">{s.title}</div>
                <div className="text-[11px] text-[var(--n-txt2)]">{s.sub}</div>
              </div>
              <div className="text-right shrink-0">
                <div
                  className="text-[18px] font-medium tabular-nums leading-none"
                  style={{ color: c }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[11px] tabular-nums mt-1"
                  style={{ color: c }}
                >
                  {s.delta}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-[var(--n-txt3)] mt-1">
        Assumes $250 monthly deployment continues.
      </div>
    </ImpactPanel>
  );
}

function ExposureListPanel({ title, rightLabel, color, linkLabel, items }) {
  const max = Math.max(...items.map((i) => i.pct)) * 1.3;
  return (
    <ImpactPanel className="gap-3">
      <div className="flex justify-between items-center">
        <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)] flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
          />
          {title}
        </div>
        <span className="text-[11px] text-[var(--n-txt3)]">{rightLabel}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((it) => (
          <div
            key={it.name}
            className="grid grid-cols-[28px_140px_1fr_44px] gap-3 items-center text-[13px]"
          >
            <span
              className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] border"
              style={{
                background: `color-mix(in srgb, ${color} 12%, transparent)`,
                borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
                color,
              }}
            >
              <i className={it.icon} />
            </span>
            <span className="text-[var(--n-txt)]">{it.name}</span>
            <div className="h-1 bg-[var(--n-bg3)] rounded-[2px] overflow-hidden">
              <div
                className="h-full rounded-[2px]"
                style={{ width: `${(it.pct / max) * 100}%`, background: color }}
              />
            </div>
            <span className="text-right tabular-nums text-[var(--n-txt)]">
              {it.pct}%
            </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="text-[12px] mt-1 bg-transparent border-0 cursor-pointer self-start p-0"
        style={{ color }}
      >
        {linkLabel} <i className="fa-regular fa-arrow-right" />
      </button>
    </ImpactPanel>
  );
}

const RELATED_SIGNALS = [
  {
    label: "EM consumer demand",
    state: "Strengthening",
    arrow: "fa-arrow-up",
    color: palette.accent,
  },
  {
    label: "Digital payments",
    state: "Stabilizing",
    arrow: "fa-arrow-right",
    color: palette.txt2,
  },
  {
    label: "Retail earnings",
    state: "Strengthening",
    arrow: "fa-arrow-up",
    color: palette.accent,
  },
];

function RiskEnvironmentCard() {
  return (
    <Card>
      <div className="flex justify-between items-center pb-3 border-b border-[var(--n-bg3)]">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)] flex items-center gap-3">
          Risk & environment monitoring
          <span className="text-[11px] text-[var(--n-txt3)] flex items-center gap-1.5 normal-case tracking-normal">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: palette.accent }}
            />
            Live
          </span>
        </span>
        <button className="bg-transparent border-0 p-0 text-[12px] text-[var(--n-txt2)] cursor-pointer flex items-center gap-1.5">
          View full environment behavior{" "}
          <i className="fa-regular fa-arrow-right" />
        </button>
      </div>

      <div className="grid grid-cols-[1fr_1px_1fr] gap-8 mt-3">
        <div className="flex flex-col">
          <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)] mb-1">
            Current state
          </div>
          <RiskRow
            label="Realized volatility"
            value="8.2%"
            desc="predicted 15-22%"
          />
          <RiskRow
            label="Current drawdown"
            value="-2.1%"
            desc="below max -28%"
          />
          <RiskRow label="Worst historical env" value="Risk-off" desc="" />
          <RiskRow
            label="Tracking vs model"
            value="0.6%"
            desc="within tolerance"
          />
        </div>

        <div className="bg-[var(--n-bg3)] w-px self-stretch" />

        <div className="flex flex-col">
          <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)] mb-1">
            Key sensitivities
          </div>
          {SENSITIVITIES.map((s) => (
            <SensitivityRow key={s.title} title={s.title} level={s.level} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function SensitivityRow({ title, level }) {
  const color =
    level === 3 ? palette.red : level === 2 ? palette.amber : palette.accent;
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-[var(--n-bg3)] last:border-b-0 text-[13px]">
      <span className="text-[var(--n-txt)]">{title}</span>
      <span className="flex items-center gap-2">
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-3 h-1 rounded-[1px]"
              style={{ background: i < level ? color : palette.bg3 }}
            />
          ))}
        </span>
        <span className="text-[var(--n-txt2)] text-[12px]">
          {IMPACT_LABELS[level]}
        </span>
      </span>
    </div>
  );
}

function CurrentThesisOutlookCard() {
  return (
    <Card className="flex-1">
      <div className="flex justify-between items-center pb-3 border-b border-[var(--n-bg3)]">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
          Current thesis outlook
        </span>
        <span className="text-[11px] text-[var(--n-txt3)]">
          Updated 8 days ago
        </span>
      </div>

      <div className="py-3">
        <p className="text-[13px] text-[var(--n-txt)] leading-[1.55] m-0">
          Consumer demand indicators remain elevated across Southeast Asia and
          LatAm despite tighter global liquidity. Real wage growth and retail
          volumes continue above trend. Payment activity and retail earnings
          continue to support the standing. Watch points: USD strength and China
          demand drift sideways.
        </p>
      </div>
      <div className="mt-2 pt-3 border-t border-[var(--n-bg3)] pb-2">
        <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)] mb-2">
          Signal Strength
        </div>
        <div
          className="flex justify-between items-center border rounded-md py-2 px-3"
          style={{
            background: `color-mix(in srgb, ${palette.accent} 10%, transparent)`,
            borderColor: `color-mix(in srgb, ${palette.accent} 35%, transparent)`,
          }}
        >
          <span className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: palette.accent }}
            />
            <span style={{ color: palette.accent }}>High</span>
          </span>
          <span
            className="text-[12px]"
            style={{
              color: `color-mix(in srgb, ${palette.accent} 70%, var(--n-txt2))`,
            }}
          >
            82/100
          </span>
        </div>
      </div>

      <div className="mt-2 pt-3 border-t border-[var(--n-bg3)]">
        <div className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)] mb-1">
          Related signals
        </div>
        <div className="flex flex-col">
          {RELATED_SIGNALS.map((s) => (
            <div
              key={s.label}
              className="flex justify-between items-center py-2.5 border-b border-[var(--n-bg3)] last:border-b-0 text-[13px]"
            >
              <span className="text-[var(--n-txt)]">{s.label}</span>
              <span
                className="flex items-center gap-1.5"
                style={{ color: s.color }}
              >
                <i className={`fa-regular ${s.arrow} text-[11px]`} />
                {s.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

const RECENT_ACTIVITY = [
  {
    date: "May 28",
    icon: "fa-eye",
    iconColor: "var(--n-txt3)",
    title: "Standing reviewed",
    desc: "EM consumer signal still strong, no flag changes",
    result: "No action taken",
    resultColor: "var(--n-txt3)",
  },
  {
    date: "Apr 1",
    icon: "fa-arrows-rotate",
    iconColor: null, // amber, set in render
    title: "Quarterly rebalance",
    desc: "Equities trimmed, credit increased",
    result: "Allocation updated",
    resultColor: "var(--n-txt3)",
  },
  {
    date: "Feb 12",
    icon: "fa-arrow-up-right",
    iconColor: null, // accent, set in render
    title: "First deployment",
    desc: "Equities $150, Credit $50, Rates $25, Cash $25",
    result: "+$250 deployed",
    resultColor: null, // accent
  },
];

function RecentActivityCard() {
  return (
    <Card>
      <div className="flex justify-between items-center pb-3 border-b border-[var(--n-bg3)]">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[var(--n-txt2)]">
          Recent activity
        </span>
        <button className="bg-transparent border-0 p-0 text-[12px] text-[var(--n-txt2)] cursor-pointer flex items-center gap-1.5">
          View full activity <i className="fa-regular fa-arrow-right" />
        </button>
      </div>

      <div className="flex flex-col">
        {RECENT_ACTIVITY.map((a, i) => {
          const iconColor =
            i === 1 ? palette.amber : i === 2 ? palette.accent : a.iconColor;
          const resultColor = i === 2 ? palette.accent : a.resultColor;
          return (
            <div
              key={a.title}
              style={{
                animation:
                  "nlineFadeUp 0.5s cubic-bezier(0.22,0.61,0.36,1) both",
                animationDelay: `${400 + i * 100}ms`,
              }}
              className="grid grid-cols-[64px_20px_1fr_auto] gap-4 items-center py-3 border-b border-[var(--n-bg3)] last:border-b-0 text-[13px]"
            >
              <span className="text-[12px] text-[var(--n-txt3)] tabular-nums">
                {a.date}
              </span>
              <i
                className={`fa-regular ${a.icon} text-[12px]`}
                style={{ color: iconColor }}
              />
              <span className="min-w-0 truncate">
                <span className="text-[var(--n-txt)] font-medium">
                  {a.title}
                </span>
                <span className="text-[var(--n-txt3)] ml-3">{a.desc}</span>
              </span>
              <span
                className="text-right text-[12px] tabular-nums"
                style={{ color: resultColor }}
              >
                {a.result}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
