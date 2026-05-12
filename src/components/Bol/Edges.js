import React from "react";
import { BaseEdge, getBezierPath, getSmoothStepPath } from "@xyflow/react";

export function CompositionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: "var(--txt)",
          strokeWidth: 1.5,
        }}
      />
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            startOffset="50%"
            textAnchor="middle"
            style={{ fontSize: 10, fill: "var(--txt)" }}
          >
            {data.label}
          </textPath>
        </text>
      )}
    </>
  );
}
export function ReferenceEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: "var(--txt)",
          strokeWidth: 1.2,
          strokeDasharray: "5 4",
        }}
      />
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            startOffset="50%"
            textAnchor="middle"
            style={{ fontSize: 10, fill: "var(--txt)" }}
          >
            {data.label}
          </textPath>
        </text>
      )}
    </>
  );
}

export function WriteEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: "var(--accent, var(--txt))",
          strokeWidth: 2,
        }}
      />
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            startOffset="50%"
            textAnchor="middle"
            style={{ fontSize: 10, fill: "var(--txt)" }}
          >
            {data.label}
          </textPath>
        </text>
      )}
    </>
  );
}

export function LookupEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: "var(--txt2)",
          strokeWidth: 1.2,
        }}
        markerEnd="url(#lookup-arrow)"
      />
      {data?.label && (
        <text>
          <textPath
            href={`#${id}`}
            startOffset="50%"
            textAnchor="middle"
            style={{ fontSize: 10, fill: "var(--txt2)" }}
            markerEnd="url(#lookup-arrow)"
          >
            {data.label}
          </textPath>
        </text>
      )}
    </>
  );
}
export function GuideEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const path = `M ${sourceX},${sourceY} L ${targetX},${targetY}`;

  return (
    <BaseEdge
      id={id}
      path={path}
      style={{
        stroke: "var(--txt2)",
        strokeWidth: 1,
        opacity: 0.25,
      }}
    />
  );
}
