import React from "react";
import { BulletVertical, ListVertical } from "../components/ListVertical";
import Reference from "../components/Reference.js";
import FindingParagraph from "../components/FindingParagraph.js";
import { Card, CardGrid } from "../components/Twenty/Cards";
import flag1 from "../images/flag1.png";
import flag2 from "../images/flag2.png";
import GraphicCaption from "../components/GraphicCaption.js";
import DescriptionHeader from "../components/DescriptionHeader.js";
import FigCaption from "../components/FigCaption.js";
import FlowDiagram from "../components/Flag/FlowDiagram.js";
import MonoLabel from "../components/MonoLabel.js";
import HMWFraming from "../components/Twenty/HMW.js";
import { CodeInline } from "../components/Code.js";
import Pill from "../components/Pill.js";
import PainPointsInteractive from "../components/Bol/PainPoints.js";
const Overview = () => (
  <>
    <img
      src={flag2}
      alt="Inactivity Illustration"
      className="max-w-full h-auto"
    />
  </>
);

const overviewDesc = () => <></>;

const Proposition = () => (
  <>
    <DescriptionHeader>How it works</DescriptionHeader>
    <p>
      The design collapses six authoring steps into one. The user picks a theme
      drawn from their own engagement, sets a monthly level, and commits.
      Allocation, risk profile, fees, and rebalancing run under the system. The
      user authors the view. The system authors the configuration.
    </p>
    <p>
      The work tests whether the authoring-chain collapse holds in a regulated
      retail-investment flow, where suitability and disclosure constrain how far
      the collapse can go.
    </p>
  </>
);

const TheFlow = () => (
  <>
    <FindingParagraph
      first
      title="1. The Conviction"
      tagline="The system drafts. The user only decides whether to claim it."
      desc="The screen lists themes the system has constructed from observed activity. Each row carries a signal strength score, 90-day momentum, a typical exposure mix, and a column showing the user's own engagement with the theme. The user selects a theme and proceeds to set exposure."
    />
    <div>
      <div className="aspect-[5/3]  bg-[var(--bg2)] border border-dashed border-[var(--bg3)] rounded-lg flex items-center justify-center text-[var(--txt3)] font-mono text-[12px] uppercase tracking-[0.16em]">
        screen
      </div>
      <FigCaption>
        The user does not author a position from scratch. The system has already
        constructed candidate themes and ranked them. The system surfaces the
        position the user has already shown interest in, ranked by how strongly
        the signal is currently moving.
      </FigCaption>
    </div>
    <CardGrid>
      <Card label="Surfaced">
        Ranked themes. Signal strength. 90-day momentum. Typical exposure mix.
        The user's own engagement history per theme.
      </Card>
      <Card label="Displaced" labelClass="text-[var(--txt2)]">
        Composing a thesis from scratch. Summarizing one's own activity.
        Choosing what to commit to without scaffolding.
      </Card>
    </CardGrid>
    <FindingParagraph
      title="2. The Commitment"
      tagline="One question: the level of conviction."
      desc="Once a theme is selected, the screen asks the user one binding question: at what monthly level do you want to back this. The rest of the screen shows what the commit will produce."
    />
    <div>
      <div className="aspect-[5/3]  bg-[var(--bg2)] border border-dashed border-[var(--bg3)] rounded-lg flex items-center justify-center text-[var(--txt3)] font-mono text-[12px] uppercase tracking-[0.16em]">
        screen
      </div>{" "}
      <FigCaption>
        Everything other than the monthly level is present but as consequence,
        surfaced for review rather than for configuration. The displacement is
        from authoring those things to inspecting them. Allocation, risk, and
        implementation move out of the user's path. They do not move off the
        screen.
      </FigCaption>
    </div>
    <CardGrid>
      <Card label="Surfaced">
        The monthly level. Full allocation breakdown. Risk profile. Time
        horizon. Deployment cadence. Estimated fee. Portfolio impact. Four named
        sensitivities.
      </Card>
      <Card label="Displaced" labelClass="text-[var(--txt2)]">
        Authoring the allocation. Picking instruments. Constructing the risk
        profile. Building the implementation. The user inspects what the system
        would do, then decides at what level to back it.
      </Card>
    </CardGrid>
    <FindingParagraph
      title="3. The Standing"
      tagline="Commit. Stand your ground. And watch how it plays out."
      desc='The committed position becomes a tracked state. The screen shows the theme statement with tenure ("Backed for 4 months"), last review, total deployed, and current monthly exposure. Performance since initiation is plotted alongside best environment, largest drawdown, and realized volatility.'
    />
    <div>
      <div className="aspect-[5/3]  bg-[var(--bg2)] border border-dashed border-[var(--bg3)] rounded-lg flex items-center justify-center text-[var(--txt3)] font-mono text-[12px] uppercase tracking-[0.16em]">
        screen
      </div>{" "}
      <FigCaption>
        Controls are Adjust exposure, Pause deposits, and Modify standing.
        Recent activity is logged as Standing reviewed, Quarterly rebalance, and
        First deployment. The standing is a held view, with monitoring
        underneath.
      </FigCaption>
    </div>
    <CardGrid>
      <Card label="Surfaced">
        The held position. Tenure. Deployed amount. Activity log. Routes into
        the management surface.
      </Card>
      <Card label="Displaced" labelClass="text-[var(--txt2)]">
        Cancellation framing. Billing controls. The mechanical unwind itself,
        which the system handles after retraction is confirmed.
      </Card>
    </CardGrid>
  </>
);

