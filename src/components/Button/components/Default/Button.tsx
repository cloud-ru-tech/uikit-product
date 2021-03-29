import { TButtonVariant } from 'components/Button/helpers/types';

import { ButtonComponent, IconWrap } from './styled';

interface IButtonCustomProps {
  rounded?: boolean;
  className?: string;
  disabled?: boolean;
  variant?: TButtonVariant;
  icon?: React.ReactNode;
  size?: 'xxs' | 'xs' | 's' | 'm';
  children?: React.ReactNode;
  iconPosition?: 'before' | 'after';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type IButtonProps = IButtonCustomProps &
  React.ComponentProps<typeof ButtonComponent>;

export const Button: React.FC<IButtonProps> = ({
  size,
  variant,
  icon,
  onClick,
  disabled,
  children,
  className,
  rounded = false,
  iconPosition = 'after',
  ...props
}) => (
  <ButtonComponent
    data-size={size}
    data-variant={variant}
    disabled={disabled}
    data-round={rounded}
    className={className}
    onClick={disabled ? undefined : onClick}
    {...props}
  >
    {icon && iconPosition === 'before' ? (
      <IconWrap position='before' setMargin={!!children}>
        {icon}
      </IconWrap>
    ) : null}
    {children}
    {icon && iconPosition === 'after' ? (
      <IconWrap position='after' setMargin={!!children}>
        {icon}
      </IconWrap>
    ) : null}
  </ButtonComponent>
);

Button.defaultProps = {
  variant: 'filled',
  size: 'm',
  className: '',
};
