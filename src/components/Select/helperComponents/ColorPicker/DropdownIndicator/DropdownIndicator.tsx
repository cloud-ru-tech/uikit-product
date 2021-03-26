import { components as ReactSelectComponents } from 'react-select';
import { css } from '@linaria/core';

import { ArrowDownSVG } from '@sbercloud/icons';

import { StyledDropdown, StyledTag } from './styled';

// TODO: we have to create className instead of wrapping component because of a bug
// https://github.com/NervJS/taro/issues/8325
export const arrowDownClassName = css`
  fill: inherit;

  &:hover,
  &:focus {
    fill: #343f48;
  }
`;

export const DropdownIndicator = (
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element => {
  const { hasValue, getValue } = props;
  const dropdownValue = hasValue && getValue();
  const value =
    (Array.isArray(dropdownValue) && dropdownValue[0]?.value) || undefined;

  return (
    <StyledDropdown {...props}>
      <StyledTag color={value}>
        <ArrowDownSVG className={arrowDownClassName} />
      </StyledTag>
    </StyledDropdown>
  );
};
