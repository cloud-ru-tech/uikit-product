import { Container, ContainerItem } from './styled';

export interface TooltipMenuPrivateProps {
  className?: string;
}

export const TooltipMenuPrivate: React.FC<TooltipMenuPrivateProps> = props => {
  const { children, className, ...otherProps } = props;

  return (
    <Container className={className} {...otherProps}>
      <ContainerItem>{children}</ContainerItem>
    </Container>
  );
};
