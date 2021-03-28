import { css } from '@linaria/core';

import { COLORS_SWITCH } from 'theme/color/vars';

export const switchClassNameDisabled = css``;

export const switchClassName = css`
  .react-switch-bg {
    background-color: transparent !important;
  }

  background-color: var(${COLORS_SWITCH.UNACTIVE_BG});

  &:not(.${switchClassNameDisabled}):hover {
      background-color: var(${COLORS_SWITCH.UNACTIVE_HOVER_BG});
    }
  }

  &.${switchClassNameDisabled} {
    background-color: var(${COLORS_SWITCH.UNACTIVE_DISABLED_BG});
  }
`;

export const switchClassNameChecked = css`
  background-color: var(${COLORS_SWITCH.ACTIVE_BG});

  &:not(.${switchClassNameDisabled}):hover {
    background-color: var(${COLORS_SWITCH.ACTIVE_HOVER_BG});
  }

  &.${switchClassNameDisabled} {
    opacity: 0.4 !important;
    background-color: var(${COLORS_SWITCH.ACTIVE_DISABLED_BG});
  }
}`;
