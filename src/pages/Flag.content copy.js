import React, { useEffect, useState } from "react";
import Quote from "../components/Quote";
import { BulletVertical, ListVertical } from "../components/ListVertical";
import ArticleParagraph from "../components/ArticleParagraph";
import List from "../components/List";
import { ResponsiveBar } from "@nivo/bar";
import { patternDotsDef, patternLinesDef, patternSquaresDef } from "@nivo/core";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveWaffle, Waffle } from "@nivo/waffle";
import AnimatedStripes from "../components/AnimatedStripes";

const Summary = () => (
  <>
    <p>
      This study examines why attentive participants in social groups often
      refrain from initiating visible actions. Inactivity is treated as a
      threshold outcome that varies with the local rule sets.
    </p>
    <p>
      Three phase-based online tests were conducted with 20 to 30 participants
      per test, screened for low initiation. Each test ran for 8 phases and
      produced a phase-indexed event log of directed actions. The core
      comparison treats Test 2 and Test 3 as two rule sets that preserve the
      decision to initiate while changing how initiation is authored and
      distributed.
    </p>
    <ListVertical>
      <BulletVertical title="Test 2 (control), user-selected exposure">
        A participant who initiates a Check chooses the target.
      </BulletVertical>
      <BulletVertical title="Test 3 (experimental), system-authored exposure">
        A participant who initiates a Check does not choose the target. The
        system assigns the target using balanced pairing.
      </BulletVertical>
    </ListVertical>
    <p>
      Both rules include <b>a gated high-impact action</b>. Flag can only be
      directed at targets previously checked by the same actor, and a Flag makes
      the target ineligible to win. Because this gating rule ties later
      high-impact initiation to earlier exposure, comparisons are organized
      around two linked outcomes.
    </p>
    <ListVertical>
      <BulletVertical title="Engagement initiation">
        whether participants initiate actions
      </BulletVertical>
      <BulletVertical title="Option availability">
        the size of each actor’s Flag-enabled set at the start of each phase
      </BulletVertical>
    </ListVertical>
    <p>
      Engagement remains the top-line outcome. Distribution and harm
      concentration are treated as rule consequences that shape interpretation
      and design implications.
    </p>
    <Quote />
  </>
);

const ConceptualFraming = () => (
  <>
    <ArticleParagraph title="Attentive non-initiation in group settings">
      Online communities often show participation inequality, where a small
      subset produces most visible activity and many others remain silent while
      staying attentive. Prior work links hesitation to expected downside under
      visibility and to perceived efficacy constraints, suggesting a
      design-relevant decision point at the moment of initiation. (Nonnecke &
      Preece, 2000; 2001. Noelle-Neumann, 1974. Bandura, 1997.)
    </ArticleParagraph>
    <ArticleParagraph title="Inactivity as a threshold under agency burden">
      Inactivity is defined here as low initiation of visible actions despite
      ongoing attention. The study treats initiation as a repeated go or no-go
      decision under uncertainty, shaped by the local rules. This paper uses
      agency burden as an interpretive lens for why rules can shift initiation.
      Agency burden is defined as the perceived burden of initiating an action
      that can influence the shared social environment, especially when
      consequences may feel socially attributable or hard to reverse. In this
      paper, agency burden is not treated as a single identified cause. It is
      treated as a plausible mechanism that co-varies with rule features such as
      target-selection responsibility, exposure distribution, and planning
      capacity.
    </ArticleParagraph>
    <ArticleParagraph title="Research Opportunity">
      <p>
        If agency burden constrains initiation, engagement can shift when rules
        change how responsibility and consequences are distributed. (Kollock,
        1999. Matias, 2019.) This study tests whether low-initiation
        participants initiate more under rules that reduce target-selection
        responsibility at the initiation step.
      </p>
      <p>
        Because the high-impact action in this environment imposes a negative
        effect on another participant, higher Flag activity is interpreted as
        reduced initiation friction rather than as a welfare improvement.
      </p>
    </ArticleParagraph>
  </>
);

