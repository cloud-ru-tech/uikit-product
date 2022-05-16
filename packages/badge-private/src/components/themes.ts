import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE, GREEN, GREY, WHITE_ALFA, BLUE_GREY, BLACK_ALFA, BERRY_RED } = EXPORT_VARS;

export const COLORS = {
  background: {
    info: {
      default: '--color-badge__background__info-default',
      disabled: '--color-badge__background__info-disabled',
    },
    alert: {
      default: '--color-badge__background__alert-default',
      disabled: '--color-badge__background__alert-disabled',
    },
  },
  content: {
    info: {
      default: '--color-badge__content__info-default',
      disabled: '--color-badge__content__info-disabled',
    },
    alert: {
      default: '--color-badge__content__alert-default',
      disabled: '--color-badge__content__alert-disabled',
    },
  },
  border: '--color-badge__border',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.info.default}: var(${PURPLE[100]});
      ${COLORS.background.info.disabled}: var(${PURPLE[25]});
      ${COLORS.content.info.default}: var(${GREY[0]});
      ${COLORS.content.info.disabled}: var(${GREY[0]});

      ${COLORS.background.alert.default}: var(${BERRY_RED[100]});
      ${COLORS.background.alert.disabled}: var(${BERRY_RED[50]});
      ${COLORS.content.alert.default}: var(${GREY[0]});
      ${COLORS.content.alert.disabled}: var(${GREY[0]});

      ${COLORS.border}: var(${GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.info.default}: var(${PURPLE[100]});
      ${COLORS.background.info.disabled}: var(${PURPLE[125]});
      ${COLORS.content.info.default}: var(${GREY[0]});
      ${COLORS.content.info.disabled}: var(${WHITE_ALFA[24]});

      ${COLORS.background.alert.default}: var(${BERRY_RED[75]});
      ${COLORS.background.alert.disabled}: var(${BERRY_RED[150]});
      ${COLORS.content.alert.default}: var(${GREY[0]});
      ${COLORS.content.alert.disabled}: var(${WHITE_ALFA[24]});

      ${COLORS.border}: var(${GREY[850]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.info.default}: var(${GREEN[100]});
      ${COLORS.background.info.disabled}: var(${GREEN[25]});
      ${COLORS.content.info.default}: var(${GREY[800]});
      ${COLORS.content.info.disabled}: var(${BLACK_ALFA[24]});

      ${COLORS.background.alert.default}: var(${BERRY_RED[100]});
      ${COLORS.background.alert.disabled}: var(${BERRY_RED[50]});
      ${COLORS.content.alert.default}: var(${GREY[0]});
      ${COLORS.content.alert.disabled}: var(${GREY[0]});

      ${COLORS.border}: var(${GREY[0]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.info.default}: var(${GREEN[100]});
      ${COLORS.background.info.disabled}: var(${GREEN[150]});
      ${COLORS.content.info.default}: var(${BLUE_GREY[100]});
      ${COLORS.content.info.disabled}: var(${BLACK_ALFA[24]});

      ${COLORS.background.alert.default}: var(${BERRY_RED[75]});
      ${COLORS.background.alert.disabled}: var(${BERRY_RED[150]});
      ${COLORS.content.alert.default}: var(${GREY[0]});
      ${COLORS.content.alert.disabled}: var(${WHITE_ALFA[24]});

      ${COLORS.border}: var(${GREY[850]});
    }
  }
`;
