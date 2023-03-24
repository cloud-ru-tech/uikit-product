import { Divider as DividerInner } from '@sbercloud/uikit-product-divider';

import * as S from './styled';

export function Divider() {
  return (
    <S.Wrapper>
      <DividerInner variant={DividerInner.variants.Secondary} />
    </S.Wrapper>
  );
}
