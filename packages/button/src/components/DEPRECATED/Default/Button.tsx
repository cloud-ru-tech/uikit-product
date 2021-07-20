import React from 'react';

import { ButtonSize, ButtonVariant } from '../../../helpers/constants';
import { ButtonComponent, IconWrap } from './styled';

interface IButtonCustomProps {
  rounded?: boolean;
  className?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  size?: ButtonSize;
  children?: React.ReactNode;
  iconPosition?: 'before' | 'after';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type ButtonProps = IButtonCustomProps & React.ComponentProps<typeof ButtonComponent>;

export const Button = ({
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
}: ButtonProps) => (
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

Button.variants = ButtonVariant;
Button.sizes = ButtonSize;
Button.defaultProps = {
  variant: ButtonVariant.Filled,
  size: ButtonSize.m,
  className: '',
};
