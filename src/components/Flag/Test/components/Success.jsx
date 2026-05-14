import { useMemo } from "react";
import { useTestState } from "../TestStateContext";
import { findCatalog } from "../data/catalog";
import { DETAIL } from "../data/detail";
import {
  fmtMoney,
  getFreqLabel,
  getAccountLabel,
} from "../lib/format";
import { Box } from "./ui";

export default function Success() {
  const { state } = useTestState();
  const b = findCatalog(state.selectedTicker);
  const c = DETAIL.amount.currency;
  const id = useMemo(
    () =>
      Math.floor(Math.random() * 1e6)
        .toString()
        .padStart(6, "0"),
    [],
  );

  if (!b) return null;

  let banner;
  let label;
  let idPrefix;
  let body;

  if (state.flow === "A") {
    banner = "[ ORDER RECEIVED ]";
    label = "Order";
    idPrefix = "ORD";
    body =
      "Your order to invest " +
      fmtMoney(state.amount, c) +
      (state.frequency === "one-time"
        ? ""
        : " " + getFreqLabel(state.frequency).toLowerCase()) +
      " in " +
      b.name +
      " has been received. Settlement T+2.";
  } else if (state.flow === "R") {
    banner = "[ INVESTMENT CONFIRMED ]";
    label = "Investment";
    idPrefix = "INV";
    body =
      "Your " +
      (state.frequency === "one-time"
        ? "one-time"
        : getFreqLabel(state.frequency).toLowerCase()) +
      " investment of " +
      fmtMoney(state.amount, c) +
      " in " +
      b.name +
      " has been placed.";
  } else {
    banner = "[ STANDING CREATED ]";
    label = "Standing";
    idPrefix = "STD";
    body =
      "You are now backing " +
      b.themeShort +
      " at " +
      fmtMoney(state.amount, c) +
      " per month.";
  }

  return (
    <div className="flex-1 flex flex-col py-6">
      <div>{banner}</div>

      <div className="mt-[14px]">{body}</div>

      <Box className="mt-4 w-full max-w-[460px]">
        {state.flow === "A" ? (
          <>
            <div>
              {label} ID · {idPrefix}-{id.slice(0, 4)}
            </div>
            <div>
              Basket · {b.name} ({b.ticker})
            </div>
            <div>Manager · {b.manager}</div>
            <div>Account · {getAccountLabel(state.accountType)}</div>
            <div>
              Amount · {fmtMoney(state.amount, c)}{" "}
              {state.frequency === "one-time"
                ? ""
                : "/ " + getFreqLabel(state.frequency).toLowerCase()}
            </div>
            <div>Status · Pending settlement (T+2)</div>
          </>
        ) : state.flow === "R" ? (
          <>
            <div>
              {label} ID · {idPrefix}-{id.slice(0, 4)}
            </div>
            <div>Theme · {b.name}</div>
            <div>Curated by · {b.curator}</div>
            <div>Holdings · {b.holdingsCount}</div>
            <div>
              Amount · {fmtMoney(state.amount, c)}{" "}
              {state.frequency === "one-time"
                ? ""
                : "/ " + getFreqLabel(state.frequency).toLowerCase()}
            </div>
          </>
        ) : (
          <>
            <div>
              {label} ID · {idPrefix}-{id.slice(0, 4)}
            </div>
            <div>Theme · {b.themeShort}</div>
            <div>Level · {fmtMoney(state.amount, c)} per month</div>
          </>
        )}
      </Box>
    </div>
  );
}
