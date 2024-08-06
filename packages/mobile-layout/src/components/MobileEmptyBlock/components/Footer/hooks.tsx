import { JSXElementConstructor } from 'react';

import { MobileTooltip, MobileTooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';

export function useButtonWithTooltip<T>({
  Button,
  tooltip,
}: {
  tooltip?: MobileTooltipProps;
  Button: JSXElementConstructor<T>;
}) {
  if (tooltip) {
    return function ButtonWithTooltip(props: T) {
      return (
        <MobileTooltip {...tooltip}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Button {...props} />
        </MobileTooltip>
      );
    };
  }

  return Button;
}
