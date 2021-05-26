import 'rc-slider/assets/index.css';

import { RangeProps, Range as RcRange } from 'rc-slider';

import { rangeStyles } from './styled';

export type IRangeProps = RangeProps;

export const Range: React.FC<IRangeProps> = props => <RcRange className={rangeStyles} {...props} />;
