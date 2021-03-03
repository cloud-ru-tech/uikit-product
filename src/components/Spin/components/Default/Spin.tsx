import { TableText } from 'typography/Table';
import { Wrapper, Spinner, textCSS } from './styled';

export const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export interface ISpinDefaultProps {
  size?: keyof typeof SIZES | number;
  borderSize?: number;
  reverse?: boolean;
  text?: string;
  className?: string;
  wrapperClassName?: string;
}

const getSize = (size: ISpinDefaultProps['size']): number => {
  switch (size) {
    case SIZES.small:
      return 28;

    case SIZES.medium:
      return 68;

    case SIZES.large:
      return 100;

    default:
      return (size as number) || 68;
  }
};

const getBorderSize = (
  size: ISpinDefaultProps['size'],
  borderSize: ISpinDefaultProps['borderSize'],
) => {
  if (borderSize) {
    return borderSize;
  }
  switch (size) {
    case SIZES.small:
      return 2;

    case SIZES.medium:
      return 4;

    case SIZES.large:
      return 8;

    default:
      return borderSize || 4;
  }
};

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
