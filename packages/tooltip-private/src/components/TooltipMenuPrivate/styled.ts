import { styled } from '@linaria/react';
import { VFC } from 'react';

import { TooltipMenuPrivateProps } from './types';

export const styledTooltipMenuPrivate = (
  TooltipMenuPrivate: VFC<TooltipMenuPrivateProps>,
): VFC<TooltipMenuPrivateProps> => styled(TooltipMenuPrivate)`
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

export const ContainerItem = styled.ul`
  padding: 4px 0;
  margin: 0;
`;
