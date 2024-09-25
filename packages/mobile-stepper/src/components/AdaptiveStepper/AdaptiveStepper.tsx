import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Stepper, StepperProps, useStepperApi } from '@snack-uikit/stepper';

import { useMobileStepperApi } from '../../MobileStepperContext';
import { MobileStepper } from '../MobileStepper';

export function AdaptiveStepper({ layoutType, ...props }: WithLayoutType<StepperProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileStepper {...props} /> : <Stepper {...props} />;
}

export function useAdaptiveStepperApi({ layoutType }: WithLayoutType) {
  const isMobile = layoutType === 'mobile';
  const mobileSteperApi = useMobileStepperApi();
  const steperApi = useStepperApi();
  return isMobile ? mobileSteperApi : steperApi;
}

export type { StepperProps };
