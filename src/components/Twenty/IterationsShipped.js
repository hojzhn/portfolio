// Module 4 deliverable for the Volt inbox inside Twenty.
// Documents the platform constraints, the iterations considered, the
// version that shipped, and a recovery sketch.

import FindingParagraph from "../FindingParagraph";
import { BulletVertical, ListVertical } from "../ListVertical";
import MonoLabel from "../MonoLabel";
import ResponsiveColumns from "../ResponsiveColumns";
import SimpleList from "../SimpleList";

// ============================================================================
// Wireframe primitives
// ============================================================================

function WPane({ children, label, flex = 1, className = "" }) {
  return (
    <div
      className={`flex flex-col rounded border border-[var(--bg3)] bg-[var(--bg)] overflow-hidden${className}`}
      style={{ flex }}
    >
      {label && (
        <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.06em] text-[var(--txt2)] border-b border-[var(--bg3)]">
          {label}
        </div>
      )}
      <div className="p-3 flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function WBar({ width = "100%", height = 7, dim = false }) {
  return (
    <div
      className={`rounded-sm bg-[var(--bg3)] ${dim ? "opacity-50" : ""}`}
      style={{ width, height }}
    />
  );
}

function WRow({ label, children }) {
  return (
    <div className="grid grid-cols-[68px_1fr] gap-2 items-center min-h-[18px]">
      <span className="text-[10px] text-[var(--txt2)]">{label}</span>
      <div className="flex items-center gap-1 min-w-0 flex-wrap">
        {children}
      </div>
    </div>
  );
}

function WChip({ children, accent }) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] whitespace-nowrap ${
        accent
          ? "border-[var(--point)] text-[var(--point)] bg-[var(--bg2)]"
          : "border-[var(--bg3)] text-[var(--txt2)]"
      }`}
    >
      {children}
    </span>
  );
}

function WSection({ children }) {
  return (
    <div className="text-[10px] text-[var(--txt2)] mt-1.5 mb-0.5">
      {children}
    </div>
  );
}

function FrameCaption({ children }) {
  if (!children) return null;
  return (
    <>
      <MonoLabel>What It Does</MonoLabel>
      <div className="text-[var(--txt2)] ">{children}</div>
    </>
  );
}

function WTaskRow({ active, dot = true, children }) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 -mx-2 rounded ${
        active ? "bg-[var(--bg2)]" : ""
      }`}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--point)] shrink-0" />
      )}
      <span className="text-[11px] text-[var(--txt)] flex-1 truncate">
        {children}
      </span>
    </div>
  );
}

// ============================================================================
// Iteration frames
// ============================================================================

function Iteration1Frame() {
  return (
    <WPane label="Inbox · inline action expand">
      <WTaskRow>Acme Corp: no activity in 30 days</WTaskRow>
      <WTaskRow>Review note: weld failure</WTaskRow>
      <WTaskRow active>Reply to Priya re SOC2</WTaskRow>
      <div className="ml-5 mt-1 mb-1 p-3 rounded border border-[var(--bg3)] bg-[var(--bg2)] flex flex-col gap-1.5">
        <div className="text-[10px] uppercase tracking-[0.06em] text-[var(--txt2)] mb-0.5">
          Reply
        </div>
        <WRow label="Subject">
          <WBar />
        </WRow>
        <WRow label="Body">
          <div className="flex flex-col gap-1 w-full">
            <WBar />
            <WBar width="85%" />
            <WBar width="60%" />
          </div>
        </WRow>
        <div className="flex justify-end mt-1">
          <WChip accent>Send and clear</WChip>
        </div>
      </div>
      <WTaskRow>Send insurance certificate</WTaskRow>
      <WTaskRow>Follow up on chip ETA</WTaskRow>
    </WPane>
  );
}

function InboxPane({ activeId }) {
  return (
    <WPane label="Inbox · focus + groups" flex={1.3}>
      <div className="flex gap-1">
        <WChip accent>● Focus: Gopuff Pilot ✕</WChip>
      </div>
      <WSection>Direct (3)</WSection>
      <WTaskRow active={activeId === "priya"}>Reply to Priya</WTaskRow>
      <WTaskRow active={activeId === "weld"}>Weld note</WTaskRow>
      <WTaskRow active={activeId === "wei"}>Follow up chip ETA</WTaskRow>
      <WSection>2 hops away (1)</WSection>
      <WTaskRow active={activeId === "maya"}>Send COI</WTaskRow>
    </WPane>
  );
}

