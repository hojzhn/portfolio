import React, { useState } from "react";

const ProcessLine = ({
  index,
  title,
  description,
  references,
  onToggle,
  onDragStart,
  onDragOver,
  onDrop,
  isDragOver,
}) => {
  return (
    <>
      <div
        className="flex flex-row items-baseline"
        draggable
        onDragStart={onDragStart}
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver();
        }}
        onDrop={onDrop}
      >
        <i className="fa-solid fa-bars"></i>

        <div className="mx-2 flex-1 flex  space-y-2 relative">
          <div
            style={{
              position: "absolute",
              top: 3,
              left: 0,
              right: 0,
              height: 2,
              width: "100%",
              background: isDragOver ? "var(--txt)" : "transparent",
            }}
          />

          <div
            className={` bg-[var(--bg2)] flex-1 rounded-md flex flex-col p-3`}
          >
            <div className="flex items-baseline space-x-2 cursor-move">
              <span className="instrument text-xl">{index + 1}.</span>
              <div className="flex-1">
                <span className="instrument text-xl">{title}</span>
                <p className="mt-[1em] text-[var(--txt2)]">{description}</p>

                {Array.isArray(references) && references.length > 0 && (
                  <>
                    <div className="border-b border-[var(--bg3)] mb-[2em] pb-[2em]" />

                    <div className="flex flex-col">
                      {references.map((ref, i) => (
                        <div
                          key={i}
                          className="p-0.5 flex flex-row items-baseline space-x-2 cursor-pointer"
                          onClick={() => onToggle(index, i)}
                        >
                          <div>
                            {ref.checked ? (
                              <i className="fa-light fa-square-check"></i>
                            ) : (
                              <i className="fa-light fa-square"></i>
                            )}
                          </div>
                          <div
                            style={{
                              backgroundColor: ref.checked
                                ? "var(--bg)"
                                : "transparent",
                            }}
                            className="flex flex-row items-baseline space-x-2 flex-1 p-1 px-2 rounded-md"
                          >
                            <div>{ref.amount} g</div>
                            <div className="flex flex-col">
                              <div>{ref.title}</div>
                              <div className="text-[0.8em] font-mono">
                                {ref.detail}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProcessAlignment = () => {
  const [steps, setSteps] = useState([
    {
      title: "Mix all ingredients and let sit for 30 mins.",
      description:
        "Make the scald. In a large bowl combine the rye flour, malt powder, mashed potato, caraway seeds, and boiling water. Whisk until smooth.",
      references: [
        {
          title: "Rye Flour",
          detail: "King Arthur, Dark Rye Flour",
          amount: 50,
          checked: false,
        },
        {
          title: "Malt Powder",
          detail: "С.Пудовъ, Солод Ржаной Ферментированный",
          amount: 30,
          checked: false,
        },
        {
          title: "Potato",
          detail: "Boiled and Mashed",
          amount: 50,
          checked: false,
        },
      ],
    },
    {
      title: "Step 2",
      description: "Description for step 2",
      references: [],
    },
    {
      title: "Step 3",
      description: "Description for step 3",
      references: [],
    },
  ]);

  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const toggleReference = (stepIndex, refIndex) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      const step = { ...newSteps[stepIndex] };
      const newRefs = [...step.references];
      newRefs[refIndex] = {
        ...newRefs[refIndex],
        checked: !newRefs[refIndex].checked,
      };
      newSteps[stepIndex] = { ...step, references: newRefs };
      return newSteps;
    });
  };

  const handleDrop = (from, to) => {
    if (from === to || from === null || to === null) return;

    const toIndex = to === "end" ? steps.length : to;

    setSteps((prev) => {
      const reordered = [...prev];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(toIndex, 0, moved);
      return reordered;
    });

    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="text-sm">
      {steps.map((step, i) => (
        <ProcessLine
          key={i}
          index={i}
          title={step.title}
          description={step.description}
          references={step.references}
          onToggle={toggleReference}
          onDragStart={() => setDragIndex(i)}
          onDragOver={() => setDragOverIndex(i)}
          onDrop={() => handleDrop(dragIndex, i)}
          isDragOver={dragOverIndex === i && dragIndex !== i}
        />
      ))}

      {/* Drop zone at end */}
      <div
        key="end-drop"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOverIndex("end");
        }}
        onDrop={() => handleDrop(dragIndex, "end")}
        style={{ height: 24, position: "relative" }}
      >
        {dragOverIndex === "end" && (
          <div
            style={{
              position: "absolute",
              top: 3,
              left: 0,
              right: 0,
              height: 2,
              background: "var(--txt)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProcessAlignment;
