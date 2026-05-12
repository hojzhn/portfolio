import React from "react";
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext.js";
export default function MainRight(prop) {
  const { layout, setLayout } = useContext(LayoutContext);

  return (
    <div
      className="main-right flex flex-col w100 h100"
      style={{
        gap: `${Math.min(layout.design.globalMargin * 0.5, 40)}px`,
      }}
    >
      {layout.mobile && !layout.post && (
        <div
          onClick={() => {
            setLayout((prev) => ({ ...prev, menu: false }));
          }}
        >
          asd
        </div>
      )}
      <div
        className={`${layout.mobiler && "hidden"} list-image w100 h100`}
      ></div>

      {prop.children}
    </div>
  );
}
