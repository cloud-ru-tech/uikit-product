import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { AccordionPrimary, AccordionProps } from '@snack-uikit/accordion';

import { MobileAccordionPrimary } from '../MobileAccordionPrimary';

export type AdaptiveAccordionPrimaryProps = WithLayoutType<AccordionProps>;

export function AdaptiveAccordionPrimary({ layoutType, ...props }: AdaptiveAccordionPrimaryProps) {
  return layoutType === 'mobile' ? <MobileAccordionPrimary {...props} /> : <AccordionPrimary {...props} />;
}
