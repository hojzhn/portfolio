import React from "react";
import Quote from "../components/Quote";
import ArticleParagraph from "../components/ArticleParagraph";
import DescriptionHeader from "../components/DescriptionHeader";
import { ChartContainer } from "./Flag.content";
import { Chart } from "chart.js";
import ResponsiveColumns from "../components/ResponsiveColumns";
import GraphicCaption from "../components/GraphicCaption";
import TwentyJourneyMap from "./TwentyJourneyMap";
import FindingParagraph from "../components/FindingParagraph";
import { JourneyMap } from "../components/Twenty/JourneyMap";
import PersonaIntro from "../components/Twenty/Persona";
import HMWFraming from "../components/Twenty/HMW";
import { Card, CardGrid } from "../components/Twenty/Cards";
import SimpleList from "../components/SimpleList";
import { CodeInline } from "../components/Code";
import NotificationModel from "../components/Twenty/NotificationModel";
import { IterationsShipped } from "../components/Twenty/IterationsShipped";
import TestingKanban from "../components/Twenty/TestingKanban";
import { BulletVertical, ListVertical } from "../components/ListVertical";
import AccentButton from "../components/AccentButton";
import { Button } from "./TwentyWireframe/Primitives";
import MonoLabel from "../components/MonoLabel";
import VideoEmbed from "../components/VideoEmbed";
import v1 from "../images/twenty/v1.mp4";
import v2 from "../images/twenty/v2.mp4";
import v3 from "../images/twenty/v3.mp4";
import v4 from "../images/twenty/v4.mp4";
import InlineLink from "../components/InlineLink";
const OverviewDesc = () => (
  <>
    <p>
      The current Tasks view does not answer that. It works as a flat list
      sorted by recency. It shows what exists, but stays silent on priority,
      dependency, urgency, and blockage.
    </p>
  </>
);
const ProblemDesc = () => (
  <>
    {" "}
    <p>
      I started with journey mapping to locate where task visibility breaks down
      in real work, then used that map to define what the inbox had to surface
      first.
    </p>
  </>
);
const BadDayDesc = () => (
  <>
    <p>
      I used a “bad day” narrative to map how operational work actually
      fragments across the CRM. The goal was to identify where context and
      dependency visibility breaks down.
    </p>
    <p>
      Ops is where operational work fragments hardest. One situation spans
      manufacturing, procurement, compliance, and client communication, each
      living under a different object type, and the inbox has to hold all of it
      together.
    </p>
  </>
);
const OppDesc = () => (
  <>
    <p>
      The journey map exposed what looked like two separate problems. Scattered
      work across apps, and buried work inside the CRM. They were the same
      failure.
    </p>
  </>
);
const ConstraintsDesc = () => (
  <>
    The brief emphasized Twenty’s modular, non-opinionated design philosophy.
    Before proposing new interaction patterns, I first had to consider how far
    the existing system conventions could be extended without introducing
    behavior that felt structurally foreign to Twenty.
  </>
);
const DNDesc = () => (
  <>A notification is a task with trigger, context, and action metadata.</>
);
const ItDesc = () => (
  <>Iterations tested the line between useful context and overload.</>
);
const DesignDesc = () => <>Four primitives to get one full picture.</>;
const FocusDesc = () => (
  <>
    Scope the inbox to one record. The system pulls in related work by graph
    distance.
  </>
);
const ActionPanelDesc = () => (
  <>
    Take a peek at related context without losing the draft. The action panel
    stays mounted while the main panel swaps.
  </>
);
const ResolveWithDesc = () => (
  <>
    One outbound action closes related notifications. The picker bundles
    connected work at send time.
  </>
);
const SafetyDesc = () => (
  <>
    The action lives where the task is. Defaults from the trigger, configurable
    per notification.
  </>
);

const TestingDesc = () => (
  <>Five users tested the prototype through a high-stakes deal scenario.</>
);
const WhatNextDesc = () => <>Where the system could expand after the sprint.</>;

