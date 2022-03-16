import { styled } from '@linaria/react';

import { StatusDot } from '../StatusDot';

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

export const StyledStatusBadge = styled(StatusDot)`
  position: absolute;
  right: -1px;
  bottom: -1px;
`;
