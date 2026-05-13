import { useRef } from "react";
import { useTestState } from "../TestStateContext";
import { CATALOG, findCatalog } from "../data/catalog";
import { DETAIL } from "../data/detail";
import { asciiBar } from "../lib/ascii";
import { fmtPct, fmtMoney } from "../lib/format";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import { Button, SelectBox, BareInput } from "../components/ui";
import CatalogRow from "../components/CatalogRow";
import KeyStatsGrid from "../components/KeyStatsGrid";
import MetaRows from "../components/MetaRows";
import { useContainerSize } from "../lib/containerSize";
// ============================================================================
// Action config
// ============================================================================
export function getRedesignActionConfig(state, stepId) {
  let disabled = false;
  let label = "[ CONTINUE > ]";

  if (stepId === "discover") {
    disabled = !state.selectedTicker;
    label = state.selectedTicker ? "[ SET LEVEL > ]" : "[ CHOOSE A THEME ]";
  }
  if (stepId === "setLevel") {
    disabled = state.amount < DETAIL.amount.minimum;
    label = "[ REVIEW STANDING > ]";
  }
  if (stepId === "confirm") {
    disabled = !state.agreed;
    label = `[ COMMIT ${fmtMoney(state.amount, DETAIL.amount.currency)}/MO ]`;
  }
  return { disabled, label };
}

// ============================================================================
// Step 01 · Discover
// ============================================================================
function DiscoverScreen() {
  const { state, selectTicker } = useTestState();
  const { isMobile } = useContainerSize();
  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 01 OF 03</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Available options
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Each theme is selected based on signal strength against your own
        engagement history. Select the view you would back.
      </div>

      <div
        className={
          cn(isMobile ? "flex-col justify-end" : "flex justify-between") +
          " " +
          cn("mb-2", palette.mutedText)
        }
      >
        <div className={`${isMobile && "text-right mb-2"}`}>
          Last updated 10:42 AM
        </div>
        <div className="flex justify-end">
          <SelectBox>
            <option>Sort: Signal strength</option>
            <option>Sort: Momentum 90d</option>
          </SelectBox>
        </div>
      </div>

      {CATALOG.map((etf) => {
        const sel = state.selectedTicker === etf.ticker;
        const expLegend = etf.typicalExposure
          .map((s) => `${s.class.slice(0, 3)} ${Math.round(s.weight * 100)}%`)
          .join(" · ");
        const expBar = etf.typicalExposure
          .map((s) => "#".repeat(Math.round(s.weight * 20)))
          .join("");
        const sigBar = asciiBar(etf.signalStrength.score / 100, 10);

        return (
          <CatalogRow
            key={etf.ticker}
            selected={sel}
            onClick={() => selectTicker(etf.ticker)}
            ticker={etf.ticker}
            title={<strong>{etf.themeShort}</strong>}
            subtitle={etf.theme}
            cells={[
              {
                label: "Signal",
                className: "w-[104px]",
                value: (
                  <>
                    <div>
                      {etf.signalStrength.score}({etf.signalStrength.level})
                    </div>
                  </>
                ),
              },
              {
                label: "Momentum 90d",
                className: "w-[112px]",
                value: (
                  <>
                    <div>
                      <strong>+{etf.momentum90d.multiplier.toFixed(1)}×</strong>
                    </div>
                  </>
                ),
              },

              {
                label: "Engagement",
                className: "w-[128px]",
                value: (
                  <>
                    <div>
                      {etf.userEngagement.researches +
                        etf.userEngagement.watchlists +
                        etf.userEngagement.revisits}{" "}
                    </div>
                  </>
                ),
              },
            ]}
          />
        );
      })}
    </>
  );
}

