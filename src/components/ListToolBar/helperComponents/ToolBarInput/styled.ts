import { css } from '@linaria/core';

import { COLORS_INPUT } from 'theme/color/vars';

export const inputClassName = css`
  flex-grow: 1;

  &[data-has-prev-sibling] {
    border-left: 1px solid var(--listoolbar-border-color);
  }

  &[data-has-next-sibling] {
    border-right: 1px solid var(--listoolbar-border-color);
  }
`;

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
