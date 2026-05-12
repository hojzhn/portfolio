import React, { useState } from "react";
import MonoLabel from "../components/MonoLabel";

/**
 * BeforeAfterTaskList
 *
 * Editorial component showing Marcus's open Tasks at 4:55 PM. Two configs of
 * the same view object:
 *
 *   BEFORE — focus = null. All 14 open Tasks render flat, sorted by createdAt
 *            descending. Conditional formatting (blocking, dueDate) still
 *            fires, so the COI flag is technically visible. It just sits in
 *            row 5 of 14 with no structural reason to stand out.
 *
 *   AFTER  — focus = Gopuff pilot Opportunity (a P1 record). The view pulls
 *            in any open Task within distance ≤ 2 of the focus, sorted by
 *            distance ascending. Five Tasks come into focus. The remaining
 *            nine Tasks live below the fold as a quiet tail.
 *
 * Distance is computed by traversing relations from the Task's parent record
 * toward the focus. In a real workspace this would be a formula field or a
 * workflow-derived value. For the editorial, we hardcode the distance.
 *
 * Distance is used for sort. It is not rendered on each row.
 */

// ============================================================
// Records used as anchors for relation chips
// ============================================================

const PERSON = { type: "Person" };
const NOTE = { type: "Note" };
const OPP = { type: "Opportunity" };
const COMPANY = { type: "Company" };

const GOPUFF = {
  ...OPP,
  name: "Gopuff pilot",
  fields: { priority: "P1", amount: "$480K" },
};

// ============================================================
// Tasks
// ============================================================
//
// distance: graph distance from the task's parent record to the focus
//   record (Gopuff Opportunity). Hardcoded for the editorial.
//
//     0   parent IS the focus record
//     1   parent has a direct relation to the focus
//     2   parent reaches the focus through one intermediate record
//   ∞     no path

const tasks = [
  {
    id: 1,
    title: "Review marketing copy from agency",
    parent: { ...NOTE, name: "Note on Marketing Opp" },
    distance: Infinity,
    createdAt: "4:00 PM",
  },
  {
    id: 2,
    title: "Follow up if Priya doesn't reply by Friday",
    parent: { ...PERSON, name: "Priya" },
    distance: 1,
    createdAt: "1:35 PM",
    dueDate: "Friday",
  },
  {
    id: 3,
    title: "Follow up: warm intro from Garrett",
    parent: { ...PERSON, name: "Garrett" },
    distance: Infinity,
    createdAt: "1:30 PM",
  },
  {
    id: 4,
    title: "Update Q4 board deck",
    parent: { ...COMPANY, name: "Volt" },
    distance: Infinity,
    createdAt: "1:00 PM",
  },
  {
    id: 5,
    title: "Annual privacy policy review",
    parent: { ...COMPANY, name: "Volt" },
    distance: Infinity,
    createdAt: "1:00 PM",
  },
  {
    id: 6,
    title: "Renew domain, expires in 14 days",
    parent: { ...COMPANY, name: "Volt" },
    distance: Infinity,
    createdAt: "1:00 PM",
  },
  {
    id: 7,
    title: "Schedule weekly investor sync",
    parent: { ...COMPANY, name: "Investor Co." },
    distance: Infinity,
    createdAt: "1:00 PM",
  },
  {
    id: 8,
    title: "Pay supplier invoice, due Wed",
    parent: { ...COMPANY, name: "Office Supplies Co." },
    distance: Infinity,
    createdAt: "12:00 PM",
  },
  {
    id: 9,
    title: "Reply to recruiter from RetailFlow",
    parent: { ...PERSON, name: "Recruiter" },
    distance: Infinity,
    createdAt: "11:42 AM",
  },
  {
    id: 10,
    title: "Send insurance certificate ",
    parent: { ...PERSON, name: "Maya" },
    distance: 1,
    createdAt: "11:08 AM",
  },
  {
    id: 11,
    title: "Acme Corp: no activity in 30 days",
    parent: { ...OPP, name: "Acme Corp" },
    distance: Infinity,
    createdAt: "9:30 AM",
  },
  {
    id: 12,
    title: "Review note: weld failure on enclosure",
    parent: { ...NOTE, name: "Note on Gopuff Opp" },
    distance: 1,
    createdAt: "9:16 AM",
  },
  {
    id: 13,
    title: "Follow up on chip ETA",
    parent: { ...PERSON, name: "Shenzhen contact" },
    distance: 2,
    createdAt: "8:48 AM",
  },
  {
    id: 14,
    title: "Reply to Priya re SOC 2",
    parent: { ...PERSON, name: "Priya" },
    distance: 1,
    createdAt: "8:48 AM",
  },
];

