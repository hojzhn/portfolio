import { TestStateProvider, useTestState } from "./TestStateContext";
import { stepIdAt } from "./data/flows";
import { ContainerSizeProvider } from "./lib/containerSize";
import { cn } from "./lib/cn";
import { palette } from "./lib/tw";
import TopBar from "./components/TopBar";
import Stepper from "./components/Stepper";
import ActionBar from "./components/ActionBar";
import Success from "./components/Success";
import TraditionalFlow from "./flows/Traditional";
import RobinhoodFlow from "./flows/Robinhood";
import RedesignFlow from "./flows/Redesign";

function AppContent() {
  const { state } = useTestState();

  const stepId = stepIdAt(state.flow, state.step);

  return (
    <>
      <div
        className={cn(
          "max-w-[980px] mx-auto flex flex-col font-mono text-[13px] leading-[1.5]",
          palette.text,
          palette.bg,
        )}
        style={{ height: 800 }}
      >
        {state.submitted ? (
          <Success />
        ) : (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              <ContainerSizeProvider className="min-w-[600px]">
                {state.flow === "A" && <TraditionalFlow stepId={stepId} />}
                {state.flow === "R" && <RobinhoodFlow stepId={stepId} />}
                {state.flow === "B" && <RedesignFlow stepId={stepId} />}
              </ContainerSizeProvider>
            </div>
            <ActionBar />
          </>
        )}
      </div>
      <TopBar />
    </>
  );
}

export default function TestPrototypes() {
  return (
    <TestStateProvider>
      <AppContent />
    </TestStateProvider>
  );
}
