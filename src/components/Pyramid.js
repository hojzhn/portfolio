import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import { LayoutContext } from "../context/LayoutContext";
import H4 from "./H4";
import { AnimatePresence, motion } from "framer-motion";

export default function PyramidDiagram({ levels = [], gap = 1 }) {
  const SHRINK_BREAKPOINT = 960;
  const { layout, setLayout, setTheme } = useContext(LayoutContext);

  const [shrink, setShrink] = useState(window.innerWidth < SHRINK_BREAKPOINT);
  const mobilePanelVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  useEffect(() => {
    const handleResize = () => {
      setShrink(window.innerWidth < SHRINK_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const svgRef = useRef(null);
  const [slicePixelHeight, setSlicePixelHeight] = useState(0);
  const [gapPx, setGapPx] = useState(gap); // fallback in case SVG isn't mounted

  const total = levels.length;
  const width = 100;
  const baseHeight = 86.6;
  const scale = 1.05;

  const totalGap = (total - 1) * gap;
  const usableHeight = baseHeight - totalGap;
  const levelHeight = usableHeight / total;
  const offsetY = levelHeight * (scale - 1);

  const getPolygonPoints = (i) => {
    const yTop = i * (levelHeight + gap);
    const yBot = yTop + levelHeight;

    const wTop = (yTop / baseHeight) * width;
    const wBot = (yBot / baseHeight) * width;
    const x = (w) => (100 - w) / 2;

    if (i === 0) {
      return `${x(wBot)},${yBot} 50,${yTop} ${100 - x(wBot)},${yBot}`;
    } else {
      return `${x(wTop)},${yTop} ${100 - x(wTop)},${yTop} ${
        100 - x(wBot)
      },${yBot} ${x(wBot)},${yBot}`;
    }
  };

  const getPixelWidthAt = (y) => {
    if (!svgRef.current) return 400;
    const svgPxWidth = svgRef.current.getBoundingClientRect().width;
    const svgUnitWidth = (y / baseHeight) * width;
    const pxPerSvgUnit = svgPxWidth / 100;
    return Math.max(svgUnitWidth * pxPerSvgUnit, 400);
  };

  const expandedPadding = selectedIndex !== null ? offsetY : 0;
  const svgHeight = baseHeight + (selectedIndex !== null ? offsetY : 0) + 8; // add margin
  useLayoutEffect(() => {
    if (svgRef.current) {
      const pixelHeight = svgRef.current.getBoundingClientRect().height;
      const pxPerSvgUnit = pixelHeight / svgHeight;
      setSlicePixelHeight(levelHeight * pxPerSvgUnit);
      setGapPx(gap * pxPerSvgUnit); // ← new line: pixel gap
    }
  }, [svgHeight]);

  return (
    <div className="w-full max-w-[768px] mx-auto relative text-center overflow-visible">
      <svg
        ref={svgRef} // ✅ <== this was missing
        viewBox={`-10 0 120 ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full block h-auto"
      >
        {levels.map((_, i) => {
          const isSelected = selectedIndex === i;
          const isBelow = selectedIndex !== null && i > selectedIndex;
          const shiftDown = isBelow ? offsetY : 0;

          return (
            <g
              key={i}
              transform={`translate(0, ${shiftDown}) ${
                isSelected ? `scale(${scale},${scale})` : ""
              }`}
              style={{
                transformOrigin: `50% ${i * (levelHeight + gap)}px`,
                transition: "transform 0.3s",
              }}
              onClick={() =>
                setSelectedIndex((prev) => (prev === i ? null : i))
              }
              className="cursor-pointer"
            >
              <polygon
                points={getPolygonPoints(i)}
                className={`transition-all  duration-300 ${
                  isSelected
                    ? "stroke-[0.1]   fill-transparent"
                    : "stroke-[0.1] hover:stroke-[0.2] fill-[var(--bg2)]"
                }`}
                style={{
                  stroke: "var(--bg3)",
                  strokeWidth: "0.1",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Labels */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none flex flex-col"
        style={{
          gap: `${gapPx}px`,
        }}
      >
        {levels.map((level, i) => {
          const isSelected = selectedIndex === i;
          return (
            <div
              key={i}
              className="w-full text-center flex flex-col justify-center transition-all duration-300"
              style={{
                paddingTop: i === 0 ? "5%" : "0",
                height: `${
                  levelHeight *
                  (isSelected ? scale : 1) *
                  (svgRef.current?.getBoundingClientRect().height / svgHeight)
                }px`,
                maxWidth: `${getPixelWidthAt(i * (levelHeight + gap))}px`,
                marginInline: "auto", // center it
              }}
            >
              <div className={`text-[0.8em]`}>{level.title}</div>

              {level.subtitle && (
                <div
                  className={`text-[0.8em] whitespace-pre-line mt-1 font-mono`}
                >
                  {level.subtitle}
                </div>
              )}
              {!shrink && (
                <div
                  className={`text-xs mt-1  transition-all duration-500 ease-in-out overflow-hidden ${
                    isSelected
                      ? "max-h-[200px] opacity-100 bg-[var(--bg)] text-[var(--txt2)]"
                      : "max-h-[0px] opacity-0"
                  }`}
                >
                  {level.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {shrink && selectedIndex !== null && levels[selectedIndex]?.caption && (
          <motion.div
            key={selectedIndex}
            layout
            variants={mobilePanelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.24,
              ease: "easeOut",
              layout: { duration: 0.28, ease: "easeInOut" },
            }}
            className="text-xs bg-[var(--bg2)] p-4 rounded-lg text-left mb-16 leading-relaxed max-w-[40rem] mx-auto overflow-hidden"
          >
            <H4>{levels[selectedIndex].title}</H4>{" "}
            {levels[selectedIndex].caption.replace(/^this\s+/i, "")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
