import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';
import { CounterProps, CounterType } from './types';

function StylelessCounter({ value, className, type = CounterType.Count, ...rest }: CounterProps) {
  return (
    <span className={className} data-type={type} {...extractSupportProps(rest)}>
      {value}
    </span>
  );
}

const StyledCounter = S.styledCounter(StylelessCounter);

export const Counter = StyledCounter as typeof StyledCounter & {
  types: typeof CounterType;
};

Counter.types = CounterType;

export type { CounterType, CounterProps };
