import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Stepper, StepperProps } from '@snack-uikit/stepper';

import { MobileStepper } from '../MobileStepper';

export function AdaptiveStepper({ layoutType, ...props }: WithLayoutType<StepperProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileStepper {...props} /> : <Stepper {...props} />;
}

export type { StepperProps };
