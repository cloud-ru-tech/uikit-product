import { css } from '@linaria/core';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, BLACK_ALFA, PURPLE, WHITE_ALFA, GREEN } = EXPORT_VARS;

export const COLORS = {
  WEAK_FILL: '--color-button-icon-weak-fill',
  WEAK_FILL_HOVER: '--color-button-icon-weak-fill-hover',
  WEAK_FILL_ACTIVE: '--color-button-icon-weak-fill-active',
  WEAK_FILL_DISABLED: '--color-button-icon-weak-fill-disabled',

  STRONG_FILL: '--color-button-icon-strong-fill',
  STRONG_FILL_HOVER: '--color-button-icon-strong-fill-hover',
  STRONG_FILL_ACTIVE: '--color-button-icon-strong-fill-active',
  STRONG_FILL_DISABLED: '--color-button-icon-strong-fill-disabled',

  COLOR_FILL: '--color-button-icon-color-fill',
  COLOR_FILL_HOVER: '--color-button-icon-color-fill-hover',
  COLOR_FILL_ACTIVE: '--color-button-icon-color-fill-active',
  COLOR_FILL_DISABLED: '--color-button-icon-color-fill-disabled',

  ACCENT_FILL: '--color-button-icon-accent-fill',
  ACCENT_FILL_HOVER: '--color-button-icon-accent-fill-hover',
  ACCENT_FILL_ACTIVE: '--color-button-icon-accent-fill-active',
  ACCENT_FILL_DISABLED: '--color-button-icon-accent-fill-disabled',

  ON_ACCENT_FILL: '--color-button-icon-on-accent-fill',
  ON_ACCENT_FILL_HOVER: '--color-button-icon-on-accent-fill-hover',
  ON_ACCENT_FILL_ACTIVE: '--color-button-icon-on-accent-fill-active',
  ON_ACCENT_FILL_DISABLED: '--color-button-icon-on-accent-fill-disabled',
};

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.Purple}'] */
export const PURPLE_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='purple'] {
      ${COLORS.WEAK_FILL}: var(${GREY[200]});
      ${COLORS.WEAK_FILL_HOVER}: var(${BLUE_GREY[60]});
      ${COLORS.WEAK_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.WEAK_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.STRONG_FILL}: var(${GREY[400]});
      ${COLORS.STRONG_FILL_HOVER}: var(${BLUE_GREY[80]});
      ${COLORS.STRONG_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.STRONG_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.COLOR_FILL}: var(${GREY[200]});
      ${COLORS.COLOR_FILL_HOVER}: var(${PURPLE[100]});
      ${COLORS.COLOR_FILL_ACTIVE}: var(${PURPLE[115]});
      ${COLORS.COLOR_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.ACCENT_FILL}: var(${PURPLE[100]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.ON_ACCENT_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.PurpleDark}'] */
export const PURPLE_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='purpleDark'] {
      ${COLORS.WEAK_FILL}: var(${GREY[450]});
      ${COLORS.WEAK_FILL_HOVER}: var(${GREY[200]});
      ${COLORS.WEAK_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.WEAK_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.STRONG_FILL}: var(${GREY[200]});
      ${COLORS.STRONG_FILL_HOVER}: var(${GREY[100]});
      ${COLORS.STRONG_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.STRONG_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.COLOR_FILL}: var(${GREY[450]});
      ${COLORS.COLOR_FILL_HOVER}: var(${PURPLE[50]});
      ${COLORS.COLOR_FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.COLOR_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.ACCENT_FILL}: var(${PURPLE[50]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${PURPLE[25]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${PURPLE[10]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.ON_ACCENT_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.Green}'] */
export const GREEN_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='green'] {
      ${COLORS.WEAK_FILL}: var(${GREY[200]});
      ${COLORS.WEAK_FILL_HOVER}: var(${BLUE_GREY[60]});
      ${COLORS.WEAK_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.WEAK_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.STRONG_FILL}: var(${GREY[400]});
      ${COLORS.STRONG_FILL_HOVER}: var(${BLUE_GREY[80]});
      ${COLORS.STRONG_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.STRONG_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.COLOR_FILL}: var(${GREY[200]});
      ${COLORS.COLOR_FILL_HOVER}: var(${GREEN[100]});
      ${COLORS.COLOR_FILL_ACTIVE}: var(${GREEN[115]});
      ${COLORS.COLOR_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.ACCENT_FILL}: var(${GREEN[100]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${BLACK_ALFA[8]});

      ${COLORS.ON_ACCENT_FILL}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${GREEN[25]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
    }
  }
`;

/* TODO: использовать #sbercloud-theme-wrapper[data-theme='${Themes.GreenDark}'] */
export const GREEN_DARK_THEME = css`
  :global() {
    #sbercloud-theme-wrapper[data-theme='greenDark'] {
      ${COLORS.WEAK_FILL}: var(${GREY[450]});
      ${COLORS.WEAK_FILL_HOVER}: var(${GREY[200]});
      ${COLORS.WEAK_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.WEAK_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.STRONG_FILL}: var(${GREY[200]});
      ${COLORS.STRONG_FILL_HOVER}: var(${GREY[100]});
      ${COLORS.STRONG_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.STRONG_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.COLOR_FILL}: var(${GREY[450]});
      ${COLORS.COLOR_FILL_HOVER}: var(${GREEN[100]});
      ${COLORS.COLOR_FILL_ACTIVE}: var(${GREEN[50]});
      ${COLORS.COLOR_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.ACCENT_FILL}: var(${GREEN[100]});
      ${COLORS.ACCENT_FILL_HOVER}: var(${GREEN[50]});
      ${COLORS.ACCENT_FILL_ACTIVE}: var(${GREEN[25]});
      ${COLORS.ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.ON_ACCENT_FILL}: var(${GREEN[25]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${GREEN[10]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
