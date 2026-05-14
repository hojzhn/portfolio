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
  getAccountLabel,
} from "../lib/format";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import { useContainerSize } from "../lib/containerSize";
import {
  Button,
  SelectBox,
  BareInput,
  Box,
  BoxHead,
  Eyebrow,
  ScreenTitle,
  ScreenSub,
  PresetRow,
  OptionRow,
  OptionSymbol,
  Table,
  Th,
  Td,
} from "../components/ui";
import CatalogRow from "../components/CatalogRow";
import MetaRows from "../components/MetaRows";

// ============================================================================
// Action config
// ============================================================================
export function getTraditionalActionConfig(state, stepId) {
  let disabled = false;
  let label = "[ CONTINUE > ]";

  if (stepId === "browse") disabled = !state.selectedTicker;
  if (stepId === "risk") disabled = !state.riskAccepted;
  if (stepId === "amount") disabled = state.amount < DETAIL.amount.minimum;
  if (stepId === "confirm") {
    disabled = !state.agreed;
    label = "[ SUBMIT INVESTMENT ]";
  }
  return { disabled, label };
}

// ============================================================================
// Step 01 · Browse baskets
// ============================================================================
function BrowseScreen() {
  const { state, selectTicker } = useTestState();

  return (
    <>
      <Eyebrow>STEP 01 OF 06</Eyebrow>
      <ScreenTitle>Select an investment</ScreenTitle>
      <ScreenSub>
        Browse professionally managed thematic baskets. Each basket is a curated
        set of underlying holdings managed by a registered investment advisor
        according to a stated mandate.
      </ScreenSub>

      <div className={cn("flex justify-between mb-2", palette.mutedText)}>
        <span>{CATALOG.length} funds available</span>
        <SelectBox>
          <option>Sort: 3Y return</option>
          <option>Sort: 1Y return</option>
          <option>Sort: AUM</option>
          <option>Sort: Fee</option>
        </SelectBox>
      </div>

      {CATALOG.map((b) => (
        <CatalogRow
          key={b.ticker}
          selected={state.selectedTicker === b.ticker}
          onClick={() => selectTicker(b.ticker)}
          ticker={b.ticker}
          title={b.name}
          subtitle={`${b.manager} · ${b.category} · Inception ${b.inception}`}
          cells={[
            {
              label: "Risk",
              className: "w-[112px]",
              value: riskBar(b.riskRating, 7),
            },
            {
              label: "1Y / 3Y",
              className: "w-[80px]",
              value: (
                <>
                  <div>{fmtPctSigned(b.oneYearReturn)}</div>
                  <div className={palette.mutedText}>
                    {fmtPctSigned(b.threeYearReturn)}
                  </div>
                </>
              ),
            },
            {
              label: "Fee",
              className: "w-[64px]",
              value: fmtPct(b.expenseRatio),
            },
            {
              label: "AUM",
              className: "w-[72px]",
              value: fmtAUM(b.aumUSD),
            },
          ]}
        />
      ))}

      <div
        className={cn(
          "text-[11px] mt-3 pt-2 border-t border-dashed",
          palette.border,
          palette.mutedText,
        )}
      >
        Returns are annualized over the stated period and net of fees. Past
        performance is not a reliable indicator of future results.
      </div>
    </>
  );
}

