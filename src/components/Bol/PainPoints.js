import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const painPoints = [
  {
    tag: "Structure",
    title: "Flat representation hides structure",
    problem:
      "Most recipe apps flatten ingredients and instructions into lists, obscuring how cooking actually works. Dishes are built in phases, and outcomes depend on relationships between those phases.",
    solution:
      "Bol defines recipes as compositions of blocks. Each block contains ingredient lines with quantitative attributes, computed across the full recipe. This keeps phase structure explicit while preserving system-level ratios.",
  },
  {
    tag: "Units",
    title: "Unit systems create friction",
    problem:
      "Cooks move between weight, volume, and regional formats. Switching units introduces error, especially during scaling.",
    solution:
      "Bol implements a dual-layer conversion system. Ingredients can be expressed in metric values or kitchen-friendly formats such as fractions. Each ingredient defines its preferred unit and conversion rules, and the interface renders values accordingly.",
  },
  {
    tag: "Editing",
    title: "Editing lacks controlled variation",
    problem:
      "Existing tools either enforce fixed ratios or allow free edits without structure, forcing manual recalculation.",
    solution:
      "Bol treats changes as explicit operations on the model. Users can scale at different scopes while preserving ratios, override values when needed, and lock specific lines. Reordering updates structural relationships, not just visual position.",
  },
  {
    tag: "Ingredients",
    title: "Ingredient data is fragmented",
    problem:
      "Ingredients are duplicated across recipes, leading to inconsistency and no shared structure.",
    solution:
      "Bol separates ingredient definition from usage. Each line references a global ingredient record, organized through pantry shelves. This creates a single source of truth and consistent metadata across contexts.",
  },
  {
    tag: "Iteration",
    title: "Iteration is not tracked",
    problem:
      "Recipe development is iterative, but most tools treat each attempt as isolated. Changes are not tracked systematically, and comparing or reverting versions is manual.",
    solution:
      "Bol introduces iteration as a first-class concept. Each recipe can exist as multiple versions under a shared identity. Users can create new iterations, compare states, and revert when needed. This treats recipe development as a sequence of controlled revisions rather than disconnected edits.",
  },
];

/* ════════════════════════════════════════════════════════════
   PainTag — small accent-tinted pill
   ════════════════════════════════════════════════════════════ */

function PainTag({ index, label }) {
  return (
    <span
      className="inline-block font-mono text-[0.8em] tracking-[0.14em] uppercase px-2 py-1 rounded mb-4"
      style={{
        color: "var(--point)",
        background: "color-mix(in srgb, var(--point) 8%, transparent)",
        border: "1px solid color-mix(in srgb, var(--point) 28%, transparent)",
      }}
    >
      {String(index + 1).padStart(2, "0")}
      {label ? ` · ${label}` : ""}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   DetailContent — left / right (Problem / Response) grid
   ════════════════════════════════════════════════════════════ */

function DetailContent({
  item,
  index,
  problemLabel = "Problem",
  responseLabel = "Response",
}) {
  return (
    <div>
      {item.tag && <PainTag index={index} label={item.tag} />}
      <div className="grid gap-8 lg:grid-cols-1">
        {item.problem && (
          <div>
            <div
              className="font-mono text-[0.8em] tracking-[0.16em] uppercase mb-2"
              style={{ color: "var(--txt3)" }}
            >
              {problemLabel}
            </div>
            <p className="leading-[1.65]" style={{ color: "var(--txt)" }}>
              {item.problem}
            </p>
          </div>
        )}

        {item.solution && (
          <div>
            <div
              className="font-mono text-[0.8em] tracking-[0.16em] uppercase mb-2"
              style={{ color: "var(--point)" }}
            >
              {responseLabel}
            </div>
            <p className="leading-[1.65]" style={{ color: "var(--txt)" }}>
              {item.solution}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DesktopDetailPanel({ item, index, problemLabel, responseLabel }) {
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <DetailContent
        item={item}
        index={index}
        problemLabel={problemLabel}
        responseLabel={responseLabel}
      />
    </motion.div>
  );
}

function MobileExpandablePanel({ item, index, problemLabel, responseLabel }) {
  return (
    <motion.div
      key={item.title}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.2 },
      }}
      className="overflow-hidden"
    >
      <motion.div
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -6, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[var(--bg2)] border border-[var(--point)] rounded-lg p-6 my-4"
      >
        <DetailContent
          item={item}
          index={index}
          problemLabel={problemLabel}
          responseLabel={responseLabel}
        />
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   TabButton — vertical side-nav with left-border indicator
   ════════════════════════════════════════════════════════════ */

function TabButton({ item, index, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full py-4 transition-colors duration-200"
      style={{
        borderLeft: `2px solid ${isActive ? "var(--point)" : "var(--bg2)"}`,
        paddingLeft: "1.25em",
        background: "transparent",
      }}
      aria-pressed={isActive}
    >
      <div
        className="font-mono text-[0.8em] tracking-[0.14em] uppercase mb-1 transition-colors"
        style={{ color: isActive ? "var(--point)" : "var(--txt3)" }}
      >
        {String(index + 1).padStart(2, "0")}
        {item.tag ? ` · ${item.tag}` : ""}
      </div>
      <div
        className="leading-[1.4] transition-colors"
        style={{
          color: isActive ? "var(--txt)" : "var(--txt2)",
          fontWeight: isActive ? 500 : 400,
        }}
      >
        {item.title}
      </div>
    </button>
  );
}

/* ════════════════════════════════════════════════════════════
   Main component
   ════════════════════════════════════════════════════════════ */

export default function PainPointsInteractive({
  items = painPoints,
  problemLabel = "Problem",
  responseLabel = "Response",
}) {
  const [index, setIndex] = useState(0);
  const currentItem = items[Math.min(index, items.length - 1)];

  return (
    <div className="grid gap-10 lg:gap-12 lg:grid-cols-[20em_minmax(0,1fr)]">
      {/* Tab list */}
      <div className="flex flex-col">
        {items.map((item, i) => {
          const isActive = i === index;
          return (
            <div key={item.title}>
              <TabButton
                item={item}
                index={i}
                isActive={isActive}
                onClick={() => setIndex(i)}
              />

              {/* Mobile: inline expandable detail */}
              <div className="lg:hidden">
                <AnimatePresence initial={false}>
                  {isActive && (
                    <MobileExpandablePanel
                      item={item}
                      index={i}
                      problemLabel={problemLabel}
                      responseLabel={responseLabel}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop detail panel */}
      <div className="hidden lg:block lg:pt-2">
        <div className="bg-[var(--bg2)] border border-[var(--point)] rounded-lg p-6">
          <AnimatePresence mode="wait">
            <DesktopDetailPanel
              key={currentItem.title}
              item={currentItem}
              index={index}
              problemLabel={problemLabel}
              responseLabel={responseLabel}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
