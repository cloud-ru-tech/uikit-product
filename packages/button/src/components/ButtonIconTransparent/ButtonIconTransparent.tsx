import { PropsWithChildren, forwardRef } from 'react';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconTransparentProps = PropsWithChildren<
  Pick<React.ComponentProps<typeof S.Button>, 'className' | 'type' | 'disabled' | 'onClick' | 'title'> & {
    variant?: Variant;
    rounded?: boolean;
    dataTestId?: string;
  }
>;

const ButtonIconTransparentBase = forwardRef<HTMLButtonElement, ButtonIconTransparentProps>(
  (
    { children, className, type = 'button', disabled, onClick, title, variant = Variant.Default, rounded, dataTestId },
    ref,
  ) => (
    <S.Button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      data-variant={variant}
      data-rounded={rounded || undefined}
      data-test-id={dataTestId}
      ref={ref}
    >
      {children}
    </S.Button>
  ),
);

export const ButtonIconTransparent = ButtonIconTransparentBase as typeof ButtonIconTransparentBase & {
  variants: typeof Variant;
};

ButtonIconTransparent.variants = Variant;
