import { css } from '@linaria/core';

export const sliderStyles = css`
  .rc-slider-handle-click-focused {
    border: none;
  }
  .rc-slider-handle-dragging {
    border: none !important;
    box-shadow: none !important;
  }
  .rc-slider-track {
    background-color: #5558fa;
  }
  .rc-slider-handle {
    border: none;
    background-color: #5558fa;
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
`;
