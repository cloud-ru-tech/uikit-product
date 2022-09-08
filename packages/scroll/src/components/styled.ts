import { css } from '@linaria/core';

import { Sizes, Variants } from './constants';
import { GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME, SCROLL_COLORS } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const scrollClassName = css`
  box-sizing: border-box;

  width: 100%;
  height: 100%;

  & > .os-scrollbar.os-scrollbar-vertical {
    width: auto;
    padding: 4px;
  }

  & > .os-scrollbar.os-scrollbar-horizontal {
    height: auto;
    padding: 4px;
  }

  & > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
    border-radius: 8px;
    opacity: 0.5;
  }

  &[data-variant=${Variants.Primary}] {
    & > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
      background-color: var(${SCROLL_COLORS.background.primary});
    }
  }

  &[data-variant=${Variants.OnDark}] {
    & > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
      background-color: var(${SCROLL_COLORS.background.dark});
    }
  }

  &[data-size=${Sizes.Small}] {
    & > .os-scrollbar-corner {
      width: 12px;
      height: 12px;
    }

    & > .os-scrollbar.os-scrollbar-vertical > .os-scrollbar-track,
    & > .os-scrollbar.os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {
      width: 4px;
    }

    & > .os-scrollbar.os-scrollbar-horizontal > .os-scrollbar-track,
    & > .os-scrollbar.os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {
      height: 4px;
    }
  }

  &[data-size=${Sizes.Medium}] {
    & > .os-scrollbar-corner {
      width: 14px;
      height: 14px;
    }

    & > .os-scrollbar.os-scrollbar-vertical > .os-scrollbar-track,
    & > .os-scrollbar.os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle {
      width: 6px;
    }

    & > .os-scrollbar.os-scrollbar-horizontal > .os-scrollbar-track,
    & > .os-scrollbar.os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle {
      height: 6px;
    }
  }
`;
