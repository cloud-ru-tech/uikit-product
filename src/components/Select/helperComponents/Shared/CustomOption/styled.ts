import { styled } from '@linaria/react';
import { components as ReactSelectComponents } from 'react-select';

export const StyledReactSelectOption = styled(ReactSelectComponents.Option)`
  outline: 0;
`;

export const StyledDescWrap = styled.div`
  margin: 0 10px;
  flex-grow: 1;
  overflow: hidden;
`;

export const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
