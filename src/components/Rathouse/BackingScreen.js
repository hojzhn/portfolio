import React from "react";
import EuroAmount from "./EuroAmount";
const STAKE_UNIT = 38;
const SALE_POOL_PERCENT = 30;
const FUNDING_GOAL = 19000;

const formatEuro = (n) => `€${Number(n || 0).toLocaleString()}`;
const TOTAL_UNITS = 500;
const SHARE_PER_UNIT = 0.1;

const getUnits = (stake) => stake / STAKE_UNIT;
const getShare = (stake) => getUnits(stake) * SHARE_PER_UNIT;
const getShareText = (stake) => `${getShare(stake).toFixed(2)}`;
export default function BackingScreen({
  open,
  onClose,
  stake,
  setStake,
  project,
  p,
  accent,
  Num,
  Section,
  SectionTitle,
}) {
  const safeStake = Number(stake) || STAKE_UNIT;
  const share = getShareText(safeStake);

  const presets = [38, 114, 380, 1520];
  const saleScenarios = [
    ["FLOOR SALE", 32000],
    ["COMP AVG", 46510],
    ["TOP QUARTILE", 55000],
  ];

  const formatNumber = (n) => {
    if (n === "" || n === null || n === undefined) return "";
    return Number(n).toLocaleString();
  };
  const getReturn = (salePrice) =>
    Math.round((getShare(safeStake) / 100) * salePrice);
  return (
    <div
      className={`absolute inset-0 z-40 transition-transform duration-300 ease-out ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ backgroundColor: p.bg, color: p.text }}
    >
      <div className="absolute top-0 left-0 right-0 z-50">
        <div
          style={{
            backgroundColor: p.bg,
          }}
          className="pt-12 pb-3 flex items-center justify-between px-6"
        >
          <button
            onClick={onClose}
            style={{ color: p.text }}
            className="text-2xl leading-none"
          >
            ‹
          </button>

          <div className="w-6" />
        </div>
      </div>

      <div className="h-[calc(100%-92px)] overflow-y-auto pt-16 pb-28">
        <Section>
          <div
            style={{ color: p.textSoft }}
            className="font-mono text-xs tracking-[0.28em] mb-3"
          >
            YOU'RE BACKING
          </div>

          <div className={`${accent} text-base leading-tight`}>
            {project.title}
          </div>

          <div
            style={{ color: p.textSoft }}
            className={`${accent} italic text-xs mt-1`}
          >
            by {project.artist}
          </div>

          <div className="py-8">
            <div className="mx-auto flex justify-center py-2">
              <div
                style={{
                  borderColor: p.borderStrong,
                  backgroundColor: p.bg,
                }}
                className="relative flex items-center justify-center px-5 py-3  transition-all duration-200 focus-within:scale-[1.02]"
              >
                <button
                  type="button"
                  style={{
                    color: p.primary,
                  }}
                  className="mr-1 text-2xl  flex items-center justify-center shrink-0 transition-transform -translate-y-3 duration-150 active:scale-90"
                >
                  €
                </button>

                <input
                  value={formatNumber(stake)}
                  onChange={(e) => {
                    const raw = e.target.value
                      .replace(/[^\d]/g, "")
                      .slice(0, 5);
                    setStake(raw === "" ? "" : Number(raw));
                  }}
                  onBlur={() => {
                    if (stake === "" || Number(stake) < STAKE_UNIT)
                      setStake(STAKE_UNIT);
                  }}
                  inputMode="numeric"
                  style={{
                    color: p.text,
                    backgroundColor: "transparent",
                    width: `${Math.max(2, String(stake || "").length)}ch`,
                  }}
                  className={`${accent} text-[72px] leading-none outline-none text-center`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-6">
            {presets.map((value) => (
              <button
                key={value}
                onClick={() => setStake(value)}
                style={{
                  borderColor: p.borderStrong,
                  backgroundColor:
                    safeStake === value ? p.primary : "transparent",
                  color: safeStake === value ? "#fff" : p.text,
                }}
                className="border py-3 font-mono text-xs"
              >
                €{value}
              </button>
            ))}
          </div>
        </Section>

        <Section>
          <SectionTitle>ESTIMATED SHARE</SectionTitle>

          <div className="grid grid-cols-[120px_1fr] gap-4 items-end mb-6">
            <div className={`${accent} text-5xl leading-none`}>
              <Num value={share} />
              <span className="text-2xl">%</span>
            </div>

            <p className={`${accent} text-xs leading-snug`}>
              of the work’s first official sale price, paid pro-rata at
              acquisition.
            </p>
          </div>

          <div
            style={{ borderColor: p.borderStrong }}
            className="grid grid-cols-3 border"
          >
            {saleScenarios.map(([label, salePrice], i) => {
              const active = label === "COMP AVG";

              return (
                <div
                  key={label}
                  style={{
                    borderColor: p.borderStrong,
                    backgroundColor: active ? p.surface2 : "transparent",
                  }}
                  className={`p-3 ${i < saleScenarios.length - 1 ? "border-r" : ""}`}
                >
                  <div
                    style={{ color: p.textSoft }}
                    className="font-mono text-[8px] tracking-[0.16em] mb-2"
                  >
                    {label}
                  </div>

                  <div className={`${accent} text-sm leading-none mb-3`}>
                    <EuroAmount value={salePrice} Num={Num} p={p} />
                  </div>

                  <div
                    style={{ color: p.textSoft }}
                    className="font-mono text-[8px] tracking-[0.16em] mb-1"
                  >
                    YOU GET
                  </div>

                  <div
                    style={{ color: active ? p.primary : p.text }}
                    className={`${accent} text-2xl leading-none`}
                  >
                    <EuroAmount value={getReturn(salePrice)} Num={Num} p={p} />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section className="border-b-0">
          <p
            style={{ color: p.textSoft }}
            className="font-mono text-xs leading-[1.5]"
          >
            ※ Share applies to first sale to a recognised institution, gallery,
            or collector. Subsequent resales are not tracked. Read the{" "}
            <span className="underline decoration-dotted underline-offset-4">
              full terms
            </span>
            .
          </p>
        </Section>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 px-7 pt-3 pb-6"
        style={{ backgroundColor: p.bg, borderTop: `1px solid ${p.border}` }}
      >
        <button
          style={{ backgroundColor: p.primary }}
          className="w-full text-white py-4 font-bold"
        >
          Confirm stake · {formatEuro(safeStake)}
        </button>
      </div>
    </div>
  );
}
