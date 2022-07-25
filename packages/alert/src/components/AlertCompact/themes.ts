import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, BERRY_RED, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  highlighter: {
    default: '--color-alert-compact__highlighter__default',
    attention: '--color-alert-compact__highlighter__attention',
  },
  text: '--color-alert-compact__title__default',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.text}: var(${GREY[800]});

      ${COLORS.highlighter.default}: var(${PURPLE[100]});
      ${COLORS.highlighter.attention}: var(${BERRY_RED[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.text}: var(${GREY[100]});

      ${COLORS.highlighter.default}: var(${PURPLE[50]});
      ${COLORS.highlighter.attention}: var(${BERRY_RED[75]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.text}: var(${GREY[800]});

      ${COLORS.highlighter.default}: var(${GREEN[100]});
      ${COLORS.highlighter.attention}: var(${BERRY_RED[100]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.text}: var(${GREY[100]});

      ${COLORS.highlighter.default}: var(${GREEN[100]});
      ${COLORS.highlighter.attention}: var(${BERRY_RED[75]});
    }
  }
`;
