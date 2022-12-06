import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  title: '--color__modal-private__title',
  subtitle: '--color__modal-private__subtitle',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.title}: var(${GREY[800]});
      ${COLORS.subtitle}: var(${GREY[600]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.title}: var(${GREY[800]});
      ${COLORS.subtitle}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.title}: var(${GREY[100]});
      ${COLORS.subtitle}: var(${GREY[300]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.title}: var(${GREY[100]});
      ${COLORS.subtitle}: var(${GREY[300]});
    }
  }
`;
