import { Context, ContextProps, useStepperContext } from './Context';
import { Steps, StepsProps, StepType } from './Steps';

const Stepper = {
  Steps,
  Context,
};

export { Stepper, useStepperContext };
export type { ContextProps, StepType, StepsProps };
