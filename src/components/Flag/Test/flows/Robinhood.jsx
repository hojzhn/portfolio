// Themed Basket flow. Compressed thematic-basket purchase pattern as
// practiced by Public.com, Stash, eToro CopyPortfolios, and M1 Pies.
// Theme-first listing, basket-level performance, allocation preview,
// purchase vocabulary throughout. The file is named Robinhood.jsx for
// backward compatibility with ActionBar imports; the flow it implements
// is the Themed pattern.

import { useTestState } from "../TestStateContext";
import { CATALOG, findCatalog } from "../data/catalog";
import { DETAIL } from "../data/detail";
import { sparkBlocks } from "../lib/ascii";
import {
  fmtPct,
  fmtPctSigned,
  fmtMoney,
  fmtMoneyDec,
  fmtAUM,
  getFreqLabel,
} from "../lib/format";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
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
  Td,
} from "../components/ui";
import CatalogRow from "../components/CatalogRow";
import MetaRows from "../components/MetaRows";
import KeyStatsGrid from "../components/KeyStatsGrid";

const PERIODS = ["1M", "3M", "1Y", "3Y", "ALL"];

// ============================================================================
// Action config
// ============================================================================
export function getRobinhoodActionConfig(state, stepId) {
  let disabled = false;
  let label = "[ CONTINUE > ]";

  if (stepId === "browse") {
    disabled = !state.selectedTicker;
    label = state.selectedTicker ? "[ REVIEW THEME > ]" : "[ SELECT A THEME ]";
  }
  if (stepId === "detail") {
    label = "[ INVEST > ]";
  }
  if (stepId === "amount") {
    disabled = state.amount < DETAIL.amount.minimum;
    label = "[ REVIEW INVESTMENT > ]";
  }
  if (stepId === "confirm") {
    disabled = !state.agreed;
    label = `[ INVEST ${fmtMoney(state.amount, DETAIL.amount.currency)} ]`;
  }
  return { disabled, label };
}

// ============================================================================
// Step 01 · Browse themes
// ============================================================================
function BrowseScreen() {
  const { state, selectTicker } = useTestState();

  return (
    <>
      <Eyebrow>STEP 01 OF 04</Eyebrow>
      <ScreenTitle>Browse curated themes</ScreenTitle>
      <ScreenSub>
        Thematic baskets managed by Public and partners. Each theme is a curated
        collection of stocks bundled around a market view. Tap a theme to review
        its composition before investing.
      </ScreenSub>

      <div className={cn("flex justify-between mb-2", palette.mutedText)}>
        <span>{CATALOG.length} themes available</span>
        <SelectBox>
          <option>Sort: 1Y return</option>
          <option>Sort: Since inception</option>
          <option>Sort: Holdings count</option>
          <option>Sort: AUM</option>
        </SelectBox>
      </div>

      {CATALOG.map((b) => {
        const spark = sparkBlocks(b.sparkline, 14);
        return (
          <CatalogRow
            key={b.ticker}
            selected={state.selectedTicker === b.ticker}
            onClick={() => selectTicker(b.ticker)}
            ticker={b.ticker}
            title={<strong>{b.themeShort}</strong>}
            subtitle={[b.theme, `Managed · ${b.curator}`]}
            cells={[
              {
                label: "Holdings",
                className: "w-[72px]",
                value: b.holdingsCount,
              },
              {
                label: "1Y",
                className: "w-[72px]",
                value: fmtPctSigned(b.oneYearReturn),
              },
              {
                label: "Trend",
                className: "w-[120px]",
                value: (
                  <span className="text-[14px] whitespace-nowrap">{spark}</span>
                ),
              },
              {
                label: "AUM",
                className: "w-[72px]",
                value: fmtAUM(b.aumUSD),
              },
            ]}
          />
        );
      })}
    </>
  );
}

