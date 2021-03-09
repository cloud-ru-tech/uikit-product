import RcSlider from 'rc-slider';
import { css } from '@linaria/core';

import 'rc-slider/assets/index.css';

export type TGeneralProps = {
  marks?: Record<
    number,
    | React.ReactNode
    | {
        style?: React.CSSProperties;
        label?: string;
      }
  >;
  min?: number;
  max?: number;
  dots?: boolean;
  className?: string;
};

export type TSliderProps = TGeneralProps & {
  value?: number;
  step?: number | null;
  onChange?: (value: number) => void;
  onBeforeChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
};

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

export const Slider: React.FC<TSliderProps> = props => (
  <RcSlider className={sliderStyles} {...props} />
);
