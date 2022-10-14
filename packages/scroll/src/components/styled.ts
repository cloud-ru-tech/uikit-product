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

  & > .os-scrollbar-corner.os-scrollbar-corner-resize {
    background-image: none;
    mask-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.37 15.784a.5.5 0 0 0 .708 0l.707-.707a.5.5 0 0 0-.707-.707l-.707.707a.5.5 0 0 0 0 .707Zm-9.313-.707a.5.5 0 1 0 .707.707l10.02-10.02a.5.5 0 0 0-.707-.707l-10.02 10.02Zm4.657.707a.5.5 0 0 0 .707 0l5.364-5.364a.5.5 0 0 0-.707-.707l-5.364 5.364a.5.5 0 0 0 0 .707Z' /%3E%3C/svg%3E%0A");
    mask-repeat: no-repeat;
    mask-position: 100% 100%;
    pointer-events: auto !important;
  }

  &[data-variant=${Variants.Primary}] {
    & > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
      background-color: var(${SCROLL_COLORS.background.primary});
    }

    & > .os-scrollbar-corner.os-scrollbar-corner-resize {
      background-color: var(${SCROLL_COLORS.resize.primary});
    }
  }

  &[data-variant=${Variants.OnDark}] {
    & > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
      background-color: var(${SCROLL_COLORS.background.dark});
    }

    & > .os-scrollbar-corner.os-scrollbar-corner-resize {
      background-color: var(${SCROLL_COLORS.resize.dark});
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
