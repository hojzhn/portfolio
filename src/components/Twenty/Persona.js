import React from "react";
import MonoLabel from "../MonoLabel";
import { ChartContainer } from "../../pages/Flag.content";
import DescriptionHeader from "../DescriptionHeader";
import FindingParagraph from "../FindingParagraph";
import ResponsiveColumns from "../ResponsiveColumns";
import SimpleList from "../SimpleList";
import personaImage from "../../images/twenty/persona.png";

const defaultScenario = [
  "Volt makes battery packs for delivery riders. Riders swap packs at curbside stations in 6 seconds, with no charging downtime. Has contract manufacturer in Shenzhen, and in-house assembly team in Oakland.",
  "The Gopuff pilot is Volt's first paid deployment. 200 packs for the Oakland delivery fleet, $480K total. A signed pilot also unlocks $1.8M in seed funding from Lerer Hippeau, contingent on the deal closing.",
];

const defaultProfile = {
  name: "Marcus",
  title: "Head of Operations",
  company: "Volt",
  fields: [
    { label: "Location", value: "Oakland, CA" },
    { label: "Team size", value: "14 people" },
    { label: "Stage", value: "Pre-revenue" },
    { label: "Daily tools", value: "Twenty, Slack, Gmail, Carta, Notes" },
  ],
};

const defaultWorkflow = [
  "Account owner coordinating a high-value enterprise pilot across multiple stakeholders",
  "Responsible for keeping manufacturing, logistics, and client communication aligned under tight timing constraints",
  "Managing operational dependencies across teams, vendors, and external partners",
  "Trying to close the deal without missing follow-ups, losing context, or delaying execution",
];

const defaultFriction = [
  "High coordination overhead slows response time during active deal cycles",
  "Low system trust causes duplicate checking across tools",
  "Limited visibility into operational risk increases the chance of revenue loss",
  "Recovery from dropped tasks is reactive and costly, especially in high-value account workflows",
];

const defaultStakes =
  "Every commitment is load-bearing. A missed request from a Gopuff coordinator can delay the contract enough to break the funding round.";

const defaultPlaceholder =
  "Editorial still life. Suggested composition: a Volt battery pack on a worktable next to a Gopuff delivery bag and a printed factory schematic. Shot top-down with directional light. Documentary tone. Introduces the three sides of Marcus's job in one frame.";

export default function PersonaIntro({
  scenario = defaultScenario,
  profile = defaultProfile,
  workflow = defaultWorkflow,
  friction = defaultFriction,
  stakes = defaultStakes,
  workflowLabel = "What he has",
  frictionLabel = "Pain points",
  image = { src: personaImage, alt: "Marcus, Head of Operations at Volt" },
  imageHeight = 520,
  imagePlaceholder = defaultPlaceholder,
}) {
  return (
    <>
      <ChartContainer>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[2em] items-end">
          <PersonaImage
            image={image}
            height={imageHeight}
            placeholder={imagePlaceholder}
          />

          <div className="p-4">
            <ProfileCard {...profile} />
            <FindingParagraph
              title="What's Going On"
              desc={
                <>
                  {" "}
                  {scenario.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </>
              }
            />
          </div>
        </div>
      </ChartContainer>{" "}
      <ResponsiveColumns>
        <SimpleList label={workflowLabel} items={workflow} />
        <SimpleList label={frictionLabel} items={friction} />
      </ResponsiveColumns>{" "}
    </>
  );
}

// ============================================================
// Internal pieces
// ============================================================

function PersonaImage({ image, height, placeholder }) {
  if (image && image.src) {
    return (
      <div
        className="w-full overflow-hidden rounded flex justify-center"
        style={{ height }}
      >
        <img
          src={image.src}
          alt={image.alt || ""}
          className="h-full w-auto max-w-none block flex-none"
        />
      </div>
    );
  }
  return (
    <div
      className="w-full bg-[var(--bg2)] border border-dashed border-[var(--bg3)] flex flex-col items-center justify-center gap-2 rounded p-6"
      style={{ height }}
    >
      <span className="font-mono text-[12px] text-[var(--point)] tracking-[0.06em] uppercase">
        Persona_hero
      </span>
      <span className="text-[13px] text-[var(--txt2)] max-w-[480px] text-center leading-[1.5]">
        {placeholder}
      </span>
    </div>
  );
}

function ProfileCard({ name, title, company, fields }) {
  return (
    <div className="mb-5 pb-5 ">
      <div className="text-[22px] font-medium text-[var(--txt)] leading-tight tracking-[-0.01em] mb-1">
        {name}
      </div>
      <div className="text-[var(--txt2)] mb-4 text-[0.8em]">
        {title} at {company}
      </div>
      {fields && fields.length > 0 && (
        <dl className="grid grid-cols-[92px_1fr] gap-y-2 gap-x-4 m-0">
          {fields.map((f, i) => (
            <React.Fragment key={i}>
              <MonoLabel margin={false}>{f.label}</MonoLabel>
              <dd className="m-0 text-[var(--txt2)] text-[0.8em]">{f.value}</dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </div>
  );
}

