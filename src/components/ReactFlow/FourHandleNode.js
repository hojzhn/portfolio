import React from "react";
import { Handle, Position } from "@xyflow/react";
import { BlockMath, InlineMath } from "react-katex";
const HANDLE_STYLE = {
  width: 10,
  height: 10,
  border: "2px solid var(--bg)",
  background: "var(--fg3)",
  borderRadius: 999,
};

function getNodeShellStyle({
  width = 220,
  height = "auto",
  padding = 0,
  radius = 10,
  background = "var(--bg)",
  borderColor = "var(--bg3)",
  shadow = "0 1px 2px rgba(16, 24, 40, 0.04)",
  color = "var(--txt)",
  centered = false,
  zIndex,
}) {
  return {
    zIndex,
    width,
    height,
    padding,
    background,
    color,
    border: `1px solid ${borderColor}`,
    borderRadius: radius,
    boxShadow: shadow,
    position: "relative",
    textAlign: centered ? "center" : "left",
    overflow: "hidden",
    ...(centered && {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  };
}

function NodeHeader({
  title,
  badge,
  hideBadge = false,
  center = false,
  dark = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "space-between",
        gap: 12,
        padding: "12px 14px 10px 14px",
      }}
    >
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.25,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: dark ? "var(--bg)" : "var(--txt)",
          minWidth: 0,
        }}
      >
        {title}
      </div>

      {!hideBadge && badge ? (
        <span
          style={{
            flexShrink: 0,
            borderRadius: 999,
            border: dark ? "1px solid var(--fg2)" : "1px solid var(--bg3)",
            background: dark ? "var(--fg2)" : "var(--bg2)",
            color: dark ? "var(--bg)" : "var(--fg2)",
            fontSize: 10,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            padding: "2px 8px",
          }}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}

function NodeBody({ children, dark = false, centered = false }) {
  return (
    <div
      style={{
        borderTop: dark ? "1px solid var(--fg2)" : "1px solid var(--bg3)",
        padding: "10px 14px 12px 14px",
        color: dark ? "var(--bg2)" : "var(--fg2)",
        fontSize: 12,
        lineHeight: 1.45,
        textAlign: centered ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
}
export function FourHandleNode({ data }) {
  return (
    <div
      style={getNodeShellStyle({
        width: 220,
        radius: 10,
      })}
    >
      <NodeHeader
        title={data.label || "Node"}
        badge="Node"
        hideBadge={data.hideBadge}
      />

      <NodeBody centered>{data.subtitle || ""}</NodeBody>

      <Handle
        type="target"
        position={Position.Top}
        id="top-left"
        style={{ ...HANDLE_STYLE, left: "30%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-right"
        style={{ ...HANDLE_STYLE, left: "70%" }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-left"
        style={{ ...HANDLE_STYLE, left: "30%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-right"
        style={{ ...HANDLE_STYLE, left: "70%" }}
      />
    </div>
  );
}
export function FormulaNode({ data }) {
  const formulas = Array.isArray(data.formula) ? data.formula : [data.formula];
  const handles = data.handles || [
    { type: "target", side: "top", id: "input", offset: "50%" },
    { type: "source", side: "bottom", id: "output", offset: "50%" },
  ];

  const sideToPosition = {
    top: Position.Top,
    bottom: Position.Bottom,
    left: Position.Left,
    right: Position.Right,
  };

  return (
    <div
      style={getNodeShellStyle({
        width: 240,
        radius: 10,
      })}
    >
      <NodeHeader
        title={data.title || "Formula"}
        badge="Formula"
        hideBadge={data.hideBadge}
      />

      <NodeBody centered>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 12,
            letterSpacing: "-0.02em",
          }}
        >
          {formulas.map((f, idx) => (
            <InlineMath key={idx} math={f || ""} />
          ))}
        </div>
      </NodeBody>

      {handles.map((h) => {
        const offset = typeof h.offset === "number" ? `${h.offset}%` : h.offset;
        const style =
          h.side === "top" || h.side === "bottom"
            ? { left: offset }
            : { top: offset };

        return (
          <Handle
            key={h.id}
            type={h.type}
            position={sideToPosition[h.side]}
            id={h.id}
            style={{ ...HANDLE_STYLE, ...style }}
          />
        );
      })}
    </div>
  );
}
export function DefaultNode({ data }) {
  const {
    width = 220,
    height = "auto",
    borderRadius = 10,
    background = "var(--bg)",
    borderColor = "var(--bg3)",
    label = "Node",
    subtitle,
    badge = "Node",
    centerLabel = false,
    zIndex,
    handles = [
      { type: "target", side: "top", id: "input", offset: "50%" },
      { type: "source", side: "bottom", id: "output", offset: "50%" },
    ],
  } = data;

  const sideToPosition = {
    top: Position.Top,
    bottom: Position.Bottom,
    left: Position.Left,
    right: Position.Right,
  };

  return (
    <div
      style={getNodeShellStyle({
        width,
        height,
        radius: borderRadius,
        background,
        borderColor,
        centered: false,
        zIndex,
      })}
    >
      <NodeHeader
        center={data.centerLabel}
        title={label}
        badge={badge}
        hideBadge={data.hideBadge}
      />
      {subtitle || centerLabel ? (
        <NodeBody centered={centerLabel}>{subtitle || null}</NodeBody>
      ) : null}

      {handles.map((h) => {
        const offset = typeof h.offset === "number" ? `${h.offset}%` : h.offset;
        const style =
          h.side === "top" || h.side === "bottom"
            ? { left: offset }
            : { top: offset };

        return (
          <Handle
            key={h.id}
            type={h.type}
            position={sideToPosition[h.side]}
            id={h.id}
            style={{
              ...HANDLE_STYLE,
              ...style,
              ...(h.hidden ? { opacity: 0, pointerEvents: "none" } : null),
            }}
          />
        );
      })}
    </div>
  );
}
export function ControlNode({ data }) {
  const label = data.label || "Control";
  const hideBadge = data.hideBadge || false;
  const badge = data.badge ?? "Control";

  return (
    <div
      style={getNodeShellStyle({
        width: 180,
        radius: 18,
        background: "var(--txt)",
        borderColor: "var(--txt)",
        shadow: "0 8px 24px rgba(0,0,0,0.18)",
        color: "var(--bg)",
      })}
    >
      <NodeHeader
        title={label}
        badge={badge}
        hideBadge={hideBadge}
        dark={true}
      />

      {data.subtitle ? (
        <NodeBody dark={true} centered>
          {data.subtitle}
        </NodeBody>
      ) : null}

      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{
          ...HANDLE_STYLE,
          left: "50%",
          border: "2px solid var(--txt)",
          background: "var(--bg3)",
        }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{
          ...HANDLE_STYLE,
          left: "50%",
          border: "2px solid var(--txt)",
          background: "var(--bg3)",
        }}
      />
    </div>
  );
}

export function UnitNode({ data }) {
  const {
    label = "Unit",
    width = 50,
    height = 50,
    background = "var(--txt)",
    borderColor = "var(--txt)",
    color = "var(--bg)",
    fontSize = "11px",
    handles = [],
  } = data;

  const sideToPosition = {
    top: Position.Top,
    bottom: Position.Bottom,
    left: Position.Left,
    right: Position.Right,
  };

  return (
    <div
      style={{
        width,
        height,
        background: "var(--txt)",
        borderColor: "var(--txt)",
        shadow: "0 8px 24px rgba(0,0,0,0.18)",
        color: "var(--bg)",
        border: `1px solid ${borderColor}`,
        borderRadius: "100%",
        boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize,
        fontWeight: 600,
        letterSpacing: "-0.01em",
      }}
    >
      {label}

      {handles.map((h) => {
        const offset = typeof h.offset === "number" ? `${h.offset}%` : h.offset;
        let style = {};

        if (h.side === "top" || h.side === "bottom") {
          style = { left: offset ?? "50%" };
        } else {
          style = { top: offset ?? "50%" };
        }

        return (
          <Handle
            key={h.id || `${h.type}-${h.side}`}
            type={h.type}
            position={sideToPosition[h.side]}
            id={h.id}
            style={{
              width: 10,
              height: 10,
              border: "2px solid var(--bg)",
              background: "var(--fg3)",
              borderRadius: 999,
              ...style,
              ...(h.hidden
                ? {
                    opacity: 0,
                    pointerEvents: "none",
                  }
                : null),
            }}
          />
        );
      })}
    </div>
  );
}
