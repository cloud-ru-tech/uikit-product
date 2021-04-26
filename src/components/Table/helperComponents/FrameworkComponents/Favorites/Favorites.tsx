import { FC, useCallback } from 'react';

import { FavSVG, FavFilledSVG } from '@sbercloud/icons';

import { TableBasicTypes } from 'components/Table/helpers/types';

import * as S from './styled';

export const Favorites: FC<TableBasicTypes.ICellRendererParams> = ({
  value = false,
  setValue,
}) => {
  const handleClick = useCallback(() => {
    setValue(!value);
  }, [setValue, value]);
  return (
    <S.Container>
      {value ? (
        <FavFilledSVG className={S.favClassName} onClick={handleClick} />
      ) : (
        <FavSVG className={S.favFilledClassName} onClick={handleClick} />
      )}
    </S.Container>
  );
};
