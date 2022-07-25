import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const {
  GREY,
  WHITE_ALFA,
  BLACK_ALFA,
  BERRY_RED,
  EMERALD_GREEN,
  SUNNY_YELLOW,
  EMERALD_GREEN_ALPHA,
  SUNNY_YELLOW_ALPHA,
  BERRY_RED_ALPHA,
} = EXPORT_VARS;

export const COLORS = {
  background: {
    success: '--color-alert__background__success',
    warning: '--color-alert__background__warning',
    error: '--color-alert__background__error',
    neutral: '--color-alert__background__neutral',
    loading: '--color-alert__background__loading',
  },
  border: {
    success: '--color-alert__border__success',
    warning: '--color-alert__border__warning',
    error: '--color-alert__border__error',
    neutral: '--color-alert__border__neutral',
    loading: '--color-alert__border__loading',
  },
  description: {
    default: '--color-alert__description__default',
    loading: '--color-alert__description__loading',
  },
  title: '--color-alert__title__default',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.success}: var(${EMERALD_GREEN[15]});
      ${COLORS.background.warning}: var(${SUNNY_YELLOW[15]});
      ${COLORS.background.error}: var(${BERRY_RED[15]});
      ${COLORS.background.neutral}: var(${BLACK_ALFA[4]});
      ${COLORS.background.loading}: var(${BLACK_ALFA[4]});

      ${COLORS.border.success}: var(${EMERALD_GREEN[100]});
      ${COLORS.border.warning}: var(${SUNNY_YELLOW[100]});
      ${COLORS.border.error}: var(${BERRY_RED[100]});
      ${COLORS.border.neutral}: var(${BLACK_ALFA[24]});
      ${COLORS.border.loading}: var(${BLACK_ALFA[24]});

      ${COLORS.title}: var(${GREY[800]});

      ${COLORS.description.default}: var(${GREY[800]});
      ${COLORS.description.loading}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.success}: var(${EMERALD_GREEN_ALPHA[15]});
      ${COLORS.background.warning}: var(${SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.background.error}: var(${BERRY_RED_ALPHA[15]});
      ${COLORS.background.neutral}: var(${WHITE_ALFA[8]});
      ${COLORS.background.loading}: var(${WHITE_ALFA[8]});

      ${COLORS.border.success}: var(${EMERALD_GREEN[75]});
      ${COLORS.border.warning}: var(${SUNNY_YELLOW[75]});
      ${COLORS.border.error}: var(${BERRY_RED[75]});
      ${COLORS.border.neutral}: var(${WHITE_ALFA[48]});
      ${COLORS.border.loading}: var(${WHITE_ALFA[48]});

      ${COLORS.title}: var(${GREY[100]});

      ${COLORS.description.default}: var(${GREY[100]});
      ${COLORS.description.loading}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.success}: var(${EMERALD_GREEN[15]});
      ${COLORS.background.warning}: var(${SUNNY_YELLOW[15]});
      ${COLORS.background.error}: var(${BERRY_RED[15]});
      ${COLORS.background.neutral}: var(${BLACK_ALFA[4]});
      ${COLORS.background.loading}: var(${BLACK_ALFA[4]});

      ${COLORS.border.success}: var(${EMERALD_GREEN[100]});
      ${COLORS.border.warning}: var(${SUNNY_YELLOW[100]});
      ${COLORS.border.error}: var(${BERRY_RED[100]});
      ${COLORS.border.neutral}: var(${BLACK_ALFA[24]});
      ${COLORS.border.loading}: var(${BLACK_ALFA[24]});

      ${COLORS.title}: var(${GREY[800]});

      ${COLORS.description.default}: var(${GREY[800]});
      ${COLORS.description.loading}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.success}: var(${EMERALD_GREEN_ALPHA[15]});
      ${COLORS.background.warning}: var(${SUNNY_YELLOW_ALPHA[15]});
      ${COLORS.background.error}: var(${BERRY_RED_ALPHA[15]});
      ${COLORS.background.neutral}: var(${WHITE_ALFA[8]});
      ${COLORS.background.loading}: var(${WHITE_ALFA[8]});

      ${COLORS.border.success}: var(${EMERALD_GREEN[75]});
      ${COLORS.border.warning}: var(${SUNNY_YELLOW[75]});
      ${COLORS.border.error}: var(${BERRY_RED[75]});
      ${COLORS.border.neutral}: var(${WHITE_ALFA[48]});
      ${COLORS.border.loading}: var(${WHITE_ALFA[48]});

      ${COLORS.title}: var(${GREY[100]});

      ${COLORS.description.default}: var(${GREY[100]});
      ${COLORS.description.loading}: var(${GREY[300]});
    }
  }
`;
