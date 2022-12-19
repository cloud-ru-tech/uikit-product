import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  display: flex;
  grid-area: header-toolbar;
  column-gap: 16px;
  align-items: center;
  justify-content: flex-end;

  &[data-mobile] {
    flex-direction: column;
    row-gap: 8px;
    column-gap: unset;
    align-items: flex-start;
  }
`;
