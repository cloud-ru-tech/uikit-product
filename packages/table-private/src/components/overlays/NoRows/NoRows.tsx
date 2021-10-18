import { BrandCatDisplaySVG } from '@sbercloud/uikit-react-icons';
import { H5 } from '@sbercloud/uikit-typography';

import { TextProvider, Texts } from '../../../helpers/texts-provider';
import * as S from './styled';
import { NoDataReasons } from './types';

function getText(reason: NoDataReasons) {
  switch (reason) {
    case NoDataReasons.Search:
    case NoDataReasons.Filtering:
      return TextProvider(Texts.noRowsAfterSearch);
    default:
    case NoDataReasons.InitialEmpty:
      return TextProvider(Texts.noRowsInitially);
  }
}

export function NoRows({ reason }: { reason: NoDataReasons }) {
  return (
    <S.NoRowsMessageWrapper>
      <BrandCatDisplaySVG size={65} />
      <H5>{getText(reason)}</H5>
    </S.NoRowsMessageWrapper>
  );
}
