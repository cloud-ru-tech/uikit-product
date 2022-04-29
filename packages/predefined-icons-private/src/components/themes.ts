import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  fill: {
    primary: {
      success: '--color-predefined-icon__success__primary',
      failed: '--color-predefined-icon__failed__primary',
      cancel: '--color-predefined-icon__cancel__primary',
      loading: '--color-predefined-icon__loading__primary',
    },
    onDark: {
      success: '--color-predefined-icon__success__on-dark',
      failed: '--color-predefined-icon__failed__on-dark',
      cancel: '--color-predefined-icon__cancel__on-dark',
      loading: '--color-predefined-icon__loading__on-dark',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.fill.primary.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.primary.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.primary.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.primary.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;
