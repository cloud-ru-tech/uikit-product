import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const TAG_CLOUD_TRIGGER_COLORS = {
  background: {
    hover: '--color-tag-row__tag-cloud-trigger-background__hover',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${TAG_CLOUD_TRIGGER_COLORS.background.hover}: var(${EXPORT_VARS.BLACK_ALFA[8]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${TAG_CLOUD_TRIGGER_COLORS.background.hover}: var(${EXPORT_VARS.WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${TAG_CLOUD_TRIGGER_COLORS.background.hover}: var(${EXPORT_VARS.BLACK_ALFA[8]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${TAG_CLOUD_TRIGGER_COLORS.background.hover}: var(${EXPORT_VARS.WHITE_ALFA[16]});
    }
  }
`;
