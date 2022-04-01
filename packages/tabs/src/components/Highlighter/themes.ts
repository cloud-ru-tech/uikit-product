import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  highlighter: '--color-tab__active-tab-highlighter',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.highlighter}: var(${EXPORT_VARS.PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.highlighter}: var(${EXPORT_VARS.PURPLE[50]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.highlighter}: var(${EXPORT_VARS.GREEN[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.highlighter}: var(${EXPORT_VARS.GREEN[50]});
    }
  }
`;
