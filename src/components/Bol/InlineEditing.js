import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import Toggle from "../Toggle";
const recipe = {
  group_order: [1, 2, 3],
  groups: [
    { gr_id: 1, gr_name: "default", gr_children: [] },
    { gr_id: 2, gr_name: "default", gr_children: [] },
    { gr_id: 3, gr_name: "default", gr_children: [] },
  ],
  lines: [
    {
      line_id: 0,
      in_name: "Bread Flour",
      in_desc: "King Arthur",
      type: "flour",
      g: {
        value: 400,
        lock: false,
        unit: "g",
      },
      display_system: "Metric",
      display_style: "Weight",
      note: "",
    },
    {
      line_id: 1,
      in_name: "Dark Rye Flour",
      in_desc: "default",
      type: "flour",
      g: {
        value: 200,
        lock: false,
        unit: "g",
      },
      display_system: "Metric",
      display_style: "Weight",
      note: "",
    },
    {
      line_id: 2,
      in_name: "White Rye Flour",
      in_desc: "default",
      type: "flour",
      g: {
        value: 100,
        lock: false,
        unit: "g",
      },
      display_system: "Metric",
      display_style: "Weight",
      note: "",
    },
    {
      line_id: 3,
      in_name: "Water",
      in_desc: "default",
      type: "normal",
      g: {
        value: 250,
        lock: false,
        unit: "g",
      },
      display_system: "Metric",
      display_style: "Weight",
      note: "",
    },
  ],
};

// keep scaling math raw
// replace old scaleToTarget
const scaleToTarget = (
  memoLines,
  targetGrams,
  _percents,
  baseLineId = null,
) => {
  if (baseLineId == null) {
    // no reference line: scale whole recipe to a target total
    const currentTotal = memoLines.reduce(
      (sum, l) => sum + (parseFloat(l.g.value) || 0),
      0,
    );
    if (currentTotal === 0) return memoLines;
    const factor = targetGrams / currentTotal;

    return memoLines.map((l) => ({
      ...l,
      g: {
        ...l.g,
        value: (parseFloat(l.g.value) || 0) * factor,
      },
    }));
  }

  // reference a specific line
  const baseLine = memoLines.find((l) => l.line_id === baseLineId);
  if (!baseLine) return memoLines;

  const baseValue = parseFloat(baseLine.g.value);
  if (!baseValue || isNaN(baseValue)) return memoLines;

  const factor = targetGrams / baseValue;

  return memoLines.map((l) => ({
    ...l,
    g: {
      ...l.g,
      value: (parseFloat(l.g.value) || 0) * factor,
    },
  }));
};
const scaleToTargetWithLocks = (lines, targetTotal) => {
  const locked = lines.filter((l) => l.g.lock);
  const unlocked = lines.filter((l) => !l.g.lock);

  const lockedSum = locked.reduce(
    (s, l) => s + (parseFloat(l.g.value) || 0),
    0,
  );
  const unlockedSum = unlocked.reduce(
    (s, l) => s + (parseFloat(l.g.value) || 0),
    0,
  );

  const remaining = targetTotal - lockedSum;
  if (remaining <= 0 || unlocked.length === 0) {
    // nothing to scale, just return with locked preserved
    return lines;
  }

  const factor = remaining / (unlockedSum || 1);

  return lines.map((l) => {
    if (l.g.lock) return l;
    const val = parseFloat(l.g.value) || 0;
    return { ...l, g: { ...l.g, value: Math.max(val * factor, 0.1) } };
  });
};

