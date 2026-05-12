import React, { useState, useRef, useEffect } from "react";
import Experience from "../data/history.json";

function History({ value }) {
  // Destructuring 'value' from props
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const descRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      {Experience.filter((experience) => experience.category === value).map(
        (experience) => (
          <div
            key={`item_${experience.id}`}
            className="item"
            onMouseEnter={() => setHoveredItemId(experience.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            <div className="w-full flex">
              <div className="w-[100px]">
                <div className="from">
                  {experience.startmonth ? `${experience.startmonth}, ` : ""}
                  {experience.startyear}
                </div>
                {experience.endyear && (
                  <div className="to">
                    ~&nbsp;
                    {experience.endmonth ? `${experience.endmonth}, ` : ""}
                    {experience.endyear}
                  </div>
                )}
              </div>
              <div className="content">
                <div className="title">{experience.title}</div>
                <div className="sub1">{experience.sub1}</div>
                <div className="sub2">{experience.sub2}</div>
              </div>
            </div>
            {experience.description && (
              <div
                ref={descRef}
                id={`desc_${experience.id}`}
                className={`fixed w-[500px] pointer-events-none ${
                  hoveredItemId === experience.id ? "active" : ""
                }`}
                style={{
                  left: position.x + 20,
                  top: position.y + 20,
                  transition: "1s ease, opacity 0.3s ease",
                  opacity: hoveredItemId === experience.id ? 1 : 0,
                }}
              >
                {experience.description}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default History;
