import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toggle from "../Toggle";
import { FLOW_BOX_CLASS, FlowArrow, ARROW_W } from "./FlowRow";

/**
 * Standard ↔ Redesigned flow in one component.
 *
 * Six logical boxes carry stable ids. Each mode gives every box an
 * `order` (its slot in the row) and a `grow` (flex weight; 0 = collapsed).
 * Toggling the mode reorders the array and changes the grows — framer's
 * `layout` animates the boxes gliding to their new slots while the
 * collapsing ones (`holdings`'s siblings) shrink into the merged box.
 */

const EASE = [0.4, 0, 0.2, 1];
const DUR = 0.55;

const BOX_IDS = ["select", "holdings", "risk", "fees", "amount", "confirm"];

const MODE = {
  standard: {
    select: { order: 0, grow: 1, label: "Select", sub: "browse catalog" },
    holdings: {
      order: 1,
      grow: 1,
      label: "Holdings",
      sub: "review instruments",
    },
    risk: { order: 2, grow: 1, label: "Risk", sub: "accept profile" },
    fees: { order: 3, grow: 1, label: "Fees", sub: "evaluate cost" },
    amount: { order: 4, grow: 1, label: "Amount", sub: "pick value" },
    confirm: { order: 5, grow: 1, label: "Confirm", sub: "final review" },
  },
  redesigned: {
    select: {
      order: 0,
      grow: 22,
      label: "Recognize",
      sub: "surfaced from attention",
      kind: "retained",
      tag: "Recognize",
    },
    amount: {
      order: 1,
      grow: 22,
      label: "Amount",
      sub: "pick value",
      kind: "retained",
      tag: "Set level",
    },
    holdings: {
      order: 2,
      grow: 62,
      label: "Holdings · Risk · Fees",
      sub: "visible at commit, inspectable",
      kind: "commit",
      tag: "Surfaced · not authored",
    },
    // risk + fees fold into the holdings box.
    risk: { order: 3, grow: 0, label: "", sub: "" },
    fees: { order: 4, grow: 0, label: "", sub: "" },
    confirm: {
      order: 5,
      grow: 16,
      label: "Confirm",
      sub: "single tap",
      kind: "retained",
      tag: "Commit",
    },
  },
};

// Bracket spans for the redesigned view: [from, to] in *visible-box*
// index order, plus tone + label.
const BRACKETS = [
  {
    fromId: "select",
    toId: "amount",
    tone: "point",
    label: "user authors",
  },
  {
    fromId: "holdings",
    toId: "confirm",
    tone: "txt2",
    label: "user confirms",
  },
];

const toneColor = (t) => (t === "txt2" ? "var(--txt2)" : "var(--point)");