const ShiftStat = ({ from, to, big = false }) => (
  <span
    className={`flex items-center tabular-nums leading-none ${
      big ? "gap-5 text-[5em]" : "gap-2.5 text-[2em]"
    }`}
  >
    <span className="text-[var(--txt2)]">{from}</span>
    <i
      className={`fa-sharp fa-regular fa-arrow-right text-[var(--point)] ${
        big ? "text-[0.5em]" : "text-[0.55em]"
      }`}
    />
    <span className="text-[var(--point)]">{to}</span>
  </span>
);

const TheShiftCard = () => (
  <div className="border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] p-6 sm:p-8 flex flex-col gap-6 mt-4">
    <div className="font-mono text-[var(--point)] text-[0.8em] uppercase tracking-[0.16em]">
      The shift
    </div>

    <ShiftStat from="41%" to="80%" big />

    <p className="text-[var(--txt)] m-0 max-w-[520px] leading-snug text-xl">
      Share of participants who initiated the high-consequence action at least
      once. Test 2 (user-selected targets) to Test 3 (system-assigned targets).
    </p>

    <div className="border-t border-dashed border-[var(--bg3)]" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-3">
        <div className="font-mono text-[var(--txt2)] text-[0.8em] uppercase tracking-[0.16em]">
          High-impact engagement
        </div>
        <ShiftStat from="57%" to="68%" />
        <p className="text-[var(--txt2)] text-[0.9em] m-0 leading-snug">
          Share of participants who committed a high-impact action at least once
          across the full window.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-mono text-[var(--txt2)] text-[0.8em] uppercase tracking-[0.16em]">
          Participation inequality (Gini)
        </div>
        <ShiftStat from="0.61" to="0.49" />
        <p className="text-[var(--txt2)] text-[0.9em] m-0 leading-snug">
          Concentration of the high-impact action across actors. Lower is more
          evenly distributed.
        </p>
      </div>
    </div>

    <div className="border-t border-[var(--bg3)]" />
    <a href="">
      <MonoLabel margin={false}>Method and limits → Appendix A</MonoLabel>
    </a>
  </div>
);

const ProblemStatement = () => (
  <>
    <img
      src={flag1}
      alt="Attentive non-initiation in group settings"
      className="max-w-full h-auto mb-[2em]"
    />
  </>
);

const WhereThisStarted = () => (
  <>
    <DescriptionHeader>The research</DescriptionHeader>
    <p>
      Some people pay attention to markets without acting on it. They read
      sector news. They watchlist instruments. They follow themes over months.
      They hold views about where things are going. They do not commit capital
      to those views.
    </p>
    <p>
      My previous research on attentive but non-initiating users surfaced one
      structural cause. When the system assigned the target at the moment of
      initiation, participation rose materially. The same users who did not act
      when asked to author a target acted when the system did the authoring. The
      agency burden at initiation was the gate. Lowering it brought
      non-participants in.
    </p>

    <TheShiftCard />
    <p>
      The hypothesis this design tests is whether the same lever moves the same
      population in a higher-stakes domain. If lowering the agency burden brings
      attention-holding users into action when stakes are low, it may bring them
      into commitment when stakes are real.
    </p>
  </>
);

