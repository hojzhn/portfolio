import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
import { useContainerSize } from "../lib/containerSize";

// A label / value list. Tweak the row styling here in one place.
//   rows:     array of { label, value, bold? }
//   keyWidth: width of the label column when there's room (default "180px")
//   divided:  draw a dashed rule under each row (otherwise just spaced)
// On a mobile-width container the rows go vertical (label above value).
export default function MetaRows({
  rows,
  keyWidth = "180px",
  divided = false,
  className,
}) {
  const { isMobile } = useContainerSize();
  return (
    <div className={cn(!divided && "space-y-1", className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className={cn(
            !isMobile && "grid gap-x-3",
            divided && cn("border-b border-dashed py-1", palette.border),
            row.bold && "font-bold text-[14px]",
          )}
          style={isMobile ? undefined : { gridTemplateColumns: `${keyWidth} 1fr` }}
        >
          <div className={palette.mutedText}>{row.label}</div>
          <div>{row.value}</div>
        </div>
      ))}
    </div>
  );
}
