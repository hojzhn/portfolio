import React, { useEffect, useState, useContext, useRef } from "react";
import { LayoutContext, SiteRoleContext } from "../context/LayoutContext";
import PostLayout from "../components/PostLayout.js";
import { useBodyScrollY } from "../utils/useBodyScrollY.js";
import { resolveCover } from "../images/covers.js";
import ElasticLines from "../components/ElasticLines.js";
import ArticleColophon from "../components/ArticleColophon.js";

export default function Post({
  scrollRef,
  selectedItem,
  works,
  handleItemSelection,
  onReady,
}) {
  const { layout, setLayout, setTheme } = useContext(LayoutContext);
  const [scrolledPastHeader, setScrolledPastHeader] = useState(false);
  const selectedWork =
    selectedItem !== null ? works.find((w) => w.id === selectedItem) : null;

  if (!selectedWork) return null;

  const { title, date, summary, slug, desc, desc_items = [] } = selectedWork;

  const headerRef = useRef(null);

  const scrollY = useBodyScrollY();

  const coverSrc = resolveCover(slug, layout.palette.mode);

  useEffect(() => {
    const images = Array.from(document.querySelectorAll("img"));
    const pending = images.filter((img) => !img.complete);

    if (pending.length === 0) {
      onReady?.();
      return;
    }

    let loaded = 0;
    const handleDone = () => {
      loaded += 1;
      if (loaded === pending.length) {
        onReady?.();
      }
    };

    pending.forEach((img) => {
      img.addEventListener("load", handleDone);
      img.addEventListener("error", handleDone);
    });

    return () => {
      pending.forEach((img) => {
        img.removeEventListener("load", handleDone);
        img.removeEventListener("error", handleDone);
      });
    };
  }, [onReady]);

  useEffect(() => {
    if (scrollY > 200) {
      setScrolledPastHeader(true);
    } else {
      setScrolledPastHeader(false);
    }
  }, [scrollY]);

  return (
    <>
      {layout.mobiler && coverSrc && (
        <div className="-mx-5 mt-8 aspect-[5/4] overflow-hidden">
          <img
            src={coverSrc}
            alt={`${title} cover`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      )}
      <div
        style={{ fontSize: "14px" }}
        className={`w-full max-w-[1800px] h-auto ${layout.mobiler ? "" : " p-20 pr-40 pt-20"}`}
      >
        <div
          className={`sticky ${layout.mobiler ? "mt-8 mb-4" : "mb-16"} `}
          ref={headerRef}
        >
          <div
            className="font-mono text-[va
          r(--txt2)] text-[0.8em]"
          >
            <span className="bg-[var(--txt2)] text-[var(--bg)] px-2 py-1 rounded-md">
              {title}
            </span>{" "}
            · {date}
          </div>
          <div
            className={`${layout.mobiler ? "mt-4 mb-8" : "my-10"} text-[3em] leading-none`}
          >
            {summary}
          </div>
          <div className="pb-[3em] border-[var(--txt3)] whitespace-pre-line">
            {desc}
          </div>
          <ElasticLines />
          <div className="mt-10 flex flex-wrap gap-x-4 gap-y-6 justify-between">
            {desc_items?.map((d) => (
              <div
                key={d.title}
                className="flex flex-col gap-2 w-full sm:w-[45%] xl:w-[20vw]"
              >
                <div className="text-[0.8em] uppercase tracking-wide text-[var(--txt2)] font-mono">
                  {d.title}
                </div>

                <div className="flex flex-col gap-1 text-[0.9em]">
                  {d.content?.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${
            layout.mobiler ? "hidden" : "block"
          } fixed z-20 w-20 h-20 cursor-pointer transition-all right-20 top-20
                `}
          onClick={handleItemSelection}
        >
          <span
            className="absolute left-0 bottom-0 w-full -translate-y-10 h-0 border-b rotate-45"
            style={{ borderColor: "var(--txt)" }}
          ></span>
          <span
            className="absolute left-0 bottom-0 w-full h-0 -translate-y-10  border-b -rotate-45"
            style={{ borderColor: "var(--txt)" }}
          ></span>
        </div>

        {!layout.mobiler && (
          <div className="w-full aspect-[3/2] max-h-[80vh] duration-500">
            {coverSrc && (
              <img
                src={coverSrc}
                alt={`${title} cover`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
          </div>
        )}

        {layout.mobiler && <ElasticLines className="mt-12" />}

        <PostLayout
          work={selectedWork}
          slug={slug}
          scrolledPastHeader={scrolledPastHeader}
          scrollContainerRef={scrollRef}
          handleItemSelection={handleItemSelection}
        />
      </div>
    </>
  );
}
