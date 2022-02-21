import { styled } from '@linaria/react';

import { StatusBadge } from '../StatusBadge';

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

export const StyledStatusBadge = styled(StatusBadge)`
  position: absolute;
  right: -1px;
  bottom: -1px;
`;
