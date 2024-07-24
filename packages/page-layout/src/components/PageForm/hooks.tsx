import { ForwardRefExoticComponent } from 'react';

import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

export function useButtonWithTooltip<T extends Record<string, unknown>>({
  Button,
  tooltip,
}: {
  tooltip?: TooltipProps;
  Button: ForwardRefExoticComponent<T>;
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
