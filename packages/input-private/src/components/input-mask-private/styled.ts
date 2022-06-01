import { styled } from '@linaria/react';

import { SimpleInput } from '../simple';
import { Input } from '../simple/styled';

export const StyledSimpleInput = styled(SimpleInput)`
  ${Input} {
    letter-spacing: 1px;
  }
`;
