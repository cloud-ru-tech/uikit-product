import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { AccordionProps, AccordionSecondary } from '@snack-uikit/accordion';

import { MobileAccordionSecondary } from '../MobileAccordionSecondary';

export type AdaptiveAccordionSecondaryProps = WithLayoutType<AccordionProps>;

export function AdaptiveAccordionSecondary({ layoutType, ...props }: AdaptiveAccordionSecondaryProps) {
  return layoutType === 'mobile' ? <MobileAccordionSecondary {...props} /> : <AccordionSecondary {...props} />;
}
