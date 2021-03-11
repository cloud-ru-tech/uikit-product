import { TableText } from 'typography/Table';
import { getSize, getBorderSize } from 'components/Spin/helpers/helpers';
import { SIZES } from 'components/Spin/helpers/constants';

import { Wrapper, Spinner, textCSS } from './styled';

export interface ISpinDefaultProps {
  size?: keyof typeof SIZES | number;
  borderSize?: number;
  reverse?: boolean;
  text?: string;
  className?: string;
  wrapperClassName?: string;
}

export const Spin: React.FC<ISpinDefaultProps> = ({
  size = 'medium',
  borderSize,
  className,
  reverse,
  wrapperClassName,
  text,
}) => (
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