function Iteration2Frame() {
  return (
    <div className="flex gap-1">
      <InboxPane activeId="priya" />
      <WPane label="Action: Reply" flex={1}>
        <WRow label="From">
          <WBar />
        </WRow>
        <WRow label="To">
          <WBar width="55%" />
        </WRow>
        <WRow label="Subject">
          <WBar />
        </WRow>
        <WRow label="Body">
          <div className="flex flex-col gap-1 w-full">
            <WBar />
            <WBar width="80%" />
            <WBar width="60%" />
          </div>
        </WRow>
        <div className="flex justify-end mt-1">
          <WChip accent>Send and clear</WChip>
        </div>
      </WPane>
    </div>
  );
}

function Iteration3Frame() {
  return (
    <div className="flex gap-1">
      <InboxPane activeId="priya" />
      <WPane label="Action panel · metadata + action" flex={1}>
        <WRow label="Trigger">
          <span className="text-[10px] text-[var(--txt2)]">email_reply</span>
        </WRow>
        <WRow label="Relations">
          <WChip>Priya</WChip>
          <WChip>Gopuff Pilot</WChip>
        </WRow>
        <WRow label="Resolve">
          <WChip>Reply to Priya</WChip>
        </WRow>
        <div className="border-t border-[var(--bg3)] my-1" />
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[10px] uppercase tracking-[0.06em] text-[var(--txt2)]">
            Reply
          </span>
          <span className="text-[10px] text-[var(--txt2)]">▾</span>
        </div>
        <WRow label="Subject">
          <WBar />
        </WRow>
        <WRow label="Body">
          <div className="flex flex-col gap-1 w-full">
            <WBar />
            <WBar width="80%" />
          </div>
        </WRow>
        <div className="flex justify-end mt-1">
          <WChip accent>Send and clear</WChip>
        </div>
      </WPane>
    </div>
  );
}

// ============================================================================
// Recovery frame
// ============================================================================

