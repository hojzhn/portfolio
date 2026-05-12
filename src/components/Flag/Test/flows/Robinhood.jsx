import { useTestState } from "../TestStateContext";
import { CATALOG, findCatalog } from "../data/catalog";
import { DETAIL } from "../data/detail";
import { sparkBlocks } from "../lib/ascii";
import {
  fmtPct,
  fmtPctSigned,
  fmtMoney,
  fmtMoneyDec,
  getFreqLabel,
} from "../lib/format";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import { Button, SelectBox, BareInput } from "../components/ui";
import CatalogRow from "../components/CatalogRow";
import KeyStatsGrid from "../components/KeyStatsGrid";

const ORDER_TYPES = ["Buy", "Sell", "Limit", "Stop"];
const PERIODS = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

// ============================================================================
// Action config
// ============================================================================
export function getRobinhoodActionConfig(state, stepId) {
  let disabled = false;
  let label = "[ CONTINUE > ]";

  if (stepId === "list") {
    disabled = !state.selectedTicker;
    label = state.selectedTicker
      ? "[ VIEW DETAIL > ]"
      : "[ SELECT AN INSTRUMENT ]";
  }
  if (stepId === "detail") {
    label = `[ BUY ${state.selectedTicker} ]`;
  }
  if (stepId === "amount") {
    disabled = state.amount < DETAIL.amount.minimum;
    label = "[ REVIEW ORDER > ]";
  }
  if (stepId === "review") {
    disabled = !state.agreed;
    label = `[ SUBMIT ORDER · ${fmtMoneyDec(state.amount)} ]`;
  }
  return { disabled, label };
}

// ============================================================================
// Step 01 · List
// ============================================================================
function ListScreen() {
  const { state, selectTicker } = useTestState();

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 01 OF 04</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Discover
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Browse and search for ETFs and stocks. Tap an instrument to view
        details.
      </div>

      <div className={cn("flex justify-between mb-2", palette.mutedText)}>
        <span>Trending in Thematic ETFs</span>
        <SelectBox>
          <option>Sort: 1Y return</option>
          <option>Sort: Volume</option>
          <option>Sort: Price</option>
        </SelectBox>
      </div>

      {CATALOG.map((etf) => {
        const up = etf.dailyChange >= 0;
        const spark = sparkBlocks(etf.sparkline, 14);
        return (
          <CatalogRow
            key={etf.ticker}
            selected={state.selectedTicker === etf.ticker}
            onClick={() => selectTicker(etf.ticker)}
            ticker={<strong>{etf.ticker}</strong>}
            title={etf.name}
            subtitle={etf.themeShort}
            cells={[
              {
                label: "Price",
                className: "w-[88px]",
                value: <strong>{fmtMoneyDec(etf.pricePerShare)}</strong>,
              },
              {
                label: "Today",
                className: "w-[128px]",
                value: (
                  <>
                    {up ? "+" : ""}
                    {etf.dailyChange.toFixed(2)} (
                    {fmtPctSigned(etf.dailyChangePct, 2)})
                  </>
                ),
              },
              {
                label: "1Y chart",
                className: "w-[120px]",
                value: (
                  <span className="text-[14px] whitespace-nowrap">{spark}</span>
                ),
              },
              {
                label: "1Y",
                className: "w-[72px]",
                value: fmtPctSigned(etf.oneYearReturn),
              },
            ]}
          />
        );
      })}
    </>
  );
}

