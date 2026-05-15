import React, { useContext } from "react";
import { BulletVertical, ListVertical } from "../components/ListVertical";
import Reference from "../components/Reference.js";
import FindingParagraph from "../components/FindingParagraph.js";
import { Card, CardGrid } from "../components/Twenty/Cards";
import flag1 from "../images/flag1.png";
import flag2 from "../images/flag2.png";
import flag3 from "../images/flag3.png";
import GraphicCaption from "../components/GraphicCaption.js";
import DescriptionHeader from "../components/DescriptionHeader.js";
import FigCaption from "../components/FigCaption.js";
import FlowDiagram from "../components/Flag/FlowDiagram.js";
import MonoLabel from "../components/MonoLabel.js";
import HMWFraming from "../components/Twenty/HMW.js";
import { CodeInline } from "../components/Code.js";
import Pill from "../components/Pill.js";
import PainPointsInteractive from "../components/Bol/PainPoints.js";
import SimpleList from "../components/SimpleList.js";
import TestPrototypes from "../components/Flag/Test/TestPrototypes.jsx";
import { LayoutContext } from "../context/LayoutContext.js";
import StandingCard from "../components/Flag/StandingCard.jsx";
import ThemeCard from "../components/Flag/ThemeCard.jsx";
import PortfolioView from "../components/Flag/PortfolioView.js";
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
      This project reframes thematic investment from a transaction into a
      stance. Existing flows borrow their structure from instrument-purchase
      onboarding. The user picks an instrument, sees its price, reviews
      holdings, and buys. The act is finished on submit. The redesign treats the
      act as the user taking up a position on something they value. They name
      what they back, they set the level, they commit.
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
      big ? "gap-5 text-[4em]" : "gap-2.5 text-[2em]"
    }`}
  >
    <span className="text-[var(--txt2)]">{from}</span>
    <i
      className={`fa-sharp fa-regular fa-arrow-right text-[var(--point)] ${
        big ? "text-[0.45em]" : "text-[0.55em]"
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
      My previous research on attentive but non-initiating users surfaced one
      structural cause. When the system assigned the target at the moment of
      initiation, participation rose materially. The same users who did not act
      when asked to author a target acted when the system did the authoring. The
      agency burden at initiation was the gate. Lowering it brought
      non-participants in.
    </p>

    <TheShiftCard />
  </>
);

