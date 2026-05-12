import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import GraphicCaption from "../GraphicCaption";
import Toggle from "../Toggle";

const ACCENT_KEY = "revenueShare";

const dataRows = [
  {
    dimension: "Funding source",
    commission: "Single patron",
    crowdfunding: "Many contributors",
    revenueShare: "Many contributors",
  },
  {
    dimension: "Ownership",
    commission: "Patron owns artwork",
    crowdfunding: "Creator retains ownership",
    revenueShare: "Buyer owns artwork",
  },
  {
    dimension: "Contributor return",
    commission: "None (consumption)",
    crowdfunding: "Rewards / goods",
    revenueShare: "Financial return (proceeds share)",
  },
  {
    dimension: "Risk exposure",
    commission: "Patron bears full risk",
    crowdfunding: "Contributors bear low risk",
    revenueShare: "Contributors share financial risk",
  },
  {
    dimension: "Timing of commitment",
    commission: "Before production",
    crowdfunding: "Before production",
    revenueShare: "Before production",
  },
  {
    dimension: "Link to outcome",
    commission: "Ownership of object",
    crowdfunding: "Receipt of reward",
    revenueShare: "Dependent on sale event",
  },
  {
    dimension: "Liquidity",
    commission: "None",
    crowdfunding: "None",
    revenueShare: "None until sale",
  },
  {
    dimension: "Participation scale",
    commission: "High barrier",
    crowdfunding: "Low barrier",
    revenueShare: "Moderate, fractional",
  },
  {
    dimension: "Incentive framing",
    commission: "Patronage",
    crowdfunding: "Support / reward",
    revenueShare: "Capital allocation",
  },
];

const models = [
  { key: "commission", label: "Commission", iconClass: "fa-solid fa-user" },
  {
    key: "crowdfunding",
    label: "Reward Crowdfunding",
    iconClass: "fa-solid fa-users",
  },
  {
    key: "revenueShare",
    label: "Revenue Share",
    iconClass: "fa-solid fa-chart-line",
  },
];

export default function ModelTable() {
  const [selectedModel, setSelectedModel] = useState("commission");
  const selected = models.find((m) => m.key === selectedModel);
  const isAccent = selected.key === ACCENT_KEY;

  const cardVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <div className="my-16">
      <GraphicCaption>Comparison between 3 sales models</GraphicCaption>

      {/* ─── Mobile card ─── */}
      <div className="mt-6 md:hidden">
        <motion.div layout className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedModel}
              layout
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.24,
                ease: "easeOut",
                layout: { duration: 0.28, ease: "easeInOut" },
              }}
              className={
                isAccent ? "bg-[var(--point2)] text-[var(--point3)]" : ""
              }
            >
              {/* Model header */}
              <div
                className={`px-3 py-4 flex items-center gap-3 border-b ${
                  isAccent ? "border-[var(--bg3)]" : "border-[var(--txt3)]"
                }`}
              >
                <i
                  className={`${selected.iconClass} text-[0.9em] ${
                    isAccent ? "text-[var(--point3)]" : "text-[var(--txt2)]"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-mono text-[0.8em] tracking-[0.16em] uppercase ${
                    isAccent ? "text-[var(--point3)]" : "text-[var(--txt2)]"
                  }`}
                >
                  {selected.label}
                </span>
              </div>

              {/* Rows */}
              <div>
                {dataRows.map((row, i) => {
                  const isLast = i === dataRows.length - 1;
                  return (
                    <div
                      key={row.dimension}
                      className={`px-3 py-3 grid grid-cols-[8em_1fr] gap-x-4 ${
                        isLast ? "" : "border-b"
                      } ${
                        isAccent ? "border-[var(--bg3)]" : "border-[var(--bg3)]"
                      }`}
                    >
                      <div
                        className={`font-mono text-[0.8em] tracking-[0.1em] uppercase pt-[0.2em] ${
                          isAccent
                            ? "text-[var(--point3)]"
                            : "text-[var(--txt3)]"
                        }`}
                      >
                        {row.dimension}
                      </div>
                      <div
                        className={`leading-[1.5] ${
                          isAccent
                            ? "text-[var(--point3)]"
                            : "text-[var(--txt)]"
                        }`}
                      >
                        {row[selected.key]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <Toggle
          items={models.map((model) => ({
            label: model.label,
            value: model.key,
          }))}
          value={selectedModel}
          onChange={setSelectedModel}
          className="mt-6"
        />
      </div>

      {/* ─── Desktop table ─── */}
      <div className="hidden md:block mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left px-3 py-3 font-mono font-normal text-[0.8em] tracking-[0.16em] uppercase text-[var(--txt3)] border-b border-[var(--txt3)] w-[14em]">
                Dimension
              </th>

              {models.map((model) => {
                const accent = model.key === ACCENT_KEY;
                return (
                  <th
                    key={model.key}
                    className={`text-left px-4 py-3 font-mono font-normal text-[0.8em] tracking-[0.16em] uppercase border-b ${
                      accent
                        ? "text-[var(--point3)] bg-[var(--point2)] border-[var(--bg3)]"
                        : "text-[var(--txt2)] border-[var(--txt3)]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <i
                        className={`${model.iconClass} not-italic text-[1em]`}
                        aria-hidden="true"
                      />
                      <span>{model.label}</span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {dataRows.map((row, rowIdx) => {
              const isLast = rowIdx === dataRows.length - 1;
              return (
                <tr key={row.dimension}>
                  <th
                    scope="row"
                    className={`px-3 py-3 text-left align-top font-normal font-mono text-[0.8em] tracking-[0.1em] uppercase text-[var(--txt3)] ${
                      isLast ? "" : "border-b border-[var(--bg3)]"
                    }`}
                  >
                    {row.dimension}
                  </th>

                  {models.map((model) => {
                    const accent = model.key === ACCENT_KEY;
                    return (
                      <td
                        key={model.key}
                        className={`px-4 py-3 align-top ${
                          isLast ? "" : "border-b"
                        } ${
                          accent
                            ? "bg-[var(--bg2)] text-[var(--point3)] border-[var(--bg3)]"
                            : "text-[var(--txt)] border-[var(--bg3)]"
                        }`}
                      >
                        {row[model.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
