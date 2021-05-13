import { Range as RcRange, RangeProps } from 'rc-slider';

import { rangeStyles } from './styled';

import 'rc-slider/assets/index.css';

export interface IRangeProps extends RangeProps {}

export const Range: React.FC<IRangeProps> = props => (
  <RcRange className={rangeStyles} {...props} />
);
