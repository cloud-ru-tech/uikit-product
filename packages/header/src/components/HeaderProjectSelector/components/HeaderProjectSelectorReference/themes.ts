import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const COLORS = {
  background: {
    default: '--color__navigation__header-project-selector-reference__background__default',
  },
  border: {
    default: '--color__navigation__header-project-selector-reference__border__default',
    hover: '--color__navigation__header-project-selector-reference__border__hover',
    open: '--color__navigation__header-project-selector-reference__border__open',
  },
  text: {
    default: '--color__navigation__header-project-selector-reference__text__default',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.border.default}: transparent;
      ${COLORS.border.hover}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.border.open}: var(${EXPORT_VARS.PURPLE[100]});
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.border.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.border.hover}: var(${EXPORT_VARS.PURPLE[25]});
      ${COLORS.border.open}: var(${EXPORT_VARS.PURPLE[50]});
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.GREY[0]});
      ${COLORS.border.default}: transparent;
      ${COLORS.border.hover}: var(${EXPORT_VARS.GREEN[50]});
      ${COLORS.border.open}: var(${EXPORT_VARS.GREEN[100]});
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[800]});
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.background.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.border.default}: var(${EXPORT_VARS.WHITE_ALFA[8]});
      ${COLORS.border.hover}: var(${EXPORT_VARS.GREEN[25]});
      ${COLORS.border.open}: var(${EXPORT_VARS.GREEN[50]});
      ${COLORS.text.default}: var(${EXPORT_VARS.GREY[0]});
    }
  }
`;
