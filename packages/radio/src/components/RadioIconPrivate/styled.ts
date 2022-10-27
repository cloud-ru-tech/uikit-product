import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const IconContainer = styled.div`
  display: flex;

  fill: var(${COLORS.RADIO.ICON});

  &:not([data-disabled='true']) {
    &:hover {
      fill: var(${COLORS.RADIO.HOVER.ICON});
    }
  }

  &[data-disabled='true'] {
    fill: var(${COLORS.RADIO.DISABLED.ICON});
  }

  &[data-checked='true'] {
    fill: var(${COLORS.RADIO_SELECTED.ICON});

    &:hover {
      fill: var(${COLORS.RADIO_SELECTED.HOVER.ICON});
    }

    &[data-disabled='true'] {
      fill: var(${COLORS.RADIO_SELECTED.DISABLED.ICON});
    }
  }
`;
