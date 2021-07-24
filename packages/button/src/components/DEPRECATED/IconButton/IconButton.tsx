import { Wrapper } from './styled';

export enum IconButtonVariant {
  Blue = 'blue',
  White = 'white',
  Header = 'header',
  HeaderMenu = 'header-menu',
  Sidebar = 'sidebar',
  Popup = 'popup',
}

type OnlyIconButtonProps = {
  variant?: IconButtonVariant;
};

export type IconButtonProps = OnlyIconButtonProps & React.ComponentProps<typeof Wrapper>;

export function IconButton({ children, variant, ...rest }: IconButtonProps) {
  return (
    <Wrapper data-variant={variant} {...rest}>
      {children}
    </Wrapper>
  );
}

IconButton.variants = IconButtonVariant;
