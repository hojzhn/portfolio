import React, { useEffect, useRef, useState } from "react";
import data from "./backer.json";
import EuroAmount from "./EuroAmount";
import { AnimatePresence, motion } from "framer-motion";

const tokens = data.tokens;

const p = {
  bg: "#ffffff",
  surface: "#efe3f3",
  surface2: "#eadff0",
  border: "#dcdcdc",
  borderStrong: "#d7bfe2",
  text: "#3f284d",
  textSoft: "#8d789b",
  primary: "#a258d0",
  primaryStrong: "#6a3a86",
};

const accent = "font-['NHaas Display']";
const monoLabel = "font-mono text-[10px] uppercase ";
const monoTiny = "font-mono text-[9px] uppercase";
const AppFooterNav = () => {
  const items = [
    ["home", "fas fa-house"],
    ["discover", "fas fa-compass"],
    ["favorites", "fas fa-bookmark"],
    ["dashboard", "fas fa-chart-line"],
  ];

  return (
    <div
      style={{
        background: p.bg,
        borderTop: `1px solid ${p.border}`,
      }}
      className="absolute bottom-0 left-0 right-0 z-40 grid grid-cols-4 px-2 pt-2 pb-6"
    >
      {items.map(([label, icon]) => {
        const isActive = label === "dashboard";

        return (
          <button
            key={label}
            style={{
              color: isActive ? p.primary : p.textSoft,
            }}
            className="flex items-center justify-center pb-6"
          >
            <i className={`${icon} text-sm`} />
          </button>
        );
      })}
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <div style={{ color: p.primaryStrong }} className={monoLabel}>
    {children}
  </div>
);

const Label = ({ children }) => (
  <div style={{ color: p.textSoft }} className={monoTiny}>
    {children}
  </div>
);
const Num = ({ value, className = "" }) => {
  const str = String(value);
  const match = str.match(/^([^\d]*)([\d,]+)(\.\d+)?(.*)$/);
  if (!match) return <span className={className}>{value}</span>;

  const [, pre, int, dec = "", post] = match;

  return (
    <span className={className}>
      {pre}
      {int}
      {dec && (
        <span style={{ color: p.textSoft }} className="text-[0.65em] ml-[1px]">
          {dec}
        </span>
      )}
      {post}
    </span>
  );
};

const valueOf = (s) => {
  if (s.phase === "holding") return s.mkt ?? s.cost;
  if (s.phase === "settled") return s.paid ?? s.cost;
  return s.cost;
};

const fmtPct = (n) => `${Math.round(n)}%`;

const Header = () => (
  <div
    className="sticky top-0 z-30 text-white"
    style={{ background: p.primary }}
  >
    <div className="pt-12 pb-4 px-6 flex items-center justify-between">
      <span className="text-2xl">≡</span>
      <div className=" text-xs tracking-[0.22em]">DASHBOARD · BACKER</div>
      <span className="text-xl">…</span>
    </div>
  </div>
);

const Section = ({ children, className = "", style }) => (
  <section
    style={{ borderColor: p.border, ...style }}
    className={`px-7 border-b ${className}`}
  >
    {children}
  </section>
);

const NavTabs = ({ active, setActive }) => {
  const tabs = [
    ["ledger", "LEDGER", "fas fa-table-list"],
    ["allocation", "ALLOCATION", "fas fa-chart-pie"],
    ["studio", "STUDIO", "fas fa-hammer"],
  ];

  return (
    <Section
      className="py-4"
      style={{
        background: p.surface,
      }}
    >
      <div
        style={{ borderColor: p.borderStrong }}
        className="grid grid-cols-3 border"
      >
        {tabs.map(([key, title, icon]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              borderColor: active === key ? p.primary : p.borderStrong,
              color: active === key ? p.primary : p.textSoft,
              background: active === key ? "#fff" : "transparent",
            }}
            className={`${active === key ? "border" : "border-r"} last:border-r-0 flex items-center gap-2 p-3`}
          >
            <i className={`${icon} text-[12px]`} />

            <div className="font-mono text-[10px] tracking-[0.08em]">
              {title}
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
};

const Summary = ({ active, scrollY = 0 }) => {
  const portfolioValue = data.stakes.reduce((sum, s) => sum + valueOf(s), 0);
  const costBasis = data.stakes.reduce((sum, s) => sum + s.cost, 0);

  const unrealized = data.stakes
    .filter((s) => s.phase === "holding")
    .reduce((sum, s) => sum + ((s.mkt ?? s.cost) - s.cost), 0);

  const realized = data.stakes
    .filter((s) => s.phase === "settled")
    .reduce((sum, s) => sum + ((s.paid ?? s.cost) - s.cost), 0);

  const pl = unrealized + realized;

  const phaseCounts = ["funding", "holding", "settled"].map((phase) => ({
    phase,
    count: data.stakes.filter((s) => s.phase === phase).length,
    label: data.phases[phase]?.label || phase,
    color: data.phases[phase]?.dot || p.primary,
  }));

  const totalCount = data.stakes.length;
  const total = data.stakes.reduce((sum, s) => sum + valueOf(s), 0);

  const byArtist = data.stakes.map((s) => ({
    label: s.artist,
    sub: s.work,
    value: valueOf(s),
    pct: (valueOf(s) / total) * 100,
  }));

  const hasSummary = active !== "studio";

  return (
    <motion.div
      layout
      animate={{
        height: hasSummary ? "auto" : 0,
        opacity: hasSummary ? 1 : 0,
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ overflow: "hidden" }}
    >
      {hasSummary && (
        <Section className={active === "ledger" ? "py-5" : "py-4"}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
            >
              {active === "ledger" && (
                <>
                  <Label>PORTFOLIO VALUE · {data.stakes.length} WORKS</Label>

                  <div className="flex items-end gap-3 mt-2">
                    <div className={`${accent} text-4xl leading-none`}>
                      <EuroAmount
                        value={portfolioValue}
                        Num={Num}
                        p={p}
                        digits={0}
                      />
                    </div>

                    <div
                      style={{ color: p.primary }}
                      className="font-mono text-sm"
                    >
                      +
                      <EuroAmount
                        value={pl}
                        Num={Num}
                        p={p}
                        digits={0}
                        plain
                      />{" "}
                      ▲
                    </div>
                  </div>

                  <div
                    style={{ borderColor: p.border }}
                    className="grid grid-cols-3 border mt-4"
                  >
                    {[
                      ["COST BASIS", costBasis, "what you paid"],
                      ["UNREALIZED", unrealized, "mark-to-market"],
                      ["REALIZED", realized, "2 works"],
                    ].map(([label, value, sub]) => (
                      <div
                        key={label}
                        style={{ borderColor: p.border }}
                        className="border-r last:border-r-0 p-3"
                      >
                        <Label>{label}</Label>

                        <div className={`${accent} text-xl`}>
                          <EuroAmount
                            value={value}
                            Num={Num}
                            p={p}
                            digits={0}
                          />
                        </div>

                        <div
                          style={{ color: p.textSoft }}
                          className="font-mono text-[10px] mt-1"
                        >
                          {sub}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="h-1.5 flex">
                      {phaseCounts.map((item) => (
                        <div
                          className="border-r"
                          key={item.phase}
                          style={{
                            borderColor: p.bg,
                            width: `${(item.count / totalCount) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      ))}
                    </div>

                    <div
                      style={{ color: p.textSoft }}
                      className="flex flex-wrap gap-x-4 gap-y-1 mt-2 font-mono text-[10px] uppercase"
                    >
                      {phaseCounts.map((item) => (
                        <div
                          key={item.phase}
                          className="flex items-center gap-1"
                        >
                          <span style={{ color: item.color }}>■</span>
                          <span>
                            {item.phase.toUpperCase()} · {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {active === "allocation" && (
                <>
                  <Label>COMPOSITION</Label>
                  <div className={`${accent} text-2xl leading-tight mt-2`}>
                    <span style={{ color: p.primary }}>
                      {fmtPct(byArtist[0].pct)}
                    </span>{" "}
                    of your value sits with
                    <br />
                    {byArtist[0].label}
                  </div>

                  <div
                    style={{ color: p.textSoft }}
                    className={`${accent}  text-xs font-mono mt-3`}
                  >
                    €420 across 1 work
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </Section>
      )}
    </motion.div>
  );
};
const Ledger = ({ active, setActive }) => (
  <>
    <Section className="p-0" style={{ padding: 0 }}>
      {data.stakes.map((s) => (
        <div
          key={s.work}
          style={{
            borderColor: s.phase === "settled" ? p.borderStrong : p.border,
            background: s.phase === "settled" ? p.surface2 : "",
          }}
          className="py-3 px-7 border-b last:border-b-0"
        >
          <div className="flex justify-between gap-4">
            <div>
              <div className={`${accent} text-base leading-tight`}>
                {s.work}
              </div>
              <div style={{ color: p.textSoft }} className="text-[11px]">
                <span className="underline decoration-dotted underline-offset-4">
                  {s.artist}
                </span>{" "}
                <span className={monoLabel}> · {s.when} </span>
              </div>
            </div>
            <div
              style={{ color: data.phases[s.phase]?.dot || p.primary }}
              className="font-mono text-[10px]  uppercase"
            >
              ● {s.phase}
            </div>
          </div>

          {s.phase === "funding" && (
            <>
              <div className={`${accent} text-base flex items-end gap-1 mt-2`}>
                <EuroAmount value={s.cost} Num={Num} p={p} digits={0} />

                <div
                  className={`flex row items-end relative top-0.5 ${monoLabel}`}
                >
                  staked → <span className="font-bold mx-2">{s.share}%</span> at
                  close
                </div>
              </div>
              <div className="h-1" style={{ background: p.surface2 }}>
                <div
                  className="h-full"
                  style={{ width: `${s.funded}%`, background: p.text }}
                />
              </div>
              <div
                style={{ color: p.textSoft }}
                className="font-mono text-[10px] mt-1"
              >
                {s.funded}% funded
              </div>
            </>
          )}

          {s.phase === "holding" && (
            <div
              style={{ borderColor: p.border }}
              className="grid grid-cols-3 border mt-2"
            >
              <div className="p-2 border-r" style={{ borderColor: p.border }}>
                <Label>Cost</Label>
                <div className={`${accent} text-base`}>
                  <EuroAmount value={s.cost} Num={Num} p={p} digits={0} />
                </div>
              </div>
              <div
                className="p-2 border-r"
                style={{ borderColor: p.border, background: p.surface2 }}
              >
                <Label>Market</Label>
                <div
                  className={`${accent} text-base flex flex-row gap-1 items-end`}
                >
                  <EuroAmount value={s.mkt} Num={Num} p={p} digits={0} />
                  <div
                    style={{ color: p.primary }}
                    className="font-mono text-[10px] top-0.5 relative"
                  >
                    {s.mktChange > 0 ? "+" : ""}
                    {s.mktChange}%
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Label>Est. payout</Label>
                <div className={`${accent} text-base`}>
                  <EuroAmount value={s.estLow} Num={Num} p={p} digits={0} /> -{" "}
                  <EuroAmount value={s.estHigh} Num={Num} p={p} digits={0} />
                </div>
              </div>
            </div>
          )}

          {s.phase === "settled" && (
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-1 mt-2">
                <EuroAmount
                  value={60}
                  Num={Num}
                  p={p}
                  digits={0}
                  className="text-xs opacity-60 line-through"
                />{" "}
                <span className="text-[10px]"> → </span>
                <EuroAmount value={s.paid} Num={Num} p={p} digits={0} />
                <div
                  className={`${monoLabel} relative top-0.5`}
                  style={{ color: p.primary }}
                >
                  +{((s.paid / 60 - 1) * 100).toFixed(1)}%
                </div>
              </div>
              <div className={`${monoLabel} font-bold`}>Paid Out</div>
            </div>
          )}
        </div>
      ))}
    </Section>
  </>
);

const Allocation = ({ active, setActive }) => {
  const total = data.stakes.reduce((sum, s) => sum + valueOf(s), 0);
  const getEventMeta = (e) =>
    data.systemEvents[e.sys] || {
      label: e.kind || "Update",
      tone: p.primary,
    };
  const byArtist = data.stakes.map((s) => ({
    label: s.artist,
    sub: s.work,
    value: valueOf(s),
    pct: (valueOf(s) / total) * 100,
  }));

  return (
    <>
      <Section className="py-4">
        <div className="flex gap-2 mb-5">
          {["ARTIST", "REGION", "MEDIUM", "STAGE", "PHASE"].map((x, i) => (
            <button
              key={x}
              style={{
                borderColor: p.borderStrong,
                background: i === 0 ? p.primary : "transparent",
                color: i === 0 ? "#fff" : p.textSoft,
              }}
              className={`border px-3 py-1 font-mono text-[10px] ${i === 0 && "font-bold"}`}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="h-8 flex mb-0">
          {byArtist.map((item, i) => (
            <div
              key={item.label}
              className="h-full flex items-center justify-center text-white font-mono text-[10px]"
              style={{
                width: `${item.pct}%`,
                background: [
                  p.primary,
                  p.primaryStrong,
                  "#7d7182",
                  "#c4a4d7",
                  p.text,
                ][i],
              }}
            >
              {Math.round(item.pct)}%
            </div>
          ))}
        </div>

        <div
          className="flex justify-between font-mono text-[10px]"
          style={{ color: p.textSoft }}
        >
          <span>0</span>
          <span>€{Math.round(total).toLocaleString()}</span>
        </div>
      </Section>

      <Section className="p-0" style={{ padding: 0 }}>
        {byArtist.map((item, i) => (
          <div
            key={item.label}
            style={{ borderColor: p.border }}
            className="px-7 py-4 border-b last:border-b-0"
          >
            <div className="flex gap-4 items-start">
              <span
                style={{
                  color: [
                    p.primary,
                    p.primaryStrong,
                    "#7d7182",
                    "#c4a4d7",
                    p.text,
                  ][i],
                }}
              >
                ■
              </span>
              <div className="flex-1">
                <div className={`${accent} text-base leading-tight`}>
                  {item.label}
                </div>
                <div
                  style={{ color: p.textSoft }}
                  className="font-mono text-[10px] "
                >
                  €{Math.round(item.value)} · 1 work
                </div>
                <div className={`${accent} text-xs mt-2`}>{item.sub}</div>
              </div>
              <div
                style={{ color: p.primary }}
                className={`${accent} text-base text-right`}
              >
                {Math.round(item.pct)}%
              </div>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
};
const getEventMeta = (e) =>
  data.systemEvents[e.sys] || {
    label: e.kind || "Update",
    tone: p.primary,
  };
const Studio = ({ active, setActive }) => (
  <>
    <Section>
      <div className="flex flex-wrap gap-2 my-4">
        {["ALL", "ARTIST UPDATES", "SYSTEM"].map((x, i) => (
          <button
            key={x}
            style={{
              borderColor: p.borderStrong,
              background: i === 0 ? p.primary : "transparent",
              color: i === 0 ? "#fff" : p.textSoft,
            }}
            className={`font-bold border px-3 py-1 font-mono text-[10px]`}
          >
            {x}
          </button>
        ))}
        <div className="border-l"></div>
        {[...data.stakes.map((s) => s.work)].map((x) => (
          <button
            key={x}
            style={{ borderColor: p.borderStrong, color: p.textSoft }}
            className={`border px-3 py-1 text-[10px]`}
          >
            {x}
          </button>
        ))}
      </div>
    </Section>
    <Section style={{ padding: 0 }}>
      <div className="flex justify-between px-7 pt-4">
        <SectionTitle>UPCOMING · NEXT 90 DAYS</SectionTitle>
        <button
          style={{ color: p.primary }}
          className="font-mono text-[10px] underline"
        >
          HIDE
        </button>
      </div>

      {data.studioLog.upcoming.map((e) => {
        const meta = getEventMeta(e);

        return (
          <div
            key={`${e.date}-${e.note}`}
            className="grid grid-cols-[60px_1fr] gap-4 pt-5  border-b"
          >
            <div className="text-right">
              <div className={`${accent} text-xl`}>{e.date.split(" ")[1]}</div>
              <div
                style={{ color: p.textSoft }}
                className="font-mono text-[10px]"
              >
                {e.dayLabel}
              </div>
            </div>

            <div
              style={{ borderColor: meta.tone }}
              className="border-l pl-5 relative pb-5"
            >
              <div
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white"
                style={{ borderColor: meta.tone }}
              />

              <div>
                <span
                  style={{ borderColor: meta.tone, color: meta.tone }}
                  className="border px-2 py-1 font-mono text-[10px]"
                >
                  {meta.label.toUpperCase()}
                </span>

                <span
                  style={{ color: p.textSoft }}
                  className="font-mono text-[10px] ml-2"
                >
                  SYSTEM
                </span>
              </div>

              <div className={`${accent} text-xs mt-1`}>{e.note}</div>
            </div>
          </div>
        );
      })}
    </Section>
    <Section style={{ padding: 0 }}>
      <div className="px-7 pt-4">
        <SectionTitle>TIMELINE</SectionTitle>
      </div>
      {data.studioLog.log.map((e, i) => {
        const meta = getEventMeta(e);
        const isSystem = e.kind === "system";

        const month = e.date.split(" ")[0];
        const prevMonth =
          i > 0 ? data.studioLog.log[i - 1].date.split(" ")[0] : null;
        const showMonthMarker = i === 0 || month !== prevMonth;
        return (
          <React.Fragment key={`${e.date}-${e.stage || e.note}`}>
            {showMonthMarker && (
              <div
                style={{
                  borderColor: p.border,
                  color: p.textSoft,
                }}
                className="px-7 mt-4 font-mono text-[10px] uppercase flex flex-row items-center gap-2"
              >
                {month}
                <div className="border-t h-1 w-full" />
              </div>
            )}
            <div
              style={{ borderColor: p.border }}
              className="grid grid-cols-[60px_1fr] gap-4 pt-5 border-b"
            >
              <div className="text-right">
                <div className={`${accent} text-xl`}>
                  {e.date.split(" ")[1]}
                </div>
                <div
                  style={{ color: p.textSoft }}
                  className="font-mono text-[10px]"
                >
                  {e.day}
                </div>
              </div>

              <div
                style={{ borderColor: isSystem ? meta.tone : p.borderStrong }}
                className="border-l pl-5 pr-4 relative pb-5 flex flex-row"
              >
                <div className="flex-1">
                  <div
                    className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: meta.tone,
                      backgroundColor: isSystem ? "#fff" : meta.tone,
                    }}
                  />

                  <div
                    style={{ color: isSystem ? meta.tone : p.primary }}
                    className="font-mono text-[10px] uppercase"
                  >
                    {isSystem ? (
                      <div>
                        <span
                          style={{ borderColor: meta.tone, color: meta.tone }}
                          className="border px-2 py-1 font-mono text-[10px]"
                        >
                          {meta.label.toUpperCase()}
                        </span>

                        <span
                          style={{ color: p.textSoft }}
                          className="font-mono text-[10px] ml-2"
                        >
                          SYSTEM
                        </span>
                      </div>
                    ) : (
                      <div
                        style={{ color: p.primary }}
                        className="font-mono text-[10px] uppercase"
                      >
                        {e.stage}
                      </div>
                    )}
                  </div>

                  <div className={`${accent} text-xs mt-2`}>
                    {e.work} · {e.artist}
                  </div>

                  <p
                    style={{ color: p.textSoft }}
                    className="text-[10px] leading-[1.5] mt-2"
                  >
                    {e.body || e.note}
                  </p>
                </div>
                {e.thumb && (
                  <div
                    className="w-14 h-14 pt-1 flex-0"
                    style={{ background: p.surface }}
                  ></div>
                )}
              </div>
            </div>{" "}
          </React.Fragment>
        );
      })}
    </Section>
  </>
);

export default function RathouseMockup() {
  const [active, setActive] = useState("ledger");
  const scrollRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "instant", // or "smooth"
      });
    }
  }, [active]);
  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col"
      style={{ background: p.bg, color: p.text }}
    >
      <Header />
      <Summary active={active} scrollY={scrollY} />
      <NavTabs active={active} setActive={setActive} />
      <div
        ref={scrollRef}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
        className="flex-1 min-h-0 overflow-y-auto pb-[60px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {active === "ledger" && (
              <Ledger active={active} setActive={setActive} />
            )}
            {active === "allocation" && (
              <Allocation active={active} setActive={setActive} />
            )}
            {active === "studio" && (
              <Studio active={active} setActive={setActive} />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="h-12" />
      </div>
      <AppFooterNav />
    </div>
  );
}
