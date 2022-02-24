import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { WHITE_ALFA, GREY, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: '--color-text-field__background',
  text: '--color-text-field__text',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background}: var(${BLACK_ALFA[4]});
      ${COLORS.text}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background}: var(${WHITE_ALFA[8]});
      ${COLORS.text}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background}: var(${BLACK_ALFA[4]});
      ${COLORS.text}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background}: var(${WHITE_ALFA[8]});
      ${COLORS.text}: var(${GREY[300]});
    }
  }
`;
