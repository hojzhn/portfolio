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
  UnitNode,
} from "./FourHandleNode";
import { LayoutContext } from "../../context/LayoutContext";
import CustomEdge from "./CustomEdge";
export default function ConversionFlow() {
  const { layout } = useContext(LayoutContext);
  const mobile = layout.mobiler;

  const containerRef = useRef(null);
  const rfRef = useRef(null);
  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    [],
  );
  const nodeTypes = useMemo(
    () => ({
      fourHandles: FourHandleNode,
      formula: FormulaNode,
      normal: DefaultNode,
      control: ControlNode,
      unit: UnitNode,
    }),
    [],
  );

  // Keep positions the same for now, but this is now responsive-ready.
  const nodes = useMemo(
    () => [
      {
        id: "volume",
        type: "normal",
        position: { x: 0, y: mobile ? 0 : 200 },
        data: {
          label: "Volume",
          handles: [{ type: "target", side: "bottom", hidden: true }],
          width: mobile ? 200 : 100,
          height: mobile ? 100 : 200,
          hideBadge: true,
          centerLabel: true,
          // background: "var(--bg3)",
        },
      },
      {
        id: "weight",
        type: "normal",
        position: { x: mobile ? 0 : 250, y: mobile ? 150 : 200 },
        data: {
          label: "Weight",
          handles: [
            { type: "source", id: "right", side: "right" },
            { type: "source", id: "left", side: "left" },
          ],
          width: mobile ? 200 : 100,
          height: mobile ? 100 : 200,
          // borderRadius: 300,
          hideBadge: true,
          centerLabel: true,
          // background: "transparent",
        },
      },
      {
        id: "single",
        type: "normal",
        position: { x: mobile ? 0 : 500, y: mobile ? 300 : 200 },
        data: {
          label: "Single Unit",
          handles: [{ type: "target", side: "top", hidden: true }],
          width: mobile ? 200 : 100,
          height: mobile ? 100 : 200,
          // borderRadius: 300,
          hideBadge: true,
          centerLabel: true,
          // background: "transparent",
        },
      },
      {
        id: "g",
        type: "unit",
        position: { x: mobile ? 20 : 270, y: mobile ? 175 : 250 },
        data: {
          label: "g/kg",
          handles: [
            { type: "source", side: mobile ? "bottom" : "right", hidden: true },
          ],
          width: 60,
          height: 60,
          // borderRadius: "100%",
          centerLabel: true,
          background: "var(--bg)",
          hideBadge: true,
        },
      },
      {
        id: "oz",
        type: "unit",
        position: { x: mobile ? 120 : 270, y: mobile ? 175 : 320 },
        data: {
          label: "oz/lb",
          handles: [
            { type: "target", side: mobile ? "top" : "left", hidden: true },
          ],
          width: 60,
          height: 60,
          // borderRadius: "100%",
          centerLabel: true,
          background: "var(--bg)",
          hideBadge: true,
        },
      },
      {
        id: "ml",
        type: "unit",
        position: { x: 20, y: mobile ? 25 : 250 },
        data: {
          label: "mL/L",
          handles: [
            { type: "source", side: mobile ? "bottom" : "right", hidden: true },
          ],
          width: 60,
          height: 60,
          // borderRadius: "100%",
          centerLabel: true,
          background: "var(--bg)",
          hideBadge: true,
        },
      },
      {
        id: "cup",
        type: "unit",
        position: { x: mobile ? 120 : 20, y: mobile ? 25 : 320 },
        data: {
          label: "cup/gal",
          handles: [
            { type: "target", side: mobile ? "top" : "left", hidden: true },
          ],
          width: 60,
          height: 60,
          // borderRadius: "100%",
          centerLabel: true,
          background: "var(--bg)",
          hideBadge: true,
        },
      },
    ],
    [mobile],
  );

  const edges = useMemo(
    () => [
      {
        id: "e1-2",
        source: "weight",
        sourceHandle: "left",
        target: "volume",
        label: "Custom density",
        markerEnd: { type: "arrowclosed" },
        type: "smoothstep",
        labelBgStyle: { fill: "var(--bg)" },
        labelStyle: { fill: "var(--txt)" },
      },
      {
        id: "e2-3",
        source: "weight",
        sourceHandle: "right",
        target: "single",
        markerEnd: { type: "arrowclosed" },
        label: "Custom rate",
        type: "smoothstep",
        labelBgStyle: { fill: "var(--bg)" },
        labelStyle: { fill: "var(--txt)" },
      },
      {
        id: "e-ml-cup",
        source: "ml",
        target: "cup",
        markerStart: { type: "arrowclosed" },
        markerEnd: { type: "arrowclosed" },
      },
      {
        id: "e-g-oz",
        source: "g",
        target: "oz",
        markerStart: { type: "arrowclosed" },
        markerEnd: { type: "arrowclosed" },
      },
    ],
    [],
  );

  const doFit = useCallback(() => {
    if (!rfRef.current) return;

    rfRef.current.fitView({
      padding: mobile ? 0.12 : 0.25,
      duration: 0,
      // allow enlargement on mobile if the bounding box permits it
      maxZoom: mobile ? 1.4 : 1,
    });
  }, [mobile]);

  // Fit when container resizes
  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(doFit);
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [doFit]);

  // Fit again when mobile flips (even if nodes positions stay same, the container height changes)
  useEffect(() => {
    requestAnimationFrame(doFit);
    setTimeout(doFit, 50);
    setTimeout(doFit, 200);
  }, [mobile, doFit]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${mobile ? "h-[360px]" : "h-[270px]"}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={(instance) => {
          rfRef.current = instance;
          requestAnimationFrame(doFit);
          setTimeout(doFit, 50);
          setTimeout(doFit, 200);
        }}
        proOptions={{ hideAttribution: true }}
        fitView
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
        maxZoom={mobile ? 1.4 : 1}
      />
    </div>
  );
}
