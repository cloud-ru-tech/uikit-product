import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { PURPLE_ALFA, GREEN_ALFA, WHITE_ALFA, BLACK_ALFA, PURPLE, GREEN } = EXPORT_VARS;

export const COLORS = {
  additionalItem: {
    text: '--color-drop-list__additional-item__text',
    hover: { background: '--color-drop-list__additional-item__hover-background' },
    disabled: '--color-drop-list__additional-item__disabled',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.additionalItem.hover.background}: var(${PURPLE_ALFA[4]});
      ${COLORS.additionalItem.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.additionalItem.text}: var(${PURPLE[100]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.additionalItem.hover.background}: var(${WHITE_ALFA[8]});
      ${COLORS.additionalItem.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.additionalItem.text}: var(${PURPLE[25]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.additionalItem.hover.background}: var(${GREEN_ALFA[4]});
      ${COLORS.additionalItem.disabled}: var(${BLACK_ALFA[16]});
      ${COLORS.additionalItem.text}: var(${GREEN[115]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.additionalItem.hover.background}: var(${WHITE_ALFA[8]});
      ${COLORS.additionalItem.disabled}: var(${WHITE_ALFA[24]});
      ${COLORS.additionalItem.text}: var(${GREEN[50]});
    }
  }
`;
