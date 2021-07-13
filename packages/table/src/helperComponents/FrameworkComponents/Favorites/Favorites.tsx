import { FC, useCallback } from 'react';

import { FavouriteInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const Favorites: FC<TableBasicTypes.ICellRendererParams> = ({ value = false, setValue }) => {
  const handleClick = useCallback(() => {
    setValue?.(!value);
  }, [setValue, value]);
  return (
    <S.Container>
      <FavouriteInterfaceSVG className={value ? S.favFilledClassName : S.favClassName} onClick={handleClick} />
    </S.Container>
  );
};
