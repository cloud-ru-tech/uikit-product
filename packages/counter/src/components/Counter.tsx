import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import { CounterType, Variant } from './constants';
import * as S from './styled';
import { CounterProps } from './types';

function StylelessCounter({
  value,
  className,
  type = CounterType.Count,
  variant = Variant.Primary,
  ...rest
}: CounterProps) {
  return (
    <span className={className} data-type={type} data-variant={variant} {...extractSupportProps(rest)}>
      {value}
    </span>
  );
}

const StyledCounter = S.styledCounter(StylelessCounter);

export const Counter = StyledCounter as typeof StyledCounter & {
  types: typeof CounterType;
  variants: typeof Variant;
};

Counter.types = CounterType;
Counter.variants = Variant;

export type { CounterType, CounterProps };
