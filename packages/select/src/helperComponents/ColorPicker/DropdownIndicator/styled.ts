import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { components as ReactSelectComponents } from 'react-select';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { ColorBox } from '../ColorBox';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

export const StyledDropdown = styled(ReactSelectComponents.DropdownIndicator)`
  padding: 0 !important;
`;

export const StyledColorBox = styled(ColorBox)`
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
