import React from "react";
import "../scss/default.scss";

export default function Quote({ children, className }) {
  return <div className={`${className}`}>{children}</div>;
}
