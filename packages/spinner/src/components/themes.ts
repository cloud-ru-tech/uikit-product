import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  PRIMARY: '--color-spinner-primary',
  SECONDARY: '--color-spinner-secondary',
  TEXT: '--color-spinner-text',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.PRIMARY}: var(${BLACK_ALFA[24]});
      ${COLORS.SECONDARY}: var(${BLACK_ALFA[8]});
      ${COLORS.TEXT}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.PRIMARY}: var(${WHITE_ALFA[24]});
      ${COLORS.SECONDARY}: var(${WHITE_ALFA[8]});
      ${COLORS.TEXT}: var(${WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.PRIMARY}: var(${BLACK_ALFA[24]});
      ${COLORS.SECONDARY}: var(${BLACK_ALFA[8]});
      ${COLORS.TEXT}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.PRIMARY}: var(${WHITE_ALFA[24]});
      ${COLORS.SECONDARY}: var(${WHITE_ALFA[8]});
      ${COLORS.TEXT}: var(${WHITE_ALFA[48]});
    }
  }
`;
