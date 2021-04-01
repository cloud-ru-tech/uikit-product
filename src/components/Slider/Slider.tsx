import RcSlider, { SliderProps } from 'rc-slider';
import { cx } from '@linaria/core';

import 'rc-slider/assets/index.css';

import { sliderStyles } from './styled';

export interface ISliderProps extends SliderProps {}

export const Slider: React.FC<ISliderProps> = props => {
  const { className } = props;
  return <RcSlider className={cx(sliderStyles, className)} {...props} />;
};
