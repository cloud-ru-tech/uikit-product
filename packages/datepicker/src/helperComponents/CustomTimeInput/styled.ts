import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  position: relative;
`;

export const Input = styled.input`
  padding: 12px 32px 12px 12px;
  outline: 0;
  cursor: pointer;

  box-sizing: border-box;
  border-radius: 4px;

  height: 44px;

  &[data-disabled] {
    color: var(${COLORS.TIME_INPUT_DISABLED});
    background-color: var(${COLORS.TIME_INPUT_BACKGROUND_DISABLED});
  }
`;

export const iconClassName = css`
  position: absolute;
  top: 12px;
  right: 8px;
  fill: var(${COLORS.TIME_INPUT_ICON_FILL});

  &[data-open] {
    transform: rotate(180deg);
  }

  &[data-disabled] {
    fill: var(${COLORS.TIME_INPUT_ICON_FILL_DISABLED});
  }
`;
