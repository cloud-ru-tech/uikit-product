import { ContextProps, OuterContextProvider, useOuterContextProvider } from '../contexts/OuterContextProvider';
import { Stepper as StepperView } from './Stepper/Stepper';
import { Step as StepType, StepperProps as StepsProps } from './types';

const Stepper = {
  Steps: StepperView,
  Context: OuterContextProvider,
};

export { Stepper, useOuterContextProvider as useStepperContext };
export type { ContextProps, StepType, StepsProps };
