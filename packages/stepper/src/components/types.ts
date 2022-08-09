import { ReactNode } from 'react';

export type Step = {
  id: string;
  label: string;
  content: ReactNode;
};

export type StepperProps = {
  steps: Step[];
  className?: string;
};
