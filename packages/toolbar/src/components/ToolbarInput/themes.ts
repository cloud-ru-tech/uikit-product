import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  background: '--color-toolbar-input__background-default',
  icon: '--color-toolbar-input__icon-default',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.icon}: var(${GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background}: var(${GREY[850]});
      ${COLORS.icon}: var(${GREY[450]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background}: var(${GREY[0]});
      ${COLORS.icon}: var(${GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background}: var(${GREY[850]});
      ${COLORS.icon}: var(${GREY[450]});
    }
  }
`;
