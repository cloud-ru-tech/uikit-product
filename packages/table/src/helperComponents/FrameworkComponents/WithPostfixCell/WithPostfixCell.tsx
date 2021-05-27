import { FC } from 'react';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const WithPostfixCell: FC<TableBasicTypes.ICellRendererParams & { postfix: React.ReactNode }> = ({
  value,
  postfix,
}) => (
  <S.Container>
    <div>{value}</div>
    <div>{postfix}</div>
  </S.Container>
);
