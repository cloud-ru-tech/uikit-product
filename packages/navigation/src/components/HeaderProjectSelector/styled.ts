import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  grid-area: header-project-selector;
  margin-right: 8px;

  &[data-mobile] {
    margin: 8px 16px;
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
`;
