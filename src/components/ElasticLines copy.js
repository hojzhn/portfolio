"use client";
import { useEffect, useRef } from "react";

function ElasticLines({ id, className }) {
  const path = useRef(null);
  const svgRef = useRef(null); // Ref for the <svg> element
  let progress = 0;
  let time = Math.PI / 2;
  let reqId = null;
  let x = 0.5;

  useEffect(() => {
    setPath(progress);

    // Attach resize observer to update on window resize
    const resizeObserver = new ResizeObserver(() => {
      setPath(progress);
    });

    if (svgRef.current) {
      resizeObserver.observe(svgRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const setPath = (progress) => {
    if (!svgRef.current) return;

    // Get the width of the <svg> element
    const width = svgRef.current.getBoundingClientRect().width;
    path.current.setAttributeNS(
      "",
      "d",
      `M0 50 Q${width * x} ${50 + progress}, ${width} 50`,
    );
  };

  const manageMouseEnter = () => {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    const { left, width } = path.current.getBoundingClientRect();
    x = (clientX - left) / width;
    progress += movementY;
    setPath(progress);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);

    if (Math.abs(progress) > 0.75) {
      reqId = window.requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className={className}>
      <div className={`elasticLine`}>
        <div
          onMouseEnter={manageMouseEnter}
          onMouseMove={manageMouseMove}
          onMouseLeave={manageMouseLeave}
          className="box"
        ></div>
        <svg ref={svgRef}>
          <path ref={path}></path>
        </svg>
      </div>
    </div>
  );
}

export default ElasticLines;
