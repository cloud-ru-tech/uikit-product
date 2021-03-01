import React from 'react';
import { ButtonComponent } from './styled';

export interface IButtonProps {
  type?: 'filled' | 'outlined' | 'transparent';
  size?: 'xs' | 's' | 'm';
  rounded?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  disabled,
  size,
  type,
  children,
  className,
  rounded = false,
  ...props
}) => (
  <ButtonComponent
    className={className}
    data-size={size}
    data-type={type}
    data-round={rounded}
    onClick={disabled ? undefined : onClick}
    type='button'
    disabled={disabled}
    {...props}
  >
    {children}
  </ButtonComponent>
);

Button.defaultProps = {
  type: 'filled',
  size: 'm',
  className: '',
};
