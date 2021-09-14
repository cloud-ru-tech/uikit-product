type StepContext = {
  currentStepIndex: number;
  moveForward: () => void;
  moveToPrevStep: (stepIndex: number) => void;
};

export type { StepContext };
