import { useTestState } from "../TestStateContext";
import { Button } from "./ui";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";

export default function TopBar() {
  const { state, setFlow, reset } = useTestState();

  return (
    <div
      className={cn(
        "flex justify-between items-center pb-[10px] pt-[6px] border-b gap-2 flex-wrap",
        palette.border,
      )}
    >
      <div className="tracking-[0.04em]">
        3-ARM TEST · TRADITIONAL · ROBINHOOD · REDESIGN
      </div>
      <div className="flex gap-[6px] flex-wrap">
        <Button active={state.flow === "A"} onClick={() => setFlow("A")}>
          [TRADITIONAL]
        </Button>
        <Button active={state.flow === "R"} onClick={() => setFlow("R")}>
          [ROBINHOOD]
        </Button>
        <Button active={state.flow === "B"} onClick={() => setFlow("B")}>
          [REDESIGN]
        </Button>
        <Button onClick={reset}>[RESET]</Button>
      </div>
    </div>
  );
}
