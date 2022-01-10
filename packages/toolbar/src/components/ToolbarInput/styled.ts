import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

const { COLORS_TOOLBAR } = DEPRECATED_EXPORT_VARS;

export const searchIconClassname = css`
  fill: var(${COLORS.icon});
`;

export const InputWrapStyled = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;
  flex-grow: 1;
  background-color: var(${COLORS.background});

  &[data-has-prev-sibling] {
    border-left: 1px solid var(${COLORS_TOOLBAR.INPUT_BORDER});
  }

  &[data-has-next-sibling] {
    border-right: 1px solid var(${COLORS_TOOLBAR.INPUT_BORDER});
  }
`;
