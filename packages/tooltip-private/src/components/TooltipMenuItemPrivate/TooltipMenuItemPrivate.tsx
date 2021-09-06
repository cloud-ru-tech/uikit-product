import { TooltipWrapper } from './styled';

export interface TooltipMenuItemPrivateProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const TooltipMenuItemPrivate: React.FC<TooltipMenuItemPrivateProps> = props => {
  const { children, ...otherProps } = props;

  return <TooltipWrapper {...otherProps}>{children}</TooltipWrapper>;
};
