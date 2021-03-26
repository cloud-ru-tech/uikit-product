import { css } from '@linaria/core';

import { COLORS_INPUT } from 'theme/color/vars';

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