const applyEditingLogic = (lines, changedId, newValue, setPercents) => {
  const editedLine = lines.find((l) => l.line_id === changedId);
  if (!editedLine) return lines;

  const isBase = editedLine.type === "flour";

  if (isBase) {
    // update changed flour line
    const updated = lines.map((l) =>
      l.line_id === changedId ? { ...l, g: { ...l.g, value: newValue } } : l,
    );

    // recompute flour total
    const newBaseTotal = updated
      .filter((l) => l.type === "flour")
      .reduce(
        (sum, l) => sum + (typeof l.g.value === "number" ? l.g.value : 0),
        0,
      );

    // update all percents against new base total
    const newPercents = {};
    updated.forEach((l) => {
      newPercents[l.line_id] =
        newBaseTotal > 0 ? formatNumber((l.g.value / newBaseTotal) * 100) : "0";
    });
    setPercents(newPercents);

    return updated;
  }

  // non-base line: just update its value and percent
  const baseTotal = lines
    .filter((l) => l.type === "flour")
    .reduce(
      (sum, l) => sum + (typeof l.g.value === "number" ? l.g.value : 0),
      0,
    );

  const updated = lines.map((l) =>
    l.line_id === changedId ? { ...l, g: { ...l.g, value: newValue } } : l,
  );

  const percent =
    baseTotal > 0 ? formatNumber((newValue / baseTotal) * 100) : "0";

  setPercents((prev) => ({
    ...prev,
    [changedId]: percent,
  }));

  return updated;
};
// 1. Apply weight change while guarding fixed total
const applyWithTotalLock = (
  lines,
  changedId,
  newWeight,
  fixedTotal,
  unlockedRatiosRef,
) => {
  const editedLine = lines.find((l) => l.line_id === changedId);
  if (!editedLine) return lines;

  const locked = lines.filter((l) => l.g.lock && l.line_id !== changedId);
  const unlocked = lines.filter((l) => !l.g.lock && l.line_id !== changedId);

  const lockedSum = locked.reduce(
    (s, l) => s + (parseFloat(l.g.value) || 0),
    0,
  );

  // 🟢 ensure others have minimum allocation
  const nUnlocked = unlocked.length;
  const minForOthers = 0.1 * nUnlocked;
  const maxForEdited = Math.max(0.1, fixedTotal - lockedSum - minForOthers);
  const cappedWeight = Math.min(newWeight, maxForEdited);

  let remaining = fixedTotal - lockedSum - cappedWeight;
  if (remaining < minForOthers) remaining = minForOthers;

  // 📌 Snapshot ratios if not set
  if (!unlockedRatiosRef.current) {
    const sumUnlocked = unlocked.reduce(
      (s, l) => s + (parseFloat(l.g.value) || 0),
      0,
    );
    unlockedRatiosRef.current = unlocked.map((l) => {
      const v = parseFloat(l.g.value) || 0;
      return {
        line_id: l.line_id,
        ratio: sumUnlocked > 0 ? v / sumUnlocked : 1 / nUnlocked,
      };
    });
  }

  // Use stored ratios
  const ratios = unlockedRatiosRef.current;

  let distributed = 0;
  const redistributed = unlocked.map((l, i) => {
    const r = ratios.find((x) => x.line_id === l.line_id);
    const ratio = r ? r.ratio : 1 / nUnlocked;
    let value =
      i === unlocked.length - 1 ? remaining - distributed : ratio * remaining;
    distributed += value;
    return { line_id: l.line_id, value: Math.max(value, 0.1) };
  });

  return lines.map((l) => {
    if (l.line_id === changedId) {
      return { ...l, g: { ...l.g, value: cappedWeight } };
    }
    const r = redistributed.find((x) => x.line_id === l.line_id);
    return r ? { ...l, g: { ...l.g, value: r.value } } : l;
  });
};
// Handles percent edits with total lock
const applyWithTotalLockPercent = (
  lines,
  changedId,
  newPercent, // e.g. 20 → means 20% of baker’s total
  bakerTotal, // fixed baker total (flour sum baseline)
  fixedTotal, // total lock value
  unlockedRatiosRef,
) => {
  const editedLine = lines.find((l) => l.line_id === changedId);
  if (!editedLine) return lines;

  const locked = lines.filter((l) => l.g.lock && l.line_id !== changedId);
  const unlocked = lines.filter((l) => !l.g.lock && l.line_id !== changedId);

  const lockedSum = locked.reduce(
    (s, l) => s + (parseFloat(l.g.value) || 0),
    0,
  );

  // 🟢 convert percent → target grams
  const targetWeight = (newPercent / 100) * bakerTotal;

  // 🟢 minimum for others
  const nUnlocked = unlocked.length;
  const minForOthers = 0.1 * nUnlocked;
  const maxForEdited = Math.max(0.1, fixedTotal - lockedSum - minForOthers);
  const cappedWeight = Math.min(targetWeight, maxForEdited);

  let remaining = fixedTotal - lockedSum - cappedWeight;
  if (remaining < minForOthers) remaining = minForOthers;

  // 📌 Snapshot ratios in terms of percent if not set
  if (!unlockedRatiosRef.current) {
    const sumUnlockedPercent = unlocked.reduce((s, l) => {
      const v = parseFloat(l.g.value) || 0;
      return s + (bakerTotal > 0 ? (v / bakerTotal) * 100 : 0);
    }, 0);

    unlockedRatiosRef.current = unlocked.map((l) => {
      const v = parseFloat(l.g.value) || 0;
      const pct = bakerTotal > 0 ? (v / bakerTotal) * 100 : 0;
      return {
        line_id: l.line_id,
        ratio:
          sumUnlockedPercent > 0 ? pct / sumUnlockedPercent : 1 / nUnlocked,
      };
    });
  }

  // Use stored percent ratios to distribute
  const ratios = unlockedRatiosRef.current;

  let distributed = 0;
  const redistributed = unlocked.map((l, i) => {
    const r = ratios.find((x) => x.line_id === l.line_id);
    const ratio = r ? r.ratio : 1 / nUnlocked;
    let value =
      i === unlocked.length - 1 ? remaining - distributed : ratio * remaining;
    distributed += value;
    return { line_id: l.line_id, value: Math.max(value, 0.1) };
  });

  return lines.map((l) => {
    if (l.line_id === changedId) {
      return { ...l, g: { ...l.g, value: cappedWeight } };
    }
    const r = redistributed.find((x) => x.line_id === l.line_id);
    return r ? { ...l, g: { ...l.g, value: r.value } } : l;
  });
};

