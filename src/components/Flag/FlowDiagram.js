import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toggle from "../Toggle";
import { FLOW_BOX_CLASS, FlowArrow, ARROW_W } from "./FlowRow";

// Container-width threshold. Below this the diagram flips to a vertical stack.
// Container — not viewport — because the diagram is rendered inside the page's
// content column; a 1280px screen can still leave us with ~600px to work in.
const NARROW_PX = 640;

// Watch our own width and report whether we're under NARROW_PX. Returns
// [ref, narrow]; attach the ref to the element whose width we want to track.
function useNarrowContainer(threshold = NARROW_PX) {
  const ref = useRef(null);
  const [narrow, setNarrow] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const measure = () =>
      setNarrow(node.getBoundingClientRect().width < threshold);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(([entry]) =>
      setNarrow(entry.contentRect.width < threshold),
    );
    ro.observe(node);
    return () => ro.disconnect();
  }, [threshold]);

  return [ref, narrow];
}

/**
 * Standard ↔ Redesigned flow in one component.
 *
 * Six logical boxes carry stable ids. Each mode gives every box an
 * `order` (its slot in the row) and a `grow` (flex weight; 0 = collapsed).
 * Toggling the mode reorders the array and changes the grows — framer's
 * `layout` animates the boxes gliding to their new slots while the
 * collapsing ones (`holdings`'s siblings) shrink into the merged box.
 *
 * When the container is narrow (< NARROW_PX) the diagram flips to a
 * vertical stack. Boxes are grouped by bracket; each group renders as a
 * column of boxes with a rotated `↑ label` running up its right side.
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
      label: "Confirm",
      sub: "holdings, risk, fees, allocation surfaced for review",
      kind: "commit",
      tag: "Surfaced · not authored",
    },
    // risk + fees fold into the holdings box.
    risk: { order: 3, grow: 0, label: "", sub: "" },
    fees: { order: 4, grow: 0, label: "", sub: "" },
    confirm: {
      order: 5,
      grow: 0,
      label: "",
      sub: "",
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

// Rotated `↑ label` strip used on the right side of each narrow-mode group.
// The `↑` glyph rotates with the text and ends up pointing left at the stack.
const SideLabel = ({ label, tone }) => (
  <div className="shrink-0 w-8 flex items-center justify-center self-stretch">
    <div
      className="font-mono text-[0.7em] uppercase tracking-[0.16em] whitespace-nowrap -rotate-90 origin-center"
      style={{ color: toneColor(tone) }}
    >
      ↑ {label}
    </div>
  </div>
);

export default function FlowDiagram({ defaultRedesigned = false }) {
  const [redesigned, setRedesigned] = useState(defaultRedesigned);
  const [rootRef, narrow] = useNarrowContainer();
  const cfg = MODE[redesigned ? "redesigned" : "standard"];

  const ordered = [...BOX_IDS].sort((a, b) => cfg[a].order - cfg[b].order);
  const visible = ordered.filter((id) => cfg[id].grow > 0);
  const lastVisible = visible[visible.length - 1];

  // Shared box renderer — works in both modes. `layoutId` lets framer match
  // each box across mode toggles even when its parent container changes
  // (narrow mode regroups boxes per bracket), so positions glide instead of
  // popping. Closed boxes stay in the DOM with `opacity: 0` so framer can
  // animate their collapse — same as how `flex-basis: 0` collapses them in
  // horizontal mode.
  const renderBox = (id) => {
    const c = cfg[id];
    const open = c.grow > 0;
    const tagColor =
      c.kind && c.kind !== "retained" ? "var(--txt2)" : "var(--point)";
    return (
      <motion.div
        key={id}
        layout
        layoutId={`flow-box-${id}`}
        transition={{ duration: DUR, ease: EASE }}
        animate={{ opacity: open ? 1 : 0 }}
        style={narrow ? undefined : { flexGrow: c.grow, flexBasis: 0 }}
        className={`min-w-0 rounded-md overflow-hidden ${
          open ? "px-2 py-2.5 sm:px-3 sm:py-3" : "p-0"
        } ${open ? FLOW_BOX_CLASS[c.kind || "default"] : ""}`}
      >
        <motion.div layout="position" className="min-w-0">
          {narrow && open && (
            <div
              className="font-mono text-[0.7em] tracking-[0.14em] uppercase mb-1"
              style={{ color: tagColor }}
            >
              {`0${visible.indexOf(id) + 1}`}
            </div>
          )}
          <div
            className={`leading-tight ${
              narrow ? "" : "whitespace-nowrap sm:whitespace-normal"
            }`}
          >
            {c.label}
          </div>
          <div
            className={`text-[0.8em] text-[var(--txt2)] leading-tight mt-0.5 ${
              narrow ? "" : "whitespace-nowrap sm:whitespace-normal"
            }`}
          >
            {c.sub}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Wide-mode: flat sequence of boxes + arrows.
  const cells = [];
  ordered.forEach((id) => {
    const c = cfg[id];
    const open = c.grow > 0;
    cells.push(renderBox(id));
    if (open && id !== lastVisible) {
      cells.push(<FlowArrow key={`arr-${id}`} />);
    }
  });

  // Wide-mode tag row (one cell per box, mirroring widths).
  const tagCells = [];
  ordered.forEach((id) => {
    const c = cfg[id];
    tagCells.push(
      <motion.span
        key={id}
        layout={!narrow}
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

  // Narrow-mode groups: walk `ordered` (so closed boxes stay in the DOM and
  // framer can animate them collapsing) bucketed by bracket. Standard mode
  // has no brackets — collapse to one group with the "Each step…" caption.
  const narrowGroups = narrow
    ? (() => {
        if (!redesigned) {
          return [
            {
              boxes: ordered,
              sideLabel: "Each step requires the user to author a decision",
              sideTone: "point",
            },
          ];
        }
        const out = [];
        ordered.forEach((id) => {
          const c = cfg[id];
          const grp = BRACKETS.find(
            (b) =>
              cfg[b.fromId].order <= c.order && c.order <= cfg[b.toId].order,
          );
          const last = out[out.length - 1];
          if (last && last.bracket === grp) {
            last.boxes.push(id);
          } else {
            out.push({ bracket: grp, boxes: [id] });
          }
        });
        return out.map((g) => ({
          boxes: g.boxes,
          sideLabel: g.bracket ? g.bracket.label : null,
          sideTone: g.bracket ? g.bracket.tone : "point",
        }));
      })()
    : null;

  // Bracket annotation cells for the wide redesigned view.
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
      <div
        ref={rootRef}
        className="border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] px-3 py-4"
      >
        <div className="font-mono text-[var(--point)] text-[0.75em] uppercase tracking-[0.16em] mb-4">
          {redesigned ? "Redesigned flow " : "Standard flow"}
        </div>

        {/* Tag row — wide only. */}
        {!narrow && <div className="flex flex-row gap-px mb-1">{tagCells}</div>}

        {/* Boxes — narrow stacks them by bracket group with a rotated side
            label; wide keeps the horizontal row. Each box has a `layoutId`
            so framer animates it across mode toggles even when groups (and
            therefore parent containers) reshape. */}
        {narrow ? (
          <div className="flex flex-col">
            {narrowGroups.map((g, gi) => (
              <React.Fragment key={gi}>
                <div className="flex flex-row gap-3 items-stretch">
                  <div className="flex-1 min-w-0 flex flex-col items-stretch gap-px">
                    {g.boxes.map((id, bi) => {
                      const open = cfg[id].grow > 0;
                      const hasNextOpen = g.boxes
                        .slice(bi + 1)
                        .some((nid) => cfg[nid].grow > 0);
                      return (
                        <React.Fragment key={id}>
                          {renderBox(id)}
                          {open && hasNextOpen && (
                            <FlowArrow key={`arr-${id}`} vertical />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  {g.sideLabel && (
                    <SideLabel label={g.sideLabel} tone={g.sideTone} />
                  )}
                </div>
                {/* Inter-group arrow — aligned with the box column above. */}
                {gi < narrowGroups.length - 1 && (
                  <div className="flex flex-row gap-3 items-stretch">
                    <div className="flex-1 min-w-0">
                      <FlowArrow vertical />
                    </div>
                    <div className="shrink-0 w-8" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex flex-row items-stretch gap-px">{cells}</div>
        )}

        {/* Wide-mode annotation below the row. */}
        {!narrow && (
          <AnimatePresence mode="wait" initial={false}>
            {redesigned ? (
              <motion.div
                key="brackets"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-row gap-px mt-3">
                  {renderBrackets()}
                </div>
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
        )}
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
