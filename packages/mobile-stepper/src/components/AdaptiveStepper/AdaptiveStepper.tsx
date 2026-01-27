import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Stepper, StepperProps, useStepperApi } from '@snack-uikit/stepper';

import { useMobileStepperApi } from '../../MobileStepperContext';
import { MobileStepper } from '../MobileStepper';

export type AdaptiveStepperProps = WithLayoutType<StepperProps>;

export function AdaptiveStepper({ layoutType, ...props }: AdaptiveStepperProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileStepper {...props} /> : <Stepper {...props} />;
}

export function useAdaptiveStepperApi({ layoutType }: WithLayoutType): ReturnType<typeof useStepperApi> {
  const isMobile = layoutType === 'mobile';
  const mobileStepperApi = useMobileStepperApi();
  const stepperApi = useStepperApi();
  return isMobile ? mobileStepperApi : stepperApi;
}

export type { StepperProps };
