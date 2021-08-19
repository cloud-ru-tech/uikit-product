import { styled } from '@linaria/react';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px 0;
`;

export const Title = styled.div`
  text-align: left;
  flex-grow: 1;
  font-size: 20px;
  line-height: 26px;

  &::first-letter {
    text-transform: uppercase;
  }
`;
