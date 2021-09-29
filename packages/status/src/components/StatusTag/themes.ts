import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, BLACK_ALFA, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  TRANSPARENT_BG: '--status-tag-transparent-bg',
  LIGHT_BG: '--status-tag-light-bg',
  DARK_BG: '--status-tag-dark-bg',

  TEXT_COLOR: '--status-tag-text-color',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.TRANSPARENT_BG}: transparent;
      ${COLORS.LIGHT_BG}: var(${GREY[0]});
      ${COLORS.DARK_BG}: var(${BLACK_ALFA[4]});

      ${COLORS.TEXT_COLOR}: var(${GREY[800]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.TRANSPARENT_BG}: transparent;
      ${COLORS.LIGHT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.DARK_BG}: var(${BLACK_ALFA[16]});

      ${COLORS.TEXT_COLOR}: var(${GREY[100]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.TRANSPARENT_BG}: transparent;
      ${COLORS.LIGHT_BG}: var(${GREY[0]});
      ${COLORS.DARK_BG}: var(${BLACK_ALFA[4]});

      ${COLORS.TEXT_COLOR}: var(${GREY[800]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.TRANSPARENT_BG}: transparent;
      ${COLORS.LIGHT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.DARK_BG}: var(${BLACK_ALFA[16]});

      ${COLORS.TEXT_COLOR}: var(${GREY[100]});
    }
  }
`;
