import React, { createContext, useState, useEffect, useCallback } from "react";

export const LayoutContext = createContext();
export const SiteRoleContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState({
    mobile: false,
    mobiler: window.innerWidth < 768,
    menu: false,
    post: false,
    orientation: "portrait",
    palette: { mode: "light", theme: "noncommittal" },
    design: {
      mainLWidth: 600,
      mainRHeight: 600,
      globalMargin: 25,
      globalFontSize: 100,
    },
  });

  const [siteRole, setSiteRole] = useState("designer");

  const setTheme = useCallback((theme) => {
    setLayout((prev) =>
      prev.palette.theme === theme
        ? prev
        : {
            ...prev,
            palette: {
              ...prev.palette,
              theme,
            },
          },
    );
  }, []);

  useEffect(() => {
    const prefersLightMode = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;

    setLayout((prevState) =>
      prevState.palette.mode === (prefersLightMode ? "light" : "dark")
        ? prevState
        : {
            ...prevState,
            palette: {
              ...prevState.palette,
              mode: prefersLightMode ? "light" : "dark",
            },
          },
    );
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1200;
      const isMobiler = window.innerWidth < 768;
      const newOrientation = isMobile ? "landscape" : "portrait";
      const newHeight = window.innerHeight - layout.design.globalMargin * 2;

      setLayout((prev) => {
        const shouldUpdate =
          prev.mobile !== isMobile ||
          prev.orientation !== newOrientation ||
          prev.mobiler !== isMobiler ||
          prev.design.mainRHeight !== newHeight;

        if (!shouldUpdate) return prev;

        return {
          ...prev,
          mobile: isMobile,
          mobiler: isMobiler,
          orientation: newOrientation,
          design: {
            ...prev.design,
            mainRHeight: newHeight,
          },
        };
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [layout.design.globalMargin]);

  return (
    <LayoutContext.Provider value={{ layout, setLayout, setTheme }}>
      <SiteRoleContext.Provider value={{ siteRole, setSiteRole }}>
        {children}
      </SiteRoleContext.Provider>
    </LayoutContext.Provider>
  );
};
