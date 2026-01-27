import { ReactNode } from 'react';

import { AdaptiveTooltip } from '@cloud-ru/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonFunction,
  ButtonFunctionProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonSimple,
  ButtonSimpleProps,
  ButtonTonal,
  ButtonTonalProps,
} from '@snack-uikit/button';

import { ButtonDroplist, ButtonDroplistProps } from '../ButtonDroplist';
import { ButtonKebab, ButtonKebabProps } from '../ButtonKebab';
import { BUTTON_TYPE } from './constants';
import { Action } from './types';

export function ActionView({
  variant,
  tooltip,
  hidden = false,
  layoutType,
  commonProps,
  ...buttonProps
}: WithLayoutType<Action & { commonProps: { className?: string; size?: 's' | 'm' | 'l'; fullWidth?: boolean } }>) {
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
      return addTooltip(<ButtonFilled {...(buttonProps as ButtonFilledProps)} {...commonProps} />);
    case BUTTON_TYPE.Outline:
      return addTooltip(<ButtonOutline {...(buttonProps as ButtonOutlineProps)} {...commonProps} />);
    case BUTTON_TYPE.Tonal:
      return addTooltip(<ButtonTonal {...(buttonProps as ButtonTonalProps)} {...commonProps} />);
    case BUTTON_TYPE.Function:
      return addTooltip(<ButtonFunction {...(buttonProps as ButtonFunctionProps)} {...commonProps} />);
    case BUTTON_TYPE.Simple:
      return addTooltip(<ButtonSimple {...(buttonProps as ButtonSimpleProps)} {...commonProps} />);
    case BUTTON_TYPE.Kebab: {
      const { button, list } = buttonProps as ButtonKebabProps;
      return addTooltip(<ButtonKebab button={{ ...button, ...commonProps }} list={list} layoutType={layoutType} />);
    }
    case BUTTON_TYPE.Droplist: {
      const { button, list } = buttonProps as ButtonDroplistProps;
      return addTooltip(<ButtonDroplist button={{ ...button, ...commonProps }} list={list} layoutType={layoutType} />);
    }

    default:
      return null;
  }
}
