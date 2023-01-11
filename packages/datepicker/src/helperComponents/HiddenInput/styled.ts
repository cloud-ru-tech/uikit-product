import { css } from '@linaria/core';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const hiddenInputClassName = css`
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0;
  height: 20px;

  &:focus {
    color: var(${COLORS.INPUT_EDITABLE_TEXT});
    background-color: var(${COLORS.INPUT_EDITABLE_BACKGROUND});
    caret-color: transparent;
  }

  &::selection {
    background: transparent;
  }
`;
