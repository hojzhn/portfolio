import React, { useEffect, useState, useMemo } from "react";
import Quote from "../components/Quote";
import { BulletVertical, ListVertical } from "../components/ListVertical";
import ArticleParagraph from "../components/ArticleParagraph";
import List from "../components/List";
import useCssTokens from "../utils/useCssTokens";
import Reference from "../components/Reference.js";
import { ResponsiveBar } from "@nivo/bar";
import { patternDotsDef, patternLinesDef, patternSquaresDef } from "@nivo/core";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveWaffle, Waffle } from "@nivo/waffle";
import AnimatedStripes from "../components/AnimatedStripes";
import { ResponsiveLine } from "@nivo/line";
import Toggle from "../components/Toggle";
import { CodeInline } from "../components/Code";
import ResearchConnectionTable from "../components/ResearchConnectionTable";
import FindingParagraph from "../components/FindingParagraph.js";
import flag1 from "../images/flag1.png";
import flag2 from "../images/flag2.png";
import flag3 from "../images/flag3.png";
import flag4 from "../images/flag4.png";
import flag5 from "../images/flag5.png";
import flag6 from "../images/flag6.png";
import flag7 from "../images/flag7.png";
import flag8 from "../images/flag8.png";

import fl1 from "../images/fl-1.gif";
import fl2 from "../images/fl-2.gif";
import fl3 from "../images/fl-3.png";

