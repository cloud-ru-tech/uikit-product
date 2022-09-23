import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

export const LABEL_COLORS = {
  text: {
    default: '--color__navigation__header-project-selector-group-list-item-label__text__default',
  },
};

export const PURPLE_THEME = css`
  :global() {
    body[data-theme=${Themes.Purple}] {
      ${LABEL_COLORS.text.default}: #a0a0a0;
    }
  }
`;

export const PURPLE_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}] {
      ${LABEL_COLORS.text.default}: ${EXPORT_VARS.GREY[800]};
    }
  }
`;

export const GREEN_THEME = css`
  :global() {
    body[data-theme=${Themes.Green}] {
      ${LABEL_COLORS.text.default}: #a0a0a0;
    }
  }
`;

export const GREEN_DARK_THEME = css`
  :global() {
    body[data-theme=${Themes.GreenDark}] {
      ${LABEL_COLORS.text.default}: ${EXPORT_VARS.GREY[800]};
    }
  }
`;
