import { styled } from '@linaria/react';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

export const ValueContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;
