import { useState } from "react";
import { TestStateProvider, useTestState } from "./TestStateContext";
import { stepIdAt } from "./data/flows";
import { ContainerSizeProvider } from "./lib/containerSize";
import { cn } from "./lib/cn";
import { palette } from "./lib/tw";
import { Button } from "./components/ui";
import TopBar from "./components/TopBar";
import Stepper from "./components/Stepper";
import ActionBar from "./components/ActionBar";
import Success from "./components/Success";
import TraditionalFlow from "./flows/Traditional";
import RobinhoodFlow from "./flows/Robinhood";
import RedesignFlow from "./flows/Redesign";
import Demo from "../Demo";

function AppContent() {
  const { state } = useTestState();
  const [desktop, setDesktop] = useState(false);

  const stepId = stepIdAt(state.flow, state.step);

  return (
    <>
      <div
        className={cn(
          "test-scrollbars max-w-[980px] mx-auto flex flex-col font-mono text-[13px] leading-[1.5]",
          palette.text,
          palette.bg,
        )}
      >
        <div className="flex justify-end p-2">
          <Button active={desktop} onClick={() => setDesktop((d) => !d)}>
            [ DESKTOP ]
          </Button>
        </div>
        <Demo desktop={desktop} aspect={desktop ? "16 / 10" : "9 / 19.5"}>
          <div className="h-full w-full [container-type:inline-size]">
            <div className="h-full w-full flex flex-col text-[clamp(10px,2cqi,13px)]">
              <ContainerSizeProvider className="overflow-y-auto w-full flex-1 px-3 pt-16">
                {state.submitted ? (
                  <Success />
                ) : (
                  <>
                    {state.flow === "A" && <TraditionalFlow stepId={stepId} />}
                    {state.flow === "R" && <RobinhoodFlow stepId={stepId} />}
                    {state.flow === "B" && <RedesignFlow stepId={stepId} />}
                  </>
                )}{" "}
              </ContainerSizeProvider>
              {!state.submitted && <ActionBar />}
            </div>
          </div>
        </Demo>
      </div>
    </>
  );
}

export default function TestPrototypes() {
  return (
    <TestStateProvider>
      <AppContent /> <TopBar />
    </TestStateProvider>
  );
}
