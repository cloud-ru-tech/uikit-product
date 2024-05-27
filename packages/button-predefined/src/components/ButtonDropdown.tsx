import { ChevronDownSVG, ChevronUpSVG } from '@sbercloud/uikit-product-icons';
import { excludeSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { Dropdown, DropdownProps } from '@snack-uikit/dropdown';
import { Droplist, DroplistProps } from '@snack-uikit/list';

import { useValueControl } from '../hooks';

export type ButtonDropdownProps = Omit<ButtonFunctionProps, 'icon' | 'iconPosition'> &
  (Omit<DropdownProps, 'children'> | Omit<DroplistProps, 'children' | 'size'>);

function isDroplistProps(props: ButtonDropdownProps): props is DroplistProps {
  return 'items' in props;
}

export function ButtonDropdown({
  size = 's',
  className,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  ...props
}: ButtonDropdownProps) {
  const [open, onOpenChange] = useValueControl({ value: openProp, onChange: onOpenChangeProp });

  const Icon = open ? ChevronUpSVG : ChevronDownSVG;

  if (isDroplistProps(props)) {
    return (
      <Droplist
        {...(excludeSupportProps(props) as DroplistProps)}
        open={open}
        onOpenChange={onOpenChange}
        size={size === 'xs' ? 's' : size}
      >
        <ButtonFunction size={size} {...props} className={className} {...extractSupportProps(props)} icon={<Icon />} />
      </Droplist>
    );
  }

  return (
    <Dropdown {...(excludeSupportProps(props) as DropdownProps)} open={open} onOpenChange={onOpenChange}>
      <ButtonFunction size={size} {...props} className={className} {...extractSupportProps(props)} icon={<Icon />} />
    </Dropdown>
  );
}
