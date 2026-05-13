import { useMemo } from "react";
import { useTestState } from "../TestStateContext";
import { findCatalog } from "../data/catalog";
import { DETAIL } from "../data/detail";
import { fmtMoney, fmtMoneyDec, getFreqLabel } from "../lib/format";
import { Box } from "./ui";

export default function Success() {
  const { state } = useTestState();
  const etf = findCatalog(state.selectedTicker);
  const c = DETAIL.amount.currency;
  const id = useMemo(
    () =>
      Math.floor(Math.random() * 1e6)
        .toString()
        .padStart(6, "0"),
    [],
  );

  if (!etf) return null;

  let banner;
  let label;
  let idPrefix;
  let body;

  if (state.flow === "A") {
    banner = "[ INVESTMENT SUBMITTED! ]";
    label = "Order";
    idPrefix = "ORD";
    body =
      "Your order to invest " +
      fmtMoney(state.amount, c) +
      (state.frequency === "one-time"
        ? ""
        : " " + getFreqLabel(state.frequency).toLowerCase()) +
      " in " +
      etf.name +
      " has been received.";
  } else if (state.flow === "R") {
    banner = "[ ORDER SUBMITTED! ]";
    label = "Order";
    idPrefix = "ORD";
    const shares = state.amount / etf.pricePerShare;
    body =
      "Your order to buy " +
      shares.toFixed(4) +
      " shares of " +
      etf.ticker +
      " at approximately " +
      fmtMoneyDec(etf.pricePerShare) +
      " each has been submitted for execution.";
  } else {
    banner = "[ STANDING CREATED! ]";
    label = "Standing";
    idPrefix = "STD";
    body =
      "You are now backing " +
      etf.themeShort +
      " at " +
      fmtMoney(state.amount, c) +
      " per month.";
  }

  return (
    <div className="flex-1 flex flex-col py-6">
      <div className="">{banner}</div>

      <div className="mt-[14px]">{body}</div>

      <Box className="mt-4 w-full max-w-[420px]">
        {state.flow === "R" ? (
          <>
            <div>
              {label} ID · {idPrefix}-{id.slice(0, 4)}
            </div>
            <div>Symbol · {etf.ticker}</div>
            <div>Shares · {(state.amount / etf.pricePerShare).toFixed(4)}</div>
            <div>Est. price · {fmtMoneyDec(etf.pricePerShare)}</div>
            <div>Total · {fmtMoneyDec(state.amount)}</div>
          </>
        ) : (
          <>
            <div>
              {label} ID · {idPrefix}-{id.slice(0, 4)}
            </div>
            <div>Ticker · {etf.ticker}</div>
            <div>
              Amount · {fmtMoney(state.amount, c)}{" "}
              {state.frequency === "one-time"
                ? ""
                : "/ " + getFreqLabel(state.frequency).toLowerCase()}
            </div>
          </>
        )}
      </Box>
    </div>
  );
}
