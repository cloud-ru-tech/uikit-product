import { FC, useCallback } from 'react';

import { FavFilledSVG } from '@sbercloud/icons';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const Favorites: FC<TableBasicTypes.ICellRendererParams> = ({ value = false, setValue }) => {
  const handleClick = useCallback(() => {
    setValue?.(!value);
  }, [setValue, value]);
  return (
    <S.Container>
      <FavFilledSVG className={value ? S.favFilledClassName : S.favClassName} onClick={handleClick} />
    </S.Container>
  );
};
