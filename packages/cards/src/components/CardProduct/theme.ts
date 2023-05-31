import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';
import { SHADOW } from '@sbercloud/uikit-product-utils';

const { GREY, PURPLE, GREEN, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  image: {
    primary: {
      icon: '--color__cards__card-product__image__icon',
    },
    background: '--color__cards__card-product__image__background',
  },
  description: '--color__cards__card-product__description',
  background: {
    default: '--color__cards__card-product__background__default',
    shadow: '--color__cards__card-product__background__shadow',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.image.primary.icon}: var(${PURPLE[100]});
      ${COLORS.image.background}: var(${BLACK_ALFA[4]});
      ${COLORS.description}: var(${GREY[350]});
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.image.primary.icon}: var(${PURPLE[100]});
      ${COLORS.image.background}: var(${WHITE_ALFA[4]});
      ${COLORS.description}: var(${GREY[500]});
      ${COLORS.background.default}: var(${GREY[750]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.image.primary.icon}: var(${GREEN[100]});
      ${COLORS.image.background}: var(${BLACK_ALFA[4]});
      ${COLORS.description}: var(${GREY[350]});
      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.image.primary.icon}: var(${GREEN[100]});
      ${COLORS.image.background}: var(${WHITE_ALFA[4]});
      ${COLORS.description}: var(${GREY[500]});
      ${COLORS.background.default}: var(${GREY[750]});
      ${COLORS.background.shadow}: ${SHADOW.MEDIUM};
    }
  }
`;
