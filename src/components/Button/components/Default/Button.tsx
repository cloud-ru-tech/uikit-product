import { TButtonTypes } from './types';
import { ButtonComponent, IconWrap } from './styled';

export interface IButtonProps {
  rounded?: boolean;
  className?: string;
  disabled?: boolean;
  type?: TButtonTypes;
  icon?: React.ReactNode;
  size?: 'xs' | 's' | 'm';
  children?: React.ReactNode;
  iconPosition?: 'before' | 'after';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<IButtonProps> = ({
  size,
  type,
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
    type='button'
    data-size={size}
    data-type={type}
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
  type: 'filled',
  size: 'm',
  className: '',
};
