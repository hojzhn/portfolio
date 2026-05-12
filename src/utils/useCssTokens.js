import { useContext, useLayoutEffect, useMemo, useState } from "react";
import { LayoutContext } from "../context/LayoutContext";

const DEFAULT_VARS = {
  txt: "--txt",
  txt2: "--txt2",
  txt3: "--txt3",
  bg: "--bg",
  bg2: "--bg2",
  bg3: "--bg3",
  point: "--point",
  point2: "--point2",
  point3: "--point3",
};

const DEFAULT_FALLBACK = {
  txt: "#111",
  txt2: "#666",
  txt3: "#999",
  bg: "#fff",
  bg2: "#f5f5f5",
  bg3: "#eee",
  point: "#ff3b30",
  point2: "#34c759",
  point3: "#007aff",
};

export default function useCssTokens(
  varNames = DEFAULT_VARS,
  fallback = DEFAULT_FALLBACK,
) {
  const { layout } = useContext(LayoutContext);

  const stableVarNames = useMemo(() => varNames, [JSON.stringify(varNames)]);
  const stableFallback = useMemo(() => fallback, [JSON.stringify(fallback)]);

  const [tokens, setTokens] = useState(stableFallback);

  useLayoutEffect(() => {
    const el = document.documentElement;

    const read = () => {
      const cs = getComputedStyle(el);

      const next = {};
      for (const key of Object.keys(stableVarNames)) {
        const cssVar = stableVarNames[key];
        const raw = cs.getPropertyValue(cssVar).trim();
        next[key] = raw || stableFallback[key] || "";
      }

      setTokens(next);
    };

    const raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, [
    layout.palette.mode,
    layout.palette.theme,
    stableVarNames,
    stableFallback,
  ]);

  return tokens;
}
