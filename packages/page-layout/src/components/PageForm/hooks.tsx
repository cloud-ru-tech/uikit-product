import { ForwardRefExoticComponent } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

import { ButtonPrimaryVariant, ButtonSecondaryVariant } from './types';

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

export function useGetButtonLabel() {
  const { t } = useLocale('PageLayout');

  return function getButtonLabel(variant: ButtonPrimaryVariant | ButtonSecondaryVariant): string {
    return t(`PageForm.${variant}`);
  };
}
