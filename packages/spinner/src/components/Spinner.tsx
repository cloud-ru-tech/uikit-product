import { ReactNode, useMemo } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { SizePropsMap, Sizes } from './constants';
import { Spin, Text, Wrapper } from './styled';

export type SpinnerProps = {
  size?: Sizes;
  text?: ReactNode;
  className?: string;
};

export function Spinner({ size = Sizes.Medium, text, className, ...rest }: WithSupportProps<SpinnerProps>) {
  const { side, thickness, padding } = useMemo(() => SizePropsMap[size], [size]);
  return (
    <Wrapper side={side} className={className} {...extractSupportProps(rest)}>
      <Spin side={side} thickness={thickness} />
      {text && <Text padding={padding}>{text}</Text>}
    </Wrapper>
  );
}

Spinner.sizes = Sizes;
