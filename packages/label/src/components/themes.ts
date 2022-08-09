import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  GREEN_BG: '--color__label__background__green',
  BLUE_BG: '--color__label__background__blue',
  RED_BG: '--color__label__background__red',

  GREEN_COLOR: '--color__label__color__green',
  BLUE_COLOR: '--color__label__color__blue',
  RED_COLOR: '--color__label__color__red',

  GREEN_BORDER: '--color__label__border__green',
  BLUE_BORDER: '--color__label__border__blue',
  RED_BORDER: '--color__label__border__red',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.GRACE_ALPHA[2]});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.GRACE_ALPHA[6]});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.GRACE_ALPHA[15]});

      ${COLORS.GREEN_BORDER}: transparent;
      ${COLORS.BLUE_BORDER}: transparent;
      ${COLORS.RED_BORDER}: transparent;

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.GRACE[2]});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.GRACE[6]});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.GRACE[15]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.GRACE_ALPHA[2]});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.GRACE_ALPHA[6]});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.GRACE_ALPHA[15]});

      ${COLORS.GREEN_BORDER}: transparent;
      ${COLORS.BLUE_BORDER}: transparent;
      ${COLORS.RED_BORDER}: transparent;

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.GRACE[2]});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.GRACE[6]});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.GRACE[15]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.GRACE_ALPHA[2]});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.GRACE_ALPHA[6]});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.GRACE_ALPHA[15]});

      ${COLORS.GREEN_BORDER}: var(${EXPORT_VARS.GRACE[2]});
      ${COLORS.BLUE_BORDER}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_BORDER}: var(${EXPORT_VARS.GRACE[15]});

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.GRACE[2]});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.GRACE[15]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.GREEN_BG}: var(${EXPORT_VARS.GRACE_ALPHA[2]});
      ${COLORS.BLUE_BG}: var(${EXPORT_VARS.GRACE_ALPHA[6]});
      ${COLORS.RED_BG}: var(${EXPORT_VARS.GRACE_ALPHA[15]});

      ${COLORS.GREEN_BORDER}: var(${EXPORT_VARS.GRACE[2]});
      ${COLORS.BLUE_BORDER}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_BORDER}: var(${EXPORT_VARS.GRACE[15]});

      ${COLORS.GREEN_COLOR}: var(${EXPORT_VARS.GRACE[2]});
      ${COLORS.BLUE_COLOR}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.RED_COLOR}: var(${EXPORT_VARS.GRACE[15]});
    }
  }
`;
