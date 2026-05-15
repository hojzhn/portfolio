// Redesign flow. Standing-with-a-view frame.
//
// Three screens (IDs match the existing flows.js entries for arm B):
//   01 · discover · stacked claim cards, one view per band
//   02 · setLevel · claim anchor, case for / case against, support question
//   03 · confirm  · claim anchor, quiet standing summary
//
// Vocabulary is held constant with the other two arms so compliance posture
// does not change. The reframe is sequence, weight, and composition. The
// claim sentence is the user's anchor and appears at the same weight on
// every screen it touches.
//
// Per-view content not in catalog.js (the claim sentence and the contrary
// news items) lives in a local VIEWS map keyed by ticker. Keeping this
// inline rather than in catalog.js so the Redesign arm can iterate without
// touching the other two arms. Move to catalog.js after the test if the
// frame holds.

import { useTestState } from "../TestStateContext";
import { CATALOG, findCatalog } from "../data/catalog";
import { DETAIL } from "../data/detail";
import { fmtPct, fmtMoney, fmtMoneyDec } from "../lib/format";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import {
  Button,
  BareInput,
  Box,
  BoxHead,
  Eyebrow,
  OptionRow,
  OptionSymbol,
  PresetRow,
} from "../components/ui";
import MetaRows from "../components/MetaRows";

// ============================================================================
// Per-view content not in catalog.js. Keyed by ticker.
//   claim         · full thesis sentence, used as the persistent anchor.
//   contraryNews  · counter-signals rendered as the "case against" alongside
//                   the existing basket.news (the "case for").
// ============================================================================
const VIEWS = {
  EMCG: {
    claim:
      "Rising incomes and digital adoption across emerging markets will reshape consumer spending over the next decade.",
    contraryNews: [
      {
        date: "Today",
        source: "FT",
        headline: "EM consumer credit defaults climb above pre-2020 levels",
      },
      {
        date: "Yesterday",
        source: "Bloomberg",
        headline: "USD strength compresses dollar-translated EM earnings",
      },
      {
        date: "3 days ago",
        source: "Reuters",
        headline:
          "China property drag spills into discretionary spend across the region",
      },
    ],
  },
  AIIE: {
    claim:
      "Compute, chips, power, and data-center buildout will keep absorbing capital faster than the market expects through 2027.",
    contraryNews: [
      {
        date: "Today",
        source: "FT",
        headline:
          "Goldman analysts question AI capex ROI beyond 2026 cycle peak",
      },
      {
        date: "Yesterday",
        source: "Reuters",
        headline:
          "Power grid bottlenecks may force AI project delays into 2027",
      },
      {
        date: "4 days ago",
        source: "Bloomberg",
        headline:
          "Hyperscaler hiring slowdown signals cooling infrastructure demand",
      },
    ],
  },
  CYBR: {
    claim:
      "Rising attack surface and enterprise security spend will sustain a structural bid under cybersecurity software.",
    contraryNews: [
      {
        date: "Today",
        source: "Bloomberg",
        headline:
          "Cyber software multiples stretched vs underlying revenue growth",
      },
      {
        date: "Yesterday",
        source: "Reuters",
        headline: "CIO surveys point to tighter security budgets through 2026",
      },
      {
        date: "2 days ago",
        source: "FT",
        headline:
          "Open-source security stacks gain share, pressure vendor pricing",
      },
    ],
  },
  ENTR: {
    claim:
      "Grid modernization, storage, and electrification will outpace the headline energy transition narrative.",
    contraryNews: [
      {
        date: "Today",
        source: "WSJ",
        headline: "Hydrogen projects shelved as cost curves disappoint backers",
      },
      {
        date: "Yesterday",
        source: "Reuters",
        headline: "Permitting delays push grid timelines into next decade",
      },
      {
        date: "3 days ago",
        source: "Bloomberg",
        headline: "IRA rollback risk weighs on transition equity flows",
      },
    ],
  },
  USIR: {
    claim:
      "A multi-year public and private capex cycle will reset the earnings power of US industrials and materials.",
    contraryNews: [
      {
        date: "Today",
        source: "Bloomberg",
        headline:
          "Federal infrastructure outlays decelerate into next fiscal year",
      },
      {
        date: "Yesterday",
        source: "Reuters",
        headline: "Construction labor shortages cap project execution speed",
      },
      {
        date: "2 days ago",
        source: "WSJ",
        headline:
          "State budget tightening defers maintenance and renewal projects",
      },
    ],
  },
};

const getView = (ticker) => VIEWS[ticker] ?? { claim: "", contraryNews: [] };

// Frequency display helpers. "$250 per month" reads more naturally than the
// "/monthly" pattern the other arms use, and the redesign drops one-time.
const PER_UNIT = { monthly: "month", weekly: "week", quarterly: "quarter" };
const COMMIT_SUFFIX = { monthly: "/MO", weekly: "/WK", quarterly: "/QTR" };

