import React, { useRef, useContext, useEffect, useState } from "react";
import Item from "./Item";
import worksData from "../data/list.works.json"; // Import the JSON file directly
import { LayoutContext, SiteRoleContext } from "../context/LayoutContext.js";

function List({ works, selectedItem, handleItemSelection, onHover }) {
  const { layout, setLayout, setTheme } = useContext(LayoutContext);

  const [previousSelectedItem, setPreviousSelectedItem] = useState(null); // Selected Previousitem state

  const selectedItemRef = useRef(selectedItem);

  // // Effect to trigger animations based on selectedItem
  useEffect(() => {
    selectedItemRef.current = selectedItem;

    if (selectedItem !== null) {
      if (selectedItem === "none") {
        setTheme("noncommittal");
        setLayout((prev) => ({ ...prev, post: false }));
        setPreviousSelectedItem("none");
      } else {
        setLayout((prev) => ({ ...prev, post: true }));
        const selectedWork = worksData.find((w) => w.id === selectedItem);
        if (selectedWork?.slug) {
          setTheme(selectedWork.slug);
        }

        setTimeout(() => {
          if (selectedItemRef.current === selectedItem) {
            setPreviousSelectedItem(selectedItemRef.current);
          }
        }, 500);
      }
    }
  }, [selectedItem]);

  return (
    // Hover handled at the list level: per-item `onMouseEnter` updates the
    // hovered id, list-level `onMouseLeave` clears it. Avoids the transient
    // null when moving between items.
    <div
      className="list-items w-full "
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Display Items */}
      {works.map((work) => (
        <div
          key={work.id}
          id={`item-${work.id}`}
          className={`item-wrapper w-full ${selectedItem === work.id && "h-full"} mb-[10px] overflow-hidden border border-transparent ${
            selectedItem === work.id ? "selected" : ""
          }`}
          onMouseEnter={() => onHover?.(work.id)}
          onClick={(e) => {
            const currentId = `item-${work.id}`;
            const previousId = `item-${previousSelectedItem}`;
            const selectedId = `item-${selectedItem}`;

            if (currentId === previousId && currentId === selectedId) {
              // Do nothing if both previousSelectedItem and selectedItem match the current div's id
              return;
            } else {
              const radioInput = e.currentTarget.querySelector(
                "input[type='radio']",
              );
              if (radioInput) {
                radioInput.checked = true;
                handleItemSelection(work.id);
              }
            }
          }}
        >
          <input
            className="hidden"
            type="radio"
            name="item-selection"
            value={work.id}
            checked={selectedItem === work.id}
            onClick={() => handleItemSelection(work.id)}
          />
          <Item
            work={work}
            isSelected={selectedItem === work.id}
            handleItemSelection={() => handleItemSelection(work.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default List;
