import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, PURPLE, GREEN, BLUE_GREY, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

// I've added [-new] postfix in order to avoid potential collisions with DEPRECATED color set from theme package
export const COLORS = {
  CONTAINER_COLOR: '--tooltip-container-new',
  CONTAINER_BACKGROUND_COLOR: '--tooltip-container-background-new',
  CONTAINER_BORDER_COLOR: '--tooltip-container-border-new',
  CONTAINER_SHADOW: '--tooltip-container-shadow-new',
  ICON_FILL: '--tooltip-icon-fill-new',
  ICON_HOVER_FILL: '--tooltip-icon-hover-fill-new',
  ICON_ACTIVE_FILL: '--tooltip-icon-active-fill-new',
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme='${Themes.Purple}'] {
      ${COLORS.CONTAINER_COLOR}: var(${GREY[0]});
      ${COLORS.CONTAINER_BACKGROUND_COLOR}: var(${BLUE_GREY[90]});
      ${COLORS.CONTAINER_BORDER_COLOR}: transparent;
      ${COLORS.CONTAINER_SHADOW}: none;
      ${COLORS.ICON_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.ICON_HOVER_FILL}: var(${GREY[0]});
      ${COLORS.ICON_ACTIVE_FILL}: var(${PURPLE[25]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.PurpleDark}'] {
      ${COLORS.CONTAINER_COLOR}: var(${GREY[0]});
      ${COLORS.CONTAINER_BACKGROUND_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.CONTAINER_BORDER_COLOR}: var(${BLUE_GREY[70]});
      ${COLORS.CONTAINER_SHADOW}: 0px 0px 1px 0px var(${BLACK_ALFA[4]}), 0px 2px 6px 0px var(${BLACK_ALFA[4]}), 0px 10px 20px 0px var(${BLACK_ALFA[4]});
      ${COLORS.ICON_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.ICON_HOVER_FILL}: var(${PURPLE[25]});
      ${COLORS.ICON_ACTIVE_FILL}: var(${GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme='${Themes.Green}'] {
      ${COLORS.CONTAINER_COLOR}: var(${GREY[0]});
      ${COLORS.CONTAINER_BACKGROUND_COLOR}: var(${BLUE_GREY[90]});
      ${COLORS.CONTAINER_BORDER_COLOR}: transparent;
      ${COLORS.CONTAINER_SHADOW}: none;
      ${COLORS.ICON_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.ICON_HOVER_FILL}: var(${GREY[0]});
      ${COLORS.ICON_ACTIVE_FILL}: var(${GREEN[25]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.GreenDark}'] {
      ${COLORS.CONTAINER_COLOR}: var(${GREY[0]});
      ${COLORS.CONTAINER_BACKGROUND_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.CONTAINER_BORDER_COLOR}: var(${BLUE_GREY[70]});
      ${COLORS.CONTAINER_SHADOW}: 0px 0px 1px 0px var(${BLACK_ALFA[4]}), 0px 2px 6px 0px var(${BLACK_ALFA[4]}), 0px 10px 20px 0px var(${BLACK_ALFA[4]});
      ${COLORS.ICON_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.ICON_HOVER_FILL}: var(${GREEN[10]});
      ${COLORS.ICON_ACTIVE_FILL}: var(${GREY[0]});
    }
  }
`;
