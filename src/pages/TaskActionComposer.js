import React, { useState } from "react";
import MonoLabel from "../components/MonoLabel";

/**
 * TaskActionComposer
 *
 * Editorial component showing what happens when Marcus opens a Task to act
 * on it. The action surface is an email composer (because the Task's
 * actionType is "email-reply"). Alongside the composer, a nearby panel
 * lists the other in-focus Tasks: anything within graph-distance ≤ 2 of
 * the same focus record (Gopuff pilot Opportunity).
 *
 * Same primitive as the inbox — focus + distance — applied to a second
 * surface. The inbox surfaces what to do. The composer surfaces what
 * context to bring with you while doing it.
 *
 * Quick actions per nearby Task: mention, attach, skip. The Task and its
 * available actions vary by what's possible (file present, etc.). Picking
 * an action does not close the underlying Task. It links the Task to the
 * sent email. The user closes Tasks themselves when the underlying work
 * is actually done.
 */

// ============================================================
// Records
// ============================================================

const PERSON = { type: "Person" };
const NOTE = { type: "Note" };

const focusRecord = {
  type: "Opportunity",
  name: "Gopuff pilot",
  fields: { priority: "P1", amount: "$480K" },
};

const primaryTask = {
  id: "primary",
  title: "Reply to Priya re SOC 2",
  parent: { ...PERSON, name: "Priya" },
  actionType: "email-reply",
  to: "priya@gopuff.com",
  subject: "Re: SOC 2 timeline + revised delivery date",
};

const nearbyTasks = [
  {
    id: "coi",
    title: "Send insurance certificate to Gopuff procurement",
    parent: { ...PERSON, name: "Maya" },
    distance: 1,
    blocking: "Mon contract",
    availableActions: ["mention", "attach", "skip"],
    file: "COI_certificate.pdf",
    mentionText: "Certificate of insurance attached for Maya's records.",
  },
  {
    id: "weld",
    title: "Review note: weld failure on enclosure",
    parent: { ...NOTE, name: "Jordan's note" },
    distance: 1,
    availableActions: ["mention", "skip"],
    mentionText:
      "Weld defect identified on the enclosure prototype, third in batch. Tooling fix in progress at the contract manufacturer.",
  },
  {
    id: "chipETA",
    title: "Follow up on chip ETA",
    parent: { ...PERSON, name: "Shenzhen contact" },
    distance: 2,
    availableActions: ["mention", "skip"],
    mentionText: "BMS chip ETA has slipped 4 days. New ship date Nov 12.",
  },
  {
    id: "friday",
    title: "Follow up if Priya doesn't reply by Friday",
    parent: { ...PERSON, name: "Priya" },
    distance: 1,
    dueDate: "Friday",
    availableActions: ["skip"],
  },
];

const config = {
  inheritedFromView: {
    focus: focusRecord.name,
    contextDistance: "≤ 2",
    contextFields: 4,
  },
  composerSpecific: {
    quickActions: "email-reply: mention, attach, skip",
  },
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

function actionVerb(action) {
  return action === "mention"
    ? "mentioned in body"
    : action === "attach"
      ? "attached to email"
      : action === "skip"
        ? "skipped"
        : null;
}

// ============================================================
// Component
// ============================================================

export default function TaskActionComposer() {
  const [picks, setPicks] = useState({});
  const [sent, setSent] = useState(false);

  const setPick = (taskId, action) => {
    setPicks((prev) => ({
      ...prev,
      [taskId]: prev[taskId] === action ? null : action,
    }));
  };

  const reset = () => {
    setPicks({});
    setSent(false);
  };

  const mentionedTasks = nearbyTasks.filter((t) => picks[t.id] === "mention");
  const attachedTasks = nearbyTasks.filter((t) => picks[t.id] === "attach");

  return (
    <article className="max-w-[760px] mx-auto px-6 py-8 bg-[var(--bg)] text-[var(--txt)] font-sans leading-[1.55]">
      <header className="mb-5">
        <MonoLabel color="var(--txt2)">Acting on a Task — 4:55 PM</MonoLabel>
        <h2 className="text-[1.4rem] font-medium leading-tight tracking-[-0.01em] mt-2 text-[var(--txt)]">
          {primaryTask.title}
        </h2>
        <ActionContext task={primaryTask} focus={focusRecord} />
      </header>

      <ConfigPanel config={config} />

      {sent ? (
        <SentConfirmation
          to={primaryTask.to}
          mentioned={mentionedTasks}
          attached={attachedTasks}
          skipped={nearbyTasks.filter((t) => picks[t.id] === "skip")}
          onReset={reset}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <ComposerPane
            task={primaryTask}
            mentioned={mentionedTasks}
            attached={attachedTasks}
            onSend={() => setSent(true)}
          />
          <NearbyPane tasks={nearbyTasks} picks={picks} onPick={setPick} />
        </div>
      )}
    </article>
  );
}

// ============================================================
// Action context (subheading)
// ============================================================

function ActionContext({ task, focus }) {
  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--txt3)]">
        on
      </span>
      <ParentChip parent={task.parent} />
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--txt3)]">
        in focus
      </span>
      <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[11px] text-[var(--txt2)] bg-[var(--bg2)]">
        <span className={`w-1.5 h-1.5 rounded-full ${objectDot[focus.type]}`} />
        {focus.name}
      </span>
    </div>
  );
}

