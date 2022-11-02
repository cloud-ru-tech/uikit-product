import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: '--color__error-pages__background__default',
  svgExclamationMark: '--color__error-pages__svg-exclamation-mark__default',
  svgStroke: '--color__error-pages__svg-stroke__default',
  svgBackground: '--color__error-pages__svg-background__default',
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme='${Themes.Purple}'] {
      ${COLORS.background}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.svgBackground}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.svgExclamationMark}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.svgStroke}: var(${EXPORT_VARS.GREY[250]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme='${Themes.Green}'] {
      ${COLORS.background}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.svgBackground}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.svgExclamationMark}: var(${EXPORT_VARS.GREEN[100]});
      ${COLORS.svgStroke}: var(${EXPORT_VARS.GREY[250]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.PurpleDark}'] {
      ${COLORS.background}: var(${EXPORT_VARS.GREY[850]});
      ${COLORS.svgBackground}: var(${EXPORT_VARS.GREY[850]});
      ${COLORS.svgExclamationMark}: var(${EXPORT_VARS.PURPLE[75]});
      ${COLORS.svgStroke}: var(${EXPORT_VARS.GREY[450]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme='${Themes.GreenDark}'] {
      ${COLORS.background}: var(${EXPORT_VARS.GREY[850]});
      ${COLORS.svgBackground}: var(${EXPORT_VARS.GREY[850]});
      ${COLORS.svgExclamationMark}: var(${EXPORT_VARS.GREEN[75]});
      ${COLORS.svgStroke}: var(${EXPORT_VARS.GREY[450]});
    }
  }
`;
