import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Width (px) at or below which descendants should render their mobile layout.
// This is the size of the *container*, not the browser window.
const DEFAULT_MOBILE_MAX_WIDTH = 760;

const ContainerSizeContext = createContext(null);

/**
 * Measures the rendered width of its wrapper element and shares it with
 * descendants through `useContainerSize`. Pass extra props (className, etc.)
 * straight through to the wrapper.
 */
export function ContainerSizeProvider({
  mobileMaxWidth = DEFAULT_MOBILE_MAX_WIDTH,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const updateWidth = () => {
      setWidth(node.getBoundingClientRect().width);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const value = useMemo(
    () => ({
      width,
      isMobile: width != null && width < mobileMaxWidth,
    }),
    [width, mobileMaxWidth],
  );

  return (
    <ContainerSizeContext.Provider value={value}>
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    </ContainerSizeContext.Provider>
  );
}

/**
 * Returns `{ width, isMobile }` for the nearest `ContainerSizeProvider`.
 * `width` is `null` until the first measurement lands.
 */
export function useContainerSize() {
  const ctx = useContext(ContainerSizeContext);
  if (!ctx) {
    throw new Error(
      "useContainerSize must be used inside a ContainerSizeProvider",
    );
  }
  return ctx;
}
