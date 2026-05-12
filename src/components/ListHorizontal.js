import React from "react";

function ListHorizontal({ children }) {
  return (
    <div className="grid gap-8 w-full my-16 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
      {children}
    </div>
  );
}

function BulletHorizontal({ title, children, index, thumb = null }) {
  return (
    <div className="flex flex-col w-full">
      {index && (
        <div
          style={{ borderColor: "var(--txt)" }}
          className="rounded-full border aspect-square flex justify-center items-center w-8 mb-4"
        >
          {index}
        </div>
      )}

      {thumb && <div className="bg-white w-full h-48 mb-4"></div>}

      <h4 className="font-semibold mb-1">{title}</h4>

      <p className={title ? "opacity-80" : ""}>{children}</p>
    </div>
  );
}

export { ListHorizontal, BulletHorizontal };
