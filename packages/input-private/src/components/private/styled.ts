import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledInput = styled.input`
  width: 100%;
  max-width: 100%;
  ${TYPOGRAPHY_VARIABLES.TEXT_2};
  border-width: 0;
  outline: none;

  font-family: SB Sans Interface, serif;
  color: var(${COLORS.text.default});
  background-color: transparent;

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
`;
