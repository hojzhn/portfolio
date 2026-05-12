import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import worksData from "../data/list.works.json";
import ElasticLines from "./ElasticLines";
import { LayoutContext } from "../context/LayoutContext";
import ArticleColophon from "./ArticleColophon";

const getScrollTop = () =>
  window.scrollY || document.documentElement.scrollTop || 0;

const getViewportH = () =>
  window.innerHeight || document.documentElement.clientHeight || 0;

const getDocTop = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top + getScrollTop();
};

const getItemTitle = (item) => (typeof item === "string" ? item : item.title);

const getItemKey = (item) =>
  typeof item === "string" ? item : item.contentKey || item.title;

const getItemDesc = (item) =>
  typeof item === "string" ? null : item.desc || null;

const getItemDescKey = (item) =>
  typeof item === "string" ? null : item.descKey || null;

const rowClass = `
  flex max-2xl:flex-col 2xl:flex-row
  items-start
  gap-[1em] 2xl:gap-[4em]

  justify-start
  z-[60]
`;

const leftColClass = `
  flex flex-col gap-2
  w-full
  2xl:basis-[30%]
  2xl:max-w-[30%]
  2xl:min-w-0
  2xl:shrink-0
  leading-tight
    max-2xl:mb-[2em]
`;

const rightColClass = `
  flex-1 min-w-0
  flex flex-col gap-[2em] w-full
`;

