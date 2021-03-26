import { css } from '@linaria/core';

import { COLORS_BUTTON } from 'theme/color/vars';

export const tableMenuButtonClassName = css`
  &[data-variant='transparent'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_COLOR});

    &:not(:disabled):hover {
      fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_HOVER_COLOR});
    }

    &:disabled {
      fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_DISABLED_COLOR});

      &:hover {
        fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_DISABLED_COLOR});
      }
    }

    &:active {
      fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_ACTIVE_COLOR});
    }

    &:hover {
      background-color: transparent;
    }
  }
`;
