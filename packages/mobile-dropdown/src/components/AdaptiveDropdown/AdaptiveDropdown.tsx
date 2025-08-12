import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Dropdown, DropdownProps } from '@snack-uikit/dropdown';

import { MobileDropdown, MobileDropdownProps } from '../MobileDropdown';

export type AdaptiveDropdownProps = WithLayoutType<DropdownProps & Pick<MobileDropdownProps, 'children'>>;

export function AdaptiveDropdown({ layoutType, children, ...dropdownProps }: AdaptiveDropdownProps) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? (
    <MobileDropdown {...dropdownProps}>{children}</MobileDropdown>
  ) : (
    <Dropdown {...dropdownProps}>{children}</Dropdown>
  );
}

export type { DropdownProps };
