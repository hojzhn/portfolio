import React, { useRef, useContext, useEffect, useState } from "react";
import Item from "./Item";
import worksData from "../data/list.works.json"; // Import the JSON file directly
import { LayoutContext, SiteRoleContext } from "../context/LayoutContext.js";
import {
  animateItemIn,
  animateItemOut,
  postViewAnim,
} from "../animations/list.js"; // Import GSAP animations

function List() {
  const { siteRole } = useContext(SiteRoleContext);
  const { layout, setLayout, setTheme } = useContext(LayoutContext);

  const [filteredWorks, setFilteredWorks] = useState([]);
  const [sortOrder, setSortOrder] = useState("alphabetical"); // Sort order state
  const [selectedRoles, setSelectedRoles] = useState([]); // Selected roles state
  const [selectedItem, setSelectedItem] = useState(null); // Selected item state
  const [previousSelectedItem, setPreviousSelectedItem] = useState(null); // Selected Previousitem state

  const selectedItemRef = useRef(selectedItem);

  useEffect(() => {
    if (!selectedItem || selectedItem === "none") {
      // reset to neutral
      setTheme("noncommittal");
      setLayout((prev) => ({ ...prev, post: false }));
    } else {
      const selectedWork = worksData.find((w) => w.id === selectedItem);
      if (selectedWork?.slug) {
        console.log("Setting theme to:" + selectedWork.slug);
        setTheme(selectedWork.slug);
      }
      setLayout((prev) => ({ ...prev, post: true }));
    }
  }, [selectedItem]);

  // Effect to update filteredWorks whenever siteRole or selectedRoles change
  useEffect(() => {
    let updatedWorks = worksData.filter((work) => work.category === siteRole);

    if (selectedRoles.length > 0) {
      updatedWorks = updatedWorks.filter((work) =>
        selectedRoles.some((role) => work.role.includes(role))
      );
    }

    if (sortOrder === "alphabetical") {
      updatedWorks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "reverse-alphabetical") {
      updatedWorks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "most-recent") {
      updatedWorks.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === "least-recent") {
      updatedWorks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Animate items out
    filteredWorks.forEach((work) => animateItemOut(work.id));
    console.log(
      "siteRole",
      siteRole,
      worksData.map((w) => w.category)
    );
    // Update the state with the new works
    setTimeout(() => setFilteredWorks(updatedWorks), 300); // Delay to allow the fade-out animation
  }, [siteRole, sortOrder, selectedRoles]);

  // Effect to animate items in after they are rendered
  useEffect(() => {
    filteredWorks.forEach((work) => animateItemIn(work.id));

    // Remove existing v1 to v4 classes
    filteredWorks.forEach((work) => {
      const element = document.getElementById(`item-${work.id}`);
      if (element) {
        element.classList.remove("v1", "v2");
      }
    });

    // Assign random class v1 to v4 to each item
    filteredWorks.forEach((work) => {
      const element = document.getElementById(`item-${work.id}`);
      if (element) {
        const randomClass = `v${Math.floor(Math.random() * 2) + 1}`;
        element.classList.add(randomClass);
      }
    });
  }, [filteredWorks]);

  // // Effect to trigger animations based on selectedItem
  useEffect(() => {
    selectedItemRef.current = selectedItem;

    if (selectedItem !== null) {
      if (selectedItem === "none") {
        postViewAnim(false, layout.design, previousSelectedItem, layout);

        setPreviousSelectedItem("none");

        // Pass previous value to reset animation
      } else {
        postViewAnim(true, layout.design, selectedItem, layout); // Trigger vanish animation with current value
        setTimeout(() => {
          if (selectedItemRef.current === selectedItem) {
            setPreviousSelectedItem(selectedItemRef.current);
          }
        }, 500);
      }
    }
  }, [selectedItem]);

  // Extract all unique roles from worksData of items with matching category and sort them alphabetically
  const allRoles = Array.from(
    new Set(
      worksData
        .filter((work) => work.category === siteRole)
        .flatMap((work) => work.role)
    )
  ).sort((a, b) => a.localeCompare(b));

  // Handle role checkbox changes
  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  // Handle item selection (radio button behavior)
  const handleItemSelection = (id) => {
    setSelectedItem((prev) => (prev === id ? "none" : id));
  };

  // Toggle sort order
  const toggleAlphabeticalSort = () => {
    setSortOrder((prev) =>
      prev === "alphabetical" ? "reverse-alphabetical" : "alphabetical"
    );
    console.log(sortOrder);
  };

  const toggleDateSort = () => {
    setSortOrder((prev) =>
      prev === "most-recent" ? "least-recent" : "most-recent"
    );
  };

  return (
    <div
      className={`list h100 flex ${layout.mobiler ? "flex-col" : "flex-row"}`}
    >
      <navbar className="list-sort">
        {/* Sorting Options */}
        <div className="sorting-options flex flex-row space-x-2 items-center mb-2">
          <div
            onClick={toggleAlphabeticalSort}
            className={`  transition-all duration-300 hover:bg-[var(--bg2)] hover:text-[var(--txt2)] ${
              sortOrder === "alphabetical" ||
              sortOrder === "reverse-alphabetical"
                ? "bg-[var(--txt)]  text-[var(--bg)]"
                : ""
            } rounded-full w-6 h-6 flex justify-center items-center`}
          >
            {sortOrder === "reverse-alphabetical" ? (
              <i class="fa-light fa-arrow-down-z-a"></i>
            ) : (
              <i class="fa-light fa-arrow-down-a-z"></i>
            )}
          </div>
          <div
            onClick={toggleDateSort}
            className={`transition-all duration-300 hover:bg-[var(--bg2)] hover:text-[var(--txt2)] ${
              sortOrder === "most-recent" || sortOrder === "least-recent"
                ? "bg-[var(--txt)] text-[var(--bg)]"
                : ""
            } rounded-full w-6 h-6 flex justify-center items-center`}
          >
            {sortOrder === "most-recent" ? (
              <i class="fa-light fa-calendar-arrow-down"></i>
            ) : (
              <i class="fa-light fa-calendar-arrow-up"></i>
            )}
          </div>
        </div>

        {/* Role Filters */}
        <div className={`role-filters  space-y-1 flex flex-col `}>
          {allRoles.map((role) => (
            <label key={role}>
              <div
                className={`px-1 inline-block rounded-md transition-all duration-300 hover:bg-[var(--bg2)] hover:text-[var(--txt2)] ${
                  selectedRoles.includes(role)
                    ? "text-[var(--bg)] bg-[var(--txt)]"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={role}
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                />
                {role}
              </div>
            </label>
          ))}
        </div>
      </navbar>
      {/* 
            {selectedItem}
            {previousSelectedItem}
 */}

      <div className="list-items w100 scroll-container">
        {/* Display Items */}
        {filteredWorks.map((work) => (
          <div
            key={work.id}
            id={`item-${work.id}`}
            className={`item-wrapper w-full mb-[10px] overflow-hidden border border-transparent ${
              selectedItem === work.id ? "selected" : "hover:bg-[var(--bg2)] "
            }`}
            onClick={(e) => {
              const currentId = `item-${work.id}`;
              const previousId = `item-${previousSelectedItem}`;
              const selectedId = `item-${selectedItem}`;

              if (currentId === previousId && currentId === selectedId) {
                // Do nothing if both previousSelectedItem and selectedItem match the current div's id
                return;
              } else {
                const radioInput = e.currentTarget.querySelector(
                  "input[type='radio']"
                );
                if (radioInput) {
                  radioInput.checked = true;
                  handleItemSelection(work.id);
                }
              }
            }}
          >
            <input
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
              selectedRoles={selectedRoles}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
