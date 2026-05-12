import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Panel,
  BackgroundVariant,
  Background,
  Controls,
} from "@xyflow/react";
import { CardNode } from "./CardNode";
import { ModalNode } from "./ModalNode";
import { DataNode } from "./DataNode";

import {
  CompositionEdge,
  ReferenceEdge,
  WriteEdge,
  LookupEdge,
  GuideEdge,
} from "./Edges";
import { source } from "motion/react-client";

const initialNodes = [
  {
    id: "recipe-list",
    type: "dataNode",
    position: { x: 25, y: -300 },
    data: {
      label: "Recipe List",
      subtitle: "Reusable source object",
      kind: "data",
      handles: {
        sourceBottom: {},
      },
    },
  },
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
      handles: {
        targetTop: {},
        sourceLeft: {},
        sourceRight: {},
        sourceBottom: {},
      },
    },
  },
  {
    id: "version-data",
    type: "dataNode",
    position: { x: 225, y: -250 },
    data: {
      label: "Version Data",
      subtitle: "Reusable source object",
      kind: "data",
      handles: { sourceBottom: {} },
    },
  },
  {
    id: "recipe-data-ingredients",
    type: "dataNode",
    position: { x: -225, y: 180 },
    data: {
      label: "Preparation",
      subtitle: "Ingredients in Recipe",
      kind: "data",
      handles: {
        targetTop: {},
        sourceLeft: {},
        sourceRight: {},
        sourceBottom: {},
      },
    },
  },

  {
    id: "prep-block",
    type: "dataNode",
    position: { x: -100, y: 480 },
    data: {
      label: "Blocks",
      subtitle: "Directions in Recipe",
      kind: "data",
      handles: { targetTop: {}, sourceLeft: {}, sourceBottom: {} },
    },
  },

  {
    id: "prep-line",
    type: "dataNode",
    position: { x: -350, y: 480 },
    data: {
      label: "Lines",
      subtitle: "Directions in Recipe",
      kind: "data",
      handles: {
        targetTop: {},
        sourceLeft: {},
        sourceBottom: {},
        targetRight1: {},
        targetRight2: {},
        targetRight3: {},
        targetRight4: {},
      },
    },
  },

  {
    id: "recipe-data-directions",
    type: "dataNode",
    position: { x: 275, y: 180 },
    data: {
      label: "Direction",
      subtitle: "Directions in Recipe",
      kind: "data",
      handles: {
        targetTop: {},
        sourceLeft: {},
        sourceRight: {},
        sourceBottom: {},
      },
    },
  },
  {
    id: "dir-block",
    type: "dataNode",
    position: { x: 400, y: 480 },
    data: {
      label: "Phases",
      subtitle: "Directions in Recipe",
      kind: "data",
      handles: { targetTop: {}, sourceLeft: {}, sourceBottom: {} },
    },
  },
  {
    id: "dir-line",
    type: "dataNode",
    position: { x: 150, y: 480 },
    data: {
      label: "Direction Lines",
      subtitle: "Directions in Recipe",
      kind: "data",
      handles: {
        targetTop: {},
        sourceBottom: {},
        targetRight2: {},
        targetRight3: {},
      },
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
      handles: { targetTop: {} },
    },
  },
  {
    id: "metadata",
    type: "modalNode",
    position: { x: 0, y: 160 },
    data: {
      label: "Metadata",
      subtitle: "Edit Metadata",
      lines: ["Title", "Description", "Duration", "Servings", "etc"],
      kind: "modal",
      accent: true,
      collapsed: true,
      handles: { targetTop: {} },
    },
  },

  {
    id: "preparation-tab",
    type: "cardNode",
    position: { x: -250, y: 280 },
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
    position: { x: 250, y: 280 },
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
    position: { x: -375, y: 580 },
    data: {
      collapsed: true,
      label: "Add",
      subtitle: "Add Line",
      lines: ["Ingredient reference"],
      kind: "modal",
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
  {
    id: "edit-line",
    type: "modalNode",
    position: { x: -375, y: 680 },
    data: {
      label: "Edit",
      subtitle: "Edit Line",
      lines: [
        "Ingredient reference",
        "Base ingredient",
        "Recipe note",
        "Weight / volume / unit",
      ],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
  {
    id: "add-block",
    type: "modalNode",
    position: { x: -125, y: 580 },
    data: {
      label: "Add",
      subtitle: "Add Block",
      lines: ["Block name", "Description", "Non-base flag"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },

  {
    id: "edit-block",
    type: "modalNode",
    position: { x: -125, y: 680 },
    data: {
      label: "Edit",
      subtitle: "Edit Block",
      lines: ["Block name", "Description", "Non-base flag", "Export to Pantry"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },

  {
    id: "save-block",
    type: "modalNode",
    position: { x: -125, y: 780 },
    data: {
      label: "Save",
      subtitle: "Save Block to Pantry",
      kind: "modal",
      collapsed: true,
      handles: { targetTop: {} },
    },
  },

  {
    id: "add-dir-line",
    type: "modalNode",
    position: { x: 125, y: 580 },
    data: {
      label: "Add",
      subtitle: "Add Direction",
      lines: ["Direction text", "Ingredient reference"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
  {
    id: "edit-dir-line",
    type: "modalNode",
    position: { x: 125, y: 680 },
    data: {
      label: "Edit",
      subtitle: "Edit Direction",
      lines: ["Direction Text", "Ingredient Reference"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
  {
    id: "add-dir-block",
    type: "modalNode",
    position: { x: 375, y: 580 },
    data: {
      label: "Add",
      subtitle: "Add Phase",
      lines: ["Block name", "Description"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
  {
    id: "edit-dir-block",
    type: "modalNode",
    position: { x: 375, y: 680 },
    data: {
      label: "Edit",
      subtitle: "Edit Phase",
      lines: ["Block name", "Description"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
  {
    id: "pantry",
    type: "dataNode",
    position: { x: -675, y: -300 },
    data: {
      label: "Ingredient List",
      subtitle: "Persistent ingredient store",

      kind: "data",
      handles: { sourceBottom: {}, targetRight: {}, targetLeft: {} },
    },
  },

  {
    id: "ingredient",
    type: "dataNode",
    position: { x: -550, y: 100 },
    data: {
      label: "Ingredient Data",
      subtitle: "Stored Ingredient or Block Data",

      kind: "data",
      handles: { sourceBottom: {}, targetTop: {}, targetRight: {} },
    },
  },

  {
    id: "shelves",
    type: "dataNode",
    position: { x: -800, y: 100 },
    data: {
      label: "Shelves Data",
      subtitle: "Stored Ingredient or Block Data",

      kind: "data",
      handles: { sourceBottom: {} },
    },
  },

  {
    id: "pantry-view",
    type: "cardNode",
    position: { x: -570, y: -100 },
    data: {
      label: "Pantry View",
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
    id: "shelves-view",
    type: "cardNode",
    position: { x: -825, y: -100 },
    data: {
      label: "Shelves View",
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
    id: "add-pantry-ingredient",
    type: "modalNode",
    position: { x: -570, y: 225 },
    data: {
      label: "Add",
      subtitle: "Add Ingredient",
      lines: ["Name", "Unit", "Default amount", "Shelf assignment"],
      kind: "modal",
      collapsed: true,
      handles: { targetTop: {} },
    },
  },
  {
    id: "edit-pantry-ingredient",
    type: "modalNode",
    position: { x: -570, y: 325 },
    data: {
      label: "Edit",
      subtitle: "Edit Ingredient",
      lines: ["Name", "Unit", "Default amount", "Shelf assignment"],
      kind: "modal",
      collapsed: true,
      handles: { targetTop: {} },
    },
  },
  {
    id: "add-shelf",
    type: "modalNode",
    position: { x: -825, y: 225 },
    data: {
      label: "Add",
      subtitle: "Add Shelf",
      lines: ["Shelf name", "Order", "Optional note"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
  {
    id: "edit-shelf",
    type: "modalNode",
    position: { x: -825, y: 325 },
    data: {
      label: "Edit",
      subtitle: "Edit Shelf",
      lines: ["Shelf name", "Order", "Optional note"],
      kind: "modal",
      collapsed: true,
      handles: { sourceLeft: {}, targetTop: {} },
    },
  },
];

const initialEdges = [
  {
    id: "recipe-list-to-Data",
    source: "recipe-list",
    target: "recipe-data",
    targetHandle: "target-top",
    type: "composition",
  },
  {
    id: "recipe-data-to-view",
    source: "recipe-data",
    sourceHandle: "source-left",
    target: "recipe-data-ingredients",
    targetHandle: "target-top",
    type: "composition",
  },
  {
    id: "recipe-data-to-direction-data",
    source: "recipe-data",
    sourceHandle: "source-right",
    target: "recipe-data-directions",
    type: "composition",
  },
  {
    id: "pantry-to-ingredient",
    source: "pantry",
    target: "ingredient",
    type: "composition",
  },

  {
    id: "preparation-to-lines",
    source: "recipe-data-ingredients",
    sourceHandle: "source-left",
    target: "prep-line",
    type: "composition",
  },

  {
    id: "preparation-to-blocks",
    source: "recipe-data-ingredients",
    sourceHandle: "source-right",
    target: "prep-block",
    type: "composition",
  },

  {
    id: "direction-to-dir-lines",
    source: "recipe-data-directions",
    sourceHandle: "source-left",
    target: "dir-line",
    targetHandle: "target-top",
    type: "composition",
  },

  {
    id: "direction-to-blocks",
    source: "recipe-data-directions",
    sourceHandle: "source-right",
    target: "dir-block",
    type: "composition",
  },

  // Reference
  {
    id: "block-to-line",
    source: "prep-block",
    target: "prep-line",
    targetHandle: "target-right-1",
    type: "reference",
  },
  {
    id: "phase-to-direction",
    source: "dir-block",
    target: "dir-line",
    targetHandle: "target-right-2",
    type: "reference",
  },
  {
    id: "direction-to-lines",
    source: "dir-line",
    sourceHandle: "source-bottom",
    target: "prep-line",
    targetHandle: "target-right-2",
    type: "reference",
  },
  {
    id: "line-to-pantry-ingredient",
    source: "prep-line",
    sourceHandle: "source-left",
    target: "ingredient",
    targetHandle: "target-right",
    type: "reference",
  },

  //lookups

  {
    id: "look-line-1",
    source: "edit-block",
    target: "prep-line",
    targetHandle: "target-right-4",
    type: "lookup",
  },
  {
    id: "look-line-2",
    source: "add-block",
    target: "prep-line",
    targetHandle: "target-right-4",
    type: "lookup",
  },
  {
    id: "look-line-3",
    source: "add-dir-line",
    target: "prep-line",
    targetHandle: "target-right-3",
    type: "lookup",
  },
  {
    id: "look-line-4",
    source: "edit-dir-line",
    target: "prep-line",
    targetHandle: "target-right-3",
    type: "lookup",
  },
  {
    id: "look-line-5",
    source: "add-dir-block",
    target: "dir-line",
    targetHandle: "target-right-3",
    type: "lookup",
  },
  {
    id: "look-line-6",
    source: "edit-dir-block",
    target: "dir-line",
    targetHandle: "target-right-3",
    type: "lookup",
  },
  {
    id: "look-line-7",
    source: "add-ingredient",
    target: "pantry",
    targetHandle: "target-right",
    type: "lookup",
  },
  {
    id: "look-line-8",
    source: "edit-line",
    target: "pantry",
    targetHandle: "target-right",
    type: "lookup",
  },

  {
    id: "look-line-9",
    source: "edit-shelf",
    target: "pantry",
    targetHandle: "target-left",
    type: "lookup",
  },
  {
    id: "look-line-10",
    source: "add-shelf",
    target: "pantry",
    targetHandle: "target-left",
    type: "lookup",
  },

  //Guide
  {
    id: "guide1",
    source: "prep-block",
    sourceHandle: "source-bottom",
    target: "save-block",
    type: "guide",
  },
  {
    id: "guide2",
    source: "pantry",
    sourceHandle: "source-bottom",
    target: "save-block",
    type: "guide",
  },
  {
    id: "guide3",
    source: "shelves",
    sourceHandle: "source-bottom",
    target: "add-shelf",
    type: "guide",
  },
  {
    id: "guide4",
    source: "shelves",
    sourceHandle: "source-bottom",
    target: "edit-shelf",
    type: "guide",
  },
  {
    id: "guide5",
    source: "pantry",
    sourceHandle: "source-bottom",
    target: "add-pantry-ingredient",
    type: "guide",
  },
  {
    id: "guide6",
    source: "ingredient",
    sourceHandle: "source-bottom",
    target: "add-pantry-ingredient",
    type: "guide",
  },
  {
    id: "guide7",
    source: "ingredient",
    sourceHandle: "source-bottom",
    target: "edit-pantry-ingredient",
    type: "guide",
  },
  {
    id: "guide8",
    source: "prep-line",
    sourceHandle: "source-bottom",
    target: "add-ingredient",
    type: "guide",
  },
  {
    id: "guide9",
    source: "prep-line",
    sourceHandle: "source-bottom",
    target: "edit-line",
    type: "guide",
  },
  {
    id: "guide10",
    source: "recipe-data-ingredients",
    sourceHandle: "source-bottom",
    target: "add-ingredient",
    type: "guide",
  },
  {
    id: "guide11",
    source: "prep-block",
    sourceHandle: "source-bottom",
    target: "add-block",
    type: "guide",
  },

  {
    id: "guide12",
    source: "recipe-data-ingredients",
    sourceHandle: "source-bottom",
    target: "add-block",
    type: "guide",
  },

  {
    id: "guide13",
    source: "prep-block",
    sourceHandle: "source-bottom",
    target: "edit-block",
    type: "guide",
  },
  {
    id: "guide14",
    source: "dir-line",
    sourceHandle: "source-bottom",
    target: "add-dir-line",
    type: "guide",
  },
  {
    id: "guide15",
    source: "recipe-data-directions",
    sourceHandle: "source-bottom",
    target: "add-dir-line",
    type: "guide",
  },
  {
    id: "guide16",
    source: "dir-line",
    sourceHandle: "source-bottom",
    target: "edit-dir-line",
    type: "guide",
  },
  {
    id: "guide17",
    source: "dir-block",
    sourceHandle: "source-bottom",
    target: "add-dir-block",
    type: "guide",
  },
  {
    id: "guide18",
    source: "recipe-data-directions",
    sourceHandle: "source-bottom",
    target: "add-dir-block",
    type: "guide",
  },
  {
    id: "guide19",
    source: "dir-block",
    sourceHandle: "source-bottom",
    target: "edit-dir-block",
    type: "guide",
  },
  {
    id: "guide20",
    source: "recipe-data",
    sourceHandle: "source-bottom",
    target: "metadata",
    type: "guide",
  },
  {
    id: "guide21",
    source: "recipe-data",
    sourceHandle: "source-bottom",
    target: "version-control",
    type: "guide",
  },
  {
    id: "guide22",
    source: "version-data",
    sourceHandle: "source-bottom",
    target: "version-control",
    type: "guide",
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
  const edgeTypes = useMemo(
    () => ({
      composition: CompositionEdge,
      reference: ReferenceEdge,
      write: WriteEdge,
      lookup: LookupEdge,
      guide: GuideEdge,
    }),
    [],
  );
  const resetFlow = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  function LegendRow({ label, style, arrow = false }) {
    return (
      <div className="flex items-center gap-2 mb-1">
        <svg width="36" height="10">
          <line
            x1="0"
            y1="5"
            x2="30"
            y2="5"
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            strokeDasharray={style.strokeDasharray}
            opacity={style.opacity}
          />
          {arrow && (
            <polygon
              points="30,2 30,8 36,5"
              fill={style.stroke}
              opacity={style.opacity ?? 1}
            />
          )}
        </svg>

        <span className="text-[var(--txt2)]">{label}</span>
      </div>
    );
  }
  return (
    <div
      className="aspect-square"
      style={{ width: "100%", maxHeight: "900px" }}
    >
      <svg width="0" height="0">
        <defs>
          <marker
            id="lookup-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,8 L8,4 z" fill="var(--txt2)" />
          </marker>
        </defs>
      </svg>

      <ReactFlow
        nodes={nodesWithActions}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={true}
        zoomOnScroll={true}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--txt2)" variant={BackgroundVariant.Dots} />
        <Panel position="bottom-left">
          <div className="rounded-md border border-[var(--bg3)] bg-[var(--bg)] p-3 text-[11px]">
            <div className="mb-2 font-semibold text-[var(--txt)]">
              Edge Types
            </div>

            <LegendRow
              label="Composition"
              style={{ stroke: "var(--txt)", strokeWidth: 1.5 }}
            />

            <LegendRow
              label="Reference"
              style={{
                stroke: "var(--txt)",
                strokeWidth: 1.2,
                strokeDasharray: "5 4",
              }}
            />

            <LegendRow
              label="Lookup"
              style={{
                stroke: "var(--txt2)",
                strokeWidth: 1.2,
              }}
              arrow
            />

            <LegendRow
              label="Manipulate"
              style={{
                stroke: "var(--txt2)",
                strokeWidth: 1,
                opacity: 0.25,
              }}
            />
            <button
              onClick={resetFlow}
              className="px-2 py-1 text-xs bg-[var(--bg2)] rounded"
            >
              Reset
            </button>
          </div>
        </Panel>
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  );
}
