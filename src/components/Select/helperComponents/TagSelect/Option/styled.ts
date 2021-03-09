import { styled } from '@linaria/react';
import { components as ReactSelectComponents } from 'react-select';

import { Tag } from 'components/Tag';
import { Button } from 'components/Button';
import { ColorPicker } from 'components/Select';

export const StyledTagOption = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledOption = styled(ReactSelectComponents.Option)`
  &[data-is-edit='true']: {
    background-color: #f5f5f5 !important;
  }
`;

export const StyledTag = styled(Tag)`
  padding: 0;
  margin: 0;
  flex-grow: 1;
  max-width: calc(100% - 94px);
`;

export const StyledTagButtonWrapper = styled.div`
  display: flex;
  line-height: 0;
  flex-shrink: 0;
`;

export const StyledTagButton = styled(Button)`
  fill: #d2d2d2;
  &:focus,
  &:hover {
    fill: #343f48;
  }
`;

export const StyledTagOptionLabel = styled(Tag)`
  margin-right: 12px;
`;

export const StyledColorPicker = styled(ColorPicker)`
  padding: 0 2px;
`;
