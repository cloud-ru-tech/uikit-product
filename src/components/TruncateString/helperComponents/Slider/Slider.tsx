import RcSlider from 'rc-slider';

import { IGeneralProps } from 'components/TruncateString/helpers/types';

import 'rc-slider/assets/index.css';

import { sliderStyles } from './styled';

export interface ISliderProps extends IGeneralProps {
  value?: number;
  step?: number | null;
  onChange?: (value: number) => void;
  onBeforeChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
}

export const Slider: React.FC<ISliderProps> = props => (
  <RcSlider className={sliderStyles} {...props} />
);
