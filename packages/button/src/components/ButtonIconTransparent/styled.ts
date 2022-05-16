import { styled } from '@linaria/react';

import { ButtonPrivate } from '@sbercloud/uikit-product-button-private';

import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledButtonPrivate = styled(ButtonPrivate)`
  width: 28px;
  height: 28px;
  border-radius: 4px;

  &[data-rounded] {
    border-radius: 100px;
  }

  &[data-variant='${Variant.Default}'] {
    fill: var(${COLORS.DEFAULT_FILL});
    background-color: var(${COLORS.DEFAULT_BG});

    :hover {
      fill: var(${COLORS.DEFAULT_FILL_HOVER});
      background-color: var(${COLORS.DEFAULT_BG_HOVER});
    }

    :active {
      fill: var(${COLORS.DEFAULT_FILL_ACTIVE});
      background-color: var(${COLORS.DEFAULT_BG_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.DEFAULT_FILL_DISABLED});
      background-color: var(${COLORS.DEFAULT_BG_DISABLED});
    }
  }

  &[data-variant='${Variant.Accent}'] {
    fill: var(${COLORS.ACCENT_FILL});
    background-color: var(${COLORS.ACCENT_BG});

    :hover {
      fill: var(${COLORS.ACCENT_FILL_HOVER});
      background-color: var(${COLORS.ACCENT_BG_HOVER});
    }

    :active {
      fill: var(${COLORS.ACCENT_FILL_ACTIVE});
      background-color: var(${COLORS.ACCENT_BG_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.ACCENT_FILL_DISABLED});
      background-color: var(${COLORS.ACCENT_BG_DISABLED});
    }
  }
`;
