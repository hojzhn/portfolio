"use client";
import { useEffect, useRef, useCallback } from "react";

function ElasticLines({ id, className, color = "var(--point)" }) {
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const boxRef = useRef(null);

  const progressRef = useRef(0);
  const timeRef = useRef(Math.PI / 2);
  const reqIdRef = useRef(null);
  const xRef = useRef(0.5);

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const setPath = useCallback(() => {
    if (!svgRef.current || !pathRef.current) return;

    const width = svgRef.current.getBoundingClientRect().width;
    const progress = progressRef.current;
    const x = xRef.current;

    pathRef.current.setAttributeNS(
      "",
      "d",
      `M0 50 Q${width * x} ${50 + progress}, ${width} 50`,
    );
  }, []);

  const resetAnimation = useCallback(() => {
    timeRef.current = Math.PI / 2;
    progressRef.current = 0;

    if (reqIdRef.current) {
      cancelAnimationFrame(reqIdRef.current);
      reqIdRef.current = null;
    }

    setPath();
  }, [setPath]);

  const animateOut = useCallback(() => {
    const progress = progressRef.current;
    const time = timeRef.current;

    const newProgress = progress * Math.sin(time);
    timeRef.current = time + 0.2;
    progressRef.current = lerp(progress, 0, 0.025);

    if (!svgRef.current || !pathRef.current) return;

    const width = svgRef.current.getBoundingClientRect().width;
    const x = xRef.current;

    pathRef.current.setAttributeNS(
      "",
      "d",
      `M0 50 Q${width * x} ${50 + newProgress}, ${width} 50`,
    );

    if (Math.abs(progressRef.current) > 0.75) {
      reqIdRef.current = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  }, [resetAnimation]);

  useEffect(() => {
    setPath();

    const resizeObserver = new ResizeObserver(() => {
      setPath();
    });

    if (svgRef.current) {
      resizeObserver.observe(svgRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
    };
  }, [setPath]);

  const managePointerEnter = () => {
    if (reqIdRef.current) {
      cancelAnimationFrame(reqIdRef.current);
      reqIdRef.current = null;
    }
    timeRef.current = Math.PI / 2;
  };

  const managePointerMove = (e) => {
    if (!boxRef.current) return;

    const { movementY, clientX } = e;
    const { left, width } = boxRef.current.getBoundingClientRect();

    xRef.current = (clientX - left) / width;
    progressRef.current += movementY;

    setPath();
  };

  const managePointerLeave = () => {
    if (reqIdRef.current) {
      cancelAnimationFrame(reqIdRef.current);
    }
    reqIdRef.current = requestAnimationFrame(animateOut);
  };

  return (
    <div className={className}>
      <div className="elasticLine">
        <div
          ref={boxRef}
          onPointerEnter={managePointerEnter}
          onPointerMove={managePointerMove}
          onPointerLeave={managePointerLeave}
          className="box"
        />
        <svg ref={svgRef}>
          <path ref={pathRef} style={{ stroke: color }} className="fill-none" />
        </svg>
      </div>
    </div>
  );
}

export default ElasticLines;
