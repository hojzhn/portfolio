import ReactDOM from "react-dom/client";
import React, { useContext, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./tailwind.css";
import "./scss/default.scss";
import "katex/dist/katex.min.css";
import "@xyflow/react/dist/style.css";
import { LayoutProvider, LayoutContext } from "./context/LayoutContext";

import Main from "./pages/Main";

const DevMode = lazy(() => import("./pages/DevMode"));

function useBodyScrollRef() {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    scrollRef.current =
      document.scrollingElement || document.documentElement || document.body;
  }, []);

  return scrollRef;
}

function RootThemeSync() {
  const { layout } = useContext(LayoutContext);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = layout.palette.mode;
    root.dataset.theme = layout.palette.theme;
  }, [layout.palette.mode, layout.palette.theme]);

  return null;
}

function HomeRoute() {
  const scrollRef = useBodyScrollRef();

  return (
    <div className="min-h-[100dvh] ">
      <Main scrollRef={scrollRef} />
    </div>
  );
}

function App() {
  return (
    <>
      <RootThemeSync />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route
            path="/twenty-journeymap/*"
            element={
              <Suspense fallback={<div>Loading dev tool...</div>}>
                <DevMode view="journeyMap" />
              </Suspense>
            }
          />
          <Route
            path="/twenty-northstar/*"
            element={
              <Suspense fallback={<div>Loading dev tool...</div>}>
                <DevMode view="northStar" />
              </Suspense>
            }
          />
          <Route
            path="/twenty-wireframe/*"
            element={
              <Suspense fallback={<div>Loading dev tool...</div>}>
                <DevMode view="wireframe" />
              </Suspense>
            }
          />
          <Route
            path="/twenty-napkin/*"
            element={
              <Suspense fallback={<div>Loading dev tool...</div>}>
                <DevMode view="napkin" />
              </Suspense>
            }
          />{" "}
          <Route
            path="/flag-test/*"
            element={
              <Suspense fallback={<div>Loading dev tool...</div>}>
                <DevMode view="flag" />
              </Suspense>
            }
          />
          <Route
            path="/flag-prototype/*"
            element={
              <Suspense fallback={<div>Loading dev tool...</div>}>
                <DevMode view="flagPrototype" />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <LayoutProvider>
    <App />
  </LayoutProvider>,
);
