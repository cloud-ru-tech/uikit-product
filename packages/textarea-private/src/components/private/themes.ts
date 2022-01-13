import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { WHITE_ALFA, BLACK_ALFA, GREY } = EXPORT_VARS;

export const COLORS = {
  placeholder: {
    default: '--color-textarea__placeholder__default',
    disabled: '--color-textarea__placeholder__disabled',
  },
  text: {
    default: '--color-textarea__text__default',
    disabled: '--color-textarea__text__disabled',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.text.default}: var(${GREY[800]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[48]});

      ${COLORS.placeholder.default}: var(${BLACK_ALFA[48]});
      ${COLORS.placeholder.disabled}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.text.default}: var(${GREY[800]});
      ${COLORS.text.disabled}: var(${BLACK_ALFA[48]});

      ${COLORS.placeholder.default}: var(${BLACK_ALFA[48]});
      ${COLORS.placeholder.disabled}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});

      ${COLORS.placeholder.default}: var(${WHITE_ALFA[48]});
      ${COLORS.placeholder.disabled}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.text.default}: var(${GREY[100]});
      ${COLORS.text.disabled}: var(${WHITE_ALFA[24]});

      ${COLORS.placeholder.default}: var(${WHITE_ALFA[48]});
      ${COLORS.placeholder.disabled}: var(${WHITE_ALFA[16]});
    }
  }
`;
