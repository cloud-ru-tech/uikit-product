import { ReactNode } from 'react';
import { Step } from 'react-joyride';

export type TourStepExtended = {
  subtitle?: ReactNode;
  primaryButtonText?: string;
  backButtonText?: string;
  closeButtonText?: string;
  onFinish?(): void | boolean;
} & Omit<Step, 'disableBeacon'>;
