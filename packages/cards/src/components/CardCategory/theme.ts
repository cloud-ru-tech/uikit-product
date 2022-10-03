import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';
import { SHADOW } from '@sbercloud/uikit-product-utils';

const { GREY, WHITE_ALFA, PURPLE, GREEN, PURPLE_ALFA, GREEN_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    default: '--color__cards__card-category__background__default',
    hover: '--color__cards__card-category__background__hover',
    shadow: '--color__cards__card-category__background__shadow',
  },
  border: {
    default: '--color__cards__card-category__border',
    hover: '--color__cards__card-category__hover',
  },
  description: '--color__cards__card-category__description',
  image: {
    icon: '--color__cards__card-category__image__icon',
    background: '--color__cards__card-category__image__background',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.hover}: var(${GREY[0]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};

      ${COLORS.border.default}: var(${BLACK_ALFA[8]});
      ${COLORS.border.hover}: var(${PURPLE[100]});

      ${COLORS.description}: var(${GREY[600]});

      ${COLORS.image.icon}: var(${PURPLE[100]});
      ${COLORS.image.background}: var(${PURPLE_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.hover}: var(${WHITE_ALFA[16]});

      ${COLORS.border.default}: var(${WHITE_ALFA[8]});
      ${COLORS.border.hover}: var(${PURPLE[50]});

      ${COLORS.description}: var(${GREY[300]});

      ${COLORS.image.icon}: var(${PURPLE[25]});
      ${COLORS.image.background}: var(${PURPLE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.hover}: var(${GREY[0]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};

      ${COLORS.border.default}: var(${BLACK_ALFA[8]});
      ${COLORS.border.hover}: var(${GREEN[100]});

      ${COLORS.description}: var(${GREY[600]});

      ${COLORS.image.icon}: var(${GREEN[100]});
      ${COLORS.image.background}: var(${GREEN_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.hover}: var(${WHITE_ALFA[16]});

      ${COLORS.border.default}: var(${WHITE_ALFA[8]});
      ${COLORS.border.hover}: var(${GREEN[50]});

      ${COLORS.description}: var(${GREY[300]});

      ${COLORS.image.icon}: var(${GREEN[25]});
      ${COLORS.image.background}: var(${GREEN_ALFA[24]});
    }
  }
`;
