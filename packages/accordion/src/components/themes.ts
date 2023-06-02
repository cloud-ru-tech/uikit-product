import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  DEFAULT_BG: '--color-accordion-default-background',
  DEFAULT_BORDER: '--color-accordion-border',
  ACCENT_BORDER: '--color-accordion-border-accent',
  DEFAULT_HEADER_COLOR: '--color-accordion-header',
  DEFAULT_SUBHEADER_COLOR: '--color-accordion-subheader',
  DISABLED_HEADER_COLOR: '--color-accordion-disabled-header',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.ACCENT_BORDER}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.DEFAULT_HEADER_COLOR}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.DEFAULT_SUBHEADER_COLOR}: var(${EXPORT_VARS.GREY[600]});
      ${COLORS.DISABLED_HEADER_COLOR}: var(${EXPORT_VARS.BLACK_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.ACCENT_BORDER}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.DEFAULT_HEADER_COLOR}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.DEFAULT_SUBHEADER_COLOR}: var(${EXPORT_VARS.GREY[600]});
      ${COLORS.DISABLED_HEADER_COLOR}: var(${EXPORT_VARS.BLACK_ALFA[24]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.ACCENT_BORDER}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.DEFAULT_HEADER_COLOR}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.DEFAULT_SUBHEADER_COLOR}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.DISABLED_HEADER_COLOR}: var(${EXPORT_VARS.WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.ACCENT_BORDER}: var(${EXPORT_VARS.WHITE_ALFA[24]});
      ${COLORS.DEFAULT_HEADER_COLOR}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.DEFAULT_SUBHEADER_COLOR}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.DISABLED_HEADER_COLOR}: var(${EXPORT_VARS.WHITE_ALFA[24]});
    }
  }
`;
