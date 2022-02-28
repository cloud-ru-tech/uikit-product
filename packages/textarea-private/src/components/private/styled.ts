import { css } from '@linaria/core';

import { TEXT_2_STYLES } from '@sbercloud/uikit-typography';
import { DEFAULT_STYLES } from '@sbercloud/uikit-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_DARK_THEME;
GREEN_THEME;
PURPLE_THEME;
PURPLE_DARK_THEME;

export const textareaClassName = css`
  ${DEFAULT_STYLES.COMMON};
  ${TEXT_2_STYLES};

  resize: none;
  background-color: transparent;
  width: 100%;
  max-width: 100%;
  height: 100%;
  scrollbar-width: none;
  font-family: SB Sans Interface, serif;
  color: var(${COLORS.text.default});

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
