import React, { useMemo, useState } from "react";

const WEIGHT_UNITS = {
  g: {
    fromGrams: (g) => g,
    toGrams: (v) => v,
  },
  kg: {
    fromGrams: (g) => g / 1000,
    toGrams: (v) => v * 1000,
  },
  oz: {
    fromGrams: (g) => g / 28.3495,
    toGrams: (v) => v * 28.3495,
  },
  lb: {
    fromGrams: (g) => g / 453.592,
    toGrams: (v) => v * 453.592,
  },
};
const VOLUME_UNITS = {
  mL: {
    fromML: (ml) => ml,
    toML: (v) => v,
  },
  L: {
    fromML: (ml) => ml / 1000,
    toML: (v) => v * 1000,
  },
  cup: {
    fromML: (ml) => ml / 240,
    toML: (v) => v * 240,
  },
  gal: {
    fromML: (ml) => ml / 3785.41,
    toML: (v) => v * 3785.41,
  },
  Tbsp: {
    fromML: (ml) => ml / 15,
    toML: (v) => v * 15,
  },
  tsp: {
    fromML: (ml) => ml / 5,
    toML: (v) => v * 5,
  },
};

const SYSTEM_OPTIONS = [
  { value: "metric", label: "Metric" },
  { value: "customary", label: "Customary" },
];

const DISPLAY_UNIT_BY_MODE_AND_SYSTEM = {
  weight: {
    metric: ["g", "kg"],
    customary: ["oz", "lb"],
  },
  volume: {
    metric: ["mL", "L"],
    customary: ["cup", "gal"],
  },
  single: {
    metric: ["unit"],
    customary: ["unit"],
  },
};
const CUP_FRACTIONS = [
  { value: 1, text: "1", unit: "cup" },
  { value: 14 / 16, text: "7/8", unit: "cup" },
  { value: 12 / 16, text: "3/4", unit: "cup" },
  { value: 10 / 16, text: "5/8", unit: "cup" },
  { value: 8 / 16, text: "1/2", unit: "cup" },
  { value: 4 / 16, text: "1/4", unit: "cup" },

  { value: 7 / 16, text: "7", unit: "Tbsp" },
  { value: 6 / 16, text: "6", unit: "Tbsp" },
  { value: 5 / 16, text: "5", unit: "Tbsp" },
  { value: 3 / 16, text: "3", unit: "Tbsp" },
  { value: 2 / 16, text: "2", unit: "Tbsp" },
  { value: 1 / 16, text: "1", unit: "Tbsp" },

  { value: 1 / 24, text: "2", unit: "tsp" },
  { value: 1 / 32, text: "1/2", unit: "Tbsp" },
  { value: 1 / 48, text: "1", unit: "tsp" },
  { value: 1 / 64, text: "1/4", unit: "Tbsp" },
  { value: 1 / 96, text: "1/2", unit: "tsp" },
  { value: 1 / 192, text: "1/4", unit: "tsp" },
  { value: 1 / 384, text: "1/8", unit: "tsp" },
  { value: 1 / 512, text: "1", unit: "pinch" },
];

function findClosestCupFraction(value) {
  let best = CUP_FRACTIONS[0];
  let minDiff = Infinity;

  for (const item of CUP_FRACTIONS) {
    const diff = Math.abs(item.value - value);
    if (diff < minDiff) {
      minDiff = diff;
      best = item;
    }
  }

  return best;
}

function formatCustomaryVolumeFraction(ml) {
  const cups = ml / 240;

  if (cups >= 1) {
    const whole = Math.floor(cups);
    const remainder = cups - whole;

    if (remainder < 1 / 512) {
      return {
        valueText: String(whole),
        unit: "cup",
        editableValue: whole,
        editableUnit: "cup",
      };
    }

    const frac = findClosestCupFraction(remainder);

    if (frac.unit === "cup") {
      return {
        valueText: `${whole} ${frac.text}`,
        unit: "cup",
        editableValue: whole + frac.value,
        editableUnit: "cup",
      };
    }

    return {
      valueText: `${whole} ${frac.text}`,
      unit: frac.unit,
      editableValue:
        frac.unit === "Tbsp"
          ? whole * 16 + frac.value * 16
          : frac.unit === "tsp"
            ? whole * 48 + frac.value * 48
            : 1,
      editableUnit: frac.unit,
    };
  }

  const frac = findClosestCupFraction(cups);

  return {
    valueText: frac.text,
    unit: frac.unit,
    editableValue:
      frac.unit === "cup"
        ? frac.value
        : frac.unit === "Tbsp"
          ? frac.value * 16
          : frac.unit === "tsp"
            ? frac.value * 48
            : 1,
    editableUnit: frac.unit,
  };
}

