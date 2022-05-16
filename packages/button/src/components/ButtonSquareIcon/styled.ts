import { styled } from '@linaria/react';

import { ButtonPrivate } from '@sbercloud/uikit-product-button-private';

import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledButtonPrivate = styled(ButtonPrivate)`
  width: 44px;
  height: 44px;
  padding: 12px;
  border-radius: 4px;
  border: 1.5px solid;

  &[data-variant='${Variant.Default}'] {
    fill: var(${COLORS.DEFAULT_FILL});
    border-color: var(${COLORS.DEFAULT_BORDER});

    :hover {
      fill: var(${COLORS.DEFAULT_FILL_HOVER});
      background-color: var(${COLORS.DEFAULT_BG_HOVER});
      border-color: var(${COLORS.DEFAULT_BORDER_HOVER});
    }

    :active {
      fill: var(${COLORS.DEFAULT_FILL_ACTIVE});
      background-color: var(${COLORS.DEFAULT_BG_ACTIVE});
      border-color: var(${COLORS.DEFAULT_BORDER_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.DEFAULT_FILL_DISABLED});
      border-color: var(${COLORS.DEFAULT_BORDER_DISABLED});
    }
  }

  &[data-variant='${Variant.Accent}'] {
    fill: var(${COLORS.ACCENT_FILL});
    border-color: var(${COLORS.ACCENT_BORDER});

    :hover {
      fill: var(${COLORS.ACCENT_FILL_HOVER});
      background-color: var(${COLORS.ACCENT_BG_HOVER});
      border-color: var(${COLORS.ACCENT_BORDER_HOVER});
    }

    :active {
      fill: var(${COLORS.ACCENT_FILL_ACTIVE});
      background-color: var(${COLORS.ACCENT_BG_ACTIVE});
      border-color: var(${COLORS.ACCENT_BORDER_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.ACCENT_FILL_DISABLED});
      border-color: var(${COLORS.ACCENT_BORDER_DISABLED});
    }
  }
`;
