import { BrandCatDisplaySVG } from '@sbercloud/uikit-product-icons';
import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';

import { Texts, textProvider } from '../../../helpers/texts-provider';
import * as S from './styled';
import { NoDataReasons } from './types';

function getText(languageCode: LanguageCodeType, reason: NoDataReasons) {
  switch (reason) {
    case NoDataReasons.Search:
    case NoDataReasons.Filtering:
      return textProvider(languageCode, Texts.NoRowsAfterSearch);
    default:
    case NoDataReasons.InitialEmpty:
      return textProvider(languageCode, Texts.NoRowsInitially);
  }
}

export function NoRows({ reason }: { reason: NoDataReasons }) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  return (
    <S.NoRowsMessageWrapper>
      <BrandCatDisplaySVG size={65} />
      <S.NoRowsText>{getText(languageCode, reason)}</S.NoRowsText>
    </S.NoRowsMessageWrapper>
  );
}
