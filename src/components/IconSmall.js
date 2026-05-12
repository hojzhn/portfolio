// IconSmall.js Component
import React from "react";
import PropTypes from "prop-types";
import "../scss/components.scss";

function IconSmall({ iconId, className, tooltip }) {
  // Create a ref for the tooltip container
  const tooltipRef = React.useRef(null);

  const moveTooltip = (event) => {
    if (tooltip && tooltipRef.current) {
      const offsetX = 10; // Adjust the horizontal offset
      const offsetY = 10; // Adjust the vertical offset

      // Get bounding rectangle of the element
      const rect = event.currentTarget.getBoundingClientRect();

      // Calculate tooltip position relative to the viewport
      tooltipRef.current.style.left = `${
        event.clientX - rect.left + offsetX
      }px`;
      tooltipRef.current.style.top = `${event.clientY - rect.top + offsetY}px`;
      tooltipRef.current.style.display = "block";
    }
  };

  const hideTooltip = () => {
    if (tooltip && tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  };

  return (
    <div
      id="1"
      className={`icon-small cursor-pointer relative w-[2em] inline-flex justify-center items-center border border-[var(--txt)] aspect-square m-1 ${className} `}
      onMouseMove={moveTooltip}
      onMouseLeave={hideTooltip}
      style={{ position: "relative" }} // Ensure the parent div is relative for tooltip positioning
    >
      <i className={iconId} style={{ fontSize: "1em" }}></i>
      {tooltip && (
        <div ref={tooltipRef} className="mytooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
}

IconSmall.propTypes = {
  iconId: PropTypes.string.isRequired, // The class for the icon, e.g., 'fa-brands fa-instagram'
  className: PropTypes.string, // Additional classes for styling, optional
  tooltip: PropTypes.string, // Tooltip text, optional
};

IconSmall.defaultProps = {
  className: "rounded-md",
  tooltip: null, // Default to no tooltip if not provided
};

export default IconSmall;
