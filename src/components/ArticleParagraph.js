import React, { useContext } from "react";

import { LayoutContext } from "../context/LayoutContext.js";
import H3 from "./H3.js";

export default function ArticleParagraph({
  title = "",
  children,
  className = "",
}) {
  const { layout } = useContext(LayoutContext);

  const hasMarginOverride = className.includes("mb-");

  return (
    <div
      className={`
        flex flex-col gap-4 justify-between w-full
        ${hasMarginOverride ? "" : "mb-[4em]"}
        ${className}
      `}
    >
      <div>
        <H3 className="text-[var(--point)] text-[0.8em]">{title}</H3>
      </div>
      <div className="w-full flex flex-col gap-4">{children}</div>
    </div>
  );
}
