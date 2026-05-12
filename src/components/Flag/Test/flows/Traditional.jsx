import { useTestState } from "../TestStateContext";
import { CATALOG, findCatalog } from "../data/catalog";
import { DETAIL } from "../data/detail";
import { asciiBar, riskBar } from "../lib/ascii";
import {
  fmtPct,
  fmtPctSigned,
  fmtMoney,
  fmtAUM,
  getFreqLabel,
} from "../lib/format";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import { Button, SelectBox, BareInput } from "../components/ui";
import CatalogRow from "../components/CatalogRow";
import { useContainerSize } from "../lib/containerSize";
// ============================================================================
// Action config
// ============================================================================
export function getTraditionalActionConfig(state, stepId) {
  let disabled = false;
  let label = "[ CONTINUE > ]";

  if (stepId === "theme") disabled = !state.selectedTicker;
  if (stepId === "risk") disabled = !state.riskAccepted;
  if (stepId === "amount") disabled = state.amount < DETAIL.amount.minimum;
  if (stepId === "confirm") {
    disabled = !state.agreed;
    label = "[ SUBMIT INVESTMENT ]";
  }
  return { disabled, label };
}

// ============================================================================
// Step 01 · Theme
// ============================================================================
function ThemeScreen() {
  const { state, selectTicker } = useTestState();

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 01 OF 06</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Choose a thematic ETF
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Browse the available themes. Select one to review its holdings, risk
        profile, and fees before investing.
      </div>

      <div className={cn("flex justify-between mb-2", palette.mutedText)}>
        <span>{CATALOG.length} themes available</span>
        <SelectBox>
          <option>Sort: 1Y return</option>
          <option>Sort: AUM</option>
          <option>Sort: Fee</option>
        </SelectBox>
      </div>

      {CATALOG.map((etf) => (
        <CatalogRow
          key={etf.ticker}
          selected={state.selectedTicker === etf.ticker}
          onClick={() => selectTicker(etf.ticker)}
          ticker={etf.ticker}
          title={etf.name}
          subtitle={etf.theme}
          cells={[
            {
              label: "Risk",
              className: "w-[112px]",
              value: riskBar(etf.riskRating, 7),
            },
            {
              label: "1Y",
              className: "w-[72px]",
              value: fmtPctSigned(etf.oneYearReturn),
            },
            {
              label: "Fee",
              className: "w-[72px]",
              value: fmtPct(etf.expenseRatio),
            },
            {
              label: "AUM",
              className: "w-[72px]",
              value: fmtAUM(etf.aumUSD),
            },
          ]}
        />
      ))}
    </>
  );
}

