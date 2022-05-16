import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    unselected: {
      default: '--color-pagination-slider-dots__button-background-unselected__default',
      hover: '--color-pagination-slider-dots__button-background-unselected__hover',
    },
    selected: {
      default: '--color-pagination-slider-dots__button-background-selected__default',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.background.unselected.hover}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.background.unselected.hover}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.background.unselected.hover}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.background.unselected.hover}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.GREEN[50]});
    }
  }
`;
