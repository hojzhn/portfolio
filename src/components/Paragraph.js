import React from "react";
import pData from "../data/text.json"; // Ensure the path to your JSON file is correct

const Paragraph = ({ id, className = "", hideTitle }) => {
  const textEntry = pData.find((item) => item.id === id);

  if (!textEntry) {
    return <div className={className}>Content not found</div>;
  }

  return (
    <div className={`p-component ${className}`}>
      {textEntry.title && !hideTitle && (
        <div className="absolute w-[100px] left-0 uppercase tracking-[6px] font-semibold text-right text-xs leading-[2]">
          {textEntry.title}
        </div>
      )}
      <div className={`${hideTitle ? "" : "pl-[125px]"} text-sm`}>
        {textEntry.content}
      </div>
    </div>
  );
};

export default Paragraph;
