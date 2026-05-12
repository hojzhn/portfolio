import React, { useEffect, useRef, useState } from "react";
import MonoLabel from "../components/MonoLabel";
import Chart from "chart.js/auto";
const defaultMoments = [
  {
    time: "4:55 PM",
    place: "Coworking",
    title: "Opens Twenty, already suspicious",
    anxiety: 5,
    apps: ["Twenty", "Slack"],
    fires: 3,
    type: "stale",
    what: "Marcus opens Tasks before leaving. Badge: 14. He cross-checks Slack mentally, remembering a thread from Priya earlier. The top rows are SOC 2, chip delay, welding Note. He knows these are one situation. Twenty shows them as three.",
    friction:
      "Marcus is already reconciling between Slack context and Twenty's flat list. The system is not his primary memory.",
    fix: "Group by distance from the focused object so cross-channel signals collapse into one surface.",
  },
  {
    time: "4:58 PM",
    place: "Coworking",
    title: "Leaves Twenty to rebuild the truth",
    anxiety: 6,
    apps: ["Twenty", "Gmail", "Calendar"],
    fires: 3,
    type: "stale",
    what: "Marcus opens Gmail, then glances at Calendar. Exec review is tomorrow morning. He searches Priya in Sent and reads today's threads. The 1:30 ack is there. He sent a holding reply but the timeline is still owed.",
    friction:
      "Temporal pressure lives in Calendar, commitments live in Gmail, Tasks live in Twenty. None of them reconcile.",
    fix: "The focused object should pull in nearby time constraints and communication state into the same action box.",
  },
  {
    time: "5:03 PM",
    place: "Coworking",
    title: "Writes one reply for three scattered Tasks",
    anxiety: 4,
    apps: ["Gmail", "Twenty", "Docs"],
    fires: 3,
    type: "stale",
    what: "Marcus drafts the combined reply in Gmail, referencing a SOC 2 timeline doc. Sends: chip ETA, weld remediation, SOC 2 timeline. Returns to Twenty and manually decides what counts as done.",
    friction:
      "Source material lives in Docs, communication in Gmail, tracking in Twenty. Closure requires manual interpretation across all three.",
    fix: "Action box should show related artifacts and distinguish notification closure from work completion.",
  },
  {
    time: "5:08 PM",
    place: "Coworking",
    title: "Does one last sweep across channels",
    anxiety: 10,
    apps: ["Gmail", "Slack", "Twenty"],
    fires: 3,
    type: "buried",
    what: "Marcus searches Gmail for gopuff.com. Then checks Slack for anything missed. Finds Maya’s unread COI request from the morning.",
    friction:
      "Maya never appeared under Gopuff because she is not part of the explicit graph. Her Person record was auto-created from email and has no Company link, and her Task is attached only to her Person, not to the Gopuff Opportunity. Company and Opportunity views resolve through explicit links, so she is excluded even though her email domain and context clearly tie her to Gopuff.",
    fix: "Distance should not depend only on explicit joins. The system should infer proximity from signals like email domain, thread participants, and recent interaction, and include those records in the Gopuff surface even when the graph is incomplete.",
  },
  {
    time: "5:11 PM",
    place: "Coworking",
    title: "Unblocks the contract in two minutes",
    anxiety: 4,
    apps: ["Gmail", "Drive", "Twenty"],
    fires: 3,
    type: "buried",
    what: "Marcus pulls the COI from Drive, forwards it to Maya, copies Priya. Two minutes. Contract unblocked.",
    friction:
      "Resolution pulls from file storage and email, but the CRM remains passive. It does not recognize that the request is satisfied.",
    fix: "Outbound communication tied to a nearby object should update or close dependent Tasks automatically.",
  },
  {
    time: "5:17 PM",
    place: "Coworking",
    title: "Leaves with the account saved and his trust lower",
    anxiety: 3,
    apps: ["Gmail", "Notes", "Twenty"],
    fires: 3,
    type: "lost",
    what: "Sent folder is clean. Marcus checks a quick Notes checklist he keeps for end-of-day sanity. Everything is done. Twenty still shows open Tasks. He closes the Tasks manually, because he at least got used to it.",
    friction:
      "Marcus maintains a parallel system in Notes because Twenty cannot be trusted as the final state.",
    fix: "The notification center must become the authoritative surface by aligning Tasks with real-world actions and proximity to the focus.",
  },
];
// Type colors for DOM elements (CSS handles var resolution).
const typeColors = {
  stale: "var(--point)",
  buried: "var(--point2)",
  lost: "var(--point3)",
};

