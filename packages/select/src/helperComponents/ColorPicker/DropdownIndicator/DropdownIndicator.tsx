import { components as ReactSelectComponents } from 'react-select';

import { ArrowDownSVG } from '@sbercloud/icons';

import { StyledDropdown, StyledTag, arrowDownClassName } from './styled';

export const DropdownIndicator = (
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element => {
  const { hasValue, getValue } = props;
  const dropdownValue = hasValue && getValue();
  const value = (Array.isArray(dropdownValue) && dropdownValue[0]?.value) || undefined;

  return (
    <StyledDropdown {...props}>
      <StyledTag color={value}>
        <ArrowDownSVG className={arrowDownClassName} />
      </StyledTag>
    </StyledDropdown>
  );
};