const Overview = () => (
  <>
    <DescriptionHeader>Starting Point</DescriptionHeader>
    <p>
      <InlineLink href="https://twenty.com">Twenty</InlineLink>
      is an open-source CRM built from modular objects and shared views. Tasks,
      Companies, Notes, and other objects use the same view system. So the inbox
      could not become a one-off feature. Any pattern designed for it had to
      work across lists, Kanban boards, and record pages. The design had to stay
      inside Twenty’s object model, while making the Tasks view more active,
      contextual, and actionable.
    </p>
  </>
);

const ProblemStatement = () => <></>;

const BadDayAtVolt = () => (
  <>
    <GraphicCaption>The Persona</GraphicCaption>
    <PersonaIntro />

    <FindingParagraph
      title="Friction"
      tagline="Everything is load-bearing. Nothing can go missing."
      desc={
        <>
          <p>
            Marcus opens the laptop. Three connected fires sitting in three apps
            under three object types. The Director of Procurement at Gopuff asks
            for SOC2 and delivery date. The contract manufacturer slipped the
            BMS chip ship date. A weld defect surfaced on the enclosure
            prototype.
          </p>
          <p>
            Meanwhile, Maya, a procurement coordinator at Gopuff, sent a request
            for the insurance certificate that gates the contract on Monday. Her
            record was auto-created from email. It has no direct link to the
            deal.
          </p>
        </>
      }
    />

    <JourneyMap />
    <FindingParagraph
      tagline="The CRM stored all relevant information, but failed to surface how those pieces depended on each other."
      desc={
        <div>
          Marcus saves the deal. He almost missed Maya. The databased had all
          relevant information. It failed at surfacing the dependency between
          them. <b>That is the gap the design closes.</b>
        </div>
      }
    />
  </>
);
const Opportunities = () => (
  <>
    <HMWFraming />
  </>
);
const Ideation = () => <></>;
const IdeationDesc = () => (
  <p>
    How can the inbox become an active operational surface without breaking
    Twenty’s existing system logic? The challenge was working inside Twenty’s
    constraints while changing how work is surfaced and acted on.
  </p>
);
const Constraints = () => {
  return (
    <>
      <CardGrid>
        <Card label="Modularity">
          <SimpleList
            line={false}
            items={[
              "Anything I build has to ride on Twenty's modular data structure. Inbox is an alternative view of Tasks, not an entirely separate object.",
              "Patterns designed for the inbox should also work anywhere (Record detail, Kanban, In-line...)",
            ]}
          />
        </Card>
        <Card label="Panel rule">
          <SimpleList
            line={false}
            items={[
              <>
                <CodeInline text="Action" /> or temporal interaction lives on
                the right panel.
              </>,
              <>
                <CodeInline text="Information" /> stays on the center panel.
              </>,
            ]}
          />
          <p>
            While not formally documented as a system rule, Twenty consistently
            structures its interface this way across record pages and workflows.
          </p>
        </Card>
      </CardGrid>
    </>
  );
};
const DefiningNotification = () => {
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

  return (
    <>
      <FindingParagraph
        first={true}
        title='What is "Notification", data-wise?'
        tagline="Notification = Call for action + Task"
        desc="
Task is a noun. Notification is a verb. A Task describes a unit of work. A notification indicates that work requires intervention. The same underlying Task may exist without becoming a notification until the system can attach a meaningful action to it.
"
      />
      <CardGrid>
        <Card label="Task">A stateful record.</Card>
        <Card label="Notification">An action opportunity of that record.</Card>
      </CardGrid>

      <FindingParagraph
        title="How are they combined?"
        tagline="Actions come from the trigger, not the Task itself."
        desc="Twenty already generates Tasks through automations, including system events, workflows, reminders, and integrations. A notification layer would build on top of this existing mechanism. The same trigger that creates the Task would also attach the expected action."
      />

      <TriggerGrid
        items={[
          { trigger: "email_reply", action: "Reply? Forward?" },
          { trigger: "mention", action: "Check context, Mark done..." },
          { trigger: "date_trigger", action: "Reassign? Create Note?" },
          { trigger: "workflow_alert", action: "Create new Task?" },
        ]}
      />
      <p>
        In practice, users often resolve the same Task through different
        workflows or modes of communication. Because of this, it may be useful
        to keep the action layer loosely coupled from the underlying Task
        object, allowing the method of resolution to change without redefining
        the Task itself.
      </p>

      <FindingParagraph
        title="Therefore"
        tagline={
          <div className="gap-4 flex flex-col">
            <p>
              Since the notification is defined by the call for action, the UI
              should land the user directly on the execution surface.
            </p>
            <p>
              Task acts as contextual payload rather than the primary
              destination.
            </p>
          </div>
        }
      />
      <CardGrid>
        <Card label="Task">
          <div>
            <div className="text-[var(--txt3)]">A stateful record.</div>
            <div className="">Stores context, relations, and history.</div>
          </div>
        </Card>
        <Card label="Notification">
          <div>
            <div className="text-[var(--txt3)]">
              An action opportunity of that record.
            </div>
            <div className="">Routes the user toward an available action.</div>
          </div>
        </Card>
      </CardGrid>
    </>
  );
};
const Iterations = () => (
  <>
    <IterationsShipped />
  </>
);
const TheDesign = () => <></>;

