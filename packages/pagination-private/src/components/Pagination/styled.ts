import { styled } from '@linaria/react';

export const ItemList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const EntryItem = styled.li`
  & + & {
    margin-left: 4px;
  }
`;

export const ArrowItem = styled.li`
  margin: 0 8px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;
