import { SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';

import { Texts, textProvider } from '../../../helpers/texts-provider';
import * as S from './styled';
import { NoDataReasons } from './types';

function getText(languageCode: LanguageCodeType, reason: NoDataReasons) {
  switch (reason) {
    case NoDataReasons.Search:
    case NoDataReasons.Filtering:
      return {
        title: textProvider(languageCode, Texts.NoRowsAfterSearch),
        description: textProvider(languageCode, Texts.NoRowsAfterSearchDescription),
      };
    default:
    case NoDataReasons.InitialEmpty:
      return {
        title: textProvider(languageCode, Texts.NoRowsInitially),
      };
  }
}

export function NoRows({ reason }: { reason: NoDataReasons }) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const { title, description } = getText(languageCode, reason);

  return (
    <S.NoRowsOverlay>
      <S.NoRowsOverlayIconWrap>
        <SearchInterfaceSVG size={54} />
      </S.NoRowsOverlayIconWrap>

      <S.NoRowsOverlayTitle>{title}</S.NoRowsOverlayTitle>

      {description && <S.NoRowsOverlayDescription>{description}</S.NoRowsOverlayDescription>}
    </S.NoRowsOverlay>
  );
}

export { NoDataReasons };
