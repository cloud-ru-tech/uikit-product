import { MouseEvent, ReactNode, VFC } from 'react';

import * as S from './styled';

export type TooltipMenuItemPrivateProps = {
  className?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

export const TooltipMenuItemPrivate: VFC<TooltipMenuItemPrivateProps> = S.TooltipMenuItemPrivate;
