import { CircleCancelFilledInterfaceSVG } from '@sbercloud/uikit-product-icons';

import * as S from './styled';

export function NoData() {
  return (
    <S.NoDataContainer key='noData'>
      <CircleCancelFilledInterfaceSVG />
      <S.NoDataText>Нет данных</S.NoDataText>
    </S.NoDataContainer>
  );
}
