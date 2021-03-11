import { memo, FC } from 'react';

import { TooltipWrapper } from './styled';

export interface ITooltipMenuItemProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const TooltipMenuItem: FC<ITooltipMenuItemProps> = memo(
  function TooltipMenuItem(props) {
    const { children, ...otherProps } = props;

    return <TooltipWrapper {...otherProps}>{children}</TooltipWrapper>;
  },
);
