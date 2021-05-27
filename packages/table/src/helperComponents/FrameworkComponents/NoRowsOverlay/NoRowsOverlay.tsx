import { ArtboardColorSVG } from '@sbercloud/icons';
import { H5 } from '@sbercloud/uikit-typography';

import { Languages, Texts, textProvider } from '../../../helpers/texts-provider';
import * as S from './styled';
import { NoDataReasons } from './types';

function getText(reason: NoDataReasons, language: Languages) {
  switch (reason) {
    case NoDataReasons.Search:
    case NoDataReasons.Filtering:
      return textProvider(language, Texts.noRowsAfterSearch);
    default:
    case NoDataReasons.InitialEmpty:
      return textProvider(language, Texts.noRowsInitially);
  }
}

export function NoRowsOverlay({ reason, language }: { reason: NoDataReasons; language: Languages }) {
  return (
    <S.NoRowsMessageWrapper>
      <ArtboardColorSVG size={65} />
      <H5>{getText(reason, language)}</H5>
    </S.NoRowsMessageWrapper>
  );
}
