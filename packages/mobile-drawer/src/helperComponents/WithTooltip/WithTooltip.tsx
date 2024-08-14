import { PropsWithChildren } from 'react';

import { MobileTooltip, MobileTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';

type WithTooltipProps = PropsWithChildren<{
  /** Тултип над кнопкой */
  tooltip?: MobileTooltipProps;
}>;

export function WithTooltip({ tooltip, children }: WithTooltipProps) {
  if (!tooltip) {
    return <>{children}</>;
  }

  return <MobileTooltip {...tooltip}>{children}</MobileTooltip>;
}
