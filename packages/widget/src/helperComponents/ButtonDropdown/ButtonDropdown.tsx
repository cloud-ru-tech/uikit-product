import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { AdaptiveDropdown, AdaptiveDropdownProps } from '@sbercloud/uikit-product-mobile-dropdown';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { useValueControl } from '@snack-uikit/utils';

export type ButtonDropdownProps = WithLayoutType<{
  button: Omit<ButtonFunctionProps, 'icon' | 'iconPosition' | 'appearance'>;
  dropdown: Omit<AdaptiveDropdownProps, 'children' | 'layoutType' | 'placement'>;
}>;

export function ButtonDropdown({ layoutType, button, dropdown }: ButtonDropdownProps) {
  const [open, onOpenChange] = useValueControl<boolean>({ onChange: dropdown.onOpenChange, value: dropdown.open });

  const Icon = open ? ChevronUpSVG : ChevronDownSVG;

  return (
    <AdaptiveDropdown {...dropdown} open={open} onOpenChange={onOpenChange} layoutType={layoutType}>
      <ButtonFunction {...button} icon={<Icon />} iconPosition='after' appearance='neutral' />
    </AdaptiveDropdown>
  );
}
