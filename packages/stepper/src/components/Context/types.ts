type StepContext = {
  stepsCount: number;
  currentStepIndex: number;
  moveForward: () => void;
  moveToPrevStep: (stepIndex: number) => void;
  setValidator: (validator: (step: number) => boolean) => void;
  validateCurrentStep: (step: number) => boolean;
};

export type { StepContext };
