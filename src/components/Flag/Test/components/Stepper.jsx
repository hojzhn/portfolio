import { useTestState } from "../TestStateContext";
import { stepTitleAt, totalSteps } from "../data/flows";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";

export default function Stepper() {
  const { state } = useTestState();
  const total = totalSteps(state.flow);
  const w = 20;
  const fill = Math.round(w * (state.step / total));
  const bar = "[" + "#".repeat(fill) + "-".repeat(w - fill) + "]";

  return (
    <div className={cn("py-[10px] border-b whitespace-pre", palette.border)}>
      {bar}
      {"  "}Step {state.step} of {total} · {stepTitleAt(state.flow, state.step)}
    </div>
  );
}
