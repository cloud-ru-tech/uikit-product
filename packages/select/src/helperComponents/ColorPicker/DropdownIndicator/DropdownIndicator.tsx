import { components as ReactSelectComponents } from 'react-select';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { arrowDownClassName, StyledColorBox, StyledDropdown } from './styled';

export function DropdownIndicator(
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element {
  const { hasValue, getValue } = props;
  const dropdownValue = hasValue && getValue();
  const value = (Array.isArray(dropdownValue) && dropdownValue[0]?.value) || undefined;

  return (
    <StyledDropdown {...props}>
      <StyledColorBox color={value}>
        <DropdownDownInterfaceSVG className={arrowDownClassName} />
      </StyledColorBox>
    </StyledDropdown>
  );
}
