import { styled } from '@linaria/react';

import { ButtonPrivate } from '@sbercloud/uikit-product-button-private';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PADDING, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledButtonPrivate = styled(ButtonPrivate)`
  padding: ${PADDING}px;

  fill: var(${COLORS.FILL});
  background-color: transparent;

  :hover {
    fill: var(${COLORS.FILL_HOVER});
  }

  :active,
  &[data-active] {
    fill: var(${COLORS.FILL_ACTIVE});
  }

  :disabled,
  &[disabled] {
    fill: var(${COLORS.FILL_DISABLED});
  }
`;
