import { styled } from '@linaria/react';

import { TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-typography';

import { BaseButton } from '../../helperComponents';
import { IconPosition, Sizes, SizesInPx, Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledBaseButton = styled(BaseButton)`
  &[data-size='${Sizes.Small}'] {
    height: ${SizesInPx[Sizes.Small]};

    ${TEXT_3_STYLES};
  }

  &[data-size='${Sizes.Medium}'] {
    height: ${SizesInPx[Sizes.Medium]};

    ${TEXT_2_STYLES};
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

    :disabled,
    &[disabled] {
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

    :disabled,
    &[disabled] {
      fill: var(${COLORS.SECONDARY_ICON_COLOR_DISABLED});
      color: var(${COLORS.SECONDARY_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Tertiary}'] {
    fill: var(${COLORS.TERTIARY_ICON_COLOR});
    color: var(${COLORS.TERTIARY_COLOR});

    :hover {
      fill: var(${COLORS.TERTIARY_ICON_COLOR_HOVER});
      color: var(${COLORS.TERTIARY_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.TERTIARY_ICON_COLOR_ACTIVE});
      color: var(${COLORS.TERTIARY_COLOR_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.TERTIARY_ICON_COLOR_DISABLED});
      color: var(${COLORS.TERTIARY_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.OnAccent}'] {
    fill: var(${COLORS.ON_ACCENT_ICON_COLOR});
    color: var(${COLORS.ON_ACCENT_COLOR});

    :hover {
      fill: var(${COLORS.ON_ACCENT_ICON_COLOR_HOVER});
      color: var(${COLORS.ON_ACCENT_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.ON_ACCENT_ICON_COLOR_ACTIVE});
      color: var(${COLORS.ON_ACCENT_COLOR_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.ON_ACCENT_ICON_COLOR_DISABLED});
      color: var(${COLORS.ON_ACCENT_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.OnDark}'] {
    fill: var(${COLORS.ON_DARK_ICON_COLOR});
    color: var(${COLORS.ON_DARK_COLOR});

    :hover {
      fill: var(${COLORS.ON_DARK_ICON_COLOR_HOVER});
      color: var(${COLORS.ON_DARK_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.ON_DARK_ICON_COLOR_ACTIVE});
      color: var(${COLORS.ON_DARK_COLOR_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.ON_DARK_ICON_COLOR_DISABLED});
      color: var(${COLORS.ON_DARK_COLOR_DISABLED});
    }
  }
`;

export const IconWrapper = styled.span`
  svg {
    width: auto !important;
  }

  &[data-size=${Sizes.Small}] {
    svg {
      height: ${SizesInPx[Sizes.Small]} !important;
    }
  }

  &[data-size=${Sizes.Medium}] {
    svg {
      height: ${SizesInPx[Sizes.Medium]} !important;
    }
  }

  &[data-position='${IconPosition.Before}'] {
    margin-right: 8px;
  }

  &[data-position='${IconPosition.After}'] {
    margin-left: 8px;
  }
`;