const formatNumber = (val) => {
  if (typeof val !== "number" || Number.isNaN(val)) return val;
  return val.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
};

const formatCompact = (val) => {
  if (typeof val !== "number" || Number.isNaN(val)) return val;
  return val.toLocaleString("en-US", { maximumFractionDigits: 1 });
};

function getWeightPreview(grams, system) {
  if (system === "metric") {
    if (grams >= 1000)
      return { value: `${formatCompact(grams / 1000)}kg`, note: "default" };
    return { value: `${formatCompact(grams)}g`, note: "default" };
  }

  const oz = grams / 28.3495;
  if (oz >= 16)
    return { value: `${formatCompact(oz / 16)}lb`, note: "default" };
  return { value: `${formatCompact(oz)}oz`, note: "default" };
}

function getVolumePreview(grams, system, gramsPerML) {
  const ml = grams / gramsPerML;

  if (system === "metric") {
    if (ml >= 1000) {
      return {
        value: `${formatCompact(ml / 1000)}L`,
        note: `${formatCompact(gramsPerML)}g/mL`,
      };
    }
    return {
      value: `${formatCompact(ml)}mL`,
      note: `${formatCompact(gramsPerML)}g/mL`,
    };
  }

  const cups = ml / 240;
  if (cups >= 16) {
    return {
      value: `${formatCompact(cups / 16)}gal`,
      note: `${formatCompact(172)}g/cup`,
    };
  }

  const frac = formatCustomaryVolumeFraction(ml);
  return {
    value: `${frac.valueText}${frac.unit === "pinch" ? "" : ` ${frac.unit}`}`,
    note: `${formatCompact(172)}g/cup`,
  };
}

function getSinglePreview(grams, gramsPerUnit, system) {
  const units = grams / gramsPerUnit;
  const unitRate =
    system === "metric"
      ? `${formatCompact(gramsPerUnit)}g/unit`
      : `${formatCompact(gramsPerUnit / 28.3495)}oz/unit`;

  return {
    value: formatCompact(units),
    note: unitRate,
  };
}
function ModeCard({ active, value, label, note, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl p-3 text-center transition-colors"
      style={{
        background: active ? "var(--bg2)" : "transparent",
        borderColor: active ? "var(--txt)" : "var(--bg2)",
        color: "var(--txt)",
      }}
    >
      <div className="text-lg instrument">{value}</div>
      <div className="text-sm">{label}</div>
      <div className="text-[var(--txt2)] mt-1 font-mono text-[0.8em]">
        {note}
      </div>
    </button>
  );
}

