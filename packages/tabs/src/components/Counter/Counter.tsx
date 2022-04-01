import { CounterTypes } from '../../helpers/types';
import { styledCounter } from './styled';
import { CounterProps } from './types';

function StylelessCounter({ value, className, type = CounterTypes.Count, ...rest }: CounterProps) {
  return (
    <span className={className} data-type={type} {...rest}>
      {value}
    </span>
  );
}
export const Counter = styledCounter(StylelessCounter);

export type { CounterProps };
