import React, { useRef, useEffect } from "react";

export default function AnimatedStripes({
  height = "200px",
  className,
  color = "var(--txt)",
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const resizeObserver = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let frame = 0;

    const stripeSpacing = 20;
    const stripeWidth = 0.5;
    const speed = 0.5;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const displayWidth = parent.clientWidth;
      const displayHeight = parseInt(height, 10);
      const overscan = displayHeight;

      canvas.width = displayWidth * dpr;
      canvas.height = (displayHeight + overscan) * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight + overscan}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeObserver.current = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.current.observe(canvas.parentElement);

    const draw = () => {
      const width = canvas.clientWidth;
      const pixelHeight = parseInt(height, 10);
      const fullHeight = pixelHeight * 2;

      ctx.clearRect(0, 0, width, fullHeight);

      const offset = (frame * speed) % stripeSpacing;

      ctx.lineWidth = stripeWidth;

      // Convert CSS var if needed
      let computedColor = color;
      if (color.startsWith("var(")) {
        const cssVar = color.match(/var\((--[^)]+)\)/)?.[1];
        if (cssVar) {
          computedColor =
            getComputedStyle(canvas).getPropertyValue(cssVar)?.trim() || color;
        }
      }
      ctx.strokeStyle = computedColor;

      const startX = -width;
      const endX = width * 2;
      const totalStripes = Math.ceil((endX - startX) / stripeSpacing);

      for (let i = 0; i < totalStripes; i++) {
        const x = startX + i * stripeSpacing;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset - fullHeight, fullHeight);
        ctx.stroke();
      }

      frame++;
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [height, color]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{
          width: "100%",
          height: "200%",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
