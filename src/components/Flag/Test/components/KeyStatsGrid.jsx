import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import { useContainerSize } from "../lib/containerSize";

// Two-column label/value grid; collapses to a single stacked column when the
// container is mobile-width.
export default function KeyStatsGrid({ stats }) {
  const { isMobile } = useContainerSize();
  return (
    <div className={cn("grid my-[10px]", isMobile ? "grid-cols-1" : "grid-cols-2")}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-row items-center justify-between gap-3 py-1 border-b border-dashed",
            palette.border,
            // give the two columns breathing room on the inner edge
            !isMobile && i % 2 === 1 && "pl-5",
            !isMobile && i % 2 === 0 && "pr-5",
          )}
        >
          <div className={cn("overflow-hidden text-ellipsis whitespace-nowrap", palette.mutedText)}>
            {stat.label}
          </div>
          <div className="text-right overflow-hidden text-ellipsis whitespace-nowrap">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
