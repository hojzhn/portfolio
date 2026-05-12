import React, { useContext } from "react";
import CurrentDateTime from "./CurrentDateTime";
import { LayoutContext } from "../context/LayoutContext";

function Header() {
  const { layout } = useContext(LayoutContext); // Access layoutContext
  const { globalMargin } = layout.design; // Extract globalMargin from design

  return (
    <div
      className="header transition-opacity duration-300"
      style={{
        opacity: layout.post || layout.mobiler ? 0 : 1,
        width: `calc(100% - ${globalMargin * 2}px)`,
        height: `${globalMargin}px`,
      }}
    >
      <div className="time">
        <CurrentDateTime />
      </div>
      <div className="location">
        <i className="fa-light fa-location-dot"></i> Brooklyn, NY
      </div>
    </div>
  );
}

export default Header;
