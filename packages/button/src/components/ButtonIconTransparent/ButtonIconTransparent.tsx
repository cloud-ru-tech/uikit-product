import { ComponentProps, PropsWithChildren, forwardRef } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconTransparentProps = WithSupportProps<
  PropsWithChildren<
    Pick<ComponentProps<typeof S.Button>, 'className' | 'type' | 'disabled' | 'onClick' | 'title'> & {
      variant?: Variant;
      rounded?: boolean;
    }
  >
>;

const ButtonIconTransparentBase = forwardRef<HTMLButtonElement, ButtonIconTransparentProps>(
  (
    { children, className, type = 'button', disabled, onClick, title, variant = Variant.Default, rounded, ...rest },
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
      ref={ref}
      {...extractSupportProps(rest)}
    >
      {children}
    </S.Button>
  ),
);

export const ButtonIconTransparent = ButtonIconTransparentBase as typeof ButtonIconTransparentBase & {
  variants: typeof Variant;
};

ButtonIconTransparent.variants = Variant;