// ============================================================================
// Step 02 · Set Level
// ============================================================================
function SetLevelScreen() {
  const { state, setAmount } = useTestState();
  const sliderRef = useRef(null);
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const a = DETAIL.amount;
  const d = DETAIL;
  const sliderPct = (state.amount - a.minimum) / (a.maximum - a.minimum);
  const currentPct = d.portfolioImpact.currentExposure * 100;
  const postPct = d.portfolioImpact.postCommitExposure * 100;
  const delta = postPct - currentPct;

  const handleSliderClick = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const v = Math.round(a.minimum + (a.maximum - a.minimum) * pct);
    setAmount(Math.max(a.minimum, Math.min(a.maximum, v)));
  };

  const { isMobile } = useContainerSize();

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>
        STEP 02 OF 03 · {etf.ticker}
      </div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Set the level
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Choose how much to back this view at.
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-4 border p-[14px]",
          palette.border,
          !isMobile && "grid-cols-2",
        )}
      >
        <div className={cn(palette.border, !isMobile && "border-r pr-4")}>
          <div className="font-bold mb-2">SET MONTHLY EXPOSURE</div>

          <div className="flex items-baseline gap-2">
            <span className="text-[22px]">$</span>
            <BareInput
              type="number"
              value={state.amount}
              min={a.minimum}
              max={a.maximum}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
            <span className={palette.mutedText}>/mo</span>
          </div>

          <div className="flex flex-wrap gap-[6px] mt-[14px]">
            {a.presets.map((v) => (
              <Button
                key={v}
                active={state.amount === v}
                onClick={() => setAmount(v)}
              >
                [{fmtMoney(v, a.currency)}]
              </Button>
            ))}
          </div>

          <MetaRows
            className="mt-[10px]"
            rows={[
              { label: "Deployment cadence", value: d.deploymentCadence },
              {
                label: "Estimated annual fee",
                value: fmtPct(d.fees.expenseRatio),
              },
              { label: "Risk profile", value: d.risk.ratingLabel },
              {
                label: "Time horizon",
                value: `${d.risk.timeHorizonYears.min}–${d.risk.timeHorizonYears.max} years`,
              },
              { label: "Region", value: d.region },
            ]}
          />
        </div>

        <div className={!isMobile ? "pl-4" : undefined}>
          <div
            className={cn(
              "flex justify-between font-bold mb-2",
              isMobile && cn("border-t pt-[10px]", palette.border),
            )}
          >
            <span>ALLOCATION</span>
            <span>{fmtMoney(state.amount, a.currency)}/mo</span>
          </div>

          {d.assetAllocation.map((seg) => {
            const dollars = state.amount * seg.weight;
            return (
              <div
                key={seg.class}
                className="flex flex-row items-center gap-2 justify-between py-[2px]"
              >
                <div>{seg.class}</div>
                <div className="flex flex-row gap-4">
                  <div className="">{Math.round(seg.weight * 100)}%</div>
                  <div className="text-right">
                    +{fmtMoney(dollars, a.currency)}/mo
                  </div>
                </div>
              </div>
            );
          })}

          <div className={cn("border-t mt-3 pt-[10px]", palette.border)}>
            <div className="flex justify-between items-baseline font-bold mb-[6px]">
              <span>Theme exposure after commit</span>
            </div>
            <div>
              <span className="text-[16px]">
                {currentPct.toFixed(0)}% → {postPct.toFixed(0)}%
              </span>{" "}
              <span>[+{delta.toFixed(0)} PP]</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border p-[10px_12px] mb-[10px] mt-[10px]",
          palette.border,
        )}
      >
        <div
          className={cn(
            "-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]",
            palette.border,
          )}
        >
          <span>DETAILS</span>
        </div>

        <div className="font-bold mb-[6px]">RISK PROFILE</div>
        <KeyStatsGrid
          stats={[
            {
              label: "Volatility (1Y est.)",
              value: `${fmtPct(d.risk.volatility1Y.low, 0)} – ${fmtPct(d.risk.volatility1Y.high, 0)}`,
            },
            {
              label: "Max drawdown (1Y est.)",
              value: `${fmtPct(d.risk.maxDrawdown1Y.low, 0)} to ${fmtPct(d.risk.maxDrawdown1Y.high, 0)}`,
            },
            { label: "Worst regime", value: d.risk.worstRegime.name },
            { label: "Strongest regime", value: d.risk.bestRegime.name },
          ]}
        />

        <div className="font-bold mt-[14px]">KEY SENSITIVITIES</div>
        <div className={cn("mt-[2px]", palette.mutedText)}>
          These factors could negatively impact the performance of this
          exposure.
        </div>
        <div
          className={`grid grid-cols-1 ${isMobile ? "" : "grid-cols-2"} gap-2 mt-2`}
        >
          {d.keySensitivities.map((s) => (
            <div
              key={s.name}
              className={cn("border p-[8px_10px]", palette.border)}
            >
              <div className="font-bold">{s.name}</div>
              <div className={cn("mt-[2px]", palette.mutedText)}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn("py-[10px]", palette.mutedText)}>
        {d.disclosure.shortNote}
      </div>
    </>
  );
}

