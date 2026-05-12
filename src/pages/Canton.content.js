import React from "react";
import Quote from "../components/Quote";

const Summary = () => (
  <>
    <p>
      Canton is a prototype group chat system built to explore a simple
      question:
    </p>
    <Quote></Quote>
  </>
);

const DesignMotivation = () => <div>Design Motivation</div>;

const FromStreamToStructure = () => <div>From Stream to Structure</div>;

const MemoryAsInterface = () => <div>Memory as Interface</div>;

const IntendedUseCases = () => <div>Intended Use Cases</div>;

const TemporalAnchors = () => <div>Temporal Anchors (Chapters)</div>;

const SpatialBranches = () => <div>Spatial Branches (Tabs)</div>;

const RolesCharactersMacros = () => <div>Roles, Characters, and Macros</div>;

const ReadingModeHandouts = () => <div>Reading Mode & Handouts</div>;

const FirestoreArchitecture = () => <div>Firestore Architecture</div>;

const NavigabilityOverFlatness = () => <div>Navigability over Flatness</div>;

const TradeoffsAndReflections = () => <div>Tradeoffs and Reflections</div>;

const WhatComesNext = () => <div>What Comes Next?</div>;

export default {
  // Overview
  Summary,
  "Design Motivation": DesignMotivation,

  // Conceptual Framing
  "From Stream to Structure": FromStreamToStructure,
  "Memory as Interface": MemoryAsInterface,
  "Intended Use Cases": IntendedUseCases,

  // System Design
  "Temporal Anchors (Chapters)": TemporalAnchors,
  "Spatial Branches (Tabs)": SpatialBranches,
  "Roles, Characters, and Macros": RolesCharactersMacros,
  "Reading Mode & Handouts": ReadingModeHandouts,

  // Data Modeling
  "Firestore Architecture": FirestoreArchitecture,
  "Navigability over Flatness": NavigabilityOverFlatness,
  "Tradeoffs and Reflections": TradeoffsAndReflections,

  // What Comes Next
  "What Comes Next?": WhatComesNext,
};
