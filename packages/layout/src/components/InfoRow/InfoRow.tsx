import { ReactNode } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';

import * as S from './styled';

export type InfoRowProps = {
  label: ReactNode;
  value: ReactNode;
  topDivider?: boolean;
  bottomDivider?: boolean;
};

export function InfoRow({ label, value, topDivider = false, bottomDivider = false }: InfoRowProps) {
  return (
    <S.FieldWrapper>
      {topDivider && <Divider variant={Divider.variants.Secondary} />}
      <S.Field>
        <S.Label>{label}</S.Label>
        <S.Value>{value}</S.Value>
      </S.Field>
      {bottomDivider && <Divider variant={Divider.variants.Secondary} />}
    </S.FieldWrapper>
  );
}
