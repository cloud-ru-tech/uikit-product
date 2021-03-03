import React from 'react';
import { TableText } from 'typography/Table';
import { Wrapper, Spinner, textCSS } from './styled';

export const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const DEFAULT_SIZE = {
  [SIZES.small]: 28,
  [SIZES.medium]: 68,
  [SIZES.large]: 100,
};

const DEFAULT_BORDER_SIZE = {
  [SIZES.small]: 2,
  [SIZES.medium]: 4,
  [SIZES.large]: 8,
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
  if (typeof size === 'number') {
    return size;
  }
  return (size && DEFAULT_SIZE[size]) || DEFAULT_SIZE[SIZES.medium];
};

const getBorderSize = (
  size: ISpinDefaultProps['size'],
  borderSize: ISpinDefaultProps['borderSize'],
) => {
  if (borderSize) {
    return borderSize;
  }

  return (
    (size && DEFAULT_BORDER_SIZE[size]) || DEFAULT_BORDER_SIZE[SIZES.medium]
  );
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
