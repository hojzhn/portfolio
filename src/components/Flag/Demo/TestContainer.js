import React, { useState } from "react";
import {
  NorthlineShell,
  StepHeader,
  ObservedSignals,
  SetExposure,
  YourStanding,
} from "./NorthlineVisuals";
import { Options } from "./northline/Options";

/**
 * Northline — orchestrator.
 *
 * Owns step routing and exposure state. All visuals live in
 * ./NorthlineVisuals. This file should stay small: any new
 * pixel-level work belongs in the visuals module.
 */
export default function Northline() {
  const [step, setStep] = useState(3);
  const [monthlyExposure, setMonthlyExposure] = useState(250);
  const [confirmedExposure, setConfirmedExposure] = useState(250);
  const [deploymentsCount, setDeploymentsCount] = useState(4);

  const totalDeployed = (confirmedExposure ?? 0) * deploymentsCount;

  const advance = (e) => {
    setConfirmedExposure(e);
    setDeploymentsCount(4); // simulate 4 prior monthly deployments
    setStep(3);
  };

  const reset = () => {
    setStep(0);
    setConfirmedExposure(null);
    setDeploymentsCount(0);
  };

  return (
    <NorthlineShell step={step}>
      {step === 0 && <Options advance={() => setStep(2)} />}
      {step === 2 && (
        <SetExposure
          value={monthlyExposure}
          onChange={setMonthlyExposure}
          onBack={() => setStep(0)}
          onConfirm={() => advance(monthlyExposure)}
        />
      )}
      {step === 3 && (
        <YourStanding
          monthly={confirmedExposure}
          totalDeployed={totalDeployed}
          onRetract={reset}
        />
      )}
    </NorthlineShell>
  );
}
