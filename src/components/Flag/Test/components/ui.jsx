import { cn } from "../lib/cn";
import { palette } from "../lib/tw";
export function Button({ active = false, ghost = false, className, ...props }) {
  return (
    <button
      className={cn(
        "border px-[10px] py-[2px] cursor-pointer rounded-none",
        "disabled:border-dashed disabled:cursor-not-allowed",

        ghost
          ? cn(
              palette.borderTransparent,
              palette.hoverBgTransparent,
              "hover:underline",
            )
          : active
            ? cn(
                palette.bgInverted,
                palette.invertedText,
                palette.hoverBgInverted,
                palette.border,
              )
            : cn(palette.bg, palette.text, palette.border, palette.hoverBg),

        palette.disabledText,
        palette.disabledBorder,
        palette.disabledHoverBg,

        className,
      )}
      {...props}
    />
  );
}
export function Box({ dashed = false, className, ...props }) {
  return (
    <div
      className={cn(
        "border p-[10px_12px] mb-[10px]",
        dashed && "border-dashed",
        palette.border,
        className,
      )}
      {...props}
    />
  );
}

export function BoxHead({ meta, children }) {
  return (
    <div
      className={cn(
        "-mx-[12px] -mt-[10px] mb-2 px-[12px] py-1 border-b",
        "flex justify-between font-bold tracking-[0.03em]",
        palette.border,
      )}
    >
      <span>{children}</span>
      {meta != null && <span className={palette.mutedText}>{meta}</span>}
    </div>
  );
}

export function Eyebrow({ className, ...props }) {
  return (
    <div className={cn(palette.mutedText, "mb-1", className)} {...props} />
  );
}

export function ScreenTitle(props) {
  return (
    <h1
      className="text-[14px] font-bold mb-[6px] uppercase tracking-[0.02em]"
      {...props}
    />
  );
}

export function ScreenSub(props) {
  return <div className="max-w-[80ch] mb-[18px]" {...props} />;
}

export function SelectBox(props) {
  return (
    <select
      className={cn(
        palette.bg,
        palette.text,
        palette.border,
        "border rounded-none px-[6px] py-[2px] font-mono text-[13px]",
      )}
      {...props}
    />
  );
}

export function BareInput(props) {
  return (
    <input
      className={cn(
        palette.text,
        palette.border,
        palette.bgTransparent,
        "border-0 border-b rounded-none px-0 py-[2px]",
        "text-[22px] font-bold w-[180px] font-mono focus:outline-none",
      )}
      {...props}
    />
  );
}

export function PresetRow({ className, ...props }) {
  return (
    <div className={cn("flex flex-wrap gap-[6px]", className)} {...props} />
  );
}

export function Table(props) {
  return <table className="border-collapse w-full" {...props} />;
}

export function Th(props) {
  return (
    <th
      className={cn(
        palette.border,
        "border px-2 py-1 text-left align-top font-bold underline tracking-[0.02em]",
      )}
      {...props}
    />
  );
}

export function Td({ numeric = false, className, ...props }) {
  return (
    <td
      className={cn(
        palette.border,
        "border px-2 py-1 text-left align-top font-normal",
        numeric && "text-right whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
}

export function MetaList({ className, ...props }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[180px_1fr] gap-x-3 gap-y-1 mt-[10px]",
        className,
      )}
      {...props}
    />
  );
}

export function MetaKey(props) {
  return <div className={palette.mutedText} {...props} />;
}

export function OptionRow({ selected = false, className, ...props }) {
  return (
    <div
      className={cn(
        "py-1 cursor-pointer hover:underline",
        selected && "font-bold",
        className,
      )}
      {...props}
    />
  );
}

export function OptionSymbol(props) {
  return <span className="inline-block w-[28px] font-bold" {...props} />;
}

export function ConfirmRow({ large = false, className, ...props }) {
  return (
    <div
      className={cn(
        palette.border,
        "grid grid-cols-[180px_1fr] border-b border-dashed py-1",
        large && "font-bold text-[14px]",
        className,
      )}
      {...props}
    />
  );
}

export function ConfirmKey(props) {
  return <div className={palette.mutedText} {...props} />;
}
