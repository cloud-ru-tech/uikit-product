import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, GREEN_ALFA, WHITE_ALFA, PURPLE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: {
    default: '--color-switch-row__background__default',
    hover: '--color-switch-row__background__hover',
    disabled: '--color-switch-row__background__disabled',
  },
  title: {
    default: '--color-switch-row__title__default',
    disabled: '--color-switch-row__title__disabled',
  },
  description: {
    default: '--color-switch-row__description__default',
    disabled: '--color-switch-row__description__disabled',
  },
  icon: {
    default: '--color-switch-row__icon__default',
    disabled: '--color-switch-row__icon__disabled',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.default}: var(${PURPLE_ALFA[4]});
      ${COLORS.background.hover}: var(${PURPLE_ALFA[8]});
      ${COLORS.background.disabled}: var(${BLACK_ALFA[4]});

      ${COLORS.title.default}: var(${GREY[800]});
      ${COLORS.title.disabled}: var(${BLACK_ALFA[48]});

      ${COLORS.description.default}: var(${BLACK_ALFA[48]});
      ${COLORS.description.disabled}: var(${BLACK_ALFA[24]});

      ${COLORS.icon.default}: var(${GREY[200]});
      ${COLORS.icon.disabled}: var(${GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.default}: var(${PURPLE_ALFA[8]});
      ${COLORS.background.hover}: var(${PURPLE_ALFA[16]});
      ${COLORS.background.disabled}: var(${WHITE_ALFA[4]});

      ${COLORS.title.default}: var(${GREY[100]});
      ${COLORS.title.disabled}: var(${WHITE_ALFA[48]});

      ${COLORS.description.default}: var(${WHITE_ALFA[48]});
      ${COLORS.description.disabled}: var(${WHITE_ALFA[24]});

      ${COLORS.icon.default}: var(${WHITE_ALFA[48]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.default}: var(${GREEN_ALFA[4]});
      ${COLORS.background.hover}: var(${GREEN_ALFA[8]});
      ${COLORS.background.disabled}: var(${BLACK_ALFA[4]});

      ${COLORS.title.default}: var(${GREY[800]});
      ${COLORS.title.disabled}: var(${BLACK_ALFA[48]});

      ${COLORS.description.default}: var(${BLACK_ALFA[48]});
      ${COLORS.description.disabled}: var(${BLACK_ALFA[24]});

      ${COLORS.icon.default}: var(${GREY[200]});
      ${COLORS.icon.disabled}: var(${GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.default}: var(${GREEN_ALFA[4]});
      ${COLORS.background.hover}: var(${GREEN_ALFA[8]});
      ${COLORS.background.disabled}: var(${WHITE_ALFA[4]});

      ${COLORS.title.default}: var(${GREY[100]});
      ${COLORS.title.disabled}: var(${WHITE_ALFA[48]});

      ${COLORS.description.default}: var(${WHITE_ALFA[48]});
      ${COLORS.description.disabled}: var(${WHITE_ALFA[24]});

      ${COLORS.icon.default}: var(${WHITE_ALFA[48]});
      ${COLORS.icon.disabled}: var(${WHITE_ALFA[16]});
    }
  }
`;