const Investment = () => (
  <>
    <FindingParagraph
      title="Precedent"
      first
      tagline="A compressed trade flow lets attentive users act. It does not produce commitment."
      desc={
        <p>
          Robinhood and similar consumer brokerages run single-screen amount
          entry and one-tap binding. Research on Robinhood users{" "}
          <Reference
            index={1}
            label="Barber et al., Attention Induced Trading and Returns: Evidence from Robinhood Users (October 12, 2021)."
            href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3715077"
          />{" "}
          finds turnover rates many times higher than at other brokerages, and
          the top stocks purchased each day earn -4.7% abnormal returns over the
          following 20 days. The flow is shaped for trading. The behavior
          matches the shape.
        </p>
      }
    />
    <p>
      What compression did not change is what the act produces. The user leaves
      with a holding and the vocabulary stays transactional. The screens anchor
      on price chart and ticker symbol. For users who want to trade, this is
      exactly right.
    </p>
    <p>
      However for users who just have a thematic view to back with low fluency
      to trading, the flow concludes with a security they own. Compression
      addressed the agency burden, but it did not address what the user feels
      they have done.
    </p>
  </>
);
const InvestmentDesc = () => (
  <>
    The agency-burden lever has already been pulled in retail finance. Consumer
    brokerages compressed the commit moment years ago. But those systems still
    do not close the transition from persistent attention to durable commitment.
  </>
);
const Opportunities = () => (
  <>
    <HMWFraming
      passage={[
        [
          {
            text: "Many people maintain recurring beliefs about where the world is moving without developing those beliefs into formal investment theses.  They follow themes like AI infrastructure, energy transition, or emerging-market growth because the direction feels convincing long before they could justify it through financial analysis.",
          },
        ],
        [
          {
            text: "Current investment flows expect that conviction to already exist in operational form. Full-service platforms assume the user can translate a directional belief into holdings, allocation, and risk tolerance. Compressed brokerages simplify execution but ",
          },
          {
            text: " Full-service platforms assume the user can translate a directional belief into holdings, allocation, and risk tolerance.",
            hmw: "How might we support users in translating directional beliefs into investable positions without requiring fluency in financial decision fields?",
          },
          {
            text: " Compressed brokerages simplify execution but ",
          },
          {
            text: " still conclude the interaction as a trade.",
            hmw: "How might we make the act read as backing a direction the user holds?",
          },
        ],
        [
          {
            text: "The result is a structural mismatch between the form of the conviction and the form of the action. The user arrives wanting to back a direction they believe in, and the flow repeatedly resolves that intent into a trade. Thematic commitment inherits the interaction model of trading systems even when the user's intent is ",
          },
          {
            text: "persistent alignment",
            hmw: "How might we shape thematic onboarding around persistent alignment with the user's view?",
          },
          {
            text: " rather than active financial management.",
          },
        ],
      ]}
      initialHMW="How might we lower the initiation burden of financial commitment without removing user agency?"
    />
  </>
);

export const ChartContainer = ({ children, className }) => (
  <div
    className={`border border-[var(--bg3)] rounded-lg bg-[var(--bg2)] px-3 py-4 ${className}`}
  >
    {children}
  </div>
);
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

const TheIntervention = () => <></>;
const InterventionDesc = () => (
  <>
    The intervention works on the two dimensions the problem named. The first
    dimension is the onboarding structure. The second is the framing and
    persistence of the conviction.
  </>
);
const baselineDesc = () => <></>;
const movesDesc = () => <></>;

const TheBaseline = () => (
  <>
    <FindingParagraph
      first
      title="Onboarding flow"
      tagline="The user authors two decisions. The view they back, and the level they back it at. Everything else is to be inspected than to be constructed."
      desc=" The intervention reorders the chain so the user's two binding decisions come first. The configuration appears at step three as the standing taking shape, visible at commit because suitability and disclosure require it, but framed as confirmation rather than as fields the user must author."
    />

    <FlowDiagram />
    <p>
      The amount-upfront placement borrows from compressed brokerage flows. The
      structural reason is that a thematic position commits the user to a view,
      so the level at which they back that view anchors the act.
    </p>
    <FindingParagraph
      title="What stays visible"
      tagline="Suitability, fee disclosure, material information, auditability, and reversibility needs to stay."
      desc="The intervention changes the sequencing and framing of the flow. It should not remove the financial or regulatory requirements around the commit moment."
    />
  </>
);