import {
  test1PhaseActionVolume,
  test2PhaseActionVolume,
  test1ActionPerActor,
  test2FlagsByPhase,
  test2TotalFlags,
  test2PopulationRatio,
  test3PopulationRatio,
  test3FlagsByPhase,
  test3TotalFlags,
  test3PhaseActionVolume,
  test2ActionPerActor,
  test3ActionPerActor,
  test1Lorenz,
  test2Lorenz,
  test3Lorenz,
  normalizeLorenz,
} from "../data/flags.data.jsx"; // adjust path
import Test1 from "../components/Flag/Test1.js";
import Test2 from "../components/Flag/Test2.js";
import Test3 from "../components/Flag/Test3.js";
import { TestRuleSection } from "../components/Flag/TestRuleSection.js";
import H3 from "../components/H3.js";
import GraphicCaption from "../components/GraphicCaption.js";
import H4 from "../components/H4.js";
import ResponsiveColumns from "../components/ResponsiveColumns.js";
import DescriptionHeader from "../components/DescriptionHeader.js";
import ScreenShowcase from "../components/ScreenShowcase.js";
function makeBarDefaults({ txt, bg, txt2, bg2, bg3, point }) {
  return {
    margin: { top: 30, bottom: 50, left: 30 },
    padding: 0.3,
    enableLabel: false,

    axisBottom: {
      legend: "phase",
      legendOffset: 36,
      legendPosition: "middle",
    },

    colors: ({ id }) => (id === "flag" ? point : txt2),

    defs: [
      {
        id: "checkGradient",
        type: "linearGradient",
        colors: [
          { offset: 0, color: txt2, opacity: 1 },
          { offset: 100, color: txt2, opacity: 0.2 },
        ],
      },
    ],

    fill: [
      {
        match: { id: "check" },
        id: "checkGradient",
      },
    ],

    theme: {
      text: { fill: txt2 },
      axis: {
        ticks: { text: { fill: txt2 } },
        legend: { text: { fill: txt2 } },
      },
      grid: {
        line: {
          stroke: bg3,
          strokeWidth: 1,
        },
      },
      legends: { text: { fill: txt } },
      tooltip: { container: { background: bg, color: txt, fontSize: 10 } },
    },
  };
}
const makePieDefaults = ({ txt, bg, bg2, point, hoverId, setHoverId }) => ({
  margin: { top: 20, right: 20, bottom: 60, left: 20 },
  innerRadius: 0.6,
  padAngle: 1.5,
  cornerRadius: 2,
  activeOuterRadiusOffset: 6,
  sortByValue: false, // preserve input order
  colors: (d) => {
    if (d.id === "No Action") return "transparent";
    if (d.id === "Checked and Flagged") return point;
    if (d.id === "Checked Only") return bg2; // blends into bg, dots provide the visible signal
    return txt;
  },

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

function useChartDefaults() {
  const { txt, txt2, bg, bg2, bg3, point, point2 } = useCssTokens();
  const [hoverId, setHoverId] = useState(null);

  const barDefaults = useMemo(
    () => makeBarDefaults({ txt, bg, txt2, bg2, bg3, point }),
    [txt, bg, txt2, bg2, bg3, point],
  );

  const pieDefaults = useMemo(
    () => makePieDefaults({ txt, bg, bg2, point, hoverId, setHoverId }),
    [txt, bg, bg2, point, hoverId],
  );

  return {
    txt,
    txt2,
    bg,
    bg2,
    bg3,
    point,
    point2,
    hoverId,
    setHoverId,
    barDefaults,
    pieDefaults,
  };
}

const CHECK = () => (
  <span className="font-mono rounded-md bg-[var(--bg2)] text-[0.8em] py-1 px-2 uppercase border border-[var(--bg3)]">
    CHECK
  </span>
);
const FLAG = () => (
  <span className="font-mono rounded-md bg-[var(--point2)] text-[0.8em] py-1 px-2 border uppercase text-[var(--point)] border-[var(--point)]">
    Flag
  </span>
);
const I = () => <CodeInline text="i" />;
const T = () => <CodeInline text="t" />;
const J = () => <CodeInline text="j" />;

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

const Overview = () => (
  <>
    <DescriptionHeader>The Finding</DescriptionHeader>
    Removing one design decision ("who picks the target") changed how people
    decided to act on each other. When the system assigned targets, fewer
    participants initiated the low-impact action (Check), but more proceeded to
    the high-impact one (Flag). 57% of participants were flagged under
    user-selected exposure; 68% under system-authored exposure.
    {/* <ResponsiveColumns>
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
    </ResponsiveColumns>
    <ListVertical>
      <BulletVertical title="Test 2 (control), user-selected exposure">
        A participant who initiates a <CHECK /> chooses the target.
      </BulletVertical>
      <BulletVertical title="Test 3 (experimental), system-authored exposure">
        A participant who initiates a <CHECK /> does not choose the target. The
        system assigns the target using balanced pairing.
      </BulletVertical>
    </ListVertical>{" "}
    <ResponsiveColumns>
      <p>
        Both rules include <b>a gated high-impact action</b>. <FLAG /> can only
        be directed at targets previously checked by the same actor, and a{" "}
        <FLAG />
        makes the target ineligible to win. This sequencing positions <FLAG />{" "}
        as a second-tier initiation step that requires prior commitment and
        produces irreversible competitive consequence.
      </p>
      <p>
        The design makes it possible to observe how low-impact and high-impact
        initiations unfold under constraint, compare escalation rates under rule
        variation, and assess how interaction structure shapes participation and
        concentration in the high-impact tier.
      </p>{" "}
    </ResponsiveColumns> */}
  </>
);

const WhyItMatters = () => (
  <>
    <p>
      Most digitally mediated systems where one participant commits to a
      consequential, hard-to-reverse action (buying into an offering, locking
      capital, binding a policy, joining a defined pool) treat the initiation
      step as neutral plumbing. The participant identifies a target and the
      system processes the commitment. This study tests what happens when the
      system authors that identification step instead.
    </p>
    <p>
      The result suggests initiation structure is not neutral. It shapes who
      commits, how widely commitment spreads, and how far actors proceed once
      the action carries irreversible cost.
    </p>
  </>
);

const WhatWasTestedDescription = () => (
  <>
    {" "}
    <p>
      Most digitally mediated systems where one participant commits to a
      consequential, hard-to-reverse action (buying into an offering, locking
      capital, binding a policy, joining a defined pool) treat the initiation
      step as neutral plumbing. The participant identifies a target and the
      system processes the commitment. This study tests what happens when the
      system authors that identification step instead.
    </p>
    <p>
      Three phase-based online tests with 20–30 participants each, screened for
      low initiation tendency.
    </p>
  </>
);

const WhatWasTested = () => (
  <>
    <ListVertical desc="Action types">
      <BulletVertical>
        <CHECK /> is a low-consequence, anonymous initiation step. No downstream
        effect on the target.
      </BulletVertical>
      <BulletVertical>
        <FLAG /> is a high-consequence step that removes the target's win
        eligibility. It is also a gated step; participant can only Flag a target
        they have previously checked.
      </BulletVertical>
    </ListVertical>{" "}
    <p>
      The Check–Flag sequence creates a two-tier structure: a reversible probing
      action that gates access to an irreversible competitive one. The variable
      across tests was control over Check target selection. In Test 2 (control),
      participants chose. In Test 3 (experimental), the system assigned. Test 1
      served as a consequence-free baseline.
    </p>
    <p>
      This setup made it possible to observe how reallocating responsibility at
      the initiation step affected not just entry behavior, but the rate at
      which actors proceeded to high-impact action.
    </p>
  </>
);
const WhatThisLicenses = () => (
  <>
    <p>
      The study isolates a recurring structural pattern: a reversible probe that
      gates an irreversible commit. This pattern appears across many domains
      where authoring the targeting step suppresses participation. The most
      acute version is in consumer protective products, where the under-purchase
      gap maps almost exactly onto the participation gap the study documents.
      Section 06 develops a design application in that domain.
    </p>
  </>
);

const WhatThisLicensesDescription = () => (
  <>
    <p>
      The result suggests initiation structure is not neutral. It shapes who
      commits, how widely commitment spreads, and how far actors proceed once
      the action carries irreversible cost.
    </p>
  </>
);

const Attentive = () => (
  <>
    {" "}
    <div>
      <img
        src={flag1}
        alt="Attentive non-initiation in group settings"
        className="max-w-full h-auto mb-[2em]"
      />
    </div>
    <p>
      Online communities often show participation inequality, where a small
      subset produces most visible activity and many others remain silent while
      staying attentive. Prior work links hesitation to expected downside under
      visibility and to perceived efficacy constraints, suggesting a
      design-relevant decision point at the moment of initiation.{" "}
      <Reference
        index={1}
        label="Nonnecke & Preece, 2000."
        href="https://www.researchgate.net/publication/221514606_Lurker_Demographics_Counting_the_Silent"
      />{" "}
      <Reference
        index={2}
        label="Nonnecke & Preece, 2001."
        href="https://www.researchgate.net/publication/228998958_Why_Lurkers_Lurk"
      />
      <Reference
        index={3}
        label="Noelle-Neumann, 1974."
        href="https://www.amazon.com/Spiral-Silence-Public-Opinion-Social/dp/0226589366"
      />
      <Reference
        index={4}
        label="Bandura, 1997. "
        href="https://en.wikipedia.org/wiki/Self-Efficacy_%28book%29"
      />
    </p>
  </>
);
const Inactivity = () => (
  <>
    <p>
      Inactivity is defined here as low initiation of visible actions despite
      ongoing attention. Initiation could be defined as a repeated go or no-go
      decision under uncertainty, shaped by the local rules.
    </p>
    <p>
      {" "}
      This paper uses <i>agency burden</i> as an interpretive lens for why rules
      can shift initiation. Agency burden is defined as the perceived burden of
      initiating an action that can influence the shared social environment,
      especially when consequences may feel socially attributable or hard to
      reverse.
    </p>
    <p>
      In this paper, agency burden is not treated as a single identified cause.
      It is treated as a plausible mechanism that co-varies with rule features
      such as target-selection responsibility and planning capacity.
    </p>
    <div>
      <img
        src={flag2}
        alt="Inactivity Illustration"
        className="max-w-full h-auto"
      />
    </div>
  </>
);
const ResearchOpportunity = () => (
  <>
    <p>
      If agency burden constrains initiation, engagement can shift when rules
      change how responsibility and consequences are distributed.{" "}
      <Reference
        index={5}
        label="Kollock & Smith, 1999."
        href="https://www.amazon.com/Communities-Cyberspace-Peter-Kollock/dp/0415191408"
      />{" "}
      <Reference
        index={6}
        label="Matias, 2019."
        href="https://www.researchgate.net/publication/332758950_Preventing_harassment_and_increasing_group_participation_through_social_norms_in_2190_online_science_discussions"
      />{" "}
      This study tests whether low-initiation participants initiate more under
      rules that reduce target-selection responsibility at the initiation step.
    </p>
    <p>
      Because the <FLAG /> action in this environment imposes a negative effect
      on another participant, it carries a clear competitive cost. Under
      comparable opportunity conditions, higher <FLAG /> activity is therefore
      interpreted as a reduction in the effective friction associated with
      high-impact initiation.
    </p>
    <div>
      <img
        src={flag3}
        alt="Research Opportunity illustration"
        className="max-w-full h-auto"
      />
    </div>
  </>
);

const TestDesignDescription = () => (
  <>
    <p>
      A behavior-focused, rule-based interaction design was used to examine
      engagement initiation across repeated decisions. Stable, auditable
      constraints were prioritized over ecological realism. Each test produced a
      phase-indexed event log.
    </p>
  </>
);
const TestDesign = () => (
  <>
    <ResponsiveColumns>
      <ArticleParagraph title="Tiered Engagement">
        Actions were analyzed in two tiers based on direct interpersonal impact
        under these rules.
        <div className="w-full">
          <img
            src={flag4}
            alt="Indifference illustration"
            className="w-auto h-auto max-w-[150px] m-auto my-8"
          />
          <CHECK /> is treated as a non-harm initiation step in the moment,
          while still recognized as an option-creating step because it gates
          later <FLAG /> actions.
        </div>
        <div className="w-full">
          <img
            src={flag5}
            alt="Indifference illustration"
            className="w-auto h-auto max-w-[150px] m-auto my-8"
          />
          <FLAG /> is treated as a high-impact initiation step because it
          directly changes another participant’s win eligibility.
        </div>
      </ArticleParagraph>

      <ArticleParagraph title="Manipulation Bundle">
        <p>
          The rule variation concerns control over target selection at the{" "}
          <CHECK />
          step. In both conditions, actors choose whether to initiate. The
          difference lies in whether they select the target themselves or the
          system assigns it.
        </p>
        <p>
          Because actors do not observe <FLAG /> eligibility states, downstream
          differences are not mainly driven by strategic management of future
          options.
        </p>
        <p>The analysis therefore focuses on two outcomes:</p>
        <ListVertical>
          <BulletVertical>
            Differences in <CHECK /> initiation under varying responsibility
            conditions.
          </BulletVertical>
          <BulletVertical>
            Differences in <FLAG /> activity, interpreted as changes in
            effective friction for high-impact action.
          </BulletVertical>
        </ListVertical>
      </ArticleParagraph>
    </ResponsiveColumns>
    <p className="text-[var(--txt2)]">
      By separating initiation from escalation, the analysis tests whether
      reallocating responsibility at the first step changes not only entry
      behavior but also the rate at which actors proceed to irreversible,
      high-impact action. This allows escalation differences to be interpreted
      as consequences of initiation structure rather than differences in
      strategic awareness or option visibility.
    </p>
  </>
);

const ParticipantProfile = () => (
  <>
    <p>
      Participants were recruited in mid-sized groups of 20 to 30 per test and
      self-identified as conflict-avoidant or risk-averse in social interaction
      contexts. Cohorts differed across tests. Informed consent was collected.
      Withdrawal was allowed at any time.
    </p>
  </>
);
const TestRules = () => {
  return (
    <>
      <TestRuleSection
        title="Test 1"
        subtitle="baseline probing"
        imageSrc={flag6}
        imageAlt="Indifference illustration"
        Demo={Test1}
        bullets={[
          <>
            Each participant could initiate at most one <CHECK /> per phase.
          </>,
          <>
            When a <CHECK /> occurred, the target was notified that they had
            been checked, but the checker’s identity was not disclosed. No other
            participants were notified. <CHECK /> outcomes were not publicly
            displayed.
          </>,
          <>
            Checking produced no downstream consequences. It did not change
            asset ownership, participant status, or standing. No rewards,
            penalties, eliminations, or redistribution were tied to the action.
          </>,
        ]}
      />

      <TestRuleSection
        title="Test 2"
        subtitle="control, agency  + authorship + opportunity engineering"
        imageSrc={flag7}
        imageAlt="Indifference illustration"
        Demo={Test2}
        bullets={[
          <>
            Each participant could initiate at most one <CHECK /> per phase.
          </>,
          <>
            Participants could also initiate <FLAG /> actions, subject to a
            gating rule: Flagging could only be directed at a participant who
            had been checked by the flagger in previous phases. The set of
            checked targets accumulated over phases, creating an expanding
            eligibility set that could be curated through deliberate checking.
          </>,
          <>
            <FLAG />s imposed a negative status effect on targets,
            operationalized as loss of win eligibility. <FLAG />s and
            ineligibility status were logged by the system.
          </>,
          <>
            The target was not notified of ineligibility during play. No public
            indicator of ineligibility was shown either.
          </>,
        ]}
      />

      <TestRuleSection
        title="Test 3"
        className="border-0"
        subtitle="experimental, system-authored exposure with accumulated opportunity"
        imageSrc={flag8}
        imageAlt="Indifference illustration"
        Demo={Test3}
        bullets={[
          <>
            Test 3 assigned <CHECK /> targets using a constrained balancing
            procedure through the system. In each phase, each actor who opted to
            <CHECK /> was assigned exactly one random target, excluding
            self-checks and repeated checks.
          </>,
          <>
            Flagging rules matched Test 2, including the same gating rule and
            the same accumulation of eligible targets across phases.
          </>,
        ]}
      />
    </>
  );
};

const MeasuresAndDataCollection = () => (
  <>
    <ResponsiveColumns>
      <ArticleParagraph title="Behavioral Measures">
        Behavioral data came from the phase-indexed event logs. Summary measures
        were computed in three families.
        <ListVertical>
          <BulletVertical>
            <b>Engagement volume and breadth.</b> How many actions occur and how
            widely initiation spreads across participants
          </BulletVertical>
          <BulletVertical>
            <b>Escalation timing and onset.</b> When Flagging begins and how it
            accumulates over phases.
          </BulletVertical>
          <BulletVertical>
            <b>Participation inequality.</b> Concentration of received actions
            across targets using Gini, HHI, and top-share summaries, computed
            separately for Checks and Flags.
          </BulletVertical>
        </ListVertical>
      </ArticleParagraph>

      <ArticleParagraph title="Qualitative Evidence">
        Post-phase Likert items and post-test interviews were collected to
        assess perceived target-selection control, authorship, identifiability,
        and consequence. Responses were coded using a deductive codebook aligned
        to study constructs. Coding was conducted by a single coder.
      </ArticleParagraph>
    </ResponsiveColumns>
  </>
);

const Analysis = () => (
  <p>
    The event-log was coded into four families of variables — event-level,
    phase-indexed participant state, phase-level outcomes, and actor-level
    outcomes — supporting both descriptive comparison and model-based
    interpretation.
  </p>
);

const CodingAndVariables = () => {
  const TableRow = ({ field, definition, last }) => {
    const fields = Array.isArray(field) ? field : [field];

    return (
      <div className={`flex flex-row items-start py-2 gap-4 `}>
        <div className="flex-1 min-w-0 gap-x-2 gap-y-1 text-[0.8em] font-mono bg-[var(--bg2)] p-1 rounded-md">
          {fields.map((f, idx) => (
            <React.Fragment key={`${String(f)}-${idx}`}>
              {f}
              {idx < fields.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
        <div className="flex-1">{definition}</div>
      </div>
    );
  };

  const TableHeader = ({ children }) => (
    <>
      <H3 className="w-full flex tracking-[0.14em] text-[var(--txt2)] pb-[1em] text-[0.8em] border-b border-[var(--bg3)]">
        {children}
      </H3>
    </>
  );

  return (
    <>
      <div className="mb-[2em]">
        <TableHeader>Event-level</TableHeader>
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
      <div className="mb-[2em]">
        <TableHeader>Phase-indexed Participant state </TableHeader>
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
      <TableHeader>Phase-level outcomes </TableHeader>
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
      <div className="mb-[2em]">
        <TableHeader>Actor-level outcomes </TableHeader>

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
      <div className="mb-[2em]">
        <TableHeader>Actor-Phase outcomes </TableHeader>
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
    </>
  );
};

const Methods = () => {
  return (
    <>
      <ResponsiveColumns>
        <ArticleParagraph title="Comparative Logic Across Tests">
          <p>
            {" "}
            <CHECK />s were compared across tests only as a descriptive
            initiation signal because <CHECK /> meaning changes when it gates{" "}
            <FLAG /> opportunity.
            <FLAG />
            -related measures were compared only between Tests 2 and 3 where
            rules align.
          </p>
        </ArticleParagraph>
        <ArticleParagraph title="Model-based Analysis">
          A phase-indexed mixed-effects model estimated whether an actor flagged
          at least once in phase t, conditioned on flag-enabled set size at the
          start of that phase, plus condition and phase effects. This supported
          interpretation of whether condition differences reflected expanded
          options or increased escalation per option.
        </ArticleParagraph>
      </ResponsiveColumns>
    </>
  );
};

const Limitations = () => {
  return (
    <ListVertical>
      <BulletVertical>
        Cohorts differed across tests, so between-test comparisons were
        interpreted as directional patterns rather than individual-level causal
        effects.
      </BulletVertical>
      <BulletVertical>
        Test 2 bundled agency, authorship, and opportunity engineering by
        design. Effects could be attributed to the bundled manipulation rather
        than to a single isolated lever.
      </BulletVertical>
      <BulletVertical>
        Actions were not independent observations. Network dependence and
        retaliation dynamics limited the validity of analyses that assume
        independence without adjustment.
      </BulletVertical>
      <BulletVertical>
        The meaning of “check” differed across tests in consequence and
        informational context, so comparisons involving checks were limited to
        aligned summaries rather than treated as identical psychological acts.
      </BulletVertical>
    </ListVertical>
  );
};

const PieBlock = ({ title, children }) => (
  <div className="relative" style={{ width: "100%" }}>
    {title}
    <div style={{ height: 320 }}>{children}</div>
  </div>
);

const FindingsAndInterpretation = () => {
  const [test1View, setTest1View] = useState("phase");
  const [actionPerPlayerView, setActionPerPlayerView] = useState(2);

  return (
    <>
      <DescriptionHeader>Test result overview</DescriptionHeader>
      <p>
        Findings compare Test 2 (N = 28) and Test 3 (N = 25) across
        phase-indexed event logs, using Test 1 (N=29) as baseline. Cohorts
        differed across tests, so comparisons support directional pattern
        inference, not individual-level causal attribution. Interpretation links
        the observed patterns to the manipulation of target-selection control at
        initiation and its downstream effects.
      </p>
    </>
  );
};

export const ChartContainer = ({ children, className }) => (
  <div
    className={`border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] px-3 py-4 ${className}`}
  >
    {children}
  </div>
);
const Finding1 = () => {
  const [test1View, setTest1View] = useState("phase");
  const { txt, txt2, bg, point, barDefaults, pieDefaults } = useChartDefaults();

  return (
    <>
      <ChartContainer>
        <GraphicCaption>
          Test 1 / action volume / per {test1View}
        </GraphicCaption>
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
              markers={[
                {
                  axis: "y",
                  value: 0.66,
                  legend: "0.66 Checks",
                  legendPosition: "right",
                  lineStyle: {
                    stroke: point, // same as your check dot color
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  },
                  textStyle: {
                    fill: point,
                    fontSize: 10,
                    fontFamily: "monospace", // ← here
                  },
                },
              ]}
            />
          )}
        </div>
      </ChartContainer>{" "}
      <Toggle
        items={[
          { label: "Phase", value: "phase" },
          { label: "Player", value: "player" },
        ]}
        value={test1View}
        onChange={setTest1View}
      />
      <p>
        Test 1 provides a baseline for initiation when the only available action
        is a low-consequence, anonymous <CHECK />. Across 8 phases (N = 29), 19
        <CHECK />s were recorded, which corresponds to 0.66 <CHECK />s per
        participant and 8.2% utilization of the maximum possible <CHECK />s (N ×
        8).{" "}
      </p>
      <p>
        <CHECK /> activity was front-loaded and unstable, peaking in Phase 1 (5
        <CHECK />
        s) and including a complete zero-action phase (Phase 5).
      </p>
      <FindingParagraph
        tagline="Non-initiation persists even when actions don't affect outcomes."
        desc="The substantially higher Check volume in Tests 2 and 3 is therefore consistent with rule-driven changes in perceived instrumentality and consequence, not baseline curiosity alone."
      />
    </>
  );
};
const Finding2 = () => {
  const [actionPerPlayerView, setActionPerPlayerView] = useState(2);
  const { txt, txt2, bg, point, barDefaults, pieDefaults } = useChartDefaults();
  return (
    <>
      <ChartContainer>
        <GraphicCaption>
          Test {actionPerPlayerView} / action volume / per player
        </GraphicCaption>
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
              margin={{ ...barDefaults.margin, right: 100 }}
              markers={[
                {
                  axis: "y",
                  value: 4.75,
                  legend: `4.75\nChecks`,
                  legendPosition: "right",
                  lineStyle: {
                    stroke: point, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 1,
                    strokeDasharray: "4 4", // dashed
                  },
                  textStyle: {
                    fill: point,
                    fontSize: 10,
                    fontFamily: "monospace",
                  },
                },
                {
                  axis: "y",
                  value: 1.07,
                  legend: "1.07 Flags",
                  legendPosition: "right",
                  lineStyle: {
                    stroke: point, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 1,
                    strokeDasharray: "4 4", // dashed
                  },
                  textStyle: {
                    fill: point,
                    fontSize: 10,
                    fontFamily: "monospace",
                  },
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
                    stroke: point, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 1,
                    strokeDasharray: "4 4", // dashed
                  },
                  textStyle: {
                    fill: point,
                    fontSize: 10,
                    fontFamily: "monospace",
                  },
                },
                {
                  axis: "y",
                  value: 1.24,
                  legend: "1.24 Flags",
                  legendPosition: "right",
                  lineStyle: {
                    stroke: point, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 1,
                    strokeDasharray: "4 4", // dashed
                  },
                  textStyle: {
                    fill: point,
                    fontSize: 10,
                    fontFamily: "monospace",
                  },
                },
              ]}
            />
          )}
        </div>{" "}
      </ChartContainer>
      <Toggle
        items={[
          { label: "Test 2", value: 2 },
          { label: "Test 3", value: 3 },
        ]}
        value={actionPerPlayerView}
        onChange={setActionPerPlayerView}
      />
      <p>
        Test 1 provides a consequence-free baseline for initiation. In Test 1,
        participants averaged 0.66 <CHECK />s per participant. Under the{" "}
        <FLAG />
        -gated rules in Tests 2 and 3, <CHECK /> initiation increased
        substantially, rising to 4.75 <CHECK />s per participant in Test 2 and
        2.84 <CHECK />s per participant in Test 3.
        <FindingParagraph
          tagline="Introducing downstream consequence and option gating markedly increases initiation relative to a low-stakes probing environment."
          desc="User-selected exposure in Test 2 amplifies Check volume beyond the system-authored exposure rule in Test 3."
        />
      </p>
    </>
  );
};
const Finding3 = () => {
  const { txt, txt2, bg, barDefaults, pieDefaults } = useChartDefaults();
  return (
    <>
      {" "}
      <GraphicCaption>
        Test 2,<br></br>
        Test 3 / Overall engagement breakdown
      </GraphicCaption>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <PieBlock
          title={
            <div className="text-center mb-4">
              <i class="fa-sharp fa-regular fa-cube text-sm mr-2 text-[var(--txt2)]"></i>{" "}
              Test 2{" "}
              <span className="text-xs text-[var(--txt2)]">(Control)</span>
            </div>
          }
          txt={txt}
        >
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
        <PieBlock
          title={
            <div className="text-center mb-4">
              <i class="fa-sharp fa-regular fa-cubes text-sm mr-2 text-[var(--txt2)]"></i>{" "}
              Test 3{" "}
              <span className="text-xs text-[var(--txt2)]">(Experimental)</span>
            </div>
          }
          txt={txt}
        >
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
        Across the full window, the system-authored exposure rule produced fewer
        <CHECK />s but slightly more <FLAG />s per participant.
      </p>
      <FindingParagraph tagline="When target selection is removed from the Check step, Check initiation volume drops while engagement in the high-impact tier does not drop and is more broadly adopted." />
    </>
  );
};
const Finding4 = () => {
  const [lorenzView, setLorenzView] = useState(1);
  const { txt, txt2, bg, bg3, barDefaults, pieDefaults } = useChartDefaults();
  const palette = ["var(--txt3)", "var(--txt2)", "var(--point)"];
  const noAreaIds = new Set(["Line of Equality"]);

  return (
    <>
      {" "}
      <ChartContainer>
        <GraphicCaption>
          Test {lorenzView} / Lorenz curves of action concentration by actor
        </GraphicCaption>
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
            defs={[
              {
                id: "gradientArea",
                type: "linearGradient",
                colors: [
                  { offset: 0, color: "var(--point2)", opacity: 0.4 },
                  { offset: 100, color: "var(--point2)", opacity: 0 },
                ],
              },
              {
                id: "noArea",
                type: "patternLines",
                background: "transparent",
                color: "transparent",
                lineWidth: 0,
                spacing: 10,
                rotation: 0,
              },
            ]}
            xScale={{ type: "linear", min: 0, max: 1 }}
            yScale={{ type: "linear", min: 0, max: 1 }}
            enablePoints={false}
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
            colors={palette}
            fill={[
              {
                match: (d) => noAreaIds.has(d.id),
                id: "noArea",
              },
              {
                match: "*", // everything else
                id: "gradientArea",
              },
            ]}
            areaOpacity={1} // whatever you want for the filled series
            theme={{
              text: { fill: txt2 },
              axis: {
                ticks: { text: { fill: txt2 } },
                legend: { text: { fill: txt2 } },
              },

              grid: {
                line: {
                  stroke: bg3, // pick your token
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
      </ChartContainer>
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
        Test 1 shows high participation inequality in low-tier initiation. Only
        12/29 participants initiated a <CHECK />, and <CHECK /> activity was
        heavily concentrated (actor <CHECK /> Gini = 0.69). The top 20% of
        actors (6 people) generated 68% of all <CHECK />
        s.
      </p>
      <p>
        Under the <FLAG />
        -gated rules in Tests 2 and 3, <CHECK /> initiation spread across far
        more of the cohort and became much less unequal. Actor <CHECK />
        inequality fell to Gini = 0.17 in Test 2 and 0.23 in Test 3, and the top
        20% of actors contributed about 29% to 30% of all <CHECK />
        s. In the high-impact tier, <FLAG /> participation also spread more
        under system-authored exposure, with lower actor-level <FLAG />{" "}
        inequality in Test 3 (Gini = 0.49) than in Test 2 (0.61), consistent
        with the higher share of participants who flagged at least once.
      </p>
    </>
  );
};
const Finding5 = () => {
  const [actionPerPhaseView, setActionPerPhaseView] = useState(2);
  const { txt, txt2, bg, bg2, point, point2, barDefaults, pieDefaults } =
    useChartDefaults();

  return (
    <>
      <ChartContainer>
        <GraphicCaption>
          Test {actionPerPhaseView} / action volume / per phase
        </GraphicCaption>
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
                    stroke: point, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 1,
                    strokeDasharray: "4 4", // dashed
                  },
                  textStyle: {
                    fill: point,
                    fontSize: 10,
                    fontFamily: "monospace",
                  },
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
                    stroke: point, // or pick another color if you differentiate flag elsewhere
                    strokeWidth: 1,
                    strokeDasharray: "4 4", // dashed
                  },
                  textStyle: {
                    fill: point,
                    fontSize: 10,
                    fontFamily: "monospace",
                  },
                },
              ]}
            />
          )}
        </div>
      </ChartContainer>
      <Toggle
        items={[
          { label: "Test 2", value: 2 },
          { label: "Test 3", value: 3 },
        ]}
        value={actionPerPhaseView}
        onChange={setActionPerPhaseView}
      />
      <p>
        Test 1 provides a baseline for how <CHECK /> initiation behaves when it
        carries no downstream consequence, and that baseline differs sharply
        from Test 3.
      </p>
      <p className="mb-8">
        In Test 1, <CHECK />s decayed after an initial novelty spike, dropping
        from 5 in Phase 1 to 1 by Phase 3 and reaching a zero-action phase in
        Phase 5. In Test 3, <CHECK />s instead ramped and then remained
        sustained, rising from 4 in Phase 1 to 15 in Phase 5 and staying high in
        Phases 6 and 7 (13 and 13).
      </p>
      <GraphicCaption>
        Test 2,<br></br>
        Test 3 / Flag concentration by phase
      </GraphicCaption>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="w-full" style={{ height: 320, marginBottom: 48 }}>
          <div className="text-center mb-4">
            <i class="fa-sharp fa-regular fa-cube text-sm mr-2 text-[var(--txt2)]"></i>{" "}
            Test 2 <span className="text-xs text-[var(--txt2)]">(Control)</span>
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
              if (d.id === "P5") return point; // pick your Phase 5 highlight
              if (d.id === "P6") return point; // pick your Phase 6 highlight
              return bg2; // one muted color for everything else
            }}
            theme={{
              tooltip: {
                container: { background: bg, color: txt, fontSize: 10 },
              },
            }}
          />
        </div>

        <div className="w-full" style={{ height: 320, marginBottom: 48 }}>
          <div className="text-center mb-4">
            <i class="fa-sharp fa-regular fa-cubes text-sm mr-2 text-[var(--txt2)]"></i>{" "}
            Test 3{" "}
            <span className="text-xs text-[var(--txt2)]">(Experimental)</span>
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
              if (d.id === "P7") return point; // pick your Phase 5 highlight
              if (d.id === "P8") return point; // pick your Phase 6 highlight
              return bg2; // one muted color for everything else
            }}
            theme={{
              tooltip: {
                container: { background: bg, color: txt, fontSize: 10 },
              },
            }}
          />
        </div>
      </div>
      <FindingParagraph
        tagline="System-authored exposure, combined with Flag gating, converts checking from short-lived probing into a persistent, option-building behavior."
        desc="It also contextualizes the escalation timing pattern in Test 3. Flags appear early, but concentrate late, consistent with a slower early accumulation of eligible targets followed by higher late-phase conversion once accumulated opportunities become available."
      />
    </>
  );
};

