import { Spinner } from '@sbercloud/uikit-product-spinner';

import * as S from './styled';

export function LoadingMessage() {
  return (
    <S.LoadingBox>
      <Spinner size={Spinner.sizes.Small} />
    </S.LoadingBox>
  );
}
