import { css } from '@linaria/core';

import { COLORS_TOOLBAR } from 'theme/color/vars';

export const toolbarButtonClassName = css`
  border-radius: 0;
  height: 40px;
  box-sizing: border-box;

  &[data-variant='transparent'] {
    fill: var(${COLORS_TOOLBAR.ICON_COLOR});

    &:not(:disabled):hover {
      fill: var(${COLORS_TOOLBAR.ICON_HOVER_COLOR});
    }

    &:hover {
      background-color: transparent;
    }
  }
`;
