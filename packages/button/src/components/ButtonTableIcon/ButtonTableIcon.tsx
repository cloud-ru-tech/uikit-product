import { ComponentProps } from 'react';

import {
  CommonButtonProps,
  extractCommonButtonProps,
  withManagedLoading,
  withTooltip,
} from '@sbercloud/uikit-react-button-private';
import {
  EyeOpenedInterfaceSVG,
  PauseInterfaceSVG,
  PlayInterfaceSVG,
  RefreshInterfaceSVG,
  StopInterfaceSVG,
} from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { LoadingIcon } from '../../helperComponents';
import { Texts, textProvider } from '../../helpers';
import { TEXTS_BY_VARIANT, Variant } from './constants';
import * as S from './styled';

export type ButtonTableIconProps = CommonButtonProps & {
  variant?: Variant;
  loading?: boolean;
};

const Icons = {
  [Variant.Pause]: <PauseInterfaceSVG />,
  [Variant.Stop]: <StopInterfaceSVG />,
  [Variant.Refresh]: <RefreshInterfaceSVG />,
  [Variant.Play]: <PlayInterfaceSVG />,
  [Variant.View]: <EyeOpenedInterfaceSVG />,
};

const ButtonTableIconBase = ({ variant = Variant.Play, loading, className, ...rest }: ButtonTableIconProps) => (
  <S.StyledButtonPrivate className={className} data-loading={loading || undefined} {...extractCommonButtonProps(rest)}>
    {loading && <LoadingIcon />}
    {!loading && Icons[variant]}
  </S.StyledButtonPrivate>
);

const ButtonTableIconWithTooltip = withTooltip(ButtonTableIconBase);

const ButtonTableIconWithTooltipPredefined = (props: ComponentProps<typeof ButtonTableIconWithTooltip>) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  return (
    <ButtonTableIconWithTooltip
      tooltip={{
        content: props.loading
          ? textProvider(languageCode, Texts.Loading)
          : textProvider(languageCode, TEXTS_BY_VARIANT[props.variant || Variant.Play]),
      }}
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
