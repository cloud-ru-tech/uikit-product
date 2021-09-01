import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, WHITE_ALFA, BLACK_ALFA } = EXPORT_VARS;

export const COLORS = {
  RADIO_CARD: {
    LABEL: '--radio-card-label-color',
    DESCRIPTION: '--radio-card-description-color',

    HOVER: {
      LABEL: '--radio-card-hover-label-color',
      DESCRIPTION: '--radio-card-hover-description-color',
    },

    DISABLED: {
      LABEL: '--radio-card-disabled-label-color',
      DESCRIPTION: '--radio-card-disabled-description-color',
    },
  },

  RADIO_CARD_SELECTED: {
    LABEL: '--radio-card-selected-label-color',
    DESCRIPTION: '--radio-card-selected-description-color',

    HOVER: {
      LABEL: '--radio-card-selected-hover-label-color',
      DESCRIPTION: '--radio-card-selected-hover-description-color',
    },

    DISABLED: {
      LABEL: '--radio-card-selected-disabled-label-color',
      DESCRIPTION: '--radio-card-selected-disabled-description-color',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme='${Themes.Purple}'] {
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.PurpleDark}'] {
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${WHITE_ALFA[24]});

      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme='${Themes.Green}'] {
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${BLACK_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.GreenDark}'] {
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${WHITE_ALFA[24]});

      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});
    }
  }
`;
