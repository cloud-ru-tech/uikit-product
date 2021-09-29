import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { WHITE_ALFA, GREY } = EXPORT_VARS;

export const COLORS = {
  BACKGROUND_COLOR: '--color-text-field-background-color',
  COLOR: '--color-text-field-text-color',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.BACKGROUND_COLOR}: var(${GREY[50]});
      ${COLORS.COLOR}: var(${GREY[600]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.BACKGROUND_COLOR}: var(${WHITE_ALFA[8]});
      ${COLORS.COLOR}: var(${GREY[250]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.BACKGROUND_COLOR}: var(${GREY[50]});
      ${COLORS.COLOR}: var(${GREY[600]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.BACKGROUND_COLOR}: var(${WHITE_ALFA[8]});
      ${COLORS.COLOR}: var(${GREY[250]});
    }
  }
`;
