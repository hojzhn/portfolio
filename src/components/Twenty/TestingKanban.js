import React from "react";
import { ChartContainer } from "../../pages/Flag.content";
import MonoLabel from "../MonoLabel";

/**
 * TestingKanban
 *
 * Three-lane kanban of testing findings, sorted by impact on the design.
 * Default lanes are Green (kept as-is), Yellow (watch and follow up),
 * and Red (ship a fix before launch). Each lane contains finding cards
 * with a code, title, implication, and action.
 *
 * Props (all optional):
 *   lanes: array of { key, color, label, description, items: [...] }
 *
 * Each item is { code, title, implication, action }.
 */

const defaultLanes = [
  {
    key: "green",
    color: "bg-emerald-500",
    label: "Green",
    description: "Kept as-is",
    items: [
      {
        code: "G1",
        title: "Focus is discoverable",
        implication: "Every tester reached for Focus on their own.",
        action: "Keep.",
      },
      {
        code: "G2",
        title: "Auto-select after Mark Done preserves flow",
        implication: "Testers worked through the inbox one row at a time.",
        action: "Keep, but see R1.",
      },
      {
        code: "G3",
        title: "The data felt real",
        implication:
          "Testers laughed at procrastinated tasks. The realism made them lean in.",
        action: "Keep.",
      },
    ],
  },
  {
    key: "yellow",
    color: "bg-amber-400",
    label: "Yellow",
    description: "Watch and follow up",
    items: [
      {
        code: "Y1",
        title: "Default rows do not telegraph what is inside",
        implication:
          "Testers used Focus as a noise filter, not a deal-context tool.",
        action: "Add a row-level trigger icon.",
      },
      {
        code: "Y2",
        title: "Resolve-with went unused",
        implication: "Either invisible, or one-at-a-time felt fast enough.",
        action: "Follow-up session.",
      },
      {
        code: "Y3",
        title: "Hesitation before sending",
        implication: "A single primary button feels final.",
        action: "Add Save draft and Schedule send to a split button.",
      },
    ],
  },
  {
    key: "red",
    color: "bg-rose-500",
    label: "Red",
    description: "Immediate Fix",
    items: [
      {
        code: "R1",
        title: "Auto-select speed enables hasty Mark Done",
        implication:
          "A few testers blew past tasks they should not have closed.",
        action: "Ship the top-toast Undo.",
      },
      {
        code: "R2",
        title: "Default-row legibility",
        implication: "Escalates from Y1 if the trigger icon does not solve it.",
        action: "Retest.",
      },
    ],
  },
];

export default function TestingKanban({ lanes = defaultLanes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {lanes.map((lane) => (
        <Lane key={lane.key} {...lane} />
      ))}
    </div>
  );
}

// ============================================================
// Internal pieces
// ============================================================

function Lane({ color, label, description, items }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="pb-3 border-b border-[var(--bg3)]">
        <div className="text-[var(--txt)] font-medium flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`inline-block w-2.5 h-2.5 rounded-full ${color}`}
          />
          <span>{label}</span>
        </div>
        {description && (
          <div className="text-xs text-[var(--txt2)]">{description}</div>
        )}
      </div>
      {items.map((item, i) => (
        <FindingCard key={i} {...item} />
      ))}
    </div>
  );
}

function FindingCard({ code, title, implication, action }) {
  return (
    <div className="bg-[var(--bg2)] border border-[var(--bg3)] rounded p-4">
      <div className="font-mono text-[11px] text-[var(--txt3)] mb-2 tracking-[0.06em]">
        {code}
      </div>
      <div className="text-[13px] font-medium text-[var(--txt)] leading-[1.4] mb-2">
        {title}
      </div>
      <div className="text-[12px] text-[var(--txt2)] leading-[1.55]">
        {implication}{" "}
      </div>
    </div>
  );
}
