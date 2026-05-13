import { useTestState } from "../TestStateContext";
import { stepIdAt, stepTitleAt, totalSteps } from "../data/flows";
import { getTraditionalActionConfig } from "../flows/Traditional";
import { getRobinhoodActionConfig } from "../flows/Robinhood";
import { getRedesignActionConfig } from "../flows/Redesign";
import { Button } from "./ui";
import { cn } from "../lib/cn";
import { palette } from "../lib/tw";

const configFor = (state) => {
  const stepId = stepIdAt(state.flow, state.step);
  if (state.flow === "A") return getTraditionalActionConfig(state, stepId);
  if (state.flow === "R") return getRobinhoodActionConfig(state, stepId);
  return getRedesignActionConfig(state, stepId);
};

export default function ActionBar() {
  const { state, nextStep, prevStep, submit } = useTestState();
  const total = totalSteps(state.flow);
  const isFirst = state.step === 1;
  const isLast = state.step === total;
  const { disabled, label } = configFor(state);

  const onPrimary = () => {
    if (isLast) submit();
    else nextStep();
  };

  return (
    <div
      className={cn(
        "border-t pt-[10px] pb-2 flex justify-between items-center gap-2 flex-wrap px-4 pb-8",
        palette.border,
      )}
    >
      <div>
        {!isFirst ? (
          <Button ghost onClick={prevStep}>
            {"[ < BACK ]"}
          </Button>
        ) : (
          <span className={palette.mutedText}></span>
        )}
      </div>
      <div className="flex gap-[10px] items-center">
        <Button onClick={onPrimary} disabled={disabled}>
          {label}
        </Button>
      </div>
    </div>
  );
}
