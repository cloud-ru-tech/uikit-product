import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { WHITE_ALFA, BLACK_ALFA, GREY, PRESET } = EXPORT_VARS;

export const COLORS = {
  label: '--color-input-decorator__label',
  labelIcon: '--color-input-decorator__label-icon',
  optional: '--color-input-decorator__optional',
  hint: '--color-input-decorator__hint',
  error: '--color-input-decorator__error',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.label}: var(${GREY[800]});
      ${COLORS.labelIcon}: var(${GREY[200]});
      ${COLORS.optional}: var(${BLACK_ALFA[24]});
      ${COLORS.hint}: var(${BLACK_ALFA[48]});
      ${COLORS.error}: var(${PRESET.BERRY_RED_1});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.label}: var(${GREY[800]});
      ${COLORS.labelIcon}: var(${GREY[200]});
      ${COLORS.optional}: var(${BLACK_ALFA[24]});
      ${COLORS.hint}: var(${BLACK_ALFA[48]});
      ${COLORS.error}: var(${PRESET.BERRY_RED_1});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.label}: var(${GREY[100]});
      ${COLORS.labelIcon}: var(${GREY[450]});
      ${COLORS.optional}: var(${WHITE_ALFA[24]});
      ${COLORS.hint}: var(${WHITE_ALFA[48]});
      ${COLORS.error}: var(${PRESET.BERRY_RED_1});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.label}: var(${GREY[100]});
      ${COLORS.labelIcon}: var(${GREY[450]});
      ${COLORS.optional}: var(${WHITE_ALFA[24]});
      ${COLORS.hint}: var(${WHITE_ALFA[48]});
      ${COLORS.error}: var(${PRESET.BERRY_RED_1});
    }
  }
`;
