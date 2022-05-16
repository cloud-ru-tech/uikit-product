import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY, PURPLE, GREEN, GREEN_ALFA, WHITE_ALFA, BLACK_ALFA, PURPLE_ALFA } = EXPORT_VARS;

export const COLORS = {
  RADIO_CARD: {
    BG: '--radio-card-bg-color',
    BORDER: '--radio-card-border-color',
    LABEL: '--radio-card-label-color',
    DESCRIPTION: '--radio-card-description-color',
    ICON: '--radio-card-icon-color',

    HOVER: {
      BG: '--radio-card-hover-bg-color',
      BORDER: '--radio-card-hover-border-color',
      LABEL: '--radio-card-hover-label-color',
      DESCRIPTION: '--radio-card-hover-description-color',
      ICON: '--radio-card-hover-icon-color',
    },

    DISABLED: {
      BG: '--radio-card-disabled-bg-color',
      BORDER: '--radio-card-disabled-border-color',
      LABEL: '--radio-card-disabled-label-color',
      DESCRIPTION: '--radio-card-disabled-description-color',
      ICON: '--radio-card-disabled-icon-color',
    },
  },

  RADIO_CARD_SELECTED: {
    BG: '--radio-card-selected-bg-color',
    BORDER: '--radio-card-selected-border-color',
    LABEL: '--radio-card-selected-label-color',
    DESCRIPTION: '--radio-card-selected-description-color',
    ICON: '--radio-card-selected-icon-color',

    HOVER: {
      BG: '--radio-card-selected-hover-bg-color',
      BORDER: '--radio-card-selected-hover-border-color',
      LABEL: '--radio-card-selected-hover-label-color',
      DESCRIPTION: '--radio-card-selected-hover-description-color',
      ICON: '--radio-card-selected-hover-icon-color',
    },

    DISABLED: {
      BG: '--radio-card-selected-disabled-bg-color',
      BORDER: '--radio-card-selected-disabled-border-color',
      LABEL: '--radio-card-selected-disabled-label-color',
      DESCRIPTION: '--radio-card-selected-disabled-description-color',
      ICON: '--radio-card-selected-disabled-icon-color',
    },
  },
};

export const PURPLE_THEME = css`
  :global() {
    [data-theme='${Themes.Purple}'] {
      ${COLORS.RADIO_CARD.BG}: var(${GREY[0]});
      ${COLORS.RADIO_CARD.BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD.ICON}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO_CARD.DISABLED.BG}: var(${BLACK_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.BORDER}: var(${BLACK_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.ICON}:var(${BLACK_ALFA[16]});

      ${COLORS.RADIO_CARD.HOVER.BG}: var(${GREY[0]});
      ${COLORS.RADIO_CARD.HOVER.BORDER}: var(${PURPLE[115]});
      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD.HOVER.ICON}: var(${PURPLE[115]});

      ${COLORS.RADIO_CARD_SELECTED.BG}: var(${PURPLE_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.BORDER}: var(${PURPLE[100]});
      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.ICON}: var(${PURPLE[100]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BG}: var(${BLACK_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BORDER}: var(${PURPLE[100]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.ICON}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.BG}: var(${PURPLE_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.BORDER}: var(${PURPLE[115]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.ICON}: var(${PURPLE[115]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.PurpleDark}'] {
      ${COLORS.RADIO_CARD.BG}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD.ICON}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD.DISABLED.BG}: var(${WHITE_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.BORDER}: var(${WHITE_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.ICON}:var(${WHITE_ALFA[16]});

      ${COLORS.RADIO_CARD.HOVER.BG}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.HOVER.BORDER}: var(${PURPLE[25]});
      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD.HOVER.ICON}: var(${PURPLE[25]});

      ${COLORS.RADIO_CARD_SELECTED.BG}: var(${PURPLE_ALFA[8]});
      ${COLORS.RADIO_CARD_SELECTED.BORDER}: var(${PURPLE[50]});
      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.ICON}: var(${PURPLE[50]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BG}: var(${WHITE_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BORDER}: var(${PURPLE[50]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.ICON}: var(${WHITE_ALFA[24]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.BG}: var(${PURPLE_ALFA[8]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.BORDER}: var(${PURPLE[25]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.ICON}: var(${PURPLE[25]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    [data-theme='${Themes.Green}'] {
      ${COLORS.RADIO_CARD.BG}: var(${GREY[0]});
      ${COLORS.RADIO_CARD.BORDER}: var(${BLACK_ALFA[16]});
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD.ICON}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO_CARD.DISABLED.BG}: var(${BLACK_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.BORDER}: var(${BLACK_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${BLACK_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.ICON}:var(${BLACK_ALFA[16]});

      ${COLORS.RADIO_CARD.HOVER.BG}: var(${GREY[0]});
      ${COLORS.RADIO_CARD.HOVER.BORDER}: var(${GREEN[115]});
      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD.HOVER.ICON}: var(${GREEN[115]});

      ${COLORS.RADIO_CARD_SELECTED.BG}: var(${GREEN_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.BORDER}: var(${GREEN[100]});
      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.ICON}: var(${GREEN[100]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BG}: var(${BLACK_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BORDER}: var(${GREEN[100]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.ICON}: var(${BLACK_ALFA[24]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.BG}: var(${GREEN_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.BORDER}: var(${GREEN[115]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[800]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${BLACK_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.ICON}: var(${GREEN[115]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='${Themes.GreenDark}'] {
      ${COLORS.RADIO_CARD.BG}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD.ICON}: var(${WHITE_ALFA[48]});

      ${COLORS.RADIO_CARD.DISABLED.BG}: var(${WHITE_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.BORDER}: var(${WHITE_ALFA[4]});
      ${COLORS.RADIO_CARD.DISABLED.LABEL}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.DESCRIPTION}: var(${WHITE_ALFA[24]});
      ${COLORS.RADIO_CARD.DISABLED.ICON}:var(${WHITE_ALFA[16]});

      ${COLORS.RADIO_CARD.HOVER.BG}: var(${GREY[800]});
      ${COLORS.RADIO_CARD.HOVER.BORDER}: var(${GREEN[25]});
      ${COLORS.RADIO_CARD.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD.HOVER.ICON}: var(${GREEN[25]});

      ${COLORS.RADIO_CARD_SELECTED.BG}: var(${GREEN_ALFA[8]});
      ${COLORS.RADIO_CARD_SELECTED.BORDER}: var(${GREEN[50]});
      ${COLORS.RADIO_CARD_SELECTED.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.ICON}: var(${GREEN[50]});

      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BG}: var(${WHITE_ALFA[4]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.BORDER}: var(${GREEN[50]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION}:var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.DISABLED.ICON}: var(${WHITE_ALFA[24]});

      ${COLORS.RADIO_CARD_SELECTED.HOVER.BG}: var(${GREEN_ALFA[8]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.BORDER}: var(${GREEN[25]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL}: var(${GREY[100]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION}: var(${WHITE_ALFA[48]});
      ${COLORS.RADIO_CARD_SELECTED.HOVER.ICON}: var(${GREEN[25]});
    }
  }
`;
