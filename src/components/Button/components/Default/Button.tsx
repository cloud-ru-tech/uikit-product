import React from 'react';
import { TButtonSize, TButtonVariant } from 'components/Button/helpers/types';
import { ButtonSize, ButtonVariant } from 'components/Button/helpers/constants';
import { ButtonComponent, IconWrap } from './styled';

interface IButtonCustomProps {
  rounded?: boolean;
  className?: string;
  disabled?: boolean;
  variant?: TButtonVariant;
  icon?: React.ReactNode;
  size?: TButtonSize;
  children?: React.ReactNode;
  iconPosition?: 'before' | 'after';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type IButtonProps = IButtonCustomProps &
  React.ComponentProps<typeof ButtonComponent>;

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
}: IButtonProps) => (
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
  variant: ButtonVariant.filled,
  size: ButtonSize.m,
  className: '',
};
