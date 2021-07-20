import { PropsWithChildren, forwardRef } from 'react';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconProps = PropsWithChildren<
  Pick<React.ComponentProps<typeof S.Button>, 'className' | 'type' | 'disabled' | 'onClick' | 'title'> & {
    variant?: Variant;
    dataTestId?: string;
  }
>;

const ButtonIconBase = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ children, className, type = 'button', disabled, onClick, title, variant = Variant.Weak, dataTestId }, ref) => (
    <S.Button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      data-variant={variant}
      data-test-id={dataTestId}
      ref={ref}
    >
      {children}
    </S.Button>
  ),
);

export const ButtonIcon = ButtonIconBase as typeof ButtonIconBase & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
