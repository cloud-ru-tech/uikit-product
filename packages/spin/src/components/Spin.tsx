import { TableText } from '@sbercloud/uikit-typography';

import { Sizes } from '../helpers/constants';
import { getBorderSize, getSize } from '../helpers/sizes';
import { Spinner, Wrapper, textCSS } from './styled';

export type SpinDefaultProps = {
  size?: Sizes | number;
  borderSize?: number;
  reverse?: boolean;
  text?: string;
  className?: string;
  wrapperClassName?: string;
};

export function Spin({
  size = Sizes.Medium,
  borderSize,
  className,
  reverse,
  wrapperClassName,
  text,
}: SpinDefaultProps) {
  return (
    <Wrapper className={wrapperClassName}>
      <Spinner
        size={getSize(size)}
        borderSize={getBorderSize(size, borderSize)}
        data-reverse={reverse}
        className={className}
      />
      {text && (
        <TableText className={textCSS} data-reverse={reverse}>
          {text}
        </TableText>
      )}
    </Wrapper>
  );
}

Spin.sizes = Sizes;
