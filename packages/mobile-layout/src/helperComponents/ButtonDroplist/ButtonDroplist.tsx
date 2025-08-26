import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { AdaptiveDroplist, AdaptiveDroplistProps } from '@sbercloud/uikit-product-mobile-dropdown';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { useValueControl } from '@snack-uikit/utils';

export type ButtonDroplistProps = WithLayoutType<{
  button: Omit<ButtonFunctionProps, 'icon' | 'iconPosition' | 'appearance'>;
  list: Pick<AdaptiveDroplistProps, 'items' | 'closeDroplistOnItemClick' | 'className' | 'open' | 'onOpenChange'>;
}>;

export function ButtonDroplist({ layoutType, button, list }: ButtonDroplistProps) {
  const [open, onOpenChange] = useValueControl<boolean>({ onChange: list.onOpenChange, value: list.open });

  const Icon = open ? ChevronUpSVG : ChevronDownSVG;

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
      size='m'
    >
      <ButtonFunction {...button} icon={<Icon />} iconPosition='after' appearance='neutral' />
    </AdaptiveDroplist>
  );
}
