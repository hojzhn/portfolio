import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { DETAIL } from "./data/detail";

const TestStateContext = createContext(null);

const makeInitial = () => ({
  flow: "A",
  step: 1,
  selectedTicker: null,
  riskAccepted: null,
  amount: DETAIL.amount.defaultAmount,
  frequency: DETAIL.amount.defaultFrequency,
  accountType: DETAIL.amount.defaultAccount,
  agreed: false,
  submitted: false,
});

export function TestStateProvider({ children }) {
  const [state, setState] = useState(makeInitial);

  const setFlow = useCallback(
    (flow) => setState({ ...makeInitial(), flow }),
    [],
  );
  const reset = useCallback(
    () => setState((s) => ({ ...makeInitial(), flow: s.flow })),
    [],
  );
  const nextStep = useCallback(
    () => setState((s) => ({ ...s, step: s.step + 1 })),
    [],
  );
  const prevStep = useCallback(
    () => setState((s) => ({ ...s, step: Math.max(1, s.step - 1) })),
    [],
  );
  const submit = useCallback(
    () => setState((s) => ({ ...s, submitted: true })),
    [],
  );
  const selectTicker = useCallback(
    (ticker) => setState((s) => ({ ...s, selectedTicker: ticker })),
    [],
  );
  const setAmount = useCallback(
    (amount) => setState((s) => ({ ...s, amount })),
    [],
  );
  const setFrequency = useCallback(
    (frequency) => setState((s) => ({ ...s, frequency })),
    [],
  );
  const setAccountType = useCallback(
    (accountType) => setState((s) => ({ ...s, accountType })),
    [],
  );
  const setRiskAccepted = useCallback(
    (option) => setState((s) => ({ ...s, riskAccepted: option })),
    [],
  );
  const toggleAgreed = useCallback(
    () => setState((s) => ({ ...s, agreed: !s.agreed })),
    [],
  );

  const value = useMemo(
    () => ({
      state,
      setFlow,
      reset,
      nextStep,
      prevStep,
      submit,
      selectTicker,
      setAmount,
      setFrequency,
      setAccountType,
      setRiskAccepted,
      toggleAgreed,
    }),
    [
      state,
      setFlow,
      reset,
      nextStep,
      prevStep,
      submit,
      selectTicker,
      setAmount,
      setFrequency,
      setAccountType,
      setRiskAccepted,
      toggleAgreed,
    ],
  );

  return (
    <TestStateContext.Provider value={value}>
      {children}
    </TestStateContext.Provider>
  );
}

export function useTestState() {
  const ctx = useContext(TestStateContext);
  if (!ctx)
    throw new Error("useTestState must be used inside TestStateProvider");
  return ctx;
}
