import { memo } from 'react';

import { TooltipWrapper } from './styled';

export interface TooltipMenuItemPrivateProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const TooltipMenuItemPrivate: React.FC<TooltipMenuItemPrivateProps> = memo(function TooltipMenuItem(props) {
  const { children, ...otherProps } = props;

  return <TooltipWrapper {...otherProps}>{children}</TooltipWrapper>;
});
