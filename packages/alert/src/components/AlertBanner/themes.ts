import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BLUE_GREY, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  text: '--color-alert-banner__text__default',
  background: '--color-alert-banner__background__default',
  border: '--color-alert-banner__border__default',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background}: var(${BLUE_GREY[100]});
      ${COLORS.text}: var(${GREY[0]});
      ${COLORS.border}: transparent;
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background}: var(${BLUE_GREY[70]});
      ${COLORS.text}: var(${GREY[100]});
      ${COLORS.border}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background}: var(${BLUE_GREY[100]});
      ${COLORS.text}: var(${GREY[0]});
      ${COLORS.border}: transparent;
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background}: var(${BLUE_GREY[70]});
      ${COLORS.text}: var(${GREY[100]});
      ${COLORS.border}: var(${WHITE_ALFA[16]});
    }
  }
`;
