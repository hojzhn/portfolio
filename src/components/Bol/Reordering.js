import React, { useState, useMemo } from "react";
import { formatNumber } from "../../utils/formatNumber";
const initial = {
  group_order: [1, 2],
  groups: [
    { gr_id: 0, gr_children: [], isOpen: true },
    { gr_id: 1, gr_name: "Biga", gr_children: [1, 2, 3], isOpen: true },
    { gr_id: 2, gr_name: "Main Dough", gr_children: [4, 5], isOpen: true },
  ],
  lines: [
    {
      line_id: 1,
      value: 100,
      in_name: "Bread Flour",
      in_desc: "King Arthur, Unbleached",
    },
    { line_id: 2, value: 50, in_name: "Water" },
    { line_id: 3, value: 10, in_name: "Active Dry Yeast" },
    {
      line_id: 4,
      value: 900,
      in_name: "Bread Flour",
      in_desc: "King Arthur, Unbleached",
    },
    { line_id: 5, value: 700, in_name: "Water" },
  ],
};

function flatten(recipe) {
  const result = [];
  const groupsById = Object.fromEntries(recipe.groups.map((g) => [g.gr_id, g]));

  // group 0 first (without header)
  const g0 = groupsById[0];
  if (g0 && g0.isOpen) {
    for (const lid of g0.gr_children) {
      const line = recipe.lines.find((l) => l.line_id === lid);
      if (line) result.push({ type: "item", gr_id: 0, ...line });
    }
  }

  // then ordered groups
  for (const gid of recipe.group_order) {
    const g = groupsById[gid];
    if (!g) continue;
    result.push({ type: "header", gr_id: g.gr_id, title: g.gr_name });
    if (g.isOpen) {
      for (const lid of g.gr_children) {
        const line = recipe.lines.find((l) => l.line_id === lid);
        if (line) result.push({ type: "item", gr_id: g.gr_id, ...line });
      }
    }
  }
  return result;
}

