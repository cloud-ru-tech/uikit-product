import { ComponentProps, forwardRef } from 'react';

import {
  EyeOpenedInterfaceSVG,
  PauseInterfaceSVG,
  PlayInterfaceSVG,
  StopInterfaceSVG,
} from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { LoadingIcon } from '../../helperComponents';
import { Texts, extractCommonButtonProps, textProvider } from '../../helpers';
import { withManagedLoading, withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { TEXTS_BY_VARIANT, Variant } from './constants';
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

const ButtonTableIconWithTooltip = withTooltip(ButtonTableIconBase);

const ButtonTableIconWithTooltipPredefined = (props: ComponentProps<typeof ButtonTableIconWithTooltip>) => {
  const { code: language } = useLanguage({ onlyEnabledLanguage: true });
  return (
    <ButtonTableIconWithTooltip
      tooltip={
        props.loading
          ? textProvider(language, Texts.loading)
          : textProvider(language, TEXTS_BY_VARIANT[props.variant || Variant.Play])
      }
      {...props}
    />
  );
};

ButtonTableIconWithTooltipPredefined.placements = ButtonTableIconWithTooltip.placements;

export const ButtonTableIcon = ButtonTableIconWithTooltipPredefined as typeof ButtonTableIconWithTooltipPredefined & {
  variants: typeof Variant;
};

ButtonTableIcon.variants = Variant;

export const ButtonTableIconManagedLoading = withManagedLoading(ButtonTableIcon);
