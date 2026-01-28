import { useMemo } from 'react';

import { KebabSVG } from '@cloud-ru/uikit-product-icons';
import { AdaptiveDroplist, AdaptiveDroplistProps } from '@cloud-ru/uikit-product-mobile-dropdown';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonOutline, ButtonOutlineProps } from '@snack-uikit/button';
import { useValueControl } from '@snack-uikit/utils';

export type ButtonKebabProps = WithLayoutType<{
  button?: Omit<ButtonOutlineProps, 'label' | 'icon'>;
  list: Pick<AdaptiveDroplistProps, 'items' | 'closeDroplistOnItemClick' | 'open' | 'onOpenChange' | 'className'>;
}>;

export function ButtonKebab({ layoutType, button, list }: ButtonKebabProps) {
  const [open, onOpenChange] = useValueControl<boolean>({ onChange: list.onOpenChange, value: list.open });

  const size = useMemo(() => (layoutType === 'mobile' ? 'm' : 's'), [layoutType]);

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
      size={size}
    >
      <ButtonOutline {...button} icon={<KebabSVG />} appearance='neutral' size={size} />
    </AdaptiveDroplist>
  );
}
