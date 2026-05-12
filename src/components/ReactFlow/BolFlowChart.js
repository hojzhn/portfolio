import React, { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  BackgroundVariant,
  Background,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  FourHandleNode,
  FormulaNode,
  DefaultNode,
  ControlNode,
} from "./FourHandleNode";
import Toggle from "../Toggle";

const nodeTypes = {
  fourHandles: FourHandleNode,
  formula: FormulaNode,
  normal: DefaultNode,
  control: ControlNode,
};

const lineNodes = [
  {
    id: "start",
    position: { x: 0, y: 0 },
    data: { label: "Edit Line", handles: [{ type: "source", side: "bottom" }] },
    type: "normal",
  },

  {
    id: "weight",
    position: { x: -160, y: 100 },
    data: { label: "Edit as Weight (g)" },
    type: "normal",
  },

  {
    id: "weight2",
    position: { x: -170, y: 180 },
    data: { formula: String.raw`g_k^{{new}} = {userInput}` },
    type: "formula",
  },

  {
    id: "percentage",
    position: { x: 160, y: 100 },
    data: { label: "Edit as Percentage (%)" },
    type: "normal",
  },

  {
    id: "convert",
    type: "formula",
    position: { x: 150, y: 180 },
    data: {
      title: "Convert % difference to grams",
      formula: String.raw`g_k^{{new}} = \frac{p_k}{100} \times B`,
    },
  },
  {
    id: "base",
    position: { x: 175, y: 300 },
    data: { label: "Is it a Base Ingredient?" },
    type: "control",
  },
  {
    id: "total",
    position: { x: -200, y: 400 },
    data: { label: "Is Total Locked?" },
    type: "control",
  },

  // Non-base, total locked formulas

  {
    id: "remaining",
    type: "formula",
    position: { x: -75, y: 500 },
    data: {
      title: "Remaining budget",
      formula: String.raw`R = total - lockedTotal - g_k^{{new}}`,
    },
  },
  {
    id: "ratios",
    type: "formula",
    position: { x: -75, y: 610 },
    data: {
      title: "Redistribution for Unlocked Lines",
      formula: [
        String.raw`r_i = \frac{g_i}{{old Sum Of Other Unlocked Lines}}`,
        String.raw`g_i^{{new}} = r_i \times R`,
      ],
    },
  },

  {
    id: "remaining-base",
    type: "formula",
    position: { x: 200, y: 400 },
    data: {
      title: "Remaining base budget",
      formula: String.raw`R_B = B - g_k^{{new}} - lockedBaseTotal`,
    },
  },
  {
    id: "ratios-base",
    type: "formula",
    position: { x: 200, y: 550 },
    data: {
      title: "Redistribution within unlocked base lines",
      formula: [
        String.raw`r_i = \frac{g_i}{{old Sum Of Other Unlocked Base Lines}}`,
        String.raw`g_i^{{new}} = r_i \times R_B`,
      ],
    },
  },
  {
    id: "drift-base",
    type: "formula",
    position: { x: 200, y: 700 },
    data: {
      title: "Rounding adjustment",
      formula: String.raw`\text{Last unlocked base line absorbs drift}`,
    },
  },
  {
    id: "set",
    type: "normal",
    position: { x: -100, y: 840 },
    data: {
      label: "Apply",
      width: 500,
      handles: [
        { type: "target", side: "top", id: "in1", offset: 20 },
        { type: "target", side: "top", id: "in2", offset: 50 },
        { type: "target", side: "top", id: "in3", offset: 80 },
      ],
    },
  },
];

const lineEdges = [
  { id: "e1", source: "start", target: "weight" },
  { id: "e2", source: "start", target: "percentage" },

  { id: "e3", source: "percentage", target: "convert" },
  { id: "e4", source: "convert", target: "base" },
  {
    id: "e5",
    source: "base",
    target: "total",
    label: "No",
    labelBgStyle: { fill: "var(--bg)" },
    labelStyle: { fill: "var(--txt)" },
  },
  { id: "e6", source: "weight", target: "weight2" },
  { id: "e7", source: "weight2", target: "total" },
  {
    id: "e8",
    source: "total",
    target: "remaining",
    label: "Yes",
    labelBgStyle: { fill: "var(--bg)" },
    labelStyle: { fill: "var(--txt)" },
  },
  { id: "e9", source: "remaining", target: "ratios" },
  {
    id: "e10",
    source: "base",
    target: "remaining-base",
    label: "Yes",
    labelBgStyle: { fill: "var(--bg)" },
    labelStyle: { fill: "var(--txt)" },
  },
  { id: "e11", source: "remaining-base", target: "ratios-base" },
  { id: "e12", source: "ratios-base", target: "drift-base" },
  {
    id: "e13",
    source: "total",
    target: "set",
    label: "No",
    labelBgStyle: { fill: "var(--bg)" },
    labelStyle: { fill: "var(--txt)" },
  },
  {
    id: "e14",
    source: "ratios",
    target: "set",
    targetHandle: "in2",
  },
  {
    id: "e15",
    source: "drift-base",
    target: "set",
    targetHandle: "in3",
  },
];

