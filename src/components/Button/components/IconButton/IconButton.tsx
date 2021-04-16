import { Wrapper } from './styled';

export const ICON_BUTTON_VARIANT = {
  BLUE: 'blue',
  WHITE: 'white',
  HEADER: 'header',
  HEADER_MENU: 'header-menu',
  SIDEBAR: 'sidebar',
} as const;

interface OnlyIconButtonProps {
  variant?: typeof ICON_BUTTON_VARIANT[keyof typeof ICON_BUTTON_VARIANT];
}

export type IconButtonProps = OnlyIconButtonProps &
  React.ComponentProps<typeof Wrapper>;

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant,
  ...rest
}) => (
  <Wrapper data-variant={variant} {...rest}>
    {children}
  </Wrapper>
);
