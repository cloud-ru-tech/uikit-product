import { ReactNode } from 'react';

import { AdaptiveTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFunction, ButtonOutline, ButtonSimple, ButtonTonal } from '@snack-uikit/button';

import { BUTTON_TYPE } from './constants';
import { Action } from './types';

export function ActionView({ variant, tooltip, hidden = false, layoutType, ...buttonProps }: WithLayoutType<Action>) {
  if (hidden) {
    return null;
  }

  const addTooltip = (component: ReactNode) =>
    tooltip ? (
      <AdaptiveTooltip layoutType={layoutType} {...tooltip}>
        {component}
      </AdaptiveTooltip>
    ) : (
      component
    );

  switch (variant) {
    case BUTTON_TYPE.Filled:
      return addTooltip(<ButtonFilled {...buttonProps} />);
    case BUTTON_TYPE.Outline:
      return addTooltip(<ButtonOutline {...buttonProps} />);
    case BUTTON_TYPE.Tonal:
      return addTooltip(<ButtonTonal {...buttonProps} />);
    case BUTTON_TYPE.Function:
      return addTooltip(<ButtonFunction {...buttonProps} />);
    case BUTTON_TYPE.Simple:
      return addTooltip(<ButtonSimple {...buttonProps} />);
    default:
      return null;
  }
}
