import React, { useCallback, useMemo } from "react";
import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import { CardNode } from "./CardNode";
import { ModalNode } from "./ModalNode";
import { DataNode } from "./DataNode";

const initialNodes = [
  {
    id: "recipe-view",
    type: "cardNode",
    position: { x: 0, y: -100 },
    data: {
      label: "Recipe View",
      subtitle: "Screen",
      lines: [
        "Displays active iteration",
        "Edits scoped to iteration",
        "Show Recipe Metadata",
      ],
      kind: "screen",
      accent: true,
    },
  },
  {
    id: "recipe-data",
    type: "dataNode",
    position: { x: 25, y: -200 },
    data: {
      label: "Recipe Data",
      subtitle: "Reusable source object",
      kind: "data",
    },
  },
  {
    id: "version-data",
    type: "dataNode",
    position: { x: 225, y: -200 },
    data: {
      label: "Version Data",
      subtitle: "Reusable source object",
      kind: "data",
    },
  },
  {
    id: "recipe-data-ingredients",
    type: "dataNode",
    position: { x: -175, y: 180 },
    data: {
      label: "Preparation",
      subtitle: "Ingredients in Recipe",
      kind: "data",
    },
  },

  {
    id: "recipe-data-directions",
    type: "dataNode",
    position: { x: 225, y: 180 },
    data: {
      label: "Direction",
      subtitle: "Directions in Recipe",
      kind: "data",
    },
  },

  {
    id: "version-control",
    type: "modalNode",
    position: { x: 0, y: 80 },
    data: {
      label: "Version Control",
      subtitle: "Version Control",
      lines: ["Commit", "Branch", "Revert", "Merge to"],
      kind: "modal",
      accent: true,
      collapsed: true,
    },
  },

  {
    id: "preparation-tab",
    type: "cardNode",
    position: { x: -200, y: 280 },
    data: {
      label: "Preparation Tab",
      subtitle: "State",
      lines: [
        "Ingredient Lines and Blocks",
        "Add and edit ingredient structure",
      ],
      kind: "screen",
      accent: true,
    },
  },
  {
    id: "direction-tab",
    type: "cardNode",
    position: { x: 200, y: 280 },
    data: {
      label: "Direction Tab",
      subtitle: "State",
      lines: [
        "Direction lines and blocks",
        "Add and edit instruction structure",
      ],
      kind: "screen",
      accent: true,
    },
  },

  {
    id: "add-ingredient",
    type: "modalNode",
    position: { x: -200, y: 480 },
    data: {
      collapsed: true,
      label: "Add Ingredient Line",
      subtitle: "Create",
      lines: ["Ingredient reference"],
      kind: "modal",
    },
  },
  {
    id: "edit-line",
    type: "modalNode",
    position: { x: -200, y: 580 },
    data: {
      label: "Edit Ingredient Line",
      subtitle: "Modify",
      lines: [
        "Ingredient reference",
        "Base ingredient",
        "Recipe note",
        "Weight / volume / unit",
      ],
      kind: "modal",
      collapsed: true,
    },
  },
  {
    id: "add-block",
    type: "modalNode",
    position: { x: -200, y: 680 },
    data: {
      label: "Add Block",
      subtitle: "Create",
      lines: ["Block name", "Description", "Non-base flag"],
      kind: "modal",
      collapsed: true,
    },
  },

  {
    id: "edit-block",
    type: "modalNode",
    position: { x: -200, y: 780 },
    data: {
      label: "Edit Block",
      subtitle: "Modify",
      lines: ["Block name", "Description", "Non-base flag", "Export to Pantry"],
      kind: "modal",
      collapsed: true,
    },
  },

  {
    id: "add-dir-line",
    type: "modalNode",
    position: { x: 200, y: 480 },
    data: {
      label: "Add Direction Line",
      subtitle: "Direction",
      lines: ["Direction text", "Optional ingredient reference"],
      kind: "modal",
      collapsed: true,
    },
  },
  {
    id: "edit-dir-line",
    type: "modalNode",
    position: { x: 200, y: 580 },
    data: {
      label: "Edit Direction Line",
      subtitle: "Direction",
      lines: ["Block name", "Description"],
      kind: "modal",
      collapsed: true,
    },
  },
  {
    id: "add-dir-block",
    type: "modalNode",
    position: { x: 200, y: 680 },
    data: {
      label: "Add Direction Block",
      subtitle: "Direction",
      lines: ["Direction text", "Optional ingredient reference"],
      kind: "modal",
      collapsed: true,
    },
  },
  {
    id: "edit-dir-block",
    type: "modalNode",
    position: { x: 200, y: 780 },
    data: {
      label: "Edit Direction Block",
      subtitle: "Direction",
      lines: ["Block name", "Description"],
      kind: "modal",
      collapsed: true,
    },
  },
  {
    id: "pantry",
    type: "dataNode",
    position: { x: -450, y: -200 },
    data: {
      label: "Pantry Data",
      subtitle: "Persistent ingredient store",

      kind: "data",
    },
  },

  {
    id: "ingredient",
    type: "dataNode",
    position: { x: -450, y: 180 },
    data: {
      label: "Ingredient Data",
      subtitle: "Stored Ingredient or Block Data",

      kind: "data",
    },
  },
];