// ============================================================================
// Step 03 · Confirm Standing
// ============================================================================
function ConfirmScreen() {
  const { state, toggleAgreed } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const d = DETAIL;
  const a = d.amount;
  const c = a.currency;
  const currentPct = d.portfolioImpact.currentExposure * 100;
  const postPct = d.portfolioImpact.postCommitExposure * 100;
  const annualEquiv = state.amount * 12;
  const annualFee = annualEquiv * d.fees.expenseRatio;

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>
        STEP 03 OF 03 · {etf.ticker}
      </div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Confirm standing
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Review what you are backing and at what level. The standing forms when
        you commit and can be adjusted anytime.
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div
          className={cn(
            "-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]",
            palette.border,
          )}
        >
          <span>YOUR STANDING</span>
        </div>
        <MetaRows
          divided
          rows={[
            { label: "Theme", value: etf.themeShort },
            {
              label: "Level",
              bold: true,
              value: `${fmtMoney(state.amount, c)} per month`,
            },
            { label: "Cadence", value: d.deploymentCadence },
            {
              label: "Risk profile",
              value: `${d.risk.ratingLabel} (${d.risk.rating}/${d.risk.ratingScaleMax}) · ${d.risk.timeHorizonYears.min}–${d.risk.timeHorizonYears.max}Y horizon`,
            },
            {
              label: "Portfolio impact",
              value: `${currentPct.toFixed(0)}% → ${postPct.toFixed(0)}% exposure to this theme`,
            },
            {
              label: "Annual fee",
              value: `${fmtPct(d.fees.expenseRatio)} (≈ ${fmtMoney(annualFee, c)} / year on ${fmtMoney(annualEquiv, c)} annualized)`,
            },
          ]}
        />
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div
          className={cn(
            "-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]",
            palette.border,
          )}
        >
          <span>WHAT YOU SHOULD KNOW</span>
        </div>
        <div>
          This standing carries risk. Estimated volatility{" "}
          {fmtPct(d.risk.volatility1Y.low, 0)} –{" "}
          {fmtPct(d.risk.volatility1Y.high, 0)} over a year, with potential
          drawdown of {fmtPct(d.risk.maxDrawdown1Y.low, 0)} to{" "}
          {fmtPct(d.risk.maxDrawdown1Y.high, 0)}. The standing performs worst in
          risk-off regimes when USD strength compounds losses. Past performance
          is not a reliable indicator of future results.
        </div>
        <div className="mt-[10px]">
          You can adjust, pause, or retract this standing at any time from your
          standings view. No exit fees or holding periods apply.
        </div>
      </div>

      <div
        className="py-1 cursor-pointer hover:underline font-normal mt-[10px]"
        onClick={toggleAgreed}
      >
        <span className="inline-block w-[28px] font-bold">
          {state.agreed ? "[X]" : "[ ]"}
        </span>
        I have reviewed the risk profile and key sensitivities. I am backing
        this view under my own judgment.
      </div>
    </>
  );
}

// ============================================================================
// Flow dispatcher
// ============================================================================
const SCREENS = {
  discover: DiscoverScreen,
  setLevel: SetLevelScreen,
  confirm: ConfirmScreen,
};

export default function RedesignFlow({ stepId }) {
  const Screen = SCREENS[stepId];
  return Screen ? <Screen /> : null;
}
