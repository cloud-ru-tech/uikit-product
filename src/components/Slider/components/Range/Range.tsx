import { Range as RcRange } from 'rc-slider';

import { sliderStyles, TGeneralProps } from '../Default/Slider';

import 'rc-slider/assets/index.css';

export type TRangeProps = TGeneralProps & {
  value?: number[];
  step?: number;
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
  onBeforeChange?: (value: number[]) => void;
  onAfterChange?: (value: number[]) => void;
};

export const Range: React.FC<TRangeProps> = props => (
  <RcRange className={sliderStyles} {...props} />
);
