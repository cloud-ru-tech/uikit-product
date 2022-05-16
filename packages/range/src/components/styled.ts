import { css } from '@linaria/core';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { COLORS_SLIDER } = DEPRECATED_EXPORT_VARS;

export const rangeStyles = css`
  .rc-slider-handle-click-focused {
    border: none;
  }
  .rc-slider-handle-dragging {
    border: none !important;
    box-shadow: none !important;
  }
  .rc-slider-rail {
    background-color: var(${COLORS_SLIDER.INACTIVE_BG});
  }
  .rc-slider-track {
    background-color: var(${COLORS_SLIDER.BG});
  }
  .rc-slider-handle {
    border: none;
    background-color: var(${COLORS_SLIDER.BG});
  }
  .rc-slider-handle:active {
    box-shadow: none !important;
  }
  .rc-slider-dot-active {
    border: none;
    background-color: transparent;
  }
  .rc-slider-dot {
    border: none;
    background-color: transparent;
  }
  &:hover {
    .rc-slider-track {
      background-color: var(${COLORS_SLIDER.BG_HOVER});
    }
    .rc-slider-handle {
      background-color: var(${COLORS_SLIDER.BG_HOVER});
    }
  }
  &:active {
    .rc-slider-track {
      background-color: var(${COLORS_SLIDER.BG_ACTIVE});
    }
    .rc-slider-handle {
      background-color: var(${COLORS_SLIDER.BG_ACTIVE});
    }
  }
`;