const DesignApplication = () => (
  <>
    <DescriptionHeader>A Design exploration</DescriptionHeader>
    <p>
      This section explores one application of the study: a flow that treats the
      recurring deposit as the documentation of a stated view, rather than as a
      scheduled transaction. The user states what they believe, sets a monthly
      level at which they will back it, and the system handles implementation.
    </p>
    <p>
      The design is one possible application of the research, chosen because the
      structural fit is direct and because the action class (committing capital
      to a stated view) has the gating, system-authoring, and irreversibility
      properties the study isolates.
    </p>
  </>
);
const BeforeTheScreens = () => (
  <>
    <ResearchConnectionTable />
    <p className="text-[var(--txt2)]">
      The design ports the gating, system-authoring, and irreversibility of the
      study. The system surfaces themes, the user assembles the position. Belief
      authorship stays with the user. The competitive externality of the Flag
      action does not transfer since pattern-backed commitment imposes cost on
      the actor, not on another participant. Claims rest on the patterns
      isolated, not on extrapolation of the quantitative results.
    </p>
  </>
);
const Screens = () => (
  <>
    <p>How this connects to the research.</p>
  </>
);
const Conviction = () => (
  <>
    <ResponsiveColumns>
      <ScreenShowcase images={[fl1]} />
      <div>
        <ListVertical>
          <BulletVertical
            title="System-surfaced targeting remains intact"
            vertical={true}
          >
            The system surfaces patterns from observed signals. The user does
            not search or synthesize. This is the operational form of Test 3's
            manipulation.
          </BulletVertical>
          <BulletVertical title="Direction is assembled" vertical>
            A soft, editable statement appears after pattern selection. The
            system surfaces a direction; the user confirms or refines.
          </BulletVertical>
          <BulletVertical title="Lower rejection cost" vertical>
            Rejecting a pattern is a single tap. The user opts in or out without
            reading or composing anything.
          </BulletVertical>
        </ListVertical>
        <div className="border-b border-[var(--bg3)] w-full mt-[2em] mb-[2em]" />
        <ArticleParagraph title="FINDING: Baseline initiation">
          <p>
            Test 1 recorded 19 Checks across 8 phases when the only available
            action carried no consequence. Non-initiation persists even when
            actions don't affect outcomes.
          </p>{" "}
          <p className="text-[var(--txt2)]">
            The cost of constructing a position from blank suppresses
            participation regardless of stakes. Removing the construction is the
            design's first move.{" "}
          </p>
        </ArticleParagraph>
      </div>
    </ResponsiveColumns>
  </>
);
const TheConvictionDescription = () => (
  <>
    <p>
      The system assembles a candidate statement from observed engagement:
      articles read, newsletters followed, funds watchlisted. It is offered as a
      position the user might hold, without positioning itself as forcast or
      recommendation.
    </p>
    <p>
      The user can accept, refine, or refuse.{" "}
      <span className="text-[var(--txt)]">
        Composing from blank is not an option.
      </span>
    </p>
  </>
);
const Commitment = () => (
  <>
    <ResponsiveColumns>
      <ScreenShowcase images={[fl2]} />
      <div>
        {" "}
        <ListVertical>
          <BulletVertical
            title=" The user sets only the monthly amount "
            vertical
          >
            The system selects the instruments and weightings. The user only
            selects the level.
          </BulletVertical>
          <BulletVertical title="Selective disclosure" vertical>
            The exposure surface (asset class, risk range) is shown at commit.
            Full instrument detail is in the account view after binding.
          </BulletVertical>
        </ListVertical>{" "}
        <div className="border-b border-[var(--bg3)] w-full mt-[2em] mb-[2em]" />
        <ArticleParagraph title="FINDING: Baseline initiation">
          <p>
            Check participation rose from 19 actions in Test 1 to 4.75 per
            participant in Test 2 and 2.84 in Test 3. Gini fell from 0.69 in
            Test 1 to 0.17 and 0.23.
          </p>{" "}
          <p className="text-[var(--txt2)]">
            The design assumes the same shift can apply to commitment behavior.
          </p>
        </ArticleParagraph>
      </div>
    </ResponsiveColumns>
  </>
);
const TheCommitmentDescription = () => (
  <>
    <p>
      The user has accepted a statement. The screen asks one question: at what
      monthly level will they back it.{" "}
    </p>
    <p>Instruments, weightings, and rebalancing are not surfaced here.</p>
  </>
);
const Standing = () => (
  <>
    <ResponsiveColumns>
      <ScreenShowcase images={[fl3]} />
      <div>
        <ListVertical>
          <BulletVertical title="Check the standing" vertical>
            The screen displays the position, how long it has been backed, and
            how much has been deployed. Implementation is accessible in one tap
            but is not the default view.
          </BulletVertical>
          <BulletVertical title="Retraction" vertical>
            The unwind is labeled "retract" rather than "cancel" because the
            user committed to a stated position.
          </BulletVertical>
        </ListVertical>
      </div>
    </ResponsiveColumns>
  </>
);
const TheStandingDescription = () => (
  <>
    <p>
      The screen displays the statement, how long it has been backed, and how
      much has been deployed. Holdings are accessible but not surfaced.
    </p>
    <p>
      Retraction stops the deposits and unwinds the implementation; it is named
      a "change of view" rather than a cancellation.
    </p>
  </>
);
const Position = () => <></>;
const WhatComesNext = () => (
  <>
    <DescriptionHeader>Conclusion</DescriptionHeader>
    <p>
      Removing interpersonal target selection reshapes participation, timing,
      and escalation intensity, reducing exposure inequality while coinciding
      with higher engagement in irreversible actions. The data support a
      rule-level interpretation: initiation structure influences not only who
      acts, but how far actors proceed once action becomes consequential.
    </p>
    <p>
      This line of research may extend to interaction systems in which
      individuals decide whether to impose consequential outcomes on others.
      When responsibility for initial targeting is mediated by system design,
      patterns of escalation may shift even if the available actions remain
      constant.
    </p>
    <p>
      Future work can examine whether redistributing responsibility at early
      stages alters willingness to enact high-impact decisions in other
      digitally mediated environments.
    </p>
  </>
);

