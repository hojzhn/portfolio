import React from "react";

export default function EuroAmount({
  value,
  Num,
  p,
  className = "",
  euroClassName = "",
  euroScale = 0.6, // size relative to number
  euroOffset = -0.17, // vertical shift relative to number size
  plain = false, // disables styling
}) {
  const formatted = Number(value || 0).toLocaleString();

  if (plain) {
    return (
      <span className={className}>
        €<Num value={formatted} />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span
        style={{
          color: p.primary,
          fontSize: `${euroScale}em`,
          transform: `translateY(${euroOffset}em)`,
        }}
        className={`leading-none mr-1 opacity-90 ${euroClassName}`}
      >
        €
      </span>
      <Num value={formatted} />
    </span>
  );
}
