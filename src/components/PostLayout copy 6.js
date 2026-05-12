import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import worksData from "../data/list.works.json";
import ElasticLines from "./ElasticLines";
import { LayoutContext } from "../context/LayoutContext";
function PostLayout({
  slug,
  scrollContainerRef,
  scrolledPastHeader,
  handleItemSelection,
}) {
  const getScrollTop = () =>
    window.scrollY || document.documentElement.scrollTop || 0;
  const getViewportH = () =>
    window.innerHeight || document.documentElement.clientHeight || 0;

  const getDocTop = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top + getScrollTop();
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (title) => {
    const el = sectionRefs.current[title]?.current;
    if (!el) return;
    const top = getDocTop(el) - STICKY_TOP; // STICKY_TOP = your header height
    window.scrollTo({ top, behavior: "smooth" });
  };

  const { layout, setLayout, setTheme } = useContext(LayoutContext);
  const TOP_BAR_H = layout.mobiler ? 60 : 0;
  const STICKY_TOP = TOP_BAR_H; // 16px breathing room
  const [collapsed, setCollapsed] = useState(false);
  const [isFooterOpen, setFooterOpen] = useState(false);
  const [showBars, setShowBars] = useState(true);
  const lastScrollTop = useRef(0);
  useEffect(() => {
    setCollapsed(layout.mobile);
  }, [layout.mobile]);

  const [work, setWork] = useState(null);

  const [sectionContents, setSectionContents] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubsection, setActiveSubsection] = useState(null);

  const stickySentinelRefs = useRef({});

  const [stuckSections, setStuckSections] = useState({});

  const menu = work?.menu ?? []; // safe menu even if work is not yet loaded

  const numbering = React.useMemo(() => {
    const sectionNumByTitle = {};
    const subNumByKey = {}; // key = subKey (string or sub.s)

    menu.forEach((section, sIdx) => {
      const title = typeof section === "string" ? section : section.title;
      const sNum = sIdx + 1;
      sectionNumByTitle[title] = String(sNum);

      const subs = Array.isArray(section.subsections)
        ? section.subsections
        : [];
      subs.forEach((sub, subIdx) => {
        const subKey = typeof sub === "string" ? sub : sub.s;
        subNumByKey[subKey] = `${sNum}.${subIdx + 1}`;
      });
    });

    return { sectionNumByTitle, subNumByKey };
  }, [menu]);

  useEffect(() => {
    if (menu.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const updated = {};
        entries.forEach(({ target, isIntersecting }) => {
          const key = target.dataset.key;
          updated[key] = !isIntersecting;
        });
        setStuckSections((prev) => ({ ...prev, ...updated }));
      },
      {
        root: null, // viewport
        threshold: 0.1,
        rootMargin: `-${STICKY_TOP}px 0px 0px 0px`, // accounts for your sticky header height
      },
    );

    for (const section of menu) {
      const title = typeof section === "string" ? section : section.title;
      const sentinel = stickySentinelRefs.current[title]?.current;
      if (sentinel) {
        sentinel.dataset.key = title;
        observer.observe(sentinel);
      }
    }

    return () => observer.disconnect();
  }, [menu, slug, STICKY_TOP]);

  const sectionRefs = useRef({});
  const subsectionRefs = useRef({});

  // Always define hooks at top level
  useEffect(() => {
    const found = worksData.find((w) => w.slug === slug);
    setWork(found || null);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    import(`../pages/${slug}.content.js`)
      .then((mod) => {
        setSectionContents(mod.default || {});
      })
      .catch((err) => {
        console.error(`Failed to load content for ${slug}`, err);
        setSectionContents({});
      });
  }, [slug]);

  useEffect(() => {
    if (menu.length === 0) return;

    const handleScroll = () => {
      const scrollTop = getScrollTop();
      const viewportH = getViewportH();
      const mid = scrollTop + viewportH / 2;

      // showBars logic
      if (scrollTop === 0) setShowBars(true);
      else if (scrollTop > lastScrollTop.current + 5) setShowBars(false);
      else if (scrollTop < lastScrollTop.current - 5) setShowBars(true);
      lastScrollTop.current = scrollTop;

      // section offsets in document space
      const sectionOffsets = Object.entries(sectionRefs.current).map(
        ([key, ref]) => [key, ref?.current ? getDocTop(ref.current) : Infinity],
      );

      const currentSection = sectionOffsets
        .filter(([_, top]) => top <= mid)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }

      // subsection detection near top (+ header)
      const cutoff = scrollTop + STICKY_TOP + 120;

      const subsectionOffsets = [];
      for (const section of menu) {
        const sectionTitle =
          typeof section === "string" ? section : section.title;
        const subs = Array.isArray(section.subsections)
          ? section.subsections
          : [];

        for (const sub of subs) {
          const subKey = typeof sub === "string" ? sub : sub.s;
          const node = subsectionRefs.current[subKey]?.current;
          subsectionOffsets.push({
            section: sectionTitle,
            sub: subKey,
            top: node ? getDocTop(node) : Infinity,
          });
        }
      }

      const currentSub = subsectionOffsets
        .filter((d) => d.section === currentSection && d.top <= cutoff)
        .sort((a, b) => b.top - a.top)[0];

      if (currentSub?.sub !== activeSubsection) {
        setActiveSubsection(currentSub?.sub ?? null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize once
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menu, STICKY_TOP, activeSection, activeSubsection]);

  const scrollToTarget = (target) => {
    if (target === "__TOP__") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const ref = sectionRefs.current[target];
    if (!ref?.current) return;

    const top = getDocTop(ref.current) - STICKY_TOP;
    window.scrollTo({ top, behavior: "smooth" });
  };
  if (!work) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <div className="text-gray-400 italic">Loading post data...</div>
      </Suspense>
    );
  }

  const sectionTitles = menu.map((s) => (typeof s === "string" ? s : s.title));

  const activeIndex = sectionTitles.indexOf(activeSection);

  const hasPrev = activeIndex > 0 || activeIndex === 0;

  const hasNext = activeIndex === -1 || activeIndex < sectionTitles.length - 1;

  const prevTarget =
    activeIndex === 0
      ? "__TOP__"
      : activeIndex > 0
        ? sectionTitles[activeIndex - 1]
        : null;

  const nextTarget =
    activeIndex === -1
      ? sectionTitles[0]
      : activeIndex < sectionTitles.length - 1
        ? sectionTitles[activeIndex + 1]
        : null;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {/* Page fade header */}

      {/* Fixed side menu */}
      {!layout.mobiler && (
        <div
          className={`${
            collapsed ? "w-[80px]" : "w-[200px]"
          } pointer-events-none 
         pt-8 transition-all duration-500 fixed h-screen flex flex-col justify-center ${
           scrolledPastHeader
             ? "top-0 opacity-1"
             : "top-10 opacity-0 pointer-events-none"
         }`}
          style={{
            zIndex: 100,
            left: layout.mobile
              ? layout.design.globalMargin + 10 + "px"
              : "unset",
          }}
        >
          <div
            className="pointer-events-auto"
            onMouseEnter={() => layout.mobile && setCollapsed(false)}
            onMouseLeave={() => layout.mobile && setCollapsed(true)}
          >
            <div
              className={`text-sm mb-3 cursor-pointer transition-all `}
              onClick={scrollToTop}
            >
              <i className="fa-thin fa-arrow-up"></i>
            </div>
            {menu.map((section) => {
              const title =
                typeof section === "string" ? section : section.title;
              return (
                <div
                  key={title}
                  onClick={() => scrollToSection(title)}
                  className={`text-sm whitespace-nowrap ${
                    collapsed ? "mb-1" : "mb-3"
                  } cursor-pointer transition-all ${
                    activeSection !== title && "opacity-50"
                  } `}
                  style={{
                    color:
                      activeSection === title ? "var(--txt)" : "var(--txt2)",
                  }}
                >
                  {collapsed ? (
                    <i
                      class="fa-solid fa-circle"
                      style={{ fontSize: "8px" }}
                    ></i>
                  ) : (
                    title
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* header and footer  */}
      {layout.mobiler && (
        <>
          {/* Header */}
          <div
            className="fixed top-0 left-0 w-full h-[60px] border-b  flex flex-row justify-center items-center transition-transform duration-300"
            style={{
              background: "var(--bg)",
              borderColor: "var(--txt2)",
              zIndex: 105,
              transform: showBars ? "translateY(0%)" : "translateY(-100%)",
            }}
          >
            <div className="absolute left-5" onClick={handleItemSelection}>
              <i class="fa-light fa-xmark-large"></i>
            </div>
            <div
              className="uppercase font-bold cursor-pointer"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
                setFooterOpen(false);
              }}
            >
              {work.title}
            </div>
          </div>

          {/* footer */}

          <div
            className={`w-full h-full fixed top-0 left-0 z-110 opacity-50 transition-all duration-300 ${
              isFooterOpen ? "" : "pointer-events-none"
            }`}
            style={{
              backgroundColor: isFooterOpen ? "var(--bg)" : "transparent",
            }}
            onClick={() => isFooterOpen && setFooterOpen(false)}
          />
          <div
            className={`fixed bottom-0 left-0 w-full transition-all duration-300 ${
              isFooterOpen ? "flex-col flex" : ""
            } border-t  duration-300 flex justify-center items-center`}
            style={{
              height: isFooterOpen ? "max(50vh, 400px)" : "60px",

              background: "var(--bg)",
              borderColor: "var(--txt2)",
              zIndex: 105,
              transform: showBars ? "translateY(0%)" : "translateY(100%)",
            }}
          >
            {isFooterOpen && (
              <div className="flex flex-1 flex-col w-full items-center justify-start overflow-y-auto ">
                <div
                  className="border-b w-full pt-8 pb-4 px-2 gap-2 flex items-center font-bold uppercase"
                  style={{ borderColor: "var(--txt2)" }}
                >
                  <i class="fa-solid fa-list-ul"></i>
                  Outline
                </div>

                {menu.map((section) => {
                  const title =
                    typeof section === "string" ? section : section.title;
                  return (
                    <div
                      key={title}
                      onClick={() => {
                        setFooterOpen(false);
                        const ref = sectionRefs.current[title];
                        if (ref?.current && scrollContainerRef.current) {
                          scrollContainerRef.current.scrollTo({
                            top:
                              ref.current.getBoundingClientRect().top -
                              scrollContainerRef.current.getBoundingClientRect()
                                .top +
                              scrollContainerRef.current.scrollTop,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className={`text-sm w-full  py-4 pl-8 pr-4 border-b cursor-pointer transition-all  `}
                      style={{
                        borderColor: "var(--txt2)",
                        backgroundColor:
                          activeSection === title
                            ? "var(--bg2)"
                            : "transparent",
                        color:
                          activeSection === title
                            ? "var(--txt)"
                            : "var(--txt2)",
                      }}
                    >
                      {title}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="h-[60px] flex-0 w-full flex flex-row items-center bg-[var(--bg)]">
              {hasPrev && (
                <button
                  className={`absolute left-5 w-8 h-8 transition-all duration-300`}
                  onClick={() => {
                    scrollToTarget(prevTarget);
                    setFooterOpen(false);
                  }}
                >
                  <i class="fa-sharp fa-solid fa-backward"></i>
                </button>
              )}

              {hasNext && (
                <button
                  className={`absolute right-5  w-8 h-8 transition-all duration-300`}
                  onClick={() => {
                    scrollToTarget(nextTarget);
                    setFooterOpen(false);
                  }}
                >
                  <i class="fa-sharp fa-solid fa-forward"></i>
                </button>
              )}

              {layout.mobiler && (
                <div
                  className={`flex flex-col items-center justify-center h-full w-full cursor-pointer transition-all duration-300 ${
                    isFooterOpen ? "" : "opacity-100"
                  }`}
                  onClick={() => {
                    setFooterOpen(!isFooterOpen);
                  }}
                >
                  <span className="">{activeSection || "Menu"}</span>
                  <span className="opacity-50 text-xs">
                    {activeSubsection}{" "}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div
            className={`fixed w-12 h-12 bottom-4 right-4 rounded-full bg-[var(--point)] z-[100] ${showBars === true && "opacity-0 translate-y-4"} duration-500 text-lg flex items-center justify-center cursor-pointer`}
            onClick={() => setShowBars(true)}
          >
            <i class="fa-sharp fa-regular fa-bars"></i>
          </div>
        </>
      )}

      {/* Main article content */}

      <div
        className={`${
          layout.mobile
            ? collapsed
              ? ""
              : "translate-x-[100px]"
            : "ml-[250px]"
        } mt-16 transition-all duration-500`}
      >
        {menu.map((section, index) => {
          const title = typeof section === "string" ? section : section.title;

          const subsections = Array.isArray(section.subsections)
            ? section.subsections
            : [];

          if (!sectionRefs.current[title]) {
            sectionRefs.current[title] = React.createRef();
          }
          if (!stickySentinelRefs.current[title]) {
            stickySentinelRefs.current[title] = React.createRef();
          }

          const SectionComponent = sectionContents[title];

          // console.log(stuckSections["Overview"]);

          return (
            <div key={index}>
              <div
                ref={stickySentinelRefs.current[title]}
                className="h-1"
              ></div>
              <div
                ref={sectionRefs.current[title]}
                className="h-0"
                data-key={title}
              />
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, var(--bg) 60%, transparent 100%)",
                  top: `${STICKY_TOP}px`,
                }}
                className={`flex flex-row items-end justify-start  z-10 pt-6 pb-12     pointer-events-none
 ${layout.mobiler ? "-top-2" : "-top-16 sticky"}
                  
                  ${
                    !collapsed && layout.mobile && stuckSections[title]
                      ? "translate-x-[-100px]"
                      : ""
                  }
 transition-all duration-500
                  
                  `}
              >
                <div className="text-6xl flex flex-row gap-2">
                  <h2 className="grotesk text-[var(--txt2)]">
                    {numbering.sectionNumByTitle[title]}.{" "}
                  </h2>
                  <h2
                    className={`grotesk uppercase ${!layout.mobiler && "text-ellipsis whitespace-nowrap min-w-0"}`}
                  >
                    {title}
                  </h2>
                </div>
                {(() => {
                  const matchingSub =
                    Array.isArray(section.subsections) &&
                    section.subsections.find((s) =>
                      typeof s === "string"
                        ? s === activeSubsection
                        : s.s === activeSubsection,
                    );

                  return (
                    matchingSub &&
                    !layout.mobiler && (
                      <span className="text-xs uppercase truncate max-w-full">
                        　/　
                        {typeof matchingSub === "string"
                          ? matchingSub
                          : matchingSub.s}
                      </span>
                    )
                  );
                })()}
              </div>
              {SectionComponent ? (
                <div className="max-w-[1080px] mb-16 gap-4 flex flex-col">
                  <SectionComponent />
                </div>
              ) : (
                ""
              )}
              {subsections.map((sub, subIndex) => {
                const subKey = typeof sub === "string" ? sub : sub.s;
                const subLabel = typeof sub === "string" ? sub : sub.l;

                if (!subsectionRefs.current[subKey]) {
                  subsectionRefs.current[subKey] = React.createRef();
                }

                const SubComponent = sectionContents[subKey];

                return (
                  <div
                    key={subIndex}
                    ref={subsectionRefs.current[subKey]}
                    className="max-w-[1080px] mb-32 gap-4 flex flex-col"
                  >
                    <div className="flex-row py-2 border-b border-[--txt2] mb-8">
                      <span className="font-mono text-[var(--txt2)]">
                        {numbering.subNumByKey[subKey]}.{" "}
                      </span>
                      <span className="text-lg mb-4">{subLabel}</span>
                    </div>
                    {SubComponent ? (
                      <SubComponent />
                    ) : (
                      <p className="italic" style={{ color: "var(--txt2)" }}>
                        No content for "{subKey}"
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="my-24">
                <ElasticLines />
              </div>
            </div>
          );
        })}
      </div>
    </Suspense>
  );
}

export default PostLayout;
