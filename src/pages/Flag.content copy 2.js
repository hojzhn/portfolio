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
import { ResponsiveLine } from "@nivo/line";
import Toggle from "../components/Toggle";
import { CodeInline } from "../components/Code";
const CHECK = () => <CodeInline text="CHECK" />;
const FLAG = () => <CodeInline text="FLAG" />;
const I = () => <CodeInline text="i" />;
const T = () => <CodeInline text="t" />;
const J = () => <CodeInline text="j" />;
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
    <div>
      <img
        src="/images/flag1.png"
        alt="Indifference illustration"
        className="max-w-full h-auto mb-8"
      />
    </div>
    <ArticleParagraph title="Attentive non-initiation in group settings">
      Online communities often show participation inequality, where a small
      subset produces most visible activity and many others remain silent while
      staying attentive. Prior work links hesitation to expected downside under
      visibility and to perceived efficacy constraints, suggesting a
      design-relevant decision point at the moment of initiation. (Nonnecke &
      Preece, 2000; 2001. Noelle-Neumann, 1974. Bandura, 1997.)
    </ArticleParagraph>
    <div>
      <img
        src="/images/flag2.png"
        alt="Indifference illustration"
        className="max-w-full h-auto mb-8 -mt-8"
      />
    </div>
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
    <div>
      <img
        src="/images/flag3.png"
        alt="Indifference illustration"
        className="max-w-full h-auto mb-16 -mt-8"
      />
    </div>
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
      under these rules.
      <div className="flex flex-row items-start justify-between gap-x-28">
        <div className="w-full">
          <img
            src="/images/flag4.png"
            alt="Indifference illustration"
            className="w-auto h-auto max-w-[150px] m-auto my-8"
          />
          <CHECK /> is treated as a non-harm initiation step in the moment,
          while still recognized as an option-creating step because it gates
          later <FLAG />
          actions.
        </div>
        <div className="w-full">
          <img
            src="/images/flag5.png"
            alt="Indifference illustration"
            className="w-auto h-auto max-w-[150px] m-auto my-8"
          />
          <FLAG /> is treated as a high-impact initiation step because it
          directly changes another participant’s win eligibility.
        </div>
      </div>
    </ArticleParagraph>

    <ArticleParagraph title="Manipulation Bundle">
      The primary rule difference is target-selection control at the initiation
      step.
      <ListVertical>
        <BulletVertical title="Option availability effects">
          Changes in how many Flag-enabled targets actors have available
        </BulletVertical>
        <BulletVertical title="Conditional escalation effects"></BulletVertical>
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

const TestRules = () => {
  return (
    <>
      <div className="w-full">
        <img
          src="/images/flag6.png"
          alt="Indifference illustration"
          className="max-w-full h-auto mb-16 -mt-8"
        />
      </div>
      <div className="w-full">
        <img
          src="/images/flag7.png"
          alt="Indifference illustration"
          className="max-w-full h-auto mb-16 -mt-8"
        />
      </div>
      <div className="w-full">
        <img
          src="/images/flag8.png"
          alt="Indifference illustration"
          className="max-w-full h-auto mb-16 -mt-8"
        />
      </div>
    </>
  );
};

const MeasuresAndDataCollection = () => (
  <>
    <ArticleParagraph title="Behavioral Measures">
      Behavioral data came from the phase-indexed event logs. Summary measures
      were computed in three families.
      <ListVertical>
        <BulletVertical title="Engagement volume and breadth">
          How many actions occur and how widely initiation spreads across
          participants
        </BulletVertical>
        <BulletVertical title="Escalation timing and onset">
          When Flagging begins and how it accumulates over phases.
        </BulletVertical>
        <BulletVertical title="Participation inequality">
          Concentration of received actions across targets using Gini, HHI, and
          top-share summaries, computed separately for Checks and Flags.
        </BulletVertical>
      </ListVertical>
    </ArticleParagraph>

    <ArticleParagraph title="Qualitative Evidence">
      Post-phase Likert items and post-test interviews were collected to assess
      perceived target-selection control, authorship, identifiability, and
      consequence. Responses were coded using a deductive codebook aligned to
      study constructs. Coding was conducted by a single coder.
    </ArticleParagraph>
  </>
);