function Toggle({ items = [], value, onChange, className = "" }) {
  const idx = Math.max(
    0,
    items.findIndex((it) => it.value === value),
  );
  const count = Math.max(1, items.length);
  const widthPct = 100 / count;
  const leftPct = idx * widthPct;

  return (
    <div
      className={className}
      role="tablist"
      style={{
        position: "relative",
        display: "inline-flex",
        width: "100%",
        borderRadius: 999,
        border: "1px solid var(--bg2)",
        background: "transparent",
        padding: 4,
        gap: 4,
        userSelect: "none",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: `calc(${leftPct}% + 4px)`,
          width: `calc(${widthPct}% - 8px)`,
          borderRadius: 999,
          background: "var(--bg2)",
          transition: "left 300ms ease, width 300ms ease",
        }}
      />

      {items.map((it) => {
        const isActive = it.value === value;
        return (
          <button
            key={String(it.value)}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(it.value)}
            style={{
              flex: 1,
              position: "relative",
              zIndex: 1,
              border: 0,
              background: "transparent",
              color: isActive ? "var(--txt)" : "var(--txt2)",
              padding: "8px 10px",
              borderRadius: 999,
              cursor: "pointer",
              outline: "none",
              whiteSpace: "nowrap",
              fontSize: 12,
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

export default function UnitRep() {
  const [line, setLine] = useState({
    line_id: 1,
    in_name: "Black Beans",
    in_desc: "28 oz can",
    grams: 28 * 28.3495,
    mode: "weight",
    system: "customary",
    display_unit: "oz",
  });
  const [isEditingValue, setIsEditingValue] = useState(false);
  // Cooked black beans: 172 g per 240 mL
  const gramsPerCup = 172;
  const mlPerCup = 240;
  const gramsPerML = gramsPerCup / mlPerCup;

  const gramsPerUnit = 28 * 28.3495;

  const weightPreview = useMemo(
    () => getWeightPreview(line.grams, line.system),
    [line.grams, line.system],
  );

  const volumePreview = useMemo(
    () => getVolumePreview(line.grams, line.system, gramsPerML),
    [line.grams, line.system, gramsPerML],
  );

  const singlePreview = useMemo(
    () => getSinglePreview(line.grams, gramsPerUnit, line.system),
    [line.grams, gramsPerUnit, line.system],
  );
  const display = useMemo(() => {
    if (line.mode === "weight") {
      return {
        valueText: formatNumber(
          WEIGHT_UNITS[line.display_unit].fromGrams(line.grams),
        ),
        valueNumber: WEIGHT_UNITS[line.display_unit].fromGrams(line.grams),
        unit: line.display_unit,
        editableUnit: line.display_unit,
        editable: true,
        fractional: false,
      };
    }

    if (line.mode === "volume") {
      const ml = line.grams / gramsPerML;

      if (line.system === "customary" && line.display_unit === "cup") {
        const frac = formatCustomaryVolumeFraction(ml);
        return {
          valueText: frac.valueText,
          valueNumber: frac.editableValue,
          unit: frac.unit,
          editableUnit: frac.editableUnit,
          editable: frac.unit !== "pinch",
          fractional: true,
        };
      }

      const numeric =
        line.display_unit === "gal"
          ? VOLUME_UNITS.gal.fromML(ml)
          : VOLUME_UNITS[line.display_unit].fromML(ml);

      return {
        valueText: formatNumber(numeric),
        valueNumber: numeric,
        unit: line.display_unit,
        editableUnit: line.display_unit,
        editable: true,
        fractional: false,
      };
    }

    if (line.mode === "single") {
      const units = line.grams / gramsPerUnit;
      return {
        valueText: formatNumber(units),
        valueNumber: units,
        unit: "unit",
        editableUnit: "unit",
        editable: true,
        fractional: false,
      };
    }

    return {
      valueText: formatNumber(line.grams),
      valueNumber: line.grams,
      unit: "g",
      editableUnit: "g",
      editable: true,
      fractional: false,
    };
  }, [line, gramsPerML, gramsPerUnit]);
  const shownValue =
    isEditingValue && line.display_text != null
      ? line.display_text
      : display.valueText;
  const handleValueChange = (text) => {
    const clean = text.replace(/,/g, "");
    if (!/^\d*\.?\d*$/.test(clean)) return;

    setLine((prev) => {
      if (clean === "" || clean.endsWith(".")) {
        return { ...prev, display_text: clean };
      }

      const num = parseFloat(clean);
      if (Number.isNaN(num)) return prev;

      let nextGrams = prev.grams;

      if (prev.mode === "weight") {
        nextGrams = WEIGHT_UNITS[display.editableUnit].toGrams(num);
      } else if (prev.mode === "volume") {
        if (prev.system === "customary" && prev.display_unit === "cup") {
          if (display.editableUnit === "cup") {
            nextGrams = VOLUME_UNITS.cup.toML(num) * gramsPerML;
          } else if (display.editableUnit === "Tbsp") {
            nextGrams = VOLUME_UNITS.Tbsp.toML(num) * gramsPerML;
          } else if (display.editableUnit === "tsp") {
            nextGrams = VOLUME_UNITS.tsp.toML(num) * gramsPerML;
          } else {
            return prev;
          }
        } else {
          const ml = VOLUME_UNITS[display.editableUnit].toML(num);
          nextGrams = ml * gramsPerML;
        }
      } else if (prev.mode === "single") {
        nextGrams = num * gramsPerUnit;
      }

      return {
        ...prev,
        grams: nextGrams,
        display_text: clean,
      };
    });
  };
  const handleBlur = () => {
    setIsEditingValue(false);
    setLine((prev) => ({
      ...prev,
      display_text: undefined,
    }));
  };

  const getDefaultUnit = (mode, system) => {
    return DISPLAY_UNIT_BY_MODE_AND_SYSTEM[mode][system][0];
  };

  const handleModeChange = (mode) => {
    setLine((prev) => {
      const nextSystem = prev.system;
      return {
        ...prev,
        mode,
        display_unit: getDefaultUnit(mode, nextSystem),
        display_text: undefined,
      };
    });
  };

  const handleSystemChange = (system) => {
    setLine((prev) => ({
      ...prev,
      system,
      display_unit: getDefaultUnit(prev.mode, system),
      display_text: undefined,
    }));
  };

  const handleUnitToggle = () => {
    setLine((prev) => {
      const pair = DISPLAY_UNIT_BY_MODE_AND_SYSTEM[prev.mode][prev.system];
      if (pair.length < 2) return prev;

      const nextUnit = prev.display_unit === pair[0] ? pair[1] : pair[0];

      return {
        ...prev,
        display_unit: nextUnit,
        display_text: undefined,
      };
    });
  };

  return (
    <div className="w-full max-w-[520px] m-auto flex flex-1 flex-col gap-y-2">
      <div className="bg-[var(--bg2)] rounded-md p-2 flex flex-row items-center gap-x-3">
        <div className="flex-1 min-w-0">
          <div className="text-xl instrument truncate">{line.in_name}</div>
          <div className="font-mono text-[0.8em] text-[var(--txt2)] truncate">
            {line.in_desc}
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-2 instrument">
          <input
            className="bg-transparent w-[80px] rounded-md text-right px-1 text-lg"
            type="text"
            value={shownValue}
            onFocus={() => {
              setIsEditingValue(true);
              setLine((prev) => ({
                ...prev,
                display_text: String(
                  typeof display.valueNumber === "number"
                    ? +display.valueNumber.toFixed(2)
                    : "",
                ),
              }));
            }}
            onChange={(e) => handleValueChange(e.target.value)}
            onBlur={handleBlur}
            disabled={!display.editable}
          />

          <button
            type="button"
            onClick={handleUnitToggle}
            className="border rounded-full px-3 py-1 font-mono text-[0.8em]"
            style={{
              background: "transparent",
              color: "var(--txt)",
              borderColor: "var(--txt)",
              cursor:
                DISPLAY_UNIT_BY_MODE_AND_SYSTEM[line.mode][line.system].length <
                2
                  ? "default"
                  : "pointer",
            }}
          >
            {display.unit}
          </button>
        </div>
      </div>

      <div className="border p-2 rounded-md border-[var(--bg2)] flex flex-col gap-y-2">
        <div className="flex flex-row gap-x-2 items-center text-xs">
          <i className="fa-eye fa-solid text-[10px]"></i> Display Settings
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ModeCard
            active={line.mode === "weight"}
            value={weightPreview.value}
            label="Weight"
            note={weightPreview.note}
            onClick={() => handleModeChange("weight")}
          />
          <ModeCard
            active={line.mode === "volume"}
            value={volumePreview.value}
            label="Volume"
            note={volumePreview.note}
            onClick={() => handleModeChange("volume")}
          />
          <ModeCard
            active={line.mode === "single"}
            value={singlePreview.value}
            label="Unit"
            note={singlePreview.note}
            onClick={() => handleModeChange("single")}
          />
        </div>
        <Toggle
          className="w-full"
          items={SYSTEM_OPTIONS}
          value={line.system}
          onChange={handleSystemChange}
        />
      </div>
    </div>
  );
}
