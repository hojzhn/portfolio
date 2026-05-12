import ReactDOM from "react-dom/client";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./tailwind.css";

import "./scss/default.scss";
import React, { createContext, useState, useEffect } from "react";
import { LayoutProvider } from "./contexts/LayoutContext";

import Container from "./pages/Container";

function App() {
  const [layout, setLayout] = useState({
    palette: {
      mode: "light",
      theme: "noncommittal",
    },
    orientation: "portrait",
    design: {
      mainLWidth: 750,
      mainRHeight: 400,
      globalMargin: 25,
      globalFontSize: 100,
    },
    menu: false, // Initially the menu is closed
  });

  const [siteRole, setSiteRole] = useState("designer");

  useEffect(() => {
    const prefersLightMode = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    setLayout((prevState) => ({
      ...prevState,
      palette: {
        ...prevState.palette,
        mode: prefersLightMode ? "light" : "dark",
      },
    }));
  }, []);

  return (
    <layoutContext.Provider value={[layout, setLayout]}>
      <siteRoleContext.Provider value={[siteRole, setSiteRole]}>
        <div
          className={`container ${layout.palette.mode} ${layout.palette.theme}`}
        >
          <Container />
          {/* <RathouseLofi /> */}
        </div>
      </siteRoleContext.Provider>
    </layoutContext.Provider>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