// ============================================================================
// Action config
// ============================================================================
export function getRedesignActionConfig(state, stepId) {
  let disabled = false;
  let label = "[ CONTINUE > ]";

  if (stepId === "discover") {
    disabled = !state.selectedTicker;
    label = state.selectedTicker ? "[ CONTINUE > ]" : "[ CHOOSE A VIEW ]";
  }
  if (stepId === "setLevel") {
    disabled = state.amount < DETAIL.amount.minimum;
    label = "[ REVIEW STANDING > ]";
  }
  if (stepId === "confirm") {
    disabled = !state.agreed;
    const suffix = COMMIT_SUFFIX[state.frequency] ?? "/MO";
    label = `[ COMMIT ${fmtMoney(state.amount, DETAIL.amount.currency)}${suffix} ]`;
  }
  return { disabled, label };
}

// ============================================================================
// Persistent claim block · identical composition on detail and confirm so
// the claim sentence is the user's anchor across screens.
// ============================================================================
function ClaimBlock({ view, basket, tag = "The view" }) {
  return (
    <div
      className={cn(
        "border p-[14px] mb-[14px] relative",
        palette.bgSubtle,
        palette.border,
      )}
    >
      <p className="text-[15px] font-bold leading-[1.35] m-0">{view.claim}</p>
      <div
        className={cn(
          "mt-2 pt-[6px] text-[11px] border-t border-dashed",
          palette.border,
          palette.mutedText,
        )}
      >
        {basket.holdingsCount} holdings · managed by {basket.curator}
      </div>
    </div>
  );
}

// News-shaped evidence row. Used by both Case For and Case Against.
function CaseItem({ marker, item }) {
  return (
    <div
      className={cn(
        "py-[6px] border-b border-dashed last:border-b-0",
        palette.border,
      )}
    >
      <div className={cn("text-[11px]", palette.mutedText)}>
        {marker} {item.date} · {item.source}
      </div>
      <div className="mt-[2px]">{item.headline}</div>
    </div>
  );
}

// Holdings row for WHAT THIS BACKS. Shows allocation in dollars and in
// fractional shares so the user can reconcile to the underlying buy.
function HoldingRow({ holding, support }) {
  const dollars = support * holding.weight;
  const shares = dollars / holding.pricePerShare;
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto_auto] gap-x-3 py-[4px] border-b border-dashed last:border-b-0",
        palette.border,
      )}
    >
      <span>
        {holding.name}{" "}
        <span className={palette.mutedText}>({holding.ticker})</span>
      </span>
      <span className="text-right">{fmtMoneyDec(dollars)}</span>
      <span className={cn("text-right", palette.mutedText)}>
        {shares.toFixed(4)} sh
      </span>
    </div>
  );
}

