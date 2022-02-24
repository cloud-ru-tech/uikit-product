import { styled } from '@linaria/react';

import { ArrowLinkInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { ANIMATIONS } from '@sbercloud/uikit-utils';
import { TEXT_1_STYLES, TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-typography';

import { Size, Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const StyledArrowLinkInterfaceSVG = styled(ArrowLinkInterfaceSVG)`
  margin-left: 4px;
`;

export const StyledLink = styled.a<{ showIcon: boolean }>`
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  fill: currentColor;
  transition: color ${ANIMATIONS.TRANSITION}, fill ${ANIMATIONS.TRANSITION};

  &[data-disabled='true'] {
    pointer-events: none;
    cursor: none;
  }

  &[data-size=${Size.S}] {
    ${TEXT_3_STYLES};
  }
  &[data-size=${Size.M}] {
    ${TEXT_2_STYLES};
  }
  &[data-size=${Size.L}] {
    ${TEXT_1_STYLES};
  }

  &[data-variant='${Variant.OnPrimary}'] {
    color: ${({ showIcon }) => (showIcon ? `var(${COLORS.PRIMARY_COLOR})` : `var(${COLORS.PRIMARY_FILL})`)};
    fill: ${({ showIcon }) => (showIcon ? `var(${COLORS.PRIMARY_FILL})` : 'currentColor')};

    :hover {
      color: var(${COLORS.PRIMARY_FILL_HOVER});
    }

    :active {
      color: var(${COLORS.PRIMARY_FILL_ACTIVE});
    }

    &[data-disabled='true'] {
      color: var(${COLORS.PRIMARY_FILL_DISABLED});
    }
  }

  &[data-variant='${Variant.OnDark}'] {
    color: var(${COLORS.DARK_FILL});

    :hover {
      color: var(${COLORS.DARK_FILL_HOVER});
    }

    :active {
      color: var(${COLORS.DARK_FILL_ACTIVE});
    }

    &[data-disabled='true'] {
      color: var(${COLORS.DARK_FILL_DISABLED});
    }
  }
`;