// ============================================================
// Config panel
// ============================================================

function ConfigPanel({ config }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mb-4 pb-3 border-b border-[var(--bg3)]">
      <ConfigChip
        label={`focus: ${config.inheritedFromView.focus}`}
        inherited
      />
      <ConfigChip
        label={`context distance: ${config.inheritedFromView.contextDistance}`}
        inherited
      />
      <ConfigChip
        label={`context fields: ${config.inheritedFromView.contextFields}`}
        inherited
      />
      <ConfigChip
        label={`quick-actions: ${config.composerSpecific.quickActions}`}
        active
      />
    </div>
  );
}

function ConfigChip({ label, active, inherited }) {
  return (
    <span
      data-active={!!active}
      data-inherited={!!inherited}
      className="font-mono text-[10px] uppercase tracking-[0.06em] px-2 py-1 rounded border border-[var(--bg3)] text-[var(--txt2)] data-[inherited=true]:opacity-60 data-[active=true]:opacity-100 data-[active=true]:text-[var(--txt)] data-[active=true]:border-[var(--txt2)] data-[active=true]:bg-[var(--bg2)]"
    >
      {label}
    </span>
  );
}

// ============================================================
// Composer pane (left column)
// ============================================================

function ComposerPane({ task, mentioned, attached, onSend }) {
  return (
    <div className="flex flex-col">
      <FieldRow label="To" value={task.to} />
      <FieldRow label="Subject" value={task.subject} />

      <div className="mt-3 mb-2">
        <MonoLabel color="var(--txt3)" size={10}>
          Body
        </MonoLabel>
      </div>
      <div className="min-h-[120px] py-2 px-3 border border-[var(--bg3)] rounded text-[var(--txt3)] italic text-[0.85rem]">
        Marcus drafts the SOC 2 reply here.
      </div>

      {mentioned.length > 0 && (
        <div className="mt-4">
          <MonoLabel color="var(--txt2)" size={10}>
            Context referenced ({mentioned.length})
          </MonoLabel>
          <div className="flex flex-col gap-2 mt-2">
            {mentioned.map((t) => (
              <ContextSnippet key={t.id} task={t} />
            ))}
          </div>
        </div>
      )}

      {attached.length > 0 && (
        <div className="mt-4">
          <MonoLabel color="var(--txt2)" size={10}>
            Attachments ({attached.length})
          </MonoLabel>
          <div className="flex flex-col gap-1 mt-2">
            {attached.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-2 text-[0.85rem] text-[var(--txt2)]"
              >
                <span className="font-mono text-[10px]">📎</span>
                {t.file}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onSend}
        className="mt-6 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.06em] rounded bg-[var(--txt)] text-[var(--bg)] cursor-pointer self-start"
      >
        Send reply
      </button>
    </div>
  );
}

function FieldRow({ label, value }) {
  return (
    <div className="flex items-baseline gap-3 py-1.5 border-b border-[var(--bg2)]">
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--txt3)] w-14">
        {label}
      </span>
      <span className="text-[var(--txt)] text-[0.9rem]">{value}</span>
    </div>
  );
}

function ContextSnippet({ task }) {
  return (
    <div className="text-[0.8rem] text-[var(--txt2)] pl-3 border-l-2 border-[var(--bg3)]">
      {task.mentionText}
    </div>
  );
}

