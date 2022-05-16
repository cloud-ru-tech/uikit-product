import { styled } from '@linaria/react';

import { ButtonPrivate } from '@sbercloud/uikit-product-button-private';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledButtonPrivate = styled(ButtonPrivate)`
  width: 32px;
  height: 32px;
  border-radius: 20px;

  fill: var(${COLORS.FILL});
  background-color: var(${COLORS.BG});

  :hover {
    fill: var(${COLORS.FILL_HOVER});
    background-color: var(${COLORS.BG_HOVER});
  }

  :active {
    fill: var(${COLORS.FILL_ACTIVE});
    background-color: var(${COLORS.BG_ACTIVE});
  }

  :disabled,
  &[disabled] {
    fill: var(${COLORS.FILL_DISABLED});
    background-color: var(${COLORS.BG_DISABLED});
  }
`;
