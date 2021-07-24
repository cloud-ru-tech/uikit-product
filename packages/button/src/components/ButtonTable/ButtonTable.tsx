import { ComponentProps, PropsWithChildren, forwardRef } from 'react';

import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { LoadingIcon } from '../../helperComponents';
import { withManagedConnecting } from '../../hocs';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonTableProps = WithSupportProps<
  PropsWithChildren<Pick<ComponentProps<typeof S.Button>, 'className' | 'type' | 'disabled' | 'onClick' | 'title'>> & {
    variant?: Variant;
    connecting?: boolean;
  }
>;

const ButtonTableBase = forwardRef<HTMLButtonElement, ButtonTableProps>(
  (
    { children, className, type = 'button', disabled, onClick, title, variant = Variant.Fill, connecting, ...rest },
    ref,
  ) => (
    <S.Button
      className={className}
      type={type}
      disabled={disabled || connecting}
      onClick={onClick}
      title={title}
      data-variant={variant}
      data-connecting={connecting || undefined}
      ref={ref}
      {...extractSupportProps(rest)}
    >
      {children}
      <S.IconWrapper>{connecting ? <LoadingIcon /> : <CirclePlayFilledInterfaceSVG />}</S.IconWrapper>
    </S.Button>
  ),
);

export const ButtonTable = ButtonTableBase as typeof ButtonTableBase & {
  variants: typeof Variant;
};

ButtonTable.variants = Variant;

export const ButtonTableManagedConnecting = withManagedConnecting(ButtonTable);
