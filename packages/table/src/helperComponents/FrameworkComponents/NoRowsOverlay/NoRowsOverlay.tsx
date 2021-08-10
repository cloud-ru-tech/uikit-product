import { BrandCatDisplaySVG } from '@sbercloud/uikit-react-icons';
import { H5 } from '@sbercloud/uikit-typography';

import { EnabledLanguages, Texts, textProvider } from '../../../helpers/texts-provider';
import * as S from './styled';
import { NoDataReasons } from './types';

function getText(reason: NoDataReasons, language: EnabledLanguages) {
  switch (reason) {
    case NoDataReasons.Search:
    case NoDataReasons.Filtering:
      return textProvider(language, Texts.noRowsAfterSearch);
    default:
    case NoDataReasons.InitialEmpty:
      return textProvider(language, Texts.noRowsInitially);
  }
}

export function NoRowsOverlay({ reason, language }: { reason: NoDataReasons; language: EnabledLanguages }) {
  return (
    <S.NoRowsMessageWrapper>
      <BrandCatDisplaySVG size={65} />
      <H5>{getText(reason, language)}</H5>
    </S.NoRowsMessageWrapper>
  );
}