// ============================================================
// View configs
// ============================================================

const sharedConfig = {
  object: "Task",
  filter: "status = open",
  rowFields: ["title", "parent", "blocking", "createdAt"],
  highlight: [
    { when: "blocking ≠ ∅", treatment: "warn" },
    { when: "dueDate > now", treatment: "dimmed" },
  ],
};

const beforeConfig = {
  ...sharedConfig,
  focus: null,
  sort: "createdAt desc",
};

const afterConfig = {
  ...sharedConfig,
  focus: GOPUFF,
  include: "distance ≤ 2",
  sort: "distance asc, createdAt desc",
};

// ============================================================
// Helpers
// ============================================================

const objectDot = {
  Person: "bg-[var(--point2)]",
  Note: "bg-[var(--point3)]",
  Opportunity: "bg-[var(--point)]",
  Company: "bg-[var(--point1)]",
};

function resolveTreatment(task, rules) {
  for (const rule of rules) {
    if (rule.when === "blocking ≠ ∅" && task.blocking) return "warn";
    if (rule.when === "dueDate > now" && task.dueDate) return "dimmed";
  }
  return null;
}

function sortByCreatedDesc(a, b) {
  // Lex compare works since we use AM/PM strings; in real Twenty it would
  // be a real timestamp. Reverse alphabetical, hour-first for the editorial.
  return a.createdAt < b.createdAt ? 1 : -1;
}

// ============================================================
// Component
// ============================================================

export default function BeforeAfterTaskList() {
  const [view, setView] = useState("before");
  const config = view === "before" ? beforeConfig : afterConfig;

  return (
    <article className="max-w-[760px] mx-auto px-6 py-8 bg-[var(--bg)] text-[var(--txt)] font-sans leading-[1.55]">
      <header className="flex justify-between items-end gap-4 mb-5 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <h2 className="text-[1.4rem] font-medium leading-tight tracking-[-0.01em] mt-2 text-[var(--txt)]">
            Tasks in view: 14 -> 4
          </h2>
        </div>
        <ViewToggle view={view} setView={setView} />
      </header>

      <ConfigPanel config={config} />

      {view === "before" ? (
        <FlatList tasks={tasks} config={config} />
      ) : (
        <FocusedView tasks={tasks} config={config} />
      )}

      <footer className="mt-4 pt-3 border-t border-[var(--bg3)]">
        <Caption view={view} />
      </footer>
    </article>
  );
}

// ============================================================
// Toggle
// ============================================================

function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-1">
      {[
        { key: "before", label: "Before" },
        { key: "after", label: "After" },
      ].map((opt) => (
        <button
          key={opt.key}
          onClick={() => setView(opt.key)}
          data-active={view === opt.key}
          className="px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] border border-[var(--bg3)] rounded cursor-pointer bg-[var(--bg)] text-[var(--txt2)] data-[active=true]:bg-[var(--bg2)] data-[active=true]:text-[var(--txt)] data-[active=true]:border-[var(--txt2)]"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// Config panel
// ============================================================

function ConfigPanel({ config }) {
  const focusLabel = config.focus
    ? `focus: ${config.focus.name}`
    : "focus: none";

  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-3 pb-3 border-b border-[var(--bg3)]">
      <ConfigChip label={focusLabel} active={!!config.focus} />
      {config.include && <ConfigChip label={`include: ${config.include}`} />}
   
    </div>
  );
}

function ConfigChip({ label, active }) {
  return (
    <span
      data-active={!!active}
      className="font-mono text-[10px] uppercase tracking-[0.06em] px-2 py-1 rounded border border-[var(--bg3)] text-[var(--txt2)] data-[active=true]:text-[var(--txt)] data-[active=true]:border-[var(--txt2)] data-[active=true]:bg-[var(--bg2)]"
    >
      {label}
    </span>
  );
}

// ============================================================
// Flat list (Before)
// ============================================================

function FlatList({ tasks, config }) {
  const sorted = [...tasks].sort(sortByCreatedDesc);
  return (
    <div className="flex flex-col">
      {sorted.map((t) => (
        <TaskRow key={t.id} task={t} highlight={config.highlight} />
      ))}
    </div>
  );
}

// ============================================================
// Focused view (After)
// ============================================================

function FocusedView({ tasks, config }) {
  const inFocus = tasks
    .filter((t) => t.distance <= 2)
    .sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      return sortByCreatedDesc(a, b);
    });

  const excluded = tasks.filter((t) => t.distance > 2);

  return (
    <div className="flex flex-col">
      <FocusHeader record={config.focus} />
      {inFocus.map((t) => (
        <TaskRow key={t.id} task={t} highlight={config.highlight} />
      ))}
      <Tail count={excluded.length} focusName={config.focus.name} />
    </div>
  );
}

