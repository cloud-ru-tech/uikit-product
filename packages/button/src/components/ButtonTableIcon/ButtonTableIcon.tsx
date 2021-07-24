import { ComponentProps, forwardRef } from 'react';

import {
  EyeOpenedInterfaceSVG,
  PauseInterfaceSVG,
  PlayInterfaceSVG,
  StopInterfaceSVG,
} from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { LoadingIcon } from '../../helperComponents';
import { withManagedConnecting } from '../../hocs';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonTableIconProps = WithSupportProps<
  Pick<ComponentProps<typeof S.Button>, 'className' | 'type' | 'disabled' | 'onClick' | 'title'> & {
    variant?: Variant;
    connecting?: boolean;
  }
>;

const ButtonTableIconBase = forwardRef<HTMLButtonElement, ButtonTableIconProps>(
  ({ className, type = 'button', disabled, onClick, title, variant = Variant.Play, connecting, ...rest }, ref) => (
    <S.Button
      className={className}
      type={type}
      disabled={disabled || connecting}
      onClick={onClick}
      title={title}
      data-connecting={connecting || undefined}
      ref={ref}
      {...extractSupportProps(rest)}
    >
      {connecting && <LoadingIcon />}
      {!connecting && variant === Variant.Pause && <PauseInterfaceSVG />}
      {!connecting && variant === Variant.Stop && <StopInterfaceSVG />}
      {!connecting && variant === Variant.Play && <PlayInterfaceSVG />}
      {!connecting && variant === Variant.View && <EyeOpenedInterfaceSVG />}
    </S.Button>
  ),
);

export const ButtonTableIcon = ButtonTableIconBase as typeof ButtonTableIconBase & {
  variants: typeof Variant;
};

ButtonTableIcon.variants = Variant;

export const ButtonTableIconManagedConnecting = withManagedConnecting(ButtonTableIcon);
