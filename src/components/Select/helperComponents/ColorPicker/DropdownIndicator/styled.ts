import { styled } from '@linaria/react';
import { components as ReactSelectComponents } from 'react-select';

import { Tag } from 'components/Tag';

export const StyledDropdown = styled(ReactSelectComponents.DropdownIndicator)`
  padding: 0 !important;
`;

export const StyledTag = styled(Tag)`
  padding: 0;
  min-width: 20px;
  width: 20px;
  height: 20px;
`;
