import React, { useMemo } from "react";
import { PanelHeader, Card, DefRow, BarRow, PANEL_CLASS } from "./atoms";
import { Donut } from "./charts";
import {
  ACTIVITY_SIGNALS,
  ALLOCATION,
  SIGNAL_CONTRIBUTORS,
  SECTOR_EXPOSURE,
} from "./data";
import { palette } from "./tokens";
import { PRESETS } from "./data";

export function ObservedSignals({ onDismiss, onExplore, value }) {
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

  return (
    <div className={PANEL_CLASS}>
      <PanelHeader
        title="Emerging-market consumer growth"
        chip="Theme"
        meta="Detected: May 5, 2025"
        right={
          <button className="bg-[var(--n-bg2)] border border-[var(--n-bg3)] text-[var(--n-txt2)] py-1.5 px-3 rounded-md text-[12px] cursor-pointer flex items-center gap-1.5">
            Why this theme? <span className="opacity-60">ⓘ</span>
          </button>
        }
        sub="Based on your recent activity over the past 90 days"
      />

      <div className="flex">
        <div className="flex flex-col">
          <Card title="Core thesis">
            Rising income + digital adoption driving sustained consumption
            growth.
          </Card>
          <Card title="Monthly exposure">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[56px] text-[var(--n-txt)] leading-none tabular-nums">
                ${value}
              </span>
              <span className="text-[var(--n-txt2)] text-[18px]">/mo</span>
            </div>

            <div className="relative mt-[22px]">
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
              <div className="flex justify-between text-[var(--n-txt3)] text-[11px] mt-2">
                <span>$25</span>
                <span>$1,000</span>
              </div>
            </div>

            <div className="flex gap-1.5 mt-4 flex-wrap">
              {PRESETS.map((p) => {
                const active = p === value;
                return (
                  <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`flex-1 min-w-[56px] py-2 border rounded-md text-[12px] cursor-pointer ${
                      active
                        ? "bg-[var(--n-bg3)] text-[var(--n-txt)] border-[var(--n-accent)]"
                        : "bg-[var(--n-bg2)] text-[var(--n-txt2)] border-[var(--n-bg3)]"
                    }`}
                  >
                    ${p}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card title="Exposure impact (est.)">
            {breakdown.map((b) => (
              <div
                key={b.label}
                className="grid grid-cols-[16px_1fr_60px_90px] items-center gap-2.5 py-2 border-b border-[var(--n-bg2)] text-[12px]"
              >
                <span className="w-3 h-3 rounded-full border border-[var(--n-bg3)] inline-flex items-center justify-center">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: b.color }}
                  />
                </span>
                <span className="flex-1 text-[var(--n-txt2)]">{b.label}</span>
                <div className="h-1 bg-[var(--n-bg3)] rounded-[2px] overflow-hidden">
                  <div
                    className="h-full rounded-[2px]"
                    style={{
                      width: `${(b.per / value) * 100}%`,
                      background: b.color,
                    }}
                  />
                </div>
                <span className="text-[var(--n-txt)] text-[11px] text-right tabular-nums">
                  +${Math.round(b.per)}/mo
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-3 text-[13px]">
              <span className="text-[var(--n-txt2)]">Total</span>
              <span className="text-[var(--n-txt)] tabular-nums">
                ${value}/mo
              </span>
            </div>
          </Card>
        </div>

        <div className="flex flex-col">
          <Card title="Theme snapshot (model view)">
            <DefRow label="Coverage" value="Equities, rates, credit" />
            <DefRow label="Region" value="EM Asia, LatAm select" />
            <DefRow
              label="Confidence"
              value={
                <span className="text-[var(--n-accent)] tabular-nums">
                  High ↗
                </span>
              }
            />
            <DefRow label="Time horizon" value="3–5 years" />
            <DefRow label="Risk range" value="Moderate to High" />
            <DefRow label="Volatility (1Y)" value="15% – 22%" />
            <DefRow label="Max drawdown (1Y)" value="−18% to −28%" />

            <a
              href="#"
              className="text-[var(--n-accent)] text-[12px] no-underline mt-1 inline-block"
            >
              View full model details →
            </a>
          </Card>
          {/* 
          <Card title="Theme exposure preview">
            <div className="flex items-center gap-4">
              <Donut data={ALLOCATION} size={120} thickness={18} />
              <div className="flex flex-col gap-1.5 flex-1">
                {ALLOCATION.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-2 text-[12px]"
                  >
                    <span
                      className="w-[7px] h-[7px] rounded-full"
                      style={{ background: a.color }}
                    />
                    <span className="text-[var(--n-txt2)] flex-1">
                      {a.label}
                    </span>
                    <span className="text-[var(--n-txt)] text-[11px] tabular-nums">
                      {a.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card> */}

          <Card title="Top sector exposure">
            {SECTOR_EXPOSURE.map((s) => (
              <div
                key={s.label}
                className="flex justify-between py-1.5 text-[12px] border-b border-[var(--n-bg2)]"
              >
                <span className="text-[var(--n-txt2)]">{s.label}</span>
                <span className="text-[var(--n-txt)] tabular-nums">
                  {s.pct}%
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>
      <span className="text-[var(--n-txt3)] text-[12px]">
        You can increase, decrease, or retract anytime.
      </span>

      <div className="flex justify-between items-center pt-4 border-t border-[var(--n-bg3)]">
        <button
          className="bg-transparent border border-[var(--n-bg3)] text-[var(--n-txt2)] py-2.5 px-4 rounded-md text-[13px] cursor-pointer"
          onClick={onDismiss}
        >
          Dismiss
        </button>
        <button
          className="bg-[var(--n-accent)] border-0 text-[var(--n-bg)] py-2.5 px-4 rounded-md text-[13px] font-medium cursor-pointer"
          onClick={onExplore}
        >
          Explore theme →
        </button>
      </div>
    </div>
  );
}
