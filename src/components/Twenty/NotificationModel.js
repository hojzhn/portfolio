import React from "react";
import MonoLabel from "../MonoLabel";
import { ChartContainer } from "../../pages/Flag.content";
import ResponsiveColumns from "../ResponsiveColumns";

/**
 * NotificationModel
 *
 * Editorial walkthrough of the data definition: what a notification is,
 * how it relates to a Task, how the action defaults from a trigger, and
 * what that implies for the interface.
 *
 * Mirrors the layout grammar of PersonaIntro and HMWFraming
 * (ChartContainer + ResponsiveColumns + MonoLabel + display typography).
 *
 * Props (all optional):
 *   data: object overriding the default content.
 */

const defaultData = {
  thesis: "Notification = Action + Task",
  intro:
    "The distinguishing property is the action. A Task describes a unit of work. A notification indicates that work now requires intervention. The same underlying Task may exist without becoming a notification until the system can attach a meaningful action to it.",
  inShortLead: "In that sense:",
  shortCompare: {
    left: { label: "Task", body: "A stateful record." },
    right: {
      label: "Notification",
      body: "An action opportunity generated from that record.",
    },
  },
  triggerLead: "The action is usually inferred from the trigger:",
  triggers: [
    { trigger: "email_reply", action: "Reply" },
    { trigger: "mention", action: "Open Note" },
    { trigger: "date_trigger", action: "Decide" },
    { trigger: "workflow_alert", action: "Review" },
  ],
  decoupling:
    "This mapping provides a default behavior, but the action layer remains decoupled from the underlying Task object. The user may change how they resolve the notification without mutating the Task itself.",
  uiLead: "This distinction affects the interface structure.",
  implication:
    "Since the notification is defined by the action, the UI should land the user directly on the execution surface, with the Task acting as contextual payload rather than the primary destination.",
  splitLead: "The result is a split responsibility:",
  splitCompare: {
    left: {
      label: "Task",
      body: "Stores context, relations, and history.",
    },
    right: {
      label: "Notification",
      body: "Routes the user toward an available action.",
    },
  },
  closing: "They remain connected, but are not identical.",
};

export default function NotificationModel({ data = defaultData }) {
  return (
    <>
      {/* Compare 2: Split responsibility */}
      <Lead>{data.splitLead}</Lead>
      <Compare {...data.splitCompare} />

      {/* Closing */}
      <Closing>{data.closing}</Closing>
    </>
  );
}

// ============================================================
// Internal pieces
// ============================================================

function Body({ children }) {
  return (
    <p className="text-[15px] md:text-[16px] leading-[1.65] text-[var(--txt2)] m-0 max-w-[720px]">
      {children}
    </p>
  );
}

function Lead({ children }) {
  return <p className="text-[14px] text-[var(--txt2)] m-0">{children}</p>;
}

function Compare({ left, right }) {
  return (
    <ResponsiveColumns>
      <CompareCell {...left} />
      <CompareCell {...right} />
    </ResponsiveColumns>
  );
}

function CompareCell({ label, body }) {
  return (
    <div className="border-t border-[var(--bg3)] pt-4">
      <MonoLabel>{label}</MonoLabel>
      <p className="text-[15px] leading-[1.55] text-[var(--txt)] m-0 mt-2">
        {body}
      </p>
    </div>
  );
}

function TriggerGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 max-w-[600px] py-4 border-y border-[var(--bg3)]">
      {items.map((t, i) => (
        <div key={i} className="flex items-center gap-3">
          <code className="font-mono text-[12px] text-[var(--txt2)] bg-[var(--bg2)] px-2 py-1 rounded">
            {t.trigger}
          </code>
          <span className="text-[var(--txt3)] font-mono text-[12px]">→</span>
          <span className="text-[14px] text-[var(--txt)] font-medium">
            {t.action}
          </span>
        </div>
      ))}
    </div>
  );
}

function ImplicationBlock({ children }) {
  return (
    <div className="border-l-[3px] border-[var(--point)] pl-5 py-2 max-w-[760px]">
      <p className="text-[18px] md:text-[20px] leading-[1.45] text-[var(--txt)] m-0">
        {children}
      </p>
    </div>
  );
}

function Closing({ children }) {
  return (
    <p className="text-[15px] text-[var(--txt)] italic m-0 pt-4 border-t border-[var(--bg3)] max-w-[760px]">
      {children}
    </p>
  );
}