const formatNumber = (val) =>
  typeof val === "number"
    ? val.toLocaleString("en-US", { maximumFractionDigits: 1 })
    : val; // allow raw strings through

const Lock = ({ active, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className="spect-square w-4 h-4 flex justify-center items-center cursor-pointer"
      style={{
        background: active ? "var(--txt)" : "var(--bg3)",
        color: active ? "var(--bg)" : "var(--txt)",
      }}
    >
      <i className="fa-solid fa-lock" style={{ fontSize: 8 }}></i>
    </div>
  );
};
export default function InlineEditing() {
  const [mode, setMode] = useState("editing");
  const [lines, setLines] = useState(recipe.lines);
  const [memoLines, setMemoLines] = useState(recipe.lines);
  const lockedBakerTotalRef = useRef(null);

  useEffect(() => {
    setLines((prev) =>
      prev.map((line) => ({
        ...line,
        g: { ...line.g, lock: false },
      })),
    );
  }, [mode]);

  useEffect(() => {
    if (mode === "scaling") {
      setMemoLines(lines); // safe: uses up-to-date state
      console.log("updatingMemo");
    }
  }, [mode]);

  const flourTotal = (arr) =>
    arr
      .filter((l) => l.type === "flour")
      .reduce((sum, l) => sum + l.g.value, 0);

  const [total, setTotal] = useState(
    recipe.lines.reduce((sum, l) => sum + l.g.value, 0),
  );
  const [totalLock, setTotalLock] = useState(false);
  const fixedTotalRef = useRef(null);
  const unlockedRatiosRef = useRef(null);

  const [percents, setPercents] = useState(() => {
    const B = flourTotal(recipe.lines);
    return Object.fromEntries(
      recipe.lines.map((l) => [
        l.line_id,
        B > 0 ? String(Number(((l.g.value / B) * 100).toFixed(1))) : "",
      ]),
    );
  });

  const sumTotal = (arr) =>
    arr.reduce((s, l) => {
      const v = parseFloat(l.g.value);
      return !isNaN(v) ? s + v : s;
    }, 0);

  const handleWeightChange = (id, text) => {
    const clean = text.replace(/,/g, "");
    if (!/^\d*\.?\d*$/.test(clean)) return;

    const num = parseFloat(clean);
    const isTyping = clean.endsWith(".") || clean === "";

    setLines((prev) => {
      // always reflect raw text while typing
      if (isTyping) {
        return prev.map((line) =>
          line.line_id === id
            ? { ...line, g: { ...line.g, value: clean } }
            : line,
        );
      }

      if (isNaN(num)) return prev;

      const fixedTotal = totalLock ? fixedTotalRef.current : sumTotal(prev);

      let calculated;
      if (mode === "scaling") {
        calculated = scaleToTarget(memoLines, num, percents, id);
      } else if (totalLock) {
        calculated = applyWithTotalLock(
          prev,
          id,
          num,
          fixedTotal,
          unlockedRatiosRef,
        );
        const B = flourTotal(calculated);
        const newPercents = {};
        calculated.forEach((l) => {
          if (l.type === "flour") {
            newPercents[l.line_id] =
              B > 0
                ? formatNumber(((parseFloat(l.g.value) || 0) / B) * 100)
                : "0";
          } else {
            newPercents[l.line_id] =
              B > 0
                ? formatNumber(((parseFloat(l.g.value) || 0) / B) * 100)
                : "0";
          }
        });
        setPercents(newPercents);
      } else {
        calculated = applyEditingLogic(prev, id, num, setPercents);
      }

      // 🔑 don’t overwrite capped values; just use what was returned
      setTotal(totalLock ? fixedTotal : sumTotal(calculated));
      return calculated;
    });
  };

  const handleWeightBlur = (id) => {
    unlockedRatiosRef.current = null; // clear ratios on blur

    setLines((prev) =>
      prev.map((line) => {
        if (line.line_id !== id) return line;
        const num = parseFloat(line.g.value);
        if (!isNaN(num)) {
          // round to 1 decimal at blur
          return { ...line, g: { ...line.g, value: +num.toFixed(1) } };
        }
        return line;
      }),
    );
  };
  const handleTotalChange = (text) => {
    const clean = text.replace(/,/g, "");
    if (!/^\d*\.?\d*$/.test(clean)) return;

    const num = parseFloat(clean);
    const isTyping = clean.endsWith(".") || clean === "";

    setTotal(clean);

    if (isTyping || isNaN(num)) return;

    setLines((prev) => {
      const allValid = prev.every(
        (l) => typeof l.g.value === "number" && !isNaN(l.g.value),
      );
      if (!allValid) return prev;

      let newLines;
      if (mode === "editing") {
        const hasLocks = prev.some((l) => l.g.lock);
        newLines = hasLocks
          ? scaleToTargetWithLocks(prev, num)
          : scaleToTarget(prev, num, percents);
      } else {
        newLines = scaleToTarget(prev, num, percents);
      }

      // 🔄 recompute percents
      const B = flourTotal(newLines);
      const newPercents = {};
      newLines.forEach((l) => {
        newPercents[l.line_id] =
          B > 0 ? formatNumber(((parseFloat(l.g.value) || 0) / B) * 100) : "0";
      });
      setPercents(newPercents);

      return newLines;
    });
  };

  const handleTotalBlur = () => {
    setTotal((prev) => {
      const num = parseFloat(prev);

      // fallback: recalc from current lines
      const newTotal = lines.reduce((sum, l) => {
        const v = parseFloat(l.g.value);
        return isNaN(v) ? sum : sum + v;
      }, 0);

      return +newTotal.toFixed(1);
    });
  };
  const handlePercentChange = (id, text) => {
    const editedLine = lines.find((l) => l.line_id === id);
    if (!editedLine) return;

    const clean = text.replace(/,/g, "");
    const rawNum = parseFloat(clean);
    const isTyping = clean.endsWith(".") || clean === "";

    // keep raw typing string
    setPercents((prev) => ({ ...prev, [id]: clean }));
    if (isTyping || isNaN(rawNum)) return;

    const isFlour = editedLine.type === "flour";

    // lock baker total on first valid edit
    if (isFlour && lockedBakerTotalRef.current == null) {
      lockedBakerTotalRef.current = flourTotal(lines);
    }
    const B = lockedBakerTotalRef.current ?? flourTotal(lines);

    // non-flour: percent of locked baker total (no drift)
    if (!isFlour) {
      const newWeight = Math.max((rawNum / 100) * B, 0.1);

      let newLines;
      if (totalLock) {
        const fixedTotal = fixedTotalRef.current ?? sumTotal(lines);
        newLines = applyWithTotalLockPercent(
          lines,
          id,
          rawNum, // percent typed
          B, // baker total
          fixedTotal,
          unlockedRatiosRef,
        );

        // 🔄 recompute percents after redistribution
        const B2 = flourTotal(newLines);
        const newPercents = {};
        newLines.forEach((l) => {
          if (l.line_id !== id) {
            newPercents[l.line_id] =
              B2 > 0
                ? formatNumber(((parseFloat(l.g.value) || 0) / B2) * 100)
                : "0";
          }
        });
        setPercents(newPercents);

        setTotal(fixedTotal);
      } else {
        newLines = lines.map((l) =>
          l.line_id === id ? { ...l, g: { ...l.g, value: newWeight } } : l,
        );
        setTotal(+sumTotal(newLines).toFixed(1));
      }

      setLines(newLines);
      return;
    }

    // flour: if locked → cap display only, no calc
    if (editedLine.g.lock) {
      const capped = Math.min(Math.max(rawNum, 0.1), 99.9);
      setPercents((prev) => ({ ...prev, [id]: formatNumber(capped) }));
      return;
    }

    // flour: cap by remaining slack after locked flour
    const flourLines = lines.filter((l) => l.type === "flour");
    const lockedOthers = flourLines.filter((l) => l.g.lock && l.line_id !== id);
    const unlockedOthers = flourLines.filter(
      (l) => !l.g.lock && l.line_id !== id,
    );

    const lockedSum = lockedOthers.reduce(
      (s, l) => s + (parseFloat(l.g.value) || 0),
      0,
    );
    const maxPct = Math.min(99.9, ((B - lockedSum) / B) * 100);
    const minPct = 0.1;
    const effectivePct =
      rawNum > maxPct ? maxPct : rawNum < minPct ? minPct : rawNum;

    const newEditedWeight = (effectivePct / 100) * B;
    let remaining = B - lockedSum - newEditedWeight;
    if (remaining < 0) remaining = 0;

    const otherTotal = unlockedOthers.reduce(
      (s, l) => s + (parseFloat(l.g.value) || 0),
      0,
    );

    let distributed = 0;
    const redistributed = unlockedOthers.map((l, i) => {
      const base = parseFloat(l.g.value) || 0;
      const ratio =
        otherTotal > 0 ? base / otherTotal : 1 / unlockedOthers.length;
      const value =
        i === unlockedOthers.length - 1
          ? Math.max(remaining - distributed, 0)
          : ratio * remaining;
      distributed += value;
      return { line_id: l.line_id, value: Math.max(value, 0.1) };
    });

    const newLines = lines.map((l) => {
      if (l.line_id === id)
        return { ...l, g: { ...l.g, value: newEditedWeight } };
      const r = redistributed.find((x) => x.line_id === l.line_id);
      return r ? { ...l, g: { ...l.g, value: r.value } } : l; // locked stay untouched
    });

    setLines(newLines);

    // update percents for unlocked flour only, against locked baker total B
    setPercents((prev) => {
      const updated = { ...prev, [id]: formatNumber(effectivePct) };
      newLines.forEach((l) => {
        if (l.type === "flour" && !l.g.lock && l.line_id !== id) {
          updated[l.line_id] = formatNumber(
            ((parseFloat(l.g.value) || 0) / B) * 100,
          );
        }
      });
      return updated;
    });

    setTotal(+sumTotal(newLines).toFixed(1));
  };

  const handlePercentBlur = (id) => {
    const editedLine = lines.find((l) => l.line_id === id);
    if (!editedLine) return;

    const B = flourTotal(lines);
    if (B <= 0) return;

    if (editedLine.type === "flour") {
      // derive percent from percents[id]
      const raw = percents[id];
      const num = parseFloat(raw);
      if (isNaN(num)) return;

      const rounded = +num.toFixed(1);
      const newEditedWeight = (rounded / 100) * B;
      const remaining = B - newEditedWeight;

      const flourLines = lines.filter((l) => l.type === "flour");
      const others = flourLines.filter((l) => l.line_id !== id);
      const otherSum = others.reduce(
        (s, l) => s + (parseFloat(l.g.value) || 0),
        0,
      );

      const redistributed = others.map((l, i) => {
        const base = parseFloat(l.g.value) || 0;
        const ratio = otherSum > 0 ? base / otherSum : 1 / others.length;
        const value =
          i === others.length - 1
            ? remaining -
              others
                .slice(0, i)
                .reduce(
                  (s, x) =>
                    s + ((parseFloat(x.g.value) || 0) / otherSum) * remaining,
                  0,
                )
            : ratio * remaining;
        return { line_id: l.line_id, value: Math.max(value, 0.1) };
      });

      const newLines = lines.map((l) => {
        if (l.line_id === id) {
          return { ...l, g: { ...l.g, value: newEditedWeight } };
        }
        const r = redistributed.find((x) => x.line_id === l.line_id);
        return r ? { ...l, g: { ...l.g, value: r.value } } : l;
      });

      setLines(newLines);

      // recompute percents after redistribution
      const newPercents = {};
      newLines.forEach((l) => {
        newPercents[l.line_id] = formatNumber(
          ((parseFloat(l.g.value) || 0) / B) * 100,
        );
      });
      setPercents(newPercents);
    } else {
      // non-flour: recompute this one percent from actual weight
      const correctedPercent =
        ((parseFloat(editedLine.g.value) || 0) / B) * 100;
      setPercents((prev) => ({
        ...prev,
        [id]: formatNumber(correctedPercent),
      }));
    }
  };
  return (
    <div className="flex w-full flex-col gap-y-3 md:flex-row md:gap-x-2 text-sm">
      <div className="gap-y-1 flex flex-col flex-1">
        {lines.map((l) => (
          <div
            key={l.line_id}
            className="bg-[var(--bg2)] rounded-md flex flex-row items-baseline gap-x-3 p-2"
          >
            <div className="text-xl instrument flex flex-row items-baseline gap-x-2">
              {mode === "editing" && (
                <Lock
                  active={l.g.lock}
                  onToggle={() =>
                    setLines((prev) =>
                      prev.map((line) =>
                        line.line_id === l.line_id
                          ? { ...line, g: { ...line.g, lock: !line.g.lock } }
                          : line,
                      ),
                    )
                  }
                />
              )}
              <input
                className="bg-transparent w-[60px] rounded-md text-right px-1"
                type="text"
                value={
                  typeof l.g.value === "number"
                    ? formatNumber(l.g.value)
                    : l.g.value
                }
                onChange={(e) => handleWeightChange(l.line_id, e.target.value)}
                onBlur={() => handleWeightBlur(l.line_id)}
                disabled={l.g.lock}
              />
              {l.g.unit}
            </div>
            <div className="flex-1">
              <div className="text-xl instrument">
                {l.in_name} {l.type === "flour" && "★"}
              </div>
              <div className="text-[0.8em] font-mono  text-[var(--txt2)]">
                {l.in_desc}
              </div>
            </div>
            <div className="instrument text-lg w-[60px] text-right flex flex-row items-center">
              <input
                className="bg-transparent rounded-md px-1 w-[50px] text-right"
                type="text"
                value={
                  typeof percents[l.line_id] === "number"
                    ? formatNumber(percents[l.line_id])
                    : percents[l.line_id]
                }
                onChange={(e) => handlePercentChange(l.line_id, e.target.value)}
                onBlur={() => handlePercentBlur(l.line_id)}
                disabled={mode === "scaling" || l.g.lock}
              />{" "}
              %
            </div>
          </div>
        ))}
      </div>
      <div className="w-full px-0 md:w-auto md:px-4">
        <div className="flex flex-col gap-y-2 md:flex-col md:items-end">
          {/* Row 1 on mobile: total weight */}
          <div className="flex w-full flex-row items-center justify-between md:w-auto md:flex-col md:items-end md:justify-start">
            <div className="text-left md:text-right font-mono">
              Total Weight
            </div>
            <div className="instrument text-xl flex flex-row items-center justify-end gap-x-2">
              <div className="text-right">
                <input
                  className="bg-transparent w-[100px] rounded-md text-right px-1"
                  type="text"
                  value={formatNumber(total)}
                  onChange={(e) => handleTotalChange(e.target.value)}
                  onBlur={handleTotalBlur}
                  disabled={totalLock}
                />
                g
              </div>
              {mode === "editing" && (
                <Lock
                  active={totalLock}
                  onToggle={() => {
                    setTotalLock((prev) => {
                      const next = !prev;
                      if (next) {
                        fixedTotalRef.current = sumTotal(lines);
                      } else {
                        fixedTotalRef.current = null;
                      }
                      return next;
                    });
                  }}
                />
              )}
            </div>
          </div>

          {/* Row 2 on mobile: mode toggle */}
          <Toggle
            className="w-20 md:w-[150px]"
            items={[
              { value: "scaling", label: "Scale" },
              { value: "editing", label: "Edit" },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>
      </div>
    </div>
  );
}
