import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  text: {
    unselected: {
      default: '--color-tab__navigation-item-text__unselected-default',
      hover: '--color-tab__navigation-item-text__unselected-hover',
      disabled: '--color-tab__navigation-item-text__unselected-disabled',
    },
    selected: {
      default: '--color-tab__navigation-item-text__selected-default',
      hover: '--color-tab__navigation-item-text__selected-hover',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.text.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[48]});
      ${COLORS.text.unselected.hover}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.text.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.text.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.text.unselected.hover}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.text.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.GREY[100]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.text.unselected.default}: var(${EXPORT_VARS.BLACK_ALFA[48]});
      ${COLORS.text.unselected.hover}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.text.unselected.disabled}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.text.unselected.default}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.text.unselected.hover}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.text.unselected.disabled}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.text.selected.default}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.text.selected.hover}: var(${EXPORT_VARS.GREY[100]});
    }
  }
`;
