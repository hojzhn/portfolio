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

  useEffect(() => {
    if (selectedItem !== null) {
      setLayout((prev) =>
        prev.post === true ? prev : { ...prev, post: true },
      );
      const selectedWork = works.find((w) => w.id === selectedItem);

      if (selectedWork?.slug) {
        setTheme(selectedWork.slug);
      }
    } else {
      setTheme("noncommittal");
      setLayout((prev) =>
        prev.post === false ? prev : { ...prev, post: false },
      );
    }
  }, [selectedItem, works, setLayout, setTheme]);

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
              className="layout w-full h-auto flex justify-center"
            >
              <div className="profile-container max-w-[600px]">
                <div className="profile">
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
                    {/* 
                    <div className="grid gap-8 w-full grid-cols-1 sm:grid-cols-2">
                      <a
                        href="https://www.pratt.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="min-w-0 cursor-pointer ">
                          <div>
                            Pratt Institute{" "}
                            <i className="fa-sharp fa-regular fa-arrow-up-right"></i>
                          </div>
                          <div className="opacity-60">
                            MFA Digital Arts (Interactive Arts)
                          </div>
                        </div>
                      </a>
                      <a
                        href="https://www.karts.ac.kr/en/main.do"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="min-w-0">
                          <div>
                            Korea Nat'l University of Arts{" "}
                            <i className="fa-sharp fa-regular fa-arrow-up-right"></i>
                          </div>
                          <div className="opacity-60">BA Fine Arts</div>
                          <div className="opacity-60">
                            Minor in Dance Theory
                          </div>
                        </div>
                      </a>
                    </div> */}

                    <ElasticLines className="my-8" />

                    <MonoLabel>Selected Works</MonoLabel>
                  </div>
                </div>

                <List
                  works={works}
                  selectedItem={selectedItem}
                  handleItemSelection={handleItemSelection}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Main;