const Investment = () => (
  <>
    <FindingParagraph
      title="Precedent"
      first
      tagline="A compressed trade flow lets attentive users act. However, it does not produce commitment."
      desc={
        <p>
          Consumer brokerages already run single-screen amount entry and one-tap
          binding. Research on Robinhood users{" "}
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
      exactly right.However for users with non-profit grounding for the act,
      whether it is a worldview they want to back, a bet they want to stand by,
      or a bias they want to see play out, the flow needs a different approach.
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
            text: "Many people maintain recurring beliefs about where the world is moving without developing those into formal investment theses. They follow themes like AI infrastructure, energy transition, or emerging-market growth because the direction feels convincing long before they could justify it through financial analysis.",
          },
        ],
        [
          {
            text: "Current investment flows expect that conviction to already exist in operational form.",
          },
          {
            text: " Full-service platforms assume the user can translate a directional belief into holdings, allocation, and risk tolerance.",
            hmw: "How might we support users in translating what their value perception into investable positions without requiring fluency in financial decision fields?",
          },
          {
            text: " Compressed brokerages simplify execution but ",
          },
          {
            text: " still conclude the interaction as a trade or purchase.",
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

const TheIntervention = () => (
  <>
    {" "}
    <img
      src={flag3}
      alt="Inactivity Illustration"
      className="max-w-full h-auto"
    />{" "}
  </>
);
const InterventionDesc = () => (
  <>
    The intervention works on the three dimensions: object, display, and flow.
  </>
);
const baselineDesc = () => <></>;
const movesDesc = () => <></>;

const Objects = () => {
  const aiInfraStanding = {
    name: "AI infrastructure expansion",
    manager: "Public",
    tenure: "147 days",
    level: "$500/mo",
    value: "$6,755",
    sharePct: "14%",
    themes: [
      {
        name: "AI infrastructure",
        meta: "Contributes $6,755 of $14,958 total",
        contribPct: "14%",
        totalPct: "31%",
      },
      {
        name: "Semiconductors",
        meta: "Contributes $4,830 of $13,958 total",
        contribPct: "10%",
        totalPct: "29%",
      },
      {
        name: "U.S. mega-cap technology",
        meta: "Contributes $1,820 of $12,548 total",
        contribPct: "4%",
        totalPct: "26%",
      },
    ],
  };

  const aiInfraTheme = {
    name: "AI infrastructure",
    taxonomyVersion: "v3.2",
    value: "$14,958",
    sharePct: "31%",
    backed: { amount: "$6,755", pct: "14%" },
    incidental: { amount: "$8,203", pct: "17%" },
    backedFraction: 0.45,
    sources: [
      {
        name: "AI infrastructure standing",
        meta: "Managed by Public · 147 days · $500/mo",
        amount: "$6,755",
        kind: "backed",
      },
      {
        name: "Semiconductor leaders standing",
        meta: "Overlaps via NVDA, TSM, AMD · 89 days · $300/mo",
        amount: "$5,035",
        kind: "backed",
      },
      {
        name: "Direct holdings",
        meta: "NVDA direct shares contribute to this theme",
        amount: "$3,168",
        kind: "incidental",
      },
    ],
  };

  return (
    <>
      <FindingParagraph
        title="Standings"
        tagline="Standing: a persistent container of
            instruments(baskets)."
        desc="This departs from the standard brokerage
            stack, where the basket is a purchase-time routing instruction that
            disappears after execution and the portfolio collapses to a flat
            list of instruments. Here the basket persists. Sub-positions are
            tracked per basket. Retraction sells FIFO against the basket's own
            lots."
        first
      />

      <StandingCard {...aiInfraStanding} />
      <FindingParagraph
        title="Themes"
        tagline="Theme: a derived measurement across all holdings."
        desc="Exposure to a theme is the sum of every qualifying holding
            regardless of how it was acquired. A use who wants to back a theme
            is routed to baskets curated around it. Taxonomy is published; each theme card opens a rule that defines the theme, including which instruments qualify and at what weight. When the platform updates the taxonomy, the user sees what changed."
      />

      <ThemeCard
        {...aiInfraTheme}
        onWhatCounts={() => {
          /* open taxonomy rule */
        }}
      />
    </>
  );
};
const ObjDesc = () => (
  <>
    The portfolio contains two kinds of object: standings and themes. The design
    treats them separately to prevent conflation.
  </>
);
const Standing = () => {
  const portfolio = {
    total: "$48,250.00",
    alert: "NVDA is 22% of your portfolio across 3 standings.",
    standings: [
      {
        id: "ai-infra",
        name: "AI infrastructure expansion",
        manager: "Public",
        holdings: 8,
        tenure: "147 days",
        level: "$500/mo",
        sharePct: "14%",
        shareValue: "$6,755",
      },
      {
        id: "semi",
        name: "Semiconductor leaders",
        manager: "ARK",
        holdings: 6,
        tenure: "89 days",
        level: "$300/mo",
        sharePct: "11%",
        shareValue: "$5,308",
      },
      {
        id: "cyber",
        name: "Cybersecurity resilience",
        manager: "Public",
        holdings: 10,
        tenure: "62 days",
        level: "$250/mo",
        sharePct: "8%",
        shareValue: "$3,860",
      },
      {
        id: "em",
        name: "Emerging markets consumer growth",
        manager: "ARK",
        holdings: 12,
        tenure: "203 days",
        level: "$400/mo",
        sharePct: "9%",
        shareValue: "$4,343",
      },
      {
        id: "direct",
        name: "Direct holdings",
        direct: true,
        sharePct: "58%",
        shareValue: "$27,984",
      },
    ],
    instruments: [
      {
        ticker: "NVDA",
        name: "Nvidia Corporation",
        shares: "73.12",
        value: "$10,615",
        sharePct: "22%",
        flagged: true,
        sources: [
          {
            label: "AI Infra",
            kind: "basket",
            shares: "26.4 sh",
            value: "$3,832",
          },
          { label: "Semi", kind: "basket", shares: "31.8 sh", value: "$4,615" },
          {
            label: "Direct",
            kind: "direct",
            shares: "14.9 sh",
            value: "$2,168",
          },
        ],
      },
      {
        ticker: "AAPL",
        name: "Apple",
        shares: "42.00",
        value: "$8,148",
        sharePct: "17%",
        sources: [
          { label: "Direct", kind: "direct", shares: "42 sh", value: "$8,148" },
        ],
      },
      {
        ticker: "TSM",
        name: "Taiwan Semiconductor",
        shares: "12.40",
        value: "$2,298",
        sharePct: "5%",
        sources: [
          {
            label: "AI Infra",
            kind: "basket",
            shares: "5.1 sh",
            value: "$945",
          },
          { label: "Semi", kind: "basket", shares: "7.3 sh", value: "$1,353" },
        ],
      },
      {
        ticker: "CRWD",
        name: "CrowdStrike",
        shares: "5.40",
        value: "$1,718",
        sharePct: "4%",
        sources: [
          { label: "Cyber", kind: "basket", shares: "5.4 sh", value: "$1,718" },
        ],
      },
      {
        ticker: "MELI",
        name: "Mercado Libre",
        shares: "0.33",
        value: "$611",
        sharePct: "1%",
        sources: [
          {
            label: "EM Consumer",
            kind: "basket",
            shares: "0.33 sh",
            value: "$611",
          },
        ],
      },
    ],
    themes: [
      {
        id: "ai-infra",
        name: "AI infrastructure",
        sharePct: "31%",
        value: "$14,958",
        backed: { amount: "$6,755", pct: "14%" },
        incidental: { amount: "$8,203", pct: "17%" },
        backedFraction: 0.45,
      },
      {
        id: "semi",
        name: "Semiconductors",
        sharePct: "29%",
        value: "$13,958",
        backed: { amount: "$5,308", pct: "11%" },
        incidental: { amount: "$8,650", pct: "18%" },
        backedFraction: 0.38,
      },
      {
        id: "us-mega",
        name: "U.S. mega-cap technology",
        sharePct: "26%",
        value: "$12,548",
        backed: { amount: "$0", pct: "0%" },
        incidental: { amount: "$12,548", pct: "26%" },
        backedFraction: 0,
      },
      {
        id: "cyber",
        name: "Cybersecurity",
        sharePct: "9%",
        value: "$4,343",
        backed: { amount: "$3,860", pct: "8%" },
        incidental: { amount: "$483", pct: "1%" },
        backedFraction: 0.89,
      },
    ],
  };

  return (
    <>
      <PortfolioView {...portfolio} />
    </>
  );
};
const StandingDesc = () => (
  <>
    The portfolio offers three view modes. Standings answers what the user is
    backing and at what level. Instruments answers what the user owns at the
    custody layer. Themes answers what the user is exposed to, whether they
    intended it or not.{" "}
  </>
);

const TheBaseline = () => (
  <>
    <FindingParagraph
      first
      title="Onboarding flow"
      tagline="The user authors two decisions. The view they back, and the level they back it at. The flow compresses around those two and treats everything else as inspection rather than authoring."
      desc="The standard onboarding chain runs through six steps. Select, holdings, risk, fees, amount, confirm. Each step requires the user to author a decision before the next surface opens. The redesign collapses the chain so the binding decisions, theme and level, come first. The other elements appear at step three as the standing taking shape, framed as confirmation rather than as fields the user must construct."
    />

    <FlowDiagram />
    <p>
      Level appears before fees because a user expressing a view decides the
      view and the level of conviction first. Fees are a property of the
      instrument that carries the view, so the instrument review can follow
      without changing the disclosure surface. The fee disclosure remains
      visible at commit.
    </p>
    <FindingParagraph
      title="Hard constraint"
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
      An exploratory test was conducted to surface where the framing lands or
      slips in a financial context, and which assumptions need to be revised.
      Six participants moved through three prototype flows, each representing a
      different framing of the same act.
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

const TheTest = () => {
  const { layout } = useContext(LayoutContext);
  const prototypeOrientation = layout.mobiler ? "mobile" : "desktop";

  return (
    <>
      <FindingParagraph
        first
        title="Test Design"
        tagline="A comparative test with three onboarding flows."
        desc="Three prototype onboarding models were comparatively tested for thematic investment products."
      />
      {/* <>The first reproduced traditional allocation-driven flows modeled after institutional fund selection and robo-advisor platforms. The second reproduced compressed retail trading flows inspired by apps like Public.com
 and eToro
. The third introduced a redesigned thesis-first model that led with thematic positions rather than trading primitives, compressing the onboarding chain while reframing the position as an ongoing standing rather than a discrete trade.</> */}
      <TestPrototypes
        key={prototypeOrientation}
        orientation={prototypeOrientation}
      />

      <ListVertical>
        <BulletVertical numbered title="Participants">
          6 participants with retail investing experience.
        </BulletVertical>
        <BulletVertical numbered title="Duration">
          30 to 50 minutes per participant.
        </BulletVertical>
        <BulletVertical numbered title="Condition runs">
          <p>
            Each participant moves through flow wireframes in counterbalanced
            order, with a short distraction task in between to reduce carryover.
            Participants were asked to think-aloud through all flows.
          </p>{" "}
          <div className="flex items-start gap-3 p-4 bg-[var(--bg2)] border border-[var(--bg3)] rounded-lg mt-4">
            <SimpleList
              label="Post-flow interview"
              line={false}
              items={[
                "What did you just do?",
                "From one to five, how confident did you feel completing it?",
                "If this exact position dropped 10 percent next month, how would you respond?",
                "How long do you think you'd hold it?",
              ]}
            />
          </div>
        </BulletVertical>
        <BulletVertical numbered title="Closing">
          {" "}
          <div className="flex items-start gap-3 p-4 bg-[var(--bg2)] border border-[var(--bg3)] rounded-lg ">
            <SimpleList
              label="Closing interview"
              line={false}
              items={[
                "What was the most noticeable difference for you?",
                "Which flow felt most like trading?",
                "Which flow felt easiest to stay in over time?",
                "Was any of the themes feel personally relevant to you?",
              ]}
            />{" "}
          </div>
        </BulletVertical>
      </ListVertical>
    </>
  );
};
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
        "Opted in for a fund.",
        "Portfolio configuration.",
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
        "Traded multiple stocks. Bought.",
        "I tried to get the item that looked like I could get the most return.",
        "Looks like I bought stocks.",
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
        "Basket trading.",
        "Subscription to stocks and funds.",
        "Felt political.",
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
        Direction and substance
      </span>{" "}
      . Confidence does not survive translation across frames any more than
      disposition does.
    </p>
    <FindingParagraph
      title=" Direction and substance"
      tagline="Intent is set before the flow begins."
      desc="Intent operates at two layers. 1) Direction as the surfaces the user belongs in, such as long-term holding or short-term trading. 2) Substance as a view the user backs inside that surface. The framing dimension addresses the first, and the surfacing mechanism addresses the second."
    />
    <CardGrid>
      <Card>
        <div>
          <MonoLabel margin={false} className="text-[var(--point)]">
            Direction
          </MonoLabel>
          <div className="text-lg">User arrives with the intention.</div>
        </div>
        <SimpleList
          className="text-[var(--txt2)]"
          label="Observed in loss-instinct responses"
          line={false}
          items={[
            "Tolerates loss when invested with a reason",
            'Separates "short term money" from "investing"',
            "Treats drops as buying opportunities when conviction holds",
          ]}
        />
      </Card>
      <Card>
        <div>
          <MonoLabel margin={false} className="text-[var(--point)]">
            Substance
          </MonoLabel>
          <div className="text-lg">The flow should surface the intent.</div>
        </div>{" "}
        <SimpleList
          className="text-[var(--txt2)]"
          label="Articulated in comparative interview"
          line={false}
          items={[
            "Would commit fully to a theme she genuinely stood by",
            "The flow format would not matter if the theme matched",
            "Chooses what to invest first and regards the provider as secondary",
          ]}
        />
      </Card>
    </CardGrid>
    <p>
      Direction is fixed. The framing dimension's value is matching surface to
      existing Direction, not converting one kind of user into another. The
      Redesign is legible to long-term investors. The compressed frame is
      legible to traders. Each surface serves a frame and the frame meets an
      intent that already exists.
    </p>

    <p>
      Theme-specific intent is a separate question. The framing dimension
      addresses the directional intent and stops there. It tells a long-term
      investor she is in the right surface, but does not tell her which theme
      she would actually back. For the design's claim to hold, surfacing has to
      do the second job: propose themes that the users would actually stand by.
      Surfacing therefore deserves the same design attention as framing.
    </p>
    <FindingParagraph
      title="Into hi-fi"
      tagline={
        <>
          Framing carries through in Objects and Standing. <br />
          The substance question becomes a surfacing mechanism.
        </>
      }
      desc="The lo-fi did not answer which themes a user would actually back. The hi-fi answers that structurally. The mechanism reads the gap between what the user backs and what they are exposed to. When a theme shows large incidental exposure without a corresponding standing, it flags as a candidate. The next study tests whether the gap, surfaced, moves users to convert."
    />
  </>
);

const WCN1 = () => (
  <>
    <p>
      Finance is a regulated domain with non-negotiable guardrails. The redesign
      had to move structure without removing those. That constraint sharpened
      the work. The intervention became "find the friction that protects the
      user, and the friction that protects the institution from change, and move
      only the second" instead of "remove the friction." Holding the distinction
      was the hardest part.
    </p>
  </>
);
const WCN2 = () => (
  <>
    <p>
      The regulation encodes a model of the user. Someone optimizing for
      risk-adjusted return within a stated horizon, with quantifiable tolerance
      and a clear investment objective. That user exists. They are not the only
      user. Investment behavior is sometimes shaped by belief, identity, and
      worldview, not just by return-optimization. Most interfaces assume
      otherwise. The trading frame asks the user to optimize for profit, and the
      user who came to back a direction they believe in is left without a
      surface that matches the act.
    </p>
    <p>
      The redesign is one attempt at a different surface. It lets the user see
      the conviction structure of their portfolio of what they back, what they
      hold without backing, and where the two diverge. Some users see the gap
      and want to diversify. Others see it and want to commit further. While
      making the question visible, the interface does not prescribe either
      response.
    </p>
  </>
);

const ReflectionKey = () => (
  <>
    <p>
      The work documents a hypothesis with a structural answer. The lo-fi tested
      whether the framing holds, and the hi-fi specifies the data model, the
      surfaces, and the surfacing mechanism that follow from it. Neither tested
      whether real users, with real money, in a regulated environment, would
      back themes the way this design imagines. The next study is the one that
      closes the gap.
    </p>
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
  "Standings and Themes": Objects,
  "Surfacing the objects": Standing,
  ObjDesc,
  StandingDesc,
  Flow: TheBaseline,

  "Prototype & Testing": PrototypeAndTesting,
  PrototypeDesc,
  "Bets & Falsifiers": Falsification,
  betsDesc,
  "The test": TheTest,
  Synthesis: Synthesis,

  ReflectionKey,
  "On regulated design": WCN1,
  "Why I changed that": WCN2,
};
