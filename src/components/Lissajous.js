import React, { useRef, useEffect } from "react";

const Lissajous = ({ size = 200, className = "", style }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;

    const width = size;
    const height = size;

    const a = width / 2;
    const b = height / 2;

    const freqXBase = 4;
    const freqYBase = 5;

    let t = 0;

    let rafId;

    const draw = () => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      let d = "M";

      const freqX = freqXBase + Math.sin(t) * 2;
      const freqY = freqYBase + Math.cos(t) * 1;

      for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
        const x = width / 2 + a * Math.sin(freqX * angle + t);
        const y = height / 2 + b * Math.sin(freqY * angle);
        d += `${x},${y} `;
      }

      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "var(--txt)");
      path.setAttribute("stroke-width", "1");

      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.appendChild(path);

      t += 0.01;
      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(rafId);
  }, [size]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "clamp(18px, 4vw, 40px)",
        height: "clamp(18px, 4vw, 40px)",
        display: "block",
        ...style,
      }}
    />
  );
};

export default Lissajous;
