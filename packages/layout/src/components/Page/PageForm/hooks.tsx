import { JSXElementConstructor } from 'react';

import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

export function useButtonWithTooltip<T>({
  Button,
  tooltip,
}: {
  tooltip?: TooltipProps;
  Button: JSXElementConstructor<T>;
}) {
  if (tooltip) {
    return function ButtonWithTooltip(props: T) {
      return (
        <Tooltip {...tooltip}>
          <Button {...props} />
        </Tooltip>
      );
    };
  }

  return Button;
}
