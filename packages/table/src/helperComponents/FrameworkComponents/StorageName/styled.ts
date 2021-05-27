import { styled } from '@linaria/react';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ValueContainer = styled.div`
  padding-left: 8px;
  width: calc(100% - 28px);
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 28px;
`;
