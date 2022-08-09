import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  grid-area: header-project-selector;
  margin-right: 8px;
`;

export const List = styled.ul<{ scrollable?: boolean }>`
  margin: 0;
  overflow: ${props => (props.scrollable ? 'auto' : 'initial')};
  padding: 0;
`;
