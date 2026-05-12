import React from "react";

function ListGrid({ children }) {
  return (
    <div className="grid gap-16 w-full my-16 grid-cols-1 md:grid-cols-2">
      {children}
    </div>
  );
}

function BulletGrid({ title, index, children }) {
  return (
    <div className="flex flex-col w-full mb-8">
      {index && (
        <div
          style={{ borderColor: "var(--txt)" }}
          className="font-bold rounded-full border-2 aspect-square flex justify-center items-center w-8 mb-4"
        >
          {index}
        </div>
      )}
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className={`${title ? "opacity-0.8 " : ""} `}>{children}</p>
    </div>
  );
}

export { ListGrid, BulletGrid };
