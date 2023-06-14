import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  NO_ACCESS_PAGE: {
    BACKGROUND: `--color-layout-no-access__background`,
    TITLE: `--color-layout-no-access__title`,
    TEXT: `--color-layout-no-access__text`,
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}],
    body[data-theme=${Themes.Green}] {
      ${COLORS.NO_ACCESS_PAGE.BACKGROUND}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.NO_ACCESS_PAGE.TITLE}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.NO_ACCESS_PAGE.TEXT}: var(${EXPORT_VARS.GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}],
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.NO_ACCESS_PAGE.BACKGROUND}: var(${EXPORT_VARS.GREY[800]});
      ${COLORS.NO_ACCESS_PAGE.TITLE}: var(${EXPORT_VARS.GREY[100]});
      ${COLORS.NO_ACCESS_PAGE.TEXT}: var(${EXPORT_VARS.GREY[300]});
    }
  }
`;
