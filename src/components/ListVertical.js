import React from "react";
import H4 from "./H4";
import GraphicCaption from "./GraphicCaption";

function ListVertical({
  children,
  desc,
  className = "",
  variant = "rows", // "bullet" | "number" | "rows"
  numbered = false,
}) {
  const isRows = variant === "rows";

  return (
    <div>
      {desc && (
        <GraphicCaption className="mb-4" icon="fa-list">
          {desc}
        </GraphicCaption>
      )}
      <ul
        className={`
        w-full
        ${isRows ? " border-[var(--bg3)] divide-y divide-[var(--bg3)]" : ""}
        ${!isRows ? "flex flex-col gap-y-4 pl-0" : ""}
        ${className}
      `}
        data-variant={variant}
      >
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                index,
                variant: child.props.variant ?? variant,
                vertical: child.props.vertical ?? false,
                numbered: child.props.numbered ?? numbered,
              })
            : child,
        )}
      </ul>
    </div>
  );
}
function BulletVertical({
  title,
  children,
  className = "",
  iconClassName = "fa-sharp fa-solid fa-sparkle",
  index = 0,
  variant = "bullet",
  vertical = false,
  numbered = false,
}) {
  const isNumber = variant === "number";
  const isRows = variant === "rows";
  const hasTitle = Boolean(title);

  if (vertical) {
    return (
      <li
        className={`
          grid grid-cols-[2em_1fr] items-baseline gap-x-[1em] py-[1em]
          ${className}
        `}
      >
        <span className="text-[0.7em] uppercase tracking-[0.08em] text-[var(--txt2)] tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 text-[1em] leading-[1.45] text-[var(--txt2)]">
          {hasTitle && (
            <div className="mb-[0.25em] text-[1em] leading-[1.2] text-[var(--txt)]">
              {title}
            </div>
          )}
          <div>{children}</div>
        </div>
      </li>
    );
  }

  if (isRows) {
    const showLeadCol = hasTitle || numbered;
    return (
      <li
        className={`
          grid grid-cols-1 gap-y-3 py-[1.25em]
          ${
            hasTitle
              ? "md:grid-cols-[12em_1fr] md:gap-x-[4em]"
              : numbered
                ? "md:grid-cols-[2em_1fr] md:gap-x-[1em]"
                : ""
          }
          md:py-[1.6em]
          ${className}
        `}
      >
        {showLeadCol && (
          <div className="text-[0.8em] font-semibold leading-[1.2] text-[var(--txt)]">
            {hasTitle ? (
              <div className="flex gap-2 items-baseline">
                {numbered && (
                  <span className="shrink-0 uppercase tracking-[0.08em] text-[var(--point)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <span className="min-w-0 flex-1">{title}</span>
              </div>
            ) : (
              <span className="text-[0.8em] uppercase tracking-[0.08em] text-[var(--txt2)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        )}

        <div className="text-[1em] leading-[1.45] text-[var(--txt)]">
          {children}
        </div>
      </li>
    );
  }
  return (
    <li
      className={`
        grid grid-cols-[1.6em_1fr] items-baseline gap-x-3
        ${className}
      `}
    >
      <span className="flex justify-center text-[0.75em] leading-none text-[var(--point)]">
        {isNumber ? (
          <span className="font-semibold tabular-nums">{index + 1}.</span>
        ) : (
          <i className={`${iconClassName} text-[0.55em]`} aria-hidden="true" />
        )}
      </span>

      <div className="min-w-0 text-[1em] leading-[1.45] text-[var(--txt2)]">
        {hasTitle && (
          <H4 className="mb-[0.25em] text-[1em] leading-[1.2]">{title}</H4>
        )}
        <div>{children}</div>
      </div>
    </li>
  );
}

export { ListVertical, BulletVertical };
