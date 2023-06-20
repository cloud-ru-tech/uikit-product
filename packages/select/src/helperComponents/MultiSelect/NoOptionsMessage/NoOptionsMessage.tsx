import { useMemo } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../helpers/texts-provider';
import * as S from './styled';

export function NoOptionsMessage() {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const noDataText = useMemo(() => textProvider<string>(languageCode, Texts.NoData), [languageCode]);

  return (
    <S.ErrorBox>
      <S.CircleCancelFilledInterfaceSVGStyled />
      <S.Text2Grey>{noDataText}</S.Text2Grey>
    </S.ErrorBox>
  );
}