// ============================================================================
// Step 02 · Holdings
// ============================================================================
function HoldingsScreen() {
  const { state } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const total = DETAIL.holdings.reduce((a, h) => a + h.weight, 0);

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 02 OF 06 · {etf.ticker}</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Review holdings and composition
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        {etf.name}. Review the top holdings, sector breakdown, and geographic
        exposure before continuing.
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
          <span>TOP 10 HOLDINGS</span>
          <span className={cn("font-normal", palette.mutedText)}>
            {fmtPct(total, 1)} of fund
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="border-collapse w-full min-w-[620px]">
            <thead>
              <tr>
                <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
                  #
                </th>
                <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
                  Holding
                </th>
                <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
                  Sector
                </th>
                <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
                  Weight
                </th>
                <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {DETAIL.holdings.map((h, i) => (
                <tr key={h.ticker}>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
                    {i + 1}
                  </td>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal", palette.border)}>
                    {h.name}{" "}
                    <span className={palette.mutedText}>({h.ticker})</span>
                    <br />
                    <span className={palette.mutedText}>{h.country}</span>
                  </td>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal", palette.border)}>
                    {h.sector}
                  </td>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
                    {asciiBar(h.weight * 5, 8)}
                  </td>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
                    {fmtPct(h.weight, 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
          <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
            <span>SECTORS</span>
          </div>
          <div className="overflow-x-auto">
            <table className="border-collapse w-full">
              <tbody>
                {DETAIL.sectorBreakdown.map((s) => (
                  <tr key={s.sector}>
                    <td className={cn("border px-2 py-1 text-left align-top font-normal", palette.border)}>
                      {s.sector}
                    </td>
                    <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
                      {asciiBar(s.weight, 14)}
                    </td>
                    <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
                      {fmtPct(s.weight, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
          <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
            <span>GEOGRAPHIC EXPOSURE</span>
          </div>
          <table className="border-collapse w-full">
            <tbody>
              {DETAIL.geographicExposure.map((g) => (
                <tr key={g.region}>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal", palette.border)}>
                    {g.region}
                  </td>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
                    {asciiBar(g.weight, 14)}
                  </td>
                  <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
                    {fmtPct(g.weight, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Step 03 · Risk
// ============================================================================
function RiskScreen() {
  const { state, setRiskAccepted } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const r = DETAIL.risk;
  const { isMobile } = useContainerSize();
  const riskMetrics = [
    {
      label: "Volatility (1Y est.)",
      value: `${fmtPct(r.volatility1Y.low, 0)} – ${fmtPct(r.volatility1Y.high, 0)}`,
    },
    {
      label: "Max drawdown (1Y est.)",
      value: `${fmtPct(r.maxDrawdown1Y.low, 0)} to ${fmtPct(r.maxDrawdown1Y.high, 0)}`,
    },
    { label: "Sharpe ratio (3Y)", value: r.sharpe3Y.toFixed(2) },
    { label: "Beta", value: r.beta.toFixed(2) },
    {
      label: "Worst regime",
      value: `${r.worstRegime.name}. ${r.worstRegime.note}`,
    },
    {
      label: "Best regime",
      value: `${r.bestRegime.name}. ${r.bestRegime.note}`,
    },
  ];
  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 03 OF 06 · {etf.ticker}</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Review the risk profile
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        {etf.name} is rated {r.rating} of {r.ratingScaleMax}. Review the metrics
        and confirm whether this matches your risk tolerance.
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
          <span>RISK RATING</span>
          <span className={cn("font-normal", palette.mutedText)}></span>
        </div>
        <div className="text-[14px] tracking-[2px]">
          {Array.from({ length: r.ratingScaleMax }, (_, i) => i + 1).map(
            (i, idx) => (
              <span key={i}>
                {i === r.rating ? (
                  <strong>[{i}]</strong>
                ) : (
                  <span>&nbsp;{i}&nbsp;</span>
                )}
                {idx < r.ratingScaleMax - 1 && !isMobile ? (
                  <span>&nbsp;&nbsp;</span>
                ) : null}
              </span>
            ),
          )}
        </div>
        <div className="mt-[10px]">
          <strong>{r.ratingLabel}.</strong> {r.suitability} Recommended time
          horizon {r.timeHorizonYears.min}–{r.timeHorizonYears.max} years.
        </div>
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
          <span>RISK METRICS</span>
        </div>
        <div
          className={cn(
            "mt-[10px]",
            isMobile
              ? "flex flex-col"
              : "grid grid-cols-[180px_1fr] gap-x-3 gap-y-1",
          )}
        >
          {riskMetrics.map((m, i) => (
            <div
              key={m.label}
              className={cn(
                isMobile
                  ? cn("py-1", i > 0 && cn("border-t border-dashed", palette.border))
                  : "contents",
              )}
            >
              <div className={palette.mutedText}>{m.label}</div>
              <div>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
          <span>DOES THIS MATCH YOUR RISK TOLERANCE?</span>
        </div>
        {r.suitabilityOptions.map((o) => {
          const sel = state.riskAccepted === o.id;
          return (
            <div
              key={o.id}
              className={cn(
                "py-1 cursor-pointer hover:underline",
                sel && "font-bold",
              )}
              onClick={() => setRiskAccepted(o.id)}
            >
              <span className="inline-block w-[28px] font-bold">
                {sel ? "(*)" : "( )"}
              </span>
              {o.text}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ============================================================================
// Step 04 · Fees
// ============================================================================
function FeesScreen() {
  const { state } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const f = DETAIL.fees;
  const diff = f.expenseRatio - f.categoryAvgExpenseRatio;
  const diffWord = diff >= 0 ? "higher" : "lower";

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 04 OF 06 · {etf.ticker}</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Review fees and costs
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Total annual cost is {fmtPct(f.expenseRatio)} of assets invested. Review
        the breakdown before continuing.
      </div>

      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
              Line item
            </th>
            <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
              Rate
            </th>
            <th className={cn("border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]", palette.border)}>
              Cost / $10k
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cn("border px-2 py-1 text-left align-top font-normal", palette.border)}>
              Management fee
              <br />
              <span className={palette.mutedText}>
                Paid to the fund manager.
              </span>
            </td>
            <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
              {fmtPct(f.managementFee)}
            </td>
            <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
              {fmtMoney(f.managementFee * 10000)}
            </td>
          </tr>
          <tr>
            <td className={cn("border px-2 py-1 text-left align-top font-normal", palette.border)}>
              Other costs
              <br />
              <span className={palette.mutedText}>
                Custody, administration, trading costs.
              </span>
            </td>
            <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
              {fmtPct(f.otherCosts)}
            </td>
            <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
              {fmtMoney(f.otherCosts * 10000)}
            </td>
          </tr>
          <tr className="font-bold">
            <td className={cn("border px-2 py-1 text-left align-top font-normal", palette.border)}>
              TOTAL ANNUAL COST
              <br />
              <span className={cn("font-normal", palette.mutedText)}>
                Total expense ratio.
              </span>
            </td>
            <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
              {fmtPct(f.expenseRatio)}
            </td>
            <td className={cn("border px-2 py-1 text-left align-top font-normal text-right whitespace-nowrap", palette.border)}>
              {fmtMoney(f.expenseRatio * 10000)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className={cn("border-dashed border p-[10px_12px] mb-[10px] mt-3", palette.border)}>
        Category average expense ratio is {fmtPct(f.categoryAvgExpenseRatio)}.
        This fund is {Math.abs(diff * 100).toFixed(2)} percentage points{" "}
        {diffWord} than the category average.
      </div>
      <div className={cn("border-dashed border p-[10px_12px] mb-[10px]", palette.border)}>
        Projected fee cost on {fmtMoney(10000)} invested over 10 years, assuming
        the position is held throughout: approximately{" "}
        {fmtMoney(f.tenYearCostOn10kUSD)}.
      </div>
    </>
  );
}

// ============================================================================
// Step 05 · Amount
// ============================================================================
function AmountScreen() {
  const { state, setAmount, setFrequency } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const a = DETAIL.amount;
  const belowMin = state.amount < a.minimum;

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 05 OF 06 · {etf.ticker}</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        How much would you like to invest?
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Choose your initial amount and contribution frequency. Minimum
        investment is {fmtMoney(a.minimum, a.currency)}.
      </div>

      <div className="flex items-baseline gap-2 mb-[14px]">
        <span className="text-[22px]">$</span>
        <BareInput
          type="number"
          value={state.amount}
          min={a.minimum}
          max={a.maximum}
          onChange={(e) => setAmount(Number(e.target.value) || 0)}
        />
        <span className={palette.mutedText}>
          {a.currency}
          {state.frequency === "one-time"
            ? ""
            : " / " + getFreqLabel(state.frequency).toLowerCase()}
        </span>
      </div>

      <div className="flex flex-wrap gap-[6px] mb-[14px]">
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

      <div className={cn("mb-1 mt-[14px]", palette.mutedText)}>FREQUENCY</div>
      <div className="flex flex-wrap gap-[6px] mt-1">
        {a.frequencies.map((f) => (
          <Button
            key={f.id}
            active={state.frequency === f.id}
            onClick={() => setFrequency(f.id)}
          >
            [{f.label}]
          </Button>
        ))}
      </div>

      <div className={cn("mt-[14px]", palette.mutedText)}>
        Minimum {fmtMoney(a.minimum, a.currency)} · Maximum{" "}
        {fmtMoney(a.maximum, a.currency)} per transaction
      </div>
      {belowMin ? (
        <div className="mt-1 font-bold">
          !! Amount is below the {fmtMoney(a.minimum, a.currency)} minimum.
        </div>
      ) : null}
    </>
  );
}

// ============================================================================
// Step 06 · Confirm
// ============================================================================
function ConfirmScreen() {
  const { state, toggleAgreed } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const c = DETAIL.amount.currency;
  const annualEquiv =
    state.frequency === "one-time"
      ? state.amount
      : state.frequency === "monthly"
        ? state.amount * 12
        : state.frequency === "weekly"
          ? state.amount * 52
          : state.amount * 4;
  const annualFee = annualEquiv * DETAIL.fees.expenseRatio;

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 06 OF 06 · {etf.ticker}</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Review and confirm
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Review the summary below. Confirm you have read the disclosure, then
        submit.
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Theme</div>
          <div>{etf.name}</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Ticker</div>
          <div>{etf.ticker}</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1 font-bold text-[14px]", palette.border)}>
          <div className={palette.mutedText}>Amount</div>
          <div>
            {fmtMoney(state.amount, c)}{" "}
            {state.frequency === "one-time"
              ? ""
              : "/ " + getFreqLabel(state.frequency).toLowerCase()}
          </div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Risk profile</div>
          <div>
            {DETAIL.risk.ratingLabel} ({DETAIL.risk.rating}/
            {DETAIL.risk.ratingScaleMax}) · {DETAIL.risk.timeHorizonYears.min}–
            {DETAIL.risk.timeHorizonYears.max}Y horizon
          </div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Total annual cost</div>
          <div>
            {fmtPct(DETAIL.fees.expenseRatio)} (≈ {fmtMoney(annualFee, c)} /
            year on {fmtMoney(annualEquiv, c)} annualized)
          </div>
        </div>
      </div>

      <div className={cn("border p-[10px_12px] max-h-[160px] overflow-y-auto mb-[10px]", palette.border)}>
        {DETAIL.disclosure.bullets.map((b, i) => (
          <p key={i} className={i > 0 ? "mt-[6px]" : ""}>
            · {b}
          </p>
        ))}
      </div>

      <div
        className="py-1 cursor-pointer hover:underline font-normal"
        onClick={toggleAgreed}
      >
        <span className="inline-block w-[28px] font-bold">
          {state.agreed ? "[X]" : "[ ]"}
        </span>
        I have read and understood the fund prospectus, risk disclosure, and
        platform terms, and I am committing capital under my own responsibility.
      </div>
    </>
  );
}

// ============================================================================
// Flow dispatcher
// ============================================================================
const SCREENS = {
  theme: ThemeScreen,
  holdings: HoldingsScreen,
  risk: RiskScreen,
  fees: FeesScreen,
  amount: AmountScreen,
  confirm: ConfirmScreen,
};

export default function TraditionalFlow({ stepId }) {
  const Screen = SCREENS[stepId];
  return Screen ? <Screen /> : null;
}
