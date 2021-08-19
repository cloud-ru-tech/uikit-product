import { css } from '@linaria/core';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PURPLE, GREEN, WHITE_ALFA } = EXPORT_VARS;

export const COLORS = {
  FILLED_FILL: '--color-button-filled-fill',
  FILLED_BG: '--color-button-filled-bg',
  FILLED_COLOR: '--color-button-filled-color',
  FILLED_FILL_HOVER: '--color-button-filled-fill-hover',
  FILLED_BG_HOVER: '--color-button-filled-bg-hover',
  FILLED_COLOR_HOVER: '--color-button-filled-color-hover',
  FILLED_FILL_ACTIVE: '--color-button-filled-fill-active',
  FILLED_BG_ACTIVE: '--color-button-filled-bg-active',
  FILLED_COLOR_ACTIVE: '--color-button-filled-color-active',
  FILLED_FILL_DISABLED: '--color-button-filled-fill-disabled',
  FILLED_BG_DISABLED: '--color-button-filled-bg-disabled',
  FILLED_COLOR_DISABLED: '--color-button-filled-color-disabled',

  OUTLINE_ACCENT_FILL: '--color-button-outline-accent-fill',
  OUTLINE_ACCENT_BORDER: '--color-button-outline-accent-border',
  OUTLINE_ACCENT_COLOR: '--color-button-outline-accent-color',
  OUTLINE_ACCENT_FILL_HOVER: '--color-button-outline-accent-fill-hover',
  OUTLINE_ACCENT_BORDER_HOVER: '--color-button-outline-accent-border-hover',
  OUTLINE_ACCENT_COLOR_HOVER: '--color-button-outline-accent-color-hover',
  OUTLINE_ACCENT_FILL_ACTIVE: '--color-button-outline-accent-fill-active',
  OUTLINE_ACCENT_BORDER_ACTIVE: '--color-button-outline-accent-border-active',
  OUTLINE_ACCENT_COLOR_ACTIVE: '--color-button-outline-accent-color-active',
  OUTLINE_ACCENT_FILL_DISABLED: '--color-button-outline-accent-fill-disabled',
  OUTLINE_ACCENT_BORDER_DISABLED: '--color-button-outline-accent-border-disabled',
  OUTLINE_ACCENT_COLOR_DISABLED: '--color-button-outline-accent-color-disabled',

  OUTLINE_GREY_FILL: '--color-button-outline-grey-fill',
  OUTLINE_GREY_BORDER: '--color-button-outline-grey-border',
  OUTLINE_GREY_COLOR: '--color-button-outline-grey-color',
  OUTLINE_GREY_FILL_HOVER: '--color-button-outline-grey-fill-hover',
  OUTLINE_GREY_BORDER_HOVER: '--color-button-outline-grey-border-hover',
  OUTLINE_GREY_COLOR_HOVER: '--color-button-outline-grey-color-hover',
  OUTLINE_GREY_FILL_ACTIVE: '--color-button-outline-grey-fill-active',
  OUTLINE_GREY_BORDER_ACTIVE: '--color-button-outline-grey-border-active',
  OUTLINE_GREY_COLOR_ACTIVE: '--color-button-outline-grey-color-active',
  OUTLINE_GREY_FILL_DISABLED: '--color-button-outline-grey-fill-disabled',
  OUTLINE_GREY_BG_DISABLED: '--color-button-outline-grey-bg-disabled',
  OUTLINE_GREY_BORDER_DISABLED: '--color-button-outline-grey-border-disabled',
  OUTLINE_GREY_COLOR_DISABLED: '--color-button-outline-grey-color-disabled',

  TRANSPARENT_FILL: '--color-button-transparent-fill',
  TRANSPARENT_COLOR: '--color-button-transparent-color',
  TRANSPARENT_FILL_HOVER: '--color-button-transparent-fill-hover',
  TRANSPARENT_BG_HOVER: '--color-button-transparent-bg-hover',
  TRANSPARENT_COLOR_HOVER: '--color-button-transparent-color-hover',
  TRANSPARENT_FILL_ACTIVE: '--color-button-transparent-fill-active',
  TRANSPARENT_BG_ACTIVE: '--color-button-transparent-bg-active',
  TRANSPARENT_COLOR_ACTIVE: '--color-button-transparent-color-active',
  TRANSPARENT_FILL_DISABLED: '--color-button-transparent-fill-disabled',
  TRANSPARENT_COLOR_DISABLED: '--color-button-transparent-color-disabled',
};

