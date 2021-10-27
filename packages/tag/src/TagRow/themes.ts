import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { BLACK_ALFA, GREY } = EXPORT_VARS;

export const COLORS = {
  TRIGGER_TAG_HOVER: '--color-trigger-tag-hover',
  TOOLTIP_CONTAINER_BACKGROUND: '--color-tooltip-container-background',
  TOOLTIP_CONTAINER_BOX_SHADOW: '--color-tooltip-container-box-shadow',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.TRIGGER_TAG_HOVER}: var(${BLACK_ALFA[8]});
      ${COLORS.TOOLTIP_CONTAINER_BACKGROUND}: var(${GREY[0]});
      ${COLORS.TOOLTIP_CONTAINER_BOX_SHADOW}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.TRIGGER_TAG_HOVER}: var(${BLACK_ALFA[8]});
      ${COLORS.TOOLTIP_CONTAINER_BACKGROUND}: var(${GREY[0]});
      ${COLORS.TOOLTIP_CONTAINER_BOX_SHADOW}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.TRIGGER_TAG_HOVER}: var(${BLACK_ALFA[8]});
      ${COLORS.TOOLTIP_CONTAINER_BACKGROUND}: var(${GREY[0]});
      ${COLORS.TOOLTIP_CONTAINER_BOX_SHADOW}: var(${BLACK_ALFA[4]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.TRIGGER_TAG_HOVER}: var(${BLACK_ALFA[8]});
      ${COLORS.TOOLTIP_CONTAINER_BACKGROUND}: var(${GREY[0]});
      ${COLORS.TOOLTIP_CONTAINER_BOX_SHADOW}: var(${BLACK_ALFA[4]});
    }
  }
`;
