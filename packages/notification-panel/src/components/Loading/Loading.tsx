import { Spinner } from '@sbercloud/uikit-product-spinner';

import * as S from './styled';

export function Loading() {
  return (
    <S.Wrapper>
      <Spinner size={Spinner.sizes.Small} />
    </S.Wrapper>
  );
}
