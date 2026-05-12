import React, { useState } from "react";
import BackingScreen from "./BackingScreen";
import MarketScreen from "./MarketScreen";
import EuroAmount from "./EuroAmount";
const STAKE_UNIT = 38;
const SALE_POOL_PERCENT = 30;
const FUNDING_GOAL = 38000;
const DEV_PHASE = "open"; // "open" | "closed"
const p = {
  bg: "#ffffff",
  surface: "#efe3f3",
  surface2: "#eadff0",
  border: "#dcdcdc",
  borderStrong: "#d7bfe2",
  text: "#3f284d",
  textSoft: "#8d789b",
  textAccent: "#4b2b5e",
  primary: "#a258d0",
  primaryStrong: "#6a3a86",
  overlay: "rgba(45, 24, 56, 0.25)",
};

const t = {
  accent: "arial",
};

const accent = `font-['${t.accent}']`;
const Num = ({ value, prefix = "", suffix = "", className = "" }) => {
  const str = String(value);

  const match = str.match(/^([^\d]*)(\d+)(\.\d+)?(.*)$/);

  if (!match) return <span>{value}</span>;

  const [, pre, int, dec = "", post] = match;

  return (
    <span className={className}>
      {pre || prefix}
      <span>{int}</span>
      {dec && (
        <span style={{ color: p.textSoft }} className="text-[0.7em] ml-[1px]">
          {dec}
        </span>
      )}
      {post || suffix}
    </span>
  );
};
const project = {
  heroImage: "https://i.imgur.com/HTWh43A.png",
  navTitle: "RH:HALV-26",
  artist: "Rin Halverson",
  title: "Salt Cathedral, Hellisheiði",
  caption: "working maquette · feb 2026",
  body: "A six-month installation built from cured basalt salt blocks on the lava plains east of Reykjavík. The work will be shown in Galería Tres Patios’ summer programme before being acquired.",
  raised: 12160,
  goal: 19000,
  funded: "64%",
  price: 38,
  backers: "92",
  change: "+8.3%",
  subtitle: "Salt Cathedral · Halverson · 14d to close",
  stats: [
    ["BID", "€39.20"],
    ["ASK", "€39.60"],
    ["VOL", "€11.5K"],
    ["FLOOR", "€18.0K"],
  ],
  tiers: [
    ["PATRON", "3/4", "0.80%", "€240", "74%"],
    ["BACKER", "38/60", "0.20%", "€60", "63%"],
    ["WITNESS", "142/200", "0.08%", "€25", "70%"],
    ["NOTE", "287/500", "0.03%", "€10", "58%"],
  ],
  fills: [
    ["0:42", "M. Pelletier", "PATRON", "+€240"],
    ["1:18", "A. Okwu", "BACKER", "+€60"],
    ["4:03", "0xc3..f1", "WITNESS", "+€25"],
  ],
};

const Section = ({ children, className = "" }) => (
  <section
    style={{ borderColor: p.border }}
    className={`p-7 border-b ${className}`}
  >
    {children}
  </section>
);

const SectionTitle = ({ children }) => (
  <div
    style={{ color: p.primary }}
    className="font-mono text-xs tracking-[0.28em] mb-5"
  >
    {children}
  </div>
);

