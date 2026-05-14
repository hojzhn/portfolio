import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import { useContainerSize } from "../lib/containerSize";

export default function CatalogRow({
  selected = false,
  onClick,
  ticker,
  title,
  subtitle,
  cells = [],
}) {
  const { isMobile } = useContainerSize();

  return (
    <div
      className={cn(
        "border px-[10px] py-2 mb-[6px] overflow-hidden cursor-pointer",
        palette.border,
        palette.hoverBg,
        isMobile
          ? "block"
          : "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4",
        selected && cn("border-2 px-[9px] py-[7px]", palette.bgSelected),
      )}
      data-view={isMobile ? "mobile" : "desktop"}
      onClick={onClick}
    >
      <div
        className={cn("flex min-w-0 items-start gap-3", isMobile && "w-full")}
      >
        <div className="shrink-0">
          <span className="font-bold whitespace-nowrap">
            {selected ? "[*]" : "[ ]"}
          </span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </span>
          {subtitle != null && (
            <span
              className={cn(
                "block overflow-hidden text-ellipsis whitespace-nowrap",
                palette.mutedText,
              )}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-nowrap items-start gap-x-4 gap-y-3 shrink-0",
          isMobile && "mt-3 w-full flex-wrap",
        )}
      >
        {cells.map((c, i) => (
          <div key={i} className={cn("shrink-0 overflow-hidden", c.className)}>
            {c.label != null && (
              <div
                className={cn(
                  "uppercase text-[11px] tracking-[0.05em] mb-[2px]",
                  palette.mutedText,
                )}
              >
                {c.label}
              </div>
            )}
            <div>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
