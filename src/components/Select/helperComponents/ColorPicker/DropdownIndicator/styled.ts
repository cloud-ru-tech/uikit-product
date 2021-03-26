import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { components as ReactSelectComponents } from 'react-select';

import { Tag } from 'components/Tag';
import { COLORS_SELECT } from 'theme/color/vars';

export const StyledDropdown = styled(ReactSelectComponents.DropdownIndicator)`
  padding: 0 !important;
`;

export const StyledTag = styled(Tag)`
  padding: 0;
  min-width: 20px;
  width: 20px;
  height: 20px;
`;

export const arrowDownClassName = css`
  cursor: pointer;

  &:hover,
  &:focus {
    fill: var(${COLORS_SELECT.DROPDOWN_ICON_HOVER_COLOR});
  }
`;
