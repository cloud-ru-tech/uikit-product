import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  fill: '--color-predefined-decor-icon__fill',
  background: '--color-predefined-decor-icon__background',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.fill}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.background}: var(${EXPORT_VARS.PURPLE_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.fill}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.background}: var(${EXPORT_VARS.PURPLE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.fill}: var(${EXPORT_VARS.BLACK_ALFA[24]});
      ${COLORS.background}: var(${EXPORT_VARS.BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.fill}: var(${EXPORT_VARS.WHITE_ALFA[48]});
      ${COLORS.background}: var(${EXPORT_VARS.WHITE_ALFA[8]});
    }
  }
`;
