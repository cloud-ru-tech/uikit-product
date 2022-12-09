import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  align-items: center;
  column-gap: 16px;
  display: flex;
  grid-area: header-toolbar;
  justify-content: flex-end;

  &[data-mobile] {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 8px;
    column-gap: unset;
  }
`;
