import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

export const COLORS = {
  GREEN_BG: '--color-marker-background-green',
  BLUE_BG: '--color-marker-background-blue',
  RED_BG: '--color-marker-background-red',

  GREEN_COLOR: '--color-marker-color-green',
  BLUE_COLOR: '--color-marker-color-blue',
  RED_COLOR: '--color-marker-color-red',

  GREEN_BORDER: '--color-marker-border-green',
  BLUE_BORDER: '--color-marker-border-blue',
  RED_BORDER: '--color-marker-border-red',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.PRESET.GRACE_2_ALPHA});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.PRESET.GRACE_6_ALPHA});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.PRESET.GRACE_15_ALPHA});

      ${COLORS.GREEN_BORDER}: transparent;
      ${COLORS.BLUE_BORDER}: transparent;
      ${COLORS.RED_BORDER}: transparent;

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_2});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_6});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_15});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.PRESET.GRACE_2_ALPHA});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.PRESET.GRACE_6_ALPHA});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.PRESET.GRACE_15_ALPHA});

      ${COLORS.GREEN_BORDER}: transparent;
      ${COLORS.BLUE_BORDER}: transparent;
      ${COLORS.RED_BORDER}: transparent;

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_2});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_6});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_15});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.PRESET.GRACE_2_ALPHA});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.PRESET.GRACE_6_ALPHA});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.PRESET.GRACE_15_ALPHA});

      ${COLORS.GREEN_BORDER}: var(${EXPORT_VARS.PRESET.GRACE_2});
      ${COLORS.BLUE_BORDER}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_BORDER}: var(${EXPORT_VARS.PRESET.GRACE_15});

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_2});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_15});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.PRESET.GRACE_2_ALPHA});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.PRESET.GRACE_6_ALPHA});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.PRESET.GRACE_15_ALPHA});

      ${COLORS.GREEN_BORDER}: var(${EXPORT_VARS.PRESET.GRACE_2});
      ${COLORS.BLUE_BORDER}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_BORDER}: var(${EXPORT_VARS.PRESET.GRACE_15});

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_2});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.PRESET.GRACE_15});
    }
  }
`;
