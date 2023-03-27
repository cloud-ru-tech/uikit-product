import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TextVariant } from './constants';
import * as S from './styled';

export type TextProps = WithSupportProps<{
  children: ReactNode;
  variant?: TextVariant;
}>;

export function Text({ children, variant, ...rest }: TextProps) {
  if (variant === TextVariant.Primary) {
    return <S.PrimaryText {...extractSupportProps(rest)}>{children}</S.PrimaryText>;
  }

  if (variant === TextVariant.Secondary) {
    return <S.SecondaryText {...extractSupportProps(rest)}>{children}</S.SecondaryText>;
  }

  return <S.RegularText {...extractSupportProps(rest)}>{children}</S.RegularText>;
}

Text.variants = TextVariant;
