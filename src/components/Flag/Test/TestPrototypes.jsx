import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import Toggle from "../../Toggle";

// Description shown in the panel below each prototype. Test admins read
// this to orient before walking a participant through the flow. Keyed by
// the same flow id used in TestStateContext.
const FLOW_DESC = {
  A: "The first reproduced traditional allocation-driven flows modeled after institutional fund selection such as Vanguard or Fidelity Investments. These flows ask users to configure the financial instrument directly through allocation, holdings, risk, and fee decisions.",
  R: "The second prototype reproduced compressed retail trading patterns inspired by platforms like Public.com, Stash, and eToro. These flows reduced procedural friction but still framed the act primarily as buying and trading.",
  B: 'The third prototype introduced a redesigned "thesis-first" model that led with thematic positions rather than trading primitives. The flow compressed the authoring chain into a smaller set of decisions and framed investment as "standing". ',
};

const panelVariants = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
};

function AppContent({ orientation }) {
  const { state, setFlow } = useTestState();
  const [desktop, setDesktop] = useState(orientation === "desktop");
  const scrollRef = useRef(null);

  const stepId = stepIdAt(state.flow, state.step);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepId]);

  return (
    <div
      className={cn(
        "test-scrollbars max-w-[980px] mx-auto w-full flex flex-col ",
        palette.text,
        palette.bg,
      )}
    >
      <div className="flex justify-end p-2">
        {orientation === "desktop" && (
          <Button active={desktop} onClick={() => setDesktop((d) => !d)}>
            [ DESKTOP ]
          </Button>
        )}
      </div>

      <Demo desktop={desktop} aspect={desktop ? "16 / 10" : "9 / 19.5"}>
        <div className="h-full w-full [container-type:inline-size] font-mono text-[13px] leading-[1.5]">
          <div className="h-full w-full flex flex-col text-[clamp(10px,2cqi,13px)]">
            <div
              ref={scrollRef}
              className="overflow-y-auto w-full flex-1 px-3 pt-16 pb-8"
            >
              <ContainerSizeProvider className="min-h-full">
                {state.submitted ? (
                  <Success />
                ) : (
                  <>
                    {state.flow === "A" && <TraditionalFlow stepId={stepId} />}
                    {state.flow === "R" && <RobinhoodFlow stepId={stepId} />}
                    {state.flow === "B" && <RedesignFlow stepId={stepId} />}
                  </>
                )}
              </ContainerSizeProvider>
            </div>
            {!state.submitted && <ActionBar />}
          </div>
        </div>
      </Demo>

      <Toggle
        className="mt-4"
        items={[
          { label: "Traditional", value: "A" },
          { label: "Compressed", value: "R" },
          { label: "Redesigned", value: "B" },
        ]}
        value={state.flow}
        onChange={setFlow}
      />

      <motion.div layout className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desc-${state.flow}`}
            layout
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.24,
              ease: "easeOut",
              layout: { duration: 0.28, ease: "easeInOut" },
            }}
            className={cn("p-4 text-[0.8em] rounded-lg my-4", palette.bgSubtle)}
          >
            {FLOW_DESC[state.flow] ?? ""}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function TestPrototypes({ orientation }) {
  return (
    <TestStateProvider>
      <AppContent orientation={orientation} />
    </TestStateProvider>
  );
}
