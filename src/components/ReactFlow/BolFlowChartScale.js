import React, {
  useEffect,
  useMemo,
  useRef,
  useContext,
  useCallback,
} from "react";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  FourHandleNode,
  FormulaNode,
  DefaultNode,
  ControlNode,
} from "./FourHandleNode";
import { LayoutContext } from "../../context/LayoutContext";

export default function ScaleFlow() {
  const { layout } = useContext(LayoutContext);
  const mobile = layout.mobiler;

  const containerRef = useRef(null);
  const rfRef = useRef(null);

  const nodeTypes = useMemo(
    () => ({
      fourHandles: FourHandleNode,
      formula: FormulaNode,
      normal: DefaultNode,
      control: ControlNode,
    }),
    [],
  );

  const nodes = useMemo(
    () => [
      {
        id: "input",
        type: "formula",
        position: { x: 0, y: 0 },
        data: {
          title: "Accept user input",
          formula: String.raw`x^{new} = {userInput}`,
          handles: [{ type: "source", side: "bottom" }],
        },
      },
      {
        id: "factor",
        type: "formula",
        position: { x: mobile ? -10 : 250, y: mobile ? 100 : 0 },
        data: {
          title: "Compute scale factor",
          formula: String.raw`f = \tfrac{x^{new}}{x^{old}}`,
        },
      },
      {
        id: "apply",
        type: "formula",
        position: { x: mobile ? 0 : 500, y: mobile ? 200 : 0 },
        data: {
          title: "Apply scaling",
          formula: String.raw`g^{new} = g^{old} \times f`,
          handles: [{ type: "target", side: "top" }],
        },
      },
    ],
    [mobile],
  );

  const edges = useMemo(
    () => [
      { id: "e1-2", source: "input", target: "factor" },
      { id: "e2-3", source: "factor", target: "apply" },
    ],
    [],
  );

  const doFit = useCallback(() => {
    if (!rfRef.current) return;
    rfRef.current.fitView({ padding: 0.2, duration: 0 });
  }, []);

  // Fit when container resizes (your existing behavior)
  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(doFit);
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [doFit]);

  // Fit again when mobile layout flips (nodes reposition)
  useEffect(() => {
    requestAnimationFrame(doFit);
    setTimeout(doFit, 50);
  }, [mobile, doFit]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${mobile ? "h-[360px]" : "h-[240px]"}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={(instance) => {
          rfRef.current = instance;
          requestAnimationFrame(doFit);
          setTimeout(doFit, 50);
          setTimeout(doFit, 200);
        }}
        proOptions={{ hideAttribution: true }}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        minZoom={0.1}
        maxZoom={1}
      />
    </div>
  );
}
