import { ReactNode } from 'react';

import { Colors } from '../../../constants';
import { Box } from './styled';

type ColorBoxProps = {
  color: Colors;
  className?: string;
  children?: ReactNode;
};

export function ColorBox({ color, children, className }: ColorBoxProps) {
  return (
    <Box className={className} data-color={color}>
      {children}
    </Box>
  );
}
