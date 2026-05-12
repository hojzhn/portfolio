import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import ElasticLines from "./ElasticLines";
import { LayoutContext } from "../context/LayoutContext";

export default function PostLayout({
  work,
  slug,
  scrollContainerRef,
  scrolledPastHeader,
  handleItemSelection,
}) {
  const { layout } = useContext(LayoutContext);
  const TOP_BAR_H = layout.mobiler ? 60 : 0;
  const STICKY_TOP = TOP_BAR_H; // 16px breathing room
  const [sectionContents, setSectionContents] = useState({});
  const sectionRefs = useRef({});
  const subsectionRefs = useRef({});

  const menu = work?.menu ?? [];
  const SCROLL_MARGIN_TOP = layout.mobiler ? 80 : 120;

  useEffect(() => {
    if (!slug) return;
    import(`../pages/${slug}.content.js`)
      .then((mod) => setSectionContents(mod.default || {}))
      .catch((err) => {
        console.error(`Failed to load content for ${slug}`, err);
        setSectionContents({});
      });
  }, [slug]);

  const getTopWithinContainer = (el, container) => {
    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    return container.scrollTop + (elRect.top - cRect.top) - SCROLL_MARGIN_TOP;
  };

  const scrollToEl = (el) => {
    const container = scrollContainerRef.current;
    if (!container || !el) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: getTopWithinContainer(el, container),
        behavior: "smooth",
      });
      requestAnimationFrame(() => {
        container.scrollTo({
          top: getTopWithinContainer(el, container),
          behavior: "smooth",
        });
      });
    });
  };

  const scrollToSection = (title) => {
    if (title === "__TOP__") {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const ref = sectionRefs.current[title];
    if (ref?.current) scrollToEl(ref.current);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {/* Page fade header */}
      <div
        className={`w-full h-4/5 bg-white duration-500 ${
          scrolledPastHeader ? "opacity-0" : "opacity-1"
        }`}
      />

      {/* Desktop side outline */}
      {!layout.mobiler && (
        <div
          className={`pointer-events-none pt-8 fixed h-screen flex flex-col justify-center transition-all duration-500 ${
            scrolledPastHeader ? "top-0 opacity-100" : "top-10 opacity-0"
          }`}
          style={{
            zIndex: 100,
            left: layout.mobile
              ? layout.design.globalMargin + 10 + "px"
              : "unset",
            width: "250px",
          }}
        >
          <div className="pointer-events-auto">
            <div
              className="text-sm mb-3 cursor-pointer"
              onClick={() => scrollToSection("__TOP__")}
            >
              <i className="fa-thin fa-arrow-up" />
            </div>

            {menu.map((section) => {
              const title =
                typeof section === "string" ? section : section.title;
              return (
                <div
                  key={title}
                  className="text-sm mb-3 cursor-pointer opacity-60 hover:opacity-100 transition-all"
                  onClick={() => scrollToSection(title)}
                  style={{ color: "var(--txt2)" }}
                >
                  {title}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile header + footer outline */}
      {layout.mobiler && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-[60px] border-b flex flex-row justify-center items-center"
            style={{
              background: "var(--bg)",
              borderColor: "var(--txt2)",
              zIndex: 105,
            }}
          >
            <div className="absolute left-5" onClick={handleItemSelection}>
              <i className="fa-light fa-xmark-large" />
            </div>
            <div
              className="uppercase font-bold cursor-pointer"
              onClick={() => scrollToSection("__TOP__")}
            >
              {work?.title}
            </div>
          </div>

          <div
            className="fixed bottom-0 left-0 w-full border-t flex justify-center items-center"
            style={{
              height: "60px",
              background: "var(--bg)",
              borderColor: "var(--txt2)",
              zIndex: 105,
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => {
                // simple: scroll to top on tap, you can expand this later
                scrollToSection("__TOP__");
              }}
            >
              <span className="opacity-60">Menu</span>
            </div>
          </div>
        </>
      )}

      {/* Main article content */}
      <div className={`${layout.mobiler ? "" : "ml-[250px]"} mt-16`}>
        {menu.map((section, index) => {
          const title = typeof section === "string" ? section : section.title;
          const subsections = Array.isArray(section.subsections)
            ? section.subsections
            : [];

          if (!sectionRefs.current[title])
            sectionRefs.current[title] = React.createRef();

          const SectionComponent = sectionContents[title];

          return (
            <div key={index}>
              {/* Section anchor */}
              <div
                ref={sectionRefs.current[title]}
                style={{ scrollMarginTop: `${SCROLL_MARGIN_TOP}px` }}
              />

              {/* Section header block, preserves your look */}
              <div
                className="-mx-16 px-16 flex flex-row items-end justify-start z-10 pt-6 pb-12 pointer-events-none sticky"
                style={{
                  top: `${STICKY_TOP}px`,
                  backgroundImage:
                    "linear-gradient(to bottom, var(--bg) 60%, transparent 100%)",
                }}
              >
                <h2 className="grotesk uppercase text-6xl">{title}</h2>
              </div>

              {SectionComponent ? (
                <div className="max-w-[1080px] mb-16">
                  <SectionComponent />
                </div>
              ) : null}

              {subsections.map((sub, subIndex) => {
                const subKey = typeof sub === "string" ? sub : sub.s;
                const subLabel = typeof sub === "string" ? sub : sub.l;

                if (!subsectionRefs.current[subKey])
                  subsectionRefs.current[subKey] = React.createRef();

                const SubComponent = sectionContents[subKey];

                return (
                  <div
                    key={subIndex}
                    ref={subsectionRefs.current[subKey]}
                    style={{ scrollMarginTop: `${SCROLL_MARGIN_TOP}px` }}
                    className="max-w-[1080px] mb-12 gap-4 flex flex-col"
                  >
                    <h3 className="text-2xl font-semibold mb-4">{subLabel}</h3>
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
