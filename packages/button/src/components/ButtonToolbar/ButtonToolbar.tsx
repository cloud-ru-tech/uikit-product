import { ComponentProps, PropsWithChildren, forwardRef } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import * as S from './styled';

export type ButtonToolbarProps = WithSupportProps<
  PropsWithChildren<Pick<ComponentProps<typeof S.Button>, 'className' | 'type' | 'disabled' | 'onClick' | 'title'>>
>;

export const ButtonToolbar = forwardRef<HTMLButtonElement, ButtonToolbarProps>(
  ({ children, className, type = 'button', disabled, onClick, title, ...rest }, ref) => (
    <S.Button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      ref={ref}
      {...extractSupportProps(rest)}
    >
      {children}
    </S.Button>
  ),
);
