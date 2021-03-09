import { styled } from '@linaria/react';

export const StyledAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--brand-lightGray-color);
  color: var(--brand-darkGray-color);

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