/* TODO: использовать [data-theme='${Themes.Purple}'] */
export const PURPLE_THEME = css`
  :global() {
    [data-theme='purple'] {
      ${COLORS.FILLED_FILL}: var(${GREY[0]});
      ${COLORS.FILLED_BG}: var(${PURPLE[100]});
      ${COLORS.FILLED_COLOR}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_BG_HOVER}: var(${PURPLE[115]});
      ${COLORS.FILLED_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_BG_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.FILLED_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_DISABLED}: var(${GREY[0]});
      ${COLORS.FILLED_BG_DISABLED}: var(${PURPLE[50]});
      ${COLORS.FILLED_COLOR_DISABLED}: var(${GREY[0]});

      ${COLORS.OUTLINE_ACCENT_FILL}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_ACCENT_BORDER}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_ACCENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_ACCENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_ACCENT_BORDER_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_ACCENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_ACCENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_ACCENT_BORDER_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_ACCENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_ACCENT_FILL_DISABLED}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_ACCENT_BORDER_DISABLED}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_ACCENT_COLOR_DISABLED}: var(${PURPLE[50]});

      ${COLORS.OUTLINE_GREY_FILL}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_BORDER}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.OUTLINE_GREY_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_GREY_BORDER_HOVER}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_GREY_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_GREY_BORDER_ACTIVE}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_GREY_FILL_DISABLED}: var(${GREY[300]});
      ${COLORS.OUTLINE_GREY_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.OUTLINE_GREY_BORDER_DISABLED}: transparent;
      ${COLORS.OUTLINE_GREY_COLOR_DISABLED}: var(${GREY[300]});

      ${COLORS.TRANSPARENT_FILL}: var(${PURPLE[100]});
      ${COLORS.TRANSPARENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${PURPLE[10]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${PURPLE[50]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${PURPLE[50]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.PurpleDark}'] */
export const PURPLE_DARK_THEME = css`
  :global() {
    [data-theme='purpleDark'] {
      ${COLORS.FILLED_FILL}: var(${GREY[0]});
      ${COLORS.FILLED_BG}: var(${PURPLE[100]});
      ${COLORS.FILLED_COLOR}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_BG_HOVER}: var(${PURPLE[115]});
      ${COLORS.FILLED_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_BG_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.FILLED_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.FILLED_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.FILLED_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.OUTLINE_ACCENT_FILL}: var(${GREY[0]});
      ${COLORS.OUTLINE_ACCENT_BORDER}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_ACCENT_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_ACCENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_ACCENT_BORDER_HOVER}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_ACCENT_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_ACCENT_FILL_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_ACCENT_BORDER_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_ACCENT_COLOR_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_ACCENT_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.OUTLINE_GREY_FILL}: var(${GREY[0]});
      ${COLORS.OUTLINE_GREY_BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_GREY_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_GREY_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_GREY_BORDER_HOVER}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_GREY_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_GREY_FILL_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_GREY_BORDER_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_GREY_COLOR_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_GREY_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_GREY_BG_DISABLED}: transparent;
      ${COLORS.OUTLINE_GREY_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_GREY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.TRANSPARENT_FILL}: var(${PURPLE[50]});
      ${COLORS.TRANSPARENT_COLOR}: var(${PURPLE[50]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${WHITE_ALFA[8]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.Green}'] */
export const GREEN_THEME = css`
  :global() {
    [data-theme='green'] {
      ${COLORS.FILLED_FILL}: var(${GREEN[100]});
      ${COLORS.FILLED_BG}: var(${BLUE_GREY[80]});
      ${COLORS.FILLED_COLOR}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.FILLED_BG_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.FILLED_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.FILLED_BG_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.FILLED_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_DISABLED}: var(${GREY[300]});
      ${COLORS.FILLED_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.FILLED_COLOR_DISABLED}: var(${GREY[300]});

      ${COLORS.OUTLINE_ACCENT_FILL}: var(${GREEN[100]});
      ${COLORS.OUTLINE_ACCENT_BORDER}: var(${GREEN[100]});
      ${COLORS.OUTLINE_ACCENT_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.OUTLINE_ACCENT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_ACCENT_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_ACCENT_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_ACCENT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_ACCENT_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_ACCENT_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_ACCENT_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.OUTLINE_ACCENT_BORDER_DISABLED}: var(${GREY[200]});
      ${COLORS.OUTLINE_ACCENT_COLOR_DISABLED}: var(${GREY[200]});

      ${COLORS.OUTLINE_GREY_FILL}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_BORDER}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.OUTLINE_GREY_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_GREY_BORDER_HOVER}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_GREY_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_GREY_BORDER_ACTIVE}: var(${GREY[200]});
      ${COLORS.OUTLINE_GREY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_GREY_FILL_DISABLED}: var(${GREY[300]});
      ${COLORS.OUTLINE_GREY_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.OUTLINE_GREY_BORDER_DISABLED}: transparent;
      ${COLORS.OUTLINE_GREY_COLOR_DISABLED}: var(${GREY[300]});

      ${COLORS.TRANSPARENT_FILL}: var(${GREEN[100]});
      ${COLORS.TRANSPARENT_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${GREEN[115]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${GREEN[125]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${GREY[200]});
    }
  }
`;

/* TODO: использовать [data-theme='${Themes.GreenDark}'] */
export const GREEN_DARK_THEME = css`
  :global() {
    [data-theme='greenDark'] {
      ${COLORS.FILLED_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.FILLED_BG}: var(${GREEN[100]});
      ${COLORS.FILLED_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.FILLED_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.FILLED_BG_HOVER}: var(${GREEN[115]});
      ${COLORS.FILLED_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.FILLED_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.FILLED_BG_ACTIVE}: var(${GREEN[125]});
      ${COLORS.FILLED_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.FILLED_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.FILLED_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.FILLED_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.OUTLINE_ACCENT_FILL}: var(${GREEN[100]});
      ${COLORS.OUTLINE_ACCENT_BORDER}: var(${GREEN[100]});
      ${COLORS.OUTLINE_ACCENT_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_ACCENT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_ACCENT_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_ACCENT_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_ACCENT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_ACCENT_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_ACCENT_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_ACCENT_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.OUTLINE_GREY_FILL}: var(${GREY[0]});
      ${COLORS.OUTLINE_GREY_BORDER}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_GREY_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_GREY_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_GREY_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_GREY_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_GREY_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_GREY_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_GREY_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_GREY_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_GREY_BG_DISABLED}: transparent;
      ${COLORS.OUTLINE_GREY_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_GREY_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.TRANSPARENT_FILL}: var(${GREEN[100]});
      ${COLORS.TRANSPARENT_COLOR}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${GREEN[25]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${WHITE_ALFA[8]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${GREEN[25]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
