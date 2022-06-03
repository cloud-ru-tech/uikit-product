import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE, GREEN, GREY } = EXPORT_VARS;

export const COLORS = {
  ICON_FILL: '--color-nodatapage-icon-fill',
  TITLE_TEXT: '--color-nodatapage-title',
  CONTENT_TEXT: '--color-nodatapage-content',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.ICON_FILL}: var(${PURPLE[100]});
      ${COLORS.TITLE_TEXT}: var(${GREY[800]});
      ${COLORS.CONTENT_TEXT}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.ICON_FILL}: var(${PURPLE[100]});
      ${COLORS.TITLE_TEXT}: var(${GREY[100]});
      ${COLORS.CONTENT_TEXT}: var(${GREY[300]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.ICON_FILL}: var(${GREEN[100]});
      ${COLORS.TITLE_TEXT}: var(${GREY[800]});
      ${COLORS.CONTENT_TEXT}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.ICON_FILL}: var(${GREEN[100]});
      ${COLORS.TITLE_TEXT}: var(${GREY[100]});
      ${COLORS.CONTENT_TEXT}: var(${GREY[300]});
    }
  }
`;
