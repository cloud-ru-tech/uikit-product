import { styled } from '@linaria/react';

import { ArrowLinkInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { TEXT_1_STYLES, TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { Sizes, Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

enum LINK_CSS_VARS {
  prefixIcon = '--link-prefix-icon-color',
}

export const StyledArrowLinkInterfaceSVG = styled(ArrowLinkInterfaceSVG)`
  margin-left: 4px;
`;

export const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  fill: var(${LINK_CSS_VARS.prefixIcon});

  svg {
    width: auto !important;
  }

  &[data-size=${Sizes.Small}] {
    svg {
      height: 16px !important;
    }
  }

  &[data-size=${Sizes.Medium}] {
    svg {
      height: 20px !important;
    }
  }

  &[data-size=${Sizes.Large}] {
    svg {
      height: 24px !important;
    }
  }
`;

export const StyledLink = styled.a<{ showSuffixIcon: boolean }>`
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  fill: currentColor;
  transition: color ${ANIMATIONS.TRANSITION}, fill ${ANIMATIONS.TRANSITION};

  &[data-disabled='true'] {
    cursor: none;
  }

  &[data-size=${Sizes.Small}] {
    ${TEXT_3_STYLES};
  }
  &[data-size=${Sizes.Medium}] {
    ${TEXT_2_STYLES};
  }
  &[data-size=${Sizes.Large}] {
    ${TEXT_1_STYLES};
  }

  &[data-variant='${Variant.OnPrimary}'] {
    color: ${({ showSuffixIcon }) => (showSuffixIcon ? `var(${COLORS.PRIMARY_COLOR})` : `var(${COLORS.PRIMARY_FILL})`)};
    fill: ${({ showSuffixIcon }) => (showSuffixIcon ? `var(${COLORS.PRIMARY_FILL})` : 'currentColor')};

    ${LINK_CSS_VARS.prefixIcon}: var(${COLORS.PRIMARY_PREFIX_ICON});

    :hover {
      color: var(${COLORS.PRIMARY_FILL_HOVER});
    }

    :active {
      color: var(${COLORS.PRIMARY_FILL_ACTIVE});
    }

    &[data-disabled='true'] {
      color: var(${COLORS.PRIMARY_FILL_DISABLED});
      fill: var(${COLORS.PRIMARY_FILL_DISABLED});

      ${LINK_CSS_VARS.prefixIcon}: var(${COLORS.PRIMARY_PREFIX_ICON_DISABLED});
    }
  }

  &[data-variant='${Variant.OnDark}'] {
    color: var(${COLORS.DARK_FILL});

    ${LINK_CSS_VARS.prefixIcon}: var(${COLORS.DARK_PREFIX_ICON});

    :hover {
      color: var(${COLORS.DARK_FILL_HOVER});
    }

    :active {
      color: var(${COLORS.DARK_FILL_ACTIVE});
    }

    &[data-disabled='true'] {
      color: var(${COLORS.DARK_FILL_DISABLED});

      ${LINK_CSS_VARS.prefixIcon}: var(${COLORS.DARK_PREFIX_ICON_DISABLED});
    }
  }
`;
