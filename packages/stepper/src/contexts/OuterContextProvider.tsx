import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { InnerContextProvider } from './InnerContextProvider';
import { InnerStep as InnerStepType } from './types';

export type StepperContext = {
  stepsCount: number;
  currentStepIndex: number;
  moveForward(): void;
  moveToPrevStep(stepIndex: number): void;
  setCurrentStep(stepIndex: number): void;
  setValidator(validator: (step: number) => boolean): void;
  clearErrors(): void;
  raiseCurrentStepError(): void;
};

const StepperContextProvider = createContext<StepperContext>({
  currentStepIndex: 0,
  stepsCount: 0,
  moveForward() {},
  moveToPrevStep() {},
  setCurrentStep() {},
  setValidator() {},
  clearErrors() {},
  raiseCurrentStepError() {},
});

export type ContextProps = {
  stepsCount: number;
  startStepIndex?: number;
  children: ReactNode;
};

export const useOuterContextProvider = () => useContext(StepperContextProvider);

export function OuterContextProvider({ stepsCount, startStepIndex = 0, children }: ContextProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(startStepIndex);
  const [validateCurrentStep, setValidateCurrentStep] = useState<(step: number) => boolean>(() => () => true);
  const [clearErrors, setClearErrors] = useState<() => void>(() => () => undefined);
  const [handleStepClick, setHandleStepClick] = useState<(stepIndex: number) => void>(() => () => undefined);
  const [handleSetCurrentStep, setHandleSetCurrentStep] = useState<(stepIndex: number) => void>(() => () => undefined);
  const [innerSteps, setInnerSteps] = useState<InnerStepType[]>(() => []);

  const moveToPrevStep = (stepIndex: number) => {
    if (stepIndex >= currentStepIndex || stepIndex < 0) {
      return;
    }

    handleStepClick(stepIndex);
  };

  const moveForward = () => {
    if (currentStepIndex === stepsCount - 1) {
      return;
    }

    handleStepClick(currentStepIndex + 1);
  };

  const setCurrentStep = (stepIndex: number) => {
    handleSetCurrentStep(stepIndex);
  };

  const setValidator = (validator: (step: number) => boolean) => {
    setValidateCurrentStep(() => validator);
  };

  const setErrorCleaner = useCallback((clearErrors: () => void) => {
    setClearErrors(() => clearErrors);
  }, []);

  const raiseCurrentStepError = useCallback(() => {
    const updatedCurrentStep = { ...innerSteps[currentStepIndex], hasError: true };

    setInnerSteps(prevInnerSteps => [
      ...prevInnerSteps.slice(0, currentStepIndex),
      updatedCurrentStep,
      ...prevInnerSteps.slice(currentStepIndex + 1),
    ]);
  }, [currentStepIndex, innerSteps]);

  const setStepClickHandler = useCallback((handleStepClick: (stepIndex: number) => void) => {
    setHandleStepClick(() => handleStepClick);
  }, []);

  const setCurrentStepHandler = useCallback((handleSetCurrentStep: (stepIndex: number) => void) => {
    setHandleSetCurrentStep(() => handleSetCurrentStep);
  }, []);

  return (
    <StepperContextProvider.Provider
      value={{
        stepsCount,
        moveForward,
        moveToPrevStep,
        setCurrentStep,
        currentStepIndex,
        setValidator,
        clearErrors,
        raiseCurrentStepError,
      }}
    >
      <InnerContextProvider
        validateCurrentStep={validateCurrentStep}
        setErrorCleaner={setErrorCleaner}
        setStepClickHandler={setStepClickHandler}
        handleStepClick={handleStepClick}
        setCurrentStepIndex={setCurrentStepIndex}
        setCurrentStepHandler={setCurrentStepHandler}
        innerSteps={innerSteps}
        setInnerSteps={setInnerSteps}
      >
        {children}
      </InnerContextProvider>
    </StepperContextProvider.Provider>
  );
}