export default function FlowDiagram({ defaultRedesigned = false }) {
  const [redesigned, setRedesigned] = useState(defaultRedesigned);
  const cfg = MODE[redesigned ? "redesigned" : "standard"];

  const ordered = [...BOX_IDS].sort((a, b) => cfg[a].order - cfg[b].order);
  const visible = ordered.filter((id) => cfg[id].grow > 0);
  const lastVisible = visible[visible.length - 1];

  // Walk `ordered`, emitting box cells + arrow cells. Arrows go after a
  // visible box that isn't the last visible one (placed before any
  // collapsed boxes that follow it).
  const cells = [];
  ordered.forEach((id) => {
    const c = cfg[id];
    const open = c.grow > 0;
    cells.push(
      <motion.div
        key={id}
        layout
        transition={{ duration: DUR, ease: EASE }}
        animate={{ opacity: open ? 1 : 0 }}
        style={{ flexGrow: c.grow, flexBasis: 0 }}
        className={`min-w-0 rounded-md overflow-hidden ${
          open ? "px-2 py-2.5 sm:px-3 sm:py-3" : "p-0"
        } ${open ? FLOW_BOX_CLASS[c.kind || "default"] : ""}`}
      >
        <motion.div layout="position" className="min-w-0">
          <div className="leading-tight whitespace-nowrap sm:whitespace-normal">
            {c.label}
          </div>
          <div className="text-[0.8em] text-[var(--txt2)] leading-tight mt-0.5 whitespace-nowrap sm:whitespace-normal">
            {c.sub}
          </div>
        </motion.div>
      </motion.div>,
    );
    if (open && id !== lastVisible) {
      cells.push(<FlowArrow key={`arr-${id}`} />);
    }
  });

  // Tag row (one cell per box in `ordered`, mirroring widths) — fades in
  // for the redesigned view.
  const tagCells = [];
  ordered.forEach((id) => {
    const c = cfg[id];
    tagCells.push(
      <motion.span
        key={id}
        layout
        transition={{ duration: DUR, ease: EASE }}
        style={{
          flexGrow: c.grow,
          flexBasis: 0,
          color:
            c.kind && c.kind !== "retained" ? "var(--txt2)" : "var(--point)",
        }}
        className="min-w-0 font-mono text-[0.6em] sm:text-[0.7em] tracking-[0.14em] uppercase truncate"
      >
        {c.grow > 0 ? `0${visible.indexOf(id) + 1}` : ""}
      </motion.span>,
    );
    if (c.grow > 0 && id !== lastVisible) {
      tagCells.push(
        <span key={`arr-${id}`} className={`shrink-0 ${ARROW_W}`} />,
      );
    }
  });

  // Bracket annotation cells for the redesigned view.
  const renderBrackets = () => {
    const cs = [];
    ordered.forEach((id) => {
      const c = cfg[id];
      const open = c.grow > 0;
      const grp = BRACKETS.find(
        (b) => cfg[b.fromId].order <= c.order && c.order <= cfg[b.toId].order,
      );
      const color = grp && toneColor(grp.tone);
      const isFirst = grp && id === grp.fromId;
      const isLast = grp && id === grp.toId;
      cs.push(
        <div
          key={id}
          style={{ flexGrow: c.grow, flexBasis: 0 }}
          className="min-w-0 h-2"
        >
          {grp && (
            <div
              className={`h-full border-b ${isFirst ? "border-l rounded-bl-md" : ""} ${
                isLast ? "border-r rounded-br-md" : ""
              }`}
              style={{ borderColor: color }}
            />
          )}
        </div>,
      );
      if (open && id !== lastVisible) {
        // connector segment over the arrow if the next visible box is in
        // the same group
        const next = visible[visible.indexOf(id) + 1];
        const sameGroup =
          grp &&
          next &&
          cfg[next].order <= cfg[grp.toId].order &&
          grp ===
            BRACKETS.find(
              (b) =>
                cfg[b.fromId].order <= cfg[next].order &&
                cfg[next].order <= cfg[b.toId].order,
            );
        cs.push(
          <div key={`arr-${id}`} className={`shrink-0 ${ARROW_W} h-2`}>
            {sameGroup && (
              <div
                className="h-full w-full border-b"
                style={{ borderColor: color }}
              />
            )}
          </div>,
        );
      }
    });
    return cs;
  };

  const renderBracketLabels = () => {
    // group blocks: walk visible boxes, merge consecutive ones in the
    // same bracket.
    const out = [];
    let i = 0;
    while (i < visible.length) {
      const id = visible[i];
      const grp = BRACKETS.find(
        (b) =>
          cfg[b.fromId].order <= cfg[id].order &&
          cfg[id].order <= cfg[b.toId].order,
      );
      if (grp) {
        // collect this run
        const run = [];
        while (
          i < visible.length &&
          cfg[visible[i]].order >= cfg[grp.fromId].order &&
          cfg[visible[i]].order <= cfg[grp.toId].order
        ) {
          run.push(visible[i]);
          i += 1;
        }
        const grow = run.reduce((a, bId) => a + cfg[bId].grow, 0);
        out.push(
          <div
            key={`lbl-${grp.fromId}`}
            style={{ flexGrow: grow, flexBasis: 0, color: toneColor(grp.tone) }}
            className="min-w-0 font-mono text-[0.6em] sm:text-[0.7em] uppercase tracking-[0.14em] text-center"
          >
            {grp.label}
          </div>,
        );
      } else {
        out.push(
          <div
            key={`gap-${id}`}
            style={{ flexGrow: cfg[id].grow, flexBasis: 0 }}
            className="min-w-0"
          />,
        );
        i += 1;
      }
      if (i < visible.length)
        out.push(
          <span key={`arr-lbl-${id}`} className={`shrink-0 ${ARROW_W}`} />,
        );
    }
    return out;
  };

  return (
    <>
      <div className="border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] px-3 py-4">
        <div className="font-mono text-[var(--point)] text-[0.75em] uppercase tracking-[0.16em] mb-4">
          {redesigned ? "Redesigned flow " : "Standard flow"}
        </div>

      {/* Tag row */}
      <div className="flex flex-row gap-px mb-1">{tagCells}</div>

      {/* Box row */}
      <div className="flex flex-row items-stretch gap-px">{cells}</div>

      {/* Annotation / caption */}
      <AnimatePresence mode="wait" initial={false}>
        {redesigned ? (
          <motion.div
            key="brackets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row gap-px mt-3">{renderBrackets()}</div>
            <div className="flex flex-row gap-px mt-1.5">
              {renderBracketLabels()}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="standard-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="border-t border-dashed mt-4"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--point) 55%, transparent)",
              }}
            />
            <div className="font-mono text-[var(--point)] text-[0.7em] uppercase tracking-[0.16em] text-center mt-4">
              ↑ Each step requires the user to author a decision
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <Toggle
        className="mt-3"
        items={[
          { label: "Standard flow", value: "standard" },
          { label: "Redesigned flow", value: "redesigned" },
        ]}
        value={redesigned ? "redesigned" : "standard"}
        onChange={(v) => setRedesigned(v === "redesigned")}
      />
    </>
  );
}
