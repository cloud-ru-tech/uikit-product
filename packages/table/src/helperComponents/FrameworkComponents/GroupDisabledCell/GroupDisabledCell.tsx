import { FC } from 'react';

import { RadioCheckedInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const GroupDisabledCell: FC<TableBasicTypes.ICellRendererParams> = ({ value, data }) => {
  const { disabled } = data;

  if (!disabled) {
    return <div>{value}</div>;
  }

  return (
    <S.CellBox>
      <RadioCheckedInterfaceSVG className={S.radioCheckedClassName} />
      {value}
    </S.CellBox>
  );
};