const CodingAndVariables = () => {
  const TableRow = ({ field, definition, last }) => {
    const fields = Array.isArray(field) ? field : [field];

    return (
      <div
        className={`flex flex-row items-start py-2 gap-4 ${
          !last && "border-b border-[var(--bg2)]"
        }`}
      >
        <div className="w-[180px] min-w-0 gap-x-2 gap-y-1">
          {fields.map((f, idx) => (
            <React.Fragment key={`${String(f)}-${idx}`}>
              <CodeInline text={f} /> {idx < fields.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
        <div>{definition}</div>
      </div>
    );
  };

  return (
    <>
      <span className="uppercase font-bold">Event Coding </span>
      <div className="mb-16">
        <TableRow
          field="event_id"
          definition="Unique identifier per event row"
        />
        <TableRow field="test_id" definition="Unique identifier per test" />
        <TableRow field="phase" definition="Phase index" />
        <TableRow
          field="actor_id"
          definition="Participant initiating the action"
        />
        <TableRow
          field="action_type"
          definition={
            <>
              <CHECK /> or <FLAG />
            </>
          }
        />
        <TableRow
          field="target_id"
          definition="Participant receiving the action"
          last={true}
        />
      </div>
      <span className="uppercase font-bold">
        Phase-indexed Participant state{" "}
      </span>
      <div className="mb-16">
        <TableRow
          field="flagged_state"
          definition={
            <>
              Whether participant has received at least one <FLAG /> by the end
              of phase <T />
            </>
          }
          last={true}
        />
      </div>
      <span className="uppercase font-bold">Phase-level outcomes </span>
      <div className="mb-16">
        <TableRow
          field={["checks_in_phase", "flags_in_phase"]}
          definition={
            <>
              Number of <CHECK /> or <FLAG /> events in phase <T />
            </>
          }
        />
        <TableRow
          field={["unique_check_actors", "unique_flag_actors"]}
          definition={
            <>
              Number of unique actors who issued <CHECK /> or <FLAG /> in phase{" "}
              <T />
            </>
          }
        />
        <TableRow
          field={["cum_checks_end_phase", "cum_flags_end_phase"]}
          definition={
            <>
              Total <CHECK /> or <FLAG /> accumulated until the end of phase{" "}
              <T />
            </>
          }
        />
        <TableRow
          field={["cum_unique_check_actors", "cum_unique_flag_actors"]}
          definition={
            <>
              Number of unique actors who have checked or flagged at least once
              by phase <T />
            </>
          }
        />
        <TableRow
          field="eligible_rate_end_phase"
          definition={
            <>
              Share of participants not flagged at the end of phase <T />
            </>
          }
          last={true}
        />
      </div>
      <span className="uppercase font-bold">Actor-level outcomes </span>
      <div className="mb-16">
        <TableRow
          field={["total_checks_actor", "total_flags_actor"]}
          definition={
            <>
              Total <CHECK /> or <FLAG /> issued by actor <I /> accross all
              phases
            </>
          }
        />
        <TableRow
          field={[
            "unique_targets_checked_actor",
            "unique_targets_flagged_actor",
          ]}
          definition={
            <>
              Number of unique targets checked / flagged by actor <I />
            </>
          }
          last={true}
        />
      </div>
      <span className="uppercase font-bold">Actor-Phase outcomes </span>
      <div>
        <TableRow
          field={["checks_actor_phase", "flags_actor_phase"]}
          definition={
            <>
              Number of <CHECK /> or <FLAG /> issued by actor <I /> in phase{" "}
              <T />
            </>
          }
        />
        <TableRow
          field="flag_enabled_set_size"
          definition={
            <>
              Number of unique targets previously checked by actor <I /> before
              phase <T />
            </>
          }
        />
        <TableRow
          field="flag_conversion_rate_phase"
          definition={
            <>
              Rate of flags per available target at start of phase <T />
            </>
          }
        />
        <TableRow
          field="cum_flag_conversion_rate"
          definition="Rate of cumulative flags per cumulative enabled targets"
          last={true}
        />
      </div>
      <AnimatedStripes height="160px" className="my-16" />
    </>
  );
};

const Methods = () => {
  return (
    <>
      <ArticleParagraph title="Comparative Logic Across Tests">
        Checks were compared across tests only as a descriptive initiation
        signal because Check meaning changes when it gates Flag opportunity.
        Flag-related measures were compared only between Tests 2 and 3 where
        rules align.
      </ArticleParagraph>
      <ArticleParagraph title="Model-based Analysis">
        A phase-indexed mixed-effects model estimated whether an actor flagged
        at least once in phase t, conditioned on flag-enabled set size at the
        start of that phase, plus condition and phase effects. This supported
        interpretation of whether condition differences reflected expanded
        options or increased escalation per option.
      </ArticleParagraph>
      <ArticleParagraph title="Limitations">
        <ListVertical>
          <BulletVertical>
            Cohorts differed across tests, so between-test comparisons were
            interpreted as directional patterns rather than individual-level
            causal effects.
          </BulletVertical>
          <BulletVertical>
            Test 2 bundled agency, authorship, and opportunity engineering by
            design. Effects could be attributed to the bundled manipulation
            rather than to a single isolated lever.
          </BulletVertical>
          <BulletVertical>
            Actions were not independent observations. Network dependence and
            retaliation dynamics limited the validity of analyses that assume
            independence without adjustment.
          </BulletVertical>
          <BulletVertical>
            The meaning of “check” differed across tests in consequence and
            informational context, so comparisons involving checks were limited
            to aligned summaries rather than treated as identical psychological
            acts.
          </BulletVertical>
        </ListVertical>
      </ArticleParagraph>
    </>
  );
};
function makeBarDefaults({ txt, bg, txt2 }) {
  return {
    margin: { top: 30, bottom: 50, left: 60 },
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

  const test1ActionPerActor = [
    { player: "1", check: 2, flag: 0 },
    { player: "2", check: 2, flag: 0 },
    { player: "3", check: 0, flag: 0 },
    { player: "4", check: 0, flag: 0 },
    { player: "5", check: 3, flag: 0 },
    { player: "6", check: 0, flag: 0 },
    { player: "7", check: 1, flag: 0 },
    { player: "8", check: 1, flag: 0 },
    { player: "9", check: 3, flag: 0 },
    { player: "10", check: 0, flag: 0 },
    { player: "11", check: 0, flag: 0 },
    { player: "12", check: 1, flag: 0 },
    { player: "13", check: 0, flag: 0 },
    { player: "14", check: 1, flag: 0 },
    { player: "15", check: 0, flag: 0 },
    { player: "16", check: 0, flag: 0 },
    { player: "17", check: 0, flag: 0 },
    { player: "18", check: 1, flag: 0 },
    { player: "19", check: 0, flag: 0 },
    { player: "20", check: 0, flag: 0 },
    { player: "21", check: 0, flag: 0 },
    { player: "22", check: 0, flag: 0 },
    { player: "23", check: 0, flag: 0 },
    { player: "24", check: 2, flag: 0 },
    { player: "25", check: 1, flag: 0 },
    { player: "26", check: 1, flag: 0 },
    { player: "27", check: 0, flag: 0 },
    { player: "28", check: 0, flag: 0 },
    { player: "29", check: 0, flag: 0 },
  ];

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
    0,
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

  const test1Lorenz = [
    {
      id: "Line of Equality",
      data: [
        { x: 0, y: 0 },
        { x: 29 / 29, y: 1 },
      ],
    },
    {
      id: "check",
      data: [
        { x: 0, y: 0 },
        { x: 1 / 29, y: 0 },
        { x: 2 / 29, y: 0 },
        { x: 3 / 29, y: 0 },
        { x: 4 / 29, y: 0 },
        { x: 5 / 29, y: 0 },
        { x: 6 / 29, y: 0 },
        { x: 7 / 29, y: 0 },
        { x: 8 / 29, y: 0 },
        { x: 9 / 29, y: 0 },
        { x: 10 / 29, y: 0 },
        { x: 11 / 29, y: 0 },
        { x: 12 / 29, y: 0 },
        { x: 13 / 29, y: 0 },
        { x: 14 / 29, y: 0 },
        { x: 15 / 29, y: 0 },
        { x: 16 / 29, y: 0 },
        { x: 17 / 29, y: 0 },
        { x: 18 / 29, y: 1 },
        { x: 19 / 29, y: 2 },
        { x: 20 / 29, y: 3 },
        { x: 21 / 29, y: 4 },
        { x: 22 / 29, y: 5 },
        { x: 23 / 29, y: 6 },
        { x: 24 / 29, y: 7 },
        { x: 25 / 29, y: 9 },
        { x: 26 / 29, y: 11 },
        { x: 27 / 29, y: 13 },
        { x: 28 / 29, y: 16 },
        { x: 29 / 29, y: 19 },
      ],
    },
  ];

  const test2Lorenz = [
    {
      id: "Line of Equality",
      data: [
        { x: 0, y: 0 },
        { x: 29 / 29, y: 1 },
      ],
    },
    {
      id: "check",
      data: [
        { x: 0, y: 0 },
        { x: 1 / 28, y: 0 },
        { x: 2 / 28, y: 0 },
        { x: 3 / 28, y: 2 },
        { x: 4 / 28, y: 6 },
        { x: 5 / 28, y: 10 },
        { x: 6 / 28, y: 14 },
        { x: 7 / 28, y: 18 },
        { x: 8 / 28, y: 22 },
        { x: 9 / 28, y: 27 },
        { x: 10 / 28, y: 32 },
        { x: 11 / 28, y: 37 },
        { x: 12 / 28, y: 42 },
        { x: 13 / 28, y: 47 },
        { x: 14 / 28, y: 52 },
        { x: 15 / 28, y: 57 },
        { x: 16 / 28, y: 62 },
        { x: 17 / 28, y: 67 },
        { x: 18 / 28, y: 72 },
        { x: 19 / 28, y: 77 },
        { x: 20 / 28, y: 82 },
        { x: 21 / 28, y: 87 },
        { x: 22 / 28, y: 93 },
        { x: 23 / 28, y: 99 },
        { x: 24 / 28, y: 106 },
        { x: 25 / 28, y: 112 },
        { x: 26 / 28, y: 119 },
        { x: 27 / 28, y: 126 },
        { x: 28 / 28, y: 133 },
      ],
    },
    {
      id: "flag",
      data: [
        { x: 0, y: 0 },
        { x: 1 / 28, y: 0 },
        { x: 2 / 28, y: 0 },
        { x: 3 / 28, y: 0 },
        { x: 4 / 28, y: 0 },
        { x: 5 / 28, y: 0 },
        { x: 6 / 28, y: 0 },
        { x: 7 / 28, y: 0 },
        { x: 8 / 28, y: 0 },
        { x: 9 / 28, y: 0 },
        { x: 10 / 28, y: 0 },
        { x: 11 / 28, y: 0 },
        { x: 12 / 28, y: 0 },
        { x: 13 / 28, y: 1 },
        { x: 14 / 28, y: 2 },
        { x: 15 / 28, y: 3 },
        { x: 16 / 28, y: 4 },
        { x: 17 / 28, y: 5 },
        { x: 18 / 28, y: 6 },
        { x: 19 / 28, y: 7 },
        { x: 20 / 28, y: 8 },
        { x: 21 / 28, y: 9 },
        { x: 22 / 28, y: 11 },
        { x: 23 / 28, y: 13 },
        { x: 24 / 28, y: 15 },
        { x: 25 / 28, y: 18 },
        { x: 26 / 28, y: 21 },
        { x: 27 / 28, y: 24 },
        { x: 28 / 28, y: 30 },
      ],
    },
  ];

  const test3Lorenz = [
    {
      id: "Line of Equality",
      data: [
        { x: 0, y: 0 },
        { x: 29 / 29, y: 1 },
      ],
    },
    {
      id: "check",
      data: [
        { x: 0, y: 0 },
        { x: 1 / 25, y: 0 },
        { x: 2 / 25, y: 1 },
        { x: 3 / 25, y: 2 },
        { x: 4 / 25, y: 4 },
        { x: 5 / 25, y: 6 },
        { x: 6 / 25, y: 8 },
        { x: 7 / 25, y: 10 },
        { x: 8 / 25, y: 12 },
        { x: 9 / 25, y: 14 },
        { x: 10 / 25, y: 16 },
        { x: 11 / 25, y: 19 },
        { x: 12 / 25, y: 22 },
        { x: 13 / 25, y: 25 },
        { x: 14 / 25, y: 28 },
        { x: 15 / 25, y: 31 },
        { x: 16 / 25, y: 34 },
        { x: 17 / 25, y: 38 },
        { x: 18 / 25, y: 42 },
        { x: 19 / 25, y: 46 },
        { x: 20 / 25, y: 50 },
        { x: 21 / 25, y: 54 },
        { x: 22 / 25, y: 58 },
        { x: 23 / 25, y: 62 },
        { x: 24 / 25, y: 66 },
        { x: 25 / 25, y: 71 },
      ],
    },
    {
      id: "flag",
      data: [
        { x: 0, y: 0 },
        { x: 1 / 25, y: 0 },
        { x: 2 / 25, y: 0 },
        { x: 3 / 25, y: 0 },
        { x: 4 / 25, y: 0 },
        { x: 5 / 25, y: 0 },
        { x: 6 / 25, y: 0 },
        { x: 7 / 25, y: 0 },
        { x: 8 / 25, y: 0 },
        { x: 9 / 25, y: 1 },
        { x: 10 / 25, y: 2 },
        { x: 11 / 25, y: 3 },
        { x: 12 / 25, y: 4 },
        { x: 13 / 25, y: 5 },
        { x: 14 / 25, y: 6 },
        { x: 15 / 25, y: 7 },
        { x: 16 / 25, y: 9 },
        { x: 17 / 25, y: 11 },
        { x: 18 / 25, y: 13 },
        { x: 19 / 25, y: 15 },
        { x: 20 / 25, y: 17 },
        { x: 21 / 25, y: 19 },
        { x: 22 / 25, y: 21 },
        { x: 23 / 25, y: 24 },
        { x: 24 / 25, y: 27 },
        { x: 25 / 25, y: 31 },
      ],
    },
  ];
  const normalizeLorenz = (lorenz) =>
    lorenz.map((series) => {
      const total = series.data?.[series.data.length - 1]?.y ?? 0;

      return {
        ...series,
        data: series.data.map((p) => ({
          x: p.x,
          y: total ? p.y / total : 0,
        })),
      };
    });

  const test3TotalFlags = test3PhaseActionVolume.reduce(
    (s, d) => s + (d.flag ?? 0),
    0,
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

  const [tokens, setTokens] = useState({
    txt: "#111",
    txt2: "#666",
    bg: "#fff",
  });

  useEffect(() => {
    const el = document.querySelector(".container") || document.documentElement;
    const cs = getComputedStyle(el);

    setTokens({
      txt: cs.getPropertyValue("--txt").trim() || "#111",
      txt2: cs.getPropertyValue("--txt2").trim() || "#666",
      bg: cs.getPropertyValue("--bg").trim() || "#fff",
    });
  }, []);

  const barDefaults = makeBarDefaults(tokens);
  const pieDefaults = makePieDefaults({
    txt: tokens.txt,
    bg: tokens.bg,
    hoverId,
    setHoverId,
  });
  const { txt, txt2, bg } = tokens;

  const [test1View, setTest1View] = useState("phase");
  const [actionPerPlayerView, setActionPerPlayerView] = useState(2);
  const [actionPerPhaseView, setActionPerPhaseView] = useState(2);
  const [lorenzView, setLorenzView] = useState(1);
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
        <div className="flex flex-row items-center gap-2 text-[var(--txt2)] text-xs">
          <i class="fa-regular fa-chart-line"></i>
          <span>Test 1 / action volume / per {test1View}</span>
        </div>
        <div style={{ height: 360 }}>
          {test1View === "phase" ? (
            <>
              <ResponsiveBar
                data={test1PhaseActionVolume}
                keys={["check", "flag"]}
                indexBy="phase"
                ariaLabel="Test 3 checks and flags by phase"
                {...barDefaults}
              />
            </>
          ) : (
            <ResponsiveBar
              data={test1ActionPerActor}
              keys={["check"]}
              indexBy="player"
              {...barDefaults}
              margin={{ ...barDefaults.margin, right: 100 }}
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
                  value: 0.66,
                  legend: "0.66 Checks",
                  legendPosition: "right",
                  lineStyle: {
                    stroke: txt, // same as your check dot color
                    strokeWidth: 2,
                    strokeDasharray: "2 2",
                  },
                  textStyle: { fill: txt, fontSize: 12 },
                },
              ]}
            />
          )}
        </div>
        <Toggle
          items={[
            { label: "Phase", value: "phase" },
            { label: "Player", value: "player" },
          ]}
          value={test1View}
          onChange={setTest1View}
        />
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

      <ArticleParagraph title="Check initiation increased under Flag gating">
        <div className="flex flex-row items-center gap-2 text-[var(--txt2)] text-xs">
          <i class="fa-regular fa-chart-line"></i>
          <span>Test {actionPerPlayerView} / action volume / per player</span>
        </div>
        <div style={{ height: 360 }}>
          {actionPerPlayerView === 2 ? (
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
              margin={{ ...barDefaults.margin, right: 100 }}
              markers={[
                {
                  axis: "y",
                  value: 4.75,
                  legend: `4.75\nChecks`,
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
                  legend: "1.07 Flags",
                  legendPosition: "right",
                  lineStyle: {
                    stroke: txt, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 2,
                  },
                  textStyle: { fill: txt, fontSize: 12 },
                },
              ]}
            />
          ) : (
            <ResponsiveBar
              data={test3ActionPerActor}
              keys={["check", "flag"]}
              groupMode="grouped"
              indexBy="player"
              {...barDefaults}
              margin={{ ...barDefaults.margin, right: 100 }}
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
                  legend: "2.84 Checks",
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
                  value: 1.24,
                  legend: "1.24 Flags",
                  legendPosition: "right",
                  lineStyle: {
                    stroke: txt, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 2,
                  },
                  textStyle: { fill: txt, fontSize: 12 },
                },
              ]}
            />
          )}
        </div>{" "}
        <Toggle
          items={[
            { label: "Test 2", value: 2 },
            { label: "Test 3", value: 3 },
          ]}
          value={actionPerPlayerView}
          onChange={setActionPerPlayerView}
        />
        Test 1 provides a consequence-free baseline for initiation. In Test 1,
        participants averaged 0.66 checks per participant. Under the Flag-gated
        rules in Tests 2 and 3, Check initiation increased substantially, rising
        to 4.75 checks per participant in Test 2 and 2.84 checks per participant
        in Test 3. This indicates that introducing downstream consequence and
        option gating markedly increases initiation relative to a low-stakes
        probing environment, with user-selected exposure in Test 2 amplifying
        Check volume beyond the system-authored exposure rule in Test 3.
      </ArticleParagraph>

      <ArticleParagraph title="Lower Check volume, higher Flag adoption under system assignment">
        <div className="flex flex-row items-start gap-2 text-[var(--txt2)] text-xs mb-8">
          <i class="fa-regular fa-chart-line"></i>
          <span>
            Test 2,<br></br>
            Test 3 / Overall engagement breakdown
          </span>
        </div>
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

      <ArticleParagraph title="Participation inequality fell under gating and system assignment">
        <div className="flex flex-row items-center gap-2 text-[var(--txt2)] text-xs">
          <i class="fa-regular fa-chart-line"></i>
          <span>
            Test {lorenzView} / Lorenz curves of action concentration by actor
          </span>
        </div>
        <div style={{ height: 360 }}>
          <ResponsiveLine
            curve="basis"
            enableArea={true}
            margin={{ top: 30, right: 10, bottom: 50, left: 60 }}
            data={
              lorenzView === 1
                ? normalizeLorenz(test1Lorenz)
                : lorenzView === 2
                  ? normalizeLorenz(test2Lorenz)
                  : normalizeLorenz(test3Lorenz)
            }
            xScale={{ type: "linear", min: 0, max: 1 }}
            yScale={{ type: "linear", min: 0, max: 1 }}
            enablePoints={true}
            axisBottom={{
              legend: "Cumulative share of players (least to most active)",
              legendOffset: 40,
              legendPosition: "middle",
              format: (v) => `${Math.round(v * 100)}%`,
            }}
            axisLeft={{
              legend: "Cumulative share of actions",
              legendPosition: "middle",
              format: (v) => `${Math.round(v * 100)}%`,
              legendOffset: -50,
            }}
            theme={{
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
              tooltip: {
                container: { background: bg, color: txt, fontSize: 10 },
              },
            }}
          />
        </div>

        <Toggle
          items={[
            { label: "Test 1", value: 1 },
            { label: "Test 2", value: 2 },
            { label: "Test 3", value: 3 },
          ]}
          value={lorenzView}
          onChange={setLorenzView}
        />
        <p>
          Test 1 shows high participation inequality in low-tier initiation.
          Only 12/29 participants initiated a Check, and Check activity was
          heavily concentrated (actor Check Gini = 0.69). The top 20% of actors
          (6 people) generated 68% of all Checks.
        </p>
        <p>
          Under the Flag-gated rules in Tests 2 and 3, Check initiation spread
          across far more of the cohort and became much less unequal. Actor
          Check inequality fell to Gini = 0.17 in Test 2 and 0.23 in Test 3, and
          the top 20% of actors contributed about 29% to 30% of all Checks. In
          the high-impact tier, Flag participation also spread more under
          system-authored exposure, with lower actor-level Flag inequality in
          Test 3 (Gini = 0.49) than in Test 2 (0.61), consistent with the higher
          share of participants who flagged at least once.
        </p>
      </ArticleParagraph>

      <ArticleParagraph title="Escalation timing diverged by rule">
        <div className="flex flex-row items-center gap-2 text-[var(--txt2)] text-xs">
          <i class="fa-regular fa-chart-line"></i>
          <span>Test {actionPerPhaseView} / action volume / per phase</span>
        </div>
        <div style={{ height: 360 }}>
          {actionPerPhaseView === 2 ? (
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
          ) : (
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
          )}
        </div>

        <Toggle
          items={[
            { label: "Test 2", value: 2 },
            { label: "Test 3", value: 3 },
          ]}
          value={actionPerPhaseView}
          onChange={setActionPerPhaseView}
        />
        <p>
          Test 1 provides a baseline for how Check initiation behaves when it
          carries no downstream consequence, and that baseline differs sharply
          from Test 3.
        </p>
        <p>
          In Test 1, Checks decayed after an initial novelty spike, dropping
          from 5 in Phase 1 to 1 by Phase 3 and reaching a zero-action phase in
          Phase 5. In Test 3, Checks instead ramped and then remained sustained,
          rising from 4 in Phase 1 to 15 in Phase 5 and staying high in Phases 6
          and 7 (13 and 13).
        </p>

        <div className="flex flex-row items-start gap-2 text-[var(--txt2)] text-xs mt-8 mb-8">
          <i class="fa-regular fa-chart-line"></i>
          <span>
            Test 2,<br></br>
            Test 3 / Flag concentration by phase
          </span>
        </div>

        <div className=" justify-evenly" style={{ display: "flex", gap: 40 }}>
          <div
            className="w-full max-w-[250px]"
            style={{ height: 320, marginBottom: 48 }}
          >
            <div className="font-bold uppercase text-center">
              TEST 2 (CONTROL)
            </div>
            <ResponsiveWaffle
              data={test2FlagsByPhase}
              total={test2TotalFlags}
              rows={10}
              columns={10}
              borderRadius={3}
              valueFormat=" <-.2"
              motionStagger={2}
              margin={{ top: 0 }}
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
            style={{ height: 320, marginBottom: 48 }}
          >
            <div className="font-bold uppercase text-center">
              TEST 3 (EXPERIMENTAL)
            </div>
            <ResponsiveWaffle
              data={test3FlagsByPhase}
              total={test3TotalFlags}
              rows={10}
              borderRadius={3}
              columns={10}
              valueFormat=" <-.2"
              motionStagger={2}
              margin={{ top: 0 }}
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
        <p>
          This contrast indicates that the system-authored exposure rule,
          combined with Flag gating, converts checking from short-lived probing
          into a persistent, option-building behavior. It also contextualizes
          the escalation timing pattern in Test 3. Flags appear early, but
          concentrate late, consistent with a slower early accumulation of
          eligible targets followed by higher late-phase conversion once
          accumulated opportunities become available.
        </p>
      </ArticleParagraph>
    </>
  );
};

const WhatComesNext = () => <div>What Comes Next?</div>;

export default {
  // Top-level sections, must match menu titles exactly
  Summary,
  "Conceptual Framing": ConceptualFraming,
  "Research Design and Methodology": ResearchDesignAndMethodology,
  "Coding and Variables": CodingAndVariables,
  Methods,
  "Findings and Interpretation": FindingsAndInterpretation,
  "What Comes Next?": WhatComesNext,

  // These exist in your JSON as subsections, so they must be present as keys too
  "Test Design": TestDesign,
  "Test Rules": TestRules,
  "Measures and Data Collection": MeasuresAndDataCollection,
};
