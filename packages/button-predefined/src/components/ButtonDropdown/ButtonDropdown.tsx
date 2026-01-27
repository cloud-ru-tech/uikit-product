import { ReactNode } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@cloud-ru/uikit-product-icons';
import { AdaptiveDropdown, AdaptiveDroplist } from '@cloud-ru/uikit-product-mobile-dropdown';
import { excludeSupportProps, extractSupportProps, WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { DropdownProps } from '@snack-uikit/dropdown';
import { DroplistProps } from '@snack-uikit/list';

import { useValueControl } from '../../hooks';

export type ButtonDropdownProps = WithLayoutType<
  Omit<ButtonFunctionProps, 'icon' | 'iconPosition'> &
    (Omit<DropdownProps, 'children'> | Omit<DroplistProps, 'children' | 'size'>)
>;

function isDroplistProps(props: ButtonDropdownProps): props is WithLayoutType<DroplistProps> {
  return 'items' in props;
}

type ContentfulDropdownProps = Record<string, unknown> & {
  content: ReactNode;
};

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
      <AdaptiveDroplist
        {...(excludeSupportProps(props) as DroplistProps)}
        open={open}
        onOpenChange={onOpenChange}
        size={size === 'xs' ? 's' : size}
        layoutType={props.layoutType}
      >
        <ButtonFunction size={size} {...props} className={className} {...extractSupportProps(props)} icon={<Icon />} />
      </AdaptiveDroplist>
    );
  }

  return (
    <AdaptiveDropdown
      {...(excludeSupportProps(props) as ContentfulDropdownProps)}
      open={open}
      onOpenChange={onOpenChange}
      layoutType={props.layoutType}
    >
      <ButtonFunction size={size} {...props} className={className} {...extractSupportProps(props)} icon={<Icon />} />
    </AdaptiveDropdown>
  );
}
