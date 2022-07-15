import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  TITLE: '--color-nodata__title',
  DESCRIPTION: '--color-nodata__description',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.TITLE}: var(${GREY[800]});
      ${COLORS.DESCRIPTION}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.TITLE}: var(${GREY[100]});
      ${COLORS.DESCRIPTION}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.TITLE}: var(${GREY[800]});
      ${COLORS.DESCRIPTION}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.TITLE}: var(${GREY[100]});
      ${COLORS.DESCRIPTION}: var(${GREY[300]});
    }
  }
`;
