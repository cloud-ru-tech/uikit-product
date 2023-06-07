import { css } from '@linaria/core';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const commonInputClassName = css`
  width: 100%;

  background-color: var(${COLORS.INPUT_BACKGROUND});
  border: 1px solid var(${COLORS.INPUT_BORDER});

  box-sizing: border-box;
  border-radius: 4px;

  &:not([data-disabled]):hover {
    background-color: var(${COLORS.INPUT_BACKGROUND_HOVER});
    border: 1px solid var(${COLORS.INPUT_BORDER_HOVER});
    &::placeholder {
      color: var(${COLORS.INPUT_PLACEHOLDER_HOVER});
    }
  }

  &:not([data-disabled])&:focus {
    background-color: var(${COLORS.INPUT_BACKGROUND_FOCUS});
    border: 1px solid var(${COLORS.INPUT_BORDER_FOCUS});
  }

  &[data-open] {
    background-color: var(${COLORS.INPUT_BACKGROUND_FOCUS});
    border: 1px solid var(${COLORS.INPUT_BORDER_FOCUS});
  }
`;