const FocusAndDistance = () => (
  <>
    <GraphicCaption icon="fa-video">
      Video 1: Focus Demonstration
    </GraphicCaption>
    <VideoEmbed
      src={v1}
      label="Focus and distance"
      caption="Setting Focus on Gopuff Pilot. Inbox collapses to 6 tasks relevant to the Focused object."
    />
    <p>
      The user picks a record. The inbox collapses to tasks within graph
      distance ≤ 2 (demo setting) of that focused record. Distance is computed
      by traversing relations from each task's parent record toward the focus.
    </p>
    <p>
      Maya's COI request surfaces under "2 hops away." Her Person record reaches
      the Gopuff Opportunity through a shared contact. The distance computation
      finds the implicit relation and includes the task in the focused view.
    </p>
  </>
);
const ActionPanelAsRemoteControl = () => (
  <>
    <GraphicCaption icon="fa-video">
      Video 2: Action Panel Navigation
    </GraphicCaption>
    <VideoEmbed
      src={v2}
      label="Action panel as remote control"
      caption="Mid-draft, navigation happens in the center. Action panel stays mounted."
    />
    <p>
      The action panel pins three pieces of task metadata at the top: trigger,
      related entities, resolve target. The action sits below. Clicking a
      related-entity chip swaps the main panel to that record. The action panel
      stays mounted. The user looks sideways at related context, then returns to
      finish the action.
    </p>
    <p>
      The selected action persists for the session. Navigating away from a task
      (even when it unmounts the current Task object) does not discard its draft
      or reset the panel. The user can move freely between tasks and come back
      to pick up exactly where they left off.
    </p>
  </>
);
const ResolveWith = () => (
  <>
    <GraphicCaption icon="fa-video">Video 3: Bulk Resolution</GraphicCaption>
    <VideoEmbed
      src={v3}
      label="Resolve with"
      caption="One reply addresses four open tasks. Resolve-with picker selects other three before sending."
    />
    <p>
      One reply addresses chip ETA, weld remediation, and the SOC 2 timeline. At
      send time, the Resolve-with picker lets the user select all three open
      tasks. The notifications clear together, and the underlying tasks update.
      The user makes one outbound move and the inbox reflects three outcomes.
    </p>
  </>
);
const SafetyPatterns = () => (
  <>
    <GraphicCaption icon="fa-video">
      Video 4: Task Clearing Sequence
    </GraphicCaption>
    <VideoEmbed
      src={v4}
      label="Frictionless clearing"
      caption="Task clearing happens fast and frictionless, with a room for recovery."
    />
    <p>
      The user can swap the action per notification without changing the
      underlying task. The action lives in the panel itself, so the user can
      complete work directly inside the inbox. The panel stays populated until
      every selected task is cleared, keeping the clearing flow fast while still
      leaving room to recover.
    </p>
  </>
);

