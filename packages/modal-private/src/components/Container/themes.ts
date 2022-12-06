import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  background: '--color__modal-private__background',
  border: '--color__modal-private__border',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.border}: var(${GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.border}: var(${GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background}: var(${GREY[800]});
      ${COLORS.border}: var(${WHITE_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background}: var(${GREY[800]});
      ${COLORS.border}: var(${WHITE_ALFA[8]});
    }
  }
`;
