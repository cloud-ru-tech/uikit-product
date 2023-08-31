import { css } from '@linaria/core';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const commonInputClassName = css`
  width: 100%;

  background-color: var(${COLORS.INPUT_BACKGROUND});

  box-sizing: border-box;
  border-radius: 4px;
`;
