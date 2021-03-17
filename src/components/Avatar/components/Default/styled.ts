import { styled } from '@linaria/react';

import { COLORS } from 'theme/color/vars';

export const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(${COLORS.GRAY_3});
  color: var(${COLORS.BLACK_2});

  &[data-size='m'] {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }

  &[data-size='l'] {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }

  &[data-shape='circle'] {
    border-radius: 90%;
  }

  &[data-shape='square'] {
    border-radius: 4px;
  }
`;