// Token names for canvas (Chart.js).
// Resolved at runtime via getComputedStyle so the palette stays the single source of truth.
const typeVarTokens = {
  stale: "--point",
  buried: "--point2",
  lost: "--point3",
};

const typeLabels = {
  stale: "Stale",
  buried: "Buried",
  lost: "Lost",
};
function getCumulativeSwitches(moments, index) {
  let switches = 0;
  let prevApp = null;

  for (let i = 0; i <= index; i++) {
    const apps = moments[i].apps;

    for (let j = 0; j < apps.length; j++) {
      const currentApp = apps[j];

      if (prevApp && prevApp !== currentApp) {
        switches++;
      }

      prevApp = currentApp;
    }
  }

  return switches;
}
/**
 * Read a CSS custom property value from the root element.
 * Returns the resolved color string for use in canvas contexts.
 */
const readVar = (name) =>
  typeof window === "undefined"
    ? ""
    : getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const buildFillGradient = (chart, topVar, bottomVar) => {
  const { ctx, chartArea } = chart;
  if (!chartArea) return null;
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom,
  );
  gradient.addColorStop(0, readVar(topVar));
  gradient.addColorStop(1, readVar(bottomVar));
  return gradient;
};

/**
 * Returns true when the viewport is narrower than the breakpoint.
 * Re-evaluates on resize.
 */
