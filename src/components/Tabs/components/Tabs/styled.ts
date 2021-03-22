import { styled } from '@linaria/react';

export const GroupStyled = styled.ul`
  margin: 0 0 24px 0;
  display: flex;
  list-style-type: none;
  flex-direction: row;
  gap: 24px;
  padding: 0 0 0 24px;
  border-bottom: 1px solid #ededed;

  &[data-gray='true'] {
    border-bottom: 1px solid #d2d2d2;
  }
`;
