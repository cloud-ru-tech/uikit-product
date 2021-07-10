import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_INPUT } = DEPRECATED_EXPORT_VARS;

export const searchIconClassname = css`
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  cursor: pointer;
  &:focus,
  &:hover {
    fill: var(${COLORS_INPUT.INPUT_ICON_HOVER_COLOR});
  }
`;

export const crossIconClassName = css`
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  cursor: pointer;
  &:focus,
  &:hover {
    fill: var(${COLORS_INPUT.INPUT_ICON_HOVER_COLOR});
  }
`;
