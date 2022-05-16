import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  text: {
    selected: {
      default: '--color-pagination__number-button-text-selected__default',
      hover: '--color-pagination__number-button-text-selected__hover',
    },
  },
  background: {
    selected: {
      default: '--color-pagination__number-button-background-selected__default',
      hover: '--color-pagination__number-button-background-selected__hover',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.selected.hover}: var(${EXPORT_VARS.PURPLE[115]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.background.selected.hover}: var(${EXPORT_VARS.PURPLE[115]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.GREEN[50]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.BLUE_GREY[80]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.GREEN[75]});
      ${COLORS.background.selected.hover}: var(${EXPORT_VARS.BLUE_GREY[90]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.BLUE_GREY[80]});
      ${COLORS.background.selected.default}: var(${EXPORT_VARS.GREEN[100]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.BLUE_GREY[80]});
      ${COLORS.background.selected.hover}: var(${EXPORT_VARS.GREEN[115]});
    }
  }
`;
