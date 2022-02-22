import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, PURPLE, GREEN, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  RADIO: {
    ICON: '--radio-icon-color',
    LABEL: '--radio-label-color',

    HOVER: {
      ICON: '--radio-hover-icon-color',
      LABEL: '--radio-hover-label-color',
    },

    DISABLED: {
      ICON: '--radio-disabled-icon-color',
      LABEL: '--radio-disabled-label-color',
    },
  },

  RADIO_SELECTED: {
    ICON: '--radio-selected-icon-color',
    LABEL: '--radio-selected-label-color',

    HOVER: {
      ICON: '--radio-selected-hover-icon-color',
      LABEL: '--radio-selected-hover-label-color',
    },

    DISABLED: {
      ICON: '--radio-selected-disabled-icon-color',
      LABEL: '--radio-selected-disabled-label-color',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme='${Themes.Purple}'] {
      ${COLORS.RADIO.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO.ICON}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO.HOVER.ICON}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO.DISABLED.ICON}: var(${BLACK_ALFA[8]});

      ${COLORS.RADIO_SELECTED.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_SELECTED.ICON}: var(${PURPLE[100]});

      ${COLORS.RADIO_SELECTED.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_SELECTED.HOVER.ICON}: var(${PURPLE[115]});

      ${COLORS.RADIO_SELECTED.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_SELECTED.DISABLED.ICON}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.PurpleDark}'] {
      ${COLORS.RADIO.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO.ICON}: var(${WHITE_ALFA[24]});

      ${COLORS.RADIO.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO.HOVER.ICON}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO.DISABLED.LABEL}: var(${WHITE_ALFA[8]});
      ${COLORS.RADIO.DISABLED.ICON}: var(${WHITE_ALFA[8]});

      ${COLORS.RADIO_SELECTED.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_SELECTED.ICON}: var(${PURPLE[50]});

      ${COLORS.RADIO_SELECTED.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_SELECTED.HOVER.ICON}: var(${PURPLE[25]});

      ${COLORS.RADIO_SELECTED.DISABLED.LABEL}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_SELECTED.DISABLED.ICON}: var(${WHITE_ALFA[16]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme='${Themes.Green}'] {
      ${COLORS.RADIO.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO.ICON}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO.HOVER.ICON}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO.DISABLED.ICON}: var(${BLACK_ALFA[8]});

      ${COLORS.RADIO_SELECTED.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_SELECTED.ICON}: var(${GREEN[100]});

      ${COLORS.RADIO_SELECTED.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_SELECTED.HOVER.ICON}: var(${GREEN[115]});

      ${COLORS.RADIO_SELECTED.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_SELECTED.DISABLED.ICON}: var(${BLACK_ALFA[16]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.GreenDark}'] {
      ${COLORS.RADIO.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO.ICON}: var(${WHITE_ALFA[24]});

      ${COLORS.RADIO.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO.HOVER.ICON}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO.DISABLED.LABEL}: var(${WHITE_ALFA[8]});
      ${COLORS.RADIO.DISABLED.ICON}: var(${WHITE_ALFA[8]});

      ${COLORS.RADIO_SELECTED.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_SELECTED.ICON}: var(${GREEN[50]});

      ${COLORS.RADIO_SELECTED.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_SELECTED.HOVER.ICON}: var(${GREEN[25]});

      ${COLORS.RADIO_SELECTED.DISABLED.LABEL}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_SELECTED.DISABLED.ICON}: var(${WHITE_ALFA[16]});
    }
  }
`;
