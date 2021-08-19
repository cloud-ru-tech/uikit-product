import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { BaseButton } from '../../helperComponents';
import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(BaseButton)`
  height: 44px;
  padding: 12px 16px;
  border-radius: 4px;

  ${TYPOGRAPHY_VARIABLES.TEXT_2}

  &[data-variant='${Variant.Filled}'] {
    fill: var(${COLORS.FILLED_FILL});
    background-color: var(${COLORS.FILLED_BG});
    color: var(${COLORS.FILLED_COLOR});

    :hover {
      fill: var(${COLORS.FILLED_FILL_HOVER});
      background-color: var(${COLORS.FILLED_BG_HOVER});
      color: var(${COLORS.FILLED_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.FILLED_FILL_ACTIVE});
      background-color: var(${COLORS.FILLED_BG_ACTIVE});
      color: var(${COLORS.FILLED_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.FILLED_FILL_DISABLED});
      background-color: var(${COLORS.FILLED_BG_DISABLED});
      color: var(${COLORS.FILLED_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Outline}'] {
    fill: var(${COLORS.OUTLINE_FILL});
    border: 1px solid var(${COLORS.OUTLINE_BORDER});
    color: var(${COLORS.OUTLINE_COLOR});

    :hover {
      fill: var(${COLORS.OUTLINE_FILL_HOVER});
      border: 1px solid var(${COLORS.OUTLINE_BORDER_HOVER});
      color: var(${COLORS.OUTLINE_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.OUTLINE_FILL_ACTIVE});
      border: 1px solid var(${COLORS.OUTLINE_BORDER_ACTIVE});
      color: var(${COLORS.OUTLINE_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.OUTLINE_FILL_DISABLED});
      border: 1px solid var(${COLORS.OUTLINE_BORDER_DISABLED});
      color: var(${COLORS.OUTLINE_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Transparent}'] {
    fill: var(${COLORS.TRANSPARENT_FILL});
    background-color: var(${COLORS.TRANSPARENT_BG});
    color: var(${COLORS.TRANSPARENT_COLOR});

    :hover {
      fill: var(${COLORS.TRANSPARENT_FILL_HOVER});
      background-color: var(${COLORS.TRANSPARENT_BG_HOVER});
      color: var(${COLORS.TRANSPARENT_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.TRANSPARENT_FILL_ACTIVE});
      background-color: var(${COLORS.TRANSPARENT_BG_ACTIVE});
      color: var(${COLORS.TRANSPARENT_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.TRANSPARENT_FILL_DISABLED});
      background-color: var(${COLORS.TRANSPARENT_BG_DISABLED});
      color: var(${COLORS.TRANSPARENT_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.OnAccent}'] {
    fill: var(${COLORS.ON_ACCENT_FILL});
    background-color: var(${COLORS.ON_ACCENT_BG});
    color: var(${COLORS.ON_ACCENT_COLOR});

    :hover {
      fill: var(${COLORS.ON_ACCENT_FILL_HOVER});
      background-color: var(${COLORS.ON_ACCENT_BG_HOVER});
      color: var(${COLORS.ON_ACCENT_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.ON_ACCENT_FILL_ACTIVE});
      background-color: var(${COLORS.ON_ACCENT_BG_ACTIVE});
      color: var(${COLORS.ON_ACCENT_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.ON_ACCENT_FILL_DISABLED});
      background-color: var(${COLORS.ON_ACCENT_BG_DISABLED});
      color: var(${COLORS.ON_ACCENT_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Extra}'] {
    fill: var(${COLORS.EXTRA_FILL});
    background-color: var(${COLORS.EXTRA_BG});
    color: var(${COLORS.EXTRA_COLOR});

    :hover {
      fill: var(${COLORS.EXTRA_FILL_HOVER});
      background-color: var(${COLORS.EXTRA_BG_HOVER});
      color: var(${COLORS.EXTRA_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.EXTRA_FILL_ACTIVE});
      background-color: var(${COLORS.EXTRA_BG_ACTIVE});
      color: var(${COLORS.EXTRA_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.EXTRA_FILL_DISABLED});
      background-color: var(${COLORS.EXTRA_BG_DISABLED});
      color: var(${COLORS.EXTRA_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Alarm}'] {
    fill: var(${COLORS.ALARM_FILL});
    background-color: var(${COLORS.ALARM_BG});
    color: var(${COLORS.ALARM_COLOR});

    :hover {
      fill: var(${COLORS.ALARM_FILL_HOVER});
      background-color: var(${COLORS.ALARM_BG_HOVER});
      color: var(${COLORS.ALARM_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.ALARM_FILL_ACTIVE});
      background-color: var(${COLORS.ALARM_BG_ACTIVE});
      color: var(${COLORS.ALARM_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.ALARM_FILL_DISABLED});
      background-color: var(${COLORS.ALARM_BG_DISABLED});
      color: var(${COLORS.ALARM_COLOR_DISABLED});
    }
  }
`;

export const IconWrapper = styled.div`
  margin-left: 8px;
`;