// ============================================================================
// Step 02 · Theme detail
// ============================================================================
function DetailScreen() {
  const { state } = useTestState();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const spark = sparkBlocks(b.sparkline, 60);

  const stats = [
    { label: "1Y return", value: fmtPctSigned(b.oneYearReturn) },
    { label: "3Y return", value: fmtPctSigned(b.threeYearReturn) },
    { label: "Holdings", value: b.holdingsCount },
    { label: "AUM", value: fmtAUM(b.aumUSD) },
  ];

  return (
    <>
      <Eyebrow>STEP 02 OF 04 · {b.ticker}</Eyebrow>

      <div className="mb-[14px]">
        <div className={palette.mutedText}>Managed by {b.curator}</div>
        <div className="font-bold text-[18px] mt-[2px]">{b.themeShort}</div>
        <div className={cn("mt-1", palette.mutedText)}>{b.theme}</div>
      </div>

      <Box>
        <BoxHead
          meta={`Since inception ${fmtPctSigned(b.sinceInceptionReturn, 1)}`}
        >
          PERFORMANCE
        </BoxHead>
        <div className="whitespace-pre py-[14px] text-[18px] leading-[1.4] tracking-[-1px] overflow-hidden">
          {spark}
        </div>
        <div className={cn("flex justify-between", palette.mutedText)}>
          <span>0</span>
          <span>Time</span>
          <span>Now</span>
        </div>
        <PresetRow className="mt-[14px]">
          {PERIODS.map((p) => (
            <Button key={p} active={p === "1Y"}>
              [{p}]
            </Button>
          ))}
        </PresetRow>
        <div className="mt-[14px]">
          <KeyStatsGrid stats={stats} />
        </div>
      </Box>

      <Box>
        <BoxHead meta="Allocation by weight">
          HOLDINGS (TOP {b.topHoldings.length})
        </BoxHead>
        <Table>
          <tbody>
            {b.topHoldings.map((h) => (
              <tr key={h.ticker}>
                <Td>
                  {h.name}{" "}
                  <span className={palette.mutedText}>({h.ticker})</span>
                </Td>
                <Td numeric>{fmtPct(h.weight, 1)}</Td>
                <Td numeric>{fmtMoneyDec(h.pricePerShare)}/sh</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      <Box>
        <BoxHead>ABOUT</BoxHead>
        <div>
          {b.themeShort} captures companies positioned to benefit from{" "}
          {b.theme.toLowerCase()} The basket holds a diversified collection of
          underlying instruments selected by {b.curator}.
        </div>
      </Box>

      <Box>
        <BoxHead>RECENT NEWS</BoxHead>
        {b.news.map((n, i) => (
          <div
            key={i}
            className={cn(
              "py-[6px] border-b border-dashed last:border-b-0",
              palette.border,
            )}
          >
            <div className={cn("text-[11px]", palette.mutedText)}>
              {n.date} · {n.source}
            </div>
            <div className="mt-[2px]">{n.headline}</div>
          </div>
        ))}
      </Box>
    </>
  );
}

// ============================================================================
// Step 03 · Amount with allocation preview
// ============================================================================
function AmountScreen() {
  const { state, setAmount, setFrequency } = useTestState();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const a = DETAIL.amount;
  const belowMin = state.amount < a.minimum;

  return (
    <>
      <Eyebrow>STEP 03 OF 04 · {b.ticker}</Eyebrow>
      <ScreenTitle>How much would you like to invest?</ScreenTitle>
      <ScreenSub>
        Your investment will be split across the {b.holdingsCount} holdings in
        this theme according to its current allocation.
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

      <Eyebrow>FREQUENCY</Eyebrow>
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
        <BoxHead meta={`Split across ${b.topHoldings.length} holdings`}>
          YOUR {fmtMoney(state.amount, a.currency)} BUYS
        </BoxHead>
        <Table>
          <tbody>
            {b.topHoldings.map((h) => {
              const dollars = state.amount * h.weight;
              const shares = dollars / h.pricePerShare;
              return (
                <tr key={h.ticker}>
                  <Td>
                    {h.name}{" "}
                    <span className={palette.mutedText}>({h.ticker})</span>
                  </Td>
                  <Td numeric>{fmtMoneyDec(dollars)}</Td>
                  <Td numeric>{shares.toFixed(4)} sh</Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>

      <div
        className={cn(
          "border p-[10px_12px] my-[10px]",
          palette.bgSubtle,
          palette.border,
        )}
      >
        <div className="flex justify-between py-[2px]">
          <span className={palette.mutedText}>Estimated total</span>
          <span className="font-bold">{fmtMoneyDec(state.amount)}</span>
        </div>
        <div className={cn("flex justify-between py-[2px]", palette.mutedText)}>
          <span>Estimated fees</span>
          <span>$0.00 (commission-free)</span>
        </div>
        <div className={cn("flex justify-between py-[2px]", palette.mutedText)}>
          <span>Annual basket fee</span>
          <span>{fmtPct(b.expenseRatio)}</span>
        </div>
      </div>

      <div className={cn("mt-2", palette.mutedText)}>
        Minimum {fmtMoney(a.minimum, a.currency)} · Allocation may shift if{" "}
        {b.curator} rebalances the theme.
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
// Step 04 · Confirm
// ============================================================================
function ConfirmScreen() {
  const { state, toggleAgreed } = useTestState();
  const b = findCatalog(state.selectedTicker);
  if (!b) return null;
  const c = DETAIL.amount.currency;

  return (
    <>
      <Eyebrow>STEP 04 OF 04 · {b.ticker}</Eyebrow>
      <ScreenTitle>Review your investment</ScreenTitle>
      <ScreenSub>
        Confirm the details below. Your investment will be placed across the
        theme's holdings.
      </ScreenSub>

      <Box>
        <MetaRows
          divided
          keyWidth="140px"
          rows={[
            { label: "Theme", value: <strong>{b.themeShort}</strong> },
            { label: "Managed by", value: b.curator },
            { label: "Holdings", value: b.holdingsCount },
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
              label: "Estimated fees",
              value: `$0.00 (commission-free) · ${fmtPct(b.expenseRatio)} annual basket fee`,
            },
          ]}
        />
      </Box>

      <Box>
        <BoxHead meta={`Top ${b.topHoldings.length} of ${b.holdingsCount}`}>
          ALLOCATION BREAKDOWN
        </BoxHead>
        <Table>
          <tbody>
            {b.topHoldings.map((h) => {
              const dollars = state.amount * h.weight;
              const shares = dollars / h.pricePerShare;
              return (
                <tr key={h.ticker}>
                  <Td>{h.name}</Td>
                  <Td numeric>{fmtMoneyDec(dollars)}</Td>
                  <Td numeric>{shares.toFixed(4)} sh</Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>

      <div className={cn("py-[10px]", palette.mutedText)}>
        The basket's curator may rebalance the holdings periodically. Past
        performance is not a reliable indicator of future results.
      </div>

      <OptionRow onClick={toggleAgreed} className="font-normal">
        <OptionSymbol>{state.agreed ? "[X]" : "[ ]"}</OptionSymbol>I agree to
        the platform terms and acknowledge that thematic baskets carry
        concentration risk.
      </OptionRow>
    </>
  );
}

// ============================================================================
// Flow dispatcher
// ============================================================================
const SCREENS = {
  browse: BrowseScreen,
  detail: DetailScreen,
  amount: AmountScreen,
  confirm: ConfirmScreen,
};

export default function RobinhoodFlow({ stepId }) {
  const Screen = SCREENS[stepId];
  return Screen ? <Screen /> : null;
}
