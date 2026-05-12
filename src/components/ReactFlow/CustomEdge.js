import React from "react";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";

export default function CustomEdge(props) {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerStart,
    markerEnd,
    label,
  } = props;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 24,
    offset: 20,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={{
          stroke: "var(--bg)",
          strokeWidth: 8,
        }}
      />

      <BaseEdge
        path={edgePath}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={{
          stroke: "var(--txt)",
          strokeWidth: 2,
        }}
      />

      {label ? (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "none",
              background: "var(--bg)",
              color: "var(--txt)",
              fontSize: "11px",
              lineHeight: 1.2,
              padding: "3px 8px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
              border: "1px solid var(--bg2)",
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
