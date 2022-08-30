import { styled } from '@linaria/react';

import { SimpleInput } from '../Simple';
import { Input } from '../Simple/styled';

export const StyledSimpleInput = styled(SimpleInput)`
  ${Input} {
    letter-spacing: 1px;
  }
`;
