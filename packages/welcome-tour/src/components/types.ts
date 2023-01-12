import { ReactNode } from 'react';
import { Step } from 'react-joyride';

export type StepWithSubtitle = {
  subtitle?: ReactNode;
} & Omit<Step, 'disableBeacon'>;
