import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { components as ReactSelectComponents } from 'react-select';

import { Tag } from '@sbercloud/uikit-react-tag';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_SELECT } = EXPORT_VARS;

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
