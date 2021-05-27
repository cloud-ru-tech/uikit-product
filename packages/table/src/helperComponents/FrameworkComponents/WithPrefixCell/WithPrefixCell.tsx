import React, { FC } from 'react';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const WithPrefixCell: FC<TableBasicTypes.ICellRendererParams & { prefix: React.ReactNode }> = ({
  value,
  prefix,
}) => (
  <S.Container>
    <S.Prefix>{prefix}</S.Prefix>
    <S.ValueContainer>{value}</S.ValueContainer>
  </S.Container>
);