function RecoveryFrame() {
  return (
    <div className="rounded border border-[var(--bg3)] bg-[var(--bg)] overflow-hidden">
      <div className="px-3 py-2 bg-[var(--bg2)] border-b border-[var(--point)] flex items-center justify-center gap-3">
        <span className="text-[11px] text-[var(--point)]">
          Marked done · Reply to Priya
        </span>
        <span className="text-[11px] text-[var(--point)] font-semibold cursor-pointer underline underline-offset-2">
          Undo
        </span>
        <span className="text-[10px] text-[var(--txt2)] ml-1">✕</span>
      </div>
      <div className="p-3 min-h-[120px] flex flex-col gap-1.5">
        <div className="text-[10px] uppercase tracking-[0.06em] text-[var(--txt2)] mb-1">
          Inbox · 1 fewer task after Mark Done
        </div>
        <div className="flex flex-col gap-1.5 opacity-60">
          <WTaskRow dot={false}>
            <WBar width="80%" dim />
          </WTaskRow>
          <WTaskRow dot={false}>
            <WBar width="60%" dim />
          </WTaskRow>
          <WTaskRow dot={false}>
            <WBar width="70%" dim />
          </WTaskRow>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Iteration list
// ============================================================================

const VERDICT_ICONS = {
  rejected: {
    icon: "fa-solid fa-xmark",
    color: "var(--txt2)",
    label: "Rejected",
  },
  semi: {
    icon: "fa-solid fa-triangle-exclamation",
    color: "var(--point2)",
    label: "Semi-shipped",
  },
  shipped: {
    icon: "fa-solid fa-check",
    color: "var(--point)",
    label: "Shipped",
  },
};

const ITERATIONS = [
  {
    n: 1,
    title: "Inline expand · action on the row",
    Frame: Iteration1Frame,
    tradeoff: [
      "Inline space runs out fast (compose an email inside a row?), so the user will likely shove the action back onto the right panel for room.",
      "Once that happens, panel meaning shifts on every interaction: right = info one click, action the next, info again the click after.",
      "Twenty's action-on-right pattern isn't strict, but the inconsistency itself is what's confusing. Users can't form a stable mental model of what each panel does.",
    ],
    status: "rejected",
    caption:
      "Inline action eats vertical space. The user will likely move the composer to the right panel for room, and from then on each interaction redefines what the right panel means.",
  },
  {
    n: 2,
    title: "Bare action panel · just the action",
    Frame: Iteration2Frame,
    tradeoff: [
      "Right panel held only the reply form (or note composer, etc).",
      "If the user clicked a related chip to inspect an entity, the main panel would have to swap. With no metadata anchored on either side, the originating task context was gone.",
      "So the user couldn't safely look sideways while drafting a response.",
    ],
    status: "semi",
    caption:
      "Right panel = only the action. No trigger / relations / resolve. If the user clicks a chip in the body to inspect a related entity, the originating task context is gone.",
  },
  {
    n: 3,
    title: "Action panel carries task metadata + the action",
    Frame: Iteration3Frame,
    tradeoff: [
      "Right panel now leads with task metadata (trigger, relations, resolve) and shows the action below.",
      "Open question: how much metadata before the panel feels cluttered? Did NOT pull the entire configurable Focus layout in here. The full focus stays on the main list.",
      "Now safe to click a chip: main panel swaps to the related entity's record detail, but the action panel keeps the original task pinned so the user can return.",
    ],
    status: "shipped",
    keep: true,
    caption:
      "Right panel leads with task metadata, then the action. A chip click can now safely swap the main panel to the related entity's record detail. The action panel keeps the originating task pinned so the user can return.",
  },
];

const PILL_PATH = [
  {
    label: "Click a chip in the action panel",
    detail:
      "Action panel stays mounted. Main panel swaps to the entity's record detail. Action context isn't lost.",
  },
  {
    label: "Click a context box (email / mention)",
    detail:
      "Same swap, but with the right detail tab pre-selected (Emails for emails, Note for mentions).",
  },
  {
    label: "Mark done",
    detail:
      "Task is removed from the inbox and the next adjacent task is auto-selected so the action panel never goes empty.",
  },
];

// ============================================================================
// Page
// ============================================================================

function IterationCard({ iter }) {
  const Frame = iter.Frame;
  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded border ${
        iter.keep
          ? "border-[var(--point)] bg-[var(--bg2)]"
          : "border-dashed border-[var(--bg3)] bg-[var(--bg2)]"
      }`}
    >
      <div className="flex items-baseline justify-between ">
        <MonoLabel
          margin={false}
          className={`${iter.keep && "text-[var(--point)]"}`}
        >
          Iteration #{iter.n}
        </MonoLabel>

        {(() => {
          const v = VERDICT_ICONS[iter.status];
          if (!v) return null;
          return (
            <span
              aria-label={v.label}
              title={v.label}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full"
              style={{ color: v.color }}
            >
              <i className={`${v.icon} text-[14px]`} />
            </span>
          );
        })()}
      </div>
      <div className="text-lg">{iter.title}</div>
      {Frame && (
        <div className="flex flex-col gap-2">
          <Frame />
        </div>
      )}
      <ResponsiveColumns line={false} className="p-4">
        <FrameCaption>{iter.caption}</FrameCaption>
        <SimpleList items={iter.tradeoff} label="Notes" />
      </ResponsiveColumns>
    </div>
  );
}

export function IterationsShipped() {
  return (
    <>
      <div className="flex flex-col gap-4">
        {ITERATIONS.map((it) => (
          <IterationCard key={it.n} iter={it} />
        ))}
      </div>

      <FindingParagraph
        title="Additional consideration #1"
        tagline="Chip behavior and context persistence"
        desc="
        This was considered from iteration 2's failure mode (clicking a related-entity pill would either close the action panel or replace the inbox list). The resolution was to make the chip click swap the main area to the record detail and leave the action panel mounted on the right.
        "
      />
      <ListVertical numbered={true}>
        {PILL_PATH.map((p) => (
          <BulletVertical numbered={true} title={p.label} className="py-4">
            {p.detail}
          </BulletVertical>
        ))}
      </ListVertical>

      <FindingParagraph
        title="Additional consideration #2"
        tagline="A 5-second Undo toast"
        desc="
      It solves accidental resolution through misclick or “fat finger” input. The system uses a 5-second Undo toast in Twenty’s existing global toast area, restoring the Task and re-selecting it if reverted.
        "
      />

      <RecoveryFrame />
    </>
  );
}
