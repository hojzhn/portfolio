import React from "react";
import TextPlaceholder from "./TextPlaceholder"; // adjust path if needed

/**
 * @param {Object} props
 * @param {number} [props.startYear=1996] - The earliest possible year for timeline
 * @param {number} [props.endYear=2025] - The latest possible year for timeline
 * @param {number} [props.length=10] - Number of timeline entries to generate
 * @param {boolean} [props.inverted=false] - If true, display years from recent to past
 */
export default function TimelinePlaceholder({
  startYear = 1996,
  endYear = 2025,
  length = 10,
  inverted = false,
}) {
  const totalYears = endYear - startYear + 1;

  let availableYears = Array.from(
    { length: totalYears },
    (_, i) => i + startYear
  )
    .sort(() => Math.random() - 0.5)
    .slice(0, length)
    .sort((a, b) => a - b);

  if (inverted) {
    availableYears = availableYears.reverse();
  }

  return (
    <div className="space-y-4 my-8">
      {availableYears.map((year, i) => {
        const lineCount = Math.random() < 0.5 ? 1 : 2; // random 1 or 2 lines

        return (
          <div key={i} className="flex flex-row gap-6 items-start">
            <div className="w-12 shrink-0 text-sm">{year}</div>
            <div className="w-full">
              <TextPlaceholder lines={lineCount} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
