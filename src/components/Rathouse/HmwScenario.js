import React, { useState } from "react";
import GraphicCaption from "../GraphicCaption";
import SpeechBubble from "../SpeechBubble";
import H4 from "../H4";
import H3 from "../H3";
import { BulletVertical } from "../ListVertical";
import { ChartContainer } from "../../pages/Flag.content";

function AnimatedSolution({ children }) {
  return (
    <div className="font-mono animate-fadeSlide px-3 py-2 rounded-md border border-[var(--point)] text-[var(--txt)] bg-[var(--point2)]">
      ... {children}
    </div>
  );
}

export default function HmwScenario({
  caption,
  images = [],
  description,
  problems = [],
  responses = [],
  imageMaxWidth = 400,
}) {
  const [index, setIndex] = useState(0);

  const currentResponse = responses[index] ?? responses[0] ?? null;

  return (
    <>
      {caption && <GraphicCaption icon="fa-image">{caption}</GraphicCaption>}

      <ChartContainer>
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 justify-items-center">
            {images.map((src, i) => (
              <img
                key={i}
                className={`
        w-full max-w-[${imageMaxWidth}px] h-auto block
        ${i % 2 === 0 ? "justify-self-end" : "justify-self-start"}
      `}
                src={src}
                alt=""
              />
            ))}
          </div>
        )}
      </ChartContainer>
      {description && <p>{description}</p>}

      <div className="mt-8 flex flex-col ">
        <span className="font-mono text-[0.8em] tracking-[0.16em] mb-[1em] uppercase text-[var(--txt2)]">
          Tensions Identified
        </span>

        {problems.map((text, i) => {
          const isActive = i === index;

          return (
            <SpeechBubble
              key={i}
              tail="none"
              bg={isActive ? "var(--bg)" : "var(--bg2)"}
              text={isActive ? "var(--txt)" : "var(--txt)"}
              borderColor={isActive ? "var(--bg2)" : "transparent"}
              className={`cursor-pointer transition-all duration-200 w-full py-2 mb-[0.3em] rounded-sm ${
                isActive ? "scale-[1.02]" : "opacity-80 hover:opacity-100"
              }`}
              onClick={() => setIndex(i)}
            >
              <BulletVertical className="mb-0">{text}</BulletVertical>
            </SpeechBubble>
          );
        })}
        {currentResponse && (
          <div className="text-right mt-[1em]">
            <AnimatedSolution key={index}>{currentResponse}</AnimatedSolution>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeSlide {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          .animate-fadeSlide {
            animation: fadeSlide 250ms ease forwards;
          }
        `}
      </style>
    </>
  );
}
