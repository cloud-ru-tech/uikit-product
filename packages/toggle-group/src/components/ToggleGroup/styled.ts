import { styled } from '@linaria/react';

import { Orientation } from '../../constants';

export const Group = styled.div<{ gap: number; breakpoint: number }>`
  display: grid;
  gap: ${({ gap }) => gap}px;

  &[data-orientation='${Orientation.Horizontal}'] {
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(${({ breakpoint }) => breakpoint}px, 1fr));
  }
`;
