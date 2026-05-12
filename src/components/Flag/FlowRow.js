import React from "react";

/**
 * Horizontal step-flow diagram primitive.
 *
 * Renders a tag row above a box row, with `→` arrows between boxes.
 * The box row is `items-stretch` so every box is the same height, and
 * the arrow column stretches with it and centers the arrow vertically
 * on the boxes. The tag row uses invisible arrows of the same size so
 * tags stay aligned with their boxes.
 *
 * Each step: { n, label, sub, tag?, kind?, grow? }
 *   kind — "retained" | "surfaced" | "commit" (defaults to the
 *          point-tinted box). Also drives the tag color.
 *   grow — flex-grow weight for proportional widths (default 1).
 *
 * `annotate` — optional bracket annotations under the boxes. Either:
 *   { stepIndex, label }                 (single box, point-toned), or
 *   [{ from, to, label, tone }]          (one or more spanning brackets)
 *     from/to — inclusive step indices the bracket spans.
 *     tone    — "point" (default) or "txt2".
 */

/* Box style per step `kind`. Default = the point-tinted box. */
export const FLOW_BOX_CLASS = {
  retained: "bg-[var(--point2)] border border-[var(--point)]",
  surfaced: "bg-[var(--bg4)] text-[var(--txt)]",
  commit: "bg-[var(--bg3)] border border-[var(--bg4)] text-[var(--txt)]",
  default: "bg-[var(--point2)] border border-[var(--point)]",
};

/* Fixed-width so the bracket-row connector can span the full cell. */
export const ARROW_W = "w-5 sm:w-6";

export const FlowArrow = ({ hidden = false }) => (
  <div
    aria-hidden="true"
    className={`shrink-0 ${ARROW_W} flex items-center justify-center`}
  >
    <i
      className={`fa-sharp fa-regular fa-arrow-right text-[10px] sm:text-[12px] ${
        hidden ? "invisible" : "text-[var(--txt3)]"
      }`}
    />
  </div>
);

const toneColor = (tone) => (tone === "txt2" ? "var(--txt2)" : "var(--point)");

// Normalize the legacy `{ stepIndex, label }` form into the array form.
const normalizeAnnotations = (annotate) => {
  if (!annotate) return [];
  if (Array.isArray(annotate)) return annotate;
  return [
    {
      from: annotate.stepIndex,
      to: annotate.stepIndex,
      label: annotate.label,
      tone: annotate.tone || "point",
    },
  ];
};

export default function FlowRow({ steps, className = "", annotate }) {
  const last = steps.length - 1;
  const annotations = normalizeAnnotations(annotate);
  const groupOf = (i) =>
    annotations.find((a) => i >= a.from && i <= a.to) || null;

  return (
    <div className={`mb-4 ${className}`}>
      {/* Tag row */}
      <div className="flex flex-row gap-px mb-1">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <span
              className="flex-1 min-w-0 font-mono text-[0.6em] sm:text-[0.7em] tracking-[0.14em] uppercase truncate"
              style={{
                flexGrow: s.grow ?? 1,
                color:
                  s.kind && s.kind !== "retained"
                    ? "var(--txt2)"
                    : "var(--point)",
              }}
            >
              {s.tag ? `${s.n} · ${s.tag}` : s.n}
            </span>
            {i < last && <FlowArrow hidden />}
          </React.Fragment>
        ))}
      </div>

      {/* Box row */}
      <div className="flex flex-row items-stretch gap-px">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <div
              className={`flex-1 min-w-0 rounded-md px-2 py-2.5 sm:px-3 sm:py-3 ${
                FLOW_BOX_CLASS[s.kind || "default"]
              }`}
              style={{ flexGrow: s.grow ?? 1 }}
            >
              <div className=" leading-tight ">{s.label}</div>
              <div className="text-[0.8em] text-[var(--txt2)] leading-tight mt-0.5">
                {s.sub}
              </div>
            </div>
            {i < last && <FlowArrow />}
          </React.Fragment>
        ))}
      </div>

      {annotations.length > 0 && (
        <>
          {/* Bracket row — mirrors the box-row cell structure exactly so
              the bracket is pixel-aligned with the boxes. 1px lines,
              prongs pointing up toward the boxes. */}
          <div className="flex flex-row gap-px mt-3">
            {steps.map((s, i) => {
              const g = groupOf(i);
              const c = g && toneColor(g.tone);
              const isFirst = g && i === g.from;
              const isLast = g && i === g.to;
              const nextG = i < last ? groupOf(i + 1) : null;
              const connect = g && nextG && g === nextG;
              return (
                <React.Fragment key={s.n}>
                  <div
                    className="flex-1 min-w-0 h-2"
                    style={{ flexGrow: s.grow ?? 1 }}
                  >
                    {g && (
                      <div
                        className={`h-full border-b ${
                          isFirst ? "border-l rounded-bl-md" : ""
                        } ${isLast ? "border-r rounded-br-md" : ""}`}
                        style={{ borderColor: c }}
                      />
                    )}
                  </div>
                  {i < last && (
                    <div
                      aria-hidden="true"
                      className={`shrink-0 ${ARROW_W} h-2`}
                    >
                      {connect && (
                        <div
                          className="h-full w-full border-b"
                          style={{ borderColor: toneColor(g.tone) }}
                        />
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Label row — one block per bracket span, label centered. */}
          <div className="flex flex-row gap-px mt-1.5">
            {(() => {
              const cells = [];
              let i = 0;
              while (i < steps.length) {
                const g = groupOf(i);
                if (g) {
                  const grow = steps
                    .slice(g.from, g.to + 1)
                    .reduce((acc, st) => acc + (st.grow ?? 1), 0);
                  cells.push(
                    <div
                      key={`lbl-${g.from}-${g.to}`}
                      className="flex-1 min-w-0 font-mono text-[0.6em] sm:text-[0.7em] uppercase tracking-[0.14em] text-center"
                      style={{ flexGrow: grow, color: toneColor(g.tone) }}
                    >
                      {g.label}
                    </div>,
                  );
                  if (g.to < last)
                    cells.push(<FlowArrow key={`lbl-arr-${g.to}`} hidden />);
                  i = g.to + 1;
                } else {
                  cells.push(
                    <div
                      key={`gap-${i}`}
                      className="flex-1 min-w-0"
                      style={{ flexGrow: steps[i].grow ?? 1 }}
                    />,
                  );
                  if (i < last)
                    cells.push(<FlowArrow key={`gap-arr-${i}`} hidden />);
                  i += 1;
                }
              }
              return cells;
            })()}
          </div>
        </>
      )}
    </div>
  );
}