const PrimaryButton = ({ children, className = "" }) => (
  <button
    style={{ backgroundColor: p.primary }}
    className={`text-white font-bold ${className}`}
  >
    {children}
  </button>
);
const Header = ({ page, setPage, scrolled }) => (
  <div className="absolute top-0 left-0 right-0 z-20 text-white">
    <div
      style={{ backgroundColor: p.primary }}
      className={`absolute inset-0 transition-transform duration-300 ease-out ${
        scrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    />

    <div className="relative pt-12 pb-4 flex items-center justify-between px-6">
      <button
        onClick={() => setPage(page === "info" ? "market" : "info")}
        className="text-3xl leading-none"
      >
        ‹
      </button>

      <button
        onClick={() => setPage(page === "info" ? "market" : "info")}
        className={`text-xs tracking-[0.35em] transition-opacity duration-200 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        {page === "info" ? "RH:HALV-26" : project.navTitle}
      </button>

      <span className="text-xl">…</span>
    </div>
  </div>
);
const MiniMarketCard = ({ setPage, phase = "open" }) => {
  const closed = phase === "closed";

  const display = closed
    ? {
        raised: 19000,
        goal: 19000,
        funded: "100%",
        backers: "138",
        label: "PRIMARY CLOSED",
        metric: "RESALE PRICE · 0.10%",
        price: 41.8,
        action: "RESALE →",
      }
    : {
        raised: project.raised,
        goal: project.goal,
        funded: project.funded,
        backers: project.backers,
        label: "PRIMARY OPEN",
        metric: "COMP AVG · 0.10%",
        price: 46.51,
        action: "HISTORY →",
      };

  return (
    <div style={{ borderColor: p.primary }} className="border">
      <div className="grid grid-cols-[1fr_150px]">
        <div className="p-4">
          <div className={`${accent} text-3xl leading-none`}>
            <EuroAmount value={display.raised} Num={Num} p={p} />
          </div>
          <div
            style={{ color: p.textSoft }}
            className="font-mono text-[9px] mt-2"
          >
            OF{" "}
            <EuroAmount value={display.goal} Num={Num} p={p} plain digits={0} />{" "}
            · {display.funded}{" "}
          </div>
        </div>

        <div className="p-4 text-right">
          <div className={`${accent} text-3xl leading-none`}>
            {display.backers}
          </div>
          <div
            style={{ color: p.textSoft }}
            className="font-mono text-[9px] mt-2"
          >
            BACKERS
          </div>
        </div>
      </div>

      <div className="relative h-2" style={{ backgroundColor: p.surface2 }}>
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: display.funded, backgroundColor: p.primary }}
        />
      </div>

      <div className="grid grid-cols-[1fr_84px] items-center p-3">
        <div>
          <div style={{ color: p.textSoft }} className="font-mono text-[9px]">
            {display.metric}
          </div>
          <div className={`${accent} text-xl`}>
            <EuroAmount
              value={display.price}
              Num={Num}
              p={p}
              className={`${accent} text-xl`}
            />{" "}
            <span style={{ color: p.primary }} className="font-mono text-xs">
              {" "}
              +0.3% ▲
            </span>
          </div>
        </div>

        <button
          onClick={() => closed && setPage("market")}
          style={{ borderColor: p.primary, color: p.primary }}
          className="border py-2 font-mono text-[10px] tracking-[0.16em]"
        >
          {display.action}
        </button>
      </div>
    </div>
  );
};
const Updates = () => (
  <Section>
    <div className="flex justify-between">
      <SectionTitle>05 STUDIO UPDATES</SectionTitle>
      <div style={{ color: p.textSoft }} className="font-mono text-[10px]">
        3 new
      </div>
    </div>

    {[
      ["Apr 18", "First salt block cured"],
      ["Apr 02", "Site permitting closed"],
      ["Mar 21", "Studio note · the maquette"],
    ].map(([date, title]) => (
      <div
        key={title}
        className="grid grid-cols-[64px_1fr_12px] items-center py-4 border-b last:border-b-0"
        style={{ borderColor: p.border }}
      >
        <div style={{ color: p.textSoft }} className="font-mono text-[10px]">
          {date}
        </div>
        <div
          className={`${accent} text-lg underline decoration-dotted underline-offset-4`}
        >
          {title}
        </div>
        <div style={{ color: p.primary }}>›</div>
      </div>
    ))}
  </Section>
);
const ShareTermsTable = () => {
  const rows = [
    ["Backer pool", "30% of first official sale"],
    ["Total Issuance", "€38,000"],
    ["Unit share", "0.10% of first sale"],
    ["Launch Price", "€38 per unit"],
    ["Payout trigger", "first official sale only"],
    ["Guarantee", "none"],
  ];

  return (
    <Section>
      <SectionTitle>02 SHARE TERMS</SectionTitle>

      <div style={{ borderColor: p.border }} className="grid grid-cols-2 ">
        {rows.map(([label, value], i) => (
          <div key={label} className={`py-3 `}>
            <div
              style={{ color: p.textSoft }}
              className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1"
            >
              {label}
            </div>

            <div className={`${accent} text-xs leading-tight`}>{value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};
const InfoPage = ({ setPage, stake, setStake, phase }) => (
  <>
    <div className="relative h-[330px] border-b overflow-hidden">
      {/* Image */}
      <img
        src={project.heroImage} // pass this in your object
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top gradient for header */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0))",
        }}
      />

      {/* Optional bottom fade (helps caption readability) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0))",
        }}
      />

      {/* Caption */}
      <div
        style={{ color: p.textSoft }}
        className="absolute bottom-3 left-4 bg-white/90 backdrop-blur px-3 py-2 font-mono text-[11px]"
      >
        {project.caption}
      </div>
    </div>
    <Section>
      <div
        style={{ color: p.textSoft }}
        className="font-mono text-xs tracking-[0.2em] mb-3"
      >
        BY{" "}
        <span
          style={{ color: p.text }}
          className="underline decoration-dashed underline-offset-4"
        >
          {project.artist.toUpperCase()}
        </span>
      </div>

      <div className={`${accent} text-4xl leading-tight mb-4`}>
        {project.title}
      </div>

      <p className={`${accent} text-xl leading-[1.45] mb-5`}>{project.body}</p>

      {phase === "open" ? (
        <MiniMarketCard setPage={setPage} phase={phase} />
      ) : (
        <MiniMarketCard setPage={setPage} phase={phase} closed />
      )}
    </Section>
    <Section>
      <SectionTitle>01 ABOUT THIS WORK</SectionTitle>
      <p className={`${accent} text-base leading-[1.45] mb-4`}>
        Halverson’s first outdoor work since the Hellisheiði salt blocks of
        2025. Production runs March to August, then the piece will be routed to
        Tres Patios for primary sale. Funding closes when the goal is met or the
        production window opens, whichever comes first.
      </p>
    </Section>
    <ShareTermsTable />
    <Updates />
    <div className="h-28" />
  </>
);
const BottomBar = ({ setPage, onBuy, phase }) => (
  <div
    className={`absolute bottom-0 left-0 right-0 z-30 grid ${phase === "open" && "grid-cols-[1fr_96px]"} gap-3 px-7 pt-3 pb-6`}
    style={{ backgroundColor: p.bg, borderTop: `1px solid ${p.border}` }}
  >
    <button
      onClick={phase === "open" ? onBuy : () => setPage("market")}
      style={{ backgroundColor: p.primary }}
      className="text-white py-4 font-bold px-4 text-center"
    >
      {phase === "open" ? "Buy" : "Trade resale"}
    </button>

    {phase === "open" && (
      <button
        onClick={() => setPage("market")}
        style={{ borderColor: p.primary, color: p.primary }}
        className="border py-4 font-mono text-[10px] tracking-[0.14em]"
      >
        ↗ MARKET
      </button>
    )}
  </div>
);
export default function ProjectSwitchMockup() {
  const [page, setPage] = useState("info");
  const [scrolled, setScrolled] = useState(false);
  const [stake, setStake] = useState(38);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundColor: p.bg,
        color: p.text,
      }}
    >
      <Header page={page} setPage={setPage} scrolled={scrolled} />

      <div
        className="h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 100)}
      >
        <InfoPage
          setPage={setPage}
          stake={stake}
          setStake={setStake}
          phase={DEV_PHASE}
        />
      </div>
      <div
        className={`absolute inset-0 z-40 transition-transform duration-300 ease-out ${
          page === "market" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MarketScreen phase={DEV_PHASE} onBack={() => setPage("info")} />
      </div>
      {page === "info" && !checkoutOpen && (
        <BottomBar
          setPage={setPage}
          phase={DEV_PHASE}
          onBuy={() => setCheckoutOpen(true)}
        />
      )}

      {DEV_PHASE === "open" && (
        <BackingScreen
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          stake={stake}
          setStake={setStake}
          project={project}
          p={p}
          accent={accent}
          Num={Num}
          Section={Section}
          SectionTitle={SectionTitle}
        />
      )}
    </div>
  );
}