const initialEdges = [
  {
    id: "recipe-to-preparation",
    source: "recipe-view",
    target: "preparation-tab",
    label: "Preparation",
    type: "smoothstep",
  },
  {
    id: "recipe-to-direction",
    source: "recipe-view",
    target: "direction-tab",
    label: "Direction",
    type: "smoothstep",
  },

  {
    id: "preparation-to-add-ingredient",
    source: "preparation-tab",
    target: "add-ingredient",
    label: "Add line",
    type: "smoothstep",
  },
  {
    id: "preparation-to-add-block",
    source: "preparation-tab",
    target: "add-block",
    label: "Add block",
    type: "smoothstep",
  },
  {
    id: "preparation-to-edit-line",
    source: "preparation-tab",
    target: "edit-line",
    label: "Edit line",
    type: "smoothstep",
  },
  {
    id: "preparation-to-edit-block",
    source: "preparation-tab",
    target: "edit-block",
    label: "Edit block",
    type: "smoothstep",
  },

  {
    id: "direction-to-dir-line",
    source: "direction-tab",
    target: "dir-line",
    label: "Add / edit line",
    type: "smoothstep",
  },
  {
    id: "direction-to-dir-block",
    source: "direction-tab",
    target: "dir-block",
    label: "Add / edit block",
    type: "smoothstep",
  },

  {
    id: "add-ingredient-to-pantry",
    source: "add-ingredient",
    target: "pantry",
    label: "Reference ingredient",
    type: "smoothstep",
    style: { strokeDasharray: "6 4" },
  },
  {
    id: "edit-line-to-pantry",
    source: "edit-line",
    target: "pantry",
    label: "Reference ingredient",
    type: "smoothstep",
    style: { strokeDasharray: "6 4" },
  },
  {
    id: "edit-block-to-pantry",
    source: "edit-block",
    target: "pantry",
    label: "Export block",
    type: "smoothstep",
    style: { strokeDasharray: "6 4" },
  },
];

export default function PageRecipeFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const toggleCollapse = useCallback(
    (id) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id !== id
            ? node
            : {
                ...node,
                data: {
                  ...node.data,
                  collapsed: !node.data.collapsed,
                },
              },
        ),
      );
    },
    [setNodes],
  );

  const nodesWithActions = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onToggleCollapse: toggleCollapse,
        },
      })),
    [nodes, toggleCollapse],
  );

  const nodeTypes = useMemo(
    () => ({
      cardNode: CardNode,
      modalNode: ModalNode,
      dataNode: DataNode,
    }),
    [],
  );

  return (
    <div style={{ width: "100%", height: "1100px" }}>
      <ReactFlow
        nodes={nodesWithActions}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        zoomOnScroll={true}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        fitView
      />
    </div>
  );
}
