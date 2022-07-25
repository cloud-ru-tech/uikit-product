import { ReactNode } from 'react';

import { ButtonIcon, ButtonRound, ButtonRoundProps } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

enum AlertBannerTypes {
  Alarm = 'Alarm',
  Warning = 'Warning',
  Neutral = 'Neutral',
}

const PredefinedIconMap = {
  [AlertBannerTypes.Alarm]: PredefinedIconsPrivate.icons.AttentionCritical,
  [AlertBannerTypes.Warning]: PredefinedIconsPrivate.icons.AttentionWarning,
  [AlertBannerTypes.Neutral]: PredefinedIconsPrivate.icons.Info,
};

export type AlertBannerProps = WithSupportProps<{
  type: AlertBannerTypes;
  description: ReactNode;
  title?: string;
  className?: string;
  buttonProps?: Omit<ButtonRoundProps, 'variant'>;
  onClose?(): void;
}>;

export function AlertBanner({ className, onClose, type, title, description, buttonProps, ...rest }: AlertBannerProps) {
  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      <PredefinedIconsPrivate icon={PredefinedIconMap[type]} variant={PredefinedIconsPrivate.variants.OnDark} />
      <S.Content data-test-id='alert-banner__content'>
        {Boolean(title) && <S.Title data-test-id='alert-banner__content-title'>{title}</S.Title>}
        <S.Description data-type={type} data-test-id='alert-banner__content-title'>
          {description}
        </S.Description>
      </S.Content>
      {Boolean(buttonProps) && (
        <ButtonRound
          variant={ButtonRound.variants.Filled}
          {...buttonProps}
          data-test-id='alert-banner__action-button'
        />
      )}
      {Boolean(onClose) && (
        <S.CloseButton
          variant={ButtonIcon.variants.OnAccent}
          icon={<CloseInterfaceSVG />}
          onClick={onClose}
          data-test-id='alert-banner__close-button'
        />
      )}
    </S.Wrapper>
  );
}

AlertBanner.types = AlertBannerTypes;
