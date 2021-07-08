import { memo } from 'react';
import { Ref } from 'react-popper-tooltip';

import { Container, ContainerItem } from './styled';

export interface TooltipMenuPrivateProps {
  tooltipRef?: Ref;
  className?: string;
}

export const TooltipMenuPrivate: React.FC<TooltipMenuPrivateProps> = memo(function TooltipMenu(props) {
  const { children, className, ...otherProps } = props;

  return (
    <Container className={className} {...otherProps}>
      <ContainerItem>{children}</ContainerItem>
    </Container>
  );
});
