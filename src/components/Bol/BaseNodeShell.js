import React from "react";
import { Handle, Position } from "@xyflow/react";

function FlowHandle({ type, position, className = "", style = {}, id }) {
  return (
    <Handle
      id={id}
      type={type}
      position={position}
      className={[
        "!h-2.5 !w-2.5 !border-2 !border-[var(--bg)] !bg-[var(--fg3)]",
        className,
      ].join(" ")}
      style={style}
    />
  );
}
function EdgeHandle({ id, type, position, top }) {
  return (
    <Handle
      id={id}
      type={type}
      position={position}
      style={top ? { top } : undefined}
      className="!h-2.5 !w-2.5 !border-2 !border-[var(--bg)] !bg-[var(--fg3)]"
    />
  );
}
function NodeHandles({ handles }) {
  return (
    <>
      {handles?.targetTop && (
        <FlowHandle
          id="target-top"
          type="target"
          position={Position.Top}
          style={handles.targetTop.style}
          className={handles.targetTop.className}
        />
      )}
      {handles?.sourceBottom && (
        <FlowHandle
          id="source-bottom"
          type="source"
          position={Position.Bottom}
          style={handles.sourceBottom.style}
          className={handles.sourceBottom.className}
        />
      )}
      {handles?.targetBottom && (
        <FlowHandle
          id="target-bottom"
          type="target"
          position={Position.Bottom}
          style={handles.targetBottom.style}
          className={handles.targetBottom.className}
        />
      )}
      {handles?.targetLeft && (
        <FlowHandle
          id="target-left"
          type="target"
          position={Position.Left}
          style={handles.targetLeft.style}
          className={handles.targetLeft.className}
        />
      )}
      {handles?.sourceRight && (
        <FlowHandle
          id="source-right"
          type="source"
          position={Position.Right}
          style={handles.sourceRight.style}
          className={handles.sourceRight.className}
        />
      )}
      {handles?.targetRight1 && (
        <EdgeHandle
          id="target-right-1"
          type="target"
          position={Position.Right}
          top="18%"
        />
      )}
      {handles?.targetRight2 && (
        <EdgeHandle
          id="target-right-2"
          type="target"
          position={Position.Right}
          top="38%"
        />
      )}
      {handles?.targetRight3 && (
        <EdgeHandle
          id="target-right-3"
          type="target"
          position={Position.Right}
          top="62%"
        />
      )}
      {handles?.targetRight4 && (
        <EdgeHandle
          id="target-right-4"
          type="target"
          position={Position.Right}
          top="82%"
        />
      )}
      {handles?.targetRight && (
        <FlowHandle
          id="target-right"
          type="target"
          position={Position.Right}
          style={handles.targetRight.style}
          className={handles.targetRight.className}
        />
      )}
      {handles?.sourceLeft && (
        <FlowHandle
          id="source-left"
          type="source"
          position={Position.Left}
          style={handles.sourceLeft.style}
          className={handles.sourceLeft.className}
        />
      )}
    </>
  );
}
function kindLabel(kind) {
  switch (kind) {
    case "screen":
      return "Screen";
    case "modal":
      return "Modal";
    case "system":
      return "System";
    case "state":
      return "State";
    case "data":
      return "Data";
    default:
      return "Node";
  }
}

export function BaseNodeShell({
  id,
  data,
  selected,
  variant = "card", // card | modal | data
  collapsible = false,
  compact = false,
  className = "",
}) {
  const {
    label,
    subtitle,
    lines = [],
    collapsed = false,
    accent = false,
    kind,
    handles,
    onToggleCollapse,
  } = data || {};

  const isModal = variant === "modal";
  const isData = variant === "data";

  const outerClass = isModal
    ? "rounded-2xl"
    : isData
      ? "rounded-lg"
      : "rounded-md";

  const surfaceClass = isData
    ? "border-[var(--txt)] bg-[var(--txt)] text-[var(--bg)] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    : isModal
      ? "border-[var(--bg3)] bg-[var(--bg)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      : "border-[var(--bg3)] bg-[var(--bg)] shadow-sm";

  const selectedClass = selected
    ? isData
      ? "ring-1 ring-[var(--bg)] border-[var(--bg)]"
      : "ring-1 ring-[var(--txt)] border-[var(--txt)]"
    : "";

  const accentClass = accent
    ? isData
      ? "border-[var(--bg)]"
      : "border-[var(--fg)]"
    : "";

  const widthClass = compact
    ? "w-[180px] max-w-[180px]"
    : "w-[220px] max-w-[220px]";

  const chipClass = isData
    ? "border-[var(--fg2)] bg-[var(--fg2)] text-[var(--bg)]"
    : isModal
      ? "border-[var(--bg3)] bg-[var(--bg2)] text-[var(--fg2)]"
      : "border-[var(--bg3)] bg-[var(--bg2)] text-[var(--fg2)]";

  const subtitleClass = isData
    ? "text-[11px] leading-4 text-[var(--bg3)]"
    : "text-[11px] leading-4 text-[var(--fg2)]";

  const bodyBorderClass = isData
    ? "border-[var(--fg2)]"
    : "border-[var(--bg3)]";

  const bodyTextClass = isData
    ? "text-[12px] leading-5 text-[var(--bg2)]"
    : "text-[12px] leading-5 text-[var(--fg2)]";

  const bulletClass = isData ? "bg-[var(--bg3)]" : "bg-[var(--fg3)]";

  const buttonClass = isData
    ? "nodrag nopan inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--fg2)] bg-[var(--fg)] text-sm text-[var(--bg2)] transition hover:bg-[var(--fg2)]"
    : "nodrag nopan inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--bg3)] bg-[var(--bg)] text-sm text-[var(--fg2)] transition hover:bg-[var(--bg2)]";

  return (
    <div
      className={[
        "relative border transition-all",
        outerClass,
        surfaceClass,
        selectedClass,
        accentClass,
        widthClass,
        className,
      ].join(" ")}
    >
      <NodeHandles handles={handles} />

      <div className="flex items-start justify-between gap-3 px-4 pt-3 pb-2">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <div className="truncate text-[13px] font-semibold tracking-[-0.01em]">
              {label}
            </div>

            <span
              className={[
                "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                chipClass,
              ].join(" ")}
            >
              {kindLabel(kind)}
            </span>
          </div>

          {subtitle ? <div className={subtitleClass}>{subtitle}</div> : null}
        </div>

        {collapsible ? (
          <button
            type="button"
            className={buttonClass}
            onClick={() => onToggleCollapse?.(id)}
            aria-label={collapsed ? "Expand node" : "Collapse node"}
          >
            {collapsed ? "+" : "−"}
          </button>
        ) : null}
      </div>

      {lines.length > 0 ? (
        <div
          className={[
            "border-t px-4 transition-all duration-200",
            bodyBorderClass,
            collapsed ? "py-0 h-0 overflow-hidden border-t-0" : "py-3",
          ].join(" ")}
        >
          <div className="space-y-2">
            {lines.map((line, index) => (
              <div
                key={index}
                className={["flex items-start gap-2", bodyTextClass].join(" ")}
              >
                <span
                  className={[
                    "mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full",
                    bulletClass,
                  ].join(" ")}
                />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
