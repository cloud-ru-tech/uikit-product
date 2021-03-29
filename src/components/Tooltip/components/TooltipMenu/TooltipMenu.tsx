import { FC, memo } from 'react';
import { Ref } from 'react-popper-tooltip';

import { Container, ContainerItem } from './styled';

export interface ITooltipMenuProps {
  tooltipRef?: Ref;
  className?: string;
}

export const TooltipMenu: FC<ITooltipMenuProps> = memo(function TooltipMenu(
  props,
) {
  const { children, className, ...otherProps } = props;

  return (
    <Container className={className} {...otherProps}>
      <ContainerItem>{children}</ContainerItem>
    </Container>
  );
});
