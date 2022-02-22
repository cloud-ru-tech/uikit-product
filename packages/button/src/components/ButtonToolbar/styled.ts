import { css } from '@linaria/core';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const buttonToolbarClassName = css`
  padding: 12px;

  fill: var(${COLORS.FILL});
  background-color: transparent;

  :hover {
    fill: var(${COLORS.FILL_HOVER});
  }

  :active {
    fill: var(${COLORS.FILL_ACTIVE});
  }

  :disabled,
  &[disabled] {
    fill: var(${COLORS.FILL_DISABLED});
  }
`;
