import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-typography';
import { DEFAULT_STYLES } from '@sbercloud/uikit-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledInput = styled.input`
  ${DEFAULT_STYLES.COMMON};
  ${DEFAULT_STYLES.BORDERLESS};
  ${TEXT_2_STYLES};
  background-color: transparent;
  width: 100%;
  max-width: 100%;
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
`;
