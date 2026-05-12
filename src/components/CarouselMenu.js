import React, { useState, useEffect, useRef } from "react";

/**
 * @param {Object} props
 * @param {Array<{ title: string, content: React.ReactNode }>} props.tabs
 * @param {string} [props.initialTab]
 */
const CarouselMenu = ({ tabs, initialTab, format }) => {
  const [tab, setTab] = useState(initialTab || tabs[0]?.title || "");
  const [prevTab, setPrevTab] = useState(tab);
  const [direction, setDirection] = useState(0);
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});

  const activeIndex = tabs.findIndex((t) => t.title === tab);
  const activeContent = tabs[activeIndex]?.content;

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
    } else {
      setTab(tabs[0]?.title || "");
    }
  }, [format, initialTab]);

  useEffect(() => {
    const current = tabRefs.current[tab];
    const indicator = indicatorRef.current;

    if (current && indicator) {
      const rect = current.getBoundingClientRect();
      const parentRect = current.parentNode.getBoundingClientRect();

      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${rect.left - parentRect.left}px`;
    }
  }, [tab, tabs]);

  const handleTabChange = (newTab) => {
    const newIndex = tabs.findIndex((t) => t.title === newTab);
    const oldIndex = tabs.findIndex((t) => t.title === tab);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setPrevTab(tab);
    setTab(newTab);
  };

  return (
    <>
      {/* Tab Menu */}
      <div
        className="relative mb-4 py-2 border-b sticky -top-16 z-[20] bg-[var(--bg2)]"
        style={{ borderColor: "var(--txt)" }}
      >
        <div className="flex gap-6 pt-2">
          {tabs.map((t) => (
            <div
              key={t.title}
              ref={(el) => (tabRefs.current[t.title] = el)}
              onClick={() => handleTabChange(t.title)}
              className={`relative text-xs pb-1 ${
                tab === t.title ? "font-bold" : ""
              }`}
            >
              {t.title}
            </div>
          ))}
        </div>
        {/* Indicator Line */}
        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-[2px] transition-all duration-300"
          style={{ width: 0, left: 0, backgroundColor: "var(--txt)" }}
        />
      </div>

      {/* Swipe Animation */}
      <div className="relative">
        <div
          className="absolute w-full transition-transform duration-300"
          key={tab}
          style={{
            transform: `translateX(${
              direction === 1 ? "100%" : direction === -1 ? "-100%" : "0%"
            })`,
            opacity: 0,
            position: "absolute",
          }}
        >
          {/* Exit Animation Placeholder (optional) */}
        </div>
        <div
          className="absolute w-full transition-transform duration-300 pb-24"
          style={{
            transform: "translateX(0%)",
            opacity: 1,
          }}
        >
          {activeContent}
        </div>
      </div>
    </>
  );
};

export default CarouselMenu;
