import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { WHITE_ALFA, BLACK_ALFA, GREY, PURPLE, GREEN, PRESET } = EXPORT_VARS;

export const COLORS = {
  border: {
    default: '--color-textarea__border__default',
    disabled: '--color-textarea__border__disabled',
    hover: '--color-textarea__border__hover',
    active: '--color-textarea__border__active',
    error: '--color-textarea__border__error',
  },
  background: {
    default: '--color-textarea__background__default',
    disabled: '--color-textarea__background__disabled',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.border.default}: var(${BLACK_ALFA[16]});
      ${COLORS.border.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.border.hover}: var(${PURPLE[50]});
      ${COLORS.border.active}: var(${PURPLE[100]});
      ${COLORS.border.error}: var(${PRESET.BERRY_RED_1});

      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.disabled}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.border.default}: var(${BLACK_ALFA[16]});
      ${COLORS.border.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.border.hover}: var(${GREEN[50]});
      ${COLORS.border.active}: var(${GREEN[100]});
      ${COLORS.border.error}: var(${PRESET.BERRY_RED_1});

      ${COLORS.background.default}: var(${GREY[0]});
      ${COLORS.background.disabled}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.border.default}: var(${WHITE_ALFA[24]});
      ${COLORS.border.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.border.hover}: var(${PURPLE[25]});
      ${COLORS.border.active}: var(${PURPLE[50]});
      ${COLORS.border.error}: var(${PRESET.BERRY_RED_1});

      ${COLORS.background.default}: var(${GREY[800]});
      ${COLORS.background.disabled}: var(${WHITE_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.border.default}: var(${WHITE_ALFA[24]});
      ${COLORS.border.disabled}: var(${WHITE_ALFA[16]});
      ${COLORS.border.hover}: var(${GREEN[25]});
      ${COLORS.border.active}: var(${GREEN[50]});
      ${COLORS.border.error}: var(${PRESET.BERRY_RED_1});

      ${COLORS.background.default}: var(${GREY[800]});
      ${COLORS.background.disabled}: var(${WHITE_ALFA[4]});
    }
  }
`;
