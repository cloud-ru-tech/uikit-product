import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { BaseButton } from '../../helperComponents';
import { IconPosition, Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(BaseButton)`
  height: 20px;

  ${TYPOGRAPHY_VARIABLES.TEXT_2}

  &[data-variant='${Variant.Accent}'] {
    fill: var(${COLORS.ACCENT_ICON_COLOR});
    color: var(${COLORS.ACCENT_COLOR});

    :hover {
      fill: var(${COLORS.ACCENT_ICON_COLOR_HOVER});
      color: var(${COLORS.ACCENT_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.ACCENT_ICON_COLOR_ACTIVE});
      color: var(${COLORS.ACCENT_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.ACCENT_ICON_COLOR_DISABLED});
      color: var(${COLORS.ACCENT_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Primary}'] {
    fill: var(${COLORS.PRIMARY_ICON_COLOR});
    color: var(${COLORS.PRIMARY_COLOR});

    :hover {
      fill: var(${COLORS.PRIMARY_ICON_COLOR_HOVER});
      color: var(${COLORS.PRIMARY_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.PRIMARY_ICON_COLOR_ACTIVE});
      color: var(${COLORS.PRIMARY_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.PRIMARY_ICON_COLOR_DISABLED});
      color: var(${COLORS.PRIMARY_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Secondary}'] {
    fill: var(${COLORS.SECONDARY_ICON_COLOR});
    color: var(${COLORS.SECONDARY_COLOR});

    :hover {
      fill: var(${COLORS.SECONDARY_ICON_COLOR_HOVER});
      color: var(${COLORS.SECONDARY_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.SECONDARY_ICON_COLOR_ACTIVE});
      color: var(${COLORS.SECONDARY_COLOR_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.SECONDARY_ICON_COLOR_DISABLED});
      color: var(${COLORS.SECONDARY_COLOR_DISABLED});
    }
  }
`;

export const IconWrapper = styled.div`
  &[data-position='${IconPosition.Before}'] {
    margin-right: 8px;
  }

  &[data-position='${IconPosition.After}'] {
    margin-left: 8px;
  }
`;
