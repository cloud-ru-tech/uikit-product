import { createContext, useContext } from 'react';

import { MobileStepperApi } from '../types';

export type MobileStepperContextValue = MobileStepperApi;

export const MobileStepperContext = createContext<MobileStepperApi>({
  stepper: <></>,
  stepCount: 0,
  isCompleted: false,
  currentStepIndex: 0,
  goNext() {
    /* stub */
  },
  goPrev() {
    /* stub */
  },
  resetValidation() {
    /* stub */
  },
  setValidator() {
    /* stub */
  },
});

export const useMobileStepperApi = () => useContext(MobileStepperContext);
