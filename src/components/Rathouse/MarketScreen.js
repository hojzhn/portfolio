import React, { useState } from "react";
import marketData from "./market.json";
import EuroAmount from "./EuroAmount";
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
};

const t = {
  accent: "arial",
};

const accent = `font-['${t.accent}']`;

const fmtEuro = (n, digits = 2) =>
  `€${Number(n || 0).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;

const fmtIntEuro = (n) => `€${Number(n || 0).toLocaleString()}`;

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
    style={{ color: p.textSoft }}
    className="font-mono text-[11px] tracking-[0.22em]"
  >
    {children}
  </div>
);
const Header = ({ onBack, scrolled }) => (
  <div className="absolute top-0 left-0 right-0 z-30" style={{ color: p.text }}>
    <div
      style={{
        backgroundColor: p.bg,
        borderBottom: scrolled
          ? `1px solid ${p.border}`
          : "1px solid transparent",
      }}
      className={`absolute inset-0 transition-transform duration-300 ease-out ${
        scrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    />

    <div className="relative pt-12 pb-4 flex items-center justify-between px-6">
      <button onClick={onBack} className="text-3xl leading-none">
        ‹
      </button>

      <div
        className={`text-xs tracking-[0.35em] transition-opacity duration-200 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        RH:HALV-26
      </div>

      <span className="text-xl">…</span>
    </div>
  </div>
);

const StatGrid = () => {
  const bestBid = marketData.orderBook.bids[0];
  const bestAsk = marketData.orderBook.asks[0];

  const stats = [
    ["BID", fmtEuro(bestBid.price)],
    ["ASK", fmtEuro(bestAsk.price)],
    ["24H VOL", `${marketData.quote.volume24h} units`],
    ["LISTED", marketData.orderBook.asks.length],
  ];

  return (
    <div
      style={{ borderColor: p.border }}
      className="grid grid-cols-4 border-b"
    >
      {stats.map(([label, value]) => (
        <div
          key={label}
          style={{ borderColor: p.border }}
          className="border-r last:border-r-0 p-4 text-center"
        >
          <div
            style={{ color: p.textSoft }}
            className="font-mono text-[10px]  mb-2"
          >
            {label}
          </div>

          <div
            style={{ color: label === "LISTED" ? p.primary : p.text }}
            className="text-sm"
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

const CandleChart = ({ range, setRange }) => {
  const candles = marketData.ranges[range];
  const values = candles.flatMap((d) => [d.high, d.low]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const height = 150;

  const y = (value) => {
    if (max === min) return height / 2;
    return height - ((value - min) / (max - min)) * height;
  };

  const sample =
    range === "90d" ? candles.filter((_, i) => i % 6 === 0) : candles;

  return (
    <Section>
      <div className="flex justify-between items-center mb-5">
        <SectionTitle>RESALE PRICE · {range.toUpperCase()}</SectionTitle>
        <div className="flex gap-1 font-mono text-[10px]">
          {["24h", "30d", "90d"].map((x) => (
            <button
              key={x}
              onClick={(e) => {
                e.stopPropagation();
                setRange(x);
              }}
              style={{
                borderColor: p.border,
                backgroundColor: x === range ? p.primary : "transparent",
                color: x === range ? "#fff" : p.textSoft,
              }}
              className="border px-2 py-1 transition-all duration-200 active:scale-95"
            >
              {x.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[190px]">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{ top: `${i * 34 + 8}px`, borderColor: p.border }}
            className="absolute left-0 right-0 border-t"
          />
        ))}

        <div className="absolute inset-x-0 top-0 h-[150px] flex items-end justify-between">
          {sample.map((d, i) => {
            const up = d.close >= d.open;
            const highY = y(d.high);
            const lowY = y(d.low);
            const openY = y(d.open);
            const closeY = y(d.close);
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(4, Math.abs(closeY - openY));

            return (
              <div key={d.date || d.t} className="relative w-3 h-[150px]">
                <div
                  className="absolute left-1/2 w-[2px] -translate-x-1/2 transition-all duration-300 ease-out"
                  style={{
                    top: highY,
                    height: lowY - highY,
                    backgroundColor: p.textSoft,
                  }}
                />

                <div
                  className="absolute left-0 right-0 transition-all duration-300 ease-out"
                  style={{
                    top: bodyTop,
                    height: bodyHeight,
                    backgroundColor: up ? p.primary : p.text,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{ color: p.textSoft }}
          className="absolute bottom-0 left-0 right-0 flex justify-between font-mono text-[10px]"
        >
          <span>{range === "90d" ? "Jan 25" : "Mar 26"}</span>
          <span>{range === "90d" ? "Mar 10" : "Apr 10"}</span>
          <span>Apr 24</span>
        </div>
      </div>
    </Section>
  );
};

const AskBook = () => (
  <Section>
    <div className="flex justify-between">
      <SectionTitle>HOLDERS SELLING</SectionTitle>
    </div>

    {marketData.orderBook.asks.map((ask, i) => (
      <div
        key={ask.price}
        style={{ borderColor: p.border }}
        className="grid grid-cols-[82px_1fr_64px] gap-3 items-center py-4 border-b last:border-b-0"
      >
        <div>
          <div className={`${accent} text-2xl leading-none`}>
            <EuroAmount value={ask.price} Num={Num} p={p} />
          </div>
          <div
            style={{ color: p.primary }}
            className="font-mono text-[10px] mt-1"
          >
            +{Math.round(((ask.price - 38) / 38) * 100)}%
          </div>
        </div>

        <div>
          <div className={`${accent} text-base leading-tight`}>
            {[
              "M. Pelletier",
              "S. Sung",
              "A. Okwu",
              "V. Sarmiento",
              "I. Reyes",
              "L. Dube",
              "P. Chen",
            ][i] || "Holder"}
          </div>
          <div
            style={{ color: p.textSoft }}
            className="font-mono text-[10px] mt-1"
          >
            {ask.shares} shares · held {i + 5}mo
          </div>
        </div>

        <button
          style={{
            borderColor: p.primary,
            backgroundColor: i === 0 ? p.primary : "transparent",
            color: i === 0 ? "#fff" : p.primary,
          }}
          className="border py-3 font-mono text-[10px] tracking-[0.12em]"
        >
          BUY
        </button>
      </div>
    ))}
  </Section>
);

export default function MarketScreen({ onBack = () => {}, phase = "closed" }) {
  const [range, setRange] = useState("30d");
  const [scrolled, setScrolled] = useState(false);
  const q = marketData.quote;
  const proj = marketData.project;
  const bestBid = marketData.orderBook.bids[0];
  const bestAsk = marketData.orderBook.asks[0];

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ backgroundColor: p.bg, color: p.text }}
    >
      <Header onBack={onBack} scrolled={scrolled} />
      <div
        className="h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 80)}
      >
        <Section className="mt-24">
          <div className="flex flex-col">
            <div className="flex flex-row items-end gap-2">
              <div className={`${accent} text-4xl leading-none`}>
                <EuroAmount value={q.last} Num={Num} p={p} />
              </div>

              <div
                style={{ color: p.primary }}
                className="font-mono text-sm font-bold mt-1"
              >
                +{q.changePct30d}% ▲
              </div>
            </div>
            <div className={`${accent} text-sm mt-2`}>
              {proj.title.split(",")[0]} · {proj.artist} · per{" "}
              {proj.sharePctEach.toFixed(2)}% stake
            </div>

            <div
              style={{ color: p.textSoft }}
              className="font-mono text-[10px]"
            >
              vs. €38 issue
            </div>
          </div>
        </Section>
        <div
          style={{ borderColor: p.primary }}
          className="grid grid-cols-[1fr_130px] border-b"
        >
          <div className="p-4">
            <div
              style={{ color: p.primaryStrong }}
              className="font-mono text-[11px]"
            >
              {phase === "closed"
                ? "PRIMARY ISSUANCE · CLOSED"
                : "PRIMARY ISSUANCE · OPEN"}
            </div>
            <div
              style={{ color: p.textSoft }}
              className="font-mono text-[10px] mt-1"
            >
              fully subscribed · {proj.sharesIssued} shares issued
            </div>
          </div>

          <button
            style={{ borderColor: p.primary, color: p.primary }}
            className="m-4 border font-mono text-[10px] tracking-[0.15em]"
          >
            RESALE ↓
          </button>
        </div>
        <StatGrid />
        <CandleChart range={range} setRange={setRange} />
        <AskBook />
        <div className="h-12" />
      </div>
    </div>
  );
}