const PrototypeDesc = () => <></>;
const PrototypeTesting = () => <></>;

const RYGDesc = () => <></>;
const RYGSynthesis = () => (
  <>
    <FindingParagraph
      title="Findings"
      first={true}
      tagline="Results in Red / Yellow / Green."
    />
    <TestingKanban />

    <FindingParagraph
      title="Fixes"
      tagline={
        <>
          <p>All participants completed the task, each their own way.</p>
          <p>Here's two structural risks I've gathered.</p>
        </>
      }
      desc="Every participant discovered the buried message, gathered the required context, and sent Priya the final response. The core interaction model held. The two findings below are not failures of that model. They are second-order risks that surfaced precisely because the primary flow worked, and they set the direction for hi-fi refinement."
    />
    <ListVertical numbered>
      <BulletVertical>
        Keep and strengthen the Undo toast. The one-at-a-time action flow
        reduced friction, but it also lowered the safety margin. If a user marks
        the wrong Task done, recovery has to be immediate and visible. The Undo
        toast is therefore load-bearing, not optional.
      </BulletVertical>

      <BulletVertical>
        Add row-level trigger icons. Testers used Focus as a noise filter, not
        as a deal-context tool. That is a workaround for an unclear default row.
        Each row needs to show why it surfaced, so Focus stops carrying weight
        that belongs to the row itself.
      </BulletVertical>
    </ListVertical>
  </>
);
const MethodDesc = () => (
  <>
    Before moving into hi-fi refinement, I ran a small moderated usability test
    against a scripted high-stakes scenario to see whether the interaction model
    held up.
  </>
);

const TestMethod = () => (
  <>
    <div className="flex flex-col gap-4">
      <FindingParagraph title="Usability test" first={true} />

      <div className="w-full max-w-[480px] mx-auto bg-[var(--bg)] border border-[var(--bg3)] rounded-lg shadow-2xl p-6 flex flex-col gap-4 text-[var(--txt)] mb-4">
        <div className="flex items-center gap-2 text-xs uppercase text-[var(--txt3)]">
          <i className="fa-solid fa-bullseye" />
          <span>Scenario · Gopuff Pilot</span>
        </div>

        <h2 className="m-0 text-[20px] font-semibold">Land the Gopuff deal</h2>

        <div className="flex flex-col gap-3 text-[var(--txt2)]">
          <p className="m-0">
            You're <strong className="text-[var(--txt)]">Marcus</strong>, head
            of Ops at <strong className="text-[var(--txt)]">Volt</strong>. The
            Gopuff Pilot is your largest deal in flight. Their procurement lead
            just asked for a SOC2 timeline and revised delivery date before
            tomorrow's exec review.
          </p>
          <p className="m-0">
            Use this notification box to close the loop. Everything you need to
            land the deal is already in here.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            href="https://sinkorsw.im/twenty-wireframe"
            target="_blank"
          >
            View the Test Page
          </Button>
        </div>
      </div>

      <p>
        Five participants completed Marcus’s scripted “bad day” scenario using
        the low-fi prototype. The prototype was built in React as a simulated
        CRM workspace populated with mock relational Task data modeled after
        Twenty’s object structure.
      </p>

      <ListVertical numbered>
        <BulletVertical title="Participants">5 users</BulletVertical>
        <BulletVertical title="Format">
          Moderated 1:1 · interactive React prototype
        </BulletVertical>
        <BulletVertical title="Measures">
          Behavior, hesitation points, navigation patterns, verbal reactions,
          failure cases
        </BulletVertical>
      </ListVertical>
    </div>
  </>
);

const WhatComesNext = () => <></>;