const ResearchDesignAndMethodology = () => (
  <>
    A behavior-focused, rule-based interaction design was used to examine
    engagement initiation across repeated decisions. Stable, auditable
    constraints were prioritized over ecological realism. Each test produced a
    phase-indexed event log.
  </>
);
const TestDesign = () => (
  <>
    <ArticleParagraph title="Tiered Engagement">
      Actions were analyzed in two tiers based on direct interpersonal impact
      under these rules. <br></br>Check is treated as a non-harm initiation step
      in the moment, while still recognized as an option-creating step because
      it gates later Flag actions. <br></br>Flag is treated as a high-impact
      initiation step because it directly changes another participant’s win
      eligibility.
    </ArticleParagraph>
    <ArticleParagraph title="Manipulation Bundle">
      The primary rule difference is target-selection control at the initiation
      step.
      <ListVertical>
        <BulletVertical></BulletVertical>
        <BulletVertical></BulletVertical>
      </ListVertical>
      A downstream consequence is inherent to the same rule set. Because
      Flagging is gated by prior Check history, the two rules also differ in how
      much actors can shape their future Flag options. This is treated as a
      bundled rule effect analyzed as a single design condition. Analyses
      explicitly separate changes driven by option availability from changes in
      escalation conditional on options.
    </ArticleParagraph>
    <ArticleParagraph title="Participant Profile">
      Participants were recruited in mid-sized groups of 20 to 30 per test and
      self-identified as conflict-avoidant or risk-averse in social interaction
      contexts. Cohorts differed across tests. Informed consent was collected.
      Withdrawal was allowed at any time.
    </ArticleParagraph>
  </>
);

const MeasuresAndDataCollection = () => (
  <>
    <ArticleParagraph title="Event Logs">
      Each test consisted of 8 discrete phases. Within each phase, actions were
      recorded as system events with at least phase index, actor, action type,
      and target when applicable.{" "}
    </ArticleParagraph>
    <ArticleParagraph title="Primary Engagement Outcomes"></ArticleParagraph>
    <ArticleParagraph title="Opportunity and Conversion Outcomes (Tests 2 and 3)"></ArticleParagraph>
    <ArticleParagraph title="Participation inequality"></ArticleParagraph>
    <ArticleParagraph title="Qualitative Evidence"></ArticleParagraph>
  </>
);

const Analysis = () => <div>Analysis</div>;

function makeBarDefaults({ txt, bg, txt2 }) {
  return {
    margin: { top: 30, right: 140, bottom: 50, left: 60 },
    padding: 0.3,
    enableLabel: false,

    axisBottom: {
      legend: "phase",
      legendOffset: 36,
      legendPosition: "middle",
    },
    axisLeft: {
      legend: "count",
      legendOffset: -50,
      legendPosition: "middle",
    },

    colors: ({ id }) => (id === "flag" ? txt2 : bg),

    defs: [
      patternDotsDef("check-dots", {
        background: bg,
        color: txt,
        size: 1,
        padding: 1,
        stagger: true,
      }),
    ],
    fill: [{ match: { id: "check" }, id: "check-dots" }],

    theme: {
      text: { fill: txt2 },
      axis: {
        ticks: { text: { fill: txt2 } },
        legend: { text: { fill: txt2 } },
      },

      grid: {
        line: {
          stroke: txt2, // pick your token
          strokeWidth: 1,
        },
      },

      legends: { text: { fill: txt } },
      tooltip: { container: { background: bg, color: txt, fontSize: 10 } },
    },
  };
}

const makePieDefaults = ({ txt, bg, hoverId, setHoverId }) => ({
  margin: { top: 20, right: 20, bottom: 60, left: 20 },
  innerRadius: 0.6,
  padAngle: 1.5,
  cornerRadius: 2,
  activeOuterRadiusOffset: 6,
  sortByValue: false, // preserve input order
  colors: (d) => {
    if (d.id === "No Action") return "transparent";
    if (d.id === "Checked and Flagged") return txt;
    if (d.id === "Checked Only") return bg; // blends into bg, dots provide the visible signal
    return txt;
  },
  defs: [
    patternDotsDef("did-dots", {
      background: bg,
      color: txt,
      size: 1,
      padding: 1,
      stagger: true,
    }),
  ],
  fill: [{ match: { id: "Checked Only" }, id: "did-dots" }],
  borderWidth: 1,
  borderColor: bg,
  enableArcLabels: false,
  enableArcLinkLabels: false,
  theme: {
    text: { fill: txt },
    legends: { text: { fill: txt } },
    tooltip: { container: { background: bg, color: txt, fontSize: 10 } },
  },
  activeId: hoverId,
  onMouseEnter: (datum) => setHoverId(datum.id),
  onMouseLeave: () => setHoverId(null),
});

