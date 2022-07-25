import { ReactNode } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { WithSupportProps, extractSupportProps, warning } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

enum AlertTypes {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
  Neutral = 'Neutral',
  Loading = 'Loading',
}

enum AlertVariants {
  Primary = 'Primary',
  Accent = 'Accent',
}

const PredefinedIconsMap = {
  [AlertTypes.Success]: PredefinedIconsPrivate.icons.Success,
  [AlertTypes.Warning]: PredefinedIconsPrivate.icons.AttentionWarning,
  [AlertTypes.Neutral]: PredefinedIconsPrivate.icons.Info,
  [AlertTypes.Error]: PredefinedIconsPrivate.icons.Failed,
  [AlertTypes.Loading]: PredefinedIconsPrivate.icons.Loading,
};

export type AlertProps = WithSupportProps<{
  type: AlertTypes;
  description: ReactNode;
  className?: string;
  title?: string;
  onClose?(): void;
  variant: AlertVariants;
}>;

export function Alert({
  type,
  className,
  title,
  description,
  onClose,
  variant = AlertVariants.Primary,
  ...rest
}: AlertProps) {
  warning((title?.length || 0) > 30, 'Title is too long');

  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)} data-type={type} data-variant={variant}>
      <PredefinedIconsPrivate icon={PredefinedIconsMap[type]} />
      <S.Content data-test-id='alert__content'>
        {Boolean(title) && <S.Title data-test-id='alert__content-title'>{title}</S.Title>}
        <S.Description data-type={type} data-test-id='alert__content-description'>
          {description}
        </S.Description>
      </S.Content>
      {Boolean(onClose) && (
        <ButtonIcon
          variant={ButtonIcon.variants.Strong}
          icon={<CloseInterfaceSVG />}
          onClick={onClose}
          data-test-id='alert__close-button'
        />
      )}
    </S.Wrapper>
  );
}

Alert.types = AlertTypes;
Alert.variants = AlertVariants;
