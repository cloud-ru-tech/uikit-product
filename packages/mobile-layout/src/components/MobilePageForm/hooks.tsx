import { ForwardRefExoticComponent } from 'react';

import { MobileTooltip, MobileTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';

export function useButtonWithTooltip<T extends Record<string, unknown>>({
  Button,
  tooltip,
}: {
  tooltip?: MobileTooltipProps;
  Button: ForwardRefExoticComponent<T>;
}) {
  if (tooltip) {
    return function ButtonWithTooltip(props: T) {
      return (
        <MobileTooltip {...tooltip}>
          <Button {...props} />
        </MobileTooltip>
      );
    };
  }

  return Button;
}
