import { ComponentProps, PropsWithChildren, forwardRef } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconProps = WithSupportProps<
  PropsWithChildren<
    Pick<ComponentProps<typeof S.Button>, 'className' | 'type' | 'disabled' | 'onClick' | 'title'> & {
      variant?: Variant;
    }
  >
>;

const ButtonIconBase = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ children, className, type = 'button', disabled, onClick, title, variant = Variant.Weak, ...rest }, ref) => (
    <S.Button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      data-variant={variant}
      ref={ref}
      {...extractSupportProps(rest)}
    >
      {children}
    </S.Button>
  ),
);

export const ButtonIcon = ButtonIconBase as typeof ButtonIconBase & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
