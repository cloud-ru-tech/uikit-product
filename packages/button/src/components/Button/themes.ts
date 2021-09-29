import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

const { GREY, BLUE_GREY, PURPLE, GREEN, WHITE_ALFA, BLACK_ALFA, PRESET } = EXPORT_VARS;

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

  OUTLINE_FILL: '--color-button-outline-fill',
  OUTLINE_BORDER: '--color-button-outline-border',
  OUTLINE_COLOR: '--color-button-outline-color',
  OUTLINE_FILL_HOVER: '--color-button-outline-fill-hover',
  OUTLINE_BORDER_HOVER: '--color-button-outline-border-hover',
  OUTLINE_COLOR_HOVER: '--color-button-outline-color-hover',
  OUTLINE_FILL_ACTIVE: '--color-button-outline-fill-active',
  OUTLINE_BORDER_ACTIVE: '--color-button-outline-border-active',
  OUTLINE_COLOR_ACTIVE: '--color-button-outline-color-active',
  OUTLINE_FILL_DISABLED: '--color-button-outline-fill-disabled',
  OUTLINE_BORDER_DISABLED: '--color-button-outline-border-disabled',
  OUTLINE_COLOR_DISABLED: '--color-button-outline-color-disabled',

  TRANSPARENT_FILL: '--color-button-transparent-fill',
  TRANSPARENT_BG: '--color-button-transparent-bg',
  TRANSPARENT_COLOR: '--color-button-transparent-color',
  TRANSPARENT_FILL_HOVER: '--color-button-transparent-fill-hover',
  TRANSPARENT_BG_HOVER: '--color-button-transparent-bg-hover',
  TRANSPARENT_COLOR_HOVER: '--color-button-transparent-color-hover',
  TRANSPARENT_FILL_ACTIVE: '--color-button-transparent-fill-active',
  TRANSPARENT_BG_ACTIVE: '--color-button-transparent-bg-active',
  TRANSPARENT_COLOR_ACTIVE: '--color-button-transparent-color-active',
  TRANSPARENT_FILL_DISABLED: '--color-button-transparent-fill-disabled',
  TRANSPARENT_BG_DISABLED: '--color-button-transparent-bg-disabled',
  TRANSPARENT_COLOR_DISABLED: '--color-button-transparent-color-disabled',

  ON_ACCENT_FILL: '--color-button-on-accent-fill',
  ON_ACCENT_BG: '--color-button-on-accent-bg',
  ON_ACCENT_COLOR: '--color-button-on-accent-color',
  ON_ACCENT_FILL_HOVER: '--color-button-on-accent-fill-hover',
  ON_ACCENT_BG_HOVER: '--color-button-on-accent-bg-hover',
  ON_ACCENT_COLOR_HOVER: '--color-button-on-accent-color-hover',
  ON_ACCENT_FILL_ACTIVE: '--color-button-on-accent-fill-active',
  ON_ACCENT_BG_ACTIVE: '--color-button-on-accent-bg-active',
  ON_ACCENT_COLOR_ACTIVE: '--color-button-on-accent-color-active',
  ON_ACCENT_FILL_DISABLED: '--color-button-on-accent-fill-disabled',
  ON_ACCENT_BG_DISABLED: '--color-button-on-accent-bg-disabled',
  ON_ACCENT_COLOR_DISABLED: '--color-button-on-accent-color-disabled',

  EXTRA_FILL: '--color-button-extra-fill',
  EXTRA_BG: '--color-button-extra-bg',
  EXTRA_COLOR: '--color-button-extra-color',
  EXTRA_FILL_HOVER: '--color-button-extra-fill-hover',
  EXTRA_BG_HOVER: '--color-button-extra-bg-hover',
  EXTRA_COLOR_HOVER: '--color-button-extra-color-hover',
  EXTRA_FILL_ACTIVE: '--color-button-extra-fill-active',
  EXTRA_BG_ACTIVE: '--color-button-extra-bg-active',
  EXTRA_COLOR_ACTIVE: '--color-button-extra-color-active',
  EXTRA_FILL_DISABLED: '--color-button-extra-fill-disabled',
  EXTRA_BG_DISABLED: '--color-button-extra-bg-disabled',
  EXTRA_COLOR_DISABLED: '--color-button-extra-color-disabled',

  ALARM_FILL: '--color-button-alarm-fill',
  ALARM_BG: '--color-button-alarm-bg',
  ALARM_COLOR: '--color-button-alarm-color',
  ALARM_FILL_HOVER: '--color-button-alarm-fill-hover',
  ALARM_BG_HOVER: '--color-button-alarm-bg-hover',
  ALARM_COLOR_HOVER: '--color-button-alarm-color-hover',
  ALARM_FILL_ACTIVE: '--color-button-alarm-fill-active',
  ALARM_BG_ACTIVE: '--color-button-alarm-bg-active',
  ALARM_COLOR_ACTIVE: '--color-button-alarm-color-active',
  ALARM_FILL_DISABLED: '--color-button-alarm-fill-disabled',
  ALARM_BG_DISABLED: '--color-button-alarm-bg-disabled',
  ALARM_COLOR_DISABLED: '--color-button-alarm-color-disabled',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.FILLED_FILL}: var(${GREY[0]});
      ${COLORS.FILLED_BG}: var(${PURPLE[100]});
      ${COLORS.FILLED_COLOR}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_BG_HOVER}: var(${PURPLE[115]});
      ${COLORS.FILLED_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_BG_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.FILLED_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_DISABLED}: var(${PURPLE[25]});
      ${COLORS.FILLED_BG_DISABLED}: var(${PURPLE[50]});
      ${COLORS.FILLED_COLOR_DISABLED}: var(${PURPLE[25]});

      ${COLORS.OUTLINE_FILL}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_BORDER}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_COLOR}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${PURPLE[50]});

      ${COLORS.TRANSPARENT_FILL}: var(${PURPLE[100]});
      ${COLORS.TRANSPARENT_BG}: var(${PURPLE[5]});
      ${COLORS.TRANSPARENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${PURPLE[10]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TRANSPARENT_BG_DISABLED}: var(${BLACK_ALFA[4]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.ON_ACCENT_FILL}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${PURPLE[10]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.EXTRA_FILL}: var(${GREY[0]});
      ${COLORS.EXTRA_BG}: var(${BLUE_GREY[80]});
      ${COLORS.EXTRA_COLOR}: var(${GREY[0]});
      ${COLORS.EXTRA_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.EXTRA_BG_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.EXTRA_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.EXTRA_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.EXTRA_BG_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.EXTRA_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.EXTRA_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.EXTRA_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.EXTRA_COLOR_DISABLED}: var(${GREY[200]});

      ${COLORS.ALARM_FILL}: var(${GREY[0]});
      ${COLORS.ALARM_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.ALARM_COLOR}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_BG_HOVER}: var(${PRESET.BERRY_RED_2});
      ${COLORS.ALARM_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_BG_ACTIVE}: var(${PRESET.BERRY_RED_3});
      ${COLORS.ALARM_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.ALARM_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.ALARM_COLOR_DISABLED}: var(${GREY[200]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.FILLED_FILL}: var(${GREY[0]});
      ${COLORS.FILLED_BG}: var(${PURPLE[100]});
      ${COLORS.FILLED_COLOR}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_BG_HOVER}: var(${PURPLE[115]});
      ${COLORS.FILLED_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_BG_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.FILLED_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.FILLED_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.FILLED_BG_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.FILLED_COLOR_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.OUTLINE_FILL}: var(${GREY[0]});
      ${COLORS.OUTLINE_BORDER}: var(${PURPLE[100]});
      ${COLORS.OUTLINE_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.TRANSPARENT_FILL}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.TRANSPARENT_COLOR}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.TRANSPARENT_BG_DISABLED}: var(${WHITE_ALFA[4]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.ON_ACCENT_FILL}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${PURPLE[100]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${PURPLE[10]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${PURPLE[115]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${PURPLE[25]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.EXTRA_FILL}: var(${GREY[0]});
      ${COLORS.EXTRA_BG}: var(${PURPLE[100]});
      ${COLORS.EXTRA_COLOR}: var(${GREY[0]});
      ${COLORS.EXTRA_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.EXTRA_BG_HOVER}: var(${PURPLE[115]});
      ${COLORS.EXTRA_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.EXTRA_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.EXTRA_BG_ACTIVE}: var(${PURPLE[125]});
      ${COLORS.EXTRA_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.EXTRA_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.EXTRA_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.EXTRA_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.ALARM_FILL}: var(${GREY[0]});
      ${COLORS.ALARM_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.ALARM_COLOR}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_BG_HOVER}: var(${PRESET.BERRY_RED_2});
      ${COLORS.ALARM_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_BG_ACTIVE}: var(${PRESET.BERRY_RED_3});
      ${COLORS.ALARM_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ALARM_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ALARM_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
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

      ${COLORS.OUTLINE_FILL}: var(${GREEN[100]});
      ${COLORS.OUTLINE_BORDER}: var(${GREEN[100]});
      ${COLORS.OUTLINE_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${GREY[200]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${GREY[200]});

      ${COLORS.TRANSPARENT_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.TRANSPARENT_BG}: var(${GREY[25]});
      ${COLORS.TRANSPARENT_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${GREY[50]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${GREY[100]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${BLACK_ALFA[16]});
      ${COLORS.TRANSPARENT_BG_DISABLED}: var(${BLACK_ALFA[4]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${BLACK_ALFA[16]});

      ${COLORS.ON_ACCENT_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${GREEN[115]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.EXTRA_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.EXTRA_BG}: var(${GREEN[100]});
      ${COLORS.EXTRA_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.EXTRA_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.EXTRA_BG_HOVER}: var(${GREEN[115]});
      ${COLORS.EXTRA_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.EXTRA_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.EXTRA_BG_ACTIVE}: var(${GREEN[125]});
      ${COLORS.EXTRA_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.EXTRA_FILL_DISABLED}: var(${GREY[300]});
      ${COLORS.EXTRA_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.EXTRA_COLOR_DISABLED}: var(${GREY[300]});

      ${COLORS.ALARM_FILL}: var(${GREY[0]});
      ${COLORS.ALARM_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.ALARM_COLOR}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_BG_HOVER}: var(${PRESET.BERRY_RED_2});
      ${COLORS.ALARM_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_BG_ACTIVE}: var(${PRESET.BERRY_RED_3});
      ${COLORS.ALARM_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_DISABLED}: var(${GREY[200]});
      ${COLORS.ALARM_BG_DISABLED}: var(${GREY[100]});
      ${COLORS.ALARM_COLOR_DISABLED}: var(${GREY[200]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
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

      ${COLORS.OUTLINE_FILL}: var(${GREEN[100]});
      ${COLORS.OUTLINE_BORDER}: var(${GREEN[100]});
      ${COLORS.OUTLINE_COLOR}: var(${GREY[0]});
      ${COLORS.OUTLINE_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_BORDER_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.OUTLINE_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_BORDER_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.OUTLINE_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_BORDER_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.OUTLINE_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.TRANSPARENT_FILL}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_BG}: var(${WHITE_ALFA[8]});
      ${COLORS.TRANSPARENT_COLOR}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_BG_HOVER}: var(${WHITE_ALFA[16]});
      ${COLORS.TRANSPARENT_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.TRANSPARENT_FILL_ACTIVE}: var(${GREEN[50]});
      ${COLORS.TRANSPARENT_BG_ACTIVE}: var(${WHITE_ALFA[16]});
      ${COLORS.TRANSPARENT_COLOR_ACTIVE}: var(${PURPLE[50]});
      ${COLORS.TRANSPARENT_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.TRANSPARENT_BG_DISABLED}: var(${WHITE_ALFA[4]});
      ${COLORS.TRANSPARENT_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.ON_ACCENT_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_BG}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.ON_ACCENT_FILL_HOVER}: var(${GREEN[115]});
      ${COLORS.ON_ACCENT_BG_HOVER}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_HOVER}: var(${GREEN[115]});
      ${COLORS.ON_ACCENT_FILL_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ON_ACCENT_BG_ACTIVE}: var(${GREY[0]});
      ${COLORS.ON_ACCENT_COLOR_ACTIVE}: var(${GREEN[125]});
      ${COLORS.ON_ACCENT_FILL_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ON_ACCENT_BG_DISABLED}: var(${WHITE_ALFA[48]});
      ${COLORS.ON_ACCENT_COLOR_DISABLED}: var(${WHITE_ALFA[16]});

      ${COLORS.EXTRA_FILL}: var(${BLUE_GREY[80]});
      ${COLORS.EXTRA_BG}: var(${GREEN[100]});
      ${COLORS.EXTRA_COLOR}: var(${BLUE_GREY[80]});
      ${COLORS.EXTRA_FILL_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.EXTRA_BG_HOVER}: var(${GREEN[115]});
      ${COLORS.EXTRA_COLOR_HOVER}: var(${BLUE_GREY[90]});
      ${COLORS.EXTRA_FILL_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.EXTRA_BG_ACTIVE}: var(${GREEN[125]});
      ${COLORS.EXTRA_COLOR_ACTIVE}: var(${BLUE_GREY[100]});
      ${COLORS.EXTRA_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.EXTRA_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.EXTRA_COLOR_DISABLED}: var(${WHITE_ALFA[24]});

      ${COLORS.ALARM_FILL}: var(${GREY[0]});
      ${COLORS.ALARM_BG}: var(${PRESET.BERRY_RED_1});
      ${COLORS.ALARM_COLOR}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_BG_HOVER}: var(${PRESET.BERRY_RED_2});
      ${COLORS.ALARM_COLOR_HOVER}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_BG_ACTIVE}: var(${PRESET.BERRY_RED_3});
      ${COLORS.ALARM_COLOR_ACTIVE}: var(${GREY[0]});
      ${COLORS.ALARM_FILL_DISABLED}: var(${WHITE_ALFA[24]});
      ${COLORS.ALARM_BG_DISABLED}: var(${WHITE_ALFA[16]});
      ${COLORS.ALARM_COLOR_DISABLED}: var(${WHITE_ALFA[24]});
    }
  }
`;
