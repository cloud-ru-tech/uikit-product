import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { AccordionPrimary, CollapseBlockPrimaryProps } from '@snack-uikit/accordion';

import { MobileCollapseBlockPrimary } from '../MobileCollapseBlockPrimary';

export type AdaptiveCollapseBlockPrimaryProps = WithLayoutType<CollapseBlockPrimaryProps>;

export function AdaptiveCollapseBlockPrimary({ layoutType, ...props }: AdaptiveCollapseBlockPrimaryProps) {
  return layoutType === 'mobile' ? (
    <MobileCollapseBlockPrimary {...props} />
  ) : (
    <AccordionPrimary.CollapseBlock {...props} />
  );
}
