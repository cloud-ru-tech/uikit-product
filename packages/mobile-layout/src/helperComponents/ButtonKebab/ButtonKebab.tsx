import { KebabSVG } from '@sbercloud/uikit-product-icons';
import { AdaptiveDroplist, AdaptiveDroplistProps } from '@sbercloud/uikit-product-mobile-dropdown';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonOutline, ButtonOutlineProps } from '@snack-uikit/button';
import { useValueControl } from '@snack-uikit/utils';

export type ButtonKebabProps = WithLayoutType<{
  button?: Omit<ButtonOutlineProps, 'label' | 'icon'>;
  list: Pick<AdaptiveDroplistProps, 'items' | 'closeDroplistOnItemClick' | 'open' | 'onOpenChange' | 'className'>;
}>;

export function ButtonKebab({ layoutType, button, list }: ButtonKebabProps) {
  const [open, onOpenChange] = useValueControl<boolean>({ onChange: list.onOpenChange, value: list.open });

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
      placement='bottom-end'
      size='m'
    >
      <ButtonOutline {...button} icon={<KebabSVG />} appearance='neutral' />
    </AdaptiveDroplist>
  );
}
