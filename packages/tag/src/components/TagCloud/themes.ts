import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  background: {
    default: '--color-tag-cloud__background__default',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[650]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[650]});
    }
  }
`;