// ============================================================
// Nearby pane (right column)
// ============================================================

function NearbyPane({ tasks, picks, onPick }) {
  return (
    <div className="flex flex-col">
      <div className="mb-3">
        <MonoLabel color="var(--txt2)" size={10}>
          Nearby
        </MonoLabel>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((t) => (
          <NearbyTaskRow
            key={t.id}
            task={t}
            pick={picks[t.id]}
            onPick={onPick}
          />
        ))}
      </div>
    </div>
  );
}

function NearbyTaskRow({ task, pick, onPick }) {
  const dimmed = !!task.dueDate;

  return (
    <div
      data-treatment={dimmed ? "dimmed" : null}
      className="flex flex-col gap-2 p-2 rounded border border-[var(--bg3)] data-[treatment=dimmed]:opacity-50"
    >
      <div className="flex items-start gap-2">
        <span className="flex-1 text-[0.85rem] text-[var(--txt)]">
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <ParentChip parent={task.parent} />
        {task.blocking && (
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] font-semibold text-[var(--point1)]">
            ⚠ {task.blocking}
          </span>
        )}
        {task.dueDate && (
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-[var(--txt3)]">
            due {task.dueDate}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        {["mention", "attach", "skip"].map((action) => (
          <ActionButton
            key={action}
            action={action}
            available={task.availableActions.includes(action)}
            picked={pick === action}
            onClick={() => onPick(task.id, action)}
          />
        ))}
      </div>
    </div>
  );
}

function ActionButton({ action, available, picked, onClick }) {
  return (
    <button
      onClick={available ? onClick : undefined}
      disabled={!available}
      data-picked={!!picked}
      data-available={available}
      className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] rounded border border-[var(--bg3)] text-[var(--txt2)] data-[available=false]:opacity-30 data-[available=false]:cursor-not-allowed data-[available=true]:cursor-pointer data-[picked=true]:bg-[var(--bg2)] data-[picked=true]:text-[var(--txt)] data-[picked=true]:border-[var(--txt2)]"
    >
      {action}
    </button>
  );
}

// ============================================================
// Parent chip (reused from inbox)
// ============================================================

function ParentChip({ parent }) {
  return (
    <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[11px] text-[var(--txt2)] bg-[var(--bg2)] whitespace-nowrap">
      <span className={`w-1.5 h-1.5 rounded-full ${objectDot[parent.type]}`} />
      {parent.name}
    </span>
  );
}

// ============================================================
// Sent confirmation
// ============================================================

function SentConfirmation({ to, mentioned, attached, skipped, onReset }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="py-3 px-4 border border-[var(--bg3)] rounded bg-[var(--bg2)]">
        <MonoLabel color="var(--txt2)" size={10}>
          Sent
        </MonoLabel>
        <div className="text-[var(--txt)] mt-1">Reply sent to {to}.</div>
      </div>

      <div className="flex flex-col gap-2">
        <MonoLabel color="var(--txt2)" size={10}>
          What happened to nearby Tasks
        </MonoLabel>
        {mentioned.map((t) => (
          <SummaryRow
            key={t.id}
            task={t}
            outcome="mentioned in reply, Task linked, stays open"
          />
        ))}
        {attached.map((t) => (
          <SummaryRow
            key={t.id}
            task={t}
            outcome="file attached, Task linked, stays open"
          />
        ))}
        {skipped.map((t) => (
          <SummaryRow key={t.id} task={t} outcome="skipped" muted />
        ))}
        {mentioned.length === 0 &&
          attached.length === 0 &&
          skipped.length === 0 && (
            <div className="text-[0.85rem] text-[var(--txt3)] italic">
              No nearby Tasks were referenced.
            </div>
          )}
      </div>

      <button
        onClick={onReset}
        className="mt-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] rounded border border-[var(--bg3)] text-[var(--txt2)] cursor-pointer self-start"
      >
        Reset
      </button>
    </div>
  );
}

function SummaryRow({ task, outcome, muted }) {
  return (
    <div
      data-muted={!!muted}
      className="flex items-baseline gap-3 py-1 text-[0.85rem] data-[muted=true]:opacity-60"
    >
      <span className="text-[var(--txt)] flex-1">{task.title}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--txt3)] whitespace-nowrap">
        {outcome}
      </span>
    </div>
  );
}
