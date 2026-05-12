// TestRuleSection.jsx or same file, but OUTSIDE the parent component
import React from "react";
import { ListVertical, BulletVertical } from "../ListVertical";

export const TestRuleSection = React.memo(function TestRuleSection({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  Demo,
  bullets,
  demoWrapClassName = "flex justify-center",
  className = "",
}) {
  return (
    <section className={` border-b border-[var(--bg3)] pb-[4em] ${className}`}>
      <div className="font-mono tracking-wide mt-8 mb-24">
        <span className="uppercase font-mono bg-[var(--bg2)] text-[var(--point)] rounded-md text-[0.8em] py-1 px-2 border  border-[var(--bg3)]">
          {title}
        </span>{" "}
        <span className="text-[0.8em]">{subtitle}</span>
      </div>

      {imageSrc && (
        <div className="w-full">
          <img
            src={imageSrc}
            alt={imageAlt || ""}
            className="max-w-full h-auto mb-16 -mt-8"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
        <div className={demoWrapClassName}>{Demo ? <Demo /> : null}</div>

        <div>
          <ListVertical>
            {bullets.map((node, i) => (
              <BulletVertical key={i}>{node}</BulletVertical>
            ))}
          </ListVertical>
        </div>
      </div>
    </section>
  );
});
