import React from "react";

/**
 * @param {Object} props
 * @param {number} [props.lines=3] - Number of lines to render
 * @param {string} [props.height="0.5em"] - Height of each line
 * @param {string} [props.gap="1em"] - Vertical gap between lines
 * @param {string} [props.color="var(--txt)"] - Background color
 * @param {string} [props.round="4px"] - Border radius
 * @param {"left" | "center" | "right"} [props.align="left"] - Alignment of lines
 * @param {number} [props.characters] - Optional number of characters (in em) for single-line placeholder
 */
export default function TextPlaceholder({
  lines = 3,
  height = "0.8em",
  gap = "1.6em",
  color = "var(--txt3)",
  round = "4px",
  align = "left",
  characters,
  className,
}) {
  const getAlignment = () => {
    switch (align) {
      case "center":
        return { marginLeft: "auto", marginRight: "auto" };
      case "right":
        return { marginLeft: "auto" };
      case "left":
      default:
        return {};
    }
  };

  // If characters prop is given, render a single line placeholder
  if (typeof characters === "number") {
    return (
      <div
        className={` ${className}`}
        style={{
          height,
          width: `${characters}ch`,
          backgroundColor: color,
          borderRadius: round,
          opacity: 0.6,
          ...getAlignment(),
        }}
      />
    );
  }

  // Default multi-line rendering
  const randomLastWidth = `${60 + Math.floor(Math.random() * 30)}%`;

  return (
    <div className={`my-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        return (
          <div
            key={i}
            style={{
              opacity: 0.6,
              height,
              width: isLast ? randomLastWidth : "100%",
              backgroundColor: color,
              borderRadius: round,
              marginBottom: isLast ? 0 : gap,
              ...getAlignment(),
            }}
          />
        );
      })}
    </div>
  );
}
