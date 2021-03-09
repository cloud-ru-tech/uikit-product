import { styled } from '@linaria/react';

import { Button } from 'components/Button';

export const StyledButton = styled(Button)`
  width: 64px;
  color: #1b1b1b;

  &:hover {
    color: #5558fa;
  }
`;

export const StyledTagWrapper = styled.div`
  flex-grow: 1;
  margin: 0 12px;
  line-height: 0;
  text-align: left;
  width: calc(100% - 64px - 20px - 24px);
`;
