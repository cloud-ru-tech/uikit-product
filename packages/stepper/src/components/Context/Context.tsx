import { createContext, useCallback, useContext, useState } from 'react';

import { StepContext } from './types';

const StepperContext = createContext<StepContext>({
  currentStepIndex: 0,
  moveForward: () => {},
  moveToPrevStep: () => {},
});

export type ContextProps = {
  children: React.ReactNode;
};

export const useStepperContext = () => {
  const stepperContext = useContext(StepperContext);

  return stepperContext;
};

export function Context({ children }: ContextProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const moveToPrevStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex >= currentStepIndex && stepIndex < 0) {
        return;
      }

      setCurrentStepIndex(stepIndex);
    },
    [currentStepIndex],
  );
  const moveForward = useCallback(() => {
    setCurrentStepIndex(prevStepIndex => prevStepIndex + 1);
  }, []);

  return (
    <StepperContext.Provider value={{ moveForward, moveToPrevStep, currentStepIndex }}>
      {children}
    </StepperContext.Provider>
  );
}
