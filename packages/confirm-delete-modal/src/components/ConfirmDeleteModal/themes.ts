import { css } from '@linaria/core';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

const { GREY } = EXPORT_VARS;

export const COLORS = {
  text: '--color__copy_value_confirm-delete-modal-text',
};

export const LIGHT_THEMES = css`
  :global() {
    body[data-theme=${Themes.Purple}],
    body[data-theme=${Themes.Green}] {
      ${COLORS.text}: var(${GREY[600]});
    }
  }
`;

export const DARK_THEMES = css`
  :global() {
    body[data-theme=${Themes.PurpleDark}],
    body[data-theme=${Themes.GreenDark}] {
      ${COLORS.text}: var(${GREY[500]});
    }
  }
`;
