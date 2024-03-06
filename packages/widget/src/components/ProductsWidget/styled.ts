import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  grid-column: span 12;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