const Reframing = () => (
  <>
    <FindingParagraph
      first
      title="Holding Model"
      tagline="The surface to be read as persistent alignment with a view the user holds."
      desc="This redesign works on the holding layer. The intervention changes how the act is framed, but also how it persists over time. The goal is to make the position feel like ongoing backing of a view rather than a completed buy-and-sell event."
    />
    <ListVertical numbered>
      <BulletVertical numbered title="Anchors">
        The discovery screen starts from the theme and the user's own engagement
        history. The commit screen keeps the focus on the theme and the backing
        level. The ticker remains available, but it does not dominate the
        screen.
      </BulletVertical>
      <BulletVertical numbered title="Time">
        The standing carries a tenure by default through recurring backing
        system.
        <Pill>Backed for 47 days</Pill> prioritized over an execution timestamp
        makes the position read as something maintained over time rather than
        something executed once.
      </BulletVertical>

      <BulletVertical numbered title="Inflection points">
        <Pill>Adjust</Pill>, <Pill>Pause</Pill>, <Pill>Retract</Pill> exist
        inside the standing itself. The user can change the level of backing
        without resetting the position into a new transactional event each time.
        The thematic position persists while the financial exposure changes
        underneath it.
      </BulletVertical>

      <BulletVertical numbered title="Trading Surface">
        The interface does not foreground the mechanics of trading. There is no
        order book, execution screen, or visible share count. Those systems
        still exist underneath for compliance and execution, but the user does
        not interact with them as the primary object. The surface keeps
        attention on the standing rather than the trade itself.
      </BulletVertical>
    </ListVertical>
  </>
);

const PrototypeAndTesting = () => <></>;

const FlowA = <Pill>Flow A</Pill>;
const FlowB = <Pill color="var(--point)">Flow B</Pill>;

// Shaped for PainPointsInteractive: `title` = the short bet (shown in the
// tab), `problem` = the paragraph stating the bet, `solution` = the
// falsifier (both shown in the detail panel).
const FALSIFICATION_ROWS = [
  {
    title: "The number of authored decisions is the gate.",
    problem: (
      <>
        The standard flow asks users to author allocation, holdings, risk, fees,
        amount, and confirmation in sequence. The bet is that the number of
        required decisions is the binding friction. If {FlowB} compresses those
        decisions into one or two moments, more users should reach commit.
      </>
    ),
    solution: (
      <>
        Commitment rates in {FlowB} match {FlowA}. Chain length was not the
        binding friction.
      </>
    ),
  },
  {
    title: "The decide-then-see sequence reads as the standing forming.",
    problem: (
      <>
        {FlowB} sets the backing level first, then surfaces holdings, risk, and
        fees as consequences of that choice. The bet is that users read the
        standing as forming in front of them rather than as a trade hidden
        behind configuration.
      </>
    ),
    solution: (
      <>
        Participants back out at commit in {FlowB} more than in {FlowA}. The
        reorder reads as important information surfaced too late.
      </>
    ),
  },
  {
    title:
      "The surfaced panels read as confirmation rather than as decisions to author.",
    problem:
      "After the level is set, holdings, risk, and fees appear as a readout of what the backing implies. The bet is that users inspect them as confirmation rather than treating them as inputs that require revision.",
    solution:
      "Participants revise the level after seeing the panels or still feel the need to thoroughly review the surfaced information before committing. The surfaced information still functions as primary decision input.",
  },
  {
    title: "Reduced friction does not hollow out commitment.",
    problem:
      "Compressing the flow risks turning commitment into a reflex. The bet is that users still treat the act as deliberate backing of a position rather than defaulting through a simplified flow.",
    solution:
      "Participants commit in under three seconds and describe the act as defaulting through rather than backing a view.",
  },
];
const Falsification = () => (
  <PainPointsInteractive
    items={FALSIFICATION_ROWS}
    problemLabel="Bet"
    responseLabel="Falsifier"
  />
);

