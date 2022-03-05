import { ContainerItem, styledTooltipMenuPrivate } from './styled';
import { TooltipMenuPrivateProps } from './types';

function StylelessTooltipMenuPrivate(props: TooltipMenuPrivateProps) {
  const { children, className, ...otherProps } = props;

  return (
    <nav className={className} {...otherProps}>
      <ContainerItem>{children}</ContainerItem>
    </nav>
  );
}

export type { TooltipMenuPrivateProps };

export const TooltipMenuPrivate = styledTooltipMenuPrivate(StylelessTooltipMenuPrivate);
