import { Range as RcRange } from 'rc-slider';

import { IGeneralProps } from 'components/TruncateString/helpers/types';
import { sliderStyles } from 'components/TruncateString/helperComponents/Slider/styled';

import 'rc-slider/assets/index.css';

export interface IRangeProps extends IGeneralProps {
  value?: number[];
  step?: number;
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
  onBeforeChange?: (value: number[]) => void;
  onAfterChange?: (value: number[]) => void;
}

export const Range: React.FC<IRangeProps> = props => (
  <RcRange className={sliderStyles} {...props} />
);
