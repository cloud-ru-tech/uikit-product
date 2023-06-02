import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE_ALFA, GREEN_ALFA, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  list: { background: '--color-drop-list__background' },
  item: {
    hover: { background: '--color-drop-list__item__hover-background' },
    activeHover: { background: '--color-drop-list__item__active-hover-background' },
    disabled: { color: '--color-drop-list__item__disabled-background' },
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.list.background}: var(${GREY[0]});
      ${COLORS.item.hover.background}: var(${PURPLE_ALFA[4]});
      ${COLORS.item.activeHover.background}: var(${PURPLE_ALFA[4]});
      ${COLORS.item.disabled.color}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.list.background}: var(${GREY[800]});
      ${COLORS.item.hover.background}: var(${WHITE_ALFA[8]});
      ${COLORS.item.activeHover.background}: var(${WHITE_ALFA[8]});
      ${COLORS.item.disabled.color}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.list.background}: var(${GREY[0]});
      ${COLORS.item.hover.background}: var(${GREEN_ALFA[4]});
      ${COLORS.item.activeHover.background}: var(${GREEN_ALFA[4]});
      ${COLORS.item.disabled.color}: var(${BLACK_ALFA[24]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.list.background}: var(${GREY[800]});
      ${COLORS.item.hover.background}: var(${WHITE_ALFA[8]});
      ${COLORS.item.activeHover.background}: var(${WHITE_ALFA[8]});
      ${COLORS.item.disabled.color}: var(${WHITE_ALFA[24]});
    }
  }
`;
