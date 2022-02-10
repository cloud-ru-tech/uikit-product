import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  DEFAULT_LABEL: '--color-chip-label',
  ACTIVE_LABEL: '--color-chip-active-label',
  DISABLED_LABEL: '--color-chip-disabled-label',
  DEFAULT_BG: '--color-chip-default-background',
  HOVERED_BG: '--color-chip-hovered-background',
  ACTIVE_BG: '--color-chip-active-background',
  ACTIVE_HOVERED_BG: '--color-chip-active-hovered-background',
  DISABLED_BG: '--color-chip-disabled-background',
  DEFAULT_BORDER: '--color-chip-border',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.DEFAULT_LABEL}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.ACTIVE_LABEL}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.DISABLED_LABEL}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.HOVERED_BG}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.ACTIVE_BG}: var(${EXPORT_VARS.BLUE_GREY[70]});
      ${COLORS.ACTIVE_HOVERED_BG}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.DISABLED_BG}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.DEFAULT_LABEL}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.ACTIVE_LABEL}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.DISABLED_LABEL}: var(${EXPORT_VARS.BLACK_ALFA[16]});
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.BLACK_ALFA[4]});
      ${COLORS.HOVERED_BG}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.ACTIVE_BG}: var(${EXPORT_VARS.BLUE_GREY[70]});
      ${COLORS.ACTIVE_HOVERED_BG}: var(${EXPORT_VARS.BLUE_GREY[90]});
      ${COLORS.DISABLED_BG}: var(${EXPORT_VARS.BLACK_ALFA[8]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.DEFAULT_LABEL}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.ACTIVE_LABEL}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.DISABLED_LABEL}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${COLORS.HOVERED_BG}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.ACTIVE_BG}: var(${EXPORT_VARS.BLUE_GREY[70]});
      ${COLORS.ACTIVE_HOVERED_BG}: var(${EXPORT_VARS.BLUE_GREY[60]});
      ${COLORS.DISABLED_BG}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.DEFAULT_LABEL}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.ACTIVE_LABEL}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.DISABLED_LABEL}: var(${EXPORT_VARS.WHITE_ALFA[16]});
      ${COLORS.DEFAULT_BG}: var(${EXPORT_VARS.WHITE_ALFA[4]});
      ${COLORS.HOVERED_BG}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.ACTIVE_BG}: var(${EXPORT_VARS.BLUE_GREY[70]});
      ${COLORS.ACTIVE_HOVERED_BG}: var(${EXPORT_VARS.BLUE_GREY[60]});
      ${COLORS.DISABLED_BG}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.DEFAULT_BORDER}: var(${EXPORT_VARS.WHITE_ALFA[8]});
    }
  }
`;