export default function Reordering() {
  const [recipe, setRecipe] = useState(initial);
  const [dragOverId, setDragOverId] = useState(null);
  const [dragOverlay, setDragOverlay] = useState(null); // {x,y,content}
  const flat = useMemo(() => flatten(recipe), [recipe]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);

    // Prevent default ghost
    const img = new Image();
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLz4=";
    e.dataTransfer.setDragImage(img, 0, 0);

    // Find the element being dragged
    const target = e.currentTarget.getBoundingClientRect();

    const entry = id.startsWith("g-")
      ? recipe.groups.find((g) => g.gr_id === Number(id.slice(2)))
      : recipe.lines.find((l) => l.line_id === Number(id.slice(2)));

    if (entry) {
      setDragOverlay({
        type: entry.in_name ? "i" : "g",
        baseX: target.left,
        baseY: target.top,
        startX: e.clientX,
        startY: e.clientY,
        dx: 0,
        dy: 0,
        width: target.width,
        height: target.height,
        content: entry.in_name || entry.gr_name || "Group",
        value: entry.value || 0,
      });
    }
  };

  const handleDrag = (e) => {
    if (dragOverlay) {
      setDragOverlay((o) => ({ ...o, x: e.clientX, y: e.clientY }));
    }
  };

  const handleDragEnd = () => {
    setDragOverlay(null);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    setDragOverId(id);
  };
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    setDragOverlay(null);

    const activeId = e.dataTransfer.getData("text/plain");
    setDragOverId(null);
    if (!activeId || activeId === targetId) return;

    const ids = flat.map((f) =>
      f.type === "header" ? `g-${f.gr_id}` : `l-${f.line_id}`,
    );
    const from = ids.indexOf(activeId);
    let to;
    if (targetId === "end") {
      to = ids.length;
    } else {
      to = ids.indexOf(targetId);
      if (from === -1 || to === -1) return;
      if (from < to) to -= 1;
    }

    // if moving a header
    if (activeId.startsWith("g-")) {
      const gid = Number(activeId.slice(2));
      const group = recipe.groups.find((g) => g.gr_id === gid);

      // closed group → only reorder group_order
      if (group && !group.isOpen) {
        const currentOrder = [...recipe.group_order];
        const oldIndex = currentOrder.indexOf(gid);

        let targetIndex = -1;
        if (targetId.startsWith("g-")) {
          const tid = Number(targetId.slice(2));
          targetIndex = currentOrder.indexOf(tid);
        } else {
          const lid = Number(targetId.slice(2));
          const grp = recipe.groups.find((g) => g.gr_children.includes(lid));
          if (grp && grp.gr_id !== 0) {
            targetIndex = currentOrder.indexOf(grp.gr_id);
          }
        }
        if (targetIndex === -1) return;

        const newOrder = [...currentOrder];
        newOrder.splice(oldIndex, 1);
        newOrder.splice(targetIndex, 0, gid);

        setRecipe((r) => ({ ...r, group_order: newOrder }));
        return;
      }
    }

    // else (items, or open header) → rebuild children normally
    const next = [...ids];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);

    const groups = recipe.groups.map((g) => ({ ...g, gr_children: [] }));
    const groupOrder = [];
    let currentGroup = 0;
    for (const id of next) {
      if (id.startsWith("g-")) {
        currentGroup = Number(id.slice(2));
        if (currentGroup !== 0) groupOrder.push(currentGroup);
      } else {
        const lid = Number(id.slice(2));
        const g = groups.find((gg) => gg.gr_id === currentGroup);
        if (g) g.gr_children.push(lid);
      }
    }

    setRecipe((r) => ({
      ...r,
      groups: groups.map((g) => {
        const prev = recipe.groups.find((pg) => pg.gr_id === g.gr_id);
        return prev ? { ...g, isOpen: prev.isOpen } : g;
      }),
      group_order: groupOrder,
    }));
  };
  const toggleGroup = (gid) => {
    setRecipe((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.gr_id === gid ? { ...g, isOpen: !g.isOpen } : g,
      ),
    }));
  };
  // inside your component
  const handleGlobalDrag = (e) => {
    if (dragOverlay) {
      setDragOverlay((o) => ({
        ...o,
        dx: e.clientX - o.startX,
        dy: e.clientY - o.startY,
      }));
    }
  };

  React.useEffect(() => {
    window.addEventListener("dragover", handleGlobalDrag);
    window.addEventListener("dragend", handleDragEnd);
    return () => {
      window.removeEventListener("dragover", handleGlobalDrag);
      window.removeEventListener("dragend", handleDragEnd);
    };
  }, [dragOverlay]);

  return (
    <div
      onDragEnd={(e) => {
        // if nothing inside consumed the drop, treat as drop at end
        if (dragOverId === null) {
          handleDrop(e, "end");
        } else {
          setDragOverId(null);
        }
      }}
    >
      {flat.map((entry) => {
        const id =
          entry.type === "header" ? `g-${entry.gr_id}` : `l-${entry.line_id}`;
        const highlight = dragOverId === id;

        if (entry.type === "header") {
          const group = recipe.groups.find((g) => g.gr_id === entry.gr_id);
          // sum values of its children
          const sum = group.gr_children
            .map(
              (lid) => recipe.lines.find((l) => l.line_id === lid)?.value || 0,
            )
            .reduce((a, b) => a + b, 0);

          return (
            <div
              className="flex flex-row items-center gap-x-2 mt-6"
              key={id}
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
              onDragOver={(e) => handleDragOver(e, id)}
              onDrop={(e) => handleDrop(e, id)}
            >
              <i class="fa-solid fa-bars"></i>
              <div
                className=" flex-1 instrument text-2xl flex flex-row justify-between items-center gap-x-4"
                key={id}
                draggable
                onClick={() => toggleGroup(entry.gr_id)}
                style={{
                  position: "relative",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                {highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "var(--txt2)",
                    }}
                  />
                )}
                <div className="flex-row flex items-center gap-x-2">
                  <div className="text-sm">
                    {group.isOpen === false ? (
                      <i class="fa-solid fa-caret-down"></i>
                    ) : (
                      <i class="fa-solid fa-caret-up"></i>
                    )}
                  </div>
                  {entry.title}
                </div>
                <div
                  className="flex-1 h-[1px]"
                  style={{ background: "var(--txt)" }}
                />
                <div>{formatNumber(sum)} g</div>
              </div>
            </div>
          );
        }
        return (
          <div
            className="flex flex-row items-center gap-x-2"
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDrop={(e) => handleDrop(e, id)}
          >
            <i class="fa-solid fa-bars"></i>
            <div
              className="p-2 bg-[var(--bg2)] flex-1 rounded-md flex flex-row gap-x-4 items-baseline"
              style={{
                margin: "4px 0",
                position: "relative",
              }}
            >
              {highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -5,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "var(--txt2)",
                  }}
                />
              )}
              <div className="w-[80px] instrument text-xl text-right">
                {entry.value} g
              </div>
              <div className="instrument text-xl">{entry.in_name} </div>
            </div>
          </div>
        );
      })}
      <div
        key="end"
        onDragOver={(e) => handleDragOver(e, "end")}
        onDrop={(e) => handleDrop(e, "end")}
        style={{ position: "relative", height: 20 }}
      >
        {dragOverId === "end" && (
          <div
            style={{
              position: "absolute",
              top: -1,
              left: 0,
              right: 0,
              height: 2,
              background: "var(--txt2)",
            }}
          />
        )}
      </div>
      {/* Drag overlay */}
      {dragOverlay && (
        <div
          className="rounded-md gap-x-2 opacity-80"
          style={{
            position: "fixed",
            top: dragOverlay.baseY + dragOverlay.dy,
            left: dragOverlay.baseX + dragOverlay.dx,
            width: dragOverlay.width,
            height: dragOverlay.height,
            pointerEvents: "none",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
          }}
        >
          <i class="fa-solid fa-bars" style={{ opacity: 0 }}></i>

          {dragOverlay.type === "i" ? (
            <div
              className="p-2 flex-1 text-xl instrument rounded-md flex flex-row gap-x-4"
              style={{
                background: "var(--bg)",
                color: "var(--txt)",
                border: "1px dashed var(--txt2)",
              }}
            >
              <div className="w-[80px] text-right">
                {dragOverlay.value + " g"}
              </div>
              {dragOverlay.content}
            </div>
          ) : (
            <div
              className="p-2 flex-1 text-2xl instrument rounded-md flex flex-row items-center gap-x-2"
              style={{
                background: "var(--bg)",
                color: "var(--txt)",
                border: "1px dashed var(--txt2)",
              }}
            >
              <i class="fa-solid fa-rhombus text-xs"></i>
              {dragOverlay.content}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