const PieBlock = ({ title, children }) => (
  <div className="relative" style={{ width: "100%" }}>
    <div className="text-center w-full font-bold uppercase">{title}</div>
    <div style={{ height: 320 }}>{children}</div>
  </div>
);

const FindingsAndInterpretation = () => {
  const [hoverId, setHoverId] = useState(null);
  const test1PhaseActionVolume = [
    { phase: 1, check: 5, flag: 0 },
    { phase: 2, check: 4, flag: 0 },
    { phase: 3, check: 1, flag: 0 },
    { phase: 4, check: 3, flag: 0 },
    { phase: 5, check: 0, flag: 0 },
    { phase: 6, check: 3, flag: 0 },
    { phase: 7, check: 2, flag: 0 },
    { phase: 8, check: 1, flag: 0 },
  ];
  const test2PopulationRatio = [
    {
      id: "No Action",
      label: "No Action",
      value: 2,
    },
    {
      id: "Checked Only",
      label: "Checked Only",
      value: 10,
    },
    {
      id: "Checked and Flagged",
      label: "Checked and Flagged",
      value: 16,
    },
  ];

  const test2ActionPerActor = [
    { player: "1", check: 7, flag: 3 },
    { player: "2", check: 5, flag: 3 },
    { player: "3", check: 4, flag: 0 },
    { player: "4", check: 2, flag: 1 },
    { player: "5", check: 4, flag: 1 },
    { player: "6", check: 4, flag: 1 },
    { player: "7", check: 5, flag: 0 },
    { player: "8", check: 5, flag: 1 },
    { player: "9", check: 6, flag: 1 },
    { player: "10", check: 5, flag: 1 },
    { player: "11", check: 5, flag: 2 },
    { player: "12", check: 5, flag: 0 },
    { player: "13", check: 6, flag: 0 },
    { player: "14", check: 6, flag: 2 },
    { player: "15", check: 6, flag: 1 },
    { player: "16", check: 6, flag: 0 },
    { player: "17", check: 0, flag: 0 },
    { player: "18", check: 7, flag: 3 },
    { player: "19", check: 4, flag: 2 },
    { player: "20", check: 5, flag: 0 },
    { player: "21", check: 5, flag: 0 },
    { player: "22", check: 5, flag: 0 },
    { player: "23", check: 4, flag: 1 },
    { player: "24", check: 5, flag: 1 },
    { player: "25", check: 0, flag: 0 },
    { player: "26", check: 5, flag: 0 },
    { player: "27", check: 7, flag: 6 },
    { player: "28", check: 5, flag: 0 },
  ];

  const test2PhaseActionVolume = [
    { phase: 1, check: 17, flag: 0 },
    { phase: 2, check: 22, flag: 0 },
    { phase: 3, check: 24, flag: 0 },
    { phase: 4, check: 25, flag: 3 },
    { phase: 5, check: 23, flag: 13 },
    { phase: 6, check: 12, flag: 8 },
    { phase: 7, check: 10, flag: 2 },
    { phase: 8, check: 0, flag: 4 },
  ];

  const test2TotalFlags = test2PhaseActionVolume.reduce(
    (s, d) => s + (d.flag ?? 0),
    0
  );

  const test2FlagsByPhase = test2PhaseActionVolume.map((d) => ({
    id: `P${d.phase}`,
    label: `Phase ${d.phase}`,
    value: d.flag,
  }));

  const test3PopulationRatio = [
    {
      id: "No Action",
      label: "No Action",
      value: 1,
    },
    {
      id: "Checked Only",
      label: "Checked Only",
      value: 7,
    },
    {
      id: "Checked and Flagged",
      label: "Checked and Flagged",
      value: 17,
    },
  ];
  const test3PhaseActionVolume = [
    { phase: 1, check: 4, flag: 0 },
    { phase: 2, check: 6, flag: 3 },
    { phase: 3, check: 10, flag: 2 },
    { phase: 4, check: 10, flag: 3 },
    { phase: 5, check: 15, flag: 3 },
    { phase: 6, check: 13, flag: 4 },
    { phase: 7, check: 13, flag: 9 },
    { phase: 8, check: 0, flag: 7 },
  ];

  const test3ActionPerActor = [
    { player: "1", check: 2, flag: 0 },
    { player: "2", check: 4, flag: 2 },
    { player: "3", check: 3, flag: 1 },
    { player: "4", check: 2, flag: 1 },
    { player: "5", check: 1, flag: 0 },
    { player: "6", check: 2, flag: 0 },
    { player: "7", check: 4, flag: 2 },
    { player: "8", check: 3, flag: 1 },
    { player: "9", check: 3, flag: 1 },
    { player: "10", check: 0, flag: 0 },
    { player: "11", check: 5, flag: 4 },
    { player: "12", check: 4, flag: 3 },
    { player: "13", check: 2, flag: 1 },
    { player: "14", check: 4, flag: 1 },
    { player: "15", check: 1, flag: 0 },
    { player: "16", check: 2, flag: 0 },
    { player: "17", check: 4, flag: 3 },
    { player: "18", check: 2, flag: 0 },
    { player: "19", check: 2, flag: 2 },
    { player: "20", check: 3, flag: 1 },
    { player: "21", check: 4, flag: 0 },
    { player: "22", check: 4, flag: 2 },
    { player: "23", check: 4, flag: 2 },
    { player: "24", check: 3, flag: 2 },
    { player: "25", check: 3, flag: 2 },
  ];
  const test3TotalFlags = test3PhaseActionVolume.reduce(
    (s, d) => s + (d.flag ?? 0),
    0
  );

  const test3FlagsByPhase = test3PhaseActionVolume.map((d) => ({
    id: `P${d.phase}`,
    label: `Phase ${d.phase}`,
    value: d.flag,
  }));

  const centerMetricLayer =
    ({ value, label, color = "#111", valueSize = 28, labelSize = 12 }) =>
    ({ centerX, centerY }) => {
      return (
        <g
          transform={`translate(${centerX}, ${centerY})`}
          style={{ pointerEvents: "none" }}
        >
          <text
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fill: color, fontSize: valueSize, lineHeight: 1 }}
            y={-6}
          >
            {value}
          </text>
          <text
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fill: color, fontSize: labelSize, opacity: 0.7 }}
            y={16}
          >
            {label}
          </text>
        </g>
      );
    };
  const el = document.querySelector(".container");
  const txt = getComputedStyle(el).getPropertyValue("--txt").trim();
  const txt2 = getComputedStyle(el).getPropertyValue("--txt2").trim();
  const bg = getComputedStyle(el).getPropertyValue("--bg").trim();
  const barDefaults = makeBarDefaults({ txt, bg, txt2 });
  const pieDefaults = makePieDefaults({ txt, bg, hoverId, setHoverId });

  const [actionPerPlayerView, setActionPerPlayerView] = useState(2);

  return (
    <>
      <p>
        Findings compare Test 2 (N = 28) and Test 3 (N = 25) across
        phase-indexed event logs, using Test 1 (N=29) as baseline. Cohorts
        differed across tests, so comparisons support directional pattern
        inference, not individual-level causal attribution. Interpretation ties
        observed patterns to the intended manipulation bundle, target-selection
        control at initiation and its downstream opportunity-engineering
        consequences.
      </p>

      <AnimatedStripes height="160px" className="my-16" />

      <ArticleParagraph
        title="Baseline initiation under consequence-free probing (Test 1).
"
      >
        <div style={{ height: 360 }}>
          <ResponsiveBar
            data={test1PhaseActionVolume}
            keys={["check", "flag"]}
            indexBy="phase"
            ariaLabel="Test 3 checks and flags by phase"
            {...barDefaults}
          />
        </div>
        <p>
          Test 1 provides a baseline for initiation when the only available
          action is a low-consequence, anonymous Check. Across 8 phases (N =
          29), 19 Checks were recorded, which corresponds to 0.66 checks per
          participant and 8.2% utilization of the maximum possible checks (N ×
          8).{" "}
        </p>
        Check activity was front-loaded and unstable, peaking in Phase 1 (5
        checks) and including a complete zero-action phase (Phase 5).
        <p>
          This baseline indicates that non-initiation persists even when actions
          do not affect outcomes, so the substantially higher Check volume in
          Tests 2 and 3 is consistent with rule-driven changes in perceived
          instrumentality and consequence, not baseline curiosity alone.
        </p>
      </ArticleParagraph>

      {actionPerPlayerView === 2 ? (
        <div style={{ height: 360, marginBottom: 48 }}>
          <ResponsiveBar
            data={test2ActionPerActor}
            keys={["check", "flag"]}
            groupMode="grouped"
            indexBy="player"
            {...barDefaults}
            axisBottom={{
              legend: "player",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              legend: "count",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            markers={[
              {
                axis: "y",
                value: 4.75,
                legend: "Mean Checks: 4.75",
                legendPosition: "right",
                lineStyle: {
                  stroke: txt, // same as your check dot color
                  strokeWidth: 2,
                  strokeDasharray: "2 2",
                },
                textStyle: { fill: txt, fontSize: 12 },
              },
              {
                axis: "y",
                value: 1.07,
                legend: "Mean Flags: 1.07",
                legendPosition: "right",
                lineStyle: {
                  stroke: txt, // or pick another color if you differentiate flag elsewhere
                  strokeWidth: 2,
                },
                textStyle: { fill: txt, fontSize: 12 },
              },
            ]}
          />
        </div>
      ) : (
        <div style={{ height: 360, marginBottom: 48 }}>
          <ResponsiveBar
            data={test3ActionPerActor}
            keys={["check", "flag"]}
            groupMode="grouped"
            indexBy="player"
            {...barDefaults}
            axisBottom={{
              legend: "player",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              legend: "count",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            markers={[
              {
                axis: "y",
                value: 2.84,
                legend: "Mean Checks: 2.84",
                legendPosition: "right",
                lineStyle: {
                  stroke: txt, // same as your check dot color
                  strokeWidth: 2,
                  strokeDasharray: "2 2",
                },
                textStyle: { fill: txt, fontSize: 12 },
              },
              {
                axis: "y",
                value: 1.07,
                legend: "Mean Flags: 1.24",
                legendPosition: "right",
                lineStyle: {
                  stroke: txt, // or pick another color if you differentiate flag elsewhere
                  strokeWidth: 2,
                },
                textStyle: { fill: txt, fontSize: 12 },
              },
            ]}
          />
        </div>
      )}

      <div
        onClick={() => setActionPerPlayerView((prev) => (prev === 2 ? 3 : 2))}
      >
        ASDasdasd
      </div>

      <ArticleParagraph title="Check initiation increased under Flag gating">
        Test 1 provides a consequence-free baseline for initiation. In Test 1,
        participants averaged 0.66 checks per participant. Under the Flag-gated
        rules in Tests 2 and 3, Check initiation increased substantially, rising
        to 4.75 checks per participant in Test 2 and 2.84 checks per participant
        in Test 3. This indicates that introducing downstream consequence and
        option gating markedly increases initiation relative to a low-stakes
        probing environment, with user-selected exposure in Test 2 amplifying
        Check volume beyond the system-authored exposure rule in Test 3.
      </ArticleParagraph>

      <div>
        <div style={{ display: "flex", gap: 40 }}>
          <PieBlock title="Test 2 (control)" txt={txt}>
            <ResponsivePie
              data={test2PopulationRatio}
              {...pieDefaults}
              layers={[
                "arcs",
                centerMetricLayer({
                  value: "57%",
                  label: "flagged",
                  color: txt,
                }),
              ]}
            />
          </PieBlock>
          <PieBlock title="Test 3 (experimental)" txt={txt}>
            <ResponsivePie
              data={test3PopulationRatio}
              {...pieDefaults}
              layers={[
                "arcs",
                centerMetricLayer({
                  value: "68%",
                  label: "flagged",
                  color: txt,
                }),
              ]}
            />
          </PieBlock>
        </div>
        <div className="text-xs flex flex-row justify-center -mt-[36px] gap-8">
          <div className="flex-row flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--bg)] border" />
            No Action
          </div>
          <div className="flex-row flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--txt2)]" /> Checked Only
          </div>

          <div className="flex-row flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--txt)]" /> Checked and Flagged
          </div>
        </div>
      </div>

      <ArticleParagraph title="Lower Check volume, higher Flag adoption under system assignment">
        <p>
          Across the full window, the system-authored exposure rule produced
          fewer Checks but slightly more Flags per participant.
        </p>
        <p>
          Interpretation at the rule level is straightforward. When target
          selection is removed from the Check step, Check initiation volume
          drops, while engagement in the high-impact tier does not drop and is
          more broadly adopted.
        </p>
      </ArticleParagraph>

      <div style={{ height: 360, marginBottom: 48 }}>
        <ResponsiveBar
          data={test2PhaseActionVolume}
          keys={["check", "flag"]}
          indexBy="phase"
          ariaLabel="Test 2 checks and flags by phase"
          {...barDefaults}
          markers={[
            {
              axis: "x",
              value: 4,
              legend: "First Flag phase",
              lineStyle: {
                stroke: txt, // or pick another color if you differentiate flag elsewhere
                strokeWidth: 2,
              },
              textStyle: { fill: txt, fontSize: 12 },
            },
          ]}
        />
      </div>
      <div style={{ height: 360 }}>
        <ResponsiveBar
          data={test3PhaseActionVolume}
          keys={["check", "flag"]}
          indexBy="phase"
          ariaLabel="Test 3 checks and flags by phase"
          {...barDefaults}
          markers={[
            {
              axis: "x",
              value: 2,
              legend: "First Flag phase",
              lineStyle: {
                stroke: txt, // or pick another color if you differentiate flag elsewhere
                strokeWidth: 2,
              },
              textStyle: { fill: txt, fontSize: 12 },
            },
          ]}
        />
      </div>

      <div className=" justify-evenly" style={{ display: "flex", gap: 40 }}>
        <div
          className="w-full max-w-[250px]"
          style={{ height: 360, marginBottom: 48 }}
        >
          <ResponsiveWaffle
            data={test2FlagsByPhase}
            total={test2TotalFlags}
            rows={10}
            columns={10}
            borderRadius={3}
            valueFormat=" <-.2"
            motionStagger={2}
            colors={(d) => {
              if (d.id === "P5") return txt; // pick your Phase 5 highlight
              if (d.id === "P6") return txt; // pick your Phase 6 highlight
              return txt2; // one muted color for everything else
            }}
            theme={{
              tooltip: {
                container: { background: bg, color: txt, fontSize: 10 },
              },
            }}
            defs={[
              patternLinesDef("dots", {
                background: bg,
                color: txt2,
                lineWidth: 1,
                spacing: 4,
                rotation: 45,
              }),
            ]}
            fill={[
              { match: (d) => d.id !== "P5" && d.id !== "P6", id: "dots" },
            ]}
          />
        </div>
        <div
          className="w-full max-w-[250px]"
          style={{ height: 360, marginBottom: 48 }}
        >
          <ResponsiveWaffle
            data={test3FlagsByPhase}
            total={test3TotalFlags}
            rows={10}
            borderRadius={3}
            columns={10}
            valueFormat=" <-.2"
            motionStagger={2}
            colors={(d) => {
              if (d.id === "P7") return txt; // pick your Phase 5 highlight
              if (d.id === "P8") return txt; // pick your Phase 6 highlight
              return txt2; // one muted color for everything else
            }}
            theme={{
              tooltip: {
                container: { background: bg, color: txt, fontSize: 10 },
              },
            }}
            defs={[
              patternLinesDef("dots", {
                background: bg,
                color: txt2,
                lineWidth: 1,
                spacing: 4,
                rotation: 45,
              }),
            ]}
            fill={[
              { match: (d) => d.id !== "P7" && d.id !== "P8", id: "dots" },
            ]}
          />
        </div>
      </div>
    </>
  );
};

const WhatComesNext = () => <div>What Comes Next?</div>;

export default {
  // Top-level sections, must match menu titles exactly
  Summary,
  "Conceptual Framing": ConceptualFraming,
  "Research Design and Methodology": ResearchDesignAndMethodology,
  Analysis,
  "Findings and Interpretation": FindingsAndInterpretation,
  "What Comes Next?": WhatComesNext,

  // These exist in your JSON as subsections, so they must be present as keys too
  "Test Design": TestDesign,
  "Measures and Data Collection": MeasuresAndDataCollection,
};
