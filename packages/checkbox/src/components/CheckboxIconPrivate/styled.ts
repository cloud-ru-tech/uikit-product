import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const iconClassName = css`
  margin: -3px;
`;

export const CheckboxIconWrap = styled.span`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  margin: 2px;
  height: 16px;
  width: 16px;
  border: 3px solid var(${COLORS.UNCHECKED.BORDER});
  border-radius: 4px;
  background: transparent;

  &:hover {
    border: 3px solid var(${COLORS.UNCHECKED.HOVER_BORDER});
    background-color: transparent;
  }

  &[data-checked] {
    fill: var(${COLORS.CHECKED.ICON_FILL});
    border-color: transparent;
    background-color: var(${COLORS.CHECKED.BACKGROUND});

    &:hover {
      background-color: var(${COLORS.CHECKED.HOVER_BACKGROUND});
    }
  }

  &[data-disabled] {
    border-color: var(${COLORS.UNCHECKED.DISABLED_BORDER});
    background-color: var(${COLORS.UNCHECKED.DISABLED_BACKGROUND});
    cursor: not-allowed;

    &:hover {
      background-color: var(${COLORS.UNCHECKED.DISABLED_BACKGROUND});
    }
  }

  &[data-checked][data-disabled] {
    border-color: transparent;
    background-color: var(${COLORS.CHECKED.DISABLED_BACKGROUND});

    &:hover {
      background-color: var(${COLORS.CHECKED.DISABLED_BACKGROUND});
    }
  }
`;
