import { styled } from '@linaria/react';
import { components as ReactSelectComponents } from 'react-select';

import { Tag } from 'components/Tag';

export const StyledOption = styled(ReactSelectComponents.Option)`
  flex-basis: 33.33%;
  background-color: transparent;
  line-height: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 4px !important;

  &:active {
    background: transparent;
  }
`;

export const StyledTag = styled(Tag)`
  padding: 0;
  min-width: 28px;
  width: 28px;
  height: 28px;
  border: 1px solid transparent;

  &:hover {
    border-color: #5558fa;
  }
`;
