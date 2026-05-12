import React, { useEffect, useRef, useState, useContext } from "react";
import PostLayout from "./PostLayout";
import { LayoutContext } from "../context/LayoutContext";

function Item({ work, isSelected, handleItemSelection }) {
  const { title, category, date, role, desc_items, summary, menu } = work;
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(null);
  const { layout, setLayout } = useContext(LayoutContext);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [enableScroll, setEnableScroll] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isSelected]);

  const isPostVisible = isSelected;

  useEffect(() => {
    if (!isSelected || !scrollRef.current) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      setScrollY(0);
      setEnableScroll(false);
      return;
    }

    // delay turning on scroll
    const t = setTimeout(() => setEnableScroll(true), 1500);

    const handleScroll = () => {
      setScrollY(scrollRef.current.scrollTop);
    };

    const node = scrollRef.current;
    node.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(t);
      node.removeEventListener("scroll", handleScroll);
    };
  }, [isSelected]);

  useEffect(() => {
    if (enableScroll) {
      const t = setTimeout(() => setShowContent(true), 50); // short delay so transition applies
      return () => clearTimeout(t);
    } else {
      setShowContent(false);
    }
  }, [enableScroll]);

  return (
    <div
      ref={scrollRef}
      className={`cursor-pointer w-full  border border-transparent overflow-x-hidden
  transition-[padding,border-color, opacity] duration-500
    ${isSelected ? (layout.mobiler ? "p-2" : "p-16") : ""}

    
    `}
    >
      <div
        className={`${
          layout.mobiler ? "hidden" : "block"
        } absolute z-20 w-20 h-20 cursor-pointer transition-all duration-1000 ${
          isPostVisible && isSelected
            ? `right-10 top-10 opacity-100 delay-[2s] `
            : "right-10 top-20 opacity-0 duration-0 delay-0"
        }`}
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

      <div
        className={`sticky ${layout.mobiler && showContent && "mt-16"}`}
        ref={headerRef}
      >
        <div className="font-mono text-[9px] text-[var(--txt2)] ">{date}</div>
        <header className="">{title}</header>
        <div className="flex flex-row flex-wrap gap-2 my-2">
          {role.map((r) => (
            <div className="font-mono text-[9px] inline-block bg-[var(--bg2)] px-2 py-0.5">
              {r}
            </div>
          ))}
        </div>
        <div className={` ${enableScroll ? "mt-8" : ""} text-[var(--txt2)]`}>
          {summary}
        </div>
      </div>
      <br />
    </div>
  );
}

export default Item;