// ============================================================================
// Step 02 · Composition
// ============================================================================
function CompositionScreen() {
  const { state } = useTestState();
  const b = findCatalog(state.selectedTicker);
  const { isMobile } = useContainerSize();
  if (!b) return null;

  const topWeight = b.topHoldings.reduce((acc, h) => acc + h.weight, 0);

  return (
    <>
      <Eyebrow>STEP 02 OF 06 · {b.ticker}</Eyebrow>
      <ScreenTitle>Review composition</ScreenTitle>
      <ScreenSub>
        {b.name} holds {b.holdingsCount} underlying securities. Review the top
        holdings and sector breakdown before continuing.
      </ScreenSub>

      <Box>
        <BoxHead meta={`${fmtPct(topWeight, 1)} of ${b.holdingsCount} total`}>
          TOP {b.topHoldings.length} HOLDINGS
        </BoxHead>
        <div className="overflow-x-auto">
          <Table className="min-w-[520px]">
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Holding</Th>
                <Th>Sector</Th>
                <Th>Weight</Th>
                <Th>Weight</Th>
              </tr>
            </thead>
            <tbody>
              {b.topHoldings.map((h, i) => (
                <tr key={h.ticker}>
                  <Td numeric>{i + 1}</Td>
                  <Td>
                    {h.name}{" "}
                    <span className={palette.mutedText}>({h.ticker})</span>
                  </Td>
                  <Td>{h.sector}</Td>
                  <Td numeric>{asciiBar(h.weight * 5, 8)}</Td>
                  <Td numeric>{fmtPct(h.weight, 1)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Box>

      <div
        className={`grid grid-cols-1 ${isMobile ? "" : "grid-cols-2"} gap-[10px]`}
      >
        <Box>
          <BoxHead>SECTORS</BoxHead>
          <Table>
            <tbody>
              {b.sectors.map((s) => (
                <tr key={s.sector}>
                  <Td>{s.sector}</Td>
                  <Td numeric>{asciiBar(s.weight, 14)}</Td>
                  <Td numeric>{fmtPct(s.weight, 0)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>

        <Box>
          <BoxHead>ASSET CLASSES</BoxHead>
          <Table>
            <tbody>
              {b.typicalExposure.map((e) => (
                <tr key={e.class}>
                  <Td>{e.class}</Td>
                  <Td numeric>{asciiBar(e.weight, 14)}</Td>
                  <Td numeric>{fmtPct(e.weight, 0)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </div>

      <div className={cn("text-[11px] mt-3", palette.mutedText)}>
        Holdings are reviewed and rebalanced quarterly per the basket's mandate.
        Composition is subject to change.
      </div>
    </>
  );
}

// ============================================================================
// Step 03 · Risk
// ============================================================================
function RiskScreen() {
  const { state, setRiskAccepted } = useTestState();
  const { isMobile } = useContainerSize();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const r = DETAIL.risk;

  return (
    <>
      <Eyebrow>STEP 03 OF 06 · {b.ticker}</Eyebrow>
      <ScreenTitle>Review the risk profile</ScreenTitle>
      <ScreenSub>
        {b.name} is rated {b.riskRating} of {r.ratingScaleMax}. Review the
        metrics and confirm whether this matches your tolerance and time
        horizon.
      </ScreenSub>

      <Box>
        <BoxHead meta={`Scale 1 (lowest) – ${r.ratingScaleMax} (highest)`}>
          RISK RATING
        </BoxHead>
        <div className="text-[14px] tracking-[2px]">
          {Array.from({ length: r.ratingScaleMax }, (_, i) => i + 1).map(
            (i, idx) => (
              <span key={i}>
                {i === b.riskRating ? (
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
        <div className={cn("flex justify-between mt-[6px]", palette.mutedText)}>
          <span>Lower risk · lower return</span>
          <span>Higher risk · higher return</span>
        </div>
        <div className="mt-[10px]">
          <strong>{r.ratingLabel}.</strong> {r.suitability} Recommended time
          horizon {r.timeHorizonYears.min}–{r.timeHorizonYears.max} years.
        </div>
      </Box>

      <Box>
        <BoxHead>RISK METRICS</BoxHead>
        <MetaRows
          rows={[
            {
              label: "Volatility (1Y est.)",
              value: `${fmtPct(r.volatility1Y.low, 0)} – ${fmtPct(r.volatility1Y.high, 0)}`,
            },
            {
              label: "Max drawdown (1Y est.)",
              value: `${fmtPct(r.maxDrawdown1Y.low, 0)} to ${fmtPct(r.maxDrawdown1Y.high, 0)}`,
            },
            {
              label: "Sharpe ratio (3Y)",
              value: r.sharpe3Y.toFixed(2),
            },
            {
              label: "Beta vs S&P 500",
              value: r.beta.toFixed(2),
            },
            {
              label: "Worst regime",
              value: `${r.worstRegime.name}. ${r.worstRegime.note}`,
            },
            {
              label: "Best regime",
              value: `${r.bestRegime.name}. ${r.bestRegime.note}`,
            },
          ]}
        />
      </Box>

      <Box>
        <BoxHead>DOES THIS MATCH YOUR RISK TOLERANCE?</BoxHead>
        {r.suitabilityOptions.map((o) => {
          const sel = state.riskAccepted === o.id;
          return (
            <OptionRow
              key={o.id}
              selected={sel}
              onClick={() => setRiskAccepted(o.id)}
            >
              <OptionSymbol>{sel ? "(*)" : "( )"}</OptionSymbol>
              {o.text}
            </OptionRow>
          );
        })}
      </Box>
    </>
  );
}

// ============================================================================
// Step 04 · Fees
// ============================================================================
function FeesScreen() {
  const { state } = useTestState();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const f = DETAIL.fees;
  // Apportion the basket's expense ratio across line items so totals reconcile.
  const er = b.expenseRatio;
  const mgmt = er * (f.managementFee / f.expenseRatio);
  const dist = er * (f.distributionFee / f.expenseRatio);
  const other = er - mgmt - dist;
  const diff = er - f.categoryAvgExpenseRatio;
  const diffWord = diff >= 0 ? "higher" : "lower";
  const tenYearCost = Math.round(er * 10000 * 10);

  return (
    <>
      <Eyebrow>STEP 04 OF 06 · {b.ticker}</Eyebrow>
      <ScreenTitle>Review fees and costs</ScreenTitle>
      <ScreenSub>
        Total annual operating cost of this basket is {fmtPct(er)} of assets
        invested. Review the breakdown before continuing.
      </ScreenSub>

      <div className="overflow-x-auto">
        <Table className="">
          <thead>
            <tr>
              <Th>Line item</Th>
              <Th>Rate</Th>
              <Th>Cost / $10k</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>
                Management fee
                <br />
                <span className={palette.mutedText}>
                  Paid to the investment advisor.
                </span>
              </Td>
              <Td numeric>{fmtPct(mgmt)}</Td>
              <Td numeric>{fmtMoney(mgmt * 10000)}</Td>
            </tr>
            <tr>
              <Td>
                Distribution and service fee (12b-1)
                <br />
                <span className={palette.mutedText}>
                  Marketing, distribution, shareholder services.
                </span>
              </Td>
              <Td numeric>{fmtPct(dist)}</Td>
              <Td numeric>{fmtMoney(dist * 10000)}</Td>
            </tr>
            <tr>
              <Td>
                Other expenses
                <br />
                <span className={palette.mutedText}>
                  Custody, administration, audit, transfer agent.
                </span>
              </Td>
              <Td numeric>{fmtPct(other)}</Td>
              <Td numeric>{fmtMoney(other * 10000)}</Td>
            </tr>
            <tr className="font-bold">
              <Td>
                TOTAL ANNUAL COST
                <br />
                <span className={cn("font-normal", palette.mutedText)}>
                  Total expense ratio.
                </span>
              </Td>
              <Td numeric>{fmtPct(er)}</Td>
              <Td numeric>{fmtMoney(er * 10000)}</Td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Box dashed className="mt-3">
        <strong>Front-end sales load:</strong> None.{" "}
        <strong>Redemption fee:</strong> None.{" "}
        <strong>Minimum holding period:</strong> None.
      </Box>

      <Box dashed>
        Category average expense ratio is {fmtPct(f.categoryAvgExpenseRatio)}.
        This basket is {Math.abs(diff * 100).toFixed(2)} percentage points{" "}
        {diffWord} than the category average.
      </Box>

      <Box dashed>
        Projected 10-year fee cost on {fmtMoney(10000)} invested, assuming the
        position is held throughout: approximately {fmtMoney(tenYearCost)}.
      </Box>
    </>
  );
}

// ============================================================================
// Step 05 · Amount and account
// ============================================================================
function AmountScreen() {
  const { state, setAmount, setFrequency, setAccountType } = useTestState();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const a = DETAIL.amount;
  const belowMin = state.amount < a.minimum;

  return (
    <>
      <Eyebrow>STEP 05 OF 06 · {b.ticker}</Eyebrow>
      <ScreenTitle>Set amount and account</ScreenTitle>
      <ScreenSub>
        Choose your investment amount, contribution frequency, and the account
        this investment should be placed in. Minimum investment is{" "}
        {fmtMoney(a.minimum, a.currency)}.
      </ScreenSub>

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

      <PresetRow className="mb-[14px]">
        {a.presets.map((v) => (
          <Button
            key={v}
            active={state.amount === v}
            onClick={() => setAmount(v)}
          >
            [{fmtMoney(v, a.currency)}]
          </Button>
        ))}
      </PresetRow>

      <Eyebrow className="mt-[14px]">FREQUENCY</Eyebrow>
      <PresetRow className="mt-1 mb-[18px]">
        {a.frequencies.map((f) => (
          <Button
            key={f.id}
            active={state.frequency === f.id}
            onClick={() => setFrequency(f.id)}
          >
            [{f.label}]
          </Button>
        ))}
      </PresetRow>

      <Box>
        <BoxHead>ACCOUNT TYPE</BoxHead>
        {a.accountTypes.map((acc) => {
          const sel = state.accountType === acc.id;
          return (
            <OptionRow
              key={acc.id}
              selected={sel}
              onClick={() => setAccountType(acc.id)}
            >
              <OptionSymbol>{sel ? "(*)" : "( )"}</OptionSymbol>
              {acc.label}
            </OptionRow>
          );
        })}
      </Box>

      <Box>
        <BoxHead>FUNDING SOURCE</BoxHead>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span>Linked bank account · Chase ****4521</span>
          <Button>[ CHANGE ]</Button>
        </div>
        <div className={cn("mt-[6px] text-[11.5px]", palette.mutedText)}>
          Settlement typically occurs T+2 (two business days). The investment
          will appear in your account once settled.
        </div>
      </Box>

      <div className={cn("mt-[14px]", palette.mutedText)}>
        Minimum {fmtMoney(a.minimum, a.currency)} · Maximum{" "}
        {fmtMoney(a.maximum, a.currency)} per transaction · Settlement T+2
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
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const c = DETAIL.amount.currency;
  const annualEquiv =
    state.frequency === "one-time"
      ? state.amount
      : state.frequency === "monthly"
        ? state.amount * 12
        : state.frequency === "weekly"
          ? state.amount * 52
          : state.amount * 4;
  const annualFee = annualEquiv * b.expenseRatio;

  return (
    <>
      <Eyebrow>STEP 06 OF 06 · {b.ticker}</Eyebrow>
      <ScreenTitle>Review and confirm</ScreenTitle>
      <ScreenSub>
        Review the summary below. Confirm you have read the disclosure, then
        submit.
      </ScreenSub>

      <Box>
        <MetaRows
          divided
          keyWidth="160px"
          rows={[
            { label: "Basket", value: `${b.name} (${b.ticker})` },
            { label: "Manager", value: b.manager },
            { label: "Account", value: getAccountLabel(state.accountType) },
            {
              label: "Amount",
              bold: true,
              value: `${fmtMoney(state.amount, c)}${
                state.frequency === "one-time"
                  ? ""
                  : ` / ${getFreqLabel(state.frequency).toLowerCase()}`
              }`,
            },
            {
              label: "Risk profile",
              value: `${DETAIL.risk.ratingLabel} (${b.riskRating}/${DETAIL.risk.ratingScaleMax}) · ${DETAIL.risk.timeHorizonYears.min}–${DETAIL.risk.timeHorizonYears.max}Y horizon`,
            },
            {
              label: "Total annual cost",
              value: `${fmtPct(b.expenseRatio)} (≈ ${fmtMoney(annualFee, c)} / year on ${fmtMoney(annualEquiv, c)} annualized)`,
            },
            { label: "Settlement", value: "T+2 (two business days)" },
          ]}
        />
      </Box>

      <div
        className={cn(
          "border p-[10px_12px] max-h-[160px] overflow-y-auto mb-[10px]",
          palette.border,
        )}
      >
        {DETAIL.disclosure.bullets.map((bullet, i) => (
          <p key={i} className={i > 0 ? "mt-[6px]" : ""}>
            · {bullet}
          </p>
        ))}
      </div>

      <OptionRow onClick={toggleAgreed} className="font-normal">
        <OptionSymbol>{state.agreed ? "[X]" : "[ ]"}</OptionSymbol>I have read
        and understood the basket prospectus, risk disclosure, and platform
        terms, and I am committing capital under my own responsibility.
      </OptionRow>
    </>
  );
}

// ============================================================================
// Flow dispatcher
// ============================================================================
const SCREENS = {
  browse: BrowseScreen,
  composition: CompositionScreen,
  risk: RiskScreen,
  fees: FeesScreen,
  amount: AmountScreen,
  confirm: ConfirmScreen,
};

export default function TraditionalFlow({ stepId }) {
  const Screen = SCREENS[stepId];
  return Screen ? <Screen /> : null;
}
