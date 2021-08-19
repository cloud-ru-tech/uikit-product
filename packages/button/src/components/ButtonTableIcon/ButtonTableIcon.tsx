import { forwardRef } from 'react';

import {
  EyeOpenedInterfaceSVG,
  PauseInterfaceSVG,
  PlayInterfaceSVG,
  StopInterfaceSVG,
} from '@sbercloud/uikit-react-icons';

import { LoadingIcon } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withManagedLoading } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonTableIconProps = CommonButtonProps & {
  variant?: Variant;
  loading?: boolean;
};

const ButtonTableIconBase = forwardRef<HTMLButtonElement, ButtonTableIconProps>(
  ({ variant = Variant.Play, loading, ...rest }, ref) => (
    <S.Button data-loading={loading || undefined} ref={ref} {...extractCommonButtonProps(rest)}>
      {loading && <LoadingIcon />}
      {!loading && variant === Variant.Pause && <PauseInterfaceSVG />}
      {!loading && variant === Variant.Stop && <StopInterfaceSVG />}
      {!loading && variant === Variant.Play && <PlayInterfaceSVG />}
      {!loading && variant === Variant.View && <EyeOpenedInterfaceSVG />}
    </S.Button>
  ),
);

export const ButtonTableIcon = ButtonTableIconBase as typeof ButtonTableIconBase & {
  variants: typeof Variant;
};

ButtonTableIcon.variants = Variant;

export const ButtonTableIconManagedLoading = withManagedLoading(ButtonTableIcon);
