import React, { FC } from 'react';

import { TableBasicTypes } from 'components/Table/helpers/types';

import * as S from './styled';

export const WithPrefixCell: FC<
  TableBasicTypes.ICellRendererParams & { prefix: React.ReactNode }
> = ({ value, prefix }) => (
  <S.Container>
    <div>{prefix}</div>
    <S.ValueContainer>{value}</S.ValueContainer>
  </S.Container>
);
