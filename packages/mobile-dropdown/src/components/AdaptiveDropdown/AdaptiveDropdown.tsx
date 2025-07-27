import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Dropdown, DropdownProps } from '@snack-uikit/dropdown';
import { extractSupportProps } from '@snack-uikit/utils';

import { MobileDropdown, MobileDropdownProps } from '../MobileDropdown';

export function AdaptiveDropdown({
  layoutType,
  children,
  ...rest
}: WithLayoutType<Omit<DropdownProps, 'children'> & Pick<MobileDropdownProps, 'children' | 'content'>>) {
  const isMobile = layoutType === 'mobile';
  const dropdownProps = { ...rest, ...extractSupportProps(rest) };

  return isMobile ? (
    <MobileDropdown {...dropdownProps}>{children}</MobileDropdown>
  ) : (
    <Dropdown {...dropdownProps}>{children}</Dropdown>
  );
}

export type { DropdownProps };
