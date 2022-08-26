import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { BLACK_ALFA, WHITE_ALFA, GREY, GREEN, PURPLE, BERRY_RED_ALPHA, BLUE_GREY } = EXPORT_VARS;

export const COLORS = {
  background: {
    default: '--color__notification__notification-card__background__default',
    alarm: '--color__notification__notification-card__background__alarm',
    hover: {
      default: '--color__notification__notification-card__background__hover__default',
      alarm: '--color__notification__notification-card__background__hover__alarm',
    },
  },
  badge: '--color__notification__notification-card__badge',
  header: {
    icon: {
      fill: '--color__notification__notification-card__header-icon__fill',
      background: '--color__notification__notification-card__header-icon__background',
    },
    breadcrumbs: '--color__notification__notification-card__header-breadcrumbs',
    time: '--color__notification__notification-card__header-time',
    moreIcon: '--color__notification__notification-card__header-more-icon',
  },
  content: {
    title: '--color__notification__notification-card__content-title',
    description: '--color__notification__notification-card__content-description',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.default}: var(${BLACK_ALFA[4]});
      ${COLORS.background.alarm}: var(${BERRY_RED_ALPHA[15]});
      ${COLORS.background.hover.default}: var(${BLACK_ALFA[8]});
      ${COLORS.background.hover.alarm}: var(${BERRY_RED_ALPHA[25]});

      ${COLORS.badge}: var(${PURPLE[100]});

      ${COLORS.header.icon.fill}: var(${PURPLE[100]});
      ${COLORS.header.icon.background}: var(${GREY[0]});
      ${COLORS.header.breadcrumbs}: var(${BLACK_ALFA[48]});
      ${COLORS.header.time}: var(${BLACK_ALFA[48]});
      ${COLORS.header.moreIcon}: var(${GREY[400]});

      ${COLORS.content.title}: var(${GREY[800]});
      ${COLORS.content.description}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.alarm}: var(${BERRY_RED_ALPHA[15]});
      ${COLORS.background.hover.default}: var(${BLACK_ALFA[16]});
      ${COLORS.background.hover.alarm}: var(${BERRY_RED_ALPHA[25]});

      ${COLORS.badge}: var(${PURPLE[50]});

      ${COLORS.header.icon.fill}: var(${PURPLE[50]});
      ${COLORS.header.icon.background}: var(${WHITE_ALFA[8]});
      ${COLORS.header.breadcrumbs}: var(${WHITE_ALFA[48]});
      ${COLORS.header.time}: var(${WHITE_ALFA[48]});
      ${COLORS.header.moreIcon}: var(${GREY[400]});

      ${COLORS.content.title}: var(${GREY[100]});
      ${COLORS.content.description}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.default}: var(${BLACK_ALFA[4]});
      ${COLORS.background.alarm}: var(${BERRY_RED_ALPHA[15]});
      ${COLORS.background.hover.default}: var(${BLACK_ALFA[8]});
      ${COLORS.background.hover.alarm}: var(${BERRY_RED_ALPHA[25]});

      ${COLORS.badge}: var(${GREEN[100]});

      ${COLORS.header.icon.fill}: var(${BLUE_GREY[60]});
      ${COLORS.header.icon.background}: var(${GREY[0]});
      ${COLORS.header.breadcrumbs}: var(${BLACK_ALFA[48]});
      ${COLORS.header.time}: var(${BLACK_ALFA[48]});
      ${COLORS.header.moreIcon}: var(${GREY[400]});

      ${COLORS.content.title}: var(${GREY[800]});
      ${COLORS.content.description}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.default}: var(${WHITE_ALFA[8]});
      ${COLORS.background.alarm}: var(${BERRY_RED_ALPHA[15]});
      ${COLORS.background.hover.default}: var(${BLACK_ALFA[16]});
      ${COLORS.background.hover.alarm}: var(${BERRY_RED_ALPHA[25]});

      ${COLORS.badge}: var(${GREEN[100]});

      ${COLORS.header.icon.fill}: var(${BLUE_GREY[20]});
      ${COLORS.header.icon.background}: var(${WHITE_ALFA[8]});
      ${COLORS.header.breadcrumbs}: var(${WHITE_ALFA[48]});
      ${COLORS.header.time}: var(${WHITE_ALFA[48]});
      ${COLORS.header.moreIcon}: var(${GREY[400]});

      ${COLORS.content.title}: var(${GREY[100]});
      ${COLORS.content.description}: var(${GREY[300]});
    }
  }
`;
