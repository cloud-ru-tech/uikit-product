import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  fill: {
    onDefault: {
      success: '--color-status-icon__fill-on-default__success',
      failed: '--color-status-icon__fill-on-default__failed',
      cancel: '--color-status-icon__fill-on-default__cancel',
      loading: '--color-status-icon__fill-on-default__loading',
    },
    onDark: {
      success: '--color-status-icon__fill-on-dark__success',
      failed: '--color-status-icon__fill-on-dark__failed',
      cancel: '--color-status-icon__fill-on-dark__cancel',
      loading: '--color-status-icon__fill-on-dark__loading',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill.onDefault.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.fill.onDefault.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.onDefault.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.onDefault.loading}: var(${EXPORT_VARS.BLACK_ALFA[24]});
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
      ${COLORS.fill.onDefault.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDefault.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDefault.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDefault.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
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
      ${COLORS.fill.onDefault.success}: var(${EXPORT_VARS.EMERALD_GREEN[100]});
      ${COLORS.fill.onDefault.failed}: var(${EXPORT_VARS.BERRY_RED[100]});
      ${COLORS.fill.onDefault.cancel}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.fill.onDefault.loading}: var(${EXPORT_VARS.BLACK_ALFA[24]});
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
      ${COLORS.fill.onDefault.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDefault.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDefault.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDefault.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.success}: var(${EXPORT_VARS.EMERALD_GREEN[75]});
      ${COLORS.fill.onDark.failed}: var(${EXPORT_VARS.BERRY_RED[75]});
      ${COLORS.fill.onDark.cancel}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.fill.onDark.loading}: var(${EXPORT_VARS.WHITE_ALFA[48]});
    }
  }
`;
