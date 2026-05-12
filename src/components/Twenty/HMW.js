import React, { useState } from "react";
import MonoLabel from "../MonoLabel";
import { ChartContainer } from "../../pages/Flag.content";
import ResponsiveColumns from "../ResponsiveColumns";

/**
 * HMWFraming
 *
 * A large prose passage paired with an HMW box. Phrases inside the prose
 * are underlined in --point. Clicking one swaps the HMW box content with
 * a fade animation. The box shows a generic HMW until the first click.
 *
 * Props (all optional):
 *   passage:     Paragraph[][segment]  Each paragraph is an array of segments.
 *                                      A segment is { text } or { text, hmw }.
 *                                      Segments with hmw render as triggers.
 *   initialHMW:  string                The HMW shown before any click.
 *   label:       string                Mono label above the HMW text.
 */

const defaultPassage = [
  [
    {
      text: "The journey map exposed what looked like two separate problems. Scattered work across apps,  and buried work inside the CRM. They were the same failure.",
    },
  ],
  [
    { text: "Twenty treats relationships as explicit object links." },
    {
      text: " Real operational work does not.",
      hmw: "How might we surface related work even when object relationships are incomplete?",
    },
    {
      text: " A supplier delay, procurement email, calendar deadline, and compliance request are often a connected situation spread across partially connected systems and records, based on what the user's focus is.",
    },
  ],
  [
    {
      text: "The system could not understand proximity beyond direct references. As a result, the CRM stops functioning as the source of truth. Users ",
    },
    {
      text: "reconstruct the living context manually",
      hmw: "How might we reduce cross-app reconciliation during high-context workflows?",
    },
    {
      text: " across Slack, Gmail, Calendar, Docs, and memory, while the CRM degrades into a ",
    },
    {
      text: "retroactive log of work",
      hmw: "How might we prioritize tasks by operational impact instead of timestamp order?",
    },
    { text: " that had already happened, rather than" },
    {
      text: " an operational surface",
      hmw: "How might we turn the Tasks view from a passive log into an active operational surface?",
    },
    { text: "." },
  ],
];

const defaultInitialHMW =
  "How might we create an actionable inbox for Twenty CRM?";

export default function HMWFraming({
  passage = defaultPassage,
  initialHMW = defaultInitialHMW,
  label = "How might we",
}) {
  const [currentHMW, setCurrentHMW] = useState(initialHMW);
  const [visible, setVisible] = useState(true);

  const handleTrigger = (hmw) => {
    if (hmw === currentHMW) return;
    setVisible(false);
    setTimeout(() => {
      setCurrentHMW(hmw);
      setVisible(true);
    }, 200);
  };

  return (
    <>
      <MonoLabel className="text-[var(--point)]" margin={false}>
        Problem
      </MonoLabel>
      {/* Prose with inline triggers */}
      <div className="text-xl text-[var(--txt)] ">
        {passage.map((paragraph, pi) => (
          <p key={pi} className="mb-6 last:mb-0 m-0">
            {paragraph.map((segment, si) => {
              if (!segment.hmw) {
                return <span key={si}>{segment.text}</span>;
              }
              const isActive = currentHMW === segment.hmw;
              return (
                <span
                  key={si}
                  onClick={() => handleTrigger(segment.hmw)}
                  aria-pressed={isActive}
                  style={{
                    font: "inherit",
                    color: isActive ? "var(--point3)" : "inherit",
                  }}
                  className={`
                      inline whitespace-normal cursor-pointer border-0 rounded-sm px-1 -mx-1
                      underline underline-offset-[6px] decoration-[var(--point)] decoration-2 decoration-dashed
                      transition-colors duration-150
                      hover:bg-[var(--point2)] hover:text-[var(--point3)]
                      ${isActive ? "bg-[var(--point2)]" : "bg-transparent"}
                    `}
                >
                  {segment.text}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {/* HMW box */}
      <div className="bg-[var(--bg2)] border border-[var(--bg3)] rounded p-6 md:top-8 self-start w-full">
        <MonoLabel className="text-[var(--point)]">{label}</MonoLabel>
        <div className="mt-4 ">
          <p
            className={`
                text-[18px] md:text-[20px] leading-[1.45] text-[var(--txt)] m-0
                transition-all duration-200 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
              `}
          >
            {currentHMW}
          </p>
        </div>
      </div>
    </>
  );
}
