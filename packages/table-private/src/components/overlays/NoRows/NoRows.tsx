import { SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { NoData } from '@sbercloud/uikit-product-no-data';
import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../helpers/texts-provider';
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
      <NoData
        image={<PredefinedDecorIconPrivate icon={<SearchInterfaceSVG />} />}
        title={title}
        description={description}
      />
    </S.NoRowsOverlay>
  );
}

export { NoDataReasons };