const DesktopSideMenu = React.memo(function DesktopSideMenu({
  layout,
  collapsed,
  scrolledPastHeader,
  menu,
  activeSection,
  onScrollToTop,
  onScrollToSection,
  onSetCollapsed,
}) {
  if (layout.mobiler) return null;

  return (
    <div
      className={`${
        collapsed ? "w-[80px]" : "w-[200px]"
      } pointer-events-none pt-8 transition-all duration-500 fixed h-screen flex flex-col justify-center ${
        scrolledPastHeader
          ? "top-0 opacity-1"
          : "top-10 opacity-0 pointer-events-none"
      }`}
      style={{
        zIndex: 100,
        left: layout.mobile ? layout.design.globalMargin + 10 + "px" : "unset",
      }}
    >
      <div
        className="pointer-events-auto"
        onMouseEnter={() => layout.mobile && onSetCollapsed(false)}
        onMouseLeave={() => layout.mobile && onSetCollapsed(true)}
      >
        <div
          className="text-sm mb-3 cursor-pointer transition-all"
          onClick={onScrollToTop}
        >
          <i className="fa-thin fa-arrow-up"></i>
        </div>

        {menu.map((section, index) => {
          const title = typeof section === "string" ? section : section.title;

          return (
            <div
              key={title}
              onClick={() => onScrollToSection(title)}
              className={`text-sm whitespace-nowrap ${
                collapsed ? "mb-1" : "mb-3"
              } cursor-pointer transition-all ${
                activeSection !== title ? "opacity-50" : ""
              }`}
              style={{
                color: activeSection === title ? "var(--txt)" : "var(--txt2)",
              }}
            >
              {!collapsed && (
                <span className="font-mono text-[0.8em] text-[var(--point)] pr-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              {collapsed ? (
                <i
                  className="fa-solid fa-circle"
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
  );
});

const DemoFAB = React.memo(function DemoFAB({ demo, visible, mobiler }) {
  if (mobiler || !demo?.url) return null;

  return (
    <a
      href={demo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed bottom-6 right-6 z-[110] inline-flex items-center overflow-hidden
        rounded-full border border-[var(--point)] bg-[var(--point2)]
        px-5 py-2 text-[13px] font-medium whitespace-nowrap
        text-[var(--point)] hover:text-[var(--point2)]
        shadow-[0_8px_24px_var(--bg2)]
        transition-all duration-500 ease-out
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 pointer-events-none"
        }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--point)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
      />
      <span className="relative z-10 flex items-center gap-2">
        <span>{demo.buttonText}</span>
        <i
          className="fa-regular fa-arrow-up-right transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </a>
  );
});

const MobileChrome = React.memo(function MobileChrome({
  layout,
  work,
  menu,
  showBars,
  setShowBars,
  handleItemSelection,
  scrollContainerRef,
  setExternalScrollToTopSignal,
  isFooterOpen,
  setFooterOpen,
  activeSection,
  activeSubsection,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onSelectSection,
  demo,
}) {
  if (!layout.mobiler) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-[60px] flex flex-row justify-center items-center transition-transform duration-300"
        style={{
          background: "var(--bg)",
          borderColor: "var(--txt2)",
          zIndex: 105,
          transform: showBars ? "translateY(0%)" : "translateY(-100%)",
          boxShadow: "0px -4px 20px var(--bg2)",
        }}
      >
        <div className="absolute left-5" onClick={handleItemSelection}>
          <i className="fa-light fa-xmark-large"></i>
        </div>

        <div
          className="uppercase text-[0.8em] font-mono tracking-[0.16em] cursor-pointer"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setExternalScrollToTopSignal((v) => v + 1);
            setFooterOpen(false);
          }}
        >
          {work.title}
        </div>

        {demo?.url && (
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-5 flex items-center gap-1.5 font-mono text-[0.8em] uppercase tracking-[0.16em] text-[var(--point)]"
          >
            <span>demo</span>
            <i
              className="fa-regular fa-arrow-up-right-from-square text-[0.85em]"
              aria-hidden="true"
            />
          </a>
        )}
      </div>

      <div
        className={`w-full h-full fixed top-0 left-0 opacity-50 transition-opacity duration-300 ${
          isFooterOpen ? "" : "pointer-events-none"
        }`}
        style={{
          zIndex: 104,
          backgroundColor: isFooterOpen ? "var(--bg)" : "transparent",
        }}
        onClick={() => isFooterOpen && setFooterOpen(false)}
      />

      <div
        className="fixed bottom-0 left-0 w-full"
        style={{
          zIndex: 105,
          transform: showBars ? "translateY(0%)" : "translateY(100%)",
          transition: "transform 300ms",
        }}
      >
        <div
          className={`absolute left-0 w-full  transition-all duration-300 ${
            isFooterOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{
            bottom: "60px",
            maxHeight: "max(50vh, 400px)",
            overflowY: "auto",
            background: "var(--bg)",
            borderColor: "var(--txt2)",
            transform: isFooterOpen ? "translateY(0)" : "translateY(16px)",
            boxShadow: "0px 4px 20px var(--bg2)",
          }}
        >
          <div className="flex flex-1 flex-col w-full items-center justify-start overflow-y-auto">
            <div
              className="border-b w-full pt-8 pb-4 px-2 gap-2 flex items-center font-mono text-[0.8em] uppercase"
              style={{ borderColor: "var(--txt3)" }}
            >
              <i className="fa-solid fa-list-ul"></i>
              Outline
            </div>

            {menu.map((section, index) => {
              const title =
                typeof section === "string" ? section : section.title;

              return (
                <div
                  key={title}
                  onClick={() => {
                    setFooterOpen(false);
                    onSelectSection(title);
                  }}
                  className="text-sm w-full py-4 pl-8 pr-4 border-b cursor-pointer transition-all"
                  style={{
                    borderColor: "var(--txt3)",
                    backgroundColor:
                      activeSection === title ? "var(--bg2)" : "transparent",
                    color:
                      activeSection === title ? "var(--txt)" : "var(--txt)",
                  }}
                >
                  <span className="font-mono text-[0.8em] text-[var(--point)] pr-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {title}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="h-[60px] w-full  flex flex-row items-center bg-[var(--bg)]"
          style={{
            background: "var(--bg)",
            borderColor: "var(--txt2)",
            boxShadow: "0px -4px 20px var(--bg2)",
          }}
        >
          {hasPrev && (
            <button
              className="absolute left-5 w-8 h-8 transition-all duration-300"
              onClick={() => {
                onPrev();
                setFooterOpen(false);
              }}
            >
              <i className="fa-sharp fa-solid fa-backward"></i>
            </button>
          )}

          {hasNext && (
            <button
              className="absolute right-5 w-8 h-8 transition-all duration-300"
              onClick={() => {
                onNext();
                setFooterOpen(false);
              }}
            >
              <i className="fa-sharp fa-solid fa-forward"></i>
            </button>
          )}

          {layout.mobiler && (
            <div
              className={`flex flex-col items-center justify-center h-full w-full cursor-pointer transition-all duration-300 ${
                isFooterOpen ? "" : "opacity-100"
              }`}
              onClick={() => setFooterOpen((v) => !v)}
            >
              <span>{activeSection || "Menu"}</span>
              <span className="opacity-50 text-xs">{activeSubsection} </span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed w-12 h-12 bottom-4 right-4 rounded-full bg-[var(--point)] z-[100] ${
          showBars === true ? "opacity-0 translate-y-4" : ""
        } duration-500 text-lg flex items-center justify-center cursor-pointer`}
        onClick={() => setShowBars(true)}
      >
        <i className="fa-sharp fa-regular fa-bars"></i>
      </div>
    </>
  );
});

const PostContent = React.memo(function PostContent({
  layout,
  collapsed,
  menu,
  numbering,
  sectionContents,
  sectionRefs,
  subsectionRefs,
  stickySentinelRefs,
  stuckSections,
  activeSubsection,
  STICKY_TOP,
}) {
  return (
    <div
      className={`${
        layout.mobile ? (collapsed ? "" : "translate-x-[100px]") : "ml-[250px]"
      } mt-16 transition-all duration-500`}
    >
      {menu.map((section, index) => {
        const title = getItemTitle(section);
        const sectionKey = getItemKey(section);
        const desc = getItemDesc(section);
        const descKey = getItemDescKey(section);

        const SectionComponent = sectionContents[sectionKey];
        const SectionDescription = descKey ? sectionContents[descKey] : null;
        const subsections = Array.isArray(section.subsections)
          ? section.subsections
          : [];

        if (!sectionRefs.current[title]) {
          sectionRefs.current[title] = React.createRef();
        }

        if (!stickySentinelRefs.current[title]) {
          stickySentinelRefs.current[title] = React.createRef();
        }

        return (
          <div key={index}>
            <div ref={stickySentinelRefs.current[title]} className="h-1"></div>

            <div
              ref={sectionRefs.current[title]}
              className="h-0"
              data-key={title}
            />

            <div
              className={`
 border-[var(--txt3)]
  ${rowClass} 2xl:items-end
  pt-6  2xl:pb-[6em]
  transition-all duration-500
`}
            >
              <div className={`${leftColClass}`}>
                <h2 className="text-[var(--point)] font-mono tracking-[0.2em] text-[0.8em]">
                  {String(numbering.sectionNumByTitle[title]).padStart(2, "0")}
                </h2>
                <h2
                  className={`uppercase mb-[1em] font-mono tracking-[0.2em] text-[var(--txt2)] text-[0.8em] whitespace-pre-line ${!layout.mobiler ? "min-w-0" : ""}`}
                >
                  {title}
                </h2>
                <div className="whitespace-pre-line min-w-0 flex-1 text-[2em] leading-tight ">
                  {desc}
                </div>
                {SectionDescription && (
                  <div className="leading-normal text-[var(--txt2)] gap-[1em] flex flex-col mt-4">
                    <SectionDescription />
                  </div>
                )}
              </div>

              {SectionComponent ? (
                <div className="flex-1 min-w-0 gap-4 flex flex-col relative max-2xl:mb-[2em] ">
                  <SectionComponent />
                </div>
              ) : (
                <div className="flex-1 min-w-0 gap-4 flex flex-col relative ">
                  {/* <SectionComponent /> */}
                </div>
              )}
            </div>

            {subsections.map((sub, subIndex) => {
              const isLast = subIndex === subsections.length - 1;

              const subLabel = getItemTitle(sub);
              const subKey = getItemKey(sub);
              const subDesc = getItemDesc(sub);
              const subDescKey = getItemDescKey(sub);

              const SubComponent = sectionContents[subKey];
              const SubDescription = subDescKey
                ? sectionContents[subDescKey]
                : null;
              if (!subsectionRefs.current[subKey]) {
                subsectionRefs.current[subKey] = React.createRef();
              }

              return (
                <div
                  key={subIndex}
                  ref={subsectionRefs.current[subKey]}
                  className={`
  my-[2em]
  ${rowClass}
  pt-8 pb-[3em] 2xl:pb-[6em]
`}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, var(--bg3) 0, var(--bg3) 4px, transparent 4px, transparent 8px)",
                    backgroundSize: "100% 1px",
                    backgroundPosition: "top left",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className={leftColClass}>
                    <span className="font-mono text-xs text-[var(--point)]">
                      {numbering.subNumByKey[subKey]}.
                    </span>

                    <span className="text-[1.2em] mb-4 leading-tight whitespace-pre-line">
                      {subLabel}
                    </span>

                    {SubDescription && (
                      <div className="leading-normal text-[var(--txt2)] gap-[1em] flex flex-col">
                        <SubDescription />
                      </div>
                    )}
                  </div>
                  {SubComponent ? (
                    <div className={rightColClass}>
                      <SubComponent />
                    </div>
                  ) : (
                    <p className="italic text-[var(--txt2)]">
                      No content for "{subKey}"
                    </p>
                  )}
                </div>
              );
            })}

            <div className="my-[2em]">
              <ElasticLines />
            </div>
          </div>
        );
      })}
    </div>
  );
});

function PostLayout({
  slug,
  scrollContainerRef,
  scrolledPastHeader,
  handleItemSelection,
}) {
  const { layout } = useContext(LayoutContext);

  const TOP_BAR_H = layout.mobiler ? 60 : 0;
  const STICKY_TOP = TOP_BAR_H;

  const [collapsed, setCollapsed] = useState(false);
  const [isFooterOpen, setFooterOpen] = useState(false);
  const [showBars, setShowBars] = useState(true);

  const [work, setWork] = useState(null);
  const [sectionContents, setSectionContents] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubsection, setActiveSubsection] = useState(null);
  const [stuckSections, setStuckSections] = useState({});

  const lastScrollTop = useRef(0);
  const activeSectionRef = useRef(null);
  const activeSubsectionRef = useRef(null);
  const stickySentinelRefs = useRef({});
  const sectionRefs = useRef({});
  const subsectionRefs = useRef({});
  const rafIdRef = useRef(null);

  const [externalScrollToTopSignal, setExternalScrollToTopSignal] = useState(0);

  useEffect(() => {
    setCollapsed(layout.mobile);
  }, [layout.mobile]);

  useEffect(() => {
    const found = worksData.find((w) => w.slug === slug);
    setWork(found || null);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    import(`../pages/${slug}.content.js`)
      .then((mod) => {
        if (cancelled) return;
        setSectionContents(mod.default || {});
      })
      .catch((err) => {
        console.error(`Failed to load content for ${slug}`, err);
        if (cancelled) return;
        setSectionContents({});
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const menu = work?.menu ?? [];
  const numbering = useMemo(() => {
    const sectionNumByTitle = {};
    const subNumByKey = {};

    menu.forEach((section, sIdx) => {
      const title = getItemTitle(section);
      const sectionKey = getItemKey(section);
      const sNum = sIdx + 1;

      sectionNumByTitle[title] = String(sNum);
      sectionNumByTitle[sectionKey] = String(sNum);

      const subs = Array.isArray(section?.subsections)
        ? section.subsections
        : [];

      subs.forEach((sub, subIdx) => {
        const subKey = getItemKey(sub);
        const subTitle = getItemTitle(sub);

        subNumByKey[subKey] = `${sNum}.${subIdx + 1}`;
        subNumByKey[subTitle] = `${sNum}.${subIdx + 1}`;
      });
    });

    return { sectionNumByTitle, subNumByKey };
  }, [menu]);
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToSection = useCallback(
    (title) => {
      const el = sectionRefs.current[title]?.current;
      if (!el) return;

      const top = getDocTop(el) - STICKY_TOP;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [STICKY_TOP],
  );

  const scrollToTarget = useCallback(
    (target) => {
      if (target === "__TOP__") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const ref = sectionRefs.current[target];
      if (!ref?.current) return;

      const top = getDocTop(ref.current) - STICKY_TOP;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [STICKY_TOP],
  );

  const selectSectionFromFooter = useCallback(
    (title) => {
      scrollToSection(title);
    },
    [scrollToSection],
  );

  useEffect(() => {
    if (menu.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setStuckSections((prev) => {
          const next = { ...prev };
          let changed = false;

          entries.forEach(({ target, isIntersecting }) => {
            const key = target.dataset.key;
            const value = !isIntersecting;
            if (next[key] !== value) {
              next[key] = value;
              changed = true;
            }
          });

          return changed ? next : prev;
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: `-${STICKY_TOP}px 0px 0px 0px`,
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

  useEffect(() => {
    if (menu.length === 0) return;

    const computeScrollState = () => {
      const scrollTop = getScrollTop();
      const viewportH = getViewportH();
      const mid = scrollTop + viewportH / 2;

      if (scrollTop === 0) {
        setShowBars((prev) => (prev ? prev : true));
      } else if (scrollTop > lastScrollTop.current + 5) {
        setShowBars((prev) => (prev ? false : prev));
      } else if (scrollTop < lastScrollTop.current - 5) {
        setShowBars((prev) => (prev ? prev : true));
      }

      lastScrollTop.current = scrollTop;

      const sectionOffsets = Object.entries(sectionRefs.current).map(
        ([key, ref]) => [key, ref?.current ? getDocTop(ref.current) : Infinity],
      );

      const currentSection =
        sectionOffsets
          .filter(([_, top]) => top <= mid)
          .sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

      if (currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);
      }

      const cutoff = scrollTop + STICKY_TOP + 120;
      const subsectionOffsets = [];

      for (const section of menu) {
        const sectionTitle = getItemTitle(section);
        const subs = Array.isArray(section?.subsections)
          ? section.subsections
          : [];

        for (const sub of subs) {
          const subKey = getItemKey(sub);
          const node = subsectionRefs.current[subKey]?.current;

          subsectionOffsets.push({
            section: sectionTitle,
            sub: subKey,
            top: node ? getDocTop(node) : Infinity,
          });
        }
      }

      const currentSub =
        subsectionOffsets
          .filter((d) => d.section === currentSection && d.top <= cutoff)
          .sort((a, b) => b.top - a.top)[0]?.sub ?? null;

      if (currentSub !== activeSubsectionRef.current) {
        activeSubsectionRef.current = currentSub;
        setActiveSubsection(currentSub);
      }
    };

    const onScroll = () => {
      if (rafIdRef.current != null) return;

      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        computeScrollState();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    computeScrollState();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [menu, STICKY_TOP, slug, externalScrollToTopSignal]);

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
      <DesktopSideMenu
        layout={layout}
        collapsed={collapsed}
        scrolledPastHeader={scrolledPastHeader}
        menu={menu}
        activeSection={activeSection}
        onScrollToTop={scrollToTop}
        onScrollToSection={scrollToSection}
        onSetCollapsed={setCollapsed}
      />
      <MobileChrome
        layout={layout}
        work={work}
        menu={menu}
        showBars={showBars}
        setShowBars={setShowBars}
        handleItemSelection={handleItemSelection}
        scrollContainerRef={scrollContainerRef}
        setExternalScrollToTopSignal={setExternalScrollToTopSignal}
        isFooterOpen={isFooterOpen}
        setFooterOpen={setFooterOpen}
        activeSection={activeSection}
        activeSubsection={activeSubsection}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={() => scrollToTarget(prevTarget)}
        onNext={() => scrollToTarget(nextTarget)}
        onSelectSection={selectSectionFromFooter}
        demo={work?.demo}
      />
      <DemoFAB demo={work?.demo} visible={showBars} mobiler={layout.mobiler} />
      <PostContent
        layout={layout}
        collapsed={collapsed}
        menu={menu}
        numbering={numbering}
        sectionContents={sectionContents}
        sectionRefs={sectionRefs}
        subsectionRefs={subsectionRefs}
        stickySentinelRefs={stickySentinelRefs}
        stuckSections={stuckSections}
        activeSubsection={activeSubsection}
        STICKY_TOP={STICKY_TOP}
      />{" "}
      <ArticleColophon />
    </Suspense>
  );
}

export default PostLayout;