// ============================================================================
// Step 01 · Discover · stacked claim cards
// ============================================================================
function DiscoverScreen() {
  const { state, selectTicker } = useTestState();

  return (
    <>
      <Eyebrow>STEP 01 OF 03</Eyebrow>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Available views
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Each card is a view the platform tracks. Back the one you would put
        weight behind.
      </div>

      {CATALOG.map((b) => {
        const view = getView(b.ticker);
        const sel = state.selectedTicker === b.ticker;
        return (
          <div
            key={b.ticker}
            onClick={() => selectTicker(b.ticker)}
            className={cn(
              "border p-[14px] mb-[12px] cursor-pointer",
              "transition-colors duration-200 ease-out",
              palette.border,
              palette.hoverBg,
              sel && cn("border-2 p-[13px]", palette.bgSelected),
            )}
          >
            <div className="flex items-start gap-2">
              <span className="font-bold whitespace-nowrap shrink-0">
                {sel ? "[*]" : "[ ]"}
              </span>
              <p className="text-[14px] font-bold leading-[1.35] m-0 flex-1">
                {view.claim || b.theme}
              </p>
            </div>
            <div
              className={cn(
                "flex justify-between mt-[8px] pt-[8px] text-[11px] border-t border-dashed",
                palette.border,
                palette.mutedText,
              )}
            >
              <span>{b.holdingsCount} holdings</span>
              <span>Managed · {b.curator}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}

// ============================================================================
// Step 02 · setLevel · claim anchor, case for / against, support question
// ============================================================================
function SetLevelScreen() {
  const { state, setAmount, setFrequency } = useTestState();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const view = getView(b.ticker);
  const a = DETAIL.amount;
  const belowMin = state.amount < a.minimum;

  // Standing implies recurrence. Drop one-time.
  const recurringFreqs = a.frequencies.filter((f) => f.id !== "one-time");

  return (
    <>
      <Eyebrow>STEP 02 OF 03</Eyebrow>

      <ClaimBlock view={view} basket={b} />

      <Box>
        <BoxHead meta="Recent supporting signals">CASE FOR</BoxHead>
        {b.news.map((n, i) => (
          <CaseItem key={i} marker="[+]" item={n} />
        ))}
      </Box>

      <Box>
        <BoxHead meta="Recent contrary signals">CASE AGAINST</BoxHead>
        {view.contraryNews.map((n, i) => (
          <CaseItem key={i} marker="[-]" item={n} />
        ))}
      </Box>

      <Box>
        <BoxHead>SUPPORT THIS STANDING</BoxHead>
        <div className="font-bold text-[14px] mb-[12px]">
          How much will you support this standing?
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
            / {PER_UNIT[state.frequency] ?? "month"}
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

        <Eyebrow>CADENCE</Eyebrow>
        <PresetRow className="mt-1">
          {recurringFreqs.map((f) => (
            <Button
              key={f.id}
              active={state.frequency === f.id}
              onClick={() => setFrequency(f.id)}
            >
              [{f.label}]
            </Button>
          ))}
        </PresetRow>

        {belowMin && (
          <div className="mt-[10px] font-bold">
            !! Amount is below the {fmtMoney(a.minimum, a.currency)} minimum.
          </div>
        )}
      </Box>

      <Box>
        <BoxHead
          meta={`${fmtMoney(state.amount, a.currency)} split across ${b.topHoldings.length}`}
        >
          WHAT THIS BACKS
        </BoxHead>
        <div
          className={cn(
            "grid grid-cols-[1fr_auto_auto] gap-x-3 pb-[4px] mb-[2px] text-[11px] uppercase tracking-[0.04em] border-b border-dashed",
            palette.border,
            palette.mutedText,
          )}
        >
          <span>Holding</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Shares</span>
        </div>
        {b.topHoldings.map((h) => (
          <HoldingRow key={h.ticker} holding={h} support={state.amount} />
        ))}
        <div
          className={cn(
            "mt-[8px] pt-[6px] text-[11px] border-t border-dashed",
            palette.border,
            palette.mutedText,
          )}
        >
          Fractional shares. Allocation may shift if {b.curator} rebalances.
        </div>
      </Box>

      <div className={cn("text-[12px] mt-[14px]", palette.mutedText)}>
        {DETAIL.disclosure.shortNote}
      </div>
    </>
  );
}

// ============================================================================
// Step 03 · Confirm · claim anchor, quiet summary, light agreement
// ============================================================================
function ConfirmScreen() {
  const { state, toggleAgreed } = useTestState();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const view = getView(b.ticker);
  const d = DETAIL;
  const c = d.amount.currency;
  const perUnit = PER_UNIT[state.frequency] ?? "month";

  const periodsPerYear =
    state.frequency === "weekly"
      ? 52
      : state.frequency === "quarterly"
        ? 4
        : 12;
  const annualEquiv = state.amount * periodsPerYear;
  const annualFee = annualEquiv * b.expenseRatio;

  return (
    <>
      <Eyebrow>STEP 03 OF 03</Eyebrow>

      <ClaimBlock view={view} basket={b} tag="The view you are backing" />

      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Your standing
      </h1>
      <div className="max-w-[80ch] mb-[14px]">
        Review what you are backing and at what level.
      </div>

      <Box>
        <MetaRows
          divided
          keyWidth="120px"
          rows={[
            {
              label: "Level",
              bold: true,
              value: `${fmtMoney(state.amount, c)} per ${perUnit}`,
            },
            { label: "Cadence", value: d.deploymentCadence },
            {
              label: "Risk profile",
              value: `${d.risk.ratingLabel} (${b.riskRating}/${d.risk.ratingScaleMax}) · ${d.risk.timeHorizonYears.min}–${d.risk.timeHorizonYears.max}Y horizon`,
            },
            {
              label: "Annual fee",
              value: `${fmtPct(b.expenseRatio)} (≈ ${fmtMoney(annualFee, c)} / yr on ${fmtMoney(annualEquiv, c)} annualized)`,
            },
          ]}
        />
      </Box>

      <Box dashed>
        You can <strong>adjust</strong>, <strong>pause</strong>, or{" "}
        <strong>retract</strong> this standing at any time from your standings
        view. No exit fees, no holding period. The view itself is tracked by the
        platform whether you back it or not.
      </Box>

      <div className={cn("text-[12px] mt-[14px]", palette.mutedText)}>
        The standing carries risk. Estimated volatility{" "}
        {fmtPct(d.risk.volatility1Y.low, 0)} –{" "}
        {fmtPct(d.risk.volatility1Y.high, 0)} over a year. Worst regime:{" "}
        {d.risk.worstRegime.name.toLowerCase()}, when USD strength compounds
        losses. Past performance is not a reliable indicator of future results.
      </div>

      <OptionRow onClick={toggleAgreed} className="font-normal mt-[10px]">
        <OptionSymbol>{state.agreed ? "[X]" : "[ ]"}</OptionSymbol>I have
        reviewed the case for and against. I am backing this view under my own
        judgment.
      </OptionRow>
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