const PrototypeDesc = () => (
  <>
    <p>
      The work is a speculative prototype exploring how thematic ETF flows
      change when the authoring chain is compressed and the configuration
      appears as confirmation rather than as primary input.
    </p>
    <p>
      The section documents the interaction model, the behavioral assumptions
      behind it, and the ways those assumptions could fail.
    </p>
  </>
);

const betsDesc = () => (
  <>
    {" "}
    <p>
      The redesign depends on several behavioral bets about commitment,
      continuity, and thematic positioning. Each bet is paired with a test
      condition and a possible falsification so the prototype can be evaluated
      as a behavioral model rather than a visual preference.
    </p>
  </>
);

const TheTest = () => (
  <>
    <DescriptionHeader>Test design</DescriptionHeader>
  </>
);
// One card in the register-synthesis grid. Three stacked sections:
//   1. the register the flow landed in     (top, bordered)
//   2. supporting verbatims                 (middle, bordered, italic)
//   3. label + per-flow tally               (bottom row)
// `highlighted` paints the card border in the accent color.
const RegisterCard = ({
  flow,
  highlighted = false,
  register,
  evidence,
  convergence,
}) => (
  <Card
    label={flow}
    className={highlighted ? "border border-[var(--point)]" : ""}
  >
    <div className="flex-1 border-b -mx-[var(--card-px)] px-[var(--card-px)] pb-4 border-[var(--bg3)]">
      <MonoLabel margin={false} className="text-[var(--txt2)]">
        {register.label}
      </MonoLabel>
      <div className="text-xl mb-4">{register.title}</div>

      <div className="italic text-[var(--txt2)]">
        {evidence.quotes.map((q, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {`"${q}"`}
          </React.Fragment>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-between">
      <MonoLabel
        margin={false}
        className={`${highlighted && "text-[var(--point)]"}`}
      >
        {convergence.label}
      </MonoLabel>
      <MonoLabel margin={false} className="text-[var(--txt2)]">
        {convergence.meta}
      </MonoLabel>
    </div>
  </Card>
);

const synthesisRegisters = [
  {
    flow: "Traditional",
    highlighted: true,
    register: { label: "Register", title: "Institutional buying" },
    evidence: {
      count: "3 of 5 answers",
      quotes: [
        "Back then it was a pile of paper.",
        "Invested quarterly.",
        "Opted in for a fund and read through the documents.",
      ],
    },
    convergence: {
      label: "Convergent",
      meta: (
        <>
          5 <i className="fa-sharp fa-regular fa-arrow-right" /> 1
        </>
      ),
    },
  },
  {
    flow: "Compressed",
    highlighted: true,
    register: { label: "Register", title: "Trading for profit" },
    evidence: {
      count: "3 of 5 answers",
      quotes: [
        "Traded a stock(ETF). Bought.",
        "I tried to get the item that looked like I could get the most return.",
        "Robinhood trading.",
      ],
    },
    convergence: {
      label: "Convergent",
      meta: (
        <>
          4 <i className="fa-sharp fa-regular fa-arrow-right" /> 1
        </>
      ),
    },
  },
  {
    flow: "Reframed",
    register: {
      label: "Register",
      title: "Mixed: subscription, standing, recurring, buying",
    },
    evidence: {
      count: "3 of 5 answers",
      quotes: [
        "Recurring trade based on recommendation.",
        "Subscription to an ETF.",
        "Bought an ETF.",
      ],
    },
    convergence: {
      label: "Divergent",
      meta: (
        <>
          6 <i className="fa-sharp fa-regular fa-arrow-right" /> 4
        </>
      ),
    },
  },
];

// One card in the self-rated-confidence grid.
const ConfidenceCard = ({ flow, score, outOf = 30, avg, avgOutOf = 5 }) => (
  <Card label={flow}>
    <div className="flex items-baseline gap-1">
      <span className="text-5xl tabular-nums">{score}</span>
      <span className="text-[var(--txt2)]">/ {outOf}</span>
    </div>
    <div className="text-[var(--txt2)] font-mono text-[0.8em] uppercase ">
      Avg {avg}/{avgOutOf}
    </div>
  </Card>
);

const confidenceScores = [
  { flow: "Traditional", score: 22, avg: 3.7 },
  { flow: "Compressed", score: 23, avg: 3.8 },
  { flow: "Reframed", score: 23, avg: 3.8 },
];

const confidenceMeta = [
  ["Scale", "1 to 5 per participant, summed across 6"],
  ["Range", "6 to 30 possible"],
  ["Observed spread", "1 point"],
];

const Synthesis = () => (
  <>
    <FindingParagraph
      first
      title="Vocabulary"
      tagline="The conceptual frame of long-term, recurring, theme-based commitment landed. The specific vocabulary the design proposed did not consistently get adopted."
      desc="   For traditional and Robinhood flow the answers stayed inside one register,
    institutional buying or short-term trading. The Redesign produced register
    scatter. Five answers split across four candidate registers with no single
    one dominant."
    />
    <CardGrid cols={3}>
      {synthesisRegisters.map((r) => (
        <RegisterCard key={r.flow} {...r} />
      ))}
    </CardGrid>
    <FindingParagraph
      title="Self-rated confidence"
      tagline="Three flows tied in self-rated confidence score within noise."
    />
    <CardGrid cols={3}>
      {confidenceScores.map((c) => (
        <ConfidenceCard key={c.flow} {...c} />
      ))}
    </CardGrid>

    <ListVertical>
      <BulletVertical title="Traditional" numbered>
        Additional authoring depth did not increase confidence. Six author
        decisions did not score higher than the Redesign's two.
      </BulletVertical>
      <BulletVertical title="Compressed" numbered>
        Market data, price charts, and order summaries did not increase
        confidence. The richer trading surface scored identically to the
        stripped Redesign.
        <div className="flex items-start gap-3 p-4 bg-[var(--bg2)] border border-[var(--bg3)] rounded-lg mt-4">
          <i className="fa-sharp fa-regular fa-circle-exclamation text-[var(--point)] leading-none mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1.5">
            <MonoLabel margin={false} className="text-[var(--point)]">
              Nuanced finding
            </MonoLabel>
            <div className="text-[var(--txt2)]">
              Multiple participants pointed at the chart in Compressed flow and
              said it gave them confidence to make a trade. However this was
              confined to short-term trade-profit context.
            </div>
          </div>
        </div>
      </BulletVertical>
      <BulletVertical title="Reframed" numbered>
        Removing both and placing the amount upfront did not decrease
        confidence. The compression did not cost the procedural sureness the
        test asked about.
      </BulletVertical>
    </ListVertical>
    <p>
      {" "}
      Each surface produces confidence in the frame it presents. Contents that
      look like rigor to a trader are not relevant to a long-term theme backer,
      and vice versa. This is consistent with the matching reading developed in{" "}
      <span className="font-mono tracking-[0.18em] text-[0.8em] text-[var(--point)] uppercase">
        Loss instinct at –10%
      </span>{" "}
      and{" "}
      <span className="font-mono tracking-[0.18em] text-[0.8em] text-[var(--point)] uppercase">
        The matching mechanism articulated
      </span>{" "}
      . Confidence does not survive translation across frames any more than
      disposition does.
    </p>
    <FindingParagraph
      title="Loss instinct at –10%"
      tagline="Loss responses split based on participant intent set prior."
    />
    <FindingParagraph title="The matching mechanism articulated" />
  </>
);

export default {
  // Top-level sections, must match menu titles exactly
  Overview,
  overviewDesc,

  "The Proposition": Proposition,
  "The Flow": TheFlow,
  "Problem Statement": ProblemStatement,
  "Where this started": WhereThisStarted,

  "Investment is already easy. \nBut how does it feel?": Investment,
  InvestmentDesc,
  Opportunities,

  "The Intervention": TheIntervention,

  InterventionDesc,
  "Collapsing the authoring chain.": TheBaseline,
  "Reframing the surface.": Reframing,

  "Prototype & Testing": PrototypeAndTesting,
  PrototypeDesc,
  "Bets & Falsifiers": Falsification,
  betsDesc,
  "The test": TheTest,
  Synthesis: Synthesis,

  "What Comes Next?": WhatComesNext,
};
