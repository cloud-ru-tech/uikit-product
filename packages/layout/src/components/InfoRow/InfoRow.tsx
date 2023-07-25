import { ReactNode } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type InfoRowProps = WithSupportProps<{
  label: ReactNode;
  value: ReactNode;
  topDivider?: boolean;
  bottomDivider?: boolean;
  className?: string;
}>;

export function InfoRow({ label, value, topDivider = false, bottomDivider = false, className, ...rest }: InfoRowProps) {
  return (
    <S.FieldWrapper {...extractSupportProps(rest)} className={className}>
      {topDivider && <Divider variant={Divider.variants.Secondary} />}
      <S.Field>
        <S.Label>{label}</S.Label>
        <S.Value>{value}</S.Value>
      </S.Field>
      {bottomDivider && <Divider variant={Divider.variants.Secondary} />}
    </S.FieldWrapper>
  );
}
