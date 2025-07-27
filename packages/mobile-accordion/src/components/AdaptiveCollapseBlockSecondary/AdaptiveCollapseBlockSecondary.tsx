import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { AccordionSecondary, CollapseBlockSecondaryProps } from '@snack-uikit/accordion';

import { MobileCollapseBlockSecondary } from '../MobileCollapseBlockSecondary';

export type AdaptiveCollapseBlockSecondaryProps = WithLayoutType<CollapseBlockSecondaryProps>;

export function AdaptiveCollapseBlockSecondary({ layoutType, ...props }: AdaptiveCollapseBlockSecondaryProps) {
  return layoutType === 'mobile' ? (
    <MobileCollapseBlockSecondary {...props} />
  ) : (
    <AccordionSecondary.CollapseBlock {...props} />
  );
}
