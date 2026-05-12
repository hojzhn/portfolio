import React from "react";

export default function SpeechBubble({
  children,
  tail = "bottom",
  bg = "var(--txt2)",
  text = "var(--bg)",
  borderColor = "transparent",
  borderWidth = 1,
  tailSize = 8,
  fullWidth = false,
  onClick,
  className = "",
}) {
  const baseStyle = {
    background: bg,
    color: text,
    border: `${borderWidth}px solid ${borderColor}`,
  };

  const tailBase = {
    position: "absolute",
    width: 0,
    height: 0,
  };

  const innerOffset = borderWidth;

  const createTail = (direction) => {
    const outer = {};
    const inner = {};

    if (direction === "bottom") {
      outer.top = "100%";
      outer.left = "50%";
      outer.transform = "translateX(-50%)";
      outer.borderLeft = `${tailSize + borderWidth}px solid transparent`;
      outer.borderRight = `${tailSize + borderWidth}px solid transparent`;
      outer.borderTop = `${tailSize + borderWidth}px solid ${borderColor}`;

      inner.top = `calc(100% - ${borderWidth}px)`;
      inner.left = "50%";
      inner.transform = "translateX(-50%)";
      inner.borderLeft = `${tailSize}px solid transparent`;
      inner.borderRight = `${tailSize}px solid transparent`;
      inner.borderTop = `${tailSize}px solid ${bg}`;
    }

    if (direction === "top") {
      outer.bottom = "100%";
      outer.left = "50%";
      outer.transform = "translateX(-50%)";
      outer.borderLeft = `${tailSize + borderWidth}px solid transparent`;
      outer.borderRight = `${tailSize + borderWidth}px solid transparent`;
      outer.borderBottom = `${tailSize + borderWidth}px solid ${borderColor}`;

      inner.bottom = `calc(100% - ${borderWidth}px)`;
      inner.left = "50%";
      inner.transform = "translateX(-50%)";
      inner.borderLeft = `${tailSize}px solid transparent`;
      inner.borderRight = `${tailSize}px solid transparent`;
      inner.borderBottom = `${tailSize}px solid ${bg}`;
    }

    if (direction === "left") {
      outer.right = "100%";
      outer.top = "50%";
      outer.transform = "translateY(-50%)";
      outer.borderTop = `${tailSize + borderWidth}px solid transparent`;
      outer.borderBottom = `${tailSize + borderWidth}px solid transparent`;
      outer.borderRight = `${tailSize + borderWidth}px solid ${borderColor}`;

      inner.right = `calc(100% - ${borderWidth}px)`;
      inner.top = "50%";
      inner.transform = "translateY(-50%)";
      inner.borderTop = `${tailSize}px solid transparent`;
      inner.borderBottom = `${tailSize}px solid transparent`;
      inner.borderRight = `${tailSize}px solid ${bg}`;
    }

    if (direction === "right") {
      outer.left = "100%";
      outer.top = "50%";
      outer.transform = "translateY(-50%)";
      outer.borderTop = `${tailSize + borderWidth}px solid transparent`;
      outer.borderBottom = `${tailSize + borderWidth}px solid transparent`;
      outer.borderLeft = `${tailSize + borderWidth}px solid ${borderColor}`;

      inner.left = `calc(100% - ${borderWidth}px)`;
      inner.top = "50%";
      inner.transform = "translateY(-50%)";
      inner.borderTop = `${tailSize}px solid transparent`;
      inner.borderBottom = `${tailSize}px solid transparent`;
      inner.borderLeft = `${tailSize}px solid ${bg}`;
    }

    return { outer, inner };
  };

  const { outer, inner } = createTail(tail);

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex w-fit py-1 px-3 rounded-lg ${className} ${
        fullWidth ? "flex w-full" : "inline-flex w-fit"
      }`}
      style={baseStyle}
    >
      {children}
      <div style={{ ...tailBase, ...outer }} />
      <div style={{ ...tailBase, ...inner }} />
    </div>
  );
}
