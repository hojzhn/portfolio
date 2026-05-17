import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import "../scss/container.scss";

import worksData from "../data/list.works.json"; // Import the JSON file directly
import { AnimatePresence, motion } from "framer-motion";
import { LayoutContext, SiteRoleContext } from "../context/LayoutContext";
import Lissajous from "../components/Lissajous.js";
import ElasticLines from "../components/ElasticLines.js";
import List from "../components/List.js";
import Post from "./Post.js";
import MonoLabel from "../components/MonoLabel.js";
import { resolveCover } from "../images/covers.js";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const loaderVariants = {
  initial: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Main = ({ scrollRef }) => {
  const { layout, setLayout, setTheme } = useContext(LayoutContext);

  const works = useMemo(() => {
    const MONTHS = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const parse = (d) => {
      const m = String(d || "").match(/([A-Za-z]+)[\s,]+(\d{4})/);
      if (!m) return 0;
      const month = MONTHS[m[1].slice(0, 3).toLowerCase()] ?? 0;
      return new Date(parseInt(m[2], 10), month, 1).getTime();
    };
    return [...worksData].sort((a, b) => parse(b.date) - parse(a.date));
  }, []);

  const [selectedItem, setSelectedItem] = useState(0); // Selected item state
  const [hoveredId, setHoveredId] = useState(null);

  const hoveredWork = useMemo(
    () => (hoveredId == null ? null : works.find((w) => w.id === hoveredId)),
    [works, hoveredId],
  );
  const hoveredCover = hoveredWork
    ? resolveCover(hoveredWork.slug, layout.palette.mode)
    : null;

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [postReady, setPostReady] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("palette-mode");
    if (!storedMode) return;

    setLayout((prev) =>
      prev.palette.mode === storedMode
        ? prev
        : {
            ...prev,
            palette: {
              ...prev.palette,
              mode: storedMode,
            },
          },
    );
  }, [setLayout]);

  // `post` layout flag follows selection only.
  useEffect(() => {
    setLayout((prev) => {
      const next = selectedItem !== null;
      return prev.post === next ? prev : { ...prev, post: next };
    });
  }, [selectedItem, setLayout]);

  // Theme: hovered item takes precedence over the selected one, so the page
  // palette previews the hovered work and reverts when the cursor leaves.
  // On mobile we ignore hover entirely — touch fires `mouseenter` on tap
  // without a matching `mouseleave`, which would otherwise leave the palette
  // stuck on the tapped item.
  useEffect(() => {
    const useHover = !layout.mobiler;
    const work =
      useHover && hoveredId != null
        ? works.find((w) => w.id === hoveredId)
        : selectedItem != null
          ? works.find((w) => w.id === selectedItem)
          : null;
    setTheme(work?.slug || "noncommittal");
  }, [hoveredId, selectedItem, works, setTheme, layout.mobiler]);

  const handleItemSelection = (id) => {
    const next = id === null ? null : selectedItem === id ? null : id;
    if (next === selectedItem) return;

    window.scrollTo(0, 0);

    setIsScrollLocked(true);
    setIsTransitioning(true);
    setPostReady(false);
    setSelectedItem(next);
  };
  useEffect(() => {
    if (!isScrollLocked) return;
    if (!postReady) return;

    const t = setTimeout(() => {
      setIsTransitioning(false);
    }, 120);

    return () => clearTimeout(t);
  }, [isScrollLocked, postReady]);

  useEffect(() => {
    if (selectedItem === null) {
      const t = setTimeout(() => {
        setPostReady(true);
      }, 50);

      return () => clearTimeout(t);
    }
  }, [selectedItem]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isScrollLocked) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isScrollLocked]);

  const toggleLightMode = () => {
    setLayout((prev) => {
      const nextMode = prev.palette.mode === "light" ? "dark" : "light";
      localStorage.setItem("palette-mode", nextMode);

      return {
        ...prev,
        palette: {
          ...prev.palette,
          mode: nextMode,
        },
      };
    });
  };
  return (
    <>
      <AnimatePresence onExitComplete={() => setIsScrollLocked(false)}>
        {isTransitioning && (
          <motion.div
            key="transition-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--bg)]"
          >
            <div className="flex flex-col items-center gap-3">
              <Lissajous size={40} color="var(--txt)" />
              <div className="text-xs opacity-60">Loading post...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`h-auto ${layout.mobiler ? "p-5" : "p-20"} flex justify-center`}
        style={{
          fontSize: `${layout.design.globalFontSize / 100}em`,
        }}
      >
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <motion.div
              key={`post-${selectedItem}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.28,
                ease: "easeOut",
                layout: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              <Post
                scrollRef={scrollRef}
                selectedItem={selectedItem}
                works={works}
                handleItemSelection={() => handleItemSelection(null)}
                onReady={() => setPostReady(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.28,
                ease: "easeOut",
                layout: { duration: 0.3, ease: "easeInOut" },
              }}
              className="layout w-full h-auto flex justify-start gap-16 "
            >
              <div className="profile-container max-w-[600px]">
                <button
                  type="button"
                  aria-label="Toggle theme"
                  className="hover:bg-[var(--bg2)] text-[var(-txt2)] w-8 h-8 transition-all duration-300 rounded-full flex justify-center items-center"
                  onClick={toggleLightMode}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.i
                      key={layout.palette.mode}
                      initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 20, scale: 0.85 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={
                        layout.palette.mode === "light"
                          ? "fa-sharp fa-solid fa-sun-bright"
                          : "fa-sharp fa-solid fa-moon"
                      }
                    />
                  </AnimatePresence>
                </button>

                <div className="">
                  <div className="text-6xl instrument pt-40">
                    Savvy(Ahn).
                    {/* <span className="rotate-180 inline-block relative top-[0.18em]">
                      m
                    </span> */}
                  </div>

                  <div className="flex flex-col my-4">
                    {/* <div>Savvy Ahn</div> */}

                    <a
                      href="mailto:xbajta@gmail.com"
                      className="flex flex-row items-center font-mono text-xs mt-2 text-[var(--txt)] hover:text-[var(--point)] transition-colors"
                    >
                      <i className="fa-solid fa-envelope mr-2 text-[9px] text-[var(--txt3)]" />{" "}
                      xbajta@gmail.com
                    </a>
                    <div className="flex flex-row items-center text-xs mt-2 font-mono">
                      <i className="fa-solid fa-location-dot mr-2 text-[9px] text-[var(--txt3)]" />{" "}
                      Manhattan, New York
                    </div>
                  </div>
                  <div>
                    <div className="text-lg my-8">
                      I focus on end-to-end value creation, first as an artist
                      and now as a designer. I pair conceptual clarity with
                      execution under constraint, turning core ideas into
                      systems that function in production. I apply this approach
                      across UX, full stack development, physical interaction
                      prototyping, and HCI research.
                    </div>
                  </div>
                </div>

                <ElasticLines className="my-8" />

                <div>
                  <MonoLabel>Selected Works</MonoLabel>
                  <List
                    works={works}
                    selectedItem={selectedItem}
                    handleItemSelection={handleItemSelection}
                    onHover={layout.mobiler ? undefined : setHoveredId}
                  />
                </div>
              </div>
              {!layout.mobiler && (
                <div className="flex-1 relative overflow-hidden">
                  {/* Render every cover up front and just toggle opacity —
                      no mount/unmount means no blink as the cursor moves
                      between items, and the browser keeps each image cached
                      after its first load. */}
                  {works.map((w) => {
                    const cover = resolveCover(w.slug, layout.palette.mode);
                    if (!cover) return null;
                    const active = hoveredId === w.id;
                    return (
                      <img
                        key={w.id}
                        src={cover}
                        alt={w.title || ""}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
                        style={{
                          opacity: active ? 1 : 0,
                          pointerEvents: "none",
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Main;