const Tradeoffs = () => (
  <>
    <ResponsiveColumns>
      <p>
        Focus is a depth tool. It elevates records connected to a known concern
        and suppresses unrelated noise. That tradeoff works when the user
        already knows what they are looking for. It breaks down when discovery
        itself is the task.
      </p>
      <p>
        Marcus missed Maya in the original journey partly because the inbox was
        noisy, and partly because he was not actively browsing for her. Focus
        addresses the first condition. It cannot address the second. Discovery
        still depends on the user's willingness to scan and notice.
      </p>
      <p>
        That distinction matters because the default inbox view remains the
        system's primary surface for unexpected discovery. Focus cannot become
        the only mode in which the inbox feels legible. The Y1 finding, that
        default rows failed to communicate what was inside, exposed exactly this
        weakness.{" "}
      </p>
      <p>
        Strengthening the default row is therefore structural work, not visual
        polish. The default surface has to support recognition well enough that
        users can notice emerging relevance before they enter a focused state.
      </p>
    </ResponsiveColumns>
  </>
);
const OpenQuestions = () => (
  <>
    <ResponsiveColumns>
      <p>
        Resolve-with never surfaced organically in testing. Participants
        processed one task at a time and relied on auto-advance to move through
        the inbox. The result supports two competing readings, and the current
        test cannot distinguish between them.
      </p>
      <p>
        The first reading is an affordance problem. The feature may not register
        clearly enough to enter the user's decision space at all.
      </p>
      <p>
        The second reading is structural. One-at-a-time processing with
        auto-advance may already be efficient enough that bulk resolution adds
        little value inside single-action workflows. In that case, Resolve-with
        belongs to a different operational mode entirely: inbox clearing.
      </p>
      <p>
        The current test placed participants into an action-completion flow. The
        next round of testing needs to reproduce the clearing condition
        directly. The question is whether Resolve-with's value emerges in
        clustered end-of-day triage.
      </p>
    </ResponsiveColumns>
  </>
);
const Closing = () => (
  <>
    <ResponsiveColumns>
      <p>
        The pattern this design proposes, a typed-trigger metadata layer on the
        existing Task object, scales beyond the inbox. Read/unread state, focus
        by graph distance, and trigger-defaulted actions are not properties tied
        to an inbox. They are properties of any view over the Task database. The
        inbox is the first surface that needs them. It does not have to be the
        last.
      </p>
      <p>
        The interaction model held against realistic content. Whether it holds
        against realistic conditions, with interruptions, time pressure, and
        competing demands, is what the next round has to answer.
      </p>
      <p>
        The final prototype shipped as a fully functional hi-fi implementation.
      </p>
    </ResponsiveColumns>
  </>
);
export default {
  // Section content
  Overview,
  "Problem Statement": ProblemStatement,
  "A Bad Day at Volt": BadDayAtVolt,
  Opportunities,
  Ideation,
  Constraints,
  "Defining Notification": DefiningNotification,
  Iterations,
  "The Design": TheDesign,
  "Focus and Distance": FocusAndDistance,
  "Action Panel as Remote Control": ActionPanelAsRemoteControl,
  "Resolve with": ResolveWith,
  "Frictionless Task Resolution": SafetyPatterns,
  Synthesis: RYGSynthesis,
  "Test Method": TestMethod,
  "What Comes Next?": WhatComesNext,
  Tradeoffs,
  "Open Questions": OpenQuestions,
  "Action built without building a new object.": Closing,

  // Desc components
  overviewDesc: OverviewDesc,
  ProblemDesc: ProblemDesc,
  BadDaydesc: BadDayDesc,
  Oppdesc: OppDesc,
  IdeationDesc: IdeationDesc,
  constraintsdesc: ConstraintsDesc,
  dndesc: DNDesc,
  itdesc: ItDesc,
  designDesc: DesignDesc,
  RYGDesc,
  MethodDesc,
  focusDistanceDesc: FocusDesc,
  actionPanelDesc: ActionPanelDesc,
  resolveWithDesc: ResolveWithDesc,
  safetyPatternsDesc: SafetyDesc,
  prototypeTestingDesc: TestingDesc,
  whatNextDesc: WhatNextDesc,
};
