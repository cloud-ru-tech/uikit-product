import 'rc-slider/assets/index.css';

import { cx } from '@linaria/core';
import RcSlider, { SliderProps } from 'rc-slider';

import { sliderStyles } from './styled';

export type ISliderProps = SliderProps;

export const Slider: React.FC<ISliderProps> = props => {
  const { className } = props;
  return <RcSlider className={cx(sliderStyles, className)} {...props} />;
};
