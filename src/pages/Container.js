import React, { useEffect, useState, useContext, useRef } from "react";
import "../scss/container.scss";
import {
  preLoaderAnim,
  menuAnim,
  orientationAnim,
  toMobilerAnim,
} from "../animations/index.js";
import worksData from "../data/list.works.json"; // Import the JSON file directly

import Header from "../components/Header.js";
import About from "../components/About.js";
import List from "../components/List.js";

import { LayoutContext, SiteRoleContext } from "../context/LayoutContext";

import MainRight from "../components/MainRight.js";
import PostLayout from "../components/PostLayout.js";
import InlineEditing from "../components/Bol/InlineEditing.js";
import Reordering from "../components/Bol/Reordering.js";
import ProcessAlignment from "../components/Bol/ProcessAlignment.js";
import Item from "../components/Item.js";
import ProfileArrow from "../components/ProfileArrow.js";
const Container = () => {
  const { layout, setLayout } = useContext(LayoutContext);
  const { siteRole } = useContext(SiteRoleContext);

  const [skipIntro, setSkipIntro] = useState(false); // toggle this
  const [debugMode] = useState(false); // toggle this flag

  const hasMounted = useRef(false);

  //

  useEffect(() => {
    if (debugMode) return; // <─ skip animations in debug

    if (skipIntro) {
      preLoaderAnim(layout.mobiler, layout.design, setLayout, { skip: true });
      setLayout((prev) => ({ ...prev, menu: true }));
    } else {
      preLoaderAnim(layout.mobiler, layout.design, setLayout);
    }
  }, []);
  // Effect for handling menu open/close animations

  useEffect(() => {
    if (debugMode) return; // <─ skip animations in debug
    if (skipIntro) {
      menuAnim(layout.orientation, layout.design, layout.menu, { skip: true });
    } else {
      menuAnim(layout.orientation, layout.design, layout.menu);
    }
  }, [debugMode, layout.menu]);

  // Effect for orientation change animations
  useEffect(() => {
    if (debugMode) return; // <─ skip in debug
    if (layout.menu) {
      orientationAnim(
        layout.design,
        layout.orientation,
        layout.menu,
        layout.post,
      );
    }
  }, [debugMode, layout.orientation]);

  useEffect(() => {
    if (!hasMounted.current && !debugMode) {
      hasMounted.current = true;
      return; // Skip initial run
    }

    toMobilerAnim(layout.mobiler, layout.design, layout.menu, layout.post);
  }, [layout.mobiler]);

  // Handlers for toggling states
  const toggleMenu = () => {
    setLayout((prev) => ({
      ...prev,
      menu: !prev.menu,
    }));
    console.log(`Menu is now: ${!layout.menu ? "OPEN" : "CLOSED"}`);
  };

  const toggleLightMode = () => {
    setLayout((prev) => ({
      ...prev,
      palette: {
        ...prev.palette,
        mode: prev.palette.mode === "light" ? "dark" : "light",
      },
    }));
  };

  const toggleTheme = () => {
    setLayout((prev) => ({
      ...prev,
      palette: {
        ...prev.palette,
        theme: prev.palette.theme === "noncommittal" ? "tact" : "noncommittal",
      },
    }));
  };

  const toggleOrientation = () => {
    setLayout((prev) => ({
      ...prev,
      orientation: prev.orientation === "portrait" ? "landscape" : "portrait",
    }));
  };

  const scrollRef = useRef(null);

  const scrolledPastHeader = scrollY > 400; // adjust as needed
  return (
    <div
      className="outer"
      style={{
        padding: `${layout.design.globalMargin}px`,
        fontSize: `${layout.design.globalFontSize / 100}em`,
      }}
    >
      {debugMode ? (
        <Item
          work={worksData[3]}
          isSelected={true}
          handleItemsSelection={() => {}}
          selectedRoles={["designer"]}
        />
      ) : (
        // <ProfileArrow />
        <>
          <Header />

          <div
            className="main-box"
            style={{
              gap: `${Math.min(layout.design.globalMargin * 0.5, 40)}px`,
            }}
          >
            <div className="main-l">
              <div className="preload fullscreen">I design integrity.</div>
              <About />
              <div
                className="flex justify-end absolute w-full"
                style={{
                  right: layout.design.globalMargin,
                  bottom: layout.design.globalMargin,
                }}
              >
                <div class="scroll-down-dude"></div>
              </div>
            </div>
            <div className="main-r">
              <MainRight>
                <List />
              </MainRight>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Container;
