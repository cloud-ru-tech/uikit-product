import { useMemo } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@cloud-ru/uikit-product-icons';
import { AdaptiveDroplist, AdaptiveDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFilled, ButtonFilledProps, ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { useValueControl } from '@snack-uikit/utils';

export type ButtonDroplistProps = WithLayoutType<{
  button:
    | (Omit<ButtonFilledProps, 'appearance'> & { buttonType?: 'filled' })
    | (Omit<ButtonFunctionProps, 'icon' | 'iconPosition' | 'appearance'> & { buttonType?: 'function' });
  list: Pick<AdaptiveDroplistProps, 'items' | 'closeDroplistOnItemClick' | 'className' | 'open' | 'onOpenChange'>;
}>;

export function ButtonDroplist({ layoutType, button, list }: ButtonDroplistProps) {
  const [open, onOpenChange] = useValueControl<boolean>({ onChange: list.onOpenChange, value: list.open });

  const Icon = open ? ChevronUpSVG : ChevronDownSVG;

  const buttonType = button.buttonType ?? 'function';

  const Button = buttonType === 'filled' ? ButtonFilled : ButtonFunction;

  const buttonProps: ButtonDroplistProps['button'] = useMemo(
    () =>
      buttonType === 'filled' ? button : { ...button, appearance: 'neutral', icon: <Icon />, iconPosition: 'after' },
    [buttonType, button, Icon],
  );

  return (
    <AdaptiveDroplist
      {...list}
      open={open}
      onOpenChange={onOpenChange}
      layoutType={layoutType}
      selection={{
        mode: 'single',
        value: 'null',
      }}
      size='s'
    >
      <Button {...buttonProps} />
    </AdaptiveDroplist>
  );
}
