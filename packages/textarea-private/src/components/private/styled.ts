import { css } from '@linaria/core';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const textareaClassName = css`
  resize: none;
  width: 100%;
  max-width: 100%;
  height: 100%;
  border-width: 0;
  scrollbar-width: none;
  font-family: SB Sans Interface, serif;
  color: var(${COLORS.text.default});
  ${TYPOGRAPHY_VARIABLES.TEXT_2};

  box-sizing: border-box;

  background-color: transparent;

  padding-top: 12px;
  padding-right: 12px;

  outline: 0;

  &[disabled] {
    background-color: transparent;
    color: var(${COLORS.text.disabled});
  }

  &::placeholder {
    color: var(${COLORS.placeholder.default});
  }

  &[disabled]::placeholder {
    color: var(${COLORS.placeholder.disabled});
  }

  &::-webkit-scrollbar {
    width: 0;
    max-width: 0;
  }
`;