// ============================================================================
// Step 02 · Detail
// ============================================================================
function DetailScreen() {
  const { state, setChartPeriod } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const up = etf.dailyChange >= 0;
  const spark = sparkBlocks(etf.sparkline, 60);
  const stats = [
    { label: "Open", value: fmtMoneyDec(etf.open) },
    { label: "P/E ratio", value: etf.peRatio },
    { label: "High", value: fmtMoneyDec(etf.high) },
    { label: "52w high", value: fmtMoneyDec(etf.weekHigh52) },
    { label: "Low", value: fmtMoneyDec(etf.low) },
    { label: "52w low", value: fmtMoneyDec(etf.weekLow52) },
    { label: "Volume", value: etf.volume },
    { label: "Market cap", value: etf.marketCap },
    { label: "Expense ratio", value: fmtPct(etf.expenseRatio) },
    { label: "1Y return", value: fmtPctSigned(etf.oneYearReturn) },
  ];

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 02 OF 04 · {etf.ticker}</div>

      <div className="mb-[14px]">
        <div className={palette.mutedText}>{etf.name}</div>
        <div className="font-bold text-[18px] mt-[2px]">{etf.ticker}</div>
        <div className="text-[32px] font-bold leading-[1.1]">
          {fmtMoneyDec(etf.pricePerShare)}
        </div>
        <div className="font-bold mt-1">
          {up ? "▲" : "▼"} {up ? "+" : ""}
          {etf.dailyChange.toFixed(2)} ({fmtPctSigned(etf.dailyChangePct, 2)})
          Today
        </div>
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className="whitespace-pre py-[14px] text-[18px] leading-[1.4] tracking-[-1px] overflow-hidden">
          {spark}
        </div>
        <div className={cn("flex justify-between", palette.mutedText)}>
          <span>{fmtMoneyDec(etf.weekLow52)}</span>
          <span>52-week range</span>
          <span>{fmtMoneyDec(etf.weekHigh52)}</span>
        </div>
        <div className="flex gap-1 my-2 mt-[14px]">
          {PERIODS.map((p) => (
            <Button
              key={p}
              active={state.chartPeriod === p}
              onClick={() => setChartPeriod(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
          <span>KEY STATS</span>
        </div>
        <KeyStatsGrid stats={stats} />
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
          <span>ABOUT</span>
        </div>
        <div>
          {etf.name} tracks {etf.theme.toLowerCase()} The fund holds a
          diversified basket of companies positioned to benefit from this theme.
        </div>
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b flex justify-between font-bold tracking-[0.03em]", palette.border)}>
          <span>RECENT NEWS</span>
        </div>
        {etf.news.map((n, i) => (
          <div
            key={i}
            className={cn("py-[6px] border-b border-dashed last:border-b-0", palette.border)}
          >
            <div className={cn("text-[11px]", palette.mutedText)}>
              {n.date} · {n.source}
            </div>
            <div className="mt-[2px]">{n.headline}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ============================================================================
// Step 03 · Amount
// ============================================================================
function AmountScreen() {
  const { state, setAmount, setFrequency, setOrderType } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const a = DETAIL.amount;
  const estShares = state.amount / etf.pricePerShare;
  const belowMin = state.amount < a.minimum;

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 03 OF 04 · {etf.ticker}</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Buy {etf.ticker}
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        {etf.name} · {fmtMoneyDec(etf.pricePerShare)}
      </div>

      <div className={cn("mb-1 mt-[14px]", palette.mutedText)}>ORDER TYPE</div>
      <div className="flex flex-wrap gap-[6px] mb-[14px]">
        {ORDER_TYPES.map((o) => (
          <Button
            key={o}
            active={state.orderType === o}
            onClick={() => setOrderType(o)}
          >
            [{o}]
          </Button>
        ))}
      </div>

      <div className="flex items-baseline gap-2 mt-[18px] mb-[14px]">
        <span className="text-[22px]">$</span>
        <BareInput
          type="number"
          value={state.amount}
          min={a.minimum}
          max={a.maximum}
          onChange={(e) => setAmount(Number(e.target.value) || 0)}
        />
        <span className={palette.mutedText}>{a.currency}</span>
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

      <div className={cn("mb-1", palette.mutedText)}>FREQUENCY</div>
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

      <div className={cn("border p-[10px_12px] my-[10px] mt-[18px]", palette.bgSubtle, palette.border)}>
        <div className="flex justify-between py-[2px]">
          <span className={palette.mutedText}>Estimated price per share</span>
          <span>{fmtMoneyDec(etf.pricePerShare)}</span>
        </div>
        <div className="flex justify-between py-[2px]">
          <span className={palette.mutedText}>Estimated shares</span>
          <span>{estShares.toFixed(4)}</span>
        </div>
        <div className={cn("flex justify-between py-[6px] mt-1 border-t border-dashed font-bold", palette.border)}>
          <span>Estimated total</span>
          <span>{fmtMoneyDec(state.amount)}</span>
        </div>
        <div className={cn("flex justify-between py-[2px]", palette.mutedText)}>
          <span>Estimated fees</span>
          <span>$0.00 (commission-free)</span>
        </div>
      </div>

      <div className={cn("mt-2", palette.mutedText)}>
        Minimum {fmtMoney(a.minimum, a.currency)} · Order will execute at the
        best available price.
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
// Step 04 · Review
// ============================================================================
function ReviewScreen() {
  const { state, toggleAgreed } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  if (!etf) return null;
  const estShares = state.amount / etf.pricePerShare;

  return (
    <>
      <div className={cn("mb-1", palette.mutedText)}>STEP 04 OF 04 · {etf.ticker}</div>
      <h1 className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]">
        Review order
      </h1>
      <div className="max-w-[80ch] mb-[18px]">
        Review the details below before submitting your order.
      </div>

      <div className={cn("border p-[10px_12px] mb-[10px]", palette.border)}>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Symbol</div>
          <div>
            <strong>{etf.ticker}</strong>
          </div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Name</div>
          <div>{etf.name}</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Order type</div>
          <div>{state.orderType}</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Frequency</div>
          <div>{getFreqLabel(state.frequency)}</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Estimated price</div>
          <div>{fmtMoneyDec(etf.pricePerShare)}</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Estimated shares</div>
          <div>{estShares.toFixed(4)}</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1", palette.border)}>
          <div className={palette.mutedText}>Estimated fees</div>
          <div>$0.00 (commission-free)</div>
        </div>
        <div className={cn("grid grid-cols-[140px_1fr] border-b border-dashed py-1 font-bold text-[14px]", palette.border)}>
          <div className={palette.mutedText}>Estimated total</div>
          <div>{fmtMoneyDec(state.amount)}</div>
        </div>
      </div>

      <div className={cn("py-[10px]", palette.mutedText)}>
        By submitting, you authorize the execution of this order at the best
        available price. Orders placed outside market hours will execute at the
        next open. Past performance is not indicative of future results.
      </div>

      <div
        className="py-1 cursor-pointer hover:underline font-normal"
        onClick={toggleAgreed}
      >
        <span className="inline-block w-[28px] font-bold">
          {state.agreed ? "[X]" : "[ ]"}
        </span>
        I agree to the order terms and the platform's trade disclosures.
      </div>
    </>
  );
}

// ============================================================================
// Flow dispatcher
// ============================================================================
const SCREENS = {
  list: ListScreen,
  detail: DetailScreen,
  amount: AmountScreen,
  review: ReviewScreen,
};

export default function RobinhoodFlow({ stepId }) {
  const Screen = SCREENS[stepId];
  return Screen ? <Screen /> : null;
}