function FocusHeader({ record }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[var(--bg3)]">
      <span className={`w-2 h-2 rounded-full ${objectDot[record.type]}`} />
      <span className="font-medium text-[var(--txt)]">{record.name}</span>
      {record.fields.priority && (
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded bg-[var(--bg2)] text-[var(--txt)]">
          {record.fields.priority}
        </span>
      )}
      {record.fields.amount && (
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] px-1.5 py-0.5 rounded bg-[var(--bg2)] text-[var(--txt2)]">
          {record.fields.amount}
        </span>
      )}
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--txt3)] ml-auto">
        {record.type}
      </span>
    </div>
  );
}

function Tail({ count, focusName }) {
  return (
    <div className="flex items-center gap-3 py-3 mt-2 border-t border-dashed border-[var(--bg3)] opacity-60">
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--txt3)]">
        + {count} other open Tasks, no relation to {focusName}
      </span>
    </div>
  );
}

// ============================================================
// Task row
// ============================================================

function TaskRow({ task, highlight }) {
  const treatment = resolveTreatment(task, highlight);

  return (
    <div
      data-treatment={treatment}
      className="flex items-center gap-3 py-2 border-b border-[var(--bg2)] data-[treatment=dimmed]:opacity-50"
    >
      <span className="flex-1 text-[var(--txt)] data-[treatment=dimmed]:text-[var(--txt2)]">
        {task.title}
      </span>
      <ParentChip parent={task.parent} />
      {task.blocking && treatment === "warn" && (
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] font-semibold whitespace-nowrap text-[var(--point1)]">
          ⚠ {task.blocking}
        </span>
      )}
      <span className="font-mono text-[10px] whitespace-nowrap text-[var(--txt3)] w-16 text-right">
        {task.createdAt}
      </span>
    </div>
  );
}

function ParentChip({ parent }) {
  return (
    <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[11px] text-[var(--txt2)] bg-[var(--bg2)] whitespace-nowrap">
      <span className={`w-1.5 h-1.5 rounded-full ${objectDot[parent.type]}`} />
      {parent.name}
    </span>
  );
}

// ============================================================
// Caption
// ============================================================

function Caption({ view }) {
  if (view === "before") {
    return (
      <p className="text-[0.8rem] text-[var(--txt2)] ">
        With no focus set, the inbox shows all 14 open Tasks. The COI's blocking
        flag is technically visible at row 5, but it sits next to nine unrelated
        Tasks. Marcus's only triage tool is his memory of which names matter.
        Maya is a coordinator he has never spoken to.
      </p>
    );
  }
  return (
    <p className="text-[0.8rem] text-[var(--txt2)] ">
      Focus is set to the Gopuff Opportunity, marked P1 by Marcus. The view
      pulls any Task within graph-distance 2 of Gopuff and sorts by distance
      ascending. Five Tasks surface. The chip ETA Task on the Shenzhen contact
      reaches Gopuff through two hops, so it appears at the bottom of the
      focused list. Nine other open Tasks remain below the fold, one config
      change away.
    </p>
  );
}
