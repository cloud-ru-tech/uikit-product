import { useMemo } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { SizePropsMap, Sizes } from './constants';
import { Spin, Text, Wrapper } from './styled';

export type SpinnerProps = WithSupportProps<{
  size?: Sizes;
  text?: string;
  className?: string;
}>;

export function Spinner({ size = Sizes.Medium, text, className, ...rest }: SpinnerProps) {
  const { side, thickness, padding } = useMemo(() => SizePropsMap[size], [size]);
  return (
    <Wrapper side={side} className={className} {...extractSupportProps(rest)}>
      <Spin side={side} thickness={thickness} />
      {text && (
        <Text data-test-id={'spinner__text'} padding={padding}>
          {text}
        </Text>
      )}
    </Wrapper>
  );
}

Spinner.sizes = Sizes;
