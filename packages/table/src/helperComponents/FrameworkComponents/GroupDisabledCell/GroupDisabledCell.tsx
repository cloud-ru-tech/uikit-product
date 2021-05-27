import { FC } from 'react';

import { RadioCheckedSVG } from '@sbercloud/icons';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const GroupDisabledCell: FC<TableBasicTypes.ICellRendererParams> = ({ value, data }) => {
  const { disabled } = data;

  if (!disabled) {
    return <div>{value}</div>;
  }

  return (
    <S.CellBox>
      <RadioCheckedSVG className={S.radioCheckedClassName} />
      {value}
    </S.CellBox>
  );
};
