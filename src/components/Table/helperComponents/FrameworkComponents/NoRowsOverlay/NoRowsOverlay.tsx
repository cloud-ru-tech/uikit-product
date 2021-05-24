import { H5 } from 'typography';
import { ArtboardColorSVG } from '@sbercloud/icons';
import { NoDataReasons } from 'components/Table/helperComponents/FrameworkComponents/NoRowsOverlay/types';
import {
  Languages,
  textProvider,
  Texts,
} from 'components/Table/helpers/texts-provider';
import * as S from './styled';

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

export function NoRowsOverlay({
  reason,
  language,
}: {
  reason: NoDataReasons;
  language: Languages;
}) {
  return (
    <S.NoRowsMessageWrapper>
      <ArtboardColorSVG size={65} />
      <H5>{getText(reason, language)}</H5>
    </S.NoRowsMessageWrapper>
  );
}