export default {
  // Top-level sections, must match menu titles exactly
  Overview,

  // "Why it matters": WhyItMatters,
  "Test Overview": WhatWasTested,
  "What Was Tested Description": WhatWasTestedDescription,

  "What this licenses": WhatThisLicenses,
  "What this licenses description": WhatThisLicensesDescription,
  "Attentive non-initiation in group settings": Attentive,
  "Inactivity as a threshold under agency burden": Inactivity,
  "Research Opportunity": ResearchOpportunity,

  "Coding and Variables": CodingAndVariables,
  Methods,
  Limitations,
  "Findings and Interpretation": FindingsAndInterpretation,
  "Baseline initiation under consequence-free probing (Test 1).": Finding1,
  "Check initiation increased under Flag gating": Finding2,
  "Lower Check volume, higher Flag adoption under system assignment": Finding3,
  "Participation inequality fell under gating and system assignment": Finding4,
  "Escalation timing diverged by rule": Finding5,
  "What Comes Next?": WhatComesNext,

  // These exist in your JSON as subsections, so they must be present as keys too
  "Test Design": TestDesign,
  "Test design description": TestDesignDescription,
  "Test Rules": TestRules,
  "Participant Profile": ParticipantProfile,
  "Measures and Data Collection": MeasuresAndDataCollection,
  Analysis,

  "Design application": DesignApplication,
  "Before the Screens": BeforeTheScreens,
  Screens,
  "The Conviction": Conviction,
  TheConvictionDescription: TheConvictionDescription,
  "The Commitment": Commitment,
  TheCommitmentDescription: TheCommitmentDescription,
  "The Standing": Standing,
  TheStandingDescription: TheStandingDescription,
  "The Position": Position,
};