const initialNodes = [
  {
    id: "scope",
    type: "formula",
    position: { x: 0, y: 0 },
    data: {
      title: (
        <>
          Select scope :<br />
          Block or Global
        </>
      ),
      formula: String.raw`N = {userInput}`,
      handles: [{ type: "source", side: "bottom" }],
    },
  },
  {
    id: "partition",
    type: "formula",
    position: { x: 0, y: 120 },
    data: {
      title: "Partition lines",
      formula: [
        String.raw`L = \{ g_i \mid g_i { locked} \}`,
        String.raw`U = \{ g_i \mid g_i { unlocked} \}`,
      ],
    },
  },
  {
    id: "apply-new-total",
    type: "formula",
    position: { x: 0, y: 260 },
    data: {
      title: "Apply new total",
      formula: String.raw`R = N - {lockedTotal}`,
    },
  },
  {
    id: "ratios",
    type: "formula",
    position: { x: 150, y: 500 },
    data: {
      title: "Inside redistribution",
      formula: [
        String.raw`r_i = \frac{g_i}{{unlockedTotal}}`,
        String.raw`g_i^{new} = r_i \times R`,
      ],
    },
  },

  {
    id: "remainder",
    type: "formula",
    position: { x: 150, y: 760 },
    data: {
      title: "Drift adjustment (inside)",
      formula: String.raw`\text{Last unlocked line absorbs remainder}`,
      handles: [{ type: "target", side: "top" }],
    },
  },

  {
    id: "total-locked",
    position: { x: -100, y: 380 },
    data: { label: "Is Total Locked?" },
    type: "control",
  },
  {
    id: "outside-partition",
    type: "formula",
    position: { x: -220, y: 500 },
    data: {
      title: "Partition outside lines",
      formula: [
        String.raw`L_{out} = \{ g_j \mid j \notin S,\ g_j { locked} \}`,
        String.raw`U_{out} = \{ g_j \mid j \notin S,\ g_j { unlocked} \}`,
      ],
    },
  },
  {
    id: "outside-remaining",
    type: "formula",
    position: { x: -220, y: 640 },
    data: {
      title: "Remaining outside budget",
      formula: String.raw`R_{out} = T - N - {lockedTotal}_{out}`,
    },
  },
  {
    id: "outside-ratios",
    type: "formula",
    position: { x: -220, y: 770 },
    data: {
      title: "Outside redistribution",
      formula: [
        String.raw`r_j = \frac{g_j}{\sum_{m \in U_{out}} g_m}`,
        String.raw`g_j^{new} = r_j \times R_{out}`,
      ],
    },
  },

  {
    id: "outside-remainder",
    type: "formula",
    position: { x: -220, y: 910 },
    data: {
      title: "Drift adjustment (outside)",
      formula: String.raw`\text{Last outside unlocked line absorbs remainder}`,
      handles: [{ type: "target", side: "top" }],
    },
  },
];
const initialEdges = [
  { id: "eg1", source: "scope", target: "partition" },
  { id: "eg2", source: "partition", target: "apply-new-total" },
  { id: "eg3", source: "apply-new-total", target: "ratios" },
  { id: "eg4", source: "ratios", target: "remainder" },

  // branching to total locked decision
  { id: "eg6", source: "apply-new-total", target: "total-locked" },
  {
    id: "eg7",
    source: "total-locked",
    target: "outside-partition",
    label: "Yes",
    labelBgStyle: { fill: "var(--bg)" },
    labelStyle: { fill: "var(--txt)" },
  },
  { id: "eg8", source: "outside-partition", target: "outside-remaining" },
  { id: "eg9", source: "outside-remaining", target: "outside-ratios" },
  { id: "eg10", source: "outside-ratios", target: "outside-remainder" },
  {
    id: "eg11",
    source: "total-locked",
    target: "ratios",
    label: "No",
    labelBgStyle: { fill: "var(--bg)" },
    labelStyle: { fill: "var(--txt)" },
  },
];

function FlowContent({ which, setWhich, nodes, edges }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 500 });
    }, 0);
  }, [which, fitView]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={true}
        zoomOnScroll={true}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--txt2)" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </>
  );
}

export default function LineEditFlow() {
  const [which, setWhich] = useState(0);
  const [nodes, setNodes] = useState(lineNodes);
  const [edges, setEdges] = useState(lineEdges);

  useEffect(() => {
    setNodes(which === 0 ? initialNodes : lineNodes);
    setEdges(which === 0 ? initialEdges : lineEdges);
  }, [which]);

  return (
    <>
      <div
        className="w-full h-[600px] mb-8"
        style={{ borderColor: "var(--txt)" }}
      >
        <ReactFlowProvider>
          <FlowContent
            which={which}
            setWhich={setWhich}
            nodes={nodes}
            edges={edges}
          />
        </ReactFlowProvider>
      </div>

      <Toggle
        className="w-[140px] ml-auto"
        value={which}
        onChange={setWhich}
        items={[
          { label: "Block or Total", value: 0 },
          { label: "Single Line", value: 1 },
        ]}
      />
    </>
  );
}