const useIsMobile = (breakpoint = 640) => {
  const getValue = () =>
    typeof window !== "undefined" && window.innerWidth < breakpoint;

  const [isMobile, setIsMobile] = useState(getValue);

  useEffect(() => {
    const handler = () => setIsMobile(getValue());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  return isMobile;
};

/**
 * Interactive user journey map.
 *
 * Props:
 *   customMoments: array of moment objects (optional, defaults to Marcus journey)
 *   title:    string
 *   subtitle: string
 *
 * Each moment shape: { time, place, title, anxiety, apps, fires, type, what, friction, fix }
 *   type is one of: 'comm', 'date', 'supplier', 'mention', 'system'
 */
export const TwentyJourneyMap = ({
  customMoments,
  title = 'Marcus C, "The Bad Day"',
  subtitle = "Head of Ops at a hardware startup · $480K Gopuff procurement",
}) => {
  const data = customMoments || defaultMoments;
  const [active, setActive] = useState(0);
  const [chartView, setChartView] = useState("switching"); // "anxiety" | "switching"
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const dotRowRef = useRef(null);
  const isMobile = useIsMobile(640);

  const m = data[active];

  // Build chart on mount, destroy on unmount.
  useEffect(() => {
    if (!chartRef.current || typeof Chart === "undefined") return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Resolve every color the canvas needs from the active palette.
    const lineColor = readVar("--point");
    const tickColor = readVar("--txt2");
    const gridColor = readVar("--bg3");

    if (chartView === "anxiety") {
      const pointColors = data.map((d) => readVar(typeVarTokens[d.type]));

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((d) => d.time),
          datasets: [
            {
              data: data.map((d) => d.anxiety),
              borderColor: lineColor,
              backgroundColor: (context) =>
                buildFillGradient(context.chart, "--point", "--bg2"),
              borderWidth: 2.5,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: pointColors,
              pointBorderColor: pointColors,
              pointRadius: data.map((_, i) => (i === active ? 7 : 4)),
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          onClick: (_e, els) => {
            if (els.length) setActive(els[0].index);
          },
          scales: {
            y: {
              min: 0,
              max: 10,
              ticks: {
                stepSize: 5,
                color: tickColor,
                font: { size: 11, family: "JetBrains Mono, monospace" },
              },
              grid: { color: gridColor },
              title: {
                display: true,
                text: "anxiety",
                color: tickColor,
                font: { size: 11, family: "JetBrains Mono, monospace" },
              },
            },
            x: {
              ticks: {
                display: !isMobile,
                color: tickColor,
                font: { size: 10, family: "JetBrains Mono, monospace" },
                maxRotation: 0,
                autoSkip: false,
              },
              grid: { display: false },
            },
          },
        },
      });
    } else {
      // chartView === "switching"
      // Build a list of unique apps in the order they first appear.
      const appOrder = [];
      data.forEach((d) => {
        d.apps.forEach((a) => {
          if (!appOrder.includes(a)) appOrder.push(a);
        });
      });

      // Each app-use becomes one point: x = moment index plus a small nudge
      // for sequential apps within the same moment, y = the app's index.
      // Track which moment each point belongs to so we can highlight on active change.
      const points = [];
      const pointMomentIndex = [];
      data.forEach((d, i) => {
        d.apps.forEach((a, j) => {
          const yIdx = appOrder.indexOf(a);
          const nudge =
            d.apps.length > 1 ? (j / (d.apps.length - 1) - 0.5) * 0.4 : 0;
          points.push({ x: i + nudge, y: yIdx });
          pointMomentIndex.push(i);
        });
      });

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              data: points,
              borderColor: lineColor,
              backgroundColor: lineColor,
              borderWidth: 1.5,
              fill: false,
              tension: 0,
              pointBackgroundColor: lineColor,
              pointBorderColor: lineColor,
              pointRadius: pointMomentIndex.map((mi) =>
                mi === active ? 6 : 3,
              ),
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          parsing: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          onClick: (_e, els) => {
            if (els.length) {
              const dataIndex = els[0].index;
              setActive(pointMomentIndex[dataIndex]);
            }
          },
          scales: {
            y: {
              type: "linear",
              min: -0.5,
              max: appOrder.length - 0.5,
              reverse: true,
              afterBuildTicks: (axis) => {
                axis.ticks = appOrder.map((_, i) => ({ value: i }));
              },
              ticks: {
                color: tickColor,
                font: { size: 11, family: "JetBrains Mono, monospace" },
                callback: (v) => appOrder[v] || "",
                autoSkip: false,
              },
              grid: { color: gridColor },
            },
            x: {
              type: "linear",
              min: -0.5,
              max: data.length - 0.5,
              afterBuildTicks: (axis) => {
                axis.ticks = data.map((_, i) => ({ value: i }));
              },
              ticks: {
                display: !isMobile,
                color: tickColor,
                font: { size: 10, family: "JetBrains Mono, monospace" },
                callback: (v) => (data[v] ? data[v].time : ""),
                maxRotation: 0,
                autoSkip: false,
              },
              grid: { display: false },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isMobile, chartView]);

  // Update point radii when active changes (no full chart rebuild).
  useEffect(() => {
    if (!chartInstanceRef.current) return;
    if (chartView === "anxiety") {
      chartInstanceRef.current.data.datasets[0].pointRadius = data.map(
        (_, i) => (i === active ? 7 : 4),
      );
    } else {
      // Switching view: rebuild radii from each point's moment index.
      const radii = [];
      data.forEach((d, i) => {
        d.apps.forEach(() => {
          radii.push(i === active ? 6 : 3);
        });
      });
      chartInstanceRef.current.data.datasets[0].pointRadius = radii;
    }
    chartInstanceRef.current.update("none");
  }, [active, data, chartView]);

  // On mobile, scroll the active dot into view when it changes.
  useEffect(() => {
    if (!isMobile || !dotRowRef.current) return;
    const activeBtn = dotRowRef.current.children[active];
    if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active, isMobile]);

  return (
    <div
      style={{
        padding: "1rem 0",
        background: "var(--bg)",
        color: "var(--txt)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 500, color: "var(--txt)" }}>
          {title}
        </div>
        <MonoLabel color="var(--txt3)" margin={false}>
          {data.length} moments · {isMobile ? "tap" : "click"} to inspect
        </MonoLabel>
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--txt2)",
          marginBottom: "1.25rem",
        }}
      >
        {subtitle}
      </div>

      {/* Chart view toggle */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 8,
        }}
      >
        {[
          { key: "anxiety", label: "Anxiety" },
          { key: "switching", label: "Context switching" },
        ].map((opt) => {
          const isActive = chartView === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setChartView(opt.key)}
              style={{
                padding: "5px 10px",
                fontSize: 11,
                fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: isActive ? "var(--bg2)" : "var(--bg)",
                color: isActive ? "var(--txt)" : "var(--txt3)",
                border: isActive
                  ? "1px solid var(--txt2)"
                  : "1px solid var(--bg3)",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Chart canvas */}
      <div style={{ position: "relative", marginBottom: "1.5rem" }}>
        <div
          style={{
            position: "relative",
            height: 160,
            background: "var(--bg2)",
            padding: 12,
            borderRadius: 4,
          }}
        >
          <canvas
            ref={chartRef}
            role="img"
            aria-label={
              chartView === "anxiety"
                ? `Anxiety level across ${data.length} moments of the journey, rising from morning notification through afternoon fires and ending high on the plane.`
                : `Context switching across ${data.length} moments. Each point shows an app touched at that moment. The line tracks how Marcus jumped between apps.`
            }
          >
            {chartView === "anxiety"
              ? "Anxiety curve across the day."
              : "Context switching across the day."}
          </canvas>
        </div>
      </div>

      {/* Dot row (timeline navigation).
          Desktop: equal columns across the row.
          Mobile: fixed-width columns with horizontal scroll. */}
      <div
        ref={dotRowRef}
        style={
          isMobile
            ? {
                display: "grid",
                gridTemplateColumns: `repeat(${data.length}, 64px)`,
                gap: 6,
                marginBottom: "1rem",
                overflowX: "auto",
                paddingBottom: 4,
                scrollbarWidth: "thin",
                WebkitOverflowScrolling: "touch",
              }
            : {
                display: "grid",
                gridTemplateColumns: `repeat(${data.length}, 1fr)`,
                gap: 6,
                marginBottom: "1rem",
              }
        }
      >
        {data.map((d, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding: "8px 4px",
                border: isActive
                  ? "1px solid var(--txt2)"
                  : "1px solid var(--bg3)",
                background: isActive ? "var(--bg2)" : "var(--bg)",
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minWidth: 0,
                fontFamily: "inherit",
                color: "var(--txt)",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: typeColors[d.type],
                }}
              />
              <MonoLabel
                color="var(--txt2)"
                size={10}
                style={{
                  fontWeight: isActive ? 500 : 400,
                  whiteSpace: "nowrap",
                }}
                margin={false}
              >
                {d.time}
              </MonoLabel>
            </button>
          );
        })}
      </div>

      {/* Moment detail card */}
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--bg3)",
          borderRadius: 4,
          padding: isMobile ? "1rem" : "1.25rem",
          marginBottom: "1rem",
          minHeight: isMobile ? "auto" : 280,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: typeColors[m.type],
            }}
          />
          <MonoLabel color="var(--txt3)" size={11} margin={false}>
            {typeLabels[m.type]}
          </MonoLabel>
          <span style={{ fontSize: 12, color: "var(--txt3)" }}>·</span>
          <MonoLabel color="var(--txt3)" size={11} margin={false}>
            {m.place}
          </MonoLabel>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: isMobile ? 6 : 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: isMobile ? 18 : 20,
              fontWeight: 500,
              color: "var(--txt)",
            }}
          >
            {m.time}
          </div>
          <div
            style={{
              fontSize: isMobile ? 15 : 16,
              fontWeight: 500,
              color: "var(--txt)",
            }}
          >
            {m.title}
          </div>
        </div>

        {/* Detail grid: stacked rows on mobile, two-column on desktop. */}
        <div
          style={
            isMobile
              ? {
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  fontSize: 14,
                  lineHeight: 1.6,
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  gap: "10px 16px",
                  fontSize: 14,
                  lineHeight: 1.6,
                }
          }
        >
          <DetailRow label="What" labelColor="var(--txt3)" isMobile={isMobile}>
            <div style={{ color: "var(--txt2)" }}>{m.what}</div>
          </DetailRow>
          {m.friction && (
            <DetailRow
              label="Friction"
              labelColor="var(--txt3)"
              isMobile={isMobile}
            >
              <div style={{ color: "var(--txt2)" }}>{m.friction}</div>
            </DetailRow>
          )}
          {m.fix && (
            <DetailRow
              label="Design fix"
              labelColor="var(--point2)"
              isMobile={isMobile}
            >
              <div style={{ color: "var(--txt)" }}>{m.fix}</div>
            </DetailRow>
          )}{" "}
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            background: "var(--bg2)",
            borderRadius: 4,
            padding: "1rem",
          }}
        >
          <MonoLabel color="var(--txt3)" size={11}>
            Apps switched
          </MonoLabel>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "var(--txt)",
              marginTop: 4,
            }}
          >
            {m.apps.length}
          </div>
        </div>
        <div
          style={{
            background: "var(--bg2)",
            borderRadius: 4,
            padding: "1rem",
          }}
        >
          <MonoLabel color="var(--txt3)" size={11}>
            Context switches up until now
          </MonoLabel>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "var(--txt)",
              marginTop: 4,
            }}
          >
            {getCumulativeSwitches(defaultMoments, active)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          fontSize: 12,
          color: "var(--txt2)",
          alignItems: "center",
        }}
      >
        {Object.keys(typeLabels).map((t) => (
          <span
            key={t}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: typeColors[t],
              }}
            />
            {typeLabels[t]}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * One row inside the detail grid.
 * On mobile, stacks the label above the content with a small gap.
 * On desktop, the label sits in the fixed left column of a 2-col grid (parent handles layout).
 */
const DetailRow = ({ label, labelColor, isMobile, children }) => {
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <MonoLabel color={labelColor} size={11} margin={false}>
          {label}
        </MonoLabel>
        {children}
      </div>
    );
  }
  return (
    <>
      <MonoLabel color={labelColor} size={11} margin={false}>
        {label}
      </MonoLabel>
      {children}
    </>
  );
};

export default TwentyJourneyMap;
